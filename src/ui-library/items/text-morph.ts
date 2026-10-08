import type { UiItem } from '../registry';

export const textMorph: UiItem = {
  name: 'text-morph',
  title: 'Text morph',
  description: 'Text that changes the way it should: shared letters slide over, new ones rise out of a blur, the width eases.',
  summary:
    'Most interfaces swap text in one frame: "Save" is simply replaced by "Saved". Here the letters both words share stay alive and slide to their new places, new letters rise in out of a soft blur one after another, and the ones that leave lift away where they stood. The box eases to its new width, so the button or pill around it resizes in the same motion. Words with little in common crossfade as a whole instead of flinging single letters across. Use it for any label that changes.',
  file: 'text-morph.tsx',
  dependencies: [],
  css: [],
  tabs: ['Labels', 'Headline'],
  states: [
    { name: 'shared letters', description: '"Save" → "Saving" keeps "Sav" and glides it; only "ing" is new.' },
    { name: 'new letters', description: 'Rise 0.35em out of a 4px blur, 16ms apart, easing out over 460ms.' },
    { name: 'leaving letters', description: 'Lift the other way and blur out where they stood, in 60% of the time.' },
    { name: 'width', description: 'The box eases from its old width to its new one, carrying its container with it.' },
    { name: 'unrelated words', description: 'With less than half their letters in common, the texts crossfade as a whole.' },
  ],
  usage: `import { TextMorph } from "@/components/text-morph";

<button>
  <TextMorph>{saved ? "Saved" : "Save"}</TextMorph>
</button>`,
  recipeTitle: 'In a headline',
  recipeIntro: 'Morph one word inside a sentence; the sentence reflows around it smoothly.',
  recipe: `"use client";
import { useEffect, useState } from "react";
import { TextMorph } from "@/components/text-morph";

const audiences = ["founders", "designers", "agencies"];

export function Headline() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setI((n) => (n + 1) % audiences.length), 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <h1 className="text-5xl font-medium tracking-tight">
      Landing pages for <TextMorph className="text-primary">{audiences[i]}</TextMorph>
    </h1>
  );
}`,
  props: [
    { name: 'children', type: 'string', description: 'The text. Change it and it morphs.' },
    { name: 'duration', type: 'number', default: '460', description: 'Morph time in ms.' },
    { name: 'direction', type: '"up" | "down"', default: '"up"', description: 'New letters rise from below ("up") or drop from above ("down").' },
    { name: 'animateWidth', type: 'boolean', default: 'true', description: 'Ease the width; turn off for text that wraps over several lines.' },
  ],
  notes: [
    'The real text is in the page for screen readers and search; the moving letters are hidden from assistive tech.',
    'Words never break mid-word: letters are grouped by word, so lines only wrap at spaces. While the width eases, the words hold to one line, so "Credits left" never wraps halfway into "No credits left".',
    'Uses the Web Animations API, with no animation library. Interrupting a morph mid-flight continues smoothly from where the letters are.',
    'With reduced motion the text changes in place.',
  ],
};
