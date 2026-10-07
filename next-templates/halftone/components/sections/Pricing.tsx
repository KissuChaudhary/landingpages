"use client";

import { useId, useState, type CSSProperties } from "react";
import { ArrowUpRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { site, type Plan } from "@/site.config";
import { BrandGlyph } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { Reveal, SectionHeader } from "@/components/ui/Reveal";

const STEPS = 1000;

const LABELS = {
  perMonth: "/ month",
  atVolume: (volume: string) => `at ${volume} events a month`,
  overLimit: (limit: string) => `Up to ${limit} events a month`,
  bestFit: "Lowest price here",
  unit: "events / month",
};

/** 2.5M, 250k, 10k. */
function compact(value: number) {
  const trim = (number: number) => (Number.isInteger(number) ? String(number) : number.toFixed(1).replace(/\.0$/, ""));
  if (value >= 1_000_000) return `${trim(value / 1_000_000)}M`;
  if (value >= 1_000) return `${trim(value / 1_000)}k`;
  return String(value);
}

/** Two significant figures, so the slider lands on numbers people actually say. */
function round(value: number) {
  const unit = 10 ** (Math.floor(Math.log10(value)) - 1);
  return Math.round(value / unit) * unit;
}

/** Monthly price for a plan at a volume, or null when the volume is past the plan's hard limit. */
function priceAt(plan: Plan, volume: number) {
  if (plan.limit !== undefined && volume > plan.limit) return null;
  const overage = plan.perMillion ? (Math.max(0, volume - plan.included) / 1_000_000) * plan.perMillion : 0;
  return Math.round(plan.base + overage);
}

function PlanCard({ plan, volume, best }: { plan: Plan; volume: number; best: boolean }) {
  const price = priceAt(plan, volume);
  const available = price !== null;
  return (
    <article
      className={cn(
        "surface flex h-full flex-col rounded-[32px] p-2 ring-1 transition-[box-shadow,opacity] duration-500",
        best ? "ring-accent/35" : "ring-transparent",
        !available && "opacity-60",
      )}
    >
      <div className="rounded-[26px] bg-white p-6 ring-1 ring-black/[0.05] sm:p-7">
        <div className="flex min-h-6 items-center justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight text-ink">{plan.name}</h3>
          {best ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
              <BrandGlyph className="size-3" />
              {LABELS.bestFit}
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-body md:min-h-[2lh]">{plan.description}</p>

        <div className="mt-6 flex items-baseline gap-1.5">
          <span
            className={cn(
              "text-5xl font-semibold tracking-[-0.04em] tabular-nums",
              available ? "text-ink" : "text-neutral-300 line-through decoration-2",
            )}
          >
            ${(price ?? plan.base).toLocaleString("en-US")}
          </span>
          {available ? <span className="text-sm font-medium text-neutral-400">{LABELS.perMonth}</span> : null}
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-neutral-500">
          <span className={cn("size-1.5 rounded-full", available ? "bg-accent" : "bg-neutral-300")} aria-hidden="true" />
          {available ? LABELS.atVolume(compact(volume)) : LABELS.overLimit(compact(plan.limit ?? 0))}
        </p>

        <Button href={plan.href} variant={best ? "primary" : "secondary"} className="mt-6 w-full">
          {plan.cta}
        </Button>
      </div>

      <ul className="flex-1 space-y-3 px-5 pb-5 pt-6 sm:px-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-[13px] leading-snug text-neutral-700">
            <span className="mt-px flex size-4 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Check className="size-2.5" strokeWidth={3} />
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Pricing() {
  const { pricing } = site;
  const { slider } = pricing;
  const plans = pricing.plans as readonly Plan[];
  const inputId = useId();

  const logMin = Math.log10(slider.min);
  const logMax = Math.log10(slider.max);
  const toPosition = (value: number) => Math.round(((Math.log10(value) - logMin) / (logMax - logMin)) * STEPS);
  const toVolume = (position: number) => round(10 ** (logMin + (position / STEPS) * (logMax - logMin)));

  const [position, setPosition] = useState(() => toPosition(slider.initial));
  const volume = toVolume(position);
  const fraction = position / STEPS;

  const prices = plans.map((plan) => priceAt(plan, volume));
  const cheapest = Math.min(...prices.filter((price): price is number => price !== null));
  const bestIndex = prices.findIndex((price) => price === cheapest);

  return (
    <section id="pricing" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader align="center" kicker={pricing.kicker} lead={pricing.lead} accent={pricing.accent} description={pricing.description} />

        <Reveal y={24} className="surface mx-auto mb-6 max-w-4xl rounded-[32px] p-2 sm:mb-8">
          <div className="rounded-[26px] bg-white px-6 pb-7 pt-6 ring-1 ring-black/[0.05] sm:px-9 sm:pb-9 sm:pt-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <label htmlFor={inputId} className="text-sm font-semibold text-neutral-500">
                {slider.question}
              </label>
              <p className="text-[32px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums sm:text-[40px]">
                {compact(volume)} <span className="text-base font-medium tracking-normal text-neutral-400">{LABELS.unit}</span>
              </p>
            </div>

            <div className="relative mt-6">
              <input
                id={inputId}
                type="range"
                min={0}
                max={STEPS}
                step={1}
                value={position}
                onChange={(event) => setPosition(Number(event.target.value))}
                aria-valuetext={`${volume.toLocaleString("en-US")} events a month`}
                className="range"
                style={{ "--fill": `calc(12px + (100% - 24px) * ${fraction})` } as CSSProperties}
              />
              <div aria-hidden="true" className="relative mt-2 h-4">
                {slider.ticks.map((tick, index) => {
                  const at = toPosition(tick) / STEPS;
                  return (
                    <span
                      key={tick}
                      className={cn(
                        "absolute top-0 font-mono text-[11px] text-neutral-400",
                        index === 0 ? "translate-x-0" : index === slider.ticks.length - 1 ? "-translate-x-full" : "-translate-x-1/2",
                      )}
                      style={{ left: index === 0 ? 0 : index === slider.ticks.length - 1 ? "100%" : `calc(12px + (100% - 24px) * ${at})` }}
                    >
                      {compact(tick)}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-5 sm:gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.1} y={35} className="h-full">
              <PlanCard plan={plan} volume={volume} best={index === bestIndex} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 text-center">
          <p className="text-[15px] text-body">
            {pricing.enterprise.text}{" "}
            <a href={pricing.enterprise.link.href} className="group inline-flex items-center gap-1 font-semibold text-ink hover:opacity-70">
              {pricing.enterprise.link.label}
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </p>
          <p className="text-xs text-neutral-500">{pricing.footnote}</p>
        </div>
      </div>
    </section>
  );
}
