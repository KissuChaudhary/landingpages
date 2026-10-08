'use client';

import React, { useEffect, useState } from 'react';
import { WebResearch, type ResearchSource, type ResearchStatus } from '../registry/web-research';

const RUN: { query: string; sources: ResearchSource[] }[] = [
  {
    query: 'pistachio paste suppliers in Sicily',
    sources: [
      { url: 'https://bronte-growers.coop/paste', title: 'Bronte pistachio paste: wholesale grades' },
      { url: 'https://gelateria-notes.com/suppliers', title: 'Where Italian gelaterias buy their nuts' },
      { url: 'https://foodtradeweekly.net/pistachio-2026', title: 'Pistachio harvest outlook for 2026' },
    ],
  },
  {
    query: 'Bronte pistachio price per kg',
    sources: [
      { url: 'https://nutmarket.report/bronte', title: 'Bronte DOP prices, week 40' },
      { url: 'https://sicilyfoods.it/prezzi', title: 'Listino pistacchio di Bronte' },
      { url: 'https://scoopindustry.news/costs', title: 'What a scoop of pistachio really costs' },
    ],
  },
  {
    query: 'ice cream shop opening week ideas',
    sources: [
      { url: 'https://smallshopplaybook.com/openings', title: 'Opening week playbook for small food shops' },
      { url: 'https://localpress.guide/tastings', title: 'Getting local press to your tasting' },
      { url: 'https://queuecraft.blog/weekends', title: 'Designing a queue that moves' },
    ],
  },
];

const ALL_QUERIES = RUN.map((r) => r.query);
const ALL_SOURCES = RUN.flatMap((r) => r.sources);

export default function WebResearchDemo({ tab = 'Live' }: { tab?: string }) {
  const [status, setStatus] = useState<ResearchStatus>(tab === 'Live' ? 'searching' : tab === 'Failed' ? 'error' : 'done');
  const [queries, setQueries] = useState<string[]>(tab === 'Live' ? [ALL_QUERIES[0]] : tab === 'Failed' ? ALL_QUERIES.slice(0, 2) : ALL_QUERIES);
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
        timers.push(window.setTimeout(() => (setStatus('reading'), setSources((x) => [...x, source])), t + i * 420));
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
