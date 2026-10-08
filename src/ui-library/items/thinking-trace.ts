import type { UiItem } from '../registry';

export const thinkingTrace: UiItem = {
  name: 'thinking-trace',
  title: 'Thinking trace',
  description: 'An expandable record of what an agent did: steps, reasoning, search or tool calls.',
  summary:
    'Shows an agent at work and keeps the record afterwards. The header shimmers with a live timer while it runs, rows arrive as your stream reports them, and once it settles it folds into one line like "Thought for 6s". On error it stays open so the failed step is visible.',
  file: 'thinking-trace.tsx',
  dependencies: ['lucide-react'],
  css: ['@keyframes ui-shimmer', '@keyframes ui-fade-up', '@keyframes ui-fade-in'],
  tabs: ['Steps', 'Reasoning', 'Search', 'Tools', 'Error'],
  tabsLabel: 'Examples',
  states: [
    { name: 'running', description: 'Header shimmers with a live timer; the trace is open and the live step spins.' },
    { name: 'done', description: 'Settles to a summary such as "Thought for 6s" or "Ran 3 tools" and folds away.' },
    { name: 'error', description: '"Couldn’t finish" with a red mark; stays open with the failed step marked.' },
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
    'The header is a button with aria-expanded; the status text is announced politely as it changes.',
    'Collapsed rows are inert, so links inside a folded trace can’t be tabbed to.',
    'With reduced motion the shimmer, spinners and row entrances stop; the trace still opens and closes.',
    'Long labels and file paths truncate instead of wrapping.',
  ],
};
