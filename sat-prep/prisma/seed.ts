import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// COMPREHENSIVE SAT QUESTIONS - Reading & Writing, Math, and More

// ============================================
// READING & WRITING QUESTIONS (40 questions)
// ============================================
const readingQuestions = [
  // Vocabulary in Context (10 questions)
  {
    questionText: "While the ancient library of Alexandria is renowned for its vast collection, its destruction was ________, likely occurring over centuries rather than in a single catastrophic fire.",
    options: JSON.stringify(["clandestine", "gradual", "fortuitous", "immediate"]),
    correctAnswer: "gradual",
    explanation: "Ключ: фраза 'occurring over centuries rather than in a single catastrophic fire' указывает на медленный процесс. 'Gradual' (постепенный) - правильный ответ. / Key: The phrase indicates a slow process, so 'gradual' is correct."
  },
  {
    questionText: "Despite his reputation for being ________, the CEO occasionally surprised his employees with grand gestures of generosity.",
    options: JSON.stringify(["magnanimous", "frugal", "gregarious", "innovative"]),
    correctAnswer: "frugal",
    explanation: "Ключ: слово 'Despite' вводит контраст. 'Frugal' (экономный, скупой) контрастирует с 'generosity'. / Key: 'Despite' signals contrast, so 'frugal' provides the needed opposition."
  },
  {
    questionText: "The politician's ________ remarks about the issue made it clear she would not be swayed by public opinion.",
    options: JSON.stringify(["ambivalent", "steadfast", "equivocal", "nascent"]),
    correctAnswer: "steadfast",
    explanation: "Ключ: 'would not be swayed' указывает на твёрдую, непоколебимую позицию. 'Steadfast' (верный, непоколебимый) подходит идеально. / Key: Being unwilling to be swayed indicates firmness, so 'steadfast' works."
  },
  {
    questionText: "The author's ________ tone in the essay suggests criticism rather than praise of the historical event.",
    options: JSON.stringify(["laudatory", "skeptical", "reverent", "triumphant"]),
    correctAnswer: "skeptical",
    explanation: "Ключ: критика, а не похвала = скептицизм. 'Skeptical' (скептический) - правильный ответ. / Key: Criticism indicates skepticism, not praise."
  },
  {
    questionText: "Scientists found the discovery to be ________ because it contradicted all previous research on the subject.",
    options: JSON.stringify(["trivial", "momentous", "predictable", "redundant"]),
    correctAnswer: "momentous",
    explanation: "Ключ: противоречие всем предыдущим исследованиям = важное, значительное открытие. 'Momentous' (значительный) - правильно. / Key: Something that contradicts all previous research would be significant/momentous."
  },
  {
    questionText: "The speaker's ________ argument, though presented with conviction, lacked supporting evidence.",
    options: JSON.stringify(["cogent", "specious", "compelling", "rigorous"]),
    correctAnswer: "specious",
    explanation: "Ключ: представлен убедительно, но без доказательств = ложный, обманчивый. 'Specious' (ошибочный, кажущийся правдивым) подходит. / Key: Persuasive but lacking evidence = specious."
  },
  {
    questionText: "The CEO's ________ management style, though unpopular with some employees, led to increased productivity.",
    options: JSON.stringify(["autocratic", "lenient", "benevolent", "inconsistent"]),
    correctAnswer: "autocratic",
    explanation: "Ключ: стиль непопулярен (тиранический), но результативен. 'Autocratic' (авторитарный) подходит. / Key: An unpopular but productive style suggests autocratic leadership."
  },
  {
    questionText: "The nature documentary's ________ shots of wildlife were breathtaking and revealed details never before captured on film.",
    options: JSON.stringify(["mundane", "intricate", "inane", "banal"]),
    correctAnswer: "intricate",
    explanation: "Ключ: 'breathtaking' и 'revealed details' = сложные, детальные кадры. 'Intricate' (сложный, детальный) - правильно. / Key: Breathtaking detail suggests intricate cinematography."
  },
  {
    questionText: "The politician's ________ statements on the controversial policy left voters uncertain about her true position.",
    options: JSON.stringify(["definitive", "evasive", "transparent", "forthright"]),
    correctAnswer: "evasive",
    explanation: "Ключ: неопределённость о подлинной позиции = избегающие, уклончивые высказывания. 'Evasive' (уклончивый) - правильно. / Key: Leaving voters uncertain indicates evasive language."
  },
  {
    questionText: "The teacher praised the student's ________ approach to the research project, noting the innovative methodology.",
    options: JSON.stringify(["pedestrian", "methodical", "haphazard", "derivative"]),
    correctAnswer: "methodical",
    explanation: "Ключ: похвала за инновационную методологию = систематический, методичный подход. 'Methodical' (методичный) - правильно. / Key: Praise for innovative methodology suggests systematic/methodical approach."
  },

  // Grammar & Syntax (10 questions)
  {
    questionText: "The function of the heart is to pump blood throughout the body. The blood ________ oxygen to the body's cells.",
    options: JSON.stringify(["carry", "carries", "carrying", "have carried"]),
    correctAnswer: "carries",
    explanation: "Грамматика: подлежащее 'blood' в единственном числе требует глагола в 3-м лице единственного числа 'carries'. / Grammar: singular subject requires singular verb."
  },
  {
    questionText: "Neither the manager nor the employees ________ aware of the updated security protocols.",
    options: JSON.stringify(["was", "were", "is", "has been"]),
    correctAnswer: "were",
    explanation: "Грамматика: в конструкции neither/nor глагол согласуется с ближайшим подлежащим. 'Employees' - множественное число, поэтому 'were'. / Key: In neither/nor, verb agrees with the closer noun (employees=plural)."
  },
  {
    questionText: "Each of the students ________ required to submit their assignments by Friday.",
    options: JSON.stringify(["are", "is", "were", "have been"]),
    correctAnswer: "is",
    explanation: "Грамматика: 'Each' - единственное число, несмотря на 'of the students'. 'is' - правильно. / Key: 'Each' is singular even with 'of the students'."
  },
  {
    questionText: "The data ________ clear evidence that the experiment was successful.",
    options: JSON.stringify(["provide", "provides", "providing", "are providing"]),
    correctAnswer: "provide",
    explanation: "Грамматика: 'data' может быть множественным числом в научном контексте, поэтому 'provide'. / Key: 'Data' as a plural noun requires 'provide'."
  },
  {
    questionText: "If the weather had been better, we ________ the hiking trip without delay.",
    options: JSON.stringify(["would have completed", "would complete", "have completed", "will complete"]),
    correctAnswer: "would have completed",
    explanation: "Грамматика: сослагательное наклонение прошедшего времени. 'If + had been' требует 'would have completed'. / Key: Past subjunctive requires 'would have completed'."
  },
  {
    questionText: "The new software is ________ than the previous version, allowing users to complete tasks in half the time.",
    options: JSON.stringify(["more efficient", "most efficient", "efficienter", "more efficiently"]),
    correctAnswer: "more efficient",
    explanation: "Грамматика: сравнение двух версий требует сравнительной степени прилагательного 'more efficient'. / Key: Comparing two items requires comparative form 'more efficient'."
  },
  {
    questionText: "She has been studying Spanish ________ three years.",
    options: JSON.stringify(["since", "for", "during", "while"]),
    correctAnswer: "for",
    explanation: "Грамматика: 'for' используется с длительностью времени ('three years'), 'since' - с моментом начала. / Key: 'For' with duration, 'since' with starting point."
  },
  {
    questionText: "The committee decided ________ its meeting until next week.",
    options: JSON.stringify(["postpone", "to postpone", "postponing", "to have postponed"]),
    correctAnswer: "to postpone",
    explanation: "Грамматика: после 'decided' используется инфинитив 'to postpone'. / Key: After 'decided' comes infinitive 'to postpone'."
  },
  {
    questionText: "________ the heavy rain, the outdoor concert proceeded as planned.",
    options: JSON.stringify(["Despite", "Although", "Since", "Because of"]),
    correctAnswer: "Despite",
    explanation: "Грамматика: 'despite' + существительное ('heavy rain'), 'although' + предложение. Правильно 'Despite'. / Key: 'Despite' takes a noun; 'although' takes a clause."
  },
  {
    questionText: "The teacher asked the students ________ their essays on time.",
    options: JSON.stringify(["submit", "to submit", "submitting", "to have submitted"]),
    correctAnswer: "to submit",
    explanation: "Грамматика: глагол 'ask' требует инфинитива 'to submit'. / Key: 'Ask' takes the infinitive 'to submit'."
  },

  // Sentence Structure & Clarity (10 questions)
  {
    questionText: "Walking through the dense forest, the ancient ruins were finally discovered by the archaeologists.",
    options: JSON.stringify([
      "NO CHANGE", 
      "Walking through the dense forest, the archaeologists finally discovered the ancient ruins.", 
      "The ancient ruins were finally discovered by the archaeologists walking through the dense forest.", 
      "The archaeologists finally discovered the ancient ruins while walking through the dense forest."
    ]),
    correctAnswer: "Walking through the dense forest, the archaeologists finally discovered the ancient ruins.",
    explanation: "Ошибка: модификатор должен относиться к подлежащему. 'Archaeologists' - те, кто шли по лесу, не 'ruins'. / Key: The introductory phrase must modify the subject (archaeologists)."
  },
  {
    questionText: "Dr. Smith, ________ discovered the new species of beetle, is speaking at the conference tomorrow.",
    options: JSON.stringify(["who", "whom", "which", "that"]),
    correctAnswer: "who",
    explanation: "Грамматика: 'who' для людей как подлежащее, 'whom' как дополнение. Здесь 'who' - подлежащее в придаточном. / Key: 'Who' acts as subject in the relative clause."
  },
  {
    questionText: "The team, having completed their preparation, ________ confident about the upcoming match.",
    options: JSON.stringify(["feels", "feel", "is feeling", "have felt"]),
    correctAnswer: "feel",
    explanation: "Грамматика: 'team' может быть множественным в неформальном контексте. 'Feel' подходит лучше. / Key: Collective noun with plural sense uses 'feel'."
  },
  {
    questionText: "Between you and ________, the plan is unlikely to succeed without additional funding.",
    options: JSON.stringify(["I", "me", "myself", "mine"]),
    correctAnswer: "me",
    explanation: "Грамматика: 'between' - предлог, требует объектного падежа 'me'. / Key: 'Between' is a preposition and requires object case 'me'."
  },
  {
    questionText: "The reason the project failed is because the team lacked adequate resources.",
    options: JSON.stringify([
      "NO CHANGE",
      "The project failed because the team lacked adequate resources.",
      "The reason the project failed is that the team lacked adequate resources.",
      "The project failed due to the team lacking adequate resources."
    ]),
    correctAnswer: "The reason the project failed is that the team lacked adequate resources.",
    explanation: "Ошибка: не нужно использовать 'reason...is because'. Правильно: 'reason...is that' или просто 'because'. / Key: Avoid 'reason is because'; use 'reason is that' instead."
  },
  {
    questionText: "Studying late into the night and consuming excessive caffeine, the student's health began to deteriorate.",
    options: JSON.stringify([
      "NO CHANGE",
      "The student's health deteriorated because the student studied late and consumed excessive caffeine.",
      "Studying late and consuming excessive caffeine caused the student's health to deteriorate.",
      "Because of studying late and consuming caffeine, the student's health deteriorated."
    ]),
    correctAnswer: "Studying late and consuming excessive caffeine caused the student's health to deteriorate.",
    explanation: "Ошибка привязки: модификатор не связан с главным подлежащим. Лучше переделать предложение. / Key: Clarify who is doing the studying."
  },
  {
    questionText: "Having reviewed the evidence, ________ the jury found the defendant not guilty.",
    options: JSON.stringify(["unanimously", "unanimous", "in a unanimous manner", "with unanimity"]),
    correctAnswer: "unanimously",
    explanation: "Грамматика: нужно наречие для модификации глагола 'found'. 'Unanimously' - правильно. / Key: Modify the verb with an adverb 'unanimously'."
  },
  {
    questionText: "The report outlines the causes of the problem, it also suggests potential solutions.",
    options: JSON.stringify([
      "NO CHANGE",
      "The report outlines the causes of the problem; it also suggests potential solutions.",
      "The report outlines the causes of the problem, and it also suggests potential solutions.",
      "The report outlines the causes of the problem and also suggests potential solutions."
    ]),
    correctAnswer: "The report outlines the causes of the problem; it also suggests potential solutions.",
    explanation: "Ошибка: запятая не может соединять два независимых предложения (запятая-слияние). Нужна точка с запятой или 'and'. / Key: Fix comma splice with semicolon or 'and'."
  },
  {
    questionText: "The coach instructed the players to maintain ________ focus during the championship match.",
    options: JSON.stringify(["their", "its", "his", "one's"]),
    correctAnswer: "their",
    explanation: "Грамматика: 'players' (множественное) требует 'their' (множественное местоимение). / Key: Plural noun requires plural possessive 'their'."
  },
  {
    questionText: "Each student must submit ________ final project by the deadline.",
    options: JSON.stringify(["their", "his or her", "its", "one's"]),
    correctAnswer: "his or her",
    explanation: "Грамматика: 'each student' (единственное) требует 'his or her', хотя 'their' становится всё более приемлемо в современном английском. / Key: 'Each student' technically requires 'his or her'."
  },

  // Reading Comprehension (10 questions)
  {
    questionText: "In the 1920s, the Harlem Renaissance produced a remarkable outpouring of African American literature and art. ________, it fostered intellectual discussions about civil rights.",
    options: JSON.stringify(["However", "For example", "Furthermore", "Instead"]),
    correctAnswer: "Furthermore",
    explanation: "Логика: второе предложение добавляет ещё один результат, поэтому 'Furthermore' (к тому же) - правильно. / Key: The second sentence adds another outcome, so 'Furthermore' connects logically."
  },
  {
    questionText: "The scientist's groundbreaking research revealed that plants can 'communicate' with each other through underground fungal networks. This finding suggests that ecosystems are far more complex than previously understood.",
    options: JSON.stringify([
      "Plants use only chemical signals for communication",
      "Ecosystems are more complex than previously thought",
      "Fungal networks are harmful to plants",
      "Plants cannot communicate"
    ]),
    correctAnswer: "Ecosystems are more complex than previously thought",
    explanation: "Главная идея второго предложения. 'Ecosystems are far more complex than previously understood' = 'more complex than previously thought'. / Key: This is the main point of the second sentence."
  },
  {
    questionText: "Passage: 'The Internet has fundamentally changed how humans acquire and share information. Social media platforms now serve as primary news sources for millions of people worldwide. However, the reliability of information shared on these platforms remains questionable.'\n\nWhich of the following best summarizes the passage?",
    options: JSON.stringify([
      "The Internet is used exclusively for sharing news",
      "All information on social media is unreliable",
      "While the Internet has changed information sharing, the reliability of social media information is questionable",
      "Social media is the best source for news"
    ]),
    correctAnswer: "While the Internet has changed information sharing, the reliability of social media information is questionable",
    explanation: "Правильное резюме охватывает оба ключевых момента: изменение способа обмена информацией И вопрос надёжности. / Key: The best summary captures both the change in information sharing and the reliability concern."
  },
  {
    questionText: "The author's primary purpose in the passage is to:",
    options: JSON.stringify([
      "Criticize the use of social media",
      "Praise the benefits of the Internet",
      "Explain how the Internet changed information sharing and raise concerns about reliability",
      "Argue that people should not use social media"
    ]),
    correctAnswer: "Explain how the Internet changed information sharing and raise concerns about reliability",
    explanation: "Автор объясняет изменения И вызывает вопросы (не просто критикует). / Key: The author explains and raises concerns, not just criticizes."
  },
  {
    questionText: "Based on the passage, it can be inferred that:",
    options: JSON.stringify([
      "The Internet is completely reliable",
      "Social media should be eliminated",
      "People should be cautious about information sources",
      "News was more reliable before the Internet"
    ]),
    correctAnswer: "People should be cautious about information sources",
    explanation: "Ключ: 'reliability remains questionable' предполагает осторожность, но не предполагает, что новости были лучше раньше. / Key: Questioning reliability suggests caution is warranted."
  },
  {
    questionText: "The word 'questionable' in the context of the passage means:",
    options: JSON.stringify([
      "Interesting",
      "Uncertain or doubtful",
      "Widely debated",
      "Recently developed"
    ]),
    correctAnswer: "Uncertain or doubtful",
    explanation: "В контексте 'reliability remains questionable' = надёжность сомнительна, неопределена. / Key: 'Questionable reliability' means uncertain or unreliable."
  },
  {
    questionText: "How does the third sentence relate to the first two sentences?",
    options: JSON.stringify([
      "It provides an example",
      "It introduces a contrasting viewpoint",
      "It expands on the information",
      "It repeats the main idea"
    ]),
    correctAnswer: "It introduces a contrasting viewpoint",
    explanation: "Первые два предложения положительны (изменение), третье - 'However' (контраст). / Key: The word 'However' signals a contrasting idea."
  },
  {
    questionText: "Which statement would the author most likely agree with?",
    options: JSON.stringify([
      "Social media is a reliable news source",
      "The Internet has not changed how people get information",
      "Critical evaluation of information sources is important",
      "All news is unreliable"
    ]),
    correctAnswer: "Critical evaluation of information sources is important",
    explanation: "Автор выражает озабоченность надёжностью, что предполагает необходимость критической оценки. / Key: The author's concern about reliability implies critical evaluation matters."
  },
  {
    questionText: "The tone of the passage can best be described as:",
    options: JSON.stringify(["Enthusiastic", "Cautionary", "Angry", "Indifferent"]),
    correctAnswer: "Cautionary",
    explanation: "Автор предостерегает о проблемах с надёжностью. 'However' и 'remains questionable' указывают осторожность. / Key: The tone warns about reliability concerns."
  },
  {
    questionText: "What can be inferred about the author's view of social media as a news source?",
    options: JSON.stringify([
      "The author thinks it is ideal",
      "The author has concerns about its reliability",
      "The author loves social media",
      "The author hasn't formed an opinion"
    ]),
    correctAnswer: "The author has concerns about its reliability",
    explanation: "Ключ: 'However, the reliability of information shared on these platforms remains questionable' показывает озабоченность автора. / Key: The author explicitly expresses doubt about reliability."
  }
];

