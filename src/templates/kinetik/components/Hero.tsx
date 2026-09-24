import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroVisuals } from './HeroVisuals';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 md:pt-48 pb-20 md:pb-32 px-4 overflow-visible z-0 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-8">
          
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left z-10 max-w-xl pt-4 md:pt-0">
            <h1 className="font-display font-semibold text-[2.75rem] leading-[1.1] md:text-[5.5rem] md:leading-[1.1] tracking-tight text-kinetik-black mb-6 md:mb-8">
              Strategy and growth for <span className="text-gray-900">modern teams</span>
            </h1>
            <p className="text-gray-600 text-base md:text-xl leading-relaxed mb-8 md:mb-10 max-w-md mx-auto md:mx-0">
              Kinetik partners with startups to streamline operations, elevate team performance, and build a foundation for lasting success.
            </p>
            
            {/* Buttons: Forced Flex Row, No Wrap */}
            <div className="flex flex-row flex-nowrap items-center gap-3 md:gap-4 justify-center md:justify-start w-full">
              <button className="bg-black text-white pl-5 pr-1.5 py-2 md:pl-6 md:pr-2 md:py-2 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 md:gap-4 group text-sm md:text-base shrink-0 shadow-lg hover:shadow-xl">
                Get started
                <div className="w-7 h-7 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <ArrowRight size={14} className="text-black md:w-4 md:h-4" />
                </div>
              </button>
              <button className="px-5 py-2.5 md:px-8 md:py-3 rounded-full border border-gray-300 font-medium hover:border-gray-900 hover:bg-gray-50 transition-all text-gray-800 text-sm md:text-base whitespace-nowrap shrink-0 bg-transparent">
                Contact us
              </button>
            </div>
          </div>

          {/* Right Visuals */}
          <div className="flex-1 w-full md:pl-10 relative z-0">
            <HeroVisuals />
          </div>
        </div>
      </div>
    </section>
  );
};