'use client';

import React from 'react';
import { Calculator, Truck } from 'lucide-react';
import { AgentPlayback, type PlaybackTurn } from '../registry/agent-playback';

const TURNS: PlaybackTurn[] = [
  {
    prompt: 'Which supplier should we use for pistachio paste this season?',
    steps: [
      { type: 'thinking', steps: ['Reading last season’s orders', 'Checking what changed in Bronte prices', 'Listing suppliers that ship to us'] },
      {
        type: 'search',
        queries: [
          {
            query: 'Bronte pistachio paste wholesale price 2026',
            sources: [
              { url: 'https://nutmarket.report/bronte', title: 'Bronte DOP prices, week 40' },
              { url: 'https://bronte-growers.coop/paste', title: 'Bronte pistachio paste: wholesale grades' },
              { url: 'https://gelateria-notes.com/suppliers', title: 'Where Italian gelaterias buy their nuts' },
            ],
          },
          {
            query: 'pistachio paste suppliers shipping to the UK',
            sources: [
              { url: 'https://sicilyfoods.it/export', title: 'Export terms and delivery times' },
              { url: 'https://scoopindustry.news/costs', title: 'What a scoop of pistachio really costs' },
            ],
          },
        ],
      },
      {
        type: 'tool',
        name: 'compare_prices',
        title: 'Compare prices',
        icon: <Calculator className="size-3.5" />,
        input: { product: 'pistachio paste', origin: 'Bronte', quantity_kg: 12, max_per_kg: 50 },
        output: { best: 'Bronte Growers Co-op', per_kg: '€46.80', delivery: '4 days' },
        duration: 1400,
        open: false,
      },
      {
        type: 'answer',
        content: [
          'Go with the Bronte Growers Co-op: €46.80 a kilo for DOP paste, about 6% under last season ',
          { type: 'citation', label: 'nutmarket.report' },
          ', and they deliver in four days. Order 12 kg by Wednesday to have it for the weekend batch.',
        ],
        sources: [{ name: 'nutmarket.report' }, { name: 'bronte-growers.coop' }, { name: 'sicilyfoods.it' }],
      },
    ],
  },
  {
    prompt: 'Great, order 12 kg and add it to Friday’s deliveries',
    steps: [
      { type: 'thinking', steps: ['Drafting the order', 'Finding Friday’s delivery slot'] },
      {
        type: 'tool',
        name: 'create_order',
        title: 'Place order',
        icon: <Truck className="size-3.5" />,
        input: { supplier: 'Bronte Growers Co-op', item: 'Pistachio paste, DOP', quantity_kg: 12, deliver: 'Friday, 8–10 am' },
        output: { order: 'PO-2041', total: '€561.60', status: 'confirmed' },
        duration: 1200,
      },
      { type: 'answer', content: 'Done. Order PO-2041 is confirmed for €561.60 and it’s on Friday’s delivery list for 8–10 am. I’ll remind Ana on Thursday evening.' },
    ],
  },
];

export default function AgentPlaybackDemo() {
  return (
    <div className="w-full max-w-[560px]">
      <AgentPlayback turns={TURNS} header="Relay" height={560} />
    </div>
  );
}
