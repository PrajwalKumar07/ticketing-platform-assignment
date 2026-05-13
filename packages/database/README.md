# Database Package

Shared database package using Drizzle ORM.

## Setup

1. Copy `.env.example` to `.env` and configure your DATABASE_URL
2. Define your schema in `src/schema.ts`
3. Generate migrations: `pnpm db:generate`
4. Apply migrations: `pnpm db:migrate`

## Scripts

- `pnpm db:generate` - Generate migrations from schema
- `pnpm db:migrate` - Apply migrations
- `pnpm db:push` - Push schema without migrations (dev only)
- `pnpm db:studio` - Open Drizzle Studio
- `pnpm db:seed` - Run seed script

## Resources

- [Drizzle Docs](https://orm.drizzle.team/docs/overview)
- [PostgreSQL Column Types](https://orm.drizzle.team/docs/column-types/pg)
- [Drizzle Queries](https://orm.drizzle.team/docs/rqb)
