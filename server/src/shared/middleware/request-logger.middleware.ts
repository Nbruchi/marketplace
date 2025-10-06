import { Injectable, NestMiddleware, Logger } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger("HTTP");

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get("User-Agent") || "";
    const startTime = Date.now();

    // Log incoming request
    this.logger.log(
      `Incoming Request: ${method} ${originalUrl} - ${ip} - ${userAgent}`,
      {
        method,
        url: originalUrl,
        ip,
        userAgent,
        body: this.sanitizeRequestBody(req.body),
        query: req.query,
        params: req.params,
        headers: this.sanitizeHeaders(req.headers),
      },
    );

    // Override res.json to log response
    const originalJson = res.json;
    res.json = function (body: any) {
      const duration = Date.now() - startTime;
      const statusCode = res.statusCode;

      // Log response
      const logLevel =
        statusCode >= 400 ? "error" : statusCode >= 300 ? "warn" : "log";
      const logMessage = `Outgoing Response: ${method} ${originalUrl} - ${statusCode} - ${duration}ms`;

      if (logLevel === "error") {
        this.logger.error(logMessage, {
          method,
          url: originalUrl,
          statusCode,
          duration,
          responseBody: body,
          ip,
          userAgent,
        });
      } else if (logLevel === "warn") {
        this.logger.warn(logMessage, {
          method,
          url: originalUrl,
          statusCode,
          duration,
          responseBody: body,
          ip,
          userAgent,
        });
      } else {
        this.logger.log(logMessage, {
          method,
          url: originalUrl,
          statusCode,
          duration,
          responseBody: this.sanitizeResponseBody(body),
          ip,
          userAgent,
        });
      }

      return originalJson.call(this, body);
    }.bind(res);

    next();
  }

  private sanitizeRequestBody(body: any): any {
    if (!body) return body;

    const sanitized = { ...body };

    // Remove sensitive fields
    const sensitiveFields = [
      "password",
      "token",
      "secret",
      "key",
      "authorization",
      "refreshToken",
    ];
    sensitiveFields.forEach((field) => {
      if (sanitized[field]) {
        sanitized[field] = "[REDACTED]";
      }
    });

    return sanitized;
  }

  private sanitizeResponseBody(body: any): any {
    if (!body) return body;

    const sanitized = { ...body };

    // Remove sensitive fields from response
    const sensitiveFields = [
      "password",
      "token",
      "secret",
      "key",
      "authorization",
      "refreshToken",
      "accessToken",
    ];
    sensitiveFields.forEach((field) => {
      if (sanitized[field]) {
        sanitized[field] = "[REDACTED]";
      }
    });

    return sanitized;
  }

  private sanitizeHeaders(headers: any): any {
    const sanitized = { ...headers };

    // Remove sensitive headers
    const sensitiveHeaders = ["authorization", "cookie", "x-api-key"];
    sensitiveHeaders.forEach((header) => {
      if (sanitized[header]) {
        sanitized[header] = "[REDACTED]";
      }
    });

    return sanitized;
  }
}
