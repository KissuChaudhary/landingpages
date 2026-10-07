import { Divider } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

const SPLIT = 41.6667;

/** Title on the left, every answer written out on the right. Nothing to click, nothing hidden. */
export function Faq() {
  const { faq } = siteConfig;

  return (
    <section id="faq" className="scroll-mt-16">
      <Divider marks={[{ at: SPLIT, kind: "tee-down" }]} />
      <div className="grid lg:grid-cols-[5fr_7fr]">
        <header className="px-6 py-16 md:px-12 md:py-24 lg:sticky lg:top-24 lg:self-start">
          <p className="flex items-center gap-2.5 text-[14px] font-medium text-text-mid">
            <span aria-hidden className="size-1.5 rounded-[1px] bg-accent" />
            {faq.label}
          </p>
          <h2 className="display mt-6 text-balance text-[clamp(2.5rem,1.3rem+4vw,4.5rem)] leading-[1.02] text-text">
            <Heading title={faq.title} />
          </h2>
          <p className="text-pretty mt-6 max-w-[24rem] text-[1.0625rem] leading-[1.65] text-text-mid">{faq.description}</p>
        </header>

        <dl className="border-t border-line lg:border-l lg:border-t-0">
          {faq.items.map((item) => (
            <div key={item.question} className="border-b border-line px-6 py-8 last:border-b-0 md:px-12 md:py-10">
              <dt className="display text-[1.5rem] leading-[1.25] text-text">{item.question}</dt>
              <dd className="text-pretty mt-3 max-w-[34rem] text-[1rem] leading-[1.7] text-text-mid">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
      <Divider marks={[{ at: SPLIT, kind: "tee-up" }]} />
    </section>
  );
}
