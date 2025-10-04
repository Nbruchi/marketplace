import { registerAs } from "@nestjs/config";

type TokenConfig = {
  secret: string;
  expiresIn: string;
};

const buildTokenConfig = (
  secret?: string,
  expiresIn?: string,
): TokenConfig => ({
  secret: secret ?? "",
  expiresIn: expiresIn ?? "",
});

export default registerAs("jwt", () => ({
  accessToken: buildTokenConfig(
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_EXPIRES_IN,
  ),
  refreshToken: buildTokenConfig(
    process.env.REFRESH_TOKEN_SECRET,
    process.env.REFRESH_TOKEN_EXPIRES_IN,
  ),
}));
