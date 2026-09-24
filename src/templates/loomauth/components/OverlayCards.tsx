import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export const OverlayCards = () => {
    return (
        <div className="absolute inset-0 z-10 pointer-events-none max-w-7xl mx-auto w-full">
            {/* Left Card: The Problem */}
            <div className="absolute top-[15%] left-[5%] md:left-[15%] w-64 bg-white border border-ink shadow-brutalist animate-float-slow">
                <div className="bg-ink text-white px-3 py-1 font-mono text-xs flex justify-between">
                    <span>VISIBILITY_CHECK</span>
                    <span className="text-red-400">●</span>
                </div>
                <div className="p-4 font-mono text-xs">
                    <div className="border-b border-dashed border-ink pb-2 mb-2 text-ink/60">
                        QUERY: "Best AI SEO Tool"
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-red-600 font-bold">
                            <XIcon /> <span>FlipAEO: NOT FOUND</span>
                        </div>
                        <div className="flex items-center gap-2 opacity-50">
                            <CheckCircle2 size={12} /> <span>Competitor A (Cited)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Card: The Solution */}
            <div className="absolute bottom-[20%] right-[5%] md:right-[15%] w-60 bg-[#FFD700] border border-ink shadow-brutalist animate-float-delayed">
                <div className="h-4 border-b border-ink bg-white flex gap-1 items-center px-2">
                    <div className="w-full h-[1px] bg-ink"></div>
                </div>
                <div className="p-4">
                    <h3 className="font-serif font-bold text-xl leading-none mb-1">Action Plan</h3>
                    <p className="font-mono text-[10px] mb-3">STATUS: GENERATED</p>
                    <div className="w-full bg-ink h-1 mb-2">
                        <div className="bg-white h-full w-[70%]"></div>
                    </div>
                    <div className="font-mono text-[10px] flex justify-between">
                        <span>UPLOADING CONTENT...</span>
                        <span>70%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};