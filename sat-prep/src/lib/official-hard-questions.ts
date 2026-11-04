import prisma from "@/lib/prisma";

type CuratedHardQuestion = {
  section: "reading-writing" | "math";
  questionText: string;
  options: string;
  correctAnswer: string;
  explanation: string;
};

export type OfficialQuestionFigure =
  | {
      kind: "right-triangle";
      baseLabel: string;
      heightLabel: string;
      hypotenuseLabel?: string;
      angleLabel: string;
    }
  | {
      kind: "coordinate-circle";
      centerLabel: string;
      radiusLabel: string;
    }
  | {
      kind: "similar-triangles";
      topSegmentLabel: string;
      leftUpperLabel: string;
      leftLowerLabel: string;
      fullBaseLabel: string;
    };

const INSERT_CHUNK_SIZE = 50;

function makeOptions(values: string[]) {
  return JSON.stringify(values);
}

const OFFICIAL_HARD_QUESTION_PACK: CuratedHardQuestion[] = [
  {
    section: "math",
    questionText:
      "For real values of x, the equation 3/(x - 2) + 1/(x + 1) = 1 has two solutions. What is the sum of those solutions?",
    options: makeOptions(["3", "5", "6", "9"]),
    correctAnswer: "5",
    explanation:
      "Multiply both sides by (x - 2)(x + 1): 3(x + 1) + (x - 2) = (x - 2)(x + 1). This becomes 4x + 1 = x^2 - x - 2, so x^2 - 5x - 3 = 0. By Vieta's formulas, the sum of the solutions is 5.",
  },
  {
    section: "math",
    questionText:
      "If the equation (x + 2)^2 = kx has exactly one real solution, what is the sum of all possible values of k?",
    options: makeOptions(["4", "6", "8", "10"]),
    correctAnswer: "8",
    explanation:
      "Rewrite the equation as x^2 + (4 - k)x + 4 = 0. For exactly one real solution, the discriminant must be 0: (4 - k)^2 - 16 = 0. So k = 0 or k = 8, and their sum is 8.",
  },
  {
    section: "math",
    questionText:
      "When p(x) = 2x^3 - kx^2 + 3x - 4 is divided by x - 2, the remainder is 6. What is the value of k?",
    options: makeOptions(["2", "3", "4", "6"]),
    correctAnswer: "3",
    explanation:
      "By the Remainder Theorem, p(2) = 6. Substituting gives 16 - 4k + 6 - 4 = 6, so 18 - 4k = 6. Therefore, k = 3.",
  },
  {
    section: "math",
    questionText:
      "The graphs of y = x^2 - 6x + 10 and y = 2x + 1 intersect at two points. What is the product of the x-coordinates of those points?",
    options: makeOptions(["1", "5", "9", "12"]),
    correctAnswer: "9",
    explanation:
      "Set the equations equal: x^2 - 6x + 10 = 2x + 1, which simplifies to x^2 - 8x + 9 = 0. By Vieta's formulas, the product of the solutions is 9.",
  },
  {
    section: "math",
    questionText: "If 3^(x + 2) = 27^(x - 1), what is the value of x?",
    options: makeOptions(["3/2", "2", "5/2", "3"]),
    correctAnswer: "5/2",
    explanation:
      "Rewrite 27 as 3^3. Then 3^(x + 2) = 3^(3x - 3), so x + 2 = 3x - 3. Solving gives x = 5/2.",
  },
  {
    section: "math",
    questionText:
      "A quantity increases by 30% and then decreases by 20%. Compared with the original value, the final value is",
    options: makeOptions(["4% less", "no change", "4% greater", "10% greater"]),
    correctAnswer: "4% greater",
    explanation:
      "An increase of 30% multiplies by 1.30, and a decrease of 20% multiplies by 0.80. The combined multiplier is 1.30 x 0.80 = 1.04, so the final value is 4% greater than the original.",
  },
  {
    section: "math",
    questionText:
      "The equation of a circle in the xy-plane is x^2 + y^2 - 6x + 4y - 12 = 0. What is the radius of the circle?",
    options: makeOptions(["4", "5", "2*sqrt(7)", "sqrt(13)"]),
    correctAnswer: "5",
    explanation:
      "Complete the square: (x - 3)^2 + (y + 2)^2 = 25. The radius is the square root of 25, so the radius is 5.",
  },
  {
    section: "math",
    questionText:
      "In right triangle ABC, angle C is a right angle, AC = 9, and BC = 12. What is sin(A)?",
    options: makeOptions(["3/5", "4/5", "5/13", "12/13"]),
    correctAnswer: "4/5",
    explanation:
      "The hypotenuse is sqrt(9^2 + 12^2) = 15. For angle A, the opposite side is BC = 12, so sin(A) = 12/15 = 4/5.",
  },
  {
    section: "math",
    questionText:
      "A survey found that 40% of students take physics, 35% take calculus, and 18% take both. What percentage of students take neither course?",
    options: makeOptions(["25", "33", "43", "57"]),
    correctAnswer: "43",
    explanation:
      "Use inclusion-exclusion: 40 + 35 - 18 = 57% take at least one course. Therefore, 100 - 57 = 43% take neither.",
  },
  {
    section: "math",
    questionText:
      "If x + 1/x = 4 for some nonzero real number x, what is the value of x^2 + 1/x^2 ?",
    options: makeOptions(["8", "12", "14", "16"]),
    correctAnswer: "14",
    explanation:
      "Square both sides: (x + 1/x)^2 = x^2 + 2 + 1/x^2 = 16. So x^2 + 1/x^2 = 14.",
  },
  {
    section: "math",
    questionText:
      "In triangle ABC, point D lies on AB and point E lies on AC. If DE is parallel to BC, AD = 6, DB = 3, and DE = 8, what is the length of BC?",
    options: makeOptions(["10", "12", "14", "16"]),
    correctAnswer: "12",
    explanation:
      "Since DE is parallel to BC, triangles ADE and ABC are similar. AB = AD + DB = 9, so AD/AB = 6/9 = 2/3. Therefore DE/BC = 2/3, and BC = 8 ÷ (2/3) = 12.",
  },
  {
    section: "reading-writing",
    questionText:
      "A historian notes that a city's floodwall was once praised as a permanent solution, yet later records show that engineers repeatedly raised it as river levels changed. Which choice best states the main idea of the text?",
    options: makeOptions([
      "The floodwall was expensive to maintain because city leaders often changed their minds.",
      "The floodwall was treated as final, but later evidence suggests it required ongoing adaptation.",
      "Engineers usually prefer rebuilding structures to preserving them.",
      "River levels are impossible to measure accurately over long periods.",
    ]),
    correctAnswer:
      "The floodwall was treated as final, but later evidence suggests it required ongoing adaptation.",
    explanation:
      "The text contrasts the early view of the floodwall as permanent with later evidence that it had to be repeatedly modified. The correct answer captures both sides of that contrast without adding unsupported claims.",
  },
  {
    section: "reading-writing",
    questionText:
      "Text 1 argues that a poet's later work became more direct because the poet wanted a wider audience. Text 2 argues instead that the style changed because the poet had become less interested in elaborate metaphor. The authors of the two texts would most likely agree on which statement?",
    options: makeOptions([
      "The poet's style changed over time.",
      "The poet's earlier work was misunderstood by nearly all readers.",
      "The poet deliberately abandoned poetry altogether.",
      "The poet's widest audience preferred narrative poems to lyric poems.",
    ]),
    correctAnswer: "The poet's style changed over time.",
    explanation:
      "The two texts disagree about the reason for the change, but they both assume that the change happened. The other choices add claims neither text clearly supports.",
  },
  {
    section: "reading-writing",
    questionText:
      "A science article explains that early researchers assumed bioluminescence must serve a single dominant purpose. More recent work, however, suggests multiple functions, including attracting prey, confusing predators, and signaling to mates. As used in the article, dominant most nearly means",
    options: makeOptions(["loud", "hidden", "primary", "recent"]),
    correctAnswer: "primary",
    explanation:
      "Because the passage contrasts one supposed purpose with several actual functions, dominant most nearly means main or primary.",
  },
  {
    section: "reading-writing",
    questionText:
      "A student wants to emphasize that a new archive not only preserves old photographs but also changes how researchers study migration. Which choice most effectively uses the notes below?\n\n- The archive digitized 18,000 family photographs.\n- Researchers can now compare images from different decades quickly.\n- Scholars have used the archive to trace neighborhood movement patterns.\n- The project began as a preservation effort.",
    options: makeOptions([
      "The archive began as a preservation effort and digitized 18,000 family photographs.",
      "By digitizing 18,000 family photographs, the archive has not only preserved them but also enabled new research on neighborhood movement patterns.",
      "Scholars often compare images from different decades when they study migration.",
      "The archive includes family photographs from multiple decades and neighborhoods.",
    ]),
    correctAnswer:
      "By digitizing 18,000 family photographs, the archive has not only preserved them but also enabled new research on neighborhood movement patterns.",
    explanation:
      "The goal is to show both preservation and a research benefit. The correct answer combines those ideas directly and efficiently.",
  },
  {
    section: "reading-writing",
    questionText:
      "A passage explains that a designer first studied how commuters used a public plaza. It then describes how the designer added shaded seating and clearer walkways. Finally, it reports that the redesigned plaza drew visitors at times of day when it had previously been empty. What is the main function of the final sentence?",
    options: makeOptions([
      "It presents evidence of the redesign's effect.",
      "It questions whether the redesign should have happened.",
      "It defines a technical term used earlier in the passage.",
      "It shifts the focus from design to funding policy.",
    ]),
    correctAnswer: "It presents evidence of the redesign's effect.",
    explanation:
      "The final sentence reports an outcome after the redesign, so it functions as evidence of the redesign's effect.",
  },
  {
    section: "reading-writing",
    questionText:
      "The researcher first proposes that early mapmakers left some coastlines blank because they lacked reliable data. She later argues that those blank spaces also served a rhetorical purpose, signaling uncertainty to readers. Which transition most logically connects the two ideas?",
    options: makeOptions(["For example,", "Likewise,", "However,", "As a result,"]),
    correctAnswer: "However,",
    explanation:
      "The second sentence shifts from one explanation to a different, broader interpretation. 'However,' best marks that change in reasoning.",
  },
  {
    section: "reading-writing",
    questionText:
      "Which choice completes the text so that it conforms to the conventions of Standard English?\n\nBecause the first draft of the report included several unsupported claims, the editors requested additional evidence. ________, the final version was both shorter and better documented.",
    options: makeOptions(["Accordingly", "The result was", "As a result", "Thus being"]),
    correctAnswer: "As a result",
    explanation:
      "The second sentence is an independent clause, so it needs a transition that can introduce a full statement. 'As a result' fits grammatically and logically.",
  },
  {
    section: "reading-writing",
    questionText:
      "The ecologist writes that the wetland's recovery was uneven: plant diversity returned quickly in shallow areas, but bird populations rebounded more slowly. Which choice most logically completes the text?",
    options: makeOptions([
      "The recovery happened at different rates for different parts of the ecosystem.",
      "The wetland had fully recovered within a single season.",
      "Plant diversity mattered less than bird populations to the ecologist.",
      "The ecologist opposed further study of the wetland.",
    ]),
    correctAnswer:
      "The recovery happened at different rates for different parts of the ecosystem.",
    explanation:
      "The example of plants returning faster than birds shows that recovery was uneven across the ecosystem, not complete, value-ranked, or opposed to future study.",
  },
  {
    section: "reading-writing",
    questionText:
      "A literary critic writes that a novel's narrator often sounds certain even when the surrounding evidence is incomplete. The critic uses this point mainly to suggest that the narrator is",
    options: makeOptions([
      "deliberately unreliable",
      "secretly identical to the author",
      "unconcerned with any moral question",
      "writing for an audience of specialists only",
    ]),
    correctAnswer: "deliberately unreliable",
    explanation:
      "If a narrator sounds confident while the evidence remains incomplete, the critic is highlighting a gap between voice and truth. That most directly supports unreliability.",
  },
  {
    section: "reading-writing",
    questionText:
      "Which choice completes the text so that it conforms to the conventions of Standard English?\n\nThe set of field notes collected during the expedition, along with the photographs taken by local volunteers, ________ now housed in the regional museum.",
    options: makeOptions(["are", "is", "were", "have been"]),
    correctAnswer: "is",
    explanation:
      "The subject is 'set,' which is singular. The phrase 'along with the photographs taken by local volunteers' is interrupting information and does not change the verb.",
  },
];

