"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { site } from "@/site.config";
import { DitherField } from "@/components/motion/DitherField";
import { EASE, usePlayback, useSequence } from "@/components/motion/hooks";
import { Button } from "@/components/ui/Button";
import { DarkWindow, InstallCommand } from "@/components/ui/Code";
import { Headline, Kicker, Reveal } from "@/components/ui/Reveal";

/** The dither frames the terminal on the right; the text column stays on clean grey. */
const QUIET_ZONE = { y: 0.5, height: 0.5, width: 0.36, depth: 0.97 };

const terminal = site.finalCta.terminal;
/* 0 command · 1 ready · then one beat per line · then hold */
const BEATS = [900, 700, ...terminal.lines.map(() => 850), 3200];

/** `ferry listen`, forwarding test events to localhost one line at a time. */
function ListenTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const { playing, reduced } = usePlayback(ref, 0.3);
  const [sequence] = useSequence(BEATS, playing);
  const step = reduced ? BEATS.length - 1 : sequence;
  const shown = Math.max(0, step - 1);

  return (
    <div ref={ref} aria-hidden="true">
      <DarkWindow title="~/app — zsh">
        <div className="min-h-[288px] p-5 font-mono text-[12.5px] leading-[1.9] sm:p-6">
          <p className="truncate">
            <span className="text-code-string">~/app</span> <span className="text-code-muted">$</span> <span className="text-code">{terminal.command}</span>
          </p>
          <AnimatePresence initial={false}>
            {step >= 1 ? (
              <motion.p key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-2 truncate text-code-muted">
                <span className="text-code-string">✓</span> {terminal.ready}
              </motion.p>
            ) : null}
            {terminal.lines.slice(0, shown).map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex gap-3 whitespace-nowrap"
              >
                <span className="w-4 shrink-0 text-center text-code-muted">{"retry" in line && line.retry ? "↻" : "→"}</span>
                <span className="w-[170px] truncate text-code">{line.type}</span>
                <span className={cn(line.status < 300 ? "text-code-string" : "text-code-number")}>{line.status}</span>
                <span className="text-code-muted">{line.ms}ms</span>
              </motion.p>
            ))}
          </AnimatePresence>
          {!reduced ? <span className="mt-1 inline-block h-[15px] w-[7px] translate-y-[3px] animate-pulse bg-code-muted" /> : null}
        </div>
      </DarkWindow>
    </div>
  );
}

export function FinalCta() {
  const { finalCta } = site;
  return (
    <section id="start" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal y={24} className="surface relative overflow-hidden rounded-[36px]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] [mask-image:linear-gradient(to_right,transparent_6%,#000_30%)] lg:block">
            <DitherField layout="narrow" cell={4} quietZone={QUIET_ZONE} density={0.6} className="absolute inset-0 opacity-[0.4]" />
          </div>

          <div className="relative grid grid-cols-1 items-center gap-10 p-7 sm:p-12 lg:grid-cols-12 lg:gap-12 lg:p-14">
            <div className="lg:col-span-6">
              <Kicker className="mb-5 bg-white">{finalCta.kicker}</Kicker>
              <Headline lead={finalCta.lead} accent={finalCta.accent} />
              <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-body sm:text-[17px]">{finalCta.description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href={finalCta.primary.href} size="lg">
                  {finalCta.primary.label}
                </Button>
                <Button href={finalCta.secondary.href} variant="secondary" size="lg" className="bg-white hover:bg-white/70">
                  {finalCta.secondary.label}
                </Button>
              </div>
              <InstallCommand command={site.hero.install} className="mt-4 bg-white/70" />
            </div>
            <div className="min-w-0 lg:col-span-6">
              <ListenTerminal />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
