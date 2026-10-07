import { Check } from "lucide-react";

import { Button, TextLink } from "@/components/ui/Button";
import { Container, Heading, Leader } from "@/components/ui/Title";
import { cn } from "@/lib/utils";
import { moneyExact } from "@/lib/money";
import { siteConfig } from "@/site.config";

const tones = {
  tax: { bar: "bg-pine", dot: "bg-pine" },
  buffer: { bar: "bg-sage", dot: "bg-sage" },
  yours: { bar: "bg-lime", dot: "bg-lime-deep" },
} as const;

/** The invoice that has just been paid, and how Kept divided it. */
function Sheet() {
  const { sheet } = siteConfig.hero;

  return (
    <div className="rounded-2xl border border-line bg-sheet p-6 sm:p-9">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[13px] text-ink-low">{sheet.number}</p>
          <p className="mt-1 text-[17px] font-medium text-ink">{sheet.client}</p>
        </div>
        <p className="flex items-center gap-1.5 rounded-full bg-lime/60 py-1 pl-2.5 pr-3 text-[13px] font-medium text-pine">
          <Check className="size-3.5" strokeWidth={2.75} />
          {sheet.status}
        </p>
      </div>

      <p className="display money mt-8 text-[clamp(3.5rem,2.4rem+4vw,5.25rem)] leading-none text-ink">{moneyExact(sheet.amount)}</p>

      <div className="mt-9 border-t border-line pt-6">
        <p className="text-[14px] text-ink-mid">{sheet.splitLabel}</p>
        <div aria-hidden className="mt-4 flex h-3 gap-[3px] overflow-hidden rounded-full">
          {sheet.split.map((part) => (
            <span key={part.label} className={cn("block h-full first:rounded-l-full last:rounded-r-full", tones[part.tone].bar)} style={{ width: `${part.percent}%` }} />
          ))}
        </div>

        <ul className="mt-6 space-y-3.5">
          {sheet.split.map((part) => (
            <li key={part.label}>
              <Leader
                className="text-[15px]"
                left={
                  <span className="flex items-center gap-2.5 text-ink">
                    <span aria-hidden className={cn("size-2.5 rounded-full", tones[part.tone].dot)} />
                    {part.label}
                    <span className="text-ink-low">{part.percent}%</span>
                  </span>
                }
                right={<span className="money font-mono text-[14px] font-medium text-ink">{moneyExact((sheet.amount * part.percent) / 100)}</span>}
              />
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 border-t border-line pt-5 text-[14px] text-ink-mid">{sheet.next}</p>
    </div>
  );
}

export function Hero() {
  const { hero } = siteConfig;

  return (
    <section id="top" aria-labelledby="hero-title">
      <Container className="grid items-center gap-14 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24 lg:pt-24">
        <div>
          <h1 id="hero-title" className="display text-balance text-[clamp(3.25rem,1.4rem+7.4vw,5.75rem)] leading-[0.98] text-ink">
            <Heading title={hero.headline} />
          </h1>
          <p className="text-pretty mt-7 max-w-[30rem] text-[1.125rem] leading-[1.65] text-ink-mid">{hero.description}</p>
          <div className="mt-9 flex flex-col gap-x-5 gap-y-2 sm:flex-row sm:items-center">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <TextLink href={hero.secondaryCta.href}>{hero.secondaryCta.label}</TextLink>
          </div>
          <p className="mt-5 text-[14px] text-ink-low">{hero.note}</p>
        </div>

        <div className="mx-auto w-full max-w-[32rem] lg:max-w-none">
          <Sheet />
        </div>
      </Container>

      <Container>
        <dl className="grid grid-cols-3 border-y border-line">
          {hero.stats.map((stat, index) => (
            <div key={stat.label} className={cn("flex flex-col gap-1.5 px-1 py-7 sm:px-6", index > 0 && "border-l border-line", index === 0 && "sm:pl-0")}>
              <dd className="display money text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] leading-none text-ink">{stat.value}</dd>
              <dt className="text-[13px] leading-snug text-ink-mid sm:text-[15px]">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
