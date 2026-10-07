import { MessageSquare, MoreVertical, Pencil, Star } from "lucide-react";

import { Avatar } from "@/components/ui/Section";
import { TINT } from "@/lib/tint";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

/**
 * Two product-style panels, drawn in markup so there are no images to license or host. They are two
 * ordinary blocks in a grid with a deliberate offset on large screens: nothing is absolutely positioned,
 * so they cannot overlap or collide at any width. Replace the content in site.config.ts.
 */
export function HeroPanels() {
  const { accounts, rhythm } = siteConfig.hero;

  return (
    <div aria-hidden className="mx-auto grid w-full max-w-[34rem] gap-4 lg:ml-auto lg:mr-0">
      {/* Accounts */}
      <div className="rounded-[2rem] border border-line bg-paper-raised p-5 shadow-soft transition-transform duration-500 hover:-translate-y-0.5 sm:p-6 lg:ml-10">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[15px] font-semibold text-ink">{accounts.title}</h3>
          <span className="rounded-full bg-sand px-2.5 py-1 text-[11px] font-medium text-ink-mid">Sort by newest</span>
        </div>
        <ul className="space-y-1.5">
          {accounts.people.map((person, i) => (
            <li
              key={person.name}
              className={cn("flex items-center gap-3 rounded-2xl p-2.5", i === 0 && "bg-butter-soft")}
            >
              <Avatar name={person.name} tint={person.tint} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold text-ink">{person.name}</p>
                <p className="truncate text-[12px] text-ink-low">{person.company}</p>
              </div>
              <div className="hidden gap-2.5 text-ink-low sm:flex">
                <Pencil className="size-3.5" />
                <Star className="size-3.5" />
                <MessageSquare className="size-3.5" />
                <MoreVertical className="size-3.5" />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 px-2.5 text-[12px] font-medium text-ink-mid">{accounts.link} &rarr;</p>
      </div>

      {/* Rhythm */}
      <div className="rounded-[2rem] border border-line bg-paper-raised p-5 shadow-lift transition-transform duration-500 hover:-translate-y-0.5 sm:p-6 lg:mr-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[12px] text-ink-low">{rhythm.title}</p>
            <p className="display mt-1 text-[2.5rem] leading-none text-ink">{rhythm.value}</p>
          </div>
          <p className="rounded-full bg-rose-soft px-2.5 py-1 text-[11px] font-semibold text-clay">
            {rhythm.delta} <span className="font-normal text-ink-mid">{rhythm.deltaNote}</span>
          </p>
        </div>
        <div className="mt-6 flex h-28 items-end gap-2 sm:h-32 sm:gap-3">
          {rhythm.bars.map((bar, i) => (
            <div key={i} className="flex h-full flex-1 flex-col justify-end gap-2">
              <div className={cn("w-full rounded-full", TINT[bar.tint].solid)} style={{ height: `${bar.height}%` }} />
              <span className="text-center text-[11px] text-ink-low">{bar.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
