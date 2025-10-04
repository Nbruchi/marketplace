import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class EmailDto {
  @ApiProperty({
    description: "The email address",
    example: "user@example.com",
    format: "email",
  })
  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;
}
