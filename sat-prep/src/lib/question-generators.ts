export type SeedQuestion = {
  section: "reading-writing" | "math";
  questionText: string;
  options: string;
  correctAnswer: string;
  explanation: string;
};

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildOptions(correct: string, distractors: string[]) {
  return JSON.stringify(shuffle([correct, ...distractors.slice(0, 3)]));
}

const VOCAB_SCENARIOS: Array<{
  questionText: string;
  correct: string;
  distractors: string[];
}> = [
  { questionText: "The curator described the recovered manuscript as ________, because it revealed details historians had never seen before.", correct: "illuminating", distractors: ["fragile", "ordinary", "obsolete"] },
  { questionText: "Because the scientist remained ________ in the face of criticism, the team continued the experiment with confidence.", correct: "resolute", distractors: ["hesitant", "casual", "unclear"] },
  { questionText: "The coach's halftime speech was so ________ that the team returned to the field with renewed energy.", correct: "inspiring", distractors: ["uncertain", "routine", "muted"] },
  { questionText: "The novelist's style is often called ________ because it uses only the words necessary to create a vivid effect.", correct: "economical", distractors: ["chaotic", "ornamental", "confusing"] },
  { questionText: "Archaeologists considered the site ________ since it had remained untouched for centuries.", correct: "pristine", distractors: ["crowded", "temporary", "artificial"] },
  { questionText: "The committee rejected the proposal as ________, noting that its main claim was unsupported by data.", correct: "speculative", distractors: ["definitive", "practical", "transparent"] },
  { questionText: "Her explanation was so ________ that even complex ideas felt easy to follow.", correct: "lucid", distractors: ["vague", "harsh", "abrupt"] },
  { questionText: "The mayor's response to the crisis was widely praised as ________ because it balanced speed with caution.", correct: "measured", distractors: ["reckless", "delayed", "careless"] },
  { questionText: "Researchers called the pattern ________ when it appeared again and again across multiple studies.", correct: "consistent", distractors: ["accidental", "isolated", "questionable"] },
  { questionText: "The museum's latest exhibit offers a ________ look at migration by combining maps, letters, and oral histories.", correct: "multifaceted", distractors: ["narrow", "skeptical", "simplistic"] },
];

const TRANSITION_SCENARIOS: Array<{
  before: string;
  after: string;
  correct: string;
  distractors: string[];
}> = [
  { before: "The new recycling program reduced waste in its first month.", after: "________, city officials decided to expand it to every neighborhood.", correct: "As a result", distractors: ["Nevertheless", "For instance", "By contrast"] },
  { before: "The author presents several strong claims in the essay.", after: "________, the final paragraph lacks evidence to support its conclusion.", correct: "However", distractors: ["Similarly", "Therefore", "For example"] },
  { before: "Solar energy has become more affordable in recent years.", after: "________, more homeowners are choosing to install rooftop panels.", correct: "Consequently", distractors: ["Instead", "Meanwhile", "For example"] },
  { before: "The first experiment produced promising results.", after: "________, the researchers repeated it with a larger sample to confirm the pattern.", correct: "Therefore", distractors: ["Otherwise", "In contrast", "Specifically"] },
  { before: "The sculpture appears simple from a distance.", after: "________, up close it reveals layers of intricate detail.", correct: "Yet", distractors: ["Likewise", "For example", "As a result"] },
  { before: "The school added more tutoring sessions after class.", after: "________, attendance at the sessions doubled within two weeks.", correct: "Soon after", distractors: ["On the other hand", "For example", "Instead"] },
  { before: "The article explains how coral reefs support marine ecosystems.", after: "________, it describes the threats those reefs now face.", correct: "It also", distractors: ["Instead", "Even so", "For example"] },
  { before: "Some historians focus on economic causes of the conflict.", after: "________, others argue that political tension mattered more.", correct: "By contrast", distractors: ["As a result", "For example", "Likewise"] },
  { before: "The team revised the schedule to reduce delays.", after: "________, the project finished ahead of deadline.", correct: "As a result", distractors: ["In particular", "Similarly", "Nevertheless"] },
  { before: "The passage defines the term in the opening sentence.", after: "________, the next paragraph shows how it works in practice.", correct: "Then", distractors: ["However", "Despite this", "On the contrary"] },
];

