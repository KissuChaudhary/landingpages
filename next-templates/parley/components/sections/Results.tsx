import { Container, Heading } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

/** The one dark moment on the page: a plum band with a single large number and two smaller ones. */
export function Results() {
  const { results } = siteConfig;
  const [lead, ...rest] = results.stats;

  return (
    <section aria-label={results.label} className="px-3 sm:px-5">
      <div className="mx-auto max-w-[1360px] rounded-[32px] bg-plum py-16 text-on-plum sm:rounded-[44px] sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <p className="text-[14px] font-semibold text-rose-soft">{results.label}</p>
            <p className="display mt-6 text-[clamp(6rem,3rem+14vw,11rem)] leading-[0.85] text-on-plum">{lead.value}</p>
            <p className="mt-6 max-w-[22rem] text-[1.125rem] leading-snug text-on-plum-mid">{lead.label}</p>
          </div>

          <div className="flex flex-col justify-between gap-12">
            <div>
              <h2 className="display text-balance text-[clamp(1.875rem,1.2rem+2.4vw,2.75rem)] leading-[1.1] text-on-plum">
                <Heading title={results.headline} accentClassName="text-rose-soft" />
              </h2>
              <p className="text-pretty mt-5 max-w-[30rem] text-[1.0625rem] leading-[1.65] text-on-plum-mid">{results.description}</p>
            </div>
            <dl className="grid grid-cols-2 gap-8 border-t border-white/15 pt-8">
              {rest.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-2">
                  <dd className="display text-[2.5rem] leading-none text-on-plum">{stat.value}</dd>
                  <dt className="text-[14px] leading-snug text-on-plum-mid">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </div>
    </section>
  );
}
