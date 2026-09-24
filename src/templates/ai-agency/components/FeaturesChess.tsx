import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export function FeaturesChess() {
  return (
    <section className="w-full py-24 px-6 md:px-16 lg:px-24 bg-black relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-24">
          <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">
            Capabilities
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            Pro features. Zero complexity.
          </h2>
        </div>

        {/* Row 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32 w-full">
          <div className="flex-1 flex flex-col items-start text-left">
            <h3 className="text-3xl md:text-4xl font-heading italic text-white tracking-tight leading-[0.9] mb-6">
              Designed to convert. Built to perform.
            </h3>
            <p className="text-white/60 font-body font-light text-base md:text-lg mb-8 max-w-md">
              Every pixel is intentional. Our AI studies what works across thousands of top sites—then builds yours to outperform them all.
            </p>
            <button className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white flex items-center gap-2 hover:bg-white/5 transition-colors">
              Learn more
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 w-full">
            <div className="liquid-glass rounded-2xl overflow-hidden aspect-video relative">
              <img
                src="https://picsum.photos/seed/chess1/800/600"
                alt="Designed to convert"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 w-full">
          <div className="flex-1 flex flex-col items-start text-left">
            <h3 className="text-3xl md:text-4xl font-heading italic text-white tracking-tight leading-[0.9] mb-6">
              It gets smarter. Automatically.
            </h3>
            <p className="text-white/60 font-body font-light text-base md:text-lg mb-8 max-w-md">
              Your site evolves on its own. AI monitors every click, scroll, and conversion—then optimizes in real time. No manual updates. Ever.
            </p>
            <button className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white flex items-center gap-2 hover:bg-white/5 transition-colors">
              See how it works
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 w-full">
            <div className="liquid-glass rounded-2xl overflow-hidden aspect-video relative">
              <img
                src="https://picsum.photos/seed/chess2/800/600"
                alt="It gets smarter"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
