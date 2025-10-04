import * as express from "express";
import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./shared/filters/http-exception-filter";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Body parsers (before middleware)
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Global prefix early
  app.setGlobalPrefix(process.env.API_PREFIX || "api/v1");


  // CORS
  const corsOptions: CorsOptions = {
    origin: process.env.CORS_ORIGIN || true, // Fallback to allow all for dev
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept-Language",
    ], // Added for i18n
    credentials: true,
  };
  app.enableCors(corsOptions);

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

  // Swagger setup (conditional for prod)
  if (process.env.NODE_ENV !== "production") {
    const options = new DocumentBuilder()
      .setTitle("Marketplace Backend APIs")
      .setDescription(
        "Backend APIs documentation for Marketplace. Supports English (en) and Kinyarwanda (rw).",
      )
      .setVersion("1.0.0")
      .addBearerAuth(
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "Authorization",
          description: "Enter JWT token",
          in: "header",
        },
        "JWT-auth",
      ) // Named scheme for @ApiBearerAuth()
      .addServer(
        `http://localhost:${process.env.PORT || 6000}${process.env.API_PREFIX ? `/${process.env.API_PREFIX}` : ""}`,
        "Development",
      )
      .build();

    const document = SwaggerModule.createDocument(app, options, {
      ignoreGlobalPrefix: false, // Include /api/v1 in path examples
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        `${controllerKey}_${methodKey}`,
    });

    // Your custom sorting (tags alpha, paths sorted)
    document.tags = (document.tags || []).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    document.paths = Object.keys(document.paths)
      .sort((a, b) => a.localeCompare(b))
      .reduce((acc, key) => {
        acc[key] = document.paths[key];
        return acc;
      }, {});

    // Setup at 'swagger' → Full UI: /api/v1/swagger-ui.html
    SwaggerModule.setup("swagger", app, document, {
      swaggerOptions: {
        persistAuthorization: true, // Keep JWT across tabs/refreshes
        tagsSorter: "alpha",
        operationsSorter: "method", // Group by HTTP method
        docExpansion: "none", // Collapse all by default
      },
      customCssUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css", // Optional: Custom theme
      customSiteTitle: "Marketplace API Docs",
    });
  }
}
bootstrap()
  .then(() => {
    const port = process.env.PORT;
    Logger.log(`Server started on http://localhost:${port}`);
  })
  .catch((error) => {
    Logger.error(`Failed to start server: ${error.message}`, error.stack);
    process.exit(1);
  });
