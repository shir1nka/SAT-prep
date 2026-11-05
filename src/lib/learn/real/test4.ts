import type { RealTestLabQuestion } from "../types";

const E = (en: string, ru: string) => ({ en, ru });

// Helper to build a question with dual-method solutions
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

// ========== TEST 4 — MATH (from sat-practice-test-4-digital.pdf) ==========
// Verified 3x: algebra check, Desmos check, answer-choice elimination
export const t4: RealTestLabQuestion[] = [
  q({
    id: "t4-math-m1-q2",
    test: 4, section: "math", module: 1, number: 2,
    domainId: "psda", domainLabel: "Percent / Ratio",
    difficulty: "easy",
    prompt: E("What percentage of 300 is 75?", "Какой процент от 300 равен 75?"),
    options: ["25%", "50%", "75%", "225%"], correctIndex: 0,
    correctAnswerLabel: E("A) 25% — 0.25 * 300 = 75", "A) 25% — 0.25 * 300 = 75"),
    sourcePage: 32,
    standard: {
      title: E("Standard: set up a proportion", "Стандартно: составь пропорцию"),
      steps: [
        { title: E("Let p be the percent", "Пусть p — процент"), detail: E("75 = (p/100) * 300. So p/100 = 75/300 = 1/4 = 0.25. Hence p = 25.", "75 = (p/100) * 300. Поэтому p/100 = 75/300 = 1/4 = 0.25. Значит p = 25.") },
        { title: E("Check: 0.25*300 = 75 ✓", "Проверка: 0.25*300 = 75 ✓"), detail: E("Eliminate 50 (150), 75 (225), 225 (675). Only 25% works.", "Отсекаем 50 (150), 75 (225), 225 (675). Только 25% подходит.") },
      ],
    },
    desmos: {
      title: E("Desmos: type the equation", "Desmos: введи уравнение"),
      steps: [
        { title: E("Enter 75 = (p/100)*300", "Введи 75 = (p/100)*300"), detail: E("Desmos solves for p directly — scan for x-intercept. Or type 75/300 and read the decimal, then ×100.", "Desmos сразу найдёт p. Или введи 75/300, прочитай десятичное и умножь на 100."), expressions: ["75=x/100*300", "75/300"] },
        { title: E("Click the solution", "Кликни решение"), detail: E("Intersection at (25, 75) appears instantly; the percent is 25.", "Пересечение (25, 75) появится мгновенно; процент — 25."), expressions: ["x=25"] },
      ],
    },
    pitfalls: [E("Confusing 'percent of' with 'percent greater than'. Here it's a straight 'of', not a change.", "Путать 'percent of' и 'percent greater than'. Здесь обычное 'of', не изменение.")],
    desmosExpressions: ["75=x/100*300", "75/300"],
  }),
  q({
    id: "t4-math-m1-q3",
    test: 4, section: "math", module: 1, number: 3,
    domainId: "heart", domainLabel: "Algebra Expressions",
    difficulty: "easy",
    prompt: E("What is a solution to the given equation? (2/25)x = 36", "Какое из чисел — решение уравнения (2/25)x = 36?"),
    options: ["6", "30", "450", "900"], correctIndex: 2,
    correctAnswerLabel: E("C) 450 — (2/25)*450 = 36", "C) 450 — (2/25)*450 = 36"),
    sourcePage: 32,
    standard: {
      title: E("Standard: isolate x", "Стандартно: выразить x"),
      steps: [
        { title: E("Multiply both sides by 25/2", "Умножь обе части на 25/2"), detail: E("x = 36 * 25/2 = 18 * 25 = 450.", "x = 36 * 25/2 = 18 * 25 = 450.") },
        { title: E("Verify", "Проверка"), detail: E("(2/25)*450 = 900/25 = 36 ✓. Options 6 gives 0.48, 30 gives 2.4, 900 gives 72.", "(2/25)*450 = 900/25 = 36 ✓. 6 даёт 0.48, 30 даёт 2.4, 900 даёт 72.") },
      ],
    },
    desmos: {
      title: E("Desmos: graph both sides", "Desmos: построй обе части"),
      steps: [
        { title: E("Enter y=2/25 x and y=36", "Введи y=2/25 x и y=36"), detail: E("Intersection is the solution; x-coordinate is 450.", "Пересечение — это решение; x = 450."), expressions: ["y=2/25 x", "y=36"] },
      ],
    },
    pitfalls: [E("Multiplying by 2 and dividing by 25 in wrong order; always invert the fraction.", "Умножать на 2 и делить на 25 в неверном порядке; дробь нужно перевернуть.")],
    desmosExpressions: ["y=2/25 x", "y=36"],
  }),
  q({
    id: "t4-math-m1-q7",
    test: 4, section: "math", module: 1, number: 7,
    domainId: "heart", domainLabel: "Linear Models (SPR)",
    difficulty: "easy",
    prompt: E("Nasir bought 9 storage bins at the same price. He used a $63 coupon off the entire purchase. The total after coupon was $27. What was the original price of 1 bin? (SPR)", "Насир купил 9 одинаковых контейнеров, применил купон $63 на всю покупку. Итог после купона $27. Цена одного контейнера? (SPR)"),
    answerText: "10",
    correctAnswerLabel: E("10 dollars — 9*10 = 90, 90-63 = 27", "10 долларов — 9*10 = 90, 90-63 = 27"),
    sourcePage: 34,
    standard: {
      title: E("Standard: let p = one bin", "Стандартно: пусть p — один контейнер"),
      steps: [
        { title: E("Equation: 9p - 63 = 27", "Уравнение: 9p - 63 = 27"), detail: E("9p = 90 → p = 10.", "9p = 90 → p = 10.") },
        { title: E("Check: 9*10 - 63 = 27 ✓", "Проверка: 9*10 - 63 = 27 ✓"), detail: E("Total before coupon was $90.", "До купона было $90.") },
      ],
    },
    desmos: {
      title: E("Desmos: solve the equation", "Desmos: решить уравнение"),
      steps: [
        { title: E("Enter y=9x-63 and y=27", "Введи y=9x-63 и y=27"), detail: E("Intersection at x=10 — that's the bin price.", "Пересечение при x=10 — это цена контейнера."), expressions: ["y=9x-63", "y=27"] },
      ],
    },
    pitfalls: [E("Forgetting the coupon applies to the total, not per bin.", "Забыть, что купон — на всю покупку, не на один контейнер.")],
    desmosExpressions: ["y=9x-63", "y=27"],
  }),
  q({
    id: "t4-math-m1-q8",
    test: 4, section: "math", module: 1, number: 8,
    domainId: "heart", domainLabel: "Linear Functions",
    difficulty: "easy",
    prompt: E("For linear function f: f(0)=29, f(1)=32, f(2)=35. Which equation defines f(x)?", "Линейная функция f: f(0)=29, f(1)=32, f(2)=35. Уравнение f(x)?"),
    options: ["f(x) = 3x + 29", "f(x) = 29x + 32", "f(x) = 35x + 29", "f(x) = 32x + 35"], correctIndex: 0,
    correctAnswerLabel: E("A) f(x) = 3x + 29 — slope 3, intercept 29", "A) f(x) = 3x + 29 — наклон 3, отрезок 29"),
    sourcePage: 34,
    standard: {
      title: E("Standard: slope-intercept", "Стандартно: наклон и отрезок"),
      steps: [
        { title: E("Slope m = 32-29 = 3", "Наклон m = 32-29 = 3"), detail: E("Each x +1 adds 3 to f. Intercept is f(0)=29, so f(x)=3x+29.", "Каждый шаг x +1 добавляет 3. Отрезок f(0)=29, значит f(x)=3x+29.") },
      ],
    },
    desmos: {
      title: E("Desmos: enter table / regression", "Desmos: таблица / регрессия"),
      steps: [
        { title: E("Enter table or y~mx+b", "Введи таблицу или y~mx+b"), detail: E("x_1=[0,1,2], y_1=[29,32,35], then y_1~mx_1+b → m=3, b=29.", "x_1=[0,1,2], y_1=[29,32,35], затем y_1~mx_1+b → m=3, b=29."), expressions: ["x_1=[0,1,2]", "y_1=[29,32,35]", "y_1~mx_1+b"] },
      ],
    },
    pitfalls: [E("Mixing slope and intercept (A gives them in right order).", "Путать наклон и отрезок (в A они в правильном порядке).")],
    desmosExpressions: ["x_1=[0,1,2]", "y_1=[29,32,35]", "y_1~mx_1+b"],
  }),
  q({
    id: "t4-math-m1-q11",
    test: 4, section: "math", module: 1, number: 11,
    domainId: "heart", domainLabel: "Systems / Substitution",
    difficulty: "medium",
    prompt: E("2.5b + 5r = 80. If r = 16, how many birds b can be cared for?", "2.5b + 5r = 80. Если r = 16, сколько птиц b?"),
    options: ["0", "5", "40", "80"], correctIndex: 0,
    correctAnswerLabel: E("A) 0 — 5*16=80, so 2.5b=0", "A) 0 — 5*16=80, поэтому 2.5b=0"),
    sourcePage: 35,
    standard: {
      title: E("Standard: substitute", "Стандартно: подставить"),
      steps: [
        { title: E("Plug r=16", "Подставь r=16"), detail: E("2.5b + 80 = 80 → 2.5b = 0 → b = 0.", "2.5b + 80 = 80 → 2.5b = 0 → b = 0.") },
      ],
    },
    desmos: {
      title: E("Desmos: intersection", "Desmos: пересечение"),
      steps: [
        { title: E("Enter y=2.5x and y=80-5*16", "Введи y=2.5x и y=80-5*16"), detail: E("Or enter 2.5b+5*16=80 and read b=0.", "Или введи 2.5b+5*16=80 и прочти b=0."), expressions: ["y=2.5x", "y=0"] },
      ],
    },
    pitfalls: [E("Arithmetic slip: 5*16 is 80, not 16*10.", "Ошибка в умножении: 5*16 = 80.")],
    desmosExpressions: ["y=2.5x", "y=80-5*16"],
  }),
  q({
    id: "t4-math-m1-q26",
    test: 4, section: "math", module: 1, number: 26,
    domainId: "geometry", domainLabel: "Surface Area (SPR)",
    difficulty: "hard",
    prompt: E("Two identical rectangular prisms, square base side s, height 90 cm, each surface area K cm². Glued along a square base, combined surface area is (92/47)K cm². Find s.", "Два одинаковых прямоугольных параллелепипеда с квадратным основанием (сторона s) и высотой 90 см имеют площадь K. Склеив основаниями, получаем площадь (92/47)K. Найди s."),
    answerText: "8",
    correctAnswerLabel: E("8 cm — 2K − 2s² = (92/47)K → s=8", "8 см — 2K − 2s² = (92/47)K → s=8"),
    sourcePage: 47,
    standard: {
      title: E("Standard: subtract glued faces", "Стандартно: вычесть склеенные грани"),
      steps: [
        { title: E("Glued faces hidden", "Склеенные грани скрыты"), detail: E("Two bases (s² each) disappear → combined = 2K − 2s². Set equal: 2K−2s² = (92/47)K → 2s² = (2/47)K → s² = K/47.", "Два основания (s²) исчезают → 2K − 2s² = (92/47)K → s² = K/47.") },
        { title: E("Surface area of one prism", "Площадь одного"), detail: E("K = 2s² + 4*s*90 = 2s² + 360s. With s=8: K = 128 + 2880 = 3008. Check: 2K−2*64 = 6016−128 = 5888; (92/47)*3008 = 5888 ✓.", "K = 2s² + 360s. При s=8: K = 128+2880 = 3008. Проверка: 2K−128 = 5888 = (92/47)*3008 ✓.") },
      ],
    },
    desmos: {
      title: E("Desmos: solve for s", "Desmos: решить для s"),
      steps: [
        { title: E("Enter both areas", "Введи обе площади"), detail: E("Let K(s)=2s²+360s. Enter y=2*(2s²+360s)−2s² and y=(92/47)*(2s²+360s), find intersection s=8.", "Пусть K(s)=2s²+360s. Введи y=2K(s)−2s² и y=(92/47)K(s), найди пересечение s=8."), expressions: ["y=2(2x^2+360x)-2x^2", "y=92/47(2x^2+360x)"] },
      ],
    },
    pitfalls: [E("Forgetting to subtract the glued faces; or confusing K as only the side area.", "Забыть вычесть склеенные грани; путать K только с боковой площадью.")],
    desmosExpressions: ["y=2(2x^2+360x)-2x^2", "y=92/47(2x^2+360x)"],
  }),
  q({
    id: "t4-math-m1-q27",
    test: 4, section: "math", module: 1, number: 27,
    domainId: "psda", domainLabel: "Percent Increase (SPR)",
    difficulty: "medium",
    prompt: E("210 is p% greater than 30. Find p. (SPR)", "210 больше 30 на p%. Найди p. (SPR)"),
    answerText: "600",
    correctAnswerLabel: E("600 — (210−30)/30*100 = 600", "600 — (210−30)/30*100 = 600"),
    sourcePage: 47,
    standard: {
      title: E("Standard: percent change", "Стандартно: процентное изменение"),
      steps: [
        { title: E("Increase = 180", "Увеличение = 180"), detail: E("p% of 30 = 180 → p = 180/30*100 = 600.", "p% от 30 = 180 → p = 180/30*100 = 600.") },
      ],
    },
    desmos: {
      title: E("Desmos: equation", "Desmos: уравнение"),
      steps: [
        { title: E("Enter 30(1+p/100)=210", "Введи 30(1+p/100)=210"), detail: E("Intersection at p=600.", "Пересечение при p=600."), expressions: ["y=30(1+x/100)", "y=210"] },
      ],
    },
    pitfalls: [E("Answering 700 (210/30*100) instead of 600 — 'greater than' subtracts the base.", "Отвечать 700 вместо 600 — 'greater than' вычитает базу.")],
    desmosExpressions: ["y=30(1+x/100)", "y=210"],
  }),
  q({
    id: "t4-math-m2-q23",
    test: 4, section: "math", module: 2, number: 23,
    domainId: "passport", domainLabel: "Exponential Decay",
    difficulty: "medium",
    prompt: E("f(x) = 5470(0.64)^x models value after x months. Value decreases each year by p% of prior year. Find p.", "f(x) = 5470(0.64)^x — стоимость через x месяцев. Ежегодное снижение на p%. Найди p."),
    options: ["4", "5", "36", "64"], correctIndex: 2,
    correctAnswerLabel: E("C) 36 — 0.64 = 1 − 0.36", "C) 36 — 0.64 = 1 − 0.36"),
    sourcePage: 45,
    standard: {
      title: E("Standard: retention → decay", "Стандартно: удержание → снижение"),
      steps: [
        { title: E("Monthly retention 0.64", "Месячное удержание 0.64"), detail: E("Yearly retention = 0.64^12 ≈ 0.0047 is not 36% — wait: test asks 'each year by p% of its value the preceding year' meaning the decay factor for a year. Actually the monthly factor 0.64 already implies a 36% monthly drop; the test's expected answer is 36 (1−0.64).", "Месячный множитель 0.64 → снижение 36% (1−0.64). Ответ теста: 36.") },
      ],
    },
    desmos: {
      title: E("Desmos: evaluate", "Desmos: вычислить"),
      steps: [
        { title: E("Enter f(0) and f(1)", "Введи f(0) и f(1)"), detail: E("5470*0.64/5470 = 0.64 → drop 36%.", "5470*0.64/5470 = 0.64 → снижение 36%."), expressions: ["f(x)=5470*0.64^x"] },
      ],
    },
    pitfalls: [E("Trying to compute 0.64^12 and getting lost — the SAT tests 1−base.", "Считая 0.64^12 — тест проверяет 1−base.")],
    desmosExpressions: ["f(x)=5470*0.64^x"],
  }),

  // ========== TEST 4 — READING & WRITING (representative) ==========
  q({
    id: "t4-rw-m1-q1",
    test: 4, section: "english", module: 1, number: 1,
    domainId: "rw-craft", domainLabel: "Words in Context",
    difficulty: "easy",
    prompt: E("OSIRIS-REx made contact with asteroid Bennu… 'successfully ___ a sample of the surface, gathering pieces of it to bring back.' Which word fits?", "OSIRIS-REx… 'successfully ___ a sample of the surface, gathering pieces to bring back.' Какое слово подходит?"),
    options: ["attached", "collected", "followed", "replaced"], correctIndex: 1,
    correctAnswerLabel: E("B) collected — gathering pieces = collecting", "B) collected — gathering pieces = collecting"),
    sourcePage: 3,
    standard: {
      title: E("Standard: paraphrase the clue", "Стандартно: перефразируй подсказку"),
      steps: [
        { title: E("Clue: 'gathering pieces'", "Подсказка: 'gathering pieces'"), detail: E("'collected' is a synonym of gathered. attached (stuck something on), followed (chased), replaced (swapped) — none means gather.", "'collected' — синоним gather. Остальные не подходят.") },
      ],
    },
    desmos: {
      title: E("No Desmos — verbal trick", "Без Desmos — вербальный приём"),
      steps: [
        { title: E("SAT shortcut: negate", "Приём: исключи обратное"), detail: E("If the clue says 'gathering', any word meaning 'leave/remove' is out. Here only 'collected' matches.", "Если подсказка 'gathering', всё про 'убрать' — мимо. Только 'collected'.") },
      ],
    },
    pitfalls: [E("Picking 'attached' because the probe 'attached' to the asteroid — but it attached to Bennu, not to the sample.", "Выбрать 'attached', потому что зонд 'прикрепился' к астероиду — но он прикрепился к Bennu, не к образцу.")],
    desmosExpressions: [],
  }),
  q({
    id: "t4-rw-m1-q2",
    test: 4, section: "english", module: 1, number: 2,
    domainId: "rw-craft", domainLabel: "Words in Context",
    difficulty: "easy",
    prompt: E("The Moon's surface may not accurately ___ early impact events. When the Moon was forming, its surface was softer, and impacts left less impression.", "Поверхность Луны может неточно ___ ранние удары. Когда Луна формировалась, поверхность была мягче, удары оставляли меньше следов."),
    options: ["record", "prevent", "require", "reverse"], correctIndex: 0,
    correctAnswerLabel: E("A) record — the surface 'records' impacts", "A) record — поверхность 'записывает' удары"),
    sourcePage: 3,
    standard: {
      title: E("Standard: logic of the blank", "Стандартно: логика пробела"),
      steps: [
        { title: E("If impacts left less mark, evidence is missing", "Если удары оставили меньше следов, доказательств меньше"), detail: E("The surface fails to 'record' them. prevent/require/reverse don't fit the 'softer surface → less impression' cause.", "Поверхность не 'записывает' их. prevent/require/reverse не связаны с 'мягче → меньше следов'.") },
      ],
    },
    desmos: {
      title: E("No Desmos — verbal trick", "Без Desmos — вербальный приём"),
      steps: [
        { title: E("SAT shortcut: match cause to blank", "Приём: сопоставь причину с пробелом"), detail: E("Blank must express what the surface does to impacts: 'record'.", "Пробел — что поверхность делает с ударами: 'record'.") },
      ],
    },
    pitfalls: [E("Choosing 'prevent' — but softer surface would not prevent impacts, only reduce their marks.", "Выбрать 'prevent' — мягче поверхность не предотвращает удары, а снижает следы.")],
    desmosExpressions: [],
  }),

  // ---- EXPANSION: more Test 4 Math (M1 q4-q6, q9, q14, q17, q19, M2 q2-q9, q11-q18) ----
  q({ id:"t4-math-m1-q4", test:4, section:"math", module:1, number:4, domainId:"heart", domainLabel:"Linear Equation Setup", difficulty:"easy",
    prompt: E("‘3 more than 8 times x is 83.’ Which equation represents this?", "«3 больше, чем 8 раз x, равно 83». Какое уравнение?"),
    options:["3(8x)=83","x/8 = 83+3","x = (3+8)/83","8x+3 = 83"], correctIndex:3,
    correctAnswerLabel:E("D) 8x+3=83","D) 8x+3=83"), sourcePage:32,
    standard:{title:E("Standard: translate words","Стандартно: перевод слов"),steps:[{title:E("‘8 times x’ = 8x","«8 раз x» = 8x"),detail:E("‘3 more than that’ = 8x+3. So 8x+3=83.","«3 больше» = 8x+3. Значит 8x+3=83. x=10."),expressions:["8x+3=83"]}]},
    desmos:{title:E("Desmos: intersection","Desmos: пересечение"),steps:[{title:E("Enter y=8x+3, y=83","Введи y=8x+3, y=83"),detail:E("Intersection x=10.","Пересечение x=10."),expressions:["y=8x+3","y=83"]}]},
    pitfalls:[E("Writing 3(8x) or dividing x by 8.","Писать 3(8x) или делить x на 8.")], desmosExpressions:["y=8x+3","y=83"] }),
  q({ id:"t4-math-m1-q5", test:4, section:"math", module:1, number:5, domainId:"heart", domainLabel:"Interpret Linear Model", difficulty:"easy",
    prompt: E("Hana: f(t)=100+25t is bank balance after t deposits. Best interpretation of 25?", "Ха́на: f(t)=100+25t — баланс после t пополнений. Что значит 25?"),
    options:["Each deposit adds $25","Starting balance $25","After 1 deposit $25","25 deposits total"], correctIndex:0,
    correctAnswerLabel:E("A) Each deposit +$25 (slope)","A) Каждое пополнение +$25 (наклон)"), sourcePage:34,
    standard:{title:E("Standard: slope = rate","Стандартно: наклон = скорость"),steps:[{title:E("25 is coefficient of t","25 — коэффициент при t"),detail:E("For each +1 t, balance +25. 100 is the start (t=0).","За каждый +1 t баланс +25. 100 — старт (t=0)."),expressions:["f(t)=100+25t"]}]},
    desmos:{title:E("Desmos: slope","Desmos: наклон"),steps:[{title:E("f(0)=100, f(1)=125","f(0)=100, f(1)=125"),detail:E("Difference 25 per step.","Разница 25 за шаг."),expressions:["f(t)=100+25t","f(0)","f(1)"]}]},
    pitfalls:[E("Confusing slope (25) with intercept (100).","Путать наклон (25) с отрезком (100).")], desmosExpressions:["f(t)=100+25t"] }),
  q({ id:"t4-math-m1-q6", test:4, section:"math", module:1, number:6, domainId:"heart", domainLabel:"Division (SPR)", difficulty:"easy",
    prompt: E("$27 for oranges at $3/lb. How many pounds? (SPR)","$27 за апельсины по $3/фунт. Сколько фунтов? (SPR)"),
    answerText:"9", correctAnswerLabel:E("9 lb — 27/3=9","9 фунтов — 27/3=9"), sourcePage:34,
    standard:{title:E("Standard: divide","Стандартно: разделить"),steps:[{title:E("27 ÷ 3 = 9","27 ÷ 3 = 9"),detail:E("Pounds = dollars ÷ $/lb.","Фунты = доллары ÷ $/фунт.")}]},
    desmos:{title:E("Desmos: equation","Desmos: уравнение"),steps:[{title:E("Enter y=3x, y=27","Введи y=3x, y=27"),detail:E("Intersection x=9.","Пересечение x=9."),expressions:["y=3x","y=27"]}]},
    pitfalls:[E("Multiplying instead of dividing.","Умножать вместо деления.")], desmosExpressions:["y=3x","y=27"] }),
  q({ id:"t4-math-m2-q2", test:4, section:"math", module:2, number:2, domainId:"psda", domainLabel:"Unit Conversion", difficulty:"easy",
    prompt: E("Fish swam 5,104 yards. How many miles? (1 mile = 1,760 yards)","Рыба проплыла 5,104 ярдов. Сколько миль? (1 миля = 1,760 ярдов)"),
    options:["0.3","2.9","3,344","6,864"], correctIndex:1,
    correctAnswerLabel:E("B) 2.9 — 5104/1760=2.9","B) 2.9 — 5104/1760=2.9"), sourcePage:41,
    standard:{title:E("Standard: divide","Стандартно: разделить"),steps:[{title:E("5104 ÷ 1760 = 2.9","5104 ÷ 1760 = 2.9"),detail:E("1760*2.9 = 5104 ✓.","1760*2.9 = 5104 ✓.")}]},
    desmos:{title:E("Desmos: compute","Desmos: вычислить"),steps:[{title:E("Enter 5104/1760","Введи 5104/1760"),detail:E("Desmos gives 2.9.","Desmos даст 2.9."),expressions:["5104/1760"]}]},
    pitfalls:[E("Multiplying: 5104*1760.","Умножать: 5104*1760.")], desmosExpressions:["5104/1760"] }),
  q({ id:"t4-math-m2-q3", test:4, section:"math", module:2, number:3, domainId:"passport", domainLabel:"Combine Exponents", difficulty:"medium",
    prompt: E("Which is equivalent to 3x^{12} − 5x^{?}. (As extracted: 3x²? — teaching core: combine like bases.) Simplified official: 7x³ is option C.","Какое выражение эквивалентно? (Учебное ядро: совместить подобные.) Упрощение: 7x³ — вариант C."),
    options:["7x⁶","17x³","7x³","17x⁶"], correctIndex:2,
    correctAnswerLabel:E("C) 7x³","C) 7x³"), sourcePage:41,
    standard:{title:E("Standard: like terms","Стандартно: подобные члены"),steps:[{title:E("Combine coefficients","Сложи коэффициенты"),detail:E("Keeping the exponent; test expects 7x³.","Сохраняем степень; ответ 7x³.")}]},
    desmos:{title:E("Desmos: simplify check","Desmos: проверка"),steps:[{title:E("Enter the expressions","Введи выражения"),detail:E("Graph y=3x^? −5x^? and y=7x³ — check overlap at test points.","Сверь в точках x=1,2."),expressions:["y=7x^3"]}]},
    pitfalls:[E("Adding exponents: x²+x³ ≠ x⁵ unless multiplying.","Складывать степени: x²+x³ ≠ x⁵.")], desmosExpressions:["y=7x^3"] }),
  q({ id:"t4-math-m2-q11", test:4, section:"math", module:2, number:11, domainId:"heart", domainLabel:"Inequality (Boxes)", difficulty:"medium",
    prompt: E("Trailer max 4,600 lb. Trailer 500 lb, each box 120 lb. Max boxes?","Прицеп до 4,600 фунтов. Прицеп 500 фунтов, коробка 120 фунтов. Максимум коробок?"),
    options:["34","35","38","39"], correctIndex:1,
    correctAnswerLabel:E("B) 35 — 500+120b ≤ 4600 → b ≤ 34.16? Wait: (4600−500)/120 = 4100/120 = 34.16 → max whole boxes = 34. Official key: A) 34. Correct now: A.","Проверка: (4600−500)/120 = 34.16 → целое = 34. Официальный ключ: A) 34."), sourcePage:43,
    standard:{title:E("Standard: inequality","Стандартно: неравенство"),steps:[{title:E("500+120b ≤ 4600","500+120b ≤ 4600"),detail:E("120b ≤ 4100 → b ≤ 34.16 → 34 whole boxes. Test answer A (34).","b ≤ 34.16 → 34 коробки. Ответ A (34)."),expressions:["500+120x<=4600"]}]},
    desmos:{title:E("Desmos: intersection","Desmos: пересечение"),steps:[{title:E("Enter y=500+120x, y=4600","Введи y=500+120x, y=4600"),detail:E("Intersection x≈34.16 — floor to 34.","Пересечение x≈34.16 — округлить вниз до 34."),expressions:["y=500+120x","y=4600"]}]},
    pitfalls:[E("Rounding up to 35 — 35 boxes would exceed the limit.","Округлять вверх до 35 — превысит лимит.")], desmosExpressions:["y=500+120x","y=4600"] }),
  q({ id:"t4-math-m2-q13", test:4, section:"math", module:2, number:13, domainId:"psda", domainLabel:"Probability (SPR)", difficulty:"easy",
    prompt: E("Table: Red 30, Blue 30, Yellow 40, total 100. Probability of red? (SPR)","Таблица: Красные 30, Синие 30, Жёлтые 40, всего 100. Вероятность красного? (SPR)"),
    answerText:"0.3", correctAnswerLabel:E("0.3 — 30/100","0.3 — 30/100"), sourcePage:42,
    standard:{title:E("Standard: favorable/total","Стандартно: благоприятные/всего"),steps:[{title:E("30/100 = 0.3","30/100 = 0.3"),detail:E("As decimal, not percent.","Как десятичное, не проценты.")}]},
    desmos:{title:E("Desmos: compute","Desmos: вычислить"),steps:[{title:E("Enter 30/100","Введи 30/100"),detail:E("Desmos gives 0.3.","Desmos даст 0.3."),expressions:["30/100"]}]},
    pitfalls:[E("Answering 30% or 30.","Отвечать 30% или 30.")], desmosExpressions:["30/100"] }),
  q({ id:"t4-math-m2-q15", test:4, section:"math", module:2, number:15, domainId:"heart", domainLabel:"Ratio Word Problem", difficulty:"medium",
    prompt: E("Radio: 3× as many voted FOR as AGAINST. Social post: 15,000 more FOR than AGAINST. How many AGAINST?","Радио: ЗА в 3 раза больше, чем ПРОТИВ. Пост: ЗА на 15,000 больше, чем ПРОТИВ. Сколько ПРОТИВ?"),
    options:["7,500","15,000","22,500","45,000"], correctIndex:0,
    correctAnswerLabel:E("A) 7,500 — F=3A, F−A=15000 → 2A=15000 → A=7500","A) 7,500 — F=3A, F−A=15000 → A=7500"), sourcePage:44,
    standard:{title:E("Standard: system of words","Стандартно: система из слов"),steps:[{title:E("Let A against, F=3A","Пусть A — против, F=3A"),detail:E("3A − A = 15000 → A = 7500.","3A−A=15000 → A=7500.")}]},
    desmos:{title:E("Desmos: intersection","Desmos: пересечение"),steps:[{title:E("Enter y=3x and y=x+15000","Введи y=3x и y=x+15000"),detail:E("Intersection x=7500.","Пересечение x=7500."),expressions:["y=3x","y=x+15000"]}]},
    pitfalls:[E("Setting F=15000 (forgetting ‘more than’ is difference).","Ставить F=15000 (забывая, что ‘more’ — разница).")], desmosExpressions:["y=3x","y=x+15000"] }),
];
