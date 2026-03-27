import {
  localized as t,
  question,
  skill,
  unit,
  type LearnCourse,
  type LearnQuestion,
  type LearnSkill,
  type LearnUnit,
  type LocalizedText,
  type SkillStatus,
} from "./sat-learn-base";
import { MATH_EXPANSION_BUILDERS } from "./sat-learn-expansion-math";
import { VERBAL_EXPANSION_BUILDERS } from "./sat-learn-expansion-verbal";

export type PracticeMode = {
  slug: string;
  kind: "practice" | "challenge";
  label: LocalizedText;
  summaryAddon: LocalizedText;
  note: LocalizedText;
  lessonAddon: LocalizedText;
  strategyAddon: LocalizedText;
  checkpoint: LocalizedText;
  status: SkillStatus;
  minutesDelta: number;
  difficulties: Array<LearnQuestion["difficulty"]>;
};

export type QuestionBuilder = (
  seed: number,
  mode: PracticeMode,
  skillId: string
) => LearnQuestion[];

const PRACTICE_MODES: PracticeMode[] = [
  {
    slug: "warmup",
    kind: "practice",
    label: t("Warm-up studio", "Разминка"),
    summaryAddon: t(
      "Slow the pace down and rebuild the move with clean setup and calm accuracy.",
      "Сбавь темп и заново собери приём через чистую запись и спокойную точность."
    ),
    note: t(
      "This round is for reading the structure carefully before speeding up.",
      "Этот раунд нужен, чтобы сначала увидеть структуру, а уже потом ускоряться."
    ),
    lessonAddon: t(
      "Move line by line and say why each step is legal.",
      "Иди по шагам и проговаривай, почему каждый переход допустим."
    ),
    strategyAddon: t(
      "If a step feels automatic, pause once and name the reason out loud.",
      "Если шаг кажется автоматическим, один раз остановись и назови его причину вслух."
    ),
    checkpoint: t(
      "Clean setup beats rushed work.",
      "Чистая настройка сильнее, чем спешка."
    ),
    status: "familiar",
    minutesDelta: 1,
    difficulties: ["core", "core", "challenge"],
  },
  {
    slug: "applied",
    kind: "practice",
    label: t("Applied set", "Прикладной сет"),
    summaryAddon: t(
      "Push the idea into context so the learner has to translate, not just repeat a rule.",
      "Перенеси идею в контекст, чтобы ученик не просто повторял правило, а переводил условие в модель."
    ),
    note: t(
      "These items hide the same skill inside a short scenario.",
      "Здесь тот же навык спрятан внутри короткой ситуации."
    ),
    lessonAddon: t(
      "Label what each number, clause, or sentence is doing before you answer.",
      "Подпиши роль каждого числа, clause или предложения до ответа."
    ),
    strategyAddon: t(
      "Translate the situation first, then run the method.",
      "Сначала переведи ситуацию в понятную модель, потом запускай метод."
    ),
    checkpoint: t(
      "If you cannot name the relationship, you are not ready to calculate.",
      "Если ты не можешь назвать связь, значит ещё рано считать."
    ),
    status: "attempted",
    minutesDelta: 2,
    difficulties: ["core", "challenge", "challenge"],
  },
  {
    slug: "precision",
    kind: "practice",
    label: t("Precision lab", "Лаборатория точности"),
    summaryAddon: t(
      "Train against common traps, half-right answers, and tempting shortcuts.",
      "Тренируйся против частых ловушек, наполовину верных ответов и соблазнительных сокращений."
    ),
    note: t(
      "This set is built to catch the exact place where accuracy usually slips.",
      "Этот сет собран так, чтобы поймать точку, где точность обычно ломается."
    ),
    lessonAddon: t(
      "Check signs, comparison words, and sentence purpose before committing.",
      "Проверь знаки, слова сравнения и функцию предложения, прежде чем фиксировать ответ."
    ),
    strategyAddon: t(
      "Before locking the answer, ask what trap the test writer wanted.",
      "Перед фиксацией ответа спроси себя, какую ловушку хотел поставить автор теста."
    ),
    checkpoint: t(
      "A half-right answer is still wrong if it misses scope or structure.",
      "Наполовину верный ответ всё равно ошибочный, если он промахивается по охвату или структуре."
    ),
    status: "not_started",
    minutesDelta: 3,
    difficulties: ["challenge", "challenge", "mastery"],
  },
  {
    slug: "challenge",
    kind: "challenge",
    label: t("Challenge sprint", "Сложный спринт"),
    summaryAddon: t(
      "Raise the pressure and make the learner choose an efficient method under time.",
      "Подними давление и заставь ученика выбирать эффективный метод под временем."
    ),
    note: t(
      "Now the task is not only to solve, but to solve with control.",
      "Теперь задача не просто решить, а решить под контролем."
    ),
    lessonAddon: t(
      "Start by asking what must be found and what can safely stay uncomputed.",
      "Начинай с вопроса: что именно нужно найти и что можно безопасно не вычислять до конца."
    ),
    strategyAddon: t(
      "Look for the shortest reliable path before you do any heavy work.",
      "Ищи самый короткий надёжный путь раньше, чем начнёшь тяжёлую работу."
    ),
    checkpoint: t(
      "Speed grows from recognition, not panic.",
      "Скорость растёт из распознавания, а не из паники."
    ),
    status: "not_started",
    minutesDelta: 4,
    difficulties: ["challenge", "challenge", "mastery"],
  },
  {
    slug: "mastery",
    kind: "challenge",
    label: t("Mastery stretch", "Mastery-раунд"),
    summaryAddon: t(
      "Finish with a harder drill that checks depth, not just familiarity.",
      "Заверши более жёсткой тренировкой, которая проверяет глубину понимания, а не просто знакомство."
    ),
    note: t(
      "Treat this like a checkpoint you earn after reading carefully.",
      "Отнесись к этому как к checkpoint, который нужно заслужить внимательным чтением."
    ),
    lessonAddon: t(
      "At mastery level, explain why the wrong answers fail, not only why the right one works.",
      "На mastery-уровне объясняй, почему неверные ответы не работают, а не только почему работает правильный."
    ),
    strategyAddon: t(
      "For every item, identify one reason the tempting distractor fails.",
      "Для каждого задания назови хотя бы одну причину, по которой привлекательный distractor не подходит."
    ),
    checkpoint: t(
      "Deep understanding means you can defend the correct answer against look-alikes.",
      "Глубокое понимание значит, что ты можешь защитить правильный ответ от очень похожих вариантов."
    ),
    status: "not_started",
    minutesDelta: 5,
    difficulties: ["challenge", "mastery", "mastery"],
  },
];

