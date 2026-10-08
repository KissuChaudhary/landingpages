import type { UiItem } from '../registry';

export const thinkingIndicator: UiItem = {
  name: 'thinking-indicator',
  title: 'Thinking indicator',
  description: 'Four quiet loaders for the gap before the first token, with a label, a rolling timer and a finish that draws itself.',
  summary:
    'The second between sending and the first word is where an AI product feels fast or slow. Pick an orbit, dots, a pulse or a scan; each pairs with a label that a light sweeps across and a timer whose seconds roll up as they pass ("Churning 44s"). When it’s done nothing is swapped: the mark blurs into a check that draws itself, the label morphs to "Done in" and the time gains its tenths, "44.6s".',
  file: 'thinking-indicator.tsx',
  dependencies: [],
  registryDependencies: ['number-roll', 'text-morph'],
  css: ['@keyframes ui-sheen', '@keyframes ui-bounce', '@keyframes ui-breathe', '@keyframes ui-scan'],
  tabs: ['Orbit', 'Dots', 'Pulse', 'Scan', 'Done'],
  tabsLabel: 'Variants',
  states: [
    { name: 'running', description: 'The mark animates, a 1.4s sweep of light crosses the label and the seconds roll up once a second. At a minute, the minutes slide open ("1m 05s").' },
    { name: 'done', description: 'The mark shrinks away through a blur and pauses; a check draws itself (420ms); the label morphs to "Done in" and the tenths slide open: "Done in 12.4s". A doneLabel replaces the whole line, and the timer folds away.' },
  ],
  usage: `import { ThinkingIndicator } from "@/components/thinking-indicator";

<ThinkingIndicator variant="orbit" label="Churning" startedAt={sentAt} />`,
  recipe: `import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { ThinkingIndicator } from "@/components/thinking-indicator";

function Waiting() {
  const { status, sendMessage } = useChat();
  const [sentAt, setSentAt] = useState<number>();

  const send = (text: string) => {
    setSentAt(Date.now());
    sendMessage({ text });
  };

  // "submitted" is the gap between sending and the first streamed token.
  return status === "submitted" ? <ThinkingIndicator startedAt={sentAt} /> : null;
}`,
  props: [
    { name: 'variant', type: '"orbit" | "dots" | "pulse" | "scan"', default: '"orbit"', description: 'The mark.' },
    { name: 'status', type: '"running" | "done"', default: '"running"', description: 'Animating, or settled with a check.' },
    { name: 'label / doneLabel', type: 'string', default: '"Thinking"', description: 'What it says while running, and once done.' },
    { name: 'startedAt', type: 'number', description: 'Start time in ms; shows the rolling timer and times "Done in".' },
  ],
  notes: [
    'A status region announces the label and then the done message ("Done in 12.4s"); the ticking timer itself is hidden from screen readers.',
    'The timer re-renders once a second, on the second, and stops when done or unmounted. The mark’s animation is paused once it has faded out.',
    'Installs Number roll and Text morph. With reduced motion the marks hold still, nothing sweeps or rolls, and states change in place.',
  ],
};
