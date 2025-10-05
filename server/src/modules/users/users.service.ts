import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "src/shared/entities/user-entity";
import { CompleteProfileDto } from "./dtos/complete-profile.dto";
import { UserQueryDto } from "./dtos/user-query.dto";
import { ChangePasswordDto } from "./dtos/change-password.dto";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@Injectable()
export class UsersService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  /**
   * Complete user profile with additional information
   */
  async completeProfile(
    userId: string,
    dto: CompleteProfileDto,
  ): Promise<User> {
    // Find the user
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Check if display name is already taken (if provided)
    if (dto.displayName) {
      const existingDisplayName = await this.userRepository.findOne({
        where: { displayName: dto.displayName },
      });

      if (existingDisplayName && existingDisplayName.id !== userId) {
        throw new BadRequestException("Display name already taken");
      }
    }

    // Update the last profile update time
    user.activity = {
      ...user.activity,
      lastProfileUpdate: new Date(),
    };

    // Only update the fields that are provided in the DTO
    if (dto.displayName !== undefined) {
      user.displayName = dto.displayName;
    }

    if (dto.phoneNumber !== undefined) {
      user.phoneNumber = dto.phoneNumber;
    }

    if (dto.gender !== undefined) {
      user.gender = dto.gender;
    }

    if (dto.dateOfBirth !== undefined) {
      user.dateOfBirth = new Date(dto.dateOfBirth);
    }

    // Save updated user
    return await this.userRepository.save(user);
  }

  /**
   * Get user profile by ID
   */
  async getUserProfile(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [
        "addresses",
        "defaultShippingAddress",
        "defaultBillingAddress",
      ],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  /**
   * Find users with pagination, filtering, and sorting
   */
  /**
   * Change user password
   */
  async changePassword(userId: string, dto: ChangePasswordDto): Promise<void> {
    // Verify new passwords match
    if (dto.newPassword !== dto.confirmNewPassword) {
      throw new BadRequestException("New passwords do not match");
    }

    // Find the user
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ["id", "password", "activity"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      dto.currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Current password is incorrect");
    }

    // Check if new password is different from current password
    const isSamePassword = await bcrypt.compare(dto.newPassword, user.password);

    if (isSamePassword) {
      throw new BadRequestException(
        "New password must be different from current password",
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(dto.newPassword, this.SALT_ROUNDS);

    // Update user password and related fields
    await this.userRepository.update(
      { id: userId },
      {
        password: hashedPassword,
        passwordResetToken: undefined,
        passwordResetExpires: undefined,
        activity: {
          ...user.activity,
          lastPasswordChange: new Date(),
        },
      },
    );
  }

  /**
   * Find users with pagination, filtering, and sorting
   */
  async findUsers(query: UserQueryDto) {
    const { limit, skip, search, role, status } = query;

    // Start building the query
    const queryBuilder = this.userRepository.createQueryBuilder("user");

    // Apply role filter if provided
    if (role) {
      queryBuilder.andWhere("user.role = :role", { role });
    }

    // Apply status filter if provided
    if (status) {
      queryBuilder.andWhere("user.status = :status", { status });
    }

    // Apply search term if provided
    if (search) {
      queryBuilder.andWhere(
        "(user.email LIKE :search OR user.phoneNumber LIKE :search OR user.displayName LIKE :search OR user.fullNames LIKE :search)",
        { search: `%${search}%` },
      );
    }

    // Apply sorting
    const order = {};
    order[`user.${query.sortBy}`] = query.sortOrder;
    queryBuilder.orderBy(order);

    // Apply pagination
    queryBuilder.skip(skip).take(limit);

    // Execute the query
    const [items, total] = await queryBuilder.getManyAndCount();

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = skip + limit < total;
    const hasPreviousPage = skip > 0;

    return {
      data: items,
      meta: {
        total,
        page: query.page,
        limit,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    };
  }

  async updateProfilePicture(
    userId: string,
    file: Express.Multer.File,
  ): Promise<{ profilePicture: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Upload new profile picture
    const { url, publicId } = await this.cloudinaryService.uploadFile(
      file,
      `marketplace/users/profile`,
    );

    // Delete old profile picture if exists
    if (user.profilePicturePublicId) {
      try {
        await this.cloudinaryService.deleteFile(user.profilePicturePublicId);
      } catch (error) {
        console.error("Error deleting old profile picture:", error);
      }
    }

    // Update user with new profile picture
    user.profileImage = url;
    user.profilePicturePublicId = publicId;
    user.activity = {
      ...user.activity,
      lastProfileUpdate: new Date(),
    };

    await this.userRepository.save(user);

    return { profilePicture: url };
  }

  async removeProfilePicture(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (user.profilePicturePublicId) {
      try {
        await this.cloudinaryService.deleteFile(user.profilePicturePublicId);
      } catch (error) {
        console.error("Error deleting profile picture:", error);
      }

      user.profileImage = "";
      user.profilePicturePublicId = "";
      user.activity = {
        ...user.activity,
        lastProfileUpdate: new Date(),
      };

      await this.userRepository.save(user);
    }
  }
}
