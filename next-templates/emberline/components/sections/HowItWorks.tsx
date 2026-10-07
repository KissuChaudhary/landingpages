import { Check, Globe } from "lucide-react";
import type { ReactNode } from "react";

import { Card, Panel } from "@/components/ui/Card";
import { Section, SectionHeader } from "@/components/ui/Section";
import { siteConfig } from "@/site.config";

/**
 * Desktop: three cards in a row, each hung from a numbered node on a shared hairline.
 * Phones: the same steps as a vertical timeline. The connectors are one element per step that changes
 * direction at the md breakpoint, so there are no separate mobile and desktop copies to keep in sync.
 */

function AddBrand() {
  return (
    <Panel className="flex items-center gap-3 !p-3">
      <Globe className="size-4 shrink-0 text-ink-low" strokeWidth={1.75} />
      <span className="min-w-0 flex-1 truncate text-[13px] text-ink-mid">{siteConfig.name.toLowerCase()}.com</span>
      <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full bg-ember-300 text-on-ember">
        <Check className="size-3" strokeWidth={3} />
      </span>
    </Panel>
  );
}

function AskModels() {
  return (
    <Panel className="flex flex-wrap gap-2 !p-3">
      {["ChatGPT", "Claude", "Perplexity", "Gemini"].map((m) => (
        <span key={m} className="rounded-md border border-line bg-white/[0.03] px-2 py-1 text-[12px] text-ink-mid">
          {m}
        </span>
      ))}
    </Panel>
  );
}

function ShipFixes() {
  return (
    <Panel className="flex items-center justify-between gap-3 !p-3">
      <span className="text-[13px] text-ink-mid">3 fixes ready to publish</span>
      <span className="rounded-md bg-ember-300/12 px-2 py-1 text-[12px] font-medium text-ember-200">+18%</span>
    </Panel>
  );
}

const VISUALS: (() => ReactNode)[] = [AddBrand, AskModels, ShipFixes];

export function HowItWorks() {
  const { eyebrow, title, description, items } = siteConfig.steps;

  return (
    <Section id="how-it-works">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <ol className="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-8">
        {items.slice(0, VISUALS.length).map((step, i) => {
          const Visual = VISUALS[i];
          const last = i === items.length - 1 || i === VISUALS.length - 1;
          return (
            <li key={step.title} className="relative pb-8 pl-14 last:pb-0 md:pb-0 md:pl-0 md:pt-14">
              {/* Node */}
              <span
                aria-hidden
                className="absolute left-0 top-0 grid size-9 place-items-center rounded-full border border-line-strong bg-bg font-serif text-[17px] italic text-ember-200 shadow-[0_0_24px_-4px_color-mix(in_srgb,var(--color-ember-400)_50%,transparent)]"
              >
                {i + 1}
              </span>
              {/* Connector to the next step */}
              {!last ? (
                <span
                  aria-hidden
                  className="absolute bottom-0 left-[17px] top-11 w-px bg-gradient-to-b from-line-strong to-line md:bottom-auto md:left-12 md:right-[-2rem] md:top-[18px] md:h-px md:w-auto md:bg-gradient-to-r"
                />
              ) : null}

              <Card className="h-full">
                <h3 className="text-[1.25rem] font-medium leading-snug tracking-[-0.015em] text-ink">{step.title}</h3>
                <p className="mb-6 mt-2 text-[15px] leading-[1.6] text-ink-mid">{step.description}</p>
                <Visual />
              </Card>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
