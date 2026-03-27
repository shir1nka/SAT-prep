import { localized as t, question } from "./sat-learn-base";
import type { PracticeMode, QuestionBuilder } from "./sat-learn-expansion";

export const MATH_EXPANSION_BUILDERS: Record<string, QuestionBuilder> = {
  "linear-equations": buildLinearEquationQuestions,
  "linear-functions": buildLinearFunctionQuestions,
  "ratios-rates-percent": buildRatioQuestions,
  "probability-data": buildProbabilityQuestions,
  "factoring-quadratics": buildQuadraticQuestions,
  "function-notation": buildFunctionNotationQuestions,
  "area-volume": buildAreaVolumeQuestions,
  "right-triangles-trig": buildTriangleQuestions,
  "systems-modeling": buildSystemsQuestions,
  "timed-mixed-set": buildTimedMixedQuestions,
};

function buildLinearEquationQuestions(seed: number, mode: PracticeMode, skillId: string) {
  const target = 2 + (seed % 5);
  const coefficient = 3 + (seed % 3);
  const offset = 2 + (seed % 4);
  const constant = 4 + (seed % 6);
  const rightConstant = coefficient * (target - offset) + constant - target;
  const qValue = 6 + seed;
  const pValue = 2 + (seed % 4);
  const solution = (qValue - 3) * pValue;

  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        `Solve ${coefficient}(x - ${offset}) + ${constant} = x + ${rightConstant}.`,
        `Реши ${coefficient}(x - ${offset}) + ${constant} = x + ${rightConstant}.`
      ),
      options: numericOptions([target - 2, target, target + 2, target + 4]),
      correctIndex: 1,
      explanation: t(
        `Expand, collect like terms, and isolate x. The equation simplifies to x = ${target}.`,
        `Раскрой скобки, собери подобные и изолируй x. Уравнение упрощается до x = ${target}.`
      ),
      hint: t(
        "Distribute first, then move x-terms together before dividing.",
        "Сначала раскрой скобки, затем собери x в одной части и только потом дели."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        `After simplifying, you get ${coefficient + 1}x + ${constant} = ${rightConstant + constant}. What is the best next step?`,
        `После упрощения получилось ${coefficient + 1}x + ${constant} = ${rightConstant + constant}. Какой следующий шаг лучший?`
      ),
      options: [
        t(`Subtract ${constant} from both sides`, `Вычесть ${constant} из обеих частей`),
        t(`Add ${coefficient + 1} to both sides`, `Прибавить ${coefficient + 1} к обеим частям`),
        t("Multiply both sides by x", "Умножить обе части на x"),
        t("Divide both sides by the constant term", "Разделить обе части на свободный член"),
      ],
      correctIndex: 0,
      explanation: t(
        "Remove the constant near the variable before dividing by the coefficient.",
        "Сначала убираем свободный член рядом с переменной, а уже потом делим на коэффициент."
      ),
      hint: t(
        "Ask yourself which part is attached to x right now.",
        "Спроси себя, какая часть сейчас мешает x."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        `Solve x/${pValue} + 3 = ${qValue}.`,
        `Реши x/${pValue} + 3 = ${qValue}.`
      ),
      options: numericOptions([solution - pValue, solution, solution + pValue, solution + 2 * pValue]),
      correctIndex: 1,
      explanation: t(
        `Subtract 3 first to get x/${pValue} = ${qValue - 3}, then multiply by ${pValue}. So x = ${solution}.`,
        `Сначала вычти 3 и получи x/${pValue} = ${qValue - 3}, затем умножь на ${pValue}. Получаем x = ${solution}.`
      ),
      hint: t(
        "Undo the outside operation before undoing the division.",
        "Сначала убери внешнюю операцию, а уже потом деление."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function buildLinearFunctionQuestions(seed: number, mode: PracticeMode, skillId: string) {
  const x1 = 2 + (seed % 3);
  const x2 = x1 + 3;
  const slope = 4 + (seed % 4);
  const intercept = 6 + (seed % 5);
  const y1 = slope * x1 + intercept;
  const y2 = slope * x2 + intercept;
  const months = 5 + (seed % 3);
  const total = slope * months + intercept;

  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        `A plan costs ${y1} dollars after ${x1} months and ${y2} dollars after ${x2} months. Assuming a linear model, what is the monthly fee?`,
        `План стоит ${y1} долларов через ${x1} месяца и ${y2} долларов через ${x2} месяцев. Если модель линейная, какова месячная плата?`
      ),
      options: numericOptions([slope - 2, slope, slope + 2, slope + 4]),
      correctIndex: 1,
      explanation: t(
        `The total cost increased by ${y2 - y1} over ${x2 - x1} months, so the monthly rate is ${(y2 - y1) / (x2 - x1)}.`,
        `Общая стоимость выросла на ${y2 - y1} за ${x2 - x1} месяцев, значит месячная ставка равна ${(y2 - y1) / (x2 - x1)}.`
      ),
      hint: t(
        "Use change in output over change in input.",
        "Используй изменение выхода, делённое на изменение входа."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        `A company models cost with y = ${slope}x + ${intercept}. What does ${intercept} represent?`,
        `Компания моделирует стоимость формулой y = ${slope}x + ${intercept}. Что означает ${intercept}?`
      ),
      options: [
        t("The starting amount before any units are used", "Стартовую сумму до использования любых единиц"),
        t("The amount the cost changes every hour", "Величину изменения цены каждый час"),
        t("The maximum possible cost", "Максимально возможную стоимость"),
        t("The point where the graph must cross the x-axis", "Точку обязательного пересечения с осью x"),
      ],
      correctIndex: 0,
      explanation: t(
        "The intercept is the output when x = 0, so it represents the starting fee.",
        "Intercept - это значение функции при x = 0, то есть стартовый сбор."
      ),
      hint: t(
        "Ask what happens before the activity begins.",
        "Спроси себя, что происходит до начала процесса."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        `If y = ${slope}x + ${intercept}, what is y when x = ${months}?`,
        `Если y = ${slope}x + ${intercept}, чему равно y при x = ${months}?`
      ),
      options: numericOptions([total - slope, total, total + slope, total + intercept]),
      correctIndex: 1,
      explanation: t(
        `Substitute ${months} for x: ${slope}(${months}) + ${intercept} = ${total}.`,
        `Подставь ${months} вместо x: ${slope}(${months}) + ${intercept} = ${total}.`
      ),
      hint: t(
        "Once you know the rule, substitute the input directly.",
        "Когда правило уже известно, просто подставь входное значение."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function buildRatioQuestions(seed: number, mode: PracticeMode, skillId: string) {
  const original = 40 + seed * 2;
  const increase = 10 + (seed % 4) * 5;
  const increased = Math.round(original * (1 + increase / 100));
  const boys = 10 + (seed % 5);
  const girls = boys + 8;
  const total = boys + girls;
  const unitCost = 3 + (seed % 4);
  const totalCost = unitCost * 5;

  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        `An item costs ${original} dollars and increases by ${increase}%. What is the new price?`,
        `Товар стоит ${original} долларов и дорожает на ${increase}%. Какова новая цена?`
      ),
      options: numericOptions([increased - 4, increased, increased + 4, original + increase]),
      correctIndex: 1,
      explanation: t(
        `Percent increase uses the original amount as the base, so the new price is ${increased}.`,
        `При увеличении на процент исходное значение остаётся базой, поэтому новая цена равна ${increased}.`
      ),
      hint: t(
        "Use the original amount, not the changed amount, as the base.",
        "Используй исходную сумму как базу, а не изменённую."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        `A group has ${boys} boys and ${girls} girls. What is the ratio of boys to all students?`,
        `В группе ${boys} мальчиков и ${girls} девочек. Каково отношение мальчиков ко всем ученикам?`
      ),
      options: [
        t(`${boys}:${girls}`, `${boys}:${girls}`),
        t(`${boys}:${total}`, `${boys}:${total}`),
        t(`${girls}:${total}`, `${girls}:${total}`),
        t(`${girls}:${boys}`, `${girls}:${boys}`),
      ],
      correctIndex: 1,
      explanation: t(
        `Boys to all means ${boys}:${total}, not boys to girls.`,
        `Мальчики ко всем - это ${boys}:${total}, а не мальчики к девочкам.`
      ),
      hint: t(
        "Read the second quantity in the ratio very carefully.",
        "Очень внимательно прочитай вторую величину в отношении."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        `If 5 notebooks cost ${totalCost} dollars, what is the unit rate in dollars per notebook?`,
        `Если 5 тетрадей стоят ${totalCost} долларов, какова стоимость одной тетради?`
      ),
      options: numericOptions([unitCost - 1, unitCost, unitCost + 1, unitCost + 2]),
      correctIndex: 1,
      explanation: t(
        `Unit rate means divide total cost by total notebooks: ${totalCost}/5 = ${unitCost}.`,
        `Unit rate означает разделить общую стоимость на число тетрадей: ${totalCost}/5 = ${unitCost}.`
      ),
      hint: t(
        "Per one item means divide by the number of items.",
        "Фраза per one item означает деление на количество предметов."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function buildProbabilityQuestions(seed: number, mode: PracticeMode, skillId: string) {
  const red = 3 + (seed % 4);
  const blue = 2 + (seed % 3);
  const green = 2 + (seed % 2);
  const total = red + blue + green;
  const meanBase = 8 + seed;
  const added = meanBase + 6;
  const newMean = (meanBase * 4 + added) / 5;
  const withoutReplacementNumerator = red * blue;
  const withoutReplacementDenominator = total * (total - 1);

  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        `A bag contains ${red} red, ${blue} blue, and ${green} green marbles. What is the probability of drawing a red marble first?`,
        `В мешке ${red} красных, ${blue} синих и ${green} зелёных шариков. Какова вероятность первым вытащить красный?`
      ),
      options: [
        t(`${red}/${total}`, `${red}/${total}`),
        t(`${blue}/${total}`, `${blue}/${total}`),
        t(`${red}/${blue}`, `${red}/${blue}`),
        t(`${green}/${total}`, `${green}/${total}`),
      ],
      correctIndex: 0,
      explanation: t(
        `Probability is favorable over total, so the answer is ${red}/${total}.`,
        `Вероятность - это подходящие исходы к общему числу, поэтому ответ ${red}/${total}.`
      ),
      hint: t(
        "Count how many outcomes work and how many outcomes exist in total.",
        "Посчитай, сколько исходов подходит и сколько исходов существует всего."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        `Four numbers have a mean of ${meanBase}. A fifth number, ${added}, is added. What is the new mean?`,
        `Четыре числа имеют среднее ${meanBase}. Добавили пятое число ${added}. Каким стало новое среднее?`
      ),
      options: numericOptions([newMean - 1, newMean, newMean + 1, newMean + 3]),
      correctIndex: 1,
      explanation: t(
        `The original total is 4 x ${meanBase} = ${meanBase * 4}. Add ${added}, then divide by 5 to get ${newMean}.`,
        `Исходная сумма равна 4 x ${meanBase} = ${meanBase * 4}. Добавь ${added}, затем раздели на 5 и получишь ${newMean}.`
      ),
      hint: t(
        "Turn the old mean back into a total before adding the new value.",
        "Сначала преврати старое среднее обратно в сумму, а уже потом добавляй новое число."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        `Using the same bag, what is the probability of drawing a red marble first and then a blue marble without replacement?`,
        `Используя тот же мешок, какова вероятность вытащить сначала красный, а затем синий шарик без возвращения?`
      ),
      options: [
        t(`${withoutReplacementNumerator}/${withoutReplacementDenominator}`, `${withoutReplacementNumerator}/${withoutReplacementDenominator}`),
        t(`${red}/${total}`, `${red}/${total}`),
        t(`${blue}/${total}`, `${blue}/${total}`),
        t(`${red + blue}/${total}`, `${red + blue}/${total}`),
      ],
      correctIndex: 0,
      explanation: t(
        `Multiply the probabilities: ${red}/${total} x ${blue}/${total - 1} = ${withoutReplacementNumerator}/${withoutReplacementDenominator}.`,
        `Перемножь вероятности: ${red}/${total} x ${blue}/${total - 1} = ${withoutReplacementNumerator}/${withoutReplacementDenominator}.`
      ),
      hint: t(
        "Without replacement changes the second denominator.",
        "Без возвращения меняется второй знаменатель."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function buildQuadraticQuestions(seed: number, mode: PracticeMode, skillId: string) {
  const left = 2 + (seed % 4);
  const right = 3 + (seed % 4);
  const sum = left + right;
  const product = left * right;
  const rootA = 1 + (seed % 4);
  const rootB = rootA + 2;

  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        `Which expression factors to (x + ${left})(x + ${right})?`,
        `Какое выражение раскладывается на (x + ${left})(x + ${right})?`
      ),
      options: [
        t(`x^2 + ${sum}x + ${product}`, `x^2 + ${sum}x + ${product}`),
        t(`x^2 + ${product}x + ${sum}`, `x^2 + ${product}x + ${sum}`),
        t(`x^2 - ${sum}x + ${product}`, `x^2 - ${sum}x + ${product}`),
        t(`x^2 + ${sum}x - ${product}`, `x^2 + ${sum}x - ${product}`),
      ],
      correctIndex: 0,
      explanation: t(
        `The middle coefficient is the sum ${sum}, and the constant is the product ${product}.`,
        `Средний коэффициент - сумма ${sum}, а свободный член - произведение ${product}.`
      ),
      hint: t(
        "For x^2 + bx + c, the factors must add to b and multiply to c.",
        "Для x^2 + bx + c множители должны суммироваться в b и перемножаться в c."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        `Solve x^2 - ${rootA + rootB}x + ${rootA * rootB} = 0.`,
        `Реши x^2 - ${rootA + rootB}x + ${rootA * rootB} = 0.`
      ),
      options: [
        t(`x = ${rootA} or x = ${rootB}`, `x = ${rootA} или x = ${rootB}`),
        t(`x = -${rootA} or x = -${rootB}`, `x = -${rootA} или x = -${rootB}`),
        t(`x = ${rootA + rootB}`, `x = ${rootA + rootB}`),
        t(`x = ${rootA * rootB}`, `x = ${rootA * rootB}`),
      ],
      correctIndex: 0,
      explanation: t(
        `The quadratic factors to (x - ${rootA})(x - ${rootB}) = 0, so the roots are ${rootA} and ${rootB}.`,
        `Квадратное уравнение раскладывается как (x - ${rootA})(x - ${rootB}) = 0, значит корни ${rootA} и ${rootB}.`
      ),
      hint: t(
        "Set the equation equal to zero before using the zero-product idea.",
        "Сначала приравняй выражение к нулю, а затем используй идею нулевого произведения."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        `Which value of c makes x^2 + cx + ${product} factor into two positive integer binomials?`,
        `Какое значение c делает x^2 + cx + ${product} разложимым на два биномиала с положительными целыми коэффициентами?`
      ),
      options: numericOptions([sum - 2, sum, sum + 2, sum + 4]),
      correctIndex: 1,
      explanation: t(
        `You need two positive integers whose product is ${product} and whose sum is c. The pair ${left} and ${right} gives c = ${sum}.`,
        `Нужны два положительных целых числа с произведением ${product} и суммой c. Пара ${left} и ${right} даёт c = ${sum}.`
      ),
      hint: t(
        "The constant term tells you the product of the two integers.",
        "Свободный член подсказывает произведение двух целых чисел."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function buildFunctionNotationQuestions(seed: number, mode: PracticeMode, skillId: string) {
  const factor = 2 + (seed % 4);
  const constant = 1 + (seed % 5);
  const input = 3 + (seed % 4);
  const result = factor * input + constant;
  const gInput = 2 + (seed % 3);
  const gValue = factor * gInput + constant;
  const composed = gValue * gValue - 2;

  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        `If f(x) = ${factor}x + ${constant}, what is f(${input})?`,
        `Если f(x) = ${factor}x + ${constant}, чему равно f(${input})?`
      ),
      options: numericOptions([result - factor, result, result + factor, result + constant]),
      correctIndex: 1,
      explanation: t(
        `Substitute ${input} for x: ${factor}(${input}) + ${constant} = ${result}.`,
        `Подставь ${input} вместо x: ${factor}(${input}) + ${constant} = ${result}.`
      ),
      hint: t(
        "Function notation is an instruction. Replace x with the new input.",
        "Обозначение функции - это инструкция. Замени x новым входом."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        `If f(x) = x^2 - 2 and g(x) = ${factor}x + ${constant}, what is f(g(${gInput}))?`,
        `Если f(x) = x^2 - 2 и g(x) = ${factor}x + ${constant}, чему равно f(g(${gInput}))?`
      ),
      options: numericOptions([composed - 4, composed, composed + 4, composed + 8]),
      correctIndex: 1,
      explanation: t(
        `First compute g(${gInput}) = ${gValue}. Then evaluate f(${gValue}) = ${gValue}^2 - 2 = ${composed}.`,
        `Сначала найди g(${gInput}) = ${gValue}. Затем вычисли f(${gValue}) = ${gValue}^2 - 2 = ${composed}.`
      ),
      hint: t(
        "Composition means do the inside function first.",
        "Composition означает сначала выполнить внутреннюю функцию."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        `If h(x) = ${factor}x + ${constant} and h(x) = ${result}, what is x?`,
        `Если h(x) = ${factor}x + ${constant} и h(x) = ${result}, чему равно x?`
      ),
      options: numericOptions([input - 1, input, input + 1, input + 3]),
      correctIndex: 1,
      explanation: t(
        `Solve ${factor}x + ${constant} = ${result}. That gives x = ${input}.`,
        `Реши ${factor}x + ${constant} = ${result}. Получаем x = ${input}.`
      ),
      hint: t(
        "Turn the function statement back into an equation.",
        "Преобразуй запись функции обратно в обычное уравнение."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function buildAreaVolumeQuestions(seed: number, mode: PracticeMode, skillId: string) {
  const length = 4 + (seed % 4);
  const width = 7 + (seed % 5);
  const area = length * width;
  const radius = 2 + (seed % 4);
  const height = 4 + (seed % 5);
  const volume = radius * radius * height;

  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        `What is the area of a rectangle with side lengths ${length} and ${width}?`,
        `Какова площадь прямоугольника со сторонами ${length} и ${width}?`
      ),
      options: numericOptions([area - length, area, area + width, area + length]),
      correctIndex: 1,
      explanation: t(
        `Area of a rectangle is length times width, so ${length} x ${width} = ${area}.`,
        `Площадь прямоугольника равна длине, умноженной на ширину, то есть ${length} x ${width} = ${area}.`
      ),
      hint: t(
        "Match the shape to the correct formula before plugging in values.",
        "Сначала соотнеси фигуру с формулой, а уже потом подставляй числа."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        `A cylinder has radius ${radius} and height ${height}. What is its volume in terms of pi?`,
        `У цилиндра радиус ${radius} и высота ${height}. Чему равен его объём в терминах pi?`
      ),
      options: [
        t(`${volume - radius}pi`, `${volume - radius}pi`),
        t(`${volume}pi`, `${volume}pi`),
        t(`${radius * height}pi`, `${radius * height}pi`),
        t(`${volume + radius}pi`, `${volume + radius}pi`),
      ],
      correctIndex: 1,
      explanation: t(
        `Volume of a cylinder is pi r^2 h = pi x ${radius}^2 x ${height} = ${volume}pi.`,
        `Объём цилиндра равен pi r^2 h = pi x ${radius}^2 x ${height} = ${volume}pi.`
      ),
      hint: t(
        "Volume is three-dimensional, so the radius must be squared first.",
        "Объём трёхмерный, поэтому радиус сначала нужно возвести в квадрат."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        "If every side length of a rectangle is doubled, what happens to its area?",
        "Если каждую сторону прямоугольника удвоить, что произойдёт с его площадью?"
      ),
      options: [
        t("It doubles", "Она удвоится"),
        t("It triples", "Она утроится"),
        t("It becomes 4 times as large", "Она станет в 4 раза больше"),
        t("It stays the same", "Она не изменится"),
      ],
      correctIndex: 2,
      explanation: t(
        "Doubling both dimensions multiplies area by 2 x 2 = 4.",
        "Удвоение обеих сторон умножает площадь на 2 x 2 = 4."
      ),
      hint: t(
        "Area depends on two dimensions, so both changes compound.",
        "Площадь зависит от двух измерений, поэтому оба изменения усиливают эффект."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function buildTriangleQuestions(seed: number, mode: PracticeMode, skillId: string) {
  const legA = 3 + (seed % 4);
  const legB = 4 + (seed % 4);
  const hypotenuse = Math.round(Math.sqrt(legA * legA + legB * legB));
  const opposite = 3 + (seed % 5);
  const scaledHypotenuse = opposite * 5;
  const oppositeLength = opposite * 3;

  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        `A right triangle has legs ${legA} and ${legB}. Which number is closest to the hypotenuse?`,
        `У прямоугольного треугольника катеты ${legA} и ${legB}. Какое число ближе всего к гипотенузе?`
      ),
      options: numericOptions([hypotenuse - 1, hypotenuse, hypotenuse + 1, hypotenuse + 3]),
      correctIndex: 1,
      explanation: t(
        `Use the Pythagorean theorem. The hypotenuse is closest to ${hypotenuse}.`,
        `Используй теорему Пифагора. Гипотенуза ближе всего к ${hypotenuse}.`
      ),
      hint: t(
        "If two sides are known, start with a^2 + b^2 = c^2.",
        "Если известны две стороны, начинай с a^2 + b^2 = c^2."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        `In a right triangle, sin(theta) = 3/5 and the hypotenuse is ${scaledHypotenuse}. What is the length of the side opposite theta?`,
        `В прямоугольном треугольнике sin(theta) = 3/5, а гипотенуза равна ${scaledHypotenuse}. Какова длина стороны напротив theta?`
      ),
      options: numericOptions([oppositeLength - opposite, oppositeLength, oppositeLength + opposite, oppositeLength + 2 * opposite]),
      correctIndex: 1,
      explanation: t(
        `Since sin(theta) = opposite/hypotenuse = 3/5, the opposite side is ${oppositeLength}.`,
        `Так как sin(theta) = opposite/hypotenuse = 3/5, противоположная сторона равна ${oppositeLength}.`
      ),
      hint: t(
        "SOH means sine equals opposite over hypotenuse.",
        "SOH означает, что sine равен opposite over hypotenuse."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        "Which side in a right triangle is always the hypotenuse?",
        "Какая сторона в прямоугольном треугольнике всегда является гипотенузой?"
      ),
      options: [
        t("The shortest side", "Самая короткая сторона"),
        t("The side opposite the right angle", "Сторона напротив прямого угла"),
        t("Any side next to theta", "Любая сторона рядом с theta"),
        t("The vertical side only", "Только вертикальная сторона"),
      ],
      correctIndex: 1,
      explanation: t(
        "The hypotenuse is defined as the side opposite the right angle.",
        "Гипотенуза определяется как сторона напротив прямого угла."
      ),
      hint: t(
        "Start with the definition before thinking about trig ratios.",
        "Сначала вспомни определение, а уже потом думай о тригонометрии."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function buildSystemsQuestions(seed: number, mode: PracticeMode, skillId: string) {
  const adult = 10 + (seed % 5);
  const student = adult - 4;
  const totalOne = 2 * adult + 3 * student;
  const totalTwo = 4 * adult + student;

  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        `Two adult tickets and three student tickets cost ${totalOne} dollars. Four adult tickets and one student ticket cost ${totalTwo} dollars. What is the student ticket price?`,
        `Два взрослых билета и три студенческих стоят ${totalOne} долларов. Четыре взрослых билета и один студенческий стоят ${totalTwo} долларов. Сколько стоит студенческий билет?`
      ),
      options: numericOptions([student - 2, student, student + 2, adult]),
      correctIndex: 1,
      explanation: t(
        `Write 2a + 3s = ${totalOne} and 4a + s = ${totalTwo}. Solving gives s = ${student}.`,
        `Запиши 2a + 3s = ${totalOne} и 4a + s = ${totalTwo}. Решение даёт s = ${student}.`
      ),
      hint: t(
        "Write one equation for each condition before choosing elimination or substitution.",
        "Сначала запиши по одному уравнению на каждое условие, а уже потом выбирай elimination или substitution."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        "When is a system of equations the strongest model choice?",
        "Когда система уравнений является самым сильным выбором модели?"
      ),
      options: [
        t("When one condition describes everything", "Когда одно условие полностью описывает задачу"),
        t("When two conditions describe the same unknown quantities", "Когда два условия описывают одни и те же неизвестные величины"),
        t("When the problem has no numbers at all", "Когда в задаче вообще нет чисел"),
        t("When only one answer choice is shown", "Когда показан только один вариант ответа"),
      ],
      correctIndex: 1,
      explanation: t(
        "Systems are best when the same quantities are constrained in two different ways.",
        "Системы лучше всего работают, когда одни и те же величины ограничены двумя разными условиями."
      ),
      hint: t(
        "Look for repeated unknowns tied together by multiple statements.",
        "Ищи повторяющиеся неизвестные, связанные несколькими утверждениями."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        "A problem says the total number of apples and oranges is 20, and apples are 4 more than oranges. Which system matches the story?",
        "В задаче сказано, что общее число яблок и апельсинов равно 20, а яблок на 4 больше, чем апельсинов. Какая система соответствует условию?"
      ),
      options: [
        t("a + o = 20 and a = o + 4", "a + o = 20 и a = o + 4"),
        t("a - o = 20 and a + o = 4", "a - o = 20 и a + o = 4"),
        t("a + 4 = o and a + o = 24", "a + 4 = o и a + o = 24"),
        t("a = 20 and o = 4", "a = 20 и o = 4"),
      ],
      correctIndex: 0,
      explanation: t(
        "One equation captures the total and the other captures the difference between the same two quantities.",
        "Одно уравнение задаёт сумму, а второе - разницу между теми же двумя величинами."
      ),
      hint: t(
        "Translate the story one condition at a time.",
        "Переводи условие по одной связи за раз."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function buildTimedMixedQuestions(seed: number, mode: PracticeMode, skillId: string) {
  const estimateOne = 45 + seed;
  const estimateTwo = 18 + seed;
  const estimatedSum = Math.round(Math.sqrt(estimateOne) + Math.sqrt(estimateTwo));

  return [
    question({
      id: `${skillId}-q1`,
      prompt: t(
        `Which value is closest to sqrt(${estimateOne}) + sqrt(${estimateTwo})?`,
        `Какое значение ближе всего к sqrt(${estimateOne}) + sqrt(${estimateTwo})?`
      ),
      options: numericOptions([estimatedSum - 2, estimatedSum, estimatedSum + 2, estimatedSum + 4]),
      correctIndex: 1,
      explanation: t(
        `Estimate each radical using nearby perfect squares. The sum is closest to ${estimatedSum}.`,
        `Оцени каждый корень через соседние полные квадраты. Сумма ближе всего к ${estimatedSum}.`
      ),
      hint: t(
        "This is an estimation question, so you do not need perfect exact values.",
        "Это задача на оценку, поэтому точное значение до конца не нужно."
      ),
      difficulty: mode.difficulties[0],
    }),
    question({
      id: `${skillId}-q2`,
      prompt: t(
        "Which move usually helps most under a time limit?",
        "Какой ход обычно помогает больше всего под таймером?"
      ),
      options: [
        t("Using the longest complete method every time", "Всегда использовать самый длинный полный метод"),
        t("Choosing the quickest reliable method for the exact ask", "Выбирать самый быстрый надёжный метод под конкретный вопрос"),
        t("Ignoring answer choices completely", "Полностью игнорировать варианты ответа"),
        t("Rewriting the entire problem before solving", "Переписывать всю задачу до решения"),
      ],
      correctIndex: 1,
      explanation: t(
        "Time improves when method choice matches the question type and the answer choices.",
        "Время улучшается, когда выбор метода совпадает с типом вопроса и вариантами ответа."
      ),
      hint: t(
        "Think about efficiency, not just correctness.",
        "Думай не только о правильности, но и об эффективности."
      ),
      difficulty: mode.difficulties[1],
    }),
    question({
      id: `${skillId}-q3`,
      prompt: t(
        "A question asks which graph best represents a linear situation. What is the fastest reliable first check?",
        "Вопрос спрашивает, какой график лучше всего описывает линейную ситуацию. Какой первый шаг самый быстрый и надёжный?"
      ),
      options: [
        t("Check whether the graph has a constant rate of change", "Проверить, имеет ли график постоянную скорость изменения"),
        t("Choose the graph with the most points", "Выбрать график с наибольшим числом точек"),
        t("Choose the graph with the steepest line", "Выбрать график с самым крутым наклоном"),
        t("Ignore the context and compare colors", "Игнорировать контекст и сравнивать цвета"),
      ],
      correctIndex: 0,
      explanation: t(
        "Linear situations are defined by constant rate of change, so that is the fastest structural check.",
        "Линейные ситуации определяются постоянной скоростью изменения, поэтому это самый быстрый структурный тест."
      ),
      hint: t(
        "Start with the feature that defines linearity.",
        "Начни с признака, который определяет линейность."
      ),
      difficulty: mode.difficulties[2],
    }),
  ];
}

function numericOptions(values: number[]) {
  return values.map((value) => t(String(value), String(value)));
}
