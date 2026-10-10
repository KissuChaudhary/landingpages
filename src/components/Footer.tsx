import React from 'react';
import Link from 'next/link';
import { LogoMark } from '@/components/site/Logo';
import { TEMPLATES } from '@/data/templates';
import { TEMPLATE_DETAILS } from '@/data/template-details';
import { SITE_NAME } from '@/data/site';

const PRODUCT = [
  { label: 'Templates', href: '/#catalog' },
  { label: 'Components', href: '/ui' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
];

const COMPONENTS = [
  { label: 'Text morph', href: '/ui/text-morph' },
  { label: 'Number roll', href: '/ui/number-roll' },
  { label: 'Status button', href: '/ui/status-button' },
  { label: 'Diff review', href: '/ui/diff-review' },
  { label: 'All components', href: '/ui' },
];

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <p className="text-[13px] font-medium text-[#181925]">{title}</p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-[14px] text-[#777] transition-colors hover:text-[#181925]">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  const newest = TEMPLATES.slice(0, 5).map((t) => ({ label: TEMPLATE_DETAILS[t.slug]?.name ?? t.title, href: t.detailUrl }));

  return (
    <footer className="border-t border-black/[0.06] bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-flex items-center" aria-label={`${SITE_NAME} home`}>
            <LogoMark size={26} className="mr-2" />
            <span className="text-[16px] font-semibold tracking-tight text-[#181925]">
              {SITE_NAME}
              <span className="text-primary">.</span>
            </span>
          </Link>
          <p className="mt-4 max-w-[17rem] text-[14px] leading-relaxed text-[#777]">
            Landing pages and components that look expensive. Every state designed, every change in motion.
          </p>
        </div>
        <Column title="Product" links={PRODUCT} />
        <Column title="Newest templates" links={newest} />
        <Column title="Components" links={COMPONENTS} />
      </div>
      <div className="border-t border-black/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-[12.5px] text-[#999] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p>One-time payments · Commercial license · Free updates</p>
        </div>
      </div>
    </footer>
  );
}
