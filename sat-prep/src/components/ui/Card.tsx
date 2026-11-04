import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export default function Card({ children, className, glass, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950",
        glass && "glass-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
