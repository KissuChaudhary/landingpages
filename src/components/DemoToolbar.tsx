'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  ExternalLink,
  RotateCw,
  Download,
  ArrowRight
} from 'lucide-react';
import type { TemplateItem } from '@/data/templates';

export type DeviceMode = 'desktop' | 'laptop' | 'tablet' | 'mobile';

interface DemoToolbarProps {
  template: TemplateItem;
  currentDevice: DeviceMode;
  onDeviceChange: (mode: DeviceMode) => void;
  onRefresh: () => void;
}

export default function DemoToolbar({
  template,
  currentDevice,
  onDeviceChange,
  onRefresh,
}: DemoToolbarProps) {
  const getDeviceDimensions = () => {
    switch (currentDevice) {
      case 'desktop':
        return '100% Fluid';
      case 'laptop':
        return '1024 × 768';
      case 'tablet':
        return '768 × 1024';
      case 'mobile':
        return '375 × 812';
    }
  };

  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-black/[0.06] bg-white/95 px-3 sm:px-6 text-[#181925] backdrop-blur-md shadow-xs">
      {/* Left: Back Link & Template Info */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex size-8 items-center justify-center rounded-full border border-black/[0.08] bg-[#f7f7f8] text-[#666] hover:border-black/20 hover:text-[#181925] hover:bg-white transition-all shadow-2xs"
          title="Back to Catalog"
        >
          <ArrowLeft className="size-4" />
        </Link>

        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            href={`/template/${template.slug}`}
            className="font-medium text-xs sm:text-sm text-[#181925] hover:text-primary transition-colors"
          >
            {template.title}
          </Link>
          <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary">
            {template.category}
          </span>
        </div>
      </div>

      {/* Middle: Device Switcher (Desktop, Laptop, Tablet, Mobile) */}
      <div className="flex items-center gap-0.5 rounded-full border border-black/[0.08] bg-[#f6f6f6] p-1 shadow-2xs">
        <button
          onClick={() => onDeviceChange('desktop')}
          title="Desktop (100%)"
          className={`flex h-7 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-all ${
            currentDevice === 'desktop'
              ? 'bg-white text-[#181925] shadow-xs'
              : 'text-[#777] hover:text-[#181925]'
          }`}
        >
          <Monitor className="size-3.5" />
          <span className="hidden md:inline">Desktop</span>
        </button>

        <button
          onClick={() => onDeviceChange('laptop')}
          title="Laptop (1024px)"
          className={`flex h-7 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-all ${
            currentDevice === 'laptop'
              ? 'bg-white text-[#181925] shadow-xs'
              : 'text-[#777] hover:text-[#181925]'
          }`}
        >
          <Laptop className="size-3.5" />
          <span className="hidden md:inline">1024px</span>
        </button>

        <button
          onClick={() => onDeviceChange('tablet')}
          title="Tablet (768px)"
          className={`flex h-7 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-all ${
            currentDevice === 'tablet'
              ? 'bg-white text-[#181925] shadow-xs'
              : 'text-[#777] hover:text-[#181925]'
          }`}
        >
          <Tablet className="size-3.5" />
          <span className="hidden md:inline">Tablet</span>
        </button>

        <button
          onClick={() => onDeviceChange('mobile')}
          title="Mobile (375px)"
          className={`flex h-7 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-all ${
            currentDevice === 'mobile'
              ? 'bg-white text-[#181925] shadow-xs'
              : 'text-[#777] hover:text-[#181925]'
          }`}
        >
          <Smartphone className="size-3.5" />
          <span className="hidden md:inline">Mobile</span>
        </button>

        {/* Dimension indicator */}
        <div className="hidden lg:block border-l border-black/[0.08] pl-2.5 pr-2 font-mono text-[10px] text-[#888]">
          {getDeviceDimensions()}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onRefresh}
          title="Refresh Preview"
          className="flex size-8 items-center justify-center rounded-full border border-black/[0.08] bg-[#f7f7f8] text-[#666] hover:text-[#181925] hover:border-black/20 hover:bg-white transition-all shadow-2xs"
        >
          <RotateCw className="size-3.5" />
        </button>

        <Link
          href={`/preview/${template.slug}`}
          target="_blank"
          rel="noreferrer"
          title="Open Standalone in New Tab"
          className="hidden sm:flex size-8 items-center justify-center rounded-full border border-black/[0.08] bg-[#f7f7f8] text-[#666] hover:text-[#181925] hover:border-black/20 hover:bg-white transition-all shadow-2xs"
        >
          <ExternalLink className="size-3.5" />
        </Link>

        <a
          href={template.downloadUrl}
          download
          className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 text-xs font-medium text-[#181925] hover:bg-neutral-50 transition-colors shadow-2xs"
        >
          <Download className="size-3.5 text-[#777]" />
          <span>Download Zip</span>
        </a>

        <Link
          href="/#pricing"
          className="inline-flex items-center justify-center gap-1 whitespace-nowrap !rounded-full font-medium transition-all cursor-pointer border border-[color-mix(in_srgb,var(--primary)_80%,#12245e)] bg-[color-mix(in_srgb,var(--primary)_90%,#12245e)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(18,36,94,0.4)] transform-gpu hover:bg-primary active:scale-[0.98] h-8.5 px-3.5 text-xs select-none"
        >
          <span>All-Access</span>
        </Link>
      </div>
    </header>
  );
}
