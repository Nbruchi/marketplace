import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class RevokeRefreshTokenDto {
  @ApiProperty({
    description: "Refresh token to revoke (optional if deviceId provided)",
    required: false,
  })
  @IsOptional()
  @IsString()
  refreshToken?: string;

  @ApiProperty({
    description: "Device id to revoke (optional)",
    required: false,
  })
  @IsOptional()
  @IsString()
  deviceId?: string;
}
