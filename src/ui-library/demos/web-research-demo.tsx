'use client';

import React, { useEffect, useState } from 'react';
import { WebResearch, type ResearchQuery, type ResearchSource, type ResearchStatus } from '../registry/web-research';

const RUN: { query: ResearchQuery; sources: ResearchSource[] }[] = [
  {
    query: { text: 'pistachio paste suppliers in Sicily', results: 5 },
    sources: [
      { url: 'https://bronte-growers.coop/paste', title: 'Bronte pistachio paste: wholesale grades' },
      { url: 'https://gelateria-notes.com/suppliers', title: 'Where Italian gelaterias buy their nuts' },
      { url: 'https://foodtradeweekly.net/pistachio-2026', title: 'Pistachio harvest outlook for 2026' },
    ],
  },
  {
    query: { text: 'r/icecream best pistachio paste', site: 'reddit.com', results: 12, resultLabel: 'threads' },
    sources: [
      { url: 'https://reddit.com/r/icecream/pistachio-paste', title: 'Which pistachio paste is worth the price?' },
      { url: 'https://reddit.com/r/gelato/bronte-vs-iran', title: 'Bronte vs Iranian pistachios, blind tasting' },
    ],
  },
  {
    query: { text: 'gelato shop opening week', site: 'x.com', results: 7, resultLabel: 'posts' },
    sources: [
      { url: 'https://x.com/smallshopplaybook/opening', title: 'A thread on opening weeks for small food shops' },
      { url: 'https://x.com/queuecraft/weekends', title: 'Designing a queue that moves' },
    ],
  },
];

const ALL_QUERIES = RUN.map((r) => r.query);
// Each page says which search found it, so the trail can group them.
const ALL_SOURCES = RUN.flatMap((r, i) => r.sources.map((src) => ({ ...src, query: i })));

export default function WebResearchDemo({ tab = 'Live' }: { tab?: string }) {
  const [status, setStatus] = useState<ResearchStatus>(tab === 'Live' ? 'searching' : tab === 'Failed' ? 'error' : 'done');
  const [queries, setQueries] = useState<ResearchQuery[]>(tab === 'Live' ? [ALL_QUERIES[0]] : tab === 'Failed' ? ALL_QUERIES.slice(0, 2) : ALL_QUERIES);
  const [sources, setSources] = useState<ResearchSource[]>(tab === 'Live' ? [] : tab === 'Failed' ? ALL_SOURCES.slice(0, 4) : ALL_SOURCES);

  // A stand-in for a real run: each search, then its pages arriving one by one.
  useEffect(() => {
    if (tab !== 'Live') return;
    const timers: number[] = [];
    let t = 0;
    RUN.forEach((step, s) => {
      if (s > 0) {
        timers.push(window.setTimeout(() => (setStatus('searching'), setQueries((q) => [...q, step.query])), t));
      }
      t += 1300;
      step.sources.forEach((source, i) => {
        timers.push(window.setTimeout(() => (setStatus('reading'), setSources((x) => [...x, { ...source, query: s }])), t + i * 420));
      });
      t += step.sources.length * 420 + 500;
    });
    timers.push(window.setTimeout(() => setStatus('done'), t));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [tab]);

  return (
    <div className="w-full max-w-[460px]">
      <WebResearch status={status} queries={queries} sources={sources} defaultOpen={tab === 'Done'} />
      {status === 'done' && tab === 'Live' && (
        <p className="mt-3 text-[13.5px] leading-relaxed text-foreground animate-[ui-fade-up_320ms_cubic-bezier(0.23,1,0.32,1)_both]">
          Bronte paste runs about €48 a kilo this season, so a double batch for opening weekend is affordable…
        </p>
      )}
    </div>
  );
}
