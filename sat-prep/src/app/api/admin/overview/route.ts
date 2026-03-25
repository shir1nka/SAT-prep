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

  const [totalUsers, totalQuestions, totalAttempts, correctAttempts] =
    await Promise.all([
      prisma.user.count(),
      prisma.question.count(),
      prisma.attempt.count(),
      prisma.attempt.count({ where: { isCorrect: true } }),
    ]);

  const correctPercentage = totalAttempts
    ? Math.round((correctAttempts / totalAttempts) * 100)
    : 0;

  return NextResponse.json({
    totalUsers,
    totalQuestions,
    totalAttempts,
    correctAttempts,
    correctPercentage,
  });
}
