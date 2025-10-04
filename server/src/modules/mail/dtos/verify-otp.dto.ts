import { IsString, IsEmail, IsEnum, Length } from "class-validator";
import { OtpType } from "../../../shared/enums/otp-enum";

export class VerifyOtpDto {
  @IsString()
  @Length(6, 6, { message: "OTP code must be 6 digits" })
  code: string;

  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;

  @IsEnum(OtpType)
  type: OtpType;
}
