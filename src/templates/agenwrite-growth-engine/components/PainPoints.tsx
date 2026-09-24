import React from 'react';

const challenges = [
  {
    title: "AI SEARCH IGNORES YOU",
    description: "You publish dozens of articles. AI search still doesn’t recognize your brand. When people ask real questions in your category, AI recommends competitors - not YOU."
  },
  {
    title: "YOU SOUND LIKE A BOT",
    description: "Modern AI Search engines & LLMs spot generic AI content in 3 seconds. It has no brand voice, no unique data, and no soul. It doesn't build authority; it just adds to the noise."
  },
  {
    title: "IMPRESSIONS, ZERO CLICKS",
    description: "You rank for keywords that don’t move the business. Without real visibility data guiding the roadmap, you’re guessing while competitors own the answers."
  }
];

export const PainPoints: React.FC = () => {
  return (
    <section className="w-full relative z-10 py-12 sm:py-24">
      {/* Constrained width to ~1440px (wider than 7xl/1280px, narrower than 1600px) */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight mb-6">
            One-click AI content is quietly killing your growth
          </h2>
          <p className="text-lg text-stone-600">
You’re publishing more than ever, yet traffic stays flat. Modern search engines can tell the difference between real answers and mass-produced content.          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8">
          {challenges.map((challenge, idx) => (
            // Card Wrapper
            <div key={idx} className="relative group">
               
               {/* Pin Icon - Positioned absolute top-right */}
               <img 
                 src="https://cdn.prod.website-files.com/687bec60028a11d6d37ac0bb/687c1784ac59bbac1b067c06_pink%20pin.svg" 
                 alt="Pin"
                 className="absolute -top-6 -right-5 w-14 h-14 z-30 pointer-events-none transition-transform duration-300 group-hover:rotate-12"
               />
               
               {/* Outer Pink Container */}
               {/* Matches: box bg-pink border-pink */}
               <div className="h-full bg-[#fff1f2] border border-[#ffcdd3] rounded-[2.5rem] pt-8 pb-2 px-2 flex flex-col shadow-sm transition-shadow duration-300">
                  
                  {/* Title Area (On Pink Background) */}
                  {/* Matches: padding-medium -> text-lg */}
                  <div className="px-5 pb-6">
                    <h3 className="font-semibold text-stone-900 text-xl leading-tight">
                      {challenge.title}
                    </h3>
                  </div>

                  {/* Inner White Box */}
                  {/* Matches: box-small border-pink -> bg-white -> padding-medium */}
                  <div className="bg-white rounded-[2rem] p-6 border border-[#ffcdd3] flex-grow flex flex-col justify-center">
                    <p className="text-stone-500 text-[15px] leading-relaxed font-normal">
                      {challenge.description}
                    </p>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};