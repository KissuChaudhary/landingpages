"use client";

import { Fragment, useRef, type CSSProperties } from "react";
import { site, signupHref } from "@/site.config";
import { asset } from "@/lib/urls";
import { useMotion, useScrollProgress } from "../Motion";
import { TallyBadge } from "../ui/Brand";
import { ButtonLink } from "../ui/Primitives";
import { Curtain, type CurtainHandle } from "../ui/Curtain";

export function Hero() {
  const { hero } = site;
  const { reduced } = useMotion();
  const curtain = useRef<CurtainHandle>(null);

  // The dashboard starts tilted back and settles flat as it scrolls up to meet you.
  const shot = useScrollProgress<HTMLDivElement>(
    (p, el) => el.style.setProperty("--p", p.toFixed(3)),
    (el, vh) => {
      const docTop = el.getBoundingClientRect().top + window.scrollY;
      return { start: docTop, distance: Math.max(160, docTop - vh * 0.16) };
    },
  );

  let word = 0;
  return (
    <section
      className="hero"
      onPointerMove={reduced ? undefined : (e) => curtain.current?.light(e.clientX)}
      onPointerLeave={() => curtain.current?.light(null)}
    >
      <Curtain ref={curtain} variant="hero" />
      <div className="container hero-inner">
        <TallyBadge />
        <h1 className="hero-title">
          {hero.heading.map((line) => (
            <span className="hero-line" key={line}>
              {line.split(" ").map((w, j) => (
                <Fragment key={w + j}>
                  {j > 0 && " "}
                  <span className="hero-word" style={{ "--w": word++ } as CSSProperties}>
                    <span>{w}</span>
                  </span>
                </Fragment>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero-text">{hero.text}</p>
        <div className="hero-actions">
          <ButtonLink to={signupHref()} label={hero.primary} variant="blue" />
          <ButtonLink to={hero.secondary.href} label={hero.secondary.label} />
        </div>
        <p className="hero-note">{hero.note}</p>
      </div>
      <div className="container hero-shot" ref={shot}>
        <div className="hero-frame">
          <picture>
            <source media="(max-width: 640px)" srcSet={asset(hero.image.phone)} width={780} height={1064} />
            <img src={asset(hero.image.src)} width={2720} height={1760} alt={hero.image.alt} fetchPriority="high" />
          </picture>
        </div>
      </div>
    </section>
  );
}
