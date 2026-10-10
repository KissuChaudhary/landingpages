"use client";

import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { useScrollProgress } from "../Motion";
import { Title } from "../ui/Primitives";

// The course platform, shown as an image. It lifts and straightens as it scrolls in.
export function Platform() {
  const { platform } = site;
  const shot = useScrollProgress<HTMLDivElement>(
    (p, el) => el.style.setProperty("--p", p.toFixed(3)),
    (el, vh) => ({ start: vh, distance: vh * 0.7 }),
  );
  return (
    <section className="section platform">
      <div className="container">
        <div className="section-head">
          <Title lines={platform.heading} />
          <p className="section-intro" data-reveal="">
            {platform.text}
          </p>
        </div>
        <div className="platform-shot" ref={shot}>
          <picture>
            <source media="(max-width: 640px)" srcSet={asset(platform.phone)} width={780} height={992} />
            <img src={asset(platform.image)} width={2720} height={1720} alt={platform.alt} loading="lazy" decoding="async" />
          </picture>
        </div>
        <ol className="platform-notes">
          {platform.notes.map((note, i) => (
            <li key={note.title} data-reveal="" style={{ "--rd": `${i * 90}ms` } as CSSProperties}>
              <span className="note-num">{String(i + 1).padStart(2, "0")}</span>
              <b>{note.title}</b>
              <span>{note.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
