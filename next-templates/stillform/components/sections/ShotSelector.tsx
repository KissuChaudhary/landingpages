"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { asset } from "@/lib/assets";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function ShotSelector() {
  const [index, setIndex] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = site.shots.options[index];
  const onKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    let next = index;
    if (event.key === "ArrowRight")
      next = (index + 1) % site.shots.options.length;
    else if (event.key === "ArrowLeft")
      next =
        (index - 1 + site.shots.options.length) % site.shots.options.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = site.shots.options.length - 1;
    else return;
    event.preventDefault();
    setIndex(next);
    tabs.current[next]?.focus();
  };
  return (
    <section className="section container" id="perspectives">
      <Reveal>
        <SectionHeading {...site.shots} />
      </Reveal>
      <div
        className="shot-tabs"
        role="tablist"
        aria-label="Product image perspectives"
      >
        {site.shots.options.map((option, i) => (
          <button
            key={option.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            id={`${id}-tab-${i}`}
            role="tab"
            aria-selected={index === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={index === i ? 0 : -1}
            onClick={() => setIndex(i)}
            onKeyDown={onKey}
          >
            <span className="eyebrow">{option.index}</span>
            {option.label}
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div
        id={`${id}-panel-${index}`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${index}`}
        tabIndex={0}
        className="shot-panel"
      >
        <div className={`shot-image ${selected.zoom ? "shot-detail" : ""}`}>
          <img
            key={selected.id}
            src={asset(selected.image)}
            alt={selected.alt}
            width="1536"
            height="1024"
            loading="lazy"
          />
          <span className="image-label">SOLA / {selected.index}</span>
        </div>
        <div className="shot-copy">
          <span className="eyebrow">The intention / {selected.index}</span>
          <h3>{selected.title}</h3>
          <p>{selected.description}</p>
          <ul>
            {selected.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <a className="text-link" href="#investment">
            Plan something like this{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
