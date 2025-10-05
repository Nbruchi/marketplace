import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsEnum, IsDateString, IsString } from "class-validator";
import { Gender } from "src/shared/enums/user-enums";

export class UpdateProfileDto {
  @ApiProperty({
    description: "User's display name",
    example: "John Doe",
    required: false,
  })
  @IsOptional()
  @IsString()
  displayName?: string;

  @ApiProperty({
    description: "User's phone number",
    example: "1234567890",
    required: false,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({
    description: "User's gender",
    example: "MALE",
    required: false,
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({
    description: "User's date of birth",
    example: "2000-01-01",
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiProperty({
    description: "User's bio",
    example: "I am a developer",
    required: false,
  })
  @IsOptional()
  @IsString()
  bio?: string;
}
