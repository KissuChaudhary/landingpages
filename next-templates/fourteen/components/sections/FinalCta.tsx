import { Check } from "lucide-react";

import { Button, Container, Heading, Note, Ring } from "@/components/ui/Kit";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** The first fourteen days as a two-week calendar, with the booked meetings picked out in orange. */
function Calendar() {
  const { calendar } = siteConfig.cta;
  const booked = new Map(calendar.booked.map((m) => [m.day, m.label]));
  const days = Array.from({ length: 14 }, (_, i) => i + 1);

  return (
    <Ring innerClassName="p-4 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-serif text-[1.5rem] leading-none text-ink">{calendar.month}</p>
          <p className="mt-1.5 text-[12px] text-ink-low">{calendar.caption}</p>
        </div>
        <p className="flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-[12px] font-semibold text-good">
          <Check className="size-3.5" strokeWidth={3} />
          {calendar.summary}
        </p>
      </div>

      <div aria-hidden className="mt-6 grid grid-cols-7 gap-1.5 text-center">
        {WEEKDAYS.map((d) => (
          <span key={d} className="pb-1 text-[10px] font-semibold uppercase tracking-wider text-ink-low">
            {d}
          </span>
        ))}
        {days.map((day) => (
          <span
            key={day}
            className={cn(
              "relative flex aspect-square items-center justify-center rounded-xl border text-[14px]",
              booked.has(day) ? "border-flame bg-flame-soft font-semibold text-flame-text" : "border-line bg-wash text-ink-mid",
            )}
          >
            {day}
            {booked.has(day) ? <span className="absolute bottom-1.5 size-1 rounded-full bg-flame" /> : null}
          </span>
        ))}
      </div>

      <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
        {calendar.booked.map((m) => (
          <li key={m.day} className="flex items-center gap-3 text-[13px]">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-flame text-[12px] font-bold text-ink">{m.day}</span>
            <span className="text-ink">{m.label}</span>
          </li>
        ))}
      </ul>
    </Ring>
  );
}

/** The closing call to action: the promise on the left, and what the first two weeks look like on the right. */
export function FinalCta() {
  const { cta } = siteConfig;

  return (
    <section id="start" className="scroll-mt-28 pb-28 sm:pb-36">
      <Container className="max-w-[1000px]">
        <div className="grid items-center gap-14 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-balance font-serif text-[clamp(2.5rem,1.4rem+4vw,4.5rem)] leading-[1.05] tracking-tight text-ink">
              <Heading title={cta.title} />
            </h2>
            <p className="text-pretty mx-auto mt-6 max-w-[30rem] text-[1.0625rem] leading-[1.6] text-ink-mid md:mx-0">{cta.description}</p>

            <div className="relative mt-9 inline-block">
              <Button href={cta.button.href} arrow>
                {cta.button.label}
              </Button>
            </div>

            <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-ink-mid md:justify-start">
              {cta.ticks.map((tick) => (
                <li key={tick} className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-good" strokeWidth={3} />
                  {tick}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[26rem] md:max-w-none">
            <Calendar />
            <Note arrow="down-left" className="absolute -left-4 -top-16 hidden w-40 -rotate-3 lg:flex xl:-left-16">
              {cta.note}
            </Note>
          </div>
        </div>
      </Container>
    </section>
  );
}
