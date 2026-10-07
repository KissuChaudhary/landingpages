import { Section } from "@/components/ui/Section";
import { TINT } from "@/lib/tint";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

/**
 * The manifesto: one paragraph, set large, with the key words picked out in highlighter. It is a single
 * block of text, so it reflows naturally at every width. The marks use box-decoration-clone so a highlight
 * that wraps onto a second line keeps its rounded ends.
 */
export function Approach() {
  const { label, text, stats } = siteConfig.approach;

  return (
    <Section id="approach" className="py-20 md:py-28">
      <div className="flex items-baseline justify-between border-t border-line-strong pt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-low">
        <p>{label}</p>
        <p aria-hidden>(01)</p>
      </div>

      <p className="display text-pretty mt-10 max-w-[22em] text-[clamp(1.875rem,1rem+3.6vw,4rem)] leading-[1.14] text-ink md:mt-14">
        {text.map((segment, i) =>
          segment.tint ? (
            <mark
              key={i}
              className={cn(
                "rounded-[0.3em] px-[0.14em] text-ink [box-decoration-break:clone] [-webkit-box-decoration-break:clone]",
                TINT[segment.tint].solid,
              )}
            >
              {segment.text}
            </mark>
          ) : (
            <span key={i}>{segment.text}</span>
          ),
        )}
      </p>

      <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-line pt-8 md:mt-20 md:max-w-2xl">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse justify-end">
            <dt className="mt-2 text-[13px] leading-snug text-ink-mid">{stat.label}</dt>
            <dd className="display text-[clamp(2rem,1.2rem+2.4vw,3.25rem)] leading-none text-ink">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
