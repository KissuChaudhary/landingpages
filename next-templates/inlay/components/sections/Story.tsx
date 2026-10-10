"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { TileWords } from "@/components/ui/TileWords";
import { Check } from "@/components/ui/Icons";

// Four short chapters beside one picture that stays put. As each chapter reaches the middle
// of the screen, its picture rises into the panel like a tile dropping into place, the
// panel takes the chapter's colour and its checks draw in. On phones the pictures sit
// inline above each chapter.

export function Story() {
  const { chapters } = site.story;
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState(0);
  const items = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = items.current.indexOf(entry.target as HTMLElement);
          if (index < 0) return;
          setActive(index);
          setSeen((s) => Math.max(s, index));
        }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section story" aria-label="Getting paid on Inlay">
      <div className="container story-grid">
        <div className="story-list">
          {chapters.map((c, i) => (
            <article
              key={c.label}
              className="story-ch"
              data-active={active === i}
              ref={(el) => {
                items.current[i] = el;
              }}
            >
              <figure className="story-inline" data-tone={c.tone} data-reveal="scale">
                <img src={asset(c.image)} alt={c.alt} loading="lazy" decoding="async" />
              </figure>
              <span className="chip story-chip">
                <span className="story-num">0{i + 1}</span>
                {c.label}
              </span>
              <TileWords as="h3" text={c.title} className="h2 story-title" tone={c.tone === "ink" ? "ink" : c.tone === "citrine" ? "citrine" : undefined} />
              <p className="lead story-body">{c.body}</p>
              <ul className={`points js-draw ${seen >= i ? "is-in" : ""}`}>
                {c.points.map((p, j) => (
                  <li key={p} style={{ "--dd": `${200 + j * 140}ms` } as CSSProperties}>
                    <span className="tick">
                      <Check size={12} draw />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="story-stage" aria-hidden="true">
          <div className="story-panel" data-tone={chapters[active].tone}>
            {chapters.map((c, i) => (
              <img
                key={c.image}
                className="story-img"
                src={asset(c.image)}
                alt=""
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                data-state={i === active ? "in" : i < active ? "past" : "next"}
              />
            ))}
            <div className="story-dots">
              {chapters.map((c, i) => (
                <span key={c.label} data-on={i <= active} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
