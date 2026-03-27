import { Fragment, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type MathTextProps = {
  text: string;
  className?: string;
  preserveLines?: boolean;
};

function readExponentToken(source: string, startIndex: number) {
  if (startIndex >= source.length) {
    return null;
  }

  if (source[startIndex] === "(") {
    let depth = 0;

    for (let index = startIndex; index < source.length; index += 1) {
      const character = source[index];

      if (character === "(") {
        depth += 1;
      } else if (character === ")") {
        depth -= 1;

        if (depth === 0) {
          return {
            token: source.slice(startIndex + 1, index),
            endIndex: index + 1,
          };
        }
      }
    }
  }

  let endIndex = startIndex;

  while (endIndex < source.length) {
    const character = source[endIndex];

    if (/[A-Za-z0-9.+\-\/]/.test(character)) {
      endIndex += 1;
      continue;
    }

    break;
  }

  if (endIndex === startIndex) {
    return null;
  }

  return {
    token: source.slice(startIndex, endIndex),
    endIndex,
  };
}

function formatMathSegments(text: string) {
  const nodes: ReactNode[] = [];
  let buffer = "";
  let index = 0;

  while (index < text.length) {
    if (text[index] !== "^") {
      buffer += text[index];
      index += 1;
      continue;
    }

    const exponent = readExponentToken(text, index + 1);

    if (!exponent) {
      buffer += text[index];
      index += 1;
      continue;
    }

    if (buffer) {
      nodes.push(buffer);
      buffer = "";
    }

    nodes.push(
      <sup key={`sup-${index}`} className="align-super text-[0.72em] font-semibold">
        {exponent.token}
      </sup>
    );

    index = exponent.endIndex;
  }

  if (buffer) {
    nodes.push(buffer);
  }

  return nodes;
}

export default function MathText({
  text,
  className,
  preserveLines = false,
}: MathTextProps) {
  const lines = text.split("\n");

  return (
    <span className={cn(preserveLines && "whitespace-pre-line", className)}>
      {lines.map((line, lineIndex) => (
        <Fragment key={`line-${lineIndex}`}>
          {formatMathSegments(line)}
          {lineIndex < lines.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </span>
  );
}
