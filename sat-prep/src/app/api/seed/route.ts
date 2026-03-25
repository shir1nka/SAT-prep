import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from '@/lib/prisma';
import { isAdminEmail } from '@/lib/admin';
import { buildExpansionQuestionPack } from "@/lib/question-generators";
import {
  enforceRateLimit,
  ensureSameOrigin,
  jsonWithSecurityHeaders,
} from "@/lib/security";

const SEED_INSERT_CHUNK_SIZE = 100;

const readingQuestions = [
  {
    section: "reading-writing",
    questionText: "While the ancient library of Alexandria is renowned for its vast collection, its destruction was ________, likely occurring over centuries rather than in a single catastrophic fire.",
    options: JSON.stringify(["clandestine", "gradual", "fortuitous", "immediate"]),
    correctAnswer: "gradual",
    explanation: "The phrase 'occurring over centuries rather than in a single catastrophic fire' indicates a slow process, making 'gradual' the correct word."
  },
  {
    section: "reading-writing",
    questionText: "Despite his reputation for being ________, the CEO occasionally surprised his employees with grand gestures of generosity.",
    options: JSON.stringify(["magnanimous", "frugal", "gregarious", "innovative"]),
    correctAnswer: "frugal",
    explanation: "The word 'Despite' introduces a contrast to 'generosity.' 'Frugal' (sparing or economical) provides the necessary contrast."
  },
  {
    section: "reading-writing",
    questionText: "In the 1920s, the Harlem Renaissance produced a remarkable outpouring of African American literature and art. ________, it fostered intellectual discussions about civil rights.",
    options: JSON.stringify(["However", "For example", "Furthermore", "Instead"]),
    correctAnswer: "Furthermore",
    explanation: "The second sentence adds another positive outcome of the Harlem Renaissance (fostering discussions), so 'Furthermore' logically connects the ideas."
  },
  {
    section: "reading-writing",
    questionText: "The function of the heart is to pump blood throughout the body. The blood ________ oxygen to the body's cells.",
    options: JSON.stringify(["carry", "carries", "carrying", "have carried"]),
    correctAnswer: "carries",
    explanation: "The subject 'blood' is singular, so the singular verb 'carries' is required."
  },
  {
    section: "reading-writing",
    questionText: "Walking through the dense forest, the ancient ruins were finally discovered by the archaeologists.",
    options: JSON.stringify([
      "NO CHANGE", 
      "Walking through the dense forest, the archaeologists finally discovered the ancient ruins.", 
      "The ancient ruins were finally discovered by the archaeologists walking through the dense forest.", 
      "The archaeologists finally discovered the ancient ruins walking through the dense forest."
    ]),
    correctAnswer: "Walking through the dense forest, the archaeologists finally discovered the ancient ruins.",
    explanation: "The introductory modifier 'Walking through the dense forest' must be followed immediately by the noun performing the action (the archaeologists)."
  },
  {
    section: "reading-writing",
    questionText: "Dr. Smith, ________ discovered the new species of beetle, is speaking at the conference tomorrow.",
    options: JSON.stringify(["who", "whom", "which", "that"]),
    correctAnswer: "who",
    explanation: "'Who' is the correct relative pronoun for a person acting as the subject of the dependent clause."
  },
  {
    section: "reading-writing",
    questionText: "If the project is not completed by Friday, the client ________ the contract.",
    options: JSON.stringify(["cancel", "cancelled", "will cancel", "canceling"]),
    correctAnswer: "will cancel",
    explanation: "This is a first conditional sentence. The 'if' clause is present tense, so the main clause needs the future tense 'will cancel'."
  },
  {
    section: "reading-writing",
    questionText: "Neither the manager nor the employees ________ aware of the updated security protocols.",
    options: JSON.stringify(["was", "were", "is", "has been"]),
    correctAnswer: "were",
    explanation: "In a 'neither/nor' construction, the verb agrees with the closer noun. 'Employees' is plural, so 'were' is correct."
  },
  {
    section: "reading-writing",
    questionText: "The new software is ________ than the previous version, allowing users to complete tasks in half the time.",
    options: JSON.stringify(["more efficient", "most efficient", "efficienter", "efficiently"]),
    correctAnswer: "more efficient",
    explanation: "When comparing two things (new version vs. previous version), the comparative form 'more efficient' is used for adjectives with three or more syllables."
  },
  {
    section: "reading-writing",
    questionText: "She has been studying Spanish ________ three years.",
    options: JSON.stringify(["since", "for", "during", "in"]),
    correctAnswer: "for",
    explanation: "'For' is used with a duration of time ('three years'). 'Since' would be used with a specific starting point (e.g., 'since 2020')."
  }
];

function generateLinearEquation() {
  const a = Math.floor(Math.random() * 8) + 2;
  const x = Math.floor(Math.random() * 20) - 10;
  const b = Math.floor(Math.random() * 20) - 10;
  const c = a * x + b;
  const sign = b >= 0 ? '+' : '-';
  const displayB = Math.abs(b);
  const ans = x.toString();
  let options = new Set<string>();
  options.add(ans);
  while(options.size < 4) {
    let offset = Math.floor(Math.random() * 5) + 1;
    if (Math.random() > 0.5) offset *= -1;
    options.add((x + offset).toString());
  }
  const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5);

  return {
    section: "math",
    questionText: `If ${a}x ${sign} ${displayB} = ${c}, what is the value of x?`,
    options: JSON.stringify(shuffledOptions),
    correctAnswer: ans,
    explanation: `Subtract ${b} from both sides to get ${a}x = ${c - b}. Then divide by ${a} to get x = ${x}.`
  };
}

