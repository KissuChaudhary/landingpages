'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, ArrowRight, Sparkles } from 'lucide-react';
import type { TemplateItem } from '@/data/templates';

interface TemplateCardProps {
  template: TemplateItem;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  return (
    <div className="group relative flex flex-col rounded-2xl border border-black/[0.06] bg-[#f7f7f8] p-4 sm:p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-black/[0.12] hover:shadow-md">
      {/* Top Preview Frame (Browser Mockup Style) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/[0.06] bg-white">
        {/* Browser Top Controls */}
        <div className="flex h-7 items-center justify-between border-b border-black/[0.04] bg-[#f6f6f6] px-3">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-neutral-300" />
            <div className="h-2 w-2 rounded-full bg-neutral-300" />
            <div className="h-2 w-2 rounded-full bg-neutral-300" />
          </div>
          <div className="rounded bg-white px-2 py-0.5 font-mono text-[9px] text-[#777] border border-black/[0.04]">
            /{template.slug}
          </div>
          <div className="text-[10px] text-[#999] font-medium">Preview</div>
        </div>

        {/* Visual Preview Graphic */}
        <div className="relative h-full w-full p-4 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#fafafa] via-white to-[#f5f5f7]">
          <div className="flex items-center justify-between z-10">
            <span className="rounded-md bg-white border border-black/[0.06] px-2 py-0.5 text-[10px] font-medium text-[#555] shadow-2xs">
              {template.category}
            </span>
            <span className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">
              {template.badge}
            </span>
          </div>

          <div className="z-10 my-auto">
            <div className="text-base font-semibold text-[#181925] tracking-tight group-hover:text-primary transition-colors">
              {template.title}
            </div>
            <div className="mt-1 line-clamp-2 text-xs text-[#666]">
              {template.description}
            </div>
          </div>

          {/* Hover Overlay with Quick Actions */}
          <div className="absolute inset-0 z-20 flex items-center justify-center gap-2.5 bg-[#181925]/85 backdrop-blur-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Link
              href={template.demoUrl}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#181925] shadow-md hover:bg-neutral-100 transition-transform active:scale-95"
            >
              <Eye className="size-3.5 text-primary" />
              <span>Live Demo</span>
            </Link>
            <Link
              href={template.detailUrl}
              className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-medium text-white hover:bg-white/20 transition-colors"
            >
              <span>Specs</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="mt-4 flex flex-1 flex-col justify-between text-left">
        <div>
          <Link
            href={template.detailUrl}
            className="text-base font-medium text-[#181925] hover:text-primary transition-colors block"
          >
            {template.title}
          </Link>

          <p className="mt-1.5 line-clamp-2 text-xs text-[#666] leading-relaxed">
            {template.description}
          </p>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {template.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-white border border-black/[0.05] px-2 py-0.5 text-[10px] font-medium text-[#777]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-black/[0.05] pt-3.5 text-xs font-medium">
          <Link
            href={template.demoUrl}
            className="inline-flex items-center gap-1 text-primary hover:underline text-xs font-medium"
          >
            <Eye className="size-3.5" />
            <span>Interactive Demo</span>
          </Link>

          <div className="flex items-center gap-2">

            <Link
              href={template.detailUrl}
              className="inline-flex items-center text-[#777] hover:text-[#181925] transition-colors text-xs"
            >
              <span>Details &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
