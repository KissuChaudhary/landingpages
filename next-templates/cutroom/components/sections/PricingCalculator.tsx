"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { NumberRoll } from "@/components/hairline/number-roll";
import { TextMorph } from "@/components/hairline/text-morph";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

const money = (value: number) => `$${Math.round(value).toLocaleString("en-US")}`;

/**
 * Pricing as a calculator: choose a format and how many videos you publish each month, and the total updates
 * (it is announced politely to screen readers). The price is per-video price x count, less the volume
 * discount. Every number comes from site.config.ts (pricing.formats and pricing.volumes).
 */
export function PricingCalculator() {
  const { formats, volumes, included, includedTitle, cta, footnote } = siteConfig.pricing;
  const [format, setFormat] = useState(0);
  const [volume, setVolume] = useState(1);

  const chosenFormat = formats[format];
  const chosenVolume = volumes[volume];
  const gross = chosenFormat.perVideo * chosenVolume.count;
  const total = gross * (1 - chosenVolume.discount);
  const perVideo = total / chosenVolume.count;
  const saving = gross - total;

  const option = (selected: boolean) =>
    cn(
      "rounded-2xl border px-4 py-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2",
      selected ? "border-ink bg-ink text-on-ink" : "border-line-strong bg-paper text-text hover:border-text",
    );

  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
      <div className="rounded-3xl border border-line bg-wash p-5 sm:p-8 lg:col-span-7">
        <fieldset>
          <legend className="timecode mb-4 text-text-low">1 · Format</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {formats.map((f, i) => (
              <label key={f.name} className={cn("cursor-pointer", option(i === format), "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-text has-[:focus-visible]:ring-offset-2")}>
                <input type="radio" name="format" className="sr-only" checked={i === format} onChange={() => setFormat(i)} />
                <span className="display block text-[1.5rem] leading-none">{f.name}</span>
                <span className={cn("mt-2 block text-[14px]", i === format ? "text-on-ink-mid" : "text-text-mid")}>
                  {f.note} · {money(f.perVideo)} / video
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="timecode mb-4 text-text-low">2 · Videos per month</legend>
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {volumes.map((v, i) => (
              <label key={v.count} className={cn("cursor-pointer", option(i === volume), "!px-0 text-center", "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-text has-[:focus-visible]:ring-offset-2")}>
                <input type="radio" name="volume" className="sr-only" checked={i === volume} onChange={() => setVolume(i)} />
                <span className="display block text-[1.5rem] leading-none sm:text-[1.75rem]">{v.count}</span>
                <span className={cn("timecode mt-2 block text-[10px] sm:text-[11px]", i === volume ? "text-flame" : "text-text-low")}>
                  {v.discount ? `-${Math.round(v.discount * 100)}%` : "list"}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-8 border-t border-line-strong pt-6">
          <p className="timecode mb-4 text-text-low">{includedTitle}</p>
          <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] font-medium leading-snug text-text">
                <span aria-hidden className="mt-px grid size-5 shrink-0 place-items-center rounded-full bg-flame text-ink">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-3xl bg-ink p-6 text-on-ink sm:p-8 lg:col-span-5">
        <div>
          <p className="timecode text-on-ink-mid">
            <TextMorph>{`${chosenVolume.count} ${chosenFormat.name.toLowerCase()} videos a month`}</TextMorph>
          </p>
          <p aria-live="polite" className="mt-6">
            <span className="display block text-[clamp(3.5rem,2rem+6vw,6rem)] leading-none text-on-ink">
              <NumberRoll value={Math.round(total)} prefix="$" locales="en-US" />
            </span>
            <span className="mt-2 block text-[15px] text-on-ink-mid">per month</span>
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-ink-line pt-6">
            <div>
              <dt className="timecode text-on-ink-mid">Per video</dt>
              <dd className="display mt-1.5 text-[1.75rem] leading-none text-on-ink">
                <NumberRoll value={Math.round(perVideo)} prefix="$" locales="en-US" />
              </dd>
            </div>
            <div>
              <dt className="timecode text-on-ink-mid">You save</dt>
              <dd className={cn("display mt-1.5 text-[1.75rem] leading-none", saving ? "text-flame" : "text-on-ink-mid")}>
                <NumberRoll value={Math.round(saving)} prefix="$" locales="en-US" />
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-10">
          <Button href={cta.href} variant="light" className="w-full justify-between">
            {cta.label}
          </Button>
          <p className="mt-4 text-[13px] leading-snug text-on-ink-mid">{footnote}</p>
        </div>
      </div>
    </div>
  );
}
