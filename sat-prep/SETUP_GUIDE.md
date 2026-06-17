# SAT Prep - Comprehensive Guide

## 🚀 What's Included

### ✅ Core Features
- **Authentication**: Email/password + Google OAuth
- **Practice Mode**: Real SAT questions with instant feedback
- **Learning Hub**: Structured learning for grades 7-11
- **Progress Analytics**: Track your performance with detailed stats
- **Admin Dashboard**: Review and manage questions & user attempts
- **Bilingual Support**: English & Russian interface

### ⚡ Performance & Security
- **Security Headers**: CSP, X-Frame-Options, HSTS
- **SEO Optimized**: Meta tags, sitemap, robots.txt, structured data
- **Dark Mode**: Full dark theme support with next-themes
- **Database Indexes**: Optimized queries with full-text search
- **Error Handling**: Global error pages and error boundaries
- **Google Analytics**: Built-in tracking

## 🏗️ Project Structure

```
sat-prep/
├── src/
│   ├── app/
│   │   ├── api/              # API routes (auth, questions, stats)
│   │   ├── admin/            # Admin dashboard
│   │   ├── login/            # Login page
│   │   ├── signup/           # Signup page
│   │   ├── practice/         # Practice questions
│   │   ├── learn/            # Learning modules
│   │   ├── stats/            # User statistics
│   │   ├── error.tsx         # Global error page
│   │   ├── not-found.tsx     # 404 page
│   │   ├── layout.tsx        # Root layout with GA
│   │   └── page.tsx          # Home page
│   ├── components/           # Reusable components
│   ├── lib/                  # Utilities & helpers
│   ├── types/                # TypeScript definitions
│   └── generated/            # Prisma generated files
├── prisma/
│   ├── schema.prisma         # Database schema with indexes
│   ├── migrations/           # Database migrations
│   └── seed.ts              # Seed script
├── public/
│   ├── manifest.json         # PWA manifest
│   └── favicon.ico
├── .env.example              # Environment template
├── next.config.ts            # Next.js config with security headers
└── package.json              # Dependencies
```

## 🎯 Getting Started

### Prerequisites
- Node.js 18+ (recommended 24.x)
- PostgreSQL database (use Neon for free hosting)
- Google OAuth credentials (optional but recommended)

### Local Development

1. **Clone & install dependencies**:
```bash
npm install
```

2. **Setup environment variables**:
```bash
cp .env.example .env
# Edit .env with your actual values:
# - DATABASE_URL (pooled connection)
# - DIRECT_URL (direct connection for migrations)
# - NEXTAUTH_URL (http://localhost:3000 for dev)
# - NEXTAUTH_SECRET (run: openssl rand -base64 32)
# - Google OAuth credentials
# - NEXT_PUBLIC_GA_ID (your Google Analytics ID)
```

3. **Setup database**:
```bash
npm run db:generate    # Generate Prisma client
npm run db:migrate:deploy  # Apply migrations
npm run db:seed        # Populate test data (optional)
```

4. **Run development server**:
```bash
npm run dev
```

Visit `http://localhost:3000`

## 🚀 Deployment on Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "SAT prep platform ready for deployment"
git push origin main
```

### Step 2: Create Vercel Project
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. **Important**: Set `Root Directory` to `sat-prep`

### Step 3: Add Environment Variables
In Vercel Project Settings → Environment Variables, add:
```
DATABASE_URL=postgresql://...  # Pooled connection
DIRECT_URL=postgresql://...    # Direct connection
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<random-secret>
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>
ADMIN_EMAILS=email@example.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Step 4: Configure Google OAuth (if using)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials (Web application)
3. Add authorized redirect URIs:
   - Local: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-domain.vercel.app/api/auth/callback/google`

### Step 5: Setup Database
Recommended: **Neon** (free PostgreSQL hosting)
1. Create account at [neon.tech](https://neon.tech)
2. Create a new project
3. Get connection strings (pooled and direct)
4. Add to Vercel environment variables

### Step 6: Deploy
Vercel automatically deploys on push. Monitor in Vercel dashboard.

## 📊 Database Setup (Neon Example)

1. Create database on Neon
2. Get connection strings
3. Add to `.env`:
```env
DATABASE_URL="postgresql://user:password@region.neon.tech/dbname?sslmode=require&channel_binding=require"
DIRECT_URL="postgresql://user:password@region.neon.tech/dbname?sslmode=require&channel_binding=require"
```
4. Run migration: `npm run db:migrate:deploy`

## 🔐 Security Features

- ✅ **CSRF Protection**: Next-auth handles CSRF tokens
- ✅ **XSS Protection**: React escapes by default, CSP headers
- ✅ **SQL Injection**: Prisma prevents with parameterized queries
- ✅ **Password Hashing**: bcryptjs with salt rounds
- ✅ **Secure Headers**: 
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: SAMEORIGIN
  - X-XSS-Protection: 1; mode=block
  - Referrer-Policy: strict-origin-when-cross-origin

## 📱 API Endpoints

### Authentication
- `POST /api/auth/signin` - Login with email/password
- `POST /api/auth/signup` - Create new account
- `GET /api/auth/session` - Get current session
- `POST /api/auth/signout` - Logout

### Questions
- `GET /api/questions` - Get questions (paginated)
- `POST /api/questions` - Create question (admin)
- `PUT /api/questions/[id]` - Update question (admin)
- `DELETE /api/questions/[id]` - Delete question (admin)

### Attempts
- `POST /api/attempt` - Submit answer
- `POST /api/attempt/batch` - Batch submit answers
- `GET /api/admin/attempts` - View all attempts (admin)

### Stats
- `GET /api/stats` - User statistics
- `GET /api/admin/overview` - Admin dashboard stats

## 🎨 Customization

### Change Colors
Edit `src/app/globals.css` theme variables:
```css
:root {
  --primary: #8748f5;  /* Purple */
  --destructive: #ef4444;  /* Red */
  /* ... */
}
```

### Add New Routes
1. Create folder: `src/app/new-feature/`
2. Add `page.tsx`
3. Automatically added to navigation

### Add Questions
1. Use admin dashboard or API
2. Questions support markdown in explanations
3. Options stored as JSON arrays

## 📈 Performance Optimizations

- Image optimization with next/image
- CSS minification via Tailwind
- Tree-shaking of unused code
- Lazy loading of heavy components
- Database indexes on frequently queried fields
- Caching headers for static assets

## 🐛 Troubleshooting

### "Cannot find module '.prisma/client'"
```bash
npm run db:generate
npm install
```

### Google Analytics not showing
1. Verify `NEXT_PUBLIC_GA_ID` in `.env`
2. Check tag in browser DevTools (Network tab)
3. Wait 24-48 hours for Google to detect tag

### Database connection issues
- Check `DATABASE_URL` and `DIRECT_URL`
- Ensure IP is whitelisted (Neon: add 0.0.0.0/0)
- Test connection: `npm run db:migrate:deploy`

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📄 License

Private project. All rights reserved.

## 👥 Support

For issues and questions:
1. Check error messages in browser console (F12)
2. Check server logs: `npm run dev`
3. Review database schema: `npx prisma studio`
4. Contact development team

---

**Last Updated**: March 26, 2026
**Version**: 0.1.0
**Status**: Production Ready ✅