const GRAMMAR_SCENARIOS: Array<{
  questionText: string;
  correct: string;
  distractors: string[];
  explanation: string;
}> = [
  { questionText: "Each of the researchers ________ responsible for recording the data accurately.", correct: "is", distractors: ["are", "were", "have been"], explanation: "The subject is 'Each,' which is singular, so the singular verb 'is' is required." },
  { questionText: "The students who joined the robotics club ________ meeting after school today.", correct: "are", distractors: ["is", "was", "has"], explanation: "The plural subject 'students' needs the plural verb 'are'." },
  { questionText: "Neither the teacher nor the assistants ________ ready to begin the presentation.", correct: "were", distractors: ["was", "is", "has been"], explanation: "In a neither/nor structure, the verb agrees with the closer noun. 'Assistants' is plural, so 'were' is correct." },
  { questionText: "The book, along with several articles, ________ on the desk near the window.", correct: "is", distractors: ["are", "were", "have been"], explanation: "'Along with several articles' is extra information. The main subject 'book' is singular." },
  { questionText: "If the museum closes early, we ________ return tomorrow instead.", correct: "will", distractors: ["would", "have", "had"], explanation: "A real future condition takes present tense in the if-clause and 'will' in the result." },
  { questionText: "Maria has been practicing the violin ________ two years.", correct: "for", distractors: ["since", "from", "during"], explanation: "'For' is used with a duration of time." },
  { questionText: "The committee decided ________ the policy before making a final recommendation.", correct: "to revise", distractors: ["revise", "revising", "revised"], explanation: "After 'decided,' English uses the infinitive form 'to revise.'" },
  { questionText: "Because the hallway was crowded, the principal asked students ________ in a single line.", correct: "to wait", distractors: ["wait", "waiting", "waited"], explanation: "'Asked' is followed by the infinitive in this construction: 'asked students to wait.'" },
  { questionText: "The documentary was ________ than critics had expected, so it quickly gained attention.", correct: "more compelling", distractors: ["most compelling", "compellingly", "compeller"], explanation: "A comparison between two situations needs the comparative form 'more compelling.'" },
  { questionText: "Although the speech was brief, it was remarkably ________ in its impact.", correct: "effective", distractors: ["effect", "effectively", "effectiveness"], explanation: "After 'was,' the sentence needs an adjective describing the speech: 'effective.'" },
];

function buildReadingExpansions(): SeedQuestion[] {
  const vocabularyQuestions = VOCAB_SCENARIOS.map(({ questionText, correct, distractors }) => ({
    section: "reading-writing" as const,
    questionText,
    options: buildOptions(correct, distractors as string[]),
    correctAnswer: correct,
    explanation: `The context points to '${correct}' as the most precise word choice.`
  }));

  const transitionQuestions = TRANSITION_SCENARIOS.map(({ before, after, correct, distractors }) => ({
    section: "reading-writing" as const,
    questionText: `${before} ${after}`,
    options: buildOptions(correct, distractors as string[]),
    correctAnswer: correct,
    explanation: `The second sentence ${String(correct).toLowerCase().includes("contrast") || correct === "However" || correct === "Yet" ? "changes direction or contrasts with" : "logically continues"} the first one, so '${correct}' fits best.`
  }));

  const grammarQuestions = GRAMMAR_SCENARIOS.map(({ questionText, correct, distractors, explanation }) => ({
    section: "reading-writing" as const,
    questionText,
    options: buildOptions(correct, distractors as string[]),
    correctAnswer: correct,
    explanation: String(explanation)
  }));

  return [...vocabularyQuestions, ...transitionQuestions, ...grammarQuestions];
}

