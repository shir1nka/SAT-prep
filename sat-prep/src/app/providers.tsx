"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/language-context";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
