import { Plus } from "lucide-react";

import { Section, Title } from "@/components/ui/Section";
import { siteConfig } from "@/site.config";

/**
 * Questions set in the display serif, separated by hairlines rather than boxed. Native <details>: keyboard
 * accessible, no JavaScript, and it works with the browser's find-in-page. The heading stays in view on
 * large screens while you read.
 */
export function Faq() {
  const { label, title, description, items } = siteConfig.faq;

  return (
    <Section id="faq">
      <div className="flex items-baseline justify-between border-t border-line-strong pt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-low">
        <p>{label}</p>
        <p aria-hidden>(07)</p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <header className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 className="display text-balance text-[clamp(2.25rem,1.2rem+3.6vw,4rem)] leading-[1.02] text-ink">
              <Title title={title} />
            </h2>
            <p className="text-pretty mt-5 max-w-[24rem] text-[1.0625rem] leading-[1.6] text-ink-mid">{description}</p>
          </div>
        </header>

        <div className="lg:col-span-7">
          {items.map((item, i) => (
            <details key={item.question} open={i === 0} className="group border-b border-line-strong first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 outline-none focus-visible:ring-2 focus-visible:ring-ink md:py-7 [&::-webkit-details-marker]:hidden">
                <span className="display text-[1.5rem] leading-[1.15] text-ink md:text-[1.875rem]">{item.question}</span>
                <span
                  aria-hidden
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-ink transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:border-ink group-open:bg-ink group-open:text-on-ink"
                >
                  <Plus className="size-4" strokeWidth={1.75} />
                </span>
              </summary>
              <p className="text-pretty max-w-[34rem] pb-8 text-[1.0625rem] leading-[1.65] text-ink-mid">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
