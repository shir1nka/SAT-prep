"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  Clock3,
  Search,
  Sparkles,
  Target,
} from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import MathText from "@/components/MathText";
import { useLanguage } from "@/lib/language-context";
import { ACCENT } from "@/lib/learn/accent";
import {
  SECTIONS,
  getDomain,
  getDomainTopics,
  getDomains,
  getSectionStats,
  getSectionTopics,
  pick,
  type LearnSectionId,
} from "@/lib/learn";
import { useLearnProgress } from "@/lib/learn/progress";
import { cn } from "@/lib/utils";

const OLD_SECTION_ALIASES: Record<string, LearnSectionId> = {
  "sat-math": "math",
  "sat-reading-writing": "english",
  "sat-reading": "english",
};

export default function LearnSectionPage() {
  const params = useParams<{ section: string }>();
  const router = useRouter();
  const { language } = useLanguage();
  const progress = useLearnProgress();
  const [query, setQuery] = useState("");

  const rawSection = params?.section ?? "";
  const alias = OLD_SECTION_ALIASES[rawSection];
  const sectionId: LearnSectionId | null =
    rawSection === "math" || rawSection === "english" ? rawSection : alias ?? null;

  useEffect(() => {
    if (alias) {
      router.replace(`/learn/${alias}`);
    }
  }, [alias, router]);

  const section = sectionId ? SECTIONS[sectionId] : null;
  const topics = useMemo(() => (sectionId ? getSectionTopics(sectionId) : []), [sectionId]);
  const domains = useMemo(() => (sectionId ? getDomains(sectionId) : []), [sectionId]);
  const stats = useMemo(() => (sectionId ? getSectionStats(sectionId) : null), [sectionId]);

  const completed = useMemo(
    () => new Set(progress.completed),
    [progress.completed]
  );
  const completedCount = topics.filter((topic) => completed.has(topic.id)).length;
  const percent = topics.length === 0 ? 0 : Math.round((completedCount / topics.length) * 100);

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      topics.filter((topic) => {
        if (!normalizedQuery) {
          return true;
        }
        return [
          topic.title.en,
          topic.title.ru,
          topic.subtitle.en,
          topic.subtitle.ru,
          topic.tags.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      }),
    [normalizedQuery, topics]
  );

  const copy =
    language === "ru"
      ? {
          back: "Все секции",
          topics: "темы",
          questions: "вопросов",
          minutes: "минут",
          complete: "пройдено",
          search: "Найти тему или навык",
          placeholder: "Например: системы, проценты, запятые...",
          openTopic: "Открыть тему",
          empty: "Ничего не найдено",
          emptyBody: "Попробуй другой запрос или очисти поиск.",
          clear: "Очистить",
          bank: "Банк вопросов",
          bankBody: "Все вопросы тестов 4–6 с ответами и разборами.",
          desmos: "Desmos Mastery",
          desmosBody: "Рецепты калькулятора, которые экономят минуты.",
          content: "Программа",
          done: "Пройдено",
          notFound: "Секция не найдена",
          notFoundBody: "Такой секции нет. Вернись в Learn и выбери English или Math.",
        }
      : {
          back: "All sections",
          topics: "topics",
          questions: "questions",
          minutes: "minutes",
          complete: "complete",
          search: "Find a topic or skill",
          placeholder: "For example: systems, percents, commas...",
          openTopic: "Open topic",
          empty: "Nothing found",
          emptyBody: "Try another query or clear the search.",
          clear: "Clear",
          bank: "Question bank",
          bankBody: "All questions from tests 4–6 with answers and explanations.",
          desmos: "Desmos Mastery",
          desmosBody: "Calculator recipes that save whole minutes.",
          content: "Curriculum",
          done: "Complete",
          notFound: "Section not found",
          notFoundBody: "That section does not exist. Go back to Learn and pick English or Math.",
        };

  if (!sectionId || !section || !stats) {
    return (
      <div className="min-h-screen text-foreground">
        <SiteHeader />
        <main className="mx-auto max-w-2xl px-4 py-24 text-center">
          <h1 className="text-3xl font-black text-foreground">{copy.notFound}</h1>
          <p className="mt-4 text-muted-foreground">{copy.notFoundBody}</p>
          <Link
            href="/learn"
            className="mt-8 inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-5 py-3 text-sm font-semibold text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {copy.back}
          </Link>
        </main>
      </div>
    );
  }

  const accent = ACCENT[section.accent as keyof typeof ACCENT];

  return (
    <div className="min-h-screen text-foreground">
      <SiteHeader />

      <main className="relative overflow-hidden pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(150,93,255,0.14),transparent_36%)]" />
          <div className="absolute inset-0 subtle-grid opacity-[0.14]" />
        </div>

        <section className="relative mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {copy.back}
          </Link>

          <div className="mt-5 rounded-[2rem] border border-border bg-card/80 p-7 backdrop-blur-xl sm:p-9">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className={cn("text-xs font-bold uppercase tracking-[0.24em]", accent.text)}>
                  {pick(language, section.kicker)}
                </p>
                <h1 className="mt-2 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                  {pick(language, section.title)}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {pick(language, section.summary)}
                </p>
              </div>

              <div className="grid w-full shrink-0 grid-cols-3 gap-2 lg:w-auto">
                {[
                  { value: stats.topics, label: copy.topics },
                  { value: stats.questions, label: copy.questions },
                  { value: stats.minutes, label: copy.minutes },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="min-w-[86px] rounded-2xl border border-border bg-secondary/60 px-3 py-3 text-center"
                  >
                    <p className="text-xl font-black text-foreground">{item.value}</p>
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {completedCount}/{stats.topics} {copy.complete}
                </span>
                <span>{percent}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className={cn("h-full rounded-full transition-all", accent.dot)}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {domains.map((domain) => {
                const domainAccent = ACCENT[domain.accent];
                return (
                  <a
                    key={domain.id}
                    href={`#${domain.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full", domainAccent.dot)} />
                    {pick(language, domain.shortTitle)}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.placeholder}
                className="h-11 w-full rounded-xl border border-border bg-card/70 pl-10 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-violet-400/50"
                aria-label={copy.search}
              />
            </div>
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground"
              >
                {copy.clear}
              </button>
            ) : null}
          </div>
        </section>

        <section className="relative mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="rounded-[2rem] border border-border bg-card/70 p-10 text-center">
              <p className="text-xl font-bold text-foreground">{copy.empty}</p>
              <p className="mt-2 text-sm text-muted-foreground">{copy.emptyBody}</p>
            </div>
          ) : (
            <div className="space-y-10">
              {domains.map((domain) => {
                const domainTopics = getDomainTopics(sectionId, domain.id).filter((topic) =>
                  filtered.some((item) => item.id === topic.id)
                );
                if (domainTopics.length === 0) {
                  return null;
                }
                const domainAccent = ACCENT[domain.accent];

                return (
                  <div key={domain.id} id={domain.id} className="scroll-mt-24">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={cn("h-2 w-2 rounded-full", domainAccent.dot)} />
                          <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                            {language === "ru" ? "Домен" : "Domain"} {domain.order}
                          </p>
                        </div>
                        <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground">
                          {pick(language, domain.title)}
                        </h2>
                        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                          {pick(language, domain.summary)}
                        </p>
                      </div>
                      <span className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-semibold text-muted-foreground">
                        {domainTopics.length} {copy.topics}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {domainTopics.map((topic) => {
                        const isDone = completed.has(topic.id);
                        const result = progress.practice[topic.id];
                        return (
                          <Link
                            key={topic.id}
                            href={`/learn/${sectionId}/${topic.id}`}
                            className={cn(
                              "group relative overflow-hidden rounded-2xl border bg-card/70 p-5 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-card",
                              isDone ? "border-emerald-400/30" : "border-border hover:border-foreground/20"
                            )}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <span
                                  className={cn(
                                    "flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black",
                                    domainAccent.bg,
                                    domainAccent.text
                                  )}
                                >
                                  {topic.order}
                                </span>
                                {isDone ? (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-300">
                                    <CheckCircle2 className="h-3 w-3" />
                                    {copy.done}
                                  </span>
                                ) : null}
                                {sectionId === "math" && topic.desmos?.length ? (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-300">
                                    <Calculator className="h-3 w-3" />
                                    Desmos
                                  </span>
                                ) : null}
                              </div>
                              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                            </div>

                            <h3 className="mt-3 text-lg font-bold leading-snug text-foreground">
                              <MathText text={pick(language, topic.title)} />
                            </h3>
                            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                              <MathText text={pick(language, topic.subtitle)} preserveLines />
                            </p>

                            <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] font-semibold text-muted-foreground">
                              <span className="inline-flex items-center gap-1">
                                <Clock3 className="h-3.5 w-3.5" />
                                {topic.minutes} {language === "ru" ? "мин" : "min"}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <Target className="h-3.5 w-3.5" />
                                {topic.practice.length} {copy.questions}
                              </span>
                              {result ? (
                                <span className="inline-flex items-center gap-1 text-emerald-300">
                                  <Sparkles className="h-3.5 w-3.5" />
                                  {result.correct}/{result.total}
                                </span>
                              ) : null}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="relative mx-auto mt-12 grid max-w-6xl gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {sectionId === "math" ? (
            <Link
              href="/learn/math/desmos"
              className="group rounded-2xl border border-violet-400/25 bg-violet-500/10 p-6 transition-all hover:-translate-y-0.5 hover:border-violet-300/40"
            >
              <div className="flex items-center gap-2 text-violet-200">
                <Calculator className="h-5 w-5" />
                <span className="font-bold">{copy.desmos}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{copy.desmosBody}</p>
            </Link>
          ) : (
            <div className="rounded-2xl border border-border bg-card/60 p-6">
              <div className="flex items-center gap-2 text-amber-200">
                <BookOpen className="h-5 w-5" />
                <span className="font-bold">{copy.content}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {language === "ru"
                  ? "Каждая тема — это тип вопроса из реального теста, а не глава учебника."
                  : "Every topic is a real question type from the test, not a textbook chapter."}
              </p>
            </div>
          )}

          <Link
            href="/learn/bank"
            className="group rounded-2xl border border-border bg-card/60 p-6 transition-all hover:-translate-y-0.5 hover:border-emerald-400/30"
          >
            <div className="flex items-center gap-2 text-emerald-200">
              <Target className="h-5 w-5" />
              <span className="font-bold">{copy.bank}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{copy.bankBody}</p>
          </Link>
        </section>
      </main>
    </div>
  );
}