const QUESTION_BUILDERS: Record<string, QuestionBuilder> = {
  ...MATH_EXPANSION_BUILDERS,
  ...VERBAL_EXPANSION_BUILDERS,
};

export function expandLearnCourse(course: LearnCourse) {
  const normalizedUnits = course.units.map((courseUnit) =>
    unit({
      ...courseUnit,
      kind: courseUnit.skills.length === 0 ? "intro" : "core",
    })
  );

  const skillEntries = normalizedUnits.flatMap((courseUnit) =>
    courseUnit.skills.map((courseSkill) => ({
      unit: courseUnit,
      skill: courseSkill,
    }))
  );

  const generatedUnits = skillEntries.flatMap((entry, skillIndex) =>
    PRACTICE_MODES.map((mode, modeIndex) =>
      buildGeneratedUnit({
        courseId: course.id,
        baseUnit: entry.unit,
        baseSkill: entry.skill,
        mode,
        order: normalizedUnits.length + skillIndex * PRACTICE_MODES.length + modeIndex + 1,
        seed: skillIndex * PRACTICE_MODES.length + modeIndex + 3,
      })
    )
  );

  return {
    ...course,
    units: [...normalizedUnits, ...generatedUnits],
  };
}

function buildGeneratedUnit({
  courseId,
  baseUnit,
  baseSkill,
  mode,
  order,
  seed,
}: {
  courseId: string;
  baseUnit: LearnUnit;
  baseSkill: LearnSkill;
  mode: PracticeMode;
  order: number;
  seed: number;
}) {
  const generatedSkillId = `${baseSkill.id}-${mode.slug}`;
  const buildQuestions = QUESTION_BUILDERS[baseSkill.id] ?? buildFallbackQuestions;
  const checkpoints = [
    ...baseSkill.checkpoints.slice(0, 2),
    mode.checkpoint,
    baseSkill.checkpoints[baseSkill.checkpoints.length - 1] ?? mode.checkpoint,
  ].filter((item, index, current) => current.findIndex((entry) => entry.en === item.en) === index);

  return unit({
    id: `${courseId}-${generatedSkillId}`,
    order,
    title: withSuffix(baseSkill.shortTitle, mode.label),
    summary: joinText(baseSkill.summary, mode.summaryAddon),
    note: joinText(baseUnit.note, mode.note),
    kind: mode.kind,
    hasQuiz: true,
    hasUnitTest: mode.kind === "challenge",
    skills: [
      skill({
        id: generatedSkillId,
        title: withSuffix(baseSkill.title, mode.label),
        shortTitle: withSuffix(baseSkill.shortTitle, mode.label),
        summary: joinText(baseSkill.summary, mode.summaryAddon),
        lesson: joinText(baseSkill.lesson, mode.lessonAddon),
        strategy: joinText(baseSkill.strategy, mode.strategyAddon),
        checkpoints,
        example: {
          prompt: baseSkill.example.prompt,
          answer: baseSkill.example.answer,
          explanation: joinText(baseSkill.example.explanation, mode.note),
        },
        quiz: buildQuestions(seed, mode, generatedSkillId),
        status: mode.status,
        minutes: Math.max(8, baseSkill.minutes + mode.minutesDelta),
      }),
    ],
  });
}

