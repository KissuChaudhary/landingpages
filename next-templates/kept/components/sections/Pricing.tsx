import { Button, TextLink } from "@/components/ui/Button";
import { Container, Leader, SectionTitle } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

/** The price is set as a receipt for one freelancer: the lines, a total, and one button. */
export function Pricing() {
  const { pricing } = siteConfig;
  const { receipt } = pricing;

  return (
    <section id="pricing" className="scroll-mt-20 border-b border-line py-20 sm:py-28">
      <Container className="grid items-start gap-14 lg:grid-cols-[1fr_30rem] lg:gap-24">
        <div>
          <SectionTitle label={pricing.label} title={pricing.title} description={pricing.description} />
          <div className="mt-12 max-w-[32rem] border-t border-line pt-8">
            <h3 className="display text-[1.75rem] leading-none text-ink">{pricing.free.title}</h3>
            <p className="text-pretty mt-3 text-[1rem] leading-[1.65] text-ink-mid">{pricing.free.text}</p>
            <TextLink href={pricing.free.cta.href} className="mt-3">
              {pricing.free.cta.label}
            </TextLink>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-sheet p-6 sm:p-9">
          <h3 className="display text-[2.5rem] leading-none text-ink">{receipt.title}</h3>
          <p className="mt-2 text-[14px] text-ink-mid">{receipt.subtitle}</p>

          <ul className="mt-8 space-y-4 border-t border-dashed border-line-strong pt-8">
            {receipt.lines.map((line) => (
              <li key={line.label}>
                <Leader className="text-[15px]" left={<span className="text-ink">{line.label}</span>} right={<span className="text-moss">{line.amount}</span>} />
              </li>
            ))}
          </ul>

          <p className="mt-8 flex items-baseline justify-between gap-4 border-t border-dashed border-line-strong pt-6">
            <span className="text-[15px] font-medium text-ink">{receipt.total.label}</span>
            <span className="display money text-[3.5rem] leading-none text-ink">{receipt.total.amount}</span>
          </p>

          <Button href={pricing.cta.href} className="mt-8 w-full">
            {pricing.cta.label}
          </Button>
          <p className="mt-4 text-center text-[13px] text-ink-low">{receipt.note}</p>
        </div>
      </Container>
    </section>
  );
}
