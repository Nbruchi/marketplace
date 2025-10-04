import {
  IsEmail,
  IsString,
  IsOptional,
  IsObject,
  IsArray,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class EmailAttachmentDto {
  @IsString()
  filename: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  contentType?: string;
}

export class SendEmailDto {
  @IsEmail({}, { message: "Please provide a valid email address" })
  to: string;

  @IsString({ message: "Subject must be a string" })
  subject: string;

  @IsString({ message: "Template name must be string" })
  template: string;

  @IsOptional()
  @IsObject()
  context?: Record<string, any>;

  @IsOptional()
  @IsArray({ message: "Attachments must be an array" })
  @ValidateNested({ each: true })
  @Type(() => EmailAttachmentDto)
  attachments?: EmailAttachmentDto[];
}
