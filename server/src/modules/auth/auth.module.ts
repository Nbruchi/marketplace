import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/shared/entities/user-entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "src/shared/strategies/jwt-strategy";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("jwt.accessToken.secret"),
        signOptions: { expiresIn: config.get("jwt.accessToken.expiresIn") },
      }),
    }),
    TypeOrmModule.forFeature([User]),
    MailModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
