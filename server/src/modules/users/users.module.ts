import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "src/shared/entities/user-entity";
import { Address } from "src/shared/entities/address-entity";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";

@Module({
  imports: [TypeOrmModule.forFeature([User, Address]), CloudinaryModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
