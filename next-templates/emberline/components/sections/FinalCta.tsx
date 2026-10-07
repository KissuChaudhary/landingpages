import { Diamond } from "@/components/hero/GridFrame";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/site.config";

export function FinalCta() {
  const { title, description, primary, secondary } = siteConfig.cta;

  return (
    <Section padded={false} className="pb-24 pt-8 md:pb-32">
      <div className="relative isolate overflow-hidden rounded-3xl border border-line-strong bg-bg-raised px-6 py-16 text-center sm:px-12 md:py-24">
        {/* Warm pool of light */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[min(900px,140%)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-ember-400)_26%,transparent),color-mix(in_srgb,var(--color-ember-500)_7%,transparent)_60%,transparent)] blur-2xl"
        />
        {/* Fine grid, faded toward the edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(closest-side_at_50%_50%,#000,transparent)]"
        />
        <Diamond className="left-[-3.5px] top-[-3.5px]" />
        <Diamond className="right-[-3.5px] top-[-3.5px]" />
        <Diamond className="bottom-[-3.5px] left-[-3.5px]" />
        <Diamond className="bottom-[-3.5px] right-[-3.5px]" />

        <h2 className="mx-auto max-w-[11em] text-balance text-[clamp(2.25rem,1.3rem+4vw,4rem)] font-medium leading-[1.04] tracking-[-0.02em] text-ink">
          {title.before}{" "}
          <em className="bg-gradient-to-b from-ember-100 via-ember-200 to-ember-400 bg-clip-text pr-[0.08em] font-serif text-[1.08em] font-normal italic tracking-[-0.012em] text-transparent">
            {title.accent}
          </em>
        </h2>
        <p className="text-pretty mx-auto mt-5 max-w-[30rem] text-base leading-[1.65] text-ink-mid md:text-[1.0625rem]">{description}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button href={primary.href}>{primary.label}</Button>
          <Button href={secondary.href} variant="secondary">
            {secondary.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
