"use client";

import { cn } from "@/lib/utils";

type Kind =
  | "line"
  | "intersect"
  | "function-line"
  | "halfplane"
  | "abs"
  | "tank"
  | "table-graph"
  | "parabola-roots"
  | "parabola-vertex"
  | "line-parabola"
  | "curve-point"
  | "exp"
  | "hole"
  | "sqrt"
  | "bars-ratio"
  | "percent-bar"
  | "convert"
  | "stats"
  | "scatter"
  | "pie"
  | "sample"
  | "angles"
  | "similar"
  | "triangle345"
  | "trig"
  | "circle"
  | "volume"
  | "distance"
  | "passage";

const MAP: Record<string, Kind> = {
  "m-algebra-slope": "line",
  "m-algebra-linear-one": "intersect",
  "m-algebra-linear-functions": "function-line",
  "m-algebra-systems": "intersect",
  "m-algebra-inequalities": "halfplane",
  "m-algebra-absolute": "abs",
  "m-algebra-modeling": "tank",
  "m-algebra-graphs": "table-graph",
  "m-adv-quadratics-factoring": "parabola-roots",
  "m-adv-quadratic-forms": "parabola-vertex",
  "m-adv-nonlinear-systems": "line-parabola",
  "m-adv-functions": "curve-point",
  "m-adv-exponential": "exp",
  "m-adv-rational": "hole",
  "m-adv-radicals": "sqrt",
  "m-data-ratios": "bars-ratio",
  "m-data-percents": "percent-bar",
  "m-data-units": "convert",
  "m-data-statistics": "stats",
  "m-data-scatter": "scatter",
  "m-data-probability": "pie",
  "m-data-inference": "sample",
  "m-geo-angles": "angles",
  "m-geo-similarity": "similar",
  "m-geo-right-triangles": "triangle345",
  "m-geo-trig": "trig",
  "m-geo-circles": "circle",
  "m-geo-volume": "volume",
  "m-geo-coordinates": "distance",
};

