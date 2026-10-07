import { ArrowUpRight, Compass, Gauge, Users } from "lucide-react";

import { Section, SectionHead } from "@/components/ui/Section";
import { TINT } from "@/lib/tint";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

const ICONS = [Compass, Gauge, Users];

/**
 * An editorial index, not a card grid: one full-width row per discipline, separated by hairlines. On hover
 * the row warms to paper and its arrow fills. Each row is a single link, so the whole row is the click target.
 */
export function Services() {
  const { items, ...intro } = siteConfig.services;

  return (
    <Section id="services">
      <SectionHead index="02" {...intro} />
      <ol className="border-t border-line-strong">
        {items.map((item, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <li key={item.title} className="border-b border-line-strong">
              <a
                href={item.href}
                className="group grid items-start gap-x-8 gap-y-5 px-1 py-8 outline-none transition-colors duration-300 hover:bg-paper-raised focus-visible:bg-paper-raised focus-visible:ring-2 focus-visible:ring-ink md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.05fr)_3rem] md:items-center md:px-4 md:py-10"
              >
                <span className="font-mono text-[13px] text-ink-low">{String(i + 1).padStart(2, "0")}</span>

                <div className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className={cn("grid size-12 shrink-0 place-items-center rounded-2xl text-ink", TINT[item.tint].solid)}
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="display text-[clamp(2rem,1.3rem+2.6vw,3.5rem)] leading-none text-ink">{item.title}</h3>
                </div>

                <div>
                  <p className="text-pretty max-w-[28rem] text-[1.0625rem] leading-[1.6] text-ink-mid">{item.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line-strong px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-mid"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <span
                  aria-hidden
                  className="hidden size-12 place-items-center rounded-full border border-line-strong text-ink transition-[background-color,color,transform] duration-300 group-hover:rotate-12 group-hover:border-ink group-hover:bg-ink group-hover:text-on-ink md:grid"
                >
                  <ArrowUpRight className="size-5" strokeWidth={1.75} />
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
