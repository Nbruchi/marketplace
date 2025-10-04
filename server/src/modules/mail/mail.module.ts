import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailService } from "./mail.service";
import { MailController } from "./mail.controller";
import { User } from "../../shared/entities/user-entity";
import { RedisModule } from "@nestjs-modules/ioredis";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>("REDIS_URL");
        if (!redisUrl) {
          throw new Error("REDIS_URL is not defined in environment variables");
        }

        return {
          type: "single",
          url: redisUrl,
          ssl: {
            rejectUnauthorized: false, // Only for development
          },
          tls: {}, // Required for Upstash
        };
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
