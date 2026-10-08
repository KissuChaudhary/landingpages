import type { UiItem } from '../registry';

export const testimonials: UiItem = {
  name: 'testimonials',
  title: 'Testimonials',
  description: 'One quote, chosen by its people: faces step forward, the words cross-fade through a blur, a ring keeps time.',
  summary:
    'A carousel of quote cards asks people to read three things at once. This shows one quote and the people behind it. Choose a face and it steps forward while the others step back; the quote’s height eases to the new words as they cross-fade through a soft blur, and the name morphs letter by letter. With autoplay, a thin ring draws itself around the chosen face as the timer and hands over when it closes, pausing whenever you point at it.',
  file: 'testimonials.tsx',
  dependencies: [],
  registryDependencies: ['text-morph'],
  css: ['@keyframes ui-fade-in', '@keyframes ui-ring-fill'],
  tabs: ['Autoplay', 'Manual'],
  states: [
    { name: 'choose', description: 'The chosen face scales to full and full colour; the others step back to 88%, faded and greyed.' },
    { name: 'change', description: 'Old words lift and blur away, new ones rise in (520ms) while the block eases to their height; the name morphs and the role fades in.' },
    { name: 'autoplay', description: 'A 1.25px ring draws around the chosen face over the interval, then the next person speaks. Pointer or focus inside pauses it.' },
  ],
  usage: `import { Testimonials } from "@/components/testimonials";

<Testimonials
  autoplay={5200}
  items={[{ quote: "It looks like we hired a studio.", name: "Daniel Okafor", role: "Solo maker", avatar: "/daniel.jpg" }]}
/>`,
  recipeTitle: 'In a proof section',
  recipeIntro: 'Feed it the quotes you have; photos are optional (tinted initials stand in).',
  recipe: `import { Testimonials } from "@/components/testimonials";

export default async function Proof() {
  const quotes = await getApprovedTestimonials(); // your CMS or a JSON file

  return (
    <section className="mx-auto max-w-xl py-24">
      <Testimonials
        autoplay={6000}
        items={quotes.map((q) => ({ quote: q.text, name: q.author, role: q.company, avatar: q.photoUrl }))}
      />
    </section>
  );
}`,
  props: [
    { name: 'items', type: '{ quote; name; role?; avatar? }[]', description: 'Each person and what they said. Without an avatar, initials tinted from the name.' },
    { name: 'autoplay', type: 'number', description: 'Move to the next person every this many ms, with the ring as the timer. Off with reduced motion.' },
    { name: 'defaultIndex', type: 'number', default: '0', description: 'Who speaks first.' },
  ],
  notes: [
    'The faces are a radio group labelled with each name and role; arrow keys, Home and End move between people.',
    'Without autoplay the quote is a polite live region, so a new choice is read out; with autoplay it stays quiet.',
    'The ring timer is a CSS animation that pauses with play-state, so nothing re-renders while it runs.',
    'Installs Text morph alongside it. With reduced motion, quotes change in place.',
  ],
};
