import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";
import { EmailDto } from "./email.dto";

export class VerifyEmailDto extends EmailDto {
  @ApiProperty({
    description: "The 6-digit verification code sent to the email",
    example: "123456",
    minLength: 6,
    maxLength: 6,
  })
  @Length(6, 6, { message: "OTP code must be 6 digits" })
  @IsString({ message: "OTP code must be a string" })
  code: string;
}
