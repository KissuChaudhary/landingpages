import { Phone } from "lucide-react";

import { OrangeButton } from "@/components/ui/Button";
import { Reel } from "@/components/ui/Reel";
import { Container, Heading, Pill } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

const tones = ["#ffd9a8", "#ffc2d4", "#cfe3ff", "#d3f0c8"];

/** The closing call to action on a dark panel, with two videos peeking in from the right. */
export function FinalCta() {
  const { cta, work } = siteConfig;
  const peek = [work.reels[3], work.reels[6]];

  return (
    <section id="start" className="scroll-mt-20 px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate mx-auto max-w-[1360px] overflow-hidden rounded-[32px] bg-night text-on-night sm:rounded-[44px]">
        <Container className="relative z-10 py-20 sm:py-28 lg:py-32">
          <div className="max-w-[40rem]">
            <Pill dark>{cta.tag}</Pill>
            <h2 className="display mt-7 text-balance text-[clamp(2.75rem,1.4rem+5.4vw,5.25rem)] leading-[1] text-on-night">
              <Heading title={cta.title} accentClassName="text-orange" />
            </h2>
            <p className="text-pretty mt-6 max-w-[30rem] text-[1.125rem] leading-[1.6] text-on-night-mid">{cta.description}</p>

            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <OrangeButton href={cta.button.href}>
                <Phone className="size-[18px]" />
                {cta.button.label}
              </OrangeButton>
              <div className="flex items-center gap-3">
                <span className="flex -space-x-2.5" aria-hidden>
                  {cta.initials.map((letter, index) => (
                    <span
                      key={letter}
                      className="flex size-10 items-center justify-center rounded-full border-2 border-night text-[13px] font-bold text-ink"
                      style={{ backgroundColor: tones[index % tones.length] }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
                <span className="text-[14px] text-on-night-mid">{cta.note}</span>
              </div>
            </div>
          </div>
        </Container>

        <div aria-hidden className="absolute -right-6 bottom-[-18%] top-[8%] hidden w-[34%] min-w-[22rem] lg:block xl:right-6">
          <div className="absolute left-0 top-[18%] w-[48%] -rotate-[6deg]">
            <Reel look={peek[0]} hook={peek[0].hook} handle={peek[0].handle} />
          </div>
          <div className="absolute right-0 top-0 w-[52%] rotate-[5deg]">
            <Reel look={peek[1]} hook={peek[1].hook} handle={peek[1].handle} />
          </div>
        </div>
      </div>
    </section>
  );
}
