import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class VerifyPasswordResetTokenDto {
  @ApiProperty({ description: "User email", example: "user@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Reset token", example: "abcdef123456" })
  @IsString()
  resetToken: string;
}
