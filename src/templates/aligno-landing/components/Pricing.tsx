import React, { useState } from 'react';
import { cn } from '../lib/utils';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="w-full bg-[#030303] py-20 px-4 md:py-32 relative overflow-hidden">
        
        {/* Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
            {/* Header */}
            <div className="text-center mb-16 md:mb-20 space-y-4">
                <h2 className="text-3xl md:text-5xl font-sans text-white tracking-tight">
                    Choose the <span className="font-serif italic text-[#FFDAC2] font-light">Right Plan</span> for Your<br /> Team
                </h2>
                <p className="text-muted-foreground text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
                    Expand your schema as per your requirements
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
                
                {/* --- FREE PLAN (Card 1: Top-Left Blob) --- */}
                <div className="relative group rounded-[2rem] border border-white/10 bg-[#0A0A0A] p-8 md:p-10 flex flex-col transition-all duration-300 hover:border-white/20 overflow-hidden">
                     {/* Shiny Blob Effect - Top Left */}
                     <div className={cn(
                        "absolute w-[350px] h-[350px] rounded-full pointer-events-none transition-all duration-700 ease-in-out opacity-25 group-hover:opacity-45 mix-blend-screen",
                        "bg-gradient-to-br from-[#ff552e] via-[#ff8f70] to-[#ffdac2] blur-[80px]",
                        "-top-[120px] -left-[120px]"
                     )} />

                     {/* Background gradient overlay */}
                     <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent rounded-[2rem] pointer-events-none" />
                     
                     <div className="relative z-10 flex flex-col h-full">
                        <div className="mb-10">
                            <h3 className="text-white font-medium text-lg mb-4">Free Plan</h3>
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-5xl md:text-6xl font-normal text-[#FFDAC2] tracking-tight">$0</span>
                                <span className="text-muted-foreground text-lg">/month</span>
                            </div>
                            <p className="text-muted-foreground text-sm font-light mt-2">
                                Perfect for individuals just starting out.
                            </p>
                        </div>

                        {/* Button */}
                        <button className="w-full py-4 rounded-full border border-white/10 bg-[#1A1A1A] text-white font-medium hover:bg-white/10 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden group/btn mb-4">
                             <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                             <span className="relative z-10">Get Started</span>
                        </button>
                        <p className="text-center text-xs text-muted-foreground/40 font-light mb-12">Free forever</p>

                        {/* Features List */}
                        <ul className="space-y-5 mt-auto">
                            {[
                                "Access to essential project management tools",
                                "Up to 5 active projects",
                                "Basic task tracking features",
                                "Real-time collaboration",
                                "Community support"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                                    <span className="text-muted-foreground text-sm font-light leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                     </div>
                </div>

                {/* --- PRO PLAN (Card 2: Bottom-Right Blob) --- */}
                <div className="relative group rounded-[2rem] border border-white/10 bg-[#0A0A0A] p-8 md:p-10 flex flex-col transition-all duration-300 hover:border-[#FFDAC2]/30 shadow-[0_0_40px_rgba(0,0,0,0.3)] hover:shadow-[0_0_60px_rgba(255,218,194,0.08)] overflow-hidden">
                     {/* Shiny Blob Effect - Bottom Right */}
                     <div className={cn(
                        "absolute w-[350px] h-[350px] rounded-full pointer-events-none transition-all duration-700 ease-in-out opacity-25 group-hover:opacity-45 mix-blend-screen",
                        "bg-gradient-to-br from-[#ff552e] via-[#ff8f70] to-[#ffdac2] blur-[80px]",
                        "-bottom-[120px] -right-[120px]"
                     )} />

                     {/* Warm ambient glow from bottom right */}
                     <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-[#FFDAC2]/5 to-transparent rounded-[2rem] pointer-events-none" />
                     
                     <div className="relative z-10 flex flex-col h-full">
                        <div className="mb-10">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-white font-medium text-lg">Pro Plan</h3>
                                
                                {/* Toggle Switch */}
                                <div 
                                    className="flex items-center gap-3 cursor-pointer select-none" 
                                    onClick={() => setIsYearly(!isYearly)}
                                >
                                    <span className="text-xs text-muted-foreground/80">Bill yearly</span>
                                    <div className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${isYearly ? 'bg-[#FFDAC2]' : 'bg-white/20'}`}>
                                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${isYearly ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-5xl md:text-6xl font-normal text-[#FFDAC2] tracking-tight">$12</span>
                                <span className="text-muted-foreground text-lg">/month</span>
                            </div>
                            <p className="text-muted-foreground text-sm font-light mt-2">
                                Perfect for individuals and small teams.
                            </p>
                        </div>

                        {/* Button */}
                        <button className="w-full py-4 rounded-full bg-gradient-to-b from-[#FFDAC2] to-[#E6A88A] text-white font-semibold shadow-[0_4px_20px_rgba(255,218,194,0.3),inset_0_1px_0_rgba(255,255,255,0.4)] hover:shadow-[0_6px_25px_rgba(255,218,194,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] hover:translate-y-[-1px] transition-all duration-300 mb-4">
                             Get Started
                        </button>
                        <p className="text-center text-xs text-muted-foreground/40 font-light mb-12">Free forever</p>

                        {/* Features List */}
                        <ul className="space-y-5 mt-auto">
                            {[
                                "Everything in the Free Plan, plus:",
                                "Unlimited projects and tasks",
                                "Advanced analytics and reporting",
                                "Sprint management tools",
                                "Priority customer support",
                                "Customizable workflows and templates"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                                    <span className="text-white/80 text-sm font-light leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                     </div>
                </div>

            </div>
        </div>
    </section>
  );
};

export default Pricing;