function generateSystemOfEquations() {
  const x = Math.floor(Math.random() * 10) + 1;
  const y = Math.floor(Math.random() * 10) + 1;
  const a = x + y;
  const b = x - y;
  const askForX = Math.random() > 0.5;
  const ans = askForX ? x : y;
  const targetVar = askForX ? 'x' : 'y';
  let options = new Set<string>();
  options.add(ans.toString());
  while(options.size < 4) {
    let offset = Math.floor(Math.random() * 6) + 1;
    options.add((ans + offset).toString());
    options.add((Math.abs(ans - offset)).toString());
  }
  const finalOpts = Array.from(options).slice(0, 4).sort(() => Math.random() - 0.5);

  return {
    section: "math",
    questionText: `Given the system of equations:\nx + y = ${a}\nx - y = ${b}\nWhat is the value of ${targetVar}?`,
    options: JSON.stringify(finalOpts),
    correctAnswer: ans.toString(),
    explanation: `Adding the two equations gives 2x = ${a + b}, so x = ${(a+b)/2}. Subtracting the second from the first gives 2y = ${a - b}, so y = ${(a-b)/2}. The value of ${targetVar} is ${ans}.`
  };
}

function generateQuadraticEquation() {
  const r1 = Math.floor(Math.random() * 10) - 5;
  const r2 = Math.floor(Math.random() * 10) + 1;
  const b = -(r1 + r2);
  const c = r1 * r2;
  const bStr = b === 0 ? "" : (b === 1 ? "+ x" : (b === -1 ? "- x" : (b > 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`)));
  const cStr = c === 0 ? "" : (c > 0 ? `+ ${c}` : `- ${Math.abs(c)}`);
  const ans = `${Math.min(r1, r2)} and ${Math.max(r1, r2)}`;
  let options = new Set<string>();
  options.add(ans);
  while(options.size < 4) {
    const w1 = r1 + Math.floor(Math.random() * 4) + 1;
    const w2 = r2 - Math.floor(Math.random() * 4) - 1;
    options.add(`${Math.min(w1, w2)} and ${Math.max(w1, w2)}`);
  }
  const finalOpts = Array.from(options).slice(0, 4).sort(() => Math.random() - 0.5);

  return {
    section: "math",
    questionText: `What are the solutions to the equation x² ${bStr} ${cStr} = 0?`,
    options: JSON.stringify(finalOpts),
    correctAnswer: ans,
    explanation: `Factor the quadratic to (x - ${r1})(x - ${r2}) = 0. Setting each factor to 0 gives x = ${r1} and x = ${r2}.`
  };
}

function generatePercentage() {
  const isFindingPercent = Math.random() > 0.5;
  if (isFindingPercent) {
    const percent = (Math.floor(Math.random() * 10) + 1) * 5;
    const whole = (Math.floor(Math.random() * 20) + 2) * 10;
    const part = (percent / 100) * whole;
    const ans = percent.toString() + "%";
    let options = new Set<string>();
    options.add(ans);
    options.add((percent + 5) + "%");
    options.add((percent - 5) + "%");
    options.add((percent * 2) + "%");
    options.add((percent / 2) + "%");
    const finalOpts = Array.from(options).slice(0, 4).sort(() => Math.random() - 0.5);
    return {
      section: "math",
      questionText: `If ${part} is what percent of ${whole}?`,
      options: JSON.stringify(finalOpts),
      correctAnswer: ans,
      explanation: `Divide the part by the whole: ${part} / ${whole} = ${percent / 100}. Multiply by 100 to get ${percent}%.`
    };
  } else {
    const percent = (Math.floor(Math.random() * 15) + 1) * 10;
    const whole = (Math.floor(Math.random() * 10) + 2) * 50;
    const part = (percent / 100) * whole;
    const ans = part.toString();
    let options = new Set<string>();
    options.add(ans);
    options.add((part * 1.1).toFixed(0).toString());
    options.add((part * 0.9).toFixed(0).toString());
    options.add((part + 10).toString());
    options.add((part - 10).toString());
    const finalOpts = Array.from(options).slice(0, 4).sort(() => Math.random() - 0.5);
    return {
      section: "math",
      questionText: `What is ${percent}% of ${whole}?`,
      options: JSON.stringify(finalOpts),
      correctAnswer: ans,
      explanation: `Convert the percentage to a decimal (${percent / 100}) and multiply by ${whole}: ${percent / 100} * ${whole} = ${part}.`
    };
  }
}

export async function POST(req: NextRequest) {
  const originResponse = ensureSameOrigin(req);
  if (originResponse) {
    return originResponse;
  }

  const rateLimitResponse = enforceRateLimit(req, {
    bucket: "seed-admin",
    max: 3,
    windowMs: 60 * 60_000,
  });
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  });

  if (!isAdminEmail(token?.email)) {
    return jsonWithSecurityHeaders({ error: "Unauthorized. Admin only." }, 401);
  }

  try {
    let allQuestions = [...readingQuestions];
    for(let i=0; i<40; i++) allQuestions.push(generateLinearEquation());
    for(let i=0; i<20; i++) allQuestions.push(generateSystemOfEquations());
    for(let i=0; i<20; i++) allQuestions.push(generateQuadraticEquation());
    for(let i=0; i<15; i++) allQuestions.push(generatePercentage());
    allQuestions.push(...buildExpansionQuestionPack());

    await prisma.question.deleteMany();

    for (let i = 0; i < allQuestions.length; i += SEED_INSERT_CHUNK_SIZE) {
      const chunk = allQuestions.slice(i, i + SEED_INSERT_CHUNK_SIZE);
      await prisma.question.createMany({
        data: chunk,
      });
    }
    
    return jsonWithSecurityHeaders({
      message: `Successfully seeded ${allQuestions.length} questions!`,
    });
  } catch (error: any) {
    return jsonWithSecurityHeaders({ error: error.message }, 500);
  }
}
