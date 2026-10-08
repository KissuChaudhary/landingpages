import React from 'react';

export interface FaqItem {
  q: string;
  a: React.ReactNode;
}

/** Native disclosure list: crawlable, keyboard-operable, no script. */
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-b border-neutral-200">
      {items.map((f) => (
        <details key={f.q} className="group border-t border-neutral-200 first:border-t-0">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[15px] text-neutral-950 group-first:pt-0 [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="text-lg leading-none text-neutral-400 transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-neutral-500">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
