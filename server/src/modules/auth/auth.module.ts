import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/shared/entities/user-entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "src/shared/strategies/jwt.strategy";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("jwt.accessToken.secret"),
        signOptions: {
          expiresIn: config.get<string>("jwt.accessToken.expiresIn") || '15m',
        },
      }),
    }),
    TypeOrmModule.forFeature([User]),
    MailModule,
  ],
  providers: [
    AuthService, 
    JwtStrategy, 
    JwtService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy, JwtService],
})
export class AuthModule {}
