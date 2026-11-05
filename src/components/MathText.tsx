"use client";

import { Fragment, useMemo, type ReactNode } from "react";
import katex from "katex";
import { cn } from "@/lib/utils";

type MathTextProps = {
  text: string;
  className?: string;
  preserveLines?: boolean;
};

/**
 * MathText — inline-safe math rendering.
 *
 * The old version rendered a line either fully as text or fully as KaTeX.
 * That left raw `^2` / `^{12}` visible inside normal sentences.
 *
 * Now we tokenise each line and render the *math runs* inline with KaTeX:
 *   "The roots of x^2 - 5x + 6 = 0 are 2 and 3."
 *   -> prose + KaTeX(x^2 - 5x + 6 = 0) + prose
 *
 * Rules:
 * - A run only becomes math when it contains an operator/strong math marker
 *   (or is a fraction / function call / radical).
 * - Ordinary words and lone numbers stay as plain text, so prose keeps its
 *   normal font and spacing.
 * - Cyrillic prose is never touched.
 */

const SENTENCE_WORDS =
  /^(a|an|the|is|are|was|were|be|what|which|how|why|when|where|who|for|with|from|this|that|these|those|then|than|into|over|under|and|or|not|to|of|in|on|at|by|it|its|as|if|so|do|per|there|some|any|find|use|given|number|answer|solve|total|value|percent|percentage|equation|slope|function|data|point|graph|table|test|sample|chapter|problem|example|solution|models|represents|means|increases|decreases)\b/i;

/** Markers strong enough to make a run math on their own. */
const STRONG_MATH =
  /[\^_=<>≤≥≠√∛π·×÷±°∞⁰¹²³⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉]/;

/** Operator-only tokens. */
const OPERATOR = /^[+\-−–—*/=<>≤≥≠^_·×÷±]+$/;

