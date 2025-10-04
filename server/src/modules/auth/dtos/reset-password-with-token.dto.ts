import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { EmailDto } from "./email.dto";

export class ResetPasswordWithTokenDto extends EmailDto {
  @ApiProperty({
    description: "The new password for the account",
    example: "P@ssw0rd",
    minLength: 6,
    maxLength: 50,
    pattern:
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]",
  })
  @IsString({ message: "Password must be a string" })
  @MinLength(6, { message: "New password can't go below 6 characters" })
  @MaxLength(50, { message: "New password can't go beyond 50 characters" })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  })
  newPassword: string;

  @IsString({ message: "Reset token should be a string" })
  resetToken: string;
}
