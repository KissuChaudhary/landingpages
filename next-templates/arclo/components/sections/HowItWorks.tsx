"use client";
import { useId, useState } from "react";
import { ArrowRight, Check, Route, Play } from "lucide-react";
import { Section, SectionHead } from "../ui/Primitives";
import {
  IntegrationScene,
  BuilderScene,
  AnalyticsScene,
} from "../product/FeatureScenes";
import { useExperience } from "../Experience";
const steps = [
  {
    title: "Connect the ledger and the banks.",
    description:
      "Point Arclo at your accounting system and feeds. Balances and transactions arrive read-only.",
  },
  {
    title: "Map accounts and write the rules.",
    description:
      "Decide which lines clear which accounts, the tolerance you accept and who signs what.",
  },
  {
    title: "Close a month side by side.",
    description:
      "Run Arclo next to your current process once, compare the results and keep what you trust.",
  },
  {
    title: "Close every month from one page.",
    description:
      "Watch the checklist, the reconciliations and the approvals move together, and lock the period.",
  },
];
export function HowItWorks() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const { openWorkspace } = useExperience();
  return (
    <Section id="how-it-works">
      <SectionHead
        label="How it works"
        icon={Route}
        title="From spreadsheets to a five-day close."
        description="Four steps, and the first one takes an afternoon."
      />
      <div className="how-grid">
        <div
          className="how-tabs"
          role="tablist"
          aria-label="Getting started steps"
          aria-orientation="vertical"
        >
          {steps.map((step, index) => (
            <button
              key={step.title}
              role="tab"
              id={`${id}-step-${index}`}
              aria-selected={selected === index}
              aria-controls={`${id}-panel`}
              tabIndex={selected === index ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => {
                const next =
                  event.key === "ArrowDown"
                    ? (index + 1) % 4
                    : event.key === "ArrowUp"
                      ? (index + 3) % 4
                      : event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? 3
                          : -1;
                if (next >= 0) {
                  event.preventDefault();
                  setSelected(next);
                  document.getElementById(`${id}-step-${next}`)?.focus();
                }
              }}
            >
              <span className="step-number">0{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                {selected === index && <p>{step.description}</p>}
              </div>
            </button>
          ))}
        </div>
        <div
          className="how-panel"
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-step-${selected}`}
        >
          <span className="scene-overline">ONE STEP AT A TIME</span>
          {selected === 0 ? (
            <>
              <div className="connect-card">
                <span>
                  <Check size={13} /> Ledger and feeds connected
                </span>
                <strong>Read-only, from the first day.</strong>
              </div>
              <IntegrationScene />
            </>
          ) : selected === 1 ? (
            <BuilderScene />
          ) : selected === 2 ? (
            <div className="test-scene">
              <span className="test-icon">
                <Check size={28} />
              </span>
              <h3>Ready for a parallel run.</h3>
              <p>
                Three sample bank lines.
                <br />
                One clean reconciliation.
              </p>
              <button className="run-button" onClick={() => openWorkspace()}>
                <Play size={13} /> Run the sample
              </button>
            </div>
          ) : (
            <AnalyticsScene />
          )}
          <button
            className="text-link"
            onClick={() =>
              openWorkspace(selected === 1 ? "approve" : "match")
            }
          >
            Explore this step <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </Section>
  );
}
