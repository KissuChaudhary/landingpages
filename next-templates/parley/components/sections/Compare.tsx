"use client";

import { useRef, useState, type KeyboardEvent } from "react";

import { Bubble } from "@/components/ui/Chat";
import { Container, SectionTitle } from "@/components/ui/Title";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

/**
 * One support request, two transcripts. A switch changes which one is shown. Both are always laid out in the
 * same grid cell, so the section never changes height when you switch.
 */
export function Compare() {
  const { compare } = siteConfig;
  const [active, setActive] = useState(compare.tabs.length - 1);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = compare.tabs.length - 1;
    const keys: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = keys[event.key];
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <section id="why" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionTitle label={compare.label} title={compare.title} description={compare.description} />

        <div className="mt-10 flex justify-center">
          <div role="tablist" aria-label="Compare chatbots" onKeyDown={onKeyDown} className="inline-flex rounded-full bg-blush p-1">
            {compare.tabs.map((tab, index) => (
              <button
                key={tab.id}
                ref={(node) => {
                  refs.current[index] = node;
                }}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={active === index}
                aria-controls={`panel-${tab.id}`}
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                className={cn(
                  "h-11 cursor-pointer rounded-full px-5 text-[15px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-rose sm:px-7",
                  active === index ? "bg-ink text-paper" : "text-ink-mid hover:text-ink",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-[44rem]">
          {compare.tabs.map((tab, index) => (
            <div
              key={tab.id}
              role="tabpanel"
              id={`panel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              className={cn("col-start-1 row-start-1 flex flex-col", active !== index && "invisible")}
            >
              <div className="mb-10 space-y-4">
                {tab.messages.map((message) => (
                  <Bubble key={message.text} message={message} />
                ))}
              </div>
              <p className="mt-auto flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1 border-t border-line pt-8 text-center">
                <span className={cn("display text-[3rem] leading-none", tab.id === "parley" ? "text-good" : "text-ink-mid")}>
                  {tab.result.value}
                </span>
                <span className="text-[16px] text-ink-mid">{tab.result.label}</span>
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
