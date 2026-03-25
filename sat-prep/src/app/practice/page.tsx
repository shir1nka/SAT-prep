"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Calculator,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock,
  Flag,
  PlayCircle,
  RotateCcw,
  Shield,
  Target,
  Trophy,
  XCircle,
} from "lucide-react";
import { useEffect, useEffectEvent, useMemo, useState } from "react";

import SiteHeader from "@/components/SiteHeader";
import Card from "@/components/ui/Card";
import { Button, LinkButton } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-context";
import {
  getPracticeQuestionCount,
  getSectionTimerSeconds,
  type PracticeMode,
  type SatSection,
} from "@/lib/sat";
import { cn } from "@/lib/utils";

type QuestionDto = {
  id: string;
  section: SatSection;
  questionText: string;
  options: string[];
  correctAnswer?: string;
  explanation?: string;
};

type QuestionsResponse = {
  questions: QuestionDto[];
  meta?: {
    section?: SatSection;
    totalAvailable?: number;
  };
};

type AttemptResponse = {
  isCorrect: boolean;
  explanation: string;
  correctAnswer?: string;
};

type StoredTrainingResult = AttemptResponse & {
  selectedAnswer: string;
};

type BatchAttemptResult = {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  explanation: string;
  correctAnswer: string;
};

type BatchAttemptResponse = {
  totalCount: number;
  correctCount: number;
  results: BatchAttemptResult[];
};

type PracticeStage = "setup" | "loading" | "session" | "result";

async function readErrorMessage(res: Response) {
  try {
    const data = (await res.json()) as { error?: string };
    if (typeof data?.error === "string" && data.error.trim()) {
      return data.error;
    }

    return `Request failed with status ${res.status}`;
  } catch {
    try {
      const text = await res.text();
      if (text.trim()) return text;
    } catch {
      // Ignore body parsing errors and fall back to status text.
    }

    return `Request failed with status ${res.status}`;
  }
}

