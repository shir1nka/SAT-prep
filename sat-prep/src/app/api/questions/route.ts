import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import prisma from "@/lib/prisma";
import {
  inferQuestionSection,
  normalizeSatSection,
  parseQuestionOptions,
} from "@/lib/sat";
import { enforceRateLimit, jsonWithSecurityHeaders } from "@/lib/security";

type QuestionDto = {
  id: string;
  section: "reading-writing" | "math";
  questionText: string;
  options: string[];
  correctAnswer?: string;
  explanation?: string;
};

function shuffle<T>(arr: T[]) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export async function GET(req: NextRequest) {
  const rateLimitResponse = enforceRateLimit(req, {
    bucket: "questions",
    max: 60,
    windowMs: 60_000,
  });
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  });

  if (!token?.email) {
    return jsonWithSecurityHeaders(
      { error: "Please sign in to access practice questions." },
      401
    );
  }

  const url = new URL(req.url);
  const countRaw = url.searchParams.get("count");
  const mode = url.searchParams.get("mode");
  const includeTrainingDetails = mode === "training";
  const requestedSection = normalizeSatSection(url.searchParams.get("section"));
  const requestAll = countRaw === "all";
  const requested = countRaw ? Number(countRaw) : 10;
  const count = requestAll
    ? Number.POSITIVE_INFINITY
    : Number.isFinite(requested)
      ? Math.max(1, Math.min(200, Math.floor(requested)))
      : 10;

  const allQuestions = await prisma.question.findMany({
    select: {
      id: true,
      section: true,
      questionText: true,
      options: true,
      correctAnswer: includeTrainingDetails,
      explanation: includeTrainingDetails,
    },
  });

  const sectionQuestions = allQuestions.filter((question) => {
    const section = normalizeSatSection(
      question.section ?? inferQuestionSection(question.questionText)
    );

    return section === requestedSection;
  });

  const picked = shuffle(sectionQuestions).slice(0, count);

  const questions: QuestionDto[] = picked.map((q) => {
    const safeOptions = parseQuestionOptions(q.options);
    const section = normalizeSatSection(
      q.section ?? inferQuestionSection(q.questionText)
    );

    return {
      id: q.id,
      section,
      questionText: q.questionText,
      options: safeOptions,
      correctAnswer: includeTrainingDetails ? q.correctAnswer : undefined,
      explanation: includeTrainingDetails ? q.explanation : undefined,
    };
  });

  return jsonWithSecurityHeaders({
    questions,
    meta: {
      section: requestedSection,
      totalAvailable: sectionQuestions.length,
    },
  });
}
