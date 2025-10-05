import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UserRole } from "../enums/user-enums";

export type JwtPayload = {
  sub: string;
  fullNames: string;
  email?: string;
  phone: string;
  role: UserRole;
  isVerified: boolean;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    const jwtSecret = config.get<string>("jwt.accessToken.secret");
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in configuration");
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    return {
      sub: payload.sub,
      fullNames: payload.fullNames,
      email: payload.email,
      phone: payload.phone,
      role: payload.role,
      isVerified: payload.isVerified,
    };
  }
}
