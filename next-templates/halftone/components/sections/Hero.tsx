"use client";

import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

import { site } from "@/site.config";
import { DitherField } from "@/components/motion/DitherField";
import { EASE } from "@/components/motion/hooks";
import { Button } from "@/components/ui/Button";
import { InstallCommand } from "@/components/ui/Code";
import { HeroConsole } from "./HeroConsole";

/** Keeps the text and the console on clean white; the dither stays in the outer margins. */
const QUIET_ZONE = { y: 0.46, height: 0.42, width: 0.47, depth: 0.98 };
/** On phones the text runs edge to edge, so the clear band spans the full width behind it. */
const NARROW_QUIET_ZONE = { y: 0.34, height: 0.25, width: 0.62, depth: 0.97 };

function rise(delay: number, y = 18) {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: EASE },
  };
}

export function Hero() {
  const { hero } = site;

  return (
    <section id="top" className="relative overflow-hidden bg-white pb-20 pt-28 sm:pt-32 md:pb-28 lg:pt-40">
      <DitherField
        quietZone={NARROW_QUIET_ZONE}
        className="absolute inset-x-0 top-0 h-[980px] opacity-[0.4] [mask-image:linear-gradient(to_bottom,#000_70%,transparent)] md:hidden"
      />
      <DitherField
        layout="wide"
        quietZone={QUIET_ZONE}
        density={0.6}
        className="absolute inset-x-0 top-0 hidden h-[980px] opacity-[0.42] [mask-image:linear-gradient(to_bottom,#000_70%,transparent)] md:block"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-5">
          <motion.a
            {...rise(0, 15)}
            href={hero.badge.href}
            className="glass group mb-7 inline-flex max-w-full select-none items-center gap-2 rounded-full border border-black/[0.06] py-1 pl-1 pr-3 text-xs font-semibold text-ink"
          >
            <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-accent shadow-[0_2px_8px_-4px_rgba(15,23,42,0.25)] ring-1 ring-black/[0.05]">
              <span className="size-1.5 rounded-full bg-accent" />
              {hero.badge.tag}
            </span>
            <span className="truncate text-neutral-600">{hero.badge.text}</span>
            <ArrowRight className="size-3.5 shrink-0 text-accent transition-transform group-hover:translate-x-0.5" />
          </motion.a>

          <motion.h1
            {...rise(0.1, 22)}
            className="mb-6 text-[44px] font-medium leading-[1.02] tracking-[-0.035em] text-heading sm:text-[58px] lg:text-[62px]"
          >
            {hero.lead}
            <br />
            <span className="font-semibold text-accent">{hero.accent}</span>
          </motion.h1>

          <motion.p {...rise(0.2)} className="mb-9 max-w-lg text-pretty text-base leading-relaxed text-body sm:text-[18px] sm:leading-[28px]">
            {hero.description}
          </motion.p>

          <motion.div {...rise(0.28, 16)} className="flex flex-wrap items-center gap-3">
            <Button href={hero.primary.href} size="lg">
              {hero.primary.label}
            </Button>
            <InstallCommand command={hero.install} />
          </motion.div>

          <motion.ul {...rise(0.38, 12)} className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-medium text-neutral-500">
            {hero.proof.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Check className="size-3.5 text-accent" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="min-w-0 lg:col-span-7"
        >
          <HeroConsole />
        </motion.div>
      </div>
    </section>
  );
}
