"use client";

import { site } from "@/site.config";
import { releases } from "@/data/changelog";
import { ChangelogTrace } from "@/components/hairline/changelog-trace";

/*
 * THE CHANGELOG PAGE: every release on a trace (the Hairline UI changelog trace). A bead
 * runs down the line as you scroll, filters fold entries away and the trace re-routes.
 * Each release has an anchor, so /changelog#funnels lands on it.
 */

export function ChangelogView() {
  const entries = releases.map((r) => ({ id: r.id, date: r.date, version: `v${r.version}`, title: r.title, tags: r.tags, body: r.body }));
  return (
    <div className="changelog-page">
      <ChangelogTrace entries={entries} initialCount={8} locales={site.locale} />
    </div>
  );
}
