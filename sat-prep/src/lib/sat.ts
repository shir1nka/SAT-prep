export const SAT_SECTIONS = ["reading-writing", "math"] as const;
export type SatSection = (typeof SAT_SECTIONS)[number];

export const PRACTICE_MODES = ["training", "test"] as const;
export type PracticeMode = (typeof PRACTICE_MODES)[number];

export function normalizeSatSection(value: string | null | undefined): SatSection {
  return value === "math" ? "math" : "reading-writing";
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
