'use client';

import React from 'react';
import { ArrowUpRight, BookOpen, Boxes, Building2, ChartColumn, LifeBuoy, Newspaper, Plug, Rocket, ShieldCheck, Users, Workflow } from 'lucide-react';
import { MorphingNav, type NavItem } from '../registry/morphing-nav';

function Entry({ icon, title, text }: { icon: React.ReactNode; title: string; text?: string }) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className={`group flex ${text ? "items-start" : "items-center"} gap-3 rounded-xl p-2.5 outline-none transition-colors hover:bg-accent focus-visible:bg-accent`}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground shadow-[inset_0_0_0_1px_var(--border)] transition-colors group-hover:text-foreground [&_svg]:size-4 [&_svg]:stroke-[1.8]">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-medium text-foreground">{title}</span>
        {text && <span className="mt-0.5 block text-[12px] leading-snug text-muted-foreground">{text}</span>}
      </span>
    </a>
  );
}

const ITEMS: NavItem[] = [
  {
    id: 'product',
    label: 'Product',
    content: (
      <div className="grid w-[480px] grid-cols-2 gap-0.5 p-2">
        <Entry icon={<Workflow />} title="Workflows" text="Chain steps that run on their own." />
        <Entry icon={<ChartColumn />} title="Insights" text="See what moves your numbers." />
        <Entry icon={<Plug />} title="Integrations" text="Forty tools, connected in a click." />
        <Entry icon={<ShieldCheck />} title="Security" text="SSO, audit logs and roles." />
      </div>
    ),
  },
  {
    id: 'solutions',
    label: 'Solutions',
    content: (
      <div className="flex w-[300px] flex-col gap-0.5 p-2">
        <Entry icon={<Rocket />} title="Startups" text="Launch in a weekend." />
        <Entry icon={<Users />} title="Agencies" text="One workspace per client." />
        <Entry icon={<Building2 />} title="Enterprise" text="Scale with controls." />
      </div>
    ),
  },
  {
    id: 'resources',
    label: 'Resources',
    content: (
      <div className="flex w-[400px] gap-2 p-2">
        <div className="flex flex-1 flex-col gap-0.5">
          <Entry icon={<BookOpen />} title="Docs" />
          <Entry icon={<Boxes />} title="Templates" />
          <Entry icon={<LifeBuoy />} title="Support" />
        </div>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="group flex w-[170px] flex-col justify-between rounded-xl p-3 shadow-[inset_0_0_0_1px_var(--border)] outline-none transition-colors hover:bg-accent focus-visible:bg-accent"
        >
          <Newspaper className="size-4 text-muted-foreground" />
          <span>
            <span className="flex items-center gap-1 text-[13px] font-medium text-foreground">
              Changelog
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
            <span className="mt-0.5 block text-[12px] leading-snug text-muted-foreground">Agents can now hand off to each other.</span>
          </span>
        </a>
      </div>
    ),
  },
  { id: 'pricing', label: 'Pricing', href: '#' },
  { id: 'changelog', label: 'Changelog', href: '#' },
];

export default function MorphingNavDemo() {
  return (
    <div className="flex min-h-[300px] w-full max-w-[640px] flex-col">
      <header className="flex items-center justify-between gap-4 rounded-full border border-border bg-background py-1.5 pl-4 pr-1.5">
        <span className="text-[14px] font-semibold tracking-[-0.02em] text-foreground">Relay</span>
        <MorphingNav items={ITEMS} className="hidden sm:block" />
        <a href="#" onClick={(e) => e.preventDefault()} className="h-9 shrink-0 whitespace-nowrap rounded-full bg-primary px-4 text-[13px] font-medium leading-9 text-primary-foreground">
          Start free
        </a>
      </header>
      <p className="mt-6 text-center text-[12.5px] text-muted-foreground sm:hidden">Open this on a wider screen to try the menu.</p>
    </div>
  );
}
