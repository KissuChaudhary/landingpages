"use client";

import type { CSSProperties } from "react";
import { Star } from "lucide-react";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { useInView } from "../Motion";
import { NumberRoll, SectionTitle } from "../ui/Primitives";

type Story = (typeof site.customers.stories)[number];

function StoryCard({ story, index }: { story: Story; index: number }) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.35 });
  return (
    <figure
      ref={ref}
      className={`story story-${story.tone}${story.stats.length > 1 ? " is-wide" : ""}`}
      data-reveal=""
      style={{ "--ry": "48px", "--rd": `${index * 100}ms` } as CSSProperties}
    >
      <dl className="story-stats">
        {story.stats.map((s) => (
          <div className="story-stat" key={s.label}>
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className="story-value">
                <NumberRoll value={s.value} play={inView} />
                <span className="story-suffix">{s.suffix}</span>
              </span>
              <span className="story-label" aria-hidden="true">
                {s.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      <blockquote>
        <p>“{story.quote}”</p>
      </blockquote>
      <figcaption>
        <img src={asset(story.avatar)} width={56} height={56} alt="" loading="lazy" />
        <span>
          <strong>{story.name}</strong>
          <span>{story.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Customers() {
  const { customers } = site;
  const { rating } = customers;
  return (
    <section className="section customers-section" id="customers">
      <div className="container">
        <SectionTitle lines={customers.heading} />
        <div className="stories">
          {customers.stories.map((story, i) => (
            <StoryCard story={story} index={i} key={story.name} />
          ))}
        </div>
        <div className="rating" data-reveal="">
          <Star size={18} fill="currentColor" strokeWidth={0} aria-hidden="true" />
          <p>
            <strong>{rating.score}</strong> {rating.text}
          </p>
          <span className="avatars" aria-hidden="true">
            {rating.avatars.map((src) => (
              <img key={src} src={asset(src)} width={32} height={32} alt="" loading="lazy" />
            ))}
            <span>{rating.more}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
