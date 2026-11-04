"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { isAdminEmail } from "@/lib/admin";
import { useLanguage } from "@/lib/language-context";

import SiteHeader from "@/components/SiteHeader";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

import type { UserWithStats } from "@/app/api/admin/users/route";

export default function AdminUsersPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserWithStats[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "attempts" | "success">(
    "latest"
  );

  const text =
    language === "ru"
      ? {
          denied: "Доступ запрещен.",
          loadFailed: "Не удалось загрузить пользователей.",
          loading: "Загрузка...",
          title: "Пользователи",
          subtitle: "Список всех зарегистрированных пользователей",
          email: "Email",
          name: "Имя",
          joined: "Дата регистрации",
          attempts: "Попытки",
          success: "Успех", 
          noUsers: "Пользователи не найдены",
          search: "Поиск по email или имени...",
          sortLatest: "Новые",
          sortAttempts: "По попыткам",
          sortSuccess: "По успехам",
        }
      : {
          denied: "Access denied.",
          loadFailed: "Failed to load users.",
          loading: "Loading...",
          title: "Users",
          subtitle: "List of all registered users",
          email: "Email",
          name: "Name",
          joined: "Joined",
          attempts: "Attempts",
          success: "Success Rate",
          noUsers: "No users found",
          search: "Search by email or name...",
          sortLatest: "Latest",
          sortAttempts: "By Attempts",
          sortSuccess: "By Success Rate",
        };

  const admin = isAdminEmail(session?.user?.email);

  useEffect(() => {
    async function load() {
      try {
        if (!session) {
          router.push("/login");
          return;
        }
        if (!admin) {
          setError(text.denied);
          return;
        }

        const res = await fetch("/api/admin/users");
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        if (!res.ok) {
          setError(text.loadFailed);
          return;
        }

        const data = (await res.json()) as UserWithStats[];
        setUsers(data);
      } catch {
        setError(text.loadFailed);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [admin, router, session, text.denied, text.loadFailed]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        <SiteHeader />
        <div className="flex items-center justify-center p-4 mt-20">
          <p className="text-zinc-600 dark:text-zinc-400">{text.loading}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        <SiteHeader />
        <div className="flex items-center justify-center p-4 mt-20">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  // Filter users
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.email.toLowerCase().includes(term) ||
      (user.name?.toLowerCase().includes(term) ?? false)
    );
  });

  // Sort users
  let sortedUsers = [...filteredUsers];
  if (sortBy === "attempts") {
    sortedUsers.sort((a, b) => b.attempts - a.attempts);
  } else if (sortBy === "success") {
    sortedUsers.sort((a, b) => b.correctPercentage - a.correctPercentage);
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <SiteHeader />
      <div className="max-w-6xl mx-auto p-4 mt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            {text.title}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">{text.subtitle}</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            placeholder={text.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => setSortBy("latest")}
              className={`${
                sortBy === "latest"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600"
              }`}
            >
              {text.sortLatest}
            </Button>
            <Button
              onClick={() => setSortBy("attempts")}
              className={`${
                sortBy === "attempts"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600"
              }`}
            >
              {text.sortAttempts}
            </Button>
            <Button
              onClick={() => setSortBy("success")}
              className={`${
                sortBy === "success"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600"
              }`}
            >
              {text.sortSuccess}
            </Button>
          </div>
        </div>

        {/* Users table */}
        {sortedUsers.length === 0 ? (
          <Card>
            <p className="text-center text-zinc-600 dark:text-zinc-400 py-8">
              {text.noUsers}
            </p>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-300 dark:border-zinc-700">
                  <th className="text-left px-4 py-3 font-semibold text-zinc-900 dark:text-white">
                    {text.email}
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-zinc-900 dark:text-white">
                    {text.name}
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-zinc-900 dark:text-white">
                    {text.joined}
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-zinc-900 dark:text-white">
                    {text.attempts}
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-zinc-900 dark:text-white">
                    {text.success}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <td className="px-4 py-3 text-zinc-900 dark:text-white">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                      {user.name ?? "-"}
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                      {new Date(user.createdAt).toLocaleDateString(
                        language === "ru" ? "ru-RU" : "en-US"
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-zinc-900 dark:text-white font-medium">
                      {user.attempts}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          user.correctPercentage >= 70
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
                            : user.correctPercentage >= 50
                              ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100"
                              : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100"
                        }`}
                      >
                        {user.correctPercentage}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 text-zinc-600 dark:text-zinc-400 text-sm">
          {text.title}: {sortedUsers.length}
        </div>
      </div>
    </div>
  );
}
