"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Layers3,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";

import LearnMediaCard from "@/components/learn/LearnMediaCard";
import SiteHeader from "@/components/SiteHeader";
import { Button, LinkButton } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-context";
import { getLearnUnitMedia } from "@/lib/learn-media";
import {
  findLearnCourseById,
  getAllCourseSkills,
  getCourseSkillCount,
  getStatusCounts,
  pickText,
  type SkillStatus,
} from "@/lib/sat-learn";
import { cn } from "@/lib/utils";

type UnitFilter = "all" | "core" | "practice" | "challenge";

const INITIAL_VISIBLE_UNITS = 10;

export default function LearnCoursePage() {
  const params = useParams<{ gradeId: string }>();
  const { language } = useLanguage();
  const course = useMemo(() => findLearnCourseById(params?.gradeId), [params?.gradeId]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<UnitFilter>("all");
  const [visibleUnits, setVisibleUnits] = useState(INITIAL_VISIBLE_UNITS);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    setVisibleUnits(INITIAL_VISIBLE_UNITS);
  }, [deferredQuery, filter, course?.id]);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#f5f5ef]">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center">
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-8">
            <h1 className="text-3xl font-black text-zinc-950">
              {language === "ru" ? "Курс не найден" : "Course not found"}
            </h1>
            <p className="mt-4 text-zinc-600">
              {language === "ru"
                ? "Похоже, этот курс сейчас недоступен. Вернись в раздел learn и открой другой."
                : "This course does not seem to be available right now. Go back to the learn hub and open another one."}
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

  const allSkills = getAllCourseSkills(course);
  const statusCounts = getStatusCounts(course);
  const upNext =
    allSkills.find(
      ({ skill }) => skill.status === "familiar" || skill.status === "attempted" || skill.status === "not_started"
    ) ?? allSkills[0];

  const counts = {
    all: course.units.length,
    core: course.units.filter((item) => item.kind === "intro" || item.kind === "core").length,
    practice: course.units.filter((item) => item.kind === "practice").length,
    challenge: course.units.filter((item) => item.kind === "challenge").length,
  };

  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const filteredUnits = course.units.filter((unitItem) => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "core"
          ? unitItem.kind === "intro" || unitItem.kind === "core"
          : unitItem.kind === filter;

    if (!matchesFilter || !normalizedQuery) {
      return matchesFilter;
    }

    const searchable = [
      unitItem.title.en,
      unitItem.title.ru,
      unitItem.summary.en,
      unitItem.summary.ru,
      unitItem.note.en,
      unitItem.note.ru,
      ...unitItem.skills.flatMap((skillItem) => [
        skillItem.title.en,
        skillItem.title.ru,
        skillItem.summary.en,
        skillItem.summary.ru,
      ]),
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(normalizedQuery);
  });

  const text =
    language === "ru"
      ? {
          back: "Назад к SAT learn",
          search: "Поиск по юнитам и навыкам",
          searchPlaceholder: "Например: алгебра, вывод, грамматика...",
          units: "Юниты",
          skills: "Навыки",
          summary: "Кратко о курсе",
          roadmap: "Карта курса",
          all: "Все",
          core: "База",
          practice: "Практика",
          challenge: "Сложные",
          showing: "Показано",
          of: "из",
          upNext: "Следующий шаг",
          openSkill: "Открыть навык",
          clear: "Сбросить поиск",
          practiceHint: "Ритм курса",
          empty: "Ничего не найдено",
          emptyBody:
            "Попробуй другой запрос или переключи фильтр. Курс теперь большой, поэтому поиск работает по названиям юнитов и навыков.",
          loadMore: "Показать ещё юниты",
          unit: "Юнит",
          quickReview: "Быстрый разбор",
          unitChallenge: "Испытание юнита",
          challengeCard: "Испытание курса",
          challengeBody:
            "Последние сложные и мастер-юниты собраны как более жёсткая SAT-тренировка: меньше подсказок, больше ловушек и выше цена выбора метода.",
        }
      : {
          back: "Back to SAT learn",
          search: "Search units and skills",
          searchPlaceholder: "For example: algebra, inference, grammar...",
          units: "Units",
          skills: "Skills",
          summary: "Course summary",
          roadmap: "Course roadmap",
          all: "All",
          core: "Core",
          practice: "Practice",
          challenge: "Challenge",
          showing: "Showing",
          of: "of",
          upNext: "Up next for you",
          openSkill: "Open skill",
          clear: "Clear search",
          practiceHint: "Course rhythm",
          empty: "Nothing matched",
          emptyBody:
            "Try a different search or switch the filter. The course is much larger now, so search works across unit and skill titles.",
          loadMore: "Load more units",
          unit: "Unit",
          quickReview: "Quick review",
          unitChallenge: "Unit challenge",
          challengeCard: "Course challenge",
          challengeBody:
            "The late challenge and mastery units act like a harder SAT cycle: fewer hints, more traps, and more pressure on method choice.",
        };

  return (
    <div className="min-h-screen bg-[#f5f5ef] text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <SiteHeader />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 subtle-grid opacity-[0.14]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.08),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(245,158,11,0.08),_transparent_30%)]" />
        </div>

        <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition-colors hover:text-sky-700"
          >
            <ArrowLeft className="h-4 w-4" />
            {text.back}
          </Link>

          <div className="mt-6 grid gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
              <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                  {text.summary}
                </p>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-zinc-950">
                  {pickText(language, course.title)}
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {pickText(language, course.summary)}
                </p>

                <div className="mt-6 grid gap-3">
                  <MiniStat
                    icon={<Layers3 className="h-4 w-4 text-sky-600" />}
                    label={text.units}
                    value={String(course.units.length)}
                  />
                  <MiniStat
                    icon={<BookOpen className="h-4 w-4 text-emerald-600" />}
                    label={text.skills}
                    value={String(getCourseSkillCount(course))}
                  />
                  <MiniStat
                    icon={<Zap className="h-4 w-4 text-amber-600" />}
                    label={text.upNext}
                    value={pickText(language, upNext.skill.shortTitle)}
                  />
                </div>
              </div>

              <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                  {text.search}
                </p>
                <label className="mt-4 flex items-center gap-3 rounded-[1.25rem] border border-zinc-200 bg-zinc-50 px-4 py-3">
                  <Search className="h-4 w-4 text-zinc-400" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={text.searchPlaceholder}
                    className="w-full bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400"
                  />
                </label>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {(
                    [
                      ["all", text.all],
                      ["core", text.core],
                      ["practice", text.practice],
                      ["challenge", text.challenge],
                    ] as Array<[UnitFilter, string]>
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setFilter(value)}
                      className={cn(
                        "rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors",
                        filter === value
                          ? "border-sky-300 bg-sky-50 text-sky-800"
                          : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300 hover:bg-white"
                      )}
                    >
                      <div>{label}</div>
                      <div className="mt-1 text-xs text-zinc-400">{counts[value]}</div>
                    </button>
                  ))}
                </div>

                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="mt-4 text-sm font-semibold text-sky-700 transition-colors hover:text-sky-800"
                  >
                    {text.clear}
                  </button>
                ) : null}
              </div>

              <div className="rounded-[2rem] border border-sky-200 bg-sky-50 p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">
                  {text.upNext}
                </p>
                <p className="mt-2 text-xl font-black text-zinc-950">
                  {pickText(language, upNext.skill.title)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {pickText(language, upNext.skill.summary)}
                </p>
                <div className="mt-5">
                  <LinkButton
                    href={`/learn/${course.id}/${upNext.skill.id}`}
                    variant="outline"
                    className="rounded-2xl border-sky-300 bg-white text-sky-800 hover:bg-sky-100"
                  >
                    {text.openSkill}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </LinkButton>
                </div>
              </div>

              <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                  {text.practiceHint}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {pickText(language, course.practiceHint)}
                </p>
              </div>
            </aside>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                  {pickText(language, course.eyebrow)}
                </p>
                <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-4xl">
                    <h2 className="text-4xl font-black tracking-tight text-zinc-950">
                      {pickText(language, course.title)}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-zinc-600">
                      {pickText(language, course.banner)}
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-zinc-200 bg-zinc-50 px-5 py-4 text-center">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                      {text.showing}
                    </div>
                    <div className="mt-1 text-2xl font-black text-zinc-950">
                      {Math.min(visibleUnits, filteredUnits.length)}/{filteredUnits.length}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-zinc-500">
                      {text.of} {course.units.length} {text.units.toLowerCase()}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <StatusPill
                    label={`${statusCounts.mastered} ${statusLabel("mastered", language)}`}
                    tone="emerald"
                  />
                  <StatusPill
                    label={`${statusCounts.proficient} ${statusLabel("proficient", language)}`}
                    tone="sky"
                  />
                  <StatusPill
                    label={`${statusCounts.familiar} ${statusLabel("familiar", language)}`}
                    tone="amber"
                  />
                  <StatusPill
                    label={`${statusCounts.attempted} ${statusLabel("attempted", language)}`}
                    tone="orange"
                  />
                  <StatusPill
                    label={`${statusCounts.not_started} ${statusLabel("not_started", language)}`}
                    tone="zinc"
                  />
                </div>
              </div>

              {filteredUnits.length === 0 ? (
                <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm">
                  <h3 className="text-2xl font-black text-zinc-950">{text.empty}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">
                    {text.emptyBody}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredUnits.slice(0, visibleUnits).map((unitItem) => (
                    <section
                      key={unitItem.id}
                      className={cn(
                        "rounded-[2rem] border p-6 shadow-sm",
                        unitItem.skills.some((skillItem) => skillItem.id === upNext.skill.id)
                          ? "border-sky-200 bg-sky-50/70"
                          : "border-zinc-200 bg-white"
                      )}
                    >
                      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                            {text.unit} {unitItem.order}
                          </p>
                          <h3 className="mt-2 text-2xl font-black text-zinc-950">
                            {pickText(language, unitItem.title)}
                          </h3>
                          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                            {pickText(language, unitItem.summary)}
                          </p>
                          <div className="mt-4 inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                            {unitKindLabel(unitItem.kind, language)}
                          </div>
                          <div className="mt-4 rounded-[1.25rem] border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-600">
                            {unitItem.skills.length === 0
                              ? pickText(language, course.practiceHint)
                              : pickText(language, unitItem.note)}
                          </div>
                          <div className="mt-4">
                            <LearnMediaCard
                              media={getLearnUnitMedia(language, unitItem)}
                              language={language}
                              compact
                            />
                          </div>
                        </div>

                        <div className="grid gap-3 lg:grid-cols-2">
                          {unitItem.skills.map((skillItem) => (
                            <Link
                              key={skillItem.id}
                              href={`/learn/${course.id}/${skillItem.id}`}
                              className={cn(
                                "rounded-[1.5rem] border p-4 transition-all hover:-translate-y-0.5",
                                statusStyles(skillItem.status).tile,
                                skillItem.id === upNext.skill.id &&
                                  "ring-2 ring-sky-300 ring-offset-2 ring-offset-transparent"
                              )}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                                    {skillItem.minutes} min
                                  </div>
                                  <div className="mt-2 text-lg font-bold text-zinc-950">
                                    {pickText(language, skillItem.shortTitle)}
                                  </div>
                                </div>
                                <div
                                  className={cn(
                                    "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em]",
                                    statusStyles(skillItem.status).badge
                                  )}
                                >
                                  {statusLabel(skillItem.status, language)}
                                </div>
                              </div>
                              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                                {pickText(language, skillItem.summary)}
                              </p>
                              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-700">
                                {text.openSkill}
                                <ArrowRight className="h-4 w-4" />
                              </div>
                            </Link>
                          ))}

                          {unitItem.hasQuiz ? (
                            <AssessmentCard
                              title={text.quickReview}
                              body={pickText(language, unitItem.note)}
                            />
                          ) : null}

                          {unitItem.hasUnitTest ? (
                            <AssessmentCard
                              title={text.unitChallenge}
                              body={pickText(language, course.challengeText)}
                            />
                          ) : null}
                        </div>
                      </div>
                    </section>
                  ))}
                </div>
              )}

              {filteredUnits.length > visibleUnits ? (
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setVisibleUnits((current) => current + INITIAL_VISIBLE_UNITS)}
                    className="rounded-2xl border-zinc-300 bg-white text-zinc-900 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800"
                  >
                    {text.loadMore}
                  </Button>
                </div>
              ) : null}

              <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                  {text.challengeCard}
                </p>
                <h3 className="mt-2 text-2xl font-black text-zinc-950">
                  {pickText(language, course.units[course.units.length - 1].title)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{text.challengeBody}</p>
                <div className="mt-5">
                  <LinkButton
                    href={`/learn/${course.id}/${course.units[course.units.length - 1].skills[0].id}`}
                    variant="primary"
                    className="rounded-2xl bg-sky-600 shadow-none hover:bg-sky-700"
                  >
                    {text.openSkill}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </LinkButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MiniStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-[1.25rem] border border-zinc-200 bg-zinc-50 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white">{icon}</div>
        <span className="text-sm font-semibold text-zinc-600">{label}</span>
      </div>
      <span className="text-sm font-bold text-zinc-950">{value}</span>
    </div>
  );
}

function AssessmentCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-zinc-300 bg-zinc-50 p-4">
      <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
        <Sparkles className="h-3.5 w-3.5" />
        {title}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600">{body}</p>
    </div>
  );
}

function StatusPill({
  label,
  tone,
}: {
  label: string;
  tone: "emerald" | "sky" | "amber" | "orange" | "zinc";
}) {
  const styles = {
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    sky: "border-sky-200 bg-sky-50 text-sky-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
    zinc: "border-zinc-200 bg-zinc-50 text-zinc-700",
  };

  return (
    <div className={cn("rounded-full border px-3 py-1.5 text-sm font-semibold", styles[tone])}>
      {label}
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

function statusStyles(status: SkillStatus) {
  const styles = {
    mastered: {
      tile: "border-emerald-200 bg-emerald-50 hover:border-emerald-300",
      badge: "border-emerald-200 bg-emerald-100 text-emerald-800",
    },
    proficient: {
      tile: "border-sky-200 bg-sky-50 hover:border-sky-300",
      badge: "border-sky-200 bg-sky-100 text-sky-800",
    },
    familiar: {
      tile: "border-amber-200 bg-amber-50 hover:border-amber-300",
      badge: "border-amber-200 bg-amber-100 text-amber-800",
    },
    attempted: {
      tile: "border-orange-200 bg-orange-50 hover:border-orange-300",
      badge: "border-orange-200 bg-orange-100 text-orange-800",
    },
    not_started: {
      tile: "border-zinc-200 bg-zinc-50 hover:border-zinc-300",
      badge: "border-zinc-200 bg-white text-zinc-700",
    },
  };

  return styles[status];
}

function unitKindLabel(kind: "intro" | "core" | "practice" | "challenge" | undefined, language: "en" | "ru") {
  const labels = {
    intro: { en: "Intro", ru: "Вводный" },
    core: { en: "Core", ru: "База" },
    practice: { en: "Practice", ru: "Практика" },
    challenge: { en: "Challenge", ru: "Сложный" },
  };

  return labels[kind ?? "core"][language];
}
