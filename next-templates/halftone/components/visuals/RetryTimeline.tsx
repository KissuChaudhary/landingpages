"use client";

import { useRef } from "react";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { site } from "@/site.config";
import { usePlayback, useSequence } from "@/components/motion/hooks";
import { StatusPill } from "@/components/ui/Status";

const ATTEMPTS = [
  { label: "Attempt 1", at: "0s", result: "503", ok: false },
  { label: "Attempt 2", at: "+30s", result: "503", ok: false },
  { label: "Attempt 3", at: "+5m", result: "Timeout", ok: false },
  { label: "Attempt 4", at: "+30m", result: "200 OK", ok: true },
];
const SCHEDULE = "Backoff: 30s · 5m · 30m · 2h · 5h · 10h";
const BEATS = [700, 900, 900, 900, 3200] as const;

/** One event, four attempts: the line fills attempt by attempt until the endpoint recovers. */
export function RetryTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { playing, reduced } = usePlayback(ref, 0.4);
  const [sequence] = useSequence(BEATS, playing);
  const shown = reduced ? ATTEMPTS.length : sequence;
  const delivered = shown >= ATTEMPTS.length;
  const endpoint = site.samples.endpoints[2];
  const fill = shown <= 1 ? 0 : (shown - 1) / (ATTEMPTS.length - 1);

  return (
    <div ref={ref} aria-hidden="true" className="flex h-full flex-col justify-between p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 truncate font-mono text-[12.5px] text-neutral-500">
          <span className="font-medium text-ink">invoice.failed</span> → {endpoint.host}
        </p>
        <StatusPill tone={delivered ? "ok" : "warn"}>{delivered ? "Delivered" : "Retrying"}</StatusPill>
      </div>

      <div className="relative px-3.5">
        <div className="absolute inset-x-[14px] top-[13px] h-[2px] rounded-full bg-black/[0.06]" />
        <div
          className="absolute left-[14px] top-[13px] h-[2px] rounded-full bg-accent transition-[width] duration-700 ease-mk"
          style={{ width: `calc((100% - 28px) * ${fill})` }}
        />
        <ol className="relative flex justify-between">
          {ATTEMPTS.map((attempt, index) => {
            const done = index < shown;
            return (
              <li key={attempt.label} className="flex w-0 flex-col items-center">
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full ring-4 ring-white transition-all duration-500 ease-mk",
                    !done ? "scale-90 bg-neutral-200" : attempt.ok ? "bg-emerald-500 text-white" : "bg-rose-500 text-white",
                  )}
                >
                  {done ? attempt.ok ? <Check className="size-3.5" strokeWidth={3} /> : <X className="size-3.5" strokeWidth={3} /> : null}
                </span>
                <span className="mt-3 whitespace-nowrap text-[11.5px] font-semibold text-ink">{attempt.label}</span>
                <span className="mt-0.5 whitespace-nowrap font-mono text-[11px] text-neutral-400">{attempt.at}</span>
                <span
                  className={cn(
                    "mt-2 whitespace-nowrap rounded-full px-2 py-0.5 font-mono text-[10.5px] font-medium transition-all duration-500",
                    !done ? "opacity-0" : attempt.ok ? "bg-emerald-500/10 text-emerald-700" : "bg-rose-500/10 text-rose-700",
                  )}
                >
                  {attempt.result}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="font-mono text-[11px] text-neutral-400">{SCHEDULE}</p>
    </div>
  );
}
