"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calculator,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Copy,
  Lightbulb,
  ListChecks,
  RotateCcw,
  Sparkles,
  Target,
  TriangleAlert,
  X,
} from "lucide-react";

import { DesmosProvider, OpenInDesmos } from "@/components/learn/Desmos";
import { XpBar } from "@/components/learn/XpBar";
import MathText from "@/components/MathText";
import SiteHeader from "@/components/SiteHeader";
import { useLanguage } from "@/lib/language-context";
import { ACCENT } from "@/lib/learn/accent";
import {
  SECTIONS,
  getDomain,
  getTopic,
  getTopicNeighbours,
  pick,
  type LearnSectionId,
  type PracticeQuestion,
  type Topic,
} from "@/lib/learn";
import { markTopicComplete, recordPractice, useLearnProgress } from "@/lib/learn/progress";
import { cn } from "@/lib/utils";

const OLD_SECTION_ALIASES: Record<string, LearnSectionId> = {
  "sat-math": "math",
  "sat-reading-writing": "english",
  "sat-reading": "english",
};

const DIFFICULTY_LABEL = {
  easy: { en: "Easy", ru: "Легко" },
  medium: { en: "Medium", ru: "Средне" },
  hard: { en: "Hard", ru: "Сложно" },
};

function normalizeAnswer(value: string) {
  return value
    .toLowerCase()
    .replace(/[$,%\s]/g, "")
    .replace(/,/g, "")
    .trim();
}

