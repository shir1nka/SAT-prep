"use client";

import { useRef, useState } from "react";
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
  line: { en: "The line crosses the axes at (0, 6) and (3, 0). Move the cursor over the graph to read coordinates.", ru: "Прямая пересекает оси в точках (0, 6) и (3, 0). Наведите курсор на график, чтобы прочитать координаты." },
  intersect: { en: "Where the two graphs cross, both equations are true at once. The point (2, 5) is the solution.", ru: "Где два графика пересекаются, оба уравнения верны одновременно. Точка (2, 5) — это решение." },
  "function-line": { en: "f(x) = mx + b: m is the rate (the arrow), b is the starting value. Hover to read any point.", ru: "f(x) = mx + b: m — скорость (стрелка), b — начальное значение. Наведите курсор, чтобы прочитать точку." },
  halfplane: { en: "The shaded side is where the inequality is true. Test one point inside the shade.", ru: "Закрашенная сторона — там, где неравенство верно. Проверьте одну точку в закрашенной области." },
  abs: { en: "Absolute value makes a V. The corner is the lowest point; distance grows on both sides.", ru: "Модуль даёт галочку V. Угол — самая низкая точка, по обе стороны расстояние растёт." },
  tank: { en: "Start value plus rate times time. Each day adds the same amount.", ru: "Начальное значение плюс скорость умножить на время. Каждый день прибавляется одно и то же количество." },
  "table-graph": { en: "Same line, three ways: table, graph, equation. Intercepts show up in all three.", ru: "Одна прямая, три способа: таблица, график, уравнение. Пересечения видны во всех трёх." },
  "parabola-roots": { en: "Where the parabola crosses the x-axis, the function is zero. Those x-values are the roots 2 and 3.", ru: "Где парабола пересекает ось x, функция равна нулю. Эти значения x — корни 2 и 3." },
  "parabola-vertex": { en: "The vertex (3, 11) is the top. The parabola opens down, so the vertex is the maximum.", ru: "Вершина (3, 11) — верхняя точка. Парабола смотрит вниз, поэтому вершина — это максимум." },
  "line-parabola": { en: "Each crossing of the line and the parabola is a solution pair. Count the crossings for 'how many solutions'.", ru: "Каждое пересечение прямой и параболы — пара решений. Считайте пересечения для вопроса 'сколько решений'." },
  "curve-point": { en: "f(3) is the height of the graph above x = 3. Hover near the point to read it.", ru: "f(3) — это высота графика над x = 3. Наведите курсор рядом с точкой, чтобы прочитать её." },
  exp: { en: "Growth bends up, decay bends toward zero. A factor above 1 grows, a factor below 1 decays.", ru: "Рост уходит вверх, спад прижимается к нулю. Множитель больше 1 даёт рост, меньше 1 — спад." },
  hole: { en: "The open circle is a hole at (3, 6): the simplified expression exists there, but the original does not.", ru: "Пустой кружок — прокол в точке (3, 6): упрощённое выражение там существует, а исходное — нет." },
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

/** Coordinate transform for the graph-like diagrams. Hover uses it to read data coordinates. */
type Plot = { ox: number; oy: number; s: number; yDiv?: number };
const PLOTS: Partial<Record<Kind, Plot>> = {
  line: { ox: 320, oy: 300, s: 36 },
  intersect: { ox: 220, oy: 320, s: 34 },
  "function-line": { ox: 110, oy: 300, s: 30, yDiv: 1000 },
  halfplane: { ox: 220, oy: 300, s: 34 },
  abs: { ox: 200, oy: 300, s: 55 },
  "table-graph": { ox: 70, oy: 300, s: 36 },
  "parabola-roots": { ox: 110, oy: 290, s: 42 },
  "parabola-vertex": { ox: 110, oy: 290, s: 22 },
  "line-parabola": { ox: 300, oy: 210, s: 32 },
  "curve-point": { ox: 220, oy: 300, s: 30 },
  exp: { ox: 110, oy: 300, s: 32 },
  hole: { ox: 140, oy: 300, s: 38 },
  sqrt: { ox: 120, oy: 300, s: 34 },
  scatter: { ox: 110, oy: 300, s: 34 },
  distance: { ox: 140, oy: 290, s: 38 },
};

type Hover = { px: number; py: number; dx: number; dy: number } | null;

function Axes({ plot, xMax = 8, yMax = 8 }: { plot: Plot; xMax?: number; yMax?: number }) {
  const { ox, oy, s } = plot;
  const lines: React.ReactNode[] = [];
  for (let x = -Math.ceil(ox / s); x <= Math.ceil((640 - ox) / s); x += 1) {
    lines.push(<line key={`v${x}`} x1={ox + x * s} y1={10} x2={ox + x * s} y2={350} stroke={GRID} />);
    lines.push(<text key={`xt${x}`} x={ox + x * s} y={oy + 16} fill={LABEL} fontSize="10" textAnchor="middle" opacity="0.7">{x === 0 ? "" : x}</text>);
  }
  for (let y = -Math.ceil((350 - oy) / s); y <= Math.ceil((oy - 10) / s); y += 1) {
    lines.push(<line key={`h${y}`} x1={20} y1={oy - y * s} x2={630} y2={oy - y * s} stroke={GRID} />);
    lines.push(<text key={`yt${y}`} x={ox - 8} y={oy - y * s + 3} fill={LABEL} fontSize="10" textAnchor="end" opacity="0.7">{y === 0 ? "" : y}</text>);
  }
  void xMax; void yMax;
  return (
    <g>
      <defs>
        <marker id="arrW" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill={AXIS} /></marker>
        <marker id="arrV" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill={VIOLET} /></marker>
        <marker id="arrS" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill={SKY} /></marker>
        <marker id="arrE" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill={EMERALD} /></marker>
        <marker id="arrA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill={AMBER} /></marker>
      </defs>
      {lines}
      <line x1={24} y1={oy} x2={622} y2={oy} stroke={AXIS} strokeWidth="1.5" markerEnd="url(#arrW)" />
      <line x1={ox} y1={346} x2={ox} y2={12} stroke={AXIS} strokeWidth="1.5" markerEnd="url(#arrW)" />
      <text x={626} y={oy + 16} fill={LABEL} fontSize="13" fontStyle="italic">x</text>
      <text x={ox + 8} y={14} fill={LABEL} fontSize="13" fontStyle="italic">y</text>
    </g>
  );
}