const CAPTIONS: Record<Kind, { en: string; ru: string }> = {
  line: { en: "The line crosses the axes at the intercepts. The small triangle shows rise over run: slope.", ru: "Прямая пересекает оси в точках пересечения. Маленький треугольник показывает подъём и шаг: наклон." },
  intersect: { en: "Where the two graphs cross, both equations are true at once. That point is the solution.", ru: "Где два графика пересекаются, оба уравнения верны одновременно. Эта точка и есть решение." },
  "function-line": { en: "f(x) = mx + b: m is the rate (the arrow), b is the starting value on the y-axis.", ru: "f(x) = mx + b: m — скорость (стрелка), b — начальное значение на оси y." },
  halfplane: { en: "The shaded side is where the inequality is true. Test one point inside the shade.", ru: "Закрашенная сторона — там, где неравенство верно. Проверьте одну точку в закрашенной области." },
  abs: { en: "Absolute value makes a V. The corner is the lowest point; distance grows on both sides.", ru: "Модуль даёт галочку V. Угол — самая низкая точка, по обе стороны расстояние растёт." },
  tank: { en: "Start value plus rate times time. Each day adds the same amount.", ru: "Начальное значение плюс скорость умножить на время. Каждый день прибавляется одно и то же количество." },
  "table-graph": { en: "Same line, three ways: table, graph, equation. Intercepts show up in all three.", ru: "Одна прямая, три способа: таблица, график, уравнение. Пересечения видны во всех трёх." },
  "parabola-roots": { en: "Where the parabola crosses the x-axis, the function is zero. Those x-values are the roots.", ru: "Где парабола пересекает ось x, функция равна нулю. Эти значения x — корни." },
  "parabola-vertex": { en: "The vertex is the turning point: maximum if the parabola opens down, minimum if it opens up.", ru: "Вершина — точка поворота: максимум, если парабола смотрит вниз, и минимум, если вверх." },
  "line-parabola": { en: "Each crossing of the line and the parabola is a solution pair. Count the crossings for 'how many solutions'.", ru: "Каждое пересечение прямой и параболы — пара решений. Считайте пересечения для вопроса 'сколько решений'." },
  "curve-point": { en: "f(a) is the height of the graph above the input a. Mark the point and read its y-value.", ru: "f(a) — это высота графика над входом a. Отметьте точку и прочитайте её y." },
  exp: { en: "Growth bends up, decay bends toward zero. A factor above 1 grows, a factor below 1 decays.", ru: "Рост уходит вверх, спад прижимается к нулю. Множитель больше 1 даёт рост, меньше 1 — спад." },
  hole: { en: "The open circle is a hole: the simplified expression exists there, but the original does not.", ru: "Пустой кружок — прокол: упрощённое выражение там существует, а исходное — нет." },
  sqrt: { en: "Square root needs x ≥ 0. The curve starts at the origin and climbs more slowly and more slowly.", ru: "Квадратный корень требует x ≥ 0. Кривая начинается в начале координат и поднимается всё медленнее." },
  "bars-ratio": { en: "Ratios compare parts of the same whole. Both bars scale together: 3 : 5 stays 3 : 5.", ru: "Отношения сравнивают части одного целого. Оба столбика растут вместе: 3 : 5 остаётся 3 : 5." },
  "percent-bar": { en: "A 20% discount removes 20 parts of 100. You pay 80% of the original price.", ru: "Скидка 20% убирает 20 частей из 100. Вы платите 80% от исходной цены." },
  convert: { en: "Convert through one unit at a time. Arrows show the direction of the conversion.", ru: "Переводите через одну единицу за раз. Стрелки показывают направление перевода." },
  stats: { en: "The mean (8) is pulled up by the outlier 13. The median (7) stays in the middle.", ru: "Среднее (8) тянет вверх выброс 13. Медиана (7) остаётся в середине." },
  scatter: { en: "Points trend upward and the regression line goes through the cloud. Predict from the line, not the nearest point.", ru: "Точки идут вверх, а линия регрессии проходит через облако. Предсказывайте по линии, а не по ближайшей точке." },
  pie: { en: "Probability is favorable parts over all equally likely parts. The slice shows the share.", ru: "Вероятность — это благоприятные части, делённые на все равновероятные части. Доля видна на круге." },
  sample: { en: "A random sample looks like the population. A biased sample does not, and no calculation fixes that.", ru: "Случайная выборка похожа на всю совокупность. Смещённая — нет, и расчётом это не исправить." },
  angles: { en: "Vertical angles are equal. The tick marks show the pairs that match.", ru: "Вертикальные углы равны. Чёрточки показывают совпадающие пары." },
  similar: { en: "Similar triangles have the same angles. Every side of the big one is k times the small one.", ru: "У подобных треугольников одинаковые углы. Каждая сторона большого в k раз больше малой." },
  triangle345: { en: "3² + 4² = 5². The hypotenuse is the side opposite the right angle.", ru: "3² + 4² = 5². Гипотенуза — сторона напротив прямого угла." },
  trig: { en: "sin uses opposite over hypotenuse, cos uses adjacent over hypotenuse, tan uses opposite over adjacent.", ru: "sin — противолежащий к гипотенузе, cos — прилежащий к гипотенузе, tan — противолежащий к прилежащему." },
  circle: { en: "Every point on the circle is exactly radius r from the centre. That distance is the whole equation.", ru: "Каждая точка окружности ровно на расстоянии r от центра. Это расстояние и есть всё уравнение." },
  volume: { en: "Same base and height: a cone holds one third of the cylinder.", ru: "Одинаковые основание и высота: конус вмещает треть цилиндра." },
  distance: { en: "Distance is the hypotenuse of the right triangle between the points. Run and rise are its legs.", ru: "Расстояние — гипотенуза прямоугольного треугольника между точками. Шаг и подъём — его катеты." },
  passage: { en: "Claim, then evidence, then answer. Arrows show how the pieces connect.", ru: "Утверждение, затем доказательства, затем ответ. Стрелки показывают связь между частями." },
};

const VIOLET = "#a78bfa";
const SKY = "#38bdf8";
const EMERALD = "#34d399";
const AMBER = "#fbbf24";
const ROSE = "#fb7185";
const GRID = "rgba(255,255,255,0.07)";
const AXIS = "rgba(255,255,255,0.35)";
const LABEL = "#e4e4e7";

function Axes() {
  return (
    <g>
      <defs>
        <marker id="arrW" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill={AXIS} /></marker>
        <marker id="arrV" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill={VIOLET} /></marker>
        <marker id="arrS" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill={SKY} /></marker>
        <marker id="arrE" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill={EMERALD} /></marker>
        <marker id="arrA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill={AMBER} /></marker>
      </defs>
      {Array.from({ length: 13 }, (_, i) => <line key={`v${i}`} x1={40 + i * 46} y1={20} x2={40 + i * 46} y2={330} stroke={GRID} strokeWidth="1" />)}
      {Array.from({ length: 7 }, (_, i) => <line key={`h${i}`} x1={40} y1={20 + i * 46} x2={600} y2={20 + i * 46} stroke={GRID} strokeWidth="1" />)}
      <line x1={36} y1={300} x2={606} y2={300} stroke={AXIS} strokeWidth="1.5" markerEnd="url(#arrW)" />
      <line x1={320} y1={336} x2={320} y2={14} stroke={AXIS} strokeWidth="1.5" markerEnd="url(#arrW)" />
      <text x={612} y={306} fill={LABEL} fontSize="13" fontStyle="italic">x</text>
      <text x={328} y={16} fill={LABEL} fontSize="13" fontStyle="italic">y</text>
    </g>
  );
}

