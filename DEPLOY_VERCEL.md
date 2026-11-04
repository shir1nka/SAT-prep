# Deploy To Vercel

## 1. Push the project to GitHub

Push the whole repository, but when creating the Vercel project set:

- `Root Directory`: `sat-prep`

## 2. Create a PostgreSQL database

Use a hosted PostgreSQL provider such as:

- Neon
- Supabase
- Prisma Postgres

Recommended choice for this project:

- Neon

Set:

- `DATABASE_URL` to the pooled connection string
- `DIRECT_URL` to the direct connection string

## 3. Add Vercel environment variables

Set these in Vercel Project Settings -> Environment Variables:

```env
DATABASE_URL=
DIRECT_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
ADMIN_EMAILS=dierahodzaeva28@gmail.com
```

Recommended values:

- `NEXTAUTH_URL=https://your-project-name.vercel.app`
- `NEXTAUTH_SECRET` should be a long random secret
- `ADMIN_EMAILS` can be one email or a comma-separated list
- `DATABASE_URL` should start with `postgresql://`
- `DIRECT_URL` should also start with `postgresql://`

## 4. Configure Google OAuth

In Google Cloud Console add:

- Authorized JavaScript origin:
  `https://your-project-name.vercel.app`
- Authorized redirect URI:
  `https://your-project-name.vercel.app/api/auth/callback/google`

If you use a custom domain later, add it there too.

## 5. Deploy

The repository already includes `vercel.json`, so Vercel will use:

```bash
npm run vercel-build
```

That will:

1. generate Prisma Client
2. apply Prisma migrations
3. build the Next.js app

## 6. Seed questions after deploy

After the first deploy:

1. sign in with an admin email from `ADMIN_EMAILS`
2. open the admin area
3. trigger the protected seed flow to populate questions

## Notes

- This project is now prepared for PostgreSQL, not SQLite.
- If you use Neon, copy both the pooled connection string and the direct connection string from the Neon dashboard.
- Do not commit `.env`.
- If you change the production URL, update both `NEXTAUTH_URL` and Google OAuth settings.
