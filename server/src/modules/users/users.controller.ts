import { UsersService } from "./users.service";
import { User } from "src/shared/entities/user-entity";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { ChangePasswordDto } from "./dtos/change-password.dto";
import { CreateAddressDto } from "./dtos/create-address.dto";
import { UpdateAddressDto } from "./dtos/update-address.dto";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";
import { Roles } from "src/shared/decorators/roles.decorator";
import { UserQueryDto, UserRole } from "./dtos/user-query.dto";
import { Query } from "@nestjs/common";

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from "@nestjs/swagger";
import { UpdateProfileDto } from "./dtos/update-profile.dto";

@ApiTags("users")
@Controller("users")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  @ApiOperation({ summary: "Get all users (Admin and sellers only)" })
  @ApiOkResponse({ description: "List of all users" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getUsers(@Query() query: UserQueryDto) {
    return this.usersService.findUsers(query);
  }

  @Get("sellers")
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Get all sellers (Admin only)" })
  @ApiOkResponse({ description: "List of all sellers" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getSellers(@Query() query: UserQueryDto) {
    query.role = UserRole.SELLER;
    return this.usersService.findUsers(query);
  }

  @Get("profile")
  @ApiOperation({ summary: "Get current user profile" })
  @ApiOkResponse({ description: "User profile retrieved successfully" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async getProfile(@CurrentUser() user: User) {
    return this.usersService.getUserProfile(user.id);
  }

  @Patch("profile")
  @ApiOperation({ summary: "Update user profile" })
  @ApiBody({ type: UpdateProfileDto })
  @ApiOkResponse({ description: "User profile updated successfully" })
  @ApiBadRequestResponse({ description: "Invalid input" })
  async updateProfile(
    @CurrentUser() user: User,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.completeProfile(user.id, updateProfileDto);
  }

  @Post("change-password")
  @ApiOperation({ summary: "Change user password" })
  @ApiBody({ type: ChangePasswordDto })
  @ApiOkResponse({ description: "Password changed successfully" })
  @ApiBadRequestResponse({ description: "Invalid current password" })
  async changePassword(
    @CurrentUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(user.id, changePasswordDto);
  }

  // Address endpoints
  @Post("addresses")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Add a new address" })
  @ApiBody({ type: CreateAddressDto })
  @ApiCreatedResponse({ description: "Address added successfully" })
  async addAddress(
    @CurrentUser() user: User,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.usersService.createAddress(user.id, createAddressDto);
  }

  @Get("addresses")
  @ApiOperation({ summary: "Get all user addresses" })
  @ApiOkResponse({ description: "List of user addresses" })
  async getUserAddresses(@CurrentUser() user: User) {
    return this.usersService.getUserAddresses(user.id);
  }

  @Patch("addresses/:id")
  @ApiOperation({ summary: "Update an address" })
  @ApiBody({ type: UpdateAddressDto })
  @ApiOkResponse({ description: "Address updated successfully" })
  @ApiNotFoundResponse({ description: "Address not found" })
  async updateAddress(
    @CurrentUser() user: User,
    @Param("id") addressId: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.usersService.updateAddress(
      user.id,
      addressId,
      updateAddressDto,
    );
  }

  @Delete("addresses/:id")
  @ApiOperation({ summary: "Delete an address" })
  @ApiOkResponse({ description: "Address deleted successfully" })
  @ApiNotFoundResponse({ description: "Address not found" })
  async deleteAddress(
    @CurrentUser() user: User,
    @Param("id") addressId: string,
  ) {
    return this.usersService.deleteAddress(user.id, addressId);
  }

  @Post("profile/picture")
  @UseInterceptors(FileInterceptor("file"))
  @ApiOperation({ summary: "Upload profile picture" })
  @ApiResponse({
    status: 201,
    description: "Profile picture uploaded successfully",
  })
  @ApiResponse({ status: 400, description: "Invalid file type or size" })
  async uploadProfilePicture(
    @CurrentUser() user: User,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.usersService.updateProfilePicture(user.id, file);
  }

  @Delete("profile/picture")
  @ApiOperation({ summary: "Remove profile picture" })
  @ApiOkResponse({ description: "Profile picture removed successfully" })
  async removeProfilePicture(@CurrentUser() user: User) {
    return this.usersService.removeProfilePicture(user.id);
  }
}
