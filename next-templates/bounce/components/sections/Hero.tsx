"use client";

import { Fragment, useRef, type CSSProperties } from "react";
import { Check, Music2, Rocket } from "lucide-react";
import { site, enrollHref, seatsLeft, cohortDate } from "@/site.config";
import { asset } from "@/lib/urls";
import { useMotion } from "../Motion";
import { ButtonLink } from "../ui/Primitives";
import { BeatPad } from "./BeatPad";

const chipIcons = [Music2, Check, Rocket];

export function Hero() {
  const { hero, cohort } = site;
  const { reduced } = useMotion();
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  // The floating chips drift a little with the pointer, at different depths.
  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== "mouse") return;
    cancelAnimationFrame(frame.current);
    const { clientX, clientY } = e;
    frame.current = requestAnimationFrame(() => {
      const el = stage.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (((clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      el.style.setProperty("--my", (((clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    });
  };

  // A trailing full stop on the last line becomes the bouncing ball.
  const lines = hero.heading.map((l, i) => (i === hero.heading.length - 1 && l.endsWith(".") ? l.slice(0, -1) : l));
  const ball = hero.heading[hero.heading.length - 1]?.endsWith(".");
  let word = 0;

  return (
    <section className="hero" id="top" onPointerMove={onMove}>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="status">
            <i aria-hidden="true" />
            {cohort.name} starts {cohortDate()} · <b>{seatsLeft()} seats left</b>
          </p>
          <h1 className="hero-title">
            {lines.map((line, l) => (
              <span className="hero-line" key={l}>
                {l > 0 && " "}
                {line.split(" ").map((w, j, all) => (
                  <Fragment key={j}>
                    {j > 0 && " "}
                    <span className="hero-word" style={{ "--w": word++ } as CSSProperties}>
                      <span>
                        {w}
                        {ball && l === lines.length - 1 && j === all.length - 1 && <span className="ball" aria-hidden="true" />}
                      </span>
                    </span>
                  </Fragment>
                ))}
              </span>
            ))}
            {ball && <span className="sr-only">.</span>}
          </h1>
          <p className="hero-text">{hero.text}</p>
          <div className="hero-actions">
            <ButtonLink to={enrollHref()} label={hero.primary} />
            <ButtonLink to={hero.secondary.href} label={hero.secondary.label} variant="light" arrow={false} />
          </div>
          <div className="hero-proof">
            <span className="avatars" aria-hidden="true">
              {hero.proof.avatars.map((src) => (
                <img key={src} src={asset(src)} width={36} height={36} alt="" />
              ))}
            </span>
            <p>
              <b>{hero.proof.count}</b> {hero.proof.text}
            </p>
          </div>
        </div>

        <div className="hero-stage" ref={stage}>
          <BeatPad />
          {hero.chips.map((chip, i) => {
            const Icon = chipIcons[i % chipIcons.length];
            return (
              <div key={chip.label} className={`float-chip float-${i + 1} c-${chip.color}`} aria-hidden="true" style={{ "--d": i } as CSSProperties}>
                <span className="float-icon">
                  <Icon size={15} strokeWidth={2.4} />
                </span>
                <span>
                  <b>{chip.label}</b>
                  <small>{chip.detail}</small>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
