import {
  IsEmail,
  IsString,
  IsOptional,
  IsObject,
  IsEnum,
  IsNumber,
  Min,
  Max,
} from "class-validator";
import { OtpType } from "../../../shared/enums/otp-enum";

export class SendOtpDto {
  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;

  @IsEnum(OtpType)
  type: OtpType;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsNumber()
  @Min(5)
  @Max(60)
  expiresInMinutes?: number;
}
