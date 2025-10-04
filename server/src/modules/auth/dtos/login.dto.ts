import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";
import { EmailDto } from "./email.dto";

export class LoginDto extends EmailDto {
  @ApiProperty({
    description: "The user's password for authentication",
    example: "P@ssw0rd",
    minLength: 6,
    maxLength: 50,
    pattern:
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]",
  })
  @IsString({ message: "Password must be a string" })
  @MinLength(6, { message: "Password can't go below 6 characters" })
  @MaxLength(50, { message: "Password can't go above 50 characters" })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  })
  password: string;
}
