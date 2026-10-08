import type { UiItem } from '../registry';

export const toolCall: UiItem = {
  name: 'tool-call',
  title: 'Tool call',
  description: 'One tool invocation from arguments to result: preparing, running, done, failed or denied.',
  summary:
    'The card an agent shows when it calls a tool. Arguments fill in as the model writes them, a spinner marks the run, and the finished call reports how long it took with its result folded underneath. Failures open themselves with the reason and a retry. Arguments read as fields, not raw JSON, and you can render any result your own way.',
  group: 'working',
  file: 'tool-call.tsx',
  dependencies: ['lucide-react'],
  css: ['@keyframes ui-shimmer', '@keyframes ui-fade-up', '@keyframes ui-fade-in'],
  tabs: ['Live', 'Error', 'Denied', 'Custom output'],
  states: [
    { name: 'preparing', description: 'The model is still writing the arguments; they appear field by field.' },
    { name: 'running', description: 'Arguments complete; the tool is executing.' },
    { name: 'done', description: 'A check and the duration; the result folds open under Output.' },
    { name: 'error', description: '"Failed" in red; the card opens itself once to show the reason and a Retry.' },
    { name: 'denied', description: 'The user declined, so it didn’t run.' },
  ],
  usage: `import { ToolCall } from "@/components/tool-call";

<ToolCall
  name="search_flights"
  title="Search flights"
  status="done"
  duration={1240}
  input={{ from: "BLR", to: "LIS", date: "2026-11-02" }}
  output={{ cheapest: "€412", airline: "TAP" }}
/>`,
  recipe: `import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { ToolCall, type ToolCallStatus } from "@/components/tool-call";

type ToolPart = Extract<UIMessage["parts"][number], { toolCallId: string }>;

function toolStatus(part: ToolPart): ToolCallStatus {
  switch (part.state) {
    case "input-streaming": return "preparing";
    case "input-available": return "running";
    case "output-available": return "done";
    case "output-error": return "error";
    case "approval-responded": return part.approval.approved ? "running" : "denied";
    default: return "denied"; // output-denied (show approval-requested with ApprovalCard)
  }
}

function ToolCalls({ message }: { message: UIMessage }) {
  return message.parts.map((part) =>
    "toolCallId" in part && part.state !== "approval-requested" ? (
      <ToolCall
        key={part.toolCallId}
        name={part.type === "dynamic-tool" ? part.toolName : part.type.replace(/^tool-/, "")}
        status={toolStatus(part)}
        input={part.input}
        output={part.state === "output-available" ? part.output : undefined}
        errorText={part.state === "output-error" ? part.errorText : undefined}
      />
    ) : null
  );
}`,
  props: [
    { name: 'name / title', type: 'string', description: 'The tool’s name as the model calls it, and an optional human label.' },
    { name: 'status', type: '"preparing" | "running" | "done" | "error" | "denied"', description: 'Where the call is.' },
    { name: 'input', type: 'unknown', description: 'Arguments, possibly partial while preparing. Objects render as fields.' },
    { name: 'output / renderOutput', type: 'unknown / (output) => ReactNode', description: 'The result, shown as fields or JSON, or rendered your way.' },
    { name: 'errorText / onRetry', type: 'string / () => void', description: 'Why it failed, and a Retry button.' },
    { name: 'duration', type: 'number', description: 'Run time in ms, shown when done.' },
    { name: 'icon', type: 'ReactNode', default: 'wrench', description: 'An icon for the tool.' },
    { name: 'open / defaultOpen / onOpenChange', type: 'boolean / boolean / (open) => void', default: 'false', description: 'Control the details panel.' },
  ],
  notes: [
    'The header is a button with aria-expanded; the status badge is announced politely as it changes.',
    'Collapsed details are inert, so a folded card can’t trap focus.',
    'Long values wrap and nested objects show as compact JSON, so wide arguments never break the layout.',
    'With reduced motion the shimmer, spinner and entrance stop.',
  ],
};
