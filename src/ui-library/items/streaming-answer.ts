import type { UiItem } from '../registry';

export const streamingAnswer: UiItem = {
  name: 'streaming-answer',
  title: 'Streaming answer',
  description: 'An answer as it arrives, with inline citations, actions, sources and follow-ups.',
  summary:
    'Renders whatever your stream has delivered so far. Only the words that just arrived fade in, citations land as small chips inside the sentence, and finished paragraphs don’t re-render while the last one grows. It knows when it was stopped or interrupted, and takes your own Markdown renderer when you need one. Underneath, the actions answer back: Copy blurs into a check that draws itself, a thumb fills in with a small thrown pop, and the sources count rolls as more arrive.',
  file: 'streaming-answer.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['number-roll'],
  css: ['@keyframes ui-fade-up', '@keyframes ui-fade-in', '@keyframes ui-blink'],
  tabs: ['Streaming', 'Stopped', 'Error'],
  tabsLabel: 'States',
  states: [
    { name: 'streaming', description: 'Caret at the end; new words fade in; the paragraph is aria-busy.' },
    { name: 'done', description: 'Plain, selectable text; actions enabled. Copy shrinks away through a blur as a green check draws itself (380ms); a chosen thumb fills (220ms) with a 420ms thrown pop.' },
    { name: 'stopped', description: 'A quiet "Stopped" note when the user stopped generation.' },
    { name: 'error', description: '"The answer was interrupted." with a Retry button.' },
  ],
  usage: `import { StreamingText, AnswerActions, FollowUps } from "@/components/streaming-answer";

<StreamingText
  content={["Sales are up 23%.", { type: "citation", label: "scoopdata.io" }, " Margins beat vanilla."]}
  status="streaming"
/>
<AnswerActions className="mt-4" copyText={text} onRegenerate={retry} sources={sources} />
<FollowUps className="mt-4" items={["Which flavors sell best in winter"]} onSelect={ask} />

// Markdown: pass your renderer as children instead of content
<StreamingText status={status}>
  <ReactMarkdown>{text}</ReactMarkdown>
</StreamingText>`,
  recipe: `import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { StreamingText, AnswerActions } from "@/components/streaming-answer";

function Answer({ message, isLast }: { message: UIMessage; isLast: boolean }) {
  const { status, regenerate } = useChat();
  const text = message.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
  const sources = message.parts.filter((p) => p.type === "source-url");
  const live = isLast && status === "streaming";

  return (
    <>
      <StreamingText
        content={[text]}
        status={live ? "streaming" : isLast && status === "error" ? "error" : "done"}
        onRetry={() => regenerate()}
      />
      <AnswerActions
        className="mt-4"
        disabled={live}
        copyText={text}
        onRegenerate={() => regenerate({ messageId: message.id })}
        sources={sources.map((s) => ({ name: s.title ?? s.url, href: s.url }))}
      />
    </>
  );
}
// "stopped": useChat returns to "ready" after stop(), so remember which message you stopped
// and pass status="stopped" for it.`,
  props: [
    { name: 'StreamingText content', type: '(string | { type: "citation"; label; href? })[]', description: 'The answer so far. Blank lines start new paragraphs.' },
    { name: 'StreamingText status', type: '"streaming" | "done" | "stopped" | "error"', default: '"done"', description: 'Caret while streaming; notes for stopped and error.' },
    { name: 'StreamingText onRetry / children', type: '() => void / ReactNode', description: 'Retry button on error; your own renderer (e.g. Markdown) instead of content.' },
    { name: 'AnswerActions copyText / onRegenerate', type: 'string / () => void', description: 'Copy button (omit to hide) and regenerate button.' },
    { name: 'AnswerActions feedback / defaultFeedback / onFeedback', type: '"up" | "down" | null', description: 'Thumbs up or down; controlled so you can restore it from your database.' },
    { name: 'AnswerActions sources / onSourcesClick / disabled', type: 'AnswerSource[] / () => void / boolean', description: 'Source favicons or dots with a count; disable while streaming.' },
    { name: 'FollowUps items / onSelect', type: 'string[] / (item) => void', description: 'Suggested next questions.' },
  ],
  notes: [
    'Words keep a stable key, so only new words mount and fade in; the answer is ordinary text for copying and screen readers.',
    'Finished paragraphs are memoised, so long answers stay smooth while streaming.',
    'Every icon button has a label and the feedback buttons use aria-pressed; "Copied" is announced from a status region beside them.',
    'Installs Number roll. With reduced motion, words and citations appear without fading, the caret stops blinking and the actions change in place.',
  ],
};
