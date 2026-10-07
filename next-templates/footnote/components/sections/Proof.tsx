import { Divider } from "@/components/ui/Grid";
import { siteConfig } from "@/site.config";

/** Three numbers in a ledger, then one quote. The two inner rules start and end on the dividers with half-plus marks. */
export function Proof() {
  const { proof } = siteConfig;
  const third = 33.3333;
  const marks = (kind: "tee-down" | "tee-up") => [
    { at: third, kind },
    { at: third * 2, kind },
  ];

  return (
    <section aria-label={proof.label}>
      <p className="px-6 pt-10 text-[14px] font-medium text-text-mid md:px-12 md:pt-12">
        <span aria-hidden className="mr-2.5 inline-block size-1.5 rounded-[1px] bg-accent align-middle" />
        {proof.label}
      </p>
      <div className="mt-8 md:mt-10">
        <Divider marks={marks("tee-down")} from="md" />
      </div>

      <dl className="grid md:grid-cols-3 md:[&>*+*]:border-l md:[&>*+*]:border-line">
        {proof.metrics.map((metric) => (
          <div key={metric.label} className="border-b border-line px-6 py-10 last:border-b-0 md:border-b-0 md:px-12 md:py-14">
            <dd className="display text-[3.5rem] leading-none text-text md:text-[4.5rem]">{metric.value}</dd>
            <dt className="mt-4 max-w-[14rem] text-[15px] leading-snug text-text-mid">{metric.label}</dt>
          </div>
        ))}
      </dl>

      <Divider marks={marks("tee-up")} from="md" />

      <figure className="px-6 py-16 md:px-12 md:py-24">
        <blockquote className="display max-w-[28ch] text-balance text-[clamp(1.875rem,1.2rem+2.6vw,3rem)] leading-[1.18] text-text">
          <span aria-hidden className="text-accent">&ldquo;</span>
          {proof.quote.text}
          <span aria-hidden className="text-accent">&rdquo;</span>
        </blockquote>
        <figcaption className="mt-8 text-[15px] text-text-mid">
          <span className="text-text">{proof.quote.name}</span>
          <span className="mx-2 text-text-low">/</span>
          {proof.quote.role}
        </figcaption>
        <p className="mt-10 text-[13px] text-text-low">
          <span aria-hidden className="mr-1 text-accent">*</span>
          {proof.footnote}
        </p>
      </figure>
    </section>
  );
}
