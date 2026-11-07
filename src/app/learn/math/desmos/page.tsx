"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Check,
  Clock3,
  Copy,
  Gauge,
  Keyboard,
  Lightbulb,
  Sparkles,
  Target,
  TriangleAlert,
  Zap,
} from "lucide-react";

import { DesmosProvider, OpenInDesmos } from "@/components/learn/Desmos";
import { XpBar } from "@/components/learn/XpBar";
import MathText from "@/components/MathText";
import SiteHeader from "@/components/SiteHeader";
import { useLanguage } from "@/lib/language-context";
import { recordQuiz, useLearnProgress } from "@/lib/learn/progress";
import { text, type LocalizedText } from "@/lib/learn/types";
import { cn } from "@/lib/utils";

type Recipe = {
  id: string;
  title: LocalizedText;
  goal: LocalizedText;
  when: LocalizedText;
  steps: Array<{ title: LocalizedText; expressions: string[]; note?: LocalizedText }>;
  speed: LocalizedText;
  caution: LocalizedText;
};

const RECIPES: Recipe[] = [
  {
    id: "both-sides",
    title: text("Solve an equation by graphing both sides", "Реши уравнение, построив обе части"),
    goal: text(
      "Any equation with one variable becomes an intersection of two graphs. The x-coordinate of the intersection is the solution.",
      "Любое уравнение с одной переменной превращается в пересечение двух графиков. X-координата точки пересечения — это ответ."
    ),
    when: text(
      "Use it when isolating x algebraically is slow: fractions, radicals, exponents, absolute values.",
      "Когда выразить x алгебраически долго: дроби, корни, степени, модули."
    ),
    steps: [
      {
        title: text("Type the left side as y = …", "Введи левую часть как y = …"),
        expressions: ["y=3x-5"],
        note: text("Do not simplify. Type exactly what the problem gives you.", "Не упрощай. Вводи ровно то, что дано в задаче."),
      },
      {
        title: text("Type the right side as a second y = …", "Введи правую часть вторым y = …"),
        expressions: ["y=x^2-7"],
        note: text("Two graphs, two equations. Desmos draws both instantly.", "Два графика, два уравнения. Desmos рисует оба сразу."),
      },
      {
        title: text("Click the intersection point", "Нажми на точку пересечения"),
        expressions: [],
        note: text(
          "Desmos shows the coordinates. The x-value is your answer. If there are two intersections, the equation has two solutions.",
          "Desmos покажет координаты. X — это ответ. Если пересечений два, у уравнения два решения."
        ),
      },
    ],
    speed: text(
      "No rearranging, no common denominators, no sign errors. You read the answer off the screen.",
      "Никаких переносов, общих знаменателей и ошибок со знаками. Ответ читается с экрана."
    ),
    caution: text(
      "Only works when the equation has one variable. With two variables you need a system (two equations).",
      "Работает, только если в уравнении одна переменная. С двумя переменными нужна система из двух уравнений."
    ),
  },
  {
    id: "roots",
    title: text("Find roots with x-intercepts", "Найди корни через x-intercepts"),
    goal: text(
      "For a quadratic, polynomial, or any expression set equal to zero, the x-intercepts are the solutions.",
      "Для квадратичной функции, многочлена или любого выражения, приравненного к нулю, x-intercepts — это решения."
    ),
    when: text(
      "Use it for “what are the solutions of …”, “zeros of the function”, and factored forms.",
      "Для вопросов «what are the solutions», «zeros of the function» и для форм с множителями."
    ),
    steps: [
      {
        title: text("Graph the expression as y = …", "Построй выражение как y = …"),
        expressions: ["y=x^2-5x+6"],
      },
      {
        title: text("Click each x-intercept", "Нажми на каждый x-intercept"),
        expressions: [],
        note: text(
          "The points (2, 0) and (3, 0) mean the solutions are x = 2 and x = 3.",
          "Точки (2, 0) и (3, 0) означают, что решения x = 2 и x = 3."
        ),
      },
      {
        title: text("No visible intercepts? Adjust the window.", "Не видно intercepts? Измени окно."),
        expressions: [],
        note: text(
          "Use the wrench/settings or drag the graph. If the parabola never touches the x-axis, the discriminant is negative and there are no real solutions.",
          "Открой настройки или подвинь график. Если парабола не касается оси x, дискриминант отрицательный и действительных решений нет."
        ),
      },
    ],
    speed: text(
      "Factoring a messy quadratic can take two minutes. Reading intercepts takes five seconds.",
      "Факторизация грязной квадратичной может занять две минуты. Чтение intercepts — пять секунд."
    ),
    caution: text(
      "Desmos shows decimal approximations. If the answer choices are exact radicals, convert: x = 1.414… is √2.",
      "Desmos показывает десятичные приближения. Если варианты — точные корни, переведи: x = 1.414… это √2."
    ),
  },
  {
    id: "vertex",
    title: text("Vertex, maximum, and minimum", "Вершина, максимум и минимум"),
    goal: text(
      "The vertex is the turning point. On a downward parabola it is the maximum; on an upward one it is the minimum.",
      "Вершина — точка поворота. У параболы вниз это максимум, у параболы вверх — минимум."
    ),
    when: text(
      "Use it for “what is the maximum value”, “minimum cost”, “vertex form”, and optimization word problems.",
      "Для «maximum value», «minimum cost», vertex form и задач на оптимизацию."
    ),
    steps: [
      {
        title: text("Graph the quadratic", "Построй параболу"),
        expressions: ["y=-2x^2+12x-7"],
      },
      {
        title: text("Click the vertex", "Нажми на вершину"),
        expressions: [],
        note: text(
          "Desmos labels the turning point: (3, 11). The maximum value is the y-coordinate, 11.",
          "Desmos подпишет точку поворота: (3, 11). Максимальное значение — это y, то есть 11."
        ),
      },
      {
        title: text("Need it algebraically? Ask Desmos for the formula.", "Нужно алгебраически? Спроси формулу у Desmos."),
        expressions: ["(-b/(2a), c-b^2/(4a))"],
        note: text(
          "With a = -2, b = 12, c = -7 this gives (3, 11) again — a fast check on the graph.",
          "При a = -2, b = 12, c = -7 снова получится (3, 11) — быстрая проверка графика."
        ),
      },
    ],
    speed: text(
      "Completing the square by hand is where most students lose a sign. The graph never loses a sign.",
      "На completing the square чаще всего теряют знак. График знак не теряет."
    ),
    caution: text(
      "The question may ask for the x-coordinate (the input) or the y-coordinate (the value). Read which one.",
      "Вопрос может спрашивать x-координату (вход) или y-координату (значение). Читай, что именно нужно."
    ),
  },
  {
    id: "systems",
    title: text("Solve a system by intersection", "Реши систему через пересечение"),
    goal: text(
      "Each equation becomes a graph. Every intersection point is a solution pair (x, y).",
      "Каждое уравнение становится графиком. Каждая точка пересечения — пара решений (x, y)."
    ),
    when: text(
      "Use it for linear systems, line–parabola systems, and “how many solutions” questions.",
      "Для линейных систем, систем прямая–парабола и вопросов «сколько решений»."
    ),
    steps: [
      {
        title: text("Enter equation 1", "Введи уравнение 1"),
        expressions: ["y=2x+1"],
      },
      {
        title: text("Enter equation 2", "Введи уравнение 2"),
        expressions: ["y=x^2-3"],
        note: text(
          "Two intersections mean two solutions. One touch point means one. No intersection means none.",
          "Два пересечения — два решения. Одно касание — одно. Нет пересечений — нет решений."
        ),
      },
      {
        title: text("Click each point", "Нажми на каждую точку"),
        expressions: [],
        note: text(
          "Write the pairs exactly as Desmos shows them. For “how many solutions”, you only need the count.",
          "Запиши пары так, как показывает Desmos. Для «сколько решений» нужен только счёт."
        ),
      },
    ],
    speed: text(
      "Substitution with a quadratic creates a new quadratic you then have to solve. The graph skips that whole step.",
      "Подстановка с квадратичной создаёт новую квадратичную, которую ещё решать. График пропускает этот шаг."
    ),
    caution: text(
      "If the system is given as 2x + 3y = 12, solve for y first or type it as-is — Desmos accepts implicit equations.",
      "Если система дана как 2x + 3y = 12, вырази y или введи как есть — Desmos понимает неявные уравнения."
    ),
  },
  {
    id: "tables",
    title: text("Evaluate a function with a table", "Вычисли функцию через таблицу"),
    goal: text(
      "Stop plugging numbers into a complicated formula by hand. Define the function once, then read any input.",
      "Хватит подставлять числа в сложную формулу руками. Определи функцию один раз и читай любой вход."
    ),
    when: text(
      "Use it for f(3), g(-2), “what is the value of the function when …”, and function tables.",
      "Для f(3), g(-2), «what is the value when …» и таблиц значений."
    ),
    steps: [
      {
        title: text("Define the function", "Определи функцию"),
        expressions: ["f(x)=x^3-4x+1"],
      },
      {
        title: text("Ask for the value", "Спроси значение"),
        expressions: ["f(3)"],
        note: text("Desmos prints 16. That is the answer — no arithmetic needed.", "Desmos выдаст 16. Это ответ — без арифметики."),
      },
      {
        title: text("Or open a table", "Или открой таблицу"),
        expressions: ["y=x^3-4x+1"],
        note: text(
          "Click the gear on the expression → Convert to table, or type a table with x values. Great for “which x gives y = 0”.",
          "Нажми шестерёнку у выражения → Convert to table или введи таблицу с x. Удобно для «при каком x y = 0»."
        ),
      },
    ],
    speed: text(
      "One definition replaces ten separate calculations and removes order-of-operations mistakes.",
      "Одно определение заменяет десять вычислений и убирает ошибки порядка действий."
    ),
    caution: text(
      "Use parentheses: f(-2) not f-2. Desmos treats f-2 as subtraction.",
      "Ставь скобки: f(-2), а не f-2. Desmos воспримет f-2 как вычитание."
    ),
  },
  {
    id: "sliders",
    title: text("Sliders: see what a parameter does", "Слайдеры: увидь, что делает параметр"),
    goal: text(
      "When a question asks how changing a, h, or k affects a graph, make that number a slider and drag it.",
      "Когда вопрос спрашивает, как a, h или k меняют график, сделай число слайдером и двигай его."
    ),
    when: text(
      "Use it for transformations, “which equation matches the graph”, and parameter questions.",
      "Для преобразований, «какое уравнение соответствует графику» и вопросов с параметрами."
    ),
    steps: [
      {
        title: text("Type a parameter as a letter", "Введи параметр буквой"),
        expressions: ["a=1", "h=0", "k=0"],
        note: text("Desmos offers “Add slider” automatically for a, h, k.", "Desmos сам предложит «Add slider» для a, h, k."),
      },
      {
        title: text("Write the family", "Запиши семейство"),
        expressions: ["y=a(x-h)^2+k"],
      },
      {
        title: text("Drag and watch", "Двигай и смотри"),
        expressions: [],
        note: text(
          "a stretches/flips, h shifts left/right (opposite sign), k shifts up/down. You now know the answer without memorizing rules.",
          "a растягивает/переворачивает, h сдвигает влево/вправо (противоположный знак), k — вверх/вниз. Правила можно не зубрить."
        ),
      },
    ],
    speed: text(
      "Transformations are a memory test. Sliders turn it into an observation test.",
      "Преобразования — это тест на память. Слайдеры превращают его в наблюдение."
    ),
    caution: text(
      "Sliders only help if you actually drag them. Set a to -1 and 2, h to -3 and 3, and compare.",
      "Слайдеры помогают, только если их двигать. Поставь a = -1 и 2, h = -3 и 3 и сравни."
    ),
  },
  {
    id: "regression",
    title: text("Line of best fit in 20 seconds", "Линия наилучшего приближения за 20 секунд"),
    goal: text(
      "Given a table of data, Desmos computes the regression equation for you — slope, intercept, and even r².",
      "По таблице данных Desmos сам считает уравнение регрессии — slope, intercept и даже r²."
    ),
    when: text(
      "Use it for scatterplot questions, “model the data”, predicting values, and exponential models.",
      "Для scatterplot, «model the data», предсказаний и экспоненциальных моделей."
    ),
    steps: [
      {
        title: text("Enter the table", "Введи таблицу"),
        expressions: ["x_1=[1,2,3,4,5]", "y_1=[2.1,3.9,6.2,7.8,10.1]"],
        note: text(
          "Use the + button → Table if you prefer typing values into cells.",
          "Используй кнопку + → Table, если удобнее вводить значения в ячейки."
        ),
      },
      {
        title: text("Type the regression", "Введи регрессию"),
        expressions: ["y_1~mx_1+b"],
        note: text(
          "Desmos returns m and b with their values. For exponential data use y_1~a*b^{x_1}.",
          "Desmos выдаст значения m и b. Для экспоненциальных данных используй y_1~a*b^{x_1}."
        ),
      },
      {
        title: text("Read or predict", "Читай или предсказывай"),
        expressions: ["y=2x+0.1"],
        note: text(
          "To predict, plug the x into the fitted equation, or just graph it and read the y.",
          "Чтобы предсказать, подставь x в найденное уравнение или построй его и прочитай y."
        ),
      },
    ],
    speed: text(
      "Computing a least-squares line by hand is not tested — choosing and using the model is. Desmos does the arithmetic.",
      "Считать least squares вручную тест не требует — нужно выбрать и использовать модель. Арифметику делает Desmos."
    ),
    caution: text(
      "The SAT sometimes gives the equation and asks you to interpret slope or intercept. Regression finds the equation; you still have to explain what the numbers mean.",
      "Иногда SAT даёт уравнение и спрашивает смысл slope или intercept. Регрессия находит уравнение; смысл чисел объясняешь ты."
    ),
  },
  {
    id: "inequalities",
    title: text("Inequalities: shade, then test", "Неравенства: заштрихуй и проверь"),
    goal: text(
      "Graph the boundary line and let Desmos shade the solution region. Then confirm with one test point.",
      "Построй граничную прямую и дай Desmos заштриховать область решений. Потом подтверди одной тестовой точкой."
    ),
    when: text(
      "Use it for linear inequalities, systems of inequalities, and “which point is a solution” questions.",
      "Для линейных неравенств, систем неравенств и «which point is a solution»."
    ),
    steps: [
      {
        title: text("Type the inequality exactly", "Введи неравенство ровно"),
        expressions: ["y<2x+3"],
        note: text("Use <, >, <=, >= from the Desmos keypad.", "Используй <, >, <=, >= с клавиатуры Desmos."),
      },
      {
        title: text("Add the second inequality if there is a system", "Добавь второе неравенство, если это система"),
        expressions: ["y>=-x+1"],
        note: text(
          "The darker overlap is the solution set. Any point inside it works.",
          "Более тёмное пересечение — множество решений. Любая точка внутри подходит."
        ),
      },
      {
        title: text("Test the answer choices", "Проверь варианты ответа"),
        expressions: [],
        note: text(
          "For “which point is a solution”, type each candidate as a point and see if it lands inside the shaded region.",
          "Для «which point is a solution» введи каждый вариант как точку и посмотри, попал ли он в заштрихованную область."
        ),
      },
    ],
    speed: text(
      "Testing four points by hand means four substitutions and four sign checks. The graph shows all four at once.",
      "Проверка четырёх точек руками — это четыре подстановки и четыре проверки знаков. График показывает все сразу."
    ),
    caution: text(
      "Dashed boundary means the line is not included (strict < or >). Solid means it is (≤ or ≥).",
      "Пунктирная граница значит, что прямая не включена (строгие < или >). Сплошная — включена (≤ или ≥)."
    ),
  },
];

