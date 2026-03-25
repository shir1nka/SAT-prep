"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import Card from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-context";
import {
  getLearnGradeById,
  getLearnModuleById,
  getLearnProgram,
} from "@/lib/learn-program";
import { cn } from "@/lib/utils";

function makeAnswerKey(gradeId: string, moduleId: string, questionId: string) {
  return `${gradeId}:${moduleId}:${questionId}`;
}

export default function LearnModulePage() {
  const params = useParams<{ gradeId: string; moduleId: string }>();
  const { language } = useLanguage();
  const program = useMemo(() => getLearnProgram(language), [language]);
  const grade = useMemo(
    () => getLearnGradeById(program, params?.gradeId),
    [params?.gradeId, program]
  );
  const module = useMemo(
    () => getLearnModuleById(grade, params?.moduleId),
    [grade, params?.moduleId]
  );
  const currentModuleIndex = grade.subjects.findIndex((subject) => subject.id === module.id);
  const nextModule = currentModuleIndex >= 0 ? grade.subjects[currentModuleIndex + 1] : undefined;

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const answeredCount = module.quiz.filter((question) => {
    const key = makeAnswerKey(grade.id, module.id, question.id);
    return answers[key] !== undefined;
  }).length;
  const correctCount = module.quiz.filter((question) => {
    const key = makeAnswerKey(grade.id, module.id, question.id);
    return answers[key] === question.correctIndex;
  }).length;

  const text =
    language === "ru"
      ? {
          back: "Назад к обучению",
          theory: "Разбор темы",
          coreIdea: "Главная идея",
          howToThink: "Как об этом думать",
          commonFocus: "На что смотреть особенно внимательно",
          examples: "Примеры по теме",
          exampleLabel: "Пример",
          answerLabel: "Ответ",
          outcomes: "Чему научишься",
          checkpoints: "Что проверить после темы",
          quiz: "Мини-проверка после объяснения",
          score: "Результат",
          answered: "отвечено",
          good: "Хорошо.",
          check: "Смотри объяснение.",
          missing: "Тема не найдена",
          missingDesc: "Похоже, такой темы сейчас нет. Вернись в хаб и выбери другой модуль.",
          goHub: "Открыть учебный хаб",
          nextTopic: "Следующая тема",
          stayInLearn: "Продолжить обучение",
        }
      : {
          back: "Back to Learn",
          theory: "Topic breakdown",
          coreIdea: "Core idea",
          howToThink: "How to think about it",
          commonFocus: "What to watch carefully",
          examples: "Worked examples",
          exampleLabel: "Example",
          answerLabel: "Answer",
          outcomes: "What you will learn",
          checkpoints: "What to check after this lesson",
          quiz: "Quick check after the lesson",
          score: "Score",
          answered: "answered",
          good: "Nice.",
          check: "Check the explanation.",
          missing: "Topic not found",
          missingDesc: "This topic does not seem to exist right now. Go back to the hub and open another module.",
          goHub: "Open Learn Hub",
          nextTopic: "Next topic",
          stayInLearn: "Continue learning",
        };

  if (params?.moduleId && module.id !== params.moduleId) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <Card className="glass-card p-8 text-center">
            <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-100">
              {text.missing}
            </h1>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">{text.missingDesc}</p>
            <div className="mt-8 flex justify-center">
              <LinkButton href="/learn">{text.goHub}</LinkButton>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 selection:bg-primary-500/20">
      <SiteHeader />

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 subtle-grid opacity-[0.28] pointer-events-none" />

        <section className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition-colors hover:text-primary-700 dark:text-zinc-400 dark:hover:text-primary-300"
          >
            <ArrowLeft className="h-4 w-4" />
            {text.back}
          </Link>

          <div className="mt-6 grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
            <Card className="glass-card p-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-700 dark:border-primary-900/60 dark:bg-primary-950/30 dark:text-primary-300">
                <BookOpen className="h-3.5 w-3.5" />
                {grade.label}
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                {module.title}
              </h1>
              <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-zinc-400">
                {module.tag}
              </p>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {module.summary}
              </p>

              <div className="mt-6 rounded-[1.75rem] border border-zinc-200 bg-white/80 p-5 dark:border-zinc-800 dark:bg-zinc-950/70">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                  {text.theory}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
                  {module.theory}
                </p>
              </div>

              <div className="mt-6 grid gap-4">
                <LessonNote
                  title={text.coreIdea}
                  body={module.summary}
                  tone="primary"
                />
                <LessonNote
                  title={text.howToThink}
                  body={module.theory}
                  tone="neutral"
                />
                <LessonNote
                  title={text.commonFocus}
                  body={module.checkpoints.join(". ")}
                  tone="success"
                />
              </div>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                  {text.examples}
                </p>
                <div className="mt-4 grid gap-4">
                  {module.quiz.slice(0, 2).map((question, index) => (
                    <ExampleCard
                      key={question.id}
                      index={index}
                      exampleLabel={text.exampleLabel}
                      answerLabel={text.answerLabel}
                      prompt={question.prompt}
                      answer={question.options[question.correctIndex]}
                      explanation={question.explanation}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                    {text.outcomes}
                  </p>
                  <div className="mt-4 space-y-3">
                    {module.outcomes.map((item) => (
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
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                    {text.checkpoints}
                  </p>
                  <div className="mt-4 space-y-3">
                    {module.checkpoints.map((item) => (
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
            </Card>

            <Card className="glass-card p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                    {text.quiz}
                  </p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                    {module.title}
                  </h2>
                </div>
                <div className="rounded-[1.5rem] border border-zinc-200 bg-white/85 px-4 py-3 text-center dark:border-zinc-800 dark:bg-zinc-950/70">
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                    {text.score}
                  </div>
                  <div className="mt-1 text-3xl font-black text-zinc-900 dark:text-zinc-100">
                    {correctCount}/{module.quiz.length}
                  </div>
                  <div className="mt-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    {answeredCount}/{module.quiz.length} {text.answered}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {module.quiz.map((question, index) => {
                  const questionKey = makeAnswerKey(grade.id, module.id, question.id);
                  const selectedAnswer = answers[questionKey];
                  const isAnswered = selectedAnswer !== undefined;
                  const isCorrect = selectedAnswer === question.correctIndex;

                  return (
                    <div
                      key={question.id}
                      className="rounded-[1.75rem] border border-zinc-200 bg-white/85 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/70"
                    >
                      <div className="mb-4 flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary-100 text-sm font-black text-primary-700 dark:bg-primary-950/40 dark:text-primary-300">
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
                              onClick={() =>
                                setAnswers((current) => ({
                                  ...current,
                                  [questionKey]: optionIndex,
                                }))
                              }
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

                      {isAnswered ? (
                        <div
                          className={cn(
                            "mt-4 rounded-2xl px-4 py-3 text-sm leading-relaxed",
                            isCorrect
                              ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200"
                              : "bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:text-amber-200"
                          )}
                        >
                          <span className="font-bold">
                            {isCorrect ? text.good : text.check}
                          </span>{" "}
                          {question.explanation}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <LinkButton href="/learn" variant="outline">
                  {text.goHub}
                </LinkButton>
                {nextModule ? (
                  <LinkButton href={`/learn/${grade.id}/${nextModule.id}`} variant="primary">
                    {text.nextTopic}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </LinkButton>
                ) : (
                  <LinkButton href="/learn" variant="primary">
                    {text.stayInLearn}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </LinkButton>
                )}
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}

function ExampleCard({
  index,
  exampleLabel,
  answerLabel,
  prompt,
  answer,
  explanation,
}: {
  index: number;
  exampleLabel: string;
  answerLabel: string;
  prompt: string;
  answer: string;
  explanation: string;
}) {
  return (
    <div className="rounded-3xl border border-sky-200 bg-sky-50/70 p-5 dark:border-sky-900/60 dark:bg-sky-950/20">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">
        {exampleLabel} {index + 1}
      </p>
      <p className="mt-3 text-sm font-semibold leading-relaxed text-zinc-900 dark:text-zinc-100">
        {prompt}
      </p>
      <p className="mt-3 text-sm font-medium text-emerald-700 dark:text-emerald-300">
        {answerLabel}: {answer}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {explanation}
      </p>
    </div>
  );
}

function LessonNote({
  title,
  body,
  tone,
}: {
  title: string;
  body: string;
  tone: "primary" | "neutral" | "success";
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border p-5",
        tone === "primary" &&
          "border-primary-200 bg-primary-50/70 dark:border-primary-900/60 dark:bg-primary-950/20",
        tone === "neutral" &&
          "border-zinc-200 bg-white/80 dark:border-zinc-800 dark:bg-zinc-950/70",
        tone === "success" &&
          "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/20"
      )}
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
        {title}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {body}
      </p>
    </div>
  );
}
