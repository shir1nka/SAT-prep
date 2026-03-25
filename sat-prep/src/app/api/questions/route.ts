import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import prisma from "@/lib/prisma";
import { enforceRateLimit, jsonWithSecurityHeaders } from "@/lib/security";

type QuestionDto = {
  id: string;
  questionText: string;
  options: string[];
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
  const requested = countRaw ? Number(countRaw) : 10;
  const count = Number.isFinite(requested)
    ? Math.max(1, Math.min(50, Math.floor(requested)))
    : 10;

  const allQuestions = await prisma.question.findMany({
    select: { id: true, questionText: true, options: true },
  });

  const picked = shuffle(allQuestions).slice(0, count);

  const questions: QuestionDto[] = picked.map((q) => {
    let options: unknown = [];
    try {
      options = JSON.parse(q.options);
    } catch {
      // If the stored data is malformed, fall back to empty options.
      options = [];
    }
    const safeOptions = Array.isArray(options)
      ? (options.filter((x) => typeof x === "string") as string[])
      : [];

    return { id: q.id, questionText: q.questionText, options: safeOptions };
  });

  return jsonWithSecurityHeaders({ questions });
}
