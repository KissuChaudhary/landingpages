'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onSearchClick?: () => void;
}

export default function Navbar({ onSearchClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 h-16 w-full px-4 sm:px-6 pt-3 sm:pt-4">
      <div className="relative mx-auto flex h-12 sm:h-13 w-full max-w-3xl items-center justify-between rounded-full border border-[#8f8f8f]/30 bg-[#d9d9d9]/50 px-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
        {/* Brand Wordmark: FounderDada. */}
        <Link href="/" className="flex items-center group ml-1">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white mr-1.5 shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <span className="font-semibold tracking-tight text-[#181925] text-base sm:text-lg">
            FounderDada<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Center Links */}
        <div className="hidden sm:flex items-center gap-6 text-xs sm:text-sm font-medium text-[#666]">
          <Link href="#catalog" className="hover:text-[#181925] transition-colors">
            Templates
          </Link>
          <Link href="#how-it-works" className="hover:text-[#181925] transition-colors">
            How it works
          </Link>
          <Link href="#pricing" className="hover:text-[#181925] transition-colors">
            Pricing
          </Link>
          <Link href="#faq" className="hover:text-[#181925] transition-colors">
            FAQ
          </Link>
        </div>

        {/* Right CTA Button: Tactile 3D Button */}
        <div className="flex items-center gap-2">
          <Link
            href="#pricing"
            className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap !rounded-full font-medium transition-all cursor-pointer border border-[color-mix(in_srgb,var(--primary)_80%,#12245e)] bg-[color-mix(in_srgb,var(--primary)_90%,#12245e)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(18,36,94,0.4)] transform-gpu hover:bg-primary active:translate-y-px active:scale-[0.98] h-8.5 px-4 text-xs select-none"
          >
            <span>All-Access Pass</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