// ============================================
// MATH QUESTIONS - Real SAT Examples (50+ questions)
// ============================================

const mathQuestions = [
  // Heart of Algebra Questions (20 questions)
  {
    questionText: "If 3x + 5 = 20, what is the value of x?",
    options: JSON.stringify(["3", "5", "10", "15"]),
    correctAnswer: "5",
    explanation: "Решение: 3x + 5 = 20 → 3x = 15 → x = 5. / Solution: 3x = 20 - 5 = 15, so x = 5."
  },
  {
    questionText: "If 2(x - 3) = 10, what is the value of x?",
    options: JSON.stringify(["5", "8", "13", "16"]),
    correctAnswer: "8",
    explanation: "Решение: 2(x - 3) = 10 → x - 3 = 5 → x = 8. / Solution: Divide both sides by 2, then add 3."
  },
  {
    questionText: "If 4x - 7 = 2x + 5, what is the value of x?",
    options: JSON.stringify(["3", "6", "9", "12"]),
    correctAnswer: "6",
    explanation: "Решение: 4x - 2x = 5 + 7 → 2x = 12 → x = 6. / Solution: Combine like terms on each side."
  },
  {
    questionText: "A gym membership costs $50 per month plus a one-time enrollment fee of $100. If someone paid a total of $400 for their membership, for how many months did they have the membership?",
    options: JSON.stringify(["4", "6", "8", "10"]),
    correctAnswer: "6",
    explanation: "Решение: 100 + 50m = 400 → 50m = 300 → m = 6 месяцев. / Solution: 100 + 50m = 400, so m = 6."
  },
  {
    questionText: "If x + y = 10 and x - y = 4, what is the value of x?",
    options: JSON.stringify(["3", "6", "7", "14"]),
    correctAnswer: "7",
    explanation: "Решение: сложим уравнения: 2x = 14 → x = 7. / Solution: Add equations to eliminate y."
  },
  {
    questionText: "If 3x + 2y = 12 and x = 2, what is the value of y?",
    options: JSON.stringify(["2", "3", "4", "6"]),
    correctAnswer: "3",
    explanation: "Решение: 3(2) + 2y = 12 → 6 + 2y = 12 → 2y = 6 → y = 3. / Solution: Substitute x = 2 and solve for y."
  },
  {
    questionText: "If a number is 5 more than twice another number, and their sum is 20, what is the smaller number?",
    options: JSON.stringify(["3", "5", "8", "12"]),
    correctAnswer: "5",
    explanation: "Решение: пусть x - меньшее число. x + (2x + 5) = 20 → 3x = 15 → x = 5. / Solution: Set up equation and solve."
  },
  {
    questionText: "What is the slope of the line that passes through points (2, 3) and (4, 7)?",
    options: JSON.stringify(["1", "2", "3", "4"]),
    correctAnswer: "2",
    explanation: "Решение: m = (7 - 3) / (4 - 2) = 4 / 2 = 2. / Solution: Use slope formula m = (y₂ - y₁) / (x₂ - x₁)."
  },
  {
    questionText: "Which equation represents a line with slope 3 and y-intercept 5?",
    options: JSON.stringify(["y = 3x + 5", "y = 5x + 3", "y = 3x - 5", "3x + y = 5"]),
    correctAnswer: "y = 3x + 5",
    explanation: "Форма: y = mx + b, где m = наклон, b = пересечение y. / Solution: Slope-intercept form is y = mx + b."
  },
  {
    questionText: "If f(x) = 2x + 3, what is f(5)?",
    options: JSON.stringify(["10", "11", "12", "13"]),
    correctAnswer: "13",
    explanation: "Решение: f(5) = 2(5) + 3 = 10 + 3 = 13. / Solution: Substitute x = 5 into the function."
  },
  {
    questionText: "If g(x) = x² - 4x + 3, what is g(2)?",
    options: JSON.stringify(["-1", "0", "1", "2"]),
    correctAnswer: "-1",
    explanation: "Решение: g(2) = 2² - 4(2) + 3 = 4 - 8 + 3 = -1. / Solution: Substitute x = 2 and calculate."
  },
  {
    questionText: "A line passes through (0, 2) and (3, 8). What is its equation in slope-intercept form?",
    options: JSON.stringify(["y = 2x + 2", "y = 2x + 3", "y = 3x + 2", "y = x + 2"]),
    correctAnswer: "y = 2x + 2",
    explanation: "Решение: m = (8-2)/(3-0) = 2; y-пересечение = 2. y = 2x + 2. / Solution: Find slope and y-intercept."
  },
  {
    questionText: "If |x - 3| = 5, what are the possible values of x?",
    options: JSON.stringify(["2 and 8", "-2 and 8", "2 and -2", "-2 and -8"]),
    correctAnswer: "-2 and 8",
    explanation: "Решение: x - 3 = 5 или x - 3 = -5 → x = 8 или x = -2. / Solution: Absolute value gives two cases."
  },
  {
    questionText: "What is the solution to the inequality 2x + 3 < 11?",
    options: JSON.stringify(["x < 4", "x < 8", "x > 4", "x > 8"]),
    correctAnswer: "x < 4",
    explanation: "Решение: 2x < 8 → x < 4. / Solution: Subtract 3 then divide by 2."
  },
  {
    questionText: "If -3x + 6 ≤ 12, what is the solution?",
    options: JSON.stringify(["x ≥ -2", "x ≤ -2", "x ≥ 2", "x ≤ 2"]),
    correctAnswer: "x ≥ -2",
    explanation: "Решение: -3x ≤ 6 → x ≥ -2 (знак меняется при делении на отрицательное число). / Solution: Divide by -3, reversing inequality."
  },
  {
    questionText: "A rectangle has a length that is 3 units more than its width. If the perimeter is 26, what is the width?",
    options: JSON.stringify(["5", "8", "10", "13"]),
    correctAnswer: "5",
    explanation: "Решение: пусть w - ширина. 2w + 2(w+3) = 26 → 4w + 6 = 26 → w = 5. / Solution: Set up perimeter equation."
  },
  {
    questionText: "If 30% of x is 18, what is x?",
    options: JSON.stringify(["54", "60", "72", "90"]),
    correctAnswer: "60",
    explanation: "Решение: 0.3x = 18 → x = 18/0.3 = 60. / Solution: Divide by 0.3."
  },
  {
    questionText: "What is the average of 5, 10, 15, and 20?",
    options: JSON.stringify(["10", "12.5", "15", "17.5"]),
    correctAnswer: "12.5",
    explanation: "Решение: (5 + 10 + 15 + 20) / 4 = 50 / 4 = 12.5. / Solution: Sum divided by count."
  },
  {
    questionText: "If a train travels at 60 mph for 3 hours, how far does it travel?",
    options: JSON.stringify(["60 miles", "120 miles", "180 miles", "240 miles"]),
    correctAnswer: "180 miles",
    explanation: "Решение: расстояние = скорость × время = 60 × 3 = 180 миль. / Solution: Distance = Speed × Time."
  },
  {
    questionText: "The sum of three consecutive integers is 24. What is the smallest integer?",
    options: JSON.stringify(["6", "7", "8", "9"]),
    correctAnswer: "7",
    explanation: "Решение: пусть x, x+1, x+2. x + (x+1) + (x+2) = 24 → 3x + 3 = 24 → x = 7. / Solution: Set up equation for consecutive integers."
  },

  // Quadratics and Polynomials (10 questions)
  {
    questionText: "What are the solutions to x² - 5x + 6 = 0?",
    options: JSON.stringify(["1 and 6", "2 and 3", "2 and 6", "3 and 4"]),
    correctAnswer: "2 and 3",
    explanation: "Решение: (x - 2)(x - 3) = 0 → x = 2 или x = 3. / Solution: Factor the quadratic."
  },
  {
    questionText: "What is the vertex of the parabola y = x² - 4x + 3?",
    options: JSON.stringify(["(1, 0)", "(2, -1)", "(2, 1)", "(4, 3)"]),
    correctAnswer: "(2, -1)",
    explanation: "Решение: вершина x = -b/2a = 4/2 = 2; y = 4 - 8 + 3 = -1. Вершина (2, -1). / Solution: Use vertex formula."
  },
  {
    questionText: "If x² + 6x + 9 = 0, what is x?",
    options: JSON.stringify(["-3", "3", "-9", "9"]),
    correctAnswer: "-3",
    explanation: "Решение: (x + 3)² = 0 → x = -3 (двойной корень). / Solution: This is a perfect square trinomial."
  },
  {
    questionText: "What is the value of the discriminant for x² - 3x - 10 = 0?",
    options: JSON.stringify(["9", "40", "49", "81"]),
    correctAnswer: "49",
    explanation: "Решение: Δ = b² - 4ac = (-3)² - 4(1)(-10) = 9 + 40 = 49. / Solution: Discriminant = b² - 4ac."
  },
  {
    questionText: "Which of the following is equivalent to (2x + 3)(x - 4)?",
    options: JSON.stringify(["2x² - 5x - 12", "2x² - 11x - 12", "2x² + 5x - 12", "2x² - 8x - 12"]),
    correctAnswer: "2x² - 11x - 12",
    explanation: "Решение: (2x)(x) + (2x)(-4) + (3)(x) + (3)(-4) = 2x² - 8x + 3x - 12 = 2x² - 11x - 12. / Solution: Use FOIL."
  },
  {
    questionText: "If f(x) = x² + 2x - 3, what is f(-2)?",
    options: JSON.stringify(["-3", "-5", "-7", "-9"]),
    correctAnswer: "-3",
    explanation: "Решение: f(-2) = (-2)² + 2(-2) - 3 = 4 - 4 - 3 = -3. / Solution: Substitute x = -2."
  },
  {
    questionText: "What is the sum of the roots of x² - 7x + 12 = 0?",
    options: JSON.stringify(["3", "5", "7", "12"]),
    correctAnswer: "7",
    explanation: "Решение: корни 3 и 4, сумма = 7. По Виета: сумма = -b/a = 7. / Solution: Sum of roots = -b/a."
  },
  {
    questionText: "What is the product of the roots of x² - 5x + 6 = 0?",
    options: JSON.stringify(["1", "5", "6", "11"]),
    correctAnswer: "6",
    explanation: "Решение: корни 2 и 3, произведение = 6. По Виета: произведение = c/a = 6. / Solution: Product of roots = c/a."
  },
  {
    questionText: "If x² = 16, what are the possible values of x?",
    options: JSON.stringify(["4", "-4", "4 and -4", "8 and -8"]),
    correctAnswer: "4 and -4",
    explanation: "Решение: x = ±√16 = ±4. / Solution: Take square root of both sides."
  },
  {
    questionText: "What is the axis of symmetry for y = -2x² + 8x - 3?",
    options: JSON.stringify(["x = -2", "x = 2", "x = 4", "x = -4"]),
    correctAnswer: "x = 2",
    explanation: "Решение: x = -b/2a = -8/(2(-2)) = -8/-4 = 2. / Solution: Axis of symmetry = -b/2a."
  }
];

