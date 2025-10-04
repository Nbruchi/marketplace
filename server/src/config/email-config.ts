import { registerAs } from "@nestjs/config";
export default registerAs("email", () => ({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT as string),
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
  from: process.env.SMTP_FROM,
  secure: parseInt(process.env.SMTP_PORT as string) === 465,
}));
