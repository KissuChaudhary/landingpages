import type { Example } from "./types";
export const pricing: Example = {
  id: "pricing",
  label: "Plan selector",
  file: "Plan.tsx",
  request: "Give this plan a yearly option, with a clear billing total.",
  summary: "A period switch. Computed totals. A small, useful choice.",
  removed: ["<strong>$15 / month</strong>"],
  added: [
    "const [yearly, setYearly] = useState(true);",
    "const total = yearly ? 144 : 15;",
    "<strong>${yearly ? total / 12 : total} / month</strong>",
  ],
  output: {
    title: "A little more room.",
    description: "A considered space for your next good idea.",
    action: "Choose this plan",
  },
  before: `export default function Plan() {
  return (
    <div style={{ padding: 32, background: "#f5f5ee" }}>
      <h2>Builder</h2>
      <strong>$15 / month</strong>
      <p>A workspace for your next idea.</p>
    </div>
  );
}`,
  after: `"use client";
import { useState } from "react";

export default function Plan() {
  const [yearly, setYearly] = useState(true);
  const total = yearly ? 144 : 15;
  return (
    <div style={{ padding: 32, background: "#f5f5ee", color: "#202520" }}>
      <h2>A little more room.</h2>
      <div role="group" aria-label="Billing period">
        <button aria-pressed={!yearly} onClick={() => setYearly(false)}>Monthly</button>
        <button aria-pressed={yearly} onClick={() => setYearly(true)}>Yearly</button>
      </div>
      <strong>\${yearly ? total / 12 : total} / month</strong>
      <p>\${total} billed {yearly ? "yearly" : "monthly"}</p>
    </div>
  );
}`,
};
