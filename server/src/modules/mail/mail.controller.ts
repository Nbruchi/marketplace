import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { MailService } from "./mail.service";
import { SendEmailDto } from "./dtos/send-email.dto";
import { SendOtpDto } from "./dtos/send-otp.dto";
import { VerifyOtpDto } from "./dtos/verify-otp.dto";

@ApiTags("Mail")
@Controller("mail")
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post("send")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Send a generic email" })
  @ApiResponse({ status: 200, description: "Email sent successfully" })
  @ApiResponse({ status: 400, description: "Invalid request data" })
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    const result = await this.mailService.sendEmail(sendEmailDto);
    return {
      success: result,
      message: result ? "Email sent successfully" : "Failed to send email",
    };
  }

  @Post("send-otp")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Send OTP to email address" })
  @ApiResponse({ status: 200, description: "OTP sent successfully" })
  @ApiResponse({ status: 400, description: "Invalid request data" })
  async sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.mailService.sendOtp(sendOtpDto);
  }

  @Post("verify-otp")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Verify OTP code" })
  @ApiResponse({ status: 200, description: "OTP verified successfully" })
  @ApiResponse({ status: 400, description: "Invalid OTP or expired" })
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.mailService.verifyOtp(
      verifyOtpDto.code,
      verifyOtpDto.email,
      verifyOtpDto.type,
    );
  }

  @Post("send-welcome")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Send welcome email to user" })
  @ApiResponse({ status: 200, description: "Welcome email sent successfully" })
  async sendWelcomeEmail(@Body() body: { userId: string }) {
    // This would typically fetch the user from the database
    // For now, this is a placeholder that would need user data
    return {
      success: false,
      message: "Welcome email functionality requires user data",
    };
  }
}
