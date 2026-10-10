"use client";
import { useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { asset } from "@/lib/assets";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";

export function UseCases() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const u = site.useCases,
    selected = u.tabs[active];
  const select = (next: number) => {
    setDirection(next > active ? 1 : -1);
    setActive(next);
  };
  return (
    <section
      id="teams"
      className="use-cases section container"
      aria-labelledby="teams-title"
    >
      <SectionIntro
        id="teams-title"
        eyebrow={u.eyebrow}
        title={u.title}
        center
      />
      <Reveal>
        <div
          className="team-tabs"
          role="tablist"
          aria-label="Find your team's workflow"
        >
          <span
            className="team-thumb"
            style={{ transform: `translateX(${active * 100}%)` }}
          />
          {u.tabs.map((t, i) => (
            <button
              role="tab"
              key={t.id}
              id={`team-${t.id}`}
              aria-selected={active === i}
              aria-controls="team-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key))
                  return;
                e.preventDefault();
                const n =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? 2
                      : (active + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                select(n);
                document.getElementById(`team-${u.tabs[n].id}`)?.focus();
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div
          className="team-panel"
          role="tabpanel"
          id="team-panel"
          aria-labelledby={`team-${selected.id}`}
          style={{ "--direction": direction } as React.CSSProperties}
        >
          <div className="team-copy" key={selected.id}>
            <span className="eyebrow">{selected.output}</span>
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
            <ul>
              {selected.tasks.map((t) => (
                <li key={t}>
                  <Check size={15} />
                  {t}
                </li>
              ))}
            </ul>
            <a href="#start" className="text-link">
              Find your flow
              <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="team-art">
            {u.tabs.map((t, i) => (
              <img
                key={t.id}
                className={active === i ? "scene-active" : ""}
                aria-hidden={active !== i}
                src={asset(t.image)}
                alt={`Illustrative ${t.label.toLowerCase()} workflow`}
                width="960"
                height="780"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
