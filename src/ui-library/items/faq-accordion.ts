import type { UiItem } from '../registry';

export const faqAccordion: UiItem = {
  name: 'faq-accordion',
  title: 'FAQ accordion',
  description: 'Questions on hairlines that open like they mean it: the answer eases to its height, the plus folds into a minus.',
  summary:
    'The FAQ is where visitors decide, and most accordions jump open and slam shut. Here the answer eases open to its real height while its text settles in out of a slight blur, and the plus turns half a circle as its upright folds flat into a minus. Closing fades the words first, then lets the space go. In single mode, opening one question closes the other in the same motion.',
  file: 'faq-accordion.tsx',
  dependencies: [],
  css: [],
  tabs: ['Single', 'Multiple'],
  states: [
    { name: 'closed', description: 'The question at 80% ink on a hairline, with a plus; hover brings it to full.' },
    { name: 'opening', description: 'The answer’s row grows to its real height (460ms) and its text rises 6px out of a 4px blur; the plus turns 180° into a minus.' },
    { name: 'closing', description: 'The words fade in 160ms, then the space closes, so text never gets squeezed.' },
    { name: 'single / multiple', description: 'One open at a time, or any number.' },
  ],
  usage: `import { FaqAccordion } from "@/components/faq-accordion";

<FaqAccordion
  defaultOpen={[0]}
  items={[{ question: "Can I use it for client work?", answer: "Yes, one licence covers it." }]}
/>`,
  recipeTitle: 'In a FAQ section',
  recipeIntro: 'Answers can be any React: links, lists, small tables.',
  recipe: `import { FaqAccordion } from "@/components/faq-accordion";

const faqs = [
  { question: "Can I get a refund?", answer: <>Within 14 days. <a href="/refunds" className="underline">Read the policy</a>.</> },
  { question: "Do you offer team plans?", answer: "Yes: five seats or more get 20% off." },
];

export function Faq() {
  return (
    <section className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_1.4fr]">
      <h2 className="text-3xl font-medium tracking-tight">Questions, answered</h2>
      <FaqAccordion items={faqs} defaultOpen={[0]} />
    </section>
  );
}`,
  props: [
    { name: 'items', type: '{ question; answer; id? }[]', description: 'Each question, and its answer as text or any React.' },
    { name: 'type', type: '"single" | "multiple"', default: '"single"', description: 'One answer open at a time, or any number.' },
    { name: 'defaultOpen', type: 'number[]', default: '[]', description: 'Questions open at first, by index.' },
  ],
  notes: [
    'Each question is a heading with a button (aria-expanded, aria-controls); each answer is a labelled region, hidden from the tab order when closed.',
    'Up and Down move between questions, Home and End jump to the first and last, as the ARIA accordion pattern describes.',
    'Height is animated with grid rows, so answers can be any length without measuring.',
    'With reduced motion, answers open and close in place.',
  ],
};
