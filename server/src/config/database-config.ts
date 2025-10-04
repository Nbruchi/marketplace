import { registerAs } from "@nestjs/config";

export default registerAs("database", () => {
  const url = process.env.DATABASE_URL;

  return {
    url,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT as string),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  };
});
