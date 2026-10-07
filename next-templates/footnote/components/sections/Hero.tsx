import { ArrowUpRight } from "lucide-react";

import { Button, TextLink } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

import { PixelField } from "./PixelField";

export function Hero() {
  const { hero } = siteConfig;

  return (
    <section id="top" aria-labelledby="hero-title">
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-full md:w-[70%]">
          <PixelField />
        </div>
        <div className="relative px-6 pb-20 pt-16 md:px-12 md:pb-24 md:pt-24">
          <a
            href={hero.announcement.href}
            className="group inline-flex max-w-full items-center gap-2 rounded-2xl border border-line-strong bg-bg/70 py-1.5 pl-3.5 pr-3 text-[14px] text-text-mid backdrop-blur-sm transition-colors hover:text-text"
          >
            <span>{hero.announcement.label}</span>
            <ArrowUpRight className="size-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <h1
            id="hero-title"
            className="display mt-8 text-balance text-[clamp(3.25rem,1.2rem+8.4vw,5.5rem)] leading-[0.98] text-text"
          >
            <Heading title={hero.headline} />
          </h1>

          <p className="text-pretty mt-8 max-w-[33rem] text-[1.125rem] leading-[1.65] text-text-mid">{hero.description}</p>

          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <TextLink href={hero.secondaryCta.href}>{hero.secondaryCta.label}</TextLink>
          </div>
        </div>
      </div>

      <Divider />
      <div className="flex flex-col gap-x-12 gap-y-4 px-6 py-8 md:flex-row md:items-center md:px-12">
        <p className="text-[14px] text-text-low">{hero.logosLabel}</p>
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-3">
          {hero.logos.map((logo) => (
            <li key={logo} className="display text-[1.375rem] leading-none text-text-mid">
              {logo}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
