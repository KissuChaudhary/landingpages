/**
 * The component library: one entry per installable component.
 *
 * The source of each component lives in src/ui-library/registry/<file>. The registry endpoint
 * (/r/<name>.json) and the docs pages (/ui/<name>) are both generated from this list and those files,
 * so the code people install is always the code shown on the site.
 */

export const UI_NAME = 'FounderDada UI';
export const UI_REGISTRY_NAME = 'founderdada';

export interface UiProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface UiItem {
  /** Registry name and URL slug. */
  name: string;
  title: string;
  /** One line, under the title. */
  description: string;
  /** A paragraph for the component page. */
  summary: string;
  /** File in src/ui-library/registry. */
  file: string;
  dependencies: string[];
  /** Demo variants shown as tabs in the preview. */
  variants?: string[];
  usage: string;
  props: UiProp[];
  notes: string[];
}

/** Keyframes the components use. Mirrored in src/app/globals.css for this site. */
export const UI_CSS = {
  '@keyframes ui-shimmer': {
    '0%': { 'background-position': '150% 0' },
    '100%': { 'background-position': '-50% 0' },
  },
  '@keyframes ui-fade-up': {
    from: { opacity: '0', transform: 'translateY(4px)' },
    to: { opacity: '1', transform: 'none' },
  },
  '@keyframes ui-fade-in': {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  '@keyframes ui-blink': {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0' },
  },
};

export const UI_ITEMS: UiItem[] = [
  {
    name: 'thinking-trace',
    title: 'Thinking trace',
    description: 'An expandable record of what an agent did: steps, reasoning, search or tool calls.',
    summary:
      'Shows an agent at work and keeps the record afterwards. The header shimmers while it runs, the trace opens and fills in as steps arrive, and once it settles it folds away into a single line that can be opened again.',
    file: 'thinking-trace.tsx',
    dependencies: ['lucide-react'],
    variants: ['Steps', 'Reasoning', 'Search', 'Tools'],
    usage: `import { ThinkingTrace } from "@/components/thinking-trace";

export function AgentStatus({ steps, done }) {
  return (
    <ThinkingTrace
      variant="search"
      status={done ? "done" : "running"}
      query="best waffle cone supplier"
      steps={steps} // [{ label: "Joy Cone", detail: "joycone.com", href: "https://joycone.com" }]
      more={7}
    />
  );
}`,
    props: [
      { name: 'steps', type: 'ThinkingStep[]', description: 'The rows so far: label, plus optional detail, href, additions and deletions.' },
      { name: 'variant', type: '"steps" | "reasoning" | "search" | "tools"', default: '"steps"', description: 'How the rows are drawn.' },
      { name: 'status', type: '"running" | "done"', default: '"done"', description: 'Running shimmers the header and keeps the trace open; done settles it and folds it away.' },
      { name: 'label', type: 'string', description: 'Header while running. Defaults per variant.' },
      { name: 'doneLabel', type: 'string', description: 'Header once done, e.g. "Thought for 4 seconds".' },
      { name: 'query', type: 'string', description: 'Search query shown above the sources.' },
      { name: 'more', type: 'number', description: 'Shows "+N more" under the rows.' },
      { name: 'open / defaultOpen / onOpenChange', type: 'boolean / boolean / (open) => void', description: 'Control the expanded state yourself, or leave it automatic.' },
      { name: 'onStepClick', type: '(step, index) => void', description: 'Makes rows without an href clickable, e.g. to show a tool’s output.' },
    ],
    notes: [
      'The header is a button with aria-expanded; the status text is announced politely as it changes.',
      'Collapsed rows are inert, so links inside a folded trace can’t be tabbed to.',
      'With reduced motion the shimmer, spinner and row entrances stop; the trace still opens and closes.',
      'Colours come from your theme: foreground, muted-foreground, border, accent and ring.',
    ],
  },
  {
    name: 'streaming-answer',
    title: 'Streaming answer',
    description: 'An answer as it arrives, with inline citations, actions, sources and follow-ups.',
    summary:
      'Renders whatever your stream has delivered so far. Only the words that just arrived fade in, citations land as small chips inside the sentence, and the answer stays plain, selectable text. Actions, a sources stack and follow-up questions sit underneath.',
    file: 'streaming-answer.tsx',
    dependencies: ['lucide-react'],
    usage: `import { StreamingText, AnswerActions, FollowUps } from "@/components/streaming-answer";

export function Answer({ content, streaming, sources }) {
  return (
    <div>
      <StreamingText
        content={content} // ["Sales are up 23%. ", { type: "citation", label: "scoopdata.io" }]
        streaming={streaming}
      />
      <AnswerActions className="mt-4" copyText="…" onRegenerate={retry} sources={sources} />
      <FollowUps className="mt-4" items={["Which flavors sell best in winter"]} onSelect={ask} />
    </div>
  );
}`,
    props: [
      { name: 'StreamingText content', type: '(string | { type: "citation"; label; href? })[]', description: 'The answer so far. Append as tokens arrive.' },
      { name: 'StreamingText streaming', type: 'boolean', default: 'false', description: 'Shows the caret and marks the paragraph aria-busy.' },
      { name: 'AnswerActions copyText', type: 'string', description: 'Copied to the clipboard by the copy button. Omit to hide it.' },
      { name: 'AnswerActions onRegenerate / onFeedback', type: '() => void / (value) => void', description: 'Regenerate button, and thumbs up or down (pressing again clears it).' },
      { name: 'AnswerActions sources / onSourcesClick', type: 'AnswerSource[] / () => void', description: 'The overlapping source dots and count, optionally clickable.' },
      { name: 'FollowUps items / onSelect', type: 'string[] / (item) => void', description: 'Suggested next questions.' },
    ],
    notes: [
      'Words keep a stable key, so only new words mount and fade in. The answer is ordinary text for copying and screen readers.',
      'The paragraph is aria-busy while streaming; every icon button has a label and the feedback buttons use aria-pressed.',
      'The copy confirmation clears itself and cleans up its timer on unmount.',
      'With reduced motion, words and citations appear without fading and the caret stops blinking.',
    ],
  },
];

export const getUiItem = (name: string) => UI_ITEMS.find((item) => item.name === name);
