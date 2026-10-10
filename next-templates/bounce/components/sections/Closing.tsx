"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { site, enrollHref } from "@/site.config";
import { useInView } from "../Motion";
import { ButtonLink, NumberRoll } from "../ui/Primitives";

// The closing panel: the wordmark bounces in letter by letter, and a countdown to the
// next cohort ticks over every minute. When the date has passed, the countdown hides.
function useCountdown(target: string) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setLeft(new Date(target).getTime() - Date.now());
    tick();
    const t = window.setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, [target]);
  if (left === null || left <= 0) return null;
  const mins = Math.floor(left / 60_000);
  return { days: Math.floor(mins / 1440), hours: Math.floor((mins % 1440) / 60), minutes: mins % 60 };
}

export function Closing() {
  const { closing, cohort, brand } = site;
  const countdown = useCountdown(cohort.start);
  const [panel, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const word = useRef<HTMLParagraphElement>(null);

  // Size the wordmark to span the panel, whatever the brand name.
  useEffect(() => {
    const el = word.current;
    const box = el?.parentElement;
    if (!el || !box) return;
    const fit = () => {
      el.style.fontSize = "";
      const pad = parseFloat(getComputedStyle(box).paddingLeft) + parseFloat(getComputedStyle(box).paddingRight);
      const base = parseFloat(getComputedStyle(el).fontSize);
      el.style.fontSize = `${Math.min(440, (base * (box.clientWidth - pad)) / el.offsetWidth)}px`;
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    document.fonts?.ready.then(fit);
    return () => observer.disconnect();
  }, []);
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="container">
        <div className={`closing-panel${inView ? " is-in" : ""}`} ref={panel}>
          <p className="closing-word" aria-hidden="true" ref={word}>
            {Array.from(brand.toLowerCase()).map((c, i) => (
              <span key={i} style={{ "--i": i } as CSSProperties}>
                {c}
              </span>
            ))}
          </p>
          <div className="closing-body">
            <div>
              <h2 id="closing-title">{closing.heading}</h2>
              <p>{closing.text}</p>
              <ButtonLink to={enrollHref()} label={closing.cta} variant="white" />
            </div>
            {countdown && (
              <div className="countdown" role="timer" aria-label={`${cohort.name} starts in ${countdown.days} days, ${countdown.hours} hours and ${countdown.minutes} minutes`}>
                {(
                  [
                    ["days", countdown.days],
                    ["hours", countdown.hours],
                    ["min", countdown.minutes],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} aria-hidden="true">
                    <NumberRoll value={String(value).padStart(2, "0")} play={inView} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
