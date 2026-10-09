"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { Icon, SectionTitle } from "../ui/Primitives";

// Feature pills over a deck of product screens. Choosing a pill drops the front screen
// away and brings the chosen one forward; the others stay stacked behind it.
export function Toolkit() {
  const { toolkit } = site;
  const n = toolkit.items.length;
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const id = useId();

  useEffect(() => () => clearTimeout(timer.current), []);

  const choose = (i: number) => {
    if (i === active) return;
    setLeaving(active);
    setActive(i);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setLeaving(null), 650);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const next = e.key === "ArrowRight" || e.key === "ArrowDown" ? (active + 1) % n : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (active - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    choose(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <section className="section toolkit-section" id="features">
      <div className="container">
        <SectionTitle lines={toolkit.heading} />
        <div className="pills" role="tablist" aria-label="Features" onKeyDown={onKeyDown} data-reveal="" style={{ "--rd": "120ms" } as CSSProperties}>
          {toolkit.items.map((item, i) => (
            <button
              key={item.label}
              id={`${id}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              tabIndex={i === active ? 0 : -1}
              className={`pill${i === active ? " is-active" : ""}`}
              onClick={() => choose(i)}
            >
              <span className="pill-icon">
                <Icon name={item.icon} size={18} />
              </span>
              {item.label}
            </button>
          ))}
        </div>
        <div className="deck-wrap" data-reveal="" style={{ "--ry": "56px", "--rd": "200ms" } as CSSProperties}>
          <div className="deck" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`}>
            {toolkit.items.map((item, i) => {
              const pos = (i - active + n) % n;
              return (
                <div
                  key={item.label}
                  className={`deck-card${i === leaving ? " is-leaving" : ""}`}
                  style={{ "--pos": pos, zIndex: i === leaving ? n + 1 : n - pos } as CSSProperties}
                  aria-hidden={pos === 0 ? undefined : true}
                >
                  <img src={asset(item.image)} width={1040} height={600} alt={pos === 0 ? item.alt : ""} loading="lazy" decoding="async" />
                </div>
              );
            })}
          </div>
          <div className="deck-caption">
            {toolkit.items.map((item, i) => (
              <p key={item.label} className={i === active ? "is-active" : undefined} aria-hidden={i === active ? undefined : true}>
                {item.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