function buildGeometryQuestions() {
  return Array.from({ length: 20 }, (_, index) => {
    const variant = index % 5;

    if (variant === 0) {
      const length = 6 + index;
      const width = 3 + (index % 4);
      const area = length * width;
      return {
        section: "math" as const,
        questionText: `What is the area of a rectangle with length ${length} and width ${width}?`,
        options: buildOptions(String(area), [String(area + width), String(area - width), String(length + width)]),
        correctAnswer: String(area),
        explanation: `Area of a rectangle is length × width, so ${length} × ${width} = ${area}.`
      };
    }

    if (variant === 1) {
      const base = 8 + index;
      const height = 4 + (index % 3);
      const area = (base * height) / 2;
      return {
        section: "math" as const,
        questionText: `A triangle has base ${base} and height ${height}. What is its area?`,
        options: buildOptions(String(area), [String(base * height), String(area + height), String(base + height)]),
        correctAnswer: String(area),
        explanation: `Triangle area is 1/2 × base × height = 1/2 × ${base} × ${height} = ${area}.`
      };
    }

    if (variant === 2) {
      const radius = 3 + (index % 6);
      return {
        section: "math" as const,
        questionText: `A circle has radius ${radius}. What is its circumference?`,
        options: buildOptions(`${2 * radius}π`, [`${radius}π`, `${radius * radius}π`, `${4 * radius}π`]),
        correctAnswer: `${2 * radius}π`,
        explanation: `Circumference is 2πr, so 2π(${radius}) = ${2 * radius}π.`
      };
    }

    if (variant === 3) {
      const leg = 3 + (index % 5);
      const other = 4 + (index % 5);
      const hyp = Math.sqrt(leg * leg + other * other);
      return {
        section: "math" as const,
        questionText: `A right triangle has legs ${leg} and ${other}. What is the hypotenuse?`,
        options: buildOptions(String(hyp), [String(leg + other), String(hyp + 1), String(hyp - 1)]),
        correctAnswer: String(hyp),
        explanation: `Use the Pythagorean theorem: c² = ${leg}² + ${other}² = ${leg * leg + other * other}, so c = ${hyp}.`
      };
    }

    const side = 2 + (index % 5);
    const volume = side ** 3;
    return {
      section: "math" as const,
      questionText: `What is the volume of a cube with side length ${side}?`,
      options: buildOptions(String(volume), [String(side ** 2), String(volume + side), String(volume - side)]),
      correctAnswer: String(volume),
      explanation: `Volume of a cube is side³, so ${side}³ = ${volume}.`
    };
  });
}

function buildFunctionQuestions() {
  return Array.from({ length: 24 }, (_, index) => {
    const variant = index % 4;

    if (variant === 0) {
      const a = 2 + (index % 4);
      const b = 1 + (index % 6);
      const x = 3 + (index % 5);
      const value = a * x + b;
      return {
        section: "math" as const,
        questionText: `If f(x) = ${a}x + ${b}, what is f(${x})?`,
        options: buildOptions(String(value), [String(value + a), String(value - b), String(a + b + x)]),
        correctAnswer: String(value),
        explanation: `Substitute ${x} for x: ${a}(${x}) + ${b} = ${value}.`
      };
    }

    if (variant === 1) {
      const x1 = 1 + (index % 4);
      const y1 = 2 + index;
      const x2 = x1 + 3;
      const y2 = y1 + 6;
      return {
        section: "math" as const,
        questionText: `What is the slope of the line through (${x1}, ${y1}) and (${x2}, ${y2})?`,
        options: buildOptions("2", ["3", "1", "6"]),
        correctAnswer: "2",
        explanation: `Slope = (y₂ - y₁) / (x₂ - x₁) = (${y2} - ${y1}) / (${x2} - ${x1}) = 6 / 3 = 2.`
      };
    }

    if (variant === 2) {
      const intercept = 1 + (index % 7);
      const slope = 2 + (index % 3);
      return {
        section: "math" as const,
        questionText: `Which equation has slope ${slope} and y-intercept ${intercept}?`,
        options: buildOptions(`y = ${slope}x + ${intercept}`, [`y = ${intercept}x + ${slope}`, `y = ${slope}x - ${intercept}`, `x = ${slope}y + ${intercept}`]),
        correctAnswer: `y = ${slope}x + ${intercept}`,
        explanation: `Slope-intercept form is y = mx + b, where m is the slope and b is the y-intercept.`
      };
    }

    const output = 3 + index;
    const input = 1 + (index % 5);
    const rule = output - input;
    return {
      section: "math" as const,
      questionText: `A function adds ${rule} to its input. What is the output when the input is ${input}?`,
      options: buildOptions(String(output), [String(output + 1), String(output - 1), String(input + rule + 2)]),
      correctAnswer: String(output),
      explanation: `Adding ${rule} to ${input} gives ${output}.`
    };
  });
}

