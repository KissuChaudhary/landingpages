"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Section, SceneHead } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

import { ServiceArt } from "./ServiceVisuals";

/**
 * A reel selector: pick a service on the left, see what you get on the right. On phones the list becomes a
 * row of pills that scrolls sideways inside its own box. It is a proper tab widget: arrow keys, Home and End
 * move between tabs, and only the selected tab is in the tab order.
 */
export function Services() {
  const { items, cta, ...intro } = siteConfig.services;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (next: number) => {
    const index = (next + items.length) % items.length;
    setActive(index);
    tabs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (event.key in keys) {
      event.preventDefault();
      move(keys[event.key]);
    }
  };

  const current = items[active];

  return (
    <Section id="services">
      <SceneHead {...intro} />

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
        <div
          role="tablist"
          aria-label="Services"
          onKeyDown={onKeyDown}
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:col-span-5 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-line-strong lg:px-0 lg:pb-0"
        >
          {items.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.title}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`service-tab-${i}`}
                aria-selected={selected}
                aria-controls="service-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "shrink-0 rounded-full border px-5 py-2.5 text-[15px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2",
                  selected ? "border-ink bg-ink text-on-ink" : "border-line-strong bg-paper text-text-mid hover:border-text hover:text-text",
                  "lg:flex lg:w-full lg:items-center lg:gap-5 lg:rounded-none lg:border-0 lg:border-b lg:border-line-strong lg:bg-transparent lg:px-0 lg:py-6 lg:text-left",
                  selected ? "lg:bg-transparent lg:text-text" : "lg:bg-transparent lg:text-text-low lg:hover:text-text",
                )}
              >
                <span className="timecode hidden lg:inline lg:w-8">{String(i + 1).padStart(2, "0")}</span>
                <span className="lg:min-w-0 lg:flex-1">
                  <span className="lg:display block lg:text-[clamp(2rem,1.2rem+2.2vw,3.25rem)] lg:leading-none">{item.title}</span>
                  <span className="mt-2 hidden text-[15px] font-medium text-text-mid lg:block">{item.tagline}</span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className={cn("hidden size-7 shrink-0 text-flame-text transition-opacity lg:block", !selected && "lg:opacity-0")}
                />
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id="service-panel"
          aria-labelledby={`service-tab-${active}`}
          tabIndex={0}
          className="rounded-3xl border border-line bg-wash p-4 outline-none focus-visible:ring-2 focus-visible:ring-text sm:p-6 lg:col-span-7"
        >
          <ServiceArt visual={current.visual} />

          <div className="mt-6 grid gap-6 sm:mt-8 md:grid-cols-[1fr_auto] md:items-start md:gap-8">
            <div>
              <h3 className="display text-[1.75rem] leading-none text-text">{current.title}</h3>
              <p className="text-pretty mt-3 text-[1.0625rem] leading-[1.6] text-text-mid">{current.description}</p>
            </div>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-1 md:text-right">
              <div>
                <dt className="timecode text-text-low">Turnaround</dt>
                <dd className="display mt-1 text-[1.5rem] leading-none text-text">{current.turnaround}</dd>
              </div>
              <div>
                <dt className="timecode text-text-low">From</dt>
                <dd className="display mt-1 text-[1.5rem] leading-none text-text">{current.from}</dd>
              </div>
            </dl>
          </div>

          <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {current.deliverables.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[15px] font-medium text-text">
                <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full bg-flame text-ink">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button href={cta.href} size="sm">
              {cta.label}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
