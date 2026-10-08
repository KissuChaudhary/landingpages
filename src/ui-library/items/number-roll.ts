import type { UiItem } from '../registry';

export const numberRoll: UiItem = {
  name: 'number-roll',
  title: 'Number roll',
  description: 'Numbers that change like an odometer: every digit rolls in the direction the number moved.',
  summary:
    'A number that jumps from one value to the next throws away the most satisfying moment on the page. Here each digit is its own column and rolls to its new value, the way the number actually moved: going up, a 9 rolls on to 0 rather than spinning back down. New places slide open from nothing and lost places fold away, so 999 becoming 1,000 grows a digit and a comma in front of you. It formats with Intl.NumberFormat, so currency, percent, decimals and compact numbers all roll.',
  file: 'number-roll.tsx',
  dependencies: [],
  css: ['@keyframes ui-col-in', '@keyframes ui-col-out'],
  tabs: ['Try it', 'Currency', 'Compact', 'Live'],
  states: [
    { name: 'rolling', description: 'Each changed digit rolls up or down with the number, easing out over 0.9s; unchanged digits stay perfectly still.' },
    { name: 'growing', description: 'A new place (and its comma) slides open from zero width, and its digit rolls up from 0.' },
    { name: 'shrinking', description: 'A place that is no longer needed folds to nothing on the left.' },
    { name: 'from', description: 'With from, it starts at that value and rolls to the real one as soon as it’s painted, e.g. stats from 0.' },
  ],
  usage: `import { NumberRoll } from "@/components/number-roll";

<NumberRoll value={downloads} />
<NumberRoll value={price} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} />`,
  recipeTitle: 'In a live metric',
  recipeIntro: 'Give it a new value whenever yours changes; it works out which digits roll and which way.',
  recipe: `"use client";
import { useEffect, useState } from "react";
import { NumberRoll } from "@/components/number-roll";

export function LiveSignups() {
  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    const events = new EventSource("/api/signups/stream");
    events.onmessage = (e) => setCount(Number(e.data));
    return () => events.close();
  }, []);

  return (
    <p className="text-5xl font-medium tracking-tight">
      <NumberRoll value={count} /> <span className="text-base text-muted-foreground">founders on the list</span>
    </p>
  );
}`,
  props: [
    { name: 'value', type: 'number', description: 'The number to show; change it and the digits roll.' },
    { name: 'format / locales', type: 'Intl.NumberFormatOptions / string', description: 'Currency, percent, decimals, compact ("9.4K") and grouping, as Intl.NumberFormat does them.' },
    { name: 'prefix / suffix', type: 'string', description: 'Text around the number, e.g. "+" or " users".' },
    { name: 'from', type: 'number', description: 'Start here and roll to value once painted.' },
    { name: 'duration', type: 'number', default: '900', description: 'Roll time in ms.' },
    { name: 'direction', type: '"up" | "down"', description: 'Always roll this way. Use "down" for a countdown’s seconds, so 00 → 59 rolls back like a clock instead of spinning forward.' },
  ],
  notes: [
    'The full number is real text for screen readers, search and copy and paste; the rolling columns are hidden from assistive tech.',
    'Digits use tabular figures, so nothing shifts sideways while it rolls.',
    'No animation library: each column is a CSS transform, re-centred quietly after each roll.',
    'With reduced motion, digits change in place without rolling.',
  ],
};
