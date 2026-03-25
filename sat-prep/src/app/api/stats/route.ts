import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { enforceRateLimit, jsonWithSecurityHeaders } from "@/lib/security";

export async function GET(req: NextRequest) {
  const rateLimitResponse = enforceRateLimit(req, {
    bucket: "stats",
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

  const tokenEmail = typeof token?.email === "string" ? token.email : undefined;
  const tokenId = typeof token?.id === "string" ? token.id : undefined;

  const resolvedUser = tokenEmail
    ? await prisma.user.findUnique({
        where: { email: tokenEmail },
        select: { id: true },
      })
    : tokenId
      ? await prisma.user.findUnique({
          where: { id: tokenId },
          select: { id: true },
        })
      : null;

  const userId = resolvedUser?.id;
  if (!userId) {
    return jsonWithSecurityHeaders({ error: "Unauthorized" }, 401);
  }

  const totalAttempts = await prisma.attempt.count({
    where: { userId },
  });

  const correctAttempts = await prisma.attempt.count({
    where: { userId, isCorrect: true },
  });

  const correctPercentage = totalAttempts
    ? Math.round((correctAttempts / totalAttempts) * 100)
    : 0;

  return jsonWithSecurityHeaders({
    totalAttempts,
    correctAttempts,
    correctPercentage,
  });
}
