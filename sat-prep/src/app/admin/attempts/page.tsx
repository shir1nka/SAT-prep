"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import SiteHeader from "@/components/SiteHeader";
import Card from "@/components/ui/Card";
import { Button, LinkButton } from "@/components/ui/Button";
import { isAdminEmail } from "@/lib/admin";

type AdminAttempt = {
  id: string;
  userEmail: string;
  questionText: string;
  selectedAnswer: string;
  isCorrect: boolean;
  createdAt: string | Date;
};

export default function AdminAttemptsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const admin = isAdminEmail(session?.user?.email);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<AdminAttempt[]>([]);

  const limit = 50;
  const [offset, setOffset] = useState(0);

  const canPrev = useMemo(() => offset > 0, [offset]);

  async function loadAttempts(nextOffset: number) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/admin/attempts?limit=${limit}&offset=${nextOffset}`
      );
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (!res.ok) {
        setError("Failed to load attempts.");
        return;
      }

      const data = (await res.json()) as { attempts: AdminAttempt[] };
      setAttempts(data.attempts);
    } catch {
      setError("Failed to load attempts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!session) return;
    if (!admin) return;
    void loadAttempts(offset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin, offset, session]);

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
              <h1 className="text-3xl font-semibold">Admin - Attempts</h1>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Review answers from all users.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <LinkButton href="/admin" variant="secondary">
                Back to Admin
              </LinkButton>
            </div>
          </div>

          <div className="mt-6">
            <Card className="p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  Showing {attempts.length} attempts (offset {offset})
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      const next = Math.max(0, offset - limit);
                      setOffset(next);
                    }}
                    disabled={!canPrev}
                  >
                    Prev
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setOffset(offset + limit)}
                  >
                    Next
                  </Button>
                </div>
              </div>

              {loading ? (
                <div className="mt-6 text-zinc-700 dark:text-zinc-200">
                  Loading...
                </div>
              ) : error ? (
                <div className="mt-6 text-red-600 dark:text-red-400">{error}</div>
              ) : (
                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-[900px] w-full text-left border-separate border-spacing-y-2">
                    <thead>
                      <tr className="text-xs text-zinc-500 dark:text-zinc-400">
                        <th className="px-3">User</th>
                        <th className="px-3">Question</th>
                        <th className="px-3">Selected</th>
                        <th className="px-3">Result</th>
                        <th className="px-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attempts.map((a) => (
                        <tr key={a.id} className="bg-white/60 dark:bg-black/20">
                          <td className="px-3 py-3 whitespace-nowrap text-sm">
                            {a.userEmail}
                          </td>
                          <td className="px-3 py-3 text-sm max-w-[380px]">
                            {a.questionText}
                          </td>
                          <td className="px-3 py-3 text-sm whitespace-nowrap">
                            {a.selectedAnswer}
                          </td>
                          <td className="px-3 py-3 text-sm whitespace-nowrap">
                            {a.isCorrect ? (
                              <span className="text-green-700 dark:text-green-300">
                                Correct
                              </span>
                            ) : (
                              <span className="text-red-700 dark:text-red-300">
                                Incorrect
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-3 text-sm whitespace-nowrap">
                            {typeof a.createdAt === "string"
                              ? a.createdAt
                              : a.createdAt.toISOString()}
                          </td>
                        </tr>
                      ))}
                      {attempts.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-3 py-6 text-sm text-zinc-600 dark:text-zinc-300">
                            No attempts found.
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

