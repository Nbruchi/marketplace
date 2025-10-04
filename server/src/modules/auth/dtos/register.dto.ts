import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, MaxLength, MinLength } from "class-validator";
import { LoginDto } from "./login.dto";

export class RegisterDto extends LoginDto {
  @ApiProperty({
    description: "The full name of the user",
    example: "John Doe",
    minLength: 2,
    maxLength: 50,
  })
  @MinLength(2, { message: "Full name can't go below 2 characters" })
  @MaxLength(50, { message: "Full name can't go above 50 characters" })
  @IsString({ message: "Full name must be a string" })
  fullNames: string;

  @IsBoolean({ message: "You must accept the Terms and Conditions" })
  acceptTerms: boolean;
}
