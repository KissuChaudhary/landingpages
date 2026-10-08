import type { UiItem } from '../registry';

export const thinkingIndicator: UiItem = {
  name: 'thinking-indicator',
  title: 'Thinking indicator',
  description: 'Four quiet loaders for the gap before the first token, with a shimmering label and a live timer.',
  summary:
    'The second between sending and the first word is where an AI product feels fast or slow. Pick an orbit, dots, a pulse or a scan; each pairs with a shimmering label and a timer that counts in tenths ("Churning 44.9s"). When it’s done it settles into a check and "Done in 12.4s".',
  group: 'working',
  file: 'thinking-indicator.tsx',
  dependencies: ['lucide-react'],
  css: ['@keyframes ui-shimmer', '@keyframes ui-fade-in', '@keyframes ui-bounce', '@keyframes ui-breathe', '@keyframes ui-scan'],
  tabs: ['Orbit', 'Dots', 'Pulse', 'Scan', 'Done'],
  tabsLabel: 'Variants',
  states: [
    { name: 'running', description: 'The mark animates, the label shimmers and the timer counts.' },
    { name: 'done', description: 'A check and "Done in 12.4s" (or your doneLabel).' },
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
    { name: 'startedAt', type: 'number', description: 'Start time in ms; shows the live timer and times "Done in".' },
  ],
  notes: [
    'role="status" announces the label and the done message; the ticking timer itself is hidden from screen readers.',
    'With reduced motion the marks hold still and the label stops shimmering.',
    'The timer updates ten times a second and stops when done or unmounted.',
  ],
};
