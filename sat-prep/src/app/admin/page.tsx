"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { isAdminEmail } from "@/lib/admin";
import { useLanguage } from "@/lib/language-context";

import SiteHeader from "@/components/SiteHeader";
import Card from "@/components/ui/Card";
import { Button, LinkButton } from "@/components/ui/Button";

type AdminOverviewResponse = {
  totalUsers: number;
  totalAttempts: number;
  correctAttempts: number;
  correctPercentage: number;
  totalQuestions: number;
};

export default function AdminPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<AdminOverviewResponse | null>(null);
  const text =
    language === "ru"
      ? {
          denied: "Доступ запрещен.",
          loadFailed: "Не удалось загрузить панель администратора.",
          loading: "Загрузка...",
          title: "Админ",
          subtitle: "Управляй вопросами и просматривай попытки.",
          questions: "Вопросы",
          attempts: "Попытки",
          totalUsers: "Всего пользователей",
          totalQuestions: "Всего вопросов",
          totalAttempts: "Всего попыток",
          correct: "Верных %",
          manageQuestions: "Управлять вопросами",
          reviewAttempts: "Просмотр попыток",
        }
      : {
          denied: "Access denied.",
          loadFailed: "Failed to load admin overview.",
          loading: "Loading...",
          title: "Admin",
          subtitle: "Manage questions and review attempts.",
          questions: "Questions",
          attempts: "Attempts",
          totalUsers: "Total users",
          totalQuestions: "Total questions",
          totalAttempts: "Total attempts",
          correct: "Correct %",
          manageQuestions: "Manage Questions",
          reviewAttempts: "Review Attempts",
        };

  const admin = isAdminEmail(session?.user?.email);

  useEffect(() => {
    async function load() {
      try {
        if (!session) {
          router.push("/login");
          return;
        }
        if (!admin) {
          setError(text.denied);
          return;
        }

        const res = await fetch("/api/admin/overview");
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        if (!res.ok) {
          setError(text.loadFailed);
          return;
        }

        const data = (await res.json()) as AdminOverviewResponse;
        setStats(data);
      } catch {
        setError(text.loadFailed);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [admin, router, session]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        <SiteHeader />
        <div className="flex items-center justify-center px-4 py-10">
          <div className="text-zinc-700 dark:text-zinc-200">{text.loading}</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        <SiteHeader />
        <div className="flex items-center justify-center px-4 py-10">
          <div className="text-red-600 dark:text-red-400">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <SiteHeader />
      <div className="px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">{text.title}</h1>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                {text.subtitle}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <LinkButton href="/admin/questions" variant="secondary">
                {text.questions}
              </LinkButton>
              <LinkButton href="/admin/attempts" variant="secondary">
                {text.attempts}
              </LinkButton>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-5">
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {text.totalUsers}
              </div>
              <div className="text-3xl font-semibold">
                {stats ? stats.totalUsers : 0}
              </div>
            </Card>
            <Card className="p-5">
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {text.totalQuestions}
              </div>
              <div className="text-3xl font-semibold">
                {stats ? stats.totalQuestions : 0}
              </div>
            </Card>
            <Card className="p-5">
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {text.totalAttempts}
              </div>
              <div className="text-3xl font-semibold">
                {stats ? stats.totalAttempts : 0}
              </div>
            </Card>
            <Card className="p-5">
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {text.correct}
              </div>
              <div className="text-3xl font-semibold">
                {stats ? `${stats.correctPercentage}%` : "0%"}
              </div>
            </Card>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button variant="primary" onClick={() => router.push("/admin/questions")}>
              {text.manageQuestions}
            </Button>
            <Button variant="secondary" onClick={() => router.push("/admin/attempts")}>
              {text.reviewAttempts}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
