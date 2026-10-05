'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TemplateCard from '@/components/TemplateCard';
import { getTemplateBySlug, TEMPLATES } from '@/data/templates';
import {
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface TemplateDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function TemplateDetailPage({ params }: TemplateDetailPageProps) {
  const resolvedParams = use(params);
  const template = getTemplateBySlug(resolvedParams.slug);

  if (!template) {
    notFound();
  }

  // Related templates in the same category
  const related = TEMPLATES.filter(
    (t) => t.category === template.category && t.slug !== template.slug
  ).slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#666666] selection:bg-primary/10 selection:text-primary">
      <Navbar />

      <main className="flex-1 py-10 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-[#888] mb-8 font-mono">
            <Link href="/" className="hover:text-[#181925] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/#catalog" className="hover:text-[#181925] transition-colors">
              Templates
            </Link>
            <span>/</span>
            <span className="text-[#181925] font-medium">{template.title}</span>
          </div>

          {/* Header Section */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Details & Actions */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-[#666]">
                <span className="font-semibold text-primary">{template.category}</span>
                <span>•</span>
                <span>{template.badge}</span>
              </div>

              <h1 className="mt-4 text-3xl font-medium tracking-tight text-[#181925] sm:text-5xl leading-tight">
                {template.title}
              </h1>

              <p className="mt-4 text-base text-[#666] leading-relaxed">
                {template.description}
              </p>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-[#f6f6f6] border border-black/[0.05] px-2.5 py-1 text-xs font-medium text-[#777]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={template.demoUrl}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap !rounded-full font-medium transition-all cursor-pointer border border-[color-mix(in_srgb,var(--primary)_80%,#12245e)] bg-[color-mix(in_srgb,var(--primary)_90%,#12245e)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(18,36,94,0.4)] transform-gpu hover:bg-primary active:scale-[0.98] h-11 px-6 text-sm"
                >
                  <Eye className="size-4" />
                  <span>Launch Live Demo</span>
                </Link>

              </div>

              <div className="mt-6 flex items-center gap-6 text-xs text-[#777]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-emerald-600" />
                  <span>Next.js 15 Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-emerald-600" />
                  <span>Tailwind CSS</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-emerald-600" />
                  <span>Commercial License</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Mockup Card */}
            <div className="lg:col-span-6">
              <div className="group relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-black/[0.08] bg-[#f7f7f8] shadow-sm">
                {/* Browser bar */}
                <div className="flex h-8 items-center justify-between border-b border-black/[0.04] bg-[#f0f0f2] px-3">
                  <div className="flex items-center gap-1.5">
                    <div className="size-2 rounded-full bg-neutral-300" />
                    <div className="size-2 rounded-full bg-neutral-300" />
                    <div className="size-2 rounded-full bg-neutral-300" />
                  </div>
                  <span className="font-mono text-[10px] text-[#888]">founderdada.com/demo/{template.slug}</span>
                  <div className="size-2" />
                </div>

                {/* Preview mockup view */}
                <div className="relative h-full w-full bg-white p-8 flex flex-col justify-center items-center text-center">
                  <span className="font-mono text-xs text-primary uppercase font-semibold">
                    {template.category}
                  </span>
                  <h3 className="mt-2 text-xl font-medium text-[#181925]">{template.title}</h3>
                  <p className="mt-2 max-w-sm text-xs text-[#777] leading-relaxed">
                    {template.description}
                  </p>

                  <Link
                    href={template.demoUrl}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#181925] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-black transition-all"
                  >
                    <Eye className="size-3.5" />
                    <span>Open Interactive Preview</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Features Breakdown */}
          <div className="mt-16 border-t border-black/[0.06] pt-12">
            <h2 className="text-xl font-medium text-[#181925] tracking-tight">Included Capabilities & Features</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {template.features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-xl border border-black/[0.06] bg-[#f7f7f8] p-4 text-left"
                >
                  <CheckCircle2 className="size-4 text-primary mb-2" />
                  <div className="text-sm font-medium text-[#181925]">{feature}</div>
                  <p className="mt-1 text-xs text-[#777] leading-relaxed">
                    Production-tested with strict TypeScript typing and responsive Tailwind breakpoints.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Templates */}
          {related.length > 0 && (
            <div className="mt-16 border-t border-black/[0.06] pt-12">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium text-[#181925] tracking-tight">
                  More in {template.category}
                </h2>
                <Link href="/#catalog" className="text-xs font-medium text-primary hover:underline">
                  View All &rarr;
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((rel) => (
                  <TemplateCard key={rel.slug} template={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
