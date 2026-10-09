import type { UiItem } from '../registry';

export const sortableList: UiItem = {
  name: 'sortable-list',
  title: 'Sortable list',
  description: 'Drag to reorder and everything moves: rows slide out of the way, the dropped one settles, every rank rolls, and presets re-sort the lot.',
  summary:
    'Reordering is the most physical thing a list can do, and most sortable lists teleport rows or fade them. Here you press a row’s grip and it lifts, a darker hairline and a touch larger, and follows your finger exactly while the rows it passes slide out of its way one slot at a time. Let go and it settles into its slot with a small overshoot, every rank number rolls to its new place, and the row you moved says how far it went ("↑ 2") before fading. Sort presets above the list re-sort everything at once and every row glides to where it belongs; the highlight slides to the preset you picked and fades into "Your order" once you rearrange by hand. It all works from the keyboard too, and every move is announced.',
  file: 'sortable-list.tsx',
  dependencies: [],
  registryDependencies: ['number-roll'],
  css: [],
  states: [
    { name: 'lift', description: 'Pressing the grip: the row’s border darkens, it scales to 1.015 (200ms) and rises above the others. The grip takes the pointer, so touch scrolling elsewhere is untouched.' },
    { name: 'drag', description: 'The row follows the pointer without easing; rows it passes shift by one row height (220ms) the moment its centre crosses theirs.' },
    { name: 'drop', description: 'onReorder gets the new order; every row glides from where it was on screen (FLIP, 420ms) and the dropped one settles with a slight overshoot (380ms). Ranks roll; a "↑ 2" chip blurs in and out over 1.8s.' },
    { name: 'sort', description: 'A preset sorts the whole list with the same glide. The pressed preset is whichever the current order matches; with none, the highlight fades and "Your order" shows.' },
    { name: 'keyboard', description: 'Space or Enter on a grip picks the row up (aria-pressed), ↑ and ↓ move it a place at a time with the same glide, Space drops it, Escape puts it back where it started.' },
  ],
  usage: `import { SortableList } from "@/components/sortable-list";

const [items, setItems] = useState(features);

<SortableList
  items={items}
  onReorder={setItems}
  getLabel={(f) => f.name}
  renderItem={(f) => <span className="text-[13.5px] font-medium">{f.name}</span>}
/>`,
  recipeTitle: 'Saving the order',
  recipeIntro: 'Update the list right away so it moves, then save the ids; put the old order back if the save fails.',
  recipe: `"use client";
import { useState } from "react";
import { SortableList } from "@/components/sortable-list";

export function Priorities({ initial }: { initial: { id: string; name: string; votes: number }[] }) {
  const [items, setItems] = useState(initial);
  return (
    <SortableList
      items={items}
      getLabel={(f) => f.name}
      sorts={[{ label: "Votes", compare: (a, b) => b.votes - a.votes }]}
      onReorder={async (next) => {
        const before = items;
        setItems(next);
        const res = await fetch("/api/priorities", { method: "PUT", body: JSON.stringify(next.map((f) => f.id)) });
        if (!res.ok) setItems(before); // glides back
      }}
      renderItem={(f) => (
        <div className="flex justify-between text-[13.5px]">
          <span className="font-medium">{f.name}</span>
          <span className="text-muted-foreground tabular-nums">{f.votes}</span>
        </div>
      )}
    />
  );
}`,
  props: [
    { name: 'items', type: 'T[] (each with an id)', description: 'The list in its current order.' },
    { name: 'onReorder', type: '(items: T[]) => void', description: 'Called with the new order after a drop, a keyboard move or a preset. Update items with it; if you don’t, the rows glide back.' },
    { name: 'renderItem', type: '(item, { index, lifted }) => ReactNode', description: 'A row’s content, between the rank and the edge; the grip, rank, border and motion are handled.' },
    { name: 'getLabel', type: '(item) => string', description: 'The name used in the grip’s label and the announcements.' },
    { name: 'sorts', type: '{ label; compare }[]', description: 'Presets shown as a segmented control; the one the order currently matches shows as pressed.' },
    { name: 'label', type: 'string', default: '"Reorderable list"', description: 'The list’s accessible name.' },
  ],
  notes: [
    'Each grip is a button named "Reorder …" with instructions attached; picking up, every move, dropping and cancelling are announced politely.',
    'Rows move with transforms while you drag and only change order on drop, so heavy row content doesn’t re-render on every pointer move.',
    'For long lists inside a scrolling box, keep the box tall enough to drag within; it doesn’t scroll itself while you drag.',
    'Installs Number roll. With reduced motion rows move in place without gliding.',
  ],
};
