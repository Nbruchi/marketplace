import { IsEmail, Length } from "class-validator";

export class VerifyEmailDto {
  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;

  @Length(6, 6, { message: "OTP code must be 6 digits" })
  code: string;
}
