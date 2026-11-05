"use client";

import { useSyncExternalStore } from "react";

export type PracticeResult = {
  correct: number;
  total: number;
  updatedAt: number;
};

export type LearnProgress = {
  completed: string[];
  practice: Record<string, PracticeResult>;
  xp: number;
  streak: number;
  lastVisit: string; // YYYY-MM-DD
  earnedXp: Record<string, number>; // topicId -> xp earned
  quizzes: Record<string, { correct: number; total: number; updatedAt: number }>;
};

const STORAGE_KEY = "sat-prep-learn-progress-v1";

const EMPTY: LearnProgress = { completed: [], practice: {}, xp: 0, streak: 0, lastVisit: "", earnedXp: {}, quizzes: {} };

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function calcLevel(xp: number) {
  // level n requires 100 * n*(n+1)/2 cumulative? simpler: sqrt
  // level = floor(sqrt(xp/100)) + 1
  return Math.floor(Math.sqrt(Math.max(0, xp) / 100)) + 1;
}

function xpForLevel(level: number) {
  return 100 * (level - 1) * (level - 1);
}

export { calcLevel, xpForLevel };

let cache: LearnProgress | null = null;
const listeners = new Set<() => void>();

function read(): LearnProgress {
  if (typeof window === "undefined") {
    return EMPTY;
  }

  if (cache) {
    return cache;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      cache = EMPTY;
      return cache;
    }

    const parsed = JSON.parse(raw) as Partial<LearnProgress>;
    cache = {
      completed: Array.isArray(parsed.completed) ? parsed.completed.filter((id) => typeof id === "string") : [],
      practice: parsed.practice && typeof parsed.practice === "object" ? parsed.practice : {},
      xp: typeof parsed.xp === "number" ? parsed.xp : 0,
      streak: typeof parsed.streak === "number" ? parsed.streak : 0,
      lastVisit: typeof parsed.lastVisit === "string" ? parsed.lastVisit : "",
      earnedXp: parsed.earnedXp && typeof parsed.earnedXp === "object" ? parsed.earnedXp : {},
      quizzes: parsed.quizzes && typeof parsed.quizzes === "object" ? parsed.quizzes : {},
    };
    // touch streak on read
    touchStreak();
    return cache;
  } catch {
    cache = EMPTY;
    return cache;
  }
}

function commit(next: LearnProgress) {
  cache = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage can be unavailable (private mode / quota). Keep in-memory state.
    }
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function touchStreak() {
  if (!cache) return;
  const today = todayKey();
  if (cache.lastVisit === today) return;
  const wasYesterday = cache.lastVisit === yesterdayKey();
  const nextStreak = wasYesterday ? cache.streak + 1 : 1;
  cache = { ...cache, streak: nextStreak, lastVisit: today };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
    } catch {}
  }
}

export function awardXp(topicId: string, amount: number, opts?: { force?: boolean }) {
  const current = read();
  if (!opts?.force && current.earnedXp[topicId]) return 0;
  const gained = amount;
  commit({
    ...current,
    xp: current.xp + gained,
    earnedXp: { ...current.earnedXp, [topicId]: (current.earnedXp[topicId] || 0) + gained },
  });
  return gained;
}

export function markTopicComplete(topicId: string, complete = true) {
  const current = read();
  const completed = new Set(current.completed);
  if (complete) {
    completed.add(topicId);
  } else {
    completed.delete(topicId);
  }
  commit({ ...current, completed: Array.from(completed) });
}

export function recordQuiz(topicId: string, correct: number, total: number) {
  const current = read();
  const prev = current.quizzes[topicId];
  if (prev && prev.correct >= correct && prev.total === total) return 0;
  const best = Math.max(prev?.correct || 0, correct);
  commit({
    ...current,
    quizzes: { ...current.quizzes, [topicId]: { correct: best, total, updatedAt: Date.now() } },
  });
  // award 30 XP once per perfect quiz
  if (correct === total && total > 0 && !current.earnedXp[`quiz-${topicId}`]) {
    awardXp(`quiz-${topicId}`, 30, { force: true });
    return 30;
  }
  return 0;
}

export function isTopicComplete(topicId: string) {
  return read().completed.includes(topicId);
}

export function recordPractice(topicId: string, correct: number, total: number) {
  const current = read();
  const previous = current.practice[topicId];
  if (previous && previous.correct >= correct && previous.total === total) {
    return;
  }
  commit({
    ...current,
    practice: {
      ...current.practice,
      [topicId]: { correct, total, updatedAt: Date.now() },
    },
  });
}

export function recordRealSolve(questionId: string, correct: boolean) {
  const current = read();
  const prev = current.quizzes[questionId];
  if (prev) return;
  commit({
    ...current,
    quizzes: {
      ...current.quizzes,
      [questionId]: { correct: correct ? 1 : 0, total: 1, updatedAt: Date.now() },
    },
  });
  if (correct) {
    awardXp(`real-${questionId}`, 15, { force: true });
  }
}

export function isRealSolved(questionId: string) {
  return !!read().quizzes[questionId];
}

export function resetProgress() {
  commit(EMPTY);
}

export function useLearnProgress(): LearnProgress {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