function buildStatisticsQuestions() {
  return Array.from({ length: 15 }, (_, index) => {
    const variant = index % 3;

    if (variant === 0) {
      const numbers = [4 + index, 6 + index, 8 + index];
      const mean = (numbers[0] + numbers[1] + numbers[2]) / 3;
      return {
        section: "math" as const,
        questionText: `What is the mean of ${numbers.join(", ")}?`,
        options: buildOptions(String(mean), [String(mean - 1), String(mean + 1), String(numbers[1])]),
        correctAnswer: String(mean),
        explanation: `Add the values and divide by 3. (${numbers.join(" + ")}) / 3 = ${mean}.`
      };
    }

    if (variant === 1) {
      const red = 3 + (index % 4);
      const blue = 2 + (index % 3);
      return {
        section: "math" as const,
        questionText: `A bag has ${red} red marbles and ${blue} blue marbles. What is the probability of drawing a red marble?`,
        options: buildOptions(`${red}/${red + blue}`, [`${blue}/${red + blue}`, `${red}/${blue}`, `${red + blue}/${red}`]),
        correctAnswer: `${red}/${red + blue}`,
        explanation: `Probability = favorable outcomes / total outcomes = ${red} / ${red + blue}.`
      };
    }

    const low = 10 + index;
    const high = low + 12;
    return {
      section: "math" as const,
      questionText: `If the lowest value in a data set is ${low} and the highest value is ${high}, what is the range?`,
      options: buildOptions(String(high - low), [String(high + low), String(high - low + 2), String(high - low - 2)]),
      correctAnswer: String(high - low),
      explanation: `Range = highest value - lowest value = ${high} - ${low} = ${high - low}.`
    };
  });
}

function buildWordApplicationQuestions() {
  return Array.from({ length: 15 }, (_, index) => {
    const variant = index % 3;

    if (variant === 0) {
      const original = 60 + index * 5;
      const percent = 20;
      const sale = original * 0.8;
      return {
        section: "math" as const,
        questionText: `A jacket costs $${original} and is discounted by ${percent}%. What is the sale price?`,
        options: buildOptions(`$${sale}`, [`$${original * 0.2}`, `$${sale + 10}`, `$${original - 5}`]),
        correctAnswer: `$${sale}`,
        explanation: `A 20% discount means paying 80% of the price. 0.8 × ${original} = ${sale}.`
      };
    }

    if (variant === 1) {
      const pagesPerDay = 20 + index;
      const days = 6;
      const total = pagesPerDay * days;
      return {
        section: "math" as const,
        questionText: `If a student reads ${pagesPerDay} pages each day, how many pages will they read in ${days} days?`,
        options: buildOptions(String(total), [String(total + pagesPerDay), String(total - pagesPerDay), String(days + pagesPerDay)]),
        correctAnswer: String(total),
        explanation: `Multiply rate by time: ${pagesPerDay} × ${days} = ${total}.`
      };
    }

    const totalDistance = 180 + index * 10;
    const speed = 30 + (index % 4) * 5;
    const hours = totalDistance / speed;
    return {
      section: "math" as const,
      questionText: `A car travels ${totalDistance} miles at a constant speed of ${speed} mph. How many hours does the trip take?`,
      options: buildOptions(String(hours), [String(hours + 1), String(hours - 1), String(speed / 5)]),
      correctAnswer: String(hours),
      explanation: `Time = distance / speed = ${totalDistance} / ${speed} = ${hours}.`
    };
  });
}

export function buildExpansionQuestionPack(): SeedQuestion[] {
  return [
    ...buildReadingExpansions(),
    ...buildGeometryQuestions(),
    ...buildFunctionQuestions(),
    ...buildStatisticsQuestions(),
    ...buildWordApplicationQuestions(),
  ];
}
