import { Container, Heading, Label } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

/**
 * Testimonials set as a table: who said it, what they said, and the figure that proves it.
 * On phones each row becomes a stacked entry with the figure underneath.
 */
export function Quotes() {
  const { quotes } = siteConfig;

  return (
    <section aria-label={quotes.label} className="border-b border-line py-20 sm:py-28">
      <Container>
        <Label>{quotes.label}</Label>
        <h2 className="display mt-5 max-w-[16em] text-balance text-[clamp(2.25rem,1.2rem+3.6vw,4rem)] leading-[1.04] text-ink">
          <Heading title={quotes.title} />
        </h2>

        <div className="mt-14 hidden grid-cols-[14rem_1fr_11rem] gap-x-10 border-b border-line-strong pb-3 text-[13px] font-medium text-ink-low md:grid">
          <span>{quotes.columns.person}</span>
          <span>{quotes.columns.said}</span>
          <span className="text-right">{quotes.columns.kept}</span>
        </div>

        <ul className="divide-y divide-line border-b border-line md:border-t-0">
          {quotes.items.map((item) => (
            <li key={item.name} className="grid gap-x-10 gap-y-4 py-8 first:border-t first:border-line-strong md:grid-cols-[14rem_1fr_11rem] md:first:border-t-0 md:items-baseline">
              <div>
                <p className="text-[16px] font-medium text-ink">{item.name}</p>
                <p className="mt-0.5 text-[14px] text-ink-mid">{item.work}</p>
              </div>
              <p className="display text-pretty text-[1.5rem] leading-[1.25] text-ink sm:text-[1.75rem]">{item.text}</p>
              <p className="flex items-baseline justify-between gap-3 md:block md:text-right">
                <span className="text-[13px] text-ink-low md:hidden">{quotes.columns.kept}</span>
                <span className="display money text-[1.75rem] leading-none text-moss">{item.kept}</span>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
