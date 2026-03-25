import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import prisma from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  });

  const email = token?.email as string | undefined;
  if (!isAdminEmail(email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const limitRaw = url.searchParams.get("limit");
  const offsetRaw = url.searchParams.get("offset");

  const limit = limitRaw ? Math.max(1, Math.min(200, Number(limitRaw))) : 50;
  const offset = offsetRaw ? Math.max(0, Number(offsetRaw)) : 0;

  const attempts = await prisma.attempt.findMany({
    skip: offset,
    take: limit,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      selectedAnswer: true,
      isCorrect: true,
      createdAt: true,
      user: { select: { email: true } },
      question: { select: { questionText: true } },
    },
  });

  return NextResponse.json({
    attempts: attempts.map((a) => ({
      id: a.id,
      userEmail: a.user.email,
      questionText: a.question.questionText,
      selectedAnswer: a.selectedAnswer,
      isCorrect: a.isCorrect,
      createdAt: a.createdAt,
    })),
  });
}
