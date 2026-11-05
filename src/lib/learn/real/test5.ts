import type { RealTestLabQuestion } from "../types";

const E = (en: string, ru: string) => ({ en, ru });

function q({
  id, test, section, module, number, domainId, domainLabel, difficulty, prompt, passage, options, correctIndex, answerText, correctAnswerLabel, sourcePage, standard, desmos, pitfalls, desmosExpressions,
}: {
  id: string;
  test: 4 | 5 | 6;
  section: "math" | "english";
  module: 1 | 2;
  number: number;
  domainId: string;
  domainLabel: string;
  difficulty: "easy" | "medium" | "hard";
  prompt: { en: string; ru: string };
  passage?: { en: string; ru: string };
  options?: string[];
  correctIndex?: number;
  answerText?: string;
  correctAnswerLabel: { en: string; ru: string };
  sourcePage?: number;
  standard: { title: { en: string; ru: string }; steps: Array<{ title: { en: string; ru: string }; detail: { en: string; ru: string }; expressions?: string[] }> };
  desmos: { title: { en: string; ru: string }; steps: Array<{ title: { en: string; ru: string }; detail: { en: string; ru: string }; expressions?: string[] }> };
  pitfalls: Array<{ en: string; ru: string }>;
  desmosExpressions: string[];
}): RealTestLabQuestion {
  return {
    id, test, section, module, number, domainId, domainLabel, difficulty,
    prompt, passage, options, correctIndex, answerText, correctAnswerLabel, sourcePage,
    standard, desmos, pitfalls, desmosExpressions,
  };
}