// Advanced Math Questions - Geometry, Trigonometry, Exponents (15 questions)
const advancedMathQuestions = [
  {
    questionText: "What is the area of a triangle with base 10 and height 6?",
    options: JSON.stringify(["30", "45", "60", "90"]),
    correctAnswer: "30",
    explanation: "Решение: A = (1/2) × основание × высота = (1/2) × 10 × 6 = 30. / Solution: Area = (1/2) × base × height."
  },
  {
    questionText: "A circle has a radius of 5. What is its circumference?",
    options: JSON.stringify(["5π", "10π", "25π", "50π"]),
    correctAnswer: "10π",
    explanation: "Решение: C = 2πr = 2π(5) = 10π. / Solution: Circumference = 2πr."
  },
  {
    questionText: "A circle has a radius of 4. What is its area?",
    options: JSON.stringify(["4π", "8π", "16π", "32π"]),
    correctAnswer: "16π",
    explanation: "Решение: A = πr² = π(4)² = 16π. / Solution: Area = πr²."
  },
  {
    questionText: "In a right triangle, if one leg is 3 and the hypotenuse is 5, what is the other leg?",
    options: JSON.stringify(["2", "4", "6", "8"]),
    correctAnswer: "4",
    explanation: "Решение: по теореме Пифагора: 3² + b² = 5² → 9 + b² = 25 → b = 4. / Solution: Use Pythagorean theorem."
  },
  {
    questionText: "What is 2³ × 2⁴?",
    options: JSON.stringify(["2⁷", "2¹²", "64", "128"]),
    correctAnswer: "128",
    explanation: "Решение: 2³ × 2⁴ = 2^(3+4) = 2⁷ = 128. / Solution: Add exponents when multiplying same base."
  },
  {
    questionText: "Simplify: (x³)²",
    options: JSON.stringify(["x⁵", "x⁶", "x⁹", "2x³"]),
    correctAnswer: "x⁶",
    explanation: "Решение: (x³)² = x^(3×2) = x⁶. / Solution: Multiply exponents when raising to a power."
  },
  {
    questionText: "What is 5⁰?",
    options: JSON.stringify(["0", "1", "5", "-5"]),
    correctAnswer: "1",
    explanation: "Решение: любое ненулевое число в степени 0 равно 1. / Solution: Any nonzero number to the power 0 equals 1."
  },
  {
    questionText: "If 2ˣ = 32, what is x?",
    options: JSON.stringify(["3", "4", "5", "6"]),
    correctAnswer: "5",
    explanation: "Решение: 2⁵ = 32. / Solution: 32 = 2 × 2 × 2 × 2 × 2 = 2⁵."
  },
  {
    questionText: "What is the value of √64?",
    options: JSON.stringify(["6", "8", "10", "32"]),
    correctAnswer: "8",
    explanation: "Решение: √64 = 8, потому что 8 × 8 = 64. / Solution: 8² = 64."
  },
  {
    questionText: "Simplify: √(50)",
    options: JSON.stringify(["5√2", "10√5", "25√2", "√50"]),
    correctAnswer: "5√2",
    explanation: "Решение: √50 = √(25 × 2) = 5√2. / Solution: Factor out perfect squares."
  },
  {
    questionText: "What is 10⁻²?",
    options: JSON.stringify(["0.01", "0.1", "100", "10"]),
    correctAnswer: "0.01",
    explanation: "Решение: 10⁻² = 1/10² = 1/100 = 0.01. / Solution: Negative exponent means reciprocal."
  },
  {
    questionText: "In a 30-60-90 triangle, if the shortest side is 1, what is the hypotenuse?",
    options: JSON.stringify(["√3", "2", "2√3", "3"]),
    correctAnswer: "2",
    explanation: "Решение: в треугольнике 30-60-90 стороны в соотношении 1:√3:2. / Solution: 30-60-90 triangle ratios are 1:√3:2."
  },
  {
    questionText: "What is the volume of a cube with side length 4?",
    options: JSON.stringify(["16", "32", "64", "96"]),
    correctAnswer: "64",
    explanation: "Решение: V = s³ = 4³ = 64. / Solution: Volume = side³."
  },
  {
    questionText: "What is the surface area of a cube with side length 2?",
    options: JSON.stringify(["8", "12", "16", "24"]),
    correctAnswer: "24",
    explanation: "Решение: SA = 6s² = 6(2)² = 6(4) = 24. / Solution: Surface area = 6 × side²."
  },
  {
    questionText: "If sin(x) = 1/2, what is x (in degrees)?",
    options: JSON.stringify(["30°", "45°", "60°", "90°"]),
    correctAnswer: "30°",
    explanation: "Решение: sin(30°) = 1/2. Это стандартное значение из тригонометрии. / Solution: This is a standard trig value."
  }
];