const QUIZ: Array<{ id: string; q: LocalizedText; options: LocalizedText[]; correct: number }> = [
  {
    id: "q1",
    q: text("The vertex of y = -2x^2 + 12x - 7 is (3, 11). What is the maximum value?", "Вершина y = -2x^2 + 12x - 7 — это (3, 11). Какое максимальное значение?"),
    options: [text("3", "3"), text("11", "11"), text("-7", "-7"), text("12", "12")],
    correct: 1,
  },
  {
    id: "q2",
    q: text("You enter y = 2x + 1 and y = x^2 - 3. The graphs cross twice. How many solutions?", "Ты ввёл y = 2x + 1 и y = x^2 - 3. Графики пересекаются дважды. Сколько решений?"),
    options: [text("1", "1"), text("2", "2"), text("3", "3"), text("0", "0")],
    correct: 1,
  },
  {
    id: "q3",
    q: text("Which expression types a slider automatically?", "Какое выражение Desmos сам предложит сделать слайдером?"),
    options: [text("y = a(x - h)^2 + k", "y = a(x - h)^2 + k"), text("y = 2x + 1", "y = 2x + 1"), text("f(3) = 16", "f(3) = 16"), text("x_1 = [1,2,3]", "x_1 = [1,2,3]")],
    correct: 0,
  },
  {
    id: "q4",
    q: text("In regression, what does y_1 ~ m x_1 + b return?", "Что возвращает регрессия y_1 ~ m x_1 + b?"),
    options: [text("A graph", "График"), text("The fitted m and b", "Подобранные m и b"), text("A table", "Таблицу"), text("A slider", "Слайдер")],
    correct: 1,
  },
  {
    id: "q5",
    q: text("Dashed boundary in an inequality graph means…", "Пунктирная граница на графике неравенства значит…"),
    options: [text("The line is included (≤)", "Прямая включена (≤)"), text("The line is NOT included (< or >)", "Прямая НЕ включена (< или >)"), text("No solution", "Нет решения"), text("Both sides", "Обе стороны")],
    correct: 1,
  },
];

