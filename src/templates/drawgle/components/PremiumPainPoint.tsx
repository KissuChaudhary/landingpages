import React from 'react';

export default function PremiumPainPoint() {
  return (
    <section className="w-full max-w-[1138px] mx-auto px-6 py-24 relative z-10">
      
      {/* Decorative subtle background grid element for that extra premium touch */}
      <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden [mask-image:linear-gradient(to_bottom,white,transparent)] flex justify-center">
        <div className="w-full max-w-[1138px] h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjA3LCAyMTcsIDIyMCwgMC41KSIvPjwvc3ZnPg==')] [background-size:20px_20px] opacity-40"></div>
      </div>

      <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-[32px] md:text-[44px] font-extrabold text-[#2C3132] leading-[1.1] tracking-[-0.02em] mb-5">
          Everything hinges on the <span className="text-[#56B6C6]">Outcome</span>.
        </h2>
        <p className="text-[#6A7174] text-lg md:text-[21px] font-medium leading-relaxed">
          The gap between the beautiful idea in your head and the generic output of existing AI tools is exactly what Drawgle closes.
        </p>
      </div>

      <div className="border border-[#CFD9DC] rounded-[32px] overflow-hidden bg-white flex flex-col md:flex-row">
         
         {/* Left Side: The Pain */}
         <div className="w-full md:w-1/2 p-8 md:p-14 border-b md:border-b-0 md:border-r border-[#CFD9DC] bg-[#FAFDFD]">
            <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-full border border-[#CFD9DC] bg-white text-[11px] font-bold text-[#6A7174] uppercase tracking-widest mb-8 shadow-sm">
               The Problem
            </div>
            
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#2C3132] leading-tight tracking-tight mb-4">
               Good ideas die in generic templates.
            </h3>
            
            <p className="text-[#6A7174] text-[15px] mb-10 font-medium leading-[1.6]">
               You can picture it perfectly. But existing tools spit out flat, boring wireframes that look like &quot;AI made this.&quot; The colors are bland, layouts are rigid. You wouldn&apos;t show it to an investor.
            </p>

            {/* Abstract visual of bad AI: A flat wireframe representation */}
            <div className="w-full rounded-2xl border border-[#CFD9DC] bg-[#f4f6f7] p-6 opacity-80 grayscale">
               <div className="flex gap-4 mb-5">
                  <div className="w-10 h-10 rounded-full border border-[#D5E0E2] bg-[#eef0f1]"></div>
                  <div className="flex-1 flex flex-col justify-center gap-2">
                     <div className="h-2.5 w-1/3 bg-[#eef0f1] border border-[#D5E0E2] rounded-sm"></div>
                     <div className="h-2 w-1/4 bg-[#eef0f1] border border-[#D5E0E2] rounded-sm"></div>
                  </div>
               </div>
               <div className="h-28 w-full bg-white rounded-xl border border-[#D5E0E2] mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-4 flex flex-col gap-3">
                 <div className="w-full h-8 border-2 border-dashed border-[#D5E0E2] rounded-md"></div>
                 <div className="w-full h-8 border-2 border-dashed border-[#D5E0E2] rounded-md"></div>
               </div>
               <div className="flex justify-center text-[10px] font-mono text-[#8C999E] uppercase tracking-wider">
                  Generic AI Output
               </div>
            </div>
         </div>

         {/* Right Side: The Outcome */}
         <div className="w-full md:w-1/2 p-8 md:p-14 bg-white relative overflow-hidden">
            <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-full border border-[#85CBD7] bg-[#F4FBFC] text-[11px] font-bold text-[#41ABBC] uppercase tracking-widest mb-8 shadow-[0_1px_2px_rgba(86,182,198,0.1)]">
               The Drawgle Standard
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold text-[#2C3132] leading-tight tracking-tight mb-4">
               Pitch-ready visuals, instantly.
            </h3>

            <p className="text-[#6A7174] text-[15px] mb-10 font-medium leading-[1.6]">
               Screens with a real visual identity. Intentional colors, considered typography, and modern aesthetics. The kind of screens people assume you hired a studio for.
            </p>

            {/* Abstract visual of Drawgle: A sleek, crisp, shadow-free composition */}
            <div className="relative w-full rounded-[20px] border border-[#C5D4D8] bg-[#F4FBFC] p-6 shadow-[0_1px_3px_rgba(86,182,198,0.1)] overflow-hidden z-10">
               {/* Minimalist chart/card representation */}
               <div className="flex justify-between items-end mb-6">
                 <div>
                    <div className="text-[10px] font-bold text-[#41ABBC] uppercase tracking-wider mb-1">Total Revenue</div>
                    <div className="text-[28px] font-extrabold text-[#2C3132] leading-none">$48,291</div>
                 </div>
                 <div className="w-9 h-9 rounded-full bg-[#56B6C6] flex items-center justify-center shadow-[0_1px_2px_rgba(86,182,198,0.3)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                 </div>
               </div>
               
               <div className="flex items-end gap-2.5 h-[80px] w-full pt-4">
                  <div className="flex-1 bg-[#D3E8EC] rounded-t-sm h-[30%]"></div>
                  <div className="flex-1 bg-[#85CBD7] rounded-t-sm h-[50%]"></div>
                  <div className="flex-1 bg-[#41ABBC] rounded-t-sm h-[75%]"></div>
                  <div className="flex-1 bg-[#56B6C6] rounded-t-sm h-[100%] shadow-[0_2px_4px_rgba(86,182,198,0.2)] relative">
                     <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white border border-[#C5D4D8] text-[10px] font-bold px-2 py-0.5 rounded shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-[#2C3132]">
                        +24%
                     </div>
                  </div>
                  <div className="flex-1 bg-[#C5D4D8] rounded-t-sm h-[60%]"></div>
                  <div className="flex-1 bg-[#D3E8EC] rounded-t-sm h-[40%]"></div>
               </div>

               {/* Crisp overlay card */}
               <div className="absolute -bottom-2 -right-2 bg-white border border-[#C5D4D8] rounded-[14px] p-3 shadow-[0_2px_8px_rgba(86,182,198,0.15)] flex items-center gap-3 pr-5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#56B6C6] animate-[pulse_2s_ease-in-out_infinite]"></div>
                  <div className="text-[11px] font-extrabold text-[#2C3132] uppercase tracking-wide">Live Gen</div>
               </div>
            </div>
            
            {/* Extremely subtle background element, minimal not blurry */}
            <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(circle_at_bottom_right,rgba(86,182,198,0.08)_0%,transparent_70%)] pointer-events-none z-0"></div>
         </div>

      </div>
    </section>
  );
}
