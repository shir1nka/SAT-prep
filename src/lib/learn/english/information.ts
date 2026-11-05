import { text, type Topic } from "../types";

export const INFORMATION_TOPICS: Topic[] = [
  {
    id: "eng-central-idea",
    section: "english",
    domainId: "information",
    order: 1,
    title: text("Central ideas and main purpose", "Главная мысль и цель текста"),
    subtitle: text(
      "What the whole passage is really doing — and how to prove it with the passage itself",
      "Что делает весь отрывок на самом деле — и как доказать это самим текстом"
    ),
    minutes: 10,
    tags: ["central idea", "main purpose", "global question"],
    objectives: [
      text("Summarise a passage in one sentence without adding outside knowledge", "Сжать отрывок в одно предложение, не добавляя внешних знаний"),
      text("Distinguish a main idea from a supporting detail or an example", "Отличать главную мысль от подтверждающей детали или примера"),
      text("Match answer choices to scope: neither too narrow nor too broad", "Соотносят варианты с масштабом вопроса: не слишком узко и не слишком широко"),
    ],
    theory: [
      {
        heading: text("One sentence, whole passage", "Одно предложение на весь отрывок"),
        body: text(
          "A central-idea answer must cover the whole passage, not just one paragraph. Before looking at choices, reduce the passage to: subject + what the author says about it. If a choice describes only a detail, an example, or a method, it is too small. If it claims more than the passage says — for example 'prove' when the passage says 'suggest' — it is too big.",
          "Верный ответ о главной мысли должен охватывать весь отрывок, а не один абзац. Прежде чем смотреть на варианты, сведите текст к формуле: тема + что автор говорит о ней. Если вариант описывает только деталь, пример или метод, он слишком узок. Если он утверждает больше, чем текст — например «доказать», когда в отрывке сказано «предположить», — он слишком широк."
        ),
      },
      {
        heading: text("Purpose vs. topic", "Цель vs. тема"),
        body: text(
          "The topic is what the passage is about; the purpose is what the author is doing with that topic — explaining, contrasting, arguing, describing a change, or evaluating a claim. Questions like 'primarily serves to' ask for purpose. Test them by finishing the sentence: 'The author presents X in order to...' If your finish sounds like just a topic label, you have not yet found the purpose.",
          "Тема — это то, о чём отрывок; цель — это то, что автор с этой темой делает: объясняет, сопоставляет, аргументирует, описывает изменение или оценивает утверждение. В вопросах вида «отрывок прежде всего служит для...» нужна именно цель. Проверьте себя завершением фразы: «Автор представляет X для того, чтобы...». Если завершение звучит как просто название темы, цель вы ещё не нашли."
        ),
      },
    ],
    examples: [
      {
        prompt: text(
          "The monarch butterfly's migration depends on milkweed and warm wintering forests in Mexico. As milkweed declines across breeding grounds, the butterfly population falls, while pressures on the Mexican forests threaten the winter roosts. Saving the migration therefore requires protecting both ends of the journey. Which choice best states the central idea of the text?",
          "Миграция бабочки-монарх зависит от молочая и тёплых зимних лесов Мексики. По мере сокращения молочая на территориях размножения численность бабочки падает, а давление на мексиканские леса угрожает зимним местам скопления. Поэтому для сохранения миграции нужно защищать оба конца пути. Какая формулировка лучше всего отражает главную мысль текста?"
        ),
        steps: [
          text("Identify repeated nouns: milkweed, Mexican forests, both ends — protection must cover two locations.", "Выделите повторяющиеся слова: молочай, мексиканские леса, оба конца — защита должна охватывать два места."),
          text("Reduce to one sentence: the migration's survival requires action at both breeding and wintering areas.", "Сведите к одному предложению: выживание миграции требует действий и на территориях размножения, и на зимних территориях."),
          text("Eliminate choices that mention only one area or only one threat — too narrow.", "Отбросьте варианты, где названа только одна территория или одна угроза, — это слишком узко."),
          text("Eliminate choices that claim the migration can be saved by one action alone — contradicted by 'both ends'.", "Отбросьте варианты, где утверждается, что спасёт одно действие, — это противоречит словам «оба конца»."),
        ],
        answer: text(
          "Protecting the monarch migration requires conservation at both its breeding and wintering habitats.",
          "Для защиты миграции монарха нужна охрана и территорий размножения, и зимних территорий."
        ),
      },
      {
        prompt: text(
          "For hearing aids, digital processing lets devices distinguish speech from background noise by tracking frequency patterns. Earlier analogue models amplified everything, often making speech harder to follow. Modern digital aids still struggle in very noisy rooms, but users generally report clearer conversation. Which choice best states the main purpose of the text?",
          "В слуховых аппаратах цифровая обработка позволяет отличать речь от фонового шума, отслеживая частотные закономерности. Более ранние аналоговые модели усиливали всё подряд и часто затрудняли восприятие речи. Современные цифровые аппараты всё ещё с трудом работают в очень шумных помещениях, но пользователи в целом отмечают более чёткую речь. Какая формулировка лучше всего отражает главную цель текста?"
        ),
        steps: [
          text("Note the contrast shape: earlier analogue models vs. modern digital aids — a before-and-after pattern.", "Заметьте форму контраста: ранние аналоговые модели против современных цифровых аппаратов — схема «раньше — теперь»."),
          text("Look for what the author is doing: explaining an improvement and its limits, not demanding a ban or praising a brand.", "Спросите, что делает автор: объясняет улучшение и его ограничения, а не требует запрета и не хвалит бренд."),
          text("Discard choices that evaluate policy or price — outside the passage's scope.", "Отбросьте варианты про политику или цену — они вне рамок отрывка."),
          text("Keep the choice that names explaining how digital processing improved speech perception despite remaining limits.", "Оставьте вариант, где названо объяснение того, как цифровая обработка улучшила восприятие речи, несмотря на остающиеся ограничения."),
        ],
        answer: text(
          "It explains how digital processing improved speech perception and notes the remaining difficulty in noisy settings.",
          "Текст объясняет, как цифровая обработка улучшила восприятие речи, и отмечает сохраняющиеся трудности в шумных условиях."
        ),
      },
    ],
    strategy: [
      text("Read once and write your own one-sentence gist before checking options; then find the closest match.", "Прочитайте один раз и сформулируйте собственное одно предложение о смысле, а затем ищите ближайшее совпадение среди вариантов."),
      text("When two choices sound plausible, compare scope: cross out the one tied to a single sentence or example.", "Когда два варианта кажутся правдоподобными, сравните масштаб: вычеркните тот, что привязан к одному предложению или примеру."),
      text("Watch attitude words: 'prove', 'always', 'never' usually signal an overstatement — prefer 'suggest', 'help explain', 'illustrate'.", "Следите за словами категоричности: «доказать», «всегда», «никогда» часто скрывают преувеличение — выбирайте «предположить», «помогает объяснить», «иллюстрирует»."),
    ],
    pitfalls: [
      text("Choosing a true detail that is only part of the passage — true but too narrow for a central-idea question.", "Выбор верной детали, которая составляет лишь часть отрывка: утверждение верно, но слишком узко для вопроса о главной мысли."),
      text("Picking a choice that imports real-world knowledge not stated in the passage, such as 'all hearing aids are expensive'.", "Выбор варианта, опирающегося на знание из реальной жизни, а не на текст, например «все слуховые аппараты дороги»."),
      text("Confusing topic with purpose: 'about hearing aids' names the topic, not what the author does with it.", "Путаница темы и цели: «о слуховых аппаратах» называет тему, но не то, что автор с ней делает."),
    ],
    practice: [
      {
        id: "eng-central-idea-p1",
        prompt: text(
          "Bees help many flowering crops produce seeds and fruit, aligning their floral activity with the crops' reproductive timing. Some growers now place hives directly beside orchards, and research teams track how hive placement changes pollination rates. As a result, hive placement is increasingly treated as part of orchard management. Which choice best states the central idea of the text?",
          "Пчёлы помогают многим цветущим культурам образовывать семена и плоды, согласуя свою активность с временем размножения культур. Некоторые фермеры теперь ставят ульи прямо рядом с садами, а исследовательские группы следят, как размещение ульев влияет на уровень опыления. В результате размещение ульев всё чаще рассматривается как часть управления садом. Какая формулировка лучше всего отражает главную мысль текста?"
        ),
        options: [
          text("Growers should remove hives from orchards because bees harm fruit production.", "Фермерам следует убирать ульи из садов, потому что пчёлы вредят производству фруктов."),
          text("Bees and orchards have a naturally identical life cycle with no human involvement.", "У пчёл и садов естественно одинаковый жизненный цикл без участия человека."),
          text("Hive placement near orchards is becoming part of managing crop pollination.", "Размещение ульев рядом с садами становится частью управления опылением культур."),
          text("Only research teams, not growers, can measure pollination rates.", "Только исследовательские группы, а не фермеры, могут измерять уровень опыления."),
        ],
        correctIndex: 2,
        explanation: text(
          "Correct (C): the passage moves from bee biology to hives beside orchards to the conclusion that placement is treated as management — the whole-passage idea. Trap A distorts 'help produce' into 'harm'. Trap B overstates alignment as identical cycles and denies human involvement the passage describes. Trap D is too narrow and misreads who measures rates.",
          "Верно (C): отряд движется от биологии пчёл к ульям у садов и к выводу, что размещение — часть управления; это мысль всего текста. Ловушка A искажает «помогают производить» до «вредят». Ловушка B преувеличивает согласование до одинаковых циклов и отрицает участие человека, описанное в тексте. Ловушка D слишком узка и неверно понимает, кто измеряет уровень."
        ),
        difficulty: "easy",
      },
      {
        id: "eng-central-idea-p2",
        prompt: text(
          "Urban trees cool streets by shading pavement and releasing moisture through their leaves. New maps show that neighbourhoods with more tree canopy are several degrees cooler in summer than nearby blocks with little shade. The maps help planners target planting where heat is highest. Which choice best states the main purpose of the text?",
          "Городские деревья охлаждают улицы, затеняя тротуары и выделяя влагу через листья. Новые карты показывают, что районы с большим древесным покровом летом на несколько градусов холоднее соседних кварталов с малым затенением. Карты помогают планировщикам направлять посадки туда, где жара сильнее. Какая формулировка лучше всего отражает главную цель текста?"
        ),
        options: [
          text("To argue that cities should cover every street with trees immediately.", "Аргументировать, что города должны немедленно закрыть деревьями каждую улицу."),
          text("To explain how tree maps document shade benefits and guide heat-targeted planting.", "Объяснить, как карты деревьев показывают пользу затенения и помогают направлять посадки туда, где сильнее жара."),
          text("To prove that moisture release is the only cooling effect of trees.", "Доказать, что выделение влаги — единственный охлаждающий эффект деревьев."),
          text("To describe only the history of urban tree planting programs.", "Описать только историю программ посадки городских деревьев."),
        ],
        correctIndex: 1,
        explanation: text(
          "Correct (B): the passage explains cooling mechanisms, shows map evidence, and gives the maps' planning purpose — that combination is the purpose. Trap A overstates 'targeted planting' as total, immediate coverage. Trap C overstates one mechanism ('only') and misuses 'prove'. Trap D is too narrow: the passage is not about program history.",
          "Верно (B): текст объясняет механизмы охлаждения, показывает доказательства с карт и называет цель карт для планирования — такая комбинация и есть цель. Ловушка A преувеличивает «точечные посадки» до полного и немедленного озеленения. Ловушка C преувеличивает один механизм («единственный») и неверно употребляет «доказать». Ловушка D слишком узка: речь не об истории программ."
        ),
        difficulty: "medium",
      },
      {
        id: "eng-central-idea-p3",
        prompt: text(
          "For centuries, European maps centred continents differently: medieval maps often placed Jerusalem near the centre, reflecting spiritual ideas about the world, while later maps centred Europe itself to serve trading and imperial charting. Both choices show that mapmakers reflect the values of their time. Which choice best states the central idea of the text?",
          "Веками европейские карты по-разному располагали континенты в центре: средневековые карты часто помещали Иерусалим ближе к центру, отражая духовные представления о мире, а более поздние карты ставили в центр саму Европу для торговых и имперских целей. Оба выбора показывают, что картографы отражают ценности своего времени. Какая формулировка лучше всего отражает главную мысль текста?"
        ),
        options: [
          text("Medieval maps were more accurate than all later maps in every respect.", "Средневековые карты были точнее всех поздних карт во всём."),
          text("Centring choices on maps reflect the values of the mapmakers' eras.", "Выбор центра на картах отражает ценности эпох, в которые жили картографы."),
          text("Europe should be removed from all modern maps.", "Европу следует убрать со всех современных карт."),
          text("Jerusalem was the only city ever placed at the centre of a European map.", "Иерусалим был единственным городом, когда-либо помещавшимся в центр европейской карты."),
        ],
        correctIndex: 1,
        explanation: text(
          "Correct (B): covers both medieval and later choices and the author's conclusion about values. Trap A adds a universal accuracy claim the passage never makes. Trap C recommends a policy nowhere stated — a purpose trap. Trap D invents an 'only' claim; the passage's core is values, not a single city.",
          "Верно (B): охватывает и средневековый, и поздний варианты, и вывод автора о ценностях. Ловушка A добавляет универсальное утверждение о точности, которого нет в тексте. Ловушка C предлагает меру, нигде не названную, — проверка на подмену цели. Ловушка D выдумывает утверждение «единственный»; суть — ценности, а не один город."
        ),
        difficulty: "medium",
      },
      {
        id: "eng-central-idea-p4",
        prompt: text(
          "Sleep researcher Annemarie Maurer argues that short daytime naps can improve alertness for some workers, while other researchers caution that long or late naps fragment nighttime sleep. Maurer's experiments measure reaction time after brief naps, while her critics focus on night-time sleep quality. The debate, she notes, is less about whether naps act at all and more about timing and length. Which choice best states the central idea of the text?",
          "Исследователь сна Эннемари Маурер утверждает, что короткие дневные сны могут повышать бодрость у некоторых работников, тогда как другие исследователи предупреждают, что долгие или поздние сны нарушают ночной сон. Эксперименты Маурер измеряют время реакции после коротких снов, а её оппоненты сосредоточены на качестве ночного сна. По её словам, спор касается не того, действуют ли сны вообще, а скорее их времени и длительности. Какая формулировка лучше всего отражает главную мысль текста?"
        ),
        options: [
          text("All daytime naps are harmful and should be banned in workplaces.", "Все дневные сны вредны и должны быть запрещены на рабочих местах."),
          text("Maurer's experiments prove that naps are always beneficial for everyone.", "Эксперименты Маурер доказывают, что сны всегда полезны всем."),
          text("The debate over naps centres on their timing and length rather than on whether they have any effect.", "Спор о снах касается их времени и длительности, а не того, имеют ли они какой-либо эффект."),
          text("Critics measure reaction time while Maurer studies night-time sleep.", "Критики измеряют время реакции, а Маурер изучает ночной сон."),
        ],
        correctIndex: 2,
        explanation: text(
          "Correct (C): reproduces the author's own framing — both sides accept some effect; timing and length are the dispute. Trap A overstates 'some workers/can' and 'long naps harm sleep' into a universal ban. Trap B swaps the roles (reaction time is Maurer's) and converts 'can improve for some' into 'prove always beneficial'. Trap D reverses the two research focuses.",
          "Верно (C): повторяет рамку самого автора — обе стороны признают наличие эффекта, спор идёт о времени и длительности. Ловушка A преувеличивает «у некоторых может» и «долгие сны вредят» до универсального запрета. Ловушка B меняет роли (время реакции — у Маурер) и превращает «может улучшать у некоторых» в «доказать всегда полезны». Ловушка D переставляет акценты двух исследований."
        ),
        difficulty: "hard",
      },
    ],
  },
  {
    id: "eng-details",
    section: "english",
    domainId: "information",
    order: 2,
    title: text("Details and close reading", "Детали и внимательное чтение"),
    subtitle: text(
      "Finding exactly what the passage states — no more, no less",
      "Находить ровно то, что сказано в отрывке, — не больше и не меньше"
    ),
    minutes: 9,
    tags: ["details", "close reading", "literal comprehension"],
    objectives: [
      text("Locate the sentence that directly answers a detail question", "Находить предложение, которое прямо отвечает на вопрос о детали"),
      text("Reject options that are true in real life but not stated in the passage", "Отклонять варианты, верные в реальной жизни, но не указанные в тексте"),
      text("Keep direction, comparison, and quantity exactly as written", "Сохранять направление, сравнение и количество именно так, как они записаны"),
    ],
    theory: [
      {
        heading: text("Details are literal", "Детали — это буквально"),
        body: text(
          "Detail questions do not ask you to infer. They ask what the passage says. The correct answer is a paraphrase of a specific line. If you must use outside knowledge, combine two ideas, or guess a cause, the option is wrong for this question type. First find the keyword in the passage; the answer lives in that neighbourhood.",
          "Вопросы о деталях не требуют делать выводы. Они спрашивают, что именно сказано в тексте. Верный ответ — перефразирование конкретной строки. Если для выбора нужно внешнее знание, соединить две мысли или угадать причину, вариант неверен для этого типа вопроса. Сначала найдите ключевые слова в тексте: ответ находится в их окрестности."
        ),
        formulas: undefined,
      },
      {
        heading: text("Small words, big differences", "Маленькие слова — большие различия"),
        body: text(
          "Words such as 'more', 'less', 'before', 'after', 'only', 'all', and 'some' carry the whole meaning of a detail. A choice that changes 'some' to 'all' or 'warmer' to 'cooler' flips the detail and is a classic trap. Underline the comparator in both the passage and the choice before deciding.",
          "Слова вроде «больше», «меньше», «до», «после», «только», «все» и «некоторые» несут весь смысл детали. Вариант, меняющий «некоторые» на «все» или «теплее» на «холоднее», переворачивает деталь — это классическая ловушка. Подчеркните сравнение и в тексте, и в варианте, прежде чем решать."
        ),
      },
    ],
    examples: [
      {
        prompt: text(
          "The city increased bus service on two routes in 2019, adding evening buses after 9 p.m. Ridership on those routes rose by about 12% over the next year. According to the text, what can be said about the bus service change?",
          "Город увеличил автобусное обслуживание на двух маршрутах в 2019 году, добавив вечерние рейсы после 21:00. Пассажирские перевозки на этих маршрутах выросли примерно на 12% за следующий год. Согласно тексту, что можно сказать об изменении обслуживания?"
        ),
        steps: [
          text("Underline exact facts: two routes, 2019, after 9 p.m., about 12% rise.", "Подчеркните точные факты: два маршрута, 2019, после 21:00, рост примерно на 12%."),
          text("Match each number and time directly to an option without rounding or extending.", "Сопоставьте каждое число и время с вариантом напрямую, не округляя и не расширяя."),
          text("Reject any option that changes the schedule or invents a new route count.", "Отклоните любой вариант, меняющий расписание или выдумывающий новое число маршрутов."),
        ],
        answer: text(
          "Service was added on two routes in 2019 with buses after 9 p.m.",
          "В 2019 году на двух маршрутах добавили рейсы после 21:00."
        ),
      },
      {
        prompt: text(
          "Gardeners in the story water tomato seedlings only at the base, keeping leaves dry to reduce fungal spread. Neighbouring beds that are sprinkled from above develop spots on leaves more often. According to the text, how do the two watering methods compare?",
          "Садоводы в истории поливают рассаду помидоров только у основания, сохраняя листья сухими, чтобы ограничить распространение грибка. Соседние грядки, которые поливают сверху из лейки, чаще поражаются пятнами на листьях. Согласно тексту, как соотносятся эти два способа полива?"
        ),
        steps: [
          text("Extract the comparison: base watering → dry leaves, less fungal spread; overhead sprinkling → leaf spots more often.", "Выделите сравнение: полив у основания — сухие листья, меньше грибка; полив сверху — чаще пятна на листьях."),
          text("Check direction: the passage says overhead beds have spots MORE often, not less.", "Проверьте направление: в тексте сказано, что при поливе сверху пятна бывают ЧАЩЕ, а не реже."),
          text("Eliminate choices that reverse the direction or add a claim about seed growth not mentioned.", "Отбросьте варианты, переворачивающие направление или добавляющие утверждение о росте семян, о котором не сказано."),
        ],
        answer: text(
          "Watering at the base is linked to fewer leaf spots than sprinkling from above.",
          "Полив у основания связан с меньшим числом пятен на листьях, чем полив сверху."
        ),
      },
    ],
    strategy: [
      text("Highlight the exact sentence with the keyword and read the words around it before reading options in full.", "Выделите точное предложение с ключевым словом и прочитайте слова вокруг него, прежде чем полностью читать варианты."),
      text("Cross out options that need information the passage never gives — those are 'true but not stated' traps.", "Вычёркивайте варианты, для которых в тексте нет необходимой информации, — это ловушки «верно, но не сказано»."),
      text("Compare numbers and comparators character by character: 12% is not 20%; 'after 9 p.m.' is not 'before 9 p.m.'.", "Сравнивайте числа и сравнения буква за буквой: 12% — не 20%; «после 21:00» — не «до 21:00»."),
    ],
    pitfalls: [
      text("Accepting a choice because it sounds generally true — detail questions reward the passage, not general knowledge.", "Согласие с вариантом потому, что он звучит в целом правдоподобно: вопросы о деталях награждают опору на текст, а не на общие знания."),
      text("Reversing a comparison or time order copied from the passage — the most common detail trap.", "Переворот сравнения или порядка событий, скопированных из текста, — самая частая ловушка в деталях."),
      text("Answering a detail question as if it were an inference question and adding a plausible cause.", "Отвечать на вопрос о детали как на вопрос о выводе и добавлять правдоподобную причину."),
    ],
    practice: [
      {
        id: "eng-details-p1",
        prompt: text(
          "The new science wing, completed in 2021, holds two labs on the ground floor and two classrooms upstairs. Its most distinctive feature is a roof garden where students grow herbs for the cafeteria. According to the text, how many labs are in the science wing?",
          "Новое научное крыло, завершённое в 2021 году, имеет две лаборатории на первом этаже и два класса наверху. Его наиболее отличительная особенность — сад на крыше, где ученики выращивают зелень для столовой. Согласно тексту, сколько лабораторий в научном крыле?"
        ),
        options: [
          text("One lab", "Одна лаборатория"),
          text("Two labs", "Две лаборатории"),
          text("Three labs", "Три лаборатории"),
          text("Four labs", "Четыре лаборатории"),
        ],
        correctIndex: 1,
        explanation: text(
          "Correct (B): the passage states 'two labs on the ground floor' — a word-for-word match. Trap C and D add the classroom count or inflate the number; Trap A reduces it with no textual basis.",
          "Верно (B): в тексте прямо сказано «две лаборатории на первом этаже» — совпадение дословное. Ловушки C и D добавляют число классов или завышают количество; ловушка A занижает без опоры на текст."
        ),
        difficulty: "easy",
      },
      {
        id: "eng-details-p2",
        prompt: text(
          "Before 2017, the town required permits for outdoor cafes. After the rule changed in 2017, cafes could place chairs outside without a permit, provided they left a clear path for pedestrians. According to the text, what changed with the 2017 rule?",
          "До 2017 года город требовал разрешения на кафе под открытым небом. После изменения правила в 2017 году кафе могли выставлять стулья снаружи без разрешения, если оставляли свободный проход для пешеходов. Согласно тексту, что изменилось с правилом 2017 года?"
        ),
        options: [
          text("Cafes were required to obtain a new permit every month after 2017.", "После 2017 года кафе должны были получать новое разрешение каждый месяц."),
          text("Cafes were banned from using any outdoor space after 2017.", "После 2017 года кафе запретили использовать любое открытое пространство."),
          text("Cafes could set out chairs without a permit if they kept a pedestrian path clear.", "Кафе могли выставлять стулья без разрешения, если оставляли свободный проход."),
          text("Pedestrians were required to obtain permits to walk past cafes.", "Пешеходы должны были получать разрешения, чтобы пройти мимо кафе."),
        ],
        correctIndex: 2,
        explanation: text(
          "Correct (C): directly paraphrases 'could place chairs outside without a permit, provided they left a clear path'. Trap A invents a monthly permit — the opposite of the change. Trap B reverses the change into a ban. Trap D transfers the permit requirement to pedestrians, who never need one in the passage.",
          "Верно (C): прямо перефразирует «могли выставлять стулья без разрешения, если оставляли свободный проход». Ловушка A выдумывает ежемесячное разрешение — обратное изменение. Ловушка B превращает изменение в запрет. Ловушка D переносит требование разрешения на пешеходов, которым оно в тексте не нужно."
        ),
        difficulty: "easy",
      },
      {
        id: "eng-details-p3",
        prompt: text(
          "In the study described, participants cycled 30 minutes before writing a summary, while a comparison group rested for the same period. The cycling group recalled more details from the summary activity than the resting group. According to the text, how did recall compare between the groups?",
          "В описанном исследовании участники крутили педали 30 минут перед написанием резюме, а контрольная группа отдыхала то же время. Группа, занимавшаяся на велотренажёре, вспомнила больше деталей после написания резюме, чем отдыхающая группа. Согласно тексту, как сравнивалось воспоминание между группами?"
        ),
        options: [
          text("The resting group recalled more details than the cycling group.", "Отдыхающая группа вспомнила больше деталей, чем группа на велотренажёре."),
          text("The cycling group recalled more details than the resting group.", "Группа на велотренажёре вспомнила больше деталей, чем отдыхающая группа."),
          text("Both groups recalled exactly the same number of details.", "Обе группы вспомнили ровно одинаковое число деталей."),
          text("Neither group could recall any details from the summary.", "Ни одна группа не смогла вспомнить никаких деталей резюме."),
        ],
        correctIndex: 1,
        explanation: text(
          "Correct (B): the passage states the cycling group 'recalled more details' than the resting group. Trap A reverses the direction — the classic comparison trap. Trap C changes 'more' into exact equality. Trap D invents total failure, contradicted by the comparative result.",
          "Верно (B): в тексте сказано, что группа на велотренажёре «вспомнила больше деталей». Ловушка A переворачивает направление — классическая ловушка сравнения. Ловушка C превращает «больше» в точное равенство. Ловушка D выдумывает полный провал, противоречащий сравнительному результату."
        ),
        difficulty: "medium",
      },
      {
        id: "eng-details-p4",
        prompt: text(
          "The treaty, signed in March, set a two-year deadline for restoring river habitats, but it gave countries until December of the second year to submit their plans. Minister Kowalska's announcement in January focused on early surveys, not on the December deadline. According to the text, when were plans due?",
          "Договор, подписанный в марте, установил двухлетний срок для восстановления речных местообитаний, но дал странам время до декабря второго года на представление планов. Объявление министра Ковальской в январе касалось ранних обследований, а не срока в декабре. Согласно тексту, когда должны были быть представлены планы?"
        ),
        options: [
          text("In March of the first year, when the treaty was signed.", "В марте первого года, когда договор был подписан."),
          text("In January, at the minister's announcement.", "В январе, на объявлении министра."),
          text("By December of the second year.", "К декабрю второго года."),
          text("Two years after the plans were submitted.", "Через два года после представления планов."),
        ],
        correctIndex: 2,
        explanation: text(
          "Correct (C): the sentence 'gave countries until December of the second year to submit their plans' gives the deadline directly. Trap A confuses signing with the plan deadline. Trap B takes the January announcement date as the deadline. Trap D reverses cause and effect — two years is the habitat deadline, not a wait after submission.",
          "Верно (C): фраза «дал странам время до декабря второго года на представление планов» называет срок напрямую. Ловушка A путает дату подписания со сроком планов. Ловушка B принимает дату январского объявления за срок. Ловушка D переворачивает причину и следствие: два года — срок восстановления местообитаний, а не ожидание после представления."
        ),
        difficulty: "hard",
      },
    ],
  },
  {
    id: "eng-evidence-text",
    section: "english",
    domainId: "information",
    order: 3,
    title: text("Command of textual evidence", "Выбор текстового доказательства"),
    subtitle: text(
      "Choosing the line that actually proves the answer",
      "Выбор строки, которая действительно доказывает ответ"
    ),
    minutes: 11,
    tags: ["textual evidence", "pair questions", "quote"],
    objectives: [
      text("Find the exact line or lines that support a claimed answer", "Находить точную строку или строки, подтверждающие утверждение"),
      text("Reject true-but-irrelevant lines that do not prove the claim", "Отклонять верные, но нерелевантные строки, не доказывающие утверждение"),
      text("Let the claim choose the evidence: check each line against the answer wording", "Доверять утверждению выбор доказательства: сверять каждую строку с формулировкой ответа"),
    ],
    theory: [
      {
        heading: text("Test lines against the claim", "Проверяйте строки против утверждения"),
        body: text(
          "In evidence pairs, the first answer states a claim; the second must prove that claim, not just quote something nearby or true. Cover the claim, then read each line and ask: 'Does this line, on its own, show the claim is right?' A line about the same topic but with different wording is a trap. The best line repeats the claim's key words or logic.",
          "В парных вопросах с доказательством первый ответ утверждает что-то, а второй должен это доказать, а не просто цитировать что-то рядом или верное. Закройте утверждение и прочитайте каждую строку, спрашивая: «Показывает ли эта строка сама по себе, что утверждение верно?» Строка на ту же тему, но с другой формулировкой, — ловушка. Лучшая строка повторяет ключевые слова или логику утверждения."
        ),
      },
      {
        heading: text("Best evidence is specific", "Лучшее доказательство — конкретное"),
        body: text(
          "General statements, examples, and background are tempting evidence choices because they sound important. Specific evidence mentions the same person, object, action, or comparison as the claim. If a line is 'true' but too general to separate the correct claim from a wrong one, it is not the best evidence.",
          "Общие утверждения, примеры и фон кажутся соблазнительными вариантами доказательств, потому что звучат важно. Конкретное доказательство называет того же человека, объект, действие или сравнение, что и утверждение. Если строка верна, но слишком обща, чтобы отличить верное утверждение от неверного, это не лучшее доказательство."
        ),
      },
    ],
    examples: [
      {
        prompt: text(
          "Claim: Whales evolved from land mammals. Consider these lines: (A) 'Whales are mammals.' (B) 'Fossil whales had small hind limbs.' (C) 'The ocean covers most of Earth.' (D) 'Many sea animals are large.' Which line best supports the claim?",
          "Утверждение: киты произошли от наземных млекопитающих. Рассмотрите строки: (A) «Киты — млекопитающие». (B) «У ископаемых китов были маленькие задние конечности». (C) «Океан покрывает большую часть Земли». (D) «Многие морские животные крупные». Какая строка лучше всего подтверждает утверждение?"
        ),
        steps: [
          text("Restate the claim's test: the line must show descent, not just current category.", "Сформулируйте проверку: строка должна показывать происхождение, а не только современную категорию."),
          text("Keep (B): hind limbs on fossil whales directly suggest a land-mammal ancestry.", "Оставьте (B): задние конечности у ископаемых китов напрямую намекают на наземное происхождение."),
          text("Drop (A) as true but insufficient — it states a category, not an origin.", "Отбросьте (A) как верную, но недостаточную: она называет категорию, а не происхождение."),
          text("Drop (C) and (D) as irrelevant general facts with no link to ancestry.", "Отбросьте (C) и (D) как нерелевантные общие факты без связи с происхождением."),
        ],
        answer: text("Line (B) — fossil hind limbs are evidence of land ancestry.", "Строка (B) — ископаемые задние конечности свидетельствуют о наземном происхождении."),
      },
      {
        prompt: text(
          "Claim: The new policy reduced wait times at the clinic. Lines: (A) 'The clinic has a large building.' (B) 'Average waits fell from 40 minutes to 15 minutes after the policy began.' (C) 'Nurses wear new uniforms.' (D) 'The city budget grew this year.' Which line best supports the claim?",
          "Утверждение: новая политика сократила время ожидания в клинике. Строки: (A) «У клиники большое здание». (B) «Среднее время ожидания снизилось с 40 до 15 минут после начала политики». (C) «Медсёстры носят новую форму». (D) «Городской бюджет вырос в этом году». Какая строка лучше всего подтверждает утверждение?"
        ),
        steps: [
          text("Look for the same measure as the claim: wait time before and after the policy.", "Ищите ту же меру, что в утверждении: время ожидания до и после политики."),
          text("Select (B) because it gives a direct before-and-after comparison.", "Выберите (B), потому что она даёт прямое сравнение до и после."),
          text("Reject (A), (C), and (D) as unrelated true details.", "Отклоните (A), (C) и (D) как верные, но не относящиеся к делу детали."),
        ],
        answer: text("Line (B) — the before-and-after wait times prove the reduction.", "Строка (B) — время ожидания до и после доказывает снижение."),
      },
    ],
    strategy: [
      text("Answer the first question, then read evidence choices with that answer in mind — never read evidence alone.", "Ответьте на первый вопрос, затем читайте варианты доказательств с этим ответом в уме — никогда не читайте доказательства в одиночку."),
      text("For each evidence line, mentally finish: 'This shows the claim because...' If you cannot finish, cross it out.", "Для каждой строки мысленно завершите: «Это показывает утверждение, потому что...» Если завершить нельзя, вычеркните строку."),
      text("If unsure between two lines, prefer the one with more matching keywords and the more specific detail.", "Если колеблетесь между двумя строками, выбирайте ту, где больше совпадающих ключевых слов и конкретнее деталь."),
    ],
    pitfalls: [
      text("Choosing a line that is true and important but does not prove the specific claim — relevance beats importance.", "Выбор строки, которая верна и важна, но не доказывает конкретное утверждение: релевантность важнее важности."),
      text("Picking the first line you recognise instead of checking every line against the claim.", "Выбор первой узнанной строки вместо проверки каждой строки против утверждения."),
      text("Quoting the wrong passage half — many traps are only a few words off the right line.", "Цитирование неверной половины отрывка: многие ловушки отличаются всего на несколько слов от верной строки."),
    ],
    practice: [
      {
        id: "eng-evidence-text-p1",
        prompt: text(
          "Claim: The proposal mainly benefits rural schools. Lines: (A) 'The proposal was voted on in June.' (B) 'It adds funding for bus routes, so students in distant villages can reach school.' (C) 'Rural schools have strong community ties.' (D) 'The proposal also mentions urban libraries.' Which line best supports the claim?",
          "Утверждение: предложение приносит пользу в основном сельским школам. Строки: (A) «По предложению проголосовали в июне». (B) «Оно добавляет финансирование автобусных маршрутов, чтобы ученики из отдалённых деревень могли добраться до школы». (C) «У сельских школ сильные общинные связи». (D) «Предложение также упоминает городские библиотеки». Какая строка лучше всего подтверждает утверждение?"
        ),
        options: [
          text("Line (A) — the vote date shows the proposal is important.", "Строка (A) — дата голосования показывает важность предложения."),
          text("Line (B) — funding buses for distant villages directly shows why rural schools benefit.", "Строка (B) — финансирование автобусов для отдалённых деревень напрямую показывает, почему выигрывают сельские школы."),
          text("Line (C) — community ties prove the funding claim.", "Строка (C) — общинные связи доказывают утверждение о финансировании."),
          text("Line (D) — mentioning libraries supports the rural benefit.", "Строка (D) — упоминание библиотек подтверждает пользу сельским школам."),
        ],
        correctIndex: 1,
        explanation: text(
          "Correct (B): the bus-funding line links the mechanism to rural students. Trap A is a mere date — true but irrelevant. Trap C describes rural schools generally, not this proposal's effect. Trap D concerns urban libraries, the opposite population.",
          "Верно (B): фраза о финансировании автобусов связывает механизм с сельскими учениками. Ловушка A — просто дата, верная, но нерелевантная. Ловушка C описывает сельские школы в целом, а не эффект данного предложения. Ловушка D касается городских библиотек — противоположной группы."
        ),
        difficulty: "easy",
      },
      {
        id: "eng-evidence-text-p2",
        prompt: text(
          "Claim: The researcher concluded that night-time noise harms sleep. Lines: (A) 'The lab is quiet during the day.' (B) 'Participants exposed to traffic noise at night showed more wake-ups than those in quiet rooms.' (C) 'Many people dislike traffic.' (D) 'Sleep is important for health.' Which line best supports the claim?",
          "Утверждение: исследователь сделал вывод, что ночной шум вредит сну. Строки: (A) «Лаборатория днём тихая». (B) «Участники, подвергавшиеся ночному шуму от транспорта, чаще просыпались, чем те, кто спал в тихих комнатах». (C) «Многим людям не нравится транспорт». (D) «Сон важен для здоровья». Какая строка лучше всего подтверждает утверждение?"
        ),
        options: [
          text("Line (A) — a quiet day lab shows noise matters at night.", "Строка (A) — тихая днём лаборатория показывает, что шум важен ночью."),
          text("Line (C) — dislike of traffic proves noise disrupts sleep.", "Строка (C) — неприязнь к транспорту доказывает, что шум нарушает сон."),
          text("Line (B) — the group comparison directly shows night noise disrupting sleep.", "Строка (B) — сравнение групп напрямую показывает, что ночной шум нарушает сон."),
          text("Line (D) — the importance of sleep supports the harm claim.", "Строка (D) — важность сна подтверждает утверждение о вреде."),
        ],
        correctIndex: 2,
        explanation: text(
          "Correct (C in the option labels, line B): the direct group comparison is the experimental proof. Trap A is about the daytime lab — wrong time and topic. Trap C is an opinion about traffic, not a sleep result. Trap D is a general truth that does not connect noise to sleep.",
          "Верно (строка B): прямое сравнение групп — экспериментальное доказательство. Ловушка A — о тишине днём: не то время и не та тема. Ловушка C — мнение о транспорте, а не результат о сне. Ловушка D — общая истина, не связывающая шум со сном."
        ),
        difficulty: "easy",
      },
      {
        id: "eng-evidence-text-p3",
        prompt: text(
          "Claim: The author views the old bypass as a failure. Lines: (A) 'The bypass was built in 1985.' (B) 'Yet three years after opening, traffic was heavier than before the bypass.' (C) 'Engineers surveyed the road carefully.' (D) 'The town grew quickly after 1985.' Which line best supports the claim?",
          "Утверждение: автор считает старую объездную дорогу неудачей. Строки: (A) «Объездная дорога была построена в 1985 году». (B) «Однако через три года после открытия движение стало плотнее, чем до объездной дороги». (C) «Инженеры тщательно обследовали дорогу». (D) «Город быстро рос после 1985 года». Какая строка лучше всего подтверждает утверждение?"
        ),
        options: [
          text("Line (A) — the construction date proves the bypass failed.", "Строка (A) — дата постройки доказывает неудачу объездной дороги."),
          text("Line (C) — careful surveys show failure.", "Строка (C) — тщательные обследования показывают неудачу."),
          text("Line (D) — town growth explains the failure.", "Строка (D) — рост города объясняет неудачу."),
          text("Line (B) — heavier traffic after opening shows the bypass did not solve the problem.", "Строка (B) — более плотное движение после открытия показывает, что дорога не решила проблему."),
        ],
        correctIndex: 3,
        explanation: text(
          "Correct (D in the option labels, line B): the result after opening contradicts the bypass's purpose, matching 'failure'. Trap A is a date, not an evaluation. Trap C describes planning quality, not outcome. Trap D is a possible context but does not itself show the bypass failed.",
          "Верно (строка B): результат после открытия противоречит назначению дороги, что соответствует «неудаче». Ловушка A — дата, а не оценка. Ловушка C описывает качество планирования, а не исход. Ловушка D — возможный контекст, но сам по себе не показывает неудачу."
        ),
        difficulty: "medium",
      },
      {
        id: "eng-evidence-text-p4",
        prompt: text(
          "Claim: The essay argues that museum attendance reflects broader social patterns. Lines: (A) 'The essay's title mentions museums.' (B) 'When cities prospered, visits rose; when jobs vanished, visits fell.' (C) 'The author visited three museums.' (D) 'Museums contain old paintings.' Which line best supports the claim?",
          "Утверждение: эссе утверждает, что посещаемость музеев отражает более широкие социальные закономерности. Строки: (A) «В названии эссе упоминаются музеи». (B) «Когда города процветали, число посещений росло; когда рабочие места исчезали, посещения снижались». (C) «Автор посетил три музея». (D) «В музеях хранятся старинные картины». Какая строка лучше всего подтверждает утверждение?"
        ),
        options: [
          text("Line (A) — the title proves the social-pattern claim.", "Строка (A) — название доказывает утверждение о социальных закономерностях."),
          text("Line (B) — visits tracking prosperity and job loss directly shows attendance reflecting social conditions.", "Строка (B) — посещения, следящие за процветанием и потерей рабочих мест, напрямую показывают, что посещаемость отражает социальные условия."),
          text("Line (C) — visiting museums proves the argument.", "Строка (C) — посещение музеев доказывает аргумент."),
          text("Line (D) — old paintings explain visitor behaviour.", "Строка (D) — старинные картины объясняют поведение посетителей."),
        ],
        correctIndex: 1,
        explanation: text(
          "Correct (B): the rise-and-fall pattern linking visits to prosperity and jobs is exactly the 'broader social patterns' claim. Trap A is a title — naming, not arguing. Trap C is a personal fact, not evidence of a pattern. Trap D describes collection contents, unrelated to attendance trends.",
          "Верно (B): схема роста и спада, связывающая посещения с процветанием и безработицей, — это и есть «более широкие социальные закономерности». Ловушка A — название: именование, а не аргумент. Ловушка C — личный факт, а не доказательство закономерности. Ловушка D описывает содержимое коллекций, не связанное с динамикой посещений."
        ),
        difficulty: "hard",
      },
    ],
  },
  {
    id: "eng-evidence-quant",
    section: "english",
    domainId: "information",
    order: 4,
    title: text("Quantitative evidence: tables and graphs", "Количественные данные: таблицы и графики"),
    subtitle: text(
      "Reading numbers exactly as they are shown",
      "Читать числа именно так, как они показаны"
    ),
    minutes: 12,
    tags: ["quantitative", "graph", "table"],
    objectives: [
      text("Read axes, units, and scales before reading any values", "Читать оси, единицы и шкалы, прежде чем вычитывать значения"),
      text("Compare trends in the same units without mixing categories", "Сравнивать тенденции в одних единицах, не смешивая категории"),
      text("Choose the answer that matches the numbers, not the general story", "Выбирать ответ, соответствующий числам, а не общей истории"),
    ],
    theory: [
      {
        heading: text("Axes first, values second", "Сначала оси, потом значения"),
        body: text(
          "Every graph has a title, axes, and a scale. The horizontal axis usually shows time or category; the vertical axis shows the measure. Values mean nothing until you know the unit — percent, count, degrees, minutes. Check whether the axis starts at zero and whether the steps are equal; a cut axis can make a small change look dramatic.",
          "У каждого графика есть заголовок, оси и шкала. Горизонтальная ось обычно показывает время или категорию; вертикальная — измеряемую величину. Значения ничего не означают, пока не известны единицы: проценты, количество, градусы, минуты. Проверьте, начинается ли ось с нуля и равны ли интервалы; срезанная ось может сделать небольшое изменение драматичным."
        ),
      },
      {
        heading: text("Same units, same category", "Одни единицы, одна категория"),
        body: text(
          "Strong quantitative answers stay inside one measure and one group. 'Sales rose' is not the same as 'sales were highest'. A line that rises for one group and falls for another supports different claims for each group. Match the choice's group label and unit to the graph before trusting the trend.",
          "Сильные ответы на количественные вопросы остаются в рамках одной меры и одной группы. «Продажи выросли» — это не то же самое, что «продажи были самыми высокими». Линия, растущая для одной группы и падающая для другой, подтверждает разные утверждения для каждой группы. Сверяйте метку группы и единицу в варианте с графиком, прежде чем доверять тенденции."
        ),
      },
    ],
    examples: [
      {
        prompt: text(
          "A bar chart shows average daily ice-cream sales: June 120 cones, July 180 cones, August 150 cones. Which choice is supported by the chart?",
          "Столбчатая диаграмма показывает средние ежедневные продажи мороженого: июнь — 120 рожков, июль — 180, август — 150. Какой вывод поддерживает диаграмма?"
        ),
        steps: [
          text("Read the unit: cones per day; compare only the three bars.", "Прочтите единицу: рожков в день; сравнивайте только три столбца."),
          text("Order the values: July (180) > August (150) > June (120).", "Упорядочьте значения: июль (180) > август (150) > июнь (120)."),
          text("Keep only the choice that matches this order and unit.", "Оставьте только вариант, соответствующий этому порядку и единице."),
        ],
        answer: text("Sales were highest in July.", "Продажи были самыми высокими в июле."),
      },
      {
        prompt: text(
          "A line graph shows two lines: Line X rises from 20% to 35%; Line Y falls from 40% to 25%. Which choice is supported?",
          "Линейный график показывает две линии: линия X растёт с 20% до 35%; линия Y падает с 40% до 25%. Какой вывод поддерживается?"
        ),
        steps: [
          text("Note the unit (percent) and the two groups separately.", "Отметьте единицу (проценты) и две группы по отдельности."),
          text("Track each line: X up, Y down — opposite trends.", "Отследите каждую линию: X вверх, Y вниз — противоположные тенденции."),
          text("Reject any choice that merges the two lines into one trend.", "Отклоните любой вариант, объединяющий две линии в одну тенденцию."),
        ],
        answer: text("Line X increased while Line Y decreased.", "Линия X выросла, а линия Y снизилась."),
      },
    ],
    strategy: [
      text("Point to the axis labels aloud: 'this is percent, this is year'. Most mistakes come from skipping this step.", "Проговорите вслух подписи осей: «это проценты, это год». Большинство ошибок возникает из-за пропуска этого шага."),
      text("Find the exact bar or point the question mentions, then move straight up or across to the scale.", "Найдите точный столбец или точку, упомянутые в вопросе, затем двигайтесь строго вверх или вбок до шкалы."),
      text("Check the group name in the legend for every claim — X and Y are easy to swap under time pressure.", "Проверяйте название группы по легенде для каждого утверждения — X и Y легко перепутать при нехватке времени."),
    ],
    pitfalls: [
      text("Reading a value from the wrong axis or the wrong bar — slow down one step at a time.", "Считывание значения не с той оси или не с того столбца: двигайтесь медленно, шаг за шагом."),
      text("Treating 'rose' as 'was highest' or 'fell' as 'was lowest' — trend and level are different claims.", "Смешение «вырос» и «был самым высоким» или «снизился» и «был самым низким»: тенденция и уровень — разные утверждения."),
      text("Mixing two groups or two units into one answer, for example adding percents and counts.", "Смешивание двух групп или двух единиц в одном ответе, например сложение процентов и количества."),
    ],
    practice: [
      {
        id: "eng-evidence-quant-p1",
        prompt: text(
          "A table lists library visits per week: Monday 90, Tuesday 140, Wednesday 110, Thursday 200. Which choice is supported by the table?",
          "В таблице указаны посещения библиотеки за неделю: понедельник — 90, вторник — 140, среда — 110, четверг — 200. Какой вывод поддерживает таблица?"
        ),
        options: [
          text("Visits were highest on Thursday.", "Посещения были самыми высокими в четверг."),
          text("Visits were lowest on Thursday.", "Посещения были самыми низкими в четверг."),
          text("Visits were highest on Monday.", "Посещения были самыми высокими в понедельник."),
          text("Visits increased the same amount every day.", "Посещения увеличивались на одинаковое число каждый день."),
        ],
        correctIndex: 0,
        explanation: text(
          "Correct (A): Thursday's 200 exceeds 90, 140, and 110, so it is the maximum. Trap B reverses max and min. Trap C picks the smallest value as the largest. Trap D invents a constant increase; the daily jumps differ (50, then a fall, then 90).",
          "Верно (A): 200 в четверг больше 90, 140 и 110, значит это максимум. Ловушка B переворачивает максимум и минимум. Ловушка C выбирает наименьшее значение как наибольшее. Ловушка D выдумывает постоянный рост; ежедневные приросты различаются (50, затем падение, затем 90)."
        ),
        difficulty: "easy",
      },
      {
        id: "eng-evidence-quant-p2",
        prompt: text(
          "A line graph tracks two air-quality measures: PM2.5 falls from 80 to 40 micrograms per cubic metre between 2015 and 2020, while ozone rises from 30 to 55 over the same period. Which choice is supported?",
          "Линейный график отслеживает два показателя качества воздуха: PM2.5 снижается с 80 до 40 микрограммов на кубический метр в период с 2015 по 2020 год, а озон растёт с 30 до 55 за тот же период. Какой вывод поддерживается?"
        ),
        options: [
          text("Both measures fell between 2015 and 2020.", "Оба показателя снизились в период с 2015 по 2020 год."),
          text("PM2.5 fell while ozone rose between 2015 and 2020.", "PM2.5 снизился, а озон вырос в период с 2015 по 2020 год."),
          text("Ozone fell while PM2.5 rose between 2015 and 2020.", "Озон снизился, а PM2.5 вырос в период с 2015 по 2020 год."),
          text("Both measures were unchanged between 2015 and 2020.", "Оба показателя не изменились за период с 2015 по 2020 год."),
        ],
        correctIndex: 1,
        explanation: text(
          "Correct (B): PM2.5 goes 80→40 (down) while ozone goes 30→55 (up). Trap A forces both down. Trap C swaps the two directions. Trap D denies both visible changes.",
          "Верно (B): PM2.5 идёт 80→40 (вниз), а озон 30→55 (вверх). Ловушка A заставляет оба показателя падать. Ловушка C меняет направления местами. Ловушка D отрицает оба видимых изменения."
        ),
        difficulty: "easy",
      },
      {
        id: "eng-evidence-quant-p3",
        prompt: text(
          "A bar chart shows average revision time in hours per week: Week 1 = 5, Week 2 = 8, Week 3 = 6, Week 4 = 10. Which choice is supported by the chart?",
          "Столбчатая диаграмма показывает среднее время подготовки в часах в неделю: неделя 1 = 5, неделя 2 = 8, неделя 3 = 6, неделя 4 = 10. Какой вывод поддерживает диаграмма?"
        ),
        options: [
          text("Revision time rose every week without exception.", "Время подготовки росло каждую неделю без исключения."),
          text("Revision time was highest in Week 4.", "Время подготовки было самым высоким в неделю 4."),
          text("Revision time was highest in Week 2.", "Время подготовки было самым высоким в неделю 2."),
          text("Revision time fell from Week 1 to Week 4 overall.", "Время подготовки в целом снизилось с недели 1 к неделе 4."),
        ],
        correctIndex: 1,
        explanation: text(
          "Correct (B): Week 4 = 10 hours, above 5, 8, and 6. Trap A ignores the Week 2→3 drop (8→6). Trap C confuses Week 2 with the maximum. Trap D reverses the overall change: 5→10 is a rise, not a fall.",
          "Верно (B): неделя 4 = 10 часов, что выше 5, 8 и 6. Ловушка A игнорирует падение с недели 2 к неделе 3 (8→6). Ловушка C путает неделю 2 с максимумом. Ловушка D переворачивает общее изменение: 5→10 — это рост, а не снижение."
        ),
        difficulty: "medium",
      },
      {
        id: "eng-evidence-quant-p4",
        prompt: text(
          "A graph shows soil moisture (%) over four months for two fields: Field A: 30, 32, 35, 33. Field B: 30, 28, 26, 24. Which choice is supported by the graph?",
          "График показывает влажность почвы (%) за четыре месяца для двух полей: поле A: 30, 32, 35, 33. Поле B: 30, 28, 26, 24. Какой вывод поддерживает график?"
        ),
        options: [
          text("Field B became wetter than Field A by month four.", "Поле B стало влажнее поля A к четвёртому месяцу."),
          text("Both fields stayed at exactly 30% for four months.", "Оба поля оставались ровно на 30% четыре месяца."),
          text("Field A rose overall while Field B fell overall.", "Поле A в целом выросло, а поле B в целом снизилось."),
          text("Field A fell while Field B rose.", "Поле A снизилось, а поле B выросло."),
        ],
        correctIndex: 2,
        explanation: text(
          "Correct (C): Field A ends higher than it started (30→33) while Field B ends lower (30→24). Trap A reverses the month-four levels (33 vs 24). Trap B freezes both series at the start value. Trap D swaps the two overall directions.",
          "Верно (C): поле A в конце выше, чем в начале (30→33), а поле B — ниже (30→24). Ловушка A переворачивает уровни четвёртого месяца (33 против 24). Ловушка B замораживает оба ряда на начальном значении. Ловушка D меняет местами общее направление двух рядов."
        ),
        difficulty: "hard",
      },
    ],
  },
  {
    id: "eng-inference",
    section: "english",
    domainId: "information",
    order: 5,
    title: text("Inferences and logical conclusions", "Выводы и логические заключения"),
    subtitle: text(
      "What must be true given what the passage says",
      "Что должно быть верно с учётом того, что сказано в тексте"
    ),
    minutes: 13,
    tags: ["inference", "conclusion", "logic"],
    objectives: [
      text("Draw only conclusions directly supported by stated facts", "Делать только те выводы, которые прямо подтверждены изложенными фактами"),
      text("Distinguish 'must be true' from 'could be true'", "Отличать «обязательно верно» от «может быть верно»"),
      text("Refuse conclusions that need an unstated extra assumption", "Отклонять выводы, требующие невысказанного дополнительного допущения"),
    ],
    theory: [
      {
        heading: text("Logic, not guessing", "Логика, а не угадывание"),
        body: text(
          "An inference is a conclusion that cannot be false if the passage is true. If a choice needs an extra fact — 'people must like X', 'Y always causes Z' — it is not an inference, only a possibility. The safest test: 'If the passage is true, could this choice be false?' If yes, reject it. Correct inferences are usually modest: 'likely', 'suggests', 'may help'.",
          "Вывод — это заключение, которое не может быть ложным, если верен текст. Если варианту нужен дополнительный факт — «люди обязательно любят X», «Y всегда вызывает Z», — это не вывод, а лишь возможность. Надёжный тест: «Если текст верен, может ли этот вариант оказаться ложным?» Если да — отклоните его. Верные выводы обычно скромны: «вероятно», «свидетельствует», «может помочь»."
        ),
      },
      {
        heading: text("Comparisons license directions", "Сравнение даёт направление"),
        body: text(
          "When a passage states 'A is more X than B', you may infer that the author treats A as relatively stronger — but you may not infer absolute values, causes, or the future. Keep the inference at the same level of strength as the stated fact: a 'some' supports 'at least some', never 'all'.",
          "Когда в тексте сказано «A больше X, чем B», можно вывести, что автор считает A относительно более сильным, но нельзя вывести абсолютные значения, причины или будущее. Сохраняйте вывод на том же уровне силы, что и исходный факт: «некоторые» поддерживают «как минимум некоторые», но никогда — «все»."
        ),
      },
    ],
    examples: [
      {
        prompt: text(
          "A school that adopts later start times reports that more students arrive on time. Which inference is most strongly supported?",
          "Школа, перешедшая на более позднее начало занятий, сообщает, что больше учеников стали приходить вовремя. Какой вывод наиболее убедительно поддерживается?"
        ),
        steps: [
          text("List stated fact: later starts → more on-time arrivals.", "Выпишите факт: более позднее начало → больше пунктуальных приходок."),
          text("Accept only conclusions that restate or lightly combine this fact.", "Принимайте только выводы, перефразирующие или слегка объединяющие этот факт."),
          text("Reject stronger claims such as 'all students now arrive on time' or 'later starts cure all problems'.", "Отклоняйте более сильные утверждения вроде «все ученики теперь приходят вовремя» или «позднее начало решает все проблемы»."),
        ],
        answer: text("Later starts are associated with better punctuality in this school.", "Позднее начало связано с большей пунктуальностью в этой школе."),
      },
      {
        prompt: text(
          "Farmers who planted hedgerows noticed more wild bees near their fields. Which inference is most strongly supported?",
          "Фермеры, высадившие живые изгороди, заметили больше диких пчёл у своих полей. Какой вывод наиболее убедительно поддерживается?"
        ),
        steps: [
          text("Keep the hedgerow–bee link at the observed level: more bees were noticed nearby.", "Сохраните связь изгороди и пчёл на уровне наблюдения: рядом заметили больше пчёл."),
          text("Reject 'hedgerows always increase bees everywhere' — that adds 'always' and 'everywhere'.", "Отклоните «изгороди всегда увеличивают пчёл везде» — это добавляет «всегда» и «везде»."),
          text("Accept the modest version: hedgerows may be associated with more wild bees nearby.", "Примите скромную версию: изгороди могут быть связаны с большим числом диких пчёл рядом."),
        ],
        answer: text("Hedgerows may be associated with more wild bees near fields.", "Изгороди могут быть связаны с большим числом диких пчёл у полей."),
      },
    ],
    strategy: [
      text("Paraphrase the facts first, then ask what follows — do not think of real life before the passage.", "Сначала перефразируйте факты, затем спросите, что из них следует, — не думайте о реальной жизни раньше текста."),
      text("Underline strength words in each choice: 'must', 'always', 'never', 'all'. The correct inference is rarely absolute.", "Подчеркните слова силы в каждом варианте: «должен», «всегда», «никогда», «все». Верный вывод редко бывает абсолютным."),
      text("Choose the answer that combines two stated facts with the least new material.", "Выбирайте ответ, объединяющий два изложенных факта с наименьшим количеством новой информации."),
    ],
    pitfalls: [
      text("Treating a possible outcome as a necessary one — the passage must force the conclusion.", "Считать возможный исход обязательным: текст должен вынуждать к такому выводу."),
      text("Using real-world knowledge instead of passage facts, for example assuming what a 'good' policy must do.", "Опираться на знание реального мира вместо фактов текста, например предполагать, что «хорошая» политика обязательно делает."),
      text("Overloading a true fact with an added cause: 'more bees' does not by itself prove 'hedgerows caused bees'.", "Перегружать верный факт добавленной причиной: «больше пчёл» само по себе не доказывает, что «изгороди вызвали пчёл»."),
    ],
    practice: [
      {
        id: "eng-inference-p1",
        prompt: text(
          "A museum that opened its doors at night twice a week found that evening visitors were mostly adults who had not visited in the daytime. Which inference is most strongly supported?",
          "Музей, дважды в неделю открывавшийся вечером, обнаружил, что вечерние посетители — в основном взрослые, которые не приходили днём. Какой вывод наиболее убедительно поддерживается?"
        ),
        options: [
          text("All museum visitors are adults.", "Все посетители музеев — взрослые."),
          text("Evening openings attracted a different group of adult visitors than daytime openings.", "Вечерние открытия привлекали иную группу взрослых посетителей, чем дневные."),
          text("Daytime openings should be cancelled because adults prefer evenings.", "Дневные открытия следует отменить, потому что взрослые предпочитают вечер."),
          text("The museum will double its total visitors with evening hours.", "Музей удвоит общее число посетителей за счёт вечерних часов."),
        ],
        correctIndex: 1,
        explanation: text(
          "Correct (B): the passage says evening visitors were mostly adults not seen in daytime — a different group, exactly. Trap A promotes 'evening visitors were mostly adults' to 'all visitors are adults'. Trap C recommends cancelling daytime from age preference alone — a policy leap. Trap D invents a doubling figure never stated.",
          "Верно (B): в тексте сказано, что вечерние посетители — в основном взрослые, которых не видели днём, — то есть иная группа, ровно как в варианте. Ловушка A превращает «вечерние посетители в основном взрослые» в «все посетители — взрослые». Ловушка C предлагает отменить дневные часы на основании предпочтения — скачок в политику. Ловушка D выдумывает удвоение, нигде не названное."
        ),
        difficulty: "easy",
      },
      {
        id: "eng-inference-p2",
        prompt: text(
          "Cities that invested in shaded bus stops reported that riders waited longer outdoors without discomfort. Which inference is most strongly supported?",
          "Города, вложившиеся в затенённые автобусные остановки, сообщают, что пассажиры стали дольше ждать на улице без дискомфорта. Какой вывод наиболее убедительно поддерживается?"
        ),
        options: [
          text("Shaded stops made waiting more comfortable for riders in those cities.", "Затенённые остановки сделали ожидание более комфортным для пассажиров в этих городах."),
          text("Shaded stops caused cities to save money on buses.", "Затенённые остановки помогли городам сэкономить на автобусах."),
          text("All riders in every city now wait outdoors all day.", "Все пассажиры во всех городах теперь ждут на улице весь день."),
          text("Shade is the only factor affecting rider comfort.", "Тень — единственный фактор, влияющий на комфорт пассажиров."),
        ],
        correctIndex: 0,
        explanation: text(
          "Correct (A): 'wait longer without discomfort' licenses 'more comfortable waiting'. Trap B invents a savings claim the passage never mentions. Trap C overstates 'those cities' and 'longer' into a universal all-day wait. Trap D claims exclusivity ('only') that the passage does not support.",
          "Верно (A): «ждать дольше без дискомфорта» позволяет вывести «более комфортное ожидание». Ловушка B выдумывает экономию, о которой в тексте нет. Ловушка C преувеличивает «в этих городах» и «дольше» до всеобщего ожидания весь день. Ловушка D утверждает исключительность («единственный»), не подтверждённую текстом."
        ),
        difficulty: "medium",
      },
      {
        id: "eng-inference-p3",
        prompt: text(
          "When a town switched streetlights to warmer, dimmer bulbs, residents reported feeling the streets were cosier, while the brighter white bulbs that had been used before are described as harsher in surveys. Which inference is most strongly supported?",
          "Когда город заменил уличные фонари на более тёплые и тусклые лампы, жители сообщали, что улицы стали уютнее, а прежние ярко-белые лампы описывались в опросах как более резкие. Какой вывод наиболее убедительно поддерживается?"
        ),
        options: [
          text("Residents measured street brightness with scientific instruments.", "Жители измеряли яркость улиц научными приборами."),
          text("The town's residents judged the warmer bulbs as cosier and the previous white bulbs as harsher.", "Жители города оценили тёплые лампы как более уютные, а прежние белые — как более резкие."),
          text("All towns prefer warmer streetlights to white ones.", "Все города предпочитают тёплые фонари белым."),
          text("Dimmer bulbs always use less electricity than any alternative.", "Тусклые лампы всегда потребляют меньше электричества, чем любая альтернатива."),
        ],
        correctIndex: 1,
        explanation: text(
          "Correct (B): directly combines the two survey judgements stated in the passage. Trap A invents scientific measurement — the passage says surveys and feelings. Trap C universalises one town's surveys to all towns. Trap D adds an electricity claim that 'dimmer' alone does not prove.",
          "Верно (B): напрямую объединяет два оценочных суждения из опросов, данных в тексте. Ловушка A выдумывает научные измерения — в тексте опросы и ощущения. Ловушка C распространяет опросы одного города на все города. Ловушка D добавляет утверждение об электричестве, которое из одного слова «тусклые» не следует."
        ),
        difficulty: "medium",
      },
      {
        id: "eng-inference-p4",
        prompt: text(
          "In a pilot, office workers given a choice of desk heights reported fewer aches at day's end than colleagues who kept fixed desks, though both groups sat for similar total hours. Which inference is most strongly supported?",
          "В пилотном исследовании работники с выбором высоты рабочего стола сообщали о меньшей боли к концу дня, чем коллеги с фиксированными столами, хотя обе группы сидели в общей сложности одинаково долго. Какой вывод наиболее убедительно поддерживается?"
        ),
        options: [
          text("Choosing desk height eliminates all workplace aches.", "Выбор высоты стола полностью устраняет любую боль на рабочем месте."),
          text("Fixed desks caused back injuries in every worker.", "Фиксированные столы вызывали травмы спины у каждого работника."),
          text("The variable-desk group reported fewer aches despite similar total sitting time.", "Группа с регулируемыми столами сообщила о меньшей боли при сопоставимом общем времени сидения."),
          text("Total sitting time is irrelevant to aches in every workplace.", "Общее время сидения не имеет значения для боли ни на одном рабочем месте."),
        ],
        correctIndex: 2,
        explanation: text(
          "Correct (C): the contrast — fewer aches with similar sitting time — is exactly what the pilot reports, without adding cause or universality. Trap A absolutises 'fewer' into elimination of all aches. Trap B converts reported aches into injuries for everyone. Trap D uses one pilot to declare sitting time irrelevant everywhere.",
          "Верно (C): контраст — меньше боли при сопоставимом времени сидения — это ровно то, что сообщает пилот, без добавления причины или всеобщности. Ловушка A превращает «меньше» в полное устранение боли. Ловушка B превращает сообщения о боли в травмы у всех. Ловушка D на основании одного пилота объявляет время сидения несущественным везде."
        ),
        difficulty: "hard",
      },
    ],
  },
];
