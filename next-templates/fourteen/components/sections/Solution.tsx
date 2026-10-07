import { Button, Container, SectionHead } from "@/components/ui/Kit";
import { Visual } from "@/components/visuals/Visuals";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

/**
 * Six cards in three rows: wide and narrow, narrow and wide, narrow and wide. Wide cards put the drawing beside the
 * text; narrow cards stack it underneath. On phones every card stacks.
 */
export function Solution() {
  const { solution } = siteConfig;
  const wide = [true, false, false, true, false, true];

  return (
    <section className="pb-24 sm:pb-32">
      <Container className="max-w-[1000px]">
        <SectionHead pill={solution.label} title={solution.title} description={solution.description} />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {solution.cards.map((card, index) => {
            const isWide = wide[index];
            return (
              <article
                key={card.label}
                className={cn(
                  "flex flex-col overflow-hidden rounded-[24px] border border-line p-5 sm:p-8",
                  isWide ? "bg-card md:col-span-2 md:flex-row md:items-center md:gap-8" : "bg-wash/70",
                )}
              >
                <div className={cn(isWide && "md:w-1/2")}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-low">{card.label}</p>
                  <h3 className="mt-3 font-serif text-[1.625rem] leading-[1.15] text-ink">
                    {card.title.before}
                    {card.title.accent ? <em className="italic text-ink-low"> {card.title.accent}</em> : null}
                  </h3>
                  <p className="text-pretty mt-3.5 text-[15px] leading-[1.65] text-ink-mid">{card.text}</p>
                </div>
                <div className={cn("mt-8 h-36 shrink-0", isWide ? "md:mt-0 md:h-44 md:w-1/2" : "")}>
                  <Visual name={card.visual} />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center">
          <Button href={solution.cta.href}>{solution.cta.label}</Button>
        </div>
      </Container>
    </section>
  );
}
