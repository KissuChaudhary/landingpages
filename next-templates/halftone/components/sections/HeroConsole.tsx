"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RotateCw, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { site } from "@/site.config";
import { EASE, usePlayback } from "@/components/motion/hooks";
import { LiveDot, StatusPill } from "@/components/ui/Status";

/* Labels inside the console. Page copy is in site.config.ts. */
const LABELS = {
  tabs: ["Deliveries", "Endpoints", "Event types"],
  live: "Live",
  region: "us-east-1",
  columns: ["Status", "Event", "Latency", "Age"],
  delivered: "200 OK",
  retrying: "503 · retrying",
  recovered: "200 · 2nd try",
  retryIn: "30s",
  now: "now",
  stats: { delivered: "Delivered today", success: "Success rate", latency: "p50 latency" },
  successRate: "99.98%",
  p50: "38 ms",
  failedNote: (host: string) => `${host} returned 503`,
  failedDetail: "Retry scheduled with backoff",
  recoveredNote: "Recovered on retry",
  recoveredDetail: (type: string) => `${type} · 200 OK`,
};

const TICK_MS = 1500;
const VISIBLE_ROWS = 6;
/** Ticks between a failed attempt and its successful retry. */
const RETRY_AFTER = 3;

type Row = {
  uid: number;
  type: string;
  endpoint: string;
  ms: number;
  born: number;
  state: "ok" | "retrying" | "recovered";
  resolveAt?: number;
};

type Log = { tick: number; rows: Row[]; delivered: number };

const script = site.samples.deliveries;

function advance(log: Log): Log {
  const tick = log.tick + 1;
  const sample = script[tick % script.length];
  const fails = "fails" in sample && sample.fails === true;
  const row: Row = {
    uid: tick,
    type: sample.type,
    endpoint: sample.endpoint,
    ms: sample.ms,
    born: tick,
    state: fails ? "retrying" : "ok",
    resolveAt: fails ? tick + RETRY_AFTER : undefined,
  };
  const rows = [row, ...log.rows]
    .map((item) => (item.state === "retrying" && item.resolveAt === tick ? { ...item, state: "recovered" as const, ms: 44 } : item))
    .slice(0, VISIBLE_ROWS);
  return { tick, rows, delivered: log.delivered + 1 };
}

/** Builds the opening state by playing the script forward, so server and client render the same rows. */
function initialLog(): Log {
  let log: Log = { tick: -1, rows: [], delivered: 18_203 };
  for (let index = 0; index < VISIBLE_ROWS + 1; index += 1) log = advance(log);
  return log;
}

function age(row: Row, tick: number) {
  const seconds = Math.round((tick - row.born) * (TICK_MS / 1000));
  return seconds === 0 ? LABELS.now : `${seconds}s`;
}

function Status({ row }: { row: Row }) {
  if (row.state === "retrying") return <StatusPill tone="warn">{LABELS.retrying}</StatusPill>;
  if (row.state === "recovered") return <StatusPill tone="ok">{LABELS.recovered}</StatusPill>;
  return <StatusPill tone="ok">{LABELS.delivered}</StatusPill>;
}

