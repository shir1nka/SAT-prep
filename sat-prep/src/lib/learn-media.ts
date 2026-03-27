import {
  localized as t,
  type LearnLanguage,
  type LearnSkill,
  type LearnUnit,
  type LocalizedText,
} from "./sat-learn-base";

export type LearnMediaTheme =
  | "overview"
  | "algebra"
  | "data"
  | "advanced"
  | "geometry"
  | "modeling"
  | "reading"
  | "craft"
  | "structure"
  | "grammar"
  | "inference"
  | "mixed";

export type LearnMedia = {
  title: LocalizedText;
  summary: LocalizedText;
  youtubeUrl: string;
  youtubeCta: LocalizedText;
  tags: LocalizedText[];
  theme: LearnMediaTheme;
};

type LearnMediaSeed = Omit<LearnMedia, "youtubeUrl"> & {
  youtubeQuery: string;
};

const GENERATED_UNIT_SUFFIXES = [
  "warmup",
  "applied",
  "precision",
  "challenge",
  "mastery",
] as const;

function makeYoutubeSearchUrl(query: string) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

function buildMedia(seed: LearnMediaSeed): LearnMedia {
  return {
    ...seed,
    youtubeUrl: makeYoutubeSearchUrl(seed.youtubeQuery),
  };
}

