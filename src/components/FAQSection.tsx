'use client';

import React, { useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';
import { PRICING, formatPrice } from '@/data/pricing';

/* Questions beside a title that stays put. One answer is open at a time; it opens by growing its row (no measuring, no
 * animation library) and the plus turns into a cross. */

const single = formatPrice(PRICING.single.price);
const allAccess = formatPrice(PRICING.allAccess.price);

const FAQS = [
  {
    q: 'What does a template cost?',
    a: `${single} for one template, or ${allAccess} for every template in the library plus each one added later. Both are one-time payments with a ${PRICING.refundDays}-day money-back guarantee.`,
  },
  {
    q: 'Can I use them for commercial and client projects?',
    a: 'Yes. Every purchase includes a commercial license: use a template for your own products and any number of client projects. You just can’t resell the template files themselves as a template or UI kit.',
  },
  {
    q: 'How does the live demo work?',
    a: 'Every template runs as a real, isolated build. The demo viewer lets you switch between desktop, laptop, tablet and phone widths in your browser before you buy.',
  },
  {
    q: 'What stack do the templates use?',
    a: 'Each template is a standalone Next.js project with React and TypeScript. Styling uses Tailwind CSS or plain CSS, listed on each template’s page. No API keys or environment variables needed to run it.',
  },
  {
    q: 'How do I get the source code?',
    a: 'Buy a template from its page, or get All-Access. Checkout sends a download link straight away: unzip the project, run npm install and npm run dev.',
  },
  {
    q: 'Are the components really free?',
    a: 'Yes. Every component in the library is free to install from our shadcn registry, with its source, states and motion included. Templates are the paid part.',
  },
  {
    q: 'Will new templates be added?',
    a: `Yes, regularly. All-Access holders get every new template at no extra charge. There are ${TEMPLATES.length} today.`,
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 border-t border-black/[0.05] bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="inline-flex h-6 items-center rounded-md bg-neutral-100 px-2.5 text-xs font-medium text-[#666]">FAQ</span>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-tight tracking-tighter text-[#181925] sm:text-4xl">Questions, answered.</h2>
          <p className="mt-4 max-w-sm text-balance text-[15px] leading-relaxed text-[#666]">Licensing, the stack and downloads, without the fine print.</p>
          <a href="#catalog" className="group mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-primary">
            Still deciding? Try any demo
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>

        <div className="border-t border-black/[0.08]">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-black/[0.08]">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left text-[16px] font-medium tracking-[-0.01em] text-[#181925]"
                  >
                    {item.q}
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)] ${
                        isOpen ? 'rotate-45 bg-[#181925] text-white' : 'text-[#777] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)] group-hover:text-[#181925] group-hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.22)]'
                      }`}
                    >
                      <Plus className="size-3.5" strokeWidth={2.2} aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p
                      className={`pb-6 pr-12 text-[15px] leading-relaxed text-[#666] transition-[opacity,transform] duration-500 ${
                        isOpen ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
                      }`}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
