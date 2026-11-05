import { text, type Topic } from "../types";

export const DATA_TOPICS: Topic[] = [
  {
    id: "m-data-ratios",
    section: "math",
    domainId: "data",
    order: 16,
    title: text("Ratios, rates, and proportions", "Отношения, скорости, пропорции"),
    subtitle: text(
      "Scale a ratio, find a unit rate, and solve any proportion in two lines.",
      "Масштабируй отношение, находи единичную скорость и решай любую пропорцию в две строки.",
    ),
    minutes: 12,
    tags: ["ratios", "rates", "proportions", "unit rate", "scaling"],
    objectives: [
      text(
        "Read a ratio as parts of a whole and scale it to any total.",
        "Читай отношение как части целого и масштабируй его под любое целое.",
      ),
      text(
        "Turn a rate into a unit rate and use it to predict a new situation.",
        "Переводи скорость в единичную и используй её для прогноза новой ситуации.",
      ),
      text(
        "Set up and solve proportions with cross-multiplication, keeping units matched.",
        "Составляй и решай пропорции перекрёстным умножением, согласовывая единицы.",
      ),
    ],
    theory: [
      {
        heading: text("Ratios: parts, totals, and scale", "Отношения: части, целое и масштаб"),
        body: text(
          "A ratio compares quantities. The ratio 3:5 means three parts for every five parts, so the whole has eight equal parts. Multiplying or dividing both terms by the same number keeps the ratio unchanged. To find one share, divide the whole by the total number of parts, then multiply by that share's count.",
          "Отношение сравнивает величины. Запись 3:5 означает три части на каждые пять, то есть целое делится на восемь равных частей. Если умножить или разделить оба члена на одно число, отношение не изменится. Чтобы найти одну долю, раздели целое на общее число частей и умножь на количество частей этой доли.",
        ),
        formulas: ["a : b = ka : kb", "share = (parts in share / total parts) × whole"],
      },
      {
        heading: text("Rates and unit rates", "Скорости и единичные скорости"),
        body: text(
          "A rate compares quantities with different units, such as miles per hour or dollars per kilogram. A unit rate rewrites the comparison per one unit, which makes scaling easy: multiply the unit rate by the number of units you need. On the SAT, the phrase per, for each, or at this rate almost always signals a unit rate.",
          "Скорость сравнивает величины с разными единицами: мили в час, доллары за килограмм. Единичная скорость переписывает сравнение на одну единицу, и тогда масштабировать просто: умножь её на нужное количество единиц. На SAT слова per, for each и at this rate почти всегда означают единичную скорость.",
        ),
        formulas: ["rate = quantity / time", "unit rate = quantity per 1 unit"],
      },
      {
        heading: text("Proportions", "Пропорции"),
        body: text(
          "A proportion states that two ratios are equal. Cross-multiplication turns it into a linear equation: multiply the numerator of each side by the denominator of the other. Before you calculate, label both sides with the same unit order, for example dollars over kilograms on each side, so the equation cannot be inverted.",
          "Пропорция утверждает равенство двух отношений. Перекрёстное умножение превращает её в линейное уравнение: числитель одной стороны умножается на знаменатель другой. Перед вычислением подпиши обе стороны в одном порядке единиц, например доллары над килограммами, чтобы уравнение не перевернулось.",
        ),
        formulas: ["a / b = c / d  ⇔  ad = bc", "c = ad / b"],
      },
    ],
    examples: [
      {
        prompt: text(
          "A recipe uses flour and sugar in the ratio 7:3 by mass. If the recipe uses 42 grams of sugar, how many grams of flour does it use?",
          "В рецепте мука и сахар взяты в отношении 7:3 по массе. Если используется 42 грамма сахара, сколько граммов муки нужно?",
        ),
        steps: [
          text(
            "The sugar is the 3-part share, and 3 parts = 42 g, so one part = 42 ÷ 3 = 14 g.",
            "Сахар — это доля из 3 частей: 3 части = 42 г, значит одна часть = 42 ÷ 3 = 14 г.",
          ),
          text(
            "Flour is the 7-part share, so multiply 7 × 14 = 98 g.",
            "Мука — это 7 частей, поэтому 7 × 14 = 98 г.",
          ),
          text(
            "Check the total: 98 + 42 = 140 g, and 98:42 simplifies to 7:3.",
            "Проверка: 98 + 42 = 140 г, а 98:42 сокращается до 7:3.",
          ),
        ],
        answer: text("98 grams of flour.", "98 граммов муки."),
        source: "SAT-style",
        desmos: ["(42/3)*7"],
      },
      {
        prompt: text(
          "A car travels 168 miles in 2.5 hours at a constant speed. At the same speed, how long does it take to travel 420 miles?",
          "Автомобиль проезжает 168 миль за 2,5 часа с постоянной скоростью. Сколько времени при той же скорости займут 420 миль?",
        ),
        steps: [
          text(
            "Find the unit rate: 168 ÷ 2.5 = 67.2 miles per hour.",
            "Найди единичную скорость: 168 ÷ 2,5 = 67,2 мили в час.",
          ),
          text(
            "Divide the new distance by the unit rate: 420 ÷ 67.2 = 6.25 hours.",
            "Раздели новое расстояние на единичную скорость: 420 ÷ 67,2 = 6,25 часа.",
          ),
          text(
            "Convert the decimal part: 0.25 hour = 15 minutes, so the trip takes 6 h 15 min.",
            "Переведи дробную часть: 0,25 часа = 15 минут, итого 6 ч 15 мин.",
          ),
        ],
        answer: text("6.25 hours, or 6 hours 15 minutes.", "6,25 часа, или 6 часов 15 минут."),
        desmos: ["168/2.5", "420/(168/2.5)"],
      },
    ],
    desmos: [
      {
        title: text("Scale a ratio in one line", "Масштабируй отношение одной строкой"),
        goal: text(
          "Go from one known share to the requested share without writing a full equation.",
          "Перейти от известной доли к нужной без полного уравнения.",
        ),
        steps: [
          {
            title: text("Find one part", "Найди одну часть"),
            expressions: ["42/3"],
            note: text(
              "42 is the 3-part share, so one part is 14.",
              "42 — это доля из 3 частей, значит одна часть равна 14.",
            ),
          },
          {
            title: text("Multiply by the target share", "Умножь на нужную долю"),
            expressions: ["(42/3)*7"],
            note: text(
              "The 7-part share is 98. Change 7 to any share count and Desmos rescales instantly.",
              "Доля из 7 частей равна 98. Поменяй 7 на любое число частей — Desmos пересчитает сразу.",
            ),
          },
        ],
        speed: text(
          "One expression replaces the whole proportion setup when one share is known.",
          "Одно выражение заменяет всю пропорцию, если известна одна доля.",
        ),
        caution: text(
          "Keep the parentheses. Typing 42/3*7 happens to work here, but 42/(3*7) does not mean the same thing.",
          "Не теряй скобки. 42/3*7 здесь сработает, а 42/(3*7) означает совсем другое.",
        ),
      },
      {
        title: text("Solve a proportion by cross-multiplying", "Реши пропорцию перекрёстным умножением"),
        goal: text(
          "Get a numeric answer for an unknown in a/b = c/d without algebra by hand.",
          "Получить число для неизвестного в a/b = c/d без ручной алгебры.",
        ),
        steps: [
          {
            title: text("Reduce the known ratio to a unit rate", "Сведи известное отношение к единичной скорости"),
            expressions: ["168/2.5"],
            note: text("This is 67.2 miles per hour.", "Это 67,2 мили в час."),
          },
          {
            title: text("Divide the target by the rate", "Раздели цель на скорость"),
            expressions: ["420/(168/2.5)"],
            note: text("The result, 6.25, is the time in hours.", "Результат 6,25 — это время в часах."),
          },
          {
            title: text("Confirm with the cross product", "Подтверди через перекрёстное произведение"),
            expressions: ["(420*2.5)/168"],
            note: text(
              "Same answer from c = ad/b, so the setup is consistent.",
              "Тот же ответ из c = ad/b — значит пропорция составлена верно.",
            ),
          },
        ],
        caution: text(
          "Put the same unit on top of both ratios. Miles over hours on one side and hours over miles on the other silently gives the reciprocal.",
          "Ставь одну и ту же единицу в числитель обоих отношений. Мили над часами с одной стороны и часы над милями с другой тихо дадут обратную величину.",
        ),
      },
    ],
    strategy: [
      text(
        "Label the parts before computing: write 3 parts = 42 g, then one part, then the requested share. Two labeled lines beat one rushed equation.",
        "Подпиши части до вычислений: 3 части = 42 г, затем одна часть, затем нужная доля. Две подписанные строки надёжнее одного поспешного уравнения.",
      ),
      text(
        "When a question says at this rate or per, immediately compute the unit rate; almost every later step is multiplication.",
        "Если в задаче есть at this rate или per, сразу считай единичную скорость: почти все дальнейшие шаги — умножение.",
      ),
      text(
        "Sanity-check direction: more miles must take more hours, and more sugar must need more flour. If the answer moves the wrong way, the proportion is upside down.",
        "Проверяй направление: больше миль — больше времени, больше сахара — больше муки. Если ответ движется не туда, пропорция перевёрнута.",
      ),
    ],
    pitfalls: [
      text(
        "Treating a part-to-part ratio as part-to-whole. In 3:5 the whole is 8 parts, not 5, so the larger share is 5/8 of the total, not 5/3.",
        "Путать отношение «часть к части» с «часть к целому». В 3:5 целое — это 8 частей, а не 5, поэтому большая доля равна 5/8 целого, а не 5/3.",
      ),
      text(
        "Adding the same amount to both terms instead of multiplying. 3:5 scaled by 4 is 12:20; adding 4 gives 7:9, which is a different ratio.",
        "Прибавлять одно и то же к обоим членам вместо умножения. 3:5 при масштабе 4 даёт 12:20; прибавление 4 даёт 7:9 — это другое отношение.",
      ),
      text(
        "Mixing units inside one proportion. Convert hours to minutes or kilometers to miles before cross-multiplying, not after.",
        "Смешивать единицы внутри пропорции. Переводи часы в минуты или километры в мили до перекрёстного умножения, а не после.",
      ),
    ],
    practice: [
      {
        id: "m-data-ratios-p1",
        prompt: text(
          "A sum of 80 is divided between two people in the ratio 3:7. What is the larger share?",
          "Сумму 80 делят между двумя людьми в отношении 3:7. Какова большая доля?",
        ),
        options: [text("24", "24"), text("56", "56"), text("42", "42"), text("60", "60")],
        correctIndex: 1,
        explanation: text(
          "The ratio has 3 + 7 = 10 parts, so one part is 80 ÷ 10 = 8. The larger share is 7 × 8 = 56. The choice 24 is the smaller share, and 42 comes from misreading 7 as part of 10 without scaling.",
          "В отношении 3 + 7 = 10 частей, значит одна часть равна 80 ÷ 10 = 8. Большая доля — 7 × 8 = 56. Вариант 24 — меньшая доля, а 42 получается, если неверно масштабировать.",
        ),
        difficulty: "easy",
        desmos: ["80/10*7"],
      },
      {
        id: "m-data-ratios-p2",
        prompt: text(
          "Fifteen identical machines produce 1,200 parts in 8 hours. Working at the same rate, how many parts do the same 15 machines produce in 5 hours?",
          "Пятнадцать одинаковых станков выпускают 1 200 деталей за 8 часов. С той же производительностью сколько деталей выпустят эти 15 станков за 5 часов?",
        ),
        options: [text("600", "600"), text("720", "720"), text("750", "750"), text("800", "800")],
        correctIndex: 2,
        explanation: text(
          "The combined rate is 1,200 ÷ 8 = 150 parts per hour. In 5 hours: 150 × 5 = 750. Equivalently, each machine makes 10 parts per hour, so 15 × 10 × 5 = 750.",
          "Общая производительность: 1 200 ÷ 8 = 150 деталей в час. За 5 часов: 150 × 5 = 750. Или каждый станок делает 10 деталей в час: 15 × 10 × 5 = 750.",
        ),
        difficulty: "medium",
        desmos: ["1200/8*5"],
      },
      {
        id: "m-data-ratios-p3",
        prompt: text(
          "On a map, 2.5 centimeters represents 30 kilometers. What distance does 9 centimeters represent?",
          "На карте 2,5 сантиметра соответствуют 30 километрам. Какое расстояние соответствуют 9 сантиметрам?",
        ),
        options: [text("90 km", "90 км"), text("108 km", "108 км"), text("112.5 km", "112,5 км"), text("120 km", "120 км")],
        correctIndex: 1,
        explanation: text(
          "Each centimeter represents 30 ÷ 2.5 = 12 km. Then 9 × 12 = 108 km. The proportion 2.5/30 = 9/x gives the same result.",
          "Один сантиметр соответствует 30 ÷ 2,5 = 12 км. Тогда 9 × 12 = 108 км. Пропорция 2,5/30 = 9/x даёт тот же результат.",
        ),
        difficulty: "easy",
        desmos: ["(30/2.5)*9"],
      },
      {
        id: "m-data-ratios-p4",
        prompt: text(
          "Three quantities A, B, and C are in the ratio 2:3:5, and A + B + C = 200. What is C − A?",
          "Три величины A, B и C относятся как 2:3:5, причём A + B + C = 200. Чему равно C − A?",
        ),
        options: [text("20", "20"), text("40", "40"), text("60", "60"), text("100", "100")],
        correctIndex: 2,
        explanation: text(
          "There are 2 + 3 + 5 = 10 parts, so one part is 20. Then A = 40, C = 100, and C − A = 60. The difference is 3 parts, which is 3 × 20 = 60.",
          "Всего 2 + 3 + 5 = 10 частей, значит одна часть равна 20. Тогда A = 40, C = 100 и C − A = 60. Разница составляет 3 части: 3 × 20 = 60.",
        ),
        difficulty: "medium",
        desmos: ["200/10", "200/10*5-200/10*2"],
      },
    ],
  },
  {
    id: "m-data-percents",
    section: "math",
    domainId: "data",
    order: 17,
    title: text("Percents and percent change", "Проценты и изменение в процентах"),
    subtitle: text(
      "Multipliers, reverse percents, and the successive-change trap.",
      "Множители, обратные проценты и ловушка последовательных изменений.",
    ),
    minutes: 13,
    tags: ["percents", "percent change", "multiplier", "discount", "increase"],
    objectives: [
      text(
        "Convert between a percent, a decimal multiplier, and an actual amount.",
        "Переводи процент в десятичный множитель и в реальную величину и обратно.",
      ),
      text(
        "Compute percent increase and decrease from the original value, not the new one.",
        "Считай рост и падение в процентах от исходного значения, а не от нового.",
      ),
      text(
        "Handle successive percent changes by multiplying multipliers instead of adding percents.",
        "Обрабатывай последовательные изменения умножением множителей, а не сложением процентов.",
      ),
    ],
    theory: [
      {
        heading: text("Percent means per hundred", "Процент означает «на сотню»"),
        body: text(
          "A percent is a fraction with denominator 100, so 37% = 0.37. To find a percent of a whole, multiply by the decimal form. To recover the whole from a part, divide by that decimal. The same number plays three roles — percent, multiplier, amount — and most errors come from switching roles mid-problem.",
          "Процент — это дробь со знаменателем 100, поэтому 37% = 0,37. Чтобы найти процент от целого, умножь на десятичную форму. Чтобы восстановить целое по части, раздели на эту десятичную форму. Одно и то же число выступает в трёх ролях — процент, множитель, сумма — и большинство ошибок возникает при путанице ролей.",
        ),
        formulas: ["part = (p/100) × whole", "whole = part ÷ (p/100)"],
      },
      {
        heading: text("Percent change", "Изменение в процентах"),
        body: text(
          "Percent change compares the change to the original value: divide the difference by where you started. The multiplier form is faster for repeated work: an increase of p% is ×(1 + p/100), and a decrease of p% is ×(1 − p/100). A 20% increase is ×1.2, not ×0.2 added afterward.",
          "Изменение в процентах сравнивает изменение с исходным значением: раздели разницу на то, с чего начали. Форма множителя быстрее для повторной работы: рост на p% — это ×(1 + p/100), падение на p% — это ×(1 − p/100). Рост на 20% — это ×1,2, а не прибавление 0,2 после.",
        ),
        formulas: [
          "percent change = (new − old) / old × 100",
          "new = old × (1 ± p/100)",
        ],
      },
      {
        heading: text("Successive changes and reverse percents", "Последовательные изменения и обратные проценты"),
        body: text(
          "Two percent changes in a row multiply, so they do not generally cancel. Increasing by 25% then decreasing by 20% returns to the start because 1.25 × 0.8 = 1. To reverse a change, divide by the multiplier: if a price after a 30% discount is $63, the original was 63 ÷ 0.7 = $90, not 63 × 1.3.",
          "Два изменения подряд перемножаются и обычно не компенсируют друг друга. Рост на 25%, затем падение на 20% возвращают к исходному, потому что 1,25 × 0,8 = 1. Чтобы обратить изменение, раздели на множитель: если цена после скидки 30% равна 63, исходная была 63 ÷ 0,7 = 90, а не 63 × 1,3.",
        ),
        formulas: ["final = original × m₁ × m₂", "original = final ÷ (m₁ × m₂)"],
      },
    ],
    examples: [
      {
        prompt: text(
          "A ticket price rises from $80 to $92. What is the percent increase?",
          "Цена билета выросла с 80 до 92 долларов. На сколько процентов она выросла?",
        ),
        steps: [
          text("Find the change: 92 − 80 = 12.", "Найди изменение: 92 − 80 = 12."),
          text(
            "Divide by the original value, not the new one: 12 ÷ 80 = 0.15.",
            "Раздели на исходное значение, а не на новое: 12 ÷ 80 = 0,15.",
          ),
          text("Convert to a percent: 0.15 × 100 = 15%.", "Переведи в проценты: 0,15 × 100 = 15%."),
          text(
            "Check with the multiplier: 80 × 1.15 = 92, so the answer is consistent.",
            "Проверь множителем: 80 × 1,15 = 92 — ответ согласован.",
          ),
        ],
        answer: text("A 15% increase.", "Рост на 15%."),
        desmos: ["(92-80)/80*100"],
      },
      {
        prompt: text(
          "After a 30% discount, a jacket costs $63. What was the original price?",
          "После скидки 30% куртка стоит 63 доллара. Какова была исходная цена?",
        ),
        steps: [
          text(
            "A 30% discount means the customer pays 70%, so the multiplier is 0.70.",
            "Скидка 30% означает, что покупатель платит 70%, то есть множитель 0,70.",
          ),
          text("Write 0.70x = 63.", "Запиши 0,70x = 63."),
          text("Divide: x = 63 ÷ 0.70 = 90.", "Раздели: x = 63 ÷ 0,70 = 90."),
          text(
            "Check: 10% of 90 is 9, so 30% is 27, and 90 − 27 = 63.",
            "Проверка: 10% от 90 равно 9, значит 30% — это 27, и 90 − 27 = 63.",
          ),
        ],
        answer: text("$90.", "90 долларов."),
        source: "SAT-style",
        desmos: ["63/0.7"],
      },
    ],
    desmos: [
      {
        title: text("Percent change in one line", "Изменение в процентах одной строкой"),
        goal: text(
          "Avoid the wrong denominator by letting the calculator apply (new − old)/old.",
          "Избежать неверного знаменателя: калькулятор сам применит (new − old)/old.",
        ),
        steps: [
          {
            title: text("Type the change formula", "Введи формулу изменения"),
            expressions: ["(92-80)/80*100"],
            note: text("Desmos returns 15, the percent increase.", "Desmos выдаёт 15 — рост в процентах."),
          },
          {
            title: text("Cross-check with the ratio form", "Сверь с формой отношения"),
            expressions: ["92/80-1"],
            note: text(
              "Also 0.15, which confirms the same starting value was used.",
              "Тоже 0,15 — значит исходное значение взято верно.",
            ),
          },
        ],
        caution: text(
          "If you type (92-80)/92 you get about 13%, the percent of the new price. The SAT offers that number as a trap.",
          "Если ввести (92-80)/92, получится около 13% — процент от новой цены. SAT предлагает это число как ловушку.",
        ),
      },
      {
        title: text("Successive changes without mistakes", "Последовательные изменения без ошибок"),
        goal: text(
          "Apply two percent changes and see why they do not simply add.",
          "Применить два изменения и увидеть, почему они не складываются.",
        ),
        steps: [
          {
            title: text("Apply the first change", "Примени первое изменение"),
            expressions: ["200*1.25"],
            note: text("A 25% increase takes 200 to 250.", "Рост на 25% превращает 200 в 250."),
          },
          {
            title: text("Apply the second change to the new value", "Примени второе изменение к новому значению"),
            expressions: ["200*1.25*0.8"],
            note: text(
              "The 20% decrease acts on 250, not on 200, and returns to 200.",
              "Снижение на 20% действует на 250, а не на 200, и возвращает к 200.",
            ),
          },
          {
            title: text("Compare with adding the percents", "Сравни со сложением процентов"),
            expressions: ["200*(1+0.25-0.20)"],
            note: text(
              "This gives 210, which is wrong. The gap shows why multipliers must multiply.",
              "Получается 210 — это неверно. Разрыв показывает, почему множители нужно перемножать.",
            ),
          },
        ],
        speed: text(
          "One line with all multipliers answers any chain of changes.",
          "Одна строка со всеми множителями решает любую цепочку изменений.",
        ),
      },
    ],
    strategy: [
      text(
        "Write the multiplier first, then the equation. Translating words into ×1.25 or ×0.7 prevents almost every percent error.",
        "Сначала запиши множитель, потом уравнение. Перевод слов в ×1,25 или ×0,7 предотвращает почти все ошибки с процентами.",
      ),
      text(
        "For reverse percent questions, test the answer: take 30% off $90 and see whether you get $63. Back-solving is faster than deriving.",
        "В обратных задачах проверяй ответ: возьми 30% от 90 и посмотри, получится ли 63. Подстановка быстрее вывода.",
      ),
      text(
        "When two changes appear, multiply the multipliers and compare with 1. A product above 1 is a net increase; below 1 is a net decrease.",
        "Если есть два изменения, перемножь множители и сравни с 1. Произведение больше 1 — итоговый рост, меньше — итоговое падение.",
      ),
    ],
    pitfalls: [
      text(
        "Using the new value as the denominator. Percent change always divides by the original, which is why an 80 → 92 rise is 15%, not 13%.",
        "Брать новое значение в знаменатель. Изменение в процентах всегда делится на исходное, поэтому рост 80 → 92 — это 15%, а не 13%.",
      ),
      text(
        "Adding successive percents. A 10% rise then a 10% fall gives 500 × 1.1 × 0.9 = 495, not 500 and not 520.",
        "Складывать последовательные проценты. Рост на 10%, затем падение на 10% дают 500 × 1,1 × 0,9 = 495, а не 500 и не 520.",
      ),
      text(
        "Confusing percentage points with percent. Going from 40% to 44% is 4 percentage points but a 10% relative increase.",
        "Путать процентные пункты с процентами. Переход с 40% на 44% — это 4 процентных пункта, но 10% относительного роста.",
      ),
    ],
    practice: [
      {
        id: "m-data-percents-p1",
        prompt: text("What is 15% of 240?", "Сколько составляет 15% от 240?"),
        options: [text("24", "24"), text("32", "32"), text("36", "36"), text("360", "360")],
        correctIndex: 2,
        explanation: text(
          "15% = 0.15, and 0.15 × 240 = 36. A quick mental check: 10% is 24 and 5% is 12, so 24 + 12 = 36.",
          "15% = 0,15, и 0,15 × 240 = 36. Быстрая проверка: 10% — это 24, 5% — это 12, значит 24 + 12 = 36.",
        ),
        difficulty: "easy",
        desmos: ["0.15*240"],
      },
      {
        id: "m-data-percents-p2",
        prompt: text(
          "After a 20% increase, a monthly fee is $96. What was the fee before the increase?",
          "После роста на 20% ежемесячная плата составляет 96 долларов. Какой была плата до повышения?",
        ),
        options: [text("$76.80", "76,80 $"), text("$80", "80 $"), text("$84", "84 $"), text("$120", "120 $")],
        correctIndex: 1,
        explanation: text(
          "The new fee is 1.2 times the old fee, so the old fee is 96 ÷ 1.2 = 80. Check: 80 × 1.2 = 96. Subtracting 20% of 96 gives 76.80, which is the classic wrong answer.",
          "Новая плата — это 1,2 от старой, значит старая равна 96 ÷ 1,2 = 80. Проверка: 80 × 1,2 = 96. Вычитание 20% из 96 даёт 76,80 — классический неверный ответ.",
        ),
        difficulty: "medium",
        desmos: ["96/1.2"],
      },
      {
        id: "m-data-percents-p3",
        prompt: text(
          "A quantity of 500 is increased by 10% and then decreased by 10%. What is the final value?",
          "Величину 500 увеличили на 10%, а затем уменьшили на 10%. Каково итоговое значение?",
        ),
        options: [text("490", "490"), text("495", "495"), text("500", "500"), text("505", "505")],
        correctIndex: 1,
        explanation: text(
          "Multiply the multipliers: 500 × 1.10 × 0.90 = 500 × 0.99 = 495. The decrease acts on the larger intermediate value 550, so the changes do not cancel.",
          "Перемножь множители: 500 × 1,10 × 0,90 = 500 × 0,99 = 495. Снижение действует на большее промежуточное значение 550, поэтому изменения не компенсируются.",
        ),
        difficulty: "medium",
        desmos: ["500*1.1*0.9"],
      },
      {
        id: "m-data-percents-p4",
        prompt: text(
          "Quantity A is 25% greater than quantity B. Quantity B is what percent less than quantity A?",
          "Величина A на 25% больше величины B. На сколько процентов B меньше A?",
        ),
        options: [text("20%", "20%"), text("25%", "25%"), text("33⅓%", "33⅓%"), text("75%", "75%")],
        correctIndex: 0,
        explanation: text(
          "Let B = 100, so A = 125. The difference is 25, and the base is now A: 25 ÷ 125 = 0.20, or 20%. The 25% answer reuses the wrong base.",
          "Пусть B = 100, тогда A = 125. Разница 25, но база теперь A: 25 ÷ 125 = 0,20, то есть 20%. Ответ 25% использует неверную базу.",
        ),
        difficulty: "hard",
        desmos: ["(125-100)/125*100"],
      },
    ],
  },
  {
    id: "m-data-units",
    section: "math",
    domainId: "data",
    order: 18,
    title: text("Unit conversion and rates", "Перевод единиц и скорости"),
    subtitle: text(
      "Dimensional analysis that never flips the wrong way.",
      "Размерный анализ, который не перевернётся не туда.",
    ),
    minutes: 11,
    tags: ["unit conversion", "dimensional analysis", "rates", "density", "per unit"],
    objectives: [
      text(
        "Convert units by multiplying by fractions equal to 1 so unwanted units cancel.",
        "Переводи единицы умножением на дроби, равные 1, чтобы лишние единицы сокращались.",
      ),
      text(
        "Convert rates with two units, such as km/h to m/s, in a single chain.",
        "Переводи скорости с двумя единицами, например км/ч в м/с, одной цепочкой.",
      ),
      text(
        "Handle squared and cubed units by squaring or cubing the conversion factor.",
        "Работай с квадратными и кубическими единицами, возводя коэффициент перевода в квадрат или куб.",
      ),
    ],
    theory: [
      {
        heading: text("Multiply by 1", "Умножай на 1"),
        body: text(
          "Any conversion factor can be written as a fraction equal to 1, such as 1000 m / 1 km. Multiplying by 1 does not change the value, only the units. Arrange the fraction so the unit you want to remove appears on the opposite side, then cancel it like a variable.",
          "Любой коэффициент перевода можно записать дробью, равной 1, например 1000 м / 1 км. Умножение на 1 не меняет значение, только единицы. Расположи дробь так, чтобы ненужная единица оказалась с противоположной стороны, и сократи её как переменную.",
        ),
        formulas: ["1 km = 1000 m  →  1000 m / 1 km = 1", "value × (new unit / old unit)"],
      },
      {
        heading: text("Rates with two units", "Скорости с двумя единицами"),
        body: text(
          "For a rate, convert the numerator and the denominator separately. Kilometers per hour to meters per second uses 1000 meters per kilometer and 3600 seconds per hour. Because the hour is in the denominator, the fraction 1 h / 3600 s is arranged to cancel hours.",
          "В скорости переводи числитель и знаменатель отдельно. Из километров в час в метры в секунду используют 1000 метров в километре и 3600 секунд в часе. Поскольку час стоит в знаменателе, дробь 1 ч / 3600 с располагают так, чтобы часы сократились.",
        ),
        formulas: [
          "km/h × (1000 m / 1 km) × (1 h / 3600 s) = m/s",
          "1 m/s = 3.6 km/h",
        ],
      },
      {
        heading: text("Squared and cubed units", "Квадратные и кубические единицы"),
        body: text(
          "Area and volume conversions use the factor twice or three times. Since 1 m = 100 cm, one square meter is 100² = 10,000 cm², and one cubic meter is 100³ = 1,000,000 cm³. A common SAT trap is converting a length factor once for an area.",
          "Перевод площади и объёма использует коэффициент дважды или трижды. Так как 1 м = 100 см, один квадратный метр — это 100² = 10 000 см², а один кубический метр — 100³ = 1 000 000 см³. Частая ловушка SAT — применить линейный коэффициент к площади только один раз.",
        ),
        formulas: ["1 m² = (100 cm)² = 10 000 cm²", "1 m³ = (100 cm)³ = 1 000 000 cm³"],
      },
    ],
    examples: [
      {
        prompt: text(
          "A car travels at 54 kilometers per hour. What is its speed in meters per second?",
          "Автомобиль едет со скоростью 54 километра в час. Какова его скорость в метрах в секунду?",
        ),
        steps: [
          text(
            "Write the chain: 54 km/h × (1000 m / 1 km) × (1 h / 3600 s).",
            "Запиши цепочку: 54 км/ч × (1000 м / 1 км) × (1 ч / 3600 с).",
          ),
          text("Kilometers and hours cancel, leaving meters per second.", "Километры и часы сокращаются, остаются метры в секунду."),
          text("Compute 54 × 1000 ÷ 3600 = 15.", "Вычисли 54 × 1000 ÷ 3600 = 15."),
          text(
            "Check with the shortcut: divide km/h by 3.6, and 54 ÷ 3.6 = 15.",
            "Проверь по короткому правилу: раздели км/ч на 3,6, и 54 ÷ 3,6 = 15.",
          ),
        ],
        answer: text("15 meters per second.", "15 метров в секунду."),
        desmos: ["54*1000/3600"],
      },
      {
        prompt: text(
          "A pump moves 5 gallons of water per minute. Using 1 gallon = 3.785 liters, how many liters per hour does it move?",
          "Насос перекачивает 5 галлонов воды в минуту. Считая 1 галлон = 3,785 литра, сколько литров в час он перекачивает?",
        ),
        steps: [
          text(
            "Convert minutes to hours first: 5 gal/min × 60 min/h = 300 gal/h.",
            "Сначала переведи минуты в часы: 5 гал/мин × 60 мин/ч = 300 гал/ч.",
          ),
          text(
            "Convert gallons to liters: 300 × 3.785 = 1,135.5 L/h.",
            "Переведи галлоны в литры: 300 × 3,785 = 1 135,5 л/ч.",
          ),
          text(
            "Order does not matter: 5 × 3.785 × 60 gives the same 1,135.5.",
            "Порядок не важен: 5 × 3,785 × 60 даёт те же 1 135,5.",
          ),
        ],
        answer: text("1,135.5 liters per hour.", "1 135,5 литра в час."),
        desmos: ["5*3.785*60"],
      },
    ],
    desmos: [
      {
        title: text("Chain conversion in one expression", "Цепочка перевода одним выражением"),
        goal: text(
          "Convert a rate with two units without losing track of which factor goes on top.",
          "Перевести скорость с двумя единицами, не потеряв, какой множитель сверху.",
        ),
        steps: [
          {
            title: text("Enter the value and the factors", "Введи значение и множители"),
            expressions: ["54*1000/3600"],
            note: text(
              "Read it as 54 km/h × 1000 m/km ÷ 3600 s/h. The result is 15 m/s.",
              "Читай как 54 км/ч × 1000 м/км ÷ 3600 с/ч. Результат — 15 м/с.",
            ),
          },
          {
            title: text("Check with the shortcut", "Проверь коротким правилом"),
            expressions: ["54/3.6"],
            note: text(
              "The same 15 confirms the chain. Use 3.6 only for km/h to m/s.",
              "Те же 15 подтверждают цепочку. 3,6 работает только для км/ч → м/с.",
            ),
          },
        ],
        speed: text(
          "Type the whole chain once and reuse it by editing only the first number.",
          "Введи всю цепочку один раз и меняй только первое число.",
        ),
        caution: text(
          "Put the unit you are removing on the opposite side of the fraction. Getting this backwards multiplies by the factor squared.",
          "Ставь сокращаемую единицу с противоположной стороны дроби. Ошибка здесь умножает на коэффициент в квадрате.",
        ),
      },
      {
        title: text("Compare price per unit", "Сравни цену за единицу"),
        goal: text(
          "Decide which package is the better buy by reducing both to dollars per ounce.",
          "Решить, какая упаковка выгоднее, приведя обе к долларам за унцию.",
        ),
        steps: [
          {
            title: text("Small package", "Маленькая упаковка"),
            expressions: ["3.60/12"],
            note: text("$0.30 per ounce.", "0,30 $ за унцию."),
          },
          {
            title: text("Large package", "Большая упаковка"),
            expressions: ["5.60/20"],
            note: text("$0.28 per ounce, so the large package is cheaper per ounce.", "0,28 $ за унцию — большая упаковка дешевле за унцию."),
          },
        ],
        speed: text(
          "Unit price turns every better-buy question into two divisions.",
          "Цена за единицу превращает любой вопрос о выгоде в два деления.",
        ),
      },
    ],
    strategy: [
      text(
        "Write the units, not just the numbers. Cancelling km and h on paper tells you the answer is in m/s before you divide.",
        "Пиши единицы, а не только числа. Сокращение км и ч на бумаге показывает, что ответ в м/с, ещё до деления.",
      ),
      text(
        "For two-unit rates, convert one unit at a time. Two short chains have fewer errors than one combined factor.",
        "Для скоростей с двумя единицами переводи по одной. Две короткие цепочки надёжнее одного составного коэффициента.",
      ),
      text(
        "Estimate first: 54 km/h should be much smaller in m/s (about 15), while 5 gal/min should be much larger in L/h. The estimate catches inverted factors.",
        "Сначала оцени: 54 км/ч в м/с должно быть заметно меньше (около 15), а 5 гал/мин в л/ч — заметно больше. Оценка ловит перевёрнутые коэффициенты.",
      ),
    ],
    pitfalls: [
      text(
        "Multiplying when you should divide. Going from a smaller unit to a larger unit (meters to kilometers) divides; going the other way multiplies.",
        "Умножать там, где нужно делить. Переход от меньшей единицы к большей (метры в километры) — деление; обратный переход — умножение.",
      ),
      text(
        "Using a linear factor for area or volume. A 2 m by 3 m rug is 6 m², which is 60,000 cm², not 600 cm².",
        "Использовать линейный коэффициент для площади или объёма. Ковёр 2 м на 3 м — это 6 м², то есть 60 000 см², а не 600 см².",
      ),
      text(
        "Mixing currencies or units across a rate. Convert both the money and the quantity before comparing prices.",
        "Смешивать валюты или единицы в скорости. Переводи и деньги, и количество до сравнения цен.",
      ),
    ],
    practice: [
      {
        id: "m-data-units-p1",
        prompt: text(
          "How many seconds are in 2.25 hours?",
          "Сколько секунд в 2,25 часа?",
        ),
        options: [text("135", "135"), text("7,500", "7 500"), text("8,100", "8 100"), text("9,000", "9 000")],
        correctIndex: 2,
        explanation: text(
          "2.25 hours × 60 minutes/hour = 135 minutes, then 135 × 60 = 8,100 seconds. Multiplying directly: 2.25 × 3,600 = 8,100. The 135 choice stops at minutes.",
          "2,25 часа × 60 минут = 135 минут, затем 135 × 60 = 8 100 секунд. Напрямую: 2,25 × 3 600 = 8 100. Вариант 135 останавливается на минутах.",
        ),
        difficulty: "easy",
        desmos: ["2.25*3600"],
      },
      {
        id: "m-data-units-p2",
        prompt: text(
          "A car gets 45 miles per gallon and gas costs $3.60 per gallon. What is the fuel cost for a 360-mile trip?",
          "Автомобиль расходует 1 галлон на 45 миль, бензин стоит 3,60 $ за галлон. Сколько стоит топливо на поездку в 360 миль?",
        ),
        options: [text("$25.20", "25,20 $"), text("$28.80", "28,80 $"), text("$32.40", "32,40 $"), text("$36.00", "36,00 $")],
        correctIndex: 1,
        explanation: text(
          "Gallons used: 360 ÷ 45 = 8. Cost: 8 × 3.60 = $28.80. Multiplying miles by price directly ignores the miles-per-gallon rate.",
          "Израсходовано галлонов: 360 ÷ 45 = 8. Стоимость: 8 × 3,60 = 28,80 $. Прямое умножение миль на цену игнорирует расход.",
        ),
        difficulty: "medium",
        desmos: ["(360/45)*3.60"],
      },
      {
        id: "m-data-units-p3",
        prompt: text(
          "Using 1 mile = 1.609 kilometers, what is 8 kilometers in miles, to the nearest hundredth?",
          "Считая 1 миля = 1,609 километра, сколько миль в 8 километрах? Округли до сотых.",
        ),
        options: [text("3.97", "3,97"), text("4.97", "4,97"), text("5.14", "5,14"), text("12.87", "12,87")],
        correctIndex: 1,
        explanation: text(
          "Kilometers are smaller than miles, so divide: 8 ÷ 1.609 ≈ 4.97. Multiplying gives 12.87, which is the conversion in the wrong direction.",
          "Километры меньше миль, поэтому делим: 8 ÷ 1,609 ≈ 4,97. Умножение даёт 12,87 — перевод в неверную сторону.",
        ),
        difficulty: "medium",
        desmos: ["8/1.609"],
      },
      {
        id: "m-data-units-p4",
        prompt: text(
          "A machine produces 2,400 units in an 8-hour shift. What is its production rate in units per minute?",
          "Станок выпускает 2 400 деталей за 8-часовую смену. Какова его производительность в деталях в минуту?",
        ),
        options: [text("4", "4"), text("5", "5"), text("6", "6"), text("300", "300")],
        correctIndex: 1,
        explanation: text(
          "An 8-hour shift is 480 minutes. Then 2,400 ÷ 480 = 5 units per minute. The 300 choice is units per hour, not per minute.",
          "8-часовая смена — это 480 минут. Тогда 2 400 ÷ 480 = 5 деталей в минуту. Вариант 300 — это детали в час, а не в минуту.",
        ),
        difficulty: "easy",
        desmos: ["2400/(8*60)"],
      },
    ],
  },
  {
    id: "m-data-statistics",
    section: "math",
    domainId: "data",
    order: 19,
    title: text("Center, spread, and standard deviation", "Центр, разброс и стандартное отклонение"),
    subtitle: text(
      "What the mean hides, what the median survives, and what standard deviation measures.",
      "Что скрывает среднее, что переживает медиана и что измеряет стандартное отклонение.",
    ),
    minutes: 14,
    tags: ["mean", "median", "mode", "range", "standard deviation", "spread"],
    objectives: [
      text(
        "Compute mean, median, and mode and explain when each is misleading.",
        "Вычисляй среднее, медиану и моду и объясняй, когда каждое вводит в заблуждение.",
      ),
      text(
        "Describe spread with range and standard deviation and compare two distributions.",
        "Описывай разброс через размах и стандартное отклонение и сравнивай два распределения.",
      ),
      text(
        "Predict how adding a constant or multiplying by a constant changes center and spread.",
        "Предсказывай, как прибавление константы или умножение на константу меняет центр и разброс.",
      ),
    ],
    theory: [
      {
        heading: text("Three measures of center", "Три меры центра"),
        body: text(
          "The mean is the sum divided by the count. The median is the middle value after sorting, or the average of the two middle values for an even count. The mode is the most frequent value. An extreme value pulls the mean toward it but leaves the median nearly unchanged, so the mean is sensitive to outliers and the median is resistant.",
          "Среднее — это сумма, делённая на количество. Медиана — среднее значение после сортировки или среднее двух центральных при чётном количестве. Мода — самое частое значение. Экстремальное значение тянет среднее к себе, но почти не двигает медиану, поэтому среднее чувствительно к выбросам, а медиана устойчива.",
        ),
        formulas: ["mean = sum / count", "median = middle of ordered data"],
      },
      {
        heading: text("Spread and standard deviation", "Разброс и стандартное отклонение"),
        body: text(
          "Range is maximum minus minimum and uses only two points, so one outlier can make it huge. Standard deviation measures the typical distance of values from the mean: it is small when values cluster near the mean and large when they are spread out. You rarely compute it by hand on the SAT; you compare distributions or read it from Desmos.",
          "Размах — это максимум минус минимум; он использует только две точки, поэтому один выброс может сделать его огромным. Стандартное отклонение измеряет типичное расстояние значений от среднего: оно мало, когда значения кучно у среднего, и велико, когда они разбросаны. На SAT его почти никогда не считают вручную — сравнивают распределения или берут значение в Desmos.",
        ),
        formulas: ["range = max − min", "IQR = Q3 − Q1", "SD ≈ typical distance from the mean"],
      },
      {
        heading: text("Shift versus scale", "Сдвиг и масштаб"),
        body: text(
          "Adding the same constant to every value shifts the whole distribution: the mean and median move by that constant, but the spread does not change at all. Multiplying every value by k multiplies the mean and median by k and multiplies the standard deviation by |k|. These two rules answer most transformation questions without recomputing anything.",
          "Прибавление одной константы ко всем значениям сдвигает распределение: среднее и медиана растут на эту константу, а разброс не меняется вовсе. Умножение всех значений на k умножает среднее и медиану на k, а стандартное отклонение — на |k|. Эти два правила решают большинство задач на преобразования без пересчёта.",
        ),
        formulas: ["mean(x + c) = mean(x) + c", "SD(x + c) = SD(x)", "SD(kx) = |k| · SD(x)"],
      },
    ],
    examples: [
      {
        prompt: text(
          "For the data set 4, 7, 7, 9, 13, find the mean, median, mode, and range.",
          "Для набора данных 4, 7, 7, 9, 13 найди среднее, медиану, моду и размах.",
        ),
        steps: [
          text(
            "Sum: 4 + 7 + 7 + 9 + 13 = 40, and there are 5 values, so the mean is 40 ÷ 5 = 8.",
            "Сумма: 4 + 7 + 7 + 9 + 13 = 40, значений 5, значит среднее 40 ÷ 5 = 8.",
          ),
          text(
            "The data are already ordered, so the middle (third) value is the median: 7.",
            "Данные уже упорядочены, поэтому среднее (третье) значение — медиана: 7.",
          ),
          text(
            "The mode is 7 because it appears twice; the range is 13 − 4 = 9.",
            "Мода — 7, потому что встречается дважды; размах 13 − 4 = 9.",
          ),
          text(
            "The mean 8 sits above the median 7 because the value 13 pulls it upward.",
            "Среднее 8 выше медианы 7, потому что значение 13 тянет его вверх.",
          ),
        ],
        answer: text("Mean 8, median 7, mode 7, range 9.", "Среднее 8, медиана 7, мода 7, размах 9."),
        desmos: ["L=[4,7,7,9,13]", "mean(L)", "median(L)", "max(L)-min(L)"],
      },
      {
        prompt: text(
          "Two classes both have a mean score of 70. Class A has a standard deviation of 5 and Class B has a standard deviation of 12. Compare the distributions, then describe what happens if 10 points are added to every score in Class B.",
          "В двух классах средний балл 70. Стандартное отклонение класса A равно 5, класса B — 12. Сравни распределения и опиши, что будет, если к каждому баллу класса B прибавить 10.",
        ),
        steps: [
          text(
            "Same mean means the centers match; the difference is spread.",
            "Одинаковое среднее означает совпадение центров; различие — в разбросе.",
          ),
          text(
            "Class B's standard deviation is more than twice as large, so its scores are much farther from 70 on average.",
            "Стандартное отклонение класса B более чем вдвое больше, значит его баллы в среднем гораздо дальше от 70.",
          ),
          text(
            "Adding 10 to every score moves the Class B mean to 80 but leaves the standard deviation at 12.",
            "Прибавление 10 к каждому баллу сдвигает среднее класса B до 80, но стандартное отклонение остаётся 12.",
          ),
        ],
        answer: text(
          "Class B is more spread out; after adding 10, its mean is 80 with SD still 12.",
          "Класс B более разбросан; после прибавления 10 его среднее 80, а SD по-прежнему 12.",
        ),
        source: "SAT-style",
      },
    ],
    desmos: [
      {
        title: text("Center and spread from one list", "Центр и разброс из одного списка"),
        goal: text(
          "Enter the data once and read every statistic without arithmetic.",
          "Ввести данные один раз и прочитать все статистики без арифметики.",
        ),
        steps: [
          {
            title: text("Define the list", "Задай список"),
            expressions: ["L=[4,7,7,9,13]"],
            note: text(
              "Desmos creates a list named L that every later expression can reuse.",
              "Desmos создаёт список L, который можно использовать дальше.",
            ),
          },
          {
            title: text("Read center", "Прочитай центр"),
            expressions: ["mean(L)", "median(L)"],
            note: text("The mean is 8 and the median is 7.", "Среднее 8, медиана 7."),
          },
          {
            title: text("Read spread", "Прочитай разброс"),
            expressions: ["stdev(L)", "stdevp(L)", "max(L)-min(L)"],
            note: text(
              "stdev is the sample SD (about 3.16); stdevp is the population SD (about 2.83). The range is 9.",
              "stdev — выборочное SD (около 3,16); stdevp — генеральное SD (около 2,83). Размах 9.",
            ),
          },
        ],
        speed: text(
          "Three lines replace the entire by-hand calculation, including the squared deviations.",
          "Три строки заменяют весь ручной расчёт, включая квадраты отклонений.",
        ),
        caution: text(
          "Know which SD your answer choices use. The SAT usually reasons about SD qualitatively, so either version supports the same comparison.",
          "Учитывай, какое SD используют варианты. SAT обычно рассуждает о SD качественно, поэтому оба варианта дают то же сравнение.",
        ),
      },
      {
        title: text("See what shifts and what does not", "Увидеть, что сдвигается, а что нет"),
        goal: text(
          "Test the effect of adding 10 or doubling every value in one screen.",
          "Проверить эффект прибавления 10 или удвоения всех значений на одном экране.",
        ),
        steps: [
          {
            title: text("Baseline", "База"),
            expressions: ["L=[4,7,7,9,13]", "mean(L)", "stdev(L)"],
            note: text("Mean 8, SD about 3.16.", "Среднее 8, SD около 3,16."),
          },
          {
            title: text("Add a constant", "Прибавь константу"),
            expressions: ["mean(L+10)", "stdev(L+10)"],
            note: text(
              "The mean becomes 18 but the SD is unchanged. This is a shift, not a stretch.",
              "Среднее становится 18, но SD не меняется. Это сдвиг, а не растяжение.",
            ),
          },
          {
            title: text("Multiply by a constant", "Умножь на константу"),
            expressions: ["mean(2L)", "stdev(2L)"],
            note: text(
              "Both the mean and the SD double, confirming SD(kL) = |k| · SD(L).",
              "И среднее, и SD удваиваются: SD(kL) = |k| · SD(L).",
            ),
          },
        ],
      },
    ],
    strategy: [
      text(
        "Sort the data before touching median or range. Unsorted lists cause more median errors than any other mistake.",
        "Сортируй данные до работы с медианой и размахом. Неотсортированный список — главная причина ошибок с медианой.",
      ),
      text(
        "If one value looks far from the rest, expect mean above median (right skew) or below median (left skew). Use that to eliminate answers before computing.",
        "Если одно значение сильно отличается, жди среднее выше медианы (правый скос) или ниже (левый скос). Это помогает отбросить варианты до вычислений.",
      ),
      text(
        "For standard deviation questions, compare distances, not values. The set with values farther from its own mean has the larger SD, regardless of the means themselves.",
        "В задачах на стандартное отклонение сравнивай расстояния, а не значения. Больше SD у набора, чьи значения дальше от его собственного среднего, независимо от самих средних.",
      ),
    ],
    pitfalls: [
      text(
        "Adding an outlier and assuming the median changes. The median moves at most to the next data value, while the mean can jump a lot.",
        "Прибавлять выброс и ждать изменения медианы. Медиана сдвигается максимум к соседнему значению, а среднее может прыгнуть сильно.",
      ),
      text(
        "Thinking a larger mean implies a larger standard deviation. The two are independent; a set can have a huge mean and tiny spread.",
        "Считать, что большее среднее означает большее стандартное отклонение. Они независимы: у набора может быть огромное среднее и крошечный разброс.",
      ),
      text(
        "Doubling the standard deviation when adding a constant. Adding shifts the data but does not stretch it, so SD stays the same.",
        "Удваивать стандартное отклонение при прибавлении константы. Прибавление сдвигает данные, но не растягивает их, поэтому SD не меняется.",
      ),
    ],
    practice: [
      {
        id: "m-data-statistics-p1",
        prompt: text(
          "Five numbers have a mean of 12. Four of them are 8, 10, 14, and 15. What is the fifth number?",
          "Среднее пяти чисел равно 12. Четыре из них — 8, 10, 14 и 15. Каково пятое число?",
        ),
        options: [text("11", "11"), text("12", "12"), text("13", "13"), text("14", "14")],
        correctIndex: 2,
        explanation: text(
          "The total must be 5 × 12 = 60. The four known values sum to 8 + 10 + 14 + 15 = 47, so the fifth is 60 − 47 = 13.",
          "Сумма должна быть 5 × 12 = 60. Четыре известных числа дают 8 + 10 + 14 + 15 = 47, значит пятое равно 60 − 47 = 13.",
        ),
        difficulty: "easy",
        desmos: ["5*12-(8+10+14+15)"],
      },
      {
        id: "m-data-statistics-p2",
        prompt: text(
          "For the data set 3, 5, 5, 7, 20, which statement is true?",
          "Для набора данных 3, 5, 5, 7, 20 какое утверждение верно?",
        ),
        options: [
          text("The mean is less than the median.", "Среднее меньше медианы."),
          text("The mean equals the median.", "Среднее равно медиане."),
          text("The mean is greater than the median.", "Среднее больше медианы."),
          text("The mean cannot be compared with the median without more data.", "Среднее нельзя сравнить с медианой без дополнительных данных."),
        ],
        correctIndex: 2,
        explanation: text(
          "The sum is 40 over 5 values, so the mean is 8. The ordered middle value is 5. The outlier 20 pulls the mean above the median, so mean > median.",
          "Сумма 40 на 5 значений, значит среднее 8. Среднее по порядку значение — 5. Выброс 20 тянет среднее выше медианы: среднее > медианы.",
        ),
        difficulty: "medium",
        desmos: ["L=[3,5,5,7,20]", "mean(L)", "median(L)"],
      },
      {
        id: "m-data-statistics-p3",
        prompt: text(
          "Set A is 10, 20, 30, 40, 50. Set B is 28, 29, 30, 31, 32. Both have mean 30. Which set has the larger standard deviation?",
          "Набор A: 10, 20, 30, 40, 50. Набор B: 28, 29, 30, 31, 32. У обоих среднее 30. В каком наборе стандартное отклонение больше?",
        ),
        options: [
          text("Set A, because its values are farther from 30.", "Набор A, потому что его значения дальше от 30."),
          text("Set B, because its values are closer together.", "Набор B, потому что его значения ближе друг к другу."),
          text("They are equal because both means are 30.", "Они равны, потому что средние обоих равны 30."),
          text("It cannot be determined from the values shown.", "Это нельзя определить по данным значениям."),
        ],
        correctIndex: 0,
        explanation: text(
          "Standard deviation measures distance from the mean. Set A has values 20 away from 30, while Set B's values are at most 2 away. Same center, very different spread: Set A has the larger SD.",
          "Стандартное отклонение измеряет расстояние от среднего. В наборе A значения удалены на 20 от 30, а в наборе B — максимум на 2. Центр один, разброс разный: больше SD у набора A.",
        ),
        difficulty: "medium",
        desmos: ["A=[10,20,30,40,50]", "B=[28,29,30,31,32]", "stdev(A)", "stdev(B)"],
      },
      {
        id: "m-data-statistics-p4",
        prompt: text(
          "A data set has mean 40 and standard deviation 6. If 5 is added to every value, what are the new mean and standard deviation?",
          "Набор данных имеет среднее 40 и стандартное отклонение 6. Если к каждому значению прибавить 5, какими станут среднее и стандартное отклонение?",
        ),
        options: [
          text("Mean 45, SD 6", "Среднее 45, SD 6"),
          text("Mean 45, SD 11", "Среднее 45, SD 11"),
          text("Mean 40, SD 6", "Среднее 40, SD 6"),
          text("Mean 40, SD 11", "Среднее 40, SD 11"),
        ],
        correctIndex: 0,
        explanation: text(
          "Adding a constant shifts every value, so the mean increases by 5 to 45. The distances between values do not change, so the standard deviation stays 6.",
          "Прибавление константы сдвигает все значения, поэтому среднее растёт на 5 до 45. Расстояния между значениями не меняются, значит стандартное отклонение остаётся 6.",
        ),
        difficulty: "easy",
        desmos: ["L=[34,40,46]", "mean(L+5)", "stdev(L+5)"],
      },
    ],
  },
  {
    id: "m-data-scatter",
    section: "math",
    domainId: "data",
    order: 20,
    title: text("Scatterplots and lines of best fit", "Scatterplot и линия наилучшего приближения"),
    subtitle: text(
      "Read trends and correlation, draw the line of best fit, and predict from it.",
      "Читай тренды и корреляцию, строй линию наилучшего приближения и предсказывай по ней.",
    ),
    minutes: 13,
    tags: ["scatterplot", "line of best fit", "correlation", "trend", "residual"],
    objectives: [
      text(
        "Describe the direction and strength of association between two variables on a scatterplot.",
        "Описывай направление и силу связи между двумя переменными на scatterplot.",
      ),
      text(
        "Select or use a line of best fit to predict a value from the graph or its equation.",
        "Выбирай или используй линию наилучшего приближения для прогноза значения по графику или уравнению.",
      ),
      text(
        "Interpret slope and intercept of a best-fit line in the context of the data.",
        "Интерпретируй наклон и отрезок линии наилучшего приближения в контексте данных.",
      ),
    ],
    theory: [
      {
        heading: text("Reading a scatterplot", "Чтение scatterplot"),
        body: text(
          "Each point is one observation with an x-value and a y-value. A positive correlation means y tends to increase as x increases; points rise from left to right. A negative correlation means y tends to decrease as x increases; points fall from left to right. A weak association means points are spread far from any line, while a strong association means they cluster tightly around a line.",
          "Каждая точка — одно наблюдение с координатами x и y. Положительная корреляция означает, что y растёт при росте x: точки идут слева направо вверх. Отрицательная корреляция — что y падает при росте x: точки идут слева направо вниз. Слабая связь означает большой разброс точек, сильная — плотное расположение около прямой.",
        ),
        formulas: ["positive correlation: x up, y up", "negative correlation: x up, y down"],
      },
      {
        heading: text("Line of best fit", "Линия наилучшего приближения"),
        body: text(
          "A line of best fit is a straight line that passes through the middle of the points and follows their overall trend. It is the line used for prediction. Given its equation, substitute the given x to get the predicted y. The slope tells how much the predicted y changes for each one-unit increase in x, in the units of the problem.",
          "Линия наилучшего приближения — прямая, проходящая посередине точек и следующая общему тренду. Именно по ней делают прогнозы. Подставь данное значение x в её уравнение и получи предсказанное y. Наклон показывает, на сколько в среднем изменяется предсказанное y при увеличении x на единицу.",
        ),
        formulas: ["predicted y = m x + b", "slope m = change in y per 1 unit of x"],
      },
      {
        heading: text("Residuals and good fit", "Остатки и качество подгонки"),
        body: text(
          "The residual for a point is the actual y minus the predicted y from the line. A positive residual means the point lies above the line; a negative residual means it lies below. If the line captures the trend, residuals are small and positives and negatives roughly balance. A very large residual signals an outlier or a poor fit.",
          "Остаток для точки — это фактическое y минус предсказанное y по прямой. Положительный остаток означает, что точка выше прямой, отрицательный — ниже. Если прямая хорошо описывает тренд, остатки малы, а положительные и отрицательные примерно уравновешены. Очень большой остаток — признак выброса или плохой подгонки.",
        ),
        formulas: ["residual = actual y − predicted y", "predicted y = value on the line at that x"],
      },
    ],
    examples: [
      {
        prompt: text(
          "A scatterplot shows hours studied (x) and test score (y). The line of best fit is y = 5x + 50. What score does the line predict for a student who studied 4 hours?",
          "На scatterplot часы занятий (x) и балл теста (y). Линия наилучшего приближения: y = 5x + 50. Какой балл предскажет прямая для ученика, занимавшегося 4 часа?",
        ),
        steps: [
          text(
            "Identify the cost-free step: substitute x = 4 into the equation of the line.",
            "Пропусти лишнее: подставь x = 4 в уравнение прямой.",
          ),
          text("Compute 5 × 4 + 50 = 20 + 50.", "Вычисли 5 × 4 + 50 = 20 + 50."),
          text("The result, 70, is the predicted score, not necessarily the actual score.", "Результат 70 — это предсказанный балл, а не обязательно фактический."),
          text(
            "Sanity-check: a positive slope matches more studying leading to higher scores.",
            "Проверка: положительный наклон согласуется с ростом балла при росте времени.",
          ),
        ],
        answer: text("A predicted score of 70.", "Предсказанный балл 70."),
        source: "SAT-style",
        desmos: ["5*4+50"],
      },
      {
        prompt: text(
          "A scatterplot of temperature and ice-cream sales shows points rising from left to right and clustered close to a straight line. How would you describe the association?",
          "На scatterplot температуры и продажи мороженого точки идут слева направо вверх и плотно лежат около прямой. Как описать связь?",
        ),
        steps: [
          text(
            "Direction: y rises as x rises, so the correlation is positive.",
            "Направление: y растёт при росте x, значит корреляция положительная.",
          ),
          text(
            "Strength: the points cluster close to a line, so the association is strong.",
            "Сила: точки плотно лежат около прямой, значит связь сильная.",
          ),
          text(
            "Interpretation: warmer temperatures are associated with higher ice-cream sales in this data set.",
            "Интерпретация: более высокая температура связана с более высокими продажами мороженого в этом наборе данных.",
          ),
        ],
        answer: text("A strong positive correlation.", "Сильная положительная корреляция."),
      },
    ],
    desmos: [
      {
        title: text("Plot points and a best-fit line", "Построй точки и прямую наилучшего приближения"),
        goal: text(
          "See the trend and read predictions directly from a line on the graph.",
          "Увидеть тренд и читать прогнозы прямо по прямой на графике.",
        ),
        steps: [
          {
            title: text("Enter the data points", "Введи точки данных"),
            expressions: ["L=[(0,52),(1,58),(2,61),(3,65),(4,70)]"],
            note: text(
              "Each pair is (hours studied, score). The points should rise left to right.",
              "Каждая пара — (часы занятий, балл). Точки должны расти слева направо.",
            ),
          },
          {
            title: text("Add the line of best fit", "Добавь линию наилучшего приближения"),
            expressions: ["y=5x+50"],
            note: text(
              "Compare each point with the line: points close to the line mean a strong fit.",
              "Сравни каждую точку с прямой: близость точек означает хорошую подгонку.",
            ),
          },
          {
            title: text("Predict at x = 4", "Сделай прогноз при x = 4"),
            expressions: ["5*4+50"],
            note: text("The prediction is 70 from the calculator; check that the point (4,70) lies on the line.", "Калькулятор даёт 70; проверь, что точка (4,70) лежит на прямой."),
          },
        ],
        speed: text(
          "One graph replaces sketching by hand and reading off values approximately.",
          "Один график заменяет ручной построение и приблизительное чтение значений.",
        ),
        caution: text(
          "Do not extrapolate far beyond the data range. The line is trustworthy only where points exist.",
          "Не экстраполируй далеко за пределы данных. Прямая надёжна только там, где есть точки.",
        ),
      },
      {
        title: text("Compare actual and predicted values", "Сравни фактические и предсказанные значения"),
        goal: text(
          "Find residuals and judge how well the line fits each point.",
          "Найти остатки и оценить, насколько хорошо прямая подходит к каждой точке.",
        ),
        steps: [
          {
            title: text("Predicted values from the line", "Предсказанные значения по прямой"),
            expressions: ["5*0+50", "5*2+50", "5*4+50"],
            note: text("Predicted scores are 50, 60, and 70 for x = 0, 2, and 4.", "Предсказанные баллы при x = 0, 2, 4 — это 50, 60 и 70."),
          },
          {
            title: text("Residuals", "Остатки"),
            expressions: ["52-(5*0+50)", "61-(5*2+50)", "70-(5*4+50)"],
            note: text(
              "Residuals are 2, 1, and 0: the point at x = 0 is 2 above the line, so the fit is close.",
              "Остатки равны 2, 1 и 0: точка при x = 0 на 2 выше прямой, значит подгонка близкая.",
            ),
          },
        ],
        speed: text(
          "Residuals in one line show fit quality faster than visual guessing.",
          "Остатки в одной строке показывают качество подгонки быстрее визуальной оценки.",
        ),
        caution: text(
          "A small residual for one point does not prove a good overall fit; check all points.",
          "Малый остаток одной точки не доказывает хорошую подгонку в целом; проверь все точки.",
        ),
      },
    ],
    strategy: [
      text(
        "First name the direction, then the strength. Positive and negative answer the first half; clustered or scattered answers the second half.",
        "Сначала назови направление, затем силу. Positive и negative отвечают на первую половину, clustered или scattered — на вторую.",
      ),
      text(
        "To predict, always use the line, not the nearest point. Substitute x into the equation or find the line's value at that x on the graph.",
        "Для прогноза всегда используй прямую, а не ближайшую точку. Подставь x в уравнение или найди значение прямой при этом x на графике.",
      ),
      text(
        "Translate slope into words with units: each additional hour is associated with about 5 more points. That wording often matches an answer choice directly.",
        "Переводи наклон в слова с единицами: каждый дополнительный час связан примерно с 5 баллами. Такая формулировка часто совпадает с вариантом ответа.",
      ),
    ],
    pitfalls: [
      text(
        "Claiming causation from correlation. A scatterplot shows association; it does not prove that changing x causes y.",
        "Утверждать причинность по корреляции. Scatterplot показывает связь, но не доказывает, что изменение x вызывает y.",
      ),
      text(
        "Predicting from a single point instead of the line. Points include noise; the line averages out the trend.",
        "Предсказывать по одной точке вместо прямой. Точки содержат шум; прямая усредняет тренд.",
      ),
      text(
        "Reading slope without units. A slope of 5 means nothing until you say 5 points per hour.",
        "Читать наклон без единиц. Наклон 5 ничего не означает, пока не сказано 5 баллов за час.",
      ),
    ],
    practice: [
      {
        id: "m-data-scatter-p1",
        prompt: text(
          "The line of best fit is y = 3x + 10. What value does it predict for y when x = 6?",
          "Линия наилучшего приближения: y = 3x + 10. Какое значение она предсказывает для y при x = 6?",
        ),
        options: [text("18", "18"), text("20", "20"), text("28", "28"), text("36", "36")],
        correctIndex: 2,
        explanation: text(
          "Substitute x = 6: y = 3 × 6 + 10 = 28. The value 18 multiplies without adding the intercept, and 36 treats the intercept as a multiplier.",
          "Подставь x = 6: y = 3 × 6 + 10 = 28. Вариант 18 умножает без прибавления свободного члена, а 36 трактует его как множитель.",
        ),
        difficulty: "easy",
        desmos: ["3*6+10"],
      },
      {
        id: "m-data-scatter-p2",
        prompt: text(
          "A scatterplot shows that as the price of a product rises, the number of units sold falls, with points scattered loosely around a downward line. How is the association described?",
          "На scatterplot видно: при росте цены товара число проданных единиц падает, а точки слабо кучкуются около нисходящей прямой. Как описать связь?",
        ),
        options: [
          text("Strong positive correlation", "Сильная положительная корреляция"),
          text("Weak negative correlation", "Слабая отрицательная корреляция"),
          text("Strong negative correlation", "Сильная отрицательная корреляция"),
          text("No correlation", "Нет корреляции"),
        ],
        correctIndex: 1,
        explanation: text(
          "Units sold fall as price rises, so the direction is negative. The points are loosely scattered, so the strength is weak. Strong versus weak is judged by how tightly the points cluster.",
          "Число проданных единиц падает при росте цены, поэтому направление отрицательное. Точки разбросаны слабо, значит сила связи слабая. Сравнение по силе — по плотности расположения точек.",
        ),
        difficulty: "medium",
      },
      {
        id: "m-data-scatter-p3",
        prompt: text(
          "If the line of best fit predicts a sales value of 40 and the actual sales value is 47, what is the residual?",
          "Линия наилучшего приближения предсказывает продажи 40, а фактические продажи составили 47. Каков остаток?",
        ),
        options: [text("−7", "−7"), text("7", "7"), text("47", "47"), text("87", "87")],
        correctIndex: 1,
        explanation: text(
          "Residual = actual − predicted = 47 − 40 = 7. A positive residual means the actual value lies above the line. Reversing the subtraction gives −7.",
          "Остаток = фактическое − предсказанное = 47 − 40 = 7. Положительный остаток означает, что фактическое значение выше прямой. Обратное вычитание даёт −7.",
        ),
        difficulty: "easy",
        desmos: ["47-40"],
      },
      {
        id: "m-data-scatter-p4",
        prompt: text(
          "For hearing tests, the line of best fit relating age (x, in years) to threshold (y, in decibels) is y = 0.5x + 5. What does the slope mean in context?",
          "Для проверки слуха линия наилучшего приближения, связывающая возраст (x, в годах) и порог (y, в децибелах), имеет вид y = 0,5x + 5. Что означает наклон в контексте?",
        ),
        options: [
          text("At age 5, the threshold is 0.5 decibels.", "В возрасте 5 лет порог равен 0,5 децибела."),
          text("The predicted threshold starts at 0.5 decibels.", "Предсказанный порог начинается с 0,5 децибела."),
          text("Each additional year is associated with a 0.5-decibel increase in threshold.", "Каждый дополнительный год связан с ростом порога на 0,5 децибела."),
          text("The threshold is 5 decibels for every year of age.", "Порог равен 5 децибелам на каждый год возраста."),
        ],
        correctIndex: 2,
        explanation: text(
          "The slope is the change in y for each one-unit rise in x, so 0.5 is 0.5 decibels per year. The number 5 is the intercept, the predicted value at age 0, not the per-year change.",
          "Наклон — это изменение y при росте x на единицу, то есть 0,5 децибела за год. Число 5 — это свободный член, предсказанное значение в возрасте 0, а не изменение за год.",
        ),
        difficulty: "medium",
        desmos: ["0.5+5"],
      },
    ],
  },
  {
    id: "m-data-probability",
    section: "math",
    domainId: "data",
    order: 21,
    title: text("Probability and two-way tables", "Вероятность и таблицы"),
    subtitle: text(
      "Count outcomes, read two-way tables, and condition probabilities correctly.",
      "Считай исходы, читай таблицы и правильно условливай вероятности.",
    ),
    minutes: 14,
    tags: ["probability", "two-way table", "conditional probability", "expected value", "sample space"],
    objectives: [
      text(
        "Compute simple probabilities as favorable outcomes over total equally likely outcomes.",
        "Вычисляй простые вероятности как отношение благоприятных исходов к общему числу равновероятных исходов.",
      ),
      text(
        "Read joint, marginal, and conditional probabilities from a two-way table.",
        "Читай совместные, маргинальные и условные вероятности из таблицы сопряжённости.",
      ),
      text(
        "Use complements and expected values to solve probability questions quickly.",
        "Используй дополнения и математические ожидания для быстрого решения вероятностных задач.",
      ),
    ],
    theory: [
      {
        heading: text("Probability basics", "Основы вероятности"),
        body: text(
          "Probability is favorable outcomes divided by all possible outcomes when each outcome is equally likely: P = favorable / total. The sample space is the set of all possible outcomes. For equally likely outcomes, counting is enough; the complement trick is to find P(not A) = 1 − P(A) when the complement is easier to count.",
          "Вероятность — это число благоприятных исходов, делённое на общее число, когда все исходы равновероятны: P = благоприятные / все. Пространство исходов — это множество всех возможных исходов. При равновероятных исходах достаточно подсчёта; приём с дополнением: P(не A) = 1 − P(A), когда дополнение легче подсчитать.",
        ),
        formulas: ["P = favorable / total", "P(not A) = 1 − P(A)", "expected value = value × probability"],
      },
      {
        heading: text("Two-way tables", "Таблица сопряжённости"),
        body: text(
          "A two-way table cross-tabulates two categorical variables: rows are one variable, columns are the other, and each cell is a count. The cell gives the joint count. Row totals and column totals are marginal totals. Dividing a cell by the grand total gives a joint probability; dividing by the row or column total gives a conditional probability within that row or column.",
          "Таблица сопряжённости показывает две категориальные переменные: строки — одна переменная, столбцы — другая, каждая клетка — количество. Клетка даёт совместное количество. Итоги по строкам и столбцам — маргинальные итоги. Деление клетки на общий итог даёт совместную вероятность; деление на итог строки или столбца даёт условную вероятность внутри этой строки или столбца.",
        ),
        formulas: ["joint probability = cell / grand total", "P(A | B) = count(A and B) / count(B)"],
      },
      {
        heading: text("Conditional probability and independence", "Условная вероятность и независимость"),
        body: text(
          "A conditional probability restricts the sample space to the given condition. In a two-way table, P(A | B) uses only the row or column of B as the denominator. Events are independent when P(A and B) = P(A) × P(B), which in a table means the conditional probability equals the overall probability of A. Statistical association in a table suggests dependence, not proof of causation.",
          "Условная вероятность ограничивает пространство исходов заданным условием. В таблице P(A | B) использует только строку или столбец B в знаменателе. События независимы, когда P(A и B) = P(A) × P(B), то есть условная вероятность равна общей вероятности A. Связь в таблице предполагает зависимость, а не доказывает причинность.",
        ),
        formulas: ["P(A | B) = P(A and B) / P(B)", "independent: P(A and B) = P(A) × P(B)"],
      },
    ],
    examples: [
      {
        prompt: text(
          "A bag is filled with 5 red marbles and 3 blue marbles. A marble is drawn at random. What is the probability that it is red?",
          "В мешке 5 красных и 3 синих шарика. Наугад вынимают один шарик. Какова вероятность, что он красный?",
        ),
        steps: [
          text(
            "List outcomes: 5 + 3 = 8 equally likely marbles, so the total is 8.",
            "Перечисли исходы: 5 + 3 = 8 равновероятных шариков, значит всего 8.",
          ),
          text(
            "Favorable outcomes for red are 5.",
            "Благоприятных исходов для красного — 5.",
          ),
          text("Divide: P(red) = 5/8.", "Раздели: P(красный) = 5/8."),
          text(
            "As a decimal that is 0.625, or 62.5%.",
            "В десятичной форме это 0,625, или 62,5%.",
          ),
        ],
        answer: text("5/8, or 0.625.", "5/8, или 0,625."),
        desmos: ["5/8"],
      },
      {
        prompt: text(
          "A survey of 120 students gives a table: 40 girls, of whom 25 own a pet; 80 boys, of whom 30 own a pet. What is P(owns a pet | girl)?",
          "Опрос 120 учеников дал таблицу: девочек 40, из них 25 с домашними животными; мальчиков 80, из них 30 с животными. Найти P(есть питомец | девочка).",
        ),
        steps: [
          text(
            "Condition on girl, so the sample space is only the 40 girls, not all 120 students.",
            "Условие — девочка, значит пространство исходов — только 40 девочек, а не все 120 учеников.",
          ),
          text(
            "Girls with a pet: 25.",
            "Девочек с питомцем: 25.",
          ),
          text("Divide: 25/40 = 5/8 = 0.625.", "Раздели: 25/40 = 5/8 = 0,625."),
          text(
            "Compare with boys: 30/80 = 0.375. Girls in this survey are more likely to own a pet.",
            "Для мальчиков: 30/80 = 0,375. Девочки в опросе чаще владельцы питомцев.",
          ),
        ],
        answer: text("5/8, or 0.625.", "5/8, или 0,625."),
        source: "SAT-style",
        desmos: ["25/40", "30/80"],
      },
    ],
    desmos: [
      {
        title: text("Simple probability in one division", "Простая вероятность одним делением"),
        goal: text(
          "Turn counts into probabilities and complements without fraction arithmetic.",
          "Превратить количества в вероятности и дополнения без ручной арифметики дробей.",
        ),
        steps: [
          {
            title: text("Enter favorable and total", "Введи благоприятное и общее"),
            expressions: ["5/8"],
            note: text("P(red) = 0.625. Change 5 or 8 to test new counts instantly.", "P(красный) = 0,625. Поменяй 5 или 8 и сразу проверь новые количества."),
          },
          {
            title: text("Complement", "Дополнение"),
            expressions: ["1-5/8"],
            note: text("P(blue) = 0.375 by the complement, confirmed by 3/8.", "P(синий) = 0,375 по дополнению, подтверждается как 3/8."),
          },
        ],
        speed: text(
          "One fraction replaces a full probability setup when outcomes are equally likely.",
          "Одна дробь заменяет полную схему, когда исходы равновероятны.",
        ),
        caution: text(
          "Equally likely assumption matters. Dice, cards, and marbles fit; non-uniform situations do not.",
          "Предположение о равновероятности важно. Кости, карты и шарики подходят; неравномерные ситуации — нет.",
        ),
      },
      {
        title: text("Two-way table conditional probability", "Условная вероятность по таблице"),
        goal: text(
          "Read joint and conditional probabilities from the same four numbers.",
          "Прочитать совместные и условные вероятности из тех же четырёх чисел.",
        ),
        steps: [
          {
            title: text("Joint probability", "Совместная вероятность"),
            expressions: ["25/120"],
            note: text("P(girl and pet) = 25/120, about 0.208.", "P(девочка и питомец) = 25/120, около 0,208."),
          },
          {
            title: text("Conditional probability", "Условная вероятность"),
            expressions: ["25/40"],
            note: text(
              "P(pet | girl) conditions on the 40 girls, giving 0.625. The denominator is the condition, not the grand total.",
              "P(питомец | девочка) условлено 40 девочками и даёт 0,625. Знаменатель — условие, а не общий итог.",
            ),
          },
          {
            title: text("Marginal probabilities", "Маргинальные вероятности"),
            expressions: ["40/120", "55/120"],
            note: text(
              "P(girl) = 40/120 and P(pet) = 55/120. Compare P(pet | girl) = 0.625 with P(pet) = 0.458 to see dependence.",
              "P(девочка) = 40/120 и P(питомец) = 55/120. Сравни P(питомец | девочка) = 0,625 с P(питомец) = 0,458 — видна зависимость.",
            ),
          },
        ],
        speed: text(
          "Typing cell over row total versus cell over grand total prevents the most common table error.",
          "Ввод клетки над итогом строки против клетки над общим итогом предотвращает самую частую ошибку.",
        ),
        caution: text(
          "Always ask which group the condition names. The denominator must be that group alone.",
          "Всегда спрашивай, какую группу называет условие. Знаменателем должна быть именно эта группа.",
        ),
      },
    ],
    strategy: [
      text(
        "Use the condition as the denominator. The words given that or among mean only that subgroup counts in the total.",
        "Бери условие за знаменатель. Слова given that или among означают, что в итог входят только члены этой подгруппы.",
      ),
      text(
        "When asked for not, use the complement 1 − P. It turns a long count into one subtraction.",
        "Когда просят not, используй дополнение 1 − P. Это превращает длинный подсчёт в одно вычитание.",
      ),
      text(
        "Check independence by comparing numbers in the table: if conditional and overall probabilities differ, the variables are associated in this sample.",
        "Проверяй независимость сравнением чисел в таблице: если условная и общая вероятности различаются, переменные связаны в этой выборке.",
      ),
    ],
    pitfalls: [
      text(
        "Using the grand total for a conditional probability. P(pet | girl) is 25/40, not 25/120.",
        "Использовать общий итог для условной вероятности. P(питомец | девочка) — это 25/40, а не 25/120.",
      ),
      text(
        "Confusing P(A and B) with P(A | B). The former divides by everyone; the latter divides only by B.",
        "Путать P(A и B) с P(A | B). Первая делит на всех, вторая — только на B.",
      ),
      text(
        "Assuming independence without checking. Two categories sharing a table are not automatically independent.",
        "Предполагать независимость без проверки. Две категории в одной таблице не независимы автоматически.",
      ),
    ],
    practice: [
      {
        id: "m-data-probability-p1",
        prompt: text(
          "A fair die is rolled. What is the probability of getting an even number?",
          "Брошен честный кубик. Какова вероятность выпадения чётного числа?",
        ),
        options: [text("1/6", "1/6"), text("1/3", "1/3"), text("1/2", "1/2"), text("2/3", "2/3")],
        correctIndex: 2,
        explanation: text(
          "Even outcomes are 2, 4, 6 — three outcomes out of six equally likely faces. So P(even) = 3/6 = 1/2. Counting only one even face gives 1/6.",
          "Чётные исходы — 2, 4, 6: три исхода из шести равновероятных граней. Поэтому P(чётное) = 3/6 = 1/2. Подсчёт одной грани даёт 1/6.",
        ),
        difficulty: "easy",
        desmos: ["3/6"],
      },
      {
        id: "m-data-probability-p2",
        prompt: text(
          "A table shows 120 students: 40 girls (25 with a pet) and 80 boys (30 with a pet). What is P(girl and pet)?",
          "Таблица: 120 учеников — 40 девочек (25 с питомцем) и 80 мальчиков (30 с питомцем). Найти P(девочка и питомец).",
        ),
        options: [text("25/40", "25/40"), text("25/120", "25/120"), text("40/120", "40/120"), text("55/120", "55/120")],
        correctIndex: 1,
        explanation: text(
          "The joint probability divides the cell count by the grand total: 25/120, about 0.208. Dividing by 40 gives the conditional probability P(pet | girl), not the joint probability.",
          "Совместная вероятность делит клетку на общий итог: 25/120, около 0,208. Деление на 40 даёт условную вероятность P(питомец | девочка), а не совместную.",
        ),
        difficulty: "medium",
        desmos: ["25/120"],
      },
      {
        id: "m-data-probability-p3",
        prompt: text(
          "Using the same table as above, what is P(girl | pet)?",
          "Используя ту же таблицу, найти P(девочка | питомец).",
        ),
        options: [text("25/120", "25/120"), text("25/40", "25/40"), text("25/55", "25/55"), text("40/120", "40/120")],
        correctIndex: 2,
        explanation: text(
          "Condition on pet: pet owners total 25 + 30 = 55, and 25 of them are girls. So P(girl | pet) = 25/55, about 0.455. Dividing by 120 is the joint probability, and dividing by 40 conditions on girls instead.",
          "Условие — питомец: всего владельцев 25 + 30 = 55, из них 25 — девочки. Поэтому P(девочка | питомец) = 25/55, около 0,455. Деление на 120 даёт совместную вероятность, а на 40 условливает по девочкам.",
        ),
        difficulty: "medium",
        desmos: ["25/(25+30)"],
      },
      {
        id: "m-data-probability-p4",
        prompt: text(
          "There is a 0.7 probability that a student passes a test. What is the expected number of passes in 20 students?",
          "Вероятность, что ученик сдаст тест, равна 0,7. Каково ожидаемое число сдавших среди 20 учеников?",
        ),
        options: [text("7", "7"), text("10", "10"), text("14", "14"), text("20", "20")],
        correctIndex: 2,
        explanation: text(
          "Expected value is probability times count: 0.7 × 20 = 14. An expectation need not be an integer in general, but here it is. The answer 7 uses the probability as a count without scaling.",
          "Математическое ожидание — это вероятность, умноженная на количество: 0,7 × 20 = 14. В общем случае ожидание может быть нецелым, но здесь оно целое. Ответ 7 не масштабирует вероятность.",
        ),
        difficulty: "easy",
        desmos: ["0.7*20"],
      },
    ],
  },
  {
    id: "m-data-inference",
    section: "math",
    domainId: "data",
    order: 22,
    title: text("Samples, margin of error, and inference", "Выборки, погрешность и выводы"),
    subtitle: text(
      "Read poll results with a margin of error and judge what a sample can prove.",
      "Читай результаты опросов с погрешностью и оцени, что доказывает выборка.",
    ),
    minutes: 12,
    tags: ["sample", "population", "margin of error", "inference", "poll", "bias"],
    objectives: [
      text(
        "Distinguish a sample from a population and explain why random sampling matters.",
        "Различай выборку и генеральную совокупность и объясняй, зачем нужна случайная выборка.",
      ),
      text(
        "Convert a sample percent plus margin of error into an interval for the true value.",
        "Переводи процент выборки плюс погрешность в интервал для истинного значения.",
      ),
      text(
        "Compare two polls and judge whether their difference is meaningful given their margins.",
        "Сравнивай два опроса и оценивай, значима ли разница с учётом их погрешностей.",
      ),
    ],
    theory: [
      {
        heading: text("Samples and populations", "Выборки и совокупности"),
        body: text(
          "The population is everyone or everything the question is about; the sample is the smaller group actually observed. A random sample gives every member a chance to be selected and lets the sample estimate the population. A biased sample, such as volunteers or a convenience group, can be systematically different, and no calculation fixes a biased sample.",
          "Совокупность — это все, о ком вопрос; выборка — та меньшая группа, которую реально наблюдают. Случайная выборка даёт каждому шанс попасть и позволяет оценивать совокупность. Смещённая выборка, например добровольцы или удобная группа, систематически отличается, и вычисления смещение не исправят.",
        ),
        formulas: ["sample estimate = observed percent", "inference: sample → population"],
      },
      {
        heading: text("Margin of error and intervals", "Погрешность и интервалы"),
        body: text(
          "A survey reports an estimate plus a margin of error (MoE), for example 52% ± 3%. That means the true population percent is plausibly anywhere from 49% to 55%. The interval estimate is [estimate − MoE, estimate + MoE]. A claim is supported only if every value in the interval satisfies it, and ruled out if none do; if the interval straddles the claim, the sample is inconclusive.",
          "Опрос сообщает оценку плюс погрешность (MoE), например 52% ± 3%. Это означает, что истинный процент в совокупности правдоподобно лежит от 49% до 55%. Интервальная оценка: [оценка − MoE, оценка + MoE]. Утверждение подтверждено, только если все значения в интервале ему удовлетворяют, и опровергнуто, если ни одно; если интервал пересекает порог — вывод неубедителен.",
        ),
        formulas: ["interval = estimate ± margin of error", "low = estimate − MoE, high = estimate + MoE"],
      },
      {
        heading: text("Comparing polls and sample size", "Сравнение опросов и размер выборки"),
        body: text(
          "Two polls overlap when their intervals intersect; a clear lead requires one poll's interval to sit entirely above the other's. Larger random samples have smaller margins of error, so they pin down the population more tightly. Comparing percents without margins makes a 1-point lead look decisive even when the intervals overlap heavily.",
          "Два опроса перекрываются, когда их интервалы пересекаются; явное лидерство требует, чтобы интервал одного полностью лежал выше интервала другого. Большие случайные выборки имеют меньшую погрешность и точнее определяют совокупность. Сравнение процентов без погрешностей делает лидерство в 1 пункт решающим, даже когда интервалы сильно пересекаются.",
        ),
        formulas: ["larger sample → smaller margin of error", "intervals overlap → difference not conclusive"],
      },
    ],
    examples: [
      {
        prompt: text(
          "A poll finds 52% support for a proposal, with a margin of error of 3 percentage points. Can the poll alone prove that a majority supports the proposal?",
          "Опрос показал 52% поддержки предложения при погрешности 3 процентных пункта. Доказывает ли опрос в одиночку, что большинство поддерживает предложение?",
        ),
        steps: [
          text(
            "Build the interval: 52% − 3% = 49% to 52% + 3% = 55%.",
            "Построй интервал: 52% − 3% = 49% до 52% + 3% = 55%.",
          ),
          text(
            "A majority means more than 50%. The interval extends below 50% (down to 49%).",
            "Большинство означает более 50%. Интервал уходит ниже 50% (до 49%).",
          ),
          text(
            "Because values below 50% are plausible, the poll is inconclusive, not proof of a majority.",
            "Поскольку значения ниже 50% правдоподобны, опрос неубедителен, а не доказывает большинство.",
          ),
        ],
        answer: text("No; the interval is 49% to 55%, which includes values below 50%.", "Нет; интервал 49%–55% включает значения ниже 50%."),
        desmos: ["52-3", "52+3"],
      },
      {
        prompt: text(
          "Poll A reports 48% ± 2% and Poll B reports 45% ± 4%. Which poll gives stronger evidence of support above 44%, and can Poll A be said to lead Poll B clearly?",
          "Опрос A: 48% ± 2%; опрос B: 45% ± 4%. Какой опрос даёт больше доказательств поддержки выше 44% и можно ли сказать, что A явно лидирует над B?",
        ),
        steps: [
          text(
            "Poll A's interval is 46% to 50%; every value is above 44%, so support above 44% is supported.",
            "Интервал опроса A: 46%–50%; все значения выше 44%, значит поддержка выше 44% подтверждена.",
          ),
          text(
            "Poll B's interval is 41% to 49%; it includes values at or below 44%, so it does not establish the same claim.",
            "Интервал опроса B: 41%–49%; включает значения 44% и ниже, значит то же утверждение не установлено.",
          ),
          text(
            "Poll A's interval 46–50 overlaps Poll B's 41–49, so there is no clear lead in the usual interval sense.",
            "Интервал A 46–50 пересекается с интервалом B 41–49, поэтому явного лидерства в обычном смысле нет.",
          ),
        ],
        answer: text(
          "Poll A supports above 44%; the polls' intervals overlap, so no clear lead.",
          "Опрос A подтверждает поддержку выше 44%; интервалы пересекаются, явного лидерства нет.",
        ),
        source: "SAT-style",
        desmos: ["48-2", "48+2", "45-4", "45+4"],
      },
    ],
    desmos: [
      {
        title: text("Turn an estimate into an interval", "Преврати оценку в интервал"),
        goal: text(
          "Compute the low and high ends of a poll result and test a claim.",
          "Вычислить нижнюю и верхнюю границы результата опроса и проверить утверждение.",
        ),
        steps: [
          {
            title: text("Lower bound", "Нижняя граница"),
            expressions: ["52-3"],
            note: text("The interval starts at 49%, below a 50% majority.", "Интервал начинается с 49% — ниже большинства в 50%."),
          },
          {
            title: text("Upper bound", "Верхняя граница"),
            expressions: ["52+3"],
            note: text("The interval ends at 55%. Since it straddles 50%, the majority claim is inconclusive.", "Интервал заканчивается на 55%. Поскольку он пересекает 50%, утверждение о большинстве неубедительно."),
          },
        ],
        speed: text(
          "Two subtractions replace a paragraph of interval reasoning.",
          "Два вычитания заменяют абзац рассуждений об интервалах.",
        ),
        caution: text(
          "Margin of error is in percentage points, not percent of the estimate. Add 3 points to 52% to get 55%, not 52% × 1.03.",
          "Погрешность — в процентных пунктах, а не в процентах от оценки. К 52% прибавляют 3 пункта и получают 55%, а не 52% × 1,03.",
        ),
      },
      {
        title: text("Compare two polls' intervals", "Сравни интервалы двух опросов"),
        goal: text(
          "Decide overlap and which claims each poll supports.",
          "Определить пересечение и какие утверждения поддерживает каждый опрос.",
        ),
        steps: [
          {
            title: text("Poll A interval", "Интервал опроса A"),
            expressions: ["48-2", "48+2"],
            note: text("46% to 50%: entirely above 44%.", "46%–50%: полностью выше 44%."),
          },
          {
            title: text("Poll B interval", "Интервал опроса B"),
            expressions: ["45-4", "45+4"],
            note: text(
              "41% to 49%: straddles 44% and overlaps Poll A from 46% to 49%.",
              "41%–49%: пересекает 44% и пересекается с опросом A на отрезке 46%–49%.",
            ),
          },
        ],
        speed: text(
          "Listing intervals side by side makes overlap obvious.",
          "Список интервалов рядом делает пересечение очевидным.",
        ),
        caution: text(
          "Overlap means not conclusive by the simple interval rule; it does not prove the values are equal.",
          "Пересечение означает неубедительность по простому правилу интервалов; оно не доказывает равенства значений.",
        ),
      },
    ],
    strategy: [
      text(
        "Always expand estimate ± MoE first. Most SAT questions about polls reduce to checking whether an interval crosses a number.",
        "Всегда сначала раскрывай оценку ± MoE. Большинство вопросов SAT об опроса сводятся к проверке, пересекает ли интервал число.",
      ),
      text(
        "For a claim like above 50%, ask whether the low end already clears it (supported), the high end falls short (ruled out), or the interval straddles it (inconclusive).",
        "Для утверждения вроде «выше 50%» спрашивай: уже ли нижняя граница выше (подтверждено), не дотягивает ли верхняя (опровергнуто) или интервал пересекает (неубедительно).",
      ),
      text(
        "Prefer the poll with the smaller margin when the samples are both random. A tighter interval is stronger evidence.",
        "Предпочитай опрос с меньшей погрешностью, если обе выборки случайные. Более тесный интервал — более сильное доказательство.",
      ),
    ],
    pitfalls: [
      text(
        "Ignoring the margin of error and treating 52% as an exact population value. The sample percent alone proves nothing about the population.",
        "Игнорировать погрешность и считать 52% точным значением совокупности. Процент выборки сам по себе ничего не доказывает о совокупности.",
      ),
      text(
        "Declaring a winner when intervals overlap. If the intervals intersect, the safe conclusion is that the difference is not established.",
        "Объявлять победителя при пересекающихся интервалах. Если интервалы пересекаются, безопасный вывод — разница не установлена.",
      ),
      text(
        "Trusting a biased sample because the margin is small. A tiny margin from a biased sample is precisely wrong, not approximately right.",
        "Доверять смещённой выборке из-за малой погрешности. Малая погрешность смещённой выборки даёт точно неверный результат, а не приблизительно верный.",
      ),
    ],
    practice: [
      {
        id: "m-data-inference-p1",
        prompt: text(
          "A survey reports 60% ± 5% for a candidate. What is the interval for the candidate's true support?",
          "Опрос сообщает 60% ± 5% для кандидата. Каков интервал для его истинной поддержки?",
        ),
        options: [text("55% to 65%", "55%–65%"), text("57% to 63%", "57%–63%"), text("60% to 65%", "60%–65%"), text("55% to 60%", "55%–60%")],
        correctIndex: 0,
        explanation: text(
          "Low = 60 − 5 = 55 and high = 60 + 5 = 65, so the interval is 55% to 65%. The 57% to 63% interval uses only 3 points of margin.",
          "Низ = 60 − 5 = 55, верх = 60 + 5 = 65, значит интервал 55%–65%. Интервал 57%–63% использует только 3 пункта.",
        ),
        difficulty: "easy",
        desmos: ["60-5", "60+5"],
      },
      {
        id: "m-data-inference-p2",
        prompt: text(
          "A poll of volunteers on a gym website finds 80% approval of a new gym policy, with a small margin of error. What is the main problem for inferring city-wide opinion?",
          "Опрос добровольцев на сайте спортзала показал 80% одобрения новой политики при малой погрешности. В чём главная проблема для вывода об общегородском мнении?",
        ),
        options: [
          text("The sample is biased; volunteers who visit the gym site may differ from all residents.", "Выборка смещена; добровольцы с сайта спортзала могут отличаться от всех жителей."),
          text("The margin of error is too small.", "Погрешность слишком мала."),
          text("The sample percent is too high.", "Процент выборки слишком высок."),
          text("80% is not a majority.", "80% — это не большинство."),
        ],
        correctIndex: 0,
        explanation: text(
          "Volunteers on a gym site are a convenience sample, not a random sample of the city. A small margin of error measures sampling variability only; it cannot remove systematic bias. The 80% figure may describe gym users but not all residents.",
          "Добровольцы на сайте спортзала — удобная выборка, а не случайная выборка города. Малая погрешность измеряет только случайную изменчивость и не устраняет систематическое смещение. Цифра 80% может описывать посетителей, но не всех жителей.",
        ),
        difficulty: "medium",
      },
      {
        id: "m-data-inference-p3",
        prompt: text(
          "Two random polls report 46% ± 4% and 42% ± 4% for the same candidate in the same city. Can the first poll be said to show a clearly higher level of support than the second?",
          "Два случайных опроса сообщают 46% ± 4% и 42% ± 4% для одного кандидата в одном городе. Можно ли сказать, что первый опрос явно показывает более высокую поддержку, чем второй?",
        ),
        options: [
          text("Yes, because 46% is greater than 42%.", "Да, потому что 46% больше 42%."),
          text("No, because the intervals 42–50% and 38–46% overlap (they meet at 46%).", "Нет, потому что интервалы 42–50% и 38–46% пересекаются (касаются в 46%)."),
          text("Yes, because both margins equal 4%.", "Да, потому что обе погрешности равны 4%."),
          text("No, because random polls can never be compared.", "Нет, потому что случайные опросы нельзя сравнивать."),
        ],
        correctIndex: 1,
        explanation: text(
          "The first interval is 42% to 50% and the second is 38% to 46%. They share the endpoint 46% and overlap broadly, so the simple interval criterion finds no clear lead. Comparing point estimates alone ignores that overlap.",
          "Первый интервал — 42%–50%, второй — 38%–46%. Они имеют общую границу 46% и существенно пересекаются, поэтому по простому критерию явного лидерства нет. Сравнение точечных оценок игнорирует это пересечение.",
        ),
        difficulty: "medium",
        desmos: ["46-4", "46+4", "42-4", "42+4"],
      },
      {
        id: "m-data-inference-p4",
        prompt: text(
          "A random sample of 100 voters gives 55% ± 8%, and a random sample of 1,600 voters gives 55% ± 2%, both for the same question. Which result is more precise for inferring the population, and why?",
          "Случайная выборка из 100 избирателей даёт 55% ± 8%, а случайная выборка из 1 600 избирателей даёт 55% ± 2% по тому же вопросу. Какой результат точнее для вывода о совокупности и почему?",
        ),
        options: [
          text("The 100-voter poll, because a smaller sample is always better.", "Опрос на 100 избирателей, потому что меньшая выборка всегда лучше."),
          text("The 1,600-voter poll, because a larger random sample has a smaller margin of error.", "Опрос на 1 600 избирателей, потому что большая случайная выборка имеет меньшую погрешность."),
          text("They are equally precise because both estimates are 55%.", "Они одинаково точны, потому что обе оценки — 55%."),
          text("Neither can support any inference.", "Ни один не может поддерживать выводы."),
        ],
        correctIndex: 1,
        explanation: text(
          "Both point estimates are 55%, but the larger random sample narrows the interval to 53%–57% versus 47%–63%. A tighter interval is more informative about the population. The small poll's interval even includes values below 50%.",
          "Обе точечные оценки равны 55%, но большая случайная выборка сужает интервал до 53%–57% против 47%–63%. Более тесный интервал даёт больше информации о совокупности. Интервал малой выборки включает даже значения ниже 50%.",
        ),
        difficulty: "hard",
        desmos: ["55-8", "55+8", "55-2", "55+2"],
      },
    ],
  },
  // PART2
];
