import { registerAs } from "@nestjs/config";

export default registerAs("rateLimit", () => ({
  ttl: process.env.RATE_LIMIT_TTL,
  max: process.env.RATE_LIMIT_MAX,
}));
