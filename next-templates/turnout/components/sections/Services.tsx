"use client";

import { Fragment, useEffect, useRef } from "react";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { useMotion } from "@/components/Motion";
import { StatRoll } from "@/components/ui/NumberRoll";
import { Check } from "@/components/ui/Icons";

// Four cards stack on top of each other as you scroll. Each one has a folder tab set a
// little further along than the last, so the tabs stay visible as an index you can jump
// from. The card being covered dims and its photo settles back.

export function Services() {
  const { services } = site;
  const { reduced } = useMotion();
  const cards = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      cards.current.forEach((card, i) => {
        const next = cards.current[i + 1];
        if (!card) return;
        if (!next) return card.style.setProperty("--cover", "0");
        // 0 while the next card is a full card-height away, 1 once it sits on top.
        const gap = next.getBoundingClientRect().top - card.getBoundingClientRect().top;
        const cover = 1 - Math.min(1, Math.max(0, gap / card.offsetHeight));
        card.style.setProperty("--cover", cover.toFixed(3));
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduced]);

  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-head">
          <span className="tag" data-reveal>
            {services.label}
          </span>
          <h2 id="services-title" className="h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            {services.title}
          </h2>
        </div>
        <div className="stack" style={{ "--count": services.items.length } as React.CSSProperties}>
          {services.items.map((service, i) => (
            <Fragment key={service.id}>
              {/* The anchor sits in normal flow, so jumping to a sticky card lands in the right place. */}
              <span id={`service-${service.id}`} className="stack-anchor" aria-hidden="true" />
              <article
                ref={(el) => {
                  cards.current[i] = el;
                }}
                className="stack-card"
                data-accent={service.accent}
                style={{ "--i": i } as React.CSSProperties}
                aria-labelledby={`service-${service.id}-title`}
              >
                <a className="stack-tab" href={`#service-${service.id}`}>
                  <span className="stack-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="stack-tab-label">{service.tab}</span>
                </a>
                <div className="stack-body">
                  <div className="stack-copy">
                    <h3 id={`service-${service.id}-title`} className="h2 stack-title">
                      {service.title}
                    </h3>
                    <p className="lead stack-text">{service.body}</p>
                    <ul className="stack-list js-draw is-in">
                      {service.includes.map((item) => (
                        <li key={item}>
                          <span className="stack-tick">
                            <Check size={12} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="stack-stat">
                      <span className="stack-figure">
                        <StatRoll value={service.stat.value} suffix={service.stat.suffix} compact={"compact" in service.stat && service.stat.compact} />
                      </span>
                      <span className="stack-stat-label">{service.stat.label}</span>
                    </div>
                  </div>
                  <figure className="stack-media">
                    <img src={asset(service.image)} alt={service.alt} width={768} height={864} loading="lazy" />
                  </figure>
                </div>
              </article>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
