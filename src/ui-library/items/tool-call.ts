import type { UiItem } from '../registry';

export const toolCall: UiItem = {
  name: 'tool-call',
  title: 'Tool call',
  description: 'One tool invocation from arguments to result: preparing, running, done, failed or denied.',
  summary:
    'The card an agent shows when it calls a tool. Arguments fill in as the model writes them and the panel eases taller with each one. The status is one pill that never swaps out: "Preparing" carries a sweep of light, a spinner opens in as it morphs to "Running", then the spinner blurs into a check that draws itself while the run time rolls up from zero and the result rises in. Failures open themselves with the reason and a retry. Arguments read as fields, not raw JSON, and you can render any result your own way.',
  file: 'tool-call.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['number-roll', 'text-morph'],
  css: ['@keyframes ui-sheen', '@keyframes ui-fade-up'],
  tabs: ['Live', 'Error', 'Denied', 'Custom output'],
  states: [
    { name: 'preparing', description: 'A 1.4s sweep of light crosses "Preparing" while the arguments arrive field by field; the panel eases to each new height over 420ms.' },
    { name: 'running', description: 'The icon slot opens (380ms) with a spinner and the label morphs to "Running". The spinner only spins in this state.' },
    { name: 'done', description: 'The spinner blurs out as an emerald check draws itself (420ms), the label lifts away and the run time rolls up from zero ("1.2s"); the output rises in as the panel eases to fit.' },
    { name: 'error', description: 'An alert icon and "Failed" in red; the card opens itself once to show the reason and a Retry.' },
    { name: 'denied', description: 'A ban icon and "Denied": the user declined, so it didn’t run.' },
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
    'The header is a button with aria-expanded; the status badge is announced politely as it changes, and the run time is real text behind the rolling digits.',
    'Collapsed details are inert, so a folded card can’t trap focus.',
    'Long values wrap and nested objects show as compact JSON, so wide arguments never break the layout.',
    'Installs Number roll and Text morph. With reduced motion the sweep, spinner, rolls and slides stop; states change in place.',
  ],
};
