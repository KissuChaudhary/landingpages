import type { UiItem } from '../registry';

export const plan: UiItem = {
  name: 'plan',
  title: 'Plan',
  description: 'An agent’s checklist that ticks itself off: pending, in progress, done, skipped or failed.',
  summary:
    'Shows what the agent intends to do and how far it has got. The task in progress is set in full weight, finished tasks fade back with a check that draws itself in, and a hairline under the header fills as work completes. When everything is settled it folds into "5 of 5 done"; if something failed it stays open so the reason is visible.',
  file: 'plan.tsx',
  dependencies: ['lucide-react'],
  css: ['@keyframes ui-draw', '@keyframes ui-fade-in'],
  tabs: ['Live', 'Failed', 'Settled'],
  states: [
    { name: 'pending', description: 'An empty ring; not started.' },
    { name: 'running', description: 'A spinner and full-weight label; the task being worked on.' },
    { name: 'done', description: 'A filled check that draws itself in; the label fades and is struck through.' },
    { name: 'skipped', description: 'A dash; no longer needed.' },
    { name: 'failed', description: 'A red mark with the reason underneath; the plan stays open.' },
    { name: 'settled', description: 'Every task finished: the header reads "N of N done" and the list folds away.' },
  ],
  usage: `import { Plan } from "@/components/plan";

<Plan
  tasks={[
    { label: "Pull last month’s sales", status: "done" },
    { label: "Compare flavors by margin", status: "running" },
    { label: "Draft the weekend special", status: "pending" },
  ]}
/>`,
  recipe: `// Server (inside createUIMessageStream): stream the plan as a data part.
// Writing the same id again updates it in place on the client.
writer.write({ type: "data-plan", id: "plan", data: { tasks } });

// Client
import type { UIMessage } from "ai";
import { Plan, type PlanTask } from "@/components/plan";

function MessagePlan({ message }: { message: UIMessage }) {
  const part = message.parts.find((p) => p.type === "data-plan");
  if (!part) return null;
  return <Plan tasks={(part.data as { tasks: PlanTask[] }).tasks} />;
}`,
  props: [
    { name: 'tasks', type: '{ id?; label; detail?; status }[]', description: 'The checklist. Status is "pending" | "running" | "done" | "skipped" | "failed".' },
    { name: 'title', type: 'string', default: '"Plan"', description: 'Header label.' },
    { name: 'collapseWhenDone', type: 'boolean', default: 'true', description: 'Fold into the summary once every task is settled.' },
    { name: 'open / defaultOpen / onOpenChange', type: 'boolean / boolean / (open) => void', default: 'true', description: 'Control it yourself; any click also stops the automatic folding.' },
  ],
  notes: [
    'It’s an ordered list; each task carries its status as text for screen readers, and the progress count is announced politely.',
    'The plan never folds itself away after the user has opened or closed it.',
    'With reduced motion the spinner and check animation stop; states still read clearly.',
  ],
};
