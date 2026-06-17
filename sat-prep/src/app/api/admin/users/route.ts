import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import prisma from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

export type UserWithStats = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  createdAt: Date;
  attempts: number;
  correctAttempts: number;
  correctPercentage: number;
};

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  });

  const email = token?.email as string | undefined;
  if (!isAdminEmail(email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      createdAt: true,
      attempts: {
        select: {
          id: true,
          isCorrect: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const usersWithStats: UserWithStats[] = users.map((user) => {
    const totalAttempts = user.attempts.length;
    const correctAttempts = user.attempts.filter((a) => a.isCorrect).length;
    const correctPercentage =
      totalAttempts > 0
        ? Math.round((correctAttempts / totalAttempts) * 100)
        : 0;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      createdAt: user.createdAt,
      attempts: totalAttempts,
      correctAttempts,
      correctPercentage,
    };
  });

  return NextResponse.json(usersWithStats);
}