function DesmosQuiz() {
  const { language } = useLanguage();
  const progress = useLearnProgress();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  const answered = Object.keys(answers).length;
  const correctCount = QUIZ.filter((q) => answers[q.id] === q.correct).length;
  const allAnswered = answered === QUIZ.length;
  const passed = submitted && correctCount >= 4;

  const copy =
    language === "ru"
      ? {
          title: "Быстрый квиз — проверь себя",
          sub: "5 вопросов. 4+ верно — точка XP. Идеально — 30 XP.",
          score: "Верно",
          check: "Проверить",
          perfect: "Идеально! +30 XP.",
          passed: "Отлично! Продолжай в том же духе.",
          retry: "Попробовать снова",
          choose: "Выбери ответ",
        }
      : {
          title: "Fast quiz — test yourself",
          sub: "5 questions. 4+ right — earn XP. Perfect — 30 XP.",
          score: "Correct",
          check: "Check answers",
          perfect: "Perfect! +30 XP.",
          passed: "Great! Keep it up.",
          retry: "Try again",
          choose: "Choose an answer",
        };

  const handleCheck = () => {
    if (!allAnswered) return;
    const gained = recordQuiz("desmos", correctCount, QUIZ.length);
    setXpGained(gained);
    setSubmitted(true);
  };

  return (
    <section className="relative mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="animate-float-up overflow-hidden rounded-[1.75rem] border border-emerald-400/25 bg-gradient-to-br from-emerald-500/[0.09] via-[#0f1417] to-card p-6 shadow-[0_20px_60px_rgba(16,185,129,0.12)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-foreground">{copy.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{copy.sub}</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-sm font-bold text-foreground">
            {copy.score}: {answered ? `${correctCount} / ${QUIZ.length}` : `0 / ${QUIZ.length}`}
          </span>
        </div>

        <div className="mt-5 space-y-4">
          {QUIZ.map((q, qi) => {
            const selected = answers[q.id];
            const isCorrect = selected === q.correct;
            return (
              <div
                key={q.id}
                className={cn(
                  "rounded-2xl border p-4",
                  !submitted && "border-border bg-card/70",
                  submitted && isCorrect && "border-emerald-400/40 bg-emerald-500/[0.06]",
                  submitted && !isCorrect && "border-rose-400/40 bg-rose-500/[0.06]"
                )}
              >
                <p className="text-sm font-semibold text-foreground">
                  {qi + 1}. <MathText text={q.q[language]} />
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {q.options.map((opt, oi) => (
                    <button
                      key={oi}
                      type="button"
                      disabled={submitted}
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: oi }))}
                      className={cn(
                        "rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-colors",
                        !submitted && selected === oi && "border-violet-400/60 bg-violet-500/10 text-violet-100",
                        !submitted && selected !== oi && "border-border bg-secondary/50 text-foreground hover:border-violet-300/40",
                        submitted && oi === q.correct && "border-emerald-400/60 bg-emerald-500/10 text-emerald-100",
                        submitted && selected === oi && oi !== q.correct && "border-rose-400/60 bg-rose-500/10 text-rose-100",
                        submitted && selected !== oi && oi !== q.correct && "border-border bg-secondary/40 text-muted-foreground"
                      )}
                    >
                      <MathText text={opt[language]} />
                    </button>
                  ))}
                </div>
                {submitted && selected !== q.correct && (
                  <p className="mt-2 text-xs font-semibold text-rose-200">
                    {language === "ru" ? "Правильный ответ:" : "Correct answer:"}{" "}
                    <MathText text={q.options[q.correct][language]} />
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {!submitted ? (
            <button
              type="button"
              onClick={handleCheck}
              disabled={!allAnswered}
              className={cn(
                "rounded-xl px-5 py-3 text-sm font-bold transition-colors",
                allAnswered ? "bg-emerald-600 text-white hover:bg-emerald-500" : "cursor-not-allowed bg-secondary text-muted-foreground"
              )}
            >
              {!allAnswered ? `${copy.choose} (${answered}/${QUIZ.length})` : copy.check}
            </button>
          ) : (
            <>
              {correctCount === QUIZ.length && xpGained > 0 && (
                <p className="text-sm font-bold text-emerald-300">{copy.perfect}</p>
              )}
              {passed && correctCount < QUIZ.length && (
                <p className="text-sm font-semibold text-emerald-200">{copy.passed}</p>
              )}
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                  setXpGained(0);
                }}
                className="rounded-xl border border-border bg-secondary/60 px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary"
              >
                {copy.retry}
              </button>
              {progress.xp > 0 && <span className="text-xs text-muted-foreground">Total XP: {progress.xp}</span>}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

const SHORTCUTS: Array<{ keys: string; meaning: LocalizedText }> = [
  { keys: "sqrt(", meaning: text("Square root: sqrt(50)", "Квадратный корень: sqrt(50)") },
  { keys: "pi", meaning: text("π ≈ 3.14159", "π ≈ 3.14159") },
  { keys: "_", meaning: text("Subscript: x_1", "Нижний индекс: x_1") },
  { keys: "~", meaning: text("Regression: y_1 ~ mx_1 + b", "Регрессия: y_1 ~ mx_1 + b") },
  { keys: "<=", meaning: text("Less than or equal to", "Меньше или равно") },
  { keys: "abs(", meaning: text("Absolute value: abs(x-3)", "Модуль: abs(x-3)") },
  { keys: "{}", meaning: text("Grouping in exponents: 2^{x+1}", "Группировка в степени: 2^{x+1}") },
];

function CopyChip({ value, language }: { value: string; language: "en" | "ru" }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1400);
        } catch {
          setCopied(false);
        }
      }}
      className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary/60 px-2 py-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground"
      aria-label={language === "ru" ? "Копировать выражение" : "Copy expression"}
    >
      {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
      {copied ? (language === "ru" ? "Ок" : "Done") : language === "ru" ? "Копировать" : "Copy"}
    </button>
  );
}

export default function DesmosMasteryPage() {
  const { language } = useLanguage();

  const copy =
    language === "ru"
      ? {
          back: "Math Section",
          kicker: "Desmos",
          title: "Desmos для математики.",
          description:
            "Восемь рецептов: пересечения, корни, вершины, системы, таблицы, слайдеры, регрессия и неравенства. У каждого шага есть кнопка, которая сразу открывает выражения в калькуляторе.",
          open: "Открыть калькулятор",
          recipe: "Рецепт",
          goal: "Задача",
          when: "Когда использовать",
          steps: "Шаги",
          speed: "Почему быстро",
          caution: "Осторожно",
          shortcuts: "Клавиатура Desmos",
          shortcutsBody:
            "Эти символы экономят время при вводе. На SAT Desmos открывается по кнопке в Bluebook — потренируйся вводить выражения заранее.",
          practice: "Тренируйся на реальных вопросах",
          practiceBody:
            "В банке вопросов у каждого задания есть кнопка Desmos: открой её и реши вопрос графически.",
          bank: "Открыть банк вопросов",
          backMath: "Вернуться в Math",
          minutes: "8 рецептов · 20 минут",
        }
      : {
          back: "Math Section",
          kicker: "Desmos",
          title: "Desmos for math.",
          description:
            "Eight recipes: intersections, roots, vertices, systems, tables, sliders, regression, and inequalities. Every step has a button that opens the expressions in the calculator.",
          open: "Open the calculator",
          recipe: "Recipe",
          goal: "Goal",
          when: "When to use it",
          steps: "Steps",
          speed: "Why it is fast",
          caution: "Watch out",
          shortcuts: "Desmos keyboard",
          shortcutsBody:
            "These symbols save typing time. On the SAT, Desmos opens from a button inside Bluebook — practise entering expressions before test day.",
          practice: "Practise on real questions",
          practiceBody:
            "Every question in the bank has a Desmos button: open it and solve the question graphically.",
          bank: "Open the question bank",
          backMath: "Back to Math",
          minutes: "8 recipes · 20 minutes",
        };

  return (
    <DesmosProvider enabled>
      <div className="min-h-screen text-foreground">
        <SiteHeader />

        <main className="relative overflow-hidden pb-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(150,93,255,0.20),transparent_38%),radial-gradient(circle_at_85%_15%,rgba(56,189,248,0.10),transparent_35%)]" />
            <div className="absolute inset-0 subtle-grid opacity-[0.14]" />
          </div>

          <section className="relative mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
            <Link
              href="/learn/math"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {copy.back}
            </Link>

            <div className="animate-float-up relative mt-5 overflow-hidden rounded-[2rem] border border-violet-400/25 bg-gradient-to-br from-violet-600/25 via-[#12121a] to-card p-7 backdrop-blur-xl sm:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-violet-500/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-fuchsia-500/15 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/30 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">
                  <Calculator className="h-3.5 w-3.5" />
                  {copy.kicker}
                </div>
                <h1 className="mt-5 max-w-3xl bg-gradient-to-r from-white via-violet-100 to-fuchsia-100 bg-clip-text text-4xl font-black leading-[1.02] tracking-tight text-transparent sm:text-5xl">
                  {copy.title}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                  {copy.description}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent("open-desmos"));
                    }}
                    className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-black text-white shadow-[0_12px_32px_rgba(168,85,247,0.45)] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(168,85,247,0.6)] hover:brightness-110 active:scale-[0.98]"
                  >
                    <Calculator className="h-4 w-4 transition-transform group-hover:rotate-6" />
                    {copy.open}
                  </button>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-zinc-300 backdrop-blur">
                    <Clock3 className="h-4 w-4 text-sky-300" />
                    {copy.minutes}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-gradient-to-r from-emerald-500/15 to-teal-500/10 px-4 py-2.5 text-sm font-bold text-emerald-100">
                    <Zap className="h-4 w-4 animate-flame-flicker" />
                    {language === "ru" ? "Открой калькулятор — но оставь себе 5 секунд на проверку" : "Open the calculator — but keep 5 seconds for a check"}
                  </span>
                </div>
                <div className="mt-4">
                  <XpBar compact />
                </div>
              </div>
            </div>
          </section>

          <section className="relative mx-auto mt-8 max-w-5xl space-y-5 px-4 sm:px-6 lg:px-8">
            {RECIPES.map((recipe, index) => (              <article
                key={recipe.id}
                className="animate-float-up group overflow-hidden rounded-[1.75rem] border border-border/80 bg-gradient-to-br from-[#12121a] to-card/80 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-violet-400/30 hover:shadow-[0_24px_64px_rgba(168,85,247,0.16)]"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="border-b border-border px-6 py-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex h-7 items-center rounded-lg bg-violet-500/15 px-2.5 text-[11px] font-black uppercase tracking-[0.16em] text-violet-200">
                      {copy.recipe} {index + 1}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      <Gauge className="h-3 w-3" />
                      ~15 sec
                    </span>
                  </div>
                  <h2 className="mt-3 text-xl font-black tracking-tight text-foreground sm:text-2xl">
                    <MathText text={recipe.title[language]} />
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    <MathText text={recipe.goal[language]} preserveLines />
                  </p>
                  <p className="mt-2 inline-flex items-start gap-1.5 text-xs text-muted-foreground">
                    <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-300" />
                    <MathText text={recipe.when[language]} preserveLines />
                  </p>
                </div>

                <div className="space-y-5 p-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      {copy.steps}
                    </p>
                    <div className="mt-3 space-y-4">
                      {recipe.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex gap-3">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-[11px] font-black text-muted-foreground">
                            {stepIndex + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-foreground">
                              <MathText text={step.title[language]} />
                            </p>
                            {step.note ? (
                              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                <MathText text={step.note[language]} preserveLines />
                              </p>
                            ) : null}

                            {step.expressions.length > 0 ? (
                              <div className="mt-2 space-y-1.5">
                                {step.expressions.map((expression) => (
                                  <div
                                    key={expression}
                                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-[#0d0d12] px-3 py-2"
                                  >
                                    <code className="font-mono text-xs text-violet-100">
                                      {expression}
                                    </code>
                                    <CopyChip value={expression} language={language} />
                                  </div>
                                ))}
                                <OpenInDesmos expressions={step.expressions} />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/[0.07] p-4">
                      <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300">
                        <Lightbulb className="h-3.5 w-3.5" />
                        {copy.speed}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-emerald-100/90">
                        <MathText text={recipe.speed[language]} preserveLines />
                      </p>
                    </div>
                    <div className="rounded-xl border border-amber-400/20 bg-amber-500/[0.07] p-4">
                      <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-300">
                        <TriangleAlert className="h-3.5 w-3.5" />
                        {copy.caution}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-amber-100/90">
                        <MathText text={recipe.caution[language]} preserveLines />
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <DesmosQuiz />

          <section className="relative mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[1.75rem] border border-border bg-card/70 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <Keyboard className="h-5 w-5 text-sky-300" />
                <h2 className="text-xl font-black text-foreground">{copy.shortcuts}</h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{copy.shortcutsBody}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {SHORTCUTS.map((item) => (
                  <div
                    key={item.keys}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5"
                  >
                    <code className="font-mono text-sm font-bold text-violet-200">{item.keys}</code>
                    <span className="text-xs text-muted-foreground">
                      <MathText text={item.meaning[language]} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="relative mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 rounded-[1.75rem] border border-violet-400/25 bg-violet-500/[0.08] p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-violet-200">
                  <Sparkles className="h-5 w-5" />
                  <h2 className="text-xl font-black">{copy.practice}</h2>
                </div>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">{copy.practiceBody}</p>
              </div>
              <Link
                href="/learn/bank"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
              >
                {copy.bank}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <div className="relative mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/learn/math"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {copy.backMath}
            </Link>
          </div>
        </main>
      </div>
    </DesmosProvider>
  );
}