const MEDIA_BY_KEY: Record<string, LearnMediaSeed> = {
  "math-intro": {
    title: t("SAT Math overview video", "Видео-обзор SAT Math"),
    summary: t(
      "Use this to reset pacing, calculator use, and the overall flow of the digital SAT math section.",
      "Используй это как быстрый обзор по темпу, работе с калькулятором и общему формату digital SAT Math."
    ),
    youtubeQuery: "Digital SAT Math overview Khan Academy",
    youtubeCta: t("Open YouTube topic", "Открыть тему на YouTube"),
    tags: [t("overview", "обзор"), t("calculator", "калькулятор"), t("strategy", "стратегия")],
    theme: "overview",
  },
  "linear-equations": {
    title: t("Linear equations walkthrough", "Видео по линейным уравнениям"),
    summary: t(
      "A short algebra refresher on balancing both sides, isolating variables, and avoiding sign mistakes.",
      "Короткий разбор алгебры: баланс обеих частей, изоляция переменной и контроль знаков."
    ),
    youtubeQuery: "Digital SAT linear equations Khan Academy",
    youtubeCta: t("Open YouTube lesson", "Открыть урок на YouTube"),
    tags: [t("algebra", "алгебра"), t("balance", "баланс"), t("equations", "уравнения")],
    theme: "algebra",
  },
  "linear-functions": {
    title: t("Slope and linear functions video", "Видео по линейным функциям"),
    summary: t(
      "Review slope, intercept, and how to read a line as a relationship between quantities.",
      "Повтори наклон, пересечение и чтение линейной модели как связи между величинами."
    ),
    youtubeQuery: "Digital SAT linear functions slope intercept Khan Academy",
    youtubeCta: t("Watch function lesson", "Открыть урок по функциям"),
    tags: [t("slope", "наклон"), t("intercept", "пересечение"), t("functions", "функции")],
    theme: "algebra",
  },
  "ratios-rates-percent": {
    title: t("Ratios, rates, and percent video", "Видео по отношениям и процентам"),
    summary: t(
      "Good for translating verbal conditions into ratios, rates, percent change, and unit meaning.",
      "Полезно для перевода текстовых условий в отношения, скорости, проценты и единицы измерения."
    ),
    youtubeQuery: "Digital SAT ratios rates percent Khan Academy",
    youtubeCta: t("Open YouTube topic", "Открыть тему на YouTube"),
    tags: [t("percent", "проценты"), t("rates", "скорости"), t("translation", "перевод условия")],
    theme: "data",
  },
  "probability-data": {
    title: t("Data and probability video", "Видео по данным и вероятности"),
    summary: t(
      "A quick way to rehearse interpreting tables, simple probability, and percent-of-group logic.",
      "Быстрый разбор таблиц, простой вероятности и логики процентов по группе."
    ),
    youtubeQuery: "Digital SAT probability data analysis Khan Academy",
    youtubeCta: t("Open data lesson", "Открыть урок по данным"),
    tags: [t("probability", "вероятность"), t("tables", "таблицы"), t("data", "данные")],
    theme: "data",
  },
  "factoring-quadratics": {
    title: t("Quadratics and factoring video", "Видео по квадратным уравнениям"),
    summary: t(
      "Use this when you want a clean refresher on factoring structure and root relationships.",
      "Подойдёт, если нужен чистый повтор разложения на множители и связи между корнями."
    ),
    youtubeQuery: "Digital SAT factoring quadratics Khan Academy",
    youtubeCta: t("Open quadratics lesson", "Открыть урок по квадратным"),
    tags: [t("quadratics", "квадратные"), t("factoring", "разложение"), t("roots", "корни")],
    theme: "advanced",
  },
  "function-notation": {
    title: t("Function notation video", "Видео по записи функций"),
    summary: t(
      "Helpful for reading function notation, composition, and evaluating inputs without rushing.",
      "Полезно для чтения записи функций, композиции и аккуратной подстановки аргументов."
    ),
    youtubeQuery: "Digital SAT function notation Khan Academy",
    youtubeCta: t("Open function notation lesson", "Открыть урок по записи функций"),
    tags: [t("notation", "обозначения"), t("composition", "композиция"), t("inputs", "подстановка")],
    theme: "advanced",
  },
  "area-volume": {
    title: t("Area and volume geometry video", "Видео по площади и объёму"),
    summary: t(
      "A geometry refresher with area formulas, volume meaning, and unit checking.",
      "Разбор геометрии с формулами площади, смыслом объёма и проверкой единиц."
    ),
    youtubeQuery: "Digital SAT geometry area volume Khan Academy",
    youtubeCta: t("Open geometry lesson", "Открыть урок по геометрии"),
    tags: [t("area", "площадь"), t("volume", "объём"), t("units", "единицы")],
    theme: "geometry",
  },
  "right-triangles-trig": {
    title: t("Right triangles video", "Видео по прямоугольным треугольникам"),
    summary: t(
      "Use this for the Pythagorean theorem, side relationships, and basic trigonometric reading.",
      "Используй это для теоремы Пифагора, связей между сторонами и базового чтения тригонометрии."
    ),
    youtubeQuery: "Digital SAT right triangles trigonometry Khan Academy",
    youtubeCta: t("Open triangle lesson", "Открыть урок по треугольникам"),
    tags: [t("triangles", "треугольники"), t("Pythagorean", "Пифагор"), t("trig", "тригонометрия")],
    theme: "geometry",
  },
  "systems-modeling": {
    title: t("Systems modeling video", "Видео по системам и моделированию"),
    summary: t(
      "A good outside explainer for turning word problems into two equations and choosing the fastest method.",
      "Хороший внешний разбор того, как переводить текстовую задачу в два уравнения и выбирать быстрый метод."
    ),
    youtubeQuery: "Digital SAT systems of equations word problems Khan Academy",
    youtubeCta: t("Open systems lesson", "Открыть урок по системам"),
    tags: [t("systems", "системы"), t("modeling", "моделирование"), t("word problems", "текстовые задачи")],
    theme: "modeling",
  },
  "timed-mixed-set": {
    title: t("Hard SAT math set video", "Видео с mixed SAT Math"),
    summary: t(
      "Use this when you want a harder outside set on method choice, pacing, and mixed math switching.",
      "Подойдёт, если хочешь внешний тяжёлый разбор по выбору метода, темпу и переключению между темами."
    ),
    youtubeQuery: "Digital SAT math hard questions strategy YouTube",
    youtubeCta: t("Open hard math set", "Открыть жёсткий SAT Math"),
    tags: [t("mixed", "смешанное"), t("timing", "тайминг"), t("strategy", "стратегия")],
    theme: "mixed",
  },
  "rw-intro": {
    title: t("SAT Reading and Writing overview video", "Видео-обзор SAT Reading and Writing"),
    summary: t(
      "A short overview for short-passage format, domain switching, and how the digital verbal section feels.",
      "Короткий обзор формата коротких пассажей, переключения между доменами и общего ритма verbal-части."
    ),
    youtubeQuery: "Digital SAT Reading and Writing overview Khan Academy",
    youtubeCta: t("Open YouTube topic", "Открыть тему на YouTube"),
    tags: [t("overview", "обзор"), t("verbal", "verbal-часть"), t("format", "формат")],
    theme: "overview",
  },
  "central-idea": {
    title: t("Central idea video", "Видео по главной идее"),
    summary: t(
      "Helpful for seeing how strong central idea answers cover the full passage instead of one detail.",
      "Полезно, чтобы увидеть, как сильный ответ по главной идее охватывает весь текст, а не одну деталь."
    ),
    youtubeQuery: "Digital SAT central idea main idea Khan Academy",
    youtubeCta: t("Open central idea lesson", "Открыть урок по главной идее"),
    tags: [t("main idea", "главная идея"), t("passage", "пассаж"), t("scope", "охват")],
    theme: "reading",
  },
  "evidence-pairing": {
    title: t("Evidence pairing video", "Видео по доказательствам"),
    summary: t(
      "A strong companion for matching the correct claim with the exact line that proves it.",
      "Хороший дополнительный разбор того, как связать верное утверждение с точной строкой-доказательством."
    ),
    youtubeQuery: "Digital SAT evidence questions Khan Academy",
    youtubeCta: t("Open evidence lesson", "Открыть урок по доказательствам"),
    tags: [t("evidence", "доказательства"), t("claims", "утверждения"), t("support", "поддержка")],
    theme: "reading",
  },
  "words-in-context": {
    title: t("Words in context video", "Видео по словам в контексте"),
    summary: t(
      "Use this to rehearse how context changes meaning and why dictionary instinct is often a trap.",
      "Используй это, чтобы повторить, как контекст меняет значение слова и почему словарная ассоциация часто ловушка."
    ),
    youtubeQuery: "Digital SAT words in context Khan Academy",
    youtubeCta: t("Open words in context lesson", "Открыть урок по словам в контексте"),
    tags: [t("context", "контекст"), t("meaning", "значение"), t("precision", "точность")],
    theme: "craft",
  },
  "tone-function": {
    title: t("Tone and function video", "Видео по тону и функции"),
    summary: t(
      "Good for author purpose, sentence role, and the logic behind what a line is doing.",
      "Полезно для цели автора, роли предложения и логики того, какую функцию выполняет строка."
    ),
    youtubeQuery: "Digital SAT tone and function questions YouTube",
    youtubeCta: t("Open tone lesson", "Открыть урок по тону"),
    tags: [t("tone", "тон"), t("purpose", "цель"), t("function", "функция")],
    theme: "craft",
  },
  "logical-transitions": {
    title: t("Transitions video", "Видео по переходам"),
    summary: t(
      "A clean refresher on contrast, cause-effect, continuation, and choosing the right connector fast.",
      "Чистый повтор противопоставления, причинно-следственных связей, продолжения мысли и быстрого выбора связки."
    ),
    youtubeQuery: "Digital SAT transitions writing Khan Academy",
    youtubeCta: t("Open transitions lesson", "Открыть урок по переходам"),
    tags: [t("transitions", "переходы"), t("logic", "логика"), t("connectors", "связки")],
    theme: "structure",
  },
  "paragraph-organization": {
    title: t("Organization video", "Видео по организации текста"),
    summary: t(
      "Useful for sentence placement, paragraph flow, and keeping a passage logically ordered.",
      "Полезно для расположения предложений, логики абзаца и порядка идей в тексте."
    ),
    youtubeQuery: "Digital SAT paragraph organization sentence placement YouTube",
    youtubeCta: t("Open organization lesson", "Открыть урок по организации"),
    tags: [t("organization", "организация"), t("placement", "расположение"), t("flow", "связность")],
    theme: "structure",
  },
  "sentence-boundaries": {
    title: t("Sentence boundaries video", "Видео по границам предложения"),
    summary: t(
      "Use this when you want a faster handle on commas, semicolons, and where one complete thought ends.",
      "Используй это, если хочешь быстрее разбираться с запятыми, точками с запятой и границами законченной мысли."
    ),
    youtubeQuery: "Digital SAT sentence boundaries punctuation YouTube",
    youtubeCta: t("Open punctuation lesson", "Открыть урок по пунктуации"),
    tags: [t("punctuation", "пунктуация"), t("boundaries", "границы"), t("clauses", "части предложения")],
    theme: "grammar",
  },
  "agreement-reference": {
    title: t("Agreement and reference video", "Видео по согласованию"),
    summary: t(
      "Helpful for subject-verb agreement, reference logic, and spotting the true subject under pressure.",
      "Полезно для согласования подлежащего и сказуемого, логики соотнесения и поиска настоящего подлежащего под давлением."
    ),
    youtubeQuery: "Digital SAT subject verb agreement pronoun reference Khan Academy",
    youtubeCta: t("Open grammar lesson", "Открыть урок по грамматике"),
    tags: [t("agreement", "согласование"), t("reference", "соотнесение"), t("grammar", "грамматика")],
    theme: "grammar",
  },
  "inference-under-time": {
    title: t("Inference video", "Видео по выводам"),
    summary: t(
      "Good for learning how to stay close to the text when the tempting answer sounds bigger than the evidence.",
      "Полезно для тренировки аккуратных выводов, когда заманчивый ответ звучит шире, чем позволяют доказательства."
    ),
    youtubeQuery: "Digital SAT inference questions YouTube",
    youtubeCta: t("Open inference lesson", "Открыть урок по выводам"),
    tags: [t("inference", "вывод"), t("evidence", "доказательства"), t("traps", "ловушки")],
    theme: "inference",
  },
  "editing-checklist": {
    title: t("Editing checklist video", "Видео по чеклисту редактирования"),
    summary: t(
      "Use this to build a repeatable scan for grammar, logic, and sentence structure under time.",
      "Используй это, чтобы собрать повторяемый чеклист по грамматике, логике и структуре предложения под таймером."
    ),
    youtubeQuery: "Digital SAT editing checklist grammar strategy YouTube",
    youtubeCta: t("Open editing lesson", "Открыть урок по редактированию"),
    tags: [t("editing", "редактирование"), t("checklist", "чеклист"), t("speed", "скорость")],
    theme: "mixed",
  },
};

