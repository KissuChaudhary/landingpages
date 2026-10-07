import { Plus } from "lucide-react";

import { Container, Heading, Pill } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

/** Title on the left, native <details> rows on the right: keyboard operable and readable without JavaScript. */
export function Faq() {
  const { faq } = siteConfig;

  return (
    <section id="faq" className="scroll-mt-20 py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <header className="flex flex-col items-start lg:sticky lg:top-28 lg:self-start">
          <Pill>{faq.label}</Pill>
          <h2 className="display mt-6 text-balance text-[clamp(2.5rem,1.4rem+4vw,4.25rem)] leading-[1.02] text-ink">
            <Heading title={faq.title} />
          </h2>
          <p className="text-pretty mt-5 max-w-[24rem] text-[1.0625rem] leading-[1.65] text-ink-mid">{faq.description}</p>
        </header>

        <div className="divide-y divide-line border-y border-line">
          {faq.items.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 outline-none focus-visible:ring-2 focus-visible:ring-orange">
                <span className="display text-[1.25rem] leading-[1.25] text-ink sm:text-[1.5rem]">{item.question}</span>
                <span
                  aria-hidden
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-colors group-open:border-orange group-open:bg-orange"
                >
                  <Plus className="size-[18px] transition-transform duration-200 group-open:rotate-45" strokeWidth={2.25} />
                </span>
              </summary>
              <p className="text-pretty max-w-[34rem] pb-7 pr-12 text-[1rem] leading-[1.7] text-ink-mid">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
