# SAT Prep

Next.js SAT prep platform with:

- email/password and Google sign-in
- protected practice and stats
- admin review tools
- bilingual RU/EN interface
- school-foundation learning hub for grades 7-11

## Local development

1. Copy `.env.example` to `.env`
2. Set `DATABASE_URL` to a pooled PostgreSQL connection string
3. Set `DIRECT_URL` to the direct PostgreSQL connection string for Prisma migrations
4. Run:

```bash
npm install
npm run db:generate
npm run dev
```

If your database is empty, apply the schema first:

```bash
npm run db:migrate:deploy
```

## Vercel deployment

This project is prepared for Vercel with PostgreSQL and Prisma migrations.

Recommended provider:

- Neon

Important:

- set the Vercel project `Root Directory` to `sat-prep`
- add the environment variables from `.env.example`
- for hosted Postgres providers that offer both pooled and direct connections:
  - `DATABASE_URL` = pooled connection
  - `DIRECT_URL` = direct connection
- make sure `NEXTAUTH_URL` matches your Vercel production URL
- add the same production URL to Google OAuth callbacks

Vercel will run:

```bash
npm run vercel-build
```

That command generates Prisma Client, applies Prisma migrations, and builds Next.js.

## Seeding questions

Practice questions can be added after deployment by using the protected admin seed flow already built into the app.
