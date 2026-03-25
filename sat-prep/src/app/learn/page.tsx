"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Compass,
  GraduationCap,
  Layers3,
  Lightbulb,
  Rocket,
  Sparkles,
  Target,
} from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import Card from "@/components/ui/Card";
import { Button, LinkButton } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-context";
import { getLearnProgram, LEARN_PROGRAM } from "@/lib/learn-program";
import { cn } from "@/lib/utils";

function makeQuestionKey(gradeId: string, moduleId: string, questionId: string) {
  return `${gradeId}:${moduleId}:${questionId}`;
}

export default function LearnPage() {
  const { language } = useLanguage();
  const program = useMemo(() => getLearnProgram(language), [language]);
  const [selectedGradeId, setSelectedGradeId] = useState(LEARN_PROGRAM[0].id);
  const [selectedModuleId, setSelectedModuleId] = useState(
    LEARN_PROGRAM[0].subjects[0].id
  );
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const selectedGrade = useMemo(
    () => program.find((grade) => grade.id === selectedGradeId) ?? program[0],
    [program, selectedGradeId]
  );

  const selectedModule = useMemo(
    () =>
      selectedGrade.subjects.find((subject) => subject.id === selectedModuleId) ??
      selectedGrade.subjects[0],
    [selectedGrade, selectedModuleId]
  );

  const totalQuestions = selectedModule.quiz.length;
  const answeredCount = selectedModule.quiz.filter((question) => {
    const key = makeQuestionKey(selectedGrade.id, selectedModule.id, question.id);
    return answers[key] !== undefined;
  }).length;
  const correctCount = selectedModule.quiz.filter((question) => {
    const key = makeQuestionKey(selectedGrade.id, selectedModule.id, question.id);
    return answers[key] === question.correctIndex;
  }).length;

  const text =
    language === "ru"
      ? {
          badge: "Сначала разберись в базе",
          title1: "Укрепи школьную базу",
          title2: "перед подготовкой к SAT.",
          intro:
            "Этот раздел создан для тех, кому сначала нужно восстановить школьную базу. Выбери класс, открой модуль, прочитай краткое объяснение и проверь себя в мини-викторинах с понятными разборами.",
          start: "Начать обучение",
          later: "К практике позже",
          gradeBands: "Классы",
          modules: "Модули",
          theoryCards: "Теоретические блоки",
          miniQuizzes: "Мини-викторины",
          learningMode: "Режим обучения",
          calm: "Спокойно, наглядно и по шагам",
          calmDesc:
            "Вместо того чтобы сразу бросать тебя в сложные задания на время, этот раздел помогает спокойно выстроить логику с самого начала.",
          mainGoal: "Главная цель",
          modulesTitle: "Выбери, что изучать сейчас",
          tracks: "модулей",
          outcomes: "Чему ты научишься",
          checkpoints: "Что стоит уметь после темы",
          quizStudio: "Мини-викторина",
          understanding: "Проверь понимание",
          answered: "отвечено",
          score: "Результат",
          nice: "Отлично.",
          notice: "Обрати внимание на объяснение.",
          nextStep: "Следующий шаг",
          nextTitle: "Сначала разберись в теме, потом переходи к практике",
          nextDesc:
            "Когда этот модуль станет понятным, переходи к SAT-практике и используй более сильную школьную базу, чтобы отвечать увереннее и быстрее.",
          restart: "Снова с 7 класса",
          practice: "Практика SAT",
        }
      : {
          badge: "Learn Before You Practice",
          title1: "Build the 7-11 grade foundation",
          title2: "before the SAT pressure starts.",
          intro:
            "This section is designed for students who want to rebuild school basics first. Choose a grade, open a module, read a compact theory card, and test yourself with quick quizzes that explain every answer.",
          start: "Start Learning Path",
          later: "Go to Practice Later",
          gradeBands: "Grade Bands",
          modules: "Modules",
          theoryCards: "Theory Cards",
          miniQuizzes: "Mini Quizzes",
          learningMode: "Learning Mode",
          calm: "Calm, visual, and step-by-step",
          calmDesc:
            "Instead of throwing you straight into hard timed problems, this page slows the process down and helps you rebuild logic from the ground up.",
          mainGoal: "Main Goal",
          modulesTitle: "Choose what to study now",
          tracks: "tracks",
          outcomes: "What you will be able to do",
          checkpoints: "Mastery checkpoints",
          quizStudio: "Quiz Studio",
          understanding: "Check your understanding",
          answered: "answered",
          score: "Quiz Score",
          nice: "Nice work.",
          notice: "Try to notice the pattern.",
          nextStep: "Next step",
          nextTitle: "Learn first, then train under pressure",
          nextDesc:
            "Once this module feels comfortable, move into the SAT practice section and use your stronger school foundation to answer faster.",
          restart: "Restart From Grade 7",
          practice: "Practice SAT Questions",
        };

  function selectGrade(gradeId: string) {
    const nextGrade =
      program.find((grade) => grade.id === gradeId) ?? program[0];
    setSelectedGradeId(nextGrade.id);
    setSelectedModuleId(nextGrade.subjects[0].id);
  }

  function selectAnswer(questionId: string, answerIndex: number) {
    const key = makeQuestionKey(selectedGrade.id, selectedModule.id, questionId);
    setAnswers((current) => ({
      ...current,
      [key]: answerIndex,
    }));
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 selection:bg-primary-500/20">
      <SiteHeader />

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 subtle-grid opacity-[0.35]" />
          <div className="absolute -top-20 left-[-10%] h-72 w-72 rounded-full bg-sky-500/10 blur-[120px]" />
          <div className="absolute top-40 right-[-8%] h-80 w-80 rounded-full bg-primary-500/10 blur-[140px]" />
          <div className="absolute bottom-0 left-[15%] h-64 w-64 rounded-full bg-emerald-500/10 blur-[120px]" />
        </div>

        <section className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
          >
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-sky-700 dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-sky-300">
                <Sparkles className="h-3.5 w-3.5" />
                {text.badge}
              </div>
              <h1 className="max-w-3xl text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 md:text-6xl">
                {text.title1}
                <span className="block bg-gradient-to-r from-sky-600 via-primary-600 to-emerald-500 bg-clip-text text-transparent">
                  {text.title2}
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                {text.intro}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <LinkButton href="#grade-switcher" variant="primary" size="lg" className="shadow-xl shadow-primary-500/20">
                  {text.start}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </LinkButton>
                <LinkButton href="/practice" variant="outline" size="lg" className="glass">
                  {text.later}
                </LinkButton>
              </div>
            </div>

            <Card className="glass-card overflow-hidden border border-white/30 p-8 shadow-2xl shadow-sky-500/10">
              <div className="grid gap-4 sm:grid-cols-2">
                <MetricCard icon={<GraduationCap className="h-5 w-5 text-sky-600" />} label={text.gradeBands} value="5" />
                <MetricCard icon={<Layers3 className="h-5 w-5 text-primary-600" />} label={text.modules} value="15" />
                <MetricCard icon={<BookOpen className="h-5 w-5 text-emerald-600" />} label={text.theoryCards} value="15" />
                <MetricCard icon={<Brain className="h-5 w-5 text-amber-600" />} label={text.miniQuizzes} value="30" />
              </div>

              <div className="mt-6 rounded-[2rem] border border-zinc-200/70 bg-white/85 p-5 dark:border-zinc-800 dark:bg-zinc-950/70">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-primary-600 text-white shadow-lg shadow-primary-500/25">
                    <Rocket className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                      {text.learningMode}
                    </p>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                      {text.calm}
                    </h2>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {text.calmDesc}
                </p>
              </div>
            </Card>
          </motion.div>
        </section>

        <section
          id="grade-switcher"
          className="relative z-10 mx-auto max-w-6xl px-4 pb-8 sm:px-6"
        >
          <div className="flex flex-wrap gap-3">
            {program.map((grade) => {
              const isActive = grade.id === selectedGrade.id;
              return (
                <button
                  key={grade.id}
                  type="button"
                  onClick={() => selectGrade(grade.id)}
                  className={cn(
                    "rounded-2xl border px-5 py-3 text-left transition-all",
                    isActive
                      ? "border-primary-500 bg-primary-600 text-white shadow-xl shadow-primary-500/20"
                      : "border-zinc-200 bg-white/80 text-zinc-700 hover:border-primary-200 hover:bg-primary-50 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-primary-800 dark:hover:bg-zinc-900"
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
          <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="space-y-6">
              <Card className="glass-card p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-400">
                      <Compass className="h-3.5 w-3.5" />
                      {selectedGrade.stage}
                    </div>
                    <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                      {selectedGrade.label}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {selectedGrade.summary}
                    </p>
                  </div>
                  <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-sky-500 text-white shadow-xl shadow-primary-500/20 sm:flex">
                    <Target className="h-7 w-7" />
                  </div>
                </div>

                <div className="mt-6 rounded-[1.75rem] border border-zinc-200 bg-white/80 p-5 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                    {text.mainGoal}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {selectedGrade.goal}
                  </p>
                </div>
              </Card>

              <Card className="glass-card p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                      {text.modules}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                      {text.modulesTitle}
                    </h3>
                  </div>
                  <div className="rounded-2xl bg-zinc-100 px-3 py-2 text-sm font-bold text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                    {selectedGrade.subjects.length} {text.tracks}
                  </div>
                </div>

                <div className="grid gap-4">
                  {selectedGrade.subjects.map((subject, index) => {
                    const isActive = subject.id === selectedModule.id;
                    return (
                      <button
                        key={subject.id}
                        type="button"
                        onClick={() => setSelectedModuleId(subject.id)}
                        className={cn(
                          "group rounded-[1.75rem] border p-5 text-left transition-all",
                          isActive
                            ? "border-primary-500 bg-primary-600 text-white shadow-xl shadow-primary-500/25"
                            : "border-zinc-200 bg-white/80 hover:-translate-y-0.5 hover:border-primary-200 hover:bg-primary-50 dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-primary-800 dark:hover:bg-zinc-900"
                        )}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p
                              className={cn(
                                "text-[11px] font-bold uppercase tracking-[0.2em]",
                                isActive ? "text-white/70" : "text-zinc-400"
                              )}
                            >
                              {subject.tag}
                            </p>
                            <h4 className="mt-2 text-xl font-bold">{subject.title}</h4>
                            <p
                              className={cn(
                                "mt-2 text-sm leading-relaxed",
                                isActive
                                  ? "text-white/85"
                                  : "text-zinc-600 dark:text-zinc-400"
                              )}
                            >
                              {subject.summary}
                            </p>
                          </div>
                          <div
                            className={cn(
                              "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl font-black",
                              isActive
                                ? "bg-white/15 text-white"
                                : "bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-300"
                            )}
                          >
                            0{index + 1}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="glass-card overflow-hidden">
                <div className="border-b border-zinc-200/70 bg-gradient-to-r from-sky-50 via-white to-emerald-50 p-7 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/85 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-400">
                        <Lightbulb className="h-3.5 w-3.5" />
                        {selectedModule.tag}
                      </div>
                      <h3 className="mt-4 text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                        {selectedModule.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {selectedModule.theory}
                      </p>
                    </div>
                    <div className="rounded-[1.5rem] border border-white/70 bg-white/90 px-4 py-3 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950/70">
                      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                        {text.score}
                      </div>
                      <div className="mt-1 text-3xl font-black text-zinc-900 dark:text-zinc-100">
                        {correctCount}/{totalQuestions}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 p-7 xl:grid-cols-[0.9fr_1.1fr]">
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                        {text.outcomes}
                      </p>
                      <div className="mt-4 space-y-3">
                        {selectedModule.outcomes.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950/70"
                          >
                            <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-emerald-600" />
                            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                        {text.checkpoints}
                      </p>
                      <div className="mt-4 space-y-3">
                        {selectedModule.checkpoints.map((item) => (
                          <div
                            key={item}
                            className="rounded-2xl bg-zinc-100 px-4 py-3 text-sm font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                          {text.quizStudio}
                        </p>
                        <h4 className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                          {text.understanding}
                        </h4>
                      </div>
                      <div className="rounded-2xl bg-zinc-100 px-3 py-2 text-sm font-bold text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                        {answeredCount}/{totalQuestions} {text.answered}
                      </div>
                    </div>

                    {selectedModule.quiz.map((question, index) => {
                      const questionKey = makeQuestionKey(
                        selectedGrade.id,
                        selectedModule.id,
                        question.id
                      );
                      const selectedAnswer = answers[questionKey];
                      const isAnswered = selectedAnswer !== undefined;
                      const isCorrect = selectedAnswer === question.correctIndex;

                      return (
                        <div
                          key={question.id}
                          className="rounded-[1.75rem] border border-zinc-200 bg-white/85 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/70"
                        >
                          <div className="mb-4 flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sm font-black text-sky-700 dark:bg-sky-950/60 dark:text-sky-300">
                              {index + 1}
                            </div>
                            <p className="text-base font-semibold leading-relaxed text-zinc-900 dark:text-zinc-100">
                              {question.prompt}
                            </p>
                          </div>

                          <div className="grid gap-3">
                            {question.options.map((option, optionIndex) => {
                              const chosen = selectedAnswer === optionIndex;
                              const revealCorrect =
                                isAnswered && optionIndex === question.correctIndex;

                              return (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => selectAnswer(question.id, optionIndex)}
                                  className={cn(
                                    "rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all",
                                    chosen && isCorrect
                                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
                                      : chosen
                                        ? "border-red-500 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
                                        : revealCorrect
                                          ? "border-emerald-300 bg-emerald-50/70 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-300"
                                          : "border-zinc-200 bg-zinc-50/80 text-zinc-700 hover:border-primary-300 hover:bg-primary-50 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-primary-800 dark:hover:bg-zinc-900"
                                  )}
                                >
                                  {option}
                                </button>
                              );
                            })}
                          </div>

                          {isAnswered && (
                            <div
                              className={cn(
                                "mt-4 rounded-2xl px-4 py-3 text-sm leading-relaxed",
                                isCorrect
                                  ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200"
                                  : "bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:text-amber-200"
                              )}
                            >
                              <span className="font-bold">
                                {isCorrect ? text.nice : text.notice}
                              </span>{" "}
                              {question.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>

              <Card className="glass-card p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                      {text.nextStep}
                    </p>
                    <h4 className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                      {text.nextTitle}
                    </h4>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {text.nextDesc}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="secondary"
                      onClick={() => selectGrade(program[0].id)}
                    >
                      {text.restart}
                    </Button>
                    <LinkButton href="/practice" variant="primary">
                      {text.practice}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </LinkButton>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
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