function PracticeCard({
  question,
  index,
  language,
  value,
  onAnswer,
}: {
  question: PracticeQuestion;
  index: number;
  language: "en" | "ru";
  value: string | undefined;
  onAnswer: (value: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const answered = value !== undefined;
  const isCorrect = useMemo(() => {
    if (!answered) {
      return false;
    }
    if (question.options && question.options.length > 0) {
      return Number(value) === question.correctIndex;
    }
    const expected = question.answerText ? normalizeAnswer(question.answerText.en) : "";
    return normalizeAnswer(value) === expected;
  }, [answered, question.answerText, question.correctIndex, question.options, value]);

  const copy =
    language === "ru"
      ? {
          question: "Вопрос",
          check: "Проверить",
          correct: "Верно",
          wrong: "Неверно",
          answer: "Ответ",
          explanation: "Разбор",
          desmos: "Показать в Desmos",
          input: "Введи ответ",
        }
      : {
          question: "Question",
          check: "Check",
          correct: "Correct",
          wrong: "Not quite",
          answer: "Answer",
          explanation: "Explanation",
          desmos: "Show in Desmos",
          input: "Type your answer",
        };

  return (
    <div
      className={cn(
        "rounded-2xl border bg-card/70 p-5 transition-colors",
        !answered && "border-border",
        answered && isCorrect && "border-emerald-400/40",
        answered && !isCorrect && "border-rose-400/40"
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-lg bg-secondary px-2 py-1 text-[11px] font-black uppercase tracking-wide text-muted-foreground">
          {copy.question} {index + 1}
        </span>
        <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {DIFFICULTY_LABEL[question.difficulty][language]}
        </span>
        {question.source ? (
          <span className="text-[10px] font-medium text-muted-foreground/70">{question.source}</span>
        ) : null}
        {answered ? (
          <span
            className={cn(
              "ml-auto inline-flex items-center gap-1 text-xs font-bold",
              isCorrect ? "text-emerald-300" : "text-rose-300"
            )}
          >
            {isCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            {isCorrect ? copy.correct : copy.wrong}
          </span>
        ) : null}
      </div>

      <p className="mt-3 text-[15px] font-medium leading-relaxed text-foreground">
        <MathText text={pick(language, question.prompt)} preserveLines />
      </p>

      {question.options && question.options.length > 0 ? (
        <div className="mt-4 grid gap-2">
          {question.options.map((option, optionIndex) => {
            const selected = answered && Number(value) === optionIndex;
            const showCorrect = answered && optionIndex === question.correctIndex;
            return (
              <button
                key={`${question.id}-${optionIndex}`}
                type="button"
                disabled={answered}
                onClick={() => onAnswer(String(optionIndex))}
                className={cn(
                  "flex items-start gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition-colors",
                  showCorrect
                    ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-100"
                    : selected
                      ? "border-rose-400/50 bg-rose-500/10 text-rose-100"
                      : "border-border bg-secondary/40 text-foreground hover:border-foreground/25 hover:bg-secondary/70"
                )}
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-white/15 text-[11px] font-bold">
                  {String.fromCharCode(65 + optionIndex)}
                </span>
                <MathText text={pick(language, option)} />
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            value={answered ? value : draft}
            onChange={(event) => setDraft(event.target.value)}
            disabled={answered}
            placeholder={copy.input}
            className="h-11 flex-1 rounded-xl border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none focus:border-violet-400/50"
          />
          {!answered ? (
            <button
              type="button"
              onClick={() => onAnswer(draft)}
              className="rounded-xl border border-violet-400/30 bg-violet-500/15 px-4 py-2.5 text-sm font-semibold text-violet-100"
            >
              {copy.check}
            </button>
          ) : null}
        </div>
      )}

      {answered ? (
        <div className="mt-4 rounded-xl border border-border bg-secondary/50 p-4">
          {question.options && question.options.length > 0 && question.correctIndex !== undefined ? (
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
              {copy.answer}: {String.fromCharCode(65 + question.correctIndex)}
            </p>
          ) : question.answerText ? (
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
              {copy.answer}: <MathText text={pick(language, question.answerText)} />
            </p>
          ) : null}
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            <MathText text={pick(language, question.explanation)} preserveLines />
          </p>
          {question.desmos && question.desmos.length > 0 ? (
            <div className="mt-3">
              <OpenInDesmos expressions={question.desmos}>{copy.desmos}</OpenInDesmos>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function CopyButton({ value, language }: { value: string; language: "en" | "ru" }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1400);
        } catch {
          setCopied(false);
        }
      }}
      className="inline-flex items-center gap-1 rounded-lg border border-border bg-secondary/60 px-2 py-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? (language === "ru" ? "Скопировано" : "Copied") : language === "ru" ? "Копировать" : "Copy"}
    </button>
  );
}

export default function LearnTopicPage() {
  const params = useParams<{ section: string; topic: string }>();
  const router = useRouter();
  const { language } = useLanguage();
  const progress = useLearnProgress();

  const rawSection = params?.section ?? "";
  const alias = OLD_SECTION_ALIASES[rawSection];
  const sectionId: LearnSectionId | null =
    rawSection === "math" || rawSection === "english" ? rawSection : alias ?? null;

  useEffect(() => {
    if (alias) {
      router.replace(`/learn/${alias}`);
    }
  }, [alias, router]);

  const topic = sectionId ? getTopic(sectionId, params?.topic ?? "") : undefined;
  const domain = topic ? getDomain(topic.domainId) : undefined;
  const neighbours = topic && sectionId ? getTopicNeighbours(sectionId, topic.id) : null;

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showAllSteps, setShowAllSteps] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setAnswers({});
    setShowAllSteps({});
  }, [topic?.id]);

  const answeredCount = topic
    ? topic.practice.filter((question) => answers[question.id] !== undefined).length
    : 0;
  const correctCount = topic
    ? topic.practice.filter((question) => {
        const value = answers[question.id];
        if (value === undefined) {
          return false;
        }
        if (question.options && question.options.length > 0) {
          return Number(value) === question.correctIndex;
        }
        const expected = question.answerText ? normalizeAnswer(question.answerText.en) : "";
        return normalizeAnswer(value) === expected;
      }).length
    : 0;

  useEffect(() => {
    if (topic && answeredCount > 0 && answeredCount === topic.practice.length) {
      recordPractice(topic.id, correctCount, topic.practice.length);
      if (correctCount === topic.practice.length && topic.practice.length > 0) {
        // award 20 XP for perfect practice once per topic; recordPractice already guards, so use earnedXp guard inside awardXp
        import("@/lib/learn/progress").then(({ awardXp }) => {
          awardXp(topic.id, 20);
        });
      }
    }
  }, [answeredCount, correctCount, topic]);

  // reuse progress from hook above

  const copy =
    language === "ru"
      ? {
          back: "К программе",
          overview: "Обзор",
          theory: "Теория",
          examples: "Примеры",
          desmos: "Desmos-разбор",
          strategy: "Стратегия",
          pitfalls: "Ловушки",
          practice: "Практика",
          objectives: "В этом уроке",
          minutes: "мин",
          questions: "вопросов",
          complete: "Отметить пройденной",
          completed: "Пройдено",
          reset: "Сбросить ответы",
          score: "Результат",
          answered: "отвечено",
          next: "Следующая тема",
          previous: "Предыдущая тема",
          notFound: "Тема не найдена",
          notFoundBody: "Похоже, такой темы нет. Вернись к программе и выбери другую.",
          openSection: "Открыть программу",
          step: "Шаг",
          answer: "Ответ",
          solution: "Разбор",
          showSolution: "Показать разбор",
          hideSolution: "Скрыть разбор",
          goal: "Цель",
          speed: "Почему быстро",
          caution: "Когда не стоит",
          formulas: "Формулы",
          practiceHint: "Вопросы взяты из официальных тестов 4–6.",
          noPractice: "Практика для этой темы скоро появится.",
        }
      : {
          back: "Back to curriculum",
          overview: "Overview",
          theory: "Theory",
          examples: "Worked examples",
          desmos: "Desmos walkthrough",
          strategy: "Strategy",
          pitfalls: "Traps",
          practice: "Practice",
          objectives: "In this lesson",
          minutes: "min",
          questions: "questions",
          complete: "Mark as complete",
          completed: "Complete",
          reset: "Reset answers",
          score: "Score",
          answered: "answered",
          next: "Next topic",
          previous: "Previous topic",
          notFound: "Topic not found",
          notFoundBody: "That topic does not exist. Go back to the curriculum and pick another one.",
          openSection: "Open curriculum",
          step: "Step",
          answer: "Answer",
          solution: "Solution",
          showSolution: "Show solution",
          hideSolution: "Hide solution",
          goal: "Goal",
          speed: "Why it is fast",
          caution: "When not to use it",
          formulas: "Formulas",
          practiceHint: "Questions are taken from official tests 4–6.",
          noPractice: "Practice for this topic is coming soon.",
        };

  if (!sectionId || !topic || !domain) {
    return (
      <div className="min-h-screen text-foreground">
        <SiteHeader />
        <main className="mx-auto max-w-2xl px-4 py-24 text-center">
          <h1 className="text-3xl font-black text-foreground">{copy.notFound}</h1>
          <p className="mt-4 text-muted-foreground">{copy.notFoundBody}</p>
          <Link
            href={sectionId ? `/learn/${sectionId}` : "/learn"}
            className="mt-8 inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-5 py-3 text-sm font-semibold text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {copy.openSection}
          </Link>
        </main>
      </div>
    );
  }

  const section = SECTIONS[sectionId];
  const accent = ACCENT[domain.accent];
  const isDone = progress.completed.includes(topic.id);
  const quizComplete = topic.practice.length > 0 && answeredCount === topic.practice.length;

  const sections = [
    { id: "theory", label: copy.theory, icon: BookOpen },
    { id: "examples", label: copy.examples, icon: Lightbulb },
    ...(topic.desmos?.length ? [{ id: "desmos", label: copy.desmos, icon: Calculator }] : []),
    { id: "strategy", label: copy.strategy, icon: Target },
    { id: "pitfalls", label: copy.pitfalls, icon: TriangleAlert },
    { id: "practice", label: copy.practice, icon: ListChecks },
  ];

  return (
    <DesmosProvider enabled={sectionId === "math"}>
      <div className="min-h-screen text-foreground">
        <SiteHeader />

        <main className="relative overflow-hidden pb-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(150,93,255,0.12),transparent_34%)]" />
            <div className="absolute inset-0 subtle-grid opacity-[0.12]" />
          </div>

          <section className="relative mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
            <Link
              href={`/learn/${sectionId}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {copy.back}
            </Link>

            <div className="animate-float-up relative mt-5 overflow-hidden rounded-[2rem] border border-border bg-card/80 p-7 backdrop-blur-xl sm:p-9">
              <span aria-hidden="true" className="animate-float-slow pointer-events-none absolute -right-4 top-4 opacity-[0.08]">
                {sectionId === "math" ? <Calculator className="h-24 w-24" /> : <BookOpen className="h-24 w-24" />}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]",
                    accent.bg,
                    accent.border,
                    accent.text
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", accent.dot)} />
                  {pick(language, domain.title)}
                </span>
                <span className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                  {topic.order} / {pick(language, section.shortTitle)}
                </span>
                {sectionId === "math" ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-violet-300">
                    <Calculator className="h-3.5 w-3.5" />
                    Desmos
                  </span>
                ) : null}
                {isDone ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {copy.completed}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                <MathText text={pick(language, topic.title)} />
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                <MathText text={pick(language, topic.subtitle)} preserveLines />
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4" />
                  {topic.minutes} {copy.minutes}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ListChecks className="h-4 w-4" />
                  {topic.practice.length} {copy.questions}
                </span>
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {copy.objectives}
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {topic.objectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-foreground/90">
                      <CheckCircle2 className={cn("mt-0.5 h-4 w-4 shrink-0", accent.text)} />
                      <MathText text={pick(language, objective)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="relative mx-auto mt-6 grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:px-8">
            <div className="space-y-8">
              <section id="theory" className="scroll-mt-24">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-violet-300" />
                  <h2 className="text-2xl font-black tracking-tight text-foreground">{copy.theory}</h2>
                </div>
                <div className="mt-4 space-y-3">
                  {topic.theory.map((block, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur"
                    >
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-foreground">
                        <MathText text={pick(language, block.heading)} />
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        <MathText text={pick(language, block.body)} preserveLines />
                      </p>
                      {block.formulas && block.formulas.length > 0 ? (
                        <div className="mt-3 space-y-2">
                          {block.formulas.map((formula) => (
                            <div
                              key={formula}
                              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-violet-400/20 bg-violet-500/[0.07] px-3.5 py-2.5"
                            >
                              <code className="font-mono text-sm text-violet-100">
                                <MathText text={formula} />
                              </code>
                              <CopyButton value={formula} language={language} />
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>

              <section id="examples" className="scroll-mt-24">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-300" />
                  <h2 className="text-2xl font-black tracking-tight text-foreground">
                    {copy.examples}
                  </h2>
                </div>
                <div className="mt-4 space-y-4">
                  {topic.examples.map((example, index) => {
                    const expanded = showAllSteps[index];
                    return (
                      <div
                        key={index}
                        className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                            {language === "ru" ? "Пример" : "Example"} {index + 1}
                          </p>
                          {example.source ? (
                            <span className="text-[10px] font-medium text-muted-foreground/70">
                              {example.source}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 text-[15px] font-semibold leading-relaxed text-foreground">
                          <MathText text={pick(language, example.prompt)} preserveLines />
                        </p>

                        {!expanded ? (
                          <button
                            type="button"
                            onClick={() =>
                              setShowAllSteps((current) => ({ ...current, [index]: true }))
                            }
                            className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-3 py-2 text-xs font-semibold text-foreground hover:border-foreground/25"
                          >
                            {copy.showSolution}
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        ) : (
                          <div className="mt-4 space-y-3">
                            {example.steps.map((step, stepIndex) => (
                              <div key={stepIndex} className="flex gap-3">
                                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-secondary text-[11px] font-black text-muted-foreground">
                                  {stepIndex + 1}
                                </span>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                  <MathText text={pick(language, step)} preserveLines />
                                </p>
                              </div>
                            ))}

                            <div className="rounded-xl border border-emerald-400/25 bg-emerald-500/[0.08] px-4 py-3">
                              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                                {copy.answer}
                              </p>
                              <p className="mt-1 text-sm font-semibold text-emerald-100">
                                <MathText text={pick(language, example.answer)} preserveLines />
                              </p>
                            </div>

                            {example.desmos && example.desmos.length > 0 ? (
                              <div className="flex flex-wrap items-center gap-2">
                                <OpenInDesmos expressions={example.desmos} />
                                {example.desmos.map((expression) => (
                                  <span
                                    key={expression}
                                    className="rounded-lg border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground"
                                  >
                                    {expression}
                                  </span>
                                ))}
                              </div>
                            ) : null}

                            <button
                              type="button"
                              onClick={() =>
                                setShowAllSteps((current) => ({ ...current, [index]: false }))
                              }
                              className="text-xs font-semibold text-muted-foreground hover:text-foreground"
                            >
                              {copy.hideSolution}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {topic.desmos && topic.desmos.length > 0 ? (
                <section id="desmos" className="scroll-mt-24">
                  <div className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-violet-300" />
                    <h2 className="text-2xl font-black tracking-tight text-foreground">
                      {copy.desmos}
                    </h2>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {language === "ru"
                      ? "Введи это в Desmos — и график сам покажет ответ."
                      : "Type this into Desmos and let the graph show you the answer."}
                  </p>

                  <div className="mt-4 space-y-4">
                    {topic.desmos.map((recipe, recipeIndex) => (
                      <div
                        key={recipeIndex}
                        className="overflow-hidden rounded-2xl border border-violet-400/25 bg-gradient-to-br from-violet-500/[0.09] to-card/70 backdrop-blur"
                      >
                        <div className="border-b border-violet-400/15 px-5 py-4">
                          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-300">
                            {copy.goal}
                          </p>
                          <h3 className="mt-1 text-lg font-bold text-foreground">
                            <MathText text={pick(language, recipe.title)} />
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            <MathText text={pick(language, recipe.goal)} preserveLines />
                          </p>
                        </div>

                        <div className="space-y-4 p-5">
                          {recipe.steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="flex gap-3">
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-[11px] font-black text-violet-200">
                                {stepIndex + 1}
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-foreground">
                                  <MathText text={pick(language, step.title)} />
                                </p>
                                {step.note ? (
                                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                    <MathText text={pick(language, step.note)} preserveLines />
                                  </p>
                                ) : null}
                                {step.expressions.length > 0 ? (
                                  <div className="mt-2 space-y-1.5">
                                    {step.expressions.map((expression) => (
                                      <div
                                        key={expression}
                                        className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-[#0d0d12] px-3 py-2"
                                      >
                                        <code className="font-mono text-xs text-violet-100">
                                          {expression}
                                        </code>
                                        <div className="flex items-center gap-1.5">
                                          <CopyButton value={expression} language={language} />
                                        </div>
                                      </div>
                                    ))}
                                    <OpenInDesmos expressions={step.expressions} />
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          ))}

                          <div className="grid gap-3 sm:grid-cols-2">
                            {recipe.speed ? (
                              <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/[0.07] p-3.5">
                                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300">
                                  {copy.speed}
                                </p>
                                <p className="mt-1 text-xs leading-relaxed text-emerald-100/90">
                                  <MathText text={pick(language, recipe.speed)} preserveLines />
                                </p>
                              </div>
                            ) : null}
                            {recipe.caution ? (
                              <div className="rounded-xl border border-amber-400/20 bg-amber-500/[0.07] p-3.5">
                                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber-300">
                                  {copy.caution}
                                </p>
                                <p className="mt-1 text-xs leading-relaxed text-amber-100/90">
                                  <MathText text={pick(language, recipe.caution)} preserveLines />
                                </p>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              <section id="strategy" className="scroll-mt-24">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-sky-300" />
                  <h2 className="text-2xl font-black tracking-tight text-foreground">
                    {copy.strategy}
                  </h2>
                </div>
                <div className="mt-4 rounded-2xl border border-sky-400/20 bg-sky-500/[0.06] p-5">
                  <div className="space-y-3">
                    {topic.strategy.map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-sky-500/15 text-[10px] font-black text-sky-200">
                          {index + 1}
                        </span>
                        <p className="text-sm leading-relaxed text-foreground/90">
                          <MathText text={pick(language, item)} preserveLines />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="pitfalls" className="scroll-mt-24">
                <div className="flex items-center gap-2">
                  <TriangleAlert className="h-5 w-5 text-rose-300" />
                  <h2 className="text-2xl font-black tracking-tight text-foreground">
                    {copy.pitfalls}
                  </h2>
                </div>
                <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-500/[0.06] p-5">
                  <div className="space-y-3">
                    {topic.pitfalls.map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" />
                        <p className="text-sm leading-relaxed text-foreground/90">
                          <MathText text={pick(language, item)} preserveLines />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="practice" className="scroll-mt-24">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <ListChecks className="h-5 w-5 text-emerald-300" />
                    <h2 className="text-2xl font-black tracking-tight text-foreground">
                      {copy.practice}
                    </h2>
                  </div>
                  {answeredCount > 0 ? (
                    <button
                      type="button"
                      onClick={() => setAnswers({})}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      {copy.reset}
                    </button>
                  ) : null}
                </div>

                <p className="mt-1 text-sm text-muted-foreground">{copy.practiceHint}</p>

                {topic.practice.length > 0 ? (
                  <>
                    <div className="mt-4 rounded-xl border border-border bg-card/70 px-4 py-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                        <span>
                          {copy.score}: {correctCount}/{topic.practice.length}
                        </span>
                        <span>
                          {answeredCount}/{topic.practice.length} {copy.answered}
                        </span>
                      </div>
                      <div className="shine-bar mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                        <div
                          className={cn(
                            "h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-700",
                            quizComplete && correctCount === topic.practice.length
                              ? "from-emerald-500 to-teal-400"
                              : ""
                          )}
                          style={{
                            width: `${Math.round((answeredCount / topic.practice.length) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {topic.practice.map((question, index) => (
                        <PracticeCard
                          key={question.id}
                          question={question}
                          index={index}
                          language={language}
                          value={answers[question.id]}
                          onAnswer={(value) =>
                            setAnswers((current) =>
                              current[question.id] !== undefined
                                ? current
                                : { ...current, [question.id]: value }
                            )
                          }
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="mt-4 rounded-2xl border border-border bg-card/60 p-6 text-sm text-muted-foreground">
                    {copy.noPractice}
                  </div>
                )}
              </section>

              <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => markTopicComplete(topic.id, !isDone)}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                    isDone
                      ? "border border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
                      : "bg-violet-600 text-white hover:bg-violet-500"
                  )}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {isDone ? copy.completed : copy.complete}
                </button>

                <div className="flex gap-2">
                  {neighbours?.previous ? (
                    <Link
                      href={`/learn/${sectionId}/${neighbours.previous.id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary/60 px-3 py-3 text-xs font-semibold text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      {copy.previous}
                    </Link>
                  ) : null}
                  {neighbours?.next ? (
                    <Link
                      href={`/learn/${sectionId}/${neighbours.next.id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-violet-400/30 bg-violet-500/10 px-3 py-3 text-xs font-semibold text-violet-200 hover:bg-violet-500/20"
                    >
                      {copy.next}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-3">
                <div className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {copy.overview}
                  </p>
                  <nav className="mt-3 space-y-1">
                    {sections.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
                      >
                        <item.icon className="h-3.5 w-3.5" />
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                    <span>
                      {copy.score}: {correctCount}/{topic.practice.length}
                    </span>
                    <span>{answeredCount}/{topic.practice.length}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-emerald-400 transition-all"
                      style={{
                        width: `${
                          topic.practice.length === 0
                            ? 0
                            : Math.round((answeredCount / topic.practice.length) * 100)
                        }%`,
                      }}
                    />
                  </div>
                  <XpBar compact className="mt-3" />
                  <button
                    type="button"
                    onClick={() => {
                      if (!isDone) {
                        import("@/lib/learn/progress").then(({ awardXp }) => awardXp(topic.id, 10));
                      }
                      markTopicComplete(topic.id, !isDone);
                    }}
                    className={cn(
                      "mt-3 w-full rounded-lg px-3 py-2 text-xs font-semibold",
                      isDone
                        ? "border border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
                        : "bg-violet-600 text-white"
                    )}
                  >
                    {isDone ? copy.completed : copy.complete} {progress.xp > 0 ? `· ${progress.xp} XP` : ""}
                  </button>
                </div>

                <div className="rounded-2xl border border-violet-400/20 bg-violet-500/[0.07] p-4">
                  <div className="flex items-center gap-2 text-violet-200">
                    <Sparkles className="h-4 w-4" />
                    <p className="text-xs font-bold uppercase tracking-[0.16em]">
                      {language === "ru" ? "Совет" : "Tip"}
                    </p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {language === "ru"
                      ? "Сначала пройди Desmos-разбор, потом решай практику с открытым калькулятором — так быстрее вырабатывается привычка."
                      : "Read the Desmos walkthrough first, then solve the practice with the calculator open. That builds the habit faster."}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </DesmosProvider>
  );
}
