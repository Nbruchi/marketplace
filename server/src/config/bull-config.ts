import { registerAs } from "@nestjs/config";

export default registerAs("bull", () => ({
  prefix: "bull",
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
}));
