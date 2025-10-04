import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsEnum, Length } from "class-validator";
import { OtpType } from "../../../shared/enums/otp-enum";

export class VerifyOtpDto {
  @ApiProperty({
    description: "The 6-digit OTP code to verify",
    example: "123456",
    minLength: 6,
    maxLength: 6,
  })
  @IsString()
  @Length(6, 6, { message: "OTP code must be 6 digits" })
  code: string;

  @ApiProperty({
    description: "The email address associated with the OTP",
    example: "user@example.com",
    format: "email",
  })
  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;

  @ApiProperty({
    description: "The type of OTP verification",
    enum: OtpType,
    example: OtpType.EMAIL_VERIFICATION,
  })
  @IsEnum(OtpType)
  type: OtpType;
}
