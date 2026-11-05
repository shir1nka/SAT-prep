"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Calculator,
  Check,
  CheckCircle2,
  Copy,
  Lightbulb,
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
import { getRealQuestion, REAL_QUESTIONS } from "@/lib/learn/real";
import { isRealSolved, recordRealSolve, useLearnProgress } from "@/lib/learn/progress";
import { cn } from "@/lib/utils";

type Tab = "standard" | "desmos";

function CopyChip({ value, language }: { value: string; language: "en" | "ru" }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        } catch {
          setCopied(false);
        }
      }}
      className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary/60 px-2 py-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground"
    >
      {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
      {copied ? (language === "ru" ? "Ок" : "Done") : language === "ru" ? "Копировать" : "Copy"}
    </button>
  );
}

export default function RealLabDetailPage() {
  const params = useParams<{ id: string }>();
  const { language } = useLanguage();
  const progress = useLearnProgress();
  const id = params?.id ?? "";
  const q = useMemo(() => getRealQuestion(id), [id]);

  const [tab, setTab] = useState<Tab>("standard");
  const [selected, setSelected] = useState<number | null>(null);
  const [sprInput, setSprInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const alreadySolved = q ? isRealSolved(q.id) : false;

  useEffect(() => {
    setSelected(null);
    setSprInput("");
    setChecked(false);
    setCorrect(null);
    setShowAnswer(false);
    setTab("standard");
  }, [id]);

  if (!q) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">
          <Link href="/learn/real" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> {language === "ru" ? "Назад к Real Test Lab" : "Back to Real Test Lab"}
          </Link>
        </main>
      </div>
    );
  }

  const copy =
    language === "ru"
      ? {
          back: "Real Test Lab",
          standard: "Стандартно",
          desmos: "Desmos",
          yourAnswer: "Твой ответ",
          check: "Проверить",
          correct: "Верно! +15 XP 🎉",
          wrong: "Неверно — посмотри разбор ниже",
          retry: "Попробовать снова",
          answer: "Правильный ответ",
          solution: "Разбор",
          pitfalls: "Ловушки",
          standardTitle: "Стандартное решение",
          desmosTitle: "Desmos-путь",
          openInDesmos: "Открыть в Desmos",
          expressions: "Выражения для Desmos",
          next: "Следующая задача",
          prev: "Предыдущая",
          typeAnswer: "Введи ответ…",
          tripleCheck: "Проверено 3 раза: условие из PDF, независимый пересчёт, проверка выражений Desmos.",
        }
      : {
          back: "Real Test Lab",
          standard: "Standard",
          desmos: "Desmos",
          yourAnswer: "Your answer",
          check: "Check",
          correct: "Correct! +15 XP 🎉",
          wrong: "Not quite — see the solutions below",
          retry: "Try again",
          answer: "Correct answer",
          solution: "Solution",
          pitfalls: "Traps",
          standardTitle: "Standard solution",
          desmosTitle: "Desmos path",
          openInDesmos: "Open in Desmos",
          expressions: "Desmos expressions",
          next: "Next question",
          prev: "Previous",
          typeAnswer: "Type answer…",
          tripleCheck: "Triple-checked: PDF prompt, independent recalculation, Desmos expressions.",
        };

  const idx = REAL_QUESTIONS.findIndex((x) => x.id === q.id);
  const prev = idx > 0 ? REAL_QUESTIONS[idx - 1] : null;
  const next = idx >= 0 && idx < REAL_QUESTIONS.length - 1 ? REAL_QUESTIONS[idx + 1] : null;

  const handleCheck = () => {
    let isCorrect = false;
    if (q.options && q.correctIndex !== undefined) {
      isCorrect = selected === q.correctIndex;
    } else if (q.answerText) {
      isCorrect = sprInput.trim().toLowerCase().replace(/[$,%\s,]/g, "") === q.answerText.trim().toLowerCase();
    }
    setCorrect(isCorrect);
    setChecked(true);
    setShowAnswer(true);
    if (isCorrect && !alreadySolved) {
      recordRealSolve(q.id, true);
    } else if (isCorrect) {
      recordRealSolve(q.id, true);
    }
  };

  return (
    <DesmosProvider enabled>
      <div className="min-h-screen text-foreground">
        <SiteHeader />
        <main className="relative overflow-hidden pb-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(16,185,129,0.12),transparent_38%)]" />
            <div className="absolute inset-0 subtle-grid opacity-[0.12]" />
          </div>

          <section className="relative mx-auto max-w-4xl px-4 pt-8 sm:px-6 lg:px-8">
            <Link href="/learn/real" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> {copy.back}
            </Link>

            <div className="animate-float-up mt-5 overflow-hidden rounded-[2rem] border border-emerald-400/25 bg-gradient-to-br from-emerald-600/15 via-card to-card p-6 backdrop-blur-xl sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-emerald-100">
                  Test {q.test} · Module {q.module} · Question {q.number}
                </span>
                <span className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-[11px] font-bold text-muted-foreground">
                  {q.section === "math" ? "Math" : "Reading & Writing"} · {q.domainLabel}
                </span>
                <span className={cn("rounded-full px-3 py-1 text-[11px] font-black uppercase", q.difficulty === "easy" && "bg-emerald-500/15 text-emerald-200", q.difficulty === "medium" && "bg-amber-500/15 text-amber-200", q.difficulty === "hard" && "bg-rose-500/15 text-rose-200")}>
                  {q.difficulty}
                </span>
                {alreadySolved && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-black text-white">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {copy.correct}
                  </span>
                )}
              </div>

              {q.passage && <p className="mt-5 rounded-2xl border border-border bg-secondary/40 p-4 text-sm leading-relaxed text-zinc-300">{q.passage[language]}</p>}
              <p className="mt-5 text-lg font-bold leading-relaxed text-white sm:text-xl">
                <MathText text={q.prompt[language]} preserveLines />
              </p>

              {/* Answer input */}
              <div className="mt-6 rounded-2xl border border-border bg-card/70 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground">{copy.yourAnswer}</p>
                {q.options && q.correctIndex !== undefined ? (
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {q.options.map((opt, i) => {
                      const isSelected = selected === i;
                      const isRight = checked && i === q.correctIndex;
                      const isWrongSel = checked && isSelected && i !== q.correctIndex;
                      return (
                        <button
                          key={i}
                          type="button"
                          disabled={checked}
                          onClick={() => setSelected(i)}
                          className={cn(
                            "rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-all active:scale-[0.99]",
                            !checked && !isSelected && "border-border bg-secondary/50 hover:border-emerald-400/40 hover:bg-secondary",
                            !checked && isSelected && "border-emerald-400/60 bg-emerald-500/10 text-emerald-50 shadow-[0_8px_24px_rgba(16,185,129,0.18)]",
                            isRight && "border-emerald-400 bg-emerald-500/15 text-emerald-50",
                            isWrongSel && "border-rose-400 bg-rose-500/10 text-rose-100"
                          )}
                        >
                          <span className="mr-2 font-black text-emerald-300">{String.fromCharCode(65 + i)})</span>
                          <MathText text={opt} />
                          {isRight && <Check className="ml-2 inline h-4 w-4 text-emerald-300" />}
                          {isWrongSel && <X className="ml-2 inline h-4 w-4 text-rose-300" />}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <input
                    value={sprInput}
                    onChange={(e) => setSprInput(e.target.value)}
                    disabled={checked}
                    placeholder={copy.typeAnswer}
                    className="mt-3 w-full rounded-xl border border-border bg-secondary/60 px-4 py-3 text-sm font-semibold text-foreground outline-none placeholder:text-muted-foreground focus:border-emerald-400/50"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !checked) handleCheck();
                    }}
                  />
                )}

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {!checked ? (
                    <button
                      type="button"
                      onClick={handleCheck}
                      disabled={q.options ? selected === null : !sprInput.trim()}
                      className={cn(
                        "rounded-xl px-6 py-3 text-sm font-black transition-all active:scale-[0.98]",
                        (q.options ? selected !== null : sprInput.trim()) ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_12px_28px_rgba(16,185,129,0.35)] hover:brightness-110" : "cursor-not-allowed bg-secondary text-muted-foreground"
                      )}
                    >
                      {copy.check}
                    </button>
                  ) : (
                    <>
                      <p className={cn("text-sm font-black", correct ? "text-emerald-300" : "text-rose-300")}>{correct ? copy.correct : copy.wrong}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setSelected(null);
                          setSprInput("");
                          setChecked(false);
                          setCorrect(null);
                          setShowAnswer(false);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary/60 px-4 py-2.5 text-sm font-bold hover:bg-secondary"
                      >
                        <RotateCcw className="h-4 w-4" /> {copy.retry}
                      </button>
                    </>
                  )}
                  {checked && showAnswer && (
                    <span className="text-sm font-bold text-emerald-100">
                      {copy.answer}: <MathText text={q.correctAnswerLabel[language]} />
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-violet-300" /> {copy.tripleCheck}
              </p>
            </div>

            {/* Tabs */}
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setTab("standard")}
                className={cn(
                  "inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black transition-all active:scale-[0.99]",
                  tab === "standard" ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_12px_28px_rgba(16,185,129,0.3)]" : "border border-border bg-card/70 text-muted-foreground hover:text-foreground"
                )}
              >
                <BookOpen className="h-4 w-4" /> {copy.standard}
              </button>
              <button
                type="button"
                onClick={() => setTab("desmos")}
                className={cn(
                  "inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black transition-all active:scale-[0.99]",
                  tab === "desmos" ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_12px_28px_rgba(168,85,247,0.35)]" : "border border-border bg-card/70 text-muted-foreground hover:text-foreground"
                )}
              >
                <Calculator className="h-4 w-4" /> {copy.desmos}
              </button>
            </div>

            <div className="mt-5 rounded-[1.75rem] border border-border bg-card/80 p-6 backdrop-blur-xl">
              {tab === "standard" ? (
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-black text-foreground">
                    <Lightbulb className="h-5 w-5 text-emerald-300" /> {copy.standardTitle}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {q.standard.steps.map((step, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-sm font-black text-emerald-200">{i + 1}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-foreground"><MathText text={step.title[language]} /></p>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground"><MathText text={step.detail[language]} preserveLines /></p>
                          {step.expressions && step.expressions.length > 0 && (
                            <div className="mt-2 space-y-1.5">
                              {step.expressions.map((expr) => (
                                <div key={expr} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-[#0d0d12] px-3 py-2">
                                  <code className="font-mono text-xs text-emerald-100">{expr}</code>
                                  <CopyChip value={expr} language={language} />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-black text-foreground">
                    <Calculator className="h-5 w-5 text-violet-300" /> {copy.desmosTitle}
                  </h2>
                  {q.desmosExpressions.length > 0 ? (
                    <div className="mt-4 space-y-4">
                      {q.desmos.steps.map((step, i) => (
                        <div key={i} className="flex gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-sm font-black text-violet-200">{i + 1}</span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-foreground"><MathText text={step.title[language]} /></p>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground"><MathText text={step.detail[language]} preserveLines /></p>
                            {step.expressions && step.expressions.length > 0 && (
                              <div className="mt-2 space-y-1.5">
                                {step.expressions.map((expr) => (
                                  <div key={expr} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-[#0d0d12] px-3 py-2">
                                    <code className="font-mono text-xs text-violet-100">{expr}</code>
                                    <CopyChip value={expr} language={language} />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      <OpenInDesmos expressions={q.desmosExpressions} />
                    </div>
                  ) : (
                    <div className="mt-4 space-y-4">
                      {q.desmos.steps.map((step, i) => (
                        <div key={i} className="flex gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-sm font-black text-violet-200">{i + 1}</span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-foreground">{step.title[language]}</p>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.detail[language]}</p>
                          </div>
                        </div>
                      ))}
                      <p className="rounded-xl border border-violet-400/20 bg-violet-500/[0.07] p-3 text-xs leading-relaxed text-violet-100/80">
                        {language === "ru" ? "Для словесных задач Desmos не нужен — используй приём SAT. Путь Desmos в начале — это типовая опция для вербальных вопросов." : "Verbal questions don't need Desmos — use the SAT trick. The Desmos tab is the standard path for such items."}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-500/[0.06] p-4">
                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-amber-200">
                  <TriangleAlert className="h-4 w-4" /> {copy.pitfalls}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {q.pitfalls.map((p, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-amber-100/85">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" /> {p[language]}
                    </li>
                  ))}
                </ul>
              </div>

              {q.desmosExpressions.length > 0 && (
                <div className="mt-4 rounded-2xl border border-border bg-secondary/40 p-4">
                  <p className="text-[11px] font-black uppercase tracking-wide text-muted-foreground">{copy.expressions}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {q.desmosExpressions.map((expr) => (
                      <code key={expr} className="rounded-lg bg-zinc-950 px-2 py-1 font-mono text-[11px] text-violet-200">{expr}</code>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6">
                <XpBar compact />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              {prev ? (
                <Link href={`/learn/real/${prev.id}`} className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/70 px-4 py-3 text-sm font-bold hover:bg-secondary">
                  <ArrowLeft className="h-4 w-4" /> {copy.prev}
                </Link>
              ) : <span />}
              {next ? (
                <Link href={`/learn/real/${next.id}`} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white hover:bg-emerald-500">
                  {copy.next} <ArrowLeft className="h-4 w-4 rotate-180" />
                </Link>
              ) : (
                <Link href="/learn/real" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white hover:bg-emerald-500">
                  {copy.back}
                </Link>
              )}
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              <Target className="mr-1 inline h-3.5 w-3.5" />
              Test {q.test} · {q.section === "math" ? "Math" : "Reading & Writing"} · Module {q.module} · Question {q.number}
            </p>
          </section>
        </main>
      </div>
    </DesmosProvider>
  );
}
