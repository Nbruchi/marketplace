import { registerAs } from "@nestjs/config";

export default registerAs("swagger", () => ({
  title: "Marketplace Backend API",
  description: "API documentation for E-commerce multi-vendor platform",
  version: "1.0",
  path: "/api/v1",
}));
