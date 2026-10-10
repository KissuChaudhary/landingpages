"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Calendar, Radio, Target } from "lucide-react";
import { site } from "@/site.config";
import { useMotion, useScrollProgress } from "../Motion";
import { Title } from "../ui/Primitives";

// The six weeks as an arrangement: every week adds a lane to the same song, so each clip
// starts in its week and runs to the end. On wide screens the section pins and scrolling
// moves the playhead, recording clips as it passes. On phones and with reduced motion,
// the week buttons choose what's shown.
export function Weeks() {
  const { weeks } = site;
  const n = weeks.items.length;
  const { reduced } = useMotion();
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const pinnedRef = useRef(false);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 960px) and (min-height: 700px)");
    const sync = () => {
      const on = media.matches && !reduced;
      pinnedRef.current = on;
      setPinned(on);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [reduced]);

  const section = useScrollProgress<HTMLElement>(
    (p) => {
      if (!pinnedRef.current) return;
      stage.current?.style.setProperty("--p", p.toFixed(4));
      const w = Math.min(n - 1, Math.floor(p * n * 0.999));
      setActive((prev) => (prev === w ? prev : w));
    },
    (el, vh) => ({ start: 0, distance: Math.max(1, el.offsetHeight - vh) }),
  );

  // Without pinning, the playhead sits at the end of the chosen week.
  useEffect(() => {
    if (!pinned) stage.current?.style.setProperty("--p", String((active + 1) / n));
  }, [pinned, active, n]);

  const choose = (i: number) => {
    if (!pinned) return setActive(i);
    const el = section.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const distance = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / n) * distance, behavior: "smooth" });
  };

  const week = weeks.items[active];

  return (
    <section className={`weeks${pinned ? " is-pinned" : ""}`} id="weeks" ref={section} style={{ "--n": n } as CSSProperties}>
      <div className="weeks-sticky">
        <div className="container">
          <div className="section-head">
            <Title lines={weeks.heading} />
            <p className="section-intro" data-reveal="">
              {weeks.intro}
            </p>
          </div>

          <div className="arrange" ref={stage} data-reveal="" style={{ "--ry": "40px" } as CSSProperties}>
            <div className="arrange-ruler" role="tablist" aria-label="Weeks">
              <span className="arrange-corner" aria-hidden="true">
                Weeks
              </span>
              {weeks.items.map((w, i) => (
                <button
                  key={w.title}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-controls="week-panel"
                  className={`ruler-step c-${w.color}${i === active ? " is-active" : ""}${i < active ? " is-done" : ""}`}
                  onClick={() => choose(i)}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>

            <div className="arrange-lanes" aria-hidden="true">
              {weeks.items.map((w, i) => (
                <div key={w.title} className={`lane c-${w.color}`} style={{ "--s": i / n } as CSSProperties}>
                  <span className="lane-name">
                    <i />
                    {w.title}
                  </span>
                  <div className="lane-track">
                    <span className="clip-ghost" />
                    <span className="clip">
                      <span className="clip-label">
                        {w.title} <em>{w.subtitle}</em>
                      </span>
                      <span className="clip-notes" />
                    </span>
                  </div>
                </div>
              ))}
              <span className="playhead" />
            </div>
          </div>

          <div className={`week-panel c-${week.color}`} id="week-panel" role="tabpanel" key={active}>
            <div className="week-head">
              <span className="week-num">Week {String(active + 1).padStart(2, "0")}</span>
              <h3>{week.title}</h3>
              <p>{week.subtitle}</p>
            </div>
            <ol className="week-lessons">
              {week.lessons.map((lesson, i) => (
                <li key={lesson} style={{ "--i": i } as CSSProperties}>
                  {lesson}
                </li>
              ))}
            </ol>
            <dl className="week-facts">
              <div>
                <dt>
                  <Radio size={15} strokeWidth={2.2} aria-hidden="true" /> Live session
                </dt>
                <dd>{week.live}</dd>
              </div>
              <div>
                <dt>
                  <Target size={15} strokeWidth={2.2} aria-hidden="true" /> You'll finish
                </dt>
                <dd>{week.assignment}</dd>
              </div>
              <div>
                <dt>
                  <Calendar size={15} strokeWidth={2.2} aria-hidden="true" /> Lessons
                </dt>
                <dd>{week.lessons.length} short videos</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
