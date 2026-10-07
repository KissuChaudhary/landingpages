import { Button, OutlineButton } from "@/components/ui/Button";
import { Avatar, Bubble } from "@/components/ui/Chat";
import { Container, Heading } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

/** A hand-drawn arrow that curls up toward the confirmation in the chat. */
function NoteArrow() {
  return (
    <svg viewBox="0 0 64 56" fill="none" aria-hidden className="h-14 w-16 shrink-0 text-rose-text">
      <path d="M58 50C40 52 20 46 14 24" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M6 33l8-11 10 8" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Hero() {
  const { hero } = siteConfig;

  return (
    <section id="top" aria-labelledby="hero-title" className="px-3 sm:px-5">
      <div className="relative isolate mx-auto max-w-[1360px] overflow-hidden rounded-[32px] bg-blush sm:rounded-[44px]">
        {/* A soft glow of light behind the chat. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_78%_45%,rgba(255,250,248,0.9),transparent_70%)]"
        />

        <Container className="grid items-center gap-14 pb-14 pt-12 sm:pb-20 sm:pt-16 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:pb-24 lg:pt-20">
          <div>
            <p className="inline-flex items-center gap-2.5 rounded-full bg-paper/80 py-1.5 pl-1.5 pr-4 text-[14px] font-medium text-ink-mid">
              <span className="flex -space-x-1.5" aria-hidden>
                {["P", "T", "H"].map((letter, index) => (
                  <span
                    key={letter}
                    className="flex size-6 items-center justify-center rounded-full border-2 border-paper text-[11px] font-semibold text-ink"
                    style={{ backgroundColor: ["#f4a3b1", "#f9d5da", "#e8b8a8"][index] }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
              {hero.badge}
            </p>

            <h1
              id="hero-title"
              className="display mt-7 text-balance text-[clamp(2.875rem,1.4rem+6.2vw,4.75rem)] leading-[1.02] text-ink"
            >
              <Heading title={hero.headline} />
            </h1>

            <p className="text-pretty mt-6 max-w-[31rem] text-[1.125rem] leading-[1.65] text-ink-mid">{hero.description}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
              <OutlineButton href={hero.secondaryCta.href} className="bg-paper/60">
                {hero.secondaryCta.label}
              </OutlineButton>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[30rem] lg:max-w-none">
            <div className="rounded-[28px] border border-line bg-paper p-4 sm:p-6">
              <div className="flex items-center gap-3 border-b border-line pb-4">
                <Avatar className="size-10 bg-blush" />
                <div>
                  <p className="text-[15px] font-semibold leading-tight text-ink">{hero.chat.header}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-ink-mid">
                    <span aria-hidden className="size-1.5 rounded-full bg-good" />
                    {hero.chat.status}
                  </p>
                </div>
              </div>

              <div className="space-y-4 py-6">
                {hero.chat.messages.map((message) => (
                  <Bubble key={message.text} message={message} compact />
                ))}
              </div>

              <div aria-hidden className="flex h-12 items-center rounded-full border border-line px-5 text-[15px] text-ink-low">
                Write a message
              </div>
            </div>

            <p className="mt-2 flex items-start justify-end gap-2 pr-4 sm:pr-8">
              <NoteArrow />
              <span className="mt-6 font-hand text-[1.625rem] leading-none text-rose-text">{hero.note}</span>
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-10 sm:py-12">
        <div className="flex flex-col items-center gap-x-12 gap-y-4 text-center md:flex-row md:text-left">
          <p className="text-[14px] font-medium text-ink-low">{hero.logosLabel}</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 md:justify-start">
            {hero.logos.map((logo) => (
              <li key={logo} className="display text-[1.5rem] leading-none text-ink-mid">
                {logo}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
