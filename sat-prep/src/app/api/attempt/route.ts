import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import prisma from "@/lib/prisma";
import {
  enforceRateLimit,
  ensureSameOrigin,
  jsonWithSecurityHeaders,
} from "@/lib/security";

type AttemptResponse = {
  isCorrect: boolean;
  explanation: string;
  correctAnswer?: string;
};

type QuestionSnapshot = {
  section?: "reading-writing" | "math";
  questionText?: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
};

export async function POST(req: NextRequest) {
  try {
    const originResponse = ensureSameOrigin(req);
    if (originResponse) {
      return originResponse;
    }

    const rateLimitResponse = enforceRateLimit(req, {
      bucket: "attempt-submit",
      max: 120,
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
    const tokenSub = typeof token?.sub === "string" ? token.sub : undefined;

    const resolvedUser = tokenEmail
      ? await prisma.user.findUnique({
          where: { email: tokenEmail },
          select: { id: true, email: true },
        })
      : null;

    const fallbackUser =
      resolvedUser ||
      (tokenId
        ? await prisma.user.findUnique({
            where: { id: tokenId },
            select: { id: true, email: true },
          })
        : null) ||
      (tokenSub && tokenSub !== tokenId
        ? await prisma.user.findUnique({
            where: { id: tokenSub },
            select: { id: true, email: true },
          })
        : null);

    const userId = fallbackUser?.id;

    if (!userId) {
      console.error("Could not resolve authenticated user", {
        tokenEmail,
        tokenId,
        tokenSub,
      });
      return jsonWithSecurityHeaders(
        { error: "User account could not be resolved. Please sign out and sign in again." },
        401
      );
    }

    const body = (await req.json()) as {
      questionId?: string;
      selectedAnswer?: string;
      questionSnapshot?: QuestionSnapshot;
    };

    const questionId = body.questionId;
    const selectedAnswer = body.selectedAnswer;
    const snapshot = body.questionSnapshot;

    console.log("Attempt request:", { userId, questionId, selectedAnswer });

    if (
      !questionId ||
      typeof questionId !== "string" ||
      !selectedAnswer ||
      typeof selectedAnswer !== "string"
    ) {
      console.error("Missing required fields");
      return jsonWithSecurityHeaders(
        { error: "questionId and selectedAnswer are required." },
        400
      );
    }

    if (questionId.length > 64 || selectedAnswer.length > 500) {
      return jsonWithSecurityHeaders(
        { error: "Submitted payload is too large." },
        400
      );
    }

    let question = await prisma.question.findUnique({
      where: { id: questionId },
      select: { correctAnswer: true, explanation: true },
    });

    if (
      !question &&
      snapshot?.questionText &&
      Array.isArray(snapshot.options) &&
      snapshot.options.length >= 2 &&
      typeof snapshot.correctAnswer === "string" &&
      typeof snapshot.explanation === "string"
    ) {
      try {
        await prisma.question.create({
          data: {
            id: questionId,
            section: snapshot.section,
            questionText: snapshot.questionText,
            options: JSON.stringify(snapshot.options),
            correctAnswer: snapshot.correctAnswer,
            explanation: snapshot.explanation,
          },
        });

        question = {
          correctAnswer: snapshot.correctAnswer,
          explanation: snapshot.explanation,
        };
      } catch (createError) {
        console.error("Question recreation failed:", createError);
      }
    }

    if (!question) {
      console.error("Question not found:", questionId);
      return jsonWithSecurityHeaders({ error: "Question not found." }, 404);
    }

    console.log("Question found. Comparing answers:", {
      selected: selectedAnswer,
      correct: question.correctAnswer,
    });

    const isCorrect = selectedAnswer === question.correctAnswer;

    await prisma.attempt.create({
      data: {
        userId,
        questionId,
        selectedAnswer,
        isCorrect,
      },
    });

    const response: AttemptResponse = {
      isCorrect,
      explanation: question.explanation,
    };

    // Include correct answer if the user's answer was wrong
    if (!isCorrect) {
      response.correctAnswer = question.correctAnswer;
    }

    console.log("Response sent:", { isCorrect });
    return jsonWithSecurityHeaders(response);
  } catch (err: any) {
    console.error("Attempt API error:", err);
    return jsonWithSecurityHeaders(
      { error: err?.message ?? "Attempt failed." },
      500
    );
  }
}
