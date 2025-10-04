import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { ResetPasswordWithTokenDto } from "./dtos/reset-password-with-token.dto";
import { VerifyEmailDto } from "./dtos/verify-email.dto";
import { EmailDto } from "./dtos/email.dto";
import { RegisterDto } from "./dtos/register.dto";
import { Throttle } from "@nestjs/throttler";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({ status: 201, description: "User registered successfully" })
  @ApiResponse({ status: 400, description: "Invalid registration data" })
  @ApiResponse({ status: 429, description: "Too many registration attempts" })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "User login" })
  @ApiResponse({ status: 200, description: "Login successful" })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("send-email-verification")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Send email verification OTP" })
  @ApiResponse({ status: 200, description: "Verification email sent" })
  @ApiResponse({ status: 400, description: "Invalid request" })
  async sendEmailVerification(@Body() dto: EmailDto) {
    return this.authService.sendEmailVerification(dto.email);
  }

  @Post("verify-email")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Verify email with OTP" })
  @ApiResponse({ status: 200, description: "Email verified successfully" })
  @ApiResponse({ status: 400, description: "Invalid OTP" })
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto.email, dto.code);
  }

  @Post("send-password-reset")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Send password reset OTP" })
  @ApiResponse({ status: 200, description: "Password reset email sent" })
  @ApiResponse({ status: 400, description: "Invalid request" })
  async sendPasswordReset(@Body() dto: EmailDto) {
    return this.authService.sendPasswordReset(dto.email);
  }

  @Post("verify-password-reset-otp")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Verify password reset OTP" })
  @ApiResponse({ status: 200, description: "OTP verified successfully" })
  @ApiResponse({ status: 400, description: "Invalid OTP" })
  async verifyPasswordResetOtp(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyPasswordResetOTP(dto.email, dto.code);
  }

  @Post("reset-password-with-token")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Reset password with token" })
  @ApiResponse({ status: 200, description: "Password reset successfully" })
  @ApiResponse({ status: 400, description: "Invalid token or password" })
  async resetPasswordWithToken(@Body() dto: ResetPasswordWithTokenDto) {
    return this.authService.resetPasswordWithToken(
      dto.email,
      dto.newPassword,
      dto.resetToken,
    );
  }

  @Post("resend-password-reset-otp")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Resend password reset OTP" })
  @ApiResponse({ status: 200, description: "OTP resent successfully" })
  @ApiResponse({ status: 400, description: "Invalid request" })
  async resendPasswordResetOtp(@Body() dto: EmailDto) {
    return this.authService.resendPasswordResetOtp(dto.email);
  }
}
