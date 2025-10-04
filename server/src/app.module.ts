import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import appConfig from "./config/app-config";
import databaseConfig from "./config/database-config";
import emailConfig from "./config/email-config";
import jwtConfig from "./config/jwt-config";
import rateLimitConfig from "./config/rate-limit-config";
import redisConfig from "./config/redis-config";
import stripeConfig from "./config/stripe-config";
import swaggerConfig from "./config/swagger-config";
import uploadConfig from "./config/upload-config";
import cloudinaryConfig from "./config/cloudinary-config";
import { BullModule } from "@nestjs/bull";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {
  I18nModule,
  I18nJsonLoader,
  QueryResolver,
  AcceptLanguageResolver,
} from "nestjs-i18n";
import { join } from "path";
import { Address } from "./shared/entities/address-entity";
import { BankAccount } from "./shared/entities/bank-account-entity";
import { Cart } from "./shared/entities/cart-entity";
import { CartItem } from "./shared/entities/cart-item-entity";
import { Category } from "./shared/entities/category-entity";
import { Coupon } from "./shared/entities/coupon-entity";
import { CouponUsage } from "./shared/entities/coupon-usage.entity";
import { Inventory } from "./shared/entities/inventory-entity";
import { Order } from "./shared/entities/order-entity";
import { OrderItem } from "./shared/entities/order-item-entity";
import { PaymentMethod } from "./shared/entities/payment-method-entity";
import { Product } from "./shared/entities/product-entity";
import { ProductVariant } from "./shared/entities/product-variant-entity";
import { ProductVariantOption } from "./shared/entities/product-variant-option-entity";
import { ProductImage } from "./shared/entities/product-image-entity";
import { RefundItem } from "./shared/entities/refund-item-entity";
import { RefundRequest } from "./shared/entities/refund-request-entity";
import { Review } from "./shared/entities/review-entity";
import { SellerProfile } from "./shared/entities/seller-profile-entity";
import { SellerShop } from "./shared/entities/seller-shop-entity";
import { ShippingMethod } from "./shared/entities/shipping-method-entity";
import { ShippingRate } from "./shared/entities/shipping-rate-entity";
import { ShippingZone } from "./shared/entities/shipping-zone-entity";
import { StorePolicy } from "./shared/entities/store-policy-entity";
import { TaxInformation } from "./shared/entities/tax-information-entity";
import { User } from "./shared/entities/user-entity";
import { Wishlist } from "./shared/entities/wishlist-entity";
import { WishlistItem } from "./shared/entities/wishlist-item-entity";
import { AuthModule } from "./modules/auth/auth.module";
import { MailModule } from "./modules/mail/mail.module";
import { format, transports } from "winston";
import { WinstonModule } from "nest-winston";
import bullConfig from "./config/bull-config";

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: "en",
      loaderOptions: {
        path: join(__dirname, "./i18n/"),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ["lang", "locale"] },
        AcceptLanguageResolver,
      ],
      typesOutputPath: join(__dirname, "..", "src/generated/i18n.generated.ts"),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        bullConfig,
        cloudinaryConfig,
        databaseConfig,
        emailConfig,
        jwtConfig,
        rateLimitConfig,
        redisConfig,
        stripeConfig,
        swaggerConfig,
        uploadConfig,
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("database.host"),
        port: configService.get<number>("database.port"),
        username: configService.get<string>("database.username"),
        password: configService.get<string>("database.password"),
        database: configService.get<string>("database.name"),
        entities: [
          Address,
          BankAccount,
          Cart,
          CartItem,
          Category,
          Coupon,
          CouponUsage,
          Inventory,
          Order,
          OrderItem,
          PaymentMethod,
          Product,
          ProductVariant,
          ProductVariantOption,
          ProductImage,
          RefundItem,
          RefundRequest,
          Review,
          SellerProfile,
          SellerShop,
          ShippingMethod,
          ShippingRate,
          ShippingZone,
          StorePolicy,
          TaxInformation,
          User,
          Wishlist,
          WishlistItem,
        ],
        synchronize: true,
      }),
    }),
    WinstonModule.forRoot({
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.colorize(),
            format.printf(
              ({ level, message, timestamp }) =>
                `[${timestamp}] ${level}: ${message}`,
            ),
          ),
        }),
      ],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get<string>("redis.host"),
          port: config.get<number>("redis.port"),
          password: config.get<string>("redis.password"),
          tls: {
            rejectUnauthorized: false,
          },
        },
      }),
    }),
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
