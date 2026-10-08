import type { UiItem } from '../registry';

export const featureTabs: UiItem = {
  name: 'feature-tabs',
  title: 'Feature tabs',
  description: 'One panel, many features: the line slides between tabs, fills as autoplay runs, and the panel eases to each.',
  summary:
    'Feature tabs are where a landing page shows the product, and most snap from one screenshot to the next. Here the line under the chosen tab slides across with a little give; with autoplay it fills like a progress bar and hands over to the next tab when full, pausing whenever you point at it. The panel eases to the height of what it’s showing while the new content slides in from the side you went, through a light blur.',
  file: 'feature-tabs.tsx',
  dependencies: [],
  css: ['@keyframes ui-progress'],
  tabs: ['Autoplay', 'Manual'],
  states: [
    { name: 'switch', description: 'The line slides and resizes to the tab (520ms, slight overshoot); the label colour follows.' },
    { name: 'panel', description: 'Height eases over 460ms; old content slides and blurs out one way, new content in from the other.' },
    { name: 'autoplay', description: 'The line fills over the interval and moves to the next tab when full. Pointer or focus inside pauses it; clicking a tab restarts it.' },
  ],
  usage: `import { FeatureTabs } from "@/components/feature-tabs";

<FeatureTabs
  autoplay={4200}
  tabs={[
    { id: "plan", label: "Plan", content: <PlanShot /> },
    { id: "ship", label: "Ship", content: <ShipShot /> },
  ]}
/>`,
  recipeTitle: 'In a features section',
  recipeIntro: 'Put whatever shows the feature best in each tab: a screenshot, a video, a small live mock.',
  recipe: `import Image from "next/image";
import { FeatureTabs } from "@/components/feature-tabs";

const features = [
  { id: "plan", label: "Plan", title: "Turn a rough idea into a plan", shot: "/shots/plan.png" },
  { id: "write", label: "Write", title: "Write it once, in your voice", shot: "/shots/write.png" },
  { id: "ship", label: "Ship", title: "Ship with a log you can read", shot: "/shots/ship.png" },
];

export function Features() {
  return (
    <section className="mx-auto max-w-4xl">
      <FeatureTabs
        autoplay={5000}
        tabs={features.map((f) => ({
          id: f.id,
          label: f.label,
          content: (
            <div className="grid items-center gap-8 md:grid-cols-2">
              <h3 className="text-2xl font-medium tracking-tight">{f.title}</h3>
              <Image src={f.shot} alt="" width={640} height={420} className="rounded-2xl border" />
            </div>
          ),
        }))}
      />
    </section>
  );
}`,
  props: [
    { name: 'tabs', type: '{ id; label; content }[]', description: 'Each tab and what its panel shows.' },
    { name: 'value / defaultValue / onValueChange', type: 'string / string / (id) => void', description: 'The chosen tab, controlled or not.' },
    { name: 'autoplay', type: 'number', description: 'Move on every this many ms, with the line as the timer. Off with reduced motion.' },
  ],
  notes: [
    'A real tablist with a labelled tabpanel; arrow keys, Home and End move between tabs and only the chosen tab is in the tab order.',
    'Autoplay pauses while the pointer or focus is anywhere inside, so it never moves under someone reading.',
    'The progress is a CSS animation, so nothing re-renders while it runs.',
    'With reduced motion there is no autoplay and content changes in place.',
  ],
};
