import * as express from "express";
import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./shared/filters/http-exception.filter";
import { RequestLoggerMiddleware } from "./shared/middleware/request-logger.middleware";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Body parsers (before middleware)
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  app.setGlobalPrefix("api/v1");

  // CORS
  const corsOptions: CorsOptions = {
    origin: "*", // Fallback to allow all for dev
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };

  app.enableCors(corsOptions);

  // Request logging middleware
  app.use(new RequestLoggerMiddleware().use);

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enhanced Swagger configuration
  try {
    Logger.log("Initializing Swagger documentation...");

    const config = new DocumentBuilder()
      .setTitle("Marketplace API Documentation")
      .setDescription(
        "Comprehensive API documentation for the Marketplace backend services",
      )
      .setVersion("1.0.0")
      .addBearerAuth(
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "JWT",
          description: "Enter JWT token",
          in: "header",
        },
        "JWT-auth", // This name should be used as the @ApiBearerAuth('JWT-auth') in controllers
      )
      .addServer(`http://localhost:${process.env.PORT || 3000}`, "Development")
      .build();

    const document = SwaggerModule.createDocument(app, config);

    // Sort tags alphabetically for better organization
    if (document.tags) {
      document.tags.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Sort paths for better readability
    if (document.paths) {
      const sortedPaths = {};
      Object.keys(document.paths)
        .sort()
        .forEach((key) => {
          sortedPaths[key] = document.paths[key];
        });
      document.paths = sortedPaths;
    }

    // Set up Swagger UI with custom options
    SwaggerModule.setup("api/docs", app, document, {
      explorer: true,
      swaggerOptions: {
        docExpansion: "list",
        filter: true,
        showRequestDuration: true,
        persistAuthorization: true,
      },
      customSiteTitle: "Marketplace API Documentation",
      customCss: `
        .swagger-ui .topbar { display: none }
        .swagger-ui .info { margin: 20px 0 }
        .swagger-ui .markdown p { margin: 0.5em 0 }
      `,
      customfavIcon: "https://marketplace.com/favicon.ico",
    });

    Logger.log(`Swagger documentation available at /api/docs`);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    Logger.error(`Failed to initialize Swagger: ${errorMessage}`, error?.stack);
    if (process.env.NODE_ENV === "development") {
      console.error("Detailed Swagger error:", error);
    }
  }

  // Parse port safely and await the listen call so bootstrap resolves/rejects correctly
  await app.listen(process.env.PORT!);
}

bootstrap()
  .then(() => {
    Logger.log(`Server started on http://localhost:${process.env.PORT!}`);
  })
  .catch((error) => {
    Logger.error(`Failed to start server: ${error}`);
    process.exit(1);
  });
