"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { useInView, useMotion } from "@/components/Motion";
import { TileWords } from "@/components/ui/TileWords";
import { TextMorph } from "@/components/ui/TextMorph";
import { ArrowLeft, ArrowRight, Pause, Play } from "@/components/ui/Icons";

// A row of cards that advances on its own while it's on screen. The active dot fills as
// its timer; hovering or focusing the row holds it, and the pause button stops it. Swipe,
// drag, the arrows or the arrow keys move it by hand.

const DURATION = 6000;

export function Extras() {
  const { extras } = site;
  const { reduced } = useMotion();
  const [sectionRef, inView] = useInView<HTMLElement>({ once: false, threshold: 0.35 });
  const track = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const running = inView && !paused && !held && !reduced;
  const count = extras.cards.length;

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      const card = cards.current[(i + count) % count];
      if (!el || !card) return;
      el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: reduced ? "auto" : "smooth" });
    },
    [count, reduced],
  );

  // The card nearest the middle is the active one.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const mid = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let dist = Infinity;
        cards.current.forEach((c, i) => {
          if (!c) return;
          const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
          if (d < dist) {
            dist = d;
            best = i;
          }
        });
        setIndex(best);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Mouse drag (touch and trackpads scroll natively).
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
    track.current.dataset.dragging = "true";
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const el = track.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    el.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const el = track.current;
    if (!drag.current || !el) return;
    const moved = drag.current.moved;
    drag.current = null;
    delete el.dataset.dragging;
    if (moved) go(index);
  };

  return (
    <section className="section extras" ref={sectionRef} aria-labelledby="extras-title" aria-roledescription="carousel">
      <div className="container">
        <div className="head">
          <TileWords id="extras-title" text={extras.title} className="h2" tone="ink" />
          <p className="lead" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
            {extras.description}
          </p>
        </div>
      </div>
      <div
        className="x-track"
        ref={track}
        tabIndex={0}
        aria-label={`${extras.cards.length} things that come built in`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(index + 1);
          if (e.key === "ArrowLeft") go(index - 1);
        }}
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => {
          setHeld(false);
          endDrag();
        }}
        onFocus={() => setHeld(true)}
        onBlur={() => setHeld(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
      >
        {extras.cards.map((card, i) => (
          <article
            key={card.title}
            className="x-card"
            data-active={index === i}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}: ${card.title}`}
            ref={(el) => {
              cards.current[i] = el;
            }}
          >
            <div className="x-copy">
              <span className={`x-label ${card.label === "Plus" ? "is-plus" : ""}`}>{card.label}</span>
              <h3 className="h3">{card.title}</h3>
              <p className="body">{card.body}</p>
            </div>
            <figure className="x-pic">
              <img src={asset(card.image)} alt={card.alt} loading="lazy" decoding="async" draggable={false} />
            </figure>
          </article>
        ))}
      </div>
      <div className="container x-controls">
        <button type="button" className="x-arrow" aria-label="Previous" onClick={() => go(index - 1)}>
          <ArrowLeft />
        </button>
        <div className="x-dots" style={{ "--dur": `${DURATION}ms` } as CSSProperties}>
          {extras.cards.map((card, i) => (
            <button key={card.title} type="button" className="x-dot" data-active={index === i} aria-label={`Show ${card.title}`} aria-current={index === i} onClick={() => go(i)}>
              {index === i && (
                <span
                  key={i}
                  className="x-fill"
                  data-running={running}
                  onAnimationEnd={() => go(i + 1)}
                />
              )}
            </button>
          ))}
        </div>
        <button type="button" className="x-pause" onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
          <span className="swap" aria-hidden="true">
            <span data-on={!paused}>
              <Pause size={12} />
            </span>
            <span data-on={paused}>
              <Play size={12} />
            </span>
          </span>
          <TextMorph>{paused ? "Play" : "Pause"}</TextMorph>
        </button>
        <button type="button" className="x-arrow" aria-label="Next" onClick={() => go(index + 1)}>
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}
