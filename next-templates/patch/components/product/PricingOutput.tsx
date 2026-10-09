"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Example } from "@/data/types";
export function PricingOutput({
  applied,
  example,
}: {
  applied: boolean;
  example: Example;
}) {
  const [yearly, setYearly] = useState(true);
  const [selected, setSelected] = useState(false);
  const annual = applied && yearly;
  return (
    <div className="pricing-output">
      <h3>{applied ? example.output.title : "Builder"}</h3>
      <p>{example.output.description}</p>
      {applied && (
        <div
          className="output-billing"
          role="group"
          aria-label="Example billing period"
        >
          <button
            aria-pressed={!yearly}
            onClick={() => {
              setYearly(false);
              setSelected(false);
            }}
          >
            Monthly
          </button>
          <button
            aria-pressed={yearly}
            onClick={() => {
              setYearly(true);
              setSelected(false);
            }}
          >
            Yearly
          </button>
        </div>
      )}
      <div className="output-price">
        ${annual ? 12 : 15}
        <span>/ month</span>
      </div>
      <p className="output-total">
        {annual ? "$144 billed yearly" : "$15 billed monthly"}
      </p>
      <button className="output-plan-button" onClick={() => setSelected(true)}>
        {selected ? "Plan selected" : example.output.action}
        <ArrowUpRight size={15} />
      </button>
      <span className="output-form-note" role="status">
        {selected ? "Example selection. No payment." : "Illustrative plan."}
      </span>
    </div>
  );
}
