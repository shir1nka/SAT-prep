"use client";

import { Flame, Trophy, Zap } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { calcLevel, useLearnProgress, xpForLevel } from "@/lib/learn/progress";
import { cn } from "@/lib/utils";

export function XpBar({ compact = false, className }: { compact?: boolean; className?: string }) {
  const { language } = useLanguage();
  const { xp, streak } = useLearnProgress();
  const level = calcLevel(xp);
  const cur = xpForLevel(level);
  const next = xpForLevel(level + 1);
  const pct = Math.min(100, Math.round(((xp - cur) / Math.max(1, next - cur)) * 100));

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/[0.10] via-card to-card p-4 backdrop-blur-xl transition-all hover:border-violet-400/40 hover:shadow-[0_16px_40px_rgba(168,85,247,0.18)]",
        className
      )}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="relative flex flex-wrap items-center gap-3">
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-[0_8px_24px_rgba(168,85,247,0.45)]">
          <Trophy className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-black text-zinc-950 shadow">
            {level}
          </span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-black tracking-tight text-foreground">
            {language === "ru" ? `Уровень ${level}` : `Level ${level}`}
            <span className="ml-2 bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">{xp} XP</span>
          </p>
          {!compact && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              {language === "ru"
                ? `До уровня ${level + 1}: ещё ${next - xp} XP · так держать!`
                : `${next - xp} XP to level ${level + 1} — keep going!`}
            </p>
          )}
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-orange-400/30 bg-gradient-to-r from-orange-500/20 to-rose-500/15 px-3 py-1.5 text-xs font-black text-orange-100 shadow-[0_6px_18px_rgba(249,115,22,0.25)]">
          <Flame className="h-4 w-4 animate-flame-flicker" />
          <span className="animate-streak-pulse">{streak}</span> {language === "ru" ? (streak === 1 ? "день" : streak < 5 ? "дня" : "дней") : streak === 1 ? "day" : "days"}
        </span>
      </div>
      <div className="shine-bar relative mt-3 h-2.5 overflow-hidden rounded-full bg-secondary/80">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-400 transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Zap className="h-3 w-3 text-amber-300" />
          {pct}%
        </span>
        <span>
          {xp - cur} / {next - cur} XP
        </span>
      </p>
    </div>
  );
}

export function StreakChip({ className }: { className?: string }) {
  const { language } = useLanguage();
  const { streak, xp } = useLearnProgress();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-orange-400/30 bg-gradient-to-r from-orange-500/20 to-rose-500/15 px-3 py-1.5 text-sm font-black text-orange-100 shadow-[0_6px_18px_rgba(249,115,22,0.25)]",
        className
      )}
    >
      <Flame className="h-4 w-4 animate-flame-flicker" />
      {streak} {language === "ru" ? (streak === 1 ? "день" : streak < 5 ? "дня" : "дней") : streak === 1 ? "day" : "days"} · {xp} XP
    </span>
  );
}

export function LevelUpToast({ visible, level, onClose }: { visible: boolean; level: number; onClose?: () => void }) {
  const { language } = useLanguage();
  if (!visible) return null;
  return (
    <div className="animate-pop-in fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="relative overflow-hidden rounded-3xl border border-amber-300/40 bg-gradient-to-br from-amber-400/20 via-zinc-900 to-violet-600/20 p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.6)]" onClick={(e) => e.stopPropagation()}>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.5),transparent_60%)]" />
        <div className="relative">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-zinc-950 shadow-[0_12px_32px_rgba(245,158,11,0.5)]">
            <Trophy className="h-8 w-8" />
          </span>
          <p className="mt-4 text-2xl font-black text-white">{language === "ru" ? `Новый уровень ${level}!` : `Level ${level} unlocked!`}</p>
          <p className="mt-1 text-sm text-zinc-300">{language === "ru" ? "Ты становишься сильнее с каждым днём" : "You're getting stronger every day"}</p>
          <button type="button" onClick={onClose} className="mt-5 rounded-xl bg-white px-5 py-2.5 text-sm font-black text-zinc-950 hover:bg-zinc-100">
            {language === "ru" ? "Продолжить" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
