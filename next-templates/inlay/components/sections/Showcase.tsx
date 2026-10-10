"use client";

import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { useScrollProgress } from "@/components/Motion";
import { TileWords } from "@/components/ui/TileWords";

// Two rows of real-looking pages that drift in opposite directions as you scroll past.
// Nothing loops on its own; with reduced motion the rows simply sit still.

export function Showcase() {
  const { showcase } = site;
  const ref = useScrollProgress<HTMLElement>((p, el) => el.style.setProperty("--p", p.toFixed(4)));
  const half = Math.ceil(showcase.pages.length / 2);
  const rows = [showcase.pages.slice(0, half), showcase.pages.slice(half)];

  return (
    <section className="section showcase" id="showcase" ref={ref} aria-labelledby="showcase-title">
      <div className="container">
        <div className="head">
          <TileWords id="showcase-title" text={showcase.title} className="h2" tone="ink" />
          <p className="lead" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
            {showcase.description}
          </p>
        </div>
      </div>
      <div className="sc-rows">
        {rows.map((row, r) => (
          <div key={r} className="sc-row" style={{ "--dir": r ? 1 : -1 } as CSSProperties}>
            {[...row, ...row, ...row].map((p, i) => (
              <figure key={`${p.handle}-${i}`} className="sc-card" aria-hidden={i >= row.length || undefined}>
                <div className="sc-pic">
                  <img src={asset(p.image)} alt={i < row.length ? `${p.name}'s page on ${site.brand}` : ""} loading="lazy" decoding="async" />
                </div>
                <figcaption>
                  <span className="sc-who">
                    <b>{p.name}</b>
                    <span>
                      {site.handleDomain}/{p.handle}
                    </span>
                  </span>
                  <span className="sc-role">{p.role}</span>
                  <span className="sc-stat">{p.stat}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
