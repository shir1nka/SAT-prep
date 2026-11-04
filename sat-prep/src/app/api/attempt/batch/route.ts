import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import prisma from "@/lib/prisma";
import {
  enforceRateLimit,
  ensureSameOrigin,
  jsonWithSecurityHeaders,
} from "@/lib/security";

type BatchAnswer = {
  questionId?: string;
  selectedAnswer?: string;
  questionSnapshot?: {
    section?: "reading-writing" | "math";
    questionText?: string;
    options?: string[];
    correctAnswer?: string;
    explanation?: string;
  };
};

export async function POST(req: NextRequest) {
  try {
    const originResponse = ensureSameOrigin(req);
    if (originResponse) {
      return originResponse;
    }

    const rateLimitResponse = enforceRateLimit(req, {
      bucket: "attempt-batch-submit",
      max: 20,
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
          select: { id: true },
        })
      : null;

    const fallbackUser =
      resolvedUser ||
      (tokenId
        ? await prisma.user.findUnique({
            where: { id: tokenId },
            select: { id: true },
          })
        : null) ||
      (tokenSub && tokenSub !== tokenId
        ? await prisma.user.findUnique({
            where: { id: tokenSub },
            select: { id: true },
          })
        : null);

    if (!fallbackUser?.id) {
      return jsonWithSecurityHeaders(
        { error: "User account could not be resolved. Please sign in again." },
        401
      );
    }

    const body = (await req.json()) as { answers?: BatchAnswer[] };
    const answers = Array.isArray(body.answers) ? body.answers : [];

    if (!answers.length) {
      return jsonWithSecurityHeaders({ error: "answers are required." }, 400);
    }

    if (answers.length > 200) {
      return jsonWithSecurityHeaders(
        { error: "Too many answers submitted at once." },
        400
      );
    }

    const sanitizedAnswers = answers.map((answer) => ({
      questionId: typeof answer.questionId === "string" ? answer.questionId : "",
      selectedAnswer:
        typeof answer.selectedAnswer === "string" ? answer.selectedAnswer : "",
      questionSnapshot:
        answer.questionSnapshot &&
        typeof answer.questionSnapshot === "object" &&
        !Array.isArray(answer.questionSnapshot)
          ? answer.questionSnapshot
          : undefined,
    }));

    if (sanitizedAnswers.some((answer) => !answer.questionId)) {
      return jsonWithSecurityHeaders(
        { error: "Each answer must include questionId." },
        400
      );
    }

    const questionIds = [...new Set(sanitizedAnswers.map((answer) => answer.questionId))];
    const questions = await prisma.question.findMany({
      where: { id: { in: questionIds } },
      select: {
        id: true,
        correctAnswer: true,
        explanation: true,
      },
    });

    const byId = new Map(questions.map((question) => [question.id, question]));

    if (byId.size !== questionIds.length) {
      const missingQuestionIds = questionIds.filter((questionId) => !byId.has(questionId));
      const recoveryPayload = missingQuestionIds
        .map((questionId) =>
          sanitizedAnswers.find(
            (answer) =>
              answer.questionId === questionId &&
              answer.questionSnapshot?.questionText &&
              Array.isArray(answer.questionSnapshot.options) &&
              answer.questionSnapshot.options.length >= 2 &&
              answer.questionSnapshot.correctAnswer &&
              answer.questionSnapshot.explanation
          )
        )
        .filter(Boolean) as Array<
        typeof sanitizedAnswers[number] & {
          questionSnapshot: NonNullable<typeof sanitizedAnswers[number]["questionSnapshot"]>;
        }
      >;

      for (const answer of recoveryPayload) {
        try {
          await prisma.question.create({
            data: {
              id: answer.questionId,
              section: answer.questionSnapshot.section ?? "reading-writing",
              questionText: answer.questionSnapshot.questionText!,
              options: JSON.stringify(answer.questionSnapshot.options),
              correctAnswer: answer.questionSnapshot.correctAnswer!,
              explanation: answer.questionSnapshot.explanation!,
            },
          });
        } catch (error) {
          console.error("Batch question recreation failed:", error);
        }
      }

      const refreshedQuestions = await prisma.question.findMany({
        where: { id: { in: questionIds } },
        select: {
          id: true,
          correctAnswer: true,
          explanation: true,
        },
      });

      byId.clear();
      for (const question of refreshedQuestions) {
        byId.set(question.id, question);
      }
    }

    if (byId.size !== questionIds.length) {
      return jsonWithSecurityHeaders(
        { error: "One or more questions were not found." },
        404
      );
    }

    const results = sanitizedAnswers.map((answer) => {
      const question = byId.get(answer.questionId)!;
      const isCorrect = answer.selectedAnswer === question.correctAnswer;

      return {
        questionId: answer.questionId,
        selectedAnswer: answer.selectedAnswer,
        isCorrect,
        explanation: question.explanation,
        correctAnswer: question.correctAnswer,
      };
    });

    await prisma.$transaction(
      results.map((result) =>
        prisma.attempt.create({
          data: {
            userId: fallbackUser.id,
            questionId: result.questionId,
            selectedAnswer: result.selectedAnswer,
            isCorrect: result.isCorrect,
          },
        })
      )
    );

    const correctCount = results.filter((result) => result.isCorrect).length;

    return jsonWithSecurityHeaders({
      totalCount: results.length,
      correctCount,
      results,
    });
  } catch (err: any) {
    console.error("Attempt batch API error:", err);
    return jsonWithSecurityHeaders(
      { error: err?.message ?? "Batch attempt failed." },
      500
    );
  }
}
