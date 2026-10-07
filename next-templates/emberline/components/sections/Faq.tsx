import { ArrowUpRight, Plus } from "lucide-react";

import { AccentTitle, Eyebrow, Section } from "@/components/ui/Section";
import { siteConfig } from "@/site.config";

/**
 * Native <details> elements: keyboard accessible, no JavaScript, and they work with the browser's
 * find-in-page. The first question is open so the section never looks empty.
 */
export function Faq() {
  const { eyebrow, title, description, items, contact } = siteConfig.faq;

  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-12">
        <header className="flex flex-col items-start gap-5 lg:sticky lg:top-28 lg:self-start lg:pl-8">
          <Eyebrow>{eyebrow}</Eyebrow>
          <AccentTitle title={title} className="max-w-[10em]" />
          <p className="text-pretty max-w-[26rem] text-base leading-[1.65] text-ink-mid">{description}</p>
          <a
            href={contact.href}
            className="group inline-flex items-center gap-1.5 rounded-full text-[15px] font-medium text-ember-200 outline-none hover:text-ember-100 focus-visible:ring-2 focus-visible:ring-ember-300"
          >
            {contact.label}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </header>

        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={item.question}
              open={i === 0}
              className="group rounded-2xl border border-line bg-bg-raised transition-colors duration-300 open:border-line-strong hover:border-line-strong"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-2xl p-5 text-[1.0625rem] font-medium leading-snug tracking-[-0.01em] text-ink outline-none focus-visible:ring-2 focus-visible:ring-ember-300 sm:p-6 [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden
                  className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-ink-mid transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:border-ember-300/40 group-open:bg-ember-300/10 group-open:text-ember-200"
                >
                  <Plus className="size-4" strokeWidth={2} />
                </span>
              </summary>
              <p className="text-pretty max-w-[40rem] px-5 pb-6 text-[15px] leading-[1.7] text-ink-mid sm:px-6">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
