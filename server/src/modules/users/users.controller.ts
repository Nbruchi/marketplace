import { UsersService } from "./users.service";
import { User } from "src/shared/entities/user-entity";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { CompleteProfileDto } from "./dtos/complete-profile.dto";
import { UserQueryDto, UserRole } from "./dtos/user-query.dto";
import { ChangePasswordDto } from "./dtos/change-password.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiQuery,
} from "@nestjs/swagger";
import {
  Controller,
  Get,
  Body,
  Patch,
  UseGuards,
  Query,
  ValidationPipe,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Post,
} from "@nestjs/common";
import { CurrentUser } from "src/shared/decorators/current-user.decorator";
import { UserRole as UserRoleEnum } from "src/shared/enums/user-enums";
import { Roles } from "src/shared/decorators/roles.decorator";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("Users")
@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get a paginated list of customers
   */
  @Get("customers")
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.SELLER)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get paginated list of customers",
    description:
      "Retrieve a paginated list of customers with filtering and sorting options",
  })
  @ApiOkResponse({ description: "Returns a paginated list of customers" })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String })
  @ApiQuery({
    name: "status",
    required: false,
    enum: Object.values(UserRoleEnum),
  })
  @ApiQuery({
    name: "sortBy",
    required: false,
    enum: ["createdAt", "updatedAt", "email"],
  })
  @ApiQuery({ name: "sortOrder", required: false, enum: ["ASC", "DESC"] })
  async getCustomers(
    @Query(new ValidationPipe({ transform: true })) query: UserQueryDto,
  ) {
    // Force the role to be CUSTOMER
    query.role = UserRole.CUSTOMER;
    return this.usersService.findUsers(query);
  }

  /**
   * Get a paginated list of users sellers
   */
  @Patch("change-password")
  @ApiOperation({
    summary: "Change user password",
    description: "Change the password for the currently authenticated user",
  })
  @ApiOkResponse({ description: "Password changed successfully" })
  @ApiBearerAuth()
  async changePassword(
    @CurrentUser() user: User,
    @Body() dto: ChangePasswordDto,
  ) {
    await this.usersService.changePassword(user.id, dto);
    return { message: "Password changed successfully" };
  }

  @Get("staff")
  @Roles(UserRoleEnum.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get paginated list of staff members",
    description:
      "Retrieve a paginated list of staff (admins and sellers) with filtering and sorting options",
  })
  @ApiOkResponse({ description: "Returns a paginated list of staff members" })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String })
  @ApiQuery({
    name: "role",
    required: false,
    enum: [UserRoleEnum.SELLER],
    description: "Filter by staff role (SELLER)",
  })
  @ApiQuery({
    name: "status",
    required: false,
    enum: Object.values(UserRoleEnum),
  })
  @ApiQuery({
    name: "sortBy",
    required: false,
    enum: ["createdAt", "updatedAt", "email"],
  })
  @ApiQuery({ name: "sortOrder", required: false, enum: ["ASC", "DESC"] })
  async getStaff(
    @Query(new ValidationPipe({ transform: true })) query: UserQueryDto,
  ) {
    query.role = UserRole.SELLER;
    return this.usersService.findUsers(query);
  }

  /**
   * Update/complete user profile
   */
  @Patch("profile/complete")
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Complete user profile",
    description:
      "Complete user profile with additional information after registration. This is typically used for onboarding.",
  })
  async completeProfile(
    @CurrentUser() user: User,
    @Body() completeProfileDto: CompleteProfileDto,
  ) {
    return this.usersService.completeProfile(user.id, completeProfileDto);
  }

  /**
   * Get current user's profile
   */
  @Get("profile")
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get current user profile",
    description: "Retrieve the authenticated user's profile information",
  })
  async getProfile(@CurrentUser() user: User) {
    return this.usersService.getUserProfile(user.id);
  }

  /**
   * Upload current user's profile picture
   */
  @Post("profile/picture")
  @ApiOperation({
    summary: "Upload profile picture",
    description: "Upload or update the authenticated user profile picture",
  })
  @ApiOkResponse({
    description: "Profile picture updated successfully",
    type: () => ({ profilePicture: String }),
  })
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor("file"))
  async uploadProfilePicture(
    @CurrentUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }
    return this.usersService.updateProfilePicture(user.id, file);
  }

  /**
   * Remove current user's profile picture
   */
  @Delete("profile/picture")
  @ApiOperation({
    summary: "Remove profile picture",
    description: "Remove the authenticated user profile picture",
  })
  @ApiOkResponse({ description: "Profile picture removed successfully" })
  @ApiBearerAuth()
  async removeProfilePicture(@CurrentUser() user: User) {
    await this.usersService.removeProfilePicture(user.id);
    return { message: "Profile picture removed successfully" };
  }
}
