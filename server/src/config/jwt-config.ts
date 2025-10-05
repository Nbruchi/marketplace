import { registerAs } from "@nestjs/config";

interface TokenConfig {
  secret: string;
  expiresIn: string;
}

const buildTokenConfig = (
  secret?: string,
  expiresIn?: string,
): TokenConfig => ({
  secret: secret || "",
  expiresIn: expiresIn || "15m",
});

export default registerAs("jwt", () => ({
  accessToken: buildTokenConfig(
    process.env.JWT_ACCESS_TOKEN_SECRET,
    process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "15m",
  ),
  refreshToken: buildTokenConfig(
    process.env.JWT_REFRESH_TOKEN_SECRET,
    process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "7d",
  ),
}));
