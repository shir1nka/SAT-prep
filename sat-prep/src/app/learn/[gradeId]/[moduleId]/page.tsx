"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock3,
  Lightbulb,
  Target,
} from "lucide-react";

import LearnMediaCard from "@/components/learn/LearnMediaCard";
import MathText from "@/components/MathText";
import SiteHeader from "@/components/SiteHeader";
import { Button, LinkButton } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-context";
import { getLearnSkillMedia } from "@/lib/learn-media";
import { getSkillChallengeQuestions } from "@/lib/sat-learn-challenges";
import {
  findLearnCourseById,
  getCourseSkillPosition,
  getLearnCourseById,
  pickText,
  type SkillStatus,
} from "@/lib/sat-learn";
import { cn } from "@/lib/utils";

function makeAnswerKey(courseId: string, skillId: string, questionId: string) {
  return `${courseId}:${skillId}:${questionId}`;
}

export default function LearnSkillPage() {
  const params = useParams<{ gradeId: string; moduleId: string }>();
  const { language } = useLanguage();
  const course = useMemo(() => findLearnCourseById(params?.gradeId), [params?.gradeId]);
  const resolvedCourse = course ?? getLearnCourseById();
  const position = useMemo(
    () => getCourseSkillPosition(resolvedCourse, params?.moduleId),
    [params?.moduleId, resolvedCourse]
  );
  const current = position.current;
  const missingSkill = params?.moduleId && current?.skill.id !== params.moduleId;
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [quizUnlocked, setQuizUnlocked] = useState(false);
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});
  const quizRef = useRef<HTMLDivElement | null>(null);

  const quizItems = useMemo(
    () => [...current.skill.quiz, ...getSkillChallengeQuestions(current.skill.id)],
    [current.skill.id, current.skill.quiz]
  );

  useEffect(() => {
    setAnswers({});
    setQuizUnlocked(false);
    setOpenHints({});
  }, [current.skill.id, resolvedCourse.id]);

  useEffect(() => {
    if (quizUnlocked) {
      quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [quizUnlocked]);

  const answeredCount = quizItems.filter((question) => {
    const key = makeAnswerKey(resolvedCourse.id, current.skill.id, question.id);
    return answers[key] !== undefined;
  }).length;

  const correctCount = quizItems.filter((question) => {
    const key = makeAnswerKey(resolvedCourse.id, current.skill.id, question.id);
    return answers[key] === question.correctIndex;
  }).length;
  const progressPercent = quizItems.length === 0 ? 0 : Math.round((answeredCount / quizItems.length) * 100);

  const text =
    language === "ru"
      ? {
          back: "Назад к курсу",
          lesson: "Урок по навыку",
          lessonStep: "1. Сначала разбор",
          testsStep: "2. Потом тесты",
          summary: "Коротко",
          strategy: "Как думать",
          workedExample: "Разобранный пример",
          checkpoints: "Что держать в голове",
          minutes: "мин",
          questionCount: "вопросов",
          openCourse: "Открыть курс",
          missing: "Навык не найден",
          missingDesc:
            "Похоже, этот навык сейчас недоступен. Вернись на карту курса и выбери другой.",
          understoodTitle: "Сначала прочитай объяснение",
          understoodBody:
            "Тесты откроются только после этого шага. Идея в том, чтобы человек сначала понял ход мысли, а уже потом начал отвечать.",
          understoodCta: "Я понял, перейти к тестам",
          quickCheck: "Тест после объяснения",
          quickCheckBody:
            "Здесь уже есть более сложные вопросы, ближе к реальному SAT-формату. Сначала идёт базовая проверка, затем более трудный вопрос.",
          score: "Результат",
          progress: "Прогресс",
          answered: "отвечено",
          nice: "Верно.",
          review: "Подумай ещё раз.",
          correctAnswer: "Правильный ответ",
          showHint: "Показать подсказку",
          hideHint: "Скрыть подсказку",
          hint: "Подсказка",
          backToCourse: "Вернуться к карте курса",
          prevSkill: "Предыдущий навык",
          nextSkill: "Следующий навык",
          unit: "Юнит",
          challenge: "Сложнее обычного",
          core: "База",
          mastery: "Мастерство",
        }
      : {
          back: "Back to course",
          lesson: "Skill lesson",
          lessonStep: "1. Learn the idea first",
          testsStep: "2. Then open the tests",
          summary: "Summary",
          strategy: "How to think",
          workedExample: "Worked example",
          checkpoints: "Keep these in mind",
          minutes: "min",
          questionCount: "questions",
          openCourse: "Open course",
          missing: "Skill not found",
          missingDesc:
            "This skill does not seem to be available right now. Go back to the course map and open another one.",
          understoodTitle: "Read the explanation first",
          understoodBody:
            "The tests stay locked until this step. The goal is to make sure the learner sees the reasoning before answering.",
          understoodCta: "I got it, go to tests",
          quickCheck: "Test after the lesson",
          quickCheckBody:
            "These questions are now closer to SAT-style challenge. You get the core check first and then a harder challenge item.",
          score: "Score",
          progress: "Progress",
          answered: "answered",
          nice: "Correct.",
          review: "Think it through again.",
          correctAnswer: "Correct answer",
          showHint: "Show hint",
          hideHint: "Hide hint",
          hint: "Hint",
          backToCourse: "Back to course map",
          prevSkill: "Previous skill",
          nextSkill: "Next skill",
          unit: "Unit",
          challenge: "Harder challenge",
          core: "Core",
          mastery: "Mastery",
        };

  if (!course) {
    return (
      <div className="min-h-screen bg-[#f5f5ef]">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center">
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-8">
            <h1 className="text-3xl font-black text-zinc-950">
              {language === "ru" ? "Навык не найден" : "Skill not found"}
            </h1>
            <p className="mt-4 text-zinc-600">
              {language === "ru"
                ? "Похоже, этот навык сейчас недоступен. Вернись на карту курса и выбери другой."
                : "This skill does not seem to be available right now. Go back to the course map and open another one."}
            </p>
            <div className="mt-8 flex justify-center">
              <LinkButton href="/learn">
                {language === "ru" ? "Открыть раздел learn" : "Open learn hub"}
              </LinkButton>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!current || missingSkill) {
    return (
      <div className="min-h-screen bg-[#f5f5ef]">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center">
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-8">
            <h1 className="text-3xl font-black text-zinc-950">{text.missing}</h1>
            <p className="mt-4 text-zinc-600">{text.missingDesc}</p>
            <div className="mt-8 flex justify-center">
              <LinkButton href={`/learn/${resolvedCourse.id}`}>{text.openCourse}</LinkButton>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const skillMedia = getLearnSkillMedia(language, current.unit, current.skill);

  return (
    <div className="min-h-screen bg-[#f5f5ef] text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <SiteHeader />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 subtle-grid opacity-[0.12]" />
        </div>

        <section className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href={`/learn/${resolvedCourse.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition-colors hover:text-sky-700"
          >
            <ArrowLeft className="h-4 w-4" />
            {text.back}
          </Link>

          <div className="mt-6 space-y-6">
            <div className="rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="sky">{text.lesson}</Badge>
                <Badge tone="zinc">
                  {text.unit} {current.unit.order}
                </Badge>
                <Badge tone={statusTone(current.skill.status)}>
                  {statusLabel(current.skill.status, language)}
                </Badge>
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-zinc-950">
                {pickText(language, current.skill.title)}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-zinc-600">
                {pickText(language, current.skill.summary)}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <MetaPill icon={<Clock3 className="h-4 w-4" />}>
                  {current.skill.minutes} {text.minutes}
                </MetaPill>
                <MetaPill icon={<BookOpen className="h-4 w-4" />}>
                  {quizItems.length} {text.questionCount}
                </MetaPill>
                <MetaPill icon={<Target className="h-4 w-4" />}>
                  {pickText(language, current.unit.title)}
                </MetaPill>
              </div>
            </div>

            <LearnMediaCard media={skillMedia} language={language} />

            <div className="rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                {text.lessonStep}
              </p>

              <div className="mt-5 rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                  {text.summary}
                </p>
                <p className="mt-3 text-base leading-relaxed text-zinc-700">
                  <MathText text={pickText(language, current.skill.lesson)} preserveLines />
                </p>
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-sky-200 bg-sky-50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">
                  {text.strategy}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                  <MathText text={pickText(language, current.skill.strategy)} preserveLines />
                </p>
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                  {text.workedExample}
                </p>
                <p className="mt-3 text-base font-semibold leading-relaxed text-zinc-900">
                  <MathText text={pickText(language, current.skill.example.prompt)} preserveLines />
                </p>
                <p className="mt-3 text-sm font-bold text-emerald-700">
                  <MathText text={pickText(language, current.skill.example.answer)} preserveLines />
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                  <MathText
                    text={pickText(language, current.skill.example.explanation)}
                    preserveLines
                  />
                </p>
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                  {text.checkpoints}
                </p>
                <div className="mt-4 space-y-3">
                  {current.skill.checkpoints.map((item) => (
                    <div
                      key={item.en}
                      className="flex items-start gap-3 rounded-[1.25rem] border border-zinc-200 bg-white px-4 py-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                      <p className="text-sm leading-relaxed text-zinc-700">
                        <MathText text={pickText(language, item)} preserveLines />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {!quizUnlocked ? (
              <div className="rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                  {text.testsStep}
                </p>
                <h2 className="mt-3 text-2xl font-black text-zinc-950">{text.understoodTitle}</h2>
                <p className="mt-3 text-base leading-relaxed text-zinc-600">
                  {text.understoodBody}
                </p>
                <div className="mt-6">
                  <Button
                    onClick={() => setQuizUnlocked(true)}
                    className="h-12 rounded-2xl bg-sky-600 px-6 text-base shadow-none hover:bg-sky-700"
                  >
                    {text.understoodCta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : null}

            {quizUnlocked ? (
              <div
                ref={quizRef}
                className="rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                  {text.quickCheck}
                </p>
                <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-2xl">
                    <h2 className="text-2xl font-black text-zinc-950">
                      {pickText(language, current.skill.shortTitle)}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                      {text.quickCheckBody}
                    </p>
                  </div>

                  <div className="rounded-[1.25rem] border border-zinc-200 bg-zinc-50 px-4 py-3 text-center">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                      {text.score}
                    </div>
                    <div className="mt-1 text-2xl font-black text-zinc-950">
                      {correctCount}/{quizItems.length}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-zinc-500">
                      {answeredCount}/{quizItems.length} {text.answered}
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
                      <BarChart3 className="h-4 w-4 text-sky-600" />
                      {text.progress}
                    </div>
                    <div className="text-sm font-bold text-zinc-950">{progressPercent}%</div>
                  </div>
                  <div className="mt-3 h-3 rounded-full bg-zinc-200">
                    <div
                      className="h-full rounded-full bg-sky-600 transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {quizItems.map((question, index) => {
                    const questionKey = makeAnswerKey(
                      resolvedCourse.id,
                      current.skill.id,
                      question.id
                    );
                    const selectedAnswer = answers[questionKey];
                    const isAnswered = selectedAnswer !== undefined;
                    const isCorrect = selectedAnswer === question.correctIndex;
                    const difficulty =
                      question.difficulty ?? (index >= current.skill.quiz.length ? "challenge" : "core");
                    const hintOpen = openHints[questionKey] ?? false;
                    const hintText = question.hint ?? current.skill.strategy;

                    return (
                      <div
                        key={question.id}
                        className={cn(
                          "rounded-[1.5rem] border p-5 transition-colors",
                          isAnswered && isCorrect
                            ? "border-emerald-200 bg-emerald-50/60"
                            : isAnswered
                              ? "border-amber-200 bg-amber-50/50"
                              : "border-zinc-200 bg-zinc-50"
                        )}
                      >
                        <div className="mb-4 flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-sky-100 text-sm font-black text-sky-800">
                              {index + 1}
                            </div>
                            <p className="text-sm font-semibold leading-relaxed text-zinc-900">
                              <MathText text={pickText(language, question.prompt)} preserveLines />
                            </p>
                          </div>

                          <Badge tone={difficultyTone(difficulty)}>
                            {difficultyLabel(difficulty, text)}
                          </Badge>
                        </div>

                        <div className="mb-4 flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenHints((currentHints) => ({
                                ...currentHints,
                                [questionKey]: !currentHints[questionKey],
                              }))
                            }
                            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-zinc-600 transition-colors hover:border-sky-300 hover:text-sky-700"
                          >
                            <Lightbulb className="h-3.5 w-3.5" />
                            {hintOpen ? text.hideHint : text.showHint}
                          </button>
                        </div>

                        {hintOpen ? (
                          <div className="mb-4 rounded-[1.25rem] border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-relaxed text-zinc-700">
                            <span className="font-bold text-sky-700">{text.hint}:</span>{" "}
                            <MathText text={pickText(language, hintText)} preserveLines />
                          </div>
                        ) : null}

                        <div className="grid gap-3">
                          {question.options.map((option, optionIndex) => {
                            const chosen = selectedAnswer === optionIndex;
                            const revealCorrect = isAnswered && optionIndex === question.correctIndex;

                            return (
                              <button
                                key={`${question.id}-${optionIndex}`}
                                type="button"
                                onClick={() =>
                                  setAnswers((currentAnswers) => ({
                                    ...currentAnswers,
                                    [questionKey]: optionIndex,
                                  }))
                                }
                                className={cn(
                                  "rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all",
                                  chosen && isCorrect
                                    ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                                    : chosen
                                      ? "border-red-400 bg-red-50 text-red-800"
                                      : revealCorrect
                                        ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                                        : "border-zinc-200 bg-white text-zinc-700 hover:border-sky-300 hover:bg-sky-50"
                                )}
                              >
                                <MathText text={pickText(language, option)} preserveLines />
                              </button>
                            );
                          })}
                        </div>

                        {isAnswered ? (
                          <div
                            className={cn(
                              "mt-4 rounded-2xl border px-4 py-3 text-sm leading-relaxed",
                              isCorrect
                                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                : "border-amber-200 bg-amber-50 text-amber-800"
                            )}
                          >
                            <div className="font-bold">{isCorrect ? text.nice : text.review}</div>
                            <div className="mt-1">
                              <span className="font-bold">{text.correctAnswer}:</span>{" "}
                              <MathText
                                text={pickText(language, question.options[question.correctIndex])}
                                preserveLines
                              />
                            </div>
                            <div className="mt-2">
                              <MathText
                                text={pickText(language, question.explanation)}
                                preserveLines
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row">
                {position.previous ? (
                  <LinkButton href={`/learn/${resolvedCourse.id}/${position.previous.skill.id}`} variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {text.prevSkill}
                  </LinkButton>
                ) : null}

                <LinkButton href={`/learn/${resolvedCourse.id}`} variant="outline">
                  {text.backToCourse}
                </LinkButton>

                {position.next ? (
                  <LinkButton
                    href={`/learn/${resolvedCourse.id}/${position.next.skill.id}`}
                    variant="primary"
                    className="bg-sky-600 shadow-none hover:bg-sky-700 sm:ml-auto"
                  >
                    {text.nextSkill}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </LinkButton>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MetaPill({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm font-semibold text-zinc-700">
      {icon}
      {children}
    </div>
  );
}

function Badge({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "sky" | "zinc" | "emerald" | "amber" | "orange";
}) {
  const styles = {
    sky: "border-sky-200 bg-sky-50 text-sky-700",
    zinc: "border-zinc-200 bg-zinc-50 text-zinc-700",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]",
        styles[tone]
      )}
    >
      {children}
    </div>
  );
}

function statusLabel(status: SkillStatus, language: "en" | "ru") {
  const labels = {
    mastered: { en: "Mastered", ru: "Освоено" },
    proficient: { en: "Proficient", ru: "Уверенно" },
    familiar: { en: "Familiar", ru: "Знакомо" },
    attempted: { en: "Attempted", ru: "Пробовал" },
    not_started: { en: "Not started", ru: "Не начато" },
  };

  return labels[status][language];
}

function statusTone(status: SkillStatus): "emerald" | "sky" | "amber" | "orange" | "zinc" {
  const tones = {
    mastered: "emerald",
    proficient: "sky",
    familiar: "amber",
    attempted: "orange",
    not_started: "zinc",
  } as const;

  return tones[status];
}

function difficultyLabel(
  difficulty: "core" | "challenge" | "mastery",
  text: { core: string; challenge: string; mastery: string }
) {
  const labels = {
    core: text.core,
    challenge: text.challenge,
    mastery: text.mastery,
  };

  return labels[difficulty];
}

function difficultyTone(difficulty: "core" | "challenge" | "mastery"): "sky" | "amber" | "emerald" {
  const tones = {
    core: "sky",
    challenge: "amber",
    mastery: "emerald",
  } as const;

  return tones[difficulty];
}
