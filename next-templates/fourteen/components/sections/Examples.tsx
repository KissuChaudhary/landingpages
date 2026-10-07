import { ArrowUpRight, Building2, Camera, Rocket, Zap } from "lucide-react";

import { Button, Container, Ring, SectionHead } from "@/components/ui/Kit";
import { siteConfig } from "@/site.config";

const icons = { rocket: Rocket, building: Building2, camera: Camera, bolt: Zap };

/** Four campaigns as peach-ringed cards: who it was for, the subject line, and what it earned. */
export function Examples() {
  const { examples } = siteConfig;

  return (
    <section id="results" className="scroll-mt-28 pb-24 sm:pb-32">
      <Container>
        <SectionHead title={examples.title} description={examples.description} />

        <ul className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2">
          {examples.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.client}>
                <Ring className="h-full" innerClassName="flex flex-col p-5 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-wide text-ink">
                      <span className="flex size-10 items-center justify-center rounded-lg border border-line bg-wash text-ink-mid">
                        <Icon className="size-[18px]" />
                      </span>
                      {item.client}
                    </p>
                    <ArrowUpRight className="size-4 text-ink-low" aria-hidden />
                  </div>
                  <h3 className="mt-7 font-serif text-[1.5rem] sm:mt-9 sm:text-[1.75rem] leading-[1.2] text-ink">&ldquo;{item.subject}&rdquo;</h3>
                  <p className="mt-9 flex items-center gap-3 border-t border-line pt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-mid">
                    <span aria-hidden className="h-px w-4 bg-line-strong" />
                    {item.reply}
                    <span aria-hidden className="size-1 rounded-full bg-peach" />
                    {item.meetings}
                  </p>
                </Ring>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 flex justify-center">
          <Button href={examples.cta.href}>{examples.cta.label}</Button>
        </div>
      </Container>
    </section>
  );
}
