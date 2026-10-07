import { Check, Quote, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/Kit";
import { siteConfig } from "@/site.config";

/** A personal note from the founder, set like a letter on a white card. */
export function Founder() {
  const { founder } = siteConfig;

  return (
    <section className="relative px-3 pb-24 sm:px-6 sm:pb-32">
      <div aria-hidden className="absolute inset-x-0 top-1/2 -z-10 mx-auto h-[70%] max-w-3xl -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(255,215,170,0.45),transparent)]" />

      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[24px] border border-line bg-card px-5 pb-8 pt-12 sm:rounded-[32px] sm:p-10 md:p-16">
        <p className="absolute right-5 top-5 flex rotate-3 items-center gap-1.5 rounded-full border border-peach bg-flame-soft px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-flame-text transition-transform duration-500 hover:rotate-0 sm:right-8 sm:top-8">
          <Sparkles className="size-3" />
          {founder.badge}
        </p>
        <Quote aria-hidden className="pointer-events-none absolute left-10 top-12 size-28 text-ink opacity-[0.04]" />

        <div className="relative flex flex-col items-center pt-6 text-center sm:pt-0">
          <span aria-hidden className="mb-6 h-1 w-12 rounded-full bg-gradient-to-r from-orange-300 to-orange-100" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-low">{founder.label}</p>

          <blockquote className="mt-9 max-w-2xl">
            <p className="font-serif text-[clamp(1.75rem,1.2rem+2vw,2.5rem)] leading-[1.3] text-ink">&ldquo;{founder.quote}&rdquo;</p>
            <p className="mt-6 font-serif text-[1.25rem] italic leading-relaxed text-ink-low">&ldquo;{founder.sub}&rdquo;</p>
          </blockquote>

          <div className="mt-12 flex w-full flex-col items-center gap-8 border-t border-line pt-10">
            <div className="flex items-center gap-4">
              <span className="relative">
                <span aria-hidden className="flex size-14 items-center justify-center rounded-full border-2 border-card bg-cream font-serif text-[1.5rem] text-flame-text ring-1 ring-line">
                  {founder.name.slice(0, 1)}
                </span>
                <span aria-hidden className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full border-2 border-card bg-blue-500 text-white">
                  <Check className="size-2.5" strokeWidth={4} />
                </span>
              </span>
              <span className="text-left">
                <span className="block font-serif text-[1.125rem] leading-none text-ink">{founder.name}</span>
                <span className="mt-1.5 block text-xs font-medium uppercase tracking-wide text-ink-low">{founder.role}</span>
              </span>
              <span aria-hidden className="mx-2 hidden h-8 w-px bg-line-strong sm:block" />
              <span aria-hidden className="hidden -rotate-2 font-hand text-3xl text-ink-low sm:block">
                {founder.signature}
              </span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Button href={founder.cta.href} className="h-12 px-10 text-base">
                {founder.cta.label}
              </Button>
              <p className="text-[11px] font-medium uppercase tracking-wider text-ink-low">{founder.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