function formatTimer(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatDurationLabel(totalSeconds: number, language: "ru" | "en") {
  const minutes = Math.round(totalSeconds / 60);

  return language === "ru" ? `${minutes} мин` : `${minutes} min`;
}

export default function PracticePage() {
  const router = useRouter();
  const { language } = useLanguage();

  const [stage, setStage] = useState<PracticeStage>("setup");
  const [error, setError] = useState<string | null>(null);

  const [selectedSection, setSelectedSection] =
    useState<SatSection>("reading-writing");
  const [selectedMode, setSelectedMode] = useState<PracticeMode>("training");

  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);

  const [answersByQuestion, setAnswersByQuestion] = useState<Record<string, string>>(
    {}
  );
  const [trainingResults, setTrainingResults] = useState<
    Record<string, StoredTrainingResult>
  >({});
  const [currentAttemptResult, setCurrentAttemptResult] =
    useState<AttemptResponse | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);

  const [timeLeft, setTimeLeft] = useState(0);
  const [testResult, setTestResult] = useState<BatchAttemptResponse | null>(null);
  const [isSubmittingTest, setIsSubmittingTest] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);

  const text =
    language === "ru"
      ? {
          setupEyebrow: "SAT practice",
          setupTitle: "Выбери секцию и формат",
          setupDescription:
            "Сначала выбираешь нужную часть SAT, а потом режим: спокойная тренировка с объяснениями или реалистичный timed test без подсказок до конца.",
          sectionTitle: "Секция SAT",
          modeTitle: "Формат прохождения",
          readingWriting: "Reading & Writing",
          readingWritingDescription:
            "Тексты, логика, грамматика и работа с аргументацией.",
          math: "Math",
          mathDescription:
            "Алгебра, уравнения, графики, проценты, геометрия и прикладные задачи.",
          training: "Тренировка",
          trainingDescription:
            "Без таймера. После ответа сразу видно правильный вариант и объяснение.",
          test: "Реальный тест",
          testDescription:
            "Таймер, полный набор вопросов по выбранной секции и никакой помощи до финиша.",
          quickFeedback: "Мгновенная обратная связь",
          fullSection: "Полная секция SAT",
          noTimer: "Без таймера",
          noHints: "Без подсказок во время теста",
          startTraining: "Начать тренировку",
          startTest: "Начать реальный тест",
          loading: "Собираем твою SAT-сессию...",
          checkingAnswer: "Проверяем ответ...",
          loadError:
            "Не удалось загрузить вопросы. Проверь вход в аккаунт и попробуй ещё раз.",
          connectionError: "Не удалось подключиться к банку вопросов.",
          emptyBank: "Для этой секции пока нет вопросов.",
          emptyBankHint:
            "Сначала синхронизируй банк вопросов в админке, а потом возвращайся сюда.",
          tryAgain: "Попробовать снова",
          changeSetup: "Изменить выбор",
          activeSession: "Текущая сессия",
          question: "Вопрос",
          progress: "Прогресс",
          answered: "Отвечено",
          timer: "Таймер",
          section: "Секция",
          mode: "Режим",
          answerSaved: "Ответ сохранён. Подсказок не будет до завершения теста.",
          chooseAnswer: "Выбери ответ",
          nextQuestion: "Следующий вопрос",
          previousQuestion: "Назад",
          finishTraining: "Завершить тренировку",
          submitTest: "Завершить тест",
          submitTestNow: "Сдать тест сейчас",
          autoSubmitted:
            "Время вышло, поэтому попытка была автоматически завершена.",
          perfect: "Верно!",
          notQuite: "Пока неверно",
          yourAnswer: "Твой ответ",
          correctAnswer: "Правильный ответ",
          explanation: "Объяснение",
          greatReasoning: "Почему это решение верное",
          trainingComplete: "Тренировка завершена",
          trainingCompleteDescription:
            "Можно сразу разобрать ошибки и перейти к новой подборке.",
          testComplete: "Реальный тест завершён",
          testCompleteDescription:
            "Теперь видно итог без подсказок по ходу и можно спокойно разобрать каждое задание.",
          accuracy: "Точность",
          correct: "Верных",
          total: "Всего",
          reviewedAnswers: "Разбор ответов",
          unanswered: "Без ответа",
          resultQuestion: "Задание",
          retrySession: "Запустить ещё раз",
          anotherMode: "Выбрать другой режим",
          history: "Статистика",
          home: "На главную",
          timedSectionLabel: "Полная секция с таймером",
          practiceSetLabel: "Подборка из 10 вопросов",
        }
      : {
          setupEyebrow: "SAT practice",
          setupTitle: "Choose a section and mode",
          setupDescription:
            "Pick the SAT section you want, then choose between guided training with explanations or a realistic timed test with no hints until the end.",
          sectionTitle: "SAT section",
          modeTitle: "Session mode",
          readingWriting: "Reading & Writing",
          readingWritingDescription:
            "Passages, grammar, rhetoric, and evidence-based reasoning.",
          math: "Math",
          mathDescription:
            "Algebra, equations, graphs, percentages, geometry, and applied problem solving.",
          training: "Training",
          trainingDescription:
            "No timer. After each answer you can immediately see the correct choice and explanation.",
          test: "Real test",
          testDescription:
            "Timed, full section length, and no hints or explanations until you finish.",
          quickFeedback: "Instant feedback",
          fullSection: "Full SAT section",
          noTimer: "No timer",
          noHints: "No hints during the test",
          startTraining: "Start training",
          startTest: "Start real test",
          loading: "Preparing your SAT session...",
          checkingAnswer: "Checking your answer...",
          loadError:
            "Failed to load questions. Please make sure you are signed in and try again.",
          connectionError: "Failed to connect to the question bank.",
          emptyBank: "There are no questions for this section yet.",
          emptyBankHint:
            "Sync the question bank from the admin area, then come back here.",
          tryAgain: "Try again",
          changeSetup: "Change setup",
          activeSession: "Active session",
          question: "Question",
          progress: "Progress",
          answered: "Answered",
          timer: "Timer",
          section: "Section",
          mode: "Mode",
          answerSaved: "Answer saved. No hints will appear until the test is over.",
          chooseAnswer: "Choose an answer",
          nextQuestion: "Next question",
          previousQuestion: "Previous",
          finishTraining: "Finish training",
          submitTest: "Finish test",
          submitTestNow: "Submit test now",
          autoSubmitted: "Time ran out, so the test was submitted automatically.",
          perfect: "Correct!",
          notQuite: "Not quite right",
          yourAnswer: "Your answer",
          correctAnswer: "Correct answer",
          explanation: "Explanation",
          greatReasoning: "Why this works",
          trainingComplete: "Training complete",
          trainingCompleteDescription:
            "You can review mistakes right away and jump into another set.",
          testComplete: "Real test complete",
          testCompleteDescription:
            "Now you can see the final result without having hints during the section.",
          accuracy: "Accuracy",
          correct: "Correct",
          total: "Total",
          reviewedAnswers: "Answer review",
          unanswered: "Unanswered",
          resultQuestion: "Question",
          retrySession: "Run it again",
          anotherMode: "Choose another mode",
          history: "Stats",
          home: "Home",
          timedSectionLabel: "Full timed section",
          practiceSetLabel: "Set of 10 questions",
        };

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const timerForSection = useMemo(
    () => getSectionTimerSeconds(selectedSection),
    [selectedSection]
  );

  const answeredCount = useMemo(() => {
    if (selectedMode === "training") {
      return Object.keys(trainingResults).length;
    }

    return Object.values(answersByQuestion).filter(Boolean).length;
  }, [answersByQuestion, selectedMode, trainingResults]);

  const trainingCorrectCount = useMemo(
    () => Object.values(trainingResults).filter((result) => result.isCorrect).length,
    [trainingResults]
  );

  const progressPercentage = totalQuestions
    ? Math.round(((currentIndex + 1) / totalQuestions) * 100)
    : 0;

  const displayedSelectedAnswer = currentQuestion
    ? answersByQuestion[currentQuestion.id] ?? null
    : null;

  const sectionLabel =
    selectedSection === "math" ? text.math : text.readingWriting;
  const modeLabel =
    selectedMode === "training" ? text.training : text.test;

  const reviewItems = useMemo(() => {
    if (!questions.length) return [];

    if (selectedMode === "training") {
      return questions
        .map((question, index) => {
          const result = trainingResults[question.id];
          if (!result) return null;

          return {
            id: question.id,
            index,
            questionText: question.questionText,
            selectedAnswer: result.selectedAnswer,
            correctAnswer: result.correctAnswer ?? "",
            explanation: result.explanation,
            isCorrect: result.isCorrect,
          };
        })
        .filter(Boolean) as Array<{
        id: string;
        index: number;
        questionText: string;
        selectedAnswer: string;
        correctAnswer: string;
        explanation: string;
        isCorrect: boolean;
      }>;
    }

    const testResultsById = new Map(
      (testResult?.results ?? []).map((result) => [result.questionId, result])
    );

    return questions.map((question, index) => {
      const result = testResultsById.get(question.id);

      return {
        id: question.id,
        index,
        questionText: question.questionText,
        selectedAnswer:
          result?.selectedAnswer || answersByQuestion[question.id] || "",
        correctAnswer: result?.correctAnswer ?? "",
        explanation: result?.explanation ?? "",
        isCorrect: result?.isCorrect ?? false,
      };
    });
  }, [answersByQuestion, questions, selectedMode, testResult, trainingResults]);

  const finalCorrectCount =
    selectedMode === "training"
      ? trainingCorrectCount
      : (testResult?.correctCount ?? 0);

  const finalAccuracy = totalQuestions
    ? Math.round((finalCorrectCount / totalQuestions) * 100)
    : 0;

  async function beginSession() {
    setStage("loading");
    setError(null);
    setQuestions([]);
    setCurrentIndex(0);
    setAvailableCount(0);
    setAnswersByQuestion({});
    setTrainingResults({});
    setCurrentAttemptResult(null);
    setSubmitted(false);
    setIsSubmittingAnswer(false);
    setTestResult(null);
    setIsSubmittingTest(false);
    setTimeExpired(false);
    setTimeLeft(selectedMode === "test" ? timerForSection : 0);

    try {
      const count = getPracticeQuestionCount(selectedMode);
      const res = await fetch(
        `/api/questions?section=${selectedSection}&count=${count}&mode=${selectedMode}`
      );

      if (res.status === 401) {
        router.push("/login?callbackUrl=/practice");
        return;
      }

      if (!res.ok) {
        setError(text.loadError);
        setStage("setup");
        return;
      }

      const data = (await res.json()) as QuestionsResponse;

      if (!data.questions.length) {
        setError(`${text.emptyBank} ${text.emptyBankHint}`);
        setStage("setup");
        return;
      }

      setQuestions(data.questions);
      setAvailableCount(data.meta?.totalAvailable ?? data.questions.length);
      setStage("session");
    } catch {
      setError(text.connectionError);
      setStage("setup");
    }
  }

  async function persistTrainingAttempt(questionId: string, selectedAnswer: string) {
    try {
      const res = await fetch("/api/attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId,
          selectedAnswer,
        }),
      });

      if (res.status === 401) {
        router.push("/login?callbackUrl=/practice");
        return;
      }

      if (!res.ok) {
        console.error("Failed to persist training attempt:", await readErrorMessage(res));
      }
    } catch (err) {
      console.error("Persist training attempt error:", err);
    }
  }

  async function submitTrainingAnswer(option: string) {
    if (!currentQuestion || submitted || isSubmittingAnswer) return;

    setAnswersByQuestion((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
    setSubmitted(true);
    setCurrentAttemptResult(null);
    setIsSubmittingAnswer(true);
    setError(null);

    try {
      if (
        currentQuestion.correctAnswer !== undefined &&
        currentQuestion.explanation !== undefined
      ) {
        const data: AttemptResponse = {
          isCorrect: option === currentQuestion.correctAnswer,
          explanation: currentQuestion.explanation,
          correctAnswer:
            option === currentQuestion.correctAnswer
              ? undefined
              : currentQuestion.correctAnswer,
        };

        setCurrentAttemptResult(data);
        setTrainingResults((prev) => ({
          ...prev,
          [currentQuestion.id]: {
            ...data,
            selectedAnswer: option,
          },
        }));
        void persistTrainingAttempt(currentQuestion.id, option);
        return;
      }

      const res = await fetch("/api/attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          selectedAnswer: option,
        }),
      });

      if (res.status === 401) {
        router.push("/login?callbackUrl=/practice");
        return;
      }

      if (!res.ok) {
        const errorMessage = await readErrorMessage(res);
        setError(errorMessage);
        setSubmitted(false);
        return;
      }

      const data = (await res.json()) as AttemptResponse;
      setCurrentAttemptResult(data);
      setTrainingResults((prev) => ({
        ...prev,
        [currentQuestion.id]: {
          ...data,
          selectedAnswer: option,
        },
      }));
    } catch (err: any) {
      setError(err?.message || text.connectionError);
      setSubmitted(false);
    } finally {
      setIsSubmittingAnswer(false);
    }
  }

  async function submitTest(forceByTimer = false) {
    if (!questions.length || isSubmittingTest || testResult) return;

    setIsSubmittingTest(true);
    setError(null);

    try {
      const res = await fetch("/api/attempt/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: questions.map((question) => ({
            questionId: question.id,
            selectedAnswer: answersByQuestion[question.id] ?? "",
          })),
        }),
      });

      if (res.status === 401) {
        router.push("/login?callbackUrl=/practice");
        return;
      }

      if (!res.ok) {
        setError(await readErrorMessage(res));
        return;
      }

      const data = (await res.json()) as BatchAttemptResponse;
      setTestResult(data);
      setTimeExpired(forceByTimer);
      setStage("result");
    } catch (err: any) {
      setError(err?.message || text.connectionError);
    } finally {
      setIsSubmittingTest(false);
    }
  }

  const handleTimeExpired = useEffectEvent(() => {
    void submitTest(true);
  });

  useEffect(() => {
    if (stage !== "session" || selectedMode !== "test" || testResult) return;

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          handleTimeExpired();
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [selectedMode, stage, testResult]);

  function goNext() {
    if (selectedMode === "training") {
      if (!submitted || !currentQuestion) return;

      if (currentIndex >= totalQuestions - 1) {
        setStage("result");
        return;
      }

      setCurrentIndex((index) => index + 1);
      setCurrentAttemptResult(null);
      setSubmitted(false);
      return;
    }

    if (currentIndex >= totalQuestions - 1) return;
    setCurrentIndex((index) => index + 1);
  }

  function goPrevious() {
    if (selectedMode !== "test" || currentIndex === 0) return;
    setCurrentIndex((index) => index - 1);
  }

  function pickTestAnswer(option: string) {
    if (!currentQuestion || isSubmittingTest || testResult) return;

    setAnswersByQuestion((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  }

  function jumpToQuestion(index: number) {
    if (selectedMode !== "test") return;
    setCurrentIndex(index);
  }

  function resetToSetup() {
    setStage("setup");
    setError(null);
    setQuestions([]);
    setCurrentIndex(0);
    setAvailableCount(0);
    setAnswersByQuestion({});
    setTrainingResults({});
    setCurrentAttemptResult(null);
    setSubmitted(false);
    setTestResult(null);
    setTimeExpired(false);
    setTimeLeft(0);
  }

  if (stage === "loading") {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            <p className="text-zinc-500 font-medium">{text.loading}</p>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "setup") {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col selection:bg-primary-500/20">
        <SiteHeader />
        <main className="flex-1 py-10 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute inset-0 subtle-grid opacity-[0.3] pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary-600 mb-4">
                {text.setupEyebrow}
              </p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 mb-4">
                {text.setupTitle}
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                {text.setupDescription}
              </p>
            </div>

            {error ? (
              <Card className="max-w-3xl mx-auto mb-8 p-5 border border-red-200 bg-red-50/80 text-red-800 dark:bg-red-950/30 dark:border-red-900/70 dark:text-red-200">
                <div className="flex items-start gap-3">
                  <CircleHelp className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">{text.tryAgain}</p>
                    <p className="text-sm leading-relaxed">{error}</p>
                  </div>
                </div>
              </Card>
            ) : null}

            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              <Card className="p-6 md:p-8 glass-card shadow-xl shadow-primary-500/10">
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">{text.sectionTitle}</h2>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {selectedMode === "training"
                      ? text.practiceSetLabel
                      : text.timedSectionLabel}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <ChoiceCard
                    selected={selectedSection === "reading-writing"}
                    icon={<BookOpen className="w-6 h-6" />}
                    title={text.readingWriting}
                    description={text.readingWritingDescription}
                    badges={[
                      {
                        icon: <Brain className="w-3.5 h-3.5" />,
                        label: text.quickFeedback,
                      },
                    ]}
                    onClick={() => setSelectedSection("reading-writing")}
                  />
                  <ChoiceCard
                    selected={selectedSection === "math"}
                    icon={<Calculator className="w-6 h-6" />}
                    title={text.math}
                    description={text.mathDescription}
                    badges={[
                      {
                        icon: <Target className="w-3.5 h-3.5" />,
                        label: text.fullSection,
                      },
                    ]}
                    onClick={() => setSelectedSection("math")}
                  />
                </div>
              </Card>

              <Card className="p-6 md:p-8 glass-card shadow-xl shadow-primary-500/10">
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">{text.modeTitle}</h2>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {sectionLabel} • {formatDurationLabel(timerForSection, language)}
                  </p>
                </div>

                <div className="grid gap-4">
                  <ChoiceCard
                    selected={selectedMode === "training"}
                    icon={<PlayCircle className="w-6 h-6" />}
                    title={text.training}
                    description={text.trainingDescription}
                    badges={[
                      {
                        icon: <CheckCircle2 className="w-3.5 h-3.5" />,
                        label: text.quickFeedback,
                      },
                      {
                        icon: <Clock className="w-3.5 h-3.5" />,
                        label: text.noTimer,
                      },
                    ]}
                    onClick={() => setSelectedMode("training")}
                  />
                  <ChoiceCard
                    selected={selectedMode === "test"}
                    icon={<Shield className="w-6 h-6" />}
                    title={text.test}
                    description={text.testDescription}
                    badges={[
                      {
                        icon: <Clock className="w-3.5 h-3.5" />,
                        label: formatDurationLabel(timerForSection, language),
                      },
                      {
                        icon: <Flag className="w-3.5 h-3.5" />,
                        label: text.noHints,
                      },
                    ]}
                    onClick={() => setSelectedMode("test")}
                  />
                </div>

                <div className="mt-8 space-y-3">
                  <Button onClick={beginSession} size="lg" className="w-full">
                    {selectedMode === "training"
                      ? text.startTraining
                      : text.startTest}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <LinkButton href="/" variant="outline" className="w-full">
                    {text.home}
                  </LinkButton>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (stage === "result") {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col">
        <SiteHeader />
        <main className="flex-1 py-12 px-4 relative overflow-hidden">
          <div className="absolute inset-0 subtle-grid opacity-[0.4] pointer-events-none" />

          <div className="max-w-5xl mx-auto relative z-10 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
            >
              <Card className="p-8 md:p-12 text-center glass-card shadow-2xl shadow-primary-500/10">
                <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3">
                  <Trophy className="w-10 h-10" />
                </div>

                <h1 className="text-4xl font-bold mb-2 tracking-tight">
                  {selectedMode === "training"
                    ? text.trainingComplete
                    : text.testComplete}
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-4">
                  {selectedMode === "training"
                    ? text.trainingCompleteDescription
                    : text.testCompleteDescription}
                </p>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary-600 mb-8">
                  {sectionLabel} • {modeLabel}
                </p>

                {timeExpired ? (
                  <div className="max-w-2xl mx-auto mb-8 rounded-2xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                    {text.autoSubmitted}
                  </div>
                ) : null}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                  <StatBox
                    icon={<Target className="w-4 h-4 text-primary-600" />}
                    label={text.accuracy}
                    value={`${finalAccuracy}%`}
                  />
                  <StatBox
                    icon={<CheckCircle2 className="w-4 h-4 text-green-600" />}
                    label={text.correct}
                    value={finalCorrectCount}
                  />
                  <StatBox
                    icon={<Clock className="w-4 h-4 text-indigo-600" />}
                    label={text.total}
                    value={totalQuestions}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={beginSession} size="lg" className="px-10">
                    <RotateCcw className="mr-2 w-5 h-5" />
                    {text.retrySession}
                  </Button>
                  <Button
                    onClick={resetToSetup}
                    variant="outline"
                    size="lg"
                    className="px-10"
                  >
                    <ArrowLeft className="mr-2 w-5 h-5" />
                    {text.anotherMode}
                  </Button>
                  <LinkButton href="/stats" variant="outline" size="lg" className="px-10">
                    <BarChart3 className="mr-2 w-5 h-5" />
                    {text.history}
                  </LinkButton>
                </div>
              </Card>
            </motion.div>

            <Card className="p-6 md:p-8 glass-card">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{text.reviewedAnswers}</h2>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {answeredCount}/{totalQuestions} {text.answered.toLowerCase()}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {reviewItems.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "rounded-3xl border p-5 md:p-6",
                      item.isCorrect
                        ? "border-green-200 bg-green-50/60 dark:border-green-900/60 dark:bg-green-950/10"
                        : "border-red-200 bg-red-50/60 dark:border-red-900/60 dark:bg-red-950/10"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500 mb-2">
                          {text.resultQuestion} {item.index + 1}
                        </p>
                        <h3 className="text-lg font-semibold leading-relaxed text-zinc-900 dark:text-zinc-100">
                          {item.questionText}
                        </h3>
                      </div>
                      <div
                        className={cn(
                          "shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]",
                          item.isCorrect
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                        )}
                      >
                        {item.isCorrect ? text.perfect : text.notQuite}
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <ResultPanel
                        title={text.yourAnswer}
                        value={item.selectedAnswer || text.unanswered}
                        tone={item.isCorrect ? "neutral" : "danger"}
                      />
                      <ResultPanel
                        title={text.correctAnswer}
                        value={item.correctAnswer}
                        tone="success"
                      />
                    </div>

                    <div className="mt-4 rounded-2xl border border-primary-200 bg-white/90 p-4 dark:border-primary-900/60 dark:bg-zinc-900/70">
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary-600 mb-2">
                        {item.isCorrect ? text.greatReasoning : text.explanation}
                      </p>
                      <p className="text-sm md:text-base leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
                        {item.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col selection:bg-primary-500/20">
      <SiteHeader />

      <main className="flex-1 py-8 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 subtle-grid opacity-[0.3] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col xl:flex-row gap-6 xl:items-center xl:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-2xl flex items-center justify-center">
                  {selectedSection === "math" ? (
                    <Calculator className="w-6 h-6" />
                  ) : (
                    <BookOpen className="w-6 h-6" />
                  )}
                </div>
                {text.activeSession}
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                {sectionLabel} • {modeLabel}
                {selectedMode === "test"
                  ? ` • ${formatDurationLabel(timerForSection, language)}`
                  : ` • ${text.practiceSetLabel}`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <InfoChip label={text.section} value={sectionLabel} />
              <InfoChip label={text.mode} value={modeLabel} />
              <InfoChip
                label={text.answered}
                value={`${answeredCount}/${totalQuestions}`}
              />
              {selectedMode === "test" ? (
                <InfoChip label={text.timer} value={formatTimer(timeLeft)} tone="alert" />
              ) : null}
              <Button onClick={resetToSetup} variant="outline">
                {text.changeSetup}
              </Button>
            </div>
          </div>

          {error ? (
            <Card className="mb-6 p-4 border border-red-200 bg-red-50/90 text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200">
              <div className="flex items-start gap-3">
                <CircleHelp className="w-5 h-5 mt-0.5 shrink-0" />
                <p className="text-sm md:text-base leading-relaxed">{error}</p>
              </div>
            </Card>
          ) : null}

          <div className="mb-8 group">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                {text.progress}
              </span>
              <span className="text-xs font-bold text-primary-600">
                {progressPercentage}%
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-zinc-100 dark:bg-zinc-900 p-0.5 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                className="h-full bg-gradient-to-r from-primary-600 to-indigo-500 rounded-full shadow-lg shadow-primary-500/20"
              />
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion?.id || "empty"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="p-8 md:p-10 glass-card shadow-xl shadow-zinc-200/50 dark:shadow-none border-t-4 border-t-primary-600">
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
                      {text.question} {currentIndex + 1} / {totalQuestions}
                    </div>
                    {selectedMode === "test" ? (
                      <div className="rounded-full bg-primary-50 px-4 py-2 text-sm font-bold text-primary-700 dark:bg-primary-900/20 dark:text-primary-300">
                        {formatTimer(timeLeft)}
                      </div>
                    ) : null}
                  </div>

                  <div className="text-xl md:text-2xl font-medium leading-relaxed mb-10 text-zinc-800 dark:text-zinc-100 italic">
                    "{currentQuestion?.questionText}"
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {currentQuestion?.options.map((option, idx) => {
                      const letter = String.fromCharCode("A".charCodeAt(0) + idx);
                      const isSelected = displayedSelectedAnswer === option;
                      const isDisabled =
                        selectedMode === "training" ? submitted || isSubmittingAnswer : false;
                      const currentResult = currentAttemptResult;
                      const showCorrect =
                        selectedMode === "training" &&
                        submitted &&
                        currentResult?.correctAnswer === option;
                      const showIncorrect =
                        selectedMode === "training" &&
                        submitted &&
                        isSelected &&
                        !currentResult?.isCorrect;

                      return (
                        <motion.button
                          key={option}
                          whileHover={!isDisabled ? { x: 5 } : {}}
                          whileTap={!isDisabled ? { scale: 0.98 } : {}}
                          onClick={() =>
                            selectedMode === "training"
                              ? submitTrainingAnswer(option)
                              : pickTestAnswer(option)
                          }
                          disabled={isDisabled}
                          className={cn(
                            "group text-left rounded-2xl border-2 px-6 py-4 transition-all flex items-center gap-4 relative overflow-hidden",
                            isDisabled
                              ? "cursor-not-allowed"
                              : "hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/10",
                            isSelected
                              ? "border-primary-600 bg-primary-50 dark:bg-primary-900/20 shadow-lg shadow-primary-500/10 ring-2 ring-primary-600/20"
                              : "border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30",
                            showCorrect &&
                              "border-green-500 bg-green-50 dark:bg-green-950/20 ring-green-500/20",
                            showIncorrect &&
                              "border-red-400 bg-red-50 dark:bg-red-950/20 ring-red-500/20"
                          )}
                        >
                          <div
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors",
                              isSelected
                                ? "bg-primary-600 text-white"
                                : "bg-white dark:bg-zinc-800 text-zinc-500 group-hover:bg-primary-100 group-hover:text-primary-700",
                              showCorrect && "bg-green-600 text-white",
                              showIncorrect && "bg-red-600 text-white"
                            )}
                          >
                            {letter}
                          </div>
                          <span
                            className={cn(
                              "flex-1 text-lg font-medium",
                              isSelected
                                ? "text-primary-900 dark:text-primary-100"
                                : "text-zinc-700 dark:text-zinc-300",
                              showCorrect && "text-green-900 dark:text-green-100",
                              showIncorrect && "text-red-900 dark:text-red-100"
                            )}
                          >
                            {option}
                          </span>
                          {selectedMode === "test" && isSelected ? (
                            <div className="w-2.5 h-2.5 rounded-full bg-primary-600 animate-pulse" />
                          ) : null}
                          {showCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : null}
                          {showIncorrect ? (
                            <XCircle className="w-5 h-5 text-red-600" />
                          ) : null}
                        </motion.button>
                      );
                    })}
                  </div>

                  {selectedMode === "training" ? (
                    <AnimatePresence>
                      {submitted && isSubmittingAnswer && !currentAttemptResult ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-10 pt-10 border-t border-zinc-100 dark:border-zinc-800"
                        >
                          <div className="rounded-2xl border border-primary-200 bg-primary-50/80 px-5 py-4 text-sm font-medium text-primary-800 dark:border-primary-900/60 dark:bg-primary-950/20 dark:text-primary-200">
                            {text.checkingAnswer}
                          </div>
                        </motion.div>
                      ) : null}

                      {currentAttemptResult ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-10 pt-10 border-t border-zinc-100 dark:border-zinc-800"
                        >
                          <div
                            className={cn(
                              "rounded-2xl p-6 flex flex-col gap-4",
                              currentAttemptResult.isCorrect
                                ? "bg-green-50/80 dark:bg-green-900/10 border border-green-100 dark:border-green-800/50"
                                : "bg-red-50/80 dark:bg-red-900/10 border border-red-100 dark:border-red-800/50"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              {currentAttemptResult.isCorrect ? (
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                              ) : (
                                <XCircle className="w-6 h-6 text-red-600" />
                              )}
                              <span
                                className={cn(
                                  "text-lg font-bold uppercase tracking-wider",
                                  currentAttemptResult.isCorrect
                                    ? "text-green-700"
                                    : "text-red-700"
                                )}
                              >
                                {currentAttemptResult.isCorrect
                                  ? text.perfect
                                  : text.notQuite}
                              </span>
                            </div>

                            {!currentAttemptResult.isCorrect ? (
                              <ResultPanel
                                title={text.yourAnswer}
                                value={displayedSelectedAnswer || text.unanswered}
                                tone="danger"
                              />
                            ) : null}

                            {currentAttemptResult.correctAnswer ? (
                              <ResultPanel
                                title={text.correctAnswer}
                                value={currentAttemptResult.correctAnswer}
                                tone="success"
                              />
                            ) : null}

                            <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border-l-4 border-primary-500">
                              <p className="text-xs font-bold text-primary-700 dark:text-primary-300 uppercase tracking-widest mb-2">
                                {currentAttemptResult.isCorrect
                                  ? text.greatReasoning
                                  : text.explanation}
                              </p>
                              <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed text-sm md:text-base whitespace-pre-line">
                                {currentAttemptResult.explanation}
                              </p>
                            </div>

                            <div className="pt-2 flex justify-end">
                              <Button
                                onClick={goNext}
                                className="group px-8 hover:px-10 transition-all shadow-xl shadow-primary-500/20"
                              >
                                {currentIndex >= totalQuestions - 1
                                  ? text.finishTraining
                                  : text.nextQuestion}
                                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  ) : (
                    <div className="mt-10 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                      <div className="rounded-2xl border border-primary-200 bg-primary-50/70 px-4 py-3 text-sm text-primary-800 dark:border-primary-900/50 dark:bg-primary-950/20 dark:text-primary-200">
                        {displayedSelectedAnswer ? text.answerSaved : text.chooseAnswer}
                      </div>

                      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-between">
                        <Button
                          variant="outline"
                          onClick={goPrevious}
                          disabled={currentIndex === 0 || isSubmittingTest}
                        >
                          <ArrowLeft className="mr-2 w-4 h-4" />
                          {text.previousQuestion}
                        </Button>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            variant="outline"
                            onClick={() => void submitTest(false)}
                            disabled={isSubmittingTest}
                          >
                            <Flag className="mr-2 w-4 h-4" />
                            {text.submitTestNow}
                          </Button>
                          <Button
                            onClick={
                              currentIndex >= totalQuestions - 1
                                ? () => void submitTest(false)
                                : goNext
                            }
                            disabled={isSubmittingTest}
                          >
                            {currentIndex >= totalQuestions - 1
                              ? text.submitTest
                              : text.nextQuestion}
                            <ChevronRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            </AnimatePresence>

            <Card className="p-5 glass-card h-fit">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center dark:bg-primary-900/30 dark:text-primary-300">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">{sectionLabel}</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {selectedMode === "training"
                      ? text.trainingDescription
                      : text.testDescription}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <MiniStat
                  label={text.total}
                  value={totalQuestions}
                  icon={<Target className="w-4 h-4" />}
                />
                <MiniStat
                  label={text.answered}
                  value={answeredCount}
                  icon={<CheckCircle2 className="w-4 h-4" />}
                />
                <MiniStat
                  label={text.mode}
                  value={selectedMode === "training" ? "10" : "Full"}
                  icon={<Shield className="w-4 h-4" />}
                />
                <MiniStat
                  label={text.timer}
                  value={
                    selectedMode === "training"
                      ? text.noTimer
                      : formatTimer(timeLeft)
                  }
                  icon={<Clock className="w-4 h-4" />}
                />
              </div>

              {selectedMode === "test" ? (
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                    {text.progress}
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {questions.map((question, index) => {
                      const answered = Boolean(answersByQuestion[question.id]);
                      const current = index === currentIndex;

                      return (
                        <button
                          key={question.id}
                          onClick={() => jumpToQuestion(index)}
                          className={cn(
                            "h-10 rounded-xl border text-sm font-bold transition-all",
                            current
                              ? "border-primary-500 bg-primary-600 text-white shadow-lg shadow-primary-500/30"
                              : answered
                                ? "border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-900/60 dark:bg-primary-950/20 dark:text-primary-300"
                                : "border-zinc-200 bg-white text-zinc-600 hover:border-primary-300 hover:bg-primary-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                          )}
                        >
                          {index + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-primary-200 bg-primary-50/70 p-4 text-sm text-primary-800 dark:border-primary-900/50 dark:bg-primary-950/20 dark:text-primary-200">
                  {text.trainingDescription}
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function ChoiceCard({
  selected,
  icon,
  title,
  description,
  badges,
  onClick,
}: {
  selected: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
  badges: Array<{ icon: React.ReactNode; label: string }>;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-left rounded-3xl border p-5 transition-all hover:-translate-y-1 hover:shadow-xl",
        selected
          ? "border-primary-500 bg-primary-50/80 shadow-xl shadow-primary-500/15 dark:border-primary-700 dark:bg-primary-950/30"
          : "border-zinc-200 bg-white hover:border-primary-300 dark:border-zinc-800 dark:bg-zinc-900/60"
      )}
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center",
            selected
              ? "bg-primary-600 text-white"
              : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
          )}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span
            key={badge.label}
            className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
          >
            {badge.icon}
            {badge.label}
          </span>
        ))}
      </div>
    </button>
  );
}

function InfoChip({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "alert";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-2",
        tone === "alert"
          ? "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200"
          : "border-zinc-200 bg-zinc-50 text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
      )}
    >
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">
        {label}
      </div>
      <div className="text-sm font-bold">{value}</div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
          {label}
        </span>
        <span className="text-primary-600 dark:text-primary-300">{icon}</span>
      </div>
      <div className="text-xl font-black text-zinc-900 dark:text-zinc-50">
        {value}
      </div>
    </div>
  );
}

function ResultPanel({
  title,
  value,
  tone,
}: {
  title: string;
  value: string;
  tone: "neutral" | "success" | "danger";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-4 border",
        tone === "success" &&
          "border-green-200 bg-green-50 dark:border-green-900/60 dark:bg-green-950/20",
        tone === "danger" &&
          "border-red-200 bg-red-50 dark:border-red-900/60 dark:bg-red-950/20",
        tone === "neutral" &&
          "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
      )}
    >
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500 mb-2">
        {title}
      </p>
      <p className="font-medium text-zinc-800 dark:text-zinc-100">{value}</p>
    </div>
  );
}

function StatBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex flex-col items-center gap-2 group hover:scale-105 transition-transform">
      <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center mb-1">
        {icon}
      </div>
      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
        {label}
      </div>
      <div className="text-3xl font-black text-zinc-900 dark:text-zinc-100">
        {value}
      </div>
    </div>
  );
}
