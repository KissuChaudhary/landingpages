"use client";
import { useState } from "react";
import { site } from "@/site.config";
import { Arrow, Label, Title } from "../ui";
import { ProcessCanvas } from "../ProcessCanvas";
export function Process() {
  const [active, setActive] = useState(0);
  const step = site.process.steps[active];
  return (
    <section
      id="process"
      className="process section-pad"
      aria-labelledby="process-title"
    >
      <div className="wrap">
        <div className="section-heading">
          <div>
            <Label>{site.process.eyebrow}</Label>
            <Title lines={site.process.title} id="process-title" />
          </div>
          <p>{site.process.description}</p>
        </div>
        <div className="process-layout" data-reveal>
          <ProcessCanvas step={active} />
          <div className="process-editor">
            <span className="process-kicker">
              A SMALL STUDIO. A CLEAR RHYTHM.
            </span>
            <ol className="process-stages">
              {site.process.steps.map((item, index) => (
                <li key={item.title}>
                  <button
                    aria-pressed={active === index}
                    onClick={() => setActive(index)}
                  >
                    <span>0{index + 1}</span>
                    {item.title}
                    <Arrow diagonal size={18} />
                  </button>
                </li>
              ))}
            </ol>
            <div className="process-copy" key={active}>
              <span>{step.label}</span>
              <h3>{step.output}</h3>
              <p>{step.description}</p>
              <ul>
                {step.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
            <label className="process-scrub">
              <span>
                First thought <span>Final frame</span>
              </span>
              <input
                type="range"
                min="0"
                max="2"
                step="1"
                value={active}
                aria-label="Creative process stage"
                aria-valuetext={step.title}
                onChange={(event) => setActive(Number(event.target.value))}
              />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