function buildFallbackQuestions(seed: number, mode: PracticeMode, skillId: string) {
  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        "Which move best matches the main idea of this drill?",
        "Какой ход лучше всего соответствует главной идее этого задания?"
      ),
      options: [
        t("Read the structure first and then answer", "Сначала прочитать структуру, а потом отвечать"),
        t("Rush to the first answer that looks familiar", "Сразу броситься к первому знакомому ответу"),
        t("Ignore the wording and guess", "Игнорировать формулировку и угадывать"),
        t("Skip the setup completely", "Полностью пропустить настройку"),
      ],
      correctIndex: 0,
      explanation: t(
        "The drill rewards a clear read of the structure before any fast move.",
        "Этот drill награждает ясное чтение структуры до любых быстрых действий."
      ),
      hint: t(
        "Pick the answer that protects understanding before speed.",
        "Выбирай ответ, который сначала защищает понимание, а уже потом скорость."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        `What usually improves accuracy most on set ${seed}?`,
        `Что чаще всего сильнее всего улучшает точность в сете ${seed}?`
      ),
      options: [
        t("Naming the relationship before solving", "Назвать связь до начала решения"),
        t("Changing methods at random", "Случайно менять методы"),
        t("Picking the longest answer", "Выбирать самый длинный ответ"),
        t("Ignoring the prompt's constraints", "Игнорировать ограничения из условия"),
      ],
      correctIndex: 0,
      explanation: t(
        "When the relationship is clear, the rest of the solution becomes much easier to control.",
        "Когда связь ясна, остальную часть решения становится гораздо проще контролировать."
      ),
      hint: t(
        "Look for the choice that starts with understanding, not guessing.",
        "Смотри на вариант, который начинается с понимания, а не с угадывания."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        "What does mastery look like on a harder practice card?",
        "Как выглядит mastery на более сложной тренировочной карточке?"
      ),
      options: [
        t("Defending the correct answer and rejecting close distractors", "Уметь защитить правильный ответ и отбросить похожие distractor-ы"),
        t("Memorizing one trick without context", "Запомнить один трюк без контекста"),
        t("Answering before reading the prompt", "Ответить до чтения условия"),
        t("Skipping explanations after each item", "Пропускать объяснения после каждого вопроса"),
      ],
      correctIndex: 0,
      explanation: t(
        "Mastery means you understand why the answer works and why similar-looking options fail.",
        "Mastery означает, что ты понимаешь, почему ответ работает и почему похожие варианты не подходят."
      ),
      hint: t(
        "Choose the option that shows depth, not just speed.",
        "Выбирай вариант, который показывает глубину, а не просто скорость."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function joinText(first: LocalizedText, second: LocalizedText) {
  return t(`${first.en} ${second.en}`, `${first.ru} ${second.ru}`);
}

function withSuffix(value: LocalizedText, suffix: LocalizedText) {
  return t(`${value.en}: ${suffix.en}`, `${value.ru}: ${suffix.ru}`);
}
