"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/site.config";
import { getWork } from "@/data/work";
import { asset } from "@/lib/urls";
import { useInView, useMotion } from "@/components/Motion";
import { Ribbon } from "@/components/ui/Ribbon";
import { TextMorph } from "@/components/ui/TextMorph";
import { Action, ArrowDot, SmartLink, planHref } from "@/components/ui/Action";
import { ArrowUpRight, Spark } from "@/components/ui/Icons";

type Moment = (typeof site.hero.moments)[number];

/** One headline line, with the configured word wrapped in the lime marker. */
function Line({ text, highlight, index }: { text: string; highlight: string; index: number }) {
  const at = highlight ? text.indexOf(highlight) : -1;
  return (
    <span className="line" style={{ "--i": index } as React.CSSProperties}>
      <span>
        {at < 0 ? (
          text
        ) : (
          <>
            {text.slice(0, at)}
            <span className="hl">{highlight}</span>
            {text.slice(at + highlight.length)}
          </>
        )}
      </span>
    </span>
  );
}

/**
 * The photo deck. The front card shuffles to the back on a timer that is a CSS animation
 * (so pausing it is just animation-play-state), on tap, on swipe or with the arrow button.
 * Hovering, focusing or scrolling the deck out of view holds it.
 */
function Deck({ moments }: { moments: Moment[] }) {
  const { reduced } = useMotion();
  const [front, setFront] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [held, setHeld] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>({ once: false, threshold: 0.2 });
  const swipe = useRef<number | null>(null);
  const n = moments.length;

  const next = () => {
    setLeaving(front);
    setFront((f) => (f + 1) % n);
  };

  const running = !reduced && !held && inView;

  return (
    <div
      ref={ref}
      className={`deck ${running ? "is-running" : ""}`}
      role="group"
      aria-roledescription="carousel"
      aria-label="Moments from recent events"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <div
        className="deck-stack"
        onPointerDown={(e) => (swipe.current = e.clientX)}
        onPointerUp={(e) => {
          if (swipe.current !== null && Math.abs(e.clientX - swipe.current) > 36) next();
          swipe.current = null;
        }}
      >
        {moments.map((m, i) => {
          const slot = (i - front + n) % n;
          return (
            <figure
              key={m.image}
              className={`deck-card ${leaving === i ? "is-leaving" : ""}`}
              data-slot={Math.min(slot, 2)}
              aria-hidden={slot !== 0}
              onAnimationEnd={(e) => e.target === e.currentTarget && setLeaving((l) => (l === i ? null : l))}
            >
              <img src={asset(m.image)} alt={m.alt} width={608} height={1088} loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} draggable={false} />
            </figure>
          );
        })}
      </div>
      <div className="deck-bar">
        <span className="deck-caption">
          <TextMorph>{moments[front].caption}</TextMorph>
          <span className="deck-progress" aria-hidden="true">
            <span key={front} className="deck-progress-fill" onAnimationEnd={() => running && next()} />
          </span>
        </span>
        <button type="button" className="deck-button" onClick={next} aria-label="Next moment">
          <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
}

export function Hero() {
  const { hero } = site;
  const latest = getWork(hero.latest.work);
  const [ready, setReady] = useState(false);

  // One frame after mount, so the hidden start state is painted before the intro plays.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className={`hero ${ready ? "is-in" : ""}`} aria-labelledby="hero-title">
      <div className="hero-grid container">
        <div className="hero-copy">
          <h1 id="hero-title" className={`display hero-title lines ${ready ? "is-in" : ""}`}>
            {hero.title.map((line, i) => (
              <span key={line}>
                <Line text={line} highlight={hero.highlight} index={i} />
                {i < hero.title.length - 1 ? " " : null}
              </span>
            ))}
          </h1>
          <ul className="hero-services">
            {hero.services.map((service, i) => (
              <li key={service} style={{ "--i": i } as React.CSSProperties}>
                <Spark size={13} />
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-deck">
          <div className="hero-ribbon">
            <Ribbon words={hero.ribbon} className="ribbon-wide" />
            <Ribbon words={hero.ribbon} className="ribbon-narrow" d="M0 610C400 650 700 570 900 485S1250 330 1450 300S1900 250 2200 190" />
          </div>
          <Deck moments={hero.moments} />
        </div>

        <div className="hero-side">
          {latest ? (
            <SmartLink to={`/work/${latest.slug}`} className="latest">
              <span className="latest-thumb">
                <img src={asset(latest.image)} alt="" width={160} height={160} />
              </span>
              <span className="latest-copy">
                <span className="latest-label">{hero.latest.label}</span>
                <span className="latest-title">{latest.title}</span>
              </span>
              <ArrowDot tone="light" size={30} />
            </SmartLink>
          ) : null}
          <div className="hero-pitch">
            <p className="lead">{hero.description}</p>
            <Action to={planHref()} label={site.cta} size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
