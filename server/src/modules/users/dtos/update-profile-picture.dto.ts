import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UploadProfilePictureDto {
  @ApiProperty({
    description: "Image URL",
    example: "https://example.com/image.jpg",
  })
  @IsString()
  @IsNotEmpty({message:"Image is required"})
  image: string;
}
