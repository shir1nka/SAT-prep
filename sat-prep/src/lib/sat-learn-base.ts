export type LearnLanguage = "en" | "ru";

export type LocalizedText = {
  en: string;
  ru: string;
};

export type SkillStatus =
  | "mastered"
  | "proficient"
  | "familiar"
  | "attempted"
  | "not_started";

export type LearnQuestion = {
  id: string;
  prompt: LocalizedText;
  options: LocalizedText[];
  correctIndex: number;
  explanation: LocalizedText;
  hint?: LocalizedText;
  difficulty?: "core" | "challenge" | "mastery";
};

export type LearnExample = {
  prompt: LocalizedText;
  answer: LocalizedText;
  explanation: LocalizedText;
};

export type LearnSkill = {
  id: string;
  title: LocalizedText;
  shortTitle: LocalizedText;
  summary: LocalizedText;
  lesson: LocalizedText;
  strategy: LocalizedText;
  checkpoints: LocalizedText[];
  example: LearnExample;
  quiz: LearnQuestion[];
  status: SkillStatus;
  minutes: number;
};

export type LearnUnit = {
  id: string;
  order: number;
  title: LocalizedText;
  summary: LocalizedText;
  note: LocalizedText;
  skills: LearnSkill[];
  hasQuiz: boolean;
  hasUnitTest: boolean;
  kind?: "intro" | "core" | "practice" | "challenge";
};

export type LearnCourse = {
  id: string;
  title: LocalizedText;
  shortTitle: LocalizedText;
  eyebrow: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  banner: LocalizedText;
  practiceHint: LocalizedText;
  challengeText: LocalizedText;
  units: LearnUnit[];
};

const RUSSIAN_LEARN_REPLACEMENTS: Array<[string, string]> = [
  ["reading, writing и editing навыки", "навыки чтения, письма и редактирования"],
  ["reading и editing задачами", "задачами по чтению и редактированию"],
  ["purpose, tone и grammar signals", "цель текста, тон и грамматические сигналы"],
  ["skill lesson", "урок по навыку"],
  ["unit review", "разбор юнита"],
  ["quick check", "быстрая проверка"],
  ["skill tiles", "карточки навыков"],
  ["mixed drills", "смешанные тренировки"],
  ["advanced math", "продвинутую математику"],
  ["math track", "математический трек"],
  ["mixed challenge", "смешанный сложный блок"],
  ["mixed verbal challenge", "смешанный вербальный блок"],
  ["Mixed verbal challenge", "Смешанный вербальный блок"],
  ["passage skill", "навык по пассажам"],
  ["edit review", "разбор редактирования"],
  ["verbal checkpoints", "вербальные контрольные точки"],
  ["pacing strategy", "стратегию темпа"],
  ["speed-reading", "скорочтения"],
  ["subject-verb agreement question", "задаче на согласование подлежащего и сказуемого"],
  ["sentence placement question", "задаче на расположение предложения"],
  ["grammar choices", "грамматическими вариантами"],
  ["challenge-вопрос", "сложный вопрос"],
  ["challenge", "сложный этап"],
  ["checkpoints", "контрольные точки"],
  ["checkpoint", "контрольную точку"],
  ["central idea", "главную идею"],
  ["words-in-context", "слову в контексте"],
  ["subject-verb agreement", "согласование подлежащего и сказуемого"],
  ["inference question", "задаче на вывод"],
  ["inference", "вывод"],
  ["distractor-ы", "отвлекающие варианты"],
  ["distractors", "отвлекающие варианты"],
  ["distractor", "отвлекающий вариант"],
  ["mastery-уровне", "уровне мастерства"],
  ["mastery-раунд", "мастер-раунд"],
  ["Mastery-раунд", "Мастер-раунд"],
  ["mastery-level", "уровне мастерства"],
  ["Mastery", "Мастерство"],
  ["mastery", "мастерство"],
  ["clause", "часть предложения"],
  ["verbal-подход", "вербальный подход"],
  ["verbal timing", "темп в verbal-части"],
  ["checklist", "чеклист"],
  ["skill", "навык"],
];

function normalizeRussianLearnText(text: string) {
  return RUSSIAN_LEARN_REPLACEMENTS.reduce(
    (current, [from, to]) => current.replaceAll(from, to),
    text
  );
}

export const localized = (en: string, ru: string): LocalizedText => ({
  en,
  ru: normalizeRussianLearnText(ru),
});

export const question = (value: LearnQuestion): LearnQuestion => value;
export const skill = (value: LearnSkill): LearnSkill => value;
export const unit = (value: LearnUnit): LearnUnit => value;
