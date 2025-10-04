import {
  IsBoolean,
  IsEmail,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class RegisterDto {
  @MinLength(2, { message: "Full name can't go below 2 characters" })
  @MaxLength(50, { message: "Full name can't go above 50 characters" })
  @IsString({ message: "Full name must be a string" })
  fullNames: string;

  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;

  @IsString({ message: "Password must be a string" })
  @Length(6, 50)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  })
  password: string;

  @IsBoolean({ message: "You must accept the Terms and Conditions" })
  acceptTerms: boolean;
}
