"use client";

import { Share, Download, Plus } from "lucide-react";
import Image from "next/image";

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-6 pt-2 pb-2">
      {/* Top Breadcrumb row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm">
          <div className="flex gap-1.5 items-center text-primary font-medium">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <span>Dashboard</span>
          </div>
          <span className="text-muted font-mono text-[12px]">14 Live Projects</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-muted font-mono text-[12px]">Last updated at 14:25</span>
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-[#0D0D0E] bg-white/20 overflow-hidden relative">
                <Image src={`https://picsum.photos/seed/${i * 12}/50/50`} alt="" fill referrerPolicy="no-referrer" className="object-cover" />
              </div>
            ))}
          </div>
          <button className="h-[36px] px-3 rounded-[12px] bg-white/5 border border-white/5 text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-colors">
            <Share className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Hero row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mt-4 gap-6">
        <div>
          <h1 className="text-[36px] md:text-[44px] lg:text-[56px] font-semibold leading-[1.05] tracking-[-0.04em] text-primary">
            Good morning, Aman <span className="inline-block origin-bottom-right rotate-12">👋</span>
          </h1>
          <p className="text-secondary mt-3 text-[16px] md:text-lg font-medium tracking-tight">
            Here&apos;s what&apos;s happening with your projects today.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none justify-center h-[48px] px-5 rounded-[14px] bg-white/5 border border-white/10 text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-transform active:scale-95 duration-220">
            <Download className="w-[18px] h-[18px]" />
            Export
          </button>
          <button 
            className="flex-1 md:flex-none justify-center h-[48px] px-6 rounded-[14px] text-white font-medium flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all duration-220"
            style={{
              background: "linear-gradient(180deg, #FFA526 0%, #FF8A00 100%)",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.3), 0 10px 30px rgba(255,138,0,0.25), 0 2px 8px rgba(0,0,0,0.5)"
            }}
          >
            <Plus className="w-5 h-5" />
            New Contract
          </button>
        </div>
      </div>
    </div>
  );
}
