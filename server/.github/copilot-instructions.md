This repository is a NestJS backend for a multi-vendor marketplace. The goal of these instructions is to help AI coding agents become productive quickly by highlighting the project's structure, conventions, and the exact files and environment variables to consult.

- Runtime & scripts
  - Use package.json scripts in the project root:
    - `pnpm/ npm run start:dev` — starts Nest in watch mode (development).
    - `npm run build` — runs `nest build` to compile to `dist/`.
    - `npm run start:prod` — runs `node dist/main` for production.
    - Tests: `npm test`, `npm run test:e2e` (see `test/jest-e2e.json`).

- Entry points and wiring
  - `src/main.ts` — bootstraps Nest, sets global prefix from `process.env.API_PREFIX` (default `api/v1`), validation pipe, global exception filter, CORS, and Swagger (`api/v1/swagger-ui.html`). Look here for request-level middleware, pipe, and filter decisions.
  - `src/app.module.ts` — central module that registers ConfigModule, TypeORM entities, Winson logging, Bull (jobs), and imports feature modules like `modules/auth` and `modules/mail`.

- Configuration & important env keys
  - Config files live under `src/config/*` and are mounted with `ConfigModule.forRoot({ load: [...] })`. They expose the exact env keys used by the app. Key files and example env variables:
    - `config/app-config.ts` — PORT, API_PREFIX, APP_URL, CORS_ORIGIN
    - `config/database-config.ts` — DATABASE_URL or DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME
    - `config/jwt-config.ts` — ACCESS_TOKEN_SECRET / EXPIRES_IN, REFRESH_TOKEN_SECRET / EXPIRES_IN
    - `config/redis-config.ts` / `bull-config.ts` — REDIS_URL or REDIS_HOST, REDIS_PORT, REDIS_PASSWORD
    - `config/cloudinary-config.ts` — CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
    - `config/email-config.ts` — SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM

- Data model and TypeORM
  - Entities are under `src/shared/entities/*`. `app.module.ts` registers them explicitly in `TypeOrmModule.forRootAsync`. Many modules rely on these entities (Product, User, Order, Cart, etc.). Note: `synchronize: true` is enabled — schema migrations are not used here, so be careful with production changes.

- Authentication & Authorization
  - `modules/auth` contains controllers, services, and DTOs. The project uses `@nestjs/jwt` and Passport JWT strategy (see `shared/strategies/jwt-strategy.ts`) and role-guards (`shared/guards/roles-guard.ts`) and decorators under `shared/decorators/*` (for current user and roles). Look at those when adding new protected endpoints.

- Background jobs and caching
  - Bull is configured in `app.module.ts` and `src/config/bull-config.ts` to use Redis. Jobs (queues) live in feature modules — search `@Process`, `@Processor` or `BullModule.registerQueue` usages when adding jobs.
  - Redis is also used for caching and rate limiting via `@nestjs/cache-manager` and `@nestjs/throttler` (inspect module imports where used).

- Logging, errors, and validation
  - Winston is set up in `app.module.ts` via `nest-winston`; use existing logger patterns when adding logs.
  - `src/shared/filters/http-exception-filter.ts` is the global filter — prefer throwing Nest `HttpException` subclasses to allow consistent HTTP error formatting.
  - Global `ValidationPipe` uses `whitelist: true` and `forbidNonWhitelisted: true` — DTOs must explicitly declare accepted fields.

- Project-specific patterns & gotchas
  - Config via `@nestjs/config` registers named configs (e.g., `registerAs('jwt', ...)`). Use `ConfigService.get<string>('jwt.accessToken.secret')` or inject specific config where needed.
  - Entities are imported by class reference in `app.module.ts` rather than a glob. When adding an entity, update `app.module.ts` entities array or register via TypeORM module in the feature module.
  - `synchronize: true` in TypeORM means schema changes apply automatically — do not assume migrations exist.
  - API path sorting and Swagger manipulation happen in `main.ts` (document paths sorted and tags sorted) — when adding controllers, expect Swagger output ordering.

- Where to look first for common tasks (examples)
  - Add new protected endpoint: `modules/<feature>/<feature>.controller.ts` -> update DTOs in `modules/<feature>/dtos` -> use `shared/decorators/current-*-decorator.ts` and `shared/guards/roles-guard.ts` for auth.
  - Add a new entity: create under `src/shared/entities`, add class to the entities list in `src/app.module.ts`, and create a repository/service that uses `@InjectRepository(Entity)`.
  - Add a job processor: create a processor in the relevant module and register the queue with `BullModule.registerQueue({ name: 'my-queue' })`.

If anything in this file is unclear or you'd like me to expand sections (example code snippets, env template, or CI setup), tell me which area to expand and I will iterate.
