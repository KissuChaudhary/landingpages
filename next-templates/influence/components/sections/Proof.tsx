import { Play, Star } from "lucide-react";

import { Verified } from "@/components/ui/Icons";
import { Reel } from "@/components/ui/Reel";
import { Container, Heading, Pill } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

const tones = ["#ffd9a8", "#ffc2d4", "#cfe3ff", "#d3f0c8", "#e6d7ff", "#ffe6a8"];

function Stars() {
  return (
    <span className="flex gap-0.5 text-orange" aria-label="5 out of 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="size-4 fill-current" />
      ))}
    </span>
  );
}

/** One video testimonial with its numbers, and six short quotes set as plain columns. */
export function Proof() {
  const { proof } = siteConfig;
  const { featured } = proof;

  return (
    <section aria-label={proof.label} className="py-20 sm:py-28">
      <Container>
        <header className="flex flex-col items-start">
          <Pill>{proof.label}</Pill>
          <h2 className="display mt-6 max-w-[16em] text-balance text-[clamp(2.25rem,1.3rem+3.8vw,4rem)] leading-[1.04] text-ink">
            <Heading title={proof.title} />
          </h2>
        </header>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[20rem_1fr] lg:gap-20">
          <div className="relative mx-auto w-full max-w-[17rem] lg:max-w-none">
            <Reel look={featured.look} hook={featured.hook} handle={featured.handle} />
            <span aria-hidden className="absolute left-1/2 top-[38%] flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink backdrop-blur-sm">
              <Play className="ml-0.5 size-6 fill-current" />
            </span>
          </div>

          <figure>
            <blockquote className="display text-balance text-[clamp(1.75rem,1.1rem+2.4vw,3rem)] leading-[1.12] text-ink">
              <span aria-hidden className="text-orange">&ldquo;</span>
              {featured.quote}
              <span aria-hidden className="text-orange">&rdquo;</span>
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-3">
              <span aria-hidden className="flex size-11 items-center justify-center rounded-full bg-orange-soft text-[15px] font-bold text-orange-text">
                {featured.name.slice(0, 1)}
              </span>
              <span>
                <span className="block text-[16px] font-bold text-ink">{featured.name}</span>
                <span className="flex items-center gap-1.5 text-[14px] text-ink-mid">
                  {featured.handle}
                  <Verified className="size-[15px]" />
                </span>
              </span>
            </figcaption>
            <dl className="mt-9 grid max-w-[28rem] grid-cols-3 gap-4 border-t border-line pt-6">
              {featured.stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="display money text-[2rem] leading-none text-ink">{stat.value}</dd>
                  <dt className="mt-2 text-[13px] leading-snug text-ink-mid">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </figure>
        </div>

        <ul className="mt-20 grid gap-x-10 gap-y-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {proof.more.map((item, index) => (
            <li key={item.handle} className="flex flex-col gap-4">
              <Stars />
              <p className="text-pretty text-[1.0625rem] leading-[1.6] text-ink">{item.text}</p>
              <p className="mt-auto flex items-center gap-3 pt-1">
                <span aria-hidden className="flex size-9 items-center justify-center rounded-full text-[13px] font-bold text-ink" style={{ backgroundColor: tones[index % tones.length] }}>
                  {item.name.slice(0, 1)}
                </span>
                <span className="text-[14px] leading-tight">
                  <span className="block font-bold text-ink">{item.name}</span>
                  <span className="text-ink-mid">{item.handle}</span>
                </span>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
