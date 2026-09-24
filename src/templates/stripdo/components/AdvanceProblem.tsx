import React, { useState, useEffect } from 'react';
import { AlertCircle, ArrowRight, Check, MousePointer2 } from 'lucide-react';

const InvoiceSimulator = () => {
  const [step, setStep] = useState(0);
  
  // Animation Cycle: 
  // 0: Start (Cursor bottom right, Toggle Off)
  // 1: Move Cursor to Toggle
  // 2: Click Down
  // 3: Toggle On (Fee appears)
  // 4: Hold
  
  useEffect(() => {
    const cycle = () => {
      setStep(0); // Reset
      setTimeout(() => setStep(1), 1000); // Move to toggle
      setTimeout(() => setStep(2), 2000); // Click down
      setTimeout(() => setStep(3), 2200); // Release & Activate
      setTimeout(() => setStep(0), 6000); // Reset loop
    };
    
    cycle();
    const interval = setInterval(cycle, 6500);
    return () => clearInterval(interval);
  }, []);

  const isToggleOn = step >= 3;
  const isClicking = step === 2;

  return (
    <div className="relative h-64 w-full bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-center p-6 overflow-hidden select-none group-hover:bg-slate-50 transition-colors">
       {/* Background Patterns */}
       <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

       {/* Invoice UI Panel */}
       <div className="w-full max-w-[280px] bg-white rounded-xl border border-slate-200 shadow-sm p-5 relative z-10 transition-all duration-300">
          
          {/* Header Row: Settings Toggle */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
             <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email PDF Invoice</span>
             
             {/* Toggle Switch */}
             <div 
               className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${isToggleOn ? 'bg-slate-900' : 'bg-slate-200'}`}
             >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out ${isToggleOn ? 'translate-x-4' : 'translate-x-0'}`}></div>
             </div>
          </div>

          {/* List Items */}
          <div className="space-y-3">
             <div className="flex justify-between text-sm text-slate-600">
                <span>Invoice Amount</span>
                <span className="font-semibold">$200.00</span>
             </div>
             
             <div className="flex justify-between text-sm text-slate-400">
                <span>Stripe Processing</span>
                <span>-$6.10</span>
             </div>

             {/* Hidden Fee Row - Expands when toggled */}
             <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isToggleOn ? 'max-h-12 opacity-100 pt-1' : 'max-h-0 opacity-0'}`}
             >
                <div className="flex justify-between items-center bg-red-50 text-red-600 px-3 py-2 rounded-lg text-xs font-bold border border-red-100 shadow-sm">
                   <div className="flex items-center gap-1.5">
                       <AlertCircle size={12} />
                       <span>Invoicing Fee</span>
                   </div>
                   <span>-$0.80</span>
                </div>
             </div>
             
              <div className="flex justify-between text-sm text-slate-900 pt-3 mt-1 border-t border-slate-50">
                <span className="font-medium">Net Total</span>
                <span className={`font-bold transition-colors duration-500 ${isToggleOn ? 'text-red-500' : 'text-slate-900'}`}>
                    {isToggleOn ? '$193.10' : '$193.90'}
                </span>
             </div>
          </div>
       </div>

       {/* Animated Cursor */}
       <div 
         className="absolute z-50 transition-all duration-1000 ease-in-out pointer-events-none drop-shadow-xl"
         style={{
            // Approximate position targeting the toggle switch
            top: step === 0 ? '90%' : '26%', 
            left: step === 0 ? '90%' : '73%',
            transform: `translate(-50%, -50%) scale(${isClicking ? 0.9 : 1})`
         }}
       >
          <MousePointer2 
            size={28} 
            className="fill-slate-900 text-slate-50 stroke-[2px]" 
          />
       </div>

    </div>
  )
}

const CostScaleSimulator = () => {
  const [step, setStep] = useState(0);

  // Auto-play cycle through the 4 states
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const data = [
    { count: '10', label: 'Starter', cost: 69, height: '20%' },
    { count: '50', label: 'Growing', cost: 345, height: '45%' },
    { count: '100', label: 'Scaling', cost: 690, height: '60%' },
    { count: '1k+', label: 'Volume', cost: 6900, height: '90%', alert: true },
  ];

  const activeItem = data[step];

  return (
    <div className="h-64 w-full bg-slate-50/50 rounded-2xl border border-slate-100 p-6 flex flex-col justify-between relative overflow-hidden group-hover:bg-slate-50 transition-colors">
       {/* Decorative Background Graph Line */}
       <svg className="absolute bottom-0 left-0 right-0 h-32 w-full opacity-10 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0 100 L 15 80 L 40 55 L 70 40 L 100 10 L 100 100 Z" fill="url(#grad)" />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
            </linearGradient>
          </defs>
       </svg>

       {/* Top Section: Dynamic Readout */}
       <div className="flex justify-between items-start z-10">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Fees per Year
            </div>
            <div className={`text-3xl md:text-4xl font-extrabold tracking-tight transition-all duration-300 ${activeItem.alert ? 'text-brand-orange scale-105 origin-left' : 'text-slate-900'}`}>
                ${activeItem.cost.toLocaleString()}
            </div>
          </div>
          
          <div className="text-right">
             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Volume
            </div>
            <div className="text-sm font-bold text-slate-700 bg-white px-3 py-1 rounded-lg border border-slate-100 shadow-sm min-w-[80px] text-center">
                {activeItem.count}/mo
            </div>
          </div>
       </div>

       {/* Bottom Section: The Bars */}
       <div className="flex items-end justify-between gap-3 h-32 z-10 px-2">
          {data.map((item, i) => {
             const isActive = i === step;
             return (
                 <div key={i} className="flex-1 flex flex-col justify-end h-full gap-2 relative">
                    {/* Bar */}
                    <div 
                        className={`w-full rounded-t-lg transition-all duration-500 relative overflow-hidden
                            ${isActive 
                                ? (item.alert ? 'bg-brand-orange shadow-lg shadow-orange-500/20' : 'bg-slate-800') 
                                : 'bg-slate-200'
                            }
                        `}
                        style={{ height: item.height }}
                    >
                         {/* Shine effect on active */}
                         {isActive && (
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
                         )}
                    </div>
                    
                    {/* Label */}
                    <span className={`text-[10px] font-bold text-center uppercase tracking-wide transition-colors ${isActive ? 'text-slate-800' : 'text-slate-300'}`}>
                        {item.label}
                    </span>
                 </div>
             )
          })}
       </div>
    </div>
  )
}

export default function AdvanceProblem() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full bg-white relative">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 px-4 py-1.5 rounded-full shadow-sm mb-6">
          <AlertCircle size={14} className="text-red-500 fill-red-500/10" />
          <span className="text-xs font-bold uppercase tracking-wider text-red-600">The Hidden Cost</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          You're paying more than you think.
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
           Stripe Invoicing adds <span className="font-bold text-slate-900">0.4%–0.5% per invoice</span>. It sounds small, until you do the math.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Card 1: The Hidden Fee - Interactive Simulation (Cursor) */}
        <div className="lg:col-span-5 bg-white rounded-[32px] border-2 border-dashed border-slate-200 p-8 flex flex-col justify-between hover:border-slate-300 transition-colors group overflow-hidden">
             <div className="mb-8">
                 <span className="inline-block px-3 py-1 rounded-lg bg-slate-50 text-slate-500 font-semibold text-sm mb-4">The Fee</span>
                 <h3 className="text-2xl font-bold text-slate-900 mb-3">Pay per PDF?</h3>
                 <p className="text-slate-500 leading-relaxed font-medium">
                    Stripe charges you $0.80 just to generate a PDF for a $200 invoice.
                 </p>
             </div>
             
             {/* Visual: Interactive Simulator */}
             <InvoiceSimulator />
        </div>

        {/* Card 2: Visualizing Scale - Cost Scale Simulator (Chart) */}
        <div className="lg:col-span-7 bg-white rounded-[32px] border-2 border-dashed border-slate-200 p-8 flex flex-col justify-between hover:border-slate-300 transition-colors group">
             <div className="mb-8">
                 <span className="inline-block px-3 py-1 rounded-lg bg-slate-50 text-slate-500 font-semibold text-sm mb-4">The Scale</span>
                 <h3 className="text-2xl font-bold text-slate-900 mb-3">It adds up fast.</h3>
                 <p className="text-slate-500 leading-relaxed font-medium">
                    100 customers = <span className="text-slate-900 font-bold">$960/year</span> in just PDF fees.
                 </p>
             </div>

             {/* Visual: Cost Scale Simulator with Slider */}
             <CostScaleSimulator />
        </div>

        {/* Card 3: The Better Way - Premium Dark Card */}
        <div className="lg:col-span-12 bg-[#0F172A] rounded-[32px] p-8 md:p-12 shadow-2xl overflow-hidden relative flex flex-col md:flex-row items-center gap-12 group">
            
            {/* Background Effects - Clean, Subtle */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Content */}
            <div className="flex-1 relative z-10 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/5 text-brand-orange text-xs font-bold uppercase tracking-wide mb-6">
                    <Check size={12} strokeWidth={3} />
                    Smart Choice
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                    Keep your <span className="text-brand-orange">$900</span>.
                </h3>
                <p className="text-slate-400 text-lg font-medium leading-relaxed mb-8 max-w-md">
                    Same volume. Same professional invoices. <br/> Just without the ridiculous fees.
                </p>
                 <button className="inline-flex items-center gap-2 text-white font-bold border-b border-brand-orange pb-0.5 hover:text-brand-orange transition-colors">
                    Calculate your savings <ArrowRight size={16} />
                </button>
            </div>

            {/* Comparison Graphic - Ultra Clean */}
            <div className="flex-1 w-full max-w-lg bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm relative transition-transform duration-500 group-hover:scale-[1.02]">
                {/* Floating Badge */}
                 <div className="absolute -top-3 -right-3 bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-slate-100 z-20">
                    96% Cheaper
                </div>

                <div className="space-y-8">
                    {/* Row 1: Stripe */}
                    <div className="group/row">
                        <div className="flex justify-between text-sm font-medium text-slate-400 mb-3">
                            <span>Stripe Invoicing</span>
                            <span className="text-white group-hover/row:text-red-400 transition-colors">$960/yr</span>
                        </div>
                        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-slate-600 w-[95%] rounded-full relative overflow-hidden group-hover/row:bg-red-500/80 transition-colors duration-500">
                                {/* Striped pattern */}
                                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Stripdo */}
                    <div className="group/row">
                        <div className="flex justify-between text-sm font-medium text-slate-400 mb-3">
                            <span className="text-white">Stripdo</span>
                            <span className="text-brand-orange font-bold">$39/yr</span>
                        </div>
                        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-orange w-[4%] rounded-full shadow-[0_0_15px_rgba(255,77,0,0.5)] relative">
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}