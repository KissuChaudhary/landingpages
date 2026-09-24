import React from 'react';
import { X, Check, Sparkles } from 'lucide-react';

const problems = [
  "Editing takes me forever.",
  "I miss uploads trying to finish videos.",
  "I hate editing. I just want to record.",
  "My videos don't look pro enough.",
  "Captions are a pain to add."
];

const solutions = [
  "Done-for-you edits, always on time.",
  "Fast turnaround",
  "You record. We handle the rest.",
  "Cinematic, clean, and branded.",
  "Burned-in, style-matched captions."
];

export default function Comparison() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-sm mb-6">
          <Sparkles size={14} className="text-brand-orange fill-brand-orange" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Our Solution</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Why Most Creators Burn Out
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          A quick side-by-side of the struggles you shouldn't have to deal with and how we make sure you don't.
        </p>
      </div>

      {/* Main Comparison Container with Dashed Border */}
      <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-3 md:p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Left Side: Creators Problem */}
          <div className="flex flex-col h-full">
            <div className="text-center py-6">
              <h3 className="text-xl font-bold text-slate-800">Creators Problem</h3>
            </div>
            
            <div className="bg-slate-50 rounded-3xl p-8 md:p-10 h-full border border-slate-100/50 flex flex-col justify-center">
              <ul className="space-y-6">
                {problems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                      <X size={14} className="text-red-500 stroke-[3px]" />
                    </div>
                    <span className="text-slate-600 font-medium text-lg leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side: Our Solution */}
          <div className="flex flex-col h-full">
            <div className="text-center py-6">
              <h3 className="text-xl font-bold text-brand-orange">Our Solution</h3>
            </div>
            
            <div className="bg-[#0F172A] rounded-3xl p-8 md:p-10 h-full shadow-xl shadow-slate-900/5 relative overflow-hidden flex flex-col justify-center">
              {/* Subtle grain/noise or gradient effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-[80px] pointer-events-none"></div>
              
              <ul className="space-y-6 relative z-10">
                {solutions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center mt-0.5 shadow-lg shadow-orange-500/30">
                      <Check size={14} className="text-white stroke-[3px]" />
                    </div>
                    <span className="text-white font-medium text-lg leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}