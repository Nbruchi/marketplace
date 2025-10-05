import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../shared/entities/user-entity";
import { randomInt } from "crypto";
import { InjectRedis } from "@nestjs-modules/ioredis";
import Redis from "ioredis";
import * as nodemailer from "nodemailer";
import { readFileSync } from "fs";
import { join } from "path";
import * as ejs from "ejs";
import { OtpType } from "src/shared/enums/otp-enum";
import sharp from "sharp";

export interface SendEmailOptions {
  to: string;
  subject: string;
  template: string;
  context?: Record<string, any>;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
    cid?: string;
    contentDisposition?: "inline" | "attachment";
  }>;
}

export interface SendOtpOptions {
  email: string;
  type: OtpType;
  userId?: string;
  metadata?: Record<string, any>;
  expiresInMinutes?: number;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: nodemailer.Transporter;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRedis() private readonly redis: Redis,
  ) {
    // Initialize nodemailer transporter
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>("email.host"),
      port: this.configService.get<number>("email.port"),
      secure: this.configService.get<boolean>("email.secure"),
      auth: {
        user: this.configService.get<string>("email.user"),
        pass: this.configService.get<string>("email.pass"),
      },
    });
  }

  /**
   * Send a generic email using a template
   */
  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    try {
      const { to, subject, template, context = {}, attachments = [] } = options;

      // Load logo image and optimize it
      const logoPath = join(__dirname, "templates", "logo.png");
      const logoBuffer = await sharp(logoPath)
        .resize(200, 200, {
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .png({ quality: 80, compressionLevel: 9 })
        .toBuffer();

      // Load and render EJS template
      const templatePath = join(__dirname, "templates", `${template}.ejs`);
      const templateContent = readFileSync(templatePath, "utf8");

      // Prepare template context with default values
      // Use CID reference for the logo instead of inline base64
      const templateContext = {
        ...context,
        // App Info
        logoUrl: "cid:logo", // CID reference for embedded image
        appName: this.configService.get("app.name"),
        appUrl: this.configService.get("app.url"),
        appAddress: this.configService.get("app.companyAddress"),
        // Support Info
        supportEmail: this.configService.get("email.from"),
        supportUrl: this.configService.get("app.supportUrl"),
        // Social Media
        facebookUrl: this.configService.get("app.social.facebook"),
        twitterUrl: this.configService.get("app.social.twitter"),
        instagramUrl: this.configService.get("app.social.instagram"),
        // Common URLs
        loginUrl: this.configService.get("app.webAppUrls.login"),
        registerUrl: this.configService.get("app.webAppUrls.register"),
        dashboardUrl: this.configService.get("app.webAppUrls.dashboard"),
        accountUrl: this.configService.get("app.webAppUrls.account"),
        storeUrl: this.configService.get("app.webAppUrls.store"),
        resetPasswordUrl: this.configService.get(
          "app.webAppUrls.resetPassword",
        ),
        verifyEmailUrl: this.configService.get("app.webAppUrls.verifyEmail"),
      };

      // Render EJS template
      const html = await ejs.render(templateContent, templateContext, {
        async: true,
        cache: process.env.NODE_ENV === "production",
        filename: templatePath, // Enables includes/extends
      });

      // Send email using nodemailer with company name as sender
      const fromName = this.configService.get("app.name") ?? "Marketplace";
      const fromAddress = this.configService.get("email.from");

      if (!fromAddress) {
        throw new Error("Email from address not configured");
      }

      // Prepare attachments with logo embedded as CID
      const emailAttachments = [
        {
          filename: "logo.png",
          content: logoBuffer,
          cid: "logo", // Content-ID that matches the template reference
          contentType: "image/png",
          contentDisposition: "inline" as const,
        },
        ...attachments, // Include any additional attachments
      ];

      await this.transporter.sendMail({
        from: {
          name: fromName,
          address: fromAddress,
        },
        to,
        subject,
        html,
        attachments: emailAttachments,
      });

      this.logger.log(`Email sent successfully to ${to}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send email to ${options.to}:`, error);
      return false;
    }
  }

  /**
   * Generate and send OTP email
   */
  async sendOtp(
    options: SendOtpOptions,
  ): Promise<{ success: boolean; otpId?: string; message?: string }> {
    try {
      const {
        email,
        type,
        userId,
        metadata = {},
        expiresInMinutes = 15,
      } = options;

      // Check if user exists for email verification
      if (type === OtpType.EMAIL_VERIFICATION) {
        const existingUser = await this.userRepository.findOne({
          where: { email },
        });
        if (existingUser && existingUser.isEmailVerified) {
          return {
            success: false,
            message: "Email is already verified",
          };
        }
      }

      // Generate 6-digit OTP
      const code = randomInt(100000, 999999).toString();

      // Create OTP data object
      const otpData = {
        code,
        email,
        type,
        userId,
        metadata,
        createdAt: new Date().toISOString(),
        attempts: 0,
        maxAttempts: 3,
      };

      // Store OTP in Redis with TTL
      const otpKey = `otp:${type}:${email}:${code}`;
      const ttlSeconds = expiresInMinutes * 60;

      await this.redis.setex(otpKey, ttlSeconds, JSON.stringify(otpData));

      // Send OTP email
      const emailSent = await this.sendEmail({
        to: email,
        subject: this.getOtpSubject(type),
        template: "otp",
        context: {
          code,
          type,
          message: `Please enter the verification code below to ${type.toLowerCase().replace(/_/g, " ")}:`,
          isEmailVerification: type === OtpType.EMAIL_VERIFICATION,
          isPasswordReset: type === OtpType.PASSWORD_RESET,
          isLoginVerification: type === OtpType.LOGIN_VERIFICATION,
          expiresIn: expiresInMinutes, // Match the template variable name
          otpCode: code, // Template expects otpCode, not code
          ...metadata,
        },
      });

      if (!emailSent) {
        // Clean up OTP if email failed
        await this.redis.del(otpKey);
        return {
          success: false,
          message: "Failed to send OTP email",
        };
      }

      this.logger.log(`OTP sent to ${email} for ${type}`);
      return {
        success: true,
        otpId: otpKey,
      };
    } catch (error) {
      this.logger.error(`Failed to send OTP to ${options.email}:`, error);
      return {
        success: false,
        message: "Internal server error",
      };
    }
  }

  /**
   * Verify OTP code
   */
  async verifyOtp(
    code: string,
    email: string,
    type: OtpType,
  ): Promise<{ success: boolean; message?: string; otp?: any }> {
    try {
      const otpKey = `otp:${type}:${email}:${code}`;
      const otpDataStr = await this.redis.get(otpKey);

      if (!otpDataStr) {
        return {
          success: false,
          message: "Invalid OTP code or expired",
        };
      }

      const otpData = JSON.parse(otpDataStr);

      // Check if OTP has exceeded max attempts
      if (otpData.attempts >= otpData.maxAttempts) {
        // Delete the OTP after max attempts
        await this.redis.del(otpKey);
        return {
          success: false,
          message: "Too many failed attempts",
        };
      }

      // Increment attempts
      otpData.attempts += 1;

      // Mark as used and delete from Redis
      await this.redis.del(otpKey);

      this.logger.log(`OTP verified successfully for ${email}`);
      return {
        success: true,
        otp: otpData,
      };
    } catch (error) {
      this.logger.error(`Failed to verify OTP for ${email}:`, error);
      return {
        success: false,
        message: "Internal server error",
      };
    }
  }

  /**
   * Send email verification
   */
  async sendEmailVerification(
    email: string,
    userId?: string,
  ): Promise<{ success: boolean; message?: string }> {
    return this.sendOtp({
      email,
      type: OtpType.EMAIL_VERIFICATION,
      userId,
    });
  }

  /**
   * Send password reset email
   */
  async sendPasswordReset(
    email: string,
    userId?: string,
  ): Promise<{ success: boolean; message?: string }> {
    return this.sendOtp({
      email,
      type: OtpType.PASSWORD_RESET,
      userId,
    });
  }

  /**
   * Send welcome email
   */
  async sendWelcomeEmail(user: User): Promise<boolean> {
    return this.sendEmail({
      to: user.email,
      subject: "Welcome to our platform!",
      template: "welcome",
      context: {
        userName: user.fullNames,
        email: user.email,
      },
    });
  }

    /**
   * Send password reset confirmation
   */
  async sendPasswordResetConfirmation(
    email: string,
    metadata?: {
      ipAddress?: string;
      location?: string;
      device?: string;
    },
  ): Promise<boolean> {
    // Get user info for the email template
    const user = await this.userRepository.findOne({ where: { email } });

    // Format timestamp
    const timestamp = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });

    return this.sendEmail({
      to: email,
      subject: "Password Reset Successful",
      template: "password-reset-confirmation",
      context: {
        email,
        userName: user?.fullNames || "User",
        timestamp,
        location: metadata?.location || "Unknown",
        device: metadata?.device || "Unknown Device",
        resetPasswordUrl: this.configService.get(
          "app.webAppUrls.resetPassword",
        ),
        loginUrl: this.configService.get("app.webAppUrls.login"),
        supportUrl: this.configService.get("app.supportUrl"),
      },
    });
  }

  /**
   * Clean up expired OTPs (Redis handles this automatically with TTL)
   * This method is kept for compatibility but Redis TTL handles cleanup
   */
  async cleanupExpiredOtps(): Promise<number> {
    // Redis automatically handles cleanup with TTL
    // This method is kept for compatibility
    this.logger.log("Redis TTL handles OTP cleanup automatically");
    return 0;
  }

  /**
   * Get OTP subject based on type
   */
  private getOtpSubject(type: OtpType): string {
    const subjects = {
      EMAIL_VERIFICATION: "Verify Your Email Address",
      PASSWORD_RESET: "Reset Your Password",
      LOGIN_VERIFICATION: "Login Verification Code",
      PHONE_VERIFICATION: "Phone Verification Code",
    };
    return subjects[type];
  }
}
