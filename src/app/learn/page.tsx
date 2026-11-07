"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Beaker,
  BookOpen,
  Calculator,
  CheckCircle2,
  GraduationCap,
  Layers3,
  Target,
  Zap,
} from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import { XpBar } from "@/components/learn/XpBar";
import { useLanguage } from "@/lib/language-context";
import { ACCENT } from "@/lib/learn/accent";
import {
  SECTIONS,
  TOTAL_STATS,
  getDomain,
  getDomains,
  getSectionStats,
  getSectionTopics,
  pick,
  type LearnSectionId,
} from "@/lib/learn";
import { useLearnProgress } from "@/lib/learn/progress";
import { cn } from "@/lib/utils";

const QUESTION_BANK_TOTAL = 360;

export default function LearnPage() {
  const { language } = useLanguage();
  const progress = useLearnProgress();

  const copy =
    language === "ru"
      ? {
          kicker: "SAT Learn",
          title: "Учись так, как тебя проверяют.",
          description:
            "Две секции — English и Math — разобраны по темам. В каждой: теория, примеры, ловушки, практика из реальных тестов и Desmos там, где он реально экономит время.",
          topics: "тем",
          questions: "вопросов",
          minutes: "минут контента",
          sections: "Секции",
          open: "Открыть секцию",
          progress: "пройдено",
          domains: "домены",
          desmosTitle: "Desmos в математике",
          desmosBody:
            "Что ввести, на что нажать и что прочитать. Пересечения, корни, таблицы, слайдеры, регрессия и неравенства. Каждый шаг открывается в Desmos в один клик.",
          desmosCta: "Открыть Desmos-блок",
          bankTitle: `Банк вопросов · ${QUESTION_BANK_TOTAL}`,
          bankBody:
            "Все вопросы из трёх полных официальных тестов (4, 5, 6): фильтры по домену, теме, сложности и источнику. Ответы и разборы внутри.",
          bankCta: "Открыть банк",
          howTitle: "Как проходить",
          how: [
            {
              title: "Выбери секцию",
              body: "English или Math. Внутри — домены и темы в порядке, в котором они дают больше всего баллов.",
            },
            {
              title: "Разбери тему",
              body: "Теория короткая. Дальше 2 разобранных примера и список ловушек, которые встречаются в тестах.",
            },
            {
              title: "Реши практику",
              body: "4–6 вопросов из реальных тестов. Сразу видно ответ, разбор и как это же решается в Desmos.",
            },
          ],
          math: "Math Section",
          english: "English SAT",
          go: "Начать",
          minutesShort: "мин",
        }
      : {
          kicker: "SAT Learn",
          title: "Learn the way the test asks.",
          description:
            "Two sections — English and Math — broken into topics. Every topic has the theory, worked examples, trap lists, real practice from official tests, and Desmos where it actually saves time.",
          topics: "topics",
          questions: "questions",
          minutes: "minutes of content",
          sections: "Sections",
          open: "Open section",
          progress: "complete",
          domains: "domains",
          desmosTitle: "Desmos for math",
          desmosBody:
            "What to type, what to click, and what to read. Intersections, roots, tables, sliders, regression, and inequalities. Each step can be opened in Desmos with one click.",
          desmosCta: "Open the Desmos track",
          bankTitle: `Question bank · ${QUESTION_BANK_TOTAL}`,
          bankBody:
            "Every question from three full official tests (4, 5, 6), filterable by domain, topic, difficulty, and source. Answers and explanations included.",
          bankCta: "Open the bank",
          howTitle: "How to use it",
          how: [
            {
              title: "Pick a section",
              body: "English or Math. Inside, domains and topics are ordered by how many points they are worth.",
            },
            {
              title: "Study the topic",
              body: "The theory is short. Then two worked examples and the trap list that shows up on the real test.",
            },
            {
              title: "Do the practice",
              body: "4–6 questions from real tests, with the answer, the reasoning, and the Desmos route.",
            },
          ],
          math: "Math Section",
          english: "English SAT",
          go: "Start",
          minutesShort: "min",
        };

  const sectionStats = (section: LearnSectionId) => getSectionStats(section);
  const sectionCompleted = (section: LearnSectionId) => {
    const ids = new Set(getSectionTopics(section).map((topic) => topic.id));
    return progress.completed.filter((id) => ids.has(id)).length;
  };

  return (
    <div className="min-h-screen text-foreground">
      <SiteHeader />

      <main className="relative pb-24">
        <section className="relative mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
          <div className="rounded-2xl border border-border bg-card p-7 sm:p-10">
            <h1 className="mt-2 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              {copy.description}
            </p>

            <XpBar className="mt-6" />

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { value: TOTAL_STATS.topics, label: copy.topics, icon: Layers3, grad: "from-violet-500/20 to-violet-500/5 text-violet-300" },
                { value: QUESTION_BANK_TOTAL, label: copy.questions, icon: Target, grad: "from-sky-500/20 to-sky-500/5 text-sky-300" },
                { value: TOTAL_STATS.minutes, label: copy.minutes, icon: BookOpen, grad: "from-emerald-500/20 to-emerald-500/5 text-emerald-300" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className={`group flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-4`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xl font-black leading-none text-white">{item.value}</p>
                    <p className="mt-1 text-xs font-semibold text-zinc-400">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-2">
            {(["english", "math"] as LearnSectionId[]).map((sectionId, si) => {
              const section = SECTIONS[sectionId];
              const stats = sectionStats(sectionId);
              const completed = sectionCompleted(sectionId);
              const percent = stats.topics === 0 ? 0 : Math.round((completed / stats.topics) * 100);
              const accent = ACCENT[section.accent as keyof typeof ACCENT];
              const domains = getDomains(sectionId);

              return (
                <Link
                  key={sectionId}
                  href={`/learn/${sectionId}`}
                  className={cn(
                    "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-7",
                  )}
                >
                  <div className={cn("absolute inset-x-0 top-0 h-px", accent.bg)} />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className={cn("text-xs font-bold uppercase tracking-[0.22em]", accent.text)}>
                        {pick(language, section.kicker)}
                      </p>
                      <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground">
                        {pick(language, section.title)}
                      </h2>
                    </div>
                    <span
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border",
                        accent.bg,
                        accent.border,
                        accent.text
                      )}
                    >
                      {sectionId === "math" ? (
                        <Calculator className="h-6 w-6" />
                      ) : (
                        <BookOpen className="h-6 w-6" />
                      )}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {pick(language, section.summary)}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {domains.map((domain) => (
                      <span
                        key={domain.id}
                        className="rounded-full border border-border bg-secondary/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                      >
                        {pick(language, domain.shortTitle)}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-xl border border-border bg-secondary/50 px-2 py-2">
                      <p className="text-lg font-black text-foreground">{stats.topics}</p>
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        {copy.topics}
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-secondary/50 px-2 py-2">
                      <p className="text-lg font-black text-foreground">{stats.questions}</p>
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        {copy.questions}
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-secondary/50 px-2 py-2">
                      <p className="text-lg font-black text-foreground">{stats.minutes}</p>
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        {copy.minutesShort}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {completed}/{stats.topics} {copy.progress}
                      </span>
                      <span>{percent}%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div
                        className={cn("h-full rounded-full transition-all", accent.dot)}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-foreground">
                    {copy.open}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="relative mx-auto mt-6 grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <Link
            href="/learn/math/desmos"
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-200">
                <Calculator className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-violet-300">
                  {pick(language, SECTIONS.math.kicker)}
                </p>
                <h3 className="text-2xl font-black text-foreground">{copy.desmosTitle}</h3>
              </div>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {copy.desmosBody}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-semibold text-violet-200">
              {["intersections", "roots", "tables", "sliders", "regression", "inequalities"].map(
                (item) => (
                  <span key={item} className="rounded-full border border-violet-400/25 bg-violet-500/10 px-2.5 py-1">
                    {item}
                  </span>
                )
              )}
            </div>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-200">
              {copy.desmosCta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/learn/math/bank"
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                <BarChart3 className="h-5 w-5" />
              </span>
              <h3 className="text-2xl font-black text-foreground">{copy.bankTitle}</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{copy.bankBody}</p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200">
              {copy.bankCta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/learn/real"
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 lg:col-span-2"
          >
            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-zinc-200">
                  <Beaker className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-300">Real Test Lab</p>
                  <h3 className="text-2xl font-black text-foreground">{language === "ru" ? "Реальные задачи из тестов 4–6" : "Real tasks from Tests 4–6"}</h3>
                </div>
              </div>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-100">+15 XP / {language === "ru" ? "задача" : "question"}</span>
            </div>
            <p className="relative mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {language === "ru"
                ? "Настоящие вопросы из официальных PDF: стандартный разбор по шагам + быстрый Desmos-путь с точными выражениями. Каждый — проверен 3 раза: условие из PDF, независимый пересчёт, проверка выражений Desmos."
                : "Real questions from the official PDFs: standard step-by-step solution + fast Desmos path with exact expressions. Each triple-checked: PDF prompt, independent recalculation, Desmos expressions."}
            </p>
            <div className="relative mt-5 flex flex-wrap gap-2 text-[11px] font-bold text-emerald-100">
              {["Test 4", "Test 5", "Test 6", "Math", "RW", "SPR + MCQ"].map((item) => (
                <span key={item} className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-1">
                  {item}
                </span>
              ))}
            </div>
            <div className="relative mt-6 inline-flex items-center gap-2 text-sm font-black text-emerald-200">
              {language === "ru" ? "Открыть лабораторию" : "Open the lab"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </section>

        <section className="relative mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-7">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Zap className="h-4 w-4 text-amber-300" />
              {copy.howTitle}
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {copy.how.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-border bg-secondary/50 p-5"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/15 text-sm font-black text-violet-200">
                    {index + 1}
                  </span>
                  <p className="mt-3 font-bold text-foreground">{step.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto mt-6 max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-secondary/40 px-5 py-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              {language === "ru"
                ? "Прогресс сохраняется в браузере — можно закрыть и вернуться."
                : "Progress is saved in your browser — close it and come back later."}
            </span>
            <span className="inline-flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-violet-300" />
              {language === "ru" ? "SAT · English + Math" : "SAT · English + Math"}
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
