import type { RealTestLabQuestion } from "../types";
import { t4 } from "./test4";
import { t5 } from "./test5";
import { t6 } from "./test6";

export const REAL_QUESTIONS: RealTestLabQuestion[] = [...t4, ...t5, ...t6];

export function getRealQuestion(id: string) {
  return REAL_QUESTIONS.find((q) => q.id === id) ?? null;
}

export function listRealQuestions(filter: { test?: number; section?: string; domainId?: string; difficulty?: string } = {}) {
  return REAL_QUESTIONS.filter((q) => {
    if (filter.test && q.test !== filter.test) return false;
    if (filter.section && q.section !== filter.section) return false;
    if (filter.domainId && q.domainId !== filter.domainId) return false;
    if (filter.difficulty && q.difficulty !== filter.difficulty) return false;
    return true;
  }).sort((a, b) => a.test - b.test || a.section.localeCompare(b.section) || a.number - b.number);
}

export const REAL_DOMAINS = [
  { id: "heart", label: "Heart of Algebra", short: "Algebra" },
  { id: "psda", label: "Problem Solving & Data", short: "Data" },
  { id: "passport", label: "Passport to Advanced", short: "Advanced" },
  { id: "geometry", label: "Geometry & Trig", short: "Geometry" },
  { id: "rw-information", label: "Information & Ideas", short: "RW Info" },
  { id: "rw-craft", label: "Craft & Structure", short: "RW Craft" },
  { id: "rw-expression", label: "Expression of Ideas", short: "RW Expr" },
  { id: "rw-grammar", label: "Standard Conventions", short: "RW Grammar" },
];