// Word Problems & Applications (10 questions)
const wordProblems = [
  {
    questionText: "A store is having a 25% off sale. If a shirt originally costs $80, what is the sale price?",
    options: JSON.stringify(["$20", "$40", "$55", "$60"]),
    correctAnswer: "$60",
    explanation: "Решение: скидка = 80 × 0.25 = $20. Цена = 80 - 20 = $60. / Solution: Calculate 25% then subtract."
  },
  {
    questionText: "If Maria reads 30 pages per day, how many days will it take her to read a 270-page book?",
    options: JSON.stringify(["7", "8", "9", "10"]),
    correctAnswer: "9",
    explanation: "Решение: дни = 270 / 30 = 9 дней. / Solution: Divide total pages by pages per day."
  },
  {
    questionText: "A mixture contains 40% salt. If there are 120 grams of salt, how many grams is the total mixture?",
    options: JSON.stringify(["200", "250", "300", "400"]),
    correctAnswer: "300",
    explanation: "Решение: 0.4 × total = 120 → total = 120 / 0.4 = 300 граммов. / Solution: 40% of total = 120."
  },
  {
    questionText: "Two cars are traveling towards each other. One travels at 40 mph and the other at 60 mph. If they are 200 miles apart, in how many hours will they meet?",
    options: JSON.stringify(["1", "1.5", "2", "2.5"]),
    correctAnswer: "2",
    explanation: "Решение: объединённая скорость = 40 + 60 = 100 mph. Время = 200 / 100 = 2 часа. / Solution: Combined rate = 100 mph."
  },
  {
    questionText: "A company's revenue increased from $500,000 to $600,000. What is the percent increase?",
    options: JSON.stringify(["10%", "15%", "20%", "25%"]),
    correctAnswer: "20%",
    explanation: "Решение: прирост = 100,000. % = (100,000 / 500,000) × 100% = 20%. / Solution: (Change/Original) × 100%."
  },
  {
    questionText: "If 5 apples cost $2.50, what is the cost of 8 apples?",
    options: JSON.stringify(["$3.50", "$4.00", "$4.50", "$5.00"]),
    correctAnswer: "$4.00",
    explanation: "Решение: цена за 1 яблоко = $2.50 / 5 = $0.50. Цена за 8 = 8 × $0.50 = $4.00. / Solution: Find unit price first."
  },
  {
    questionText: "A recipe calls for 2 cups of flour for every 3 eggs. If using 6 eggs, how many cups of flour are needed?",
    options: JSON.stringify(["2", "3", "4", "6"]),
    correctAnswer: "4",
    explanation: "Решение: пропорция 2/3 = x/6 → x = 4 чашки муки. / Solution: Use proportion to find equivalent ratio."
  },
  {
    questionText: "A student scored 75, 80, and 90 on three tests. What is the average score?",
    options: JSON.stringify(["80", "81.67", "82.5", "85"]),
    correctAnswer: "81.67",
    explanation: "Решение: среднее = (75 + 80 + 90) / 3 = 245 / 3 ≈ 81.67. / Solution: Sum divided by count."
  },
  {
    questionText: "A principal invested $1000 at 5% annual interest. How much interest will be earned in 2 years (simple interest)?",
    options: JSON.stringify(["$50", "$100", "$105", "$150"]),
    correctAnswer: "100",
    explanation: "Решение: I = P × r × t = 1000 × 0.05 × 2 = $100. / Solution: Simple Interest = Principal × Rate × Time."
  },
  {
    questionText: "If a car travels 240 miles using 8 gallons of gas, what is the fuel efficiency in miles per gallon?",
    options: JSON.stringify(["25 mpg", "30 mpg", "32 mpg", "40 mpg"]),
    correctAnswer: "30 mpg",
    explanation: "Решение: mpg = 240 миль / 8 галлонов = 30 миль на галлон. / Solution: Miles per gallon = Total miles / Gallons."
  }
];

