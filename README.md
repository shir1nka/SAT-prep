<div align="center">
  <h1>📚 SAT Prep Platform</h1>
  <p>
    <img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white" />
    <img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" />
    <img src="https://img.shields.io/badge/NextAuth.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
    <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" />
  </p>
<<<<<<< HEAD
  <p><i>Bilingual (EN/RU) SAT preparation platform</i></p>
=======
  <p><i>Bilingual (EN/RU) SAT preparation platform — practice tests, progress tracking, and learning hub</i></p>
>>>>>>> 32e0eb5 (upgrade README with badges and polished formatting)
</div>

---

Bilingual SAT preparation platform built with Next.js 16. Features practice tests, progress tracking, admin tools, and a learning hub for grades 7-11.

<<<<<<< HEAD
## 📁 Structure

```
SAT/
├── sat-prep/           # Main Next.js application
│   ├── prisma/         # Database schema and migrations
│   ├── src/            # Application source code
│   └── public/         # Static assets
├── .trunk/             # Trunk.io dev tools config
└── package.json        # Workspace scripts
```

## ✨ Features

- 🔐 Email/password and Google OAuth authentication (NextAuth.js)
- 📝 SAT practice tests with detailed explanations
- 📊 Progress tracking and performance analytics
- 👑 Admin review and moderation tools
- 🌍 Bilingual interface (English / Russian)
- 🏫 Learning hub with school foundation materials
- ✨ Smooth animations with Framer Motion

## 🛠️ Tech Stack

=======
## ✨ Features

- 🔐 **Auth** — Email/password and Google OAuth via NextAuth.js
- 📝 **Practice tests** — SAT-style questions with detailed explanations
- 📊 **Progress tracking** — performance analytics and insights
- 👑 **Admin tools** — review and moderation dashboard
- 🌍 **Bilingual** — full English / Russian interface
- 🏫 **Learning hub** — school foundation materials for grades 7-11
- ✨ **Animations** — smooth Framer Motion transitions
- 📱 **Responsive** — works on desktop and mobile

## 🛠️ Tech Stack

>>>>>>> 32e0eb5 (upgrade README with badges and polished formatting)
| Category | Technology |
|----------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript 5, Tailwind CSS 4 |
| **Backend** | Next.js API routes, NextAuth.js 4 |
| **Database** | Prisma 6, PostgreSQL / Turso (LibSQL) |
| **UI/UX** | Framer Motion, Lucide React |
| **Deployment** | Vercel-ready |

## 🚦 Getting Started

```bash
cd sat-prep
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📄 License

MIT
