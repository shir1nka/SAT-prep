"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, LayoutDashboard, Brain, BarChart3, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { isAdminEmail } from "@/lib/admin";
import { useLanguage } from "@/lib/language-context";
import { Button, LinkButton } from "./ui/Button";

type NavItem = { href: string; label: string; icon: React.ReactNode };

export default function SiteHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { language, setLanguage } = useLanguage();
  const showAdmin = isAdminEmail(session?.user?.email);
  const isAuthenticated = Boolean(session?.user);

  const text =
    language === "ru"
      ? {
          home: "Главная",
          learn: "Обучение",
          practice: "Практика",
          stats: "Статистика",
          admin: "Админ-панель",
          login: "Войти",
          signup: "Регистрация",
        }
      : {
          home: "Home",
          learn: "Learn",
          practice: "Practice",
          stats: "Stats",
          admin: "Admin",
          login: "Login",
          signup: "Sign up",
        };

  const navItems: NavItem[] = isAuthenticated
    ? [
        { href: "/", label: text.home, icon: <Brain className="w-4 h-4" /> },
        { href: "/learn", label: text.learn, icon: <BookOpen className="w-4 h-4" /> },
        { href: "/practice", label: text.practice, icon: <Brain className="w-4 h-4" /> },
        { href: "/stats", label: text.stats, icon: <BarChart3 className="w-4 h-4" /> },
      ]
    : [
        { href: "/", label: text.home, icon: <Brain className="w-4 h-4" /> },
        { href: "/learn", label: text.learn, icon: <BookOpen className="w-4 h-4" /> },
      ];

  return (
    <header className="sticky top-0 z-50 w-full glass border-b">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
            <Brain className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-100 hidden sm:inline-block">
            SAT Prep
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "hover-glow flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                  active
                    ? "text-primary-700 bg-primary-50 shadow-sm shadow-primary-500/10 dark:bg-primary-900/20 dark:text-primary-300"
                    : "text-zinc-600 hover:-translate-y-0.5 hover:text-primary-700 hover:bg-primary-50 dark:text-zinc-400 dark:hover:text-primary-300 dark:hover:bg-zinc-800"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
          
          {showAdmin && (
            <Link
              href="/admin"
              className={cn(
                "hover-glow flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                pathname.startsWith("/admin")
                  ? "text-primary-700 bg-primary-50 shadow-sm shadow-primary-500/10 dark:bg-primary-900/20 dark:text-primary-300"
                  : "text-zinc-600 hover:-translate-y-0.5 hover:text-primary-700 hover:bg-primary-50 dark:text-zinc-400 dark:hover:text-primary-300 dark:hover:bg-zinc-800"
              )}
            >
              <LayoutDashboard className="w-4 h-4" />
              {text.admin}
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-xl border border-zinc-200 bg-white/80 p-1 dark:border-zinc-800 dark:bg-zinc-900/70">
            {(["en", "ru"] as const).map((lang) => {
              const active = language === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={cn(
                    "hover-glow rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-[0.15em] transition-all",
                    active
                      ? "bg-primary-600 text-white shadow-md shadow-primary-500/25"
                      : "text-zinc-500 hover:-translate-y-0.5 hover:bg-primary-50 hover:text-primary-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-primary-300"
                  )}
                >
                  {lang}
                </button>
              );
            })}
          </div>

          {session ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {session.user?.image ? (
                  <img 
                    src={session.user.image} 
                    alt={session.user.name || "User"} 
                    className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                )}
                <span className="max-w-[120px] truncate">
                  {session.user?.name || session.user?.email?.split("@")[0]}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="text-zinc-600 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="hover-glow rounded-xl px-4 py-2 text-sm font-medium text-zinc-600 hover:-translate-y-0.5 hover:bg-primary-50 hover:text-primary-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-primary-300"
              >
                {text.login}
              </Link>
              <LinkButton href="/signup" size="sm" variant="primary">
                {text.signup}
              </LinkButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
