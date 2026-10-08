import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-white py-8 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="flex size-5 items-center justify-center rounded-full bg-primary text-white">
            <Sparkles className="size-3" />
          </div>
          <span className="font-medium text-[#181925]">FounderDada</span>
          <span>· {TEMPLATES.length} Production Next.js UI Templates.</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          <Link href="/#catalog" className="hover:text-[#181925] transition-colors">
            Templates
          </Link>
          <Link href="/#how-it-works" className="hover:text-[#181925] transition-colors">
            How it works
          </Link>
          <Link href="/#pricing" className="hover:text-[#181925] transition-colors">
            Pricing
          </Link>
          <Link href="/#faq" className="hover:text-[#181925] transition-colors">
            FAQ
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-[#888]">© {new Date().getFullYear()} FounderDada. All rights reserved.</div>
      </div>
    </footer>
  );
}
