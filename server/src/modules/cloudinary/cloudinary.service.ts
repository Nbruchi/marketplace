// src/shared/services/cloudinary/cloudinary.service.ts
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    const cloudinaryConfig = this.configService.get('cloudinary');
    
    cloudinary.config({
      cloud_name: cloudinaryConfig.cloudName,
      api_key: cloudinaryConfig.apiKey,
      api_secret: cloudinaryConfig.apiSecret,
      secure: true,
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    folder: string,
  ): Promise<{ url: string; publicId: string }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "auto",
          format: "webp",
          quality: "auto",
          fetch_format: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Upload error:", error);
            return reject(new Error("Failed to upload file to Cloudinary"));
          }
          if (!result) {
            return reject(new Error("No result from Cloudinary"));
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        },
      );

      const readableStream = new Readable();
      readableStream.push(file.buffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });
  }

  async deleteFile(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error("Error deleting file from Cloudinary:", error);
      throw new Error("Failed to delete file from Cloudinary");
    }
  }
}
