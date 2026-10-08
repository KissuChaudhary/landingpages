import type { UiItem } from '../registry';

export const diffReview: UiItem = {
  name: 'diff-review',
  title: 'Diff review',
  description: 'Accept or reject what the AI changed, word by word for prose or line by line for code.',
  summary:
    'When an AI edits your work, you should see exactly what it touched and keep the final say. Give it each change’s before and after: it works out the difference itself, striking removed words in red and marking added ones in green. Accept or reject one at a time or all at once, undo either, and get a single callback when nothing is left to review.',
  file: 'diff-review.tsx',
  dependencies: ['lucide-react'],
  css: ['@keyframes ui-fade-in'],
  tabs: ['Text', 'Code'],
  states: [
    { name: 'pending', description: 'The change inline with Reject and Accept; the header counts what’s left to review.' },
    { name: 'accepted', description: 'Shows the new text, marked Accepted, with Undo.' },
    { name: 'rejected', description: 'Keeps the original in muted text, marked Rejected, with Undo.' },
    { name: 'done', description: '"2 of 3 accepted"; onComplete fires with every decision.' },
  ],
  usage: `import { DiffReview } from "@/components/diff-review";

<DiffReview
  changes={[{ id: "intro", label: "Paragraph 1", before: draft, after: edited }]}
  onComplete={(decisions) => apply(decisions)}
/>`,
  recipe: `// Server: a tool with no execute; the user's decisions become its output
import { tool } from "ai";
import { z } from "zod";

const suggestEdits = tool({
  description: "Propose edits to the user's document for them to review",
  inputSchema: z.object({
    changes: z.array(z.object({ id: z.string(), label: z.string(), before: z.string(), after: z.string() })),
  }),
});

// Client: in your message list. Set sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls
// on useChat so the model continues once the decisions are sent.
const { addToolOutput } = useChat();

if (part.type === "tool-suggestEdits" && (part.state === "input-available" || part.state === "output-available")) {
  return (
    <DiffReview
      changes={part.input.changes}
      decisions={part.state === "output-available" ? part.output : undefined}
      readOnly={part.state === "output-available"}
      onComplete={(decisions) => addToolOutput({ tool: "suggestEdits", toolCallId: part.toolCallId, output: decisions })}
    />
  );
}`,
  props: [
    { name: 'changes', type: '{ id; before; after; label? }[]', description: 'Each change; the label says where it is, like a paragraph or file name.' },
    { name: 'mode', type: '"words" | "lines"', default: '"words"', description: 'Compare word by word (prose) or line by line (code).' },
    { name: 'decisions / defaultDecisions', type: 'Record<id, "pending" | "accepted" | "rejected">', description: 'Controlled or initial decisions; missing ids are pending.' },
    { name: 'onDecisionsChange', type: '(decisions) => void', description: 'Every decision after a change, in one call even for Accept all.' },
    { name: 'onDecisionChange', type: '(id, decision) => void', description: 'Each individual decision, including Undo back to pending.' },
    { name: 'onComplete', type: '(decisions) => void', description: 'Called when the last pending change gets a decision.' },
    { name: 'readOnly', type: 'boolean', default: 'false', description: 'Shows decisions without Undo or buttons, e.g. once they’ve been sent.' },
    { name: 'title', type: 'string', default: '"Suggested changes"', description: 'The header.' },
  ],
  notes: [
    'Removed and added words are real <del> and <ins>, and code lines carry "(added)" or "(removed)" for screen readers.',
    'Colour is never the only signal: removed text is struck through, and code lines have + and − gutters.',
    'Each button names its change ("Accept Paragraph 2"), and the count is announced as decisions are made.',
    'The diff is a longest-common-subsequence over words or lines; very large inputs fall back to a full replace.',
  ],
};
