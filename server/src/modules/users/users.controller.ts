import { UsersService } from "./users.service";
import { User } from "src/shared/entities/user-entity";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth-guard";
import { CompleteProfileDto } from "./dtos/complete-profile.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Body, Patch, UseGuards } from "@nestjs/common";
import { CurrentCustomer } from "src/shared/decorators/current-customer-decorator";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch("profile/complete")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Complete user profile",
    description:
      "Complete user profile with additional information after registration. This is typically used for onboarding.",
  })
  async completeProfile(
    @CurrentCustomer() user: User,
    @Body() completeProfileDto: CompleteProfileDto,
  ) {
    return this.usersService.completeProfile(user.id, completeProfileDto);
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get current user profile",
    description: "Retrieve the authenticated user's profile information",
  })
  async getProfile(@CurrentCustomer() user: User) {
    return this.usersService.getUserProfile(user.id);
  }
}
