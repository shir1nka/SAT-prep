import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export default function Card({ children, className, glass, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card shadow-sm dark:border-zinc-800",
        glass && "glass-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
