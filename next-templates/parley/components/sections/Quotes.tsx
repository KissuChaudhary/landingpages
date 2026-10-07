import { Container, Label } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

/** One large quote, and three short ones set as a plain list beside it. */
export function Quotes() {
  const { quotes } = siteConfig;

  return (
    <section aria-label={quotes.label} className="py-20 sm:py-28">
      <Container>
        <Label>{quotes.label}</Label>
        <div className="mt-8 grid gap-14 lg:grid-cols-[7fr_5fr] lg:gap-20">
          <figure>
            <blockquote className="display text-balance text-[clamp(2rem,1.2rem+3vw,3.5rem)] leading-[1.12] text-ink">
              <span aria-hidden className="text-rose">&ldquo;</span>
              {quotes.featured.text}
              <span aria-hidden className="text-rose">&rdquo;</span>
            </blockquote>
            <figcaption className="mt-8 text-[15px] text-ink-mid">
              <span className="font-semibold text-ink">{quotes.featured.name}</span>
              <span className="mx-2 text-ink-low">/</span>
              {quotes.featured.role}
            </figcaption>
          </figure>

          <ul className="divide-y divide-line self-end border-y border-line">
            {quotes.more.map((quote) => (
              <li key={quote.name} className="py-7">
                <p className="text-pretty text-[1.0625rem] leading-[1.6] text-ink">{quote.text}</p>
                <p className="mt-3 text-[14px] text-ink-mid">
                  <span className="font-semibold text-ink">{quote.name}</span>
                  <span className="mx-2 text-ink-low">/</span>
                  {quote.role}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
