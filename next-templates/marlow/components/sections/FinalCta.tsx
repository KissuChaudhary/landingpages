import { Button } from "@/components/ui/Button";
import { Title } from "@/components/ui/Section";
import { siteConfig } from "@/site.config";

/**
 * The closing block, in ink. The headline and buttons sit on the left; on the right, the next open call slots
 * as a small list, so "book a call" feels concrete instead of abstract. The slots are plain text from config.
 */
export function FinalCta() {
  const { title, description, primary, secondary, slotsTitle, slots, slotsNote } = siteConfig.cta;

  return (
    <section id="contact" className="relative scroll-mt-24 pb-8 pt-6 md:pb-12">
      <div className="mx-auto w-[var(--content)]">
        <div className="grid gap-12 rounded-[2.5rem] bg-ink p-7 text-on-ink sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-16">
          <div className="lg:col-span-7">
            <h2 className="display text-balance text-[clamp(2.5rem,1.3rem+4.6vw,5.25rem)] leading-[1] text-on-ink">
              <Title title={title} accentClassName="text-peach" />
            </h2>
            <p className="text-pretty mt-6 max-w-[28rem] text-[1.0625rem] leading-[1.65] text-on-ink-mid md:text-[1.125rem]">
              {description}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href={primary.href} variant="light">
                {primary.label}
              </Button>
              <Button href={secondary.href} variant="ghost">
                {secondary.label}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 lg:self-end">
            <div className="rounded-[1.75rem] border border-line-on-ink p-6 sm:p-7">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-on-ink-mid">{slotsTitle}</p>
              <ul className="mt-2">
                {slots.map((slot) => (
                  <li key={slot.day} className="flex items-baseline justify-between gap-4 border-b border-line-on-ink py-4 last:border-b-0">
                    <span className="display text-[2rem] leading-none">{slot.day}</span>
                    <span className="text-[15px] text-on-ink-mid">{slot.times}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[13px] text-on-ink-mid">{slotsNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
