'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SectionHeader } from './theirs/section-header';
import { TEMPLATES } from '@/data/templates';
import { PRICING, formatPrice } from '@/data/pricing';

const single = formatPrice(PRICING.single.price);
const allAccess = formatPrice(PRICING.allAccess.price);

const FAQS = [
  {
    q: 'What does a template cost?',
    a: `${single} for one template, or ${allAccess} for all ${TEMPLATES.length} plus every template added later. Both are one-time payments with a ${PRICING.refundDays}-day money-back guarantee.`,
  },
  {
    q: 'Can I use these templates for commercial SaaS and client projects?',
    a: 'Yes. Every purchase includes a commercial license: use the template for your own products and any number of client projects. You just can’t resell the template files themselves as a template or UI kit.',
  },
  {
    q: 'How does the interactive demo viewer work?',
    a: 'Every template runs as a real, isolated build. The demo viewer lets you switch between desktop, 1024px laptop, 768px tablet and 375px phone widths in your browser before you buy.',
  },
  {
    q: `What stack is used across the ${TEMPLATES.length} templates?`,
    a: 'Every template is a standalone Next.js 15 project built with React 19, TypeScript, Tailwind CSS v4 and Lucide icons. No API keys or environment variables.',
  },
  {
    q: 'How do I get the source code?',
    a: 'Buy a template from its page, or get all-access. Checkout sends a download link straight away: unzip the project, run npm install and npm run dev.',
  },
  {
    q: 'Will new templates be added?',
    a: 'Yes. All-access holders get every new template at no extra charge.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-t border-black/[0.04]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Section Header */}
        <SectionHeader
          badge="FAQs"
          title="Fair questions, straight answers."
          description={
            <>
              Everything you need to know about licensing, frameworks, and downloads,{' '}
              <span className="rounded-md bg-primary/10 box-decoration-clone px-1 py-0.5 text-primary font-medium">
                without the fine print
              </span>
              .
            </>
          }
        />

        {/* Dynamic Morphing Accordion Stack */}
        <div className="mx-auto mt-12 w-full max-w-2xl">
          <div className="flex flex-col">
            {FAQS.map((item, index) => {
              const isOpen = openIndex === index;
              const total = FAQS.length;

              const prevIsOpen = index > 0 && index - 1 === openIndex;
              const nextIsOpen = index < total - 1 && index + 1 === openIndex;

              const isStartOfClosedGroup = index === 0 || prevIsOpen;
              const isEndOfClosedGroup = index === total - 1 || nextIsOpen;

              let borderRadius = '0px';
              if (isOpen) {
                borderRadius = '24px';
              } else if (isStartOfClosedGroup && isEndOfClosedGroup) {
                borderRadius = '24px';
              } else if (isStartOfClosedGroup) {
                borderRadius = '24px 24px 0px 0px';
              } else if (isEndOfClosedGroup) {
                borderRadius = '0px 0px 24px 24px';
              }

              return (
                <div
                  key={item.q}
                  style={{ borderRadius }}
                  className={`transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'my-2.5 bg-white border border-black/[0.08] shadow-md'
                      : 'my-0 bg-[#f6f6f6] border-b border-black/[0.04]'
                  }`}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between p-5 text-left text-sm font-medium text-[#181925] hover:text-primary transition-colors cursor-pointer select-none"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`size-4 text-[#777] transition-transform duration-200 shrink-0 ml-4 ${
                        isOpen ? 'rotate-180 text-primary' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs text-[#666] leading-relaxed border-t border-black/[0.04]">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
