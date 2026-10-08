import type { UiItem } from '../registry';

export const responseVersions: UiItem = {
  name: 'response-versions',
  title: 'Response versions',
  description: 'Step between regenerated answers with "2 / 3", and regenerate without losing the old ones.',
  summary:
    'Regenerating shouldn’t throw away an answer you half liked. Wrap the answer and this adds a small pager under it. Each step sends the answer you leave out one way through a blur while the next comes in from the other side, the height eases between them and "2 / 3" rolls. Regenerate blurs into a spinner while the new version is written, and the count rolls up when it lands.',
  file: 'response-versions.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['number-roll'],
  css: [],
  states: [
    { name: 'single', description: 'One version: the arrows are disabled and only Regenerate is live.' },
    { name: 'browsing', description: 'The old answer leaves 24px toward where you came from (260ms) as the new one arrives from the side you stepped toward (420ms); the height eases between them and the counter rolls.' },
    { name: 'regenerating', description: 'The arrow blurs into a spinner and Regenerate is disabled until the new version arrives; then "3 / 3" rolls up.' },
  ],
  usage: `import { ResponseVersions } from "@/components/response-versions";

<ResponseVersions count={versions.length} index={index} onIndexChange={setIndex} onRegenerate={regenerate} regenerating={busy}>
  <Markdown>{versions[index]}</Markdown>
</ResponseVersions>`,
  recipe: `import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import type { UIMessage } from "ai";
import { ResponseVersions } from "@/components/response-versions";

// regenerate() replaces the last answer, so keep the earlier ones yourself.
// Render with key={the user message's id} so versions start fresh each turn.
function LastAnswer() {
  const { messages, status, regenerate } = useChat();
  const [older, setOlder] = useState<UIMessage[]>([]);
  const [index, setIndex] = useState<number | null>(null);

  const last = messages.at(-1);
  const versions = last?.role === "assistant" ? [...older, last] : older;
  if (!versions.length) return null;
  const shown = Math.min(index ?? versions.length - 1, versions.length - 1);

  return (
    <ResponseVersions
      count={versions.length}
      index={shown}
      onIndexChange={setIndex}
      regenerating={status === "submitted" || status === "streaming"}
      onRegenerate={() => {
        if (last?.role === "assistant") setOlder((o) => [...o, last]);
        setIndex(null);
        regenerate();
      }}
    >
      {versions[shown].parts.map((part, i) => (part.type === "text" ? <p key={i}>{part.text}</p> : null))}
    </ResponseVersions>
  );
}`,
  props: [
    { name: 'count / index', type: 'number', description: 'How many versions, and which one is shown (zero-based).' },
    { name: 'onIndexChange', type: '(index: number) => void', description: 'Called by the arrows.' },
    { name: 'onRegenerate / regenerating', type: '() => void / boolean', description: 'Shows Regenerate, and a spinner while a version is written.' },
    { name: 'children', type: 'ReactNode', description: 'The content of the version shown.' },
  ],
  notes: [
    'The counter is announced politely as "Version 2 / 3".',
    'Arrows are real disabled buttons at either end, so they’re skipped by Tab.',
    'Installs Number roll. With reduced motion the content simply swaps and the counter changes in place.',
  ],
};
