import { localized as t, question, skill, unit, type LearnCourse } from "./sat-learn-base";

export const SAT_MATH_COURSE: LearnCourse = {
  id: "sat-math",
  title: t("SAT Math", "SAT Math"),
  shortTitle: t("Math", "Математика"),
  eyebrow: t("Digital SAT practice map", "Карта подготовки к Digital SAT"),
  summary: t(
    "Work through algebra, data, advanced math, geometry, and mixed drills with short lessons and quick checks.",
    "Проходи алгебру, анализ данных, продвинутую математику, геометрию и смешанные тренировки через короткие уроки и быстрые проверки."
  ),
  description: t(
    "The page is organized like a Khan-style SAT roadmap: clear units, visible skill tiles, and a direct jump from theory into practice.",
    "Страница собрана как SAT-карта в стиле Khan Academy: понятные юниты, заметные карточки навыков и прямой переход от теории к практике."
  ),
  banner: t(
    "Build accuracy first. Every skill gives you one clear idea, one worked example, and one quick check.",
    "Сначала собирай точность. Каждый навык даёт одну ясную идею, один разобранный пример и одну быструю проверку."
  ),
  practiceHint: t(
    "Best flow: one skill lesson -> one quick check -> one unit review.",
    "Лучший ритм: один урок по навыку -> одна быстрая проверка -> один разбор юнита."
  ),
  challengeText: t(
    "Use the mixed challenge unit when you want to practice choosing the fastest method under time.",
    "Переходи в смешанный сложный блок, когда хочешь тренировать выбор самого быстрого метода под таймером."
  ),
  units: [
    unit({
      id: "math-intro",
      order: 1,
      title: t("About Digital SAT Math", "О SAT Math"),
      summary: t(
        "Reset your timing, calculator, and pacing strategy before content practice.",
        "Перенастрой тайминг, калькулятор и стратегию темпа перед предметной практикой."
      ),
      note: t(
        "Use this unit as your calm starting point.",
        "Используй этот юнит как спокойную точку старта."
      ),
      skills: [],
      hasQuiz: false,
      hasUnitTest: false,
    }),
    unit({
      id: "math-algebra",
      order: 2,
      title: t("Foundations: Algebra", "Основы: алгебра"),
      summary: t(
        "Rebuild equation solving and linear thinking.",
        "Восстанови решение уравнений и линейное мышление."
      ),
      note: t(
        "Balance and interpretation matter more than memorized tricks.",
        "Баланс и интерпретация важнее, чем заученные трюки."
      ),
      hasQuiz: true,
      hasUnitTest: false,
      skills: [
        skill({
          id: "linear-equations",
          title: t("Solve linear equations", "Решение линейных уравнений"),
          shortTitle: t("Linear equations", "Линейные уравнения"),
          summary: t(
            "Keep both sides balanced and isolate the variable cleanly.",
            "Сохраняй баланс обеих частей и аккуратно изолируй переменную."
          ),
          lesson: t(
            "Combine like terms first, then undo operations in reverse order. If the variable appears on both sides, gather variable terms together before dividing.",
            "Сначала собери подобные, потом снимай операции в обратном порядке. Если переменная есть с обеих сторон, сначала собери все такие члены вместе."
          ),
          strategy: t(
            "Simplify -> move variable terms -> move constants -> divide -> check.",
            "Упростить -> собрать члены с переменной -> перенести числа -> разделить -> проверить."
          ),
          checkpoints: [
            t("Do the same operation to both sides.", "Каждое действие делай с обеими частями."),
            t("Watch negative signs in distribution.", "Следи за минусами при раскрытии скобок."),
            t("Substitute back if time allows.", "Если есть время, проверь подстановкой."),
          ],
          example: {
            prompt: t("Solve 3(x - 2) + 5 = 14.", "Реши 3(x - 2) + 5 = 14."),
            answer: t("x = 5", "x = 5"),
            explanation: t(
              "Expand: 3x - 6 + 5 = 14, so 3x - 1 = 14, then 3x = 15.",
              "Раскрываем: 3x - 6 + 5 = 14, получаем 3x - 1 = 14, затем 3x = 15."
            ),
          },
          quiz: [
            question({
              id: "linear-equations-q1",
              prompt: t(
                "What is the best next step after 4x + 7 = 19?",
                "Какой следующий шаг лучше всего после 4x + 7 = 19?"
              ),
              options: [
                t("Subtract 7 from both sides", "Вычесть 7 из обеих частей"),
                t("Add 4 to both sides", "Прибавить 4 к обеим частям"),
                t("Multiply both sides by 7", "Умножить обе части на 7"),
                t("Divide both sides by x", "Разделить обе части на x"),
              ],
              correctIndex: 0,
              explanation: t(
                "Remove the constant near the variable before dividing.",
                "Сначала убираем число рядом с переменной, а уже потом делим."
              ),
            }),
          ],
          status: "familiar",
          minutes: 12,
        }),
        skill({
          id: "linear-functions",
          title: t("Interpret linear functions", "Интерпретация линейных функций"),
          shortTitle: t("Linear functions", "Линейные функции"),
          summary: t(
            "Read slope as rate of change and intercept as starting value.",
            "Читай slope как скорость изменения, а intercept как стартовое значение."
          ),
          lesson: t(
            "Linear questions often hide inside stories, tables, or graphs. Your job is to connect the numbers to what they mean in context.",
            "Линейные задачи часто скрыты в текстах, таблицах или графиках. Нужно связать числа с их смыслом в контексте."
          ),
          strategy: t(
            "Find the rate, find the start, then connect both to the story.",
            "Найди скорость изменения, найди стартовое значение, затем свяжи их с сюжетом."
          ),
          checkpoints: [
            t("Slope answers: how much per 1 unit.", "Slope отвечает: насколько меняется при +1."),
            t("Intercept answers: what happens at input 0.", "Intercept отвечает: что происходит при x = 0."),
            t("Units matter on every interpretation question.", "Единицы измерения важны в каждой задаче."),
          ],
          example: {
            prompt: t(
              "A taxi charges y = 2x + 5 dollars. What does 5 mean?",
              "Такси стоит y = 2x + 5 долларов. Что означает 5?"
            ),
            answer: t("The starting fee is 5 dollars.", "Стартовый сбор равен 5 долларам."),
            explanation: t(
              "The intercept is the cost when x = 0, before any distance is traveled.",
              "Intercept показывает цену при x = 0, до начала поездки."
            ),
          },
          quiz: [
            question({
              id: "linear-functions-q1",
              prompt: t("In y = 7x + 12, what does 7 represent?", "В y = 7x + 12 что означает число 7?"),
              options: [
                t("The starting amount", "Стартовое значение"),
                t("The rate for each 1 unit of x", "Изменение при каждом +1 по x"),
                t("The maximum value", "Максимальное значение"),
                t("The x-intercept", "Пересечение с осью x"),
              ],
              correctIndex: 1,
              explanation: t(
                "The coefficient of x is the slope, so it tells the rate of change.",
                "Коэффициент при x - это slope, то есть скорость изменения."
              ),
            }),
          ],
          status: "attempted",
          minutes: 13,
        }),
      ],
    }),
    unit({
      id: "math-data",
      order: 3,
      title: t("Foundations: Problem solving and data", "Foundations: Problem solving and data"),
      summary: t(
        "Translate ratios, percentages, tables, and probability into quick decisions.",
        "Переводи отношения, проценты, таблицы и вероятность в быстрые решения."
      ),
      note: t(
        "Most mistakes here come from misreading the comparison.",
        "Большинство ошибок тут возникает из-за неверного чтения сравнения."
      ),
      hasQuiz: true,
      hasUnitTest: false,
      skills: [
        skill({
          id: "ratios-rates-percent",
          title: t("Use ratios, rates, and percentages", "Работа с отношениями, скоростями и процентами"),
          shortTitle: t("Ratios and percent", "Отношения и проценты"),
          summary: t(
            "Decide what is being compared before you calculate anything.",
            "Сначала пойми, что именно сравнивается, и только потом считай."
          ),
          lesson: t(
            "Words like per, increase, discount, and compared with tell you which ratio structure to build. Label the two quantities before using a formula.",
            "Слова per, increase, discount и compared with подсказывают структуру отношения. Сначала подпиши две величины, а потом применяй формулу."
          ),
          strategy: t(
            "Name the quantities -> write the fraction -> check the base.",
            "Назови величины -> запиши дробь -> проверь, что взято за базу."
          ),
          checkpoints: [
            t("Percent increase uses the original as the base.", "В percent increase базой служит исходное значение."),
            t("Rates compare different units.", "Rates сравнивают разные единицы."),
            t("Cross-multiply only after the setup is correct.", "Крест-накрест перемножай только после правильной схемы."),
          ],
          example: {
            prompt: t("A price drops from 80 to 60. What is the percent decrease?", "Цена падает с 80 до 60. Каков процент уменьшения?"),
            answer: t("25%", "25%"),
            explanation: t(
              "The change is 20, and 20/80 = 0.25.",
              "Изменение равно 20, а 20/80 = 0.25."
            ),
          },
          quiz: [
            question({
              id: "ratios-rates-percent-q1",
              prompt: t(
                "A class has 12 boys and 18 girls. What is the ratio of boys to all students?",
                "В классе 12 мальчиков и 18 девочек. Каково отношение мальчиков ко всем ученикам?"
              ),
              options: [t("2:5", "2:5"), t("12:18", "12:18"), t("3:5", "3:5"), t("2:3", "2:3")],
              correctIndex: 0,
              explanation: t(
                "There are 30 students total, so 12:30 simplifies to 2:5.",
                "Всего 30 учеников, поэтому 12:30 сокращается до 2:5."
              ),
            }),
          ],
          status: "proficient",
          minutes: 12,
        }),
        skill({
          id: "probability-data",
          title: t("Reason with probability and data", "Работа с вероятностью и данными"),
          shortTitle: t("Probability", "Вероятность"),
          summary: t(
            "Use favorable over total and separate independent from dependent events.",
            "Используй favorable over total и различай независимые и зависимые события."
          ),
          lesson: t(
            "Probability on the SAT is usually about structure. Ask what outcomes count, how many exist in total, and whether one event changes the next one.",
            "Вероятность на SAT обычно про структуру. Спроси себя, какие исходы подходят, сколько исходов всего и меняется ли второе событие после первого."
          ),
          strategy: t(
            "Count carefully, then decide whether to add or multiply.",
            "Сначала аккуратно посчитай варианты, потом реши: складывать или умножать."
          ),
          checkpoints: [
            t("Independent events often multiply.", "Независимые события часто перемножаются."),
            t("Mutually exclusive events often add.", "Взаимоисключающие события часто складываются."),
            t("Without replacement changes the denominator.", "Без возвращения меняется знаменатель."),
          ],
          example: {
            prompt: t("A bag has 3 red and 2 blue marbles. What is P(red)?", "В мешке 3 красных и 2 синих шарика. Какова P(red)?"),
            answer: t("3/5", "3/5"),
            explanation: t(
              "There are 3 favorable outcomes out of 5 total marbles.",
              "Подходящих исходов 3, а всего шариков 5."
            ),
          },
          quiz: [
            question({
              id: "probability-data-q1",
              prompt: t(
                "If two events are independent, how do you find the probability that both happen?",
                "Если два события независимы, как найти вероятность того, что оба произойдут?"
              ),
              options: [
                t("Add the probabilities", "Сложить вероятности"),
                t("Multiply the probabilities", "Перемножить вероятности"),
                t("Subtract the smaller from the larger", "Вычесть меньшую из большей"),
                t("Average the probabilities", "Взять среднее"),
              ],
              correctIndex: 1,
              explanation: t(
                "For independent events, the probability of both happening is the product.",
                "Для независимых событий совместная вероятность равна произведению."
              ),
            }),
          ],
          status: "attempted",
          minutes: 11,
        }),
      ],
    }),
    unit({
      id: "math-advanced",
      order: 4,
      title: t("Foundations: Advanced math", "Foundations: Advanced math"),
      summary: t(
        "Strengthen quadratics, functions, and algebraic structure.",
        "Укрепи квадратичные выражения, функции и алгебраическую структуру."
      ),
      note: t(
        "These questions reward structure more than speed.",
        "Такие задачи награждают понимание структуры больше, чем скорость."
      ),
      hasQuiz: true,
      hasUnitTest: false,
      skills: [
        skill({
          id: "factoring-quadratics",
          title: t("Factor and solve quadratics", "Факторизация и решение квадратичных выражений"),
          shortTitle: t("Quadratics", "Квадратичные"),
          summary: t(
            "Look for patterns before using longer methods.",
            "Ищи шаблоны до того, как переходить к более длинным методам."
          ),
          lesson: t(
            "Many SAT quadratics become easier if you notice a common factor or simple trinomial structure. Factoring often reveals answers faster than expanding.",
            "Многие SAT-задачи на квадратичные выражения становятся проще, если заметить общий множитель или стандартный трёхчлен. Факторизация часто быстрее, чем раскрытие скобок."
          ),
          strategy: t(
            "Check GCF first, then pattern, then binomial pair.",
            "Сначала общий множитель, потом шаблон, потом пара биномиалов."
          ),
          checkpoints: [
            t("Set the expression equal to zero before solving.", "Перед решением приравняй выражение к нулю."),
            t("A product is zero when any factor is zero.", "Произведение равно нулю, если любой множитель равен нулю."),
            t("Do not lose a negative factor.", "Не потеряй отрицательный множитель."),
          ],
          example: {
            prompt: t("Solve x^2 - 5x + 6 = 0.", "Реши x^2 - 5x + 6 = 0."),
            answer: t("x = 2 or x = 3", "x = 2 или x = 3"),
            explanation: t(
              "Factor to (x - 2)(x - 3) = 0.",
              "Разложи на (x - 2)(x - 3) = 0."
            ),
          },
          quiz: [
            question({
              id: "factoring-quadratics-q1",
              prompt: t(
                "Which expression factors to (x + 2)(x + 3)?",
                "Какое выражение раскладывается в (x + 2)(x + 3)?"
              ),
              options: [t("x^2 + 5x + 6", "x^2 + 5x + 6"), t("x^2 + x + 6", "x^2 + x + 6"), t("x^2 + 6x + 5", "x^2 + 6x + 5"), t("x^2 - 5x + 6", "x^2 - 5x + 6")],
              correctIndex: 0,
              explanation: t(
                "Expanding gives x^2 + 3x + 2x + 6 = x^2 + 5x + 6.",
                "При раскрытии получаем x^2 + 3x + 2x + 6 = x^2 + 5x + 6."
              ),
            }),
          ],
          status: "attempted",
          minutes: 14,
        }),
        skill({
          id: "function-notation",
          title: t("Use function notation", "Использование обозначения функции"),
          shortTitle: t("Function notation", "Обозначение функций"),
          summary: t(
            "Treat f(x) as an instruction for what to do with the input.",
            "Смотри на f(x) как на инструкцию, что делать с входным значением."
          ),
          lesson: t(
            "Function notation is really about substitution. When the SAT asks for f(3) or g(a + 1), it is asking you to apply the rule carefully with a new input.",
            "Обозначение функции - это в первую очередь подстановка. Когда SAT спрашивает f(3) или g(a + 1), он просит аккуратно применить правило к новому входу."
          ),
          strategy: t(
            "Replace the variable with the new input, then simplify step by step.",
            "Замени переменную новым входом и упрощай по шагам."
          ),
          checkpoints: [
            t("Parentheses matter during substitution.", "Скобки важны при подстановке."),
            t("An input can itself be an expression.", "Входом может быть целое выражение."),
            t("Compare tables, equations, and graphs as one idea.", "Таблицы, формулы и графики могут описывать одну идею."),
          ],
          example: {
            prompt: t("If f(x) = 2x + 1, find f(4).", "Если f(x) = 2x + 1, найди f(4)."),
            answer: t("9", "9"),
            explanation: t(
              "Substitute 4 for x: 2(4) + 1 = 9.",
              "Подставь 4 вместо x: 2(4) + 1 = 9."
            ),
          },
          quiz: [
            question({
              id: "function-notation-q1",
              prompt: t("If h(x) = x^2 - 1, what is h(5)?", "Если h(x) = x^2 - 1, чему равно h(5)?"),
              options: [t("24", "24"), t("16", "16"), t("26", "26"), t("4", "4")],
              correctIndex: 0,
              explanation: t(
                "Substitute 5: 5^2 - 1 = 24.",
                "Подставляем 5: 5^2 - 1 = 24."
              ),
            }),
          ],
          status: "not_started",
          minutes: 10,
        }),
      ],
    }),
    unit({
      id: "math-geometry",
      order: 5,
      title: t("Foundations: Geometry and trigonometry", "Foundations: Geometry and trigonometry"),
      summary: t(
        "Connect formulas to visual structure instead of memorizing blindly.",
        "Связывай формулы с геометрической структурой, а не заучивай их вслепую."
      ),
      note: t(
        "Draw and label before solving.",
        "Сначала рисуй и подписывай."
      ),
      hasQuiz: true,
      hasUnitTest: false,
      skills: [
        skill({
          id: "area-volume",
          title: t("Use area and volume formulas", "Площади и объёмы"),
          shortTitle: t("Area and volume", "Площадь и объём"),
          summary: t(
            "Match the shape to the correct formula and keep units consistent.",
            "Соотнеси фигуру с правильной формулой и следи за единицами измерения."
          ),
          lesson: t(
            "The SAT wants more than memorization. It wants to know whether you can identify the shape, separate dimensions, and notice when a unit should be squared or cubed.",
            "SAT проверяет не только память. Нужно узнать фигуру, выделить размеры и заметить, когда единица должна быть в квадрате или кубе."
          ),
          strategy: t(
            "Identify the shape -> write the formula -> plug in values with units.",
            "Определи фигуру -> запиши формулу -> подставь значения с единицами."
          ),
          checkpoints: [
            t("Area uses square units.", "Площадь измеряется в квадратных единицах."),
            t("Volume uses cubic units.", "Объём измеряется в кубических единицах."),
            t("Watch diameter versus radius.", "Не путай диаметр и радиус."),
          ],
          example: {
            prompt: t("Find the area of a rectangle with sides 4 and 9.", "Найди площадь прямоугольника со сторонами 4 и 9."),
            answer: t("36 square units", "36 квадратных единиц"),
            explanation: t(
              "Area of a rectangle is length times width.",
              "Площадь прямоугольника равна длине, умноженной на ширину."
            ),
          },
          quiz: [
            question({
              id: "area-volume-q1",
              prompt: t("What happens to the units when you calculate volume?", "Что происходит с единицами измерения при вычислении объёма?"),
              options: [
                t("They stay linear", "Они остаются линейными"),
                t("They become square units", "Они становятся квадратными"),
                t("They become cubic units", "Они становятся кубическими"),
                t("They disappear", "Они исчезают"),
              ],
              correctIndex: 2,
              explanation: t(
                "Volume measures three-dimensional space, so its units are cubic.",
                "Объём измеряет трёхмерное пространство, поэтому единицы кубические."
              ),
            }),
          ],
          status: "mastered",
          minutes: 9,
        }),
        skill({
          id: "right-triangles-trig",
          title: t("Use right triangles and basic trig", "Прямоугольные треугольники и базовая тригонометрия"),
          shortTitle: t("Right triangles", "Прямоугольные треугольники"),
          summary: t(
            "Use the Pythagorean theorem or trig ratios depending on what is given.",
            "Используй теорему Пифагора или тригонометрические отношения в зависимости от данных."
          ),
          lesson: t(
            "A right triangle question usually asks you to choose the best tool. If two sides are known, Pythagorean theorem may be fastest. If an angle and a side are involved, a trig ratio may be cleaner.",
            "Задача на прямоугольный треугольник обычно требует выбрать лучший инструмент. Если известны две стороны, быстрее сработает теорема Пифагора. Если есть угол и сторона, удобнее тригонометрическое отношение."
          ),
          strategy: t(
            "Ask first: side-side-side or angle-side?",
            "Сначала спроси: сторона-сторона-сторона или угол-сторона?"
          ),
          checkpoints: [
            t("Hypotenuse is opposite the right angle.", "Гипотенуза напротив прямого угла."),
            t("SOH-CAH-TOA helps match sides to ratios.", "SOH-CAH-TOA помогает соотнести стороны и отношения."),
            t("Label the figure if the diagram is sparse.", "Если рисунок пустой, сам подпиши элементы."),
          ],
          example: {
            prompt: t("A right triangle has legs 6 and 8. Find the hypotenuse.", "У прямоугольного треугольника катеты 6 и 8. Найди гипотенузу."),
            answer: t("10", "10"),
            explanation: t(
              "Use a^2 + b^2 = c^2: 36 + 64 = 100.",
              "Используй a^2 + b^2 = c^2: 36 + 64 = 100."
            ),
          },
          quiz: [
            question({
              id: "right-triangles-trig-q1",
              prompt: t("Which side is the hypotenuse in a right triangle?", "Какая сторона является гипотенузой в прямоугольном треугольнике?"),
              options: [
                t("The shortest side", "Самая короткая сторона"),
                t("The side opposite the right angle", "Сторона напротив прямого угла"),
                t("Any side next to the angle", "Любая сторона рядом с углом"),
                t("The vertical side only", "Только вертикальная сторона"),
              ],
              correctIndex: 1,
              explanation: t(
                "The hypotenuse is always opposite the right angle.",
                "Гипотенуза всегда находится напротив прямого угла."
              ),
            }),
          ],
          status: "familiar",
          minutes: 13,
        }),
      ],
    }),
    unit({
      id: "math-mixed",
      order: 6,
      title: t("Mixed practice and challenge", "Смешанная практика и сложные задачи"),
      summary: t(
        "Practice choosing the fastest model when the question type is not announced for you.",
        "Тренируй выбор самого быстрого подхода, когда тип задачи заранее не подсказан."
      ),
      note: t(
        "This is where method choice starts to save real time.",
        "Именно здесь выбор метода начинает экономить реальное время."
      ),
      hasQuiz: true,
      hasUnitTest: true,
      skills: [
        skill({
          id: "systems-modeling",
          title: t("Model and solve systems", "Моделирование и решение систем"),
          shortTitle: t("Systems", "Системы"),
          summary: t(
            "Use systems when two conditions describe the same unknown situation.",
            "Используй системы, когда одну ситуацию описывают два условия."
          ),
          lesson: t(
            "SAT modeling problems often hide a system inside a story. If two equations describe the same pair of quantities, solving them together reveals the consistent solution.",
            "В SAT-задачах на моделирование система часто прячется в тексте. Если две формулы описывают одну пару величин, их совместное решение даёт согласованный ответ."
          ),
          strategy: t(
            "Name the variables, write one equation per condition, then pick substitution or elimination.",
            "Обозначь переменные, запиши по одному уравнению на каждое условие, затем выбери подстановку или исключение."
          ),
          checkpoints: [
            t("Each equation should represent a full condition.", "Каждое уравнение должно отражать полное условие."),
            t("Check whether the answer makes sense in context.", "Проверь, имеет ли ответ смысл по условию."),
            t("Elimination is fast when coefficients line up.", "Исключение быстро работает, когда коэффициенты совпадают."),
          ],
          example: {
            prompt: t("Student tickets cost 8, adult tickets cost 12. Five tickets cost 48 total. How many student tickets were sold?", "Студенческий билет стоит 8, взрослый - 12. Пять билетов стоят 48 всего. Сколько продали студенческих?"),
            answer: t("3 student tickets", "3 студенческих билета"),
            explanation: t(
              "Let s + a = 5 and 8s + 12a = 48. Solving gives s = 3.",
              "Пусть s + a = 5 и 8s + 12a = 48. Решение даёт s = 3."
            ),
          },
          quiz: [
            question({
              id: "systems-modeling-q1",
              prompt: t("When is a system of equations a strong model choice?", "Когда система уравнений особенно уместна как модель?"),
              options: [
                t("When one condition is enough", "Когда достаточно одного условия"),
                t("When two conditions describe the same unknowns", "Когда две зависимости описывают одни и те же неизвестные"),
                t("When the problem has no numbers", "Когда в задаче нет чисел"),
                t("When only a graph is shown", "Когда показан только график"),
              ],
              correctIndex: 1,
              explanation: t(
                "Systems are useful when the same quantities are constrained in two ways.",
                "Системы полезны, когда одни и те же величины ограничены двумя разными условиями."
              ),
            }),
          ],
          status: "attempted",
          minutes: 14,
        }),
        skill({
          id: "timed-mixed-set",
          title: t("Choose the fastest tool under time", "Выбор самого быстрого инструмента под таймером"),
          shortTitle: t("Timed mixed set", "Mixed set"),
          summary: t(
            "Choose between solving exactly, estimating, graphing, or plugging in values.",
            "Выбирай между точным решением, оценкой, графиком или подстановкой."
          ),
          lesson: t(
            "Strong SAT math progress depends on recognition. The faster you notice the cheapest reliable method, the more time you save for later questions.",
            "Сильный SAT math результат зависит от распознавания. Чем быстрее ты замечаешь самый дешёвый надёжный метод, тем больше времени остаётся на следующие вопросы."
          ),
          strategy: t(
            "Read the ask, inspect the choices, then choose the lightest valid method.",
            "Прочитай, что спрашивают, посмотри варианты и выбери самый лёгкий надёжный путь."
          ),
          checkpoints: [
            t("Answer choices can suggest plugging in or estimation.", "Варианты ответов могут подсказывать подстановку или оценку."),
            t("Do not fully solve if a graph answers faster.", "Не решай до конца, если график даёт ответ быстрее."),
            t("Speed comes from method choice, not panic.", "Скорость появляется из правильного метода, а не из паники."),
          ],
          example: {
            prompt: t("A question asks which value is closest to a square root expression. What is often fastest?", "Вопрос спрашивает, какое значение ближе всего к выражению с корнем. Что часто быстрее всего?"),
            answer: t("Estimate between nearby perfect squares.", "Оценить между соседними квадратами."),
            explanation: t(
              "If the task asks for the closest value, a controlled estimate is often enough.",
              "Если спрашивают ближайшее значение, аккуратной оценки часто достаточно."
            ),
          },
          quiz: [
            question({
              id: "timed-mixed-set-q1",
              prompt: t("What usually helps most under a time limit?", "Что чаще всего помогает больше всего под таймером?"),
              options: [
                t("Using the longest method every time", "Всегда использовать самый длинный метод"),
                t("Choosing the quickest reliable method", "Выбирать самый быстрый надёжный метод"),
                t("Ignoring answer choices", "Игнорировать варианты ответов"),
                t("Rewriting the whole problem twice", "Переписывать всю задачу дважды"),
              ],
              correctIndex: 1,
              explanation: t(
                "Timed accuracy improves when you match the method to the question.",
                "Точность под таймером растёт, когда ты подбираешь метод под задачу."
              ),
            }),
          ],
          status: "not_started",
          minutes: 15,
        }),
      ],
    }),
  ],
};
