import { Container, SectionTitle } from "@/components/ui/Title";
import { Sparkline } from "@/components/ui/Sparkline";
import { Verified } from "@/components/ui/Icons";
import { siteConfig } from "@/site.config";

function Avatar({ handle }: { handle: string }) {
  return (
    <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-orange-soft text-[14px] font-bold text-orange-text">
      {handle.replace(/^_/, "").slice(0, 1).toUpperCase()}
    </span>
  );
}

/** One big case study with a real chart, and three smaller ones beside it. */
export function Results() {
  const { results } = siteConfig;
  const { featured, others } = results;

  return (
    <section id="results" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionTitle label={results.label} title={results.title} description={results.description} />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <article className="rounded-[28px] border border-line bg-sheet p-6 sm:p-10">
            <header className="flex items-center gap-3">
              <Avatar handle={featured.handle} />
              <div>
                <p className="flex items-center gap-1.5 text-[16px] font-bold text-ink">
                  {featured.handle}
                  <Verified />
                </p>
                <p className="text-[14px] text-ink-mid">{featured.niche}</p>
              </div>
            </header>

            <h3 className="display money mt-8 text-balance text-[clamp(2rem,1.3rem+2.6vw,3.25rem)] leading-[1.05] text-ink">{featured.headline}</h3>
            <p className="text-pretty mt-4 max-w-[30rem] text-[15px] leading-[1.65] text-ink-mid">{featured.description}</p>

            <Sparkline points={featured.points} grid className="mt-10 h-52 sm:h-60" />
            <p className="mt-3 flex justify-between text-[13px] text-ink-low">
              <span>{featured.start}</span>
              <span>{featured.end}</span>
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {featured.stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="display money text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] leading-none text-ink">{stat.value}</dd>
                  <dt className="mt-2 text-[13px] leading-snug text-ink-mid sm:text-[14px]">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </article>

          <ul className="flex flex-col divide-y divide-line rounded-[28px] border border-line bg-sheet">
            {others.map((item) => (
              <li key={item.handle} className="flex flex-1 flex-col justify-between gap-6 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <Avatar handle={item.handle} />
                  <div>
                    <p className="flex items-center gap-1.5 text-[15px] font-bold text-ink">
                      {item.handle}
                      <Verified className="size-[15px]" />
                    </p>
                    <p className="text-[13px] text-ink-mid">{item.niche}</p>
                  </div>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <p>
                    <span className="display money block text-[2.75rem] leading-none text-ink">{item.value}</span>
                    <span className="mt-2 block text-[14px] text-ink-mid">{item.label}</span>
                  </p>
                  <Sparkline points={item.points} className="h-14 w-28 shrink-0 sm:w-36" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
