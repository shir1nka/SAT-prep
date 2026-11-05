"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Beaker, CheckCircle2, Circle, Flame, Search, Sparkles, Target, Trophy } from "lucide-react";

import { DesmosProvider } from "@/components/learn/Desmos";
import { XpBar } from "@/components/learn/XpBar";
import MathText from "@/components/MathText";
import SiteHeader from "@/components/SiteHeader";
import { useLanguage } from "@/lib/language-context";
import { REAL_DOMAINS, REAL_QUESTIONS } from "@/lib/learn/real";
import { useLearnProgress } from "@/lib/learn/progress";
import { cn } from "@/lib/utils";

const TESTS = [4, 5, 6];
const DIFFS = ["easy", "medium", "hard"] as const;

export default function RealLabPage() {
  const { language } = useLanguage();
  const progress = useLearnProgress();
  const [testFilter, setTestFilter] = useState<number | "all">("all");
  const [sectionFilter, setSectionFilter] = useState<"all" | "math" | "english">("all");
  const [domainFilter, setDomainFilter] = useState<string | "all">("all");
  const [diffFilter, setDiffFilter] = useState<string | "all">("all");
  const [query, setQuery] = useState("");

  const copy =
    language === "ru"
      ? {
          back: "К Learn",
          kicker: "Real Test Lab",
          title: "Реальные задачи из официальных тестов.",
          description:
            "Каждая задача — как на экзамене: стандартный разбор по шагам и быстрый Desmos-путь с точными выражениями. Реши, посмотри оба пути, заработай XP.",
          test: "Тест",
          all: "Все",
          section: "Секция",
          domain: "Домен",
          difficulty: "Сложность",
          search: "Поиск по условию…",
          solved: "решено",
          questions: "задач",
          noResults: "Ничего не нашлось. Попробуй сбросить фильтры.",
          reset: "Сбросить",
          xp: "XP",
        }
      : {
          back: "Back to Learn",
          kicker: "Real Test Lab",
          title: "Real tasks from official practice tests.",
          description:
            "Every question is exam-real: a step-by-step standard solution plus a fast Desmos path with exact expressions. Solve, compare both paths, earn XP.",
          test: "Test",
          all: "All",
          section: "Section",
          domain: "Domain",
          difficulty: "Difficulty",
          search: "Search the prompt…",
          solved: "solved",
          questions: "questions",
          noResults: "Nothing matched. Try resetting filters.",
          reset: "Reset",
          xp: "XP",
        };

  const filtered = useMemo(() => {
    return REAL_QUESTIONS.filter((q) => {
      if (testFilter !== "all" && q.test !== testFilter) return false;
      if (sectionFilter !== "all" && q.section !== sectionFilter) return false;
      if (domainFilter !== "all" && q.domainId !== domainFilter) return false;
      if (diffFilter !== "all" && q.difficulty !== diffFilter) return false;
      if (query.trim()) {
        const hay = `${q.prompt.en} ${q.prompt.ru} ${q.domainLabel} t${q.test} m${q.module} q${q.number}`.toLowerCase();
        if (!hay.includes(query.trim().toLowerCase())) return false;
      }
      return true;
    }).sort((a, b) => a.test - b.test || a.section.localeCompare(b.section) || a.number - b.number);
  }, [testFilter, sectionFilter, domainFilter, diffFilter, query]);

  const solvedCount = Object.keys(progress.quizzes).filter((id) => REAL_QUESTIONS.some((q) => q.id === id)).length;

  return (
    <DesmosProvider enabled>
      <div className="min-h-screen text-foreground">
        <SiteHeader />
        <main className="relative overflow-hidden pb-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(16,185,129,0.14),transparent_38%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.12),transparent_35%)]" />
            <div className="absolute inset-0 subtle-grid opacity-[0.12]" />
          </div>

          <section className="relative mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
            <Link href="/learn" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> {copy.back}
            </Link>

            <div className="animate-float-up relative mt-5 overflow-hidden rounded-[2rem] border border-emerald-400/25 bg-gradient-to-br from-emerald-600/20 via-card to-card p-7 backdrop-blur-xl sm:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-emerald-100">
                  <Beaker className="h-3.5 w-3.5" /> {copy.kicker}
                </div>
                <h1 className="mt-5 max-w-3xl bg-gradient-to-r from-white via-emerald-100 to-sky-100 bg-clip-text text-4xl font-black leading-[1.02] tracking-tight text-transparent sm:text-5xl">
                  {copy.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300">{copy.description}</p>
                <div className="mt-6">
                  <XpBar compact />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-100">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {solvedCount}/{REAL_QUESTIONS.length} {copy.solved}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-100">
                    <Flame className="h-3.5 w-3.5" /> +15 XP {language === "ru" ? "за каждую задачу" : "per question"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-100">
                    <Sparkles className="h-3.5 w-3.5" /> {REAL_QUESTIONS.length} {copy.questions}
                  </span>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="mt-6 rounded-3xl border border-border bg-card/70 p-4 backdrop-blur-xl">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={copy.search}
                  className="w-full rounded-xl border border-border bg-secondary/60 py-2.5 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-violet-400/50"
                />
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {copy.test}
                  <select
                    value={testFilter}
                    onChange={(e) => setTestFilter(e.target.value === "all" ? "all" : Number(e.target.value))}
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/60 px-3 py-2 text-sm font-semibold text-foreground"
                  >
                    <option value="all">{copy.all}</option>
                    {TESTS.map((t) => (
                      <option key={t} value={t}>Test {t}</option>
                    ))}
                  </select>
                </label>
                <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {copy.section}
                  <select
                    value={sectionFilter}
                    onChange={(e) => setSectionFilter(e.target.value as "all" | "math" | "english")}
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/60 px-3 py-2 text-sm font-semibold text-foreground"
                  >
                    <option value="all">{copy.all}</option>
                    <option value="math">Math</option>
                    <option value="english">Reading & Writing</option>
                  </select>
                </label>
                <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {copy.domain}
                  <select
                    value={domainFilter}
                    onChange={(e) => setDomainFilter(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/60 px-3 py-2 text-sm font-semibold text-foreground"
                  >
                    <option value="all">{copy.all}</option>
                    {REAL_DOMAINS.map((d) => (
                      <option key={d.id} value={d.id}>{d.label}</option>
                    ))}
                  </select>
                </label>
                <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {copy.difficulty}
                  <select
                    value={diffFilter}
                    onChange={(e) => setDiffFilter(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/60 px-3 py-2 text-sm font-semibold text-foreground"
                  >
                    <option value="all">{copy.all}</option>
                    {DIFFS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {filtered.length} / {REAL_QUESTIONS.length} {copy.questions}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setTestFilter("all");
                    setSectionFilter("all");
                    setDomainFilter("all");
                    setDiffFilter("all");
                    setQuery("");
                  }}
                  className="text-xs font-bold text-violet-300 hover:text-violet-200"
                >
                  {copy.reset}
                </button>
              </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="mt-8 rounded-3xl border border-border bg-card/60 p-10 text-center text-sm text-muted-foreground">{copy.noResults}</div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((q, i) => {
                  const done = !!progress.quizzes[q.id];
                  return (
                    <Link
                      key={q.id}
                      href={`/learn/real/${q.id}`}
                      className="animate-float-up group relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-[#12121a] to-card/80 p-5 backdrop-blur-xl transition-all duration-400 hover:-translate-y-1 hover:border-emerald-400/30 hover:shadow-[0_20px_50px_rgba(16,185,129,0.14)]"
                      style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-emerald-200">
                          Test {q.test} · M{q.module} · Q{q.number}
                        </span>
                        {done ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-200">
                            <CheckCircle2 className="h-3 w-3" /> +15 XP
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                            <Circle className="h-3 w-3" /> {q.difficulty}
                          </span>
                        )}
                        <span className="ml-auto text-[11px] font-semibold text-muted-foreground">
                          {q.section === "math" ? "Math" : "RW"}
                        </span>
                      </div>
                      <p className="mt-3 line-clamp-3 text-sm font-semibold leading-relaxed text-zinc-100">
                        <MathText text={q.prompt[language]} />
                      </p>
                      <p className="mt-2 text-xs font-semibold text-muted-foreground">
                        <Target className="mr-1 inline h-3.5 w-3.5" />
                        {q.domainLabel}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-200">
                        <Trophy className="h-3.5 w-3.5" />
                        {language === "ru" ? "Открыть разбор" : "Open solutions"}
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </main>
      </div>
    </DesmosProvider>
  );
}
