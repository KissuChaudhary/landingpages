"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";
import { site } from "@/site.config";
import { usePlayback, useSequence } from "@/components/motion/hooks";
import { LiveDot } from "@/components/ui/Status";

const CELLS = 10;
const regions = site.samples.regions;
const BEATS = regions.map(() => 1100);

/** Delivery regions with a halftone traffic bar; the live marker walks down the list. */
export function RegionList() {
  const ref = useRef<HTMLDivElement>(null);
  const { playing, reduced } = usePlayback(ref, 0.4);
  const [active] = useSequence(BEATS, playing);

  return (
    <div ref={ref} aria-hidden="true" className="flex h-full flex-col justify-center px-3 py-4 sm:px-4">
      <ul className="space-y-0.5">
        {regions.map((region, index) => {
          const on = !reduced && index === active;
          const filled = Math.round(region.share * CELLS);
          return (
            <li
              key={region.code}
              className={cn("flex items-center gap-3 rounded-xl px-2.5 py-[7px] transition-colors duration-500", on ? "bg-accent/[0.06]" : "bg-transparent")}
            >
              <span className="flex w-3 justify-center">{on ? <LiveDot tone="accent" /> : <span className="size-1.5 rounded-full bg-neutral-300" />}</span>
              <span className="w-8 font-mono text-[12px] font-medium text-ink">{region.code}</span>
              <span className="hidden min-w-0 flex-1 truncate text-[12px] text-neutral-500 sm:block lg:hidden xl:block">{region.city}</span>
              <span className="ml-auto flex gap-[2px]">
                {Array.from({ length: CELLS }, (_, cell) => (
                  <span
                    key={cell}
                    className={cn("size-[5px] rounded-[1.5px] transition-colors duration-500", cell < filled ? (on ? "bg-accent" : "bg-accent/45") : "bg-black/[0.07]")}
                  />
                ))}
              </span>
              <span className="w-11 text-right font-mono text-[12px] tabular-nums text-neutral-500">{region.ms} ms</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
