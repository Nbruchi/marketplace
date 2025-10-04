import { registerAs } from "@nestjs/config";

export default registerAs("upload", () => ({
  maxFileSize: process.env.MAX_FILE_SIZE,
  destination: process.env.UPLOAD_DEST,
}));
