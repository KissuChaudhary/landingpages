import { Divider } from "@/components/ui/Grid";
import { SectionTitle } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

/** An annotated draft: the sentence on the left, the agent's note in the margin on the right. */
export function Method() {
  const { method: m } = siteConfig;

  return (
    <section id="method" className="scroll-mt-16">
      <SectionTitle label={m.label} title={m.title} description={m.description} />
      <Divider marks={[{ at: 58.3333, kind: "tee-down" }]} />

      <ol className="grid">
        {m.rows.map((row, index) => (
          <li
            key={row.agent}
            className="grid gap-y-5 border-line px-6 py-10 not-last:border-b md:grid-cols-[7fr_5fr] md:gap-y-0 md:px-0 md:py-0"
          >
            <p className="display text-[1.625rem] leading-[1.4] text-text md:px-12 md:py-14 md:text-[2rem]">
              {row.excerpt.map((part, i) =>
                part.mark ? (
                  <mark key={i} className="-mx-0.5 rounded-[2px] bg-accent-soft px-0.5 text-text [box-decoration-break:clone]">
                    {part.text}
                  </mark>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </p>
            <div className="border-l-2 border-accent/50 pl-5 md:border-l md:border-line md:px-10 md:py-14">
              <p className="flex items-baseline gap-3 text-[14px] font-medium text-accent">
                <span className="font-mono text-[12px] text-text-low">{String(index + 1).padStart(2, "0")}</span>
                {row.agent}
              </p>
              <p className="text-pretty mt-3 text-[15px] leading-[1.65] text-text-mid">{row.note}</p>
            </div>
          </li>
        ))}
      </ol>

      <Divider marks={[{ at: 58.3333, kind: "tee-up" }]} />
    </section>
  );
}
