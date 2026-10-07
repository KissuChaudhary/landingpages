"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";
import { site } from "@/site.config";
import { EASE, usePlayback, useSequence } from "@/components/motion/hooks";
import { StatusPill } from "@/components/ui/Status";

const FAILED = [
  { type: "invoice.paid", at: "2h ago" },
  { type: "customer.created", at: "2h ago" },
  { type: "invoice.failed", at: "3h ago" },
];
const TOTAL = "1,284";
const BEATS = [900, 350, 450, 450, 450, 2800] as const;

/** Events that failed during a customer's outage, replayed in one click. */
export function ReplayList() {
  const ref = useRef<HTMLDivElement>(null);
  const { playing, reduced } = usePlayback(ref, 0.4);
  const [sequence] = useSequence(BEATS, playing);
  const step = reduced ? BEATS.length - 1 : sequence;
  const pressed = step === 1;
  const replayed = Math.max(0, step - 1);
  const done = step >= BEATS.length - 1;
  const endpoint = site.samples.endpoints[2];

  return (
    <div ref={ref} aria-hidden="true" className="flex h-full flex-col p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2 px-1">
        <p className="truncate text-[12.5px] font-semibold text-ink">{endpoint.name} outage</p>
        <span className="font-mono text-[11px] tabular-nums text-neutral-400">{done ? `${TOTAL} replayed` : `${TOTAL} failed`}</span>
      </div>

      <ul className="space-y-1">
        {FAILED.map((event, index) => {
          const ok = index < replayed;
          return (
            <li key={event.type} className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors duration-500" style={{ backgroundColor: ok ? "rgba(16,185,129,0.06)" : "rgba(0,0,0,0.025)" }}>
              <span className={cn("flex size-4 shrink-0 items-center justify-center rounded-[5px] transition-colors duration-300", ok || pressed || step > 1 ? "bg-accent" : "bg-white ring-1 ring-black/15")}>
                <svg viewBox="0 0 12 12" className="size-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="m2.5 6.2 2.2 2.2 4.8-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-ink">{event.type}</span>
              <StatusPill tone={ok ? "ok" : "fail"} dot={false}>
                {ok ? "200" : "503"}
              </StatusPill>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto pt-3">
        <motion.div
          animate={{ scale: pressed ? 0.97 : 1 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "relative flex h-9 items-center justify-center gap-2 overflow-hidden rounded-full text-[13px] font-semibold transition-colors duration-500",
            done ? "bg-emerald-500 text-white" : "bg-ink text-white",
          )}
        >
          <motion.span
            className="absolute inset-y-0 left-0 bg-white/15"
            initial={false}
            animate={{ width: done ? "100%" : `${(replayed / FAILED.length) * 100}%` }}
            transition={{ duration: step === 0 ? 0 : 0.45, ease: EASE }}
          />
          <RotateCcw className="relative size-3.5" />
          <span className="relative">{done ? "All events delivered" : `Replay ${TOTAL} events`}</span>
        </motion.div>
      </div>
    </div>
  );
}
