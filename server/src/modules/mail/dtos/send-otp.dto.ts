import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsString,
  IsOptional,
  IsObject,
  IsEnum,
  IsNumber,
  Min,
  Max,
} from "class-validator";
import { OtpType } from "../../../shared/enums/otp-enum";

export class SendOtpDto {
  @ApiProperty({
    description: "The email address to send the OTP to",
    example: "user@example.com",
    format: "email",
  })
  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;

  @ApiProperty({
    description: "The type of OTP to send",
    enum: OtpType,
    example: OtpType.EMAIL_VERIFICATION,
  })
  @IsEnum(OtpType)
  type: OtpType;

  @ApiPropertyOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsNumber()
  @Min(5)
  @Max(60)
  expiresInMinutes?: number;
}
