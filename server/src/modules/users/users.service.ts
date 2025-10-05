import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/shared/entities/user-entity';
import { CompleteProfileDto } from './dtos/complete-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
      throw new NotFoundException('User not found');
    }

    // Check if display name is already taken (if provided)
    if (dto.displayName) {
      const existingDisplayName = await this.userRepository.findOne({
        where: { displayName: dto.displayName },
      });

      if (existingDisplayName && existingDisplayName.id !== userId) {
        throw new BadRequestException('Display name already taken');
      }
    }

    // Update user profile
    Object.assign(user, {
      ...dto,
      dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : user.dateOfBirth,
      activity: {
        ...user.activity,
        lastProfileUpdate: new Date(),
      },
    });

    // Save updated user
    return await this.userRepository.save(user);
  }

  /**
   * Get user profile by ID
   */
  async getUserProfile(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['addresses', 'defaultShippingAddress', 'defaultBillingAddress'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
