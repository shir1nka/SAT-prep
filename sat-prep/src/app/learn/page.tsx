"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Brain, GraduationCap, Sparkles, Target } from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import { LinkButton } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-context";
import {
  SAT_LEARN_COURSES,
  getCourseSkillCount,
  getLearnCourseById,
  pickText,
} from "@/lib/sat-learn";
import { cn } from "@/lib/utils";

export default function LearnPage() {
  const { language } = useLanguage();
  const [selectedCourseId, setSelectedCourseId] = useState(SAT_LEARN_COURSES[0]?.id ?? "sat-math");

  const selectedCourse = useMemo(
    () => getLearnCourseById(selectedCourseId),
    [selectedCourseId]
  );

  const totalUnits = SAT_LEARN_COURSES.reduce((sum, course) => sum + course.units.length, 0);
  const totalSkills = SAT_LEARN_COURSES.reduce(
    (sum, course) => sum + getCourseSkillCount(course),
    0
  );

  const text =
    language === "ru"
      ? {
          badge: "SAT Learn",
          title: "SAT Learn",
          description:
            "Теперь это не школьный раздел по классам, а понятная карта SAT-подготовки: два курса, юниты, навыки, быстрые проверки и отдельные страницы для тренировки.",
          summary: "Сводка курсов",
          courses: "Курсы",
          units: "Юниты",
          skills: "Навыки",
          practiceFlow: "Как проходить",
          practiceFlowBody:
            "Выбирай курс, открывай один навык, проходи объяснение, решай быструю проверку и двигайся по юниту дальше.",
          openMap: "Открыть карту курса",
          explore: "Открыть SAT learn",
          statCourses: "2 SAT курса",
          statCoursesDesc: "SAT Math и SAT Reading and Writing в одной структуре.",
          statSkills: "Навыки и проверки",
          statSkillsDesc: "Каждый навык открывается как мини-урок с практикой.",
          statUnits: "Карта юнитов",
          statUnitsDesc: "Видно, с чего начать и куда идти дальше.",
          preview: "Сейчас в фокусе",
          startsWith: "Старт курса",
          seeCourse: "Открыть курс",
        }
      : {
          badge: "SAT Learn",
          title: "New SAT learning hub",
          description:
            "This is no longer a school-grade hub. It is a clean SAT roadmap with two courses, visible units, skill drills, and dedicated practice pages.",
          summary: "Course summary",
          courses: "Courses",
          units: "Units",
          skills: "Skills",
          practiceFlow: "How to use it",
          practiceFlowBody:
            "Pick a course, open one skill, study the explanation, answer the quick check, and then move forward through the unit map.",
          openMap: "Open course map",
          explore: "Open SAT learn",
          statCourses: "2 SAT courses",
          statCoursesDesc: "SAT Math and SAT Reading and Writing in one structure.",
          statSkills: "Skills + quick checks",
          statSkillsDesc: "Each skill opens as a mini-lesson with practice.",
          statUnits: "Unit roadmap",
          statUnitsDesc: "It is clear where to start and where to go next.",
          preview: "Current focus",
          startsWith: "Course starts with",
          seeCourse: "Open course",
        };

  return (
    <div className="min-h-screen bg-[#f5f5ef] text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <SiteHeader />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.08),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.08),_transparent_30%)]" />
          <div className="absolute inset-0 subtle-grid opacity-[0.18]" />
        </div>

        <section className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] border border-zinc-200/80 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur"
          >
            <div className="flex flex-col gap-8 xl:grid xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-10">
              <aside className="xl:sticky xl:top-24 xl:self-start">
                <div className="rounded-[1.75rem] border border-zinc-200 bg-[#f8fafc] p-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-700">
                    <Sparkles className="h-3.5 w-3.5" />
                    {text.summary}
                  </div>

                  <div className="mt-5 space-y-3">
                    {SAT_LEARN_COURSES.map((course) => {
                      const isActive = course.id === selectedCourse.id;
                      return (
                        <button
                          key={course.id}
                          type="button"
                          onClick={() => setSelectedCourseId(course.id)}
                          className={cn(
                            "w-full rounded-[1.5rem] border px-4 py-4 text-left transition-all",
                            isActive
                              ? "border-sky-300 bg-sky-50 shadow-sm"
                              : "border-zinc-200 bg-white hover:border-sky-200 hover:bg-zinc-50"
                          )}
                        >
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                            {pickText(language, course.eyebrow)}
                          </p>
                          <p className="mt-1 text-xl font-bold text-zinc-900">
                            {pickText(language, course.title)}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                            {pickText(language, course.summary)}
                          </p>
                          <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-zinc-500">
                            <span>
                              {course.units.length} {text.units}
                            </span>
                            <span>
                              {getCourseSkillCount(course)} {text.skills}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-5 rounded-[1.5rem] border border-zinc-200 bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                      {text.practiceFlow}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                      {text.practiceFlowBody}
                    </p>
                  </div>
                </div>
              </aside>

              <div className="space-y-8">
                <div className="rounded-[2rem] border border-zinc-200 bg-[#fffdf7] p-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-700">
                    <Target className="h-3.5 w-3.5" />
                    {text.badge}
                  </div>
                  <h1 className="mt-5 text-4xl font-black tracking-tight text-zinc-950 md:text-5xl">
                    {text.title}
                  </h1>
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600 md:text-lg">
                    {text.description}
                  </p>

                  <div className="mt-8 grid gap-4 lg:grid-cols-3">
                    <StatCard
                      icon={<GraduationCap className="h-5 w-5 text-sky-600" />}
                      value={String(SAT_LEARN_COURSES.length)}
                      label={text.courses}
                    />
                    <StatCard
                      icon={<BookOpen className="h-5 w-5 text-emerald-600" />}
                      value={String(totalUnits)}
                      label={text.units}
                    />
                    <StatCard
                      icon={<Brain className="h-5 w-5 text-amber-600" />}
                      value={String(totalSkills)}
                      label={text.skills}
                    />
                  </div>
                </div>

                <div className="rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                    {text.preview}
                  </p>
                  <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                      <h2 className="text-3xl font-black tracking-tight text-zinc-950">
                        {pickText(language, selectedCourse.title)}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-zinc-600">
                        {pickText(language, selectedCourse.description)}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-3 text-sm">
                        <PreviewPill label={`${selectedCourse.units.length} ${text.units}`} />
                        <PreviewPill
                          label={`${getCourseSkillCount(selectedCourse)} ${text.skills}`}
                        />
                        <PreviewPill
                          label={`${text.startsWith}: ${pickText(language, selectedCourse.units[0].title)}`}
                        />
                      </div>
                    </div>

                    <LinkButton
                      href={`/learn/${selectedCourse.id}`}
                      variant="primary"
                      size="lg"
                      className="h-12 rounded-2xl bg-sky-600 px-7 text-base shadow-none hover:bg-sky-700"
                    >
                      {text.openMap}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </LinkButton>
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  {SAT_LEARN_COURSES.map((course) => (
                    <article
                      key={course.id}
                      className={cn(
                        "rounded-[2rem] border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5",
                        course.id === selectedCourse.id
                          ? "border-sky-300 shadow-[0_18px_40px_rgba(14,165,233,0.12)]"
                          : "border-zinc-200"
                      )}
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                        {pickText(language, course.eyebrow)}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold text-zinc-950">
                        {pickText(language, course.title)}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                        {pickText(language, course.summary)}
                      </p>

                      <div className="mt-5 grid gap-3">
                        {course.units.slice(0, 3).map((unitItem) => (
                          <div
                            key={unitItem.id}
                            className="rounded-[1.25rem] border border-zinc-200 bg-zinc-50 px-4 py-3"
                          >
                            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                              Unit {unitItem.order}
                            </div>
                            <div className="mt-1 font-semibold text-zinc-900">
                              {pickText(language, unitItem.title)}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <InfoChip title={text.statCourses} body={text.statCoursesDesc} />
                        <InfoChip title={text.statSkills} body={text.statSkillsDesc} />
                        <InfoChip title={text.statUnits} body={text.statUnitsDesc} />
                      </div>

                      <div className="mt-6">
                        <LinkButton
                          href={`/learn/${course.id}`}
                          variant="outline"
                          className="rounded-2xl border-zinc-300 bg-zinc-50 text-zinc-900 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800 dark:text-zinc-100"
                        >
                          {text.seeCourse}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </LinkButton>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="rounded-[2rem] border border-zinc-200 bg-[#f8fafc] p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                    {text.explore}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    {pickText(language, selectedCourse.banner)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-100">
        {icon}
      </div>
      <div className="mt-4 text-3xl font-black text-zinc-950">{value}</div>
      <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
        {label}
      </div>
    </div>
  );
}

function PreviewPill({ label }: { label: string }) {
  return (
    <div className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm font-semibold text-zinc-700">
      {label}
    </div>
  );
}

function InfoChip({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[1.25rem] border border-zinc-200 bg-zinc-50 px-4 py-3">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">{title}</div>
      <div className="mt-1 text-sm leading-relaxed text-zinc-600">{body}</div>
    </div>
  );
}
