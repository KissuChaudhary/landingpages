"use client";

import { useState } from "react";
import { site } from "@/site.config";
import { getWork, type Work as WorkItem } from "@/data/work";
import { asset } from "@/lib/urls";
import { useInView, useMotion } from "@/components/Motion";
import { NumberRoll } from "@/components/ui/NumberRoll";
import { TextMorph } from "@/components/ui/TextMorph";
import { Action } from "@/components/ui/Action";

// Case studies, one card. Choosing a client (or waiting) changes the card in place: its
// colour eases to the next, the photo wipes across, the title morphs and the results roll
// to their new figures. A thin bar under the chosen client shows when the next one is due;
// it stops for good once someone chooses for themselves.

export function Spotlight() {
  const { spotlight } = site;
  const items = spotlight.featured.map(getWork).filter(Boolean) as WorkItem[];
  const { reduced } = useMotion();
  const [active, setActive] = useState(0);
  const [chosen, setChosen] = useState(false);
  const [held, setHeld] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>({ once: false, threshold: 0.35 });
  const item = items[active];
  const running = !reduced && !chosen && !held && inView;
  const next = () => setActive((a) => (a + 1) % items.length);
  if (!item) return null;

  return (
    <section className="section spotlight" aria-labelledby="spotlight-title">
      <div className="container">
        <div className="section-head split">
          <div className="services-titles">
            <span className="tag" data-reveal>
              {spotlight.label}
            </span>
            <h2 id="spotlight-title" className="h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
              {spotlight.title}
            </h2>
          </div>
          <p className="lead services-intro" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            {spotlight.intro}
          </p>
        </div>

        <div ref={ref} className="showcase" data-running={running} onMouseEnter={() => setHeld(true)} onMouseLeave={() => setHeld(false)} data-reveal>
          <div className="showcase-index" role="tablist" aria-label={spotlight.title} aria-orientation="vertical">
            {items.map((w, i) => (
              <button
                key={w.slug}
                type="button"
                role="tab"
                id={`spotlight-tab-${w.slug}`}
                aria-selected={i === active}
                aria-controls="spotlight-panel"
                className="showcase-tab"
                data-accent={w.accent}
                tabIndex={i === active ? 0 : -1}
                onClick={() => {
                  setActive(i);
                  setChosen(true);
                }}
                onKeyDown={(e) => {
                  const n = items.length;
                  const to = e.key === "ArrowDown" ? (i + 1) % n : e.key === "ArrowUp" ? (i - 1 + n) % n : -1;
                  if (to < 0) return;
                  e.preventDefault();
                  setActive(to);
                  setChosen(true);
                  document.getElementById(`spotlight-tab-${items[to].slug}`)?.focus();
                }}
              >
                <span className="showcase-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="showcase-name">
                  {w.client}
                  <span className="showcase-kind">{w.kind}</span>
                </span>
                <span className="showcase-swatch" aria-hidden="true" />
                {i === active ? (
                  <span className="showcase-timer" aria-hidden="true">
                    <span key={active} onAnimationEnd={() => running && next()} />
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          <div className="showcase-card" data-accent={item.accent} id="spotlight-panel" role="tabpanel" aria-labelledby={`spotlight-tab-${item.slug}`}>
            <figure className="showcase-media">
              {items.map((w, i) => (
                <img key={w.slug} src={asset(w.image)} alt={i === active ? w.alt : ""} aria-hidden={i !== active} className={i === active ? "is-on" : ""} width={816} height={816} loading="lazy" />
              ))}
              <span className="showcase-metric">
                <TextMorph>{item.metric}</TextMorph>
              </span>
            </figure>
            <div className="showcase-copy">
              <h3 className="h2 showcase-title">
                <TextMorph animateWidth={false}>{item.title}</TextMorph>
              </h3>
              <p className="lead showcase-text" key={`t-${active}`}>
                {item.summary}
              </p>
              <dl className="showcase-results">
                {item.results.slice(0, 3).map((r, i) => (
                  <div key={i} className="showcase-result">
                    <dt className="sr-only">{r.label}</dt>
                    <dd className="showcase-result-figure">
                      <NumberRoll value={r.value} prefix={r.prefix} suffix={r.suffix} format={r.decimals ? { minimumFractionDigits: r.decimals, maximumFractionDigits: r.decimals } : undefined} />
                    </dd>
                    <dd className="showcase-result-label" key={`${active}-${i}`}>
                      {r.label}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="showcase-foot">
                <Action to={`/work/${item.slug}`} label={spotlight.read} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
