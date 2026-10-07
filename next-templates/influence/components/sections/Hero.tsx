import { Phone, Star } from "lucide-react";

import { Button, GhostButton } from "@/components/ui/Button";
import { InstagramIcon, SnapchatIcon, TikTokIcon, YouTubeIcon } from "@/components/ui/Icons";
import { Container, Pill } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

import { HeroVisual } from "./HeroVisual";

const platforms = [
  { name: "Snapchat", Icon: SnapchatIcon, className: "bg-[#ffd60a] text-ink -rotate-12 z-10" },
  { name: "TikTok", Icon: TikTokIcon, className: "bg-ink text-white rotate-6 z-20" },
  { name: "Instagram", Icon: InstagramIcon, className: "bg-gradient-to-tr from-[#fdc830] via-[#f5365c] to-[#7b2ff7] text-white -rotate-6 z-30" },
  { name: "YouTube", Icon: YouTubeIcon, className: "bg-[#e5201d] text-white rotate-12 z-20" },
];

const avatarTones = ["#ffd9a8", "#ffc2d4", "#cfe3ff", "#d3f0c8"];

export function Hero() {
  const { hero } = siteConfig;

  return (
    <section id="top" aria-labelledby="hero-title" className="overflow-x-clip">
      <Container className="grid items-center gap-16 pb-20 pt-10 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-28 lg:pt-20">
        <div className="flex flex-col items-start">
          <Pill>{hero.tag}</Pill>

          <h1 id="hero-title" className="display mt-7 text-[clamp(3rem,1.5rem+5.8vw,5.5rem)] leading-[1.02] text-ink">
            {hero.headline.line1}
            <span className="relative top-[0.08em] mx-3 inline-flex items-center align-middle" aria-hidden>
              <span className="flex items-center -space-x-3.5 sm:-space-x-4">
                {platforms.map(({ name, Icon, className }) => (
                  <span
                    key={name}
                    className={`flex size-11 items-center justify-center rounded-full border-[3px] border-paper transition-transform duration-300 hover:rotate-0 sm:size-14 ${className}`}
                  >
                    <Icon className="size-5 sm:size-6" />
                  </span>
                ))}
              </span>
            </span>
            <span className="sr-only">on TikTok, Instagram, YouTube and Snapchat </span>
            {hero.headline.line2} <span className="accent-serif text-ink">{hero.headline.accent}</span>
          </h1>

          <p className="text-pretty mt-7 max-w-[30rem] text-[1.1875rem] leading-[1.6] text-ink-mid">{hero.description}</p>

          <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Button href={hero.primaryCta.href}>
              <Phone className="size-[18px]" />
              {hero.primaryCta.label}
            </Button>
            <GhostButton href={hero.secondaryCta.href}>{hero.secondaryCta.label}</GhostButton>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 border-l-2 border-line-strong pl-6">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-low">{hero.proof.brands}</span>
              <span className="flex -space-x-2.5" aria-hidden>
                {hero.proof.initials.map((letter, index) => (
                  <span
                    key={letter}
                    className="flex size-10 items-center justify-center rounded-full border-2 border-paper text-[13px] font-bold text-ink"
                    style={{ backgroundColor: avatarTones[index % avatarTones.length] }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </div>
            <span aria-hidden className="hidden h-10 w-px bg-line-strong sm:block" />
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-low">{hero.proof.rating}</span>
              <span className="flex gap-1 text-orange" aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-5 fill-current" />
                ))}
              </span>
            </div>
          </div>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}
