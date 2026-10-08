import type { UiItem } from '../registry';

export const waitlistField: UiItem = {
  name: 'waitlist-field',
  title: 'Waitlist field',
  description: 'An email field that becomes its own answer: the button stretches across it, then settles as "You’re on the list · #1,248".',
  summary:
    'The first thing a launch page asks for, and usually a form that blinks and shows a green line. Here it is one surface. Submit and the button stretches across the whole field while a light sweeps through it. When the answer comes back it settles in place: a check draws itself, the label morphs to "You’re on the list", and the place number rolls up into view. A bad email gets a small shake and a hint underneath; a failed request folds the button back with "Try again".',
  file: 'waitlist-field.tsx',
  dependencies: [],
  registryDependencies: ['number-roll', 'text-morph'],
  css: ['@keyframes ui-scan', '@keyframes ui-fade-in'],
  tabs: ['Join', 'Error', 'Joined'],
  states: [
    { name: 'idle', description: 'Email and "Join the waitlist" in one hairline pill; the button’s width is measured so the stretch starts exactly from it.' },
    { name: 'invalid', description: 'A 380ms shake, the pill’s edge tints red and "Enter a full email address" slides in below. Typing clears it.' },
    { name: 'joining', description: 'The button stretches across the field (560ms) and a light band sweeps through it; the label morphs to "Joining".' },
    { name: 'joined', description: 'A check draws itself, the label morphs to "You’re on the list" and the place rolls up to #1,248.' },
    { name: 'failed', description: 'The button folds back to its own width with a shake and "Try again".' },
  ],
  usage: `import { WaitlistField } from "@/components/waitlist-field";

<WaitlistField onSubmit={(email) => joinWaitlist(email)} />`,
  recipeTitle: 'With your API',
  recipeIntro: 'Return a promise from onSubmit; resolve with the place in line to show it, throw to show Try again.',
  recipe: `"use client";
import { WaitlistField } from "@/components/waitlist-field";

export function Hero() {
  return (
    <WaitlistField
      onSubmit={async (email) => {
        const res = await fetch("/api/waitlist", { method: "POST", body: JSON.stringify({ email }) });
        if (!res.ok) throw new Error("Couldn't join");
        const { position } = await res.json();
        return { position };
      }}
    />
  );
}

// app/api/waitlist/route.ts
export async function POST(req: Request) {
  const { email } = await req.json();
  const position = await db.waitlist.add(email); // your storage; returns their place
  return Response.json({ position });
}`,
  props: [
    { name: 'onSubmit', type: '(email) => Promise<{ position? } | void>', description: 'Runs on a valid email. Resolve to show the joined state, throw to show Try again.' },
    { name: 'joined', type: '{ position? } | null', description: 'Show the joined state straight away, e.g. for someone already on the list.' },
    { name: 'placeholder', type: 'string', default: '"you@company.com"', description: 'The field’s placeholder.' },
    { name: 'labels', type: 'Partial<{ idle; pending; success; error; invalid }>', description: 'Wording for each state and the invalid hint.' },
  ],
  notes: [
    'A real form: Enter submits, the field has a label, autocomplete="email" and the right mobile keyboard.',
    'The hint is linked to the field with aria-describedby, and joining or failing is announced from a status region.',
    'Installs Number roll and Text morph alongside it.',
    'With reduced motion there is no shake or sweep; states change in place.',
  ],
};
