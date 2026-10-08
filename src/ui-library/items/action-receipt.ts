import type { UiItem } from '../registry';

export const actionReceipt: UiItem = {
  name: 'action-receipt',
  title: 'Action receipts',
  description: 'What the agent actually did, one quiet line each, with Undo while a ring drains. Several stack into one.',
  summary:
    'Agents that act on people’s behalf need to show their work and offer a way back. Each action your tools perform becomes a quiet line: what happened and where, with Undo and a small ring that drains while the window is open. Undo is one button that never gets swapped out: the ring blurs into a spinner as it morphs to "Undoing", then a strike draws itself across the line and it settles on "Undone". When the window closes, Undo folds away. Failures say why and offer Retry. From three actions on, they fold into "4 actions · Undo all", whose counts roll as things change.',
  file: 'action-receipt.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['number-roll', 'text-morph'],
  css: ['@keyframes ui-fade-up', '@keyframes ui-drain'],
  tabs: ['Live', 'Stacked', 'Failed'],
  states: [
    { name: 'done', description: 'Icon, what happened and where. Undo with a ring that drains until undoUntil, then Undo folds away (420ms).' },
    { name: 'undoing', description: 'The ring blurs into a spinner and "Undo" morphs to "Undoing" while your onUndo promise runs.' },
    { name: 'undone', description: 'A strike draws itself across the title (480ms) as it fades to muted; the button settles on "Undone".' },
    { name: 'failed', description: 'The icon swaps to a red cross, the reason replaces the detail, and the button reads Retry.' },
    { name: 'stacked', description: 'From stackFrom actions: overlapping icons and "4 actions · 1 undone", where counts roll and parts open in as they apply. Undo all spins and morphs to "Undoing all" while it runs.' },
  ],
  usage: `import { ActionReceipts } from "@/components/action-receipt";

<ActionReceipts
  actions={[{ id: "evt_1", title: "Added “Soft launch” to Saturday", detail: "Calendar · 9:00 am", undoUntil: Date.now() + 10_000 }]}
  onUndo={(id) => undoAction(id)}
/>`,
  recipe: `// Server: tools return a receipt, including how long they can be undone
const addEvent = tool({
  description: "Add an event to the user's calendar",
  inputSchema: z.object({ title: z.string(), start: z.string() }),
  execute: async ({ title, start }) => {
    const event = await calendar.create({ title, start });
    return { id: event.id, title: \`Added “\${title}” to \${formatDay(start)}\`, detail: "Calendar", undoUntil: Date.now() + 10_000 };
  },
});

// Client: every finished tool call in the message becomes a receipt
import type { UIMessage } from "ai";
import { ActionReceipts, type Receipt } from "@/components/action-receipt";

function Receipts({ message, undone }: { message: UIMessage; undone: Set<string> }) {
  const actions: Receipt[] = message.parts.flatMap((p) => {
    if (!p.type.startsWith("tool-") || !("state" in p)) return [];
    if (p.state === "output-error") return [{ id: p.toolCallId, title: "Couldn’t finish an action", status: "failed", error: p.errorText }];
    if (p.state !== "output-available") return [];
    const r = p.output as Receipt;
    return [{ ...r, status: undone.has(r.id) ? "undone" : "done" }];
  });
  if (!actions.length) return null;
  return <ActionReceipts actions={actions} onUndo={(id) => fetch(\`/api/undo/\${id}\`, { method: "POST" })} />;
}`,
  props: [
    { name: 'actions', type: '{ id; title; detail?; icon?; status?; error?; undoUntil? }[]', description: 'One per action. status is "done", "undoing", "undone" or "failed"; undoUntil (ms) enables Undo.' },
    { name: 'onUndo', type: '(id) => void | Promise<void>', description: 'Shows Undo while the window is open, with a spinner until the promise settles. Set the action’s status to "undone" after.' },
    { name: 'onUndoAll', type: '() => void | Promise<void>', description: 'For the stacked "Undo all"; defaults to calling onUndo for each undoable action.' },
    { name: 'onRetry', type: '(id) => void', description: 'Shows Retry on failed actions.' },
    { name: 'stackFrom', type: 'number', default: '3', description: 'Fold into a summary from this many actions; 0 never folds.' },
    { name: 'undoWindow', type: 'number', default: '10000', description: 'Length of the undo window (ms), so the ring drains at the right pace.' },
  ],
  notes: [
    'Undo buttons are labelled with the action ("Undo: Added “Soft launch” to Saturday"); undoing, undone and failures are announced.',
    'The ring drains with a CSS animation, so nothing re-renders every frame; Undo folds away exactly when the window closes, and the ring pauses once it has faded out.',
    'Installs Number roll and Text morph. With reduced motion, states change in place.',
    'Colour is never the only signal: failed lines show the reason, and undone lines are struck through and labelled.',
    'Always enforce the undo window on the server too; the ring only shows it.',
  ],
};