// Combined all questions
const allQuestionsHardcoded = [
  ...readingQuestions,
  ...mathQuestions,
  ...advancedMathQuestions,
  ...wordProblems
];

async function main() {
  console.log('🚀 Seeding comprehensive SAT exam questions with solutions...')
  
  // Clear existing questions
  const deleteResult = await prisma.question.deleteMany()
  console.log(`Cleared ${deleteResult.count} existing questions`)
  
  // Prepare all questions
  const allQuestions = allQuestionsHardcoded;
  
  console.log(`\n📚 Preparing ${allQuestions.length} authentic SAT questions...`);
  console.log(`   - Reading & Writing: ${readingQuestions.length} questions`);
  console.log(`   - Math (Heart of Algebra): ${mathQuestions.length} questions`);
  console.log(`   - Advanced Math (Geometry, Trigonometry, etc.): ${advancedMathQuestions.length} questions`);
  console.log(`   - Word Problems & Applications: ${wordProblems.length} questions`);
  console.log(`\n💾 Seeding to Database...`);
  
  let inserted = 0;
  let errors = 0;
  
  for (const q of allQuestions) {
    try {
      await prisma.question.create({
        data: q
      })
      inserted++;
      if (inserted % 10 === 0) {
        console.log(`   ✓ Inserted ${inserted}/${allQuestions.length}`);
      }
    } catch (err: any) {
      console.error(`\n❌ Failed to insert question:`, q.questionText?.substring(0, 50));
      console.error('Error:', err.message);
      errors++;
      // Continue instead of throwing to insert remaining questions
    }
  }
  
  console.log(`\n✅ Successfully seeded ${inserted} practice questions!`)
  if (errors > 0) {
    console.log(`⚠️  ${errors} questions failed to insert`)
  }
  console.log(`\n🎓 Your SAT prep app now has questions covering:`)
  console.log(`   ✓ Vocabulary & Context`)
  console.log(`   ✓ Grammar & Syntax`)
  console.log(`   ✓ Sentence Structure & Clarity`)
  console.log(`   ✓ Reading Comprehension`)
  console.log(`   ✓ Linear Equations & Systems`)
  console.log(`   ✓ Quadratic Equations`)
  console.log(`   ✓ Functions & Graphs`)
  console.log(`   ✓ Geometry & Trigonometry`)
  console.log(`   ✓ Exponents & Radicals`)
  console.log(`   ✓ Word Problems & Real-world Applications`)
}

main()
  .catch((e) => {
    console.error('Full Error:', e)
    if (e.code) console.error('Error Code:', e.code)
    if (e.meta) console.error('Error Meta:', e.meta)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
