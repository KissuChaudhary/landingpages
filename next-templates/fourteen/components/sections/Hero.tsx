import { Check } from "lucide-react";

import { Button, Note } from "@/components/ui/Kit";
import { siteConfig } from "@/site.config";

/** The four-point spark used in the badge and beside the headline. */
function Spark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden className={className}>
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
}

/** One sample email, drawn like a message in an inbox. Every card is the same height, so the strip stays level. */
function EmailCard({ email, hidden }: { email: (typeof siteConfig.hero.emails)[number]; hidden: boolean }) {
  return (
    <article aria-hidden={hidden} className="mx-2.5 flex h-[15.5rem] w-[19rem] shrink-0 flex-col rounded-[24px] border border-line bg-card p-5 text-left sm:w-[22rem]">
      <header className="flex items-center gap-3">
        <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full bg-cream font-serif text-[1rem] text-flame-text">
          {email.from.slice(0, 1)}
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-[13px] font-semibold text-ink">{email.from}</span>
          <span className="block truncate text-[12px] text-ink-low">to {email.to}</span>
        </span>
        <span className="shrink-0 text-[12px] text-ink-low">{email.time}</span>
      </header>

      <h3 className="mt-4 text-[1.0625rem] font-semibold leading-snug text-ink">{email.subject}</h3>
      <p className="mt-2 line-clamp-3 text-[13.5px] leading-[1.55] text-ink-mid">{email.lines[0]}</p>

      <footer className="mt-auto flex items-center justify-between border-t border-line pt-3.5">
        <span className="rounded-md border border-peach bg-flame-soft px-2.5 py-1 font-serif text-[12px] italic text-flame-text">{email.tag}</span>
        <span className="flex items-center gap-1.5 text-[12px] font-medium text-good">
          <Check className="size-3.5" strokeWidth={3} />
          {email.metric}
        </span>
      </footer>
    </article>
  );
}

/**
 * A slow strip of sample emails. The list is shown twice and slides by half its width, so it loops without a seam.
 * The ends fade out, so cards enter and leave softly instead of being cut off.
 */
function EmailStrip() {
  const { emails } = siteConfig.hero;
  return (
    <div
      role="group"
      aria-label="Sample emails"
      className="mt-20 overflow-hidden pb-16 [mask-image:linear-gradient(to_right,transparent,#000_9%,#000_91%,transparent)] sm:mt-24 sm:pb-20"
    >
      <div className="flex w-max animate-[slide_70s_linear_infinite]">
        {[...emails, ...emails].map((email, index) => (
          <EmailCard key={index} email={email} hidden={index >= emails.length} />
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const { hero } = siteConfig;

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-14 text-center md:pt-24">
      {/* Decorative marks, kept clear of the text. */}
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden className="absolute left-[7%] top-[9rem] hidden size-10 text-stone-400 xl:block">
        <path d="M20 0V40M0 20H40" />
      </svg>
      <Spark className="absolute right-[7%] top-[16rem] hidden size-14 animate-[blink_3.5s_ease-in-out_infinite] text-ink xl:block" />

      <div className="relative mx-auto flex max-w-[1020px] flex-col items-center px-5 sm:px-6">
        <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-flame bg-card px-4 pb-1.5 pt-1 text-[11px] uppercase tracking-[0.14em] text-ink sm:mb-8">
          <Spark className="size-3.5 fill-flame text-flame" />
          {hero.badge}
        </p>

        <h1 id="hero-title" className="font-serif text-[clamp(2.5rem,0.9rem+5.4vw,5.25rem)] leading-[1.06] tracking-tight text-ink">
          <span className="block text-balance">{hero.headline.line1}</span>
          <em className="block text-balance font-normal italic">{hero.headline.line2}</em>
        </h1>

        <p className="text-pretty mt-7 max-w-[40rem] text-[clamp(1.0625rem,1rem+0.35vw,1.25rem)] leading-[1.55] text-ink-mid sm:mt-8">
          {hero.description.plain}
          <strong className="font-normal text-ink">{hero.description.strong}</strong>
        </p>

        <div className="relative mt-9 w-full sm:mt-10 sm:w-auto">
          <Button href={hero.cta.href} arrow className="w-full sm:w-auto">
            {hero.cta.label}
          </Button>
          <Note arrow="down-left" className="absolute left-[106%] top-1 hidden w-44 -rotate-3 text-left md:flex">
            {hero.note}
          </Note>
        </div>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-ink-mid">
          {["No contract", "Month one free if no meetings"].map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <Check className="size-3.5 text-good" strokeWidth={3} />
              {item}
            </li>
          ))}
        </ul>

        <figure className="mt-14 flex max-w-xl flex-col items-center gap-5 sm:mt-16" style={{ animation: "rise 0.8s ease-out both" }}>
          <blockquote className="text-pretty text-[1.125rem] italic leading-relaxed text-ink-mid sm:text-[1.1875rem]">&ldquo;{hero.testimonial.quote}&rdquo;</blockquote>
          <figcaption className="flex items-center gap-3 text-left text-sm text-ink-mid">
            <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-cream font-serif text-[1.0625rem] text-flame-text">
              {hero.testimonial.name.slice(0, 1)}
            </span>
            <span>
              <span className="font-semibold text-ink">{hero.testimonial.name}</span>, {hero.testimonial.role}
            </span>
          </figcaption>
        </figure>
      </div>

      <EmailStrip />
    </section>
  );
}
