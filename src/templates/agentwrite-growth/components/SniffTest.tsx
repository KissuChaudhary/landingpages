import React from 'react';
import { ArrowRight } from 'lucide-react';

const SniffTest: React.FC = () => {
  return (
    <section className="w-full bg-[#FAFAFA] border-b-2 border-black py-24 px-4 md:px-8 flex flex-col items-center">
      
      <div className="max-w-[1200px] w-full">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b-2 border-black pb-8">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              The Sniff Test
            </div>
            <h2 className="font-serif-display text-4xl md:text-6xl text-black leading-none">
              Your readers can smell <br/> "Generic AI."
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="font-sans-tech text-sm font-medium text-gray-500 max-w-xs ml-auto">
              Compare the raw output of GPT-4 against the structured, strategic output of AgentWrite.
            </p>
          </div>
        </div>

        {/* The Editorial Comparison (Clean, no gimmicks) */}
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px] border-2 border-black bg-white hard-shadow">
          
          {/* LEFT: The Old Way (Ghosted) */}
          <div className="p-10 md:p-16 border-b-2 md:border-b-0 md:border-r-2 border-black flex flex-col justify-center bg-gray-50/50 select-none">
            <div className="mb-8 flex items-center gap-3 opacity-40">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-500">GPT-4 / Claude Raw</div>
            </div>

            <p className="font-serif-display text-2xl md:text-3xl leading-relaxed text-gray-300 blur-[0.5px] transition-all hover:blur-none hover:text-gray-400 duration-500">
              "In the rapidly evolving landscape of digital marketing, it is paramount to delve into the transformative potential of synergy. By leveraging cutting-edge paradigms..."
            </p>
            
            <div className="mt-8 opacity-40">
               <span className="text-xs font-mono border border-gray-300 px-2 py-1 text-gray-400">FLUFF DETECTED</span>
            </div>
          </div>

          {/* RIGHT: The New Way (Sharp) */}
          <div className="p-10 md:p-16 flex flex-col justify-center bg-white relative">
            <div className="mb-8 flex items-center gap-3">
              <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
              <div className="text-xs font-bold uppercase tracking-widest text-black">AgentWrite Engine</div>
            </div>

            <p className="font-serif-display text-2xl md:text-3xl leading-relaxed text-black">
              "<span className="bg-[#10B981]/10 px-1">Google’s March update</span> changed the game. If you aren't optimizing for 'Answers', you're losing traffic. Here is the data..."
            </p>

            <div className="mt-12 flex items-center gap-4">
               <div className="flex items-center gap-2">
                 <span className="block w-2 h-2 bg-black"></span>
                 <span className="text-xs font-mono font-bold">100% Information Gain</span>
               </div>
               <div className="h-px w-8 bg-black/20"></div>
               <div className="text-xs font-mono font-bold text-gray-400">Citation Ready</div>
            </div>
            
            {/* Subtle "Arrow" hint */}
            <div className="absolute bottom-6 right-6 opacity-0 md:opacity-100">
               <ArrowRight className="text-black opacity-20" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SniffTest;