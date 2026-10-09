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
    title: "Bring your world together.",
    description:
      "Start with the tools and context you already know. Make a place for everything that matters.",
  },
  {
    title: "Give your idea a shape.",
    description:
      "Choose a trigger, describe the job and connect your actions. A clear flow makes all the difference.",
  },
  {
    title: "Try a little test run.",
    description:
      "Watch the steps unfold. Review the prepared output before connecting it to the real world.",
  },
  {
    title: "Let good work keep flowing.",
    description:
      "Follow your agents’ activity, refine the instructions and make more room for meaningful work.",
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
        title="From idea to autopilot."
        description="A few thoughtful steps. A whole new way to spend your day."
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
          <span className="scene-overline">A LITTLE MOMENT OF CLARITY</span>
          {selected === 0 ? (
            <>
              <div className="connect-card">
                <span>
                  <Check size={13} /> Your workspace is ready
                </span>
                <strong>Everything in its right place.</strong>
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
              <h3>Ready for a test run.</h3>
              <p>
                Three sample records.
                <br />
                One useful outcome.
              </p>
              <button className="run-button" onClick={() => openWorkspace()}>
                <Play size={13} /> Try the workflow
              </button>
            </div>
          ) : (
            <AnalyticsScene />
          )}
          <button
            className="text-link"
            onClick={() =>
              openWorkspace(selected === 1 ? "onboarding" : "leads")
            }
          >
            Explore this step <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </Section>
  );
}
