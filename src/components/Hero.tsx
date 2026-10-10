import React from 'react';
import Link from 'next/link';
import { ArrowRight, Blocks, Check } from 'lucide-react';
import HeroWord from '@/components/HeroWord';
import HeroWall from '@/components/HeroWall';
import HeroBackdrop from '@/components/home/HeroBackdrop';
import { NextIcon, ReactIcon, ShadcnIcon, TailwindIcon, TypeScriptIcon } from '@/components/home/BrandIcons';
import { TEMPLATES } from '@/data/templates';
import { TEMPLATE_DETAILS } from '@/data/template-details';
import { primaryButton, secondaryButton } from '@/components/home/buttons';

const WORDS = ['AI tools', 'SaaS', 'agents', 'studios', 'fintech', 'dev tools'];

// Brand colours show on hover; at rest the strip is one quiet ink.
const STACK = [
  { name: 'Next.js', Icon: NextIcon, color: '#000000' },
  { name: 'React', Icon: ReactIcon, color: '#149eca' },
  { name: 'Tailwind CSS', Icon: TailwindIcon, color: '#38bdf8' },
  { name: 'TypeScript', Icon: TypeScriptIcon, color: '#3178c6' },
  { name: 'shadcn/ui', Icon: ShadcnIcon, color: '#000000' },
];

const TRUST = ['One-time payment', 'Commercial license', 'Free updates'];

export default function Hero() {
  const newest = TEMPLATES[0];
  const newestName = newest ? TEMPLATE_DETAILS[newest.slug]?.name ?? newest.title : null;

  return (
    <section className="relative overflow-hidden pb-6 pt-16 sm:pt-24">
      <HeroBackdrop />

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6">
        {newest && newestName && (
          <Link
            href={newest.detailUrl}
            className="group inline-flex h-8 items-center gap-2 rounded-full bg-white pl-1 pr-3 text-[13px] text-[#444] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] transition-[color,box-shadow] hover:text-[#181925] hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.14)]"
          >
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">New template</span>
            {newestName}
            <ArrowRight className="size-3.5 text-[#aaa] transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        )}

        <div className="mt-9 sm:mt-11">
          <h1 className="text-[clamp(30px,9.5vw,38px)] font-medium leading-[1.04] tracking-[-0.05em] text-[#181925] sm:text-[64px] lg:text-[80px]">
            <span className="block">
              Landing pages for <HeroWord words={WORDS} />
            </span>
            <span className="mt-8 block">
              that <span className="text-primary">look expensive.</span>
            </span>
          </h1>
        </div>

        <p className="mx-auto mt-8 max-w-[34rem] text-pretty text-[17px] leading-relaxed text-[#666] sm:mt-9 sm:text-lg">
          Next.js templates and free components, made to one standard: every state designed, every change in motion.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-2.5 sm:flex-row">
          <a href="#catalog" className={primaryButton}>
            Browse templates
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <Link href="/ui" className={secondaryButton}>
            <Blocks className="size-4 text-[#888] transition-colors group-hover:text-primary" aria-hidden="true" />
            Explore components
          </Link>
        </div>

        <ul aria-label="What every purchase includes" className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[13px] text-[#888]">
          {TRUST.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <Check className="size-3.5 text-primary" strokeWidth={2.4} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <ul aria-label="Built with" className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 sm:mt-14">
          {STACK.map(({ name, Icon, color }) => (
            <li key={name} className="stack-item flex items-center gap-2 text-[13.5px] font-medium tracking-[-0.01em] text-[#71717a]" style={{ '--brand': color } as React.CSSProperties}>
              <Icon className="size-[17px]" />
              {name}
            </li>
          ))}
        </ul>
      </div>

      <HeroWall />
    </section>
  );
}
