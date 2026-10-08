import type { UiItem } from '../registry';

export const selectionActions: UiItem = {
  name: 'selection-actions',
  title: 'Selection actions',
  description: 'Select text and a pill appears under it. Pick an action or describe an edit, and the rewrite streams in place.',
  summary:
    'The fastest way to edit part of a document is to point at it. Select text and a single pill attaches under the last selected line, centred on the selection. It holds a field for your own instruction, the actions you use most, and more behind the chevron. When you start typing, the actions fold away and the field takes their room. The rewrite then streams into the selection itself, and the pill morphs into Keep, Discard and try again: its width eases to each set of controls while they rise out of a light blur.',
  file: 'selection-actions.tsx',
  dependencies: ['lucide-react'],
  css: ['@keyframes ui-shimmer', '@keyframes ui-fade-in', '@keyframes ui-pop-in', '@layer base'],
  states: [
    { name: 'open', description: 'Under the selection’s last line: "Describe edits", your actions, and the chevron for more.' },
    { name: 'expanded', description: 'The field folds away and the extra actions slide in; the chevron turns.' },
    { name: 'typing', description: 'The actions fold away, the field grows into their space and a send button appears.' },
    { name: 'thinking', description: 'The selection dims slightly; a spinner and "Improving…" shimmer until the first words arrive.' },
    { name: 'streaming', description: 'The rewrite replaces the selection word by word; the pill follows its last line.' },
    { name: 'result', description: 'The pill eases to its new width as Keep (focused, so Enter accepts), Discard and try again blur in.' },
    { name: 'error', description: '"That didn’t work" with Try again; the original text is untouched.' },
  ],
  usage: `import { SelectionActions } from "@/components/selection-actions";
import { Sparkles, Scissors } from "lucide-react";

<SelectionActions
  value={note}
  onValueChange={setNote}
  actions={[{ id: "improve", label: "Improve", icon: <Sparkles />, pendingLabel: "Improving" }]}
  more={[{ id: "shorten", label: "Shorten", icon: <Scissors />, pendingLabel: "Shortening" }]}
  onAction={rewrite} // returns a string, a promise, or an async iterable of chunks
/>`,
  recipe: `// app/api/edit/route.ts
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

const tasks: Record<string, string> = { improve: "Improve the writing", shorten: "Make it shorter" };

export async function POST(req: Request) {
  const { id, text, instruction, before, after } = await req.json();
  const result = streamText({
    model: openai("gpt-4.1-mini"),
    system: "You rewrite one passage of a document. Reply with the rewritten passage only.",
    prompt: \`\${instruction ?? tasks[id]}.\\n\\nBefore: \${before.slice(-400)}\\nPassage: \${text}\\nAfter: \${after.slice(0, 400)}\`,
  });
  return result.toTextStreamResponse();
}

// The editor: stream the response body straight into the selection
"use client";
import { SelectionActions, type SelectionRequest } from "@/components/selection-actions";

async function* rewrite({ signal, ...request }: SelectionRequest) {
  const res = await fetch("/api/edit", { method: "POST", body: JSON.stringify(request), signal });
  if (!res.ok || !res.body) throw new Error(res.statusText); // the pill offers Try again
  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) return;
    yield value;
  }
}

export function Note({ note, setNote }: { note: string; setNote: (note: string) => void }) {
  return (
    <SelectionActions
      value={note}
      onValueChange={setNote}
      actions={[{ id: "improve", label: "Improve", pendingLabel: "Improving" }]}
      more={[{ id: "shorten", label: "Shorten", pendingLabel: "Shortening" }]}
      onAction={rewrite}
    />
  );
}`,
  props: [
    { name: 'value / onValueChange', type: 'string / (value: string) => void', description: 'The text, rendered with its line breaks. Keep calls onValueChange with the rewrite in place.' },
    { name: 'actions', type: '{ id; label; icon?; pendingLabel? }[]', description: 'Always visible. pendingLabel is shown while it runs, e.g. "Shortening".' },
    { name: 'more', type: 'SelectionAction[]', description: 'Behind the chevron. Without them there is no chevron.' },
    { name: 'onAction', type: '(request) => string | Promise<string | void> | AsyncIterable<string> | void', description: 'Gets id ("custom" for typed edits), text, instruction, before, after and an AbortSignal. Return chunks to stream, nothing for actions handled elsewhere, or throw to show Try again.' },
    { name: 'placeholder', type: 'string', default: '"Describe edits"', description: 'The instruction field’s placeholder and label.' },
  ],
  notes: [
    'role="toolbar" with labelled buttons; arrow keys move between them. Progress, the finished rewrite and failures are announced.',
    'Escape steps back: it stops a rewrite (keeping what streamed for review), discards a result, or closes the pill.',
    'Clicking the pill keeps the text selected, and the CSS Custom Highlight API keeps it marked while you type (the ::highlight(ui-selection) rule is added for you).',
    'Stop and Discard abort the request through the signal, so the model stops generating too.',
    'With reduced motion, the glide, folds and width morph are instant.',
  ],
};
