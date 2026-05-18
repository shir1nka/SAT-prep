"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Brain,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Lock,
  RefreshCcw,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import Card from "@/components/ui/Card";
import { Button, LinkButton } from "@/components/ui/Button";
import { isAdminEmail } from "@/lib/admin";
import { useLanguage } from "@/lib/language-context";

export default function Home() {
  const { data: session, status } = useSession();
  const { language } = useLanguage();
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const isAdmin = isAdminEmail(session?.user?.email);
  const isAuthenticated = status === "authenticated";
  const userName =
    session?.user?.name?.split(" ")[0] ||
    session?.user?.email?.split("@")[0] ||
    "there";

  const text =
    language === "ru"
      ? {
          welcomeBack: "С возвращением",
          authedTitle: "всё готово для подготовки к SAT",
          introAuthed:
            "Переходи к практике, следи за прогрессом и продолжай подготовку в удобном темпе.",
          continuePractice: "Продолжить практику",
          viewStats: "Моя статистика",
          practiceMode: "Режим практики",
          practiceModeDesc: "Решай свежие SAT-вопросы и сразу читай объяснения.",
          progressTracking: "Отслеживание прогресса",
          progressTrackingDesc: "Смотри, как меняется твоя точность со временем.",
          stayConsistent: "Держи темп",
          stayConsistentDesc: "Поддерживай ритм короткими, но регулярными занятиями.",
          signInRequired: "Для практики нужен вход",
          heroTitle1: "Освой SAT с",
          heroTitle2: "точностью и уверенностью",
          introGuest:
            "Сначала войди в аккаунт или зарегистрируйся, чтобы открыть практику, проверку ответов и отслеживание прогресса.",
          signInToPractice: "Войти и начать",
          createAccount: "Создать аккаунт",
          focusedSessions: "Точечная практика",
          focusedSessionsDesc:
            "Выбирай полезные подборки заданий и занимайся по чёткому плану.",
          adaptiveLearning: "Адаптивное обучение",
          adaptiveLearningDesc:
            "Получай задания по чтению, письму и математике в понятной структуре.",
          answerReview: "Разбор ошибок",
          answerReviewDesc:
            "Сразу смотри правильный ответ и понятное объяснение после каждого решения.",
          instantFeedback: "Мгновенная обратная связь",
          instantFeedbackDesc:
            "Получай детальные объяснения после каждого вопроса и учись на ошибках.",
          progressInsights: "Аналитика прогресса",
          progressInsightsDesc:
            "Следи за точностью и усиливай уверенность от сессии к сессии.",
          depthAnalysis: "Глубокая аналитика",
          depthAnalysisDesc:
            "Отслеживай результаты и прогресс с помощью подробной статистики.",
          learnBadge: "Новый SAT learn hub",
          learnTitle: "Нужна структурная SAT-подготовка?",
          learnDesc:
            "Открой новый SAT learn hub: отдельные курсы SAT Math и SAT Reading and Writing, юниты, навыки, объяснения и quick checks в стиле course map.",
          openLearn: "Открыть SAT learn",
          saveProgressLater: "Вернуться к этому позже",
          gradesTitle: "2 SAT курса",
          gradesDesc:
            "SAT Math и SAT Reading and Writing теперь собраны в отдельные course maps.",
          theoryPractice: "Skills + quick checks",
          theoryPracticeDesc:
            "Каждый навык открывается как мини-урок с объяснением и быстрой практикой.",
          confidenceFirst: "Roadmap по юнитам",
          confidenceFirstDesc:
            "Двигайся по юнитам от foundations к mixed challenge, не теряясь в хаосе тем.",
          adminTools: "Инструменты администратора",
          adminToolsDesc:
            "Обнови банк заданий и заново загрузи примерно 200 SAT-вопросов.",
          syncing: "Синхронизация...",
          syncBank: "Обновить банк вопросов",
          note:
            "Внимание: эта операция перезапишет текущие вопросы. Используй её аккуратно.",
          footer: "Платформа подготовки к SAT. Всё для уверенного результата.",
        }
      : {
          welcomeBack: "Welcome Back",
          workspaceReady: "is ready.",
          introAuthed:
            "Jump straight into practice, review your progress, and keep your preparation streak moving.",
          continuePractice: "Continue Practice",
          viewStats: "View My Stats",
          practiceMode: "Practice Mode",
          practiceModeDesc: "Solve fresh SAT questions with instant explanations.",
          progressTracking: "Progress Tracking",
          progressTrackingDesc: "See how your accuracy changes over time.",
          stayConsistent: "Stay Consistent",
          stayConsistentDesc: "Keep building momentum with short focused sessions.",
          signInRequired: "Sign In Required For Practice",
          heroTitle1: "Master the SAT with",
          heroTitle2: "Precision & Confidence",
          introGuest:
            "Create an account or sign in first to unlock practice sessions, answer checking, and progress tracking.",
          signInToPractice: "Sign In To Practice",
          createAccount: "Create Free Account",
          focusedSessions: "Focused Sessions",
          focusedSessionsDesc:
            "Jump into targeted question sets and keep your study time purposeful.",
          adaptiveLearning: "Adaptive Learning",
          adaptiveLearningDesc:
            "Get questions tailored to cover Reading, Writing, and Math concepts effectively.",
          answerReview: "Answer Review",
          answerReviewDesc:
            "See the correct answer and explanation right after each submission.",
          instantFeedback: "Instant Feedback",
          instantFeedbackDesc:
            "Receive detailed explanations immediately after every question to learn from your mistakes.",
          progressInsights: "Progress Insights",
          progressInsightsDesc:
            "Track your accuracy and build confidence session after session.",
          depthAnalysis: "Depth Analysis",
          depthAnalysisDesc:
            "Track your accuracy and progress over time with comprehensive performance statistics.",
          learnBadge: "New SAT Learn Hub",
          learnTitle: "Need a structured SAT roadmap?",
          learnDesc:
            "Open the new SAT learn hub with separate SAT Math and SAT Reading and Writing course maps, visible units, skill lessons, and quick checks.",
          openLearn: "Open SAT Learn",
          saveProgressLater: "Save My Progress Later",
          gradesTitle: "2 SAT Courses",
          gradesDesc:
            "SAT Math and SAT Reading and Writing now live in separate course maps.",
          theoryPractice: "Skills + Quick Checks",
          theoryPracticeDesc:
            "Each skill opens as a mini-lesson with a fast practice check.",
          confidenceFirst: "Unit Roadmap",
          confidenceFirstDesc:
            "Move from foundations into mixed challenge without losing the structure.",
          adminTools: "Admin Tools",
          adminToolsDesc:
            "Re-populate your question bank with roughly 200 SAT questions.",
          syncing: "Syncing...",
          syncBank: "Sync Question Bank",
          note:
            "Note: This operation overwrites existing questions. Use responsibly.",
          footer: "SAT Prep Platform. Built for success.",
        };

  async function handleSync() {
    setSyncing(true);
    setSyncMessage(null);
    try {
      const res = await fetch("/api/seed", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        setSyncMessage(data.message || "Sync successful!");
      } else {
        setSyncMessage(data.error || "Sync failed.");
      }
    } catch {
      setSyncMessage("Network error during sync.");
    } finally {
      setSyncing(false);
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 selection:bg-primary-500/30">
      <SiteHeader />

      <main className="relative">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary-500/5 blur-[120px] rounded-full" />
          <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-indigo-500/5 blur-[100px] rounded-full" />
          <div className="absolute inset-0 subtle-grid opacity-[0.4]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20 lg:py-32 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={isAuthenticated ? "grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-8 md:gap-10 items-center" : "text-center"}
          >
            {isAuthenticated ? (
              <>
                <div className="text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-4 md:mb-6 border border-emerald-100 dark:border-emerald-800/50">
                    <Sparkles className="w-3 h-3" />
                    {text.welcomeBack}
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4 md:mb-6 leading-[1.05]">
                    {userName},
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-500 dark:from-primary-400 dark:to-indigo-300">
                      {text.authedTitle}
                    </span>
                  </h1>
                  <p className="max-w-2xl text-base md:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 md:mb-10">
                    {text.introAuthed}
                  </p>

                  <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                    <LinkButton href="/practice" variant="primary" size="lg" className="w-full sm:w-auto shadow-xl shadow-primary-500/25">
                      {text.continuePractice}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </LinkButton>
                    <LinkButton href="/stats" variant="outline" size="lg" className="w-full sm:w-auto glass hover:bg-zinc-50 dark:hover:bg-zinc-900">
                      {text.viewStats}
                    </LinkButton>
                  </div>
                </div>

                <Card className="p-6 md:p-8 glass-card shadow-2xl shadow-primary-500/10 border border-zinc-100 dark:border-zinc-800">
                  <div className="grid grid-cols-1 gap-3 md:gap-4">
                    <QuickStat
                      icon={<Brain className="w-5 h-5 text-primary-600" />}
                      title={text.practiceMode}
                      description={text.practiceModeDesc}
                    />
                    <QuickStat
                      icon={<BarChart3 className="w-5 h-5 text-indigo-600" />}
                      title={text.progressTracking}
                      description={text.progressTrackingDesc}
                    />
                    <QuickStat
                      icon={<Clock3 className="w-5 h-5 text-amber-600" />}
                      title={text.stayConsistent}
                      description={text.stayConsistentDesc}
                    />
                  </div>
                </Card>
              </>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wide uppercase mb-4 md:mb-6 border border-primary-100 dark:border-primary-800/50">
                  <Lock className="w-3 h-3" />
                  {text.signInRequired}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6 md:mb-8 leading-[1.1]">
                  {text.heroTitle1} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-500 dark:from-primary-400 dark:to-indigo-300">
                    {text.heroTitle2}
                  </span>
                </h1>
                <p className="max-w-2xl mx-auto text-base md:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 md:mb-10">
                  {text.introGuest}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                  <LinkButton href="/login?callbackUrl=/practice" variant="primary" size="lg" className="w-full sm:w-auto shadow-xl shadow-primary-500/25">
                    {text.signInToPractice}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </LinkButton>
                  <LinkButton href="/signup?callbackUrl=/practice" variant="outline" size="lg" className="w-full sm:w-auto glass hover:bg-zinc-50 dark:hover:bg-zinc-900">
                    {text.createAccount}
                  </LinkButton>
                </div>
              </div>
            )}
          </motion.div>

          {/* Feature Grid */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-16 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          >
            <FeatureCard 
              variants={item}
              icon={isAuthenticated ? <Target className="w-6 h-6" /> : <Brain className="w-6 h-6" />}
              title={isAuthenticated ? text.focusedSessions : text.adaptiveLearning}
              description={
                isAuthenticated
                  ? text.focusedSessionsDesc
                  : text.adaptiveLearningDesc
              }
            />
            <FeatureCard 
              variants={item}
              icon={isAuthenticated ? <CheckCircle2 className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
              title={isAuthenticated ? text.answerReview : text.instantFeedback}
              description={
                isAuthenticated
                  ? text.answerReviewDesc
                  : text.instantFeedbackDesc
              }
            />
            <FeatureCard 
              variants={item}
              icon={<BarChart3 className="w-6 h-6" />}
              title={isAuthenticated ? text.progressInsights : text.depthAnalysis}
              description={
                isAuthenticated
                  ? text.progressInsightsDesc
                  : text.depthAnalysisDesc
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-16"
          >
            <Card className="glass-card overflow-hidden border border-zinc-200/70 p-6 md:p-8 lg:p-10">
              <div className="grid gap-6 md:gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-sky-700 dark:border-sky-900/60 dark:bg-sky-950/30 dark:text-sky-300">
                    <BookOpen className="w-3.5 h-3.5" />
                    {text.learnBadge}
                  </div>
                  <h2 className="mt-4 md:mt-5 text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                    {text.learnTitle}
                  </h2>
                  <p className="mt-3 md:mt-4 max-w-2xl text-sm md:text-base lg:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {text.learnDesc}
                  </p>
                  <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-3 md:gap-4">
                    <LinkButton href="/learn" variant="primary" size="lg" className="w-full sm:w-auto">
                      {text.openLearn}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </LinkButton>
                    {!isAuthenticated && (
                      <LinkButton href="/login?callbackUrl=/learn" variant="outline" size="lg" className="w-full sm:w-auto glass">
                        {text.saveProgressLater}
                      </LinkButton>
                    )}
                  </div>
                </div>

                <div className="grid gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <QuickStat
                    icon={<GraduationCap className="w-5 h-5 text-sky-600" />}
                    title={text.gradesTitle}
                    description={text.gradesDesc}
                  />
                  <QuickStat
                    icon={<BookOpen className="w-5 h-5 text-primary-600" />}
                    title={text.theoryPractice}
                    description={text.theoryPracticeDesc}
                  />
                  <QuickStat
                    icon={<Brain className="w-5 h-5 text-emerald-600" />}
                    title={text.confidenceFirst}
                    description={text.confidenceFirstDesc}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Dev Section - Only for Admins */}
          {isAdmin && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 md:mt-32 pt-12 md:pt-16 border-t border-zinc-200 dark:border-zinc-800"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 glass-card p-6 md:p-8 rounded-[2rem]">
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold mb-2">{text.adminTools}</h2>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    {text.adminToolsDesc}
                  </p>
                  {syncMessage && (
                    <p className={`mt-2 text-xs font-medium ${syncMessage.includes("fail") || syncMessage.includes("error") ? "text-red-500" : "text-green-600"}`}>
                      {syncMessage}
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleSync}
                  variant="secondary"
                  size="md"
                  disabled={syncing}
                  className="whitespace-nowrap min-w-[160px]"
                >
                  {syncing ? (
                    <RefreshCcw className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Zap className="w-4 h-4 mr-2" />
                  )}
                  {syncing ? text.syncing : text.syncBank}
                </Button>
              </div>
              <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
                {text.note}
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <footer className="py-8 md:py-12 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} {text.footer}
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, variants }: any) {
  return (
    <motion.div variants={variants}>
      <Card className="p-6 md:p-8 h-full hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden glass-card">
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
          {icon}
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-zinc-900 dark:text-zinc-100">{title}</h3>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
          {description}
        </p>
        <div className="mt-4 md:mt-6 flex items-center text-xs font-bold text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
          LEARN MORE <ArrowRight className="ml-1 w-3 h-3" />
        </div>
      </Card>
    </motion.div>
  );
}

function QuickStat({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-zinc-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 p-4 md:p-5 text-left">
      <div className="mb-3 md:mb-4 flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-800">
        {icon}
      </div>
      <h3 className="text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100">{title}</h3>
      <p className="mt-1 md:mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}