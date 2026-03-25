"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  BarChart3, 
  ChevronRight,
  Trophy,
  Target,
  Clock
} from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import Card from "@/components/ui/Card";
import { Button, LinkButton } from "@/components/ui/Button";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

type QuestionDto = {
  id: string;
  questionText: string;
  options: string[];
};

type AttemptResponse = {
  isCorrect: boolean;
  explanation: string;
  correctAnswer?: string;
};

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

export default function PracticePage() {
  const router = useRouter();
  const { language } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [attemptResult, setAttemptResult] =
    useState<AttemptResponse | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [correctCount, setCorrectCount] = useState(0);

  const text =
    language === "ru"
      ? {
          loadError: "Не удалось загрузить вопросы. Убедись, что ты вошёл в аккаунт.",
          connectionError: "Не удалось подключиться к сервису вопросов.",
          submitPrefix: "Не удалось отправить ответ:",
          fallbackSubmit: "Ошибка сервера",
          submitCatch: "Не удалось отправить ответ. Попробуйте ещё раз.",
          loading: "Готовим твою сессию...",
          somethingWrong: "Что-то пошло не так",
          noQuestions: "Вопросов пока нет",
          emptyBank:
            "Банк вопросов пока пуст. Сначала синхронизируй задания, чтобы начать практику.",
          tryAgain: "Попробовать снова",
          checkAgain: "Проверить снова",
          home: "На главную",
          complete: "Сессия завершена!",
          completeDesc: "Отличная работа! Ты завершил(а) тренировочную сессию SAT.",
          accuracy: "Точность ответов",
          correct: "Верных",
          total: "Всего",
          anotherSet: "Новая подборка",
          history: "Посмотреть историю",
          active: "Текущая сессия",
          question: "Вопрос",
          progress: "Прогресс",
          perfect: "Отлично!",
          notQuite: "Пока не так",
          yourAnswer: "Твой ответ",
          correctAnswer: "Правильный ответ",
          greatReasoning: "Отличный ход мысли!",
          explanation: "Объяснение",
          viewResults: "Посмотреть результат",
          nextQuestion: "Следующий вопрос",
        }
      : {
          loadError: "Failed to load questions. Please ensure you are logged in.",
          connectionError: "Failed to load questions connection error.",
          submitPrefix: "Failed to submit answer:",
          fallbackSubmit: "Server error",
          submitCatch: "Failed to submit answer. Please try again.",
          loading: "Preparing your session...",
          somethingWrong: "Oops! Something went wrong",
          noQuestions: "No questions available",
          emptyBank:
            "Your question bank is currently empty. Please sync the questions to start practicing.",
          tryAgain: "Try Again",
          checkAgain: "Check Again",
          home: "Go to Home",
          complete: "Session Complete!",
          completeDesc: "Great job! You've completed your SAT practice module.",
          accuracy: "Accuracy",
          correct: "Correct",
          total: "Total",
          anotherSet: "Try Another Set",
          history: "View History",
          active: "Active Session",
          question: "Question",
          progress: "Progress",
          perfect: "Perfect!",
          notQuite: "Not quite right",
          yourAnswer: "Your answer",
          correctAnswer: "Correct answer",
          greatReasoning: "Great reasoning!",
          explanation: "Here's the explanation",
          viewResults: "View Results",
          nextQuestion: "Next Question",
        };

  const currentQuestion = questions[currentIndex];
  const totalQuestions = useMemo(() => questions.length, [questions.length]);

  async function loadQuestions() {
    setLoading(true);
    setError(null);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAttemptResult(null);
    setSubmitted(false);
    setCorrectCount(0);

    try {
      const res = await fetch("/api/questions?count=10");

      if (res.status === 401) {
        router.push("/login?callbackUrl=/practice");
        return;
      }

      if (!res.ok) {
        setError(text.loadError);
        return;
      }

      const data = (await res.json()) as { questions: QuestionDto[] };
      setQuestions(data.questions);
    } catch {
      setError(text.connectionError);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  async function submitAnswer(option: string) {
    if (!currentQuestion || submitted) return;

    setSelectedAnswer(option);
    setSubmitted(true);
    setAttemptResult(null);

    try {
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
        console.error("API Error:", { status: res.status, message: errorMessage });
        setError(`${text.submitPrefix} ${errorMessage}`);
        setSubmitted(false);
        return;
      }

      const data = (await res.json()) as AttemptResponse;
      setAttemptResult(data);

      if (data.isCorrect) setCorrectCount((c) => c + 1);
    } catch (err: any) {
      console.error("Submit answer error:", err);
      setError(`Error: ${err?.message || text.submitCatch}`);
      setSubmitted(false);
    }
  }

  function goNext() {
    if (!questions.length || currentIndex >= questions.length - 1) return;

    setCurrentIndex((i) => i + 1);
    setSelectedAnswer(null);
    setAttemptResult(null);
    setSubmitted(false);
  }

  const isLast = currentIndex >= totalQuestions - 1;
  const accuracy = totalQuestions ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const progressPercentage = totalQuestions
    ? Math.round(((currentIndex + 1) / totalQuestions) * 100)
    : 0;

  if (loading) {
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

  if (error || (!loading && !questions.length)) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 text-center glass-card">
            <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold mb-2">
              {error ? text.somethingWrong : text.noQuestions}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">
              {error || text.emptyBank}
            </p>
            <Button onClick={loadQuestions} className="w-full">
              {error ? text.tryAgain : text.checkAgain}
            </Button>
            {!error && (
              <LinkButton href="/" variant="outline" className="w-full mt-4">
                {text.home}
              </LinkButton>
            )}
          </Card>
        </div>
      </div>
    );
  }

  if (attemptResult && isLast && submitted) {
    // ... (rest of the results page)
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col">
        <SiteHeader />
        <main className="flex-1 py-12 px-4 relative overflow-hidden">
          <div className="absolute inset-0 subtle-grid opacity-[0.4] pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto relative z-10"
          >
            <Card className="p-8 md:p-12 text-center glass-card shadow-2xl shadow-primary-500/10">
              <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3">
                <Trophy className="w-10 h-10" />
              </div>
              
              <h1 className="text-4xl font-bold mb-2 tracking-tight">{text.complete}</h1>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-10">
                {text.completeDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                <StatBox icon={<Target className="w-4 h-4 text-primary-600" />} label={text.accuracy} value={accuracy + "%"} />
                <StatBox icon={<CheckCircle2 className="w-4 h-4 text-green-600" />} label={text.correct} value={correctCount} />
                <StatBox icon={<Clock className="w-4 h-4 text-indigo-600" />} label={text.total} value={totalQuestions} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={loadQuestions} size="lg" className="px-10">
                  <RotateCcw className="mr-2 w-5 h-5" />
                  {text.anotherSet}
                </Button>
                <LinkButton href="/stats" variant="outline" size="lg" className="px-10">
                  <BarChart3 className="mr-2 w-5 h-5" />
                  {text.history}
                </LinkButton>
              </div>
            </Card>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col selection:bg-primary-500/20">
      <SiteHeader />
      
      <main className="flex-1 py-8 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 subtle-grid opacity-[0.3] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-2xl flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                {text.active}
              </h1>
            </div>
            
            <div className="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-900 px-4 py-2 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{text.question}</span>
              <span className="text-lg font-black text-primary-600">{currentIndex + 1}</span>
              <span className="text-zinc-300 dark:text-zinc-700">/</span>
              <span className="text-lg font-bold text-zinc-700 dark:text-zinc-200">{totalQuestions}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-10 group">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{text.progress}</span>
              <span className="text-xs font-bold text-primary-600">{progressPercentage}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-zinc-100 dark:bg-zinc-900 p-0.5 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                className="h-full bg-gradient-to-r from-primary-600 to-indigo-500 rounded-full shadow-lg shadow-primary-500/20"
              />
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion?.id || "empty"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 md:p-10 glass-card shadow-xl shadow-zinc-200/50 dark:shadow-none border-t-4 border-t-primary-600">
                <div className="text-xl md:text-2xl font-medium leading-relaxed mb-10 text-zinc-800 dark:text-zinc-100 italic">
                  "{currentQuestion?.questionText}"
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion?.options?.map((opt, idx) => {
                    const letter = String.fromCharCode("A".charCodeAt(0) + idx);
                    const isSelected = selectedAnswer === opt;
                    const isDisabled = submitted;
                    
                    return (
                      <motion.button
                        key={opt}
                        whileHover={!isDisabled ? { x: 5 } : {}}
                        whileTap={!isDisabled ? { scale: 0.98 } : {}}
                        onClick={() => submitAnswer(opt)}
                        disabled={isDisabled}
                        className={cn(
                          "group text-left rounded-2xl border-2 px-6 py-4 transition-all flex items-center gap-4 relative overflow-hidden",
                          isDisabled ? "cursor-not-allowed" : "hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/10",
                          isSelected 
                            ? "border-primary-600 bg-primary-50 dark:bg-primary-900/20 shadow-lg shadow-primary-500/10 ring-2 ring-primary-600/20" 
                            : "border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors",
                          isSelected 
                            ? "bg-primary-600 text-white" 
                            : "bg-white dark:bg-zinc-800 text-zinc-500 group-hover:bg-primary-100 group-hover:text-primary-700"
                        )}>
                          {letter}
                        </div>
                        <span className={cn(
                          "flex-1 text-lg font-medium",
                          isSelected ? "text-primary-900 dark:text-primary-100" : "text-zinc-700 dark:text-zinc-300"
                        )}>
                          {opt}
                        </span>
                        {isSelected && !attemptResult && (
                          <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Explanation / Result */}
                <AnimatePresence>
                  {attemptResult && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-10 pt-10 border-t border-zinc-100 dark:border-zinc-800"
                    >
                      <div className={cn(
                        "rounded-2xl p-6 flex flex-col gap-4",
                        attemptResult.isCorrect 
                          ? "bg-green-50/80 dark:bg-green-900/10 border border-green-100 dark:border-green-800/50" 
                          : "bg-red-50/80 dark:bg-red-900/10 border border-red-100 dark:border-red-800/50"
                      )}>
                        <div className="flex items-center gap-3">
                          {attemptResult.isCorrect ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-600" />
                          )}
                          <span className={cn(
                            "text-lg font-bold uppercase tracking-wider",
                            attemptResult.isCorrect ? "text-green-700" : "text-red-700"
                          )}>
                            {attemptResult.isCorrect ? `${text.perfect} 🎉` : text.notQuite}
                          </span>
                        </div>

                        {!attemptResult.isCorrect && (
                          <div className="bg-white dark:bg-zinc-800 rounded-lg p-3 border-l-4 border-blue-500">
                            <p className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-widest mb-1">{text.yourAnswer}</p>
                            <p className="text-zinc-700 dark:text-zinc-200 font-medium">{selectedAnswer}</p>
                          </div>
                        )}
                        
                        {!attemptResult.isCorrect && attemptResult.correctAnswer && (
                          <div className="bg-white dark:bg-zinc-800 rounded-lg p-3 border-l-4 border-green-500">
                            <p className="text-xs font-bold text-green-700 dark:text-green-300 uppercase tracking-widest mb-1">✓ {text.correctAnswer}</p>
                            <p className="text-zinc-700 dark:text-zinc-200 font-medium text-green-700 dark:text-green-300">{attemptResult.correctAnswer}</p>
                          </div>
                        )}
                        
                        <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border-l-4 border-primary-500">
                          <p className="text-xs font-bold text-primary-700 dark:text-primary-300 uppercase tracking-widest mb-2">
                            📚 {attemptResult.isCorrect ? text.greatReasoning : text.explanation}
                          </p>
                          <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed text-sm md:text-base whitespace-pre-line">
                            {attemptResult.explanation}
                          </p>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <Button 
                            onClick={goNext} 
                            disabled={isLast && attemptResult.isCorrect}
                            className="group px-8 hover:px-10 transition-all shadow-xl shadow-primary-500/20"
                          >
                            {isLast ? text.viewResults : text.nextQuestion}
                            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function StatBox({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex flex-col items-center gap-2 group hover:scale-105 transition-transform">
      <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center mb-1">
        {icon}
      </div>
      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">{label}</div>
      <div className="text-3xl font-black text-zinc-900 dark:text-zinc-100">{value}</div>
    </div>
  );
}
