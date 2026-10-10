"use client";

import { useState } from "react";
import { site } from "@/site.config";
import { getWork, work as allWork, type Work as WorkItem } from "@/data/work";
import { asset } from "@/lib/urls";
import { useScrollProgress } from "@/components/Motion";
import { ArrowDot, SmartLink } from "@/components/ui/Action";
import { TextMorph } from "@/components/ui/TextMorph";

type Shape = "tall" | "square" | "wide";

/**
 * A case study card: the photo, then the client and a figure that turns into "Read the
 * case study" on hover. Set `reveal` off where the card mounts after the page loads (the
 * /work filter animates its own entrance).
 */
export function WorkCard({ item, shape = "square", delay = 0, reveal = true }: { item: WorkItem; shape?: Shape; delay?: number; reveal?: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <SmartLink
      to={`/work/${item.slug}`}
      className={`work-card is-${shape}`}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      ariaLabel={`${item.client}: ${item.title}`}
    >
      <span className="work-media" data-reveal={reveal ? "mask" : undefined} style={{ "--d": `${delay}ms` } as React.CSSProperties}>
        <img src={asset(item.image)} alt={item.alt} width={shape === "wide" ? 1088 : 816} height={shape === "tall" ? 1020 : 816} loading="lazy" />
        <span className="work-kind">{item.kind}</span>
        <ArrowDot tone="lime" size={46} />
      </span>
      <span className="work-meta">
        <span className="work-client">{item.client}</span>
        <span className="work-metric">
          <TextMorph>{hover ? "Read the case study" : item.metric}</TextMorph>
        </span>
      </span>
      <span className="work-title">{item.title}</span>
    </SmartLink>
  );
}

// Three columns that drift at slightly different speeds as the section scrolls past.
const columns: { slots: number[]; shapes: Shape[]; speed: number }[] = [
  { slots: [0, 3], shapes: ["tall", "square"], speed: 36 },
  { slots: [1, -1], shapes: ["square", "square"], speed: -64 },
  { slots: [2, 4], shapes: ["tall", "square"], speed: 18 },
];

function SeeAll({ delay }: { delay: number }) {
  const thumbs = allWork.slice(0, 3);
  return (
    <SmartLink to="/work" className="see-all" data-reveal style={{ "--d": `${delay}ms` } as React.CSSProperties}>
      <span className="see-all-thumbs" aria-hidden="true">
        {thumbs.map((w, i) => (
          <span key={w.slug} style={{ "--i": i } as React.CSSProperties}>
            <img src={asset(w.image)} alt="" width={120} height={120} loading="lazy" />
          </span>
        ))}
      </span>
      <span className="see-all-count label">{String(allWork.length).padStart(2, "0")} case studies</span>
      <span className="h3 see-all-title">{site.work.more}</span>
      <ArrowDot tone="ink" size={60} />
    </SmartLink>
  );
}

export function Work() {
  const items = site.work.featured.map(getWork).filter(Boolean) as WorkItem[];
  const ref = useScrollProgress<HTMLElement>((p, el) => el.style.setProperty("--drift", (p - 0.5).toFixed(4)));
  return (
    <section ref={ref} id="work" className="section work" aria-labelledby="work-title">
      <div className="container">
        <div className="section-head split work-head">
          <div className="work-titles">
            <span className="tag" data-reveal>
              {site.work.label}
            </span>
            <h2 id="work-title" className="h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
              {site.work.title}
            </h2>
          </div>
          <p className="lead work-intro" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            {site.work.intro}
          </p>
        </div>
        <div className="work-columns">
          {columns.map((col, c) => (
            <div key={c} className="work-col" style={{ "--speed": col.speed } as React.CSSProperties}>
              {col.slots.map((slot, s) =>
                slot < 0 ? (
                  <SeeAll key="all" delay={c * 120} />
                ) : items[slot] ? (
                  <WorkCard key={items[slot].slug} item={items[slot]} shape={col.shapes[s]} delay={c * 120} />
                ) : null,
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
