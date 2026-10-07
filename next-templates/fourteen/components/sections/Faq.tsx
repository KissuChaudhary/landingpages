import { Plus } from "lucide-react";

import { Container } from "@/components/ui/Kit";
import { siteConfig } from "@/site.config";

/** Native <details> in a double hairline: keyboard operable and readable without JavaScript. */
export function Faq() {
  const { faq } = siteConfig;

  return (
    <section id="faq" className="scroll-mt-28 pb-24 sm:pb-32">
      <Container className="max-w-[760px]">
        <header className="text-center">
          <h2 className="font-serif text-[clamp(2.25rem,1.3rem+3.4vw,3.75rem)] leading-[1.1] tracking-tight text-ink">
            <em className="italic">{faq.lead}</em> {faq.tail}
          </h2>
          <p className="mt-4 text-[1.0625rem] text-ink-mid">{faq.description}</p>
        </header>

        <div className="mt-14 space-y-4">
          {faq.items.map((item) => (
            <details key={item.question} className="group rounded-[26px] border border-line bg-card p-1.5">
              <summary className="flex cursor-pointer items-center justify-between gap-5 rounded-[20px] border border-line px-4 py-5 sm:px-6 sm:py-6 outline-none focus-visible:ring-2 focus-visible:ring-flame">
                <span className="text-[14px] font-medium uppercase leading-snug tracking-wide text-ink sm:text-[15px]">{item.question}</span>
                <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-wash text-ink-mid transition-colors group-open:border-peach group-open:bg-flame-soft group-open:text-flame-text">
                  <Plus className="size-4 transition-transform duration-200 group-open:rotate-45" />
                </span>
              </summary>
              <p className="text-pretty px-4 pb-4 pr-6 pt-4 sm:px-6 sm:pb-5 sm:pr-16 sm:pt-5 text-[15px] leading-[1.7] text-ink-mid">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
