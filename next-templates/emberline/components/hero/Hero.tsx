import { siteConfig } from "@/site.config";
import { Button } from "@/components/ui/Button";

import { DashboardMockup } from "./DashboardMockup";
import { EnergyLines } from "./EnergyLines";
import { Row, Rails } from "./GridFrame";
import { TiltFrame } from "./TiltFrame";

/**
 * Hero layout (desktop, 1440 wide). Rows are multiples of 32px; all copy comes from site.config.ts.
 *
 *   badge    96px   one line, 13px
 *   headline 256px  two lines, 72px / 1.04, weight 500, tracking -0.02em, balanced, max 11em wide
 *   body     160px  two lines, 18px / 28px, max 34rem
 *   actions  128px  primary + secondary button, 48px tall
 *
 * Phones use 192 / 128 / 128 / 128 and a 36-40px headline.
 */
export function Hero() {
  const { hero } = siteConfig;

  return (
    <section id="top" className="relative isolate overflow-hidden bg-bg pb-10 pt-[136px] md:pt-[152px]">
      {/* Light: one warm pool behind the headline, plus a faint wash from the top. Both are pure CSS. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[250px] -z-10 h-[460px] w-[min(1000px,140vw)] -translate-x-1/2 bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-ember-400)_22%,transparent),color-mix(in_srgb,var(--color-ember-500)_7%,transparent)_55%,transparent)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(70%_100%_at_50%_0%,color-mix(in_srgb,var(--color-ember-200)_7%,transparent),transparent)]"
      />

      <Rails />

      <div className="relative z-10 flex flex-col items-center">
        {/* Badge */}
        <Row lineTop lineBottom markers="bottom" className="h-24">
          <a
            href="#features"
            className="group inline-flex max-w-[calc(100%-1.5rem)] items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.03] py-1 pl-1 pr-3.5 text-[13px] text-ink-mid shadow-[0_0_24px_-6px_color-mix(in_srgb,var(--color-ember-400)_35%,transparent)] outline-none transition-colors hover:border-ember-300/50 hover:text-ink focus-visible:ring-2 focus-visible:ring-ember-300"
          >
            <span className="rounded-full bg-ember-300 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-on-ember">
              {hero.badge.tag}
            </span>
            <span className="min-w-0 truncate">{hero.badge.text}</span>
          </a>
        </Row>

        {/* Headline */}
        <Row lineBottom markers="bottom" className="h-48 md:h-64">
          <h1 className="mx-auto max-w-[11em] text-balance px-6 text-center text-[clamp(2.25rem,1.4rem+4.6vw,4.5rem)] font-medium leading-[1.04] tracking-[-0.02em] text-ink">
            {hero.headline.before}{" "}
            <em className="bg-gradient-to-b from-ember-100 via-ember-200 to-ember-400 bg-clip-text pr-[0.08em] font-serif text-[1.08em] font-normal italic tracking-[-0.015em] text-transparent">
              {hero.headline.accent}
            </em>
          </h1>
        </Row>

        {/* Description */}
        <Row lineBottom markers="bottom" className="h-32 md:h-40">
          <p className="text-pretty max-w-[34rem] px-6 text-center text-base leading-[1.65] text-ink-mid md:text-[1.125rem] md:leading-7">
            {hero.description}
          </p>
        </Row>

        {/* Actions */}
        <Row lineBottom markers="bottom" className="h-32">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </Row>

        {/* Product: exactly as wide as the outer rails, so the lines land on its edges. */}
        <div className="relative mt-24 w-[var(--rail-outer)] [perspective:1800px]">
          <EnergyLines />
          <TiltFrame>
            <DashboardMockup />
          </TiltFrame>
        </div>
      </div>
    </section>
  );
}
