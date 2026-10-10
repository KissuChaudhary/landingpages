"use client";

import { useState } from "react";
import { site } from "@/site.config";
import { useScrollProgress, type Range } from "@/components/Motion";
import { ProcessGlyph } from "@/components/ui/Icons";

// The run of show: ten weeks on one bar. A playhead travels along it as the section
// scrolls past; the step it is in lights up below and opens its details. On phones the
// steps stack beneath the bar; details fade in without moving the card edges.

const range: Range = (el, vh) => ({ start: vh * 0.72, distance: el.offsetHeight + vh * 0.24 });

export function Process() {
  const { process } = site;
  const [at, setAt] = useState(0);
  const total = process.weeks;
  const ref = useScrollProgress<HTMLDivElement>((p, el) => {
    el.style.setProperty("--p", p.toFixed(4));
    setAt(p * total);
  }, range);
  // The step the playhead is in. A single-week step (the show day) owns the week around its marker.
  const mark = process.steps.findIndex((s) => s.span[0] === s.span[1] && Math.abs(at - s.span[0]) < 0.6);
  const active = mark >= 0 ? mark : process.steps.findIndex((s) => s.span[0] !== s.span[1] && at >= s.span[0] && at < s.span[1]);
  const current = active < 0 ? (at >= total ? process.steps.length - 1 : 0) : active;

  return (
    <section id="process" className="section process" aria-labelledby="process-title">
      <div className="container">
        <div className="section-head split">
          <div className="process-titles">
            <span className="tag" data-reveal>
              {process.label}
            </span>
            <h2 id="process-title" className="h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
              {process.title}
            </h2>
          </div>
          <p className="lead process-intro" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            {process.intro}
          </p>
        </div>

        <div ref={ref} className="ros" style={{ "--weeks": total } as React.CSSProperties}>
          <div className="ros-scale" aria-hidden="true">
            {Array.from({ length: total }, (_, w) => (
              <span key={w} className={Math.floor(at) === w ? "is-now" : ""}>
                W{w + 1}
              </span>
            ))}
          </div>
          <div className="ros-bar" aria-hidden="true">
            {process.steps.map((s, i) =>
              s.span[0] === s.span[1] ? (
                <span key={s.title} className={`ros-mark ${i === current ? "is-on" : ""}`} data-accent={s.accent} style={{ "--at": s.span[0] } as React.CSSProperties}>
                  <ProcessGlyph name={s.icon} size={16} />
                </span>
              ) : (
                <span key={s.title} className={`ros-seg ${i === current ? "is-on" : ""}`} data-accent={s.accent} style={{ "--a": s.span[0], "--b": s.span[1] } as React.CSSProperties}>
                  <span className="ros-seg-fill" />
                </span>
              ),
            )}
            <span className="ros-head" />
          </div>
          <ol className="ros-steps" data-reveal="fade">
            {process.steps.map((s, i) => (
              <li key={s.title} className="ros-step" data-on={i === current} data-past={i < current} data-accent={s.accent}>
                <div className="ros-step-top">
                  <span className="ros-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ros-when">{s.when}</span>
                  <span className="ros-glyph">
                    <ProcessGlyph name={s.icon} size={24} />
                  </span>
                </div>
                <h3 className="h3 ros-title">{s.title}</h3>
                <p className="ros-text">{s.body}</p>
                <ul className="ros-details">
                  {s.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
