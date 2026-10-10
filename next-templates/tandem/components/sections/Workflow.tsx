"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { asset } from "@/lib/assets";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TextMorph } from "@/components/hairline/text-morph";
import { Reveal } from "@/components/motion/Reveal";

export function Workflow() {
  const [active, setActive] = useState(0);
  const w = site.workflow;
  return (
    <section
      id="workflow"
      className="workflow section"
      aria-labelledby="workflow-title"
    >
      <div className="container">
        <SectionIntro
          id="workflow-title"
          eyebrow={w.eyebrow}
          title={w.title}
          description={w.description}
        />
        <Reveal>
          <div className="workflow-grid">
            <div
              className="workflow-steps"
              role="tablist"
              aria-label="How Tandem works"
              aria-orientation="vertical"
            >
              {w.steps.map((s, i) => (
                <button
                  key={s.title}
                  id={`step-tab-${i}`}
                  role="tab"
                  aria-selected={active === i}
                  aria-controls="workflow-panel"
                  tabIndex={active === i ? 0 : -1}
                  className={`workflow-step ${active === i ? "step-active" : ""}`}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (
                      !["ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)
                    )
                      return;
                    e.preventDefault();
                    const next =
                      e.key === "Home"
                        ? 0
                        : e.key === "End"
                          ? 2
                          : (active + (e.key === "ArrowDown" ? 1 : 2)) % 3;
                    setActive(next);
                    document.getElementById(`step-tab-${next}`)?.focus();
                  }}
                >
                  <span className="step-number">0{i + 1}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <div className="step-description">
                      <p>{s.description}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={19} />
                </button>
              ))}
            </div>
            <div
              id="workflow-panel"
              role="tabpanel"
              aria-labelledby={`step-tab-${active}`}
              className="workflow-panel"
            >
              <div className="scene-label">
                <span className="status-dot" />
                <TextMorph>{w.steps[active].label}</TextMorph>
              </div>
              <div className="workflow-images">
                {w.steps.map((s, i) => (
                  <img
                    key={s.image}
                    src={asset(s.image)}
                    width="1000"
                    height="780"
                    loading="lazy"
                    alt={s.title}
                    className={active === i ? "scene-active" : ""}
                    aria-hidden={active !== i}
                  />
                ))}
              </div>
              <span className="workflow-footnote">
                CONTEXT IN. POSSIBILITIES OUT.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
