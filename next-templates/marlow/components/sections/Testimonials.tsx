import { Avatar, Section } from "@/components/ui/Section";
import { siteConfig } from "@/site.config";

/**
 * One long quote, set as the section's headline, with two short ones and the rating beside it. The big
 * opening quotation mark is a decorative glyph; the quote itself is a real <blockquote>.
 */
export function Testimonials() {
  const { label, featured, items, rating } = siteConfig.testimonials;

  return (
    <Section id="testimonials">
      <div className="flex items-baseline justify-between border-t border-line-strong pt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-low">
        <p>{label}</p>
        <p aria-hidden>(05)</p>
      </div>

      <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-12">
        <figure className="lg:col-span-8">
          <span aria-hidden className="display block text-[7rem] leading-[0.6] text-clay md:text-[9rem]">
            &ldquo;
          </span>
          <blockquote className="display text-pretty -mt-2 text-[clamp(1.75rem,1.1rem+2.4vw,3.25rem)] leading-[1.14] text-ink">
            {featured.quote}
          </blockquote>
          <figcaption className="mt-10 flex items-center gap-4">
            <Avatar name={featured.name} tint={featured.tint} className="size-14 text-[15px]" />
            <div>
              <p className="text-[16px] font-semibold text-ink">{featured.name}</p>
              <p className="text-[14px] text-ink-mid">{featured.role}</p>
            </div>
          </figcaption>
        </figure>

        <aside className="lg:col-span-4 lg:pt-6">
          <div className="border-b border-line-strong pb-8">
            <p className="display text-[4.5rem] leading-none text-ink">{rating.value}</p>
            <p className="mt-2 text-[14px] text-ink-mid">{rating.note}</p>
            <p aria-hidden className="mt-3 flex gap-1 text-clay">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className="text-lg leading-none">
                  &#9733;
                </span>
              ))}
            </p>
          </div>
          <ul>
            {items.map((item) => (
              <li key={item.name} className="border-b border-line-strong py-7">
                <blockquote className="display text-pretty text-[1.5rem] leading-[1.22] text-ink">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <p className="mt-4 flex items-center gap-3 text-[14px] text-ink-mid">
                  <Avatar name={item.name} tint={item.tint} className="size-8 text-[10px]" />
                  <span>
                    <span className="font-medium text-ink">{item.name}</span>, {item.role}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Section>
  );
}
