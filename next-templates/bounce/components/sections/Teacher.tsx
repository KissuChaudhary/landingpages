"use client";

import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { useInView } from "../Motion";
import { Cover } from "../ui/Art";
import { Eyebrow, NumberRoll } from "../ui/Primitives";

export function Teacher() {
  const { teacher } = site;
  const [stats, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  return (
    <section className="section teacher" id="teacher">
      <div className="container teacher-grid">
        <figure className="teacher-photo" data-reveal="" style={{ "--rx": "-40px", "--ry": "0px" } as CSSProperties}>
          <img src={asset(teacher.photo)} width={768} height={1024} alt={`${teacher.name}, ${teacher.role}`} loading="lazy" decoding="async" />
          <figcaption>
            <b>{teacher.name}</b>
            <span>{teacher.role}</span>
          </figcaption>
          <div className="teacher-stats" ref={stats}>
            {teacher.stats.map((s, i) => (
              <div key={s.label} className={`stat-chip c-${["pink", "lime", "violet"][i % 3]}`} style={{ "--d": i } as CSSProperties}>
                <b>
                  <NumberRoll value={s.value} play={inView} />
                  <span className="stat-suffix">{s.suffix}</span>
                </b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </figure>

        <div className="teacher-copy">
          <Eyebrow color="violet">Your teacher</Eyebrow>
          <h2 className="title is-left" data-reveal="">
            {teacher.heading}
          </h2>
          {teacher.bio.map((p, i) => (
            <p className="teacher-bio" key={i} data-reveal="" style={{ "--rd": `${80 + i * 60}ms` } as CSSProperties}>
              {p}
            </p>
          ))}
          <div className="credits" data-reveal="" style={{ "--rd": "200ms" } as CSSProperties}>
            <p className="credits-title">Selected credits</p>
            <ul>
              {teacher.credits.map((c) => (
                <li key={c.title}>
                  <Cover colors={c.colors} />
                  <span className="credit-main">
                    <b>{c.title}</b>
                    <span>{c.artist}</span>
                  </span>
                  <span className="credit-role">{c.role}</span>
                  <span className="credit-year">{c.year}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