function SchematicAxes() {
  return (
    <g>
      <defs>
        <marker id="arrW2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill={AXIS} /></marker>
        <marker id="arrV2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill={VIOLET} /></marker>
        <marker id="arrS2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill={SKY} /></marker>
        <marker id="arrE2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill={EMERALD} /></marker>
        <marker id="arrA2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill={AMBER} /></marker>
      </defs>
      {Array.from({ length: 13 }, (_, i) => <line key={`v${i}`} x1={40 + i * 46} y1={20} x2={40 + i * 46} y2={330} stroke={GRID} />)}
      {Array.from({ length: 7 }, (_, i) => <line key={`h${i}`} x1={40} y1={20 + i * 46} x2={600} y2={20 + i * 46} stroke={GRID} />)}
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

function Callout({ x, y, text, color = SKY }: { x: number; y: number; text: string; color?: string }) {
  return (
    <g>
      <rect x={x - 8} y={y - 16} width={text.length * 7.2 + 16} height={22} rx={7} fill="rgba(10,10,15,0.85)" stroke={color} strokeOpacity="0.5" />
      <text x={x} y={y} fill={LABEL} fontSize="11.5" fontWeight="700">{text}</text>
    </g>
  );
}

/** Map a data point to pixels with the plot transform. */
function P(plot: Plot, x: number, y: number) {
  return [plot.ox + x * plot.s, plot.oy - y * plot.s] as const;
}

/** Polyline path sampled from a function over [x1, x2]. */
function curve(plot: Plot, f: (x: number) => number, x1: number, x2: number, step = 0.1) {
  const pts: string[] = [];
  for (let x = x1; x <= x2 + 1e-6; x += step) {
    const [px, py] = P(plot, x, f(x));
    pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }
  return pts.join(" ");
}

/* ---------------- Diagrams (mathematically exact) ---------------- */

function Diagram({ kind }: { kind: Kind }) {
  switch (kind) {
    case "line": {
      const p = PLOTS.line!;
      const [x0, y0] = P(p, 0, 6);
      const [x3, y3] = P(p, 3, 0);
      const [xa, ya] = P(p, -3.2, 12.4);
      const [xb, yb] = P(p, 6.2, -6.4);
      return (
        <g>
          <line x1={xa} y1={ya} x2={xb} y2={yb} stroke={VIOLET} strokeWidth="3" style={{ filter: "drop-shadow(0 0 6px rgba(167,139,250,0.7))" }} />
          <path d={`M${x0},${y0} L${x3},${y0} L${x3},${y3}`} fill="none" stroke={AMBER} strokeWidth="2" strokeDasharray="5 5" />
          <line x1={x0} y1={y0} x2={x3} y2={y0} stroke={AMBER} strokeWidth="2" markerEnd="url(#arrA)" />
          <line x1={x3} y1={y0} x2={x3} y2={y3} stroke={AMBER} strokeWidth="2" markerEnd="url(#arrA)" />
          <Point x={x0} y={y0} label="(0, 6)" lx={x0 + 10} ly={y0 - 8} />
          <Point x={x3} y={y3} label="(3, 0)" lx={x3 + 10} ly={y3 + 20} />
          <Callout x={x0 + 14} y={y0 + 44} text="run = 3" color={AMBER} />
          <Callout x={x3 + 12} y={y0 + 150} text="rise = −6" color={AMBER} />
          <Callout x={110} y={120} text="m = −6 / 3 = −2" color={VIOLET} />
        </g>
      );
    }
    case "intersect": {
      const p = PLOTS.intersect!;
      const [ix, iy] = P(p, 2, 5);
      return (
        <g>
          <polyline points={curve(p, (x) => 2 * x + 1, -2.5, 6.5)} fill="none" stroke={SKY} strokeWidth="3" style={{ filter: "drop-shadow(0 0 6px rgba(56,189,248,0.6))" }} />
          <polyline points={curve(p, (x) => -x + 7, -2.5, 6.5)} fill="none" stroke={EMERALD} strokeWidth="3" style={{ filter: "drop-shadow(0 0 6px rgba(52,211,153,0.6))" }} />
          <Point x={ix} y={iy} color={AMBER} label="(2, 5)" lx={ix + 12} ly={iy - 8} />
          <line x1={ix} y1={iy} x2={ix} y2={p.oy} stroke={AMBER} strokeWidth="1.5" strokeDasharray="4 5" />
          <line x1={p.ox} y1={iy} x2={ix} y2={iy} stroke={AMBER} strokeWidth="1.5" strokeDasharray="4 5" />
          <Callout x={60} y={110} text="y = 2x + 1" color={SKY} />
          <Callout x={430} y={250} text="x + y = 7" color={EMERALD} />
          <Callout x={ix + 10} y={iy + 42} text="x = 2 → answer" color={AMBER} />
        </g>
      );
    }
    case "function-line": {
      const p = PLOTS["function-line"]!;
      const [x0, y0] = P(p, 0, 5);
      const [x15, y15] = P(p, 15, 6.8);
      return (
        <g>
          <line x1={x0} y1={y0} x2={x15} y2={y15} stroke={VIOLET} strokeWidth="3" style={{ filter: "drop-shadow(0 0 6px rgba(167,139,250,0.7))" }} markerEnd="url(#arrV)" />
          <Point x={x0} y={y0} label="(0, 5000)" lx={x0 - 70} ly={y0 + 22} />
          <Point x={x15} y={y15} color={AMBER} label="(15, 6800)" lx={x15 - 96} ly={y15 - 10} />
          <line x1={x0} y1={y0} x2={x15} y2={y0} stroke={AMBER} strokeWidth="1.2" strokeDasharray="4 5" />
          <line x1={x15} y1={y15} x2={x15} y2={y0} stroke={AMBER} strokeWidth="1.2" strokeDasharray="4 5" />
          <Callout x={180} y={230} text="b = 5000 start" color={VIOLET} />
          <Callout x={300} y={150} text="m = +120 / day" color={AMBER} />
          <text x={p.ox + 16 * p.s - 6} y={p.oy + 18} fill={LABEL} fontSize="11" opacity="0.7">d, days (y shown in thousands of litres)</text>
        </g>
      );
    }
    case "halfplane": {
      const p = PLOTS.halfplane!;
      const shade = curve(p, (x) => 2 * x + 1, -3, 7);
      const [sx, sy] = P(p, -3, 2 * -3 + 1);
      const [ex, ey] = P(p, 7, 2 * 7 + 1);
      const [tx, ty] = P(p, 0, 5);
      return (
        <g>
          <polygon points={`${sx},${sy} ${ex},${ey} ${ex},${p.oy} ${sx},${p.oy}`} fill={SKY} opacity="0.14" />
          <polyline points={shade} fill="none" stroke={SKY} strokeWidth="3" />
          <Point x={tx} y={ty} color={SKY} label="test (0, 5): true" lx={tx + 10} ly={ty - 12} />
          <Callout x={380} y={230} text="shaded = true" color={SKY} />
          <text x={90} y={340} fill={LABEL} fontSize="12" opacity="0.8">y &gt; 2x + 1 — solid line = included, dashed = strict</text>
        </g>
      );
    }
    case "abs": {
      const p = PLOTS.abs!;
      return (
        <g>
          <polyline points={curve(p, (x) => Math.abs(x - 3), -1, 7)} fill="none" stroke={VIOLET} strokeWidth="3.5" style={{ filter: "drop-shadow(0 0 6px rgba(167,139,250,0.7))" }} />
          <Point x={P(p, 3, 0)[0]} y={P(p, 3, 0)[1]} label="vertex (3, 0)" lx={P(p, 3, 0)[0] - 40} ly={P(p, 3, 0)[1] + 24} />
          <Callout x={80} y={120} text="down as x → 3" color={SKY} />
          <Callout x={430} y={120} text="up as x grows" color={EMERALD} />
        </g>
      );
    }
    case "tank":
      return (
        <g>
          <rect x={110} y={60} width={150} height={250} rx={8} fill="none" stroke={AXIS} strokeWidth="2" />
          <rect x={110} y={120} width={150} height={190} fill={SKY} opacity="0.35" />
          <text x={142} y={232} fill={LABEL} fontSize="13" fontWeight="700">5000 L</text>
          <line x1={262} y1={120} x2={400} y2={120} stroke={AMBER} strokeWidth="2.5" markerEnd="url(#arrA2)" />
          <Callout x={290} y={100} text="+120 / day" color={AMBER} />
          <rect x={404} y={60} width={150} height={250} rx={8} fill="none" stroke={AXIS} strokeWidth="2" />
          <rect x={404} y={84} width={150} height={226} fill={EMERALD} opacity="0.35" />
          <text x={436} y={232} fill={LABEL} fontSize="13" fontWeight="700">6800 L</text>
          <Callout x={430} y={340} text="d = 15" color={EMERALD} />
        </g>
      );
    case "table-graph": {
      const p = PLOTS["table-graph"]!;
      return (
        <g>
          <rect x={50} y={50} width={150} height={170} rx={10} fill="rgba(255,255,255,0.04)" stroke={AXIS} />
          {["x | y", "0 | 6", "1 | 4", "2 | 2", "3 | 0"].map((r, i) => <text key={r} x={70} y={82 + i * 30} fill={LABEL} fontSize="13" fontFamily="monospace">{r}</text>)}
          <polyline points={curve(p, (x) => -2 * x + 6, 0, 3.4, 0.2)} fill="none" stroke={VIOLET} strokeWidth="3" markerEnd="url(#arrV2)" />
          {([0, 1, 2, 3] as const).map((x) => { const [px, py] = P(p, x, -2 * x + 6); return <circle key={x} cx={px} cy={py} r={4.5} fill={VIOLET} stroke="#0a0a0f" strokeWidth="1.2" />; })}
          <rect x={440} y={50} width={150} height={90} rx={10} fill="rgba(255,255,255,0.04)" stroke={AXIS} />
          <text x={460} y={88} fill={LABEL} fontSize="14" fontFamily="monospace">y = −2x + 6</text>
          <text x={460} y={114} fill={LABEL} fontSize="12">m = −2 · b = 6</text>
          <line x1={202} y1={140} x2={286} y2={140} stroke={SKY} strokeWidth="2" markerEnd="url(#arrS2)" />
          <line x1={404} y1={95} x2={436} y2={95} stroke={SKY} strokeWidth="2" markerEnd="url(#arrS2)" />
          <Callout x={50} y={252} text="table" color={SKY} /><Callout x={p.ox} y={336} text="graph" color={VIOLET} /><Callout x={440} y={170} text="equation" color={EMERALD} />
        </g>
      );
    }
    case "parabola-roots": {
      const p = PLOTS["parabola-roots"]!;
      return (
        <g>
          <polyline points={curve(p, (x) => x * x - 5 * x + 6, 0.7, 4.6, 0.05)} fill="none" stroke={VIOLET} strokeWidth="3.5" style={{ filter: "drop-shadow(0 0 6px rgba(167,139,250,0.7))" }} />
          <Point x={P(p, 2, 0)[0]} y={P(p, 2, 0)[1]} color={AMBER} label="x = 2" lx={P(p, 2, 0)[0] - 20} ly={P(p, 2, 0)[1] + 24} />
          <Point x={P(p, 3, 0)[0]} y={P(p, 3, 0)[1]} color={AMBER} label="x = 3" lx={P(p, 3, 0)[0] + 8} ly={P(p, 3, 0)[1] + 24} />
          <line x1={P(p, 2, 0)[0]} y1={P(p, 2, 0)[1]} x2={P(p, 2, 0)[0]} y2={P(p, 2, 0)[1] - 90} stroke={AMBER} strokeWidth="1.4" strokeDasharray="4 5" />
          <line x1={P(p, 3, 0)[0]} y1={P(p, 3, 0)[1]} x2={P(p, 3, 0)[0]} y2={P(p, 3, 0)[1] - 90} stroke={AMBER} strokeWidth="1.4" strokeDasharray="4 5" />
          <Callout x={250} y={90} text="y = x² − 5x + 6" color={VIOLET} />
          <Callout x={430} y={220} text="f = 0 at roots" color={AMBER} />
        </g>
      );
    }
    case "parabola-vertex": {
      const p = PLOTS["parabola-vertex"]!;
      return (
        <g>
          <polyline points={curve(p, (x) => -2 * x * x + 12 * x - 7, 0.4, 5.8, 0.05)} fill="none" stroke={VIOLET} strokeWidth="3.5" style={{ filter: "drop-shadow(0 0 6px rgba(167,139,250,0.7))" }} />
          <Point x={P(p, 3, 11)[0]} y={P(p, 3, 11)[1]} color={AMBER} label="vertex (3, 11)" lx={P(p, 3, 11)[0] + 12} ly={P(p, 3, 11)[1] + 4} />
          <Callout x={80} y={80} text="opens down → max" color={SKY} />
          <Callout x={420} y={80} text="vertex y = 11" color={EMERALD} />
        </g>
      );
    }
    case "line-parabola": {
      const p = PLOTS["line-parabola"]!;
      const r1 = 1 + Math.sqrt(5);
      const r2 = 1 - Math.sqrt(5);
      return (
        <g>
          <polyline points={curve(p, (x) => x * x - 3, -2.4, 4.4, 0.05)} fill="none" stroke={VIOLET} strokeWidth="3" />
          <polyline points={curve(p, (x) => 2 * x + 1, -2.4, 4.4)} fill="none" stroke={SKY} strokeWidth="3" markerEnd="url(#arrS2)" />
          <Point x={P(p, r1, 2 * r1 + 1)[0]} y={P(p, r1, 2 * r1 + 1)[1]} color={AMBER} label={`(${r1.toFixed(2)}, ${(2 * r1 + 1).toFixed(2)})`} lx={P(p, r1, 2 * r1 + 1)[0] + 10} ly={P(p, r1, 2 * r1 + 1)[1] - 8} />
          <Point x={P(p, r2, 2 * r2 + 1)[0]} y={P(p, r2, 2 * r2 + 1)[1]} color={AMBER} label={`(${r2.toFixed(2)}, ${(2 * r2 + 1).toFixed(2)})`} lx={P(p, r2, 2 * r2 + 1)[0] - 96} ly={P(p, r2, 2 * r2 + 1)[1] + 22} />
          <Callout x={300} y={50} text="2 crossings = 2 solutions" color={AMBER} />
        </g>
      );
    }
    case "curve-point": {
      const p = PLOTS["curve-point"]!;
      const f = (x: number) => x * x * x - 4 * x + 1;
      const [px, py] = P(p, 3, f(3));
      return (
        <g>
          <polyline points={curve(p, f, -1.6, 3.4, 0.05)} fill="none" stroke={VIOLET} strokeWidth="3" style={{ filter: "drop-shadow(0 0 6px rgba(167,139,250,0.6))" }} />
          <Point x={px} y={py} color={AMBER} label="f(3) = 16" lx={px - 76} ly={py - 10} />
          <line x1={px} y1={py} x2={px} y2={p.oy} stroke={AMBER} strokeWidth="1.4" strokeDasharray="4 5" />
          <line x1={p.ox} y1={py} x2={px} y2={py} stroke={SKY} strokeWidth="1.4" strokeDasharray="4 5" />
          <Callout x={330} y={240} text="input → output" color={SKY} />
        </g>
      );
    }
    case "exp": {
      const p = PLOTS.exp!;
      return (
        <g>
          <polyline points={curve(p, (x) => Math.pow(1.08, x), 0, 12, 0.2)} fill="none" stroke={EMERALD} strokeWidth="3" style={{ filter: "drop-shadow(0 0 6px rgba(52,211,153,0.6))" }} />
          <polyline points={curve(p, (x) => Math.pow(0.85, x), 0, 12, 0.2)} fill="none" stroke={ROSE} strokeWidth="3" />
          <Point x={P(p, 0, 1)[0]} y={P(p, 0, 1)[1]} color={EMERALD} label="start 1" lx={P(p, 0, 1)[0] + 8} ly={P(p, 0, 1)[1] - 10} />
          <Callout x={400} y={90} text="growth 1.08ˣ" color={EMERALD} />
          <Callout x={400} y={270} text="decay 0.85ˣ" color={ROSE} />
        </g>
      );
    }
    case "hole": {
      const p = PLOTS.hole!;
      const [hx, hy] = P(p, 3, 6);
      return (
        <g>
          <polyline points={curve(p, (x) => x + 3, -1, 2.92, 0.1)} fill="none" stroke={VIOLET} strokeWidth="3" />
          <polyline points={curve(p, (x) => x + 3, 3.08, 7, 0.1)} fill="none" stroke={VIOLET} strokeWidth="3" markerEnd="url(#arrV2)" />
          <circle cx={hx} cy={hy} r={7} fill="none" stroke={AMBER} strokeWidth="3" />
          <line x1={hx} y1={P(p, 3, 7.5)[1]} x2={hx} y2={p.oy} stroke={AMBER} strokeWidth="1.4" strokeDasharray="5 6" />
          <Callout x={hx + 14} y={hy} text="hole (3, 6)" color={AMBER} />
          <Callout x={90} y={250} text="x ≠ 3" color={ROSE} />
        </g>
      );
    }
    case "sqrt": {
      const p = PLOTS.sqrt!;
      return (
        <g>
          <polyline points={curve(p, (x) => Math.sqrt(x), 0, 9, 0.1)} fill="none" stroke={SKY} strokeWidth="3.5" style={{ filter: "drop-shadow(0 0 6px rgba(56,189,248,0.6))" }} markerEnd="url(#arrS2)" />
          <Point x={P(p, 0, 0)[0]} y={P(p, 0, 0)[1]} color={SKY} label="(0, 0)" lx={P(p, 0, 0)[0] + 8} ly={P(p, 0, 0)[1] + 22} />
          <rect x={60} y={50} width={30} height={260} fill={ROSE} opacity="0.12" />
          <Callout x={70} y={338} text="x < 0: no graph" color={ROSE} />
          <Callout x={330} y={130} text="y = √x" color={SKY} />
        </g>
      );
    }
    case "bars-ratio":
      return (
        <g>
          <rect x={140} y={150} width={90} height={150} fill={VIOLET} opacity="0.55" rx={6} />
          <rect x={300} y={80} width={150} height={220} fill={SKY} opacity="0.55" rx={6} />
          <text x={158} y={140} fill={LABEL} fontSize="13" fontWeight="700">3 parts</text>
          <text x={336} y={70} fill={LABEL} fontSize="13" fontWeight="700">5 parts</text>
          <line x1={232} y1={110} x2={298} y2={110} stroke={AMBER} strokeWidth="2.5" markerEnd="url(#arrA2)" />
          <Callout x={232} y={94} text="×k both" color={AMBER} />
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
          <line x1={464} y1={60} x2={464} y2={108} stroke={ROSE} strokeWidth="2" markerEnd="url(#arrV2)" />
          <Callout x={300} y={230} text="0.80 · P = 48 → P = 60" color={EMERALD} />
        </g>
      );
    case "convert":
      return (
        <g>
          <rect x={80} y={90} width={170} height={80} rx={12} fill="rgba(255,255,255,0.05)" stroke={AXIS} />
          <text x={100} y={125} fill={LABEL} fontSize="15" fontWeight="800">8 km</text>
          <text x={100} y={148} fill={LABEL} fontSize="12">kilometers</text>
          <line x1={252} y1={130} x2={380} y2={130} stroke={SKY} strokeWidth="3" markerEnd="url(#arrS2)" />
          <Callout x={258} y={110} text="÷ 1.609" color={SKY} />
          <rect x={384} y={90} width={170} height={80} rx={12} fill="rgba(255,255,255,0.05)" stroke={AXIS} />
          <text x={404} y={125} fill={LABEL} fontSize="15" fontWeight="800">≈ 4.97 mi</text>
          <text x={404} y={148} fill={LABEL} fontSize="12">miles</text>
          <Callout x={150} y={240} text="1 mile = 1.609 km" color={AMBER} />
        </g>
      );
    case "stats": {
      const vals = [4, 7, 7, 9, 13];
      const base = 300;
      const h = (v: number) => v * 16;
      const yOf = (v: number) => base - h(v);
      return (
        <g>
          {vals.map((v, i) => (
            <g key={i}>
              <rect x={110 + i * 85} y={yOf(v)} width={52} height={h(v)} fill={v === 13 ? ROSE : VIOLET} opacity="0.6" rx={5} />
              <text x={122 + i * 85} y={yOf(v) - 8} fill={LABEL} fontSize="13" fontWeight="700">{v}</text>
            </g>
          ))}
          <line x1={80} y1={yOf(8)} x2={580} y2={yOf(8)} stroke={AMBER} strokeWidth="2.5" strokeDasharray="7 6" />
          <Callout x={430} y={yOf(8) - 10} text="mean = 8" color={AMBER} />
          <line x1={80} y1={yOf(7)} x2={580} y2={yOf(7)} stroke={EMERALD} strokeWidth="2.5" strokeDasharray="7 6" />
          <Callout x={430} y={yOf(7) + 20} text="median = 7" color={EMERALD} />
          <Callout x={470} y={70} text="13 pulls mean up" color={ROSE} />
        </g>
      );
    }
    case "scatter": {
      const p = PLOTS.scatter!;
      const pts: Array<[number, number]> = [[1, 1.6], [2, 4.0], [3, 3.9], [4, 6.1], [5, 5.9], [6, 8.2], [7, 7.8], [8, 10.3], [9, 9.9]];
      const line = (x: number) => 1.05 * x + 1.1;
      return (
        <g>
          {pts.map(([x, y], i) => { const [px, py] = P(p, x, y); return <circle key={i} cx={px} cy={py} r={6} fill={SKY} opacity="0.85" />; })}
          <polyline points={curve(p, line, 0.5, 9.5)} fill="none" stroke={AMBER} strokeWidth="3" markerEnd="url(#arrA2)" style={{ filter: "drop-shadow(0 0 5px rgba(251,191,36,0.6))" }} />
          <Callout x={380} y={200} text="line of best fit" color={AMBER} />
          <Callout x={90} y={330} text="predict from the line" color={SKY} />
        </g>
      );
    }
    case "pie":
      return (
        <g>
          <path d="M320,190 L320,70 A120,120 0 0 1 440,190 Z" fill={EMERALD} opacity="0.7" />
          <path d="M320,190 L440,190 A120,120 0 0 1 200,270 Z" fill={SKY} opacity="0.55" />
          <path d="M320,190 L200,270 A120,120 0 0 1 320,70 Z" fill={VIOLET} opacity="0.5" />
          <text x={372} y={140} fill={LABEL} fontSize="13" fontWeight="800">1/3</text>
          <text x={332} y={232} fill={LABEL} fontSize="13" fontWeight="800">1/3</text>
          <text x={252} y={160} fill={LABEL} fontSize="13" fontWeight="800">1/3</text>
          <Callout x={430} y={290} text="P = 1/3" color={EMERALD} />
        </g>
      );
    case "sample":
      return (
        <g>
          <rect x={60} y={80} width={180} height={200} rx={12} fill="rgba(255,255,255,0.05)" stroke={AXIS} />
          <text x={80} y={110} fill={LABEL} fontSize="13" fontWeight="800">Population</text>
          <text x={80} y={132} fill={LABEL} fontSize="11">everyone in the group</text>
          {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={90 + (i % 4) * 38} cy={165 + Math.floor(i / 4) * 32} r={7} fill={SKY} opacity="0.6" />)}
          <line x1={242} y1={180} x2={360} y2={180} stroke={AMBER} strokeWidth="3" markerEnd="url(#arrA2)" />
          <Callout x={250} y={160} text="random pick" color={AMBER} />
          <rect x={364} y={80} width={180} height={200} rx={12} fill="rgba(255,255,255,0.05)" stroke={AXIS} />
          <text x={384} y={110} fill={LABEL} fontSize="13" fontWeight="800">Sample</text>
          <text x={384} y={132} fill={LABEL} fontSize="11">the group observed</text>
          {Array.from({ length: 5 }, (_, i) => <circle key={i} cx={394 + (i % 3) * 38} cy={165 + Math.floor(i / 3) * 32} r={7} fill={EMERALD} opacity="0.8" />)}
        </g>
      );
    case "angles":
      return (
        <g>
          <line x1={120} y1={300} x2={540} y2={60} stroke={SKY} strokeWidth="3" />
          <line x1={120} y1={60} x2={540} y2={300} stroke={VIOLET} strokeWidth="3" />
          <path d="M290,170 A60,60 0 0 1 350,190" fill="none" stroke={AMBER} strokeWidth="2.5" />
          <text x={306} y={180} fill={AMBER} fontSize="14" fontWeight="800">α</text>
          <path d="M290,210 A60,60 0 0 0 350,190" fill="none" stroke={AMBER} strokeWidth="2.5" />
          <text x={306} y={226} fill={AMBER} fontSize="14" fontWeight="800">α</text>
          <Callout x={380} y={120} text="vertical angles equal" color={AMBER} />
        </g>
      );
    case "similar":
      // small legs 90 x 120, big legs 135 x 180 (k = 1.5)
      return (
        <g>
          <polygon points="100,300 100,210 220,300" fill={SKY} opacity="0.35" stroke={SKY} strokeWidth="2.5" />
          <polygon points="350,300 350,165 530,300" fill={VIOLET} opacity="0.35" stroke={VIOLET} strokeWidth="2.5" />
          <line x1={230} y1={240} x2={346} y2={240} stroke={AMBER} strokeWidth="3" markerEnd="url(#arrA2)" />
          <Callout x={236} y={220} text="×1.5" color={AMBER} />
          <Callout x={100} y={332} text="small" color={SKY} />
          <Callout x={420} y={332} text="big" color={VIOLET} />
        </g>
      );
    case "triangle345":
      // legs 3 (vertical) and 4 (horizontal), scale 45: 135 x 180, hypotenuse 225
      return (
        <g>
          <polygon points="150,300 150,165 330,300" fill={VIOLET} opacity="0.18" stroke={VIOLET} strokeWidth="3" />
          <rect x={150} y={272} width={28} height={28} fill="none" stroke={AMBER} strokeWidth="2.5" />
          <text x={106} y={240} fill={VIOLET} fontSize="15" fontWeight="800">3</text>
          <line x1={118} y1={232} x2={148} y2={232} stroke={VIOLET} strokeWidth="2" markerEnd="url(#arrV2)" />
          <text x={232} y={326} fill={LABEL} fontSize="15" fontWeight="800">4</text>
          <text x={252} y={214} fill={AMBER} fontSize="16" fontWeight="800">5</text>
          <Callout x={330} y={80} text="3² + 4² = 5²" color={AMBER} />
        </g>
      );
    case "trig":
      // adj 360 at 30 degrees: opp = 360 * tan(30) = 208
      return (
        <g>
          <polygon points="140,300 140,92 500,300" fill={SKY} opacity="0.15" stroke={SKY} strokeWidth="3" />
          <rect x={140} y={272} width={28} height={28} fill="none" stroke={AXIS} strokeWidth="2" />
          <path d="M200,300 A60,60 0 0 0 192,265" fill="none" stroke={AMBER} strokeWidth="2.5" />
          <text x={212} y={292} fill={AMBER} fontSize="16" fontWeight="800">θ = 30°</text>
          <text x={95} y={205} fill={SKY} fontSize="13" fontWeight="800">opp</text>
          <text x={312} y={326} fill={EMERALD} fontSize="13" fontWeight="800">adj</text>
          <text x={330} y={180} fill={LABEL} fontSize="13" fontWeight="800">hyp</text>
          <Callout x={380} y={80} text="sin = opp/hyp" color={SKY} />
          <Callout x={380} y={106} text="cos = adj/hyp" color={EMERALD} />
          <Callout x={380} y={132} text="tan = opp/adj" color={VIOLET} />
        </g>
      );
    case "circle": {
      const cx = 320, cy = 200, r = 105;
      const ang = (-35 * Math.PI) / 180;
      const px = cx + r * Math.cos(ang);
      const py = cy + r * Math.sin(ang);
      return (
        <g>
          <circle cx={cx} cy={cy} r={r} fill={VIOLET} opacity="0.12" stroke={VIOLET} strokeWidth="3" style={{ filter: "drop-shadow(0 0 8px rgba(167,139,250,0.5))" }} />
          <circle cx={cx} cy={cy} r={4} fill={AMBER} />
          <line x1={cx} y1={cy} x2={px} y2={py} stroke={AMBER} strokeWidth="2.5" markerEnd="url(#arrA2)" />
          <Point x={px} y={py} color={EMERALD} label="on circle" lx={px + 10} ly={py - 8} />
          <text x={cx + 40} y={cy - 14} fill={AMBER} fontSize="13" fontWeight="800">r = 5</text>
          <Callout x={190} y={330} text="centre (2, −3)" color={AMBER} />
        </g>
      );
    }
    case "volume":
      // cylinder: diameter 130, height 190. cone: same base (diameter 130), height 190, apex top centre.
      return (
        <g>
          <rect x={110} y={110} width={130} height={190} fill={SKY} opacity="0.3" stroke={SKY} strokeWidth="2.5" />
          <ellipse cx={175} cy={110} rx={65} ry={16} fill={SKY} opacity="0.18" stroke={SKY} strokeWidth="2.5" />
          <ellipse cx={175} cy={300} rx={65} ry={16} fill="none" stroke={SKY} strokeWidth="2.5" />
          <text x={132} y={212} fill={LABEL} fontSize="13" fontWeight="800">cylinder</text>
          <polygon points="445,110 380,300 510,300" fill={VIOLET} opacity="0.22" stroke={VIOLET} strokeWidth="2.5" />
          <ellipse cx={445} cy={300} rx={65} ry={16} fill={VIOLET} opacity="0.12" stroke={VIOLET} strokeWidth="2.5" />
          <text x={408} y={212} fill={LABEL} fontSize="13" fontWeight="800">cone</text>
          <text x={150} y={96} fill={LABEL} fontSize="11" opacity="0.8">r, h</text>
          <Callout x={290} y={330} text="V cone = ⅓ V cylinder" color={AMBER} />
        </g>
      );
    case "distance": {
      const p = PLOTS.distance!;
      const [ax, ay] = P(p, 1, 1);
      const [bx, by] = P(p, 5, 5);
      return (
        <g>
          <line x1={ax} y1={ay} x2={bx} y2={by} stroke={VIOLET} strokeWidth="3" markerEnd="url(#arrV2)" style={{ filter: "drop-shadow(0 0 6px rgba(167,139,250,0.6))" }} />
          <line x1={ax} y1={ay} x2={bx} y2={ay} stroke={AMBER} strokeWidth="2" strokeDasharray="5 5" />
          <line x1={bx} y1={ay} x2={bx} y2={by} stroke={AMBER} strokeWidth="2" strokeDasharray="5 5" />
          <Point x={ax} y={ay} color={SKY} label="A (1, 1)" lx={ax - 66} ly={ay + 22} />
          <Point x={bx} y={by} color={EMERALD} label="B (5, 5)" lx={bx + 10} ly={by - 8} />
          <Callout x={ax + 60} y={ay + 26} text="run = 4" color={AMBER} />
          <Callout x={bx + 12} y={ay - 60} text="rise = 4" color={AMBER} />
          <Callout x={bx - 150} y={by + 44} text="distance = √32 ≈ 5.66" color={VIOLET} />
        </g>
      );
    }
    case "passage":
      return (
        <g>
          <rect x={60} y={110} width={150} height={110} rx={12} fill="rgba(255,255,255,0.05)" stroke={SKY} strokeWidth="2" />
          <text x={80} y={145} fill={LABEL} fontSize="13" fontWeight="800">Claim</text>
          <text x={80} y={165} fill={LABEL} fontSize="11">утверждение</text>
          <line x1={212} y1={165} x2={300} y2={165} stroke={SKY} strokeWidth="3" markerEnd="url(#arrS2)" />
          <rect x={304} y={110} width={150} height={110} rx={12} fill="rgba(255,255,255,0.05)" stroke={EMERALD} strokeWidth="2" />
          <text x={324} y={145} fill={LABEL} fontSize="13" fontWeight="800">Evidence</text>
          <text x={324} y={165} fill={LABEL} fontSize="11">доказательства</text>
          <line x1={456} y1={165} x2={540} y2={165} stroke={AMBER} strokeWidth="3" markerEnd="url(#arrA2)" />
          <rect x={544} y={110} width={80} height={110} rx={12} fill="rgba(255,255,255,0.05)" stroke={AMBER} strokeWidth="2" />
          <text x={554} y={145} fill={LABEL} fontSize="13" fontWeight="800">Answer</text>
          <text x={554} y={165} fill={LABEL} fontSize="11">ответ</text>
          <Callout x={190} y={280} text="evidence must match the claim" color={EMERALD} />
        </g>
      );
    default:
      return <g />;
  }
}

export default function TopicDiagram({ topicId, section, language, className }: { topicId: string; section: string; language: "en" | "ru"; className?: string }) {
  const kind = MAP[topicId] ?? (section === "english" ? "passage" : "line");
  const caption = CAPTIONS[kind][language];
  const title = language === "ru" ? "Наглядная схема" : "Visual diagram";
  const plot = PLOTS[kind];
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hover, setHover] = useState<Hover>(null);
  const [pinned, setPinned] = useState<Hover>(null);

  const updateFromClient = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg || !plot) return;
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const px = ((clientX - rect.left) / rect.width) * 640;
    const py = ((clientY - rect.top) / rect.height) * 360;
    let dx = (px - plot.ox) / plot.s;
    let dy = (plot.oy - py) / plot.s;
    if (plot.yDiv) dy = dy * plot.yDiv;
    setHover({ px, py, dx: Math.round(dx * 100) / 100, dy: Math.round(dy * 100) / 100 });
  };

  const onMove = (e: React.MouseEvent) => updateFromClient(e.clientX, e.clientY);
  const onTouch = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) updateFromClient(t.clientX, t.clientY);
  };
  const onClick = () => { if (hover) setPinned(hover); };

  const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

  return (
    <figure className={cn("animate-float-up overflow-hidden rounded-2xl border border-violet-400/25 bg-gradient-to-br from-[#12121a] to-card/80 backdrop-blur-xl", className)}>
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-200">
          <span className="animate-pulse-soft inline-block h-2 w-2 rounded-full bg-violet-400" />
          {title}
        </span>
        <span className="text-[11px] font-medium text-muted-foreground">
          {plot ? (language === "ru" ? "Курсор — координаты · клик — закрепить точку" : "Hover reads coordinates · click pins a point") : (language === "ru" ? "Смотри на стрелки" : "Follow the arrows")}
        </span>
      </figcaption>
      <div className="relative p-3 sm:p-4">
        <svg
          ref={svgRef}
          viewBox="0 0 640 360"
          className="w-full cursor-crosshair rounded-xl bg-[#0d0d12]"
          style={{ aspectRatio: "640 / 360" }}
          role="img"
          aria-label={title}
          onMouseMove={onMove}
          onMouseLeave={() => setHover(null)}
          onTouchMove={onTouch}
          onTouchEnd={() => setHover(null)}
          onClick={onClick}
        >
          {plot ? <Axes plot={plot} /> : <SchematicAxes />}
          <Diagram kind={kind} />
          {plot ? (
            <g pointerEvents="none">
              <rect x={20} y={18} width={170} height={28} rx={8} fill="rgba(10,10,15,0.88)" stroke={AMBER} strokeOpacity="0.55" />
              <text x={30} y={36} fill={LABEL} fontSize="12" fontWeight="800" fontFamily="monospace">
                {hover ? `(${fmt(hover.dx)}, ${fmt(hover.dy)})` : (language === "ru" ? "— двигайте курсор" : "— hover the graph")}
              </text>
            </g>
          ) : null}
          {pinned && plot ? (
            <g pointerEvents="none">
              <circle cx={pinned.px} cy={pinned.py} r={9} fill="none" stroke={ROSE} strokeWidth="2" />
              <circle cx={pinned.px} cy={pinned.py} r={4} fill={ROSE} stroke="#0a0a0f" strokeWidth="1.5" />
              <line x1={pinned.px - 14} y1={pinned.py} x2={pinned.px + 14} y2={pinned.py} stroke={ROSE} strokeWidth="1.5" />
              <line x1={pinned.px} y1={pinned.py - 14} x2={pinned.px} y2={pinned.py + 14} stroke={ROSE} strokeWidth="1.5" />
              <g>
                <rect x={Math.min(pinned.px + 12, 520)} y={Math.max(52, pinned.py - 34)} width={118} height={26} rx={8} fill="rgba(10,10,15,0.92)" stroke={ROSE} strokeOpacity="0.7" />
                <text x={Math.min(pinned.px + 22, 530)} y={Math.max(52, pinned.py - 34) + 18} fill={LABEL} fontSize="12" fontWeight="800" fontFamily="monospace">
                  {`(${fmt(pinned.dx)}, ${fmt(pinned.dy)})`}
                </text>
              </g>
            </g>
          ) : null}
          {hover && plot ? (
            <g pointerEvents="none">
              <line x1={hover.px} y1={10} x2={hover.px} y2={350} stroke={AMBER} strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
              <line x1={20} y1={hover.py} x2={630} y2={hover.py} stroke={AMBER} strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
              <circle cx={hover.px} cy={hover.py} r={5} fill={AMBER} stroke="#0a0a0f" strokeWidth="1.5" />
              <g>
                <rect
                  x={Math.min(hover.px + 12, 520)}
                  y={Math.max(14, hover.py - 34)}
                  width={118}
                  height={26}
                  rx={8}
                  fill="rgba(10,10,15,0.92)"
                  stroke={AMBER}
                  strokeOpacity="0.6"
                />
                <text x={Math.min(hover.px + 22, 530)} y={Math.max(14, hover.py - 34) + 18} fill={LABEL} fontSize="12" fontWeight="800" fontFamily="monospace">
                  {`(${fmt(hover.dx)}, ${fmt(hover.dy)})`}
                </text>
              </g>
            </g>
          ) : null}
        </svg>
        <p className="mt-3 px-1 text-sm leading-relaxed text-muted-foreground">{caption}</p>
        {pinned && plot ? (
          <p className="mt-1 px-1 font-mono text-xs text-rose-200">
            {language === "ru" ? `Закреплено: x = ${fmt(pinned.dx)} · y = ${fmt(pinned.dy)}` : `Pinned: x = ${fmt(pinned.dx)} · y = ${fmt(pinned.dy)}`}
          </p>
        ) : hover && plot ? (
          <p className="mt-1 px-1 font-mono text-xs text-amber-200">
            {`x = ${fmt(hover.dx)} · y = ${fmt(hover.dy)}`}
          </p>
        ) : null}
      </div>
    </figure>
  );
}
