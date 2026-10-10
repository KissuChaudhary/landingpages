"use client";
import { useState, useRef } from "react";
import { site } from "@/site.config";
import { process } from "@/data/studio";
import { Arrow, Eyebrow, Multiline } from "../ui";
import { ProcessArt } from "./ProcessArt";
export function Process() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const select = (index: number) => {
    setActive(index);
    buttons.current[index]?.focus();
  };
  const item = process[active];
  return (
    <section
      className="process-section section-pad"
      id="process"
      aria-labelledby="process-title"
    >
      <div className="wrapper">
        <div className="section-intro">
          <div>
            <Eyebrow>{site.process.eyebrow}</Eyebrow>
            <h2 data-reveal id="process-title">
              <Multiline text={site.process.title} />
            </h2>
          </div>
          <p>{site.process.description}</p>
        </div>
        <div
          className="process-tabs"
          role="tablist"
          aria-label="Our creative process"
        >
          {process.map((step, i) => (
            <button
              key={step.title}
              type="button"
              ref={(el) => {
                buttons.current[i] = el;
              }}
              role="tab"
              id={`process-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`process-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (
                  ["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)
                ) {
                  e.preventDefault();
                  select(
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? process.length - 1
                        : (active +
                            (e.key === "ArrowRight" ? 1 : -1) +
                            process.length) %
                          process.length,
                  );
                }
              }}
            >
              <span className="tab-number">0{i + 1}</span>
              {step.title}
              <Arrow diagonal />
            </button>
          ))}
        </div>
        <div
          className="process-panel"
          role="tabpanel"
          id={`process-panel-${active}`}
          aria-labelledby={`process-tab-${active}`}
          tabIndex={0}
        >
          <div key={`${active}-art`} className="process-visual">
            <ProcessArt mode={item.visual} />
          </div>
          <div key={active} className="process-copy">
            <p className="eyebrow">{item.label}</p>
            <h3>
              <Multiline text={item.headline} />
            </h3>
            <p>{item.body}</p>
            <ul>
              {item.outputs.map((output) => (
                <li key={output}>
                  <span>↗</span>
                  {output}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
