'use client';

import React from 'react';
import Link from 'next/link';
import { SectionHeader } from './theirs/section-header';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';

export default function PricingPlans() {
  return (
    <section id="pricing" className="py-16 sm:py-24 flex flex-col gap-12 relative overflow-hidden bg-[#fafafa] border-t border-black/[0.04]">
      {/* Section Header */}
      <SectionHeader
        badge="Pricing"
        title="Start free. Own the full library with one payment."
        description={
          <>
            Browse and test all {TEMPLATES.length} interactive demos for free. Upgrade once when you want full source code{' '}
            <span className="rounded-md bg-primary/10 box-decoration-clone px-1 py-0.5 text-primary font-medium">
              without monthly subscriptions
            </span>
            .
          </>
        }
        className="px-5 max-w-3xl mx-auto"
      />

      {/* Pricing Cards Container */}
      <div className="w-full max-w-4xl mx-auto px-5">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 list-none p-0 m-0">
          {/* CARD 1: FREE */}
          <li className="flex flex-col rounded-2xl bg-[#f6f6f6] p-6 sm:p-7 border border-black/[0.04]">
            {/* Header / Eyebrow */}
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#181925] font-medium">
                Free
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Community Access
              </p>
            </div>

            {/* Price */}
            <p className="mt-4 flex items-baseline text-4xl font-medium tracking-tight tabular-nums text-[#181925]">
              $0
              <span className="ml-1.5 text-base text-muted-foreground font-normal">Free Forever</span>
            </p>

            {/* Key Specs Table */}
            <dl className="mt-5 flex flex-col gap-2 border-t border-dashed border-black/[0.1] pt-4 font-mono text-xs">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-muted-foreground">Interactive Demos</dt>
                <dd className="tabular-nums font-medium text-primary">All {TEMPLATES.length} Kits</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-muted-foreground">Device Viewport Switcher</dt>
                <dd className="tabular-nums font-medium text-primary">Desktop, Tablet, Mobile</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-muted-foreground">Component Inspection</dt>
                <dd className="tabular-nums font-medium text-primary">Full Spec Sheets</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-muted-foreground">Charged</dt>
                <dd className="tabular-nums font-medium text-[#181925]">$0</dd>
              </div>
            </dl>

            {/* Features Checklist */}
            <ul className="mt-5 flex flex-1 flex-col gap-2 border-t border-dashed border-black/[0.1] pt-4 list-none p-0">
              {[
                `Full access to test ${TEMPLATES.length} live interactive demos`,
                'Responsive emulation (Desktop, 1024px, 768px, 375px)',
                'Tech stack and feature breakdown specifications',
                'Community Discord support',
              ].map((text) => (
                <li key={text} className="flex items-start gap-2 text-xs leading-5 text-[#444]">
                  <span aria-hidden="true" className="mt-1.5 block size-2 shrink-0 text-muted-foreground/60">
                    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 8 8">
                      <path d="M4 0v8M0 4h8" />
                    </svg>
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <a
              href="#catalog"
              className="mt-6 inline-flex items-center justify-center gap-1 whitespace-nowrap !rounded-full font-medium transition-all cursor-pointer border border-black/[0.1] bg-white text-[#181925] shadow-2xs hover:bg-neutral-50 h-10 px-5 text-sm select-none"
            >
              Browse {TEMPLATES.length} Free Demos
            </a>
          </li>

          {/* CARD 2: ALL-ACCESS LIFETIME */}
          <li className="relative flex flex-col rounded-2xl bg-white p-6 sm:p-7 border-2 border-primary/50 shadow-sm">
            {/* Header / Eyebrow */}
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary font-bold">
                Lifetime
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary font-medium">
                Best Value Pass
              </p>
            </div>

            {/* Price */}
            <p className="mt-4 flex items-baseline text-4xl font-medium tracking-tight tabular-nums text-[#181925]">
              $129
              <span className="ml-1.5 text-base text-muted-foreground font-normal">one-time payment</span>
            </p>

            {/* Key Specs Table */}
            <dl className="mt-5 flex flex-col gap-2 border-t border-dashed border-black/[0.1] pt-4 font-mono text-xs">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-muted-foreground">Source Code (.zip)</dt>
                <dd className="tabular-nums font-medium text-primary">All {TEMPLATES.length} Full Packages</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-muted-foreground">Commercial Projects</dt>
                <dd className="tabular-nums font-medium text-primary">Unlimited</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-muted-foreground">Future Releases</dt>
                <dd className="tabular-nums font-medium text-primary">Free Lifetime Updates</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-muted-foreground">Charged</dt>
                <dd className="tabular-nums font-medium text-[#181925]">$129 (Never renews)</dd>
              </div>
            </dl>

            {/* Features Checklist */}
            <ul className="mt-5 flex flex-1 flex-col gap-2 border-t border-dashed border-black/[0.1] pt-4 list-none p-0">
              {[
                `Instant download of all ${TEMPLATES.length} full standalone zip archives`,
                'Unlimited commercial SaaS and client web applications',
                'Next.js 15 App Router, React 19 & Tailwind CSS v4',
                'Every template driven from one config file',
                'Priority direct author support',
              ].map((text) => (
                <li key={text} className="flex items-start gap-2 text-xs leading-5 text-[#181925] font-medium">
                  <span aria-hidden="true" className="mt-1.5 block size-2 shrink-0 text-primary">
                    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 8 8">
                      <path d="M4 0v8M0 4h8" />
                    </svg>
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => alert('SaaS Demo: Connect your Stripe or LemonSqueezy checkout here!')}
              className="mt-6 inline-flex items-center justify-center gap-1.5 whitespace-nowrap !rounded-full font-medium transition-all cursor-pointer border border-[color-mix(in_srgb,var(--primary)_80%,#12245e)] bg-[color-mix(in_srgb,var(--primary)_90%,#12245e)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(18,36,94,0.4)] transform-gpu hover:bg-primary active:scale-[0.98] h-10 px-5 text-sm select-none"
            >
              <span>Get All-Access Lifetime Pass</span>
              <ArrowRight className="size-3.5" />
            </button>
          </li>
        </ul>

        {/* Guarantee Banner */}
        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-[#777]">
          <ShieldCheck className="size-4 text-primary shrink-0" />
          <span>14-day money back guarantee · No recurring subscriptions · Keep code forever.</span>
        </div>
      </div>
    </section>
  );
}