function Point({ x, y, color = VIOLET, label, lx, ly }: { x: number; y: number; color?: string; label?: string; lx?: number; ly?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill={color} opacity="0.25"><animate attributeName="r" values="8;12;8" dur="2.4s" repeatCount="indefinite" /></circle>
      <circle cx={x} cy={y} r={5} fill={color} stroke="#0a0a0f" strokeWidth="1.5" />
      {label ? <text x={lx ?? x + 10} y={ly ?? y - 8} fill={LABEL} fontSize="12" fontWeight="700">{label}</text> : null}
    </g>
  );
}

function Callout({ x, y, text, anchor = "start", color = SKY }: { x: number; y: number; text: string; anchor?: "start" | "middle" | "end"; color?: string }) {
  return (
    <g>
      <rect x={x - 8} y={y - 15} width={text.length * 7.2 + 16} height={22} rx={7} fill="rgba(10,10,15,0.82)" stroke={color} strokeOpacity="0.5" />
      <text x={x} y={y} fill={LABEL} fontSize="11.5" fontWeight="700" textAnchor={anchor}>{text}</text>
    </g>
  );
}

function Diagram({ kind, language }: { kind: Kind; language: "en" | "ru" }) {
  const F = (v: string, size = 12) => <text fill={LABEL} fontSize={size}>{v}</text>;

  switch (kind) {
    case "line":
      // y = -2x + 6 in an origin at (320, 300), 46px per unit: (0,6)->(320,24), (3,0)->(458,300)
      return (
        <g>
          <line x1={160} y1={300} x2={560} y2={-84} stroke={VIOLET} strokeWidth="3" style={{ filter: "drop-shadow(0 0 6px rgba(167,139,250,0.7))" }} />
          <Point x={320} y={24} label="(0, 6)" lx={286} ly={18} />
          <Point x={458} y={300} label="(3, 0)" lx={430} ly={326} />
          <path d="M320,24 L458,24 L458,300" fill="none" stroke={AMBER} strokeWidth="2" strokeDasharray="5 5" />
          <line x1={320} y1={24} x2={458} y2={24} stroke={AMBER} strokeWidth="2" markerEnd="url(#arrA)" />
          <line x1={458} y1={24} x2={458} y2={300} stroke={AMBER} strokeWidth="2" markerEnd="url(#arrA)" />
          <Callout x={340} y={86} text="run = 3" color={AMBER} />
          <Callout x={470} y={170} text="rise = −6" color={AMBER} />
          <Callout x={180} y={150} text="m = −6 / 3 = −2" color={VIOLET} />
        </g>
      );
    case "intersect":
      // two lines crossing at mapping (2,5): origin (150,300), 46px: P=(242,70)
      return (
        <g>
          <line x1={70} y1={260} x2={560} y2={-40} stroke={SKY} strokeWidth="3" style={{ filter: "drop-shadow(0 0 6px rgba(56,189,248,0.6))" }} />
          <line x1={70} y1={-20} x2={560} y2={320} stroke={EMERALD} strokeWidth="3" style={{ filter: "drop-shadow(0 0 6px rgba(52,211,153,0.6))" }} />
          <Point x={242} y={70} color={AMBER} label="(2, 5)" lx={252} ly={54} />
          <line x1={242} y1={70} x2={242} y2={300} stroke={AMBER} strokeWidth="1.5" strokeDasharray="4 5" />
          <line x1={150} y1={70} x2={242} y2={70} stroke={AMBER} strokeWidth="1.5" strokeDasharray="4 5" />
          <Callout x={96} y={220} text="y = 2x + 1" color={SKY} />
          <Callout x={430} y={240} text="x + y = 7" color={EMERALD} />
          <Callout x={252} y={130} text="x = 2  →  answer" color={AMBER} />
        </g>
      );
    case "function-line":
      // V = 120d + 5000 scaled: start (120,300), end (520,60)
      return (
        <g>
          <line x1={80} y1={300} x2={560} y2={40} stroke={VIOLET} strokeWidth="3" style={{ filter: "drop-shadow(0 0 6px rgba(167,139,250,0.7))" }} markerEnd="url(#arrV)" />
          <Point x={120} y={300} label="(0, 5000)" lx={70} ly={326} />
          <line x1={120} y1={300} x2={520} y2={300} stroke={AMBER} strokeWidth="1.5" strokeDasharray="4 5" />
          <line x1={520} y1={60} x2={520} y2={300} stroke={AMBER} strokeWidth="1.5" strokeDasharray="4 5" />
          <Callout x={150} y={250} text="b = 5000 start" color={VIOLET} />
          <Callout x={330} y={150} text="m = +120 per day" color={AMBER} />
          <Point x={520} y={60} color={AMBER} label="d = 15" lx={470} ly={48} />
        </g>
      );
    case "halfplane":
      return (
        <g>
          <polygon points="60,300 60,180 600,180 600,300" fill={SKY} opacity="0.14" />
          <line x1={60} y1={240} x2={600} y2={60} stroke={SKY} strokeWidth="3" />
          <Point x={250} y={110} color={SKY} label="test (0, 5)" lx={180} ly={96} />
          <line x1={60} y1={300} x2={600} y2={300} stroke={AXIS} strokeWidth="1" />
          <circle cx={400} cy={300} r={6} fill="none" stroke={EMERALD} strokeWidth="2.5" />
          <line x1={400} y1={300} x2={560} y2={300} stroke={EMERALD} strokeWidth="4" markerEnd="url(#arrE)" />
          <Callout x={80} y={320} text="x &gt; 5" color={EMERALD} />
          <Callout x={380} y={200} text="shaded = true" color={SKY} />
        </g>
      );
    case "abs":
      return (
        <g>
          <path d="M120,300 L320,60 L520,300" fill="none" stroke={VIOLET} strokeWidth="3.5" style={{ filter: "drop-shadow(0 0 6px rgba(167,139,250,0.7))" }} />
          <Point x={320} y={60} label="vertex (3, 0)" lx={300} ly={44} />
          <Callout x={130} y={240} text="down as x → 3" color={SKY} />
          <Callout x={430} y={240} text="up as x grows" color={EMERALD} />
        </g>
      );
    case "tank":
      return (
        <g>
          <rect x={120} y={60} width={150} height={260} rx={8} fill="none" stroke={AXIS} strokeWidth="2" />
          <rect x={120} y={120} width={150} height={200} fill={SKY} opacity="0.35" />
          <text x={150} y={235} fill={LABEL} fontSize="13" fontWeight="700">5000 L</text>
          <line x1={270} y1={120} x2={420} y2={120} stroke={AMBER} strokeWidth="2.5" markerEnd="url(#arrA)" />
          <Callout x={300} y={100} text="+120 / day" color={AMBER} />
          <rect x={420} y={60} width={150} height={260} rx={8} fill="none" stroke={AXIS} strokeWidth="2" />
          <rect x={420} y={84} width={150} height={236} fill={EMERALD} opacity="0.35" />
          <text x={450} y={235} fill={LABEL} fontSize="13" fontWeight="700">6800 L</text>
          <Callout x={440} y={348} text="d = 15" color={EMERALD} />
        </g>
      );
    case "table-graph":
      return (
        <g>
          <rect x={60} y={60} width={150} height={170} rx={10} fill="rgba(255,255,255,0.04)" stroke={AXIS} />
          {["x | y", "0 | 6", "1 | 4", "2 | 2", "3 | 0"].map((r, i) => <text key={r} x={80} y={92 + i * 30} fill={LABEL} fontSize="13" fontFamily="monospace">{r}</text>)}
          <line x1={300} y1={70} x2={400} y2={220} stroke={VIOLET} strokeWidth="3" markerEnd="url(#arrV)" />
          <circle cx={320} cy={300} r={4} fill={VIOLET} /><circle cx={458} cy={300} r={4} fill={VIOLET} />
          <rect x={440} y={60} width={150} height={90} rx={10} fill="rgba(255,255,255,0.04)" stroke={AXIS} />
          <text x={460} y={95} fill={LABEL} fontSize="14" fontFamily="monospace">y = −2x + 6</text>
          <text x={460} y={122} fill={LABEL} fontSize="12">m = −2 · b = 6</text>
          <line x1={212} y1={150} x2={296} y2={150} stroke={SKY} strokeWidth="2" markerEnd="url(#arrS)" />
          <line x1={404} y1={105} x2={436} y2={105} stroke={SKY} strokeWidth="2" markerEnd="url(#arrS)" />
          <Callout x={60} y={266} text="table" color={SKY} /><Callout x={300} y={266} text="graph" color={VIOLET} /><Callout x={440} y={180} text="equation" color={EMERALD} />
        </g>
      );
    case "parabola-roots":
      return (
        <g>
          <path d="M110,300 Q320,-80 530,300" fill="none" stroke={VIOLET} strokeWidth="3.5" style={{ filter: "drop-shadow(0 0 6px rgba(167,139,250,0.7))" }} />
          <Point x={230} y={300} color={AMBER} label="x = 2" lx={200} ly={326} />
          <Point x={410} y={300} color={AMBER} label="x = 3" lx={390} ly={326} />
          <line x1={230} y1={300} x2={230} y2={170} stroke={AMBER} strokeWidth="1.5" strokeDasharray="4 5" />
          <line x1={410} y1={300} x2={410} y2={170} stroke={AMBER} strokeWidth="1.5" strokeDasharray="4 5" />
          <Callout x={250} y={120} text="y = x² − 5x + 6" color={VIOLET} />
          <Callout x={430} y={230} text="f = 0 here" color={AMBER} />
        </g>
      );
    case "parabola-vertex":
      return (
        <g>
          <path d="M110,60 Q320,380 530,60" fill="none" stroke={VIOLET} strokeWidth="3.5" style={{ filter: "drop-shadow(0 0 6px rgba(167,139,250,0.7))" }} />
          <Point x={320} y={220} color={AMBER} label="vertex (3, −4) MAX" lx={250} ly={250} />
          <line x1={320} y1={220} x2={320} y2={300} stroke={AMBER} strokeWidth="1.5" strokeDasharray="4 5" />
          <Callout x={120} y={120} text="opens down → max" color={SKY} />
          <Callout x={430} y={120} text="vertex y = 11" color={EMERALD} />
        </g>
      );
    case "line-parabola":
      return (
        <g>
          <path d="M110,300 Q320,-40 530,300" fill="none" stroke={VIOLET} strokeWidth="3" />
          <line x1={90} y1={280} x2={560} y2={80} stroke={SKY} strokeWidth="3" markerEnd="url(#arrS)" />
          <Point x={200} y={190} color={AMBER} label="(−1, 2)" lx={130} ly={176} />
          <Point x={440} y={130} color={AMBER} label="(3, 8)" lx={450} ly={116} />
          <Callout x={300} y={60} text="2 crossings = 2 solutions" color={AMBER} />
        </g>
      );
    case "curve-point":
      return (
        <g>
          <path d="M100,300 C220,300 260,60 540,60" fill="none" stroke={VIOLET} strokeWidth="3" style={{ filter: "drop-shadow(0 0 6px rgba(167,139,250,0.6))" }} />
          <Point x={220} y={180} color={AMBER} label="f(−2) = 16" lx={230} ly={196} />
          <line x1={220} y1={180} x2={220} y2={300} stroke={AMBER} strokeWidth="1.5" strokeDasharray="4 5" />
          <line x1={120} y1={180} x2={220} y2={180} stroke={SKY} strokeWidth="1.5" strokeDasharray="4 5" />
          <Callout x={330} y={240} text="input → output" color={SKY} />
        </g>
      );
    case "exp":
      return (
        <g>
          <path d="M100,300 C240,300 320,180 540,50" fill="none" stroke={EMERALD} strokeWidth="3" style={{ filter: "drop-shadow(0 0 6px rgba(52,211,153,0.6))" }} markerEnd="url(#arrE)" />
          <path d="M100,60 C240,70 320,240 540,290" fill="none" stroke={ROSE} strokeWidth="3" markerEnd="url(#arrV)" />
          <Callout x={400} y={90} text="growth 1.08ˣ" color={EMERALD} />
          <Callout x={400} y={270} text="decay 0.85ˣ" color={ROSE} />
          <Point x={120} y={60} color={EMERALD} label="start" lx={80} ly={48} />
        </g>
      );
    case "hole":
      return (
        <g>
          <path d="M110,300 L250,170" stroke={VIOLET} strokeWidth="3" />
          <path d="M390,170 L530,300" stroke={VIOLET} strokeWidth="3" markerEnd="url(#arrV)" />
          <circle cx={320} cy={170} r={7} fill="none" stroke={AMBER} strokeWidth="3" />
          <line x1={320} y1={40} x2={320} y2={300} stroke={AMBER} strokeWidth="1.5" strokeDasharray="5 6" />
          <Callout x={350} y={150} text="hole (3, 6)" color={AMBER} />
          <Callout x={110} y={250} text="x ≠ 3" color={ROSE} />
        </g>
      );
    case "sqrt":
      return (
        <g>
          <path d="M120,300 C200,300 230,120 540,80" fill="none" stroke={SKY} strokeWidth="3.5" style={{ filter: "drop-shadow(0 0 6px rgba(56,189,248,0.6))" }} markerEnd="url(#arrS)" />
          <Point x={120} y={300} color={SKY} label="(0, 0)" lx={80} ly={326} />
          <rect x={70} y={60} width={34} height={260} fill={ROSE} opacity="0.12" />
          <Callout x={90} y={340} text="x &lt; 0: no graph" color={ROSE} />
          <Callout x={330} y={130} text="y = √x" color={SKY} />
        </g>
      );
    case "bars-ratio":
      return (
        <g>
          <rect x={140} y={150} width={90} height={150} fill={VIOLET} opacity="0.55" rx={6} />
          <rect x={300} y={80} width={150} height={220} fill={SKY} opacity="0.55" rx={6} />
          <text x={165} y={140} fill={LABEL} fontSize="13" fontWeight="700">3 parts</text>
          <text x={330} y={70} fill={LABEL} fontSize="13" fontWeight="700">5 parts</text>
          <line x1={230} y1={110} x2={300} y2={110} stroke={AMBER} strokeWidth="2.5" markerEnd="url(#arrA)" />
          <Callout x={235} y={94} text="×k both" color={AMBER} />
          <text x={180} y={262} fill={LABEL} fontSize="30" fontWeight="900">3 : 5</text>
        </g>
      );
    case "percent-bar":
      return (
        <g>
          <rect x={80} y={110} width={480} height={70} rx={10} fill="rgba(255,255,255,0.06)" stroke={AXIS} />
          <rect x={80} y={110} width={384} height={70} fill={EMERALD} opacity="0.55" rx={10} />
          <rect x={464} y={110} width={96} height={70} fill={ROSE} opacity="0.65" rx={10} />
          <text x={220} y={152} fill={LABEL} fontSize="16" fontWeight="800">pay 80%</text>
          <text x={472} y={152} fill={LABEL} fontSize="12" fontWeight="800">−20%</text>
          <line x1={464} y1={60} x2={464} y2={110} stroke={ROSE} strokeWidth="2" markerEnd="url(#arrV)" />
          <Callout x={300} y={230} text="0.80 · P = 48 → P = 60" color={EMERALD} />
        </g>
      );
    case "convert":
      return (
        <g>
          <rect x={80} y={90} width={170} height={80} rx={12} fill="rgba(255,255,255,0.05)" stroke={AXIS} />
          <text x={100} y={125} fill={LABEL} fontSize="15" fontWeight="800">8 km</text>
          <text x={100} y={148} fill={LABEL} fontSize="12">kilometers</text>
          <line x1={252} y1={130} x2={380} y2={130} stroke={SKY} strokeWidth="3" markerEnd="url(#arrS)" />
          <Callout x={258} y={110} text="÷ 1.609" color={SKY} />
          <rect x={384} y={90} width={170} height={80} rx={12} fill="rgba(255,255,255,0.05)" stroke={AXIS} />
          <text x={404} y={125} fill={LABEL} fontSize="15" fontWeight="800">≈ 4.97 mi</text>
          <text x={404} y={148} fill={LABEL} fontSize="12">miles</text>
          <Callout x={150} y={240} text="1 mile = 1.609 km" color={AMBER} />
        </g>
      );
    case "stats":
      return (
        <g>
          {[4, 7, 7, 9, 13].map((v, i) => (
            <g key={i}>
              <rect x={110 + i * 85} y={300 - v * 16} width={52} height={v * 16} fill={v === 13 ? ROSE : VIOLET} opacity="0.6" rx={5} />
              <text x={122 + i * 85} y={292 - v * 16} fill={LABEL} fontSize="13" fontWeight="700">{v}</text>
            </g>
          ))}
          <line x1={80} y1={172} x2={580} y2={172} stroke={AMBER} strokeWidth="2.5" strokeDasharray="7 6" />
          <Callout x={430} y={162} text="mean = 8" color={AMBER} />
          <line x1={80} y1={188} x2={580} y2={188} stroke={EMERALD} strokeWidth="2.5" strokeDasharray="7 6" />
          <Callout x={430} y={214} text="median = 7" color={EMERALD} />
          <Callout x={470} y={70} text="13 pulls mean up" color={ROSE} />
        </g>
      );
    case "scatter":
      return (
        <g>
          {[[120,260],[170,230],[215,200],[260,215],[310,160],[360,140],[410,110],[460,90],[500,70]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r={6} fill={SKY} opacity="0.85" />)}
          <line x1={90} y1={290} x2={540} y2={50} stroke={AMBER} strokeWidth="3" markerEnd="url(#arrA)" style={{ filter: "drop-shadow(0 0 5px rgba(251,191,36,0.6))" }} />
          <Callout x={380} y={200} text="line of best fit" color={AMBER} />
          <Callout x={110} y={320} text="predict from the line" color={SKY} />
        </g>
      );
    case "pie":
      return (
        <g>
          <path d="M320,190 L320,70 A120,120 0 0 1 440,190 Z" fill={EMERALD} opacity="0.7" />
          <path d="M320,190 L440,190 A120,120 0 0 1 200,270 Z" fill={SKY} opacity="0.55" />
          <path d="M320,190 L200,270 A120,120 0 0 1 320,70 Z" fill={VIOLET} opacity="0.5" />
          <text x={370} y={140} fill={LABEL} fontSize="13" fontWeight="800">1/3</text>
          <text x={330} y={230} fill={LABEL} fontSize="13" fontWeight="800">1/3</text>
          <text x={250} y={160} fill={LABEL} fontSize="13" fontWeight="800">1/3</text>
          <Callout x={430} y={290} text="P = 1/3" color={EMERALD} />
        </g>
      );
    case "sample":
      return (
        <g>
          <rect x={60} y={80} width={180} height={200} rx={12} fill="rgba(255,255,255,0.05)" stroke={AXIS} />
          <text x={80} y={110} fill={LABEL} fontSize="13" fontWeight="800">Population</text>
          <text x={80} y={132} fill={LABEL} fontSize="11">everyone in the group</text>
          {Array.from({length:12},(_,i)=><circle key={i} cx={90+(i%4)*38} cy={165+Math.floor(i/4)*32} r={7} fill={SKY} opacity="0.6" />)}
          <line x1={242} y1={180} x2={360} y2={180} stroke={AMBER} strokeWidth="3" markerEnd="url(#arrA)" />
          <Callout x={250} y={160} text="random pick" color={AMBER} />
          <rect x={364} y={80} width={180} height={200} rx={12} fill="rgba(255,255,255,0.05)" stroke={AXIS} />
          <text x={384} y={110} fill={LABEL} fontSize="13" fontWeight="800">Sample</text>
          <text x={384} y={132} fill={LABEL} fontSize="11">the group observed</text>
          {Array.from({length:5},(_,i)=><circle key={i} cx={394+(i%3)*38} cy={165+Math.floor(i/3)*32} r={7} fill={EMERALD} opacity="0.8" />)}
        </g>
      );
    case "angles":
      return (
        <g>
          <line x1={120} y1={300} x2={540} y2={60} stroke={SKY} strokeWidth="3" />
          <line x1={120} y1={60} x2={540} y2={300} stroke={VIOLET} strokeWidth="3" />
          <path d="M290,190 A60,60 0 0 1 350,190" fill="none" stroke={AMBER} strokeWidth="2.5" />
          <text x={306} y={182} fill={AMBER} fontSize="14" fontWeight="800">α</text>
          <path d="M290,190 A60,60 0 0 0 350,190" fill="none" stroke={AMBER} strokeWidth="2.5" />
          <text x={306} y={220} fill={AMBER} fontSize="14" fontWeight="800">α</text>
          <Callout x={380} y={120} text="vertical angles equal" color={AMBER} />
        </g>
      );
    case "similar":
      return (
        <g>
          <polygon points="120,300 120,180 300,300" fill={SKY} opacity="0.35" stroke={SKY} strokeWidth="2.5" />
          <polygon points="360,300 360,120 570,300" fill={VIOLET} opacity="0.35" stroke={VIOLET} strokeWidth="2.5" />
          <line x1={310} y1={240} x2={356} y2={240} stroke={AMBER} strokeWidth="3" markerEnd="url(#arrA)" />
          <Callout x={300} y={220} text="×k" color={AMBER} />
          <Callout x={120} y={330} text="small" color={SKY} />
          <Callout x={430} y={330} text="big" color={VIOLET} />
        </g>
      );
    case "triangle345":
      return (
        <g>
          <polygon points="150,300 150,100 550,300" fill={VIOLET} opacity="0.18" stroke={VIOLET} strokeWidth="3" />
          <rect x={150} y={272} width={28} height={28} fill="none" stroke={AMBER} strokeWidth="2.5" />
          <text x={90} y={210} fill={VIOLET} fontSize="15" fontWeight="800">3</text>
          <line x1={120} y1={200} x2={150} y2={200} stroke={VIOLET} strokeWidth="2" markerEnd="url(#arrV)" />
          <text x={330} y={330} fill={LABEL} fontSize="15" fontWeight="800">4</text>
          <text x={370} y={180} fill={AMBER} fontSize="16" fontWeight="800">5</text>
          <Callout x={330} y={80} text="3² + 4² = 5²" color={AMBER} />
        </g>
      );
    case "trig":
      return (
        <g>
          <polygon points="140,300 140,110 520,300" fill={SKY} opacity="0.15" stroke={SKY} strokeWidth="3" />
          <rect x={140} y={272} width={28} height={28} fill="none" stroke={AXIS} strokeWidth="2" />
          <path d="M200,300 A60,60 0 0 0 188,250" fill="none" stroke={AMBER} strokeWidth="2.5" />
          <text x={212} y={290} fill={AMBER} fontSize="16" fontWeight="800">θ</text>
          <text x={95} y={215} fill={SKY} fontSize="13" fontWeight="800">opp</text>
          <text x={320} y={326} fill={EMERALD} fontSize="13" fontWeight="800">adj</text>
          <text x={330} y={180} fill={LABEL} fontSize="13" fontWeight="800">hyp</text>
          <Callout x={380} y={80} text="sin = opp/hyp" color={SKY} />
          <Callout x={380} y={106} text="cos = adj/hyp" color={EMERALD} />
          <Callout x={380} y={132} text="tan = opp/adj" color={VIOLET} />
        </g>
      );
    case "circle":
      return (
        <g>
          <circle cx={320} cy={200} r={120} fill={VIOLET} opacity="0.12" stroke={VIOLET} strokeWidth="3" style={{ filter: "drop-shadow(0 0 8px rgba(167,139,250,0.5))" }} />
          <circle cx={320} cy={200} r={4} fill={AMBER} />
          <line x1={320} y1={200} x2={430} y2={130} stroke={AMBER} strokeWidth="2.5" markerEnd="url(#arrA)" />
          <Point x={430} y={130} color={EMERALD} label="on circle" lx={440} ly={118} />
          <Callout x={200} y={330} text="centre (2, −3) · r = 5" color={AMBER} />
        </g>
      );
    case "volume":
      return (
        <g>
          <rect x={110} y={110} width={130} height={190} rx={8} fill={SKY} opacity="0.3" stroke={SKY} strokeWidth="2.5" />
          <ellipse cx={175} cy={110} rx={65} ry={16} fill={SKY} opacity="0.2" stroke={SKY} strokeWidth="2.5" />
          <polygon points="380,110 510,110 445,300 315,300" fill={VIOLET} opacity="0.25" stroke={VIOLET} strokeWidth="2.5" />
          <ellipse cx={445} cy={110} rx={65} ry={16} fill={VIOLET} opacity="0.18" stroke={VIOLET} strokeWidth="2.5" />
          <text x={130} y={205} fill={LABEL} fontSize="13" fontWeight="800">cylinder</text>
          <text x={400} y={205} fill={LABEL} fontSize="13" fontWeight="800">cone</text>
          <Callout x={300} y={330} text="V cone = ⅓ V cylinder" color={AMBER} />
        </g>
      );
    case "distance":
      return (
        <g>
          <path d="M160,260 L160,110 L430,110 L430,260 Z" fill="none" stroke={GRID} />
          <line x1={160} y1={260} x2={430} y2={110} stroke={VIOLET} strokeWidth="3" markerEnd="url(#arrV)" style={{ filter: "drop-shadow(0 0 6px rgba(167,139,250,0.6))" }} />
          <line x1={160} y1={260} x2={430} y2={260} stroke={AMBER} strokeWidth="2" strokeDasharray="5 5" />
          <line x1={430} y1={260} x2={430} y2={110} stroke={AMBER} strokeWidth="2" strokeDasharray="5 5" />
          <Point x={160} y={260} color={SKY} label="A" lx={130} ly={284} />
          <Point x={430} y={110} color={EMERALD} label="B" lx={442} ly={100} />
          <Callout x={250} y={290} text="run" color={AMBER} />
          <Callout x={442} y={190} text="rise" color={AMBER} />
          <Callout x={250} y={140} text="distance = hypotenuse" color={VIOLET} />
        </g>
      );
    case "passage":
      return (
        <g>
          <rect x={60} y={110} width={150} height={110} rx={12} fill="rgba(255,255,255,0.05)" stroke={SKY} strokeWidth="2" />
          <text x={80} y={145} fill={LABEL} fontSize="13" fontWeight="800">Claim</text>
          <text x={80} y={165} fill={LABEL} fontSize="11">утверждение</text>
          <line x1={212} y1={165} x2={300} y2={165} stroke={SKY} strokeWidth="3" markerEnd="url(#arrS)" />
          <rect x={304} y={110} width={150} height={110} rx={12} fill="rgba(255,255,255,0.05)" stroke={EMERALD} strokeWidth="2" />
          <text x={324} y={145} fill={LABEL} fontSize="13" fontWeight="800">Evidence</text>
          <text x={324} y={165} fill={LABEL} fontSize="11">доказательства</text>
          <line x1={456} y1={165} x2={540} y2={165} stroke={AMBER} strokeWidth="3" markerEnd="url(#arrA)" />
          <rect x={544} y={110} width={80} height={110} rx={12} fill="rgba(255,255,255,0.05)" stroke={AMBER} strokeWidth="2" />
          <text x={558} y={145} fill={LABEL} fontSize="13" fontWeight="800">Answer</text>
          <text x={558} y={165} fill={LABEL} fontSize="11">ответ</text>
          <Callout x={180} y={280} text="evidence must match the claim" color={EMERALD} />
        </g>
      );
    default:
      return <g>{F("", 12)}</g>;
  }
}

export default function TopicDiagram({ topicId, section, language, className }: { topicId: string; section: string; language: "en" | "ru"; className?: string }) {
  const kind = MAP[topicId] ?? (section === "english" ? "passage" : "line");
  const caption = CAPTIONS[kind][language];
  const title = language === "ru" ? "Наглядная схема" : "Visual diagram";

  return (
    <figure className={cn("animate-float-up overflow-hidden rounded-2xl border border-violet-400/25 bg-gradient-to-br from-[#12121a] to-card/80 backdrop-blur-xl", className)}>
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-200">
          <span className="animate-pulse-soft inline-block h-2 w-2 rounded-full bg-violet-400" />
          {title}
        </span>
        <span className="text-[11px] font-medium text-muted-foreground">{language === "ru" ? "Смотри на стрелки и точки" : "Follow the arrows and points"}</span>
      </figcaption>
      <div className="p-3 sm:p-4">
        <svg viewBox="0 0 640 360" className="w-full rounded-xl bg-[#0d0d12]" role="img" aria-label={title}>
          <Axes />
          <Diagram kind={kind} language={language} />
        </svg>
        <p className="mt-3 px-1 text-sm leading-relaxed text-muted-foreground">{caption}</p>
      </div>
    </figure>
  );
}
