import { text, type Topic } from "../types";

export const CRAFT_TOPICS: Topic[] = [
  {
    id: "eng-words-context",
    section: "english",
    domainId: "craft",
    order: 6,
    title: text("Words in context", "Слова в контексте"),
    subtitle: text(
      "Choosing the meaning the passage actually needs",
      "Выбирать значение, которое действительно нужно отрывку"
    ),
    minutes: 8,
    tags: ["vocabulary", "context", "word meaning"],
    objectives: [
      text("Replace the target word with each candidate meaning and test the sentence", "Заменять целевое слово каждым вариантом значения и проверять предложение"),
      text("Use the surrounding words to narrow between similar meanings", "Использовать окружающие слова, чтобы сузить выбор между похожими значениями"),
      text("Refuse dictionary meanings that do not fit this sentence", "Отклонять словарные значения, не подходящие к данному предложению"),
    ],
    theory: [
      {
        heading: text("Meaning is local", "Значение локально"),
        body: text(
          "A word's meaning on the SAT is decided by its sentence, not by the dictionary's first entry. The words nearby — verbs, comparisons, and the general point of the passage — tell you which sense is active. Always do the substitution test: put the choice back into the sentence and see whether the result makes sense as an English sentence and as a true statement in the passage.",
          "Значение слова на SAT определяется его предложением, а не первой словарной статьёй. Слова рядом — глаголы, сравнения и общий смысл отрывка — подсказывают, какое значение активно. Всегда используйте тест замены: подставьте вариант обратно в предложение и проверьте, получается ли осмысленное английское предложение и верное утверждение в рамках текста."
        ),
      },
      {
        heading: text("Similar meanings, different nuance", "Похожие значения, разный нюанс"),
        body: text(
          "Two choices may both be 'positive' or both relate to the topic, yet only one matches the passage's nuance — for example, 'shows' versus 'proves', or 'slight' versus 'complete'. Read the sentence's attitude: if the author is cautious, the modest word wins; if the author contrasts sharply, the stronger word wins.",
          "Два варианта могут быть одновременно «положительными» или касаться темы, но только один соответствует нюансу текста — например, «показывает» против «доказывает» или «незначительный» против «полный». Читайте тон предложения: если автор осторожен, побеждает скромное слово; если автор резко контрастирует, побеждает более сильное."
        ),
      },
    ],
    examples: [
      {
        prompt: text(
          "In the report, the committee described the new route as 'efficient', noting that it cut the trip from 50 to 25 minutes. Which meaning of 'efficient' fits the sentence?",
          "В отчёте комиссия назвала новый маршрут «эффективным», отметив, что он сократил поездку с 50 до 25 минут. Какое значение слова «эффективный» подходит к предложению?"
        ),
        steps: [
          text("Underline the detail after the word: time halved — a speed/resource measure.", "Подчеркните деталь после слова: время сократилось вдвое — это мера скорости и ресурсов."),
          text("Test each choice by substitution: 'wasting no time' fits; 'luxurious' does not.", "Проверьте каждый вариант заменой: «не теряя времени» подходит; «роскошный» — нет."),
          text("Keep the meaning that the halved time supports.", "Оставьте значение, подтверждённое сокращением времени вдвое."),
        ],
        answer: text("Achieving the result with less time or waste.", "Достижение результата с меньшими затратами времени или без потерь."),
      },
      {
        prompt: text(
          "The critic called the essay 'illuminating', saying it clarified a debate that readers had found confusing. Which meaning fits?",
          "Критик назвал эссе «озаряющим», сказав, что оно прояснило спор, казавшийся читателям запутанным. Какое значение подходит?"
        ),
        steps: [
          text("Notice the explanation: confusion → clarity, so the word involves understanding.", "Заметьте пояснение: путаница → ясность, значит слово связано с пониманием."),
          text("Eliminate meanings about brightness or temperature that ignore the clarification detail.", "Отбросьте значения о яркости или температуре, игнорирующие деталь с прояснением."),
          text("Keep 'making clear or easier to understand'.", "Оставьте значение «делать ясным или более понятным»."),
        ],
        answer: text("Making a complex matter clear.", "Делать сложное понятным."),
      },
    ],
    strategy: [
      text("Skip the target word and read the sentence: ask 'what must this word do here?' before looking at options.", "Пропустите целевое слово и прочитайте предложение: спросите «что это слово должно делать здесь?», прежде чем смотреть на варианты."),
      text("Do the substitution test out loud for the two closest choices.", "Проговорите тест замены для двух ближайших вариантов."),
      text("Check the sentence's direction: words like 'but', 'yet', 'despite' signal that the meaning may contrast with your first guess.", "Проверьте направление предложения: слова вроде «но», «однако», «несмотря на» показывают, что значение может контрастировать с первым предположением."),
    ],
    pitfalls: [
      text("Choosing the most common dictionary meaning instead of the one this sentence uses.", "Выбор самого распространённого словарного значения вместо того, что употреблено в данном предложении."),
      text("Confusing a word's topic with its meaning — for example, 'cold' about people versus temperature.", "Путать тему слова с его значением — например, «холодный» о людях против температуры."),
      text("Ignoring the words after the target word, where the sentence usually defines or limits the meaning.", "Игнорировать слова после целевого слова, где предложение обычно определяет или ограничивает значение."),
    ],
    practice: [
      {
        id: "eng-words-context-p1",
        prompt: text(
          "The survey noted that most residents were 'indifferent' to the new timetable, since many said they had not yet read it. Which meaning of 'indifferent' fits the sentence?",
          "В опросе отмечалось, что большинство жителей были «равнодушны» к новому расписанию, поскольку многие сказали, что ещё не прочитали его. Какое значение слова «равнодушны» подходит к предложению?"
        ),
        options: [
          text("Unfair in distributing the timetable.", "Несправедливы в распределении расписания."),
          text("Unable to read the timetable.", "Не способны прочитать расписание."),
          text("Not particularly interested or concerned.", "Не особенно заинтересованы и не обеспокоены."),
          text("Hostile toward the timetable authors.", "Враждебны к авторам расписания."),
        ],
        correctIndex: 2,
        explanation: text(
          "Correct (C): the clue 'had not yet read it' supports lack of interest, not unfairness, inability, or hostility. Trap A confuses 'indifferent' with 'discriminating'. Trap B turns not-reading into inability. Trap D upgrades low interest into hostility the sentence never states.",
          "Верно (C): подсказка «ещё не прочитали его» поддерживает отсутствие интереса, а не несправедливость, неспособность или враждебность. Ловушка A путает «равнодушны» с «несправедливы». Ловушка B превращает непрочитанность в неспособность. Ловушка D повышает низкий интерес до враждебности, которой нет в предложении."
        ),
        difficulty: "easy",
      },
      {
        id: "eng-words-context-p2",
        prompt: text(
          "The telescope's mirror was described as 'flawed' because a small crack blurred the images of distant stars. Which meaning of 'flawed' fits the sentence?",
          "Зеркало телескопа назвали «дефектным», потому что маленькая трещина размывала изображения далёких звёзд. Какое значение слова «дефектный» подходит к предложению?"
        ),
        options: [
          text("Handcrafted by a master artisan.", "Сделано искусным мастером вручную."),
          text("Marred by a defect that harms its function.", "Повреждено дефектом, нарушающим его работу."),
          text("Polished to high brilliance.", "Отполировано до высокого блеска."),
          text("Purchased at a reduced price.", "Куплено по сниженной цене."),
        ],
        correctIndex: 1,
        explanation: text(
          "Correct (B): the crack blurring images is the defect that harms function. Trap A invents craftsmanship with no textual support. Trap C reverses the mirror's state into a polished success. Trap D adds a price detail never mentioned.",
          "Верно (B): трещина, размывающая изображения, — это дефект, нарушающий работу. Ловушка A выдумывает мастерство без опоры на текст. Ловушка C переворачивает состояние зеркала в отполированный успех. Ловушка D добавляет деталь о цене, нигде не названную."
        ),
        difficulty: "easy",
      },
      {
        id: "eng-words-context-p3",
        prompt: text(
          "The scientist argued that nature is 'resourceful', pointing to wetlands that filter water faster than engineered systems. Which meaning of 'resourceful' fits the sentence?",
          "Учёный утверждал, что природа «изобретательна», указывая на водно-болотные угодья, фильтрующие воду быстрее, чем инженерные системы. Какое значение слова «изобретательна» подходит к предложению?"
        ),
        options: [
          text("Rich in minerals taken for export.", "Богата минералами на экспорт."),
          text("Dependent on engineered systems for survival.", "Зависима от инженерных систем для выживания."),
          text("Capable of solving problems effectively with available means.", "Способна эффективно решать проблемы имеющимися средствами."),
          text("Expanding to occupy all surrounding land.", "Расширяется, занимая всю окружающую землю."),
        ],
        correctIndex: 2,
        explanation: text(
          "Correct (C): wetlands out-performing engineered systems shows effective problem-solving with available means. Trap A reduces 'resourceful' to the literal 'full of resources'. Trap B reverses the comparison — nature beats, not depends on, engineering. Trap D invents territorial expansion.",
          "Верно (C): водно-болотные угодья, превосходящие инженерные системы, показывают эффективное решение проблем имеющимися средствами. Ловушка A сводит «изобретательна» к буквальному «полна ресурсов». Ловушка B переворачивает сравнение: природа превосходит, а не зависит от инженерных систем. Ловушка D выдумывает территориальное расширение."
        ),
        difficulty: "medium",
      },
      {
        id: "eng-words-context-p4",
        prompt: text(
          "The review called the performance 'stunning', emphasizing how the actor paused just before the final line so the audience caught their breath. Which meaning of 'stunning' fits the sentence?",
          "В обзоре постановку назвали «ошеломляющей», подчеркнув, как актёр сделал паузу перед последней репликой, от которой у зрителей перехватило дыхание. Какое значение слова «ошеломляющей» подходит к предложению?"
        ),
        options: [
          text("Physically striking without effect on the audience.", "Физически поразительная без воздействия на зрителей."),
          text("Hampered by missed cues and technical failures.", "Отягощённая пропущенными репликами и техническими сбоями."),
          text("Brief and without a pause between lines.", "Краткая и без пауз между репликами."),
          text("Deeply impressive and emotionally powerful.", "Глубоко впечатляющая и эмоционально сильная."),
        ],
        correctIndex: 3,
        explanation: text(
          "Correct (D): the breath-catching pause demonstrates deep emotional power. Trap A reduces 'stunning' to literal physical striking, ignoring the emotional evidence. Trap B invents failures opposite to the praised pause. Trap C negates the pause the sentence praises.",
          "Верно (D): задерживающая дыхание пауза показывает глубокую эмоциональную силу. Ловушка A сводит «ошеломляющей» к буквальному физическому удару, игнорируя эмоциональное доказательство. Ловушка B выдумывает провалы, противоположные похвальной паузе. Ловушка C отрицает паузу, которую предложение восхваляет."
        ),
        difficulty: "hard",
      },
    ],
  },
  {
    id: "eng-structure-purpose",
    section: "english",
    domainId: "craft",
    order: 7,
    title: text("Text structure and purpose", "Структура и цель текста"),
    subtitle: text(
      "How the passage is built and why each part is there",
      "Как построен текст и зачем в нём каждая часть"
    ),
    minutes: 10,
    tags: ["structure", "purpose", "paragraph function"],
    objectives: [
      text("Name the function of a sentence or example in the argument", "Называть функцию предложения или примера в аргументе"),
      text("Track shifts: 'but', 'however', 'yet' mark a change in direction", "Отслеживать сдвиги: «но», «однако», «однако же» обозначают смену направления"),
      text("Distinguish illustrating, contrasting, and conceding moves", "Отличать ходы иллюстрации, контраста и уступки"),
    ],
    theory: [
      {
        heading: text("Structure is a sequence of jobs", "Структура — это последовательность задач"),
        body: text(
          "Authors build passages from common moves: state a problem, give an example, present an objection, revise a view, or conclude. Structure questions ask what job a part does in that sequence. Find the clue words — 'for example', 'however', 'nevertheless' — and ask what work the author is doing at that point, not what the line merely says.",
          "Авторы строят текст из распространённых ходов: ставят проблему, приводят пример, излагают возражение, пересматривают взгляд или делают вывод. Вопросы о структуре спрашивают, какую задачу выполняет та или иная часть в этой последовательности. Найдите слова-подсказки — «например», «однако», «тем не менее» — и спросите, что автор делает в этот момент, а не что строка просто говорит."
        ),
      },
      {
        heading: text("Examples prove, concessions soften", "Примеры доказывают, уступки смягчают"),
        body: text(
          "An example usually supports the claim just made; a concession ('granted', 'admittedly') usually makes the argument fairer before answering the point. Do not confuse the two: a conceded point is one the author grants, while an example is one the author uses as evidence. The same paragraph can contain both.",
          "Пример обычно поддерживает только что высказанное утверждение; уступка («правда», «допустим») обычно делает аргумент более честным, прежде чем ответить на претензию. Не путайте их: уступка — это пункт, который автор признаёт, а пример — пункт, который автор использует как доказательство. Один абзац может содержать и то, и другое."
        ),
      },
    ],
    examples: [
      {
        prompt: text(
          "A historian writes: 'Early canals failed: the first locks leaked. The second canal succeeded, however, because its builders used clay puddling.' What is the purpose of the second sentence?",
          "Историк пишет: «Ранние каналы потерпели неудачу: первые шлюзы протекали. Однако второй канал оказался удачным, потому что строители использовали глину для уплотнения». Какова цель второго предложения?"
        ),
        steps: [
          text("Mark the shift word 'however' — the second sentence moves in the opposite direction.", "Отметьте слово сдвига «однако» — второе предложение идёт в противоположном направлении."),
          text("Identify the job: contrasting a failure with a later success and giving its cause.", "Определите задачу: контраст неудачи с более поздним успехом и указание его причины."),
          text("Eliminate choices that treat the second sentence as another failure example.", "Отбросьте варианты, трактующие второе предложение как ещё один пример неудачи."),
        ],
        answer: text("To contrast the failed first attempt with a successful later one.", "Контрастировать неудачную первую попытку с удачной более поздней."),
      },
      {
        prompt: text(
          "An essay claims community gardens lower food costs, then says: 'For example, one garden in Marston cut a family's weekly vegetable bill by a third.' What is the purpose of the example?",
          "Эссе утверждает, что общественные сады снижают расходы на еду, затем говорит: «Например, один сад в Марстоне сократил еженедельный счёт семьи на овощи на треть». Какова цель примера?"
        ),
        steps: [
          text("Connect the example to the claim immediately before it: lower food costs.", "Свяжите пример с утверждением прямо перед ним: снижение расходов на еду."),
          text("Note 'for example' — the garden illustrates the claim.", "Отметьте «например» — сад иллюстрирует утверждение."),
          text("Reject choices that read the example as a concession about high costs.", "Отклоните варианты, читающие пример как уступку о высоких расходах."),
        ],
        answer: text("To illustrate the claim with a concrete case.", "Проиллюстрировать утверждение конкретным случаем."),
      },
    ],
    strategy: [
      text("Sketch the passage in three words: problem → evidence → result. Structure answers must fit one of those slots.", "Набросайте отрывок тремя словами: проблема → доказательство → результат. Ответы о структуре должны укладываться в один из этих слотов."),
      text("Circle transition words and treat them as signposts: 'for example' = illustrate, 'however' = contrast, 'nevertheless' = conclude despite.", "Обводите переходные слова как указатели: «например» = иллюстрация, «однако» = контраст, «тем не менее» = вывод вопреки."),
      text("When a choice says 'to prove', demand a direct supporting link; examples illustrate more often than they prove.", "Когда вариант говорит «чтобы доказать», требуйте прямой поддерживающей связи; примеры чаще иллюстрируют, чем доказывают."),
    ],
    pitfalls: [
      text("Answering what the sentence says instead of what it does in the argument.", "Отвечать, что предложение говорит, вместо того что оно делает в аргументе."),
      text("Treating a concession as the author's main point — concessions are usually brief and granted, not endorsed as central.", "Считать уступку главным пунктом автора: уступки обычно кратки и признаваемы, но не центральны."),
      text("Reading 'however' as 'also' and missing the reversal of direction.", "Читать «однако» как «также» и пропускать разворот направления."),
    ],
    practice: [
      {
        id: "eng-structure-purpose-p1",
        prompt: text(
          "The author writes that woven labels were once sewn onto garments by hand, adding: 'A single shirt might carry three different labels sewn at different seams.' What is the purpose of this sentence?",
          "Автор пишет, что тканые ярлыки когда-то пришивались к одежде вручную, добавляя: «Одна рубашка могла нести три разных ярлыка, пришитых на разных швах». Какова цель этого предложения?"
        ),
        options: [
          text("To illustrate how multiple labels could appear on one garment.", "Проиллюстрировать, как на одной вещи могли оказаться несколько ярлыков."),
          text("To argue that sewn labels should be banned today.", "Аргументировать, что пришивные ярлыки нужно запретить сегодня."),
          text("To concede that hand-sewing was faster than machine sewing.", "Признать, что ручная пришивка была быстрее машинной."),
          text("To conclude that shirts no longer carry labels.", "Сделать вывод, что рубашки больше не имеют ярлыков."),
        ],
        correctIndex: 0,
        explanation: text(
          "Correct (A): the sentence gives a concrete picture of the hand-sewing practice just described — illustration. Trap B invents a present-day ban argument. Trap C invents a speed concession never raised. Trap D jumps to a modern conclusion the sentence does not draw.",
          "Верно (A): предложение даёт конкретную картину только что описанной ручной пришивки — иллюстрация. Ловушка B выдумывает аргумент о современном запрете. Ловушка C выдумывает уступку о скорости, не затронутую в тексте. Ловушка D делает скачок к современному выводу, которого предложение не делает."
        ),
        difficulty: "easy",
      },
      {
        id: "eng-structure-purpose-p2",
        prompt: text(
          "After arguing that proofreading catches errors, the author adds: 'Admittedly, proofreading cannot catch errors the writer shares with the reader, such as a wrong premise.' What is the purpose of this sentence?",
          "После утверждения, что вычитка улавливает ошибки, автор добавляет: «Правда, вычитка не может уловить ошибки, общие для автора и читателя, например неверную предпосылку». Какова цель этого предложения?"
        ),
        options: [
          text("To illustrate the main claim with a concrete case.", "Проиллюстрировать главное утверждение конкретным случаем."),
          text("To concede a limit of proofreading before the argument continues.", "Признать ограничение вычитки, прежде чем аргумент продолжится."),
          text("To conclude that proofreading is useless.", "Сделать вывод, что вычитка бесполезна."),
          text("To contrast proofreading with writing itself.", "Контрастировать вычитку с самим написанием."),
        ],
        correctIndex: 1,
        explanation: text(
          "Correct (B): 'Admittedly' signals a conceded limit inside an otherwise pro-proofreading argument. Trap A misreads the move as an example — the sentence grants a weakness, not support. Trap C converts a limitation into total uselessness. Trap D invents a contrast the sentence never makes.",
          "Верно (B): «Правда» сигнализирует об уступке — признание ограничения внутри аргумента в пользу вычитки. Ловушка A ошибочно читает ход как пример: предложение признаёт слабость, а не поддерживает. Ловушка C превращает ограничение в полную бесполезность. Ловушка D выдумывает контраст, которого предложение не делает."
        ),
        difficulty: "medium",
      },
      {
        id: "eng-structure-purpose-p3",
        prompt: text(
          "The author first summarises the case for homework: 'Supporters claim homework builds discipline.' Then: 'Yet classroom evidence suggests the gain is strongest for older students and fades for the youngest.' What is the purpose of the second sentence?",
          "Сначала автор излагает довод за домашние задания: «Сторонники утверждают, что домашние задания развивают дисциплину». Затем: «Однако классные свидетельства показывают, что эффект сильнее у старших учеников и ослабевает у самых младших». Какова цель второго предложения?"
        ),
        options: [
          text("To repeat the supporters' claim in different words.", "Повторить утверждение сторонников другими словами."),
          text("To concede that homework harms all students.", "Признать, что домашние задания вредят всем ученикам."),
          text("To introduce a qualifying contrast to the supporters' general claim.", "Ввести уточняющий контраст к общему утверждению сторонников."),
          text("To give an unrelated example about discipline.", "Привести несвязанный пример о дисциплине."),
        ],
        correctIndex: 2,
        explanation: text(
          "Correct (C): 'Yet' plus the qualified evidence narrows the supporters' broad claim — a contrast that qualifies rather than repeats. Trap A ignores the reversal signalled by 'yet'. Trap B upgrades a qualified gain into universal harm. Trap D detaches the sentence from the discipline claim it qualifies.",
          "Верно (C): «Однако» вместе с уточнёнными свидетельствами сужает широкое утверждение сторонников — контраст, уточняющий, а не повторяющий. Ловушка A игнорирует разворот, обозначенный словом «однако». Ловушка B превращает уточнённый эффект в всеобщий вред. Ловушка D отрывает предложение от утверждения о дисциплине, которое оно уточняет."
        ),
        difficulty: "medium",
      },
      {
        id: "eng-structure-purpose-p4",
        prompt: text(
          "The essay opens with glowing evaluations of a lost novel, then recounts how two surviving pages contradict those evaluations, and closes by questioning whether the lost pages would have matched the praise. What is the overall structure of the essay?",
          "Эссе начинается с восторженных оценок утерянного романа, затем рассказывает, как два уцелевших фрагмента противоречат этим оценкам, и завершается вопросом, соответствовали бы утерянные страницы похвале. Какова общая структура эссе?"
        ),
        options: [
          text("A claim, a supporting example, and a restated claim.", "Утверждение, поддерживающий пример и повторение утверждения."),
          text("A strong view, a qualifying concession, and an unresolved question.", "Сильная позиция, уточняющая уступка и неразрешённый вопрос."),
          text("A chronological history with no argumentative arc.", "Хронологическая история без аргументативной дуги."),
          text("An objection, a rebuttal that fully resolves it, and a firm conclusion.", "Возражение, возражение-контрответ, полностью его разрешающее, и твёрдый вывод."),
        ],
        correctIndex: 1,
        explanation: text(
          "Correct (B): praise → contradicting survival → closing doubt is a strong view, qualified concession, unresolved question. Trap A calls the pages a mere illustration of the praise when they contradict it. Trap C denies the argumentative shape the close clearly creates. Trap D claims a resolved rebuttal; the ending is an open question, not a firm conclusion.",
          "Верно (B): похвала → противоречащий фрагмент → заключительное сомнение — это сильная позиция, уточняющая уступка и неразрешённый вопрос. Ловушка A называет фрагменты мнимой иллюстрацией похвалы, тогда как они ей противоречат. Ловушка C отрицает аргументативную форму, явно созданную завершением. Ловушка D утверждает разрешённый контрответ; финал — открытый вопрос, а не твёрдый вывод."
        ),
        difficulty: "hard",
      },
    ],
  },
  {
    id: "eng-cross-text",
    section: "english",
    domainId: "craft",
    order: 8,
    title: text("Cross-text connections", "Связи между двумя текстами"),
    subtitle: text(
      "How two short texts agree, disagree, or talk past each other",
      "Как два коротких текста сходятся, расходятся или говорят мимо друг друга"
    ),
    minutes: 11,
    tags: ["cross-text", "comparison", "relationship"],
    objectives: [
      text("State each text's position in one phrase before comparing them", "Сформулировать позицию каждого текста одной фразой, прежде чем сравнивать"),
      text("Name the exact point of agreement or disagreement", "Называть точный пункт согласия или несогласия"),
      text("Avoid importing outsider knowledge to settle the comparison", "Не привлекать внешние знания, чтобы разрешить сравнение"),
    ],
    theory: [
      {
        heading: text("One phrase per text first", "Сначала по одной фразе на текст"),
        body: text(
          "Cross-text questions are won by compression. Give each text a three-to-five-word stance — 'short naps help alertness', 'long naps harm sleep' — then compare the two phrases. 'Both agree' means the phrases match; 'they disagree' means the phrases oppose; 'they talk past each other' means the phrases address different subjects.",
          "Вопросы о связи текстов выигрываются сжатием. Дайте каждому тексту позицию из трёх-пяти слов — «короткие сны помогают бодрости», «долгие сны вредят сну» — затем сравните эти фразы. «Оба согласны» означает, что фразы совпадают; «они расходятся» — что фразы противоположны; «говорят мимо друг друга» — что фразы касаются разныхsubjects."
        ),
      },
      {
        heading: text("Same topic is not the same position", "Одна тема — ещё не одна позиция"),
        body: text(
          "Two texts can share a subject and still disagree, or share a word and mean different things by it. Compare positions, not topics: 'both mention naps' is a topic match, not an agreement. Agreement requires the same stance toward the same claim — for example, both treating X as beneficial.",
          "Два текста могут делить тему и при этом расходиться, или делить слово и вкладывать в него разный смысл. Сравнивайте позиции, а не темы: «оба упоминают сны» — это совпадение темы, а не согласие. Согласие требует одинакового отношения к одному утверждению — например, оба считают X полезным."
        ),
      },
    ],
    examples: [
      {
        prompt: text(
          "Text 1: 'Walking to school improves children's independence.' Text 2: 'Children who walk to school show greater self-reliance.' How do the texts relate?",
          "Текст 1: «Ходьба в школу повышает самостоятельность детей». Текст 2: «Дети, ходящие в школу пешком, показывают большую самостоятельность». Как связаны тексты?"
        ),
        steps: [
          text("Compress: Text 1 = walking → independence; Text 2 = walking → self-reliance.", "Сожмите: текст 1 = ходьба → самостоятельность; текст 2 = ходьба → самостоятельность."),
          text("Compare: same direction, same claim — an agreement.", "Сравните: одно направление, одно утверждение — согласие."),
          text("Reject 'disagree' and 'different topics' — the stances align.", "Отклоните «расходятся» и «разные темы» — позиции совпадают."),
        ],
        answer: text("They agree: both link walking to school with independence.", "Они согласны: оба связывают ходьбу в школу с самостоятельностью."),
      },
      {
        prompt: text(
          "Text 1: 'The new bridge will shorten the commute.' Text 2: 'Traffic on the new bridge is already heavy.' How do the texts relate?",
          "Текст 1: «Новый мост сократит путь». Текст 2: «Движение на новом мосте уже плотное». Как связаны тексты?"
        ),
        steps: [
          text("Compress: Text 1 = bridge helps flow; Text 2 = bridge is congested.", "Сожмите: текст 1 = мост помогает движению; текст 2 = мост перегружен."),
          text("Compare: Text 2 qualifies Text 1's promise rather than restating it.", "Сравните: текст 2 уточняет обещание текста 1, а не повторяет его."),
          text("Reject 'both agree the bridge is free-flowing' — Text 2 says the opposite about current conditions.", "Отклоните «оба согласны, что мост свободен»: текст 2 говорит обратное о текущих условиях."),
        ],
        answer: text("Text 2 qualifies Text 1: the bridge is congested despite its promise.", "Текст 2 уточняет текст 1: мост перегружен вопреки обещанию."),
      },
    ],
    strategy: [
      text("Write Text 1 and Text 2 stances in two short phrases in the margin before reading the choices.", "Запишите позиции текста 1 и текста 2 двумя короткими фразами на полях, прежде чем читать варианты."),
      text("Translate each choice into 'agree / disagree / different subject / qualifies' and match it to your phrases.", "Переведите каждый вариант в «согласны / расходятся / разный предмет / уточняет» и сопоставьте со своими фразами."),
      text("Be wary of 'both mention X' options — they describe the topic, not the relationship.", "Осторожно относитесь к вариантам «оба упоминают X»: они описывают тему, а не отношение."),
    ],
    pitfalls: [
      text("Answering with topic similarity ('both about school') instead of position comparison.", "Отвечать совпадением темы («оба о школе») вместо сравнения позиций."),
      text("Assuming both texts agree because they share a keyword such as 'bridge' or 'walk'.", "Считать оба текста согласными из-за общего ключевого слова вроде «мост» или «ходьба»."),
      text("Reading a qualifying text as a full refutation — qualification narrows a claim; it does not always overturn it.", "Читать уточняющий текст как полное опровержение: уточнение сужает утверждение, но не всегда отменяет его."),
    ],
    practice: [
      {
        id: "eng-cross-text-p1",
        prompt: text(
          "Text 1: 'Evening classes help working adults finish degrees.' Text 2: 'Evening courses let employed students complete their programs.' How do the texts relate?",
          "Текст 1: «Вечерние занятия помогают взрослым с работой окончить образование». Текст 2: «Вечерние курсы позволяют работающим студентам завершить программы». Как связаны тексты?"
        ),
        options: [
          text("They disagree about evening classes.", "Они расходятся относительно вечерних занятий."),
          text("Text 2 qualifies Text 1 by limiting it to one city.", "Текст 2 уточняет текст 1, ограничивая его одним городом."),
          text("They both argue that evening classes support working adults completing degrees.", "Оба утверждают, что вечерние занятия помогают работающим взрослым окончить образование."),
          text("They discuss different subjects entirely.", "Они обсуждают совершенно разные предметы."),
        ],
        correctIndex: 2,
        explanation: text(
          "Correct (C): both stances are 'evening classes → completion for workers' — agreement. Trap A invents disagreement where none exists. Trap B adds a city limitation neither text states. Trap D claims different subjects; the subject is identical.",
          "Верно (C): обе позиции — «вечерние занятия → окончание образования у работающих» — это согласие. Ловушка A выдумывает несогласие, которого нет. Ловушка B добавляет ограничение одним городом, отсутствующее в обоих текстах. Ловушка D утверждает разные предметы; предмет один и тот же."
        ),
        difficulty: "easy",
      },
      {
        id: "eng-cross-text-p2",
        prompt: text(
          "Text 1: 'Public libraries lend more than books; they provide quiet spaces to study.' Text 2: 'At the central library, quiet study rooms are booked out weeks ahead.' How do the texts relate?",
          "Текст 1: «Публичные библиотеки дают больше, чем книги; они предоставляют тихие места для занятий». Текст 2: «В центральной библиотеке тихие комнаты для занятий забронированы на недели вперёд». Как связаны тексты?"
        ),
        options: [
          text("Text 2 illustrates the demand for the quiet spaces Text 1 describes.", "Текст 2 иллюстрирует спрос на тихие места, описанные в тексте 1."),
          text("Text 2 argues libraries should close study rooms.", "Текст 2 утверждает, что библиотеки должны закрыть комнаты для занятий."),
          text("The texts disagree about whether libraries lend books.", "Тексты расходятся о том, выдают ли библиотеки книги."),
          text("Text 1 refutes Text 2's booking fact.", "Текст 1 опровергает факт бронирования из текста 2."),
        ],
        correctIndex: 0,
        explanation: text(
          "Correct (A): Text 2 is a concrete case of the study-space function in Text 1 — illustration. Trap B invents a closure argument. Trap C invents a book-lending dispute both texts leave aside. Trap D reverses the link: Text 1 cannot refute a booking fact, and none is offered.",
          "Верно (A): текст 2 — конкретный случай функции места для занятий из текста 1 — иллюстрация. Ловушка B выдумывает аргумент о закрытии. Ловушка C выдумывает спор о выдаче книг, которого оба текста не касаются. Ловушка D переворачивает связь: текст 1 не может опровергнуть факт бронирования, и такового не предлагается."
        ),
        difficulty: "medium",
      },
      {
        id: "eng-cross-text-p3",
        prompt: text(
          "Text 1: 'Handwriting by hand makes essays longer because students rewrite slowly.' Text 2: 'Handwriting by hand helps students organise ideas, though their essays may be shorter.' How do the texts relate?",
          "Текст 1: «Письмо от руки делает эссе длиннее, потому что ученики медленно переписывают». Текст 2: «Письмо от руки помогает упорядочивать мысли, хотя эссе могут быть короче». Как связаны тексты?"
        ),
        options: [
          text("Both agree that handwriting makes essays longer.", "Оба согласны, что рукописный текст длиннее."),
          text("Text 2 agrees with Text 1 but adds that handwriting also helps organisation.", "Текст 2 согласен с текстом 1, но добавляет, что письмо от руки также помогает упорядочивать."),
          text("Text 2 concedes the length point but reframes handwriting's value elsewhere.", "Текст 2 признаёт пункт о длине, но переносит ценность письма от руки в другое место."),
          text("The texts discuss different subjects.", "Тексты обсуждают разные предметы."),
        ],
        correctIndex: 2,
        explanation: text(
          "Correct (C): Text 2 grants the shorter length ('may be shorter') while relocating the benefit to organisation — a concession-and-reframe. Trap A misstates the shared length direction; Text 2 expects shorter. Trap B preserves Text 1's 'longer' as agreed, which Text 2 does not. Trap D misses that both texts assess the same practice.",
          "Верно (C): текст 2 признаёт более короткую длину («могут быть короче»), перенося пользу на упорядочивание мыслей, — уступка и переосмысление. Ловушка A неверно описывает общее направление длины: текст 2 ожидает более короткие тексты. Ловушка B сохраняет «длиннее» из текста 1 как согласованное, чего текст 2 не делает. Ловушка D упускает, что оба текста оценивают одну практику."
        ),
        difficulty: "hard",
      },
      {
        id: "eng-cross-text-p4",
        prompt: text(
          "Text 1: 'A single national curriculum ensures every student meets the same standards.' Text 2: 'A single national curriculum would ignore regional needs and traditions.' How do the texts relate?",
          "Текст 1: «Единая национальная программа обучения гарантирует, что все ученики соответствуют одинаковым стандартам». Текст 2: «Единая национальная программа обучения проигнорирует региональные потребности и традиции». Как связаны тексты?"
        ),
        options: [
          text("Text 1 supports Text 2's conclusion about ignoring needs.", "Текст 1 поддерживает вывод текста 2 о пренебрежении потребностями."),
          text("Text 2 argues against Text 1's claim about uniform standards.", "Текст 2 возражает против утверждения текста 1 об единых стандартах."),
          text("The texts talk about different programs entirely.", "Тексты говорят о совершенно разных программах."),
          text("Text 1 refutes Text 2 by citing regional examples.", "Текст 1 опровергает текст 2, приводя примеры регионов."),
        ],
        correctIndex: 1,
        explanation: text(
          "Correct (B): Text 2 opposes the uniformity premise of Text 1 by pointing to ignored regional needs — disagreement about the same policy. Trap A treats opposition as support for the ignored-needs conclusion. Trap C claims different programs; both evaluate one national curriculum. Trap D invents regional examples Text 1 never gives.",
          "Верно (B): текст 2 возражает против посылки текста 1 об единообразии, указывая на игнорируемые региональные потребности, — несогласие о той же политике. Ловушка A трактует противостояние как поддержку вывода о пренебрежении нуждами. Ловушка C утверждает разные программы; обе оценивают одну национальную программу. Ловушка D выдумывает региональные примеры, которых текст 1 не даёт."
        ),
        difficulty: "hard",
      },
    ],
  },
];
