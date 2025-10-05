import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from "class-validator";
import { Gender } from "src/shared/enums/user-enums";

export class CompleteProfileDto {
  @ApiPropertyOptional({
    description: "User's display name shown to other users",
    example: "JohnDoe42",
    minLength: 3,
    maxLength: 30,
  })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: "Display name must be at least 3 characters" })
  @MaxLength(30, { message: "Display name cannot exceed 30 characters" })
  displayName?: string;

  @ApiPropertyOptional({
    description: "User's phone number in E.164 format",
    example: "+1234567890",
  })
  @IsOptional()
  @IsPhoneNumber("US", { message: "Invalid phone number" })
  phoneNumber?: string;

  @ApiPropertyOptional({
    description: "User's gender",
    enum: Gender,
    example: Gender.MALE,
  })
  @IsOptional()
  @IsEnum(Gender, { message: "Invalid gender" })
  gender?: Gender;

  @ApiPropertyOptional({
    description: "User's date of birth in ISO 8601 format (YYYY-MM-DD)",
    example: "1990-01-15",
  })
  @IsOptional()
  @IsDateString({}, { message: "Invalid date format. Use YYYY-MM-DD" })
  dateOfBirth?: string;

  @ApiPropertyOptional({
    description: "User's preferred language code (ISO 639-1)",
    example: "en",
    default: "en",
  })
  @IsOptional()
  @IsString()
  @MaxLength(5)
  preferredLanguage?: string;

  @ApiPropertyOptional({
    description: "User's preferred currency code (ISO 4217)",
    example: "USD",
    default: "USD",
  })
  @IsOptional()
  @IsString()
  @MaxLength(3)
  preferredCurrency?: string;
}
