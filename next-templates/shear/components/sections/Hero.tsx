"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { site } from "@/site.config";
import { GlyphField } from "@/components/motion/GlyphField";
import { RotatingWord } from "@/components/motion/RotatingWord";
import { useMotion, usePausedAnimations } from "@/components/motion/MotionProvider";
import { LogoMarquee } from "@/components/hairline/logo-marquee";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { HeroNav, FloatingNav } from "./Navigation";
import { SignupForm } from "./SignupForm";

/*
 * HERO: a dark frame inset from the page edge.
 *   arrive   rating, headline words, copy, field and logos rise in, staggered
 *   word     the highlighted word changes every few seconds (RotatingWord)
 *            and each change sends a wave along the glyph river behind it
 *   river    the glyph field (GlyphField) falls behind the copy and fades
 *            under it so the words stay readable
 *   logos    a slow strip of customer logos that eases to a stop under the
 *            pointer
 */

const DESKTOP_MASK = { x: 0.5, y: 0.4, rx: 0.44, ry: 0.36 };
// The river ends above the logo strip.
const RANGE: [number, number] = [0.12, 0.76];
const PHONE_MASK = { x: 0.5, y: 0.42, rx: 0.62, ry: 0.36 };

function Item({ children, delay, entered, className = "" }: { children: React.ReactNode; delay: number; entered: boolean; className?: string }) {
  return (
    <div className={`fade-up ${className}`} data-reveal={entered ? "in" : "wait"} style={{ "--delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

export function Hero() {
  const { hero, signup } = site;
  const { still } = useMotion();
  const [entered, setEntered] = React.useState(false);
  const [pulse, setPulse] = React.useState(0);
  const [phone, setPhone] = React.useState(false);
  const [navGone, setNavGone] = React.useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  usePausedAnimations(marqueeRef, still);

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));
    const query = window.matchMedia("(max-width: 640px)");
    const update = () => setPhone(query.matches);
    update();
    query.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      query.removeEventListener("change", update);
    };
  }, []);

  // The floating bar takes over once the hero's own bar has scrolled away.
  React.useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setNavGone(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const onWord = React.useCallback(() => setPulse((p) => p + 1), []);
  const before = hero.headline.before.split(" ");
  const after = hero.headline.after.split(" ");

  return (
    <section id="top" className="relative p-2 md:p-3" aria-labelledby="hero-title">
      <FloatingNav show={navGone} />
      <div className="tone-dark relative isolate flex min-h-[min(960px,calc(100svh-16px))] flex-col overflow-hidden rounded-[26px] bg-ink md:min-h-[min(960px,calc(100svh-24px))] md:rounded-[36px]">
        <GlyphField pulse={pulse} mask={phone ? PHONE_MASK : DESKTOP_MASK} range={RANGE} className="-z-10" />
        <HeroNav sentinelRef={navRef} />

        <div className="relative mx-auto flex w-full max-w-[1120px] flex-1 flex-col items-center justify-center px-5 pb-12 pt-12 text-center sm:pt-16 md:pb-14 md:pt-14">
          <Item entered={entered} delay={0}>
            <p className="flex items-center gap-2.5 text-[13px] text-white/60">
              <span className="flex gap-0.5 text-mint" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-3.5 fill-current" strokeWidth={0} />
                ))}
              </span>
              <span>
                <span className="font-[560] text-white">{hero.rating.score}</span> {hero.rating.label}
              </span>
            </p>
          </Item>

          <h1
            id="hero-title"
            data-reveal={entered ? "in" : "wait"}
            style={{ "--base": "80ms" } as React.CSSProperties}
            className="mt-6 text-[42px] font-[430] leading-[1.02] tracking-[-0.045em] text-white sm:text-[56px] lg:text-[68px]"
          >
            <span className="sr-only">
              {hero.headline.before} {hero.headline.words[0]} {hero.headline.after}
            </span>
            <span aria-hidden="true">
              {before.map((word, i) => (
                <React.Fragment key={i}>
                  <span className="reveal-word" style={{ "--i": i } as React.CSSProperties}>
                    {word}
                  </span>{" "}
                </React.Fragment>
              ))}
              <RotatingWord words={hero.headline.words} onChange={onWord} className="text-mint" />
              <br />
              {after.map((word, i) => (
                <React.Fragment key={i}>
                  {i > 0 && " "}
                  <span className="reveal-word" style={{ "--i": before.length + 1 + i } as React.CSSProperties}>
                    {word}
                  </span>
                </React.Fragment>
              ))}
            </span>
          </h1>

          <Item entered={entered} delay={380} className="mt-6 max-w-[600px]">
            <p className="text-[15.5px] leading-relaxed text-white/65 md:text-[17px]">{hero.description}</p>
          </Item>

          <Item entered={entered} delay={500} className="mt-9 w-full">
            <SignupForm />
          </Item>
          <Item entered={entered} delay={600}>
            <p className="text-[13px] text-white/50">{signup.note}</p>
          </Item>
        </div>

        <Item entered={entered} delay={720} className="relative px-3 pb-3 md:px-6 md:pb-6">
          <div className="flex items-center gap-4 px-1 text-[13px] text-white/50">
            <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
            <span>{hero.trustedLabel}</span>
            <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
          </div>
          <div ref={marqueeRef} className="mt-4">
            <LogoMarquee
              speed={30}
              gap={10}
              aria-label="Companies using Shear"
              logos={hero.logos.map((logo) => (
                <span key={logo.name} className="flex h-[60px] items-center rounded-[18px] border border-white/[0.07] bg-white/[0.03] px-7 md:h-[68px] md:px-9">
                  <CompanyLogo logo={logo} />
                </span>
              ))}
            />
          </div>
        </Item>
      </div>
    </section>
  );
}
