"use client";

import { site } from "@/site.config";
import { NumberRoll } from "@/components/hairline/number-roll";
import { Testimonials } from "@/components/hairline/testimonials";
import { useInView } from "@/components/motion/Motion";
import { Tag } from "@/components/ui/Primitives";

/*
 * SWITCHERS: one quote at a time, chosen by its people (the Hairline UI testimonials
 * component). The quote's height eases to the new words, the name morphs and a ring
 * around the chosen face is the timer. Beside it, the rating rolls up when it arrives.
 */

export function Voices() {
  const { voices } = site;
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <section className="section voices" aria-labelledby="voices-title">
      <div className="wrap voices-grid">
        <div ref={ref} className="voices-head">
          <Tag>{voices.tag}</Tag>
          <h2 id="voices-title" className="h2" data-reveal>
            {voices.title}
          </h2>
          <p className="voices-rating" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            <span className="voices-score">
              <NumberRoll value={seen ? voices.rating.score : 0} format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }} locales={site.locale} />
            </span>
            <span className="voices-stars" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} viewBox="0 0 16 16" style={{ "--i": i } as React.CSSProperties}>
                  <path d="m8 1.6 1.9 4.1 4.5.5-3.3 3.1.9 4.4L8 11.5l-4 2.2.9-4.4L1.6 6.2l4.5-.5z" fill="currentColor" />
                </svg>
              ))}
            </span>
            <span className="voices-count">{voices.rating.label}</span>
          </p>
        </div>
        <div className="voices-quote" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
          <Testimonials items={voices.items} autoplay={7000} />
        </div>
      </div>
    </section>
  );
}
