"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to external service in production
    if (process.env.NODE_ENV === "production") {
      console.error("Error logged:", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-6xl font-bold text-red-600 dark:text-red-400 mb-4">
            Oops!
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We encountered an unexpected error. Please try again.
          </p>
          {process.env.NODE_ENV === "development" && error.message && (
            <pre className="bg-red-50 dark:bg-red-900/20 p-4 rounded text-left text-xs text-red-800 dark:text-red-200 overflow-auto mb-4">
              {error.message}
            </pre>
          )}
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