/** The hero's product shot: a delivery log that fills in live, including one failure that recovers on retry. */
export function HeroConsole() {
  const ref = useRef<HTMLDivElement>(null);
  const { playing } = usePlayback(ref, 0.2);
  const [log, setLog] = useState(initialLog);

  useEffect(() => {
    if (!playing) return;
    const interval = window.setInterval(() => setLog(advance), TICK_MS);
    return () => window.clearInterval(interval);
  }, [playing]);

  const retrying = log.rows.find((row) => row.state === "retrying");
  const recovered = log.rows.find((row) => row.state === "recovered" && row.resolveAt !== undefined && log.tick - row.resolveAt < 2);
  const host = (row: Row) => row.endpoint.split("/")[0];
  const chip = retrying
    ? { key: `retry-${retrying.uid}`, tone: "warn" as const, title: LABELS.failedNote(host(retrying)), detail: LABELS.failedDetail }
    : recovered
      ? { key: `ok-${recovered.uid}`, tone: "ok" as const, title: LABELS.recoveredNote, detail: LABELS.recoveredDetail(recovered.type) }
      : null;

  return (
    <figure ref={ref} className="relative" aria-label="Illustration: a live log of webhook deliveries">
      <div aria-hidden="true" className="surface rounded-[30px] p-2 shadow-[0_50px_100px_-60px_rgba(15,23,42,0.5)]">
        <div className="overflow-hidden rounded-[24px] bg-white ring-1 ring-black/[0.05]">
          {/* Window bar */}
          <div className="flex items-center justify-between gap-3 border-b border-black/[0.05] px-4 py-3 sm:px-5">
            <div className="flex items-center gap-1 text-[13px] font-semibold">
              {LABELS.tabs.map((tab, index) => (
                <span key={tab} className={cn("rounded-full px-3 py-1", index === 0 ? "bg-black/[0.05] text-ink" : "hidden text-neutral-400 sm:inline")}>
                  {tab}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
              <LiveDot />
              {LABELS.live}
              <span className="hidden font-mono font-normal text-neutral-400 sm:inline">· {LABELS.region}</span>
            </div>
          </div>

          {/* Column labels */}
          <div className="grid grid-cols-[108px_minmax(0,1fr)_52px] items-center gap-3 px-4 pb-1.5 pt-3 text-[10.5px] font-semibold uppercase tracking-wider text-neutral-400 sm:grid-cols-[116px_minmax(0,1fr)_64px_44px] sm:px-5">
            <span>{LABELS.columns[0]}</span>
            <span>{LABELS.columns[1]}</span>
            <span className="text-right">{LABELS.columns[2]}</span>
            <span className="hidden text-right sm:block">{LABELS.columns[3]}</span>
          </div>

          {/* Rows */}
          <div className="relative h-[336px] overflow-hidden px-2">
            <AnimatePresence initial={false} mode="popLayout">
              {log.rows.map((row) => (
                <motion.div
                  key={row.uid}
                  layout
                  initial={{ opacity: 0, y: -14, backgroundColor: "rgba(48,93,222,0.07)" }}
                  animate={{ opacity: 1, y: 0, backgroundColor: "rgba(48,93,222,0)" }}
                  // The oldest row slides out of the bottom with the rest of the list instead of fading in place.
                  exit={{ opacity: 0, y: 56 }}
                  transition={{ duration: 0.6, ease: EASE, backgroundColor: { duration: 1.6 } }}
                  className="grid h-14 grid-cols-[108px_minmax(0,1fr)_52px] items-center gap-3 rounded-2xl px-2 sm:grid-cols-[116px_minmax(0,1fr)_64px_44px] sm:px-3"
                >
                  <span>
                    <Status row={row} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-mono text-[12.5px] font-medium text-ink">{row.type}</span>
                    <span className="block truncate text-[12px] text-neutral-400">{row.endpoint}</span>
                  </span>
                  <span className={cn("text-right font-mono text-[12px] tabular-nums", row.state === "retrying" ? "text-orange-600" : "text-neutral-600")}>
                    {row.state === "retrying" ? LABELS.retryIn : `${row.ms} ms`}
                  </span>
                  <span className="hidden text-right font-mono text-[12px] tabular-nums text-neutral-400 sm:block">{age(row, log.tick)}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white" />
          </div>

          {/* Totals */}
          <div className="grid grid-cols-3 border-t border-black/[0.05] text-left">
            {[
              { label: LABELS.stats.delivered, value: log.delivered.toLocaleString("en-US") },
              { label: LABELS.stats.success, value: LABELS.successRate },
              { label: LABELS.stats.latency, value: LABELS.p50 },
            ].map((stat, index) => (
              <div key={stat.label} className={cn("px-4 py-3 sm:px-5", index > 0 && "border-l border-black/[0.05]")}>
                <p className="text-[10.5px] font-semibold uppercase tracking-wider text-neutral-400">{stat.label}</p>
                <p className="mt-0.5 font-mono text-[13px] font-medium tabular-nums text-ink sm:text-sm">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* A floating note that calls out the retry as it happens. */}
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-11 right-10 hidden xl:block">
        <AnimatePresence mode="wait">
          {chip ? (
            <motion.div
              key={chip.key}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="flex items-center gap-3 rounded-[18px] bg-white py-2.5 pl-2.5 pr-4 shadow-[0_18px_40px_-16px_rgba(15,23,42,0.4)] ring-1 ring-black/[0.06]"
            >
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-[10px] text-white",
                  chip.tone === "warn" ? "bg-orange-500" : "bg-emerald-500",
                )}
              >
                {chip.tone === "warn" ? <RotateCw className="size-4" /> : <ShieldCheck className="size-4" />}
              </span>
              <span>
                <span className="block text-[13px] font-semibold tracking-tight text-ink">{chip.title}</span>
                <span className="block text-[12px] text-neutral-500">{chip.detail}</span>
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </figure>
  );
}
