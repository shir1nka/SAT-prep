"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import SiteHeader from "@/components/SiteHeader";
import Card from "@/components/ui/Card";
import { Button, LinkButton } from "@/components/ui/Button";
import { isAdminEmail } from "@/lib/admin";

type AdminQuestion = {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

function optionsToText(options: string[]) {
  return options.join("\n");
}

function textToOptions(text: string) {
  return text
    .split(/\n|,/g)
    .map((x) => x.trim())
    .filter(Boolean);
}

export default function AdminQuestionsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const admin = isAdminEmail(session?.user?.email);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<AdminQuestion[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [questionText, setQuestionText] = useState("");
  const [optionsText, setOptionsText] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [explanation, setExplanation] = useState("");

  const canSubmit = useMemo(() => {
    const opts = textToOptions(optionsText);
    return (
      questionText.trim().length > 0 &&
      correctAnswer.trim().length > 0 &&
      explanation.trim().length > 0 &&
      opts.length >= 2
    );
  }, [correctAnswer, explanation, optionsText, questionText]);

  async function loadQuestions() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/questions");
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (!res.ok) {
        setError("Failed to load questions.");
        return;
      }

      const data = (await res.json()) as AdminQuestion[];
      setQuestions(data);
    } catch {
      setError("Failed to load questions.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!session) return;
    if (!admin) return;
    void loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin, session]);

  function startEdit(q: AdminQuestion) {
    setEditingId(q.id);
    setQuestionText(q.questionText);
    setOptionsText(optionsToText(q.options));
    setCorrectAnswer(q.correctAnswer);
    setExplanation(q.explanation);
  }

  function resetForm() {
    setEditingId(null);
    setQuestionText("");
    setOptionsText("");
    setCorrectAnswer("");
    setExplanation("");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const payload = {
      questionText,
      options: textToOptions(optionsText),
      correctAnswer,
      explanation,
    };

    try {
      const res = editingId
        ? await fetch(`/api/admin/questions/${editingId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/admin/questions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (!res.ok) {
        setError("Save failed.");
        return;
      }

      await loadQuestions();
      resetForm();
    } catch {
      setError("Save failed.");
    }
  }

  async function onDelete(id: string) {
    const ok = confirm("Delete this question? This cannot be undone.");
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/questions/${id}`, {
        method: "DELETE",
      });

      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (!res.ok) {
        setError("Delete failed.");
        return;
      }

      await loadQuestions();
      if (editingId === id) resetForm();
    } catch {
      setError("Delete failed.");
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        <SiteHeader />
        <div className="flex items-center justify-center px-4 py-10">
          <div className="text-zinc-700 dark:text-zinc-200">Loading...</div>
        </div>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        <SiteHeader />
        <div className="flex items-center justify-center px-4 py-10">
          <div className="text-red-600 dark:text-red-400">Access denied.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <SiteHeader />
      <div className="px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">Admin - Questions</h1>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Create, edit, and delete the question bank.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <LinkButton href="/admin" variant="secondary">
                Back to Admin
              </LinkButton>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold">
                {editingId ? "Edit question" : "Create question"}
              </h2>
              <form className="mt-5 flex flex-col gap-4" onSubmit={onSubmit}>
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Question text
                  </span>
                  <textarea
                    className="min-h-[90px] rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-2 bg-transparent"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    required
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Options (one per line)
                  </span>
                  <textarea
                    className="min-h-[90px] rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-2 bg-transparent"
                    value={optionsText}
                    onChange={(e) => setOptionsText(e.target.value)}
                    required
                  />
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Correct answer
                    </span>
                    <input
                      className="h-10 rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 bg-transparent"
                      value={correctAnswer}
                      onChange={(e) => setCorrectAnswer(e.target.value)}
                      required
                    />
                  </label>

                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={resetForm}
                      disabled={!editingId && !questionText && !optionsText}
                      className="w-full"
                    >
                      Reset
                    </Button>
                  </div>
                </div>

                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Explanation
                  </span>
                  <textarea
                    className="min-h-[90px] rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-2 bg-transparent"
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    required
                  />
                </label>

                {error ? (
                  <div className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </div>
                ) : null}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button type="submit" variant="primary" disabled={!canSubmit}>
                    {editingId ? "Save changes" : "Create question"}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={async () => {
                      await loadQuestions();
                    }}
                  >
                    Refresh list
                  </Button>
                </div>
              </form>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">Question bank</h2>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {questions.length} total
                </div>
              </div>

              {loading ? (
                <div className="mt-6 text-zinc-700 dark:text-zinc-200">
                  Loading...
                </div>
              ) : error ? (
                <div className="mt-6 text-red-600 dark:text-red-400">{error}</div>
              ) : (
                <div className="mt-5 flex flex-col gap-3">
                  {questions.slice(0, 30).map((q) => (
                    <div
                      key={q.id}
                      className="p-4 rounded-xl border border-zinc-200/70 dark:border-zinc-800 bg-white/60 dark:bg-black/20"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm text-zinc-600 dark:text-zinc-400">
                            {q.options.length} options
                          </div>
                          <div className="mt-1 font-medium truncate">
                            {q.questionText}
                          </div>
                          <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
                            Correct:{" "}
                            <span className="font-medium">{q.correctAnswer}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => startEdit(q)}
                          >
                            Edit
                          </Button>
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => void onDelete(q.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {questions.length > 30 ? (
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      Showing first 30 results.
                    </div>
                  ) : null}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

