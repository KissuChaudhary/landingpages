import type { UiItem } from '../registry';

export const inlineRewrite: UiItem = {
  name: 'inline-rewrite',
  title: 'Inline rewrite',
  description: 'Drag a dial and the paragraph rewrites itself in place: shared words glide, the rest blur out and rise in.',
  summary:
    'Writing tools hand you a rewrite as a new block of text, and you read both to find what changed. Here a paragraph sits under a dial of versions: Shorter, Original, Longer, or Blunt, Neutral, Warm. Drag the thumb and the paragraph changes in place as you cross each stop, word by word. Words both versions share glide to their new places, the ones that go blur out where they stood, and the new ones rise in one after another and glow for a moment, so you see exactly what moved. The box eases to its new height, the word count rolls and +added −cut against the original roll beside it. Versions you haven’t written yet are written the first time the dial settles on them: a spinner opens in the thumb and a sheen runs over the paragraph until the new words arrive.',
  file: 'inline-rewrite.tsx',
  dependencies: [],
  registryDependencies: ['number-roll', 'text-morph'],
  css: ['@keyframes ui-sheen'],
  tabs: ['Length', 'Tone'],
  states: [
    { name: 'drag', description: 'The thumb follows the pointer (no easing); crossing a stop swaps the version straight away and morphs the thumb’s label. Release and it settles on the nearest stop (420ms, a slight overshoot).' },
    { name: 'rewrite', description: 'Shared words glide from their old place (FLIP, 480ms); new words rise 0.35em out of a 4px blur, 14ms apart, and glow for 1.8s; words that go blur out and lift (240ms); the paragraph’s height eases (480ms).' },
    { name: 'writing', description: 'A version without text, once the dial settles on it: a spinner opens in the thumb, "Rewriting" morphs in and a sheen sweeps the paragraph until onRewrite resolves.' },
    { name: 'counts', description: 'The word count and +added −cut against the original roll; on the original itself the counts crossfade to "Original".' },
    { name: 'failed', description: 'onRewrite threw: the thumb goes back to the version on screen and "Couldn’t rewrite it" shows for 4 seconds.' },
  ],
  usage: `import { InlineRewrite } from "@/components/inline-rewrite";

<InlineRewrite
  label="Length"
  defaultValue={1}
  versions={[
    { label: "Shorter", text: short },
    { label: "Original", text: original },
    { label: "Longer", text: long },
  ]}
/>`,
  recipeTitle: 'With a model writing the versions',
  recipeIntro: 'Give only the original; each other stop is written the first time someone lands on it, then kept.',
  recipe: `"use client";
import { InlineRewrite } from "@/components/inline-rewrite";

export function ToneDial({ draft }: { draft: string }) {
  return (
    <InlineRewrite
      label="Tone"
      defaultValue={1}
      versions={[{ label: "Blunt" }, { label: "Neutral", text: draft }, { label: "Warm" }, { label: "Playful" }]}
      onRewrite={async ({ label, original, signal }) => {
        const res = await fetch("/api/rewrite", {
          method: "POST",
          body: JSON.stringify({ text: original, tone: label }),
          signal,
        });
        if (!res.ok) throw new Error("rewrite failed");
        return (await res.json()).text;
      }}
    />
  );
}`,
  props: [
    { name: 'versions', type: '{ label: string; text?: string }[]', description: 'The dial’s stops in order. Leave text out to have onRewrite write it.' },
    { name: 'value / defaultValue / onValueChange', type: 'number', default: '0', description: 'The chosen version’s index; controlled or not. Changes as the thumb crosses each stop.' },
    { name: 'onRewrite', type: '({ index, label, current, original, signal }) => Promise<string>', description: 'Writes a version that has no text, once the dial settles on it. The result is kept; throw to show it failed.' },
    { name: 'originalIndex', type: 'number', description: 'The version the +added and −cut counts compare against. Defaults to the one chosen first.' },
    { name: 'label', type: 'string', default: '"Rewrite"', description: 'The dial’s accessible name, e.g. "Length" or "Tone".' },
    { name: 'highlight', type: 'boolean', default: 'true', description: 'Let new words glow for a moment after each rewrite.' },
  ],
  notes: [
    'The dial is a slider: arrow keys step through the versions, Home and End go to the ends, and it reads its version’s name as its value.',
    'Words match exactly, punctuation and case included, so "fresh" and "Fresh" swap rather than glide.',
    'The paragraph is real text you can select and copy; the words on their way out are hidden from assistive tech, and a polite status says which version is showing and how many words it has.',
    'Dragging only writes versions once you let go, so sweeping across the dial doesn’t fire a request at every stop.',
    'Installs Number roll and Text morph. With reduced motion the words change in place and the thumb jumps to its stop.',
  ],
};
