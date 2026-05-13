# API Application

## Setup Instructions

1. **Choose your backend framework:**
   - NestJS (preferred for this assignment)
   - Express.js
   - Fastify

2. **Install dependencies:**

   For NestJS:

```bash
   pnpm add @nestjs/common @nestjs/core @nestjs/platform-express reflect-metadata rxjs
   pnpm add -D @nestjs/cli @nestjs/schematics @nestjs/testing
```

For Express:

```bash
   pnpm add express cors dotenv
   pnpm add -D @types/express @types/cors @types/node
```

3. **Update package.json scripts** based on your chosen framework

4. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update with your database credentials

## Development

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Required Environment Variables

```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
PORT=3001
NODE_ENV=development
```
