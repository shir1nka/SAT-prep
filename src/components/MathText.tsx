"use client";

import { Fragment, useMemo } from "react";
import katex from "katex";
import { cn } from "@/lib/utils";

type MathTextProps = {
  text: string;
  className?: string;
  preserveLines?: boolean;
};

/**
 * MathText — ChatGPT-like math. Hard rules:
 * - Only short fragments with strong math markers go to KaTeX.
 * - Plain sentences stay plain text (same font, normal spacing, never glued).
 * - A line is math only when EVERY significant token looks like math.
 *   Example: "f(x) = 3x + 29" -> math. "What percentage of 300 is 75?" -> text.
 * - No token-splitting inside sentences (that caused W-h-a-t... gluing).
 */
const SENTENCE_WORDS = /^(a|an|the|is|are|was|were|be|what|which|how|why|when|where|who|for|with|from|this|that|these|those|then|than|into|over|under|and|or|not|to|of|in|on|at|by|it|its|as|if|so|do|per|there|some|any|find|use|given|number|answer|solve|total|value|percent|percentage|equation|slope|function|data|point|graph|table|test|sample|chapter|problem|example|solution)\b/i;

const RICH_MATH =
  /[\^_\\≤≥≠→∞√π·×÷±°]|\bsqrt\(|\babs\(|\bcubrt\(|\\dfrac|\\tfrac|\\dfrac|f\(x\)|g\(x\)|h\(x\)|\(x\)/;

function isSentenceLine(s: string) {
  return SENTENCE_WORDS.test(s.trim());
}

function looksLikeMathSegment(seg: string) {
  const s = seg.trim();
  if (!s) return false;
  if (isSentenceLine(s)) return false;
  const tokens = s.split(/\s+/).filter(Boolean);
  if (tokens.length > 5) return false;
  if (/[\^_\\]/.test(s)) return true;
  if (/[≤≥≠→∞√π·×÷±°]/.test(s)) return true;
  if (RICH_MATH.test(s)) return true;
  if (/=/.test(s) && /[a-zA-Z]/.test(s)) return true;
  if (/^\(?-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\)?$/.test(s)) return true;
  if (/^[a-zA-Z_]+\([^)]*\)$/.test(s)) return true;
  // Short algebra expressions < 40 chars, no sentence words
  if (s.length < 40 && /^[a-zA-Z0-9\s\(\)\[\]\{\}\^_\/\+\-\*\<\>\.,\=]+$/.test(s) && /[a-zA-Z]/.test(s) && !SENTENCE_WORDS.test(s)) {
    return true;
  }
  return false;
}

/**
 * ChatGPT-style: the whole line is either TEXT (left alone) or MATH (KaTeX).
 * We never split a sentence into KaTeX pieces — that caused the glued letters.
 * Mixed lines like "The answer is 25" stay text; "f(x) = 3x + 29" becomes KaTeX.
 *
 * Extra safety: if the line contains a sentence word anywhere before the first
 * math marker, treat the whole line as text. This stops cases like
 * "40 comments initially. Each hour, comments increase by 190" from going to KaTeX.
 */
function renderLine(line: string) {
  if (!looksLikeMathSegment(line)) return <>{line}</>;
  const firstSentenceWord = line.search(SENTENCE_WORDS);
  const firstMath = line.search(/[\^_\\≤≥≠→∞√π·×÷±°=]/);
  if (firstSentenceWord !== -1 && firstMath !== -1 && firstSentenceWord < firstMath) {
    // Sentence word appears before math — likely a mixed sentence: keep as text.
    return <>{line}</>;
  }
  const norm = normalizeSegment(line.trim());
  try {
    const html = katex.renderToString(norm, { throwOnError: false, displayMode: false });
    return <span className="math-render" style={{ fontFamily: "KaTeX_Math, 'Times New Roman', serif" }} dangerouslySetInnerHTML={{ __html: html }} />;
  } catch {
    return <>{line}</>;
  }
}

function normalizeSegment(raw: string) {
  let s = raw;

  // Unicode superscripts / subscripts (from books) -> ^{..} / _{..}
  const SUP: Record<string, string> = {
    "⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9",
    "ᵃ":"a","ᵇ":"b","ᶜ":"c","ᵈ":"d","ᵉ":"e","ᶠ":"f","ᵍ":"g","ʰ":"h","ⁱ":"i","ʲ":"j","ᵏ":"k","ˡ":"l","ᵐ":"m","ⁿ":"n","ᵒ":"o","ᵖ":"p","ʳ":"r","ˢ":"s","ᵗ":"t","ᵘ":"u","ᵛ":"v","ʷ":"w","ˣ":"x","ʸ":"y","ᶻ":"z","⁺":"+","⁻":"-","⁼":"=","⁽":"(","⁾":")",
  };
  const SUB: Record<string, string> = {
    "₀":"0","₁":"1","₂":"2","₃":"3","₄":"4","₅":"5","₆":"6","₇":"7","₈":"8","₉":"9",
    "ₐ":"a","ₑ":"e","ₒ":"o","ₓ":"x","ₔ":"u","ₗ":"l","ₛ":"s","ₕ":"h","ⱼ":"j","ₖ":"k","ₙ":"n","ₚ":"p","ₜ":"t",
  };
  // Replace runs of sup chars with ^{run}
  s = s.replace(/([⁰¹²³⁴⁵⁶⁷⁸⁹ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻ⁺⁻⁼⁽⁾]+)/g, (m) => {
    let out = "";
    for (const ch of m) out += SUP[ch] ?? ch;
    return "^{" + out + "}";
  });
  s = s.replace(/([₀₁₂₃₄₅₆₇₈₉ₐₑₒₓₔₗₛₕⱼₖₙₚₜ]+)/g, (m) => {
    let out = "";
    for (const ch of m) out += SUB[ch] ?? ch;
    return "_{" + out + "}";
  });

  // Common unicode symbols -> KaTeX
  s = s.replace(/≤/g, "\\leq ");
  s = s.replace(/≥/g, "\\geq ");
  s = s.replace(/≠/g, "\\neq ");
  s = s.replace(/→/g, "\\rightarrow ");
  s = s.replace(/⇒/g, "\\Rightarrow ");
  s = s.replace(/⇑/g, "\\Uparrow ");
  s = s.replace(/⇓/g, "\\Downarrow ");
  s = s.replace(/⇔/g, "\\Leftrightarrow ");
  s = s.replace(/←/g, "\\leftarrow ");
  s = s.replace(/↑/g, "\\uparrow ");
  s = s.replace(/↓/g, "\\downarrow ");
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
  s = s.replace(/Π/g, "\\Pi ");
  s = s.replace(/Σ/g, "\\Sigma ");
  s = s.replace(/Φ/g, "\\Phi ");
  s = s.replace(/Ω/g, "\\Omega ");

  // Fractions: a/b variants (careful not to break URLs or dates — only in math segments)
  // Do simple patterns first:
  s = s.replace(/(\d+)\s*\/\s*(\d+)/g, "\\dfrac{$1}{$2}");
  // (a+b)/c style — parenthesise the numerator
  s = s.replace(/(\([^()]*\))\s*\/\s*([\w]+)/g, "\\dfrac{$1}{$2}");
  // Single-letter numerator/denominator: a/b
  s = s.replace(/(?<=[\s=+\-*/\(])([a-zA-Z])\s*\/\s*([a-zA-Z])(?![\w])/g, "$1/$2");

  // sqrt / abs / cubrt
  s = s.replace(/sqrt\((.*?)\)/g, "\\sqrt{$1}");
  s = s.replace(/cubrt\((.*?)\)/g, "\\sqrt[3]{$1}");
  s = s.replace(/abs\((.*?)\)/g, "\\left|$1\\right|");

  // intersection((0,6),(-2,1)) pretty points
  s = s.replace(/intersection\s*\(\s*\(?\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)?\s*,\s*\(?\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)?\s*\)/gi, "($1, $2), ($3, $4)");

  // Extra: ensure parentheses around points look right in KaTeX (KaTeX handles them)
  // Replace bare ^ and _ that are followed by single token without braces is fine for KaTeX.

  // Remove stray $ (if author used $...$ we already stripped via splitter? here just drop)
  s = s.replace(/\$/g, "");

  // Escape & for KaTeX? KaTeX handles & in alignments; raw & in text breaks. Replace bare & with \& in math? Keep as is for now.

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
      style={{ fontFamily: "Aptos, Inter, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}
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
