import { Container, Pill } from "@/components/ui/Kit";
import { Visual } from "@/components/visuals/Visuals";
import { siteConfig } from "@/site.config";

/** A cream panel with three step cards and a closing line. The heading is set entirely in italic. */
export function How() {
  const { how } = siteConfig;

  return (
    <section id="how" className="scroll-mt-28 px-2 pb-24 sm:px-8 sm:pb-32">
      <div className="mx-auto max-w-[1100px] rounded-[24px] bg-cream px-3 py-14 sm:rounded-[28px] sm:px-10 sm:py-20">
        <header className="mx-auto max-w-[44rem] px-2 text-center">
          <h2 className="text-balance font-serif text-[clamp(2.25rem,1.2rem+3.6vw,3.875rem)] italic leading-[1.1] tracking-tight text-ink">
            {how.title.before} {how.title.accent}
          </h2>
          <p className="text-pretty mx-auto mt-5 max-w-[34rem] text-[1.0625rem] leading-[1.6] text-ink-mid">{how.description}</p>
        </header>

        <ol className="mt-14 grid gap-5 lg:grid-cols-3">
          {how.steps.map((step) => (
            <li key={step.chip} className="rounded-[24px] border border-lilac bg-peach/60 p-1.5">
              <div className="h-full rounded-[19px] bg-card p-4 sm:p-6">
                <div className="h-44 overflow-hidden rounded-xl border border-line">
                  <Visual name={step.visual} />
                </div>
                <Pill className="mt-6">{step.chip}</Pill>
                <h3 className="mt-4 text-[1.25rem] font-medium leading-snug text-ink">{step.title}</h3>
                <p className="text-pretty mt-3 text-[15px] leading-[1.7] text-ink-mid">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <Container className="mt-16 max-w-[44rem] px-0">
          <p aria-hidden className="text-center font-serif text-6xl leading-none text-peach">
            &rdquo;
          </p>
          <p className="text-pretty -mt-2 border-t border-peach/70 pt-8 text-center font-serif text-[clamp(1.375rem,1rem+1.4vw,2rem)] leading-[1.45] text-ink">
            {how.quote.before} <em className="italic">{how.quote.accent}</em>
          </p>
        </Container>
      </div>
    </section>
  );
}
