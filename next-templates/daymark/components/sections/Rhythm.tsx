"use client";
import { useState } from "react";
import { site } from "@/site.config";
import { Heading } from "../ui/Heading";
import { Arrow } from "../ui/Arrow";
export function Rhythm() {
  const [active, setActive] = useState(0);
  const step = site.rhythm.steps[active];
  return (
    <section className="rhythm wrap">
      <Heading {...site.rhythm} />
      <div className="rhythm-grid">
        <div
          className="rhythm-controls"
          role="group"
          aria-label="Explore the working rhythm"
        >
          {site.rhythm.steps.map((item, index) => (
            <button
              className={index === active ? "active" : ""}
              aria-pressed={index === active}
              aria-controls="rhythm-detail"
              type="button"
              onClick={() => setActive(index)}
              key={item.number}
            >
              <span>{item.number}</span>
              <strong>{item.period}</strong>
              <Arrow />
            </button>
          ))}
          <p>
            Thoughtful decisions.
            <br />
            Practical progress.
          </p>
        </div>
        <div className="rhythm-detail" id="rhythm-detail" aria-live="polite">
          <div className="rhythm-diagram" aria-hidden="true">
            <svg viewBox="0 0 420 220" fill="none">
              <path
                d="M65 110a145 75 0 1 0 290 0 145 75 0 1 0-290 0"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="m302 45 11-2-4 10M107 166l-11 3 4-11"
                stroke="currentColor"
              />
              <circle
                cx="65"
                cy="110"
                r={active === 0 ? 26 : 13}
                fill={active === 0 ? "var(--lime)" : "#435b51"}
              />
              <circle
                cx="210"
                cy="35"
                r={active === 1 ? 26 : 13}
                fill={active === 1 ? "var(--lime)" : "#435b51"}
              />
              <circle
                cx="355"
                cy="110"
                r={active === 2 ? 26 : 13}
                fill={active === 2 ? "var(--lime)" : "#435b51"}
              />
              <text
                x="65"
                y="115"
                textAnchor="middle"
                fill={active === 0 ? "var(--ink)" : "#fff"}
                fontSize="13"
              >
                01
              </text>
              <text
                x="210"
                y="40"
                textAnchor="middle"
                fill={active === 1 ? "var(--ink)" : "#fff"}
                fontSize="13"
              >
                02
              </text>
              <text
                x="355"
                y="115"
                textAnchor="middle"
                fill={active === 2 ? "var(--ink)" : "#fff"}
                fontSize="13"
              >
                03
              </text>
              <text
                x="210"
                y="116"
                textAnchor="middle"
                fill="#fff"
                fontSize="24"
                letterSpacing="-1"
              >
                Keep moving.
              </text>
            </svg>
          </div>
          <div className="rhythm-text panel-enter" key={step.number}>
            <span className="eyebrow">The work / {step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <div className="rhythm-output">
              <span>You leave with</span>
              <strong>{step.output}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
