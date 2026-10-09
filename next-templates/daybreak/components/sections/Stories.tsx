"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import { site } from "@/site.config";
import { teams } from "@/data/teams";
import { asset } from "@/lib/urls";
import { CompanyMark } from "../ui/Brand";
import { Frame, SectionHead } from "../ui/Primitives";
export function Stories() {
  const [selected, setSelected] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  function key(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const next =
      e.key === "ArrowRight"
        ? (i + 1) % 4
        : e.key === "ArrowLeft"
          ? (i + 3) % 4
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? 3
              : -1;
    if (next < 0) return;
    e.preventDefault();
    setSelected(next);
    refs.current[next]?.focus();
  }
  return (
    <Frame className="stories-section">
      <div className="section-inner">
        <SectionHead
          label={site.stories.label}
          title={site.stories.heading}
          text={site.stories.text}
        />
        <div
          className="story-row"
          role="group"
          aria-label="Example team perspectives"
        >
          {teams.map((t, i) => (
            <button
              className={`story-card ${selected === i ? "story-selected" : ""}`}
              aria-pressed={selected === i}
              tabIndex={selected === i ? 0 : -1}
              key={t.name}
              ref={(el) => {
                refs.current[i] = el;
              }}
              aria-label={`${t.person}, ${t.name}: ${t.quote}`}
              onClick={() => setSelected(i)}
              onKeyDown={(e) => key(e, i)}
            >
              <img
                src={asset(`/images/${t.image}.webp`)}
                alt={`${t.person}, a fictional example team member`}
                width="640"
                height="960"
                loading="lazy"
              />
              <span className="story-copy">
                <span className="story-company">
                  <CompanyMark kind={t.mark} />
                  {t.name}
                </span>
                <span className="story-quote">“{t.quote}”</span>
                <span className="story-person">
                  {t.person}
                  <small>
                    {t.role} at {t.name}
                  </small>
                </span>
              </span>
              <span className="story-vertical" aria-hidden="true">
                {t.name}
              </span>
            </button>
          ))}
        </div>
        <p className="example-caption">
          Illustrative perspectives and original portraits. Replace with your
          own customer stories.
        </p>
      </div>
    </Frame>
  );
}
