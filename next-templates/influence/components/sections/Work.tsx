"use client";

import { useState } from "react";

import { Reel } from "@/components/ui/Reel";
import { Container, SectionTitle } from "@/components/ui/Title";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

/** A wall of drawn video thumbnails with a working filter. The filter names come from `work.filters`. */
export function Work() {
  const { work } = siteConfig;
  const [filter, setFilter] = useState(work.filters[0]);
  const visible = work.reels.filter((reel) => filter === work.filters[0] || reel.category === filter);

  return (
    <section id="work" className="scroll-mt-20 border-t border-line bg-sheet py-20 sm:py-28">
      <Container>
        <SectionTitle label={work.label} title={work.title} description={work.description} />

        <div role="group" aria-label="Filter videos" className="mt-10 flex flex-wrap justify-center gap-2">
          {work.filters.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
              className={cn(
                "h-10 cursor-pointer rounded-full border px-5 text-[14px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-orange",
                filter === name ? "border-ink bg-ink text-white" : "border-line-strong bg-sheet text-ink-mid hover:border-ink hover:text-ink",
              )}
            >
              {name}
            </button>
          ))}
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {visible.map((reel) => (
            <li key={reel.handle} className="transition-transform duration-300 hover:-translate-y-1.5">
              <Reel look={reel} hook={reel.hook} handle={reel.handle} views={reel.views} category={reel.category} />
            </li>
          ))}
        </ul>
        <p className="sr-only" aria-live="polite">
          Showing {visible.length} videos
        </p>
      </Container>
    </section>
  );
}
