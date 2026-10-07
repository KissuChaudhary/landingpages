import { Check, X } from "lucide-react";

import { Divider } from "@/components/ui/Grid";
import { SectionTitle } from "@/components/ui/Title";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

const { engine } = siteConfig;

/** Coherence by section. A single prompt decays; Footnote holds. Plain bars, no frame around them. */
function Matrix() {
  const sections = 12;
  const decay = Array.from({ length: sections }, (_, i) => Math.max(0.16, 1 - i * 0.075));
  return (
    <figure>
      <div className="space-y-6">
        {[
          { label: engine.matrix.beforeLabel, values: decay, tone: "bg-text-low/70" },
          { label: engine.matrix.afterLabel, values: decay.map((_, i) => 0.94 - (i % 3) * 0.02), tone: "bg-accent" },
        ].map((row) => (
          <div key={row.label}>
            <p className="mb-3 text-[14px] text-text-mid">{row.label}</p>
            <div className="flex h-20 items-end gap-1.5" aria-hidden>
              {row.values.map((value, i) => (
                <span key={i} className={cn("flex-1 rounded-[2px]", row.tone)} style={{ height: `${Math.round(value * 100)}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-5 text-[13px] text-text-low">{engine.matrix.caption}</figcaption>
    </figure>
  );
}

function Sources() {
  return (
    <div>
      <p className="text-[14px] font-medium text-text-mid">{engine.sources.title}</p>
      <ul className="mt-4 divide-y divide-line border-y border-line">
        {engine.sources.items.map((item) => (
          <li key={item.domain} className="flex items-center gap-4 py-3.5">
            {item.used ? (
              <Check className="size-4 shrink-0 text-good" strokeWidth={2.25} aria-label="Used" />
            ) : (
              <X className="size-4 shrink-0 text-warn" strokeWidth={2.25} aria-label="Rejected" />
            )}
            <span className={cn("min-w-0 flex-1 truncate font-mono text-[13px]", item.used ? "text-text" : "text-text-low line-through")}>
              {item.domain}
            </span>
            <span className="hidden text-[13px] text-text-low sm:block">{item.kind}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Voice() {
  const { yours, ours, traits } = engine.voice;
  return (
    <div>
      {[yours, ours].map((passage, index) => (
        <div key={passage.label} className={cn(index === 1 && "mt-7 border-t border-line pt-7")}>
          <p className={cn("text-[14px] font-medium", index === 0 ? "text-text-low" : "text-accent")}>{passage.label}</p>
          <p className="display mt-3 text-[1.375rem] leading-[1.45] text-text">{passage.text}</p>
        </div>
      ))}
      <dl className="mt-8 grid grid-cols-3 border-t border-line pt-6">
        {traits.map((trait) => (
          <div key={trait.label} className="flex flex-col gap-2">
            <dt className="order-2 text-[13px] leading-snug text-text-low">{trait.label}</dt>
            <dd className="display text-[1.75rem] leading-none text-text">{trait.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const visuals = { matrix: Matrix, sources: Sources, voice: Voice };

export function Engine() {
  const total = engine.spreads.length;

  return (
    <section id="engine" className="scroll-mt-16">
      <SectionTitle label={engine.label} title={engine.title} description={engine.description} />

      {engine.spreads.map((spread, index) => {
        const Visual = visuals[spread.visual];
        const flip = index % 2 === 1;
        return (
          <div key={spread.title}>
            <Divider
              marks={[{ at: 50, kind: index === 0 ? "tee-down" : "plus" }]}
              from="lg"
            />
            <div className="grid lg:grid-cols-2">
              <div className={cn("px-6 py-12 md:px-12 md:py-16", flip ? "lg:order-2 lg:border-l lg:border-line" : "lg:order-1")}>
                <h3 className="display text-[2rem] leading-[1.1] text-text md:text-[2.5rem]">{spread.title}</h3>
                <p className="text-pretty mt-5 max-w-[30rem] text-[1.0625rem] leading-[1.65] text-text-mid">{spread.body}</p>
                <p className="mt-10 flex items-baseline gap-4 border-t border-line pt-6">
                  <span className="display text-[3rem] leading-none text-accent">{spread.stat.value}</span>
                  <span className="max-w-[18rem] text-[14px] leading-snug text-text-mid">{spread.stat.label}</span>
                </p>
              </div>
              <div
                className={cn(
                  "border-t border-line px-6 py-12 md:px-12 md:py-16 lg:border-t-0",
                  flip ? "lg:order-1" : "lg:order-2 lg:border-l lg:border-line",
                )}
              >
                <div className="mx-auto max-w-[30rem] lg:max-w-none">
                  <Visual />
                </div>
              </div>
            </div>
            {index === total - 1 ? <Divider marks={[{ at: 50, kind: "tee-up" }]} from="lg" /> : null}
          </div>
        );
      })}
    </section>
  );
}
