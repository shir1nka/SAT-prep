import { localized as t, question } from "./sat-learn-base";
import type { PracticeMode, QuestionBuilder } from "./sat-learn-expansion";

export const VERBAL_EXPANSION_BUILDERS: Record<string, QuestionBuilder> = {
  "central-idea": buildCentralIdeaQuestions,
  "evidence-pairing": buildEvidenceQuestions,
  "words-in-context": buildWordContextQuestions,
  "tone-function": buildToneFunctionQuestions,
  "logical-transitions": buildTransitionQuestions,
  "paragraph-organization": buildOrganizationQuestions,
  "sentence-boundaries": buildSentenceBoundaryQuestions,
  "agreement-reference": buildAgreementQuestions,
  "inference-under-time": buildInferenceQuestions,
  "editing-checklist": buildEditingChecklistQuestions,
};

function buildCentralIdeaQuestions(seed: number, mode: PracticeMode, skillId: string) {
  const scenario = pick(seed, [
    {
      subject: t("community gardens", "общественные сады"),
      change: t("improved neighborhood access to fresh food", "улучшили доступ района к свежим продуктам"),
    },
    {
      subject: t("night-sky lighting rules", "правила освещения ночного неба"),
      change: t("reduced wasted energy without harming safety", "сократили лишние энергозатраты без вреда для безопасности"),
    },
    {
      subject: t("school reading circles", "школьные читательские кружки"),
      change: t("increased student participation in discussion", "увеличили участие учеников в обсуждениях"),
    },
  ]);

  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        `A passage explains how ${scenario.subject.en} ${scenario.change.en}. Which choice best states the central idea?`,
        `Текст объясняет, как ${scenario.subject.ru} ${scenario.change.ru}. Какой вариант лучше всего передаёт central idea?`
      ),
      options: [
        t(`${capitalize(scenario.subject.en)} ${scenario.change.en}.`, `${capitalize(scenario.subject.ru)} ${scenario.change.ru}.`),
        t("Every city policy is equally successful.", "Любая городская политика одинаково успешна."),
        t("One small detail from the middle of the passage only.", "Только одна маленькая деталь из середины текста."),
        t("A claim much broader than the passage itself.", "Утверждение, которое намного шире самого текста."),
      ],
      correctIndex: 0,
      explanation: t(
        "A good central idea covers the whole passage in a balanced way, not a tiny detail or an extreme claim.",
        "Хорошая central idea охватывает весь текст сбалансированно, а не сводится к детали или крайнему выводу."
      ),
      hint: t(
        "Pick the answer that could summarize both the opening and the ending.",
        "Выбирай ответ, который мог бы подойти и к началу, и к концу текста."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        "Which choice is least likely to be the central idea of a whole passage?",
        "Какой вариант с наименьшей вероятностью может быть главной идеей всего текста?"
      ),
      options: [
        t("A balanced claim covering the full passage", "Сбалансированное утверждение, охватывающее весь текст"),
        t("A statement about one supporting example only", "Утверждение только об одном поддерживающем примере"),
        t("A sentence that matches the author's main focus", "Предложение, совпадающее с главным фокусом автора"),
        t("A broad summary of the passage's purpose", "Широкое резюме цели текста"),
      ],
      correctIndex: 1,
      explanation: t(
        "A single supporting example may matter, but it usually cannot replace the full central idea.",
        "Один поддерживающий пример может быть важным, но обычно не заменяет всю главную идею."
      ),
      hint: t(
        "Central idea answers should be broad enough to cover multiple parts of the passage.",
        "Ответы на central idea должны быть достаточно широкими, чтобы покрывать несколько частей текста."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        "If two answer choices both sound reasonable, what is the best tiebreaker on a central idea question?",
        "Если два варианта звучат правдоподобно, что лучше всего использовать как tiebreaker в central idea question?"
      ),
      options: [
        t("Choose the one that best covers the whole passage without overstating", "Выбрать тот, который лучше всего охватывает весь текст и не преувеличивает"),
        t("Choose the most dramatic wording", "Выбрать самую драматичную формулировку"),
        t("Choose the longest answer", "Выбрать самый длинный ответ"),
        t("Choose the answer with the hardest vocabulary", "Выбрать ответ с самой сложной лексикой"),
      ],
      correctIndex: 0,
      explanation: t(
        "When choices are close, the correct one is usually broad, balanced, and text-grounded.",
        "Когда варианты близки, правильным обычно оказывается ответ, который остаётся широким, сбалансированным и опирается на текст."
      ),
      hint: t(
        "Think scope first: too narrow and too broad are both wrong.",
        "Сначала подумай об охвате: слишком узкий и слишком широкий варианты оба ошибочны."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function buildEvidenceQuestions(seed: number, mode: PracticeMode, skillId: string) {
  const scenario = pick(seed, [
    {
      claim: t("a redesigned bus route shortened commuters' average travel time", "новый автобусный маршрут сократил среднее время поездки пассажиров"),
      support: t(
        "Riders on the updated route reached downtown 12 minutes faster on average than riders last spring.",
        "Пассажиры на обновлённом маршруте добирались до центра в среднем на 12 минут быстрее, чем прошлой весной."
      ),
    },
    {
      claim: t("the new seed variety used less water while preserving yield", "новый сорт семян тратил меньше воды без потери урожая"),
      support: t(
        "Test plots required 15% less irrigation yet produced harvest totals similar to the control plots.",
        "Тестовые участки требовали на 15% меньше полива, но давали урожай почти на уровне контрольных участков."
      ),
    },
    {
      claim: t("the archive's digitization project increased public use of the collection", "проект оцифровки архива увеличил использование коллекции публикой"),
      support: t(
        "Online requests for archived materials more than doubled after the digital catalog launched.",
        "После запуска цифрового каталога онлайн-запросы на архивные материалы выросли более чем вдвое."
      ),
    },
  ]);

  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        `Which sentence best supports the claim that ${scenario.claim.en}?`,
        `Какое предложение лучше всего подтверждает утверждение, что ${scenario.claim.ru}?`
      ),
      options: [
        scenario.support,
        t("The researchers were surprised by the result.", "Исследователи удивились результату."),
        t("The project took several years to complete.", "Проект занял несколько лет."),
        t("People had discussed the issue before.", "Люди уже обсуждали эту тему раньше."),
      ],
      correctIndex: 0,
      explanation: t(
        "Strong evidence directly proves the exact claim instead of offering background or reaction.",
        "Сильное доказательство напрямую подтверждает точное утверждение, а не даёт фон или реакцию."
      ),
      hint: t(
        "Look for the line that covers both parts of the claim, not just a nearby topic.",
        "Ищи строку, которая подтверждает обе части утверждения, а не просто соседнюю тему."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        "What makes a line of evidence stronger than a merely related detail?",
        "Что делает строку доказательства сильнее, чем просто связанную деталь?"
      ),
      options: [
        t("It directly proves the claim", "Она напрямую доказывает утверждение"),
        t("It uses emotional wording", "Она использует эмоциональные слова"),
        t("It is the longest sentence in the passage", "Это самое длинное предложение в тексте"),
        t("It introduces a new topic entirely", "Она вводит совершенно новую тему"),
      ],
      correctIndex: 0,
      explanation: t(
        "The best evidence closes the gap between claim and proof instead of only sounding connected.",
        "Лучшее доказательство закрывает разрыв между утверждением и подтверждением, а не просто выглядит связанным."
      ),
      hint: t(
        "Ask whether the line would convince a skeptical reader.",
        "Спроси себя, убедила бы эта строка скептически настроенного читателя."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        "On a paired claim-and-evidence set, what is usually the most reliable order?",
        "Какой порядок действий обычно самый надёжный в paired claim-and-evidence question?"
      ),
      options: [
        t("Decide the claim first, then search for the clearest proof", "Сначала определить верное утверждение, затем искать самое явное доказательство"),
        t("Pick the most detailed evidence line first and hope the claim matches", "Сначала выбрать самую подробную строку доказательства и надеяться, что она совпадёт с утверждением"),
        t("Ignore the claim and compare sentence length", "Игнорировать утверждение и сравнивать длину предложений"),
        t("Choose any line with numbers in it", "Выбрать любую строку, где есть числа"),
      ],
      correctIndex: 0,
      explanation: t(
        "Once the claim is clear, the correct evidence usually becomes much easier to identify.",
        "Когда утверждение уже ясно, правильное доказательство обычно становится намного легче найти."
      ),
      hint: t(
        "Do not let the evidence search begin before you know what must be proven.",
        "Не начинай искать доказательство раньше, чем поймёшь, что именно нужно доказать."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function buildWordContextQuestions(seed: number, mode: PracticeMode, skillId: string) {
  const scenario = pick(seed, [
    {
      word: "reserved",
      sentence: t(
        "The reviewer was reserved in praising the exhibit, noting its strengths but also its limits.",
        "Рецензент был reserved в своей похвале выставке, отмечая её сильные стороны, но и ограничения."
      ),
      correct: t("cautious", "сдержанный"),
      distractors: [t("enthusiastic", "восторженный"), t("secretive", "скрытный"), t("confused", "растерянный")],
    },
    {
      word: "sharp",
      sentence: t(
        "The researchers recorded a sharp increase in nighttime insect activity after the rain.",
        "Исследователи зафиксировали sharp рост активности насекомых ночью после дождя."
      ),
      correct: t("sudden", "резкий"),
      distractors: [t("dangerous", "опасный"), t("precise", "точный"), t("angry", "сердитый")],
    },
    {
      word: "charge",
      sentence: t(
        "The museum director was careful not to charge the volunteers with more work than they could handle.",
        "Директор музея старался не charge волонтёров большим объёмом работы, чем они могли выдержать."
      ),
      correct: t("burden", "нагружать"),
      distractors: [t("accuse", "обвинять"), t("pay", "платить"), t("electrify", "заряжать")],
    },
  ]);

  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        `In the sentence "${scenario.sentence.en}" what does ${scenario.word} most nearly mean?`,
        `В предложении "${scenario.sentence.ru}" что ближе всего означает ${scenario.word}?`
      ),
      options: [scenario.distractors[0], scenario.correct, scenario.distractors[1], scenario.distractors[2]],
      correctIndex: 1,
      explanation: t(
        "The surrounding context narrows the meaning to the local logic of the sentence, not the word's most common dictionary entry.",
        "Окружающий контекст сужает значение до местной логики предложения, а не до самого привычного словарного варианта."
      ),
      hint: t(
        "Cover the word and predict the missing idea from the sentence around it.",
        "Закрой слово и предскажи пропущенную идею по окружающему предложению."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        "What is the best first move on a words-in-context question?",
        "Какой первый шаг лучший в words-in-context question?"
      ),
      options: [
        t("Use the nearby sentence logic to predict the meaning", "Использовать логику соседнего предложения, чтобы предсказать значение"),
        t("Choose the fanciest synonym", "Выбрать самый изысканный синоним"),
        t("Ignore the passage and trust memory", "Игнорировать текст и довериться памяти"),
        t("Pick the shortest option", "Выбрать самый короткий вариант"),
      ],
      correctIndex: 0,
      explanation: t(
        "Context, not vocabulary prestige, decides which meaning fits the sentence.",
        "Правильное значение определяется контекстом, а не престижностью слова."
      ),
      hint: t(
        "The sentence around the word is more important than your first dictionary instinct.",
        "Предложение вокруг слова важнее первого словарного впечатления."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        "Why are wrong answers on words-in-context questions often tempting?",
        "Почему неверные ответы в words-in-context questions часто кажутся соблазнительными?"
      ),
      options: [
        t("They match a common meaning of the word but not this sentence", "Они совпадают с распространённым значением слова, но не с этим предложением"),
        t("They are always longer than the right answer", "Они всегда длиннее правильного ответа"),
        t("They avoid all advanced vocabulary", "Они избегают любой сложной лексики"),
        t("They repeat punctuation from the passage", "Они повторяют пунктуацию из текста"),
      ],
      correctIndex: 0,
      explanation: t(
        "The trap is usually a familiar meaning that fails the local context.",
        "Ловушка обычно строится на знакомом значении, которое не выдерживает конкретный контекст."
      ),
      hint: t(
        "Ask whether the choice fits this exact sentence, not the word in general.",
        "Спроси себя, подходит ли вариант именно к этому предложению, а не к слову вообще."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function buildToneFunctionQuestions(seed: number, mode: PracticeMode, skillId: string) {
  const scenario = pick(seed, [
    t(
      "Only after the third experiment did the team identify the source of the error.",
      "Только после третьего эксперимента команда определила источник ошибки."
    ),
    t(
      "This detail gives the reader a concrete example of the broader policy shift.",
      "Эта деталь даёт читателю конкретный пример более широкого изменения политики."
    ),
    t(
      "The sentence marks the point where the article shifts from background to evidence.",
      "Это предложение отмечает момент, когда статья переходит от фона к доказательству."
    ),
  ]);

  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        `A paragraph describes several failed attempts and then says "${scenario.en}" What is the sentence's main function?`,
        `Абзац описывает несколько неудачных попыток, а затем говорит: "${scenario.ru}" Какова главная функция этого предложения?`
      ),
      options: [
        t("It marks a turning point or clarifying move in the paragraph", "Оно отмечает поворотный момент или проясняющий ход в абзаце"),
        t("It introduces an unrelated historical aside", "Оно вводит несвязанное историческое отступление"),
        t("It contradicts the paragraph's main idea", "Оно противоречит главной идее абзаца"),
        t("It only defines a vocabulary word", "Оно только определяет одно слово"),
      ],
      correctIndex: 0,
      explanation: t(
        "Function questions are about the job a sentence performs inside the paragraph's movement.",
        "Вопросы на function спрашивают о роли предложения внутри движения абзаца."
      ),
      hint: t(
        "Explain in your own words what the sentence does for the paragraph.",
        "Своими словами объясни, что именно это предложение делает для абзаца."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        "How should tone be identified most reliably on the SAT?",
        "Как надёжнее всего определять tone на SAT?"
      ),
      options: [
        t("By looking for an attitude supported by several word choices", "Ища отношение автора, подтверждённое несколькими словами"),
        t("By focusing on one dramatic adjective only", "Сосредоточившись только на одном драматичном прилагательном"),
        t("By choosing the harshest answer choice", "Выбирая самый жёсткий вариант ответа"),
        t("By ignoring the passage's purpose", "Игнорируя цель текста"),
      ],
      correctIndex: 0,
      explanation: t(
        "A valid tone answer should fit the passage as a whole, not just one isolated word.",
        "Корректный tone-ответ должен соответствовать тексту в целом, а не одному изолированному слову."
      ),
      hint: t(
        "Tone is an attitude pattern, not a single-word reaction.",
        "Tone - это паттерн отношения, а не реакция на одно слово."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        "If a sentence gives a specific example right after a general claim, what is its likely function?",
        "Если предложение приводит конкретный пример сразу после общего утверждения, какова его вероятная функция?"
      ),
      options: [
        t("To illustrate or support the claim", "Проиллюстрировать или поддержать утверждение"),
        t("To deny the earlier claim", "Отрицать предыдущее утверждение"),
        t("To change the subject completely", "Полностью сменить тему"),
        t("To create an unrelated conclusion", "Создать несвязанный вывод"),
      ],
      correctIndex: 0,
      explanation: t(
        "Examples usually clarify, test, or support the broader point that came just before them.",
        "Примеры обычно проясняют, проверяют или поддерживают более общую мысль, которая была прямо перед ними."
      ),
      hint: t(
        "Ask what role an example naturally plays after a general statement.",
        "Спроси себя, какую роль естественно играет пример после общего утверждения."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function buildTransitionQuestions(seed: number, mode: PracticeMode, skillId: string) {
  const scenario = pick(seed, [
    {
      relation: t("contrast", "противопоставление"),
      correct: t("However", "However"),
      distractors: [t("For example", "For example"), t("Similarly", "Similarly"), t("Moreover", "Moreover")],
    },
    {
      relation: t("addition", "добавление"),
      correct: t("Moreover", "Moreover"),
      distractors: [t("Instead", "Instead"), t("However", "However"), t("Consequently", "Consequently")],
    },
    {
      relation: t("result", "результат"),
      correct: t("Consequently", "Consequently"),
      distractors: [t("Similarly", "Similarly"), t("For instance", "For instance"), t("Nevertheless", "Nevertheless")],
    },
  ]);

  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        `Which transition best signals ${scenario.relation.en}?`,
        `Какой переход лучше всего показывает ${scenario.relation.ru}?`
      ),
      options: [scenario.correct, ...scenario.distractors],
      correctIndex: 0,
      explanation: t(
        "The best transition is the one that matches the real relationship between the two sentences.",
        "Лучший переход - тот, который совпадает с реальной связью между двумя предложениями."
      ),
      hint: t(
        "Name the relationship first, and only then match a transition to it.",
        "Сначала назови тип связи, а уже потом подбирай переход."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        "What is the safest way to choose between two plausible transition words?",
        "Как безопаснее всего выбрать между двумя правдоподобными переходами?"
      ),
      options: [
        t("Compare the exact relationship between the sentences", "Сравнить точную связь между предложениями"),
        t("Choose the more advanced-sounding word", "Выбрать слово, которое звучит сложнее"),
        t("Choose the longer answer", "Выбрать более длинный ответ"),
        t("Pick whichever transition you remember best", "Выбрать тот переход, который лучше помнишь"),
      ],
      correctIndex: 0,
      explanation: t(
        "Transitions are logic words. Their job is to reflect the relationship, not the vocabulary level.",
        "Transitions - это логические слова. Их задача - отражать связь, а не уровень словаря."
      ),
      hint: t(
        "Ask whether the second sentence adds, contrasts, results, or gives an example.",
        "Спроси себя, добавляет ли второе предложение, противопоставляет, показывает результат или даёт пример."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        "Sentence 1 presents a problem. Sentence 2 gives a workable fix. Which transition usually fits best?",
        "Предложение 1 описывает проблему. Предложение 2 даёт рабочее решение. Какой переход обычно подходит лучше всего?"
      ),
      options: [
        t("As a result", "As a result"),
        t("By contrast", "By contrast"),
        t("For example", "For example"),
        t("Likewise", "Likewise"),
      ],
      correctIndex: 0,
      explanation: t(
        "A fix that follows a problem often acts as a consequence or next logical result.",
        "Решение, которое следует за проблемой, часто работает как следствие или следующий логический шаг."
      ),
      hint: t(
        "Do not memorize isolated words. Match the sentence relationship.",
        "Не заучивай слова изолированно. Соотнеси их со связью между предложениями."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function buildOrganizationQuestions(seed: number, mode: PracticeMode, skillId: string) {
  const scenario = pick(seed, [
    t("a sentence listing household examples of the source being discussed", "предложение со списком бытовых примеров обсуждаемого источника"),
    t("a sentence giving the first concrete study after a broad topic sentence", "предложение, которое даёт первое конкретное исследование после общего topic sentence"),
    t("a sentence that repeats information the paragraph already established", "предложение, которое повторяет информацию, уже установленную в абзаце"),
  ]);

  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        `A paragraph defines a topic, explains where it comes from, and then discusses one study. Where would ${scenario.en} fit best if it supports the origin discussion?`,
        `Абзац сначала определяет тему, затем объясняет её происхождение, а потом обсуждает одно исследование. Куда лучше всего поставить ${scenario.ru}, если оно поддерживает разговор о происхождении?`
      ),
      options: [
        t("After the origin discussion and before the study", "После обсуждения происхождения и до исследования"),
        t("At the very end as a conclusion", "В самый конец как вывод"),
        t("Before the topic is even introduced", "До того, как тема вообще введена"),
        t("In a different paragraph with no connection", "В другой абзац без связи"),
      ],
      correctIndex: 0,
      explanation: t(
        "Placement should strengthen the paragraph's logic, so support for origins belongs with the origin discussion.",
        "Расположение должно усиливать логику абзаца, поэтому поддержка происхождения должна стоять рядом с обсуждением происхождения."
      ),
      hint: t(
        "Put the sentence next to the idea it supports most directly.",
        "Ставь предложение рядом с идеей, которую оно поддерживает напрямую."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        "What should guide a sentence placement question more than anything else?",
        "Что должно сильнее всего направлять решение в sentence placement question?"
      ),
      options: [
        t("The paragraph's logic and progression of ideas", "Логика абзаца и развитие идей"),
        t("Which position makes the paragraph longest", "Какое положение делает абзац длиннее"),
        t("Which position sounds fanciest", "Какое положение звучит эффектнее"),
        t("Which position repeats the thesis most often", "Какое положение чаще всего повторяет тезис"),
      ],
      correctIndex: 0,
      explanation: t(
        "Strong organization choices improve focus, clarity, and the order of support.",
        "Сильные организационные решения улучшают фокус, ясность и порядок поддержки."
      ),
      hint: t(
        "Imagine the paragraph as a chain of logic, not as isolated sentences.",
        "Представь абзац как цепочку логики, а не как набор отдельных предложений."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        "When should a sentence usually be deleted in an organization question?",
        "Когда предложение обычно нужно удалить в organization question?"
      ),
      options: [
        t("When it is off-topic or repeats an idea without helping the paragraph's purpose", "Когда оно не по теме или повторяет мысль без пользы для цели абзаца"),
        t("Whenever it contains a semicolon", "Всякий раз, когда в нём есть semicolon"),
        t("Whenever it is shorter than the other sentences", "Всякий раз, когда оно короче остальных предложений"),
        t("Whenever it mentions a date", "Всякий раз, когда в нём есть дата"),
      ],
      correctIndex: 0,
      explanation: t(
        "A sentence can be grammatically fine and still hurt focus if it does not serve the paragraph's goal.",
        "Предложение может быть грамматически нормальным и всё равно вредить фокусу, если не служит цели абзаца."
      ),
      hint: t(
        "Ask what job the sentence is doing. If it has no job, it should probably go.",
        "Спроси, какую работу делает это предложение. Если никакой, его, скорее всего, нужно убрать."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function buildSentenceBoundaryQuestions(seed: number, mode: PracticeMode, skillId: string) {
  const scenario = pick(seed, [
    {
      stem: t("Researchers revised the survey twice, the final version was much clearer.", "Researchers revised the survey twice, the final version was much clearer."),
      fix: t("Researchers revised the survey twice; the final version was much clearer.", "Researchers revised the survey twice; the final version was much clearer."),
    },
    {
      stem: t("The museum opened early, visitors arrived before sunrise.", "The museum opened early, visitors arrived before sunrise."),
      fix: t("The museum opened early, and visitors arrived before sunrise.", "The museum opened early, and visitors arrived before sunrise."),
    },
    {
      stem: t("The report was delayed the data team needed another week.", "The report was delayed the data team needed another week."),
      fix: t("The report was delayed because the data team needed another week.", "The report was delayed because the data team needed another week."),
    },
  ]);

  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        `Which revision best fixes the sentence "${scenario.stem.en}"?`,
        `Какая правка лучше всего исправляет предложение "${scenario.stem.ru}"?`
      ),
      options: [
        scenario.fix,
        scenario.stem,
        t("Add another comma", "Добавить ещё одну запятую"),
        t("Delete the subject from the second clause", "Удалить subject из второй части"),
      ],
      correctIndex: 0,
      explanation: t(
        "Two complete thoughts need a stronger boundary such as a semicolon, a conjunction, or a subordinating word.",
        "Две полные мысли требуют более сильной границы: semicolon, союза или подчинительного слова."
      ),
      hint: t(
        "First ask whether you have one full clause or two.",
        "Сначала спроси себя, у тебя одна полная часть или две."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        "What can correctly join two complete sentences?",
        "Что может корректно соединить два полных предложения?"
      ),
      options: [
        t("A semicolon or a comma with a coordinating conjunction", "Semicolon или запятая вместе с coordinating conjunction"),
        t("A comma by itself", "Одна запятая сама по себе"),
        t("Nothing at all", "Вообще ничего"),
        t("An extra adjective", "Дополнительное прилагательное"),
      ],
      correctIndex: 0,
      explanation: t(
        "A comma alone creates a splice, so a stronger boundary is required.",
        "Одна запятая создаёт comma splice, поэтому нужна более сильная граница."
      ),
      hint: t(
        "Think about independent clauses, not surface punctuation only.",
        "Думай о независимых частях предложения, а не только о видимой пунктуации."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        "Why is a fragment wrong on the SAT?",
        "Почему fragment считается ошибкой на SAT?"
      ),
      options: [
        t("Because it is missing a complete clause core", "Потому что в нём отсутствует основа полной clause"),
        t("Because it is always too short", "Потому что он всегда слишком короткий"),
        t("Because it contains a transition word", "Потому что в нём есть transition word"),
        t("Because it uses formal vocabulary", "Потому что в нём формальная лексика"),
      ],
      correctIndex: 0,
      explanation: t(
        "Fragments fail because they do not contain a full independent clause, not because of length alone.",
        "Fragments ошибочны, потому что не содержат полной независимой части, а не просто из-за длины."
      ),
      hint: t(
        "Look for both a subject and a verb that form a complete thought.",
        "Ищи и subject, и verb, которые вместе образуют законченную мысль."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function buildAgreementQuestions(seed: number, mode: PracticeMode, skillId: string) {
  const scenario = pick(seed, [
    {
      sentence: t("The collection of poems by contemporary writers ____ on the top shelf.", "The collection of poems by contemporary writers ____ on the top shelf."),
      correct: t("sits", "sits"),
      explanation: t("The subject is collection, which is singular. The phrase of poems does not change the verb.", "Подлежащее здесь collection, оно в единственном числе. Фраза of poems не меняет форму глагола."),
    },
    {
      sentence: t("The box of pencils near the window ____ missing.", "The box of pencils near the window ____ missing."),
      correct: t("is", "is"),
      explanation: t("The subject is box, not pencils, so the singular verb is correct.", "Подлежащее здесь box, а не pencils, поэтому нужен глагол в единственном числе."),
    },
    {
      sentence: t("Each of the volunteers submitted ____ report before noon.", "Each of the volunteers submitted ____ report before noon."),
      correct: t("a", "a"),
      explanation: t("Each points to one person at a time, so the singular reference is required.", "Each указывает на одного человека за раз, поэтому нужно единственное число."),
    },
  ]);

  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        `Which word correctly completes the sentence "${scenario.sentence.en}"?`,
        `Какое слово правильно завершает предложение "${scenario.sentence.ru}"?`
      ),
      options: [
        scenario.correct,
        t("are", "are"),
        t("have", "have"),
        t("were", "were"),
      ],
      correctIndex: 0,
      explanation: scenario.explanation,
      hint: t(
        "Ignore the interrupting phrase and find the true subject first.",
        "Игнорируй вставку и сначала найди настоящее подлежащее."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        "What is the safest first move on a subject-verb agreement question?",
        "Какой самый надёжный первый шаг в subject-verb agreement question?"
      ),
      options: [
        t("Find the real subject of the sentence", "Найти настоящее подлежащее предложения"),
        t("Choose the plural verb by default", "По умолчанию выбрать множественное число"),
        t("Read only the last noun", "Прочитать только последнее существительное"),
        t("Check punctuation before the subject", "Сначала смотреть на пунктуацию перед подлежащим"),
      ],
      correctIndex: 0,
      explanation: t(
        "Agreement depends on the real subject, not on the nearest noun or the longest phrase.",
        "Согласование зависит от настоящего подлежащего, а не от ближайшего существительного или самой длинной фразы."
      ),
      hint: t(
        "The nearest noun may be a trap. Strip the sentence down to its core.",
        "Ближайшее существительное может быть ловушкой. Сократи предложение до основы."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        "Why are pronoun-reference questions tied to clarity as well as grammar?",
        "Почему вопросы на pronoun reference связаны не только с грамматикой, но и с ясностью?"
      ),
      options: [
        t("Because the pronoun must point clearly to one specific noun", "Потому что местоимение должно ясно указывать на одно конкретное существительное"),
        t("Because longer pronouns are always stronger", "Потому что длинные местоимения всегда лучше"),
        t("Because plural nouns are never allowed", "Потому что множественное число никогда не допустимо"),
        t("Because punctuation decides the antecedent by itself", "Потому что пунктуация сама по себе определяет antecedent"),
      ],
      correctIndex: 0,
      explanation: t(
        "Good pronoun choices match number and point cleanly to a clear antecedent.",
        "Хороший выбор местоимения совпадает по числу и ясно указывает на понятный antecedent."
      ),
      hint: t(
        "Ask which noun the pronoun would point to if a reader saw it only once.",
        "Спроси себя, на какое существительное указывало бы местоимение, если читатель увидел бы его только один раз."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function buildInferenceQuestions(seed: number, mode: PracticeMode, skillId: string) {
  const scenario = pick(seed, [
    t("A historian relies mostly on private letters rather than public speeches when reconstructing a senator's views.", "Историк в основном опирается на личные письма, а не на публичные речи, когда восстанавливает взгляды сенатора."),
    t("A report notes that the project slowed during winter months because delivery routes were often blocked by snow.", "В отчёте говорится, что проект замедлился зимой, потому что маршруты доставки часто перекрывались снегом."),
    t("The article says the team repeated the experiment after early results were inconsistent.", "В статье сказано, что команда повторила эксперимент после того, как первые результаты оказались непоследовательными."),
  ]);

  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        `Given the statement "${scenario.en}" which inference is most supported?`,
        `Учитывая утверждение "${scenario.ru}" какой вывод наиболее обоснован?`
      ),
      options: [
        t("A modest conclusion that stays close to the evidence", "Умеренный вывод, который остаётся близко к доказательствам"),
        t("An extreme claim that goes far beyond the text", "Крайнее утверждение, которое уходит далеко за пределы текста"),
        t("A total reversal of the passage", "Полный разворот смысла текста"),
        t("A conclusion based only on outside knowledge", "Вывод, основанный только на внешних знаниях"),
      ],
      correctIndex: 0,
      explanation: t(
        "Inference questions reward controlled reasoning. The safest answer is usually modest and text-grounded.",
        "Inference questions награждают контролируемое рассуждение. Самый надёжный ответ обычно умеренный и опирается на текст."
      ),
      hint: t(
        "Stay as close as possible to the wording that appears in the passage.",
        "Оставайся как можно ближе к формулировке, которая есть в тексте."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        "Which answer is usually safest on an inference question?",
        "Какой ответ обычно безопаснее всего в inference question?"
      ),
      options: [
        t("The answer closest to the text's evidence", "Ответ, который ближе всего к доказательствам текста"),
        t("The most dramatic conclusion", "Самый драматичный вывод"),
        t("The answer with the strongest vocabulary", "Ответ с самой сильной лексикой"),
        t("The longest answer choice", "Самый длинный вариант ответа"),
      ],
      correctIndex: 0,
      explanation: t(
        "A good inference goes one careful step beyond the text, not six dramatic steps beyond it.",
        "Хороший вывод делает один аккуратный шаг за пределы текста, а не шесть драматичных."
      ),
      hint: t(
        "Eliminate answers that sound absolute, universal, or overly emotional.",
        "Отбрасывай ответы, которые звучат слишком абсолютно, универсально или эмоционально."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        "Why are extreme answer choices often wrong on inference questions?",
        "Почему extreme answer choices часто оказываются неверными в inference questions?"
      ),
      options: [
        t("Because they overstate what the passage actually supports", "Потому что они преувеличивают то, что текст реально поддерживает"),
        t("Because they are always the shortest", "Потому что они всегда самые короткие"),
        t("Because they use formal punctuation", "Потому что они используют формальную пунктуацию"),
        t("Because they repeat the author's name", "Потому что они повторяют имя автора"),
      ],
      correctIndex: 0,
      explanation: t(
        "Extreme language usually reaches farther than the passage gives permission to reach.",
        "Крайний язык обычно уходит дальше, чем текст разрешает."
      ),
      hint: t(
        "Ask whether the passage proves the full strength of the claim, not just part of it.",
        "Спроси себя, доказывает ли текст полную силу утверждения, а не только его часть."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function buildEditingChecklistQuestions(seed: number, mode: PracticeMode, skillId: string) {
  const scenario = pick(seed, [
    t("answers that differ mostly in punctuation and conjunctions", "варианты, которые в основном отличаются пунктуацией и союзами"),
    t("two revision choices that both sound natural at first", "два варианта редактирования, которые оба сначала звучат естественно"),
    t("a question that mixes grammar, logic, and tone in one set of choices", "вопрос, который смешивает грамматику, логику и тон в одном наборе вариантов"),
  ]);

  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        `If you are choosing between ${scenario.en}, what should you identify first?`,
        `Если ты выбираешь между ${scenario.ru}, что нужно определить первым делом?`
      ),
      options: [
        t("The tested relationship or sentence core", "Проверяемую связь или основу предложения"),
        t("Which answer is longest", "Какой вариант самый длинный"),
        t("Which answer uses the fanciest vocabulary", "Какой вариант использует самую сложную лексику"),
        t("Which answer repeats the passage most", "Какой вариант сильнее всего повторяет текст"),
      ],
      correctIndex: 0,
      explanation: t(
        "A checklist begins by isolating what is actually being tested before comparing surface style.",
        "Checklist начинается с выделения того, что реально проверяется, ещё до сравнения поверхностного стиля."
      ),
      hint: t(
        "Do not compare the options globally. First diagnose the question type.",
        "Не сравнивай варианты слишком общо. Сначала диагностируй тип вопроса."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        "What does a repeatable editing checklist help most with?",
        "С чем больше всего помогает repeatable editing checklist?"
      ),
      options: [
        t("Fast, consistent decision-making", "Быстрое и последовательное принятие решений"),
        t("Random guessing", "Случайное угадывание"),
        t("Writing longer responses", "Написание более длинных ответов"),
        t("Ignoring sentence structure", "Игнорирование структуры предложения"),
      ],
      correctIndex: 0,
      explanation: t(
        "A reliable routine lowers panic and makes good choices repeatable under time pressure.",
        "Надёжная рутина снижает панику и делает хорошие решения повторяемыми под временем."
      ),
      hint: t(
        "The best checklist creates structure when the pressure rises.",
        "Лучший checklist создаёт структуру, когда растёт давление."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        "Which order is usually strongest for a quick editing scan?",
        "Какой порядок обычно самый сильный для быстрого editing scan?"
      ),
      options: [
        t("Core -> logic -> grammar -> tone", "Основа -> логика -> грамматика -> тон"),
        t("Tone -> punctuation -> length -> guess", "Тон -> пунктуация -> длина -> угадывание"),
        t("Length -> vocabulary -> author bio -> tone", "Длина -> словарь -> биография автора -> тон"),
        t("Guess -> reread everything -> hope", "Угадать -> перечитать всё -> надеяться"),
      ],
      correctIndex: 0,
      explanation: t(
        "That order keeps the scan grounded in structure first and style last.",
        "Такой порядок удерживает проверку сначала на структуре, а уже потом на стиле."
      ),
      hint: t(
        "Strong editing starts with sentence structure before surface polish.",
        "Сильное редактирование начинается со структуры предложения, а не с поверхностного блеска."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function pick<T>(seed: number, values: T[]) {
  return values[seed % values.length];
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
