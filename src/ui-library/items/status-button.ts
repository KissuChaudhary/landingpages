import type { UiItem } from '../registry';

export const statusButton: UiItem = {
  name: 'status-button',
  title: 'Status button',
  description: 'Save, Saving, Saved: the spinner opens in, the check draws itself, errors shake, and the label morphs between them.',
  summary:
    'The most common button in any product, and usually the least considered: it greys out, maybe shows a spinner, and snaps back. Here every change is one motion. A spinner slides open beside the label as it morphs to "Saving"; on success a check draws itself and the label becomes "Saved", keeping the letters they share; on failure the button gives a small shake and asks you to try again. Its width eases to each label, so nothing around it jumps.',
  file: 'status-button.tsx',
  dependencies: [],
  registryDependencies: ['text-morph'],
  css: [],
  tabs: ['Save', 'Copy', 'Error'],
  states: [
    { name: 'idle', description: 'The label and, if you pass one, an icon.' },
    { name: 'pending', description: 'A spinner opens in from zero width; the label morphs ("Save changes" → "Saving"). Clicks are ignored and aria-busy is set.' },
    { name: 'success', description: 'The spinner blurs out as a check draws itself in 420ms; "Saved". onReset fires after resetAfter.' },
    { name: 'error', description: 'A 380ms shake, a soft red tint and an alert icon; "Try again".' },
  ],
  usage: `import { StatusButton, type ActionStatus } from "@/components/status-button";

const [status, setStatus] = useState<ActionStatus>("idle");

<StatusButton status={status} onClick={save} onReset={() => setStatus("idle")} />`,
  recipeTitle: 'With a request',
  recipeIntro: 'Drive status from your request; the button handles every transition.',
  recipe: `"use client";
import { useState } from "react";
import { StatusButton, type ActionStatus } from "@/components/status-button";

export function SaveSettings({ values }: { values: Settings }) {
  const [status, setStatus] = useState<ActionStatus>("idle");

  const save = async () => {
    setStatus("pending");
    try {
      const res = await fetch("/api/settings", { method: "PUT", body: JSON.stringify(values) });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return <StatusButton status={status} labels={{ idle: "Save changes" }} onClick={save} onReset={() => setStatus("idle")} />;
}`,
  props: [
    { name: 'status', type: '"idle" | "pending" | "success" | "error"', default: '"idle"', description: 'What the button shows.' },
    { name: 'labels', type: 'Partial<Record<status, string>>', default: 'Save, Saving, Saved, Try again', description: 'Wording per state.' },
    { name: 'icon', type: 'ReactNode', description: 'An icon beside the idle label, e.g. a link icon for Copy link.' },
    { name: 'variant', type: '"primary" | "outline"', default: '"primary"', description: 'Filled with your brand colour, or a hairline outline.' },
    { name: 'onReset / resetAfter', type: '() => void / number', default: '— / 1800', description: 'Called that long after success, to go back to idle.' },
  ],
  notes: [
    'State changes are announced from a status region beside the button, so the button’s name stays just its label.',
    'While pending it is aria-busy and ignores clicks, without dimming or losing focus.',
    'The check is a stroked path that draws itself; the shake uses the Web Animations API. No animation library.',
    'Installs Text morph alongside it. With reduced motion, states change in place.',
  ],
};