export function buildOfficialHardQuestionPack() {
  return OFFICIAL_HARD_QUESTION_PACK;
}

export function getOfficialHardQuestionTextSet() {
  return new Set(
    OFFICIAL_HARD_QUESTION_PACK.map((question) => question.questionText)
  );
}

export function getOfficialQuestionFigure(
  questionText: string
): OfficialQuestionFigure | undefined {
  const figures: Record<string, OfficialQuestionFigure> = {
    "In right triangle ABC, angle C is a right angle, AC = 9, and BC = 12. What is sin(A)?":
      {
        kind: "right-triangle",
        baseLabel: "9",
        heightLabel: "12",
        hypotenuseLabel: "15",
        angleLabel: "A",
      },
    "The equation of a circle in the xy-plane is x^2 + y^2 - 6x + 4y - 12 = 0. What is the radius of the circle?":
      {
        kind: "coordinate-circle",
        centerLabel: "(3, -2)",
        radiusLabel: "r = 5",
      },
    "In triangle ABC, point D lies on AB and point E lies on AC. If DE is parallel to BC, AD = 6, DB = 3, and DE = 8, what is the length of BC?":
      {
        kind: "similar-triangles",
        topSegmentLabel: "8",
        leftUpperLabel: "6",
        leftLowerLabel: "3",
        fullBaseLabel: "BC = ?",
      },
  };

  return figures[questionText];
}

export async function ensureOfficialHardQuestionBank() {
  const questionTexts = OFFICIAL_HARD_QUESTION_PACK.map(
    (question) => question.questionText
  );
  const existing = await prisma.question.findMany({
    where: {
      questionText: {
        in: questionTexts,
      },
    },
    select: {
      questionText: true,
    },
  });

  const existingTextSet = new Set(
    existing.map((question) => question.questionText)
  );
  const missing = OFFICIAL_HARD_QUESTION_PACK.filter(
    (question) => !existingTextSet.has(question.questionText)
  );

  for (let index = 0; index < missing.length; index += INSERT_CHUNK_SIZE) {
    await prisma.question.createMany({
      data: missing.slice(index, index + INSERT_CHUNK_SIZE),
    });
  }
}
