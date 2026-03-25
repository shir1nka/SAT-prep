import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import prisma from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";
import {
  enforceRateLimit,
  ensureSameOrigin,
  jsonWithSecurityHeaders,
} from "@/lib/security";

function parseOptions(options: string) {
  try {
    const parsed = JSON.parse(options) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => typeof x === "string") as string[];
  } catch {
    return [];
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<any> }
) {
  const resolvedParams = await params;
  const id = typeof resolvedParams?.id === "string" ? resolvedParams.id : "";

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
    questionText?: string;
    options?: string[] | string;
    correctAnswer?: string;
    explanation?: string;
  };

  const questionText = body.questionText?.trim();
  const correctAnswer = body.correctAnswer?.trim();
  const explanation = body.explanation?.trim();

  if (!questionText || !correctAnswer || !explanation) {
    return jsonWithSecurityHeaders(
      { error: "questionText, correctAnswer, explanation are required." },
      400
    );
  }

  if (!id || id.length > 64) {
    return jsonWithSecurityHeaders({ error: "Invalid question id." }, 400);
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

  const updated = await prisma.question.update({
    where: { id },
    data: {
      questionText,
      options: JSON.stringify(options),
      correctAnswer,
      explanation,
    },
    select: {
      id: true,
      questionText: true,
      options: true,
      correctAnswer: true,
      explanation: true,
    },
  });

  return jsonWithSecurityHeaders({
    id: updated.id,
    questionText: updated.questionText,
    options: parseOptions(updated.options),
    correctAnswer: updated.correctAnswer,
    explanation: updated.explanation,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<any> }
) {
  const resolvedParams = await params;
  const id = typeof resolvedParams?.id === "string" ? resolvedParams.id : "";

  const originResponse = ensureSameOrigin(req);
  if (originResponse) {
    return originResponse;
  }

  const rateLimitResponse = enforceRateLimit(req, {
    bucket: "admin-question-delete",
    max: 15,
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

  if (!id || id.length > 64) {
    return jsonWithSecurityHeaders({ error: "Invalid question id." }, 400);
  }

  await prisma.question.delete({ where: { id } });
  return jsonWithSecurityHeaders({ ok: true });
}
