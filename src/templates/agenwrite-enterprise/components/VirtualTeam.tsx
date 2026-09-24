import React from 'react';
import { Crosshair } from './ui/Crosshair';
import { Search, Map, PenTool, CheckSquare } from 'lucide-react';

interface TeamCardProps {
  icon: React.ReactNode;
  role: string;
  description: string;
  isLast?: boolean;
}

const TeamCard: React.FC<TeamCardProps> = ({ icon, role, description, isLast }) => (
  // Using border-b and border-r (except for last item/row logic handled in parent grid)
  <div className="group bg-white p-8 lg:p-10 relative hover:bg-zinc-50 transition-colors border-b border-zinc-200 md:border-b-0 md:border-r last:border-r-0 border-r-0">
     
     {/* Hover Crosshairs */}
     <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
     <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
     
     <div className="w-10 h-10 bg-zinc-50 border border-zinc-200 flex items-center justify-center mb-6 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300">
        {icon}
     </div>
     
     <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3 border-b border-zinc-100 pb-3 inline-block">
        {role}
     </h3>
     <p className="font-serif text-lg text-zinc-900 leading-snug">
        {description}
     </p>
  </div>
);

export const VirtualTeam: React.FC = () => {
  return (
    <section className="bg-zinc-50/30 border-b border-zinc-200 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        
        {/* Header */}
        <div className="text-center mb-16">
             <div className="inline-block mb-6">
                <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest border border-zinc-200 px-3 py-1 bg-white">
                    04 // The Virtual Team
                </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-zinc-950 mb-6">
                Like hiring a 4-person <br/> content team.
            </h2>
             <p className="text-zinc-500 text-lg font-light max-w-2xl mx-auto">
                Replace the agency overhead with a single, intelligent infrastructure.
            </p>
        </div>

        {/* Grid Container with strict outer border */}
        <div className="border border-zinc-200 relative bg-white">
             {/* Crosshairs at grid corners */}
             <Crosshair className="-top-3 -left-3" />
             <Crosshair className="-top-3 -right-3" />
             <Crosshair className="-bottom-3 -left-3" />
             <Crosshair className="-bottom-3 -right-3" />
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
                 <div className="p-8 lg:p-10 hover:bg-zinc-50 transition-colors group">
                     <div className="w-10 h-10 bg-zinc-50 border border-zinc-200 flex items-center justify-center mb-6 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                        <Search size={20} />
                     </div>
                     <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">The Researcher</h3>
                     <p className="font-serif text-lg text-zinc-900 leading-snug">Live Research. We scrape the top 5 competitors in real-time.</p>
                 </div>
                 
                 <div className="p-8 lg:p-10 hover:bg-zinc-50 transition-colors group">
                     <div className="w-10 h-10 bg-zinc-50 border border-zinc-200 flex items-center justify-center mb-6 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                        <Map size={20} />
                     </div>
                     <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">The Strategist</h3>
                     <p className="font-serif text-lg text-zinc-900 leading-snug">Gap Analysis. We find exactly what your competitors missed.</p>
                 </div>

                 <div className="p-8 lg:p-10 hover:bg-zinc-50 transition-colors group">
                     <div className="w-10 h-10 bg-zinc-50 border border-zinc-200 flex items-center justify-center mb-6 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                        <PenTool size={20} />
                     </div>
                     <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">The Ghostwriter</h3>
                     <p className="font-serif text-lg text-zinc-900 leading-snug">Style Cloning. We analyze your work to nail your tone.</p>
                 </div>

                 <div className="p-8 lg:p-10 hover:bg-zinc-50 transition-colors group">
                     <div className="w-10 h-10 bg-zinc-50 border border-zinc-200 flex items-center justify-center mb-6 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                        <CheckSquare size={20} />
                     </div>
                     <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">The Editor</h3>
                     <p className="font-serif text-lg text-zinc-900 leading-snug">The Polish Pass. A final AI layer formats your HTML perfectly.</p>
                 </div>
             </div>
        </div>

      </div>
    </section>
  );
};