function normalizeSkillId(skillId: string) {
  for (const suffix of GENERATED_UNIT_SUFFIXES) {
    const ending = `-${suffix}`;

    if (skillId.endsWith(ending)) {
      return skillId.slice(0, -ending.length);
    }
  }

  return skillId;
}

function fallbackMedia(language: LearnLanguage, unit: LearnUnit): LearnMedia {
  const isMathUnit = unit.id.startsWith("math");

  return {
    title: t("Topic video and visual", "Видео и визуал по теме"),
    summary: isMathUnit
      ? t(
          "Open a focused SAT math explainer on YouTube and use the visual block here as a quick mental reset before practice.",
          "Открой точечный SAT Math-разбор на YouTube и используй визуальный блок здесь как быстрый ментальный разогрев перед практикой."
        )
      : t(
          "Open a focused SAT Reading & Writing explainer on YouTube and use the visual block here as a quick reset before practice.",
          "Открой точечный SAT Reading & Writing-разбор на YouTube и используй визуальный блок здесь как быстрый разогрев перед практикой."
        ),
    youtubeUrl: makeYoutubeSearchUrl(
      isMathUnit
        ? "Digital SAT Math lesson YouTube"
        : "Digital SAT Reading Writing lesson YouTube"
    ),
    youtubeCta: t("Open YouTube topic", "Открыть тему на YouTube"),
    tags: isMathUnit
      ? [t("math", "математика"), t("practice", "практика"), t("visual", "визуал")]
      : [t("reading", "чтение"), t("writing", "письмо"), t("visual", "визуал")],
    theme: isMathUnit ? "overview" : "reading",
  };
}

function resolveMediaKey(unit: LearnUnit, skill?: LearnSkill) {
  if (skill) {
    return normalizeSkillId(skill.id);
  }

  if (MEDIA_BY_KEY[unit.id]) {
    return unit.id;
  }

  return unit.skills[0] ? normalizeSkillId(unit.skills[0].id) : unit.id;
}

export function getLearnUnitMedia(language: LearnLanguage, unit: LearnUnit) {
  const key = resolveMediaKey(unit);
  const media = MEDIA_BY_KEY[key];

  return media ? buildMedia(media) : fallbackMedia(language, unit);
}

export function getLearnSkillMedia(
  language: LearnLanguage,
  unit: LearnUnit,
  skill: LearnSkill
) {
  const key = resolveMediaKey(unit, skill);
  const media = MEDIA_BY_KEY[key];

  return media ? buildMedia(media) : getLearnUnitMedia(language, unit);
}
