"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calculator,
  Check,
  Copy,
  Languages,
  Search,
  Sigma,
  X,
} from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import MathText from "@/components/MathText";
import { useLanguage } from "@/lib/language-context";
import { SAT_TERMS, type SatTermSection } from "@/lib/learn/terms";
import { cn } from "@/lib/utils";

type Filter = "all" | SatTermSection;

const FILTER_META: Record<Filter, { en: string; ru: string; icon: typeof BookOpen }> = {
  all: { en: "All", ru: "Все", icon: Languages },
  english: { en: "English", ru: "English", icon: BookOpen },
  math: { en: "Math", ru: "Математика", icon: Sigma },
  desmos: { en: "Desmos", ru: "Desmos", icon: Calculator },
};

function TermCard({ term, index, language }: { term: (typeof SAT_TERMS)[number]; index: number; language: "en" | "ru" }) {
  const [copied, setCopied] = useState(false);
  const copyText = `${term.term} — ${term.ruTranslation}${term.notation ? ` — ${term.notation}` : ""}. ${language === "ru" ? term.defRu : term.defEn}`;

  return (
    <article
      className="animate-float-up group relative overflow-hidden rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-violet-400/30"
      style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
    >
      <span aria-hidden="true" className="animate-float-slow pointer-events-none absolute -right-3 -top-3 opacity-[0.06]">
        {term.section === "math" ? <Sigma className="h-20 w-20" /> : term.section === "desmos" ? <Calculator className="h-20 w-20" /> : <BookOpen className="h-20 w-20" />}
      </span>
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-black tracking-tight text-foreground">{term.term}</h3>
          <p className="mt-0.5 text-sm font-semibold text-violet-200">{term.ruTranslation}</p>
        </div>
        <button
          type="button"
          aria-label={language === "ru" ? "Копировать термин" : "Copy term"}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(copyText);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1400);
            } catch {
              setCopied(false);
            }
          }}
          className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-border bg-secondary/60 px-2 py-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? (language === "ru" ? "Ок" : "Done") : language === "ru" ? "Копия" : "Copy"}
        </button>
      </div>

      {term.notation ? (
        <div className="relative mt-3 rounded-xl border border-violet-400/20 bg-violet-500/[0.07] px-3 py-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-300">
            {language === "ru" ? "Обозначение" : "Notation"}
          </p>
          <code className="mt-0.5 block font-mono text-sm text-violet-100">
            <MathText text={term.notation} />
          </code>
        </div>
      ) : null}

      <div className="relative mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
        <p><span className="font-semibold text-foreground/80">EN · </span>{term.defEn}</p>
        <p><span className="font-semibold text-foreground/80">RU · </span>{term.defRu}</p>
      </div>
    </article>
  );
}

export default function SatTermsPage() {
  const { language } = useLanguage();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const copy =
    language === "ru"
      ? {
          back: "К урокам",
          kicker: "Термины SAT",
          title: "Все термины в одном месте.",
          description:
            "Английский термин, перевод на русский, обозначение и короткое объяснение на двух языках. Ищи по названию, переводу или формуле.",
          search: "Поиск: slope, наклон, y = mx + b…",
          terms: "терминов",
          noResults: "Ничего не нашлось. Попробуй другое слово или сбрось фильтр.",
          reset: "Сбросить",
          translation: "Перевод",
          notation: "Обозначение",
          meaning: "Значение",
          openLearn: "Вернуться к урокам",
          count: (n: number) => `${n} ${n === 1 ? "термин" : n < 5 ? "термина" : "терминов"}`,
        }
      : {
          back: "Back to lessons",
          kicker: "SAT terms",
          title: "Every SAT term, translated.",
          description:
            "English term, Russian translation, notation, and a short meaning in both languages. Search by name, translation, or formula.",
          search: "Search: slope, intercept, y = mx + b…",
          terms: "terms",
          noResults: "Nothing found. Try another word or clear the filter.",
          reset: "Reset",
          translation: "Translation",
          notation: "Notation",
          meaning: "Meaning",
          openLearn: "Back to lessons",
          count: (n: number) => `${n} terms`,
        };

  const counts = useMemo(() => {
    const map: Record<Filter, number> = { all: SAT_TERMS.length, english: 0, math: 0, desmos: 0 };
    for (const t of SAT_TERMS) map[t.section] += 1;
    return map;
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAT_TERMS.filter((t) => {
      if (filter !== "all" && t.section !== filter) return false;
      if (!q) return true;
      const hay = `${t.term} ${t.ruTranslation} ${t.notation ?? ""} ${t.defEn} ${t.defRu}`.toLowerCase();
      return q.split(/\s+/).every((part) => hay.includes(part));
    });
  }, [query, filter]);

  return (
    <div className="min-h-screen text-foreground">
      <SiteHeader />
      <main className="relative overflow-hidden pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(150,93,255,0.16),transparent_38%),radial-gradient(circle_at_85%_10%,rgba(56,189,248,0.10),transparent_35%)]" />
          <div className="absolute inset-0 subtle-grid opacity-[0.16]" />
        </div>

        <section className="relative mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
          <Link href="/learn" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            {copy.back}
          </Link>

          <div className="animate-float-up relative mt-5 overflow-hidden rounded-[2rem] border border-violet-400/25 bg-gradient-to-br from-violet-600/25 via-[#12121a] to-card p-7 backdrop-blur-xl sm:p-10">
            <div className="animate-float-slow pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-violet-500/25 blur-3xl" />
            <div className="animate-float-slower pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-fuchsia-500/15 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/30 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">
                <Languages className="h-3.5 w-3.5" />
                {copy.kicker}
              </div>
              <h1 className="gradient-animated mt-5 max-w-3xl bg-gradient-to-r from-white via-violet-100 to-fuchsia-100 bg-clip-text text-4xl font-black leading-[1.02] tracking-tight text-transparent sm:text-5xl">
                {copy.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">{copy.description}</p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={copy.search}
                    className="h-12 w-full rounded-xl border border-border bg-[#0d0d12] pl-10 pr-10 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-violet-400/50"
                  />
                  {query ? (
                    <button
                      type="button"
                      aria-label={copy.reset}
                      onClick={() => setQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : null}
                </label>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-zinc-300">
                  <BookOpen className="h-4 w-4 text-violet-300" />
                  {copy.count(visible.length)}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {(Object.keys(FILTER_META) as Filter[]).map((key) => {
                  const meta = FILTER_META[key];
                  const Icon = meta.icon;
                  const active = filter === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFilter(key)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-bold transition-colors",
                        active
                          ? "border-violet-300/50 bg-violet-500/20 text-violet-100"
                          : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {meta[language]} · {counts[key]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
          {visible.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card/70 p-8 text-center backdrop-blur">
              <p className="text-sm text-muted-foreground">{copy.noResults}</p>
              <button
                type="button"
                onClick={() => { setQuery(""); setFilter("all"); }}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"
              >
                {copy.reset}
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((term, index) => (
                <TermCard key={term.id} term={term} index={index} language={language} />
              ))}
            </div>
          )}
        </section>

        <div className="relative mx-auto mt-8 flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link href="/learn" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            {copy.openLearn}
          </Link>
          <Link href="/learn/math/desmos" className="inline-flex items-center gap-2 text-sm font-semibold text-violet-200 hover:text-violet-100">
            Desmos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
