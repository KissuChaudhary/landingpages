import { Divider } from "@/components/ui/Grid";
import { SectionTitle } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

/** Two drafts of one paragraph, side by side. The column rule is the only vertical line inside the section. */
export function Difference() {
  const { difference: d } = siteConfig;

  return (
    <section id="difference" className="scroll-mt-16">
      <Divider />
      <SectionTitle label={d.label} title={d.title} description={d.description} />
      <Divider marks={[{ at: 50, kind: "tee-down" }]} from="md" />

      <div className="grid md:grid-cols-2 md:[&>*+*]:border-l md:[&>*+*]:border-line">
        <article className="flex flex-col px-6 py-10 md:px-12 md:py-14">
          <p className="text-[14px] font-medium text-text-low">{d.before.label}</p>
          <p className="display mt-6 text-[1.5rem] leading-[1.45] text-text-mid md:text-[1.75rem]">
            {d.before.text.map((part, index) =>
              part.flag ? (
                <mark key={index} className="bg-transparent text-text underline decoration-warn decoration-wavy decoration-1 underline-offset-[6px]">
                  {part.text}
                </mark>
              ) : (
                <span key={index}>{part.text}</span>
              ),
            )}
          </p>
          <p className="mt-auto pt-10 text-[15px] text-warn">{d.before.summary}</p>
        </article>

        <article className="flex flex-col border-t border-line px-6 py-10 md:border-t-0 md:px-12 md:py-14">
          <p className="text-[14px] font-medium text-accent">{d.after.label}</p>
          <p className="display mt-6 text-[1.5rem] leading-[1.45] text-text md:text-[1.75rem]">
            {d.after.text.map((part, index) => (
              <span key={index}>
                {part.text}
                {part.ref ? (
                  <sup className="ml-0.5 font-sans text-[0.55em] font-medium text-accent" aria-label={`Footnote ${part.ref}`}>
                    {part.ref}
                  </sup>
                ) : null}
              </span>
            ))}
          </p>
          <ol className="mt-8 space-y-1.5 border-t border-line pt-5 text-[14px] leading-[1.6] text-text-mid">
            {d.after.footnotes.map((note, index) => (
              <li key={note} className="flex gap-3">
                <span className="font-mono text-[12px] leading-[1.9] text-accent">{index + 1}</span>
                <span>{note}</span>
              </li>
            ))}
          </ol>
          <p className="mt-auto pt-10 text-[15px] text-good">{d.after.summary}</p>
        </article>
      </div>

      <Divider marks={[{ at: 50, kind: "tee-up" }]} from="md" />
    </section>
  );
}
