'use client';

import React from 'react';
import { AnnouncementPill } from '../registry/announcement-pill';

const UPDATES = [
  { date: 'Oct 8', title: 'Agents hand off to each other', text: 'One agent plans, another ships, and you approve the handover.' },
  { date: 'Sep 30', title: 'Workflows run on a schedule', text: 'Every Monday at 9, or the moment a form comes in.' },
  { date: 'Sep 18', title: 'Faster first deploy', text: 'From sign-up to live in under a minute.' },
];

function Changelog() {
  return (
    <div className="p-5">
      <p className="text-[12px] font-medium text-muted-foreground">What’s new</p>
      <ol className="mt-3 space-y-3.5">
        {UPDATES.map((u) => (
          <li key={u.title} className="grid grid-cols-[52px_1fr] gap-2">
            <span className="pt-px font-mono text-[11px] text-muted-foreground">{u.date}</span>
            <span>
              <span className="block text-[13px] font-medium text-foreground">{u.title}</span>
              <span className="mt-0.5 block text-[12px] leading-snug text-muted-foreground">{u.text}</span>
            </span>
          </li>
        ))}
      </ol>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="mt-4 inline-flex items-center gap-1 rounded text-[12.5px] font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
      >
        See all updates
      </a>
    </div>
  );
}

export default function AnnouncementPillDemo() {
  return (
    <div className="flex min-h-[320px] w-full flex-col items-center pt-6 text-center">
      <AnnouncementPill more="Read the changelog" card={<Changelog />}>
        Agents can now hand off
      </AnnouncementPill>
      <p className="mt-6 text-[38px] font-medium leading-[1.05] tracking-[-0.04em] text-foreground">
        Ship the launch page
        <br />
        tonight.
      </p>
      <p className="mt-3 text-[14px] text-muted-foreground">Point at the pill, then open it.</p>
    </div>
  );
}
