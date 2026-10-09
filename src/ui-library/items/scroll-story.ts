import type { UiItem } from '../registry';

export const scrollStory: UiItem = {
  name: 'scroll-story',
  title: 'Scroll story',
  description: 'A how-it-works section that tells itself as you scroll: steps light up at the middle, a rail fills, and one card reshapes into each step’s picture.',
  summary:
    'Every product page has a "how it works", and it’s usually four numbered boxes nobody reads in order. Here the steps scroll past a picture that stays put. Whichever step crosses the middle of the view lights up while the rest wait at a third of their strength; a hairline down the side fills with the scroll and each step’s dot fills as the line reaches it. The picture is one card that reshapes to fit each step: its size eases from one to the next while the old picture blurs out and the new one rises in, and since each picture mounts when its step arrives, whatever it does (a switch flipping, a count rolling, a name typing itself) plays right then. "02 / 04" rolls above it. On a phone the picture sticks to the top and the steps slide under it. Tap a step to scroll it into place.',
  file: 'scroll-story.tsx',
  dependencies: [],
  registryDependencies: ['number-roll'],
  css: [],
  states: [
    { name: 'reading line', description: 'The middle of the view (wide), or 42% down what the sticky picture leaves (narrow). The last step whose top has crossed it is the active one.' },
    { name: 'rail', description: 'A 1px track from the first dot to the last; the fill follows the reading line on every scroll frame (written straight to the DOM, no re-render). Dots fill and the active one grows to 1.15× with a slight overshoot.' },
    { name: 'steps', description: 'Inactive steps at 35% opacity, the active one at full (400ms).' },
    { name: 'picture', description: 'The card eases its width and height to the new picture (460ms); the old one blurs out and shrinks to 0.97 (240ms) while the new one rises 10px out of a 4px blur (420ms, 90ms in). The counter rolls.' },
    { name: 'narrow', description: 'Under 520px of width the picture sticks to the top at 46% of the view with a hairline under it, and the steps scroll beneath.' },
  ],
  usage: `import { ScrollStory } from "@/components/scroll-story";

<ScrollStory
  steps={[
    { title: "Pick a template", body: "Start from a page that already moves.", visual: <PickTemplate /> },
    { title: "Make it yours", body: "Your name, your colour.", visual: <MakeYours /> },
    { title: "Go live", body: "Push it and watch the first visitors arrive.", visual: <GoLive /> },
  ]}
/>`,
  recipeTitle: 'Pictures that play when their step arrives',
  recipeIntro: 'Each visual mounts when its step becomes active, so a timer or a count inside it starts right then; no scroll code needed in the picture itself.',
  recipe: `"use client";
import { useEffect, useState } from "react";
import { ScrollStory } from "@/components/scroll-story";
import { NumberRoll } from "@/components/number-roll";

function Visitors() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setCount(128), 300); // rolls up as the step arrives
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="w-[240px] p-4">
      <p className="text-[28px] font-semibold tabular-nums"><NumberRoll value={count} /></p>
      <p className="text-[12px] text-muted-foreground">visitors in the first hour</p>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-5xl px-6">
      <ScrollStory
        side="end"
        steps={[
          { title: "Connect your store", body: "Two clicks, no code.", visual: <Connect /> },
          { title: "Go live", body: "Watch the first visitors arrive.", visual: <Visitors /> },
        ]}
      />
    </section>
  );
}`,
  props: [
    { name: 'steps', type: '{ title: string; body?: ReactNode; visual: ReactNode }[]', description: 'In order. Give visuals a set width (the card sizes itself to them); keep them under about 280px wide for phones.' },
    { name: 'side', type: '"start" | "end"', default: '"end"', description: 'Which side the picture sits on when there’s room for two columns.' },
    { name: 'onStepChange', type: '(index: number) => void', description: 'Runs when a different step becomes active.' },
  ],
  notes: [
    'It finds the nearest scrolling box itself, so it works in the page or inside a scrolling panel; give the box a height.',
    'The active step has aria-current="step"; each title is a button that scrolls its step into place.',
    'Every step’s words stay in the page for reading and search; only the pictures come and go.',
    'Installs Number roll. With reduced motion the pictures swap in place and jumps don’t smooth-scroll.',
  ],
};
