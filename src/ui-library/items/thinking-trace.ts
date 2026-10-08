import type { UiItem } from '../registry';

export const thinkingTrace: UiItem = {
  name: 'thinking-trace',
  title: 'Thinking trace',
  description: 'An expandable record of what an agent did: steps, reasoning, search or tool calls.',
  summary:
    'Shows an agent at work and keeps the record afterwards. While it runs a light sweeps across the header and the seconds roll up beside it; rows arrive as your stream reports them and the list eases taller to make room. Each step’s spinner blurs into a check that draws itself. When it settles the header doesn’t swap, it morphs: "Thinking 6s" becomes "Thought for 6s", "Searching the web" becomes "Searched the web", and the trace folds into that one line. On error the sparkle turns into an alert and it stays open so the failed step is visible.',
  file: 'thinking-trace.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['number-roll', 'text-morph'],
  css: ['@keyframes ui-sheen', '@keyframes ui-fade-up', '@keyframes ui-fade-in'],
  tabs: ['Steps', 'Reasoning', 'Search', 'Tools', 'Error'],
  tabsLabel: 'Examples',
  states: [
    { name: 'running', description: 'A 1.4s sweep of light crosses the header and its seconds roll up once a second; the trace is open, the live step spins and the list eases to each new height (420ms).' },
    { name: 'done', description: 'The header morphs to a summary, "Thought for 6s" (the timer stays as the answer) or "Ran 3 tools" (the timer folds away), and the trace folds shut 900ms later. The last spinner blurs into a check that draws itself.' },
    { name: 'error', description: 'The sparkle blurs into a red alert and the header morphs to "Couldn’t finish"; it stays open with the failed step’s mark turned to a red cross and "Failed" opening beside it.' },
    { name: 'cancelled', description: '"Stopped", for when the user stops the agent.' },
    { name: 'step: pending / running / done / error', description: 'Each row can carry its own status, e.g. a queued step or one tool call that failed.' },
  ],
  usage: `import { ThinkingTrace } from "@/components/thinking-trace";

<ThinkingTrace
  variant="tools"
  status="running"
  startedAt={startedAt}
  steps={[
    { label: "Read", detail: "flavors.ts" },
    { label: "Edit", detail: "ChurnSchedule.tsx", additions: 74, deletions: 41 },
    { label: "Run", detail: "npm run freeze", status: "running" },
  ]}
/>`,
  recipe: `import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { ThinkingTrace } from "@/components/thinking-trace";

type Part = UIMessage["parts"][number];
type Reasoning = Extract<Part, { type: "reasoning" }>;

// Render a reasoning part as a trace of sentences.
function ReasoningTrace({ part, failed }: { part: Reasoning; failed: boolean }) {
  return (
    <ThinkingTrace
      variant="reasoning"
      status={failed ? "error" : part.state === "streaming" ? "running" : "done"}
      steps={part.text.split(/(?<=[.!?])\\s+/).filter(Boolean).map((label) => ({ label }))}
    />
  );
}

// Render the sources an answer used as a search trace.
function SourcesTrace({ message, streaming }: { message: UIMessage; streaming: boolean }) {
  const sources = message.parts.filter((p) => p.type === "source-url");
  return (
    <ThinkingTrace
      variant="search"
      status={streaming ? "running" : "done"}
      steps={sources.map((s) => ({ label: s.title ?? s.url, detail: new URL(s.url).hostname, href: s.url }))}
    />
  );
}`,
  props: [
    { name: 'steps', type: 'ThinkingStep[]', description: 'Rows so far: label, plus optional detail, href, icon, status, additions and deletions.' },
    { name: 'variant', type: '"steps" | "reasoning" | "search" | "tools"', default: '"steps"', description: 'How the rows are drawn.' },
    { name: 'status', type: '"running" | "done" | "error" | "cancelled"', default: '"done"', description: 'The state of the whole trace.' },
    { name: 'startedAt', type: 'number', description: 'Start time in ms. Shows a live timer and times the done label.' },
    { name: 'duration', type: 'number', description: 'How long it took in ms, if your stream reports it.' },
    { name: 'label / doneLabel', type: 'string', description: 'Override the running and settled headers.' },
    { name: 'query', type: 'string', description: 'Search query shown above the sources.' },
    { name: 'more', type: 'number', description: 'Shows "+N more" under the rows.' },
    { name: 'open / defaultOpen / onOpenChange', type: 'boolean / boolean / (open) => void', description: 'Control the expanded state yourself, or leave it automatic.' },
    { name: 'onStepClick', type: '(step, index) => void', description: 'Makes rows without an href clickable, e.g. to show a tool’s output.' },
  ],
  notes: [
    'The header is a button with aria-expanded. A status region beside it announces the label and then the summary ("Thought for 6s"), never the ticking timer.',
    'Collapsed rows are inert, so links inside a folded trace can’t be tabbed to.',
    'Installs Number roll and Text morph. With reduced motion the sweep, spinners, rolls and row entrances stop; the trace still opens and closes.',
    'Long labels and file paths truncate instead of wrapping.',
  ],
};