// ========== TEST 5 — MATH (from sat-practice-test-5-digital.pdf) ==========
export const t5: RealTestLabQuestion[] = [
  q({
    id: "t5-math-m1-q2",
    test: 5, section: "math", module: 1, number: 2,
    domainId: "heart", domainLabel: "Linear Models",
    difficulty: "easy",
    prompt: E("Film club has 90 members on day 1. Each day after, 10 new members join. How many members 4 days after the first day?", "Киноклуб: 90 участников в первый день. Каждый следующий день +10. Сколько через 4 дня после первого?"),
    options: ["400", "130", "94", "90"], correctIndex: 1,
    correctAnswerLabel: E("B) 130 — 90 + 4*10 = 130", "B) 130 — 90 + 4*10 = 130"),
    sourcePage: 32,
    standard: {
      title: E("Standard: arithmetic sequence", "Стандартно: арифметическая прогрессия"),
      steps: [
        { title: E("4 days after day 1", "Через 4 дня после первого"), detail: E("Starting 90, add 10 four times: 90+40 = 130. (Day 1 = 90, day 5 = 130.)", "90 + 10*4 = 130. (День 1 = 90, день 5 = 130.)") },
      ],
    },
    desmos: {
      title: E("Desmos: table", "Desmos: таблица"),
      steps: [
        { title: E("Enter f(x)=90+10x", "Введи f(x)=90+10x"), detail: E("f(4) = 130 instantly.", "f(4) = 130 мгновенно."), expressions: ["f(x)=90+10x", "f(4)"] },
      ],
    },
    pitfalls: [E("Counting day 1 as an addition day (getting 140) — additions start after day 1.", "Посчитать день 1 как день добавления (получится 140) — добавления начинаются после дня 1.")],
    desmosExpressions: ["f(x)=90+10x", "f(4)"],
  }),
  q({
    id: "t5-math-m1-q21",
    test: 5, section: "math", module: 1, number: 21,
    domainId: "passport", domainLabel: "Polynomial Roots (SPR)",
    difficulty: "medium",
    prompt: E("g(x) = (x+14)(t−x). The graph of y=g(x) passes through (24, 0). Find g(0). (SPR)", "g(x) = (x+14)(t−x). График проходит через (24, 0). Найди g(0). (SPR)"),
    answerText: "336",
    correctAnswerLabel: E("336 — t=24, g(0)=14*24=336", "336 — t=24, g(0)=14*24=336"),
    sourcePage: 38,
    standard: {
      title: E("Standard: root = zero", "Стандартно: корень = ноль"),
      steps: [
        { title: E("g(24)=0 → t=24", "g(24)=0 → t=24"), detail: E("(24+14)(t−24)=0 → t=24. Then g(0) = 14*24 = 336.", "(24+14)(t−24)=0 → t=24. Затем g(0) = 14*24 = 336.") },
      ],
    },
    desmos: {
      title: E("Desmos: intersection", "Desmos: пересечение"),
      steps: [
        { title: E("Enter g(x)=(x+14)(x-24)", "Введи g(x)=(x+14)(x-24)"), detail: E("Roots at x=−14 and x=24; g(0)=336.", "Корни −14 и 24; g(0)=336."), expressions: ["g(x)=(x+14)(24-x)", "g(0)"] },
      ],
    },
    pitfalls: [E("Sign error: (t−x) with x=24 gives t=24, not −24.", "Ошибка знака: (t−x) при x=24 даёт t=24, не −24.")],
    desmosExpressions: ["g(x)=(x+14)(24-x)", "g(0)"],
  }),
  q({
    id: "t5-math-m1-q22",
    test: 5, section: "math", module: 1, number: 22,
    domainId: "geometry", domainLabel: "Circle Bounds",
    difficulty: "medium",
    prompt: E("Circle: (x+4)² + (y−19)² = 121. Point (a,b) is on the circle. Which could be a?", "Окружность: (x+4)² + (y−19)² = 121. Точка (a,b) на ней. Возможное a?"),
    options: ["−16", "−14", "11", "19"], correctIndex: 1,
    correctAnswerLabel: E("B) −14 — center (−4,19), r=11 → |a+4| ≤ 11 → −15 ≤ a ≤ 7. Only −14 fits.", "B) −14 — центр (−4,19), r=11 → |a+4| ≤ 11 → −15 ≤ a ≤ 7. Подходит только −14."),
    sourcePage: 38,
    standard: {
      title: E("Standard: distance from center", "Стандартно: расстояние до центра"),
      steps: [
        { title: E("Center (−4,19), r=11", "Центр (−4,19), r=11"), detail: E("(a+4)² ≤ 121 → |a+4| ≤ 11 → −15 ≤ a ≤ 7. Only −14 fits among the choices.", "(a+4)² ≤ 121 → |a+4| ≤ 11 → −15 ≤ a ≤ 7. Только −14 подходит.") },
      ],
    },
    desmos: {
      title: E("Desmos: graph the circle", "Desmos: построй окружность"),
      steps: [
        { title: E("Enter the circle", "Введи окружность"), detail: E("(x+4)²+(y−19)²=121. Drag to x=−14 — point is on the circle; x=−16/11/19 are outside.", "(x+4)²+(y−19)²=121. При x=−14 точка на окружности; −16/11/19 — вне."), expressions: ["(x+4)^2+(y-19)^2=121"] },
      ],
    },
    pitfalls: [E("Thinking a can be the center's y (19) or radius (11) — a is an x-coordinate, bounded by the circle.", "Думать, что a может быть 19 (y центра) или 11 (радиус) — a это x, ограниченная окружностью.")],
    desmosExpressions: ["(x+4)^2+(y-19)^2=121"],
  }),
  q({
    id: "t5-math-m1-q24",
    test: 5, section: "math", module: 1, number: 24,
    domainId: "passport", domainLabel: "Exponential / Minima",
    difficulty: "medium",
    prompt: E("Which function(s) have a minimum at x=−3? I. f(x)=−6(3)^(x−3)  II. g(x)=−3(6)^x", "Какая функция имеет минимум при x=−3? I. f(x)=−6(3)^(x−3)  II. g(x)=−3(6)^x"),
    options: ["I only", "II only", "I and II", "Neither I nor II"], correctIndex: 3,
    correctAnswerLabel: E("D) Neither — exponentials with positive base have no minimum; both are monotonic.", "D) Ни одна — экспоненты с положительным основанием монотонны, минимума нет."),
    sourcePage: 38,
    standard: {
      title: E("Standard: exponentials are monotonic", "Стандартно: экспоненты монотонны"),
      steps: [
        { title: E("Positive base → monotonic", "Положительное основание → монотонность"), detail: E("3^(x−3) and 6^x are always increasing. Multiplying by a negative number reflects them, so both functions are strictly decreasing and have no minimum.", "3^(x−3) и 6^x всегда возрастают. Умножение на отрицательное число отражает график, поэтому обе функции строго убывают и не имеют минимума.") },
      ],
    },
    desmos: {
      title: E("Desmos: graph both", "Desmos: построй обе"),
      steps: [
        { title: E("Enter both", "Введи обе"), detail: E("f(x)=−6*3^(x−3), g(x)=−3*6^x — both are smooth monotonic curves, no valley at −3.", "Обе — гладкие монотонные кривые, долины при −3 нет."), expressions: ["f(x)=-6(3)^(x-3)", "g(x)=-3(6)^x"] },
      ],
    },
    pitfalls: [E("Thinking 'minimum at −3' means the exponent contains −3 — the exponent is irrelevant to extrema.", "Думать, что 'минимум при −3' из-за (x−3) в показателе — показатель не влияет на экстремумы.")],
    desmosExpressions: ["f(x)=-6(3)^(x-3)", "g(x)=-3(6)^x"],
  }),
  q({
    id: "t5-math-m1-q27",
    test: 5, section: "math", module: 1, number: 27,
    domainId: "passport", domainLabel: "Polynomial Zeros (SPR)",
    difficulty: "hard",
    prompt: E("g(x) = x(x−2)(x+6)². The value of g(7−w) is 0. Find the sum of all possible values of w. (SPR)", "g(x) = x(x−2)(x+6)². g(7−w) = 0. Найди сумму всех возможных w. (SPR)"),
    answerText: "25",
    correctAnswerLabel: E("25 — zeros at x = 0, 2, −6 → w = 7, 5, 13; sum = 25", "25 — нули x = 0, 2, −6 → w = 7, 5, 13; сумма = 25"),
    sourcePage: 39,
    standard: {
      title: E("Standard: set each factor zero", "Стандартно: каждый множитель в ноль"),
      steps: [
        { title: E("x = 0, 2, −6", "x = 0, 2, −6"), detail: E("7−w = 0 → w=7; 7−w = 2 → w=5; 7−w = −6 → w=13. Sum = 7+5+13 = 25.", "7−w=0 → w=7; 7−w=2 → w=5; 7−w=−6 → w=13. Сумма = 25.") },
      ],
    },
    desmos: {
      title: E("Desmos: x-intercepts", "Desmos: пересечения с осью x"),
      steps: [
        { title: E("Enter g(x)", "Введи g(x)"), detail: E("Graph g(x)=x(x−2)(x+6)²; intercepts at 0, 2, −6. Then w = 7 − intercept.", "График g(x)=x(x−2)(x+6)²; пересечения 0, 2, −6. Затем w = 7 − пересечение."), expressions: ["g(x)=x(x-2)(x+6)^2"] },
      ],
    },
    pitfalls: [E("Forgetting the double root −6 counts once for w (still one value).", "Забыть: двойной корень −6 даёт одно значение w.")],
    desmosExpressions: ["g(x)=x(x-2)(x+6)^2"],
  }),
  q({
    id: "t5-math-m2-q1",
    test: 5, section: "math", module: 2, number: 1,
    domainId: "psda", domainLabel: "Percent (MCQ)",
    difficulty: "easy",
    prompt: E("What is 20% of 440?", "Сколько 20% от 440?"),
    options: ["44", "88", "880", "1,760"], correctIndex: 1,
    correctAnswerLabel: E("B) 88 — 0.2*440 = 88", "B) 88 — 0.2*440 = 88"),
    sourcePage: 43,
    standard: {
      title: E("Standard: 10% trick", "Стандартно: приём 10%"),
      steps: [
        { title: E("10% of 440 = 44", "10% от 440 = 44"), detail: E("Double it → 20% = 88.", "Удвоить → 20% = 88.") },
      ],
    },
    desmos: {
      title: E("Desmos: compute", "Desmos: вычислить"),
      steps: [
        { title: E("Enter 0.2*440", "Введи 0.2*440"), detail: E("Desmos gives 88.", "Desmos даст 88."), expressions: ["0.2*440"] },
      ],
    },
    pitfalls: [E("Moving the decimal wrong (44 is 10%).", "Неверно подвинуть запятую (44 — это 10%).")],
    desmosExpressions: ["0.2*440"],
  }),

  // ========== TEST 5 — READING & WRITING (representative) ==========
  q({
    id: "t5-rw-m1-q1",
    test: 5, section: "english", module: 1, number: 1,
    domainId: "rw-information", domainLabel: "Central Ideas",
    difficulty: "easy",
    prompt: E("Which choice best states the main idea of the text about the film club? (Representative drill from Test 5 RW Module 1)", "Какая формулировка лучше всего отражает главную мысль текста (представительный вопрос из RW Модуля 1 Теста 5)?"),
    options: ["A) Membership grows steadily", "B) Membership fell", "C) The club left", "D) No one joined"], correctIndex: 0,
    correctAnswerLabel: E("A) Membership grows — matches the +10/day pattern", "A) Численность растёт — соответствует +10 в день"),
    sourcePage: 3,
    standard: {
      title: E("Standard: main idea = direction", "Стандартно: главная мысль = направление"),
      steps: [
        { title: E("Key trend wins", "Главный тренд решает"), detail: E("Numbers rise, so any 'fell/left/none' option is out.", "Числа растут, поэтому 'упало/ушло/нет' — мимо.") },
      ],
    },
    desmos: { title: E("No Desmos — verbal", "Без Desmos — словесно"), steps: [{ title: E("SAT shortcut: negate", "Приём: исключи обратное"), detail: E("Trend matches only one option.", "Тренд совпадает только с одним вариантом.") }] },
    pitfalls: [E("Picking a detail instead of the main idea.", "Выбрать деталь вместо главной мысли.")],
    desmosExpressions: [],
  }),
  // ---- EXPANSION: more Test 5 Math ----
  q({ id:"t5-math-m2-q3", test:5, section:"math", module:2, number:3, domainId:"heart", domainLabel:"Evaluate Function", difficulty:"easy",
    prompt: E("f(x)=4x−3. Find f(10).","f(x)=4x−3. Найди f(10)."), options:["−30","37","40","43"], correctIndex:1,
    correctAnswerLabel:E("B) 37 — 4*10−3=37","B) 37 — 4*10−3=37"), sourcePage:43,
    standard:{title:E("Standard: plug in","Стандартно: подставить"),steps:[{title:E("f(10)=40−3=37","f(10)=40−3=37"),detail:E("Linear evaluation.","Линейное вычисление.")}]},
    desmos:{title:E("Desmos: evaluate","Desmos: вычислить"),steps:[{title:E("Enter f(x)=4x−3","Введи f(x)=4x−3"),detail:E("f(10)=37.","f(10)=37."),expressions:["f(x)=4x-3","f(10)"]}]},
    pitfalls:[E("Sign slip: 4*10+3=43.","Ошибка знака: 43.")], desmosExpressions:["f(x)=4x-3"] }),
  q({ id:"t5-math-m2-q4", test:5, section:"math", module:2, number:4, domainId:"passport", domainLabel:"Factoring", difficulty:"medium",
    prompt: E("Which is equivalent to 16x³y² + 14xy?","Что эквивалентно 16x³y² + 14xy?"), options:["2xy(8xy+7)","2xy(8x²y+7)","14xy(2x²y+1)","14xy(8x²y+1)"], correctIndex:1,
    correctAnswerLabel:E("B) 2xy(8x²y+7) — GCF 2xy","B) 2xy(8x²y+7) — НОД 2xy"), sourcePage:43,
    standard:{title:E("Standard: GCF","Стандартно: НОД"),steps:[{title:E("GCF 2xy","НОД 2xy"),detail:E("16x³y²/(2xy)=8x²y; 14xy/(2xy)=7.","Деление даёт 8x²y и 7.")}]},
    desmos:{title:E("Desmos: check","Desmos: проверка"),steps:[{title:E("Enter both forms","Введи обе формы"),detail:E("Test x=1,y=1: 30 both.","При x=1,y=1 обе дают 30."),expressions:["y=16x^3y^2+14xy"]}]},
    pitfalls:[E("Missing an x or y in factored form.","Пропустить x или y в скобках.")], desmosExpressions:["y=16x^3y^2+14xy"] }),
  q({ id:"t5-math-m2-q5", test:5, section:"math", module:2, number:5, domainId:"heart", domainLabel:"Linear Model Rabbit", difficulty:"easy",
    prompt: E("Rabbit: 25 cal per lb + 11 extra. Equation for c calories, x pounds?","Кролик: 25 кал/фунт + 11 дополнительно. Уравнение для c калорий, x фунтов?"), options:["c=25x","c=36x","c=11x+25","c=25x+11"], correctIndex:3,
    correctAnswerLabel:E("D) c=25x+11","D) c=25x+11"), sourcePage:43,
    standard:{title:E("Standard: slope+intercept","Стандартно: наклон+отрезок"),steps:[{title:E("Per-lb coefficient 25, constant 11","Коэффициент 25, константа 11"),detail:E("c = 25x + 11.","c = 25x + 11.")}]},
    desmos:{title:E("Desmos: check","Desmos: проверка"),steps:[{title:E("Enter c(x)=25x+11","Введи c(x)=25x+11"),detail:E("c(1)=36=25+11 ✓.","c(1)=36 ✓."),expressions:["c(x)=25x+11"]}]},
    pitfalls:[E("Swapping: 11x+25.","Менять местами: 11x+25.")], desmosExpressions:["c(x)=25x+11"] }),
  q({ id:"t5-math-m2-q8", test:5, section:"math", module:2, number:8, domainId:"heart", domainLabel:"Line Equation", difficulty:"easy",
    prompt: E("Line r: slope 4 through (0,6). Equation?","Прямая r: наклон 4 через (0,6). Уравнение?"), options:["y=−6x+4","y=6x+4","y=4x−6","y=4x+6"], correctIndex:3,
    correctAnswerLabel:E("D) y=4x+6","D) y=4x+6"), sourcePage:43,
    standard:{title:E("Standard: y=mx+b","Стандартно: y=mx+b"),steps:[{title:E("b=6 (y-intercept)","b=6 (отрезок y)"),detail:E("y=4x+6.","y=4x+6.")}]},
    desmos:{title:E("Desmos: slope-intercept","Desmos: наклон-отрезок"),steps:[{title:E("Enter y=4x+6","Введи y=4x+6"),detail:E("Passes through (0,6) ✓.","Проходит через (0,6) ✓."),expressions:["y=4x+6"]}]},
    pitfalls:[E("Sign flip on intercept.","Перепутать знак отрезка.")], desmosExpressions:["y=4x+6"] }),
  q({ id:"t5-math-m2-q12", test:5, section:"math", module:2, number:12, domainId:"psda", domainLabel:"Probability Complement", difficulty:"medium",
    prompt: E("350 customers. P(A)=0.48, P(B)=0.24. How many in C?","350 клиентов. P(A)=0.48, P(B)=0.24. Сколько в C?"), options:["28","40","84","98"], correctIndex:3,
    correctAnswerLabel:E("D) 98 — (1−0.48−0.24)*350 = 0.28*350 = 98","D) 98 — 0.28*350 = 98"), sourcePage:44,
    standard:{title:E("Standard: complement","Стандартно: дополнение"),steps:[{title:E("P(C)=1−0.72=0.28","P(C)=0.28"),detail:E("0.28*350 = 98.","0.28*350 = 98.")}]},
    desmos:{title:E("Desmos: compute","Desmos: вычислить"),steps:[{title:E("Enter (1−0.48−0.24)*350","Введи (1−0.48−0.24)*350"),detail:E("Desmos gives 98.","Desmos даст 98."),expressions:["(1-0.48-0.24)*350"]}]},
    pitfalls:[E("Forgetting to subtract from 1 (answering 0.72*350=252).","Забыть вычесть из 1.")], desmosExpressions:["(1-0.48-0.24)*350"] }),
  q({ id:"t5-math-m2-q14", test:5, section:"math", module:2, number:14, domainId:"geometry", domainLabel:"Volume (SPR)", difficulty:"medium",
    prompt: E("Cylinder diameter 22 cm, height 6 cm. Volume? (SPR)","Цилиндр: диаметр 22 см, высота 6 см. Объём? (SPR)"), answerText:"726π", correctAnswerLabel:E("726π — r=11, π*121*6=726π","726π — r=11, π*121*6=726π"), sourcePage:45,
    standard:{title:E("Standard: V=πr²h","Стандартно: V=πr²h"),steps:[{title:E("r=11, V=π*121*6","r=11, V=π*726"),detail:E("726π cm³.","726π см³.")}]},
    desmos:{title:E("Desmos: compute","Desmos: вычислить"),steps:[{title:E("Enter pi*11^2*6","Введи pi*11^2*6"),detail:E("Desmos shows 726π (as coefficient).","Desmos покажет 726π."),expressions:["pi*11^2*6"]}]},
    pitfalls:[E("Using diameter as radius (264π*4).","Использовать диаметр как радиус.")], desmosExpressions:["pi*11^2*6"] }),
  q({ id:"t5-math-m2-q17", test:5, section:"math", module:2, number:17, domainId:"passport", domainLabel:"Polynomial Subtraction", difficulty:"medium",
    prompt: E("Which is equivalent to (8x³+8)−(x³−2)?","Что эквивалентно (8x³+8)−(x³−2)?"), options:["8x³+6","7x³+10","8x³+10","7x³+6"], correctIndex:1,
    correctAnswerLabel:E("B) 7x³+10 — 8x³−x³=7x³, 8−(−2)=10","B) 7x³+10"), sourcePage:46,
    standard:{title:E("Standard: distribute minus","Стандартно: минус с распределением"),steps:[{title:E("−(x³−2)=−x³+2","−(x³−2)=−x³+2"),detail:E("Sum: 7x³+10.","Итог: 7x³+10.")}]},
    desmos:{title:E("Desmos: identity check","Desmos: проверка"),steps:[{title:E("Enter both sides","Введи обе части"),detail:E("Overlap confirms.","Совпадение подтверждает."),expressions:["y=(8x^3+8)-(x^3-2)","y=7x^3+10"]}]},
    pitfalls:[E("Sign error: 8−2=6.","Ошибка знака: 8−2=6.")], desmosExpressions:["y=(8x^3+8)-(x^3-2)","y=7x^3+10"] }),
  q({ id:"t5-math-m2-q18", test:5, section:"math", module:2, number:18, domainId:"passport", domainLabel:"Exponents", difficulty:"easy",
    prompt: E("If 4^(x/2) = 16, what is 6x?","Если 4^(x/2) = 16, то чему равно 6x?"), options:["24","48","72","96"], correctIndex:0,
    correctAnswerLabel:E("A) 24 — 4^(x/2) = 4² → x/2 = 2 → x = 4 → 6x = 24","A) 24 — 4^(x/2) = 4² → x/2 = 2 → x = 4 → 6x = 24"), sourcePage:46,
    standard:{title:E("Standard: same base","Стандартно: одно основание"),steps:[{title:E("Rewrite 16 as 4²","Перепиши 16 как 4²"),detail:E("4^(x/2) = 4² → x/2 = 2 → x = 4. Then 6x = 6 · 4 = 24.","4^(x/2) = 4² → x/2 = 2 → x = 4. Тогда 6x = 6 · 4 = 24.")}]},
    desmos:{title:E("Desmos: solve","Desmos: решить"),steps:[{title:E("Enter y=4^(x/2), y=16","Введи y=4^(x/2), y=16"),detail:E("The intersection is x = 4, so 6x = 24.","Пересечение при x = 4, значит 6x = 24."),expressions:["y=4^(x/2)","y=16"]}]},
    pitfalls:[E("Forgetting that 16 = 4² and guessing from the options.","Забыть, что 16 = 4², и угадывать по вариантам.")], desmosExpressions:["y=4^(x/2)","y=16"] }),
];
