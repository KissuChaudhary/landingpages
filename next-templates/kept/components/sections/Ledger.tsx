import { Container, Leader, SectionTitle } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

/**
 * The product as a statement. Title on the left, and on the right six lines, each with a dotted leader
 * running to a figure and a sentence of detail underneath.
 */
export function Ledger() {
  const { ledger } = siteConfig;

  return (
    <section id="ledger" className="scroll-mt-20 border-b border-line py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-24">
        <SectionTitle label={ledger.label} title={ledger.title} description={ledger.description} className="lg:sticky lg:top-28 lg:self-start" />

        <ol className="divide-y divide-line border-y border-line">
          {ledger.items.map((item) => (
            <li key={item.label} className="py-8">
              <Leader
                className="gap-4"
                left={<h3 className="text-[1.0625rem] font-medium text-ink sm:text-[1.1875rem]">{item.label}</h3>}
                right={<span className="display text-[1.5rem] leading-none text-moss sm:text-[1.875rem]">{item.value}</span>}
              />
              <p className="text-pretty mt-3 max-w-[34rem] text-[15px] leading-[1.7] text-ink-mid">{item.detail}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
