"use client";

import { useRef, useState } from "react";
import { site } from "@/site.config";
import { pinned, span, useScrollProgress } from "@/components/Motion";
import { TextMorph } from "@/components/ui/TextMorph";
import { Check, Cross } from "@/components/ui/Icons";

// The headline holds still while the page turns dark and the usual problems drift up past
// it. Each one is crossed out as it passes the middle; when they're all gone the headline
// turns into the answer and the page turns light again. Under reduced motion it's a plain
// list.

// Where each card sits across the screen (percent of width, from the centre), how fast it
// travels and when it starts, as a share of the section's scroll.
const lanes = [
  { x: -28, speed: 0.34, start: 0.02, tilt: -3 },
  { x: 24, speed: 0.3, start: 0.13, tilt: 2.5 },
  { x: -6, speed: 0.36, start: 0.25, tilt: -1.5 },
  { x: -30, speed: 0.31, start: 0.38, tilt: 3 },
  { x: 22, speed: 0.33, start: 0.5, tilt: -2.5 },
];

export function Problem() {
  const { problem } = site;
  const [dark, setDark] = useState(false);
  const [crossed, setCrossed] = useState(0);
  const [answered, setAnswered] = useState(false);
  const cards = useRef<(HTMLLIElement | null)[]>([]);

  const ref = useScrollProgress<HTMLElement>((p) => {
    setDark(p > 0.015 && p < 0.9);
    setAnswered(p > 0.83);
    let passed = 0;
    lanes.forEach((lane, i) => {
      const el = cards.current[i];
      const t = span(p, lane.start, lane.start + lane.speed);
      if (t > 0.5) passed++;
      if (!el) return;
      // From below the screen to above it, turning a little as it rises.
      el.style.transform = `translate(calc(-50% + ${lane.x}vw), calc(-50% + ${((0.5 - t) * 150).toFixed(2)}vh)) rotate(${(lane.tilt * (1 - t)).toFixed(2)}deg)`;
    });
    setCrossed(passed);
  }, pinned);

  return (
    <section ref={ref} className={`problem ${dark ? "is-dark" : ""}`} aria-labelledby="problem-title">
      <div className="problem-sticky">
        <h2 id="problem-title" className="h1 problem-title" data-static={problem.title}>
          <TextMorph animateWidth={false} duration={620}>
            {answered ? problem.answer : problem.title}
          </TextMorph>
        </h2>
        <ul className="problem-cards">
          {problem.pains.map((pain, i) => (
            <li
              key={pain}
              ref={(el) => {
                cards.current[i] = el;
              }}
              className={`pain ${i < crossed ? "is-crossed" : ""}`}
            >
              <span className="pain-icon" aria-hidden="true">
                <span className="swap">
                  <Cross data-on={i >= crossed} size={14} />
                  <Check data-on={i < crossed} size={14} />
                </span>
              </span>
              <span className="pain-text">{pain}</span>
            </li>
          ))}
        </ul>
        <p className="h2 problem-answer">{problem.answer}</p>
      </div>
    </section>
  );
}
