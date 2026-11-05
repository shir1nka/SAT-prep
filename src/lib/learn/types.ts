export type LocalizedText = {
  en: string;
  ru: string;
};

export type LearnSectionId = "math" | "english";

export type Difficulty = "easy" | "medium" | "hard";

export type TheoryBlock = {
  heading: LocalizedText;
  body: LocalizedText;
  formulas?: string[];
};

export type WorkedExample = {
  prompt: LocalizedText;
  steps: LocalizedText[];
  answer: LocalizedText;
  source?: string;
  /** Expressions that can be pushed straight into the Desmos calculator. */
  desmos?: string[];
};

export type DesmosStep = {
  title: LocalizedText;
  expressions: string[];
  note?: LocalizedText;
};

export type DesmosRecipe = {
  title: LocalizedText;
  goal: LocalizedText;
  steps: DesmosStep[];
  speed?: LocalizedText;
  caution?: LocalizedText;
};

export type PracticeQuestion = {
  id: string;
  prompt: LocalizedText;
  options?: LocalizedText[];
  correctIndex?: number;
  /** For student-produced response questions. */
  answerText?: LocalizedText;
  explanation: LocalizedText;
  difficulty: Difficulty;
  source?: string;
  desmos?: string[];
};

export type Topic = {
  id: string;
  section: LearnSectionId;
  domainId: string;
  order: number;
  title: LocalizedText;
  subtitle: LocalizedText;
  minutes: number;
  tags: string[];
  objectives: LocalizedText[];
  theory: TheoryBlock[];
  examples: WorkedExample[];
  desmos?: DesmosRecipe[];
  strategy: LocalizedText[];
  pitfalls: LocalizedText[];
  practice: PracticeQuestion[];
};

export type LearnDomain = {
  id: string;
  section: LearnSectionId;
  order: number;
  title: LocalizedText;
  shortTitle: LocalizedText;
  summary: LocalizedText;
  /** Tailwind-ish accent key used by the UI. */
  accent: "sky" | "violet" | "emerald" | "amber" | "rose";
};

export type BankQuestion = {
  id: string;
  section: LearnSectionId;
  domainId: string;
  topicId: string;
  difficulty: Difficulty;
  prompt: LocalizedText;
  options?: string[];
  correctIndex?: number;
  answerText?: string;
  explanation?: LocalizedText;
  source: string;
  desmos?: string[];
};

export type RealTestLabSolutionStep = {
  title: LocalizedText;
  detail: LocalizedText;
  expressions?: string[];
};

export type RealTestLabMethod = {
  title: LocalizedText;
  steps: RealTestLabSolutionStep[];
};

export type RealTestLabQuestion = {
  id: string; // e.g. t4-math-m1-q7
  test: 4 | 5 | 6;
  section: LearnSectionId;
  module: 1 | 2;
  number: number;
  domainId: string;
  domainLabel: string;
  difficulty: Difficulty;
  prompt: LocalizedText;
  passage?: LocalizedText;
  options?: string[]; // A-D if MCQ
  correctIndex?: number;
  answerText?: string; // for SPR
  correctAnswerLabel: LocalizedText; // human-readable correct answer
  sourcePage?: number;
  standard: RealTestLabMethod;
  desmos: RealTestLabMethod;
  pitfalls: LocalizedText[];
  desmosExpressions: string[];
};

export type RealTestLabFilter = {
  test?: number;
  section?: LearnSectionId;
  domainId?: string;
  difficulty?: Difficulty;
};

export const text = (en: string, ru: string): LocalizedText => ({ en, ru });

export function pick(language: "en" | "ru", value: LocalizedText) {
  return value[language];
}
