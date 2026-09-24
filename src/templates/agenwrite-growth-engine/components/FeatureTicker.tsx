import React from 'react';
import { 
  Layout, 
  ScanSearch, 
  UserCheck, 
  Fingerprint, 
  Search, 
  PenTool, 
  MessageSquare,
} from 'lucide-react';

const features = [
  { 
    icon: Layout, 
    title: "Answer based section structure",
    sub: "LOGICAL FLOW FOR READERS"
  },
  { 
    icon: ScanSearch, 
    title: "Real user intent analysis",
    sub: "STOP GUESSING KEYWORDS"
  },
  { 
    icon: UserCheck, 
    title: "No robotic intro templates",
    sub: "HUMAN-FIRST WRITING"
  },
  { 
    icon: Fingerprint, 
    title: "Extracts style & writing DNA",
    sub: "MATCHES YOUR TONE PERFECTLY"
  },
  { 
    icon: Search, 
    title: "Finds missing topics",
    sub: "COVER WHAT COMPETITORS FORGOT"
  },
  { 
    icon: PenTool, 
    title: "Writes every section fresh",
    sub: "ZERO PLAGIARISM, 100% UNIQUE"
  },
  { 
    icon: MessageSquare, 
    title: "Consistent brand voice",
    sub: "BUILD TRUST WITH UNIFORMITY"
  }
];

export const FeatureTicker: React.FC = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto h-[200px] overflow-hidden mb-6">
      
      {/* Gradient Masks for smooth fade in/out */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#f2f2f0] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#f2f2f0] to-transparent z-10 pointer-events-none"></div>

      {/* Scrolling Content */}
      <div className="animate-vertical-scroll hover:[animation-play-state:paused] py-2">
        {/* Double the list for seamless loop */}
        {[...features, ...features].map((feature, idx) => (
          <div key={idx} className="flex justify-center mb-3 w-full px-4">
            {/* Outer Gray Container */}
            <div className="w-full bg-stone-200/40 p-1.5 rounded-full border border-stone-200/40">
              {/* Inner White Container */}
              <div className="bg-white rounded-full px-5 py-3 flex items-center gap-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                
                {/* Icon Box */}
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-accent-600 shrink-0">
                  <feature.icon className="w-5 h-5 stroke-[2]" />
                </div>
                
                {/* Text Content */}
                <div className="flex flex-col text-left min-w-0 flex-1">
                  <h3 className="text-stone-900 font-normal text-[15px] leading-none whitespace-nowrap">
                    {feature.title}
                  </h3>
                  <p className="text-stone-500 text-[11px] font-normal tracking-wider uppercase mt-1.5 whitespace-nowrap">
                    {feature.sub}
                  </p>
                </div>
                
                {/* Decorative Dots (Grip Handle) */}
                <div className="ml-4 grid grid-cols-2 gap-[3px] opacity-30 shrink-0">
                  <div className="w-1 h-1 rounded-full bg-stone-900"></div>
                  <div className="w-1 h-1 rounded-full bg-stone-900"></div>
                  <div className="w-1 h-1 rounded-full bg-stone-900"></div>
                  <div className="w-1 h-1 rounded-full bg-stone-900"></div>
                  <div className="w-1 h-1 rounded-full bg-stone-900"></div>
                  <div className="w-1 h-1 rounded-full bg-stone-900"></div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes vertical-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-vertical-scroll {
          animation: vertical-scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
};