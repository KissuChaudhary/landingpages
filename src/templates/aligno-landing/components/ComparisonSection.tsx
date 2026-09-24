import React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '../lib/utils';

const features = [
  { 
    title: "Real-time global collaboration",
    negative: "Delayed syncing or integrations"
  },
  { 
    title: "Fully customizable & scalable",
    negative: "Limited customization"
  },
  { 
    title: "Advanced sprint management",
    negative: "Lacks dedicated sprint tools"
  },
  { 
    title: "Built-in advanced analytics",
    negative: "Requires external add-ons"
  },
  { 
    title: "Intuitive user experience",
    negative: "Complicated onboarding"
  },
];

const AlignoLogo = () => (
  <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-md flex items-center justify-center shadow-lg">
    <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-black rounded-full" />
  </div>
);

const ComparisonSection = () => {
  return (
    <section className="w-full bg-[#030303] py-20 px-4 md:py-32 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-sans text-white tracking-tight">
            Why Choose <span className="font-serif italic text-[#FFDAC2]">Elpino</span>?
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
            An immediate contrast of Elpino's functionalities against other project coordination utilities. Discover why we excel.
          </p>
        </div>

        {/* --- DESKTOP VIEW (Unified Card) --- */}
        <div className="hidden md:block">
          <div className="rounded-3xl border border-white/10 bg-[#0A0A0A] overflow-hidden relative group">
            
            {/* Shiny Blob Effect - Top Left */}
            <div className={cn(
                "absolute w-[350px] h-[350px] rounded-full pointer-events-none transition-all duration-700 ease-in-out opacity-25 group-hover:opacity-45 mix-blend-screen",
                "bg-gradient-to-br from-[#ff552e] via-[#ff8f70] to-[#ffdac2] blur-[80px]",
                "-top-[120px] -left-[120px]"
            )} />

            {/* Left Side Glow Effect */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-b from-[#FFDAC2]/10 via-[#FFDAC2]/5 to-transparent pointer-events-none" />
            
            {/* Header Row */}
            <div className="grid grid-cols-2 border-b border-white/5 relative z-10">
              {/* Elpino Header */}
              <div className="p-8 flex items-center gap-3">
                <AlignoLogo />
                <span className="text-xl font-medium text-[#FFDAC2]">Elpino</span>
              </div>
              
              {/* Other Tools Header */}
              <div className="p-8 flex items-center justify-start text-muted-foreground/60">
                <span className="text-xl font-medium">Other tools</span>
              </div>
            </div>

            {/* Feature Rows */}
            <div className="relative z-10">
              {features.map((feature, i) => (
                <div key={i} className={cn(
                  "grid grid-cols-2 hover:bg-white/[0.02] transition-colors",
                  i !== features.length - 1 ? "border-b border-white/5" : ""
                )}>
                  {/* Left Column (Elpino) */}
                  <div className="p-6 pl-8 flex items-center gap-3">
                    <Check className="w-5 h-5 text-white shrink-0" strokeWidth={3} />
                    <span className="text-white font-medium text-base">{feature.title}</span>
                  </div>

                  {/* Right Column (Others) */}
                  <div className="p-6 pl-8 flex items-center gap-3">
                    <X className="w-5 h-5 text-muted-foreground/50 shrink-0" />
                    <span className="text-muted-foreground text-base">{feature.negative}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- MOBILE VIEW (Split Cards) --- */}
        <div className="md:hidden space-y-8">
          
          {/* Card 1: Aligno (Blob Top Left) */}
          <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden relative group">
            
            {/* Shiny Blob Effect - Top Left */}
            <div className={cn(
                "absolute w-[350px] h-[350px] rounded-full pointer-events-none transition-all duration-700 ease-in-out opacity-25 group-hover:opacity-45 mix-blend-screen",
                "bg-gradient-to-br from-[#ff552e] via-[#ff8f70] to-[#ffdac2] blur-[80px]",
                "-top-[120px] -left-[120px]"
            )} />

            {/* Top Glow */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FFDAC2]/15 to-transparent pointer-events-none" />
            
            <div className="relative z-10 p-6 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                 <AlignoLogo />
                 <span className="text-lg font-medium text-[#FFDAC2]">Elpino</span>
              </div>

              <div className="space-y-5">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white mt-0.5 shrink-0" strokeWidth={3} />
                    <span className="text-white font-medium text-sm leading-tight">{feature.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider Text */}
          <div className="text-center">
            <span className="text-lg font-medium text-white">Other tools</span>
          </div>

          {/* Card 2: Others (Blob Bottom Right) */}
          <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden p-6 relative group">
            
            {/* Shiny Blob Effect - Bottom Right */}
            <div className={cn(
                "absolute w-[350px] h-[350px] rounded-full pointer-events-none transition-all duration-700 ease-in-out opacity-25 group-hover:opacity-45 mix-blend-screen",
                "bg-gradient-to-br from-[#ff552e] via-[#ff8f70] to-[#ffdac2] blur-[80px]",
                "-bottom-[120px] -right-[120px]"
            )} />

            <div className="space-y-5 relative z-10">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 opacity-60">
                  <X className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                  <span className="text-white font-medium text-sm leading-tight">{feature.negative}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ComparisonSection;