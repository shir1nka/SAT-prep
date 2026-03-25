import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import prisma from "@/lib/prisma";
import { inferQuestionSection, normalizeSatSection, parseQuestionOptions } from "@/lib/sat";
import { isAdminEmail } from "@/lib/admin";
import {
  enforceRateLimit,
  ensureSameOrigin,
  jsonWithSecurityHeaders,
} from "@/lib/security";

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  });

  const email = token?.email as string | undefined;
  if (!isAdminEmail(email)) {
    return jsonWithSecurityHeaders({ error: "Unauthorized" }, 401);
  }

  const questions = await prisma.question.findMany({
    select: {
      id: true,
      section: true,
      questionText: true,
      options: true,
      correctAnswer: true,
      explanation: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return jsonWithSecurityHeaders(
    questions.map((q) => ({
      id: q.id,
      section: normalizeSatSection(q.section ?? inferQuestionSection(q.questionText)),
      questionText: q.questionText,
      options: parseQuestionOptions(q.options),
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
    }))
  );
}

export async function POST(req: NextRequest) {
  const originResponse = ensureSameOrigin(req);
  if (originResponse) {
    return originResponse;
  }

  const rateLimitResponse = enforceRateLimit(req, {
    bucket: "admin-question-write",
    max: 30,
    windowMs: 10 * 60_000,
  });
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  });

  const email = token?.email as string | undefined;
  if (!isAdminEmail(email)) {
    return jsonWithSecurityHeaders({ error: "Unauthorized" }, 401);
  }

  const body = (await req.json()) as {
    section?: string;
    questionText?: string;
    options?: string[] | string;
    correctAnswer?: string;
    explanation?: string;
  };

  const section = normalizeSatSection(body.section);
  const questionText = body.questionText?.trim();
  const correctAnswer = body.correctAnswer?.trim();
  const explanation = body.explanation?.trim();

  if (!questionText || !correctAnswer || !explanation) {
    return jsonWithSecurityHeaders(
      { error: "questionText, correctAnswer, explanation are required." },
      400
    );
  }

  if (
    questionText.length > 2_000 ||
    correctAnswer.length > 500 ||
    explanation.length > 4_000
  ) {
    return jsonWithSecurityHeaders(
      { error: "One or more fields exceed the allowed length." },
      400
    );
  }

  let options: string[] = [];
  if (Array.isArray(body.options)) {
    options = body.options.map((o) => `${o}`.trim()).filter(Boolean);
  } else if (typeof body.options === "string") {
    // Support newline/comma separated options.
    options = body.options
      .split(/\n|,/g)
      .map((o) => o.trim())
      .filter(Boolean);
  }

  if (options.length < 2) {
    return jsonWithSecurityHeaders(
      { error: "At least 2 options are required." },
      400
    );
  }

  if (options.length > 8 || options.some((option) => option.length > 500)) {
    return jsonWithSecurityHeaders(
      { error: "Options exceed the allowed size." },
      400
    );
  }

  const created = await prisma.question.create({
    data: {
      questionText,
      section,
      options: JSON.stringify(options),
      correctAnswer,
      explanation,
    },
    select: {
      id: true,
      section: true,
      questionText: true,
      options: true,
      correctAnswer: true,
      explanation: true,
    },
  });

  return jsonWithSecurityHeaders({
    id: created.id,
    section: normalizeSatSection(created.section ?? section),
    questionText: created.questionText,
    options: parseQuestionOptions(created.options),
    correctAnswer: created.correctAnswer,
    explanation: created.explanation,
  });
}
