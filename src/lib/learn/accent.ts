export type AccentKey = "sky" | "violet" | "emerald" | "amber" | "rose";

export const ACCENT: Record<
  AccentKey,
  {
    text: string;
    softText: string;
    bg: string;
    border: string;
    dot: string;
    glow: string;
    ring: string;
  }
> = {
  sky: {
    text: "text-sky-300",
    softText: "text-sky-200/90",
    bg: "bg-sky-500/10",
    border: "border-sky-400/25",
    dot: "bg-sky-400",
    glow: "shadow-[0_0_40px_-12px_rgba(56,189,248,0.55)]",
    ring: "ring-sky-400/30",
  },
  violet: {
    text: "text-violet-300",
    softText: "text-violet-200/90",
    bg: "bg-violet-500/10",
    border: "border-violet-400/25",
    dot: "bg-violet-400",
    glow: "shadow-[0_0_40px_-12px_rgba(167,139,250,0.55)]",
    ring: "ring-violet-400/30",
  },
  emerald: {
    text: "text-emerald-300",
    softText: "text-emerald-200/90",
    bg: "bg-emerald-500/10",
    border: "border-emerald-400/25",
    dot: "bg-emerald-400",
    glow: "shadow-[0_0_40px_-12px_rgba(52,211,153,0.55)]",
    ring: "ring-emerald-400/30",
  },
  amber: {
    text: "text-amber-300",
    softText: "text-amber-200/90",
    bg: "bg-amber-500/10",
    border: "border-amber-400/25",
    dot: "bg-amber-400",
    glow: "shadow-[0_0_40px_-12px_rgba(251,191,36,0.55)]",
    ring: "ring-amber-400/30",
  },
  rose: {
    text: "text-rose-300",
    softText: "text-rose-200/90",
    bg: "bg-rose-500/10",
    border: "border-rose-400/25",
    dot: "bg-rose-400",
    glow: "shadow-[0_0_40px_-12px_rgba(251,113,133,0.55)]",
    ring: "ring-rose-400/30",
  },
};
