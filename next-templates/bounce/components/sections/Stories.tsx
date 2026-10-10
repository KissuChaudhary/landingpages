"use client";

import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { useInView } from "../Motion";
import { Waveform } from "../ui/Art";
import { NumberRoll, Title } from "../ui/Primitives";

export function Stories() {
  const { stories } = site;
  const [strip, inView] = useInView<HTMLDListElement>({ threshold: 0.4 });
  return (
    <section className="section stories" id="stories">
      <div className="container">
        <div className="section-head">
          <Title lines={stories.heading} />
          <dl className="stat-strip" ref={strip} data-reveal="">
            {stories.stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>
                  <NumberRoll value={s.value} play={inView} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="story-wall">
          {stories.items.map((s, i) => (
            <figure key={s.name} className={`story c-${s.color}`} data-reveal="" style={{ "--ry": "40px", "--rd": `${(i % 3) * 90}ms` } as CSSProperties}>
              <div className="story-track">
                <Waveform seed={i + 11} bars={40} />
                <span>
                  <b>{s.track}</b>
                  <em>{s.result}</em>
                </span>
              </div>
              <blockquote>
                <p>“{s.quote}”</p>
              </blockquote>
              <figcaption>
                <img src={asset(s.avatar)} width={44} height={44} alt="" loading="lazy" />
                <span>
                  <b>{s.name}</b>
                  <span>Cohort student</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
