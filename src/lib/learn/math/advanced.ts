import { text, type Topic } from "../types";

export const ADVANCED_TOPICS: Topic[] = [
  {
    id: "m-adv-quadratics-factoring",
    section: "math",
    domainId: "advanced",
    order: 9,
    title: text("Quadratics: factoring and zeros", "Квадратные: факторизация и корни"),
    subtitle: text("Write quadratics as products and read the zeros directly.", "Представляйте квадратные уравнения в виде произведений и сразу находите корни."),
    minutes: 14,
    tags: ["quadratics", "factoring", "zeros", "SAT"],
    objectives: [
      text("Factor quadratics with a = 1 and a ≠ 1.", "Раскладывайте на множители квадратные уравнения с a = 1 и a ≠ 1."),
      text("Find zeros (x-intercepts) from factored form.", "Находите корни (пересечения с осью x) по разложенной форме."),
      text("Use the Zero Product Property to solve equations.", "Используйте свойство нуля произведения для решения уравнений."),
    ],
    theory: [
      {
        heading: text("Factored form reveals zeros", "Форма с множителями показывает корни"),
        body: text("If f(x) = a(x - r₁)(x - r₂), then f(x) = 0 exactly when x = r₁ or x = r₂. So the zeros are the numbers subtracted inside each factor. Always verify by plugging back: each factor must be zero at its zero.", "Если f(x) = a(x - r₁)(x - r₂), то f(x) = 0 именно когда x = r₁ или x = r₂. Значит корни — это числа, вычитаемые внутри каждого множителя. Проверяйте подстановкой: каждый множитель должен обращаться в ноль в своём корне."),
        formulas: ["f(x) = a(x - r₁)(x - r₂)", "x - r = 0 → x = r"],
      },
      {
        heading: text("Factoring methods", "Методы факторизации"),
        body: text("First pull out any common factor. For x² + bx + c, find two numbers that multiply to c and add to b. For ax² + bx + c, try split-the-middle: find p·q = a·c with p + q = b, group, and factor by grouping. The SAT rarely asks for a long factorization — keep numbers small and check each step.", "Сначала выносите общий множитель. Для x² + bx + c ищите два числа, чьё произведение равно c, а сумма равна b. Для ax² + bx + c используйте метод «разбей середину»: найдите p·q = a·c при p + q = b, сгруппируйте и факторизуйте группировкой. На SAT факторизация обычно короткая — держите числа маленькими и проверяйте каждый шаг."),
        formulas: ["x² + bx + c = (x + m)(x + n)  where  mn = c, m + n = b", "ax² + bx + c"],
      },
    ],
    examples: [
      {
        prompt: text("Find the zeros of f(x) = x² − 5x + 6.", "Найдите корни функции f(x) = x² − 5x + 6."),
        steps: [
          text("Find m, n with mn = 6 and m + n = −5: they are −2 and −3.", "Найдите m, n с mn = 6 и m + n = −5: это −2 и −3."),
          text("Write f(x) = (x − 2)(x − 3).", "Запишите f(x) = (x − 2)(x − 3)."),
          text("Set each factor to zero: x − 2 = 0 gives x = 2; x − 3 = 0 gives x = 3.", "Приравняйте каждый множитель к нулю: x − 2 = 0 даёт x = 2; x − 3 = 0 даёт x = 3."),
          text("Check: f(2) = 4 − 10 + 6 = 0 and f(3) = 9 − 15 + 6 = 0.", "Проверка: f(2) = 4 − 10 + 6 = 0 и f(3) = 9 − 15 + 6 = 0."),
        ],
        answer: text("Zeros at x = 2 and x = 3.", "Корни при x = 2 и x = 3."),
        desmos: ["y = x^2 - 5x + 6", "y = (x-2)(x-3)"],
      },
      {
        prompt: text("Solve 2x² + 7x + 3 = 0.", "Решите 2x² + 7x + 3 = 0."),
        steps: [
          text("Split the middle: need p·q = 6 and p + q = 7, so 6 and 1 work.", "Разбейте середину: нужно p·q = 6 и p + q = 7, подойдут 6 и 1."),
          text("Rewrite: 2x² + 6x + x + 3 = 2x(x + 3) + 1(x + 3) = (2x + 1)(x + 3).", "Перепишите: 2x² + 6x + x + 3 = 2x(x + 3) + 1(x + 3) = (2x + 1)(x + 3)."),
          text("Zero product: 2x + 1 = 0 gives x = −1/2; x + 3 = 0 gives x = −3.", "Произведение равно нулю: 2x + 1 = 0 даёт x = −1/2; x + 3 = 0 даёт x = −3."),
        ],
        answer: text("x = −1/2 and x = −3.", "x = −1/2 и x = −3."),
        desmos: ["y = 2x^2 + 7x + 3", "y = (2x+1)(x+3)"],
      },
    ],
    desmos: [
      {
        title: text("Factor and check zeros visually", "Факторизация и визуальная проверка корней"),
        goal: text("Graph the original and factored forms and confirm the x-intercepts match the zeros.", "Постройте графики исходной и разложенной форм и убедитесь, что пересечения с осью x совпадают с корнями."),
        steps: [
          {
            title: text("Graph the original", "Постройте исходную функцию"),
            expressions: ["y = x^2 - 5x + 6"],
            note: text("Note where the parabola crosses the x-axis.", "Отметьте, где парабола пересекает ось x."),
          },
          {
            title: text("Graph the factored form", "Постройте разложенную форму"),
            expressions: ["y = (x-2)(x-3)", "x = 2", "x = 3"],
            note: text("The two graphs should coincide exactly.", "Два графика должны полностью совпасть."),
          },
        ],
        speed: text("About 1 minute.", "Около 1 минуты."),
        caution: text("If the graphs differ, re-factor — a sign error is the usual cause.", "Если графики различаются, проверьте факторизацию — чаще всего ошибка в знаке."),
      },
      {
        title: text("Zero product on the graph", "Свойство нуля произведения на графике"),
        goal: text("Show that each linear factor is zero at its root.", "Покажите, что каждый линейный множитель обращается в ноль в своём корне."),
        steps: [
          {
            title: text("Plot the factors", "Постройте множители"),
            expressions: ["y = 2x + 1", "y = x + 3"],
          },
          {
            title: text("Plot the product", "Постройте произведение"),
            expressions: ["y = 2x^2 + 7x + 3"],
          },
        ],
        speed: text("About 1 minute.", "Около 1 минуты."),
        caution: text("Do not read the y-values of the factors as zeros of the product.", "Не путайте значения множителей с корнями произведения."),
      },
    ],
    strategy: [
      text("Factor first, then solve — factoring usually beats the quadratic formula on easy SAT items.", "Сначала факторизуйте, затем решайте — факторизация обычно быстрее формулы корней на лёгких заданиях SAT."),
      text("After finding zeros, do a quick plug-in check before moving on.", "После нахождения корней быстро проверяйте подстановкой, прежде чем идти дальше."),
      text("If factoring stalls after 20 seconds, switch to the quadratic formula.", "Если факторизация не даётся за 20 секунд, переходите к формуле корней."),
    ],
    pitfalls: [
      text("Sign trap: (x − 2)(x − 3) expands to x² − 5x + 6, not x² + 5x + 6.", "Ловушка со знаками: (x − 2)(x − 3) раскрывается как x² − 5x + 6, а не x² + 5x + 6."),
      text("Forgetting the common factor: 2x² + 6x = 2x(x + 3), and the 2 matters for the zero.", "Забытый общий множитель: 2x² + 6x = 2x(x + 3), и двойка важна для корня."),
    ],
    practice: [
      {
        id: "m-adv-quadratics-factoring-p1",
        prompt: text("What are the zeros of f(x) = x² + 3x − 10?", "Каковы корни функции f(x) = x² + 3x − 10?"),
        options: [
          text("x = 2 and x = −5", "x = 2 и x = −5"),
          text("x = −2 and x = 5", "x = −2 и x = 5"),
          text("x = 1 and x = −10", "x = 1 и x = −10"),
          text("x = −2 and x = −5", "x = −2 и x = −5"),
        ],
        correctIndex: 0,
        explanation: text("(x + 5)(x − 2) = x² + 3x − 10, so the zeros are −5 and 2.", " (x + 5)(x − 2) = x² + 3x − 10, поэтому корни равны −5 и 2."),
        difficulty: "easy",
        desmos: ["y = x^2 + 3x - 10", "y = (x+5)(x-2)"],
      },
      {
        id: "m-adv-quadratics-factoring-p2",
        prompt: text("Solve x² − 7x + 12 = 0.", "Решите x² − 7x + 12 = 0."),
        options: [
          text("x = 3 or x = 4", "x = 3 или x = 4"),
          text("x = −3 or x = −4", "x = −3 или x = −4"),
          text("x = 6 or x = 2", "x = 6 или x = 2"),
          text("x = 12 or x = 1", "x = 12 или x = 1"),
        ],
        correctIndex: 0,
        explanation: text("(x − 3)(x − 4) = x² − 7x + 12, so x = 3 and x = 4.", " (x − 3)(x − 4) = x² − 7x + 12, поэтому x = 3 и x = 4."),
        difficulty: "easy",
        desmos: ["y = x^2 - 7x + 12"],
      },
      {
        id: "m-adv-quadratics-factoring-p3",
        prompt: text("Solve 3x² − 8x + 4 = 0.", "Решите 3x² − 8x + 4 = 0."),
        options: [
          text("x = 2 or x = 2/3", "x = 2 или x = 2/3"),
          text("x = −2 or x = −2/3", "x = −2 или x = −2/3"),
          text("x = 4 or x = 1/3", "x = 4 или x = 1/3"),
          text("x = 1 or x = 4/3", "x = 1 или x = 4/3"),
        ],
        correctIndex: 0,
        explanation: text("(3x − 2)(x − 2) = 3x² − 8x + 4, so x = 2/3 and x = 2.", " (3x − 2)(x − 2) = 3x² − 8x + 4, поэтому x = 2/3 и x = 2."),
        difficulty: "medium",
        desmos: ["y = 3x^2 - 8x + 4", "y = (3x-2)(x-2)"],
      },
      {
        id: "m-adv-quadratics-factoring-p4",
        prompt: text("If x² + kx + 24 = 0 has zeros 4 and 6, what is k?", "Если уравнение x² + kx + 24 = 0 имеет корни 4 и 6, чему равно k?"),
        options: [
          text("−10", "−10"),
          text("10", "10"),
          text("−24", "−24"),
          text("24", "24"),
        ],
        correctIndex: 0,
        explanation: text("(x − 4)(x − 6) = x² − 10x + 24, so k = −10. The sum of the zeros is −k.", " (x − 4)(x − 6) = x² − 10x + 24, поэтому k = −10. Сумма корней равна −k."),
        difficulty: "hard",
      },
    ],
  },
  {
    id: "m-adv-quadratic-forms",
    section: "math",
    domainId: "advanced",
    order: 10,
    title: text("Quadratic forms: vertex, standard, factored", "Формы параболы: вершина, стандарт, множители"),
    subtitle: text("Convert between vertex, standard, and factored forms without memorizing everything.", "Переходите между формами параболы — вершина, стандарт, множители — без зубрёжки."),
    minutes: 15,
    tags: ["parabola", "vertex form", "standard form", "SAT"],
    objectives: [
      text("Read vertex, axis, and opening direction from vertex form.", "Читайте вершину, ось симметрии и направление ветвей из формы вершины."),
      text("Complete the square to convert standard form to vertex form.", "Используйте выделение полного квадрата для перехода от стандартной формы к форме вершины."),
      text("Write factored form from zeros and leading coefficient.", "Записывайте форму с множителями по корням и старшему коэффициенту."),
    ],
    theory: [
      {
        heading: text("Three forms, three jobs", "Три формы — три задачи"),
        body: text("Standard form y = ax² + bx + c is best for the y-intercept. Vertex form y = a(x − h)² + k directly gives the vertex (h, k), the axis x = h, and the opening direction (sign of a). Factored form y = a(x − r₁)(x − r₂) directly gives the zeros. Switching forms is just algebra; each form makes a different feature obvious.", "Стандартная форма y = ax² + bx + c удобна для точки пересечения с осью y. Форма вершины y = a(x − h)² + k сразу даёт вершину (h, k), ось x = h и направление ветвей (знак a). Форма с множителями y = a(x − r₁)(x − r₂) сразу даёт корни. Переход между формами — просто алгебра; каждая форма делает видимой разную особенность."),
        formulas: ["Standard: y = ax² + bx + c", "Vertex: y = a(x - h)² + k", "Factored: y = a(x - r₁)(x - r₂)", "Axis: x = -b/(2a)"],
      },
      {
        heading: text("Completing the square", "Выделение полного квадрата"),
        body: text("To get the vertex from standard form: factor a out of the x-terms, add (b/2a)² inside the square, and compensate outside. The axis is x = −b/(2a). The vertex y-value is f at the axis. Completing the square is the bridge between standard and vertex forms.", "Чтобы получить вершину из стандартной формы: вынесите a за скобки при x, добавьте (b/2a)² внутрь квадрата и компенсируйте снаружи. Ось — это x = −b/(2a). Значение в вершине — это f на оси. Выделение полного квадрата — мост между стандартной формой и формой вершины."),
        formulas: ["h = -b/(2a)", "y = a(x + b/2a)² + (c - a(b/2a)²)"],
      },
    ],
    examples: [
      {
        prompt: text("Find the vertex and axis of f(x) = x² − 6x + 5.", "Найдите вершину и ось функции f(x) = x² − 6x + 5."),
        steps: [
          text("Axis: x = −b/(2a) = 6/2 = 3.", "Ось: x = −b/(2a) = 6/2 = 3."),
          text("Vertex y-value: f(3) = 9 − 18 + 5 = −4.", "Значение в вершине: f(3) = 9 − 18 + 5 = −4."),
          text("Vertex form: f(x) = (x − 3)² − 4.", "Форма вершины: f(x) = (x − 3)² − 4."),
          text("Opens upward since a = 1 > 0, so the vertex is a minimum.", "Ветви вверх, так как a = 1 > 0, значит вершина — минимум."),
        ],
        answer: text("Vertex (3, −4), axis x = 3, opens upward.", "Вершина (3, −4), ось x = 3, ветви вверх."),
        desmos: ["y = x^2 - 6x + 5", "y = (x-3)^2 - 4", "x = 3"],
      },
      {
        prompt: text("Write the quadratic with zeros −1 and 3 through (0, 6) in factored form.", "Запишите в форме с множителями квадратичную функцию с корнями −1 и 3, проходящую через (0, 6)."),
        steps: [
          text("Start with f(x) = a(x + 1)(x − 3).", "Начните с f(x) = a(x + 1)(x − 3)."),
          text("Plug in (0, 6): 6 = a(1)(−3) = −3a, so a = −2.", "Подставьте (0, 6): 6 = a(1)(−3) = −3a, значит a = −2."),
          text("So f(x) = −2(x + 1)(x − 3) = −2x² + 4x + 6.", "Получаем f(x) = −2(x + 1)(x − 3) = −2x² + 4x + 6."),
        ],
        answer: text("f(x) = −2(x + 1)(x − 3).", "f(x) = −2(x + 1)(x − 3)."),
        desmos: ["y = -2(x+1)(x-3)", "(0,6)"],
      },
    ],
    desmos: [
      {
        title: text("Standard to vertex on screen", "Стандартная форма в форму вершины на экране"),
        goal: text("See that completing the square does not change the graph — only the description.", "Убедитесь, что выделение полного квадрата не меняет график, а меняет только его описание."),
        steps: [
          {
            title: text("Standard form", "Стандартная форма"),
            expressions: ["y = x^2 - 6x + 5"],
          },
          {
            title: text("Vertex form", "Форма вершины"),
            expressions: ["y = (x-3)^2 - 4"],
            note: text("The graphs coincide; the vertex (3, −4) is now readable.", "Графики совпадают; вершина (3, −4) теперь читается напрямую."),
          },
        ],
        speed: text("About 1 minute.", "Около 1 минуты."),
        caution: text("Do not drop the sign: (x − 3)² means h = 3, not −3.", "Не теряйте знак: (x − 3)² означает h = 3, а не −3."),
      },
      {
        title: text("Leading coefficient controls width", "Старший коэффициент управляет шириной"),
        goal: text("Build several parabolas from vertex form and compare widths.", "Постройте несколько парабол в форме вершины и сравните их ширину."),
        steps: [
          {
            title: text("Same vertex, different a", "Одна вершина, разный a"),
            expressions: ["y = (x-1)^2", "y = 2(x-1)^2", "y = 0.5(x-1)^2"],
          },
        ],
        speed: text("About 1 minute.", "Около 1 минуты."),
        caution: text("Larger |a| means narrower, not taller in a loose sense — the shape compresses horizontally.", "Больший |a| означает более узкую параболу — график сжимается по горизонтали."),
      },
    ],
    strategy: [
      text("Use form that answers the question: zeros → factored, vertex → vertex form, y-intercept → standard.", "Используйте форму, отвечающую на вопрос: корни → форма с множителями, вершина → форма вершины, пересечение с y → стандартная."),
      text("Compute the axis x = −b/(2a) first; the vertex value follows by plugging in.", "Сначала вычислите ось x = −b/(2a); значение в вершине получите подстановкой."),
      text("When converting, do a one-point check to catch arithmetic slips.", "При переходе делайте проверку в одной точке, чтобы поймать арифметические ошибки."),
    ],
    pitfalls: [
      text("Vertex sign error: y = a(x + h)² + k has vertex (−h, k), not (h, k).", "Ошибка со знаком вершины: y = a(x + h)² + k имеет вершину (−h, k), а не (h, k)."),
      text("Mixing up max and min: if a < 0 the vertex is a maximum, not a minimum.", "Путаница максимума и минимума: если a < 0, вершина — максимум, а не минимум."),
    ],
    practice: [
      {
        id: "m-adv-quadratic-forms-p1",
        prompt: text("What is the vertex of y = 2(x − 4)² + 1?", "Чему равна вершина параболы y = 2(x − 4)² + 1?"),
        options: [
          text("(4, 1)", "(4, 1)"),
          text("(−4, 1)", "(−4, 1)"),
          text("(4, −1)", "(4, −1)"),
          text("(1, 4)", "(1, 4)"),
        ],
        correctIndex: 0,
        explanation: text("Vertex form y = a(x − h)² + k gives (h, k) = (4, 1).", "Форма вершины y = a(x − h)² + k даёт (h, k) = (4, 1)."),
        difficulty: "easy",
        desmos: ["y = 2(x-4)^2 + 1"],
      },
      {
        id: "m-adv-quadratic-forms-p2",
        prompt: text("What is the axis of symmetry of y = 3x² − 12x + 5?", "Чему равна ось симметрии параболы y = 3x² − 12x + 5?"),
        options: [
          text("x = 2", "x = 2"),
          text("x = −2", "x = −2"),
          text("x = 4", "x = 4"),
          text("x = 5", "x = 5"),
        ],
        correctIndex: 0,
        explanation: text("x = −b/(2a) = 12/6 = 2.", "x = −b/(2a) = 12/6 = 2."),
        difficulty: "easy",
        desmos: ["y = 3x^2 - 12x + 5", "x = 2"],
      },
      {
        id: "m-adv-quadratic-forms-p3",
        prompt: text("Which factored form has zeros 1 and −4 and y-intercept 8?", "Какая форма с множителями имеет корни 1 и −4 и пересечение с осью y, равное 8?"),
        options: [
          text("f(x) = 2(x − 1)(x + 4)", "f(x) = 2(x − 1)(x + 4)"),
          text("f(x) = −2(x − 1)(x + 4)", "f(x) = −2(x − 1)(x + 4)"),
          text("f(x) = 2(x + 1)(x − 4)", "f(x) = 2(x + 1)(x − 4)"),
          text("f(x) = −2(x + 1)(x − 4)", "f(x) = −2(x + 1)(x − 4)"),
        ],
        correctIndex: 1,
        explanation: text("a(1)(−4) = 8 gives a = −2, so f(x) = −2(x − 1)(x + 4).", "a(1)(−4) = 8 даёт a = −2, поэтому f(x) = −2(x − 1)(x + 4)."),
        difficulty: "medium",
        desmos: ["y = -2(x-1)(x+4)"],
      },
      {
        id: "m-adv-quadratic-forms-p4",
        prompt: text("A parabola opens downward with vertex (−2, 5). Which equation fits?", "Парабола открывается вниз и имеет вершину (−2, 5). Какое уравнение подходит?"),
        options: [
          text("y = −(x + 2)² + 5", "y = −(x + 2)² + 5"),
          text("y = (x − 2)² + 5", "y = (x − 2)² + 5"),
          text("y = (x + 2)² − 5", "y = (x + 2)² − 5"),
          text("y = −(x − 2)² − 5", "y = −(x − 2)² − 5"),
        ],
        correctIndex: 0,
        explanation: text("Downward means a < 0, and x = −2 means (x + 2) in the square. So y = −(x + 2)² + 5.", "Вниз означает a < 0, а x = −2 означает (x + 2) в квадрате. Значит y = −(x + 2)² + 5."),
        difficulty: "medium",
        desmos: ["y = -(x+2)^2 + 5"],
      },
    ],
  },
  {
    id: "m-adv-nonlinear-systems",
    section: "math",
    domainId: "advanced",
    order: 11,
    title: text("Nonlinear systems and intersections", "Нелинейные системы и пересечения"),
    subtitle: text("Solve systems where at least one equation is not a line.", "Решайте системы, где хотя бы одно уравнение не является прямой."),
    minutes: 16,
    tags: ["systems", "intersection", "substitution", "SAT"],
    objectives: [
      text("Solve a line–parabola system by substitution.", "Решайте систему «прямая–парабола» методом подстановки."),
      text("Solve a line–circle system and verify with a graph.", "Решайте систему «прямая–окружность» и проверяйте графически."),
      text("Count solutions from the intersection picture.", "Считайте число решений по картине пересечений."),
    ],
    theory: [
      {
        heading: text("Substitution for nonlinear systems", "Подстановка в нелинейных системах"),
        body: text("The same substitution idea works: solve one equation for y (or x), plug into the other, and solve the resulting single equation. The number of real solutions equals the number of intersection points. A quadratic after substitution can give 0, 1, or 2 solutions — matching 0, 1, or 2 intersection points.", "Та же идея подстановки работает: выразите y (или x) из одного уравнения, подставьте в другое и решите полученное уравнение. Число действительных решений равно числу точек пересечения. После подстановки может получиться квадратное уравнение с 0, 1 или 2 решениями — как 0, 1 или 2 точки пересечения."),
        formulas: ["y = line  → substitute into curve", "Number of solutions = number of intersections"],
      },
      {
        heading: text("Parabola–line and circle–line patterns", "Паттерны «парабола–прямая» и «окружность–прямая»"),
        body: text("A line can meet a parabola at most twice, so a line–parabola system has at most two solutions. A line can meet a circle at most twice as well. Discriminant zero means the line is tangent (one solution). Negative discriminant means no real intersection even though the algebra may look fine.", "Прямая пересекает параболу не более чем в двух точках, поэтому система «прямая–парабола» имеет не более двух решений. Прямая пересекает окружность тоже не более чем в двух точках. Нулевой дискриминант означает касание (одно решение). Отрицательный дискриминант означает отсутствие действительных пересечений."),
        formulas: ["x² + y² = r²  (circle)", "discriminant = 0 → tangent"],
      },
    ],
    examples: [
      {
        prompt: text("Solve y = x² and y = 2x + 3.", "Решите систему y = x² и y = 2x + 3."),
        steps: [
          text("Substitute: x² = 2x + 3, so x² − 2x − 3 = 0.", "Подставьте: x² = 2x + 3, то есть x² − 2x − 3 = 0."),
          text("Factor: (x − 3)(x + 1) = 0, so x = 3 or x = −1.", "Разложите: (x − 3)(x + 1) = 0, значит x = 3 или x = −1."),
          text("Find y: for x = 3, y = 9; for x = −1, y = 1.", "Найдите y: при x = 3, y = 9; при x = −1, y = 1."),
        ],
        answer: text("Solutions: (3, 9) and (−1, 1).", "Решения: (3, 9) и (−1, 1)."),
        desmos: ["y = x^2", "y = 2x + 3"],
      },
      {
        prompt: text("Solve x² + y² = 25 and y = x + 1.", "Решите систему x² + y² = 25 и y = x + 1."),
        steps: [
          text("Substitute: x² + (x + 1)² = 25, so 2x² + 2x − 24 = 0, or x² + x − 12 = 0.", "Подставьте: x² + (x + 1)² = 25, то есть 2x² + 2x − 24 = 0, или x² + x − 12 = 0."),
          text("Factor: (x + 4)(x − 3) = 0, so x = 3 or x = −4.", "Разложите: (x + 4)(x − 3) = 0, значит x = 3 или x = −4."),
          text("Then y = 4 for x = 3, and y = −3 for x = −4.", "Тогда y = 4 при x = 3 и y = −3 при x = −4."),
        ],
        answer: text("Solutions: (3, 4) and (−4, −3).", "Решения: (3, 4) и (−4, −3)."),
        desmos: ["x^2 + y^2 = 25", "y = x + 1"],
      },
    ],
    desmos: [
      {
        title: text("See the intersections", "Наблюдайте пересечения"),
        goal: text("Graph both equations and read the intersection points, then confirm algebraically.", "Постройте оба уравнения, прочитайте точки пересечения и подтвердите алгебраически."),
        steps: [
          {
            title: text("Parabola and line", "Парабола и прямая"),
            expressions: ["y = x^2", "y = 2x + 3"],
          },
          {
            title: text("Mark solutions", "Отметьте решения"),
            expressions: ["(3,9)", "(-1,1)"],
            note: text("Each marked point lies on both graphs.", "Каждая отмеченная точка лежит на обоих графиках."),
          },
        ],
        speed: text("About 1 minute.", "Около 1 минуты."),
        caution: text("Desmos gives a picture, not a proof — still solve algebraically on the SAT.", "Desmos даёт картинку, а не доказательство — на SAT всё равно решайте алгебраически."),
      },
      {
        title: text("Circle and line intersections", "Пересечения окружности и прямой"),
        goal: text("Check a circle–line system graphically before and after solving.", "Проверьте систему «окружность–прямая» графически до и после решения."),
        steps: [
          {
            title: text("Circle and line", "Окружность и прямая"),
            expressions: ["x^2 + y^2 = 25", "y = x + 1"],
          },
          {
            title: text("Solutions", "Решения"),
            expressions: ["(3,4)", "(-4,-3)"],
          },
        ],
        speed: text("About 1 minute.", "Около 1 минуты."),
        caution: text("Two intersection points mean two solutions; do not report x and y separately.", "Две точки пересечения означают два решения; не записывайте x и y раздельно."),
      },
    ],
    strategy: [
      text("Substitute the linear equation into the nonlinear one — it keeps the degree low.", "Подставляйте линейное уравнение в нелинейное — это сохраняет низкую степень."),
      text("After solving for x, always compute the paired y-value.", "После нахождения x всегда вычисляйте парное значение y."),
      text("Use a quick graph check to decide whether 0, 1, or 2 solutions make sense.", "Быстрая графическая проверка помогает понять, разумно ли 0, 1 или 2 решения."),
    ],
    pitfalls: [
      text("Reporting only x-values as solutions — a solution is an ordered pair.", "Запись только значений x как решений — решение есть упорядоченная пара."),
      text("Dividing by a variable (like x) without checking x = 0 as a possible solution.", "Деление на переменную (например, x) без проверки возможности x = 0."),
    ],
    practice: [
      {
        id: "m-adv-nonlinear-systems-p1",
        prompt: text("Solve y = x² − 1 and y = x + 1.", "Решите систему y = x² − 1 и y = x + 1."),
        options: [
          text("(2, 3) and (−1, 0)", "(2, 3) и (−1, 0)"),
          text("(1, 2) and (0, 1)", "(1, 2) и (0, 1)"),
          text("(−2, −1) and (1, 2)", "(−2, −1) и (1, 2)"),
          text("No real solutions", "Нет действительных решений"),
        ],
        correctIndex: 0,
        explanation: text("x² − 1 = x + 1 gives x² − x − 2 = 0, so x = 2 or −1, giving (2, 3) and (−1, 0).", "x² − 1 = x + 1 даёт x² − x − 2 = 0, значит x = 2 или −1, что даёт (2, 3) и (−1, 0)."),
        difficulty: "medium",
        desmos: ["y = x^2 - 1", "y = x + 1"],
      },
      {
        id: "m-adv-nonlinear-systems-p2",
        prompt: text("How many real solutions does y = x² + 2 and y = 0 have?", "Сколько действительных решений имеет система y = x² + 2 и y = 0?"),
        options: [
          text("0", "0"),
          text("1", "1"),
          text("2", "2"),
          text("Infinite", "Бесконечно много"),
        ],
        correctIndex: 0,
        explanation: text("x² + 2 = 0 has no real x, and the parabola never touches y = 0.", "Уравнение x² + 2 = 0 не имеет действительных корней, и парабола не касается y = 0."),
        difficulty: "easy",
        desmos: ["y = x^2 + 2", "y = 0"],
      },
      {
        id: "m-adv-nonlinear-systems-p3",
        prompt: text("Solve x² + y² = 1 and y = 0.", "Решите систему x² + y² = 1 и y = 0."),
        options: [
          text("(1, 0) and (−1, 0)", "(1, 0) и (−1, 0)"),
          text("(0, 1) and (0, −1)", "(0, 1) и (0, −1)"),
          text("(0, 0) only", "Только (0, 0)"),
          text("No solutions", "Нет решений"),
        ],
        correctIndex: 0,
        explanation: text("x² = 1 gives x = ±1, so the points are (1, 0) and (−1, 0).", "x² = 1 даёт x = ±1, поэтому точки — (1, 0) и (−1, 0)."),
        difficulty: "easy",
        desmos: ["x^2 + y^2 = 1", "y = 0"],
      },
      {
        id: "m-adv-nonlinear-systems-p4",
        prompt: text("A line and a parabola meet at exactly one point. What does that mean algebraically?", "Прямая и парабола пересекаются ровно в одной точке. Что это означает алгебраически?"),
        options: [
          text("The substituted quadratic has discriminant 0", "Подставленное квадратное уравнение имеет дискриминант 0"),
          text("The substituted quadratic has discriminant > 0", "Подставленное квадратное уравнение имеет дискриминант > 0"),
          text("The substituted quadratic has discriminant < 0", "Подставленное квадратное уравнение имеет дискриминант < 0"),
          text("The line must be vertical", "Прямая должна быть вертикальной"),
        ],
        correctIndex: 0,
        explanation: text("One intersection point means a repeated root, i.e. discriminant 0 (the line is tangent).", "Одна точка пересечения означает кратный корень, то есть дискриминант 0 (прямая касается параболы)."),
        difficulty: "hard",
      },
    ],
  },
  {
    id: "m-adv-functions",
    section: "math",
    domainId: "advanced",
    order: 12,
    title: text("Functions: notation, domain, transformations", "Функции: notation, domain, сдвиги"),
    subtitle: text("Evaluate f, respect the domain, and shift graphs with confidence.", "Вычисляйте f, уважайте область определения и уверенно сдвигайте графики."),
    minutes: 13,
    tags: ["functions", "domain", "transformations", "SAT"],
    objectives: [
      text("Evaluate f(a) and interpret function notation.", "Вычисляйте f(a) и правильно интерпретируйте запись функции."),
      text("Find the domain of rational, radical, and log-free SAT functions.", "Находите область определения рациональных и корневых функций SAT."),
      text("Describe vertical and horizontal shifts and reflections.", "Описывайте вертикальные и горизонтальные сдвиги и отражения."),
    ],
    theory: [
      {
        heading: text("Notation and evaluation", "Запись и вычисление"),
        body: text("f(x) means: put x into the rule. f(3) is not 3 times f; it is the output when the input is 3. For composite lookups like f(g(2)), work from the inside out. On the SAT, careful substitution beats cleverness.", "f(x) означает: подставьте x в правило. f(3) — это не 3 умножить на f; это значение при входе 3. Для вложенных выражений вроде f(g(2)) работайте изнутри наружу. На SAT аккуратная подстановка важнее хитрости."),
        formulas: ["f(a) = output when x = a", "f(g(a)): compute g(a) first, then f"],
      },
      {
        heading: text("Domain and transformations", "Область определения и сдвиги"),
        body: text("Exclude values that make a denominator zero or a square root of a negative. For y = f(x), adding k moves up, subtracting k moves down; f(x − h) moves right by h, f(x + h) moves left by h. Multiplying by −1 reflects across the x-axis. Horizontal shifts are counterintuitive — the sign inside flips.", "Исключайте значения, дающие ноль в знаменателе или отрицательное под корнем. Для y = f(x): добавление k сдвигает вверх, вычитание k — вниз; f(x − h) сдвигает вправо на h, f(x + h) — влево на h. Умножение на −1 отражает через ось x. Горизонтальные сдвиги контринтуитивны — знак внутри меняется наоборот."),
        formulas: ["g(x) = f(x - h) + k  (right h, up k)", "Domain: denominator ≠ 0, radicand ≥ 0"],
      },
    ],
    examples: [
      {
        prompt: text("If f(x) = 2x² − 3x + 1, find f(−2).", "Если f(x) = 2x² − 3x + 1, найдите f(−2)."),
        steps: [
          text("Replace every x with −2: 2(−2)² − 3(−2) + 1.", "Замените каждый x на −2: 2(−2)² − 3(−2) + 1."),
          text("Compute squares first: 2·4 + 6 + 1.", "Сначала квадраты: 2·4 + 6 + 1."),
          text("Add: 8 + 6 + 1 = 15.", "Сложите: 8 + 6 + 1 = 15."),
        ],
        answer: text("f(−2) = 15.", "f(−2) = 15."),
        desmos: ["f(x) = 2x^2 - 3x + 1"],
      },
      {
        prompt: text("If g(x) = f(x − 2) + 3, describe the shift from f to g.", "Если g(x) = f(x − 2) + 3, опишите сдвиг от f к g."),
        steps: [
          text("(x − 2) means shift right by 2.", "(x − 2) означает сдвиг вправо на 2."),
          text("+ 3 outside means shift up by 3.", "+ 3 снаружи означает сдвиг вверх на 3."),
          text("So every point (x, y) on f moves to (x + 2, y + 3) on g.", "Поэтому каждая точка (x, y) графика f переходит в (x + 2, y + 3) графика g."),
        ],
        answer: text("Right 2, up 3.", "Вправо на 2, вверх на 3."),
        desmos: ["y = x^2", "y = (x-2)^2 + 3"],
      },
    ],
    desmos: [
      {
        title: text("Evaluation sanity check", "Проверка вычисления на графике"),
        goal: text("Graph f and confirm a computed value like f(−2).", "Постройте график f и подтвердите вычисленное значение вроде f(−2)."),
        steps: [
          {
            title: text("Graph f", "Постройте f"),
            expressions: ["y = 2x^2 - 3x + 1"],
          },
          {
            title: text("Mark the point", "Отметьте точку"),
            expressions: ["(-2,15)"],
            note: text("The point should lie on the parabola.", "Точка должна лежать на параболе."),
          },
        ],
        speed: text("Under 1 minute.", "Меньше минуты."),
        caution: text("If the point misses the graph, recheck the substitution signs.", "Если точка не легла на график, перепроверьте знаки подстановки."),
      },
      {
        title: text("Shift f to g", "Сдвиг от f к g"),
        goal: text("Compare f and g = f(x − 2) + 3 to see the right-and-up move.", "Сравните f и g = f(x − 2) + 3, чтобы увидеть сдвиг вправо и вверх."),
        steps: [
          {
            title: text("Original and shifted", "Оригинал и сдвинутая"),
            expressions: ["y = x^2", "y = (x-2)^2 + 3"],
          },
        ],
        speed: text("About 1 minute.", "Около 1 минуты."),
        caution: text("Remember: f(x − 2) shifts right, not left.", "Помните: f(x − 2) сдвигает вправо, а не влево."),
      },
    ],
    strategy: [
      text("For f(a), mentally underline every x and replace it with a before computing.", "Для f(a) мысленно подчёркивайте каждый x и заменяйте его на a перед вычислением."),
      text("For domain questions, list the forbidden inputs first, then choose among options.", "Для вопросов об области определения сначала выпишите запрещённые входы, затем выбирайте вариант."),
      text("For transformations, name the shift in words before checking numbers.", "Для сдвигов сначала опишите сдвиг словами, затем проверяйте числа."),
    ],
    pitfalls: [
      text("Reading f(3) as 3·f — it is a single evaluation, not multiplication.", "Чтение f(3) как 3·f — это одно вычисление, а не умножение."),
      text("Horizontal shift sign: f(x + 2) moves left, not right.", "Знак горизонтального сдвига: f(x + 2) движется влево, а не вправо."),
    ],
    practice: [
      {
        id: "m-adv-functions-p1",
        prompt: text("If f(x) = x² − 4x, what is f(5)?", "Если f(x) = x² − 4x, чему равно f(5)?"),
        options: [
          text("5", "5"),
          text("25", "25"),
          text("−5", "−5"),
          text("45", "45"),
        ],
        correctIndex: 0,
        explanation: text("f(5) = 25 − 20 = 5.", "f(5) = 25 − 20 = 5."),
        difficulty: "easy",
        desmos: ["y = x^2 - 4x"],
      },
      {
        id: "m-adv-functions-p2",
        prompt: text("What is the domain of f(x) = 1/(x − 4)?", "Чему равна область определения функции f(x) = 1/(x − 4)?"),
        options: [
          text("All x ≠ 4", "Все x ≠ 4"),
          text("All x ≠ 0", "Все x ≠ 0"),
          text("x > 4", "x > 4"),
          text("All x", "Все x"),
        ],
        correctIndex: 0,
        explanation: text("The denominator cannot be zero, so x − 4 ≠ 0, i.e. x ≠ 4.", "Знаменатель не может быть нулём, поэтому x − 4 ≠ 0, то есть x ≠ 4."),
        difficulty: "easy",
      },
      {
        id: "m-adv-functions-p3",
        prompt: text("If h(x) = f(x + 3), how does the graph of h compare to f?", "Если h(x) = f(x + 3), как соотносится график h с графиком f?"),
        options: [
          text("Shifted left 3", "Сдвинут влево на 3"),
          text("Shifted right 3", "Сдвинут вправо на 3"),
          text("Shifted up 3", "Сдвинут вверх на 3"),
          text("Reflected over the x-axis", "Отражён через ось x"),
        ],
        correctIndex: 0,
        explanation: text("(x + 3) inside means the graph moves left 3.", "(x + 3) внутри означает сдвиг графика влево на 3."),
        difficulty: "medium",
        desmos: ["y = x^2", "y = (x+3)^2"],
      },
      {
        id: "m-adv-functions-p4",
        prompt: text("What is the domain of f(x) = √(x + 5)?", "Чему равна область определения функции f(x) = √(x + 5)?"),
        options: [
          text("x ≥ −5", "x ≥ −5"),
          text("x > −5", "x > −5"),
          text("x ≤ 5", "x ≤ 5"),
          text("x ≥ 5", "x ≥ 5"),
        ],
        correctIndex: 0,
        explanation: text("The radicand must be ≥ 0: x + 5 ≥ 0, so x ≥ −5.", "Подкоренное выражение должно быть ≥ 0: x + 5 ≥ 0, значит x ≥ −5."),
        difficulty: "medium",
        desmos: ["y = sqrt(x+5)"],
      },
    ],
  },
  {
    id: "m-adv-exponential",
    section: "math",
    domainId: "advanced",
    order: 13,
    title: text("Exponential growth and decay", "Экспоненциальный рост и распад"),
    subtitle: text("Model percent change with y = a·bˣ.", "Моделируйте процентные изменения формулой y = a·bˣ."),
    minutes: 14,
    tags: ["exponential", "growth", "decay", "SAT"],
    objectives: [
      text("Interpret y = a·bˣ with percent growth or decay.", "Интерпретируйте y = a·bˣ как рост или распад в процентах."),
      text("Find doubling time and half-life from the rate.", "Находите время удвоения и время полураспада по скорости."),
      text("Predict values after several periods.", "Предсказывайте значения через несколько периодов."),
    ],
    theory: [
      {
        heading: text("Growth and decay in one formula", "Рост и распад в одной формуле"),
        body: text("In y = a·bˣ, a is the starting value and b is the multiplier per period. Growth of r% gives b = 1 + r; decay of r% gives b = 1 − r. After n periods the value is a·bⁿ. b > 1 means growth; 0 < b < 1 means decay.", "В формуле y = a·bˣ, a — начальное значение, а b — множитель за период. Рост на r% даёт b = 1 + r; распад на r% даёт b = 1 − r. Через n периодов значение равно a·bⁿ. При b > 1 — рост; при 0 < b < 1 — распад."),
        formulas: ["y = a·bˣ", "growth: b = 1 + r", "decay: b = 1 - r", "after n: a·bⁿ"],
      },
      {
        heading: text("Doubling and half-life", "Удвоение и полураспад"),
        body: text("Constant percent change means equal ratios: doubling every period means multiplying by 2 each time; halving means multiplying by 1/2. To find the time for doubling (or halving) given a rate, solve a·bᵗ = 2a (or a/2) — the a cancels, leaving bᵗ = 2 (or 1/2). The SAT often asks for the value after a given number of steps, so repeated multiplication is enough.", "Постоянное процентное изменение означает равные отношения: удвоение каждый период означает умножение на 2 каждый раз; деление пополам — умножение на 1/2. Чтобы найти время удвоения (или полураспада) при заданной скорости, решайте a·bᵗ = 2a (или a/2) — a сокращается, остаётся bᵗ = 2 (или 1/2). На SAT часто спрашивают значение через заданное число шагов, поэтому достаточно многократного умножения."),
        formulas: ["bᵗ = 2  (doubling)", "bᵗ = 1/2  (half-life)"],
      },
    ],
    examples: [
      {
        prompt: text("A population of 1200 grows 8% per year. What is it after 3 years?", "Население 1200 растёт на 8% в год. Чему оно будет равно через 3 года?"),
        steps: [
          text("Multiplier b = 1 + 0.08 = 1.08.", "Множитель b = 1 + 0.08 = 1.08."),
          text("Model: y = 1200·(1.08)ˣ.", "Модель: y = 1200·(1.08)ˣ."),
          text("After 3 years: 1200·(1.08)³ ≈ 1200·1.2597 ≈ 1512.", "Через 3 года: 1200·(1.08)³ ≈ 1200·1.2597 ≈ 1512."),
        ],
        answer: text("About 1512.", "Около 1512."),
        desmos: ["y = 1200*1.08^x"],
      },
      {
        prompt: text("A drug decays 15% per hour from 200 mg. How much remains after 2 hours?", "Препарат распадается на 15% в час, начальная доза 200 мг. Сколько останется через 2 часа?"),
        steps: [
          text("Multiplier b = 1 − 0.15 = 0.85.", "Множитель b = 1 − 0.15 = 0.85."),
          text("Model: y = 200·(0.85)ˣ.", "Модель: y = 200·(0.85)ˣ."),
          text("After 2 hours: 200·(0.85)² = 200·0.7225 = 144.5 mg.", "Через 2 часа: 200·(0.85)² = 200·0.7225 = 144.5 мг."),
        ],
        answer: text("144.5 mg.", "144.5 мг."),
        desmos: ["y = 200*0.85^x"],
      },
    ],
    desmos: [
      {
        title: text("Growth curve in action", "Кривая роста в действии"),
        goal: text("Graph growth and decay side by side and read values at whole periods.", "Постройте рядом графики роста и распада и прочитайте значения в целые периоды."),
        steps: [
          {
            title: text("Growth and decay", "Рост и распад"),
            expressions: ["y = 1200*1.08^x", "y = 200*0.85^x"],
            note: text("Growth bends up; decay bends toward zero.", "Рост загибается вверх; распад стремится к нулю."),
          },
          {
            title: text("Whole-period points", "Точки целых периодов"),
            expressions: ["(3, 1200*1.08^3)", "(2, 200*0.85^2)"],
          },
        ],
        speed: text("About 1 minute.", "Около 1 минуты."),
        caution: text("Desmos table values use the same formula; the SAT does not require a calculator for small exponents.", "Табличные значения Desmos используют ту же формулу; на SAT калькулятор для малых степеней не обязателен."),
      },
      {
        title: text("What b does to the graph", "Как b влияет на график"),
        goal: text("Compare b = 2, b = 1.5, and b = 0.5 from the same start.", "Сравните b = 2, b = 1.5 и b = 0.5 при одном старте."),
        steps: [
          {
            title: text("Different multipliers", "Разные множители"),
            expressions: ["y = 100*2^x", "y = 100*1.5^x", "y = 100*0.5^x"],
          },
        ],
        speed: text("About 1 minute.", "Около 1 минуты."),
        caution: text("Do not confuse the starting value a with the multiplier b.", "Не путайте начальное значение a с множителем b."),
      },
    ],
    strategy: [
      text("Translate percent to multiplier immediately: 8% growth → 1.08, 15% decay → 0.85.", "Сразу переводите проценты в множитель: рост 8% → 1.08, распад 15% → 0.85."),
      text("Track the exponent: it counts periods, and it must be an integer for whole periods.", "Следите за показателем степени: он считает периоды и должен быть целым для целых периодов."),
      text("Check with a one-step estimate before computing the exact power.", "Проверяйте одношаговой оценкой перед точным вычислением степени."),
    ],
    pitfalls: [
      text("Using 0.08 instead of 1.08 as the multiplier (forgetting to add 1).", "Использование 0.08 вместо 1.08 в качестве множителя (забыли добавить 1)."),
      text("Using 1.15 for decay instead of 0.85 — decay subtracts.", "Использование 1.15 для распада вместо 0.85 — распад вычитает."),
    ],
    practice: [
      {
        id: "m-adv-exponential-p1",
        prompt: text("A value of 500 grows 10% each period. What is it after 2 periods?", "Значение 500 растёт на 10% каждый период. Чему оно будет равно через 2 периода?"),
        options: [
          text("605", "605"),
          text("600", "600"),
          text("550", "550"),
          text("510", "510"),
        ],
        correctIndex: 0,
        explanation: text("500·(1.10)² = 500·1.21 = 605.", "500·(1.10)² = 500·1.21 = 605."),
        difficulty: "easy",
        desmos: ["y = 500*1.10^x"],
      },
      {
        id: "m-adv-exponential-p2",
        prompt: text("A value decays 20% each period from 1000. What is it after 1 period?", "Значение распадается на 20% каждый период от 1000. Чему оно будет равно через 1 период?"),
        options: [
          text("800", "800"),
          text("1200", "1200"),
          text("980", "980"),
          text("200", "200"),
        ],
        correctIndex: 0,
        explanation: text("Multiplier is 0.80, so 1000·0.80 = 800.", "Множитель равен 0.80, поэтому 1000·0.80 = 800."),
        difficulty: "easy",
        desmos: ["y = 1000*0.80^x"],
      },
      {
        id: "m-adv-exponential-p3",
        prompt: text("Which model shows 5% growth per year for a starting value of 800?", "Какая модель показывает рост 5% в год при начальном значении 800?"),
        options: [
          text("y = 800·(1.05)ˣ", "y = 800·(1.05)ˣ"),
          text("y = 800·(0.95)ˣ", "y = 800·(0.95)ˣ"),
          text("y = 800·(1.5)ˣ", "y = 800·(1.5)ˣ"),
          text("y = 800·5ˣ", "y = 800·5ˣ"),
        ],
        correctIndex: 0,
        explanation: text("Growth of 5% means multiplier 1.05; the model is 800·(1.05)ˣ.", "Рост 5% означает множитель 1.05; модель — 800·(1.05)ˣ."),
        difficulty: "medium",
      },
      {
        id: "m-adv-exponential-p4",
        prompt: text("A quantity halves every period. If it starts at 640, what is it after 3 periods?", "Величина уменьшается вдвое каждый период. Если она начинается со 640, чему будет равна через 3 периода?"),
        options: [
          text("80", "80"),
          text("160", "160"),
          text("320", "320"),
          text("40", "40"),
        ],
        correctIndex: 0,
        explanation: text("640·(1/2)³ = 640/8 = 80.", "640·(1/2)³ = 640/8 = 80."),
        difficulty: "medium",
        desmos: ["y = 640*(0.5)^x"],
      },
    ],
  },
  {
    id: "m-adv-rational",
    section: "math",
    domainId: "advanced",
    order: 14,
    title: text("Rational expressions and equations", "Рациональные выражения и уравнения"),
    subtitle: text("Simplify fractions with variables and solve rational equations safely.", "Упрощайте дроби с переменными и безопасно решайте рациональные уравнения."),
    minutes: 15,
    tags: ["rational", "fractions", "excluded values", "SAT"],
    objectives: [
      text("Simplify rational expressions by factoring and cancelling.", "Упрощайте рациональные выражения факторизацией и сокращением."),
      text("State excluded values from denominators.", "Находите запрещённые значения из знаменателей."),
      text("Solve rational equations with excluded-value checks.", "Решайте рациональные уравнения с проверкой запрещённых значений."),
    ],
    theory: [
      {
        heading: text("Simplify like fractions, with a memory", "Упрощайте как дроби, но помните об ограничениях"),
        body: text("Factor numerator and denominator first, then cancel common factors. Cancelling does not erase the original restriction: if x − 3 was in the denominator, x ≠ 3 still holds even after simplification. The SAT loves the trap of a simplified expression that looks defined everywhere.", "Сначала факторизуйте числитель и знаменатель, затем сокращайте общие множители. Сокращение не стирает исходное ограничение: если x − 3 был в знаменателе, условие x ≠ 3 сохраняется даже после упрощения. На SAT любят ловушку — упрощённое выражение, которое выглядит определённым везде."),
        formulas: ["(x²-9)/(x-3) = x+3, x ≠ 3", "excluded: denominator = 0"],
      },
      {
        heading: text("Solving rational equations", "Решение рациональных уравнений"),
        body: text("Clear denominators by multiplying by the least common multiple, solve the resulting polynomial equation, then reject any root that makes an original denominator zero. Clearing fractions is efficient, but every root must be checked in the original equation — a root that makes a denominator zero is extraneous.", "Убирайте знаменатели, умножая на наименьшее общее кратное, решайте полученное многочленное уравнение, затем отбрасывайте корни, дающие ноль в исходном знаменателе. Умножение на знаменатели удобно, но каждый корень нужно проверять в исходном уравнении — корень, дающий ноль в знаменателе, является посторонним."),
        formulas: ["multiply by LCM → solve → check denominators"],
      },
    ],
    examples: [
      {
        prompt: text("Simplify (x² − 9)/(x − 3) and state the excluded value.", "Упростите (x² − 9)/(x − 3) и укажите запрещённое значение."),
        steps: [
          text("Factor the numerator: (x − 3)(x + 3).", "Разложите числитель: (x − 3)(x + 3)."),
          text("Cancel (x − 3): the result is x + 3.", "Сократите (x − 3): результат равен x + 3."),
          text("Excluded value from the original denominator: x ≠ 3.", "Запрещённое значение из исходного знаменателя: x ≠ 3."),
        ],
        answer: text("x + 3, with x ≠ 3.", "x + 3, при x ≠ 3."),
        desmos: ["y = (x^2-9)/(x-3)", "y = x+3"],
      },
      {
        prompt: text("Solve x/(x − 2) = 3.", "Решите x/(x − 2) = 3."),
        steps: [
          text("Multiply both sides by (x − 2): x = 3(x − 2).", "Умножьте обе части на (x − 2): x = 3(x − 2)."),
          text("Solve: x = 3x − 6, so 2x = 6 and x = 3.", "Решите: x = 3x − 6, значит 2x = 6 и x = 3."),
          text("Check: x = 3 does not make the denominator zero, and 3/1 = 3 holds.", "Проверка: x = 3 не даёт ноль в знаменателе, и 3/1 = 3 выполняется."),
        ],
        answer: text("x = 3.", "x = 3."),
        desmos: ["y = x/(x-2)", "y = 3"],
      },
    ],
    desmos: [
      {
        title: text("Hole vs. simplification", "Дырка против упрощения"),
        goal: text("Graph (x² − 9)/(x − 3) and its simplification y = x + 3 to see the removed point.", "Постройте график (x² − 9)/(x − 3) и его упрощение y = x + 3, чтобы увидеть выколотую точку."),
        steps: [
          {
            title: text("Original and simplified", "Исходное и упрощённое"),
            expressions: ["y = (x^2-9)/(x-3)", "y = x+3"],
            note: text("The original has a hole at x = 3.", "В исходном графике есть дырка при x = 3."),
          },
          {
            title: text("Hole location", "Положение дырки"),
            expressions: ["(3,6)"],
          },
        ],
        speed: text("About 1 minute.", "Около 1 минуты."),
        caution: text("The simplified line looks complete, but the original is still undefined at x = 3.", "Упрощённая прямая выглядит полной, но исходное выражение всё ещё не определено при x = 3."),
      },
      {
        title: text("Rational equation intersection", "Пересечение при решении рационального уравнения"),
        goal: text("Solve x/(x − 2) = 3 by intersecting y = x/(x − 2) with y = 3.", "Решите x/(x − 2) = 3, найдя пересечение y = x/(x − 2) с y = 3."),
        steps: [
          {
            title: text("Curve and line", "Кривая и прямая"),
            expressions: ["y = x/(x-2)", "y = 3"],
          },
          {
            title: text("Solution point", "Точка решения"),
            expressions: ["(3,3)"],
          },
        ],
        speed: text("About 1 minute.", "Около 1 минуты."),
        caution: text("The vertical asymptote at x = 2 is where the expression is undefined.", "Вертикальная асимптота при x = 2 — это место, где выражение не определено."),
      },
    ],
    strategy: [
      text("Factor before cancelling — unfactored cancellation is the top error.", "Сначала факторизуйте, затем сокращайте — сокращение без факторизации главная ошибка."),
      text("Write excluded values first; they answer many trap options.", "Записывайте запрещённые значения первыми; они помогают отвергнуть ловушки."),
      text("After clearing denominators, plug each root back into the original equation.", "После уборки знаменателей подставляйте каждый корень в исходное уравнение."),
    ],
    pitfalls: [
      text("Cancelling before factoring: (x² − 9)/(x − 3) cannot be shortened term-by-term.", "Сокращение раньше факторизации: в (x² − 9)/(x − 3) нельзя сокращать почленно."),
      text("Accepting a root that makes a denominator zero — it is extraneous, not a solution.", "Принятие корня, дающего ноль в знаменателе, — он посторонний, а не решение."),
    ],
    practice: [
      {
        id: "m-adv-rational-p1",
        prompt: text("Simplify (x² − 4)/(x + 2).", "Упростите (x² − 4)/(x + 2)."),
        options: [
          text("x − 2, with x ≠ −2", "x − 2, при x ≠ −2"),
          text("x + 2", "x + 2"),
          text("x − 2", "x − 2"),
          text("x + 2, with x ≠ 2", "x + 2, при x ≠ 2"),
        ],
        correctIndex: 0,
        explanation: text("(x − 2)(x + 2)/(x + 2) = x − 2, and the original requires x ≠ −2.", "(x − 2)(x + 2)/(x + 2) = x − 2, а исходное требует x ≠ −2."),
        difficulty: "easy",
        desmos: ["y = (x^2-4)/(x+2)"],
      },
      {
        id: "m-adv-rational-p2",
        prompt: text("What is the excluded value of (x + 1)/(x² − 5x + 6)?", "Чему равно запрещённое значение выражения (x + 1)/(x² − 5x + 6)?"),
        options: [
          text("x ≠ 2 and x ≠ 3", "x ≠ 2 и x ≠ 3"),
          text("x ≠ −1", "x ≠ −1"),
          text("x ≠ 5", "x ≠ 5"),
          text("x ≠ 6", "x ≠ 6"),
        ],
        correctIndex: 0,
        explanation: text("x² − 5x + 6 = (x − 2)(x − 3), so the denominator is zero at x = 2 and x = 3.", "x² − 5x + 6 = (x − 2)(x − 3), поэтому знаменатель равен нулю при x = 2 и x = 3."),
        difficulty: "medium",
      },
      {
        id: "m-adv-rational-p3",
        prompt: text("Solve 2/(x − 1) = 4.", "Решите 2/(x − 1) = 4."),
        options: [
          text("x = 3/2", "x = 3/2"),
          text("x = 1/2", "x = 1/2"),
          text("x = 2", "x = 2"),
          text("x = 1", "x = 1"),
        ],
        correctIndex: 0,
        explanation: text("2 = 4(x − 1) gives x − 1 = 1/2, so x = 3/2, which is allowed.", "2 = 4(x − 1) даёт x − 1 = 1/2, значит x = 3/2, что допустимо."),
        difficulty: "medium",
        desmos: ["y = 2/(x-1)", "y = 4"],
      },
      {
        id: "m-adv-rational-p4",
        prompt: text("Solve x/(x − 3) = 3/(x − 3).", "Решите x/(x − 3) = 3/(x − 3)."),
        options: [
          text("x = 3 is extraneous; no solution", "x = 3 является посторонним; решений нет"),
          text("x = 3", "x = 3"),
          text("x = 1", "x = 1"),
          text("x = −1", "x = −1"),
        ],
        correctIndex: 0,
        explanation: text("Cross-multiplication gives x = 3, but x = 3 makes the denominator zero, so there is no solution.", "Перекрёстное умножение даёт x = 3, но x = 3 даёт ноль в знаменателе, поэтому решений нет."),
        difficulty: "hard",
      },
    ],
  },
  {
    id: "m-adv-radicals",
    section: "math",
    domainId: "advanced",
    order: 15,
    title: text("Radicals and radical equations", "Корни и уравнения с корнями"),
    subtitle: text("Use exponents and isolation to solve radical equations without extraneous surprises.", "Используйте степени и изоляцию корня, чтобы решать уравнения с корнями без посторонних решений."),
    minutes: 13,
    tags: ["radicals", "exponents", "extraneous", "SAT"],
    objectives: [
      text("Simplify radical expressions using exponent rules.", "Упрощайте выражения с корнями с помощью правил степеней."),
      text("Solve equations containing square roots by isolation and squaring.", "Решайте уравнения с квадратными корнями изоляцией и возведением в квадрат."),
      text("Check for extraneous roots.", "Проверяйте посторонние корни."),
    ],
    theory: [
      {
        heading: text("Roots as exponents", "Корни как степени"),
        body: text("√x means x to the 1/2 power; ∛x means x to the 1/3 power. The rules x^m·x^n = x^(m+n) and (x^m)^n = x^(mn) still apply. Simplifying radicals is really factoring: pull out perfect squares from under √( ). On the SAT, keep the base nonnegative where the root is even.", "√x означает x в степени 1/2; ∛x означает x в степени 1/3. Правила x^m·x^n = x^(m+n) и (x^m)^n = x^(mn) по-прежнему действуют. Упрощение корней — это фактически факторизация: выносите полные квадраты из-под √. На SAT следите, чтобы основание было неотрицательным там, где корень чётный."),
        formulas: ["√x = x^(1/2)", "∛x = x^(1/3)", "√(a²b) = a√b for a ≥ 0"],
      },
      {
        heading: text("Solving radical equations", "Решение уравнений с корнями"),
        body: text("Isolate the radical on one side, then raise both sides to the power that removes it (square for a square root). This can create extraneous roots — candidates that satisfy the squared equation but not the original. Every candidate must be checked by substitution into the original equation.", "Изолируйте корень на одной стороне, затем возведите обе части в степень, убирающую корень (квадрат для квадратного корня). Это может создать посторонние корни — кандидаты, удовлетворяющие возведённому в квадрат уравнению, но не исходному. Каждого кандидата проверяйте подстановкой в исходное уравнение."),
        formulas: ["isolate √ · → square both sides → check"],
      },
    ],
    examples: [
      {
        prompt: text("Solve √(x + 5) = 3.", "Решите √(x + 5) = 3."),
        steps: [
          text("Square both sides: x + 5 = 9.", "Возведите обе части в квадрат: x + 5 = 9."),
          text("Solve: x = 4.", "Решите: x = 4."),
          text("Check: √(4 + 5) = √9 = 3, correct.", "Проверка: √(4 + 5) = √9 = 3, верно."),
        ],
        answer: text("x = 4.", "x = 4."),
        desmos: ["y = sqrt(x+5)", "y = 3"],
      },
      {
        prompt: text("Simplify √(72).", "Упростите √(72)."),
        steps: [
          text("Factor 72 = 36·2.", "Разложите 72 = 36·2."),
          text("Take the square root of 36: 6.", "Извлеките квадратный корень из 36: 6."),
          text("So √(72) = 6√2.", "Получаем √(72) = 6√2."),
        ],
        answer: text("6√2.", "6√2."),
        desmos: ["y = 6*sqrt(2)"],
      },
    ],
    desmos: [
      {
        title: text("Radical meets horizontal line", "Корень пересекает горизонтальную прямую"),
        goal: text("Solve √(x + 5) = 3 by intersecting y = √(x + 5) with y = 3.", "Решите √(x + 5) = 3, найдя пересечение y = √(x + 5) с y = 3."),
        steps: [
          {
            title: text("Curve and line", "Кривая и прямая"),
            expressions: ["y = sqrt(x+5)", "y = 3"],
          },
          {
            title: text("Intersection", "Пересечение"),
            expressions: ["(4,3)"],
            note: text("The x-coordinate is the solution.", "Абсцисса — это решение."),
          },
        ],
        speed: text("Under 1 minute.", "Меньше минуты."),
        caution: text("The graph starts at x = −5; left of that the radical is undefined.", "График начинается при x = −5; левее этого корень не определён."),
      },
      {
        title: text("Extraneous root detector", "Детектор постороннего корня"),
        goal: text("Show why √(x) = −1 has no solution even though squaring gives x = 1.", "Покажите, почему у √(x) = −1 нет решения, хотя возведение в квадрат даёт x = 1."),
        steps: [
          {
            title: text("Radical graph", "График корня"),
            expressions: ["y = sqrt(x)"],
            note: text("The radical is never negative.", "Корень никогда не бывает отрицательным."),
          },
          {
            title: text("Target line", "Целевая прямая"),
            expressions: ["y = -1"],
          },
        ],
        speed: text("About 1 minute.", "Около 1 минуты."),
        caution: text("Always plug candidates back; squaring can invent roots.", "Всегда проверяйте кандидатов подстановкой; возведение в квадрат может создавать корни."),
      },
    ],
    strategy: [
      text("Isolate the radical first — squaring is cleanest when only one root remains.", "Изолируйте корень сначала — возведение в квадрат проще, когда остаётся один корень."),
      text("After squaring, test every candidate in the original equation.", "После возведения в квадрат тестируйте каждого кандидата в исходном уравнении."),
      text("Simplify radicals by pulling out the largest perfect square.", "Упрощайте корни, вынося наибольший полный квадрат."),
    ],
    pitfalls: [
      text("Forgetting the check: a squared-equation root may not satisfy the original radical equation.", "Забытая проверка: корень квадратного уравнения может не удовлетворять исходному уравнению с корнем."),
      text("Distributing the root: √(a + b) is not √a + √b.", "Распределение корня: √(a + b) не равно √a + √b."),
    ],
    practice: [
      {
        id: "m-adv-radicals-p1",
        prompt: text("Simplify √50.", "Упростите √50."),
        options: [
          text("5√2", "5√2"),
          text("25√2", "25√2"),
          text("√25·√2", "√25·√2"),
          text("7√2", "7√2"),
        ],
        correctIndex: 0,
        explanation: text("50 = 25·2, so √50 = 5√2.", "50 = 25·2, поэтому √50 = 5√2."),
        difficulty: "easy",
        desmos: ["y = 5*sqrt(2)"],
      },
      {
        id: "m-adv-radicals-p2",
        prompt: text("Solve √(2x + 7) = 5.", "Решите √(2x + 7) = 5."),
        options: [
          text("x = 9", "x = 9"),
          text("x = 5", "x = 5"),
          text("x = 16", "x = 16"),
          text("x = 4", "x = 4"),
        ],
        correctIndex: 0,
        explanation: text("2x + 7 = 25 gives 2x = 18, so x = 9.", "2x + 7 = 25 даёт 2x = 18, значит x = 9."),
        difficulty: "medium",
        desmos: ["y = sqrt(2x+7)", "y = 5"],
      },
      {
        id: "m-adv-radicals-p3",
        prompt: text("Solve √(x − 3) = −2.", "Решите √(x − 3) = −2."),
        options: [
          text("No solution", "Нет решения"),
          text("x = 7", "x = 7"),
          text("x = 4", "x = 4"),
          text("x = 1", "x = 1"),
        ],
        correctIndex: 0,
        explanation: text("A square root cannot be negative, so there is no solution.", "Квадратный корень не может быть отрицательным, поэтому решения нет."),
        difficulty: "medium",
      },
      {
        id: "m-adv-radicals-p4",
        prompt: text("Which expression equals x^(3/2)?", "Какое выражение равно x^(3/2)?"),
        options: [
          text("(√x)³", "(√x)³"),
          text("√(x³) only if x ≥ 0 — same as (√x)³", "√(x³), только если x ≥ 0 — то же, что (√x)³"),
          text("3√x", "3√x"),
          text("x³/2", "x³/2"),
        ],
        correctIndex: 0,
        explanation: text("x^(3/2) = (x^(1/2))³ = (√x)³. The two forms (√x)³ and √(x³) coincide for x ≥ 0.", "x^(3/2) = (x^(1/2))³ = (√x)³. Две формы (√x)³ и √(x³) совпадают при x ≥ 0."),
        difficulty: "hard",
      },
    ],
  },
];
