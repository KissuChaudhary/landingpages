"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { Frame, Label, SectionHead } from "../ui/Primitives";
import { useSite } from "../SiteShell";

const shots = [
  { file: "stage-build", alt: "The agent builder: a plain-language instruction becomes a blueprint with tools and an approval rule" },
  { file: "stage-orchestrate", alt: "The workflow canvas: a lead routes through enrichment, a fit check, human review and a CRM handoff" },
  { file: "stage-observe", alt: "The run view: today's runs, success rate, and a step-by-step timeline of one run" },
];

/** Counts up once, the first time the band is on screen. */
function ImpactBand() {
  const { motion } = useSite();
  const band = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!motion) return setP(1);
    const el = band.current;
    if (!el) return;
    let frame = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - start) / 1100);
        setP(1 - Math.pow(1 - k, 3));
        if (k < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [motion]);
  return (
    <div className="impact-band" ref={band}>
      <h3>{site.impact.title}</h3>
      {site.impact.stats.map((stat) => (
        <div className="impact-stat" key={stat.note}>
          <strong>
            {Math.round(stat.value * p)}
            <span>{stat.unit}</span>
          </strong>
          <p>{stat.note}</p>
        </div>
      ))}
    </div>
  );
}

export function Solution() {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLLIElement | null)[]>([]);
  const list = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    steps.current.forEach((el) => el && io.observe(el));
    const el = list.current;
    let frame = 0;
    const fill = () => {
      frame = 0;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = (innerHeight * 0.5 - r.top) / r.height;
      el.style.setProperty("--fill", Math.max(0, Math.min(1, p)).toFixed(3));
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(fill);
    };
    fill();
    addEventListener("scroll", scroll, { passive: true });
    addEventListener("resize", scroll);
    return () => {
      io.disconnect();
      removeEventListener("scroll", scroll);
      removeEventListener("resize", scroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <Frame className="section product" id="product">
      <div className="product-head">
        <SectionHead label={site.solution.label} title={site.solution.title} />
        <p className="mono product-count">
          0{site.solution.features.length} stages · one system
        </p>
      </div>
      <div className="product-body">
        <div className="product-stage" aria-hidden="true">
          {shots.map((shot, i) => (
            <img
              key={shot.file}
              src={asset(`/images/${shot.file}.webp`)}
              alt=""
              width={2240}
              height={1440}
              loading="lazy"
              className={i === active ? "is-active" : i < active ? "is-past" : ""}
            />
          ))}
          <p className="mono stage-index">
            <span>0{active + 1}</span> / 0{shots.length} ·{" "}
            {site.solution.features[active].label}
          </p>
        </div>
        <ol className="product-steps" ref={list}>
          <span className="product-rail" aria-hidden="true">
            <span />
          </span>
          {site.solution.features.map((feature, i) => (
            <li
              key={feature.label}
              data-step={i}
              ref={(el) => {
                steps.current[i] = el;
              }}
              className={i <= active ? "is-live" : ""}
            >
              <span className="step-node" aria-hidden="true" />
              <Label>{feature.label}</Label>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <ul>
                {feature.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <img
                className="step-shot"
                src={asset(`/images/${shots[i].file}-phone.webp`)}
                alt={shots[i].alt}
                width={1280}
                height={1040}
                loading="lazy"
              />
            </li>
          ))}
        </ol>
      </div>
      <ImpactBand />
    </Frame>
  );
}
