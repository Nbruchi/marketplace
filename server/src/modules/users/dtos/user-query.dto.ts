import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";
import {
  UserRole,
  UserRole as UserRoleEnum,
  UserStatus,
} from "src/shared/enums/user-enums";

export { UserRoleEnum as UserRole };
import { Transform } from "class-transformer";

export enum UserSortField {
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  DISPLAY_NAME = "displayName",
  EMAIL = "email",
  ROLE = "role",
  STATUS = "status",
}

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export class UserQueryDto {
  @ApiPropertyOptional({
    description: "Page number (1-based)",
    minimum: 1,
    default: 1,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional({
    description: "Number of items per page",
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @Min(1)
  @IsOptional()
  limit: number = 10;

  @ApiPropertyOptional({
    description:
      "Search term (searches in email, firstName, lastName, displayName, phoneNumber)",
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    description: "Filter by user role",
    enum: UserRole,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiPropertyOptional({
    description: "Filter by user status",
    enum: UserStatus,
  })
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;

  @ApiPropertyOptional({
    description: "Field to sort by",
    enum: UserSortField,
    default: UserSortField.CREATED_AT,
  })
  @IsEnum(UserSortField)
  @IsOptional()
  sortBy: UserSortField = UserSortField.CREATED_AT;

  @ApiPropertyOptional({
    description: "Sort order",
    enum: SortOrder,
    default: SortOrder.DESC,
  })
  @IsEnum(SortOrder)
  @IsOptional()
  sortOrder: SortOrder = SortOrder.DESC;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  get order(): Record<string, "ASC" | "DESC"> {
    return { [this.sortBy]: this.sortOrder };
  }
}