const NUMBER = /^[-−]?\d[\d,]*(\.\d+)?%?$/;
const VARIABLE = /^[a-zA-Z]$/;
const FRACTION = /^\d+\/\d+$/;
const FUNCTION_CALL = /^[a-zA-Z]\([^)]*\)$/;
const POINT = /^\(?-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\)?$/;
const EXPRESSION =
  /^[a-zA-Z0-9+\-−–—*/^_=<>≤≥≠√∛π·×÷±°⁰¹²³⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉().,\[\]{}|'′]+$/;

function coreOf(word: string) {
  return word
    .replace(/^[(\[{]+/, "")
    .replace(/[)\]}]+$/, "")
    .replace(/[,.;:!?]+$/, "")
    .trim();
}

function isMathWord(word: string) {
  // Roman numerals / option letters like "I." are prose, not variables.
  if (/^[A-Z]\.$/.test(word)) return false;
  const core = word.replace(/[,.;:!?]+$/, "").trim();
  if (!core) return false;
  // Also try with wrapping brackets removed, so "(3," and "[1,2]" classify well.
  const bare = core.replace(/^[(\[{]+/, "").replace(/[)\]}]+$/, "");

  const any = (pattern: RegExp) => pattern.test(core) || pattern.test(bare);

  if (any(OPERATOR)) return true;
  if (any(STRONG_MATH)) return true;
  if (/^pi$/i.test(core) || /^pi$/i.test(bare)) return true;
  if (any(NUMBER)) return true;
  if (any(VARIABLE)) return true;
  if (any(FRACTION)) return true;
  if (any(FUNCTION_CALL)) return true;
  if (any(POINT)) return true;
  // Algebra with both letters and digits, e.g. 18h, 3x, 0.64x
  if (EXPRESSION.test(core) && /[a-zA-Z]/.test(core) && /\d/.test(core)) return true;
  if (EXPRESSION.test(bare) && /[a-zA-Z]/.test(bare) && /\d/.test(bare)) return true;
  return false;
}

type MathGroup = {
  lead: string;
  rawParts: string[];
  words: string[];
};

function shouldRender(group: MathGroup) {
  const words = group.words;
  if (words.length === 0) return false;
  const first = coreOf(words[0]);
  const last = coreOf(words[words.length - 1]);
  // A dangling operator is not an expression ("r^2 h =" or "= 121").
  if (/^[=+*/<>≤≥≠^_·×÷±−–—]$/.test(first)) return false;
  if (OPERATOR.test(last)) return false;
  const hasOperator = words.some((w) => OPERATOR.test(coreOf(w)));
  const hasStrong = words.some((w) => {
    const c = coreOf(w);
    return (
      STRONG_MATH.test(c) ||
      FRACTION.test(c) ||
      FUNCTION_CALL.test(c) ||
      POINT.test(c)
    );
  });
  if (words.length === 1) {
    const c = coreOf(words[0]);
    // Lone variables, numbers and words stay text.
    return (
      STRONG_MATH.test(c) ||
      FRACTION.test(c) ||
      FUNCTION_CALL.test(c) ||
      POINT.test(c)
    );
  }
  return hasOperator || hasStrong;
}

function renderMath(raw: string): ReactNode | null {
  const norm = normalizeMath(raw.trim());
  if (!norm) return null;
  try {
    const html = katex.renderToString(norm, {
      throwOnError: true,
      displayMode: false,
      strict: false,
      trust: false,
    });
    return (
      <span
        className="math-render"
        style={{ fontFamily: "KaTeX_Math, 'Times New Roman', serif" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch {
    return null;
  }
}

/** Last-resort pretty text so a raw caret can never reach the screen. */
function prettyPlain(raw: string) {
  return raw
    .replace(/\^\{([^{}]+)\}|\^([A-Za-z0-9+\-])/g, (_m, braced, single) =>
      toSuperscript(braced ?? single ?? "")
    )
    .replace(/\^/g, "");
}

const SUP_DIGITS: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "+": "⁺",
  "-": "⁻",
  "=": "⁼",
  "(": "⁽",
  ")": "⁾",
  a: "ᵃ",
  b: "ᵇ",
  c: "ᶜ",
  d: "ᵈ",
  e: "ᵉ",
  f: "ᶠ",
  g: "ᵍ",
  h: "ʰ",
  i: "ⁱ",
  j: "ʲ",
  k: "ᵏ",
  l: "ˡ",
  m: "ᵐ",
  n: "ⁿ",
  o: "ᵒ",
  p: "ᵖ",
  r: "ʳ",
  s: "ˢ",
  t: "ᵗ",
  u: "ᵘ",
  v: "ᵛ",
  w: "ʷ",
  x: "ˣ",
  y: "ʸ",
  z: "ᶻ",
};

function toSuperscript(value: string) {
  let out = "";
  for (const ch of value) out += SUP_DIGITS[ch] ?? ch;
  return out;
}

type Token = { lead: string; value: string };

function tokenize(line: string): Token[] {
  const tokens: Token[] = [];
  const re = /(\s*)(\S+)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(line)) !== null) {
    tokens.push({ lead: match[1], value: match[2] });
  }
  return tokens;
}

function renderLine(line: string): ReactNode {
  const tokens = tokenize(line);
  const nodes: ReactNode[] = [];
  let group: MathGroup | null = null;

  const flush = () => {
    if (!group) return;
    const g = group;
    group = null;
    const raw = g.rawParts.join(" ");
    if (shouldRender(g)) {
      const rendered = renderMath(raw);
      if (rendered) {
        nodes.push(
          <Fragment key={`m-${nodes.length}`}>
            {g.lead}
            {rendered}
          </Fragment>
        );
        return;
      }
    }
    nodes.push(
      <Fragment key={`t-${nodes.length}`}>
        {g.lead}
        {prettyPlain(raw)}
      </Fragment>
    );
  };

  for (const token of tokens) {
    if (isMathWord(token.value)) {
      if (!group) {
        group = { lead: token.lead, rawParts: [token.value], words: [token.value] };
      } else {
        group.rawParts.push(token.value);
        group.words.push(token.value);
      }
      // End the run at sentence punctuation so separate clauses never merge
      // into one giant expression.
      if (/[?!;.]$/.test(token.value)) flush();
    } else {
      flush();
      nodes.push(
        <Fragment key={`p-${nodes.length}`}>
          {token.lead}
          {token.value}
        </Fragment>
      );
    }
  }
  flush();

  return <>{nodes}</>;
}

const SUPS: Record<string, string> = {
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
  "ᵃ": "a",
  "ᵇ": "b",
  "ᶜ": "c",
  "ᵈ": "d",
  "ᵉ": "e",
  "ᶠ": "f",
  "ᵍ": "g",
  "ʰ": "h",
  "ⁱ": "i",
  "ʲ": "j",
  "ᵏ": "k",
  "ˡ": "l",
  "ᵐ": "m",
  "ⁿ": "n",
  "ᵒ": "o",
  "ᵖ": "p",
  "ʳ": "r",
  "ˢ": "s",
  "ᵗ": "t",
  "ᵘ": "u",
  "ᵛ": "v",
  "ʷ": "w",
  "ˣ": "x",
  "ʸ": "y",
  "ᶻ": "z",
  "⁺": "+",
  "⁻": "-",
  "⁼": "=",
  "⁽": "(",
  "⁾": ")",
};

const SUBS: Record<string, string> = {
  "₀": "0",
  "₁": "1",
  "₂": "2",
  "₃": "3",
  "₄": "4",
  "₅": "5",
  "₆": "6",
  "₇": "7",
  "₈": "8",
  "₉": "9",
  "ₐ": "a",
  "ₑ": "e",
  "ₒ": "o",
  "ₓ": "x",
  "ₔ": "u",
  "ₗ": "l",
  "ₛ": "s",
  "ₕ": "h",
  "ⱼ": "j",
  "ₖ": "k",
  "ₙ": "n",
  "ₚ": "p",
  "ₜ": "t",
};

function replaceRun(
  input: string,
  pattern: RegExp,
  map: Record<string, string>,
  open: string,
  close: string
) {
  return input.replace(pattern, (match) => {
    let out = "";
    for (const ch of match) out += map[ch] ?? ch;
    return open + out + close;
  });
}

function normalizeMath(raw: string) {
  let s = raw;

  // Unicode superscripts / subscripts -> ^{..} / _{..}
  s = replaceRun(
    s,
    /([⁰¹²³⁴⁵⁶⁷⁸⁹ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻ⁺⁻⁼⁽⁾]+)/g,
    SUPS,
    "^{",
    "}"
  );
  s = replaceRun(
    s,
    /([₀₁₂₃₄₅₆₇₈₉ₐₑₒₓₔₗₛₕⱼₖₙₚₜ]+)/g,
    SUBS,
    "_{",
    "}"
  );

  // Parenthesised exponents / indices: x^(m+n) -> x^{m+n}
  for (let i = 0; i < 3; i += 1) {
    s = s.replace(/\^\(([^()]*)\)/g, "^{$1}");
    s = s.replace(/_\(([^()]*)\)/g, "_{$1}");
  }

  // Radicals before the generic √ replacement.
  s = s.replace(/∛\s*\(([^()]*)\)/g, "\\sqrt[3]{$1}");
  s = s.replace(/∛\s*([A-Za-z0-9]+)/g, "\\sqrt[3]{$1}");
  s = s.replace(/√\s*\(([^()]*)\)/g, "\\sqrt{$1}");
  s = s.replace(/√\s*([A-Za-z0-9]+)/g, "\\sqrt{$1}");

  // Symbols.
  s = s.replace(/−/g, "-");
  s = s.replace(/[–—]/g, "-");
  s = s.replace(/≤/g, "\\leq ");
  s = s.replace(/≥/g, "\\geq ");
  s = s.replace(/≠/g, "\\neq ");
  s = s.replace(/→/g, "\\rightarrow ");
  s = s.replace(/⇒/g, "\\Rightarrow ");
  s = s.replace(/⇔/g, "\\Leftrightarrow ");
  s = s.replace(/←/g, "\\leftarrow ");
  s = s.replace(/∞/g, "\\infty ");
  s = s.replace(/π/g, "\\pi ");
  s = s.replace(/√/g, "\\sqrt");
  s = s.replace(/·/g, "\\cdot ");
  s = s.replace(/×/g, "\\times ");
  s = s.replace(/÷/g, "\\div ");
  s = s.replace(/±/g, "\\pm ");
  s = s.replace(/∓/g, "\\mp ");
  s = s.replace(/°/g, "^\\circ ");
  s = s.replace(/½/g, "\\frac{1}{2}");
  s = s.replace(/¼/g, "\\frac{1}{4}");
  s = s.replace(/¾/g, "\\frac{3}{4}");
  s = s.replace(/⅓/g, "\\frac{1}{3}");
  s = s.replace(/⅔/g, "\\frac{2}{3}");

  // Greek letters used in math.
  s = s.replace(/α/g, "\\alpha ");
  s = s.replace(/β/g, "\\beta ");
  s = s.replace(/γ/g, "\\gamma ");
  s = s.replace(/δ/g, "\\delta ");
  s = s.replace(/ε/g, "\\epsilon ");
  s = s.replace(/θ/g, "\\theta ");
  s = s.replace(/λ/g, "\\lambda ");
  s = s.replace(/μ/g, "\\mu ");
  s = s.replace(/σ/g, "\\sigma ");
  s = s.replace(/φ/g, "\\phi ");
  s = s.replace(/ω/g, "\\omega ");
  s = s.replace(/Δ/g, "\\Delta ");

  // Plain "pi" in an expression -> π (including "45pi").
  s = s.replace(/\bpi\b/gi, "\\pi ");
  s = s.replace(/(\d)\s*pi\b/gi, "$1\\pi ");

  // Multiplication star -> centered dot.
  s = s.replace(/\*/g, "\\cdot ");

  // Typed "x" used as multiplication between numbers / after π.
  s = s.replace(/([\d)\]])\s*[xX]\s*(?=[\d(])/g, "$1 \\times ");
  s = s.replace(/(\\pi\s*)[xX]\s*(?=[\d(])/g, "$1\\times ");

  // Percent needs escaping in math mode.
  s = s.replace(/%/g, "\\%");

  // Fractions. Parenthesised forms first so the numerator/denominator stay
  // grouped, then plain numeric and algebraic forms.
  s = s.replace(
    /\(([^()]*)\)\s*\/\s*\(([^()]*)\)/g,
    "\\dfrac{$1}{$2}"
  );
  s = s.replace(
    /(\([^()]*\))\s*\/\s*([A-Za-z0-9]+)(?![\^A-Za-z0-9])/g,
    "\\dfrac{$1}{$2}"
  );
  s = s.replace(
    /(?<![\^A-Za-z0-9])([A-Za-z0-9]+)\s*\/\s*\(([^()]*)\)/g,
    "\\dfrac{$1}{$2}"
  );
  s = s.replace(
    /(?<![\^A-Za-z0-9])(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)(?![\^A-Za-z0-9])/g,
    "\\dfrac{$1}{$2}"
  );
  s = s.replace(
    /(?<![\^A-Za-z0-9])([A-Za-z0-9]+)\s*\/\s*([A-Za-z0-9]+)(?![\^A-Za-z0-9])/g,
    "\\dfrac{$1}{$2}"
  );

  // Named helpers.
  s = s.replace(/sqrt\((.*?)\)/g, "\\sqrt{$1}");
  s = s.replace(/cubrt\((.*?)\)/g, "\\sqrt[3]{$1}");
  s = s.replace(/abs\((.*?)\)/g, "\\left|$1\\right|");

  // Points from Desmos helper text.
  s = s.replace(
    /intersection\s*\(\s*\(?\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)?\s*,\s*\(?\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)?\s*\)/gi,
    "($1, $2), ($3, $4)"
  );

  // Currency markers never belong in math mode.
  s = s.replace(/\$/g, "");

  return s;
}

export default function MathText({
  text,
  className,
  preserveLines = false,
}: MathTextProps) {
  const lines = useMemo(() => text.split("\n"), [text]);

  return (
    <span
      className={cn(preserveLines && "whitespace-pre-line", "inline", className)}
      style={{
        fontFamily:
          "Aptos, Inter, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {lines.map((line, li) => (
        <Fragment key={li}>
          {renderLine(line)}
          {li < lines.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </span>
  );
}
