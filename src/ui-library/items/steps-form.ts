import type { UiItem } from '../registry';

export const stepsForm: UiItem = {
  name: 'steps-form',
  title: 'Steps form',
  description: 'A multi-step form in one card that changes shape: steps slide in from the way you’re going, checks shake and explain, and Create turns into what comes next.',
  summary:
    'Onboarding, checkout, setup: most multi-step forms jump between pages and lose you in between. This one is a single card. A bar of segments fills as you go, the step’s name and title morph letter by letter and "2 / 4" rolls. The next step slides in from the side you’re heading, out of a blur, while the card eases to its new height; going back slides the other way. Continue runs the step’s check, and if something’s wrong the step shakes and the reason folds open under it (an async check, like whether a name is free, shows "Checking" in the button first). Back folds out of the footer on the first step. On the last step Continue morphs into your action, spins, draws a check, and the whole card turns into whatever comes next.',
  file: 'steps-form.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['number-roll', 'status-button', 'text-morph'],
  css: [],
  states: [
    { name: 'header', description: 'Segments fill left to right as scaleX (520ms); the label and title morph; the counter rolls.' },
    { name: 'step', description: 'The new step slides 28px in from the direction you’re going out of a 4px blur (420ms) while the old one slides out the other way (260ms); the card’s height eases (440ms). Focus moves to the new step’s first field.' },
    { name: 'check', description: 'validate returns a message: the step shakes (±6px, 380ms) and the message folds open under it with an alert icon. A promise shows the button’s spinner and "Checking" until it settles.' },
    { name: 'back', description: 'Hidden on the first step by folding its column to nothing (360ms), so Continue never jumps.' },
    { name: 'submit', description: 'On the last step the button reads your label; onSubmit runs with Status button’s spinner, then a drawn check, and 750ms later the header and footer fold away and done replaces the step. A thrown error shows its message and "Try again".' },
  ],
  usage: `import { StepsForm } from "@/components/steps-form";

<StepsForm
  steps={[
    { id: "name", label: "Workspace", title: "Name your workspace", content: <NameField />, validate: () => (name ? null : "Give it a name.") },
    { id: "plan", label: "Plan", title: "Pick a plan", content: <Plans /> },
  ]}
  onSubmit={() => createWorkspace({ name, plan })}
  submitLabels={{ idle: "Create workspace", pending: "Creating", success: "Created" }}
  done={<Ready />}
/>`,
  recipeTitle: 'Checks against your API',
  recipeIntro: 'A step’s validate can be async: return a message to stay, nothing to move on. onSubmit throwing an Error keeps the person on the last step with its message.',
  recipe: `"use client";
import { useState } from "react";
import { StepsForm } from "@/components/steps-form";

export function CreateWorkspace() {
  const [name, setName] = useState("");
  return (
    <StepsForm
      steps={[
        {
          id: "name",
          label: "Workspace",
          title: "Name your workspace",
          content: <input value={name} onChange={(e) => setName(e.target.value)} aria-label="Workspace name" />,
          validate: async () => {
            if (name.trim().length < 2) return "Give it a name, two letters or more.";
            const res = await fetch(\`/api/workspaces/available?name=\${encodeURIComponent(name)}\`);
            if (!(await res.json()).available) return "That name is taken. Try another.";
          },
        },
        // …more steps
      ]}
      onSubmit={async () => {
        const res = await fetch("/api/workspaces", { method: "POST", body: JSON.stringify({ name }) });
        if (!res.ok) throw new Error("We couldn’t create it just now. Try again.");
      }}
      submitLabels={{ idle: "Create workspace", pending: "Creating", success: "Created" }}
      done={<p>{name} is ready.</p>}
    />
  );
}`,
  props: [
    { name: 'steps', type: '{ id, label, title, description?, content, validate? }[]', description: 'In order. You own the fields’ state; content is whatever the step shows.' },
    { name: 'onSubmit', type: '() => void | Promise<void>', description: 'Runs after the last step’s check. Throw to stay on the last step; the error’s message is shown.' },
    { name: 'submitLabels', type: '{ idle?, pending?, success? }', default: '"Create", "Creating", "Created"', description: 'The last button’s labels as it runs.' },
    { name: 'done', type: 'ReactNode', description: 'What the card turns into once it’s submitted.' },
    { name: 'onStepChange', type: '(index: number) => void', description: 'Runs when the step changes, e.g. for analytics.' },
  ],
  notes: [
    'It’s a form: Enter in a field continues, the title labels it, and errors are announced with role="alert".',
    'Focus moves to each new step’s first field (or an element marked data-autofocus), but not on first load.',
    'Steps that aren’t showing are unmounted, so keep their values in your own state, as the demo does.',
    'Installs Number roll, Status button and Text morph. With reduced motion steps swap in place, nothing shakes, and the card resizes instantly.',
  ],
};
