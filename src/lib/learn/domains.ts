import type { LearnDomain, LearnSectionId, LocalizedText } from "./types";

export const SECTION_ORDER: LearnSectionId[] = ["english", "math"];

export const SECTIONS: Record<
  LearnSectionId,
  {
    id: LearnSectionId;
    title: LocalizedText;
    shortTitle: LocalizedText;
    kicker: LocalizedText;
    summary: LocalizedText;
    accent: "sky" | "violet" | "emerald" | "amber" | "rose";
    examWeight: LocalizedText;
  }
> = {
  english: {
    id: "english",
    title: { en: "English SAT Learn", ru: "English SAT Learn" },
    shortTitle: { en: "English", ru: "English" },
    kicker: { en: "Reading & Writing", ru: "Reading & Writing" },
    summary: {
      en: "Every Reading and Writing question type, rebuilt as a short lesson: what the test asks, how to read the passage, and how to eliminate the traps.",
      ru: "Все типы вопросов Reading and Writing в коротких уроках: что спрашивает тест, как читать пассаж и как убирать ловушки.",
    },
    accent: "amber",
    examWeight: { en: "2 modules · 66 questions", ru: "2 модуля · 66 вопросов" },
  },
  math: {
    id: "math",
    title: { en: "Math Section Learn", ru: "Math Section Learn" },
    shortTitle: { en: "Math", ru: "Math" },
    kicker: { en: "Desmos-first", ru: "Desmos-first" },
    summary: {
      en: "All four math domains with a Desmos playbook on every topic: type this, see the answer, move on in seconds.",
      ru: "Все четыре домена математики с Desmos-разбором в каждой теме: ввёл выражение — увидел ответ — пошёл дальше.",
    },
    accent: "violet",
    examWeight: { en: "2 modules · 54 questions", ru: "2 модуля · 54 вопроса" },
  },
};

export const DOMAINS: LearnDomain[] = [
  {
    id: "information",
    section: "english",
    order: 1,
    title: { en: "Information and Ideas", ru: "Информация и идеи" },
    shortTitle: { en: "Information", ru: "Информация" },
    summary: {
      en: "Central ideas, details, evidence, and inferences — what the passage actually says.",
      ru: "Главная мысль, детали, доказательства и выводы — что реально сказано в тексте.",
    },
    accent: "sky",
  },
  {
    id: "craft",
    section: "english",
    order: 2,
    title: { en: "Craft and Structure", ru: "Структура и стиль" },
    shortTitle: { en: "Craft", ru: "Структура" },
    summary: {
      en: "Words in context, text structure, purpose, and cross-text connections.",
      ru: "Слова в контексте, структура текста, цель автора и связи между текстами.",
    },
    accent: "violet",
  },
  {
    id: "expression",
    section: "english",
    order: 3,
    title: { en: "Expression of Ideas", ru: "Выражение мыслей" },
    shortTitle: { en: "Expression", ru: "Выражение" },
    summary: {
      en: "Transitions and rhetorical synthesis — make the paragraph do its job.",
      ru: "Переходы и rhetorical synthesis — заставь абзац работать.",
    },
    accent: "amber",
  },
  {
    id: "conventions",
    section: "english",
    order: 4,
    title: { en: "Standard English Conventions", ru: "Грамматические нормы" },
    shortTitle: { en: "Conventions", ru: "Грамматика" },
    summary: {
      en: "Sentence boundaries, commas, agreement, pronouns, verbs, modifiers, parallelism.",
      ru: "Границы предложений, запятые, согласование, местоимения, глаголы, модификаторы, параллелизм.",
    },
    accent: "emerald",
  },
  {
    id: "algebra",
    section: "math",
    order: 1,
    title: { en: "Algebra", ru: "Алгебра" },
    shortTitle: { en: "Algebra", ru: "Алгебра" },
    summary: {
      en: "Linear equations, functions, systems, inequalities — the largest slice of the math section.",
      ru: "Линейные уравнения, функции, системы, неравенства — самая большая часть math-секции.",
    },
    accent: "sky",
  },
  {
    id: "advanced",
    section: "math",
    order: 2,
    title: { en: "Advanced Math", ru: "Продвинутая математика" },
    shortTitle: { en: "Advanced", ru: "Advanced" },
    summary: {
      en: "Quadratics, nonlinear systems, functions, exponentials, rationals, radicals.",
      ru: "Квадратичные функции, нелинейные системы, функции, экспоненты, рациональные и корни.",
    },
    accent: "violet",
  },
  {
    id: "data",
    section: "math",
    order: 3,
    title: { en: "Problem-Solving and Data Analysis", ru: "Задачи и анализ данных" },
    shortTitle: { en: "Data", ru: "Данные" },
    summary: {
      en: "Ratios, percents, unit conversion, statistics, scatterplots, probability, inference.",
      ru: "Отношения, проценты, единицы, статистика, графики рассеяния, вероятность, выводы.",
    },
    accent: "emerald",
  },
  {
    id: "geometry",
    section: "math",
    order: 4,
    title: { en: "Geometry and Trigonometry", ru: "Геометрия и тригонометрия" },
    shortTitle: { en: "Geometry", ru: "Геометрия" },
    summary: {
      en: "Angles, triangles, similarity, trig ratios, circles, area, volume, coordinates.",
      ru: "Углы, треугольники, подобие, тригонометрические отношения, окружности, площадь, объём, координаты.",
    },
    accent: "amber",
  },
];

export function getDomains(section: LearnSectionId) {
  return DOMAINS.filter((domain) => domain.section === section).sort((a, b) => a.order - b.order);
}

export function getDomain(id: string) {
  return DOMAINS.find((domain) => domain.id === id);
}
