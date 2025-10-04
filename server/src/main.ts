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

  // Build Swagger docs but guard any errors so they don't stop the server
  try {
    const options = new DocumentBuilder()
      .setTitle("Marketplace Backend APIs")
      .setDescription("Backend APIs documentation for Marketplace.")
      .setVersion("1.0.0")
      .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT" })
      .build();

    const document = SwaggerModule.createDocument(app, options);
    document.tags = (document.tags || []).sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    if (document.paths) {
      document.paths = Object.keys(document.paths)
        .sort((a, b) => a.localeCompare(b))
        .reduce((acc, key) => {
          acc[key] = document.paths[key];
          return acc;
        }, {} as any);
    }

    SwaggerModule.setup("api/v1/swagger-ui.html", app, document);
  } catch (err) {
    // Don't let swagger generation prevent app startup
    Logger.warn(
      `Swagger setup failed: ${err instanceof Error ? err.message : err}`,
    );
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
