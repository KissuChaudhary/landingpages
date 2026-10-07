import { Play, Scissors } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ServiceVisual } from "@/site.config";

/**
 * One small drawing per service, in markup, shown on a dark monitor. Everything here is decorative
 * (aria-hidden): the service's name and description are real text next to it.
 */

const WAVE = [30, 55, 40, 70, 48, 82, 60, 36, 66, 90, 52, 44, 74, 58, 38, 64, 80, 46, 34, 60, 72, 50, 42, 68];

function Long() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-4 sm:p-6">
      <div className="timecode flex gap-2 text-on-ink-mid">
        <span className="rounded bg-flame px-2 py-1 text-ink">00:00 Cold open</span>
        <span className="rounded bg-white/10 px-2 py-1 max-sm:hidden">00:40 Story</span>
        <span className="rounded bg-white/10 px-2 py-1">06:10 Payoff</span>
      </div>
      <div className="flex h-9 gap-1 sm:h-11">
        {[14, 22, 9, 28, 12, 15].map((w, i) => (
          <span key={i} className={cn("flex items-center justify-center rounded", i % 2 ? "bg-blue" : "bg-flame")} style={{ flex: w }}>
            {i === 2 ? <Scissors className="size-3.5 text-ink" /> : null}
          </span>
        ))}
      </div>
      <div className="flex h-12 items-center gap-[3px] sm:h-14">
        {WAVE.map((h, i) => (
          <span key={i} className="flex-1 rounded-full bg-green" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function Shorts() {
  const captions = [
    { a: "Wait for", b: "this" },
    { a: "Nobody", b: "tells you" },
    { a: "Then it", b: "happened" },
  ];
  return (
    <div className="flex h-full items-center justify-center gap-3 p-4 sm:gap-5">
      {captions.map((c, i) => (
        <div
          key={i}
          className={cn(
            "relative isolate flex aspect-[9/16] h-full max-h-60 flex-col justify-end overflow-hidden rounded-xl border p-2.5",
            i === 1 ? "border-flame bg-[linear-gradient(170deg,var(--color-flame),var(--color-plum)_70%,var(--color-ink))]" : "border-ink-line bg-[linear-gradient(170deg,var(--color-blue),var(--color-plum)_70%,var(--color-ink))] opacity-70",
          )}
        >
          <p className="display text-center text-[0.8rem] uppercase leading-[1.05] text-white sm:text-[0.95rem]">
            {c.a} <span className="rounded bg-flame px-1 text-ink">{c.b}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

function Thumbs() {
  const items = [
    { text: "WHY?", cls: "bg-[linear-gradient(135deg,var(--color-blue),var(--color-ink))]" },
    { text: "I QUIT", cls: "bg-[linear-gradient(135deg,var(--color-flame),var(--color-plum))]", win: true },
    { text: "$0 TO $1M", cls: "bg-[linear-gradient(135deg,var(--color-green),var(--color-ink))]" },
  ];
  return (
    <div className="flex h-full items-center justify-center gap-2.5 p-4 sm:gap-3 sm:p-6">
      {items.map((t) => (
        <div
          key={t.text}
          className={cn(
            "relative flex aspect-video min-w-0 flex-1 items-end overflow-hidden rounded-lg border p-2",
            t.cls,
            t.win ? "border-flame" : "border-ink-line opacity-70",
          )}
        >
          <p className="display text-[clamp(0.8rem,0.4rem+1.4vw,1.4rem)] leading-none text-white">{t.text}</p>
          {t.win ? (
            <span className="timecode absolute right-1.5 top-1.5 rounded bg-flame px-1.5 py-0.5 text-[10px] text-ink">+34% CTR</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function Repurpose() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-4 sm:gap-4 sm:p-6">
      <div className="flex h-10 items-center gap-3 rounded-lg bg-flame px-3 sm:h-12">
        <Play className="size-4 fill-ink text-ink" />
        <span className="timecode text-ink">Long video 14:20</span>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {["0:42", "0:58", "0:31", "0:47"].map((t) => (
          <div key={t} className="flex flex-col items-center gap-1.5">
            <span aria-hidden className="h-4 w-px bg-white/30" />
            <div className="flex aspect-[9/14] w-full items-end justify-center rounded-lg bg-[linear-gradient(170deg,var(--color-blue),var(--color-plum))] pb-1.5">
              <span className="timecode rounded bg-ink/60 px-1.5 py-0.5 text-[10px] text-on-ink">{t}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ServiceArt({ visual }: { visual: ServiceVisual }) {
  const art = { long: Long, shorts: Shorts, thumbs: Thumbs, repurpose: Repurpose }[visual];
  const Art = art;
  return (
    <div aria-hidden className="h-56 overflow-hidden rounded-2xl bg-ink sm:h-72">
      <Art />
    </div>
  );
}
