import { localized as t, question, skill, unit, type LearnCourse } from "./sat-learn-base";

export const SAT_READING_WRITING_COURSE: LearnCourse = {
  id: "sat-reading-writing",
  title: t("SAT Reading and Writing", "SAT Reading and Writing"),
  shortTitle: t("Reading and Writing", "Чтение и письмо"),
  eyebrow: t("Digital SAT verbal roadmap", "Дорожная карта вербальной части Digital SAT"),
  summary: t(
    "Study reading, writing, and editing skills through short passage moves, revision logic, and timed verbal checkpoints.",
    "Изучай навыки чтения, письма и редактирования через короткие приёмы работы с текстом, логику правок и вербальные контрольные точки."
  ),
  description: t(
    "This course mirrors the math track with visible units, skill tiles, and quick transitions from explanation into practice.",
    "Этот курс повторяет математический трек: заметные юниты, карточки навыков и быстрый переход от объяснения к практике."
  ),
  banner: t(
    "Your goal is not to read more slowly. It is to see purpose, tone, and grammar signals more quickly.",
    "Твоя цель не в том, чтобы читать медленнее. Твоя цель - быстрее видеть цель текста, тон и грамматические сигналы."
  ),
  practiceHint: t(
    "Best flow: one passage skill -> one quick check -> one short edit review.",
    "Лучший ритм: один навык по пассажам -> одна быстрая проверка -> один короткий разбор редактирования."
  ),
  challengeText: t(
    "Use the mixed verbal challenge when you want to switch fast between reading and editing tasks.",
    "Используй смешанный вербальный блок, когда хочешь быстро переключаться между заданиями на чтение и редактирование."
  ),
  units: [
    unit({
      id: "rw-intro",
      order: 1,
      title: t("About Digital SAT Reading and Writing", "О SAT Reading and Writing"),
      summary: t(
        "Understand the short-passage format, domain switching, and why precision matters more than speed-reading.",
        "Разберись с форматом коротких пассажей, переключением между доменами и тем, почему точность важнее скорочтения."
      ),
      note: t(
        "Use this unit to reset your verbal approach.",
        "Используй этот юнит, чтобы перенастроить свой вербальный подход."
      ),
      skills: [],
      hasQuiz: false,
      hasUnitTest: false,
    }),
    unit({
      id: "rw-information",
      order: 2,
      title: t("Information and ideas", "Информация и идеи"),
      summary: t(
        "Find the central idea, supporting evidence, and what a chart adds to the passage.",
        "Находи главную идею, подтверждающее доказательство и то, что график добавляет к тексту."
      ),
      note: t(
        "Verbal accuracy starts with reading what the passage actually says.",
        "Точность в вербальной части начинается с чтения того, что текст реально говорит."
      ),
      hasQuiz: true,
      hasUnitTest: false,
      skills: [
        skill({
          id: "central-idea",
          title: t("Find the central idea", "Поиск главной идеи"),
          shortTitle: t("Central idea", "Главная идея"),
          summary: t(
            "Look for the passage's main claim or purpose, not a catchy detail.",
            "Ищи главную мысль или цель текста, а не яркую деталь."
          ),
          lesson: t(
            "A central idea answer should cover the whole passage in a balanced way. If a choice is too narrow or only mentions one example, it probably misses the author's real focus.",
            "Правильный ответ на вопрос о главной идее должен в равной мере охватывать весь пассаж. Если вариант слишком узкий или говорит только об одном примере, он, скорее всего, не передаёт настоящий фокус автора."
          ),
          strategy: t(
            "Ask: what is the passage mostly doing from beginning to end?",
            "Спроси себя: что в целом делает этот пассаж от начала до конца?"
          ),
          checkpoints: [
            t("A detail is not the main idea.", "Деталь не равна главной идее."),
            t("Look at opening and ending sentences together.", "Смотри вместе на начало и конец текста."),
            t("Avoid answers broader than the passage.", "Избегай ответов, которые шире самого текста."),
          ],
          example: {
            prompt: t("A passage explains why urban trees reduce city heat. What is the central idea?", "Пассаж объясняет, почему городские деревья уменьшают жару в городе. В чём главная идея?"),
            answer: t("Urban trees help reduce heat in cities.", "Городские деревья помогают снижать жару в городах."),
            explanation: t(
              "That answer captures the whole focus without narrowing to one statistic.",
              "Такой ответ передаёт общий фокус и не сужает его до одной статистики."
            ),
          },
          quiz: [
            question({
              id: "central-idea-q1",
              prompt: t("Which choice is least likely to be the central idea of a whole passage?", "Какой вариант с наименьшей вероятностью будет главной идеей всего пассажа?"),
              options: [
                t("A broad summary of the passage's focus", "Широкое резюме основного фокуса текста"),
                t("A statement about one small example only", "Утверждение только об одном маленьком примере"),
                t("A balanced claim covering multiple parts", "Сбалансированное утверждение, охватывающее несколько частей"),
                t("A sentence matching the author's purpose", "Предложение, совпадающее с целью автора"),
              ],
              correctIndex: 1,
              explanation: t(
                "One example may support the passage, but it usually cannot stand in for the central idea.",
                "Один пример может поддерживать текст, но обычно не заменяет главную идею."
              ),
            }),
          ],
          status: "proficient",
          minutes: 11,
        }),
        skill({
          id: "evidence-pairing",
          title: t("Pair a claim with evidence", "Подбор утверждения и доказательства"),
          shortTitle: t("Evidence pairing", "Доказательства"),
          summary: t(
            "Choose the line or idea that best supports the correct claim.",
            "Выбирай строку или идею, которая лучше всего поддерживает правильное утверждение."
          ),
          lesson: t(
            "Evidence questions reward discipline. First decide the claim, then look for the exact line that proves it. Strong evidence is direct, not merely related.",
            "Вопросы на evidence reward discipline. Сначала реши, какое утверждение верно, а потом ищи строку, которая это доказывает. Сильное доказательство прямое, а не просто связанное."
          ),
          strategy: t(
            "Answer the claim question first, then hunt for the clearest proof.",
            "Сначала ответь на вопрос про утверждение, потом ищи самое явное доказательство."
          ),
          checkpoints: [
            t("Evidence should prove, not merely mention.", "Доказательство должно подтверждать, а не просто упоминать."),
            t("Watch for paraphrases of the same idea.", "Замечай перефразирование одной и той же мысли."),
            t("Direct support beats poetic wording.", "Прямое подтверждение лучше красивой формулировки."),
          ],
          example: {
            prompt: t("A passage says bees improve crop production. What evidence is best?", "В тексте говорится, что пчёлы улучшают урожайность. Какое доказательство будет лучшим?"),
            answer: t("A line showing farms with more bee activity produce more crops.", "Строка, показывающая, что фермы с большей активностью пчёл дают больший урожай."),
            explanation: t(
              "The evidence directly connects bees to crop output.",
              "Это доказательство напрямую связывает пчёл с объёмом урожая."
            ),
          },
          quiz: [
            question({
              id: "evidence-pairing-q1",
              prompt: t("What makes a line strong evidence?", "Что делает строку сильным доказательством?"),
              options: [
                t("It sounds dramatic", "Она звучит драматично"),
                t("It directly proves the claim", "Она напрямую доказывает утверждение"),
                t("It is the longest sentence", "Это самое длинное предложение"),
                t("It uses difficult vocabulary", "В ней сложная лексика"),
              ],
              correctIndex: 1,
              explanation: t(
                "Strong evidence clearly supports the claim instead of only sounding related.",
                "Сильное доказательство ясно подтверждает утверждение, а не просто выглядит связанным."
              ),
            }),
          ],
          status: "familiar",
          minutes: 11,
        }),
      ],
    }),
    unit({
      id: "rw-craft",
      order: 3,
      title: t("Craft and structure", "Craft and structure"),
      summary: t(
        "Interpret word choice, tone, and sentence function.",
        "Интерпретируй выбор слов, тон и функцию предложения."
      ),
      note: t(
        "The wrong answer often feels plausible because it is half-right.",
        "Неверный ответ часто кажется правдоподобным, потому что он наполовину верный."
      ),
      hasQuiz: true,
      hasUnitTest: false,
      skills: [
        skill({
          id: "words-in-context",
          title: t("Interpret words in context", "Слова в контексте"),
          shortTitle: t("Words in context", "Слова в контексте"),
          summary: t(
            "Use nearby clues to choose the meaning that fits this exact sentence.",
            "Используй ближайшие подсказки, чтобы выбрать значение, подходящее именно к этому предложению."
          ),
          lesson: t(
            "A word can shift meaning across contexts. Read the sentence around the word carefully and choose the meaning that matches the local logic, not the most common dictionary meaning.",
            "Слово может менять значение в разных контекстах. Внимательно читай предложение вокруг слова и выбирай значение, которое подходит местной логике, а не самое привычное словарное."
          ),
          strategy: t(
            "Cover the word, predict the meaning, then compare to the choices.",
            "Закрой слово, предскажи смысл, затем сравни с вариантами."
          ),
          checkpoints: [
            t("Context beats common usage.", "Контекст важнее обычного значения."),
            t("Tone can rule out a tempting choice.", "Тон текста может убрать соблазнительный вариант."),
            t("Read one sentence before and after when possible.", "По возможности прочитай предложение до и после."),
          ],
          example: {
            prompt: t("In 'the scientist noted a sharp decline,' what does sharp most likely mean?", "В фразе 'the scientist noted a sharp decline' что, скорее всего, значит sharp?"),
            answer: t("Sudden or steep", "Резкий"),
            explanation: t(
              "The context is about change in amount, not about a physical edge.",
              "Контекст говорит об изменении величины, а не о физической остроте."
            ),
          },
          quiz: [
            question({
              id: "words-in-context-q1",
              prompt: t("What is the best first move on a words-in-context question?", "Какой лучший первый шаг в задаче на words-in-context?"),
              options: [
                t("Pick the fanciest synonym", "Выбрать самый сложный синоним"),
                t("Use the meaning suggested by the surrounding sentence", "Использовать значение, подсказанное окружающим предложением"),
                t("Ignore the sentence and trust memory", "Игнорировать предложение и довериться памяти"),
                t("Choose the shortest answer", "Выбрать самый короткий ответ"),
              ],
              correctIndex: 1,
              explanation: t(
                "The correct meaning comes from the context around the word.",
                "Правильное значение определяется контекстом вокруг слова."
              ),
            }),
          ],
          status: "mastered",
          minutes: 9,
        }),
        skill({
          id: "tone-function",
          title: t("Track tone and sentence function", "Определение тона и функции предложения"),
          shortTitle: t("Tone and function", "Тон и функция"),
          summary: t(
            "Ask what attitude the author shows and what job a sentence performs.",
            "Спроси себя, какое отношение показывает автор и какую роль выполняет предложение."
          ),
          lesson: t(
            "Tone questions depend on the full phrasing of the passage. Function questions are easier when you explain how the sentence helps the paragraph move forward.",
            "Вопросы на тон зависят от общей формулировки пассажа. Вопросы на функцию проще, если ты объясняешь, как предложение двигает абзац вперёд."
          ),
          strategy: t(
            "Describe the sentence's job in your own words before checking choices.",
            "Своими словами опиши роль предложения до просмотра вариантов."
          ),
          checkpoints: [
            t("Tone should match multiple word choices, not one.", "Тон должен подтверждаться несколькими словами, а не одним."),
            t("Function is about purpose inside the paragraph.", "Функция - это роль предложения внутри абзаца."),
            t("Neutral academic tone is common on the SAT.", "Нейтральный академический тон часто встречается на SAT."),
          ],
          example: {
            prompt: t("A sentence introduces a research result after describing a question. What is its function?", "Предложение вводит результат исследования после описания вопроса. Какова его функция?"),
            answer: t("It presents the answer or finding.", "Оно представляет ответ или результат."),
            explanation: t(
              "The sentence advances the paragraph by moving from setup to evidence.",
              "Предложение двигает абзац от постановки вопроса к доказательству."
            ),
          },
          quiz: [
            question({
              id: "tone-function-q1",
              prompt: t("A sentence gives an example after a general claim. What is its likely function?", "Предложение приводит пример после общего утверждения. Какова его вероятная функция?"),
              options: [
                t("To contradict the claim", "Противоречить утверждению"),
                t("To illustrate the claim", "Проиллюстрировать утверждение"),
                t("To change the topic", "Сменить тему"),
                t("To define a new word only", "Только определить новое слово"),
              ],
              correctIndex: 1,
              explanation: t(
                "Examples usually help explain or support a broader point.",
                "Примеры обычно помогают объяснить или поддержать более общую мысль."
              ),
            }),
          ],
          status: "familiar",
          minutes: 11,
        }),
      ],
    }),
    unit({
      id: "rw-expression",
      order: 4,
      title: t("Expression of ideas", "Expression of ideas"),
      summary: t(
        "Improve transitions and organization with editor-style choices.",
        "Улучшай transitions и организацию через редакторские решения."
      ),
      note: t(
        "Always ask what will make the paragraph clearer for the reader.",
        "Всегда спрашивай, что сделает абзац яснее для читателя."
      ),
      hasQuiz: true,
      hasUnitTest: false,
      skills: [
        skill({
          id: "logical-transitions",
          title: t("Choose logical transitions", "Выбор логичных переходов"),
          shortTitle: t("Transitions", "Переходы"),
          summary: t(
            "Pick the connector that matches the real relationship between ideas.",
            "Выбирай связку, которая соответствует реальной связи между идеями."
          ),
          lesson: t(
            "Transition questions are logic questions. Before reading the options, decide whether the second sentence adds information, contrasts, or shows a result.",
            "Вопросы на transition - это вопросы на логику. До просмотра вариантов реши, второе предложение добавляет информацию, противопоставляет или показывает результат."
          ),
          strategy: t(
            "Name the relationship first, then match it to the transition.",
            "Сначала назови связь между предложениями, потом подбери переход."
          ),
          checkpoints: [
            t("However signals contrast.", "However показывает противопоставление."),
            t("For example signals illustration.", "For example показывает пример."),
            t("Therefore signals result.", "Therefore показывает результат."),
          ],
          example: {
            prompt: t("Sentence 1 gives a problem; sentence 2 gives a solution. Which relationship is this?", "Первое предложение даёт проблему, второе - решение. Какая это связь?"),
            answer: t("Problem/solution", "Проблема/решение"),
            explanation: t(
              "The transition should show that the second sentence responds to the first.",
              "Переход должен показывать, что второе предложение отвечает на первое."
            ),
          },
          quiz: [
            question({
              id: "logical-transitions-q1",
              prompt: t("Which transition best signals contrast?", "Какой переход лучше всего показывает противопоставление?"),
              options: [t("However", "However"), t("For example", "For example"), t("Similarly", "Similarly"), t("In addition", "In addition")],
              correctIndex: 0,
              explanation: t(
                "However is used when the second idea contrasts with the first.",
                "However используется, когда вторая мысль противопоставляется первой."
              ),
            }),
          ],
          status: "familiar",
          minutes: 9,
        }),
        skill({
          id: "paragraph-organization",
          title: t("Revise for focus and organization", "Редактирование ради фокуса и организации"),
          shortTitle: t("Organization", "Организация"),
          summary: t(
            "Keep each sentence where it best supports the paragraph's purpose.",
            "Держи каждое предложение там, где оно лучше всего поддерживает цель абзаца."
          ),
          lesson: t(
            "Organization questions ask whether a sentence belongs, where it belongs, or whether a paragraph stays focused. The best answer improves logic and flow, not just grammar.",
            "Вопросы на organization спрашивают, нужно ли предложение, где ему место и сохраняет ли абзац фокус. Лучший ответ улучшает логику и поток, а не только грамматику."
          ),
          strategy: t(
            "Find the paragraph's goal, then keep only what directly serves that goal.",
            "Найди цель абзаца и оставь только то, что прямо ей служит."
          ),
          checkpoints: [
            t("A good sentence can still be off-topic.", "Даже хорошее предложение может быть не по теме."),
            t("Topic sentence logic matters.", "Логика topic sentence важна."),
            t("Examples should appear after the idea they support.", "Примеры должны стоять после идеи, которую поддерживают."),
          ],
          example: {
            prompt: t("A paragraph explains one experiment, then adds an unrelated historical fact. What is likely best?", "Абзац объясняет один эксперимент, а затем добавляет несвязанный исторический факт. Что, скорее всего, лучше?"),
            answer: t("Delete the unrelated fact.", "Удалить несвязанный факт."),
            explanation: t(
              "The extra sentence hurts focus because it does not support the paragraph's purpose.",
              "Лишнее предложение разрушает фокус, потому что не поддерживает цель абзаца."
            ),
          },
          quiz: [
            question({
              id: "paragraph-organization-q1",
              prompt: t("What should guide a sentence placement question?", "Что должно определять решение в задаче на расположение предложения?"),
              options: [
                t("Where the sentence sounds fanciest", "Где предложение звучит красивее"),
                t("Where it best supports the paragraph's logic", "Где оно лучше всего поддерживает логику абзаца"),
                t("Where it makes the paragraph longer", "Где оно делает абзац длиннее"),
                t("Where it repeats the thesis most", "Где оно сильнее всего повторяет тезис"),
              ],
              correctIndex: 1,
              explanation: t(
                "Placement should improve the paragraph's clarity and progression of ideas.",
                "Расположение должно улучшать ясность и развитие мысли в абзаце."
              ),
            }),
          ],
          status: "attempted",
          minutes: 11,
        }),
      ],
    }),
    unit({
      id: "rw-conventions",
      order: 5,
      title: t("Standard English conventions", "Standard English conventions"),
      summary: t(
        "Sharpen grammar and sentence control with high-yield editing patterns.",
        "Отточишь грамматику и контроль предложения через high-yield паттерны редактирования."
      ),
      note: t(
        "Find the sentence core before editing the extras.",
        "Сначала найди основу предложения, а потом редактируй остальное."
      ),
      hasQuiz: true,
      hasUnitTest: false,
      skills: [
        skill({
          id: "sentence-boundaries",
          title: t("Fix sentence boundaries", "Исправление границ предложения"),
          shortTitle: t("Sentence boundaries", "Границы предложения"),
          summary: t(
            "Distinguish complete sentences from fragments and run-ons.",
            "Различай полные предложения, фрагменты и run-ons."
          ),
          lesson: t(
            "A complete sentence needs a subject and a verb. If two complete ideas are joined, they need a period, semicolon, or an appropriate conjunction.",
            "Полное предложение требует subject и verb. Если соединяются две полные мысли, нужен period, semicolon или подходящий союз."
          ),
          strategy: t(
            "Find the clause cores first, then decide whether you have one full sentence or two.",
            "Сначала найди основы clauses, затем реши, у тебя одно полное предложение или два."
          ),
          checkpoints: [
            t("A comma alone cannot join two complete sentences.", "Одна запятая не может соединять два полных предложения."),
            t("Fragments miss a core part.", "Во фрагменте не хватает ключевой части."),
            t("Semicolons join closely related complete sentences.", "Semicolons соединяют близкие по смыслу полные предложения."),
          ],
          example: {
            prompt: t("The museum opened early, visitors arrived before sunrise. What is the issue?", "The museum opened early, visitors arrived before sunrise. В чём проблема?"),
            answer: t("It is a comma splice.", "Это comma splice."),
            explanation: t(
              "Two complete sentences are joined by only a comma.",
              "Два полных предложения соединены только запятой."
            ),
          },
          quiz: [
            question({
              id: "sentence-boundaries-q1",
              prompt: t("What is needed to join two complete sentences correctly?", "Что нужно, чтобы правильно соединить два полных предложения?"),
              options: [
                t("Just a comma", "Только запятая"),
                t("A semicolon or conjunction", "Semicolon или союз"),
                t("Nothing", "Ничего"),
                t("Another adjective", "Ещё одно прилагательное"),
              ],
              correctIndex: 1,
              explanation: t(
                "Two complete thoughts need stronger punctuation or a conjunction.",
                "Две полные мысли требуют более сильной пунктуации или союза."
              ),
            }),
          ],
          status: "proficient",
          minutes: 10,
        }),
        skill({
          id: "agreement-reference",
          title: t("Check agreement and reference", "Согласование и reference"),
          shortTitle: t("Agreement", "Согласование"),
          summary: t(
            "Match verbs and pronouns to the real subject, not the nearest noun.",
            "Согласовывай глаголы и местоимения с настоящим subject, а не с ближайшим существительным."
          ),
          lesson: t(
            "Agreement questions are designed to distract you with extra phrases. Strip the sentence down to its subject and verb pair first.",
            "В agreement questions тебя специально отвлекают лишними фразами. Сначала сократи предложение до пары subject-verb."
          ),
          strategy: t(
            "Ignore interruptions, find the core noun, then match the verb or pronoun to it.",
            "Игнорируй вставки, найди главное существительное и только потом подбирай глагол или местоимение."
          ),
          checkpoints: [
            t("The nearest noun may be a trap.", "Ближайшее существительное может быть ловушкой."),
            t("Collective nouns need context.", "Collective nouns требуют внимания к контексту."),
            t("Pronouns must point clearly to one noun.", "Местоимение должно ясно указывать на одно существительное."),
          ],
          example: {
            prompt: t("The box of pencils is on the desk. Why is is correct?", "The box of pencils is on the desk. Почему is правильно?"),
            answer: t("Because box is the subject.", "Потому что subject - это box."),
            explanation: t(
              "Pencils is inside a prepositional phrase and does not control the verb.",
              "Pencils находится во фразе с предлогом и не определяет форму глагола."
            ),
          },
          quiz: [
            question({
              id: "agreement-reference-q1",
              prompt: t("What is the safest first step on a subject-verb agreement question?", "Какой самый надёжный первый шаг в задаче на согласование подлежащего и сказуемого?"),
              options: [
                t("Choose the plural verb by default", "По умолчанию выбрать множественное число"),
                t("Find the real subject of the sentence", "Найти настоящий subject предложения"),
                t("Read only the last noun", "Прочитать только последнее существительное"),
                t("Look for commas first", "Сначала искать запятые"),
              ],
              correctIndex: 1,
              explanation: t(
                "Agreement depends on the actual subject, not whatever noun appears closest.",
                "Согласование зависит от настоящего subject, а не от ближайшего существительного."
              ),
            }),
          ],
          status: "familiar",
          minutes: 10,
        }),
      ],
    }),
    unit({
      id: "rw-mixed",
      order: 6,
      title: t("Mixed verbal challenge", "Смешанный вербальный блок"),
      summary: t(
        "Practice switching quickly between inference, rhetoric, and editing decisions.",
        "Тренируй быстрое переключение между inference, rhetoric и editing решениями."
      ),
      note: t(
        "The goal here is flexible recognition, not perfection on the first read.",
        "Цель здесь - гибкое распознавание, а не идеальность с первого чтения."
      ),
      hasQuiz: true,
      hasUnitTest: true,
      skills: [
        skill({
          id: "inference-under-time",
          title: t("Make careful inferences under time", "Аккуратные выводы под таймером"),
          shortTitle: t("Inference", "Вывод"),
          summary: t(
            "Infer only what the passage supports, even when answers sound tempting.",
            "Делай выводы только на основе того, что текст поддерживает, даже если ответы звучат заманчиво."
          ),
          lesson: t(
            "Inference is controlled reasoning, not imagination. The best answer usually feels modest and text-grounded. Extreme language often signals a trap.",
            "Inference - это контролируемое рассуждение, а не фантазия. Лучший ответ обычно звучит сдержанно и опирается на текст. Крайние формулировки часто являются ловушкой."
          ),
          strategy: t(
            "Underline the clue, then choose the answer that stays closest to it.",
            "Подчеркни подсказку в тексте, потом выбери ответ, который ближе всего к ней."
          ),
          checkpoints: [
            t("An inference should be supported, not merely possible.", "Inference должен быть подтверждён, а не просто возможен."),
            t("Extreme words often overreach.", "Крайние слова часто заходят слишком далеко."),
            t("Stay anchored to the passage.", "Оставайся привязанным к тексту."),
          ],
          example: {
            prompt: t("A passage says a project was delayed by weather. What can you infer?", "В тексте сказано, что проект задержался из-за погоды. Что можно вывести?"),
            answer: t("Weather affected the project's timeline.", "Погода повлияла на сроки проекта."),
            explanation: t(
              "That conclusion stays close to the exact information given.",
              "Этот вывод остаётся близким к прямо указанной информации."
            ),
          },
          quiz: [
            question({
              id: "inference-under-time-q1",
              prompt: t("Which answer is usually safest on an inference question?", "Какой ответ обычно безопаснее всего в задаче на вывод?"),
              options: [
                t("The most dramatic conclusion", "Самый драматичный вывод"),
                t("The answer closest to the text's evidence", "Ответ, ближе всего стоящий к доказательствам из текста"),
                t("The answer with the strongest vocabulary", "Ответ с самой сильной лексикой"),
                t("The longest answer choice", "Самый длинный вариант"),
              ],
              correctIndex: 1,
              explanation: t(
                "Good inferences stay close to what the passage actually supports.",
                "Хорошие выводы остаются близкими к тому, что реально поддерживает текст."
              ),
            }),
          ],
          status: "attempted",
          minutes: 10,
        }),
        skill({
          id: "editing-checklist",
          title: t("Use a fast editing checklist", "Быстрый чеклист редактирования"),
          shortTitle: t("Checklist", "Чеклист"),
          summary: t(
            "Build a repeatable scan for sentence core, logic, grammar, and tone.",
            "Построй повторяемую проверку: основа предложения, логика, грамматика и тон."
          ),
          lesson: t(
            "Strong verbal timing comes from routines. Instead of rereading aimlessly, run the same quick checklist every time.",
            "Сильный темп в вербальной части рождается из рутины. Вместо беспорядочного перечитывания запускай один и тот же быстрый чеклист каждый раз."
          ),
          strategy: t(
            "Core -> logic -> grammar -> tone. Use the same order every time.",
            "Основа -> логика -> грамматика -> тон. Используй один и тот же порядок каждый раз."
          ),
          checkpoints: [
            t("Routines reduce panic.", "Рутины снижают панику."),
            t("Do not reread everything equally.", "Не перечитывай всё одинаково долго."),
            t("Let the question type guide the scan.", "Пусть тип вопроса направляет проверку."),
          ],
          example: {
            prompt: t("You are stuck between two grammar choices. What should you check first?", "Ты застрял между двумя грамматическими вариантами. Что проверить первым делом?"),
            answer: t("The sentence core and the tested relationship", "Основу предложения и проверяемую связь"),
            explanation: t(
              "A checklist narrows the issue before you compare surface wording.",
              "Чеклист сужает проблему ещё до сравнения поверхностной формулировки."
            ),
          },
          quiz: [
            question({
              id: "editing-checklist-q1",
              prompt: t("What does a repeatable editing checklist help most with?", "С чем больше всего помогает повторяемый чеклист редактирования?"),
              options: [
                t("Random guessing", "Случайное угадывание"),
                t("Fast, consistent decision-making", "Быстрое и последовательное принятие решений"),
                t("Writing longer answers", "Написание более длинных ответов"),
                t("Ignoring sentence structure", "Игнорирование структуры предложения"),
              ],
              correctIndex: 1,
              explanation: t(
                "A routine lets you evaluate questions quickly without losing structure.",
                "Рутина помогает быстро оценивать вопросы и не терять структуру мышления."
              ),
            }),
          ],
          status: "not_started",
          minutes: 8,
        }),
      ],
    }),
  ],
};
