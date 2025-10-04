import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/shared/entities/user-entity";
import { UserRole, UserStatus } from "src/shared/enums/user-enums";
import { SecretUtils } from "src/shared/utils/secret-utils";
import { MailService } from "../mail/mail.service";
import { randomBytes } from "crypto";
import { InjectRedis } from "@nestjs-modules/ioredis";
import Redis from "ioredis";
import { RegisterDto } from "./dtos/register.dto";
import { OtpType } from "src/shared/enums/otp-enum";
import { LoginDto } from "./dtos/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async login(dto: LoginDto): Promise<{
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      fullNames: string;
      role: UserRole;
    };
  }> {
    const user = await this.validateUserCredentials(dto.email, dto.password);

    // Generate tokens
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(user),
      this.signRefreshToken(user),
    ]);

    // Store refresh token with device info
    await this.storeRefreshToken(user, refreshToken, {
      name: "Web Browser",
      type: "web",
      // These could be passed from the controller
      ipAddress: "Unknown",
      location: "Unknown",
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        fullNames: user.fullNames,
        role: user.role,
      },
    };
  }

  /**
   * Refresh an access token using a refresh token
   */
  async refreshToken(refreshToken: string): Promise<{
    accessToken: string;
  }> {
    try {
      // Verify refresh token
      const payload = await this.jwtService.verifyAsync(refreshToken);

      // Check if it's a refresh token
      if (payload.type !== "refresh") {
        throw new UnauthorizedException("Invaid token type");
      }

      // Get user
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      // Check if refresh token is still valid in user's devices
      const isValidToken = user.activity?.devices?.some(
        (device) => device.id === payload.jti,
      );

      if (!isValidToken) {
        throw new UnauthorizedException("Token revoked");
      }

      // Verify token version matches current user state
      // This allows us to invalidate all refresh tokens if needed
      if (payload.version !== user.activity?.loginCount) {
        throw new UnauthorizedException("Token invalidated");
      }

      // Check user account status
      if (user.status !== UserStatus.ACTIVE) {
        throw new UnauthorizedException("Your account is not active");
      }

      // Check user role hasn't changed
      if (payload.role !== user.role) {
        throw new UnauthorizedException("Your role has changed");
      }

      // Generate new access token only (refresh token remains valid)
      const accessToken = await this.signAccessToken(user);

      // Update device last used timestamp
      const devices = user.activity?.devices || [];
      const updatedDevices = devices.map((device) =>
        device.id === payload.jti
          ? { ...device, lastUsed: new Date() }
          : device,
      );

      // Update last activity
      await this.userRepository.update(user.id, {
        lastActivity: new Date(),
        activity: {
          ...user.activity,
          devices: updatedDevices,
        },
      });

      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async register(dto: RegisterDto): Promise<{
    success: boolean;
    message?: string;
    userId: string;
  }> {
    await this.checkRegistrationRateLimit(dto.email);

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException("Email already exits");
    }

    // Validate terms acceptance
    if (!dto.acceptTerms) {
      throw new BadRequestException("Terms not accepted");
    }

    // Hash password
    const hashedPassword = await SecretUtils.hash(dto.password);

    const user = await this.userRepository.create({
      email: dto.email,
      fullNames: dto.fullNames,
      password: hashedPassword,
      isEmailVerified: false,
      status: UserStatus.PENDING,
      role: UserRole.CUSTOMER,
      termsAcceptedAt: new Date(),
      termsVersion: "1.0.0",
      preferences: {
        timezone: "UTC",
        twoFactorAuth: false,
        theme: "system",
        notificationPreferences: {
          email: true,
          push: true,
          orderUpdates: true,
          promotions: false,
          sellerUpdates: false,
        },
      },
      activity: {
        lastPasswordChange: new Date(),
        lastProfileUpdate: new Date(),
        loginCount: 0,
        devices: [],
      },
    });

    await this.userRepository.save(user);

    // Send email verification
    await this.mailService.sendEmailVerification(user.email, user.id);

    return {
      success: true,
      message: "Registration complete, verify your email",
      userId: user.id,
    };
  }

  /**
   * Send email verification OTP
   */
  async sendEmailVerification(
    email: string,
  ): Promise<{ success: boolean; message?: string }> {
    // Check if user exists
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException("User not found");
    }

    // Check if already verified
    if (user.isEmailVerified) {
      throw new BadRequestException("Email already verified");
    }

    return this.mailService.sendEmailVerification(email, user.id);
  }

  /**
   * Verify email with OTP
   */
  async verifyEmail(
    email: string,
    code: string,
  ): Promise<{ success: boolean; message?: string }> {
    const result = await this.mailService.verifyOtp(
      code,
      email,
      OtpType.EMAIL_VERIFICATION,
    );

    if (!result.success) {
      throw new BadRequestException(result.message);
    }

    // Update user email verification status
    await this.userRepository.update(
      { email },
      {
        isEmailVerified: true,
        emailVerificationToken: undefined,
        status: UserStatus.ACTIVE,
      },
    );

    // Send welcome email
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      await this.mailService.sendWelcomeEmail(user);
    }

    return {
      success: true,
      message: `${email} is now verified`,
    };
  }

  /**
   * Send password reset OTP
   */
  async sendPasswordReset(
    email: string,
  ): Promise<{ success: boolean; message?: string }> {
    // Check if user exists
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException("User not found");
    }

    return this.mailService.sendPasswordReset(email, user.id);
  }

  /**
   * Verify password reset OTP (Step 1)
   */
  async verifyPasswordResetOTP(
    email: string,
    code: string,
  ): Promise<{
    success: boolean;
    message?: string;
    resetToken?: string;
  }> {
    // Verify OTP with MailService
    const result = await this.mailService.verifyOtp(
      code,
      email,
      OtpType.PASSWORD_RESET,
    );
    if (!result.success) {
      throw new BadRequestException(result.message);
    }

    // Generate temporary reset token
    const resetToken = randomBytes(32).toString("hex");

    // Save reset token in redis
    const resetKey = `reset_token:${email}:${resetToken}`;
    await this.redis.setex(
      resetKey,
      900,
      JSON.stringify({
        email,
        resetToken,
        createdAt: new Date().toISOString(),
      }),
    );

    return {
      success: true,
      message: "OTP verified! You can now reset your password",
      resetToken,
    };
  }

  /**
   * Verify password reset token (Step 2)
   */
  async verifyPasswordResetToken(
    email: string,
    resetToken: string,
  ): Promise<{
    success: boolean;
    message?: string;
  }> {
    // Get reset token from redis
    const resetKey = `reset_token:${email}:${resetToken}`;
    const resetTokenData = await this.redis.get(resetKey);
    if (!resetTokenData) {
      throw new BadRequestException("Invalid or expired reset token");
    }

    return {
      success: true,
      message: "Reset token verified successfully",
    };
  }

  /**
   * Reset password with token (Step 2)
   */
  async resetPasswordWithToken(
    email: string,
    resetToken: string,
    newPassword: string,
  ): Promise<{
    success: boolean;
    message?: string;
  }> {
    // Get reset token from redis
    const resetKey = `reset_token:${email}:${resetToken}`;
    const resetTokenData = await this.redis.get(resetKey);
    if (!resetTokenData) {
      throw new BadRequestException("Invalid or expired reset token");
    }

    // Hash the password
    const hashedPassword = await SecretUtils.hash(newPassword);

    // Update user password in db
    await this.userRepository.update(
      { email },
      {
        password: hashedPassword,
        passwordResetToken: undefined,
        passwordResetExpires: undefined,
      },
    );

    // Delete reset token from redis
    await this.redis.del(resetKey);

    // Send confirmation email
    await this.mailService.sendPasswordResetConfirmation(email);

    return {
      success: true,
      message: "Password reset successfully",
    };
  }

  /**
   * Resend password reset OTP
   */
  async resendPasswordResetOtp(email: string): Promise<{
    success: boolean;
    message?: string;
  }> {
    // Check if user exists
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    return this.mailService.sendPasswordReset(email, user.id);
  }

  private async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    // Check account status
    if (user.status !== UserStatus.ACTIVE) {
      if (user.status === UserStatus.PENDING) {
        throw new ForbiddenException(
          "Please verify your email address before logging in",
        );
      }
      if (user.status === UserStatus.SUSPENDED) {
        throw new ForbiddenException(
          "Your account has been suspended. Please contact support",
        );
      }
      if (user.status === UserStatus.DELETED) {
        throw new UnauthorizedException("Invalid email or password");
      }
    }

    // Check email verification
    if (!user.isEmailVerified) {
      throw new ForbiddenException(
        "Please verify your email address before logging in",
      );
    }

    // Check account lockout
    if (user.isLocked && user.lockedUntil && user.lockedUntil > new Date()) {
      throw new ForbiddenException(
        "Account is temporarily locked due to too many failed login attempts",
      );
    }

    const isValid = await SecretUtils.compare(password, user.password);
    if (!isValid) {
      // Increment failed login attempts
      await this.handleFailedLogin(user);
      throw new UnauthorizedException("Invalid email or password");
    }

    // Reset lockout on successful login
    await this.handleSuccessfulLogin(user);
    return user;
  }

  private async handleFailedLogin(user: User): Promise<void> {
    const newAttempts = (user.loginAttempts || 0) + 1;
    const maxAttempts = 5; // Configurable
    const lockoutDuration = 5 * 60 * 1000; // 5 minutes

    if (newAttempts >= maxAttempts) {
      // Lock the account
      const lockoutUntil = new Date(Date.now() + lockoutDuration);
      await this.userRepository.update(user.id, {
        loginAttempts: newAttempts,
        isLocked: true,
        lockedUntil: lockoutUntil,
      });
    } else {
      // Just increment attempts
      await this.userRepository.update(user.id, {
        loginAttempts: newAttempts,
      });
    }
  }

  private async handleSuccessfulLogin(user: User): Promise<void> {
    const now = new Date();
    const loginCount = (user.activity?.loginCount || 0) + 1;

    await this.userRepository.update(user.id, {
      lastLogin: now,
      loginAttempts: 0,
      isLocked: false,
      lockedUntil: null,
      lastActivity: now,
      activity: {
        ...user.activity,
        loginCount,
      },
    });
  }

  /**
   * Sign an access token for a user
   */
  private async signAccessToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      type: "access",
    };
    return await this.jwtService.signAsync(payload);
  }

  /**
   * Sign a refresh token for a user
   */
  private async signRefreshToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      type: "refresh",
      jti: randomBytes(32).toString("hex"), // Unique token ID
      role: user.role,
      version: user.activity?.loginCount || 0, // Used for invalidating all tokens on password change/logout
    };
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get("jwt.refreshTokenExpiration") || "30d", // 30 days
    });
    return refreshToken;
  }

  /**
   * Store refresh token information
   */
  private async storeRefreshToken(
    user: User,
    refreshToken: string,
    deviceInfo?: {
      name?: string;
      type?: string;
      ipAddress?: string;
      location?: string;
    },
  ): Promise<void> {
    // Check for existing tokens and update activity
    const existingTokens = user.activity?.devices || [];
    const now = new Date();

    // Store token info in user activity with enhanced device tracking
    const tokenInfo = {
      id: refreshToken,
      name: deviceInfo?.name || "Web Browser", // Device name
      type: deviceInfo?.type || "web",
      lastUsed: now,
      location: deviceInfo?.location || "Unknown",
      ipAddress: deviceInfo?.ipAddress || "Unknown",
      createdAt: now, // Track when the token was created
    };

    // Add new token to devices array
    existingTokens.push(tokenInfo);

    // Update user activity
    await this.userRepository.update(user.id, {
      activity: {
        ...user.activity,
        devices: existingTokens,
      },
    });
  }

  /**
   * Invalidate a refresh token
   */
  private async invalidateRefreshToken(
    user: User,
    tokenId: string,
  ): Promise<void> {
    // Remove token from devices array
    const existingTokens = user.activity?.devices || [];
    const updatedTokens = existingTokens.filter(
      (token) => token.id !== tokenId,
    );

    // Update user activity
    await this.userRepository.update(user.id, {
      activity: {
        ...user.activity,
        devices: updatedTokens,
      },
    });
  }

  /**
   * Check rate limiting for registration
   */
  private async checkRegistrationRateLimit(email: string): Promise<void> {
    const key = `registration_attempts:${email}`;
    const attempts = await this.redis.get(key);

    if (attempts && parseInt(attempts) >= 3) {
      throw new BadRequestException(
        "Too many registration attempts. Please try again later.",
      );
    }

    // Increment attempts
    await this.redis.incr(key);
    await this.redis.expire(key, 3600); // 1 hour
  }
}
