"use client";

import { site } from "@/site.config";
import { releases } from "@/data/changelog";
import { ChangelogScrubber } from "@/components/hairline/changelog-scrubber";
import { SmartLink, Tag } from "@/components/ui/Primitives";

/*
 * SHIPPED LATELY: the newest releases on a ruler of days (the Hairline UI changelog
 * scrubber). Drag the playhead and the ticks swell under it; the card follows. Play
 * runs the history at the pace it shipped. Everything is in data/changelog.ts, and
 * the full list is on /changelog.
 */

export function Shipped() {
  const { shipped } = site;
  const entries = releases.slice(0, shipped.count).map((r) => ({ id: r.id, date: r.date, version: `v${r.version}`, title: r.title, tags: r.tags, body: r.body }));
  return (
    <section id="shipped" className="section shipped" aria-labelledby="shipped-title">
      <div className="wrap shipped-grid">
        <div className="shipped-head">
          <Tag>{shipped.tag}</Tag>
          <h2 id="shipped-title" className="h2" data-reveal>
            {shipped.title}
          </h2>
          <p className="lead" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            {shipped.body}
          </p>
          <SmartLink to="/changelog" className="shipped-more" data-reveal style={{ "--d": "140ms" } as React.CSSProperties}>
            <span className="text-link">{shipped.more}</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </SmartLink>
        </div>
        <div className="shipped-card" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
          <ChangelogScrubber entries={entries} locales={site.locale} />
        </div>
      </div>
    </section>
  );
}
