export const SAT_SECTIONS = ["reading-writing", "math"] as const;
export type SatSection = (typeof SAT_SECTIONS)[number];

export const PRACTICE_MODES = ["training", "test"] as const;
export type PracticeMode = (typeof PRACTICE_MODES)[number];

export const PRACTICE_DIFFICULTIES = ["easy", "medium", "hard"] as const;
export type PracticeDifficulty = (typeof PRACTICE_DIFFICULTIES)[number];

export function normalizeSatSection(value: string | null | undefined): SatSection {
  return value === "math" ? "math" : "reading-writing";
}

export function normalizePracticeDifficulty(
  value: string | null | undefined
): PracticeDifficulty {
  if (value === "easy" || value === "hard") {
    return value;
  }

  return "medium";
}

export function parseQuestionOptions(options: string) {
  try {
    const parsed = JSON.parse(options) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => typeof x === "string") as string[];
  } catch {
    return [];
  }
}

export function inferQuestionSection(questionText: string): SatSection {
  const text = questionText.toLowerCase();

  const looksLikeMath =
    /\bsolve\b/.test(text) ||
    /\bvalue of x\b/.test(text) ||
    /\bfunction\b/.test(text) ||
    /\bslope\b/.test(text) ||
    /\bline\b/.test(text) ||
    /\bgraph\b/.test(text) ||
    /\bequation\b/.test(text) ||
    /\binequality\b/.test(text) ||
    /\brectangle\b/.test(text) ||
    /\btriangle\b/.test(text) ||
    /\bcircle\b/.test(text) ||
    /\bradius\b/.test(text) ||
    /\barea\b/.test(text) ||
    /\bperimeter\b/.test(text) ||
    /\bcircumference\b/.test(text) ||
    /\bprobability\b/.test(text) ||
    /\bmean\b/.test(text) ||
    /\baverage\b/.test(text) ||
    /\bpercent\b/.test(text) ||
    /\bpercentage\b/.test(text) ||
    /\bdistance\b/.test(text) ||
    /\bhypotenuse\b/.test(text) ||
    /\bvolume\b/.test(text) ||
    /\bsurface area\b/.test(text) ||
    /\bparabola\b/.test(text) ||
    /\bvertex\b/.test(text) ||
    /\bdiscriminant\b/.test(text) ||
    /\broot\b/.test(text) ||
    /\bsin\(/.test(text) ||
    /\bsqrt|\b√/.test(text) ||
    /\d+\s*[%=x+y-]/.test(text);

  return looksLikeMath ? "math" : "reading-writing";
}

export function getPracticeQuestionCount(mode: PracticeMode) {
  return mode === "training" ? 10 : "all";
}

export function getSectionTimerSeconds(section: SatSection) {
  return section === "math" ? 70 * 60 : 64 * 60;
}

export function scoreSatQuestionDifficulty(input: {
  section: SatSection;
  questionText: string;
  options: string[];
  explanation?: string | null;
}) {
  const text = input.questionText.toLowerCase();
  const explanation = input.explanation?.toLowerCase() ?? "";
  let score = 0;

  score += Math.min(4, Math.floor(text.length / 85));
  score += Math.min(2, Math.floor(explanation.length / 140));

  if (input.section === "math") {
    score += countMatches(text, [
      /\n/g,
      /\bsystem\b/g,
      /\bquadratic\b/g,
      /x²|x\^2/g,
      /\bfunction\b/g,
      /\bslope\b/g,
      /\bprobability\b/g,
      /\bpercent\b/g,
      /\bcircumference\b/g,
      /\bvolume\b/g,
      /\btriangle\b/g,
      /\bwhich equation\b/g,
      /\bwhich expression\b/g,
    ]) * 2;

    score -= countMatches(text, [
      /\bwhat is \d+% of\b/g,
      /\barea of a rectangle\b/g,
      /\bmean of\b/g,
      /\bwhat is f\(\d+\)\b/g,
      /\badds \d+ to its input\b/g,
    ]);
  } else {
    score += countMatches(text, [
      /\bwhile\b/g,
      /\bdespite\b/g,
      /\bneither\b/g,
      /\balthough\b/g,
      /\brather than\b/g,
      /\bno change\b/g,
      /\btransition\b/g,
      /\bfunction of\b/g,
      /\bsemicolon\b/g,
      /\bmodifier\b/g,
      /[:,;]/g,
    ]) * 2;

    score -= countMatches(text, [
      /\bwhat is the best first move\b/g,
      /\bwhat does .* most nearly mean\b/g,
      /\bwhich transition best signals\b/g,
      /\beach of\b/g,
      /\bthe subject is\b/g,
    ]);
  }

  score += Math.max(0, input.options.length - 4);

  return score;
}

function countMatches(text: string, patterns: RegExp[]) {
  return patterns.reduce((total, pattern) => {
    const matches = text.match(pattern);
    return total + (matches?.length ?? 0);
  }, 0);
}
