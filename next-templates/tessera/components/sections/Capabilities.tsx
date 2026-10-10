"use client";
import { useState } from "react";
import { site } from "@/site.config";
import { Eyebrow, Title } from "@/components/ui";
import { SystemDiagram } from "@/components/art/SystemDiagram";
export function Capabilities() {
  const [active, setActive] = useState(0);
  const data = site.capabilities;
  const item = data.items[active];
  return (
    <section className="capabilities section light" id="capabilities">
      <div className="section-heading">
        <div>
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <Title lines={data.title} />
        </div>
        <p data-reveal>{data.description}</p>
      </div>
      <div className="capability-layout" data-reveal>
        <div
          role="tablist"
          aria-label="Studio capabilities"
          aria-orientation="vertical"
          className="capability-tabs"
        >
          {data.items.map((entry, i) => (
            <button
              role="tab"
              aria-selected={active === i}
              aria-controls="capability-panel"
              id={`capability-tab-${i}`}
              tabIndex={active === i ? 0 : -1}
              key={entry.title}
              onClick={() => setActive(i)}
              onKeyDown={(event) => {
                const delta =
                  event.key === "ArrowDown"
                    ? 1
                    : event.key === "ArrowUp"
                      ? -1
                      : 0;
                if (delta || event.key === "Home" || event.key === "End") {
                  event.preventDefault();
                  const next =
                    event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? data.items.length - 1
                        : (i + delta + data.items.length) % data.items.length;
                  setActive(next);
                  document.getElementById(`capability-tab-${next}`)?.focus();
                }
              }}
            >
              <span className="mono">0{i + 1}</span>
              <span>{entry.title}</span>
              <span className="tab-plus" aria-hidden="true">
                +
              </span>
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id="capability-panel"
          aria-labelledby={`capability-tab-${active}`}
          className={`capability-panel tone-${item.color}`}
          tabIndex={0}
        >
          <div className="panel-morph" key={active}>
            <SystemDiagram nodes={item.labels} color={item.color} />
            <div className="capability-text">
              <h3>{item.short}</h3>
              <p>{item.description}</p>
              <ul className="deliverables">
                {item.deliverables.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
