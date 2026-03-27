import type { LearnCourse, LearnLanguage, LocalizedText, SkillStatus } from "./sat-learn-base";
import { expandLearnCourse } from "./sat-learn-expansion";
import { SAT_MATH_COURSE } from "./sat-learn-math";
import { SAT_READING_WRITING_COURSE } from "./sat-learn-reading";

export type { LearnCourse, LearnLanguage, LocalizedText, SkillStatus } from "./sat-learn-base";

export const SAT_LEARN_COURSES: LearnCourse[] = [
  expandLearnCourse(SAT_MATH_COURSE),
  expandLearnCourse(SAT_READING_WRITING_COURSE),
];

export function pickText(language: LearnLanguage, value: LocalizedText) {
  return value[language];
}

export function findLearnCourseById(courseId?: string) {
  return SAT_LEARN_COURSES.find((course) => course.id === courseId);
}

export function getLearnCourseById(courseId?: string) {
  return findLearnCourseById(courseId) ?? SAT_LEARN_COURSES[0];
}

export function getCourseSkillCount(course: LearnCourse) {
  return course.units.reduce((total, current) => total + current.skills.length, 0);
}

export function getAllCourseSkills(course: LearnCourse) {
  return course.units.flatMap((unitItem) =>
    unitItem.skills.map((skillItem) => ({
      courseId: course.id,
      unit: unitItem,
      skill: skillItem,
    }))
  );
}

export function getStatusCounts(course: LearnCourse) {
  return getAllCourseSkills(course).reduce(
    (counts, current) => {
      counts[current.skill.status] += 1;
      return counts;
    },
    {
      mastered: 0,
      proficient: 0,
      familiar: 0,
      attempted: 0,
      not_started: 0,
    } as Record<SkillStatus, number>
  );
}

export function getCourseSkillPosition(course: LearnCourse, skillId?: string) {
  const allSkills = getAllCourseSkills(course);
  const index = allSkills.findIndex((entry) => entry.skill.id === skillId);

  if (index < 0) {
    return {
      current: allSkills[0],
      previous: undefined,
      next: allSkills[1],
      index: 0,
      total: allSkills.length,
    };
  }

  return {
    current: allSkills[index],
    previous: index > 0 ? allSkills[index - 1] : undefined,
    next: index < allSkills.length - 1 ? allSkills[index + 1] : undefined,
    index,
    total: allSkills.length,
  };
}
