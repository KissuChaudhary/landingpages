import { Play } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Clip } from "@/components/ui/Section";
import { siteConfig } from "@/site.config";

import { HeroEditor } from "./HeroEditor";

const AVATARS = ["bg-flame", "bg-blue-soft", "bg-green-soft"];

/**
 * Hero: centred headline with the orange "clip" on its last word, then the editor drawing at full content
 * width. The headline is 96px / 1.0 on desktop; keep `headline.clip` to one or two short words, because
 * the clip cannot wrap.
 */
export function Hero() {
  const { hero } = siteConfig;

  return (
    <section id="top" className="relative pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="mx-auto flex w-[var(--content)] flex-col items-center text-center">
        <p className="inline-flex items-center gap-3 rounded-full border border-line-strong bg-paper py-1 pl-1 pr-4 text-[13px] font-semibold text-text-mid">
          <span aria-hidden className="flex -space-x-2">
            {["N", "M", "D"].map((letter, i) => (
              <span
                key={letter}
                className={`grid size-7 place-items-center rounded-full border-2 border-paper text-[11px] font-bold text-ink ${AVATARS[i]}`}
              >
                {letter}
              </span>
            ))}
          </span>
          {hero.proof}
        </p>

        <h1 className="display mt-8 max-w-[10em] text-balance text-[clamp(2.75rem,1rem+7vw,6.5rem)] leading-[0.98] text-text">
          {hero.headline.before} <Clip>{hero.headline.clip}</Clip>
        </h1>

        <p className="text-pretty mt-7 max-w-[34rem] text-[1.0625rem] font-medium leading-[1.6] text-text-mid md:text-[1.25rem]">
          {hero.description}
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
          <a
            href={hero.secondaryCta.href}
            className="group inline-flex h-13 items-center gap-2.5 rounded-full px-6 text-[16px] font-semibold text-text-mid outline-none transition-colors hover:bg-wash hover:text-text focus-visible:ring-2 focus-visible:ring-text"
          >
            <Play className="size-4 fill-current transition-transform duration-300 group-hover:scale-110" />
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>

      <div className="mt-14 md:mt-20">
        <HeroEditor />
      </div>
    </section>
  );
}
