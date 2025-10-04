import * as express from "express";
import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./shared/filters/http-exception-filter";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  const corsOptions: CorsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  };

  app.enableCors(corsOptions);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix(process.env.API_PREFIX as string);

  // Configure Swagger document
  const options = new DocumentBuilder()
    .setTitle("Marketplace Backend APIs")
    .setDescription("Backend APIs documentation for Marketplace.")
    .setVersion("1.0.0")
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    })
    .build();

  // Create document
  const document = SwaggerModule.createDocument(app, options);
  document.tags = (document.tags || []).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  document.paths = Object.keys(document.paths)
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc, key) => {
      acc[key] = document.paths[key];
      return acc;
    }, {});

  // Set up Swagger UI
  SwaggerModule.setup("api/v1/swagger-ui.html", app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT as string);
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
