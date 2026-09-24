import React, { useState } from 'react';
import { ArrowRight, Check, Pencil } from 'lucide-react';
import { PRICING_PLANS, CUSTOMERS } from '../constants';

export const Pricing: React.FC = () => {
  const [activePlan, setActivePlan] = useState('starter');

  const selectedPlan = PRICING_PLANS.find(p => p.id === activePlan) || PRICING_PLANS[0];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 pb-24">
      {/* Dark Container */}
      <div className="bg-[#2e353f] rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden text-white shadow-2xl">
        
        {/* Background Mesh Gradient */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row gap-12">
          
          {/* Left Side: Title & Navigation */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-medium mb-12 text-white">
                Flexible pricing
              </h2>

              <div className="space-y-3 max-w-[280px]">
                {PRICING_PLANS.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setActivePlan(plan.id)}
                    className={`w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 group flex items-center justify-between ${
                      activePlan === plan.id 
                        ? 'bg-white/10 shadow-lg border border-white/10' 
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div>
                      <span className={`block font-semibold text-lg ${activePlan === plan.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                        {plan.name}
                      </span>
                      <span className="text-xs text-gray-500 group-hover:text-gray-400">{plan.description}</span>
                    </div>
                    {activePlan === plan.id && <ArrowRight size={16} className="text-white opacity-0 animate-in fade-in slide-in-from-left-2 duration-300 fill-mode-forwards opacity-100" />}
                  </button>
                ))}
              </div>
            </div>

             {/* Customers / Social Proof */}
            <div className="hidden md:flex items-center gap-4 mt-12">
               <div className="flex -space-x-3">
                  {CUSTOMERS.map(c => (
                     <div key={c.id} className={`w-10 h-10 rounded-full border-2 border-[#2e353f] flex items-center justify-center text-xs font-bold text-gray-800 overflow-hidden ${c.avatarColor}`}>
                        <img src={`https://picsum.photos/seed/${c.id + 50}/100/100`} alt={c.name} className="w-full h-full object-cover opacity-90 mix-blend-multiply" />
                     </div>
                  ))}
                   <div className="w-10 h-10 rounded-full border-2 border-[#2e353f] bg-white flex items-center justify-center text-xs font-bold text-gray-800">
                     +2k
                   </div>
               </div>
               <div>
                  <div className="flex items-center gap-1 text-sm font-bold text-white">4.9 / 5 Rated</div>
                  <div className="text-xs text-gray-400">Over 9.2k Customers</div>
               </div>
            </div>
          </div>

          {/* Right Side: Active Plan Card */}
          <div className="flex-1">
             <div className="bg-[#1f242b] rounded-[2rem] p-8 border border-white/5 shadow-2xl h-full flex flex-col relative overflow-hidden group">
                 {/* Inner gradient glow */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                 
                 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 border border-white/10">
                    <Pencil className="text-gray-200" size={20} />
                 </div>

                 <h3 className="text-2xl font-semibold mb-2">{selectedPlan.name}</h3>
                 <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-5xl font-display font-bold">{selectedPlan.price}</span>
                    <span className="text-gray-400">/ mo</span>
                 </div>
                 
                 <p className="text-gray-400 mb-8 leading-relaxed">
                   Ideal for early-stage teams who need actionable insights to move forward.
                 </p>

                 <button className="w-fit bg-[#fef08a] text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 mb-10 hover:bg-[#fde047] transition-colors">
                   Schedule a demo
                   <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                      <ArrowRight size={10} className="text-[#fef08a]" />
                   </div>
                 </button>

                 <div className="space-y-4 mt-auto">
                    {selectedPlan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                         <Check size={16} className="text-gray-500 shrink-0" />
                         {feature}
                      </div>
                    ))}
                 </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};