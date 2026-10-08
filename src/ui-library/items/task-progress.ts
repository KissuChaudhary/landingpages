import type { UiItem } from '../registry';

export const taskProgress: UiItem = {
  name: 'task-progress',
  title: 'Task progress',
  description: 'For work that takes minutes: phases, a live timer, stats, cancel, and the result when it’s done.',
  summary:
    'Deep research, long builds and batch jobs need more than a spinner. Phases fill left to right with the current one sweeping, a timer and live stats show it’s moving, and a line tells people they can leave. When it finishes it says how long it took and offers the result; failures say where they stopped.',
  file: 'task-progress.tsx',
  dependencies: ['lucide-react'],
  css: ['@keyframes ui-scan', '@keyframes ui-fade-in'],
  tabs: ['Live', 'Done', 'Error', 'Cancelled'],
  states: [
    { name: 'running', description: 'Finished phases filled, the current phase sweeping, timer, stats, message and Cancel.' },
    { name: 'done', description: 'All phases filled, "Finished in 4m 12s" and an action to open the result.' },
    { name: 'error', description: 'The failed phase in red, the reason, "Stopped at reading" and Retry.' },
    { name: 'cancelled', description: '"Cancelled after 1m 02s".' },
  ],
  usage: `import { TaskProgress } from "@/components/task-progress";

<TaskProgress
  title="Researching waffle cone suppliers"
  status="running"
  phases={["Searching", "Reading", "Writing"]}
  phase={1}
  startedAt={startedAt}
  stats={[{ label: "sources", value: 42 }, { label: "read", value: 12 }]}
  message="You can close this tab. We’ll keep going."
  onCancel={stop}
/>`,
  recipe: `// Server (inside createUIMessageStream): report progress as a data part with a fixed id,
// so each write updates the same card instead of adding a new one.
writer.write({ type: "data-research", id: "research", data: { phase: 1, sources: 42, read: 12 } });

// Client
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { TaskProgress } from "@/components/task-progress";

function Research({ message, startedAt }: { message: UIMessage; startedAt: number }) {
  const { status, stop } = useChat();
  const part = message.parts.find((p) => p.type === "data-research");
  if (!part) return null;
  const { phase, sources, read } = part.data as { phase: number; sources: number; read: number };
  return (
    <TaskProgress
      title="Deep research"
      status={status === "streaming" ? "running" : status === "error" ? "error" : "done"}
      phases={["Searching", "Reading", "Writing"]}
      phase={phase}
      startedAt={startedAt}
      stats={[{ label: "sources", value: sources }, { label: "read", value: read }]}
      onCancel={stop}
    />
  );
}`,
  props: [
    { name: 'title', type: 'string', description: 'What the task is doing.' },
    { name: 'status', type: '"running" | "done" | "error" | "cancelled"', description: 'Where the task is.' },
    { name: 'phases / phase', type: 'string[] / number', description: 'The stages and the index of the current one.' },
    { name: 'startedAt / duration', type: 'number', description: 'Start time for the live timer, or the total once known (ms).' },
    { name: 'stats', type: '{ label; value }[]', description: 'Live numbers, e.g. sources found and read.' },
    { name: 'message', type: 'string', description: 'A line while running, e.g. that it’s safe to leave.' },
    { name: 'onCancel / onOpen / openLabel', type: '() => void / () => void / string', default: '"Open result"', description: 'Cancel while running; open the result when done.' },
    { name: 'errorText / onRetry', type: 'string / () => void', description: 'Why it failed, and a Retry.' },
  ],
  notes: [
    'The current phase and the outcome are announced politely; the bars themselves are decorative.',
    'The timer ticks once a second and stops when the task settles or unmounts.',
    'With reduced motion the sweep stops; filled phases still show progress.',
  ],
};
