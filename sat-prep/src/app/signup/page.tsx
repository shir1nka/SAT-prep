"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, UserPlus, ArrowRight, AlertCircle, Brain, Check } from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-context";

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupPageFallback />}>
      <SignupPageContent />
    </Suspense>
  );
}

function SignupPageContent() {
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const callbackUrl = searchParams.get("callbackUrl") || "/practice";
  const text =
    language === "ru"
      ? {
          googleError: "Не удалось зарегистрироваться через Google. Попробуйте снова.",
          signupFailed: "Не удалось создать аккаунт. Попробуйте другой email.",
          unexpected: "Произошла ошибка. Попробуйте ещё раз.",
          title: "Создать аккаунт",
          subtitle: "Начни подготовку к высокому баллу SAT уже сегодня",
          google: "Регистрация через Google",
          or: "Или зарегистрироваться через",
          email: "Email",
          password: "Пароль",
          passwordPlaceholder: "Минимум 8 символов",
          unlimited: "Неограниченный доступ к практике",
          tracking: "Подробная статистика результатов",
          start: "Начать подготовку",
          haveAccount: "Уже есть аккаунт?",
          login: "Войти",
        }
      : {
          googleError: "Google sign-in failed. Please try again.",
          signupFailed: "Signup failed. Please try a different email.",
          unexpected: "An unexpected error occurred. Please try again.",
          title: "Create Account",
          subtitle: "Start your journey to a higher SAT score today",
          google: "Sign up with Google",
          or: "Or continue with",
          email: "Email Address",
          password: "Password",
          passwordPlaceholder: "Minimum 8 characters",
          unlimited: "Unlimited practice questions",
          tracking: "Advanced accuracy tracking",
          start: "Get Started",
          haveAccount: "Already have an account?",
          login: "Log In",
        };

  async function onGoogleSignIn() {
    setIsGoogleSubmitting(true);
    try {
      await signIn("google", { callbackUrl });
    } catch {
      setError(text.googleError);
      setIsGoogleSubmitting(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        setError(data?.error ?? text.signupFailed);
        setIsSubmitting(false);
        return;
      }

      // Sign in immediately after signup
      await signIn("credentials", {
        email,
        password,
        callbackUrl,
      });
    } catch {
      setError(text.unexpected);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col selection:bg-primary-500/20">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 subtle-grid opacity-[0.3] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-sm md:max-w-md relative z-10"
        >
          <Card className="p-6 sm:p-8 md:p-10 glass-card shadow-2xl shadow-zinc-200/50 dark:shadow-none border-t-4 border-t-primary-600">
            <div className="flex flex-col items-center mb-6 md:mb-8">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary-500/20 mb-3 md:mb-4 -rotate-3">
                <Brain className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-center">{text.title}</h1>
              <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mt-1 md:mt-2 text-center">
                {text.subtitle}
              </p>
            </div>

            {googleEnabled && (
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full h-12 glass hover:bg-zinc-50 dark:hover:bg-zinc-900 border-2"
                  onClick={onGoogleSignIn}
                  disabled={isSubmitting || isGoogleSubmitting}
                >
                  {isGoogleSubmitting ? (
                    <div className="w-5 h-5 border-2 border-primary-600/30 border-t-primary-600 rounded-full animate-spin" />
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-3 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      {text.google}
                    </>
                  )}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-zinc-100 dark:border-zinc-800" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-zinc-950 px-2 text-zinc-400 font-bold tracking-widest">
                      {text.or}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <form className="space-y-4 md:space-y-5 mt-5 md:mt-6" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1" htmlFor="email">
                  {text.email}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-primary-600 transition-colors">
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <input
                    id="email"
                    className="block w-full h-11 md:h-12 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 px-11 outline-none focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10 transition-all text-sm font-medium"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1" htmlFor="password">
                  {text.password}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-primary-600 transition-colors">
                    <Lock className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <input
                    id="password"
                    className="block w-full h-11 md:h-12 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 px-11 outline-none focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10 transition-all text-sm font-medium"
                    type="password"
                    placeholder={text.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/10 rounded-2xl p-3 md:p-4 border border-primary-100 dark:border-primary-800/50">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-xs font-medium text-primary-700 dark:text-primary-300">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    {text.unlimited}
                  </li>
                  <li className="flex items-center gap-2 text-xs font-medium text-primary-700 dark:text-primary-300">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    {text.tracking}
                  </li>
                </ul>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 p-3 md:p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 text-xs font-bold border border-red-100 dark:border-red-800/50"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}

              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting || isGoogleSubmitting}
                className="w-full h-12 md:h-14 text-sm md:text-base shadow-xl shadow-primary-500/20"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {text.start}
                    <UserPlus className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-zinc-100 dark:border-zinc-800 text-center">
              <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
                {text.haveAccount}{" "}
                <Link
                  className="font-bold text-primary-600 hover:text-primary-700 inline-flex items-center group"
                  href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                >
                  {text.login}
                  <ArrowRight className="ml-1 w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}

function SignupPageFallback() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col selection:bg-primary-500/20">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="p-6 md:p-8 text-sm text-zinc-500 dark:text-zinc-400">
          Loading...
        </Card>
      </main>
    </div>
  );
}