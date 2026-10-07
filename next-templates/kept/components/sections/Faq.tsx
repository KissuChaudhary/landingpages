import { Plus } from "lucide-react";

import { Container, SectionTitle } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

/** Native <details> rows: keyboard operable, readable without JavaScript, and indexable. */
export function Faq() {
  const { faq } = siteConfig;

  return (
    <section id="faq" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionTitle label={faq.label} title={faq.title} description={faq.description} />

        <div className="mt-14 divide-y divide-line border-y border-line">
          {faq.items.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 outline-none focus-visible:ring-2 focus-visible:ring-moss sm:py-7">
                <span className="display text-[1.5rem] leading-[1.2] text-ink sm:text-[1.875rem]">{item.question}</span>
                <Plus
                  aria-hidden
                  strokeWidth={1.75}
                  className="size-6 shrink-0 text-ink-mid transition-transform duration-200 group-open:rotate-45 group-open:text-moss"
                />
              </summary>
              <p className="text-pretty max-w-[40rem] pb-8 pr-12 text-[1.0625rem] leading-[1.7] text-ink-mid">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
