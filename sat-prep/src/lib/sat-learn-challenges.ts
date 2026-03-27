import { localized as t, question, type LearnQuestion } from "./sat-learn-base";

export const SKILL_CHALLENGE_QUESTIONS: Record<string, LearnQuestion[]> = {
  "linear-equations": [
    question({
      id: "linear-equations-q2",
      prompt: t(
        "Solve 2(3x - 4) - 5 = x + 12.",
        "Реши 2(3x - 4) - 5 = x + 12."
      ),
      options: [t("3", "3"), t("5", "5"), t("7", "7"), t("-5", "-5")],
      correctIndex: 1,
      explanation: t(
        "Expand first: 6x - 8 - 5 = x + 12, so 6x - 13 = x + 12. Then 5x = 25 and x = 5.",
        "Сначала раскрой скобки: 6x - 8 - 5 = x + 12, то есть 6x - 13 = x + 12. Затем 5x = 25 и x = 5."
      ),
    }),
  ],
  "linear-functions": [
    question({
      id: "linear-functions-q2",
      prompt: t(
        "A gym membership costs $148 after 4 months and $214 after 7 months. Assuming a linear model, what is the monthly fee?",
        "Абонемент в спортзал стоит 148 долларов через 4 месяца и 214 долларов через 7 месяцев. Если модель линейная, какова месячная плата?"
      ),
      options: [t("$18", "18 долларов"), t("$22", "22 доллара"), t("$28", "28 долларов"), t("$66", "66 долларов")],
      correctIndex: 1,
      explanation: t(
        "The total cost increased by 66 dollars over 3 months, so the monthly rate is 66/3 = 22 dollars.",
        "Общая стоимость выросла на 66 долларов за 3 месяца, значит месячная ставка равна 66/3 = 22 доллара."
      ),
    }),
  ],
  "ratios-rates-percent": [
    question({
      id: "ratios-rates-percent-q2",
      prompt: t(
        "An item originally costs $50. Its price increases by 20% and then the new price is discounted by 20%. What is the final price?",
        "Товар изначально стоит 50 долларов. Его цена повышается на 20%, а затем новая цена снижается на 20%. Какова итоговая цена?"
      ),
      options: [t("$48", "48 долларов"), t("$50", "50 долларов"), t("$52", "52 доллара"), t("$40", "40 долларов")],
      correctIndex: 0,
      explanation: t(
        "First increase: 50 x 1.2 = 60. Then discount: 60 x 0.8 = 48. Equal percent up and down do not cancel out.",
        "Сначала повышение: 50 x 1.2 = 60. Затем скидка: 60 x 0.8 = 48. Равные проценты вверх и вниз не сокращаются друг с другом."
      ),
    }),
  ],
  "probability-data": [
    question({
      id: "probability-data-q2",
      prompt: t(
        "A bag contains 4 red, 3 blue, and 2 green marbles. If two marbles are drawn without replacement, what is the probability that the first is red and the second is blue?",
        "В мешке 4 красных, 3 синих и 2 зелёных шарика. Если вытаскивают два шарика без возвращения, какова вероятность, что первый будет красным, а второй синим?"
      ),
      options: [t("1/6", "1/6"), t("1/3", "1/3"), t("4/9", "4/9"), t("1/12", "1/12")],
      correctIndex: 0,
      explanation: t(
        "P(red first) = 4/9 and then P(blue second) = 3/8, so multiply: 4/9 x 3/8 = 12/72 = 1/6.",
        "P(красный первым) = 4/9, затем P(синий вторым) = 3/8, поэтому перемножаем: 4/9 x 3/8 = 12/72 = 1/6."
      ),
    }),
  ],
  "factoring-quadratics": [
    question({
      id: "factoring-quadratics-q2",
      prompt: t(
        "Which value of c makes x^2 + cx + 20 factor into two positive integer binomials?",
        "Какое значение c делает x^2 + cx + 20 разложимым на два биномиала с положительными целыми коэффициентами?"
      ),
      options: [t("6", "6"), t("7", "7"), t("9", "9"), t("11", "11")],
      correctIndex: 2,
      explanation: t(
        "To factor x^2 + cx + 20, find two positive integers whose product is 20 and sum is c. The pair 4 and 5 works, so c = 9.",
        "Чтобы разложить x^2 + cx + 20, нужно найти два положительных целых числа с произведением 20 и суммой c. Подходит пара 4 и 5, значит c = 9."
      ),
    }),
  ],
  "function-notation": [
    question({
      id: "function-notation-q2",
      prompt: t(
        "If f(x) = x^2 - 2 and g(x) = 3x + 1, what is f(g(2))?",
        "Если f(x) = x^2 - 2 и g(x) = 3x + 1, чему равно f(g(2))?"
      ),
      options: [t("21", "21"), t("47", "47"), t("49", "49"), t("63", "63")],
      correctIndex: 1,
      explanation: t(
        "First find g(2) = 3(2) + 1 = 7. Then evaluate f(7) = 7^2 - 2 = 49 - 2 = 47.",
        "Сначала найдём g(2) = 3(2) + 1 = 7. Затем вычислим f(7) = 7^2 - 2 = 49 - 2 = 47."
      ),
    }),
  ],
  "area-volume": [
    question({
      id: "area-volume-q2",
      prompt: t(
        "A cylinder has radius 3 and height 5. What is its volume in terms of pi?",
        "У цилиндра радиус 3 и высота 5. Чему равен его объём в терминах pi?"
      ),
      options: [t("15pi", "15pi"), t("30pi", "30pi"), t("45pi", "45pi"), t("90pi", "90pi")],
      correctIndex: 2,
      explanation: t(
        "Volume of a cylinder is pi r^2 h = pi x 3^2 x 5 = 45pi.",
        "Объём цилиндра равен pi r^2 h = pi x 3^2 x 5 = 45pi."
      ),
    }),
  ],
  "right-triangles-trig": [
    question({
      id: "right-triangles-trig-q2",
      prompt: t(
        "In a right triangle, sin(theta) = 3/5 and the hypotenuse is 20. What is the length of the side opposite theta?",
        "В прямоугольном треугольнике sin(theta) = 3/5, а гипотенуза равна 20. Какова длина стороны, лежащей напротив theta?"
      ),
      options: [t("8", "8"), t("12", "12"), t("15", "15"), t("16", "16")],
      correctIndex: 1,
      explanation: t(
        "Since sin(theta) = opposite/hypotenuse = 3/5, the opposite side is (3/5) x 20 = 12.",
        "Так как sin(theta) = opposite/hypotenuse = 3/5, противоположная сторона равна (3/5) x 20 = 12."
      ),
    }),
  ],
  "systems-modeling": [
    question({
      id: "systems-modeling-q2",
      prompt: t(
        "Two adult tickets and three student tickets cost $51. Four adult tickets and one student ticket cost $57. What is the price of one student ticket?",
        "Два взрослых билета и три студенческих стоят 51 доллар. Четыре взрослых билета и один студенческий стоят 57 долларов. Сколько стоит один студенческий билет?"
      ),
      options: [t("$7", "7 долларов"), t("$9", "9 долларов"), t("$11", "11 долларов"), t("$15", "15 долларов")],
      correctIndex: 1,
      explanation: t(
        "Let a be the adult price and s the student price. Solve 2a + 3s = 51 and 4a + s = 57 to get a = 12 and s = 9.",
        "Пусть a - цена взрослого билета, а s - цена студенческого. Решая 2a + 3s = 51 и 4a + s = 57, получаем a = 12 и s = 9."
      ),
    }),
  ],
  "timed-mixed-set": [
    question({
      id: "timed-mixed-set-q2",
      prompt: t(
        "Which value is closest to sqrt(50) + sqrt(18)?",
        "Какое значение ближе всего к sqrt(50) + sqrt(18)?"
      ),
      options: [t("9", "9"), t("11", "11"), t("13", "13"), t("15", "15")],
      correctIndex: 1,
      explanation: t(
        "sqrt(50) is a little above 7 and sqrt(18) is a little above 4, so the sum is about 11.3. Estimation is the fastest reliable method here.",
        "sqrt(50) немного больше 7, а sqrt(18) немного больше 4, значит сумма около 11.3. Здесь оценка - самый быстрый надёжный способ."
      ),
    }),
  ],
  "central-idea": [
    question({
      id: "central-idea-q2",
      prompt: t(
        "A passage explains that a city added shaded bus stops, surveyed riders, and found that wait times felt more manageable during summer heat. Which choice best states the passage's central idea?",
        "В тексте говорится, что город установил затенённые автобусные остановки, опросил пассажиров и обнаружил, что ожидание в летнюю жару стало переноситься легче. Какой вариант лучше всего передаёт главную идею текста?"
      ),
      options: [
        t("Shaded bus-stop design improved riders' experience during hot weather.", "Дизайн затенённых остановок улучшил опыт пассажиров в жаркую погоду."),
        t("All public transit problems can be solved through architecture alone.", "Все проблемы общественного транспорта можно решить одной только архитектурой."),
        t("Passenger surveys are less useful than traffic data.", "Опросы пассажиров менее полезны, чем транспортные данные."),
        t("Summer heat has no effect on how riders perceive delays.", "Летняя жара не влияет на то, как пассажиры воспринимают задержки."),
      ],
      correctIndex: 0,
      explanation: t(
        "The passage focuses on one design change and its effect on rider experience, not on extreme claims about all transit policy.",
        "Текст сосредоточен на одном изменении дизайна и его влиянии на пассажиров, а не на крайних выводах обо всей транспортной политике."
      ),
    }),
  ],
  "evidence-pairing": [
    question({
      id: "evidence-pairing-q2",
      prompt: t(
        "Which sentence best supports the claim that a new irrigation method reduced water use without lowering crop output?",
        "Какое предложение лучше всего подтверждает утверждение, что новый способ орошения снизил расход воды без снижения урожайности?"
      ),
      options: [
        t("Fields using the new system produced harvests similar to last year while using 18% less water.", "Поля с новой системой дали урожай примерно на уровне прошлого года, используя при этом на 18% меньше воды."),
        t("Farmers attended a workshop before trying the new system.", "Фермеры посетили семинар перед тем, как попробовать новую систему."),
        t("The region has faced water shortages for several years.", "Регион сталкивается с нехваткой воды уже несколько лет."),
        t("Some growers were initially skeptical of changing equipment.", "Некоторые фермеры сначала скептически относились к замене оборудования."),
      ],
      correctIndex: 0,
      explanation: t(
        "That sentence directly addresses both parts of the claim: less water use and steady crop output.",
        "Это предложение напрямую подтверждает обе части утверждения: меньше воды и стабильный урожай."
      ),
    }),
  ],
  "words-in-context": [
    question({
      id: "words-in-context-q2",
      prompt: t(
        "In the sentence 'The committee was reserved in its praise of the proposal,' what does reserved most nearly mean?",
        "В предложении 'The committee was reserved in its praise of the proposal' что ближе всего означает reserved?"
      ),
      options: [
        t("Enthusiastic", "Восторженный"),
        t("Cautious", "Сдержанный"),
        t("Confused", "Сбитый с толку"),
        t("Secretive", "Скрытный"),
      ],
      correctIndex: 1,
      explanation: t(
        "Here reserved means restrained or cautious, not secretive. The committee is praising carefully rather than enthusiastically.",
        "Здесь reserved означает сдержанный или осторожный, а не скрытный. Комитет хвалит с осторожностью, а не с энтузиазмом."
      ),
    }),
  ],
  "tone-function": [
    question({
      id: "tone-function-q2",
      prompt: t(
        "After listing several failed attempts, an author writes, 'Only after the third trial did the team isolate the cause.' What is the main function of this sentence?",
        "После перечисления нескольких неудачных попыток автор пишет: 'Only after the third trial did the team isolate the cause.' Какова главная функция этого предложения?"
      ),
      options: [
        t("It marks the turning point where the investigation begins to succeed.", "Оно отмечает поворотный момент, когда исследование начинает приносить результат."),
        t("It defines a technical term used earlier in the paragraph.", "Оно определяет технический термин, использованный ранее в абзаце."),
        t("It shows that the earlier failures were unimportant.", "Оно показывает, что предыдущие неудачи были неважны."),
        t("It shifts the paragraph to an unrelated historical example.", "Оно переводит абзац к несвязанному историческому примеру."),
      ],
      correctIndex: 0,
      explanation: t(
        "The sentence moves the paragraph from repeated failure to the first successful breakthrough.",
        "Это предложение переводит абзац от серии неудач к первому успешному прорыву."
      ),
    }),
  ],
  "logical-transitions": [
    question({
      id: "logical-transitions-q2",
      prompt: t(
        "Sentence 1: 'The first simulation matched the observed data closely.' Sentence 2: 'The second simulation required far fewer assumptions.' Which transition best begins sentence 2?",
        "Предложение 1: 'The first simulation matched the observed data closely.' Предложение 2: 'The second simulation required far fewer assumptions.' Какой переход лучше всего подходит в начале второго предложения?"
      ),
      options: [t("However", "However"), t("Moreover", "Moreover"), t("Instead", "Instead"), t("Nevertheless", "Nevertheless")],
      correctIndex: 1,
      explanation: t(
        "The second sentence adds another advantage, so an additive transition like 'Moreover' fits best.",
        "Второе предложение добавляет ещё одно преимущество, поэтому лучше всего подходит добавочный переход вроде 'Moreover'."
      ),
    }),
  ],
  "paragraph-organization": [
    question({
      id: "paragraph-organization-q2",
      prompt: t(
        "A paragraph first defines microplastics, then explains where they come from, and then discusses one research study. Where would a sentence listing common household sources fit best?",
        "Абзац сначала определяет microplastics, затем объясняет, откуда они берутся, а потом обсуждает одно исследование. Куда лучше всего вставить предложение со списком бытовых источников?"
      ),
      options: [
        t("Immediately after the definition of microplastics", "Сразу после определения microplastics"),
        t("After the explanation of where they come from and before the research study", "После объяснения их происхождения и перед описанием исследования"),
        t("At the very beginning of the paragraph", "В самое начало абзаца"),
        t("After the research study as a new conclusion", "После исследования как новый вывод"),
      ],
      correctIndex: 1,
      explanation: t(
        "Household sources support the origin discussion, so the sentence belongs after that idea and before the paragraph shifts to a study.",
        "Бытовые источники поддерживают обсуждение происхождения, поэтому предложение лучше ставить после этой идеи и до перехода к исследованию."
      ),
    }),
  ],
  "sentence-boundaries": [
    question({
      id: "sentence-boundaries-q2",
      prompt: t(
        "Which revision best fixes the sentence 'Researchers revised the survey twice, the final version was much clearer'?",
        "Какая правка лучше всего исправляет предложение 'Researchers revised the survey twice, the final version was much clearer'?"
      ),
      options: [
        t("Researchers revised the survey twice, the final version was much clearer.", "Researchers revised the survey twice, the final version was much clearer."),
        t("Researchers revised the survey twice; the final version was much clearer.", "Researchers revised the survey twice; the final version was much clearer."),
        t("Researchers revised the survey twice being the final version much clearer.", "Researchers revised the survey twice being the final version much clearer."),
        t("Researchers revised the survey twice because the final version much clearer.", "Researchers revised the survey twice because the final version much clearer."),
      ],
      correctIndex: 1,
      explanation: t(
        "The original sentence contains two complete thoughts. A semicolon correctly joins them.",
        "Исходное предложение содержит две полные мысли. Semicolon правильно соединяет их."
      ),
    }),
  ],
  "agreement-reference": [
    question({
      id: "agreement-reference-q2",
      prompt: t(
        "Which verb correctly completes the sentence: 'The collection of poems by contemporary writers ____ on the top shelf'?",
        "Какой глагол правильно завершает предложение: 'The collection of poems by contemporary writers ____ on the top shelf'?"
      ),
      options: [t("sit", "sit"), t("sits", "sits"), t("are sitting", "are sitting"), t("have sat", "have sat")],
      correctIndex: 1,
      explanation: t(
        "The subject is 'collection,' which is singular. The phrase 'of poems by contemporary writers' does not change the verb to plural.",
        "Подлежащее здесь 'collection', оно в единственном числе. Фраза 'of poems by contemporary writers' не делает глагол множественным."
      ),
    }),
  ],
  "inference-under-time": [
    question({
      id: "inference-under-time-q2",
      prompt: t(
        "A passage notes that a historian relies mostly on private letters rather than public speeches when reconstructing a senator's views. Which inference is most supported?",
        "В тексте говорится, что историк в основном опирается на личные письма, а не на публичные речи, когда восстанавливает взгляды сенатора. Какой вывод наиболее обоснован?"
      ),
      options: [
        t("The historian values sources that may reveal less polished opinions.", "Историк ценит источники, которые могут показывать менее отредактированные и более прямые мнения."),
        t("The senator never gave any public speeches.", "Сенатор вообще никогда не выступал публично."),
        t("Private letters are always more truthful than speeches.", "Личные письма всегда правдивее речей."),
        t("Public speeches contain no useful historical information.", "Публичные речи не содержат полезной исторической информации."),
      ],
      correctIndex: 0,
      explanation: t(
        "The passage supports a modest inference: private letters may show views more directly. The other options overstate what can be concluded.",
        "Текст поддерживает умеренный вывод: личные письма могут показывать взгляды более прямо. Остальные варианты заходят слишком далеко."
      ),
    }),
  ],
  "editing-checklist": [
    question({
      id: "editing-checklist-q2",
      prompt: t(
        "If you are choosing between answers that differ mostly in punctuation and conjunctions, what should you identify first?",
        "Если ты выбираешь между вариантами, которые в основном различаются пунктуацией и союзами, что нужно определить первым делом?"
      ),
      options: [
        t("Whether the sentence contains one independent clause or two", "Содержит ли предложение одну независимую часть или две"),
        t("Which answer is the longest", "Какой вариант самый длинный"),
        t("Whether the nouns are academic", "Являются ли существительные академическими"),
        t("Which option sounds more dramatic", "Какой вариант звучит драматичнее"),
      ],
      correctIndex: 0,
      explanation: t(
        "Clause structure tells you which punctuation choices are even possible. That is the fastest reliable first check.",
        "Структура clauses сразу показывает, какие варианты пунктуации вообще возможны. Это самый быстрый и надёжный первый шаг."
      ),
    }),
  ],
};

export function getSkillChallengeQuestions(skillId: string) {
  return SKILL_CHALLENGE_QUESTIONS[skillId] ?? [];
}
