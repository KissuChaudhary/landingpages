import type { UiItem } from '../registry';

export const diffReview: UiItem = {
  name: 'diff-review',
  title: 'Diff review',
  description: 'Accept or reject what the AI changed, word by word for prose or line by line for code.',
  summary:
    'When an AI edits your work, you should see exactly what it touched and keep the final say. Give it each change’s before and after: it works out the difference itself, striking removed words in red and marking added ones in green. Accepting doesn’t swap the diff for the result, the paragraph resolves in place: removed words shrink out of the sentence and the added ones lose their green, while Accept morphs into "Accepted" with a check that draws itself. Rejecting does the reverse. Accept or reject one at a time or all at once, undo either, watch the count roll, and get a single callback when nothing is left to review.',
  file: 'diff-review.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['number-roll', 'text-morph'],
  css: [],
  tabs: ['Text', 'Code'],
  states: [
    { name: 'pending', description: 'The change inline with Reject and Accept; the header counts what’s left to review, rolling as you go.' },
    { name: 'accepted', description: 'Removed words shrink out of the line (460ms) and added ones lose their tint; code lines that go fold shut. "Accept" morphs to "Accepted" as a green check draws itself, Reject folds away and Undo opens in.' },
    { name: 'rejected', description: 'The reverse: added words shrink away and the struck ones return as plain, muted text; "Reject" morphs to "Rejected".' },
    { name: 'done', description: '"3 to review" morphs to "2 of 3 accepted"; onComplete fires with every decision.' },
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
    'Each button names its change ("Accept Paragraph 2"), and the count is announced as decisions are made. Focus moves to Undo after a decision and back to the button after Undo, so keyboard users never lose their place.',
    'Words that have folded away are hidden from screen readers. Installs Number roll and Text morph; with reduced motion, decisions change the text in place.',
    'The diff is a longest-common-subsequence over words or lines; very large inputs fall back to a full replace.',
  ],
};
