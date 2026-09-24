import React from 'react';
import { Navbar, Footer } from './components/Layout';
import { StackVisual } from './components/StackVisual';
import { ProblemSolution } from './components/ProblemSolution';
import { SniffTest } from './components/SniffTest';
import { NewSeoSection } from './components/NewSeoSection';
import { VirtualTeam } from './components/VirtualTeam';
import { ScaleSection } from './components/ScaleSection';
import { Bot, Cpu, Layers } from 'lucide-react';
import { ActionButton } from './components/ui/ActionButton';
import { Crosshair } from './components/ui/Crosshair';
import { ExtendedLine } from './components/ui/ExtendedLine';

const App: React.FC = () => {
  return (
    // OUTER FRAME: The "Pad" around the interface
    <div className="min-h-screen bg-[#FAFAFA] text-[#18181B] p-3 md:p-8 font-sans selection:bg-zinc-900 selection:text-white flex flex-col items-center overflow-x-hidden">
      
      {/* MAIN INTERFACE BOX: The central bordered machine */}
      <div className="relative w-full max-w-[1400px] bg-white border border-zinc-200 shadow-xl shadow-zinc-200/50 flex flex-col">
        
        {/* CORNER GRID LINES (The "Infinite Grid" look) */}
        <ExtendedLine position="tl" vertical horizontal />
        <ExtendedLine position="tr" vertical horizontal />
        <ExtendedLine position="bl" vertical horizontal />
        <ExtendedLine position="br" vertical horizontal />

        {/* ROW 1: NAVBAR */}
        <div className="relative z-20 bg-white">
            <Navbar />
            {/* Nav Divider Extensions */}
            <ExtendedLine position="bl" horizontal />
            <ExtendedLine position="br" horizontal />
        </div>

        {/* ROW 2: HERO SECTION */}
        <div className="relative border-b border-zinc-200 bg-white z-10">
            {/* Diagonal Stripes Background - High Contrast */}
            <div
                className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
                style={{
                backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 3px, #e4e4e7 3px, #e4e4e7 4px)",
                }}
            />

            <section className="relative px-6 md:px-12 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center z-10">
                {/* Left: Copy */}
                <div className="flex flex-col items-start text-left z-10">
                    <div className="inline-block mb-8">
                        <span className="font-mono text-xs font-bold text-zinc-900 tracking-widest uppercase bg-zinc-100/80 backdrop-blur-sm px-3 py-1 border border-zinc-300">
                        [ SYSTEM: AGENTIC_MODE_ON ]
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-950 mb-8 leading-[1.05]">
                        Don’t just rank on Google. <br />
                        <span className="text-zinc-400">Become the answer on AI.</span>
                    </h1>

                    <p className="text-zinc-600 text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-light bg-white/50 backdrop-blur-[2px]">
                        The first Agentic Writer designed for <span className="font-semibold text-zinc-900">Generative Engine Optimization (GEO)</span>. 
                        We research, draft, and refine articles that humans love and Perplexity, Claude, and Gemini cite as sources.
                    </p>

                    <div className="flex flex-row items-center gap-4">
                        <ActionButton variant="primary" showArrow>
                        <span className="font-mono">{`> Start Deployment_`}</span>
                        </ActionButton>
                        
                        <ActionButton variant="secondary">
                        View Sample Output
                        </ActionButton>
                    </div>
                </div>

                {/* Right: Authentic Stack Visual */}
                <div className="relative z-10 flex justify-center lg:justify-end pr-4">
                    <StackVisual />
                </div>
            </section>
            
            {/* Hero Divider Extensions */}
            <ExtendedLine position="bl" horizontal />
            <ExtendedLine position="br" horizontal />
        </div>

        {/* ROW 3: TICKER */}
        <div className="relative border-b border-zinc-200 py-12 px-6 md:px-12 bg-zinc-50/30 z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-7xl mx-auto">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-200 pb-1">Optimized for retrieval in:</span>
                <div className="flex flex-wrap justify-center gap-12 text-zinc-900">
                    <span className="font-bold text-lg flex items-center gap-2"><Bot size={20} className="text-zinc-600"/> Perplexity</span>
                    <span className="font-bold text-lg flex items-center gap-2"><Cpu size={20} className="text-zinc-600"/> ChatGPT</span>
                    <span className="font-bold text-lg flex items-center gap-2"><Layers size={20} className="text-zinc-600"/> Claude</span>
                    <span className="font-bold text-lg flex items-center gap-2 opacity-80">Gemini</span>
                </div>
            </div>
            {/* Ticker Divider Extensions */}
            <ExtendedLine position="bl" horizontal />
            <ExtendedLine position="br" horizontal />
        </div>

        {/* ROW 4: PROBLEM & SOLUTION */}
        <div className="relative z-10">
            <ProblemSolution />
            <ExtendedLine position="bl" horizontal />
            <ExtendedLine position="br" horizontal />
        </div>

        {/* ROW 5: THE SNIFF TEST */}
        <div className="relative z-10">
            <SniffTest />
            <ExtendedLine position="bl" horizontal />
            <ExtendedLine position="br" horizontal />
        </div>

        {/* ROW 6: THE NEW SEO (AI Overviews) */}
        <div className="relative z-10">
            <NewSeoSection />
            <ExtendedLine position="bl" horizontal />
            <ExtendedLine position="br" horizontal />
        </div>

        {/* ROW 7: VIRTUAL TEAM */}
        <div className="relative z-10">
            <VirtualTeam />
            <ExtendedLine position="bl" horizontal />
            <ExtendedLine position="br" horizontal />
        </div>

        {/* ROW 8: SCALE (ROI) */}
        <div className="relative z-10">
            <ScaleSection />
             {/* Note: ScaleSection is the last content block before footer */}
            <ExtendedLine position="bl" horizontal />
            <ExtendedLine position="br" horizontal />
        </div>

        {/* ROW 9: FOOTER */}
        <div className="relative z-10">
             <Footer />
             {/* Footer Top Divider Extensions are redundant if ScaleSection provides bottom lines, 
                 but Footer top might visually need the cross intersection if borders align perfectly. 
                 Using just top extensions on Footer for completeness. 
             */}
            <ExtendedLine position="tl" horizontal />
            <ExtendedLine position="tr" horizontal />
        </div>

      </div>
    </div>
  );
};

export default App;