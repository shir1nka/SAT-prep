import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import prisma from "@/lib/prisma";
import {
  ensureOfficialHardQuestionBank,
  getOfficialQuestionFigure,
  getOfficialHardQuestionTextSet,
} from "@/lib/official-hard-questions";
import {
  inferQuestionSection,
  normalizeSatSection,
  normalizePracticeDifficulty,
  parseQuestionOptions,
  scoreSatQuestionDifficulty,
} from "@/lib/sat";
import { enforceRateLimit, jsonWithSecurityHeaders } from "@/lib/security";

type QuestionDto = {
  id: string;
  section: "reading-writing" | "math";
  questionText: string;
  options: string[];
  correctAnswer?: string;
  explanation?: string;
  figure?: unknown;
};

type RankedQuestion = {
  id: string;
  section: "reading-writing" | "math";
  questionText: string;
  options: string;
  correctAnswer: string | null;
  explanation: string | null;
  difficulty: "easy" | "medium" | "hard";
  score: number;
  percentile: number;
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
  const requestedDifficulty = normalizePracticeDifficulty(
    url.searchParams.get("difficulty")
  );
  const requestedSection = normalizeSatSection(url.searchParams.get("section"));
  const requestAll = countRaw === "all";
  const requested = countRaw ? Number(countRaw) : 10;
  const count = requestAll
    ? Number.POSITIVE_INFINITY
    : Number.isFinite(requested)
      ? Math.max(1, Math.min(200, Math.floor(requested)))
      : 10;

  if (requestedDifficulty === "hard") {
    await ensureOfficialHardQuestionBank();
  }

  const allQuestions = await prisma.question.findMany({
    select: {
      id: true,
      section: true,
      questionText: true,
      options: true,
      correctAnswer: true,
      explanation: true,
    },
  });

  const sectionQuestions = allQuestions.filter((question) => {
    const section = normalizeSatSection(
      question.section ?? inferQuestionSection(question.questionText)
    );

    return section === requestedSection;
  });

  const officialHardTextSet = getOfficialHardQuestionTextSet();
  const rankedQuestions = rankQuestionsByDifficulty(
    sectionQuestions,
    officialHardTextSet
  );
  const filteredQuestions = rankedQuestions.filter(
    (question) => question.difficulty === requestedDifficulty
  );
  const strictHardQuestions =
    requestedDifficulty === "hard" && mode === "test"
      ? filteredQuestions.filter(
          (question) =>
            officialHardTextSet.has(question.questionText) ||
            question.percentile >= 0.85
        )
      : filteredQuestions;
  const effectiveQuestions =
    strictHardQuestions.length > 0 ? strictHardQuestions : filteredQuestions;

  const picked =
    requestedDifficulty === "hard"
      ? [
          ...shuffle(
            effectiveQuestions.filter((question) =>
              officialHardTextSet.has(question.questionText)
            )
          ),
          ...shuffle(
            effectiveQuestions.filter(
              (question) => !officialHardTextSet.has(question.questionText)
            )
          ),
        ].slice(0, count)
      : shuffle(effectiveQuestions).slice(0, count);

  const questions: QuestionDto[] = picked.map((q) => {
    const safeOptions = parseQuestionOptions(q.options);

    return {
      id: q.id,
      section: q.section,
      questionText: q.questionText,
      options: safeOptions,
      correctAnswer: q.correctAnswer ?? undefined,
      explanation: q.explanation ?? undefined,
      figure: getOfficialQuestionFigure(q.questionText),
    };
  });

  return jsonWithSecurityHeaders({
    questions,
    meta: {
      section: requestedSection,
      totalAvailable: effectiveQuestions.length,
      difficulty: requestedDifficulty,
    },
  });
}

function rankQuestionsByDifficulty(
  questions: Array<{
    id: string;
    section: string | null;
    questionText: string;
    options: string;
    correctAnswer: string | null;
    explanation: string | null;
  }>,
  officialHardTextSet: Set<string>
) {
  const ranked = questions
    .map((question) => {
      const section = normalizeSatSection(
        question.section ?? inferQuestionSection(question.questionText)
      );
      const options = parseQuestionOptions(question.options);
      const score = scoreSatQuestionDifficulty({
        section,
        questionText: question.questionText,
        options,
        explanation: question.explanation,
      });

      return {
        ...question,
        section,
        score,
      };
    })
    .sort((left, right) => left.score - right.score);

  const total = ranked.length;

  return ranked.map((question, index) => {
    const percentile = total <= 1 ? 0.5 : index / (total - 1);
    let difficulty: RankedQuestion["difficulty"] = "medium";

    if (percentile < 0.34) {
      difficulty = "easy";
    } else if (percentile > 0.66) {
      difficulty = "hard";
    }

    return {
      ...question,
      difficulty: officialHardTextSet.has(question.questionText)
        ? "hard"
        : difficulty,
      percentile,
    };
  });
}
