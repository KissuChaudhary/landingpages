import type { UiItem } from '../registry';

export const codeBlock: UiItem = {
  name: 'code-block',
  title: 'Code block',
  description: 'Code in an answer: highlighted as it streams, copy and wrap, long files folded, and an optional Apply.',
  summary:
    'Code is where answers get used, so the block should read well mid-stream and be easy to take away. A light highlighter is built in, so lines are coloured the moment they arrive, with a caret at the end. The header carries the file name and language, a wrap toggle, and Copy: its icon blurs into a check that draws itself while the label morphs to "Copied". Long files that arrive complete show their start and "Show 42 more lines"; they open smoothly while the fade dissolves and the label becomes "Show less". Pass onApply and Apply runs your action in one motion, Applying with a spinner, then a drawn check as the button settles from blue into a quiet "Applied".',
  file: 'code-block.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['status-button', 'text-morph'],
  css: ['@keyframes ui-blink'],
  tabs: ['Streaming', 'Folded', 'Apply'],
  states: [
    { name: 'streaming', description: 'Lines arrive highlighted, with a blinking caret on the last one. Long code you watched stream stays open.' },
    { name: 'complete', description: 'File name and language, a wrap toggle, Copy. Line numbers stay put while you scroll sideways. Toggling wrap eases the block to its new height over 460ms.' },
    { name: 'copied', description: 'The copy icon shrinks away through a 3px blur as a check draws itself in 420ms; "Copy" morphs to "Copied", keeping the letters they share, for 1.6 seconds. A blocked clipboard shakes and says "Couldn’t copy".' },
    { name: 'folded', description: 'Code that arrives complete and runs past collapseAfter shows its start under a fade. "Show 42 more lines" opens it over 460ms while the fade dissolves and the label morphs to "Show less".' },
    { name: 'apply', description: 'Apply → Applying with a spinner while your promise runs → a drawn check and "Applied", as the button eases from your primary colour to a quiet receipt. A rejected promise shakes and offers "Try again". It waits at 40% opacity while code streams.' },
  ],
  usage: `import { CodeBlock } from "@/components/code-block";

<CodeBlock code={code} language="ts" filename="lib/queue.ts" streaming={isStreaming} />`,
  recipe: `"use client";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "@/components/code-block";

// Fenced code in the model's markdown becomes a CodeBlock, even mid-stream.
export function Answer({ text, streaming }: { text: string; streaming: boolean }) {
  return (
    <ReactMarkdown
      components={{
        pre: ({ children }) => <>{children}</>,
        code({ className, children }) {
          const language = /language-([\\w-]+)/.exec(className ?? "")?.[1];
          if (!language) return <code className="rounded bg-muted px-1 font-mono text-[0.9em]">{children}</code>;
          const code = String(children);
          // Only the block still being written gets the caret.
          return <CodeBlock code={code} language={language} streaming={streaming && text.trimEnd().endsWith(code.trimEnd())} />;
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

// With useChat: the last assistant message is streaming while status === "streaming".`,
  props: [
    { name: 'code', type: 'string', description: 'The code so far, or all of it.' },
    { name: 'language / filename', type: 'string', description: 'Shown in the header. The language also picks the comment style (// or #).' },
    { name: 'streaming', type: 'boolean', default: 'false', description: 'Shows the caret and keeps the block open.' },
    { name: 'lineNumbers', type: 'boolean', default: 'true', description: 'A sticky line-number gutter.' },
    { name: 'collapseAfter', type: 'number', default: '18', description: 'Fold complete code longer than this many lines; 0 never folds.' },
    { name: 'onApply / applyLabel', type: '() => void | Promise<void> / string', default: '— / "Apply"', description: 'Shows Apply, with progress while the promise runs and "Applied" after.' },
    { name: 'highlight', type: 'boolean', default: 'true', description: 'Turn the built-in highlighting off, e.g. for logs.' },
  ],
  notes: [
    'Highlighting runs per line with no dependencies, so it’s instant while streaming. For full grammars, render Shiki output yourself and keep this frame.',
    'Copy and Wrap are real buttons with labels; Wrap uses aria-pressed. "Copied" and "Applied" are announced from a status region beside each button. The code area is focusable when it scrolls sideways.',
    'Copy and Apply are Status buttons and the fold label is a Text morph; the CLI installs both. With reduced motion, states change in place.',
    'Line numbers are hidden from screen readers and from copy and paste.',
    'The colours follow GitHub’s light and dark palettes; the frame uses your theme’s border and background.',
  ],
};
