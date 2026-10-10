"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/site.config";
import { pinned, span, useScrollProgress } from "@/components/Motion";
import { TextMorph } from "@/components/ui/TextMorph";
import { Check, Cross } from "@/components/ui/Icons";

// A week of attention, drawn as you scroll. The page turns dark, a typical launch spikes
// on the night and is gone by Monday, and the usual problems pin themselves to the curve
// where they happen. Then our line draws over it, keeps posting through Friday and crosses
// each problem out as it passes. The headline turns into the answer and the page turns
// light again. Under reduced motion both lines are drawn and the list is crossed out.

const W = 1200;
const H = 460;
const BASE = 372;
const days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const dayX = (i: number) => 70 + i * 132.5;

// Attention after a typical launch: up on the night, gone by Monday.
const typical = `M20 ${BASE - 8} C60 ${BASE - 12} 92 300 112 160 S140 66 158 74 S190 170 218 222 S300 300 338 322 S420 352 480 362 S560 ${BASE - 2} 600 ${BASE} L1180 ${BASE}`;
// Ours: a waitlist before, a bigger night, then the season keeps it up.
const ours = `M20 ${BASE - 30} C60 ${BASE - 70} 90 240 116 110 S142 30 160 38 S196 130 222 120 S262 70 296 96 S352 160 392 128 S452 92 494 118 S560 170 604 140 S668 100 716 122 S790 170 842 132 S912 104 960 126 S1036 160 1084 120 S1150 104 1180 112`;

// Where each problem pins to the typical curve (x in the 1200-wide chart) and which way its note opens.
const pins = [
  { x: 72, up: true },
  { x: 150, up: false },
  { x: 248, up: true },
  { x: 380, up: true },
  { x: 560, up: true },
];

/** The length along `path` (0..1) at which it first reaches `x`. */
function fractionAtX(path: SVGPathElement, x: number) {
  const total = path.getTotalLength();
  for (let i = 0; i <= 240; i++) {
    const at = (i / 240) * total;
    if (path.getPointAtLength(at).x >= x) return at / total;
  }
  return 1;
}

export function Problem() {
  const { problem } = site;
  const [dark, setDark] = useState(false);
  const [shown, setShown] = useState(0);
  const [crossed, setCrossed] = useState(0);
  const [answered, setAnswered] = useState(false);
  const typicalPath = useRef<SVGPathElement>(null);
  const oursPath = useRef<SVGPathElement>(null);
  const marks = useRef<{ typical: number[]; ours: number[] }>({ typical: pins.map((p) => p.x / W), ours: pins.map((p) => p.x / W) });
  const [points, setPoints] = useState<number[]>(pins.map(() => BASE));

  useEffect(() => {
    const a = typicalPath.current;
    const b = oursPath.current;
    if (!a || !b) return;
    marks.current = { typical: pins.map((p) => fractionAtX(a, p.x)), ours: pins.map((p) => fractionAtX(b, p.x)) };
    setPoints(marks.current.typical.map((f) => a.getPointAtLength(f * a.getTotalLength()).y));
  }, []);

  const ref = useScrollProgress<HTMLElement>((p, el) => {
    setDark(p > 0.015);
    const drawA = span(p, 0.05, 0.42);
    const drawB = span(p, 0.5, 0.86);
    el.style.setProperty("--draw-a", (1 - drawA).toFixed(4));
    el.style.setProperty("--draw-b", (1 - drawB).toFixed(4));
    setShown(marks.current.typical.filter((f) => drawA >= f - 0.01).length);
    setCrossed(marks.current.ours.filter((f) => drawB >= f).length);
    setAnswered(p > 0.86);
  }, pinned);

  return (
    <section ref={ref} className={`problem ${dark ? "is-dark" : ""} ${answered ? "is-answered" : ""}`} aria-labelledby="problem-title">
      <div className="problem-sticky container">
        <div className="problem-head">
          <h2 id="problem-title" className="h1 problem-title" data-static={problem.title}>
            <TextMorph animateWidth={false} duration={620}>
              {answered ? problem.answer : problem.title}
            </TextMorph>
          </h2>
          <ul className="problem-legend" aria-hidden="true">
            <li className={shown > 0 ? "is-on" : ""}>
              <span className="legend-line is-typical" />
              {problem.legend.typical}
            </li>
            <li className={crossed > 0 ? "is-on" : ""}>
              <span className="legend-line is-ours" />
              With {site.brand}
            </li>
          </ul>
        </div>

        <div className="chart">
          <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
            {days.map((d, i) => (
              <line key={i} className="chart-day" x1={dayX(i)} x2={dayX(i)} y1={20} y2={BASE} />
            ))}
            <line className="chart-base" x1={0} x2={W} y1={BASE} y2={BASE} />
            <path ref={typicalPath} className="chart-line is-typical" d={typical} pathLength={1} />
            <path ref={oursPath} className="chart-line is-ours" d={ours} pathLength={1} />
            {days.map((d, i) => (
              <text key={i} className={`chart-label ${i === 0 ? "is-launch" : i === 4 ? "is-monday" : ""}`} x={dayX(i)} y={BASE + 34}>
                {d}
              </text>
            ))}
            <text className="chart-sub" x={dayX(0)} y={BASE + 58}>
              {problem.legend.launch}
            </text>
          </svg>
          <ul className="chart-pins">
            {problem.pains.map((pain, i) => (
              <li
                key={pain}
                className={`pin ${pins[i].up ? "is-up" : "is-down"} ${i < shown ? "is-shown" : ""} ${i < crossed ? "is-crossed" : ""}`}
                style={{ left: `${(pins[i].x / W) * 100}%`, top: `${(points[i] / H) * 100}%`, "--i": i } as React.CSSProperties}
              >
                <span className="pin-dot" aria-hidden="true" />
                <span className="pin-card">
                  <span className="pin-icon" aria-hidden="true">
                    <span className="swap">
                      <Cross data-on={i >= crossed} size={12} />
                      <Check data-on={i < crossed} size={12} />
                    </span>
                  </span>
                  <span className="pin-text">{pain}</span>
                </span>
              </li>
            ))}
          </ul>
          <span className="chart-end" aria-hidden="true">
            {problem.legend.end}
          </span>
        </div>
        <p className="h2 problem-answer">{problem.answer}</p>
      </div>
    </section>
  );
}
