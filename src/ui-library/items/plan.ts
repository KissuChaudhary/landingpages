import type { UiItem } from '../registry';

export const plan: UiItem = {
  name: 'plan',
  title: 'Plan',
  description: 'An agent’s checklist that ticks itself off: pending, in progress, done, skipped or failed.',
  summary:
    'Shows what the agent intends to do and how far it has got. Each task’s mark changes in place: the ring becomes a spinner, the spinner blurs into a check that draws itself, and a strike-through draws across the label as it fades back. A hairline under the header fills as work completes and the count rolls. When everything is settled "done" slides in beside "5 of 5" and the plan folds into that line; if something failed the reason folds open and it stays open.',
  file: 'plan.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['number-roll'],
  css: [],
  tabs: ['Live', 'Failed', 'Settled'],
  states: [
    { name: 'pending', description: 'An empty ring; not started.' },
    { name: 'running', description: 'The ring blurs into a spinner and the label brightens; the task being worked on.' },
    { name: 'done', description: 'The spinner blurs out as a filled check draws itself (420ms); a strike-through draws across the label left to right (520ms) as it fades back. The count rolls.' },
    { name: 'skipped', description: 'A dash; no longer needed.' },
    { name: 'failed', description: 'A red mark swaps in and the reason folds open underneath; the plan stays open.' },
    { name: 'settled', description: 'Every task finished: "done" slides in after "5 of 5" and the list folds away 1.2s later.' },
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
    'Installs Number roll. With reduced motion the spinner, rolls, strikes and folds stop; states still read clearly.',
  ],
};
