import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
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
  @ApiProperty({
    description: "The name of the attachment file",
    example: "document.pdf",
  })
  @IsString()
  filename: string;

  @ApiProperty({
    description: "The content of the attachment (base64 encoded)",
    example: "base64_encoded_content",
  })
  @IsString()
  content: string;

  @ApiPropertyOptional({
    description: "The MIME type of the attachment",
    example: "application/pdf",
  })
  @IsOptional()
  @IsString()
  contentType?: string;
}

export class SendEmailDto {
  @ApiProperty({
    description: "The recipient's email address",
    example: "recipient@example.com",
    format: "email",
  })
  @IsEmail({}, { message: "Please provide a valid email address" })
  to: string;

  @ApiProperty({
    description: "The email subject",
    example: "Welcome to Marketplace!",
  })
  @IsString({ message: "Subject must be a string" })
  subject: string;

  @ApiProperty({
    description: "The name of the email template to use",
    example: "welcome-email",
  })
  @IsString({ message: "Template name must be string" })
  template: string;

  @ApiPropertyOptional({
    description: "Template context variables",
    example: {
      username: "John",
      activationLink: "https://example.com/activate",
    },
  })
  @IsOptional()
  @IsObject()
  context?: Record<string, any>;

  @ApiPropertyOptional({
    description: "Email attachments",
    type: [EmailAttachmentDto],
  })
  @IsOptional()
  @IsArray({ message: "Attachments must be an array" })
  @ValidateNested({ each: true })
  @Type(() => EmailAttachmentDto)
  attachments?: EmailAttachmentDto[];
}
