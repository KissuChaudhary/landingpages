'use client';

import React from 'react';
import { FaqAccordion } from '../registry/faq-accordion';

const ITEMS = [
  {
    question: 'Can I use it for client work?',
    answer: 'Yes. One licence covers your own products and the sites you build for clients. You can’t resell the template itself as a template.',
  },
  {
    question: 'Do I need to know Next.js?',
    answer: 'A little helps. Every word, link and image lives in one config file, so most launches never touch a component.',
  },
  {
    question: 'What happens when you ship an update?',
    answer: 'You get it for free, forever. Updates arrive as a new download with a short changelog of what moved.',
  },
  {
    question: 'Can I get a refund?',
    answer: 'Within 14 days, no questions asked. Reply to your receipt and it’s done.',
  },
];

export default function FaqAccordionDemo({ tab = 'Single' }: { tab?: string }) {
  return (
    <div className="w-full max-w-[560px]">
      <FaqAccordion key={tab} items={ITEMS} type={tab === 'Multiple' ? 'multiple' : 'single'} defaultOpen={[0]} />
    </div>
  );
}
