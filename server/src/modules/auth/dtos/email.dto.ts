import { IsEmail } from "class-validator";

export class EmailDto {
  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;
}
