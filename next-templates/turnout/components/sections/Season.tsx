"use client";

import { useEffect, useRef } from "react";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { pinned, useMotion, useScrollProgress, type Range } from "@/components/Motion";
import { StatRoll } from "@/components/ui/NumberRoll";
import { Action, planHref } from "@/components/ui/Action";

// One night, then the season it turns into. The mission statement lights up word by word,
// then the page pins and the season slides past sideways: doors open, the 48-hour edit,
// the creator posts, the ritual and the report. A line along the top fills as it goes.
// On phones (and with reduced motion) the season is a row you can swipe.

const statementRange: Range = (el, vh) => ({ start: vh * 0.85, distance: el.offsetHeight + vh * 0.35 });

function Statement({ text }: { text: string }) {
  const words = text.split(" ");
  const ref = useScrollProgress<HTMLParagraphElement>((p, el) => el.style.setProperty("--p", p.toFixed(4)), statementRange);
  return (
    <p ref={ref} className="h2 statement">
      {words.map((word, i) => (
        <span key={i} className="statement-word" style={{ "--w": (i / words.length).toFixed(3) } as React.CSSProperties}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

export function Season() {
  const { season } = site;
  const { reduced } = useMotion();
  const track = useRef<HTMLOListElement>(null);
  const travel = useRef(0);

  // The pinned stretch is exactly as tall as the track is wider than the screen.
  const pin = useScrollProgress<HTMLDivElement>((p, el) => {
    el.style.setProperty("--x", `${(-p * travel.current).toFixed(1)}px`);
    el.style.setProperty("--fill", p.toFixed(4));
  }, pinned);

  useEffect(() => {
    const el = pin.current;
    const list = track.current;
    if (!el || !list) return;
    const measure = () => {
      const wide = window.matchMedia("(min-width: 861px)").matches && !reduced;
      travel.current = wide ? Math.max(0, list.scrollWidth - window.innerWidth) : 0;
      el.style.height = wide ? `${travel.current + window.innerHeight}px` : "";
      window.dispatchEvent(new Event("scroll"));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pin, reduced]);

  return (
    <section className="season" aria-labelledby="season-label">
      <div className="container season-intro">
        <span id="season-label" className="tag" data-reveal>
          {season.label}
        </span>
        <Statement text={season.statement} />
      </div>

      <div ref={pin} className="season-pin">
        <div className="season-sticky">
          <div className="season-rail" aria-hidden="true">
            <span className="season-rail-fill" />
          </div>
          <ol ref={track} className="season-track">
            {season.steps.map((step, i) => (
              <li key={step.when} className={`season-step is-${step.shape}`} data-accent={step.accent} style={{ "--i": i } as React.CSSProperties}>
                <span className="season-when">
                  <span className="season-dot" aria-hidden="true" />
                  {step.when}
                </span>
                {step.image ? (
                  <figure className="season-media">
                    <img src={asset(step.image)} alt={step.alt} width={720} height={720} loading="lazy" />
                    {step.stat ? (
                      <figcaption className="season-stat">
                        <span className="season-figure">
                          <StatRoll value={step.stat.value} decimals={step.stat.value % 1 ? 1 : 0} suffix={step.stat.suffix} />
                        </span>
                        <span className="season-stat-label">{step.stat.label}</span>
                      </figcaption>
                    ) : null}
                  </figure>
                ) : null}
                <div className="season-copy">
                  <h3 className="h3 season-title">{step.title}</h3>
                  <p className="season-body">{step.body}</p>
                  {step.cta ? <Action to={planHref()} label={site.cta} /> : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
