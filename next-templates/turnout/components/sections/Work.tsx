"use client";

import { useState } from "react";
import { site } from "@/site.config";
import { getWork, type Work as WorkItem } from "@/data/work";
import { asset } from "@/lib/urls";
import { ArrowDot, SmartLink } from "@/components/ui/Action";
import { TextMorph } from "@/components/ui/TextMorph";

/**
 * A case study card: the photo, and a bar whose figure turns into "Read the case study" on
 * hover. Set `reveal` off where the card mounts after the page loads (the /work filter
 * animates its own entrance).
 */
export function WorkCard({ item, wide = false, delay = 0, reveal = true }: { item: WorkItem; wide?: boolean; delay?: number; reveal?: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <SmartLink
      to={`/work/${item.slug}`}
      className={`work-card ${wide ? "is-wide" : ""}`}
      data-reveal={reveal ? "mask" : undefined}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      ariaLabel={`${item.client}: ${item.title}`}
    >
      <img src={asset(item.image)} alt={item.alt} width={wide ? 1088 : 816} height={wide ? 608 : 816} loading="lazy" />
      <span className="work-bar">
        <span className="work-pill">
          <span className="work-client">{item.client}</span>
          <span className="work-metric">
            <TextMorph>{hover ? "Read the case study" : item.metric}</TextMorph>
          </span>
        </span>
        <ArrowDot tone="light" size={40} />
      </span>
    </SmartLink>
  );
}

export function Work() {
  const items = site.work.featured.map(getWork).filter(Boolean) as WorkItem[];
  const [first, ...rest] = items;
  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="container">
        <div className="section-head center">
          <span className="tag" data-reveal>
            {site.work.label}
          </span>
          <h2 id="work-title" className="h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            {site.work.title}
          </h2>
        </div>
        <div className="work-grid">
          {first ? <WorkCard item={first} wide /> : null}
          {rest.map((item, i) => (
            <WorkCard key={item.slug} item={item} delay={(i % 2) * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
