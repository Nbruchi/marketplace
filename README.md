<p align="center">
  <a href="https://nextjs.org/" target="_blank">
    <img src="https://raw.githubusercontent.com/vercel/next.js/canary/packages/next/next-logo.svg" width="120" alt="Next.js Logo" />
  </a>
  <h2 align="center">MarketPlace — Fullstack (Client + API)</h2>
  <p align="center">A multi-vendor e-commerce platform: Next.js frontend and NestJS backend (TypeORM + PostgreSQL)</p>
</p>

<p align="center">
  <a href="https://nextjs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Next.js-13%2B-black?logo=next.js&logoColor=white" alt="Next.js" />
  </a>
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white" alt="NestJS" />
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-4.0+-blue.svg" alt="TypeScript" />
  </a>
  <a href="https://www.postgresql.org/" target="_blank">
    <img src="https://img.shields.io/badge/PostgreSQL-13+-336791?logo=postgresql" alt="PostgreSQL" />
  </a>
</p>

## 📋 Table of Contents

-   [Features](#-features)
-   [Tech Stack](#-tech-stack)
-   [Getting Started](#-getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Environment Variables](#environment-variables)
    -   [Database Setup](#database-setup)
    -   [Running the App](#running-the-app)
-   [Project Structure](#-project-structure)
-   [API Documentation](#-api-documentation)
-   [Testing](#-testing)
-   [Deployment](#-deployment)
-   [Contributing](#-contributing)
-   [License](#-license)

## ✨ Features

### 🔐 Authentication & Authorization

<p align="left">
  <img src="https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/RBAC-000000?style=flat&logo=lock&logoColor=white" alt="RBAC" />
  <img src="https://img.shields.io/badge/OAuth2-4285F4?style=flat&logo=google&logoColor=white" alt="OAuth2" />
  <img src="https://img.shields.io/badge/2FA-000000?style=flat&logo=google-authenticator&logoColor=white" alt="2FA" />
</p>
- 🔒 JWT-based authentication with refresh tokens
- 👥 Role-based access control (Admin, Seller, Customer)
- ✉️ Email verification and password reset flow
- 🌐 Social login integration (Google, Facebook)

### 🛍️ E-commerce Core

<p align="left">
  <img src="https://img.shields.io/badge/Multi--Vendor-FF9900?style=flat&logo=amazon&logoColor=white" alt="Multi-Vendor" />
  <img src="https://img.shields.io/badge/Catalog-FF9900?style=flat&logo=amazon&logoColor=white" alt="Catalog" />
  <img src="https://img.shields.io/badge/Inventory-FF9900?style=flat&logo=inventory&logoColor=white" alt="Inventory" />
  <img src="https://img.shields.io/badge/Reviews-FF9900?style=flat&logo=stars&logoColor=white" alt="Reviews" />
</p>
- 🏬 Multi-vendor marketplace support
- 📚 Comprehensive product catalog with categories and attributes
- 🔄 Advanced product variations and options
- 📦 Inventory and stock management
- ⭐ Product reviews and ratings system

### 🏪 Seller Features

<p align="left">
  <img src="https://img.shields.io/badge/Dashboard-FF9900?style=flat&logo=shopify&logoColor=white" alt="Dashboard" />
  <img src="https://img.shields.io/badge/Analytics-FF9900?style=flat&logo=google-analytics&logoColor=white" alt="Analytics" />
  <img src="https://img.shields.io/badge/Orders-FF9900?style=flat&logo=shopping-bag&logoColor=white" alt="Orders" />
  <img src="https://img.shields.io/badge/Refunds-FF9900?style=flat&logo=refresh-ccw&logoColor=white" alt="Refunds" />
</p>
- 👔 Complete seller profile management
- 🏬 Multi-shop support per seller
- 🎨 Custom storefront configuration
- 📊 Sales analytics and reporting
- 📦 Order management and fulfillment
- 🔄 Refund and return processing

### 🛒 Shopping Experience

<p align="left">
  <img src="https://img.shields.io/badge/Cart-FF9900?style=flat&logo=shopping-cart&logoColor=white" alt="Cart" />
  <img src="https://img.shields.io/badge/Wishlist-FF9900?style=flat&logo=heart&logoColor=white" alt="Wishlist" />
  <img src="https://img.shields.io/badge/Discounts-FF9900?style=flat&logo=tag&logoColor=white" alt="Discounts" />
  <img src="https://img.shields.io/badge/Search-FF9900?style=flat&logo=search&logoColor=white" alt="Search" />
</p>
- 🛍️ Shopping cart with guest checkout
- 💝 Wishlist functionality
- 🏷️ Coupon and discount system
- 🔍 Product search and filtering
- 🔄 Related products and recommendations

### 💳 Payments

<p align="left">
  <img src="https://img.shields.io/badge/Stripe-008CDD?style=flat&logo=stripe&logoColor=white" alt="Stripe" />
  <img src="https://img.shields.io/badge/Payments-008CDD?style=flat&logo=credit-card&logoColor=white" alt="Payments" />
  <img src="https://img.shields.io/badge/Payouts-008CDD?style=flat&logo=cash&logoColor=white" alt="Payouts" />
  <img src="https://img.shields.io/badge/Webhooks-008CDD?style=flat&logo=webhooks&logoColor=white" alt="Webhooks" />
</p>
- 💳 Secure payment processing with Stripe
<p align="center">
  <a href="https://nextjs.org/" target="_blank">
    <img src="https://raw.githubusercontent.com/vercel/next.js/canary/packages/next/next-logo.svg" width="120" alt="Next.js Logo" />
  </a>
  <h2 align="center">MarketPlace — Fullstack (Client + API)</h2>
  <p align="center">A multi-vendor e-commerce platform: a Next.js frontend and a NestJS backend (TypeORM + PostgreSQL)</p>
</p>

## Table of Contents

-   [Overview](#overview)
-   [Tech Stack](#tech-stack)
-   [Quick Start](#quick-start)
    -   [Prerequisites](#prerequisites)
    -   [Run the Server (API)](#run-the-server-api)
    -   [Run the Client (Frontend)](#run-the-client-frontend)
    -   [Run Both Locally](#run-both-locally)
-   [Project Structure](#project-structure)
-   [Environment variables](#environment-variables)
-   [Testing & Linting](#testing--linting)
-   [Resources](#resources)

## Overview

This repository contains two top-level apps:

-   `client/` — a Next.js (App Router) React frontend using TypeScript and Tailwind.
-   `server/` — a NestJS backend API built with TypeScript, TypeORM, and PostgreSQL.

They can be run independently or together for local development. Below are quick, copy-ready steps to get both running.

## Tech Stack

-   Frontend: Next.js, React, TypeScript, Tailwind CSS
-   Backend: NestJS, TypeScript, TypeORM, PostgreSQL, Redis (optional)
-   Dev tools: PNPM, Docker, Jest, ESLint, Prettier

## Quick Start

### Prerequisites

-   Node.js v18+
-   PNPM
-   PostgreSQL
-   Redis (optional, used by the server)
-   Docker & Docker Compose (optional)

### Run the Server (API)

1. Open a terminal and change to the `server/` directory:

```bash
cd server
pnpm install
```

2. Create environment file and configure DB credentials (copy from example if present):

```bash
cp .env.example .env
# then edit .env to set database, redis, and other secrets
```

3. Start the server in development mode (default port 3000):

```bash
pnpm run start:dev
```

The API should be reachable at http://localhost:3000. The server console will also print the Swagger/OpenAPI URL when available.

### Run the Client (Frontend)

1. Open a new terminal and change to the `client/` directory:

```bash
cd client
pnpm install
```

2. Configure the client to talk to the API. Create `.env.local` in `client/` and set the API base URL (example):

```bash
# in client/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Start the Next.js dev server. To avoid port conflicts with the backend, run the frontend on port 3001:

```bash
PORT=3001 pnpm run dev
```

The web app will be available at http://localhost:3001.

### Run Both Locally

Start the server (port 3000) then the client (port 3001). If you prefer Docker, consult any `docker-compose.yml` in the repo (top-level or inside `server/`) to start required services (Postgres, Redis) and the apps.

## Project Structure

-   client/ — Next.js frontend (App Router, TypeScript, Tailwind)

    -   app/ — Next.js app folder
    -   components/ — React components and UI primitives
    -   public/ — static assets
    -   package.json — frontend scripts & deps

-   server/ — NestJS backend
    -   src/ — Nest application source
    -   src/modules — feature modules
    -   package.json — backend scripts & deps
    -   README.md — server-specific instructions (if present)

## Environment variables

-   `server/.env` — database, redis, JWT secrets, third-party API keys. Copy from `server/.env.example` when present.
-   `client/.env.local` — frontend-specific variables (e.g. NEXT_PUBLIC_API_URL).

Ports used by default:

-   Server API: 3000
-   Client (Next.js): 3001 (recommended when running alongside server)

## Testing & Linting

-   Backend tests (in `server/`) typically run with:

```bash
cd server
pnpm test
```

-   Frontend tests (in `client/`) run with:

```bash
cd client
pnpm test
```

Run linters and formatters with `pnpm lint` / `pnpm format` inside each project if scripts are defined.

## Resources

-   NestJS: https://docs.nestjs.com/
-   Next.js: https://nextjs.org/docs
-   TypeORM: https://typeorm.io/
-   PostgreSQL: https://www.postgresql.org/docs/

---

If you'd like, I can also:

-   Add example `docker-compose.yml` to orchestrate Postgres + Redis + both apps locally.
-   Add a root-level `Makefile` or task scripts to start both projects with a single command.
-   Commit this README update for you.
