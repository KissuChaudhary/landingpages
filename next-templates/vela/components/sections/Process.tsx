"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { SectionHead } from "@/components/ui/Primitives";
import { ProcessScene } from "@/components/product/ProcessScene";
export function Process() {
  const [step, setStep] = useState(0);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const keyboard = (event: KeyboardEvent, index: number) => {
    let next = index;
    if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (index + 1) % 3;
    else if (["ArrowLeft", "ArrowUp"].includes(event.key))
      next = (index + 2) % 3;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 2;
    else return;
    event.preventDefault();
    setStep(next);
    buttons.current[next]?.focus();
  };
  return (
    <section className="process section frame" id="how-it-works">
      <SectionHead {...site.process} />
      <div className="process-layout reveal">
        <div
          className="process-tabs"
          role="tablist"
          aria-label="Getting started"
          aria-orientation="vertical"
        >
          {site.process.steps.map((item, index) => (
            <button
              type="button"
              key={item.title}
              ref={(element) => {
                buttons.current[index] = element;
              }}
              id={`step-tab-${index}`}
              role="tab"
              aria-selected={step === index}
              aria-controls="step-panel"
              tabIndex={step === index ? 0 : -1}
              onClick={() => setStep(index)}
              onKeyDown={(event) => keyboard(event, index)}
            >
              <span className="step-number">0{index + 1}</span>
              <span className="step-copy">
                <b>{item.title}</b>
                <span>{item.text}</span>
              </span>
              <ArrowUpRight size={16} />
            </button>
          ))}
        </div>
        <div
          className="process-preview"
          id="step-panel"
          role="tabpanel"
          aria-labelledby={`step-tab-${step}`}
          tabIndex={0}
        >
          <ProcessScene step={step} />
          <span className="scene-example">
            A guided view of the product · Illustrative setup
          </span>
        </div>
      </div>
    </section>
  );
}
