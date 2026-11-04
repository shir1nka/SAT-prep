import { ExternalLink, PlayCircle } from "lucide-react";

import { LinkButton } from "@/components/ui/Button";
import type { LearnLanguage } from "@/lib/sat-learn-base";
import type { LearnMedia, LearnMediaTheme } from "@/lib/learn-media";
import { cn } from "@/lib/utils";

function pickText(language: LearnLanguage, value: { en: string; ru: string }) {
  return value[language];
}

export default function LearnMediaCard({
  media,
  language,
  compact = false,
  className,
}: {
  media: LearnMedia;
  language: LearnLanguage;
  compact?: boolean;
  className?: string;
}) {
  const text =
    language === "ru"
      ? {
          eyebrow: "Видео и визуал",
          helper:
            "Открой внешний YouTube-разбор по этой теме и используй визуальные маркеры перед практикой.",
        }
      : {
          eyebrow: "Video and visual",
          helper:
            "Open a focused YouTube explainer for this topic and use the visual cues before practice.",
        };

  return (
    <div
      className={cn(
        "rounded-[1.75rem] border border-zinc-200 bg-white p-4 shadow-sm",
        compact ? "p-4" : "p-5 md:p-6",
        className
      )}
    >
      <div className={cn("grid gap-4", compact ? "lg:grid-cols-1" : "lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6")}>
        <TopicIllustration
          language={language}
          theme={media.theme}
          tags={media.tags.slice(0, 3).map((tag) => pickText(language, tag))}
        />

        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-400">
            {text.eyebrow}
          </p>
          <h3 className="mt-2 text-xl font-black tracking-tight text-zinc-950">
            {pickText(language, media.title)}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            {pickText(language, media.summary)}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">{text.helper}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {media.tags.map((tag) => (
              <span
                key={`${media.theme}-${tag.en}`}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-600"
              >
                {pickText(language, tag)}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <LinkButton
              href={media.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              variant="primary"
              className="rounded-2xl bg-sky-600 shadow-none hover:bg-sky-700"
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              {pickText(language, media.youtubeCta)}
              <ExternalLink className="ml-2 h-4 w-4" />
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopicIllustration({
  theme,
  tags,
  language,
}: {
  theme: LearnMediaTheme;
  tags: string[];
  language: LearnLanguage;
}) {
  const palette = {
    overview: {
      shell: "bg-gradient-to-br from-sky-100 via-white to-amber-50",
      glow: "bg-sky-300/50",
      accent: "bg-sky-600 text-white",
    },
    algebra: {
      shell: "bg-gradient-to-br from-sky-100 via-indigo-50 to-white",
      glow: "bg-indigo-300/50",
      accent: "bg-indigo-600 text-white",
    },
    data: {
      shell: "bg-gradient-to-br from-emerald-100 via-white to-sky-50",
      glow: "bg-emerald-300/50",
      accent: "bg-emerald-600 text-white",
    },
    advanced: {
      shell: "bg-gradient-to-br from-violet-100 via-white to-sky-50",
      glow: "bg-violet-300/50",
      accent: "bg-violet-600 text-white",
    },
    geometry: {
      shell: "bg-gradient-to-br from-amber-100 via-white to-orange-50",
      glow: "bg-amber-300/50",
      accent: "bg-amber-600 text-white",
    },
    modeling: {
      shell: "bg-gradient-to-br from-cyan-100 via-white to-emerald-50",
      glow: "bg-cyan-300/50",
      accent: "bg-cyan-600 text-white",
    },
    reading: {
      shell: "bg-gradient-to-br from-rose-100 via-white to-orange-50",
      glow: "bg-rose-300/50",
      accent: "bg-rose-600 text-white",
    },
    craft: {
      shell: "bg-gradient-to-br from-fuchsia-100 via-white to-rose-50",
      glow: "bg-fuchsia-300/50",
      accent: "bg-fuchsia-600 text-white",
    },
    structure: {
      shell: "bg-gradient-to-br from-slate-100 via-white to-sky-50",
      glow: "bg-slate-300/50",
      accent: "bg-slate-700 text-white",
    },
    grammar: {
      shell: "bg-gradient-to-br from-lime-100 via-white to-emerald-50",
      glow: "bg-lime-300/50",
      accent: "bg-lime-700 text-white",
    },
    inference: {
      shell: "bg-gradient-to-br from-orange-100 via-white to-rose-50",
      glow: "bg-orange-300/50",
      accent: "bg-orange-600 text-white",
    },
    mixed: {
      shell: "bg-gradient-to-br from-zinc-100 via-white to-sky-50",
      glow: "bg-zinc-300/50",
      accent: "bg-zinc-900 text-white",
    },
  }[theme];

  const themeLabel =
    language === "ru"
      ? {
          overview: "обзор",
          algebra: "алгебра",
          data: "данные",
          advanced: "продвинутая тема",
          geometry: "геометрия",
          modeling: "моделирование",
          reading: "чтение",
          craft: "анализ текста",
          structure: "структура текста",
          grammar: "грамматика",
          inference: "вывод",
          mixed: "смешанное",
        }[theme]
      : theme;

  return (
    <div
      className={cn(
        "relative min-h-[190px] overflow-hidden rounded-[1.6rem] border border-white/70 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]",
        palette.shell
      )}
    >
      <div className={cn("absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl", palette.glow)} />
      <div className="absolute inset-x-4 bottom-4 grid grid-cols-4 gap-2 opacity-70">
        <div className="h-10 rounded-2xl border border-white/80 bg-white/70" />
        <div className="h-16 rounded-2xl border border-white/80 bg-white/70" />
        <div className="h-8 rounded-2xl border border-white/80 bg-white/70" />
        <div className="h-14 rounded-2xl border border-white/80 bg-white/70" />
      </div>

      <div className="relative flex h-full flex-col justify-between">
        <div className={cn("inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]", palette.accent)}>
          {themeLabel}
        </div>

        <div className="space-y-2">
          {tags.map((tag, index) => (
            <div
              key={`${theme}-${tag}-${index}`}
              className={cn(
                "w-fit rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm",
                index === 1 && "ml-6",
                index === 2 && "ml-12"
              )}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
