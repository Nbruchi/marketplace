import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RefreshTokenDto {
  @ApiProperty({ description: "Refresh token", example: "<jwt-refresh-token>" })
  @IsString()
  refreshToken: string;
}
