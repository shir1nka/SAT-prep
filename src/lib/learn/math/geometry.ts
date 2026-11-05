import { text, type Topic } from "../types";

export const GEOMETRY_TOPICS: Topic[] = [
  {
    id: "m-geo-angles",
    section: "math",
    domainId: "geometry",
    order: 23,
    title: text("Angles, parallel lines, and triangles", "Углы, параллельные прямые, треугольники"),
    subtitle: text("Vertical, corresponding, and interior angles", "Вертикальные, соответственные и внутренние углы"),
    minutes: 12,
    tags: ["angles", "parallel lines", "triangles"],
    objectives: [
      text("Find unknown angles formed by intersecting lines and parallel lines cut by a transversal", "Находить неизвестные углы при пересечении прямых и при пересечении параллельных прямых секущей"),
      text("Use the triangle angle sum 180 degrees to solve for missing angles", "Использовать сумму углов треугольника 180 градусов для нахождения недостающих углов"),
      text("Apply exterior angle relationships inside and outside triangles", "Применять соотношения для внешнего угла треугольника"),
    ],
    theory: [
      {
        heading: text("Intersecting lines", "Пересекающиеся прямые"),
        body: text("Vertical opposite angles are equal. Adjacent angles on a straight line form a linear pair and sum to 180 degrees. Supplementary angles sum to 180 degrees, while complementary angles sum to 90 degrees.", "Вертикальные углы равны. Смежные углы на прямой прямой в сумме дают 180 градусов. Два угла дополняют друг друга до 180 градусов, а до 90 градусов — это дополнительные углы."),
        formulas: ["vertical angles are equal", "linear pair = 180 degrees"],
      },
      {
        heading: text("Parallel lines and a transversal", "Параллельные прямые и секущая"),
        body: text("When two parallel lines are cut by a transversal, corresponding angles are equal, alternate interior angles are equal, and same-side interior angles are supplementary. Mark the parallel lines first, then match the angle positions.", "Когда две параллельные прямые пересекаются секущей, соответственные углы равны, накрест лежащие внутренние углы равны, а односторонние внутренние углы в сумме дают 180 градусов. Сначала отметьте параллельные прямые, затем сопоставьте положения углов."),
        formulas: ["corresponding angles equal", "alternate interior angles equal", "same-side interior = 180 degrees"],
      },
      {
        heading: text("Angles in a triangle", "Углы в треугольнике"),
        body: text("The three interior angles of any triangle sum to 180 degrees. An exterior angle equals the sum of the two non-adjacent remote interior angles, and an exterior angle is supplementary to its adjacent interior angle.", "Сумма трёх внутренних углов любого треугольника равна 180 градусам. Внешний угол равен сумме двух не смежных с ним внутренних углов, а также дополняет смежный внутренний угол до 180 градусов."),
        formulas: ["A + B + C = 180 degrees", "exterior angle = sum of remote interiors"],
      },
    ],
    examples: [
      {
        prompt: text("Two parallel lines are cut by a transversal. One angle measures 115 degrees. Find the adjacent angle on the same straight line and the vertical opposite angle.", "Две параллельные прямые пересекаются секущей. Один угол равен 115 градусам. Найдите смежный угол на той же прямой и вертикальный угол."),
        steps: [
          text("Identify the angle next to 115 degrees on a straight line: it forms a linear pair, so it sums with 115 degrees to 180 degrees.", "Определим угол рядом со 115 градусами на прямой: он образует пару смежных углов, поэтому в сумме с 115 градусами даёт 180 градусов."),
          text("Subtract: 180 - 115 = 65. The adjacent angle is 65 degrees.", "Вычтем: 180 − 115 = 65. Смежный угол равен 65 градусам."),
          text("Vertical opposite angles are equal, so the angle opposite 115 degrees is also 115 degrees.", "Вертикальные углы равны, поэтому угол напротив 115 градусов тоже равен 115 градусам."),
          text("Check: 115 + 65 = 180 on the straight line, and the vertical pair matches.", "Проверим: 115 + 65 = 180 на прямой, а пара вертикальных углов совпадает."),
        ],
        answer: text("Adjacent angle 65 degrees; vertical opposite angle 115 degrees", "Смежный угол 65 градусов; вертикальный угол 115 градусов"),
        source: "SAT-style: parallel lines",
        desmos: ["y = x + 0", "y = -x + 115"],
      },
      {
        prompt: text("In triangle ABC, angle A is 52 degrees and angle B is 68 degrees. Find angle C and the exterior angle at C.", "В треугольнике ABC угол A равен 52 градусам, угол B равен 68 градусам. Найдите угол C и внешний угол при вершине C."),
        steps: [
          text("Use the triangle sum: A + B + C = 180 degrees.", "Используем сумму углов: A + B + C = 180 градусов."),
          text("Add the known angles: 52 + 68 = 120.", "Сложим известные углы: 52 + 68 = 120."),
          text("Subtract from 180: 180 - 120 = 60. Angle C is 60 degrees.", "Вычтем из 180: 180 − 120 = 60. Угол C равен 60 градусам."),
          text("The exterior angle at C is supplementary to 60 degrees: 180 - 60 = 120 degrees. It also equals 52 + 68 = 120 degrees.", "Внешний угол при C дополняет 60 градусов до 180: 180 − 60 = 120 градусов. Он также равен 52 + 68 = 120 градусам."),
        ],
        answer: text("Angle C = 60 degrees; exterior angle at C = 120 degrees", "Угол C = 60 градусов; внешний угол при C = 120 градусов"),
        source: "SAT-style: triangle angles",
        desmos: ["x + y = 180"],
      },
    ],
    desmos: [
      {
        title: text("See parallel lines cut by a transversal", "Параллельные прямые и секущая в Desmos"),
        goal: text("Visualise equal corresponding angles", "Увидеть равные соответственные углы"),
        steps: [
          {
            title: text("Plot the parallel lines", "Построить параллельные прямые"),
            expressions: ["y = 2x + 1", "y = 2x + 6"],
            note: text("Both lines have slope 2, so they never meet.", "Обе прямые имеют наклон 2, поэтому не пересекаются."),
          },
          {
            title: text("Add the transversal", "Добавить секущую"),
            expressions: ["y = -3x + 10"],
          },
        ],
        speed: text("Fast: check slopes match before solving by hand.", "Быстро: сначала проверьте равенство наклонов, затем решайте вручную."),
        caution: text("Desmos does not label the angle types — name them yourself.", "Desmos не подписывает типы углов — назовите их сами."),
      },
      {
        title: text("Check triangle angles sum to 180", "Проверка суммы углов треугольника"),
        goal: text("Confirm 52 + 68 + 60 = 180", "Убедиться, что 52 + 68 + 60 = 180"),
        steps: [
          {
            title: text("Plot the vertices", "Задать вершины"),
            expressions: ["A = (0, 0)", "B = (6, 0)", "C = (2, 4)"],
          },
          {
            title: text("Draw the triangle", "Построить треугольник"),
            expressions: ["polygon(A, B, C)"],
          },
        ],
      },
    ],
    strategy: [
      text("Label every angle on the diagram before calculating, then mark equal angles with the same arc mark.", "Подпишите все углы на чертеже перед вычислениями и отметьте равные углы одинаковыми дугами."),
      text("For parallel lines, first decide whether the two angles are equal or supplementary.", "Для параллельных прямых сначала определите, равны ли углы или в сумме дают 180 градусов."),
      text("In triangles, write the equation A + B + C = 180 with the known values before solving.", "В треугольниках запишите уравнение A + B + C = 180 с известными значениями перед решением."),
    ],
    pitfalls: [
      text("Calling same-side interior angles equal — they are supplementary, not equal.", "Считать односторонние внутренние углы равными — они в сумме дают 180 градусов, а не равны."),
      text("Forgetting that a straight line is 180 degrees, not 90 degrees.", "Забывать, что развёрнутый угол равен 180 градусам, а не 90 градусам."),
      text("Using the exterior angle as if it were interior — it is outside the triangle.", "Принимать внешний угол за внутренний — он находится вне треугольника."),
    ],
    practice: [
      {
        id: "m-geo-angles-p1",
        prompt: text("Parallel lines are cut by a transversal. One corresponding angle is 74 degrees. What is the alternate interior angle on the opposite side?", "Параллельные прямые пересекаются секущей. Один соответственный угол равен 74 градусам. Чему равен накрест лежащий внутренний угол с противоположной стороны?"),
        options: [text("74 degrees", "74 градуса"), text("106 degrees", "106 градусов"), text("34 degrees", "34 градуса"), text("16 degrees", "16 градусов")],
        correctIndex: 0,
        explanation: text("Alternate interior angles formed by parallel lines are equal, so the angle is 74 degrees.", "Накрест лежащие внутренние углы при параллельных прямых равны, поэтому угол равен 74 градусам."),
        difficulty: "easy",
        desmos: ["y = x + 0", "y = x + 5", "y = -x + 8"],
      },
      {
        id: "m-geo-angles-p2",
        prompt: text("A triangle has angles 90 degrees and 35 degrees. What is the third angle?", "В треугольнике два угла равны 90 и 35 градусам. Чему равен третий угол?"),
        options: [text("45 degrees", "45 градусов"), text("55 degrees", "55 градусов"), text("65 degrees", "65 градусов"), text("125 degrees", "125 градусов")],
        correctIndex: 1,
        explanation: text("180 - 90 - 35 = 55, so the third angle is 55 degrees.", "180 − 90 − 35 = 55, поэтому третий угол равен 55 градусам."),
        difficulty: "easy",
      },
      {
        id: "m-geo-angles-p3",
        prompt: text("An exterior angle of a triangle is 132 degrees. What is the adjacent interior angle?", "Внешний угол треугольника равен 132 градусам. Чему равен смежный внутренний угол?"),
        options: [text("42 degrees", "42 градуса"), text("48 degrees", "48 градусов"), text("132 degrees", "132 градуса"), text("96 degrees", "96 градусов")],
        correctIndex: 1,
        explanation: text("Exterior and adjacent interior angles form a linear pair: 180 - 132 = 48 degrees.", "Внешний и смежный внутренний углы образуют линейную пару: 180 − 132 = 48 градусов."),
        difficulty: "medium",
      },
      {
        id: "m-geo-angles-p4",
        prompt: text("An isosceles triangle has vertex angle 36 degrees. The base angles are equal. What is each base angle?", "В равнобедренном треугольнике угол при вершине равен 36 градусам, углы при основании равны. Чему равен каждый угол при основании?"),
        options: [text("36 degrees", "36 градусов"), text("54 degrees", "54 градуса"), text("72 degrees", "72 градуса"), text("108 degrees", "108 градусов")],
        correctIndex: 2,
        explanation: text("(180 - 36) / 2 = 144 / 2 = 72 degrees for each base angle.", "(180 − 36) / 2 = 144 / 2 = 72 градуса для каждого угла при основании."),
        difficulty: "medium",
        desmos: ["A = (0, 0)", "B = (6, 0)", "C = (3, 4)", "polygon(A, B, C)"],
      },
    ],
  },
  {
    id: "m-geo-similarity",
    section: "math",
    domainId: "geometry",
    order: 24,
    title: text("Similarity and congruence", "Подобие и равенство фигур"),
    subtitle: text("Scale factors, corresponding parts, and equal figures", "Коэффициент подобия, соответственные элементы и равные фигуры"),
    minutes: 12,
    tags: ["similarity", "congruence", "scale factor"],
    objectives: [
      text("Use scale factors to find corresponding side lengths and perimeters", "Использовать коэффициент подобия для нахождения соответственных сторон и периметров"),
      text("Match corresponding angles and sides in similar triangles", "Сопоставлять соответствующие углы и стороны в подобных треугольниках"),
      text("Distinguish congruent figures from similar figures", "Различать равные и подобные фигуры"),
    ],
    theory: [
      {
        heading: text("Similar figures", "Подобные фигуры"),
        body: text("Similar figures have the same shape: corresponding angles are equal and corresponding sides are proportional. The scale factor is image length divided by original length. Lengths scale by k, perimeters by k, and areas by k squared.", "Подобные фигуры имеют одинаковую форму: соответствующие углы равны, а соответствующие стороны пропорциональны. Коэффициент подобия — это отношение стороны образа к стороне оригинала. Длины умножаются на k, периметры на k, а площади на k в квадрате."),
        formulas: ["image / original = k", "area scale = k^2"],
      },
      {
        heading: text("Congruent figures", "Равные фигуры"),
        body: text("Congruent figures are identical in shape and size. All corresponding sides and angles are equal. Congruent triangles can be proven by SSS, SAS, ASA, or AAS. The symbol for congruence is the same as equality for sets of lengths.", "Равные фигуры совпадают по форме и размеру. Все соответствующие стороны и углы равны. Равенство треугольников доказывается по трём сторонам, двум сторонам и углу, двум углам и стороне и другим признакам."),
        formulas: ["SSS, SAS, ASA, AAS"],
      },
      {
        heading: text("Setting up proportions", "Составление пропорций"),
        body: text("Write proportions with matching positions: small side over large side, or image over original, but keep the order consistent. Cross-multiply to solve for the unknown length.", "Записывайте пропорции с сопоставлением позиций: меньшая сторона к большей или образ к оригиналу, но сохраняйте порядок. Для нахождения неизвестной длины используйте перекрёстное умножение."),
        formulas: ["a/b = c/d gives a*d = b*c"],
      },
    ],
    examples: [
      {
        prompt: text("A triangle has sides 6, 8, and 10. A similar triangle is formed with scale factor 1.5 from the original. Find the sides of the new triangle and its perimeter.", "Треугольник имеет стороны 6, 8 и 10. Подобие с коэффициентом 1,5 от оригинала даёт новый треугольник. Найдите его стороны и периметр."),
        steps: [
          text("Multiply each side by 1.5: 6 x 1.5 = 9, 8 x 1.5 = 12, 10 x 1.5 = 15.", "Умножим каждую сторону на 1,5: 6 × 1,5 = 9, 8 × 1,5 = 12, 10 × 1,5 = 15."),
          text("The new sides are 9, 12, and 15.", "Новые стороны равны 9, 12 и 15."),
          text("Add for the perimeter: 9 + 12 + 15 = 36.", "Сложим для периметра: 9 + 12 + 15 = 36."),
          text("Check by scaling the original perimeter 24 x 1.5 = 36, which matches.", "Проверим масштабированием исходного периметра 24 × 1,5 = 36, что совпадает."),
        ],
        answer: text("Sides 9, 12, 15; perimeter 36", "Стороны 9, 12, 15; периметр 36"),
        source: "SAT-style: scale factor",
        desmos: ["A = (0, 0)", "B = (6, 0)", "C = (2, 3)", "A1 = 1.5 * (0, 0)", "B1 = 1.5 * (6, 0)", "C1 = 1.5 * (2, 3)"],
      },
      {
        prompt: text("Two triangles are similar. The side 6 in the first corresponds to side 9 in the second. The side x in the first corresponds to 12 in the second. Find x.", "Два треугольника подобны. Сторона 6 первого треугольника соответствует стороне 9 второго. Сторона x первого соответствует стороне 12 второго. Найдите x."),
        steps: [
          text("Write the proportion small/large: 6/9 = x/12.", "Запишем пропорцию меньший/больший: 6/9 = x/12."),
          text("Simplify 6/9 to 2/3, so 2/3 = x/12.", "Упростим 6/9 до 2/3, получим 2/3 = x/12."),
          text("Cross-multiply: 3x = 24.", "Перемножим крест-накрест: 3x = 24."),
          text("Solve: x = 8.", "Решим: x = 8."),
        ],
        answer: text("x = 8", "x = 8"),
        source: "SAT-style: proportions",
        desmos: ["y = (2/3) * x"],
      },
    ],
    desmos: [
      {
        title: text("Scale a triangle about the origin", "Масштабирование треугольника относительно начала координат"),
        goal: text("See sides grow by factor 1.5", "Увидеть, как стороны увеличиваются в 1,5 раза"),
        steps: [
          {
            title: text("Original triangle", "Исходный треугольник"),
            expressions: ["A = (0, 0)", "B = (4, 0)", "C = (0, 3)", "polygon(A, B, C)"],
          },
          {
            title: text("Scaled triangle", "Масштабированный треугольник"),
            expressions: ["A1 = (0, 0)", "B1 = (6, 0)", "C1 = (0, 4.5)", "polygon(A1, B1, C1)"],
            note: text("Each coordinate multiplied by 1.5.", "Каждая координата умножена на 1,5."),
          },
        ],
      },
      {
        title: text("Check a proportion numerically", "Численная проверка пропорции"),
        goal: text("Verify 6/9 = 8/12", "Проверить равенство 6/9 = 8/12"),
        steps: [
          {
            title: text("Plot both ratios", "Построить оба отношения"),
            expressions: ["y = 6/9", "y = 8/12"],
          },
        ],
        caution: text("Equal y-values confirm the proportion.", "Равные значения y подтверждают пропорцию."),
      },
    ],
    strategy: [
      text("Write the correspondence first, then the proportion — order prevents mismatched sides.", "Сначала запишите соответствие, затем пропорцию — порядок предотвращает ошибки с сопоставлением сторон."),
      text("Reduce fractions early to keep cross-multiplication simple.", "Ранняя редукция дроби упрощает перекрёстное умножение."),
      text("For area questions, square the scale factor instead of using it directly.", "В задачах на площадь возводите коэффициент подобия в квадрат, а не используйте напрямую."),
    ],
    pitfalls: [
      text("Matching sides by length order instead of by angle position.", "Сопоставлять стороны по величине вместо положения углов."),
      text("Using scale factor k for areas — areas need k squared.", "Использовать коэффициент k для площадей — для площадей нужен k в квадрате."),
      text("Calling similar figures congruent — similar allows different sizes.", "Называть подобные фигуры равными — подобные могут иметь разный размер."),
    ],
    practice: [
      {
        id: "m-geo-similarity-p1",
        prompt: text("A figure with perimeter 18 is scaled by factor 2. What is the new perimeter?", "Фигура с периметром 18 масштабируется с коэффициентом 2. Чему равен новый периметр?"),
        options: [text("20", "20"), text("36", "36"), text("72", "72"), text("18", "18")],
        correctIndex: 1,
        explanation: text("Perimeters scale by k: 18 x 2 = 36.", "Периметры умножаются на k: 18 × 2 = 36."),
        difficulty: "easy",
      },
      {
        id: "m-geo-similarity-p2",
        prompt: text("Similar triangles have corresponding sides 6 and 9. Another corresponding pair is x and 12. What is x?", "В подобных треугольниках соответствующие стороны равны 6 и 9. Другая пара соответствует как x и 12. Чему равен x?"),
        options: [text("6", "6"), text("8", "8"), text("18", "18"), text("4", "4")],
        correctIndex: 1,
        explanation: text("6/9 = x/12 gives x = 8.", "6/9 = x/12 даёт x = 8."),
        difficulty: "medium",
        desmos: ["y = (2/3) * x"],
      },
      {
        id: "m-geo-similarity-p3",
        prompt: text("Two congruent rectangles are placed side by side. Which statement must be true?", "Два равных прямоугольника поставлены рядом. Какое утверждение обязательно верно?"),
        options: [
          text("They have equal area and equal perimeter", "У них равны площадь и периметр"),
          text("One is twice as large as the other", "Один вдвое больше другого"),
          text("Their angles are similar but sides differ", "Их углы подобны, а стороны различны"),
          text("Only their perimeters are equal", "Равны только их периметры"),
        ],
        correctIndex: 0,
        explanation: text("Congruent means identical size and shape, so area and perimeter match.", "Равные фигуры идентичны по размеру и форме, поэтому равны площадь и периметр."),
        difficulty: "easy",
      },
      {
        id: "m-geo-similarity-p4",
        prompt: text("A shape is scaled by factor 3. Its original area is 20. What is the new area?", "Фигура масштабируется с коэффициентом 3. Исходная площадь равна 20. Чему равна новая площадь?"),
        options: [text("60", "60"), text("40", "40"), text("180", "180"), text("120", "120")],
        correctIndex: 2,
        explanation: text("Areas scale by k squared = 9, so 20 x 9 = 180.", "Площади умножаются на k в квадрате = 9, поэтому 20 × 9 = 180."),
        difficulty: "hard",
      },
    ],
  },
  {
    id: "m-geo-right-triangles",
    section: "math",
    domainId: "geometry",
    order: 25,
    title: text("Right triangles and Pythagorean theorem", "Прямоугольные треугольники и Пифагор"),
    subtitle: text("Special triples, legs, and hypotenuse", "Особенные тройки, катеты и гипотенуза"),
    minutes: 14,
    tags: ["pythagoras", "right triangle", "special triples"],
    objectives: [
      text("Apply the Pythagorean theorem to find a leg or the hypotenuse", "Применять теорему Пифагора для нахождения катета или гипотенузы"),
      text("Recognise common triples such as 3-4-5 and 5-12-13", "Узнавать распространённые тройки, такие как 3-4-5 и 5-12-13"),
      text("Test whether a triangle is right-angled by comparing a squared sum", "Проверять прямоугольность треугольника сравнением квадратов сторон"),
    ],
    theory: [
      {
        heading: text("Pythagorean theorem", "Теорема Пифагора"),
        body: text("In a right triangle with legs a and b and hypotenuse c opposite the right angle, a squared plus b squared equals c squared. The hypotenuse is always the longest side.", "В прямоугольном треугольнике с катетами a и b и гипотенузой c, противоположной прямому углу, квадрат a плюс квадрат b равен квадрату c. Гипотенуза — всегда самая длинная сторона."),
        formulas: ["a^2 + b^2 = c^2"],
      },
      {
        heading: text("Special triples", "Особенные тройки"),
        body: text("Memorise 3-4-5, 5-12-13, 8-15-17, and 7-24-25. Any multiple of a triple is also a triple, for example 6-8-10 and 9-12-15. Spotting a triple saves squaring large numbers.", "Запомните тройки 3-4-5, 5-12-13, 8-15-17 и 7-24-25. Любое кратное тройки тоже тройка, например 6-8-10 и 9-12-15. Узнав тройку, можно избежать возведения больших чисел в квадрат."),
        formulas: ["3-4-5, 5-12-13"],
      },
      {
        heading: text("Is it right-angled?", "Прямоугольный ли треугольник"),
        body: text("For sides a, b, c with c the longest, the triangle is right if a squared plus b squared equals c squared. If the sum is smaller, the angle opposite c is obtuse; if larger, it is acute.", "Для сторон a, b, c, где c самая длинная, треугольник прямоугольный, если квадрат a плюс квадрат b равен квадрату c. Если сумма меньше — угол напротив c тупой, если больше — острый."),
        formulas: ["a^2 + b^2 ? c^2"],
      },
    ],
    examples: [
      {
        prompt: text("A right triangle has legs 9 and 12. Find the hypotenuse.", "Прямоугольный треугольник имеет катеты 9 и 12. Найдите гипотенузу."),
        steps: [
          text("Write a squared plus b squared equals c squared: 9 squared + 12 squared = c squared.", "Запишем 9 в квадрате плюс 12 в квадрате равно c в квадрате."),
          text("Compute squares: 81 + 144 = 225.", "Вычислим квадраты: 81 + 144 = 225."),
          text("Take the square root: c = 15, the positive length.", "Извлечём корень: c = 15 — положительная длина."),
          text("Notice 9-12-15 is 3 times 3-4-5, which checks the result.", "Заметим, что 9-12-15 — это 3 раза по 3-4-5, что подтверждает результат."),
        ],
        answer: text("Hypotenuse = 15", "Гипотенуза = 15"),
        source: "SAT-style: Pythagorean theorem",
        desmos: ["A = (0, 0)", "B = (9, 0)", "C = (0, 12)", "polygon(A, B, C)"],
      },
      {
        prompt: text("A ladder 13 feet long reaches a wall. Its foot is 5 feet from the wall. How high does it reach?", "Лестница длиной 13 футов прислонена к стене. Её основание находится в 5 футах от стены. На какую высоту она достаёт?"),
        steps: [
          text("The ladder is the hypotenuse 13, the ground distance is one leg 5, and height h is the other leg.", "Лестница — гипотенуза 13, расстояние по земле — катет 5, а высота h — другой катет."),
          text("Apply 5 squared + h squared = 13 squared.", "Применим 5 в квадрате плюс h в квадрате равно 13 в квадрате."),
          text("Compute: 25 + h squared = 169, so h squared = 144.", "Вычислим: 25 + h в квадрате = 169, значит h в квадрате = 144."),
          text("Take the root: h = 12 feet.", "Извлечём корень: h = 12 футов."),
        ],
        answer: text("Height = 12 feet", "Высота = 12 футов"),
        source: "SAT-style: word problem",
        desmos: ["x^2 + y^2 = 169"],
      },
    ],
    desmos: [
      {
        title: text("Verify 9-12-15 on the grid", "Проверка тройки 9-12-15 на координатной сетке"),
        goal: text("See the right triangle with sides 9, 12, 15", "Увидеть прямоугольный треугольник со сторонами 9, 12, 15"),
        steps: [
          {
            title: text("Set the vertices", "Задать вершины"),
            expressions: ["A = (0, 0)", "B = (9, 0)", "C = (0, 12)"],
          },
          {
            title: text("Draw and measure", "Построить и измерить"),
            expressions: ["polygon(A, B, C)", "distance(A, C)"],
          },
        ],
      },
      {
        title: text("Check a distance with the theorem", "Проверка расстояния теоремой"),
        goal: text("Confirm distance from (0,0) to (6,8) is 10", "Убедиться, что расстояние от (0,0) до (6,8) равно 10"),
        steps: [
          {
            title: text("Compute distance", "Вычислить расстояние"),
            expressions: ["d = distance((0, 0), (6, 8))"],
          },
        ],
        caution: text("Desmos distance uses the same Pythagorean idea.", "Расстояние в Desmos основано на той же идее Пифагора."),
      },
    ],
    strategy: [
      text("Identify the hypotenuse first — it is opposite the right angle and is longest.", "Сначала определите гипотенузу — она напротив прямого угла и самая длинная."),
      text("Divide by a common factor to see if a familiar triple fits.", "Разделите на общий делитель, чтобы увидеть знакомую тройку."),
      text("Always take the positive square root for a length.", "Для длины всегда берите положительный квадратный корень."),
    ],
    pitfalls: [
      text("Adding a + b instead of a squared + b squared.", "Прибавлять a + b вместо квадратов a и b."),
      text("Treating the ladder or the longest side as a leg.", "Принимать лестницу или самую длинную сторону за катет."),
      text("Forgetting to take the square root at the end.", "Забывать извлечь квадратный корень в конце."),
    ],
    practice: [
      {
        id: "m-geo-right-triangles-p1",
        prompt: text("Legs are 3 and 4. What is the hypotenuse?", "Катеты равны 3 и 4. Чему равна гипотенуза?"),
        options: [text("5", "5"), text("7", "7"), text("12", "12"), text("25", "25")],
        correctIndex: 0,
        explanation: text("3 squared + 4 squared = 25, and the square root is 5.", "3 в квадрате плюс 4 в квадрате равно 25, квадратный корень равен 5."),
        difficulty: "easy",
        desmos: ["A = (0, 0)", "B = (3, 0)", "C = (0, 4)", "polygon(A, B, C)"],
      },
      {
        id: "m-geo-right-triangles-p2",
        prompt: text("Hypotenuse is 13 and one leg is 5. What is the other leg?", "Гипотенуза равна 13, один катет равен 5. Чему равен другой катет?"),
        options: [text("8", "8"), text("12", "12"), text("10", "10"), text("6", "6")],
        correctIndex: 1,
        explanation: text("13 squared - 5 squared = 169 - 25 = 144, square root 12.", "13 в квадрате минус 5 в квадрате равно 169 − 25 = 144, корень равен 12."),
        difficulty: "medium",
      },
      {
        id: "m-geo-right-triangles-p3",
        prompt: text("Sides are 9, 12, and 15. Is the triangle right-angled?", "Стороны равны 9, 12 и 15. Является ли треугольник прямоугольным?"),
        options: [text("Yes, because 81 + 144 = 225", "Да, потому что 81 + 144 = 225"), text("No, because 9 + 12 = 15", "Нет, потому что 9 + 12 = 15"), text("No, because 15 - 9 = 6", "Нет, потому что 15 − 9 = 6"), text("Cannot be determined", "Нельзя определить")],
        correctIndex: 0,
        explanation: text("9 squared + 12 squared = 81 + 144 = 225 = 15 squared, so it is right.", "9 в квадрате плюс 12 в квадрате равно 81 + 144 = 225 = 15 в квадрате, поэтому треугольник прямоугольный."),
        difficulty: "medium",
      },
      {
        id: "m-geo-right-triangles-p4",
        prompt: text("What is the distance between points (0, 0) and (6, 8)?", "Чему равно расстояние между точками (0, 0) и (6, 8)?"),
        options: [text("14", "14"), text("10", "10"), text("12", "12"), text("8", "8")],
        correctIndex: 1,
        explanation: text("Distance = square root of (6 squared + 8 squared) = square root of 100 = 10.", "Расстояние = квадратный корень из (6 в квадрате + 8 в квадрате) = корень из 100 = 10."),
        difficulty: "easy",
        desmos: ["d = distance((0, 0), (6, 8))"],
      },
    ],
  },
  {
    id: "m-geo-trig",
    section: "math",
    domainId: "geometry",
    order: 26,
    title: text("Trigonometry: ratios and radians", "Тригонометрия: отношения и радианы"),
    subtitle: text("Sine, cosine, tangent, and angle measures", "Синус, косинус, тангенс и измерение углов"),
    minutes: 16,
    tags: ["trig", "radians", "ratios"],
    objectives: [
      text("Find sine, cosine, and tangent from the sides of a right triangle", "Находить синус, косинус и тангенс по сторонам прямоугольного треугольника"),
      text("Convert between degrees and radians", "Переходить между градусами и радианами"),
      text("Use special angles 30, 45, and 60 degrees with exact values", "Использовать особые углы 30, 45 и 60 градусов с точными значениями"),
    ],
    theory: [
      {
        heading: text("Three ratios", "Три отношения"),
        body: text("For an acute angle in a right triangle: sine is opposite over hypotenuse, cosine is adjacent over hypotenuse, and tangent is opposite over adjacent. The hypotenuse is always opposite the right angle.", "Для острого угла в прямоугольном треугольнике: синус равен противолежащий катет разделить на гипотенузу, косинус — прилежащий катет разделить на гипотенузу, тангенс — противолежащий разделить на прилежащий. Гипотенуза всегда напротив прямого угла."),
        formulas: ["sin = opp/hyp", "cos = adj/hyp", "tan = opp/adj"],
      },
      {
        heading: text("Radians", "Радианы"),
        body: text("One radian is the angle whose arc length equals the radius. There are 2 pi radians in a full circle of 360 degrees. To convert, multiply degrees by pi over 180, and radians by 180 over pi.", "Один радиан — это угол, длина дуги которого равна радиусу. Полный круг 360 градусов содержит 2 пи радиан. Для перевода умножайте градусы на пи, делённое на 180, а радианы — на 180, делённое на пи."),
        formulas: ["degrees x pi/180 = radians", "radians x 180/pi = degrees"],
      },
      {
        heading: text("Special angles", "Особые углы"),
        body: text("In a 45-45-90 triangle with legs 1, the hypotenuse is square root of 2, giving sine and cosine of 45 degrees as square root of 2 over 2. In a 30-60-90 triangle with short leg 1, the hypotenuse is 2 and the long leg is square root of 3.", "В треугольнике 45-45-90 с катетами 1 гипотенуза равна корню из 2, поэтому синус и косинус 45 градусов равны корню из 2, делённому на 2. В треугольнике 30-60-90 с малым катетом 1 гипотенуза равна 2, а большой катет равен корню из 3."),
        formulas: ["sin 30 = 1/2", "cos 45 = sqrt(2)/2", "sin 60 = sqrt(3)/2"],
      },
    ],
    examples: [
      {
        prompt: text("In a right triangle, the side opposite angle A is 3, the side adjacent to A is 4, and the hypotenuse is 5. Find sin A, cos A, and tan A.", "В прямоугольном треугольнике сторона, противолежащая углу A, равна 3, прилежащая равна 4, гипотенуза равна 5. Найдите sin A, cos A и tan A."),
        steps: [
          text("Sine is opposite over hypotenuse: 3/5.", "Синус — противолежащий на гипотенузу: 3/5."),
          text("Cosine is adjacent over hypotenuse: 4/5.", "Косинус — прилежащий на гипотенузу: 4/5."),
          text("Tangent is opposite over adjacent: 3/4.", "Тангенс — противолежащий на прилежащий: 3/4."),
          text("Check: (3/5) squared + (4/5) squared = 9/25 + 16/25 = 1, as it should for sine and cosine.", "Проверим: (3/5) в квадрате + (4/5) в квадрате = 9/25 + 16/25 = 1, как и должно быть."),
        ],
        answer: text("sin = 3/5, cos = 4/5, tan = 3/4", "sin = 3/5, cos = 4/5, tan = 3/4"),
        source: "SAT-style: trig ratios",
        desmos: ["s = 3/5", "c = 4/5", "t = 3/4"],
      },
      {
        prompt: text("Convert 3pi/2 radians to degrees and pi/6 radians to degrees.", "Переведите 3пи/2 радиан в градусы и пи/6 радиан в градусы."),
        steps: [
          text("Use degrees = radians x 180/pi.", "Используем градусы = радианы × 180/пи."),
          text("For 3pi/2: (3pi/2) x 180/pi = 3 x 90 = 270 degrees.", "Для 3пи/2: (3пи/2) × 180/пи = 3 × 90 = 270 градусов."),
          text("For pi/6: (pi/6) x 180/pi = 180/6 = 30 degrees.", "Для пи/6: (пи/6) × 180/пи = 180/6 = 30 градусов."),
          text("So 3pi/2 is a three-quarter turn, and pi/6 matches the special 30-degree angle.", "Таким образом, 3пи/2 — это три четверти оборота, а пи/6 соответствует особому углу 30 градусов."),
        ],
        answer: text("3pi/2 = 270 degrees; pi/6 = 30 degrees", "3пи/2 = 270 градусов; пи/6 = 30 градусов"),
        source: "SAT-style: radians",
        desmos: ["y = (3 * pi) / 2", "y = pi / 6"],
      },
    ],
    desmos: [
      {
        title: text("See sine and cosine as ratios", "Синус и косинус как отношения"),
        goal: text("Check 3-4-5 ratios numerically", "Проверить отношения 3-4-5 численно"),
        steps: [
          {
            title: text("Compute the ratios", "Вычислить отношения"),
            expressions: ["s = 3/5", "c = 4/5"],
          },
          {
            title: text("Verify the identity", "Проверить тождество"),
            expressions: ["s^2 + c^2 = 1"],
          },
        ],
      },
      {
        title: text("Graph a right triangle", "График прямоугольного треугольника"),
        goal: text("Plot the 3-4-5 triangle", "Построить треугольник 3-4-5"),
        steps: [
          {
            title: text("Vertices", "Вершины"),
            expressions: ["A = (0, 0)", "B = (4, 0)", "C = (0, 3)", "polygon(A, B, C)"],
          },
        ],
        caution: text("The side opposite the angle you chose tells you sin vs cos.", "Сторона напротив выбранного угла определяет sin или cos."),
      },
    ],
    strategy: [
      text("Draw the triangle and label opp, adj, and hyp for the marked angle before writing any ratio.", "Нарисуйте треугольник и подпишите противолежащий, прилежащий и гипотенузу для отмеченного угла перед записью отношения."),
      text("Convert radians by multiplying by 180/pi and cancel pi first.", "Переводите радианы умножением на 180/пи, сначала сокращая пи."),
      text("Memorise the 30-45-60 values to answer special-angle items without a calculator.", "Запомните значения для 30-45-60, чтобы решать особые углы без калькулятора."),
    ],
    pitfalls: [
      text("Swapping sine and cosine — sine uses opposite, cosine uses adjacent.", "Путать синус и косинус — синус использует противолежащий, косинус — прилежащий."),
      text("Treating 180 degrees as pi/2 instead of pi.", "Считать 180 градусов равными пи/2 вместо пи."),
      text("Using degrees where the problem expects radians for arc length.", "Использовать градусы там, где для длины дуги нужны радианы."),
    ],
    practice: [
      {
        id: "m-geo-trig-p1",
        prompt: text("Opposite side is 3 and hypotenuse is 5. What is sin of the angle?", "Противолежащий катет равен 3, гипотенуза равна 5. Чему равен синус угла?"),
        options: [text("3/5", "3/5"), text("4/5", "4/5"), text("5/3", "5/3"), text("3/4", "3/4")],
        correctIndex: 0,
        explanation: text("Sine = opposite/hypotenuse = 3/5.", "Синус = противолежащий/гипотенуза = 3/5."),
        difficulty: "easy",
        desmos: ["s = 3/5"],
      },
      {
        id: "m-geo-trig-p2",
        prompt: text("Adjacent side is 4 and hypotenuse is 5. What is cos of the angle?", "Прилежащий катет равен 4, гипотенуза равна 5. Чему равен косинус угла?"),
        options: [text("3/4", "3/4"), text("3/5", "3/5"), text("4/5", "4/5"), text("5/4", "5/4")],
        correctIndex: 2,
        explanation: text("Cosine = adjacent/hypotenuse = 4/5.", "Косинус = прилежащий/гипотенуза = 4/5."),
        difficulty: "easy",
      },
      {
        id: "m-geo-trig-p3",
        prompt: text("How many degrees is pi/4 radians?", "Сколько градусов в пи/4 радиан?"),
        options: [text("30 degrees", "30 градусов"), text("45 degrees", "45 градусов"), text("60 degrees", "60 градусов"), text("90 degrees", "90 градусов")],
        correctIndex: 1,
        explanation: text("pi/4 x 180/pi = 45 degrees.", "пи/4 × 180/пи = 45 градусов."),
        difficulty: "medium",
        desmos: ["y = pi / 4"],
      },
      {
        id: "m-geo-trig-p4",
        prompt: text("A 45-45-90 triangle has legs of length 1. What is the hypotenuse?", "В треугольнике 45-45-90 катеты равны 1. Чему равна гипотенуза?"),
        options: [text("1", "1"), text("sqrt(2)", "sqrt(2)"), text("2", "2"), text("sqrt(3)", "sqrt(3)")],
        correctIndex: 1,
        explanation: text("Hypotenuse = sqrt(1 squared + 1 squared) = sqrt(2).", "Гипотенуза = sqrt(1 в квадрате + 1 в квадрате) = sqrt(2)."),
        difficulty: "medium",
        desmos: ["h = sqrt(2)"],
      },
    ],
  },
  {
    id: "m-geo-circles",
    section: "math",
    domainId: "geometry",
    order: 27,
    title: text("Circles: arcs, sectors, equations", "Окружности: дуги, секторы, уравнения"),
    subtitle: text("Central angles, arc length, and (x - h) squared forms", "Центральные углы, длина дуги и вид (x - h) в квадрате"),
    minutes: 14,
    tags: ["circles", "arcs", "equations"],
    objectives: [
      text("Compute arc length and sector area from radius and central angle", "Вычислять длину дуги и площадь сектора по радиусу и центральному углу"),
      text("Read centre and radius from (x - h) squared + (y - k) squared = r squared", "Находить центр и радиус из уравнения (x - h) в квадрате + (y - k) в квадрате = r в квадрате"),
      text("Apply circumference and area formulas with pi", "Применять формулы длины окружности и площади с числом пи"),
    ],
    theory: [
      {
        heading: text("Circumference and area", "Длина окружности и площадь"),
        body: text("For radius r, circumference is 2 pi r and area is pi r squared. The diameter is 2r. Keep pi symbolic unless the item asks for a decimal.", "Для радиуса r длина окружности равна 2 пи r, а площадь равна пи r в квадрате. Диаметр равен 2r. Оставляйте пи в символьном виде, если не требуется десятичная форма."),
        formulas: ["C = 2*pi*r", "A = pi*r^2"],
      },
      {
        heading: text("Arcs and sectors", "Дуги и секторы"),
        body: text("A central angle of theta degrees is the fraction theta over 360 of the full circle. Arc length is theta over 360 times 2 pi r, and sector area is theta over 360 times pi r squared. In radians, arc length is r times theta and sector area is one half r squared theta.", "Центральный угол в theta градусов — это доля theta/360 полного круга. Длина дуги равна theta/360, умноженной на 2 пи r, а площадь сектора — theta/360, умноженной на пи r в квадрате. В радианах длина дуги равна r умножить на theta, а площадь сектора — одна вторая r в квадрате умножить на theta."),
        formulas: ["arc = (theta/360) * 2*pi*r", "sector = (theta/360) * pi*r^2", "arc (radians) = r*theta"],
      },
      {
        heading: text("Equation of a circle", "Уравнение окружности"),
        body: text("A circle with centre (h, k) and radius r has equation (x - h) squared + (y - k) squared = r squared. The centre signs flip inside the brackets, so (x - 2) squared means centre x = 2.", "Окружность с центром (h, k) и радиусом r имеет уравнение (x - h) в квадрате + (y - k) в квадрате = r в квадрате. Знаки внутри скобок меняются, поэтому (x − 2) в квадрате означает центр с x = 2."),
        formulas: ["(x - h)^2 + (y - k)^2 = r^2"],
      },
    ],
    examples: [
      {
        prompt: text("A circle has radius 6. A central angle of 60 degrees cuts an arc. Find the arc length.", "Окружность имеет радиус 6. Центральный угол 60 градусов отсекает дугу. Найдите длину дуги."),
        steps: [
          text("The fraction of the circle is 60/360 = 1/6.", "Доля окружности равна 60/360 = 1/6."),
          text("Full circumference is 2 pi x 6 = 12 pi.", "Полная длина окружности равна 2 пи × 6 = 12 пи."),
          text("Multiply: (1/6) x 12 pi = 2 pi.", "Умножим: (1/6) × 12 пи = 2 пи."),
          text("Arc length is 2 pi, about 6.28 units.", "Длина дуги равна 2 пи, примерно 6,28."),
        ],
        answer: text("Arc length = 2 pi", "Длина дуги = 2 пи"),
        source: "SAT-style: arc length",
        desmos: ["(x - 0)^2 + (y - 0)^2 = 36", "y = tan(30) * x"],
      },
      {
        prompt: text("A circle is given by (x - 2) squared + (y + 3) squared = 25. Find its centre and radius.", "Окружность задана уравнением (x − 2) в квадрате + (y + 3) в квадрате = 25. Найдите её центр и радиус."),
        steps: [
          text("Match to (x - h) squared + (y - k) squared = r squared.", "Сопоставим с (x − h) в квадрате + (y − k) в квадрате = r в квадрате."),
          text("So h = 2 and y - k = y + 3 gives k = -3.", "Значит, h = 2, а y − k = y + 3 даёт k = −3."),
          text("Centre is (2, -3).", "Центр — (2, −3)."),
          text("r squared = 25, so r = 5.", "r в квадрате = 25, значит r = 5."),
        ],
        answer: text("Centre (2, -3); radius 5", "Центр (2, −3); радиус 5"),
        source: "SAT-style: circle equation",
        desmos: ["(x - 2)^2 + (y + 3)^2 = 25"],
      },
    ],
    desmos: [
      {
        title: text("Plot a circle from its equation", "Построить окружность по уравнению"),
        goal: text("See centre (2, -3) and radius 5", "Увидеть центр (2, −3) и радиус 5"),
        steps: [
          {
            title: text("Type the equation", "Ввести уравнение"),
            expressions: ["(x - 2)^2 + (y + 3)^2 = 25"],
          },
          {
            title: text("Mark the centre", "Отметить центр"),
            expressions: ["(2, -3)"],
          },
        ],
      },
      {
        title: text("Check circumference and area", "Проверить длину и площадь"),
        goal: text("Compute C and A for r = 3", "Вычислить C и A при r = 3"),
        steps: [
          {
            title: text("Formulas", "Формулы"),
            expressions: ["C = 2 * pi * 3", "A = pi * 3^2"],
          },
        ],
      },
    ],
    strategy: [
      text("Convert the central angle to a fraction of 360 first, then multiply.", "Сначала выразите центральный угол как долю от 360, затем умножьте."),
      text("Read centre signs carefully: (y + 3) means k = -3.", "Внимательно читайте знаки центра: (y + 3) означает k = −3."),
      text("Keep pi exact in the answer unless a decimal is requested.", "Оставляйте пи точным, если не требуется десятичная форма."),
    ],
    pitfalls: [
      text("Using the diameter as the radius in pi formulas.", "Использовать диаметр вместо радиуса в формулах с пи."),
      text("Reading (x - 2) as centre -2 instead of 2.", "Читать (x − 2) как центр −2 вместо 2."),
      text("Forgetting the one-half in the radian sector formula.", "Забывать половину в формуле площади сектора в радианах."),
    ],
    practice: [
      {
        id: "m-geo-circles-p1",
        prompt: text("What is the circumference of a circle with radius 3?", "Чему равна длина окружности радиуса 3?"),
        options: [text("6 pi", "6 пи"), text("9 pi", "9 пи"), text("3 pi", "3 пи"), text("12 pi", "12 пи")],
        correctIndex: 0,
        explanation: text("C = 2 pi r = 2 pi x 3 = 6 pi.", "C = 2 пи r = 2 пи × 3 = 6 пи."),
        difficulty: "easy",
        desmos: ["C = 2 * pi * 3"],
      },
      {
        id: "m-geo-circles-p2",
        prompt: text("A sector has radius 4 and central angle 90 degrees. What is its area?", "Сектор имеет радиус 4 и центральный угол 90 градусов. Чему равна его площадь?"),
        options: [text("4 pi", "4 пи"), text("8 pi", "8 пи"), text("16 pi", "16 пи"), text("pi", "пи")],
        correctIndex: 0,
        explanation: text("(90/360) x pi x 16 = (1/4) x 16 pi = 4 pi.", "(90/360) × пи × 16 = (1/4) × 16 пи = 4 пи."),
        difficulty: "medium",
      },
      {
        id: "m-geo-circles-p3",
        prompt: text("For (x - 1) squared + (y - 4) squared = 49, what are the centre and radius?", "Для (x − 1) в квадрате + (y − 4) в квадрате = 49 найдите центр и радиус."),
        options: [text("Centre (1, 4), radius 7", "Центр (1, 4), радиус 7"), text("Centre (-1, -4), radius 7", "Центр (−1, −4), радиус 7"), text("Centre (1, 4), radius 49", "Центр (1, 4), радиус 49"), text("Centre (4, 1), radius 7", "Центр (4, 1), радиус 7")],
        correctIndex: 0,
        explanation: text("h = 1, k = 4, and r = square root of 49 = 7.", "h = 1, k = 4, и r = корень из 49 = 7."),
        difficulty: "easy",
        desmos: ["(x - 1)^2 + (y - 4)^2 = 49"],
      },
      {
        id: "m-geo-circles-p4",
        prompt: text("A circle has radius 5. A central angle of 36 degrees cuts an arc. What is the arc length?", "Окружность имеет радиус 5. Центральный угол 36 градусов отсекает дугу. Чему равна длина дуги?"),
        options: [text("pi", "пи"), text("2 pi", "2 пи"), text("5 pi", "5 пи"), text("10 pi", "10 пи")],
        correctIndex: 0,
        explanation: text("(36/360) x 2 pi x 5 = (1/10) x 10 pi = pi.", "(36/360) × 2 пи × 5 = (1/10) × 10 пи = пи."),
        difficulty: "hard",
      },
    ],
  },
  {
    id: "m-geo-volume",
    section: "math",
    domainId: "geometry",
    order: 28,
    title: text("Area, surface area, and volume", "Площадь, поверхность, объём"),
    subtitle: text("Prisms, cylinders, cones, and spheres", "Призмы, цилиндры, конусы и сферы"),
    minutes: 14,
    tags: ["volume", "surface area", "3D shapes"],
    objectives: [
      text("Compute volumes of prisms and cylinders from base area times height", "Вычислять объёмы призм и цилиндров как площадь основания на высоту"),
      text("Use cone and sphere volume formulas with pi", "Использовать формулы объёма конуса и сферы с числом пи"),
      text("Distinguish surface area from volume in applied problems", "Различать площадь поверхности и объём в прикладных задачах"),
    ],
    theory: [
      {
        heading: text("Prisms and cylinders", "Призмы и цилиндры"),
        body: text("For any prism or cylinder, volume equals base area times height. A rectangular prism with length l, width w, and height h has volume lwh and surface area 2(lw + lh + wh). A cylinder with radius r and height h has volume pi r squared h.", "Для призмы или цилиндра объём равен площади основания, умноженной на высоту. Прямоугольный параллелепипед с длиной l, шириной w и высотой h имеет объём lwh и площадь поверхности 2(lw + lh + wh). Цилиндр с радиусом r и высотой h имеет объём пи r в квадрате h."),
        formulas: ["V = base area x height", "cylinder V = pi*r^2*h"],
      },
      {
        heading: text("Cones and spheres", "Конусы и сферы"),
        body: text("A cone with radius r and height h has volume one third pi r squared h, sharing the same base as its cylinder but one third the volume. A sphere of radius r has volume four thirds pi r cubed and surface area 4 pi r squared.", "Конус с радиусом r и высотой h имеет объём одна третья пи r в квадрате h — то же основание, что у цилиндра, но треть объёма. Сфера радиуса r имеет объём четыре третьих пи r в кубе и площадь поверхности 4 пи r в квадрате."),
        formulas: ["cone V = (1/3)*pi*r^2*h", "sphere V = (4/3)*pi*r^3"],
      },
      {
        heading: text("Choosing the formula", "Выбор формулы"),
        body: text("Read whether the item asks for covering, painting, or material — that is surface area — or for filling or capacity — that is volume. Units follow the choice: square units for area, cubic units for volume.", "Определите, требуется ли покрытие, покраска или материал — это площадь поверхности — или заполнение, вместимость — это объём. Единицы следуют за выбором: квадратные единицы для площади, кубические — для объёма."),
        formulas: ["surface area: square units", "volume: cubic units"],
      },
    ],
    examples: [
      {
        prompt: text("A rectangular box measures 3 by 4 by 5. Find its volume and its total surface area.", "Прямоугольный ящик имеет размеры 3 на 4 на 5. Найдите его объём и полную площадь поверхности."),
        steps: [
          text("Volume = 3 x 4 x 5 = 60 cubic units.", "Объём = 3 × 4 × 5 = 60 кубических единиц."),
          text("Surface area = 2(lw + lh + wh) = 2(12 + 15 + 20).", "Площадь поверхности = 2(lw + lh + wh) = 2(12 + 15 + 20)."),
          text("Inside the brackets sum to 47, and 2 x 47 = 94.", "Сумма внутри скобок равна 47, а 2 × 47 = 94."),
          text("Volume 60 cubic units and surface area 94 square units have different units, as expected.", "Объём 60 кубических единиц и площадь 94 квадратные единицы имеют разные единицы, как и ожидалось."),
        ],
        answer: text("Volume 60; surface area 94", "Объём 60; площадь поверхности 94"),
        source: "SAT-style: volume and surface area",
        desmos: ["V = 3 * 4 * 5", "S = 2 * (3*4 + 3*5 + 4*5)"],
      },
      {
        prompt: text("A cylinder has radius 2 and height 5. Find its volume.", "Цилиндр имеет радиус 2 и высоту 5. Найдите его объём."),
        steps: [
          text("Base area = pi r squared = pi x 4 = 4 pi.", "Площадь основания = пи r в квадрате = пи × 4 = 4 пи."),
          text("Volume = base area x height = 4 pi x 5.", "Объём = площадь основания × высота = 4 пи × 5."),
          text("Volume = 20 pi cubic units.", "Объём = 20 пи кубических единиц."),
          text("Numerically this is about 62.8, but 20 pi is exact.", "Численно это около 62,8, но 20 пи — точное значение."),
        ],
        answer: text("Volume = 20 pi cubic units", "Объём = 20 пи кубических единиц"),
        source: "SAT-style: cylinder",
        desmos: ["V = pi * 2^2 * 5"],
      },
    ],
    desmos: [
      {
        title: text("Check box volume and surface", "Проверка объёма и поверхности ящика"),
        goal: text("Compute 60 and 94 for 3-4-5 box", "Вычислить 60 и 94 для ящика 3-4-5"),
        steps: [
          {
            title: text("Formulas", "Формулы"),
            expressions: ["V = 3 * 4 * 5", "S = 2 * (3 * 4 + 3 * 5 + 4 * 5)"],
          },
        ],
      },
      {
        title: text("Compare cylinder and cone", "Сравнение цилиндра и конуса"),
        goal: text("See cone is one third of cylinder for same r and h", "Увидеть, что конус составляет треть цилиндра при тех же r и h"),
        steps: [
          {
            title: text("Both volumes", "Оба объёма"),
            expressions: ["Vcyl = pi * 2^2 * 5", "Vcone = (1/3) * pi * 2^2 * 5"],
          },
        ],
      },
    ],
    strategy: [
      text("Write the formula with substituted numbers before calculating — it prevents mixing area and volume.", "Запишите формулу с подставленными числами перед вычислениями — это предотвращает смешение площади и объёма."),
      text("Check units in the prompt: square units mean surface area, cubic units mean volume.", "Проверяйте единицы в условии: квадратные указывают на площадь поверхности, кубические — на объём."),
      text("Cancel pi and common factors before multiplying large numbers.", "Сокращайте пи и общие множители перед умножением больших чисел."),
    ],
    pitfalls: [
      text("Using diameter instead of radius in pi r squared formulas.", "Использовать диаметр вместо радиуса в формулах пи r в квадрате."),
      text("Forgetting the one-third factor for cones.", "Забывать множитель одна треть для конусов."),
      text("Adding faces for surface area but missing the bottom or back face.", "При подсчёте площади поверхности забывать нижнюю или заднюю грань."),
    ],
    practice: [
      {
        id: "m-geo-volume-p1",
        prompt: text("A cube has side length 3. What is its volume?", "Куб имеет ребро 3. Чему равен его объём?"),
        options: [text("9", "9"), text("27", "27"), text("18", "18"), text("54", "54")],
        correctIndex: 1,
        explanation: text("Volume = 3 x 3 x 3 = 27 cubic units.", "Объём = 3 × 3 × 3 = 27 кубических единиц."),
        difficulty: "easy",
        desmos: ["V = 3^3"],
      },
      {
        id: "m-geo-volume-p2",
        prompt: text("A cylinder has radius 3 and height 4. What is its volume?", "Цилиндр имеет радиус 3 и высоту 4. Чему равен его объём?"),
        options: [text("12 pi", "12 пи"), text("36 pi", "36 пи"), text("24 pi", "24 пи"), text("48 pi", "48 пи")],
        correctIndex: 1,
        explanation: text("V = pi x 9 x 4 = 36 pi.", "V = пи × 9 × 4 = 36 пи."),
        difficulty: "medium",
        desmos: ["V = pi * 3^2 * 4"],
      },
      {
        id: "m-geo-volume-p3",
        prompt: text("A cone has radius 3 and height 6. What is its volume?", "Конус имеет радиус 3 и высоту 6. Чему равен его объём?"),
        options: [text("18 pi", "18 пи"), text("54 pi", "54 пи"), text("36 pi", "36 пи"), text("9 pi", "9 пи")],
        correctIndex: 0,
        explanation: text("(1/3) x pi x 9 x 6 = 18 pi.", "(1/3) × пи × 9 × 6 = 18 пи."),
        difficulty: "hard",
      },
      {
        id: "m-geo-volume-p4",
        prompt: text("A sphere has radius 3. What is its volume?", "Сфера имеет радиус 3. Чему равен её объём?"),
        options: [text("36 pi", "36 пи"), text("27 pi", "27 пи"), text("12 pi", "12 пи"), text("36 pi squared", "36 пи в квадрате")],
        correctIndex: 0,
        explanation: text("(4/3) x pi x 27 = 36 pi.", "(4/3) × пи × 27 = 36 пи."),
        difficulty: "hard",
        desmos: ["V = (4/3) * pi * 3^3"],
      },
    ],
  },
  {
    id: "m-geo-coordinates",
    section: "math",
    domainId: "geometry",
    order: 29,
    title: text("Coordinate geometry", "Координатная геометрия"),
    subtitle: text("Midpoints, slopes, distance, and intercepts", "Середины, наклоны, расстояния и пересечения"),
    minutes: 13,
    tags: ["coordinates", "slope", "distance"],
    objectives: [
      text("Find midpoints and slopes between two points", "Находить середины отрезков и наклоны прямых между двумя точками"),
      text("Compute distance with the Pythagorean form", "Вычислять расстояние по форме Пифагора"),
      text("Read x- and y-intercepts from a linear equation", "Находить пересечения с осями из линейного уравнения"),
    ],
    theory: [
      {
        heading: text("Midpoint and distance", "Середина и расстояние"),
        body: text("The midpoint of (x1, y1) and (x2, y2) is the average of the coordinates. The distance is the square root of the sum of squared differences. Both come directly from the Pythagorean theorem.", "Середина отрезка с концами (x1, y1) и (x2, y2) — это среднее арифметическое координат. Расстояние — квадратный корень из суммы квадратов разностей. Обе формулы вытекают из теоремы Пифагора."),
        formulas: ["midpoint = ((x1+x2)/2, (y1+y2)/2)", "d = sqrt((x2-x1)^2 + (y2-y1)^2)"],
      },
      {
        heading: text("Slope", "Наклон"),
        body: text("Slope is rise over run: (y2 - y1) over (x2 - x1). A positive slope rises to the right, a negative slope falls, and a zero slope is horizontal. Order matters but the final value is the same if you subtract consistently.", "Наклон — это подъём на отрезок по горизонтали: (y2 − y1) / (x2 − x1). Положительный наклон растёт вправо, отрицательный падает, а нулевой — горизонтален. Порядок важен, но при последовательном вычитании значение одно и то же."),
        formulas: ["m = (y2 - y1)/(x2 - x1)"],
      },
      {
        heading: text("Intercepts", "Пересечения с осями"),
        body: text("The x-intercept is where y = 0, found by setting y to 0 and solving for x. The y-intercept is where x = 0, found by setting x to 0. For y = mx + b, b itself is the y-intercept.", "Пересечение с осью x — это точка, где y = 0, её находят, подставив y = 0 и решив для x. Пересечение с осью y — точка, где x = 0. Для y = mx + b само b является пересечением с осью y."),
        formulas: ["x-intercept: y = 0", "y-intercept: x = 0"],
      },
    ],
    examples: [
      {
        prompt: text("Points (2, 4) and (6, 8) are given. Find their midpoint and the slope of the segment joining them.", "Даны точки (2, 4) и (6, 8). Найдите середину и наклон отрезка, их соединяющего."),
        steps: [
          text("Midpoint x = (2 + 6)/2 = 4 and y = (4 + 8)/2 = 6.", "Середина: x = (2 + 6)/2 = 4 и y = (4 + 8)/2 = 6."),
          text("Midpoint is (4, 6).", "Середина — (4, 6)."),
          text("Slope = (8 - 4)/(6 - 2) = 4/4 = 1.", "Наклон = (8 − 4)/(6 − 2) = 4/4 = 1."),
          text("The segment rises 1 unit for each unit right.", "Отрезок поднимается на 1 единицу при движении на 1 единицу вправо."),
        ],
        answer: text("Midpoint (4, 6); slope 1", "Середина (4, 6); наклон 1"),
        source: "SAT-style: midpoint and slope",
        desmos: ["A = (2, 4)", "B = (6, 8)", "M = ((2+6)/2, (4+8)/2)"],
      },
      {
        prompt: text("The line y = 2x - 6 is given. Find its x-intercept and y-intercept.", "Задана прямая y = 2x − 6. Найдите её пересечения с осями."),
        steps: [
          text("For the y-intercept set x = 0: y = 2(0) - 6 = -6.", "Для пересечения с осью y подставим x = 0: y = 2(0) − 6 = −6."),
          text("Y-intercept is (0, -6), which is b in y = mx + b.", "Пересечение с осью y — (0, −6), это b в y = mx + b."),
          text("For the x-intercept set y = 0: 0 = 2x - 6, so 2x = 6.", "Для пересечения с осью x подставим y = 0: 0 = 2x − 6, значит 2x = 6."),
          text("Solve: x = 3, so the x-intercept is (3, 0).", "Решим: x = 3, поэтому пересечение с осью x — (3, 0)."),
        ],
        answer: text("x-intercept (3, 0); y-intercept (0, -6)", "Пересечение с осью x (3, 0); с осью y (0, −6)"),
        source: "SAT-style: intercepts",
        desmos: ["y = 2x - 6"],
      },
    ],
    desmos: [
      {
        title: text("Midpoint on the graph", "Середина на графике"),
        goal: text("See (4, 6) between (2, 4) and (6, 8)", "Увидеть (4, 6) между (2, 4) и (6, 8)"),
        steps: [
          {
            title: text("Endpoints and midpoint", "Концы и середина"),
            expressions: ["A = (2, 4)", "B = (6, 8)", "M = ((2+6)/2, (4+8)/2)"],
          },
          {
            title: text("Segment", "Отрезок"),
            expressions: ["segment(A, B)"],
          },
        ],
      },
      {
        title: text("Intercepts of a line", "Пересечения прямой с осями"),
        goal: text("Check (3, 0) and (0, -6) for y = 2x - 6", "Проверить (3, 0) и (0, −6) для y = 2x − 6"),
        steps: [
          {
            title: text("Line and intercepts", "Прямая и пересечения"),
            expressions: ["y = 2x - 6", "(3, 0)", "(0, -6)"],
          },
        ],
        caution: text("Intercepts are where the line crosses the axes.", "Пересечения — это точки, где прямая пересекает оси."),
      },
    ],
    strategy: [
      text("Average the x-coordinates and the y-coordinates separately for midpoints.", "Отдельно усредняйте x-координаты и y-координаты для нахождения середины."),
      text("Write slope as rise over run with both differences in the same order.", "Записывайте наклон как подъём на отрезок, вычитая в одинаковом порядке."),
      text("Set y = 0 for the x-intercept and x = 0 for the y-intercept without rearranging first.", "Подставляйте y = 0 для пересечения с осью x и x = 0 для пересечения с осью y без предварительных преобразований."),
    ],
    pitfalls: [
      text("Averaging only x or only y for a midpoint.", "Усреднять только x или только y при нахождении середины."),
      text("Reversing subtraction order in one term but not the other for slope.", "Менять порядок вычитания в одном слагаемом, но не в другом при вычислении наклона."),
      text("Forgetting the square root in the distance formula.", "Забывать квадратный корень в формуле расстояния."),
    ],
    practice: [
      {
        id: "m-geo-coordinates-p1",
        prompt: text("What is the midpoint of (0, 0) and (4, 6)?", "Чему равна середина отрезка с концами (0, 0) и (4, 6)?"),
        options: [text("(2, 3)", "(2, 3)"), text("(4, 3)", "(4, 3)"), text("(2, 6)", "(2, 6)"), text("(0, 6)", "(0, 6)")],
        correctIndex: 0,
        explanation: text("((0+4)/2, (0+6)/2) = (2, 3).", "((0+4)/2, (0+6)/2) = (2, 3)."),
        difficulty: "easy",
        desmos: ["M = ((0+4)/2, (0+6)/2)"],
      },
      {
        id: "m-geo-coordinates-p2",
        prompt: text("What is the slope through (1, 2) and (5, 10)?", "Чему равен наклон прямой через точки (1, 2) и (5, 10)?"),
        options: [text("1", "1"), text("2", "2"), text("3", "3"), text("8", "8")],
        correctIndex: 1,
        explanation: text("(10 - 2)/(5 - 1) = 8/4 = 2.", "(10 − 2)/(5 − 1) = 8/4 = 2."),
        difficulty: "easy",
        desmos: ["m = (10 - 2)/(5 - 1)"],
      },
      {
        id: "m-geo-coordinates-p3",
        prompt: text("For y = 2x - 6, what is the x-intercept?", "Для y = 2x − 6 найдите пересечение с осью x."),
        options: [text("(6, 0)", "(6, 0)"), text("(3, 0)", "(3, 0)"), text("(0, 3)", "(0, 3)"), text("(-3, 0)", "(−3, 0)")],
        correctIndex: 1,
        explanation: text("Set y = 0: 0 = 2x - 6 gives x = 3.", "Подставим y = 0: 0 = 2x − 6 даёт x = 3."),
        difficulty: "medium",
        desmos: ["y = 2x - 6"],
      },
      {
        id: "m-geo-coordinates-p4",
        prompt: text("What is the distance between (0, 0) and (3, 4)?", "Чему равно расстояние между точками (0, 0) и (3, 4)?"),
        options: [text("7", "7"), text("5", "5"), text("25", "25"), text("6", "6")],
        correctIndex: 1,
        explanation: text("Square root of (9 + 16) = square root of 25 = 5.", "Корень из (9 + 16) = корень из 25 = 5."),
        difficulty: "easy",
        desmos: ["d = distance((0, 0), (3, 4))"],
      },
    ],
  },
];
