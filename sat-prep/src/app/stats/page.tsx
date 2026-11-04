"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Target, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  Brain,
  TrendingUp,
  Award
} from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import Card from "@/components/ui/Card";
import { Button, LinkButton } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

type StatsResponse = {
  totalAttempts: number;
  correctAttempts: number;
  correctPercentage: number;
};

export default function StatsPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const text =
    language === "ru"
      ? {
          errorLoad:
            "Не удалось загрузить статистику. Сначала реши несколько заданий в практике.",
          serviceError: "Не удалось подключиться к сервису статистики.",
          loading: "Анализируем твои результаты...",
          preview: "Статистика пока недоступна",
          startPractice: "Начать практику",
          insights: "Аналитика прогресса",
          title: "Твоя статистика",
          subtitle: "Следи за прогрессом и находи темы, которые стоит подтянуть.",
          back: "Назад к практике",
          overallAccuracy: "Общая точность",
          overallAccuracyDesc: "Средний процент правильных ответов",
          correctAnswers: "Верные ответы",
          correctAnswersDesc: "Общее число правильных ответов",
          totalAttempts: "Всего попыток",
          totalAttemptsDesc: "Общий объём практики",
          score: "Точность",
          achiever: "Твой уровень",
          keepItUp: "Так держать!",
          keepItUpDesc:
            "Регулярная практика — ключ к хорошему результату на SAT. По текущей статистике особенно полезно уделить больше внимания чтению, чтобы поднять общую точность.",
          practiceNow: "Перейти к практике",
        }
      : {
          errorLoad:
            "Failed to load stats. Please ensure you have completed some practice sessions.",
          serviceError: "Unable to connect to the statistics service.",
          loading: "Analyzing your data...",
          preview: "Statistics Preview",
          startPractice: "Start Practice Session",
          insights: "Performance Insights",
          title: "Your Statistics",
          subtitle: "Visualize your progress and identify areas for improvement.",
          back: "Back to Practice",
          overallAccuracy: "Overall Accuracy",
          overallAccuracyDesc: "Average success rate",
          correctAnswers: "Correct Answers",
          correctAnswersDesc: "Lifetime success count",
          totalAttempts: "Total Attempts",
          totalAttemptsDesc: "Practice load volume",
          score: "Score",
          achiever: "Achiever Status",
          keepItUp: "Keep it up!",
          keepItUpDesc:
            "Consistency is the key to SAT success. Based on your current performance, we recommend focusing on Reading Comprehension to boost your overall accuracy.",
          practiceNow: "Practice Now",
        };

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/stats");
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        if (!res.ok) {
          setError(text.errorLoad);
          return;
        }

        const data = (await res.json()) as StatsResponse;
        setStats(data);
      } catch {
        setError(text.serviceError);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            <p className="text-zinc-500 font-medium">{text.loading}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-6 md:p-8 text-center glass-card">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6">
              <BarChart3 className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h2 className="text-lg md:text-xl font-bold mb-2">{text.preview}</h2>
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 mb-6 md:mb-8">{error}</p>
            <Button onClick={() => router.push("/practice")} className="w-full">
              {text.startPractice}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const accuracy = stats?.correctPercentage ?? 0;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col selection:bg-primary-500/20">
      <SiteHeader />
      
      <main className="flex-1 py-8 md:py-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 subtle-grid opacity-[0.3] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-bold tracking-widest uppercase mb-3 md:mb-4 border border-primary-100 dark:border-primary-800/50">
                <TrendingUp className="w-3 h-3" />
                {text.insights}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{text.title}</h1>
              <p className="mt-1 md:mt-2 text-sm md:text-base text-zinc-600 dark:text-zinc-400">
                {text.subtitle}
              </p>
            </div>

            <Button variant="outline" size="sm" onClick={() => router.push("/practice")} className="glass">
              <ArrowLeft className="mr-2 w-4 h-4" />
              {text.back}
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <StatCard 
              icon={<Target className="w-5 h-5 md:w-6 md:h-6 text-primary-600" />}
              label={text.overallAccuracy}
              value={accuracy + "%"}
              description={text.overallAccuracyDesc}
              delay={0.1}
            />
            <StatCard 
              icon={<CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-600" />}
              label={text.correctAnswers}
              value={stats?.correctAttempts ?? 0}
              description={text.correctAnswersDesc}
              delay={0.2}
            />
            <StatCard 
              icon={<Clock className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />}
              label={text.totalAttempts}
              value={stats?.totalAttempts ?? 0}
              description={text.totalAttemptsDesc}
              delay={0.3}
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 md:p-8 lg:p-10 glass-card relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                {/* Circular Progress (Simplified SVG) */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      className="text-zinc-100 dark:text-zinc-800 stroke-current" 
                      strokeWidth="10" 
                      cx="50" cy="50" r="40" fill="transparent" 
                    />
                    <motion.circle 
                      className="text-primary-600 stroke-current" 
                      strokeWidth="10" 
                      strokeLinecap="round"
                      cx="50" cy="50" r="40" fill="transparent"
                      strokeDasharray="251.2"
                      initial={{ strokeDashoffset: 251.2 }}
                      animate={{ strokeDashoffset: 251.2 - (251.2 * accuracy) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl md:text-3xl font-black">{accuracy}%</span>
                    <span className="text-[10px] uppercase font-bold text-zinc-400">{text.score}</span>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 text-yellow-700 dark:text-yellow-500 text-[10px] font-black uppercase tracking-wider mb-3 md:mb-4 border border-yellow-100 dark:border-yellow-800/50">
                    <Award className="w-3 h-3" />
                    {text.achiever}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{text.keepItUp}</h3>
                  <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5 md:mb-6">
                    {text.keepItUpDesc}
                  </p>
                  <div className="flex gap-4 justify-center md:justify-start">
                    <LinkButton href="/practice" variant="primary">
                      {text.practiceNow}
                    </LinkButton>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, description, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="p-5 md:p-6 h-full hover:shadow-lg transition-all group overflow-hidden glass-card">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/10 transition-all">
          {icon}
        </div>
        <div className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{label}</div>
        <div className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 mb-1 md:mb-2">{value}</div>
        <div className="text-[11px] md:text-xs text-zinc-500 font-medium">{description}</div>
      </Card>
    </motion.div>
  );
}