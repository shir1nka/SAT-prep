"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import {
  User, LogOut, LayoutDashboard, Brain, BarChart3, BookOpen,
  Menu, X, Sun, Moon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { isAdminEmail } from "@/lib/admin";
import { useLanguage } from "@/lib/language-context";
import { Button, LinkButton } from "./ui/Button";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type NavItem = { href: string; label: string; icon: React.ReactNode };

export default function SiteHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const showAdmin = isAdminEmail(session?.user?.email);
  const isAuthenticated = Boolean(session?.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Wait for mount to avoid hydration mismatch
  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("overflow-hidden-mobile");
    } else {
      document.body.classList.remove("overflow-hidden-mobile");
    }
    return () => {
      document.body.classList.remove("overflow-hidden-mobile");
    };
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

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
          signOut: "Выйти",
        }
      : {
          home: "Home",
          learn: "Learn",
          practice: "Practice",
          stats: "Stats",
          admin: "Admin",
          login: "Login",
          signup: "Sign up",
          signOut: "Sign Out",
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

  const sidebarVariants = {
    closed: { x: "100%" },
    open: { x: 0 },
  };

  function toggleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <header className="sticky top-0 z-50 w-full glass border-b">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 md:py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
            <Brain className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-100 hidden sm:inline-block">
            SAT Prep
          </span>
        </Link>

        {/* Desktop navigation */}
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

        {/* Desktop right side controls */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle language={language} setLanguage={setLanguage} />

          {/* Theme toggle button - desktop */}
          <button
            onClick={toggleTheme}
            className="hover-glow rounded-xl p-2.5 text-zinc-600 hover:bg-primary-50 hover:text-primary-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-primary-300"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {mounted && isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

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

        {/* Mobile hamburger button */}
        <div className="flex md:hidden items-center gap-2">
          {/* Theme toggle - mobile (compact) */}
          <button
            onClick={toggleTheme}
            className="hover-glow rounded-xl p-2.5 text-zinc-600 hover:bg-primary-50 hover:text-primary-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-primary-300"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {mounted && isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <LanguageToggle language={language} setLanguage={setLanguage} />
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="hover-glow rounded-xl p-2.5 text-zinc-600 hover:bg-primary-50 hover:text-primary-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-primary-300"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl z-50 md:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between p-5 border-b border-zinc-100 dark:border-zinc-800">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                  <Brain className="w-5 h-5" />
                </div>
                <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-100">
                  SAT Prep
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="hover-glow rounded-xl p-2.5 text-zinc-600 hover:bg-primary-50 hover:text-primary-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-primary-300"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* User info at top if logged in */}
            {session?.user && (
              <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {session.user?.name || session.user?.email?.split("@")[0]}
                    </p>
                    {session.user?.email && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-[200px]">
                        {session.user.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation links */}
            <nav className="p-4 space-y-1">
              {navItems.map((item) => {
                const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-medium transition-all",
                      active
                        ? "text-primary-700 bg-primary-50 shadow-sm dark:bg-primary-900/20 dark:text-primary-300"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100"
                    )}
                  >
                    <span className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center",
                      active
                        ? "bg-primary-600 text-white"
                        : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                    )}>
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                );
              })}

              {showAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-medium transition-all",
                    pathname.startsWith("/admin")
                      ? "text-primary-700 bg-primary-50 shadow-sm dark:bg-primary-900/20 dark:text-primary-300"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100"
                  )}
                >
                  <span className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center",
                    pathname.startsWith("/admin")
                      ? "bg-primary-600 text-white"
                      : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                  )}>
                    <LayoutDashboard className="w-4 h-4" />
                  </span>
                  {text.admin}
                </Link>
              )}
            </nav>

            {/* Theme toggle in mobile menu */}
            <div className="px-4 py-2 border-t border-zinc-100 dark:border-zinc-800">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-medium w-full text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100 transition-all"
              >
                <span className="w-9 h-9 rounded-xl flex items-center justify-center bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  {mounted && isDark ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </span>
                {mounted && isDark ? "Light Mode" : "Dark Mode"}
              </button>
            </div>

            {/* Bottom actions */}
            <div className="border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4">
              {session ? (
                <Button
                  variant="outline"
                  className="w-full justify-center text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                  onClick={() => signOut()}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {text.signOut}
                </Button>
              ) : (
                <div className="flex flex-col gap-2">
                  <LinkButton href="/login" variant="primary" className="w-full justify-center">
                    {text.login}
                  </LinkButton>
                  <LinkButton href="/signup" variant="outline" className="w-full justify-center">
                    {text.signup}
                  </LinkButton>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function LanguageToggle({
  language,
  setLanguage,
}: {
  language: "en" | "ru";
  setLanguage: (lang: "en" | "ru") => void;
}) {
  return (
    <div className="flex items-center rounded-xl border border-zinc-200 bg-white/80 p-1 dark:border-zinc-800 dark:bg-zinc-900/70">
      {(["en", "ru"] as const).map((lang) => {
        const active = language === lang;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
            className={cn(
              "hover-glow rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-[0.15em] transition-all min-h-0 min-w-0",
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
  );
}