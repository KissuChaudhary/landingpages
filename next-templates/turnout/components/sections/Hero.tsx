"use client";

import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { getWork } from "@/data/work";
import { asset } from "@/lib/urls";
import { Filmstrip } from "@/components/ui/Filmstrip";
import { Action, ArrowDot, SmartLink, planHref } from "@/components/ui/Action";
import { Spark } from "@/components/ui/Icons";

/**
 * A photo capsule set into the headline. It opens once the lines have risen, cycles
 * through its photos on a CSS timer and widens when you point at it.
 */
function Capsule({ images, offset }: { images: readonly string[]; offset: number }) {
  return (
    <span className="capsule" aria-hidden="true" style={{ "--o": offset } as React.CSSProperties}>
      {images.map((src, k) => (
        <img key={src} src={asset(src)} alt="" width={240} height={120} style={{ "--k": k } as React.CSSProperties} />
      ))}
    </span>
  );
}

/** One headline line: words, with `[0]`, `[1]`… replaced by photo capsules. */
function Line({ text, index }: { text: string; index: number }) {
  const parts = text.split(/(\[\d+\])/).filter(Boolean);
  return (
    <span className="line" style={{ "--i": index } as React.CSSProperties}>
      <span>
        {parts.map((part, i) => {
          const slot = part.match(/^\[(\d+)\]$/);
          if (!slot) return <span key={i}>{part}</span>;
          const images = site.hero.capsules[Number(slot[1])];
          return images ? <Capsule key={i} images={images} offset={Number(slot[1])} /> : null;
        })}
      </span>
    </span>
  );
}

export function Hero() {
  const { hero } = site;
  const latest = getWork(hero.latest.work);
  const [ready, setReady] = useState(false);
  const plain = hero.title.map((line) => line.replace(/\s*\[\d+\]\s*/g, " ").trim()).join(" ");

  // One frame after mount, so the hidden start state is painted before the intro plays.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className={`hero ${ready ? "is-in" : ""}`} aria-labelledby="hero-title">
      <div className="container hero-top">
        <span className="hero-status">
          <span className="hero-status-dot" aria-hidden="true" />
          {hero.status}
        </span>
        {latest ? (
          <SmartLink to={`/work/${latest.slug}`} className="latest">
            <span className="latest-thumb">
              <img src={asset(latest.image)} alt="" width={96} height={96} />
            </span>
            <span className="latest-copy">
              <span className="latest-label">{hero.latest.label}</span>
              <span className="latest-title">{latest.client}</span>
            </span>
            <ArrowDot tone="ink" size={30} />
          </SmartLink>
        ) : null}
      </div>

      <h1 id="hero-title" className={`container display hero-title lines ${ready ? "is-in" : ""}`}>
        <span className="sr-only">{plain}</span>
        <span aria-hidden="true">
          {hero.title.map((line, i) => (
            <Line key={line} text={line} index={i} />
          ))}
        </span>
      </h1>

      <div className="container hero-row">
        <ul className="hero-services">
          {hero.services.map((service, i) => (
            <li key={service} style={{ "--i": i } as React.CSSProperties}>
              <Spark size={13} />
              {service}
            </li>
          ))}
        </ul>
        <p className="lead hero-lead">{hero.description}</p>
        <Action to={planHref()} label={site.cta} size="lg" className="hero-action" />
      </div>

      <div className="hero-reel">
        <Filmstrip frames={hero.reel} />
      </div>
    </section>
  );
}
