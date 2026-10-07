import { Heart, MessageCircle, Play, Share2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig, type Tone } from "@/site.config";

const TONE: Record<Tone, string> = {
  flame: "bg-flame text-ink",
  blue: "bg-blue text-white",
  ink: "bg-white/20 text-on-ink",
  green: "bg-green text-ink",
};

/**
 * An editing session drawn in markup, so there are no images or videos to host. Layout: the program monitor
 * and a column of two tiles (a vertical short, and the retention gain) on top, the timeline underneath. The
 * clips and the playhead are positioned inside their own track, so they cannot collide with anything else.
 * Edit the content in site.config.ts (hero.editor).
 */
export function HeroEditor() {
  const { editor } = siteConfig.hero;
  const from = Number.parseInt(editor.retention.from, 10) || 0;
  const to = Number.parseInt(editor.retention.to, 10) || 0;

  return (
    <div aria-hidden className="mx-auto w-[var(--content)] rounded-[1.75rem] bg-ink p-2.5 sm:p-3.5">
      <div className="grid gap-2.5 sm:gap-3.5 lg:grid-cols-[1.75fr_1fr]">
        {/* Program monitor */}
        <div className="relative isolate aspect-video overflow-hidden rounded-2xl bg-[linear-gradient(135deg,var(--color-flame)_0%,var(--color-plum)_58%,var(--color-ink)_100%)]">
          <span className="absolute -right-[8%] -top-[30%] -z-10 size-[70%] rounded-full bg-white/15" />
          <span className="absolute -bottom-[40%] left-[10%] -z-10 size-[60%] rounded-full bg-ink/25" />

          <div className="flex items-center justify-between p-3.5 sm:p-5">
            <span className="timecode inline-flex items-center gap-2 rounded-full bg-ink/60 px-3 py-1.5 text-on-ink">
              <span className="size-2 animate-rec rounded-full bg-rec" />
              Rec
            </span>
            <span className="timecode rounded-full bg-ink/60 px-3 py-1.5 text-on-ink">02:14 / {editor.longDuration}</span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-6">
            <p className="display max-w-[11em] text-[clamp(1.5rem,0.6rem+3.6vw,3.25rem)] uppercase leading-[0.95] text-white">
              {editor.longTitle}
            </p>
            <div className="mt-3 flex items-center gap-3 sm:mt-5">
              <Play className="size-4 shrink-0 fill-white text-white" />
              <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
                <span className="block h-full w-[18%] rounded-full bg-white" />
              </span>
            </div>
          </div>
        </div>

        {/* Short + retention */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
          <div className="flex items-center justify-center rounded-2xl bg-ink-raised p-3 sm:p-4">
            <div className="relative isolate flex aspect-[9/16] h-full max-h-[17rem] min-h-[11rem] flex-col justify-end overflow-hidden rounded-[1.1rem] border border-ink-line bg-[linear-gradient(170deg,var(--color-blue)_0%,var(--color-plum)_70%,var(--color-ink)_100%)] p-3">
              <span className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3 text-white/90">
                <Heart className="size-4" />
                <MessageCircle className="size-4" />
                <Share2 className="size-4" />
              </span>
              <p className="display pr-6 text-center text-[1.15rem] uppercase leading-[1.05] text-white">
                {editor.shortCaption.before}{" "}
                <span className="rounded-md bg-flame px-1.5 text-ink">{editor.shortCaption.highlight}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl bg-ink-raised p-3.5 sm:p-5">
            <p className="timecode text-on-ink-mid">{editor.retention.label}</p>
            <div>
              <p className="display text-[clamp(2rem,1.4rem+2vw,3.25rem)] leading-none text-flame">
                {editor.retention.to}
              </p>
              <p className="mt-1 text-[13px] text-on-ink-mid">up from {editor.retention.from}</p>
              <div className="mt-4 space-y-1.5">
                <span className="block h-2 rounded-full bg-white/25" style={{ width: `${from}%` }} />
                <span className="block h-2 rounded-full bg-flame" style={{ width: `${to}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-2.5 rounded-2xl bg-ink-raised p-3 sm:mt-3.5 sm:p-4">
        <div className="flex gap-3">
          <span className="w-7 shrink-0" />
          <div className="ruler-on-ink timecode flex h-6 flex-1 justify-between text-on-ink-mid">
            {["00:00", "03:00", "06:00", "09:00", "12:00"].map((t, i) => (
              <span key={t} className={cn(i > 0 && i < 4 && "max-sm:hidden")}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mt-2 space-y-2">
          {editor.tracks.map((track) => (
            <div key={track.label} className="flex items-center gap-3">
              <span className="timecode w-7 shrink-0 text-on-ink-mid">{track.label}</span>
              <div className="relative h-7 flex-1 rounded-md bg-white/[0.06] sm:h-8">
                {track.clips.map((clip, i) => (
                  <span
                    key={i}
                    className={cn("absolute inset-y-0.5 rounded", TONE[clip.tone])}
                    style={{ left: `${clip.start}%`, width: `${clip.end - clip.start}%` }}
                  />
                ))}
              </div>
            </div>
          ))}
          {/* The playhead covers the tracks column only: 1.75rem label + 0.75rem gap from the left. */}
          <span className="pointer-events-none absolute inset-y-0 left-10 right-0">
            <span className="absolute inset-y-0 w-0.5 animate-playhead bg-rec motion-reduce:left-[38%] motion-reduce:animate-none">
              <span className="absolute -left-[5px] -top-1 size-3 rotate-45 bg-rec" />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
