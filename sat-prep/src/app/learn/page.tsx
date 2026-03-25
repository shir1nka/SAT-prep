"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  GraduationCap,
  Layers3,
  Sparkles,
} from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import Card from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-context";
import {
  getLearnGradeById,
  getLearnProgram,
  type LearnGrade,
} from "@/lib/learn-program";
import { cn } from "@/lib/utils";

export default function LearnPage() {
  const { language } = useLanguage();
  const program = useMemo(() => getLearnProgram(language), [language]);
  const [selectedGradeId, setSelectedGradeId] = useState(program[0]?.id ?? "grade-7");

  const selectedGrade = useMemo(
    () => getLearnGradeById(program, selectedGradeId),
    [program, selectedGradeId]
  );

  const totalModules = program.reduce((sum, grade) => sum + grade.subjects.length, 0);
  const totalQuizzes = program.reduce(
    (sum, grade) =>
      sum + grade.subjects.reduce((inner, subject) => inner + subject.quiz.length, 0),
    0
  );

  const text =
    language === "ru"
      ? {
          badge: "Учебный хаб",
          title: "Учебный хаб 7-11 классов",
          description:
            "Сначала выбираешь класс, потом открываешь отдельную тему. Внутри каждой темы есть понятное объяснение, ключевые навыки, примеры и мини-проверка после разбора.",
          grades: "Классы",
          modules: "Темы",
          quizzes: "Проверочные вопросы",
          readyPath: "Спокойный учебный маршрут",
          readyDescription:
            "Не всё нужно учить сразу. Открой нужный класс, выбери тему и пройди её как мини-урок, а не как бесконечную ленту.",
          gradeLabel: "Класс",
          openModule: "Открыть тему",
          questionCount: "вопросов в проверке",
          moduleLabel: "Тема",
          theoryFirst: "Сначала объяснение и примеры, потом мини-проверка",
        }
      : {
          badge: "Learning hub",
          title: "Grades 7-11 learning hub",
          description:
            "Choose a grade first, then open a focused lesson. Each topic now has its own page with clear explanation, examples, key skills, and a short check after the lesson.",
          grades: "Grades",
          modules: "Modules",
          quizzes: "Check questions",
          readyPath: "A calmer learning path",
          readyDescription:
            "You do not need everything at once. Pick the right grade, open one topic, and learn it like a lesson instead of scrolling through one overloaded page.",
          gradeLabel: "Grade",
          openModule: "Open topic",
          questionCount: "check questions",
          moduleLabel: "Topic",
          theoryFirst: "Explanation and examples first, then a short check",
        };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 selection:bg-primary-500/20">
      <SiteHeader />

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 subtle-grid opacity-[0.3]" />
          <div className="absolute -top-24 left-[-8%] h-72 w-72 rounded-full bg-primary-500/10 blur-[120px]" />
          <div className="absolute top-40 right-[-10%] h-80 w-80 rounded-full bg-sky-500/10 blur-[140px]" />
        </div>

        <section className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary-700 dark:border-primary-900/60 dark:bg-primary-950/30 dark:text-primary-300">
                <Sparkles className="h-3.5 w-3.5" />
                {text.badge}
              </div>
              <h1 className="mt-5 text-5xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                {text.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                {text.description}
              </p>
            </motion.div>

            <Card className="glass-card p-8 shadow-2xl shadow-primary-500/10">
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <MetricCard
                  icon={<GraduationCap className="h-5 w-5 text-sky-600" />}
                  label={text.grades}
                  value={String(program.length)}
                />
                <MetricCard
                  icon={<Layers3 className="h-5 w-5 text-primary-600" />}
                  label={text.modules}
                  value={String(totalModules)}
                />
                <MetricCard
                  icon={<Brain className="h-5 w-5 text-emerald-600" />}
                  label={text.quizzes}
                  value={String(totalQuizzes)}
                />
              </div>

              <div className="mt-6 rounded-[1.75rem] border border-zinc-200 bg-white/80 p-5 dark:border-zinc-800 dark:bg-zinc-950/70">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-sky-500 text-white shadow-lg shadow-primary-500/20">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                      {text.readyPath}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {text.readyDescription}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-6xl px-4 pb-8 sm:px-6">
          <div className="flex flex-wrap gap-3">
            {program.map((grade) => {
              const active = grade.id === selectedGrade.id;
              return (
                <button
                  key={grade.id}
                  type="button"
                  onClick={() => setSelectedGradeId(grade.id)}
                  className={cn(
                    "rounded-2xl border px-5 py-3 text-left transition-all",
                    active
                      ? "border-primary-500 bg-primary-600 text-white shadow-xl shadow-primary-500/20"
                      : "border-zinc-200 bg-white/80 text-zinc-700 hover:border-primary-300 hover:bg-primary-50 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-primary-800 dark:hover:bg-zinc-900"
                  )}
                >
                  <div className="text-xs font-bold uppercase tracking-[0.18em] opacity-70">
                    {grade.stage}
                  </div>
                  <div className="mt-1 text-lg font-bold">{grade.label}</div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <Card className="glass-card p-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-400">
                <BookOpen className="h-3.5 w-3.5" />
                {text.gradeLabel}
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                {selectedGrade.label}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {selectedGrade.summary}
              </p>
              <div className="mt-6 rounded-[1.75rem] border border-zinc-200 bg-white/80 p-5 dark:border-zinc-800 dark:bg-zinc-950/70">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                  {text.theoryFirst}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {selectedGrade.goal}
                </p>
              </div>
            </Card>

            <div className="grid gap-4">
              {selectedGrade.subjects.map((subject, index) => (
                <ModuleCard
                  key={subject.id}
                  grade={selectedGrade}
                  index={index}
                  module={subject}
                  text={text}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ModuleCard({
  grade,
  index,
  module,
  text,
}: {
  grade: LearnGrade;
  index: number;
  module: LearnGrade["subjects"][number];
  text: { moduleLabel: string; openModule: string; questionCount: string };
}) {
  return (
    <Card className="glass-card p-6 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-zinc-200/40 dark:shadow-none">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            {module.tag}
          </p>
          <h3 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {module.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {module.summary}
          </p>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600 font-black dark:bg-zinc-900 dark:text-zinc-300">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {module.quiz.length} {text.questionCount}
        </div>
        <LinkButton href={`/learn/${grade.id}/${module.id}`} variant="primary">
          {text.openModule}
          <ArrowRight className="ml-2 h-4 w-4" />
        </LinkButton>
      </div>
    </Card>
  );
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-zinc-200/70 bg-white/85 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900">
        {icon}
      </div>
      <div className="mt-4 text-3xl font-black text-zinc-900 dark:text-zinc-100">
        {value}
      </div>
      <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
        {label}
      </div>
    </div>
  );
}
