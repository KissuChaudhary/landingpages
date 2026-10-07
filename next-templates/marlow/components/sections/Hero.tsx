import { Button } from "@/components/ui/Button";
import { Title } from "@/components/ui/Section";
import { siteConfig } from "@/site.config";

import { HeroPanels } from "./HeroPanels";

/**
 * Hero. Desktop: copy on the left (7 of 12 columns), panels on the right. Phones: copy, then panels.
 * The headline is 96px / 1.0 on desktop and sets in three lines; keep it to about 36 characters.
 */
export function Hero() {
  const { hero } = siteConfig;

  return (
    <section id="top" className="relative pb-20 pt-32 md:pb-28 md:pt-44">
      <div className="mx-auto grid w-[var(--content)] items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-paper-raised/70 px-3.5 py-1.5 text-[13px] text-ink-mid">
            {hero.eyebrow.live ? (
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#3f9b6b] opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-[#3f9b6b]" />
              </span>
            ) : null}
            {hero.eyebrow.text}
          </p>

          <h1 className="display mt-7 max-w-[10.5em] text-balance text-[clamp(2.75rem,1.1rem+6.4vw,6rem)] leading-[0.98] text-ink">
            <Title title={hero.headline} />
          </h1>

          <p className="text-pretty mt-7 max-w-[30rem] text-[1.0625rem] leading-[1.65] text-ink-mid md:text-[1.1875rem]">
            {hero.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <HeroPanels />
        </div>
      </div>
    </section>
  );
}
