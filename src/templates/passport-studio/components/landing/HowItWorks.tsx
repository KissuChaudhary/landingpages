"use client";

import { Upload, ScanFace, Download, Check, MousePointer2 } from "lucide-react";
import { GlobalCard } from "../GlobalCard";

const steps = [
  {
    id: 1,
    title: "Upload or Snap",
    description: "Take a photo with your phone or upload one. We'll guide you to the perfect shot.",
    icon: Upload,
    visual: (
      <div className="relative w-full h-48 bg-stone-50/50 overflow-hidden flex items-center justify-center group">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e78468_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.05]" />
        
        {/* Upload Interface Dropzone - Clean & Responsive */}
        <div className="relative w-[85%] max-w-[280px] h-32 bg-white rounded-2xl border-2 border-dashed border-stone-200 shadow-sm flex flex-col items-center justify-center gap-3 z-10 transition-all duration-500 group-hover:border-[#e78468]/30 group-hover:bg-[#e78468]/5">
            <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Upload className="w-6 h-6 text-stone-400 group-hover:text-[#e78468] transition-colors duration-500" />
            </div>
            <div className="text-center space-y-1">
                <div className="text-xs font-bold text-stone-700 uppercase tracking-wide">Drop Photo Here</div>
                <div className="text-[10px] text-stone-400 font-medium">Supports JPG, PNG, HEIC</div>
            </div>
        </div>

        {/* Animated Cursor Dragging File */}
        <div className="absolute top-1/2 left-1/2 z-20 animate-cursor-drop pointer-events-none">
           <div className="relative -translate-x-1/2 -translate-y-1/2">
             <MousePointer2 className="w-6 h-6 text-stone-900 fill-stone-900 absolute -right-3 -bottom-5 z-20 drop-shadow-md" />
 
             {/* Draggable File Card - Premium Look */}
             <div className="w-16 h-20 bg-white rounded-lg shadow-[0_8px_24px_-6px_rgba(0,0,0,0.15)] border border-stone-100 p-1.5 flex flex-col gap-1.5 transform -rotate-6 origin-bottom-right">
                <div className="w-full h-3/4 bg-stone-100 rounded-[4px] overflow-hidden relative">
                   <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-80" alt="file" />
                </div>
                <div className="w-2/3 h-1 bg-stone-200 rounded-full"></div>
             </div>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "AI Processing",
    description: "Our biometric engine automatically removes backgrounds and fixes lighting instantly.",
    icon: ScanFace,
    visual: (
      <div className="relative w-full h-48 bg-stone-50/50 overflow-hidden flex items-center justify-center group">
         <div className="absolute inset-0 bg-[radial-gradient(#e78468_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.05]" />

        {/* Passport Photo Frame */}
        <div className="relative w-32 h-40 bg-white rounded-lg shadow-lg border border-stone-200 overflow-hidden group-hover:shadow-xl transition-shadow duration-500">
            {/* Base Image */}
            <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" 
                className="w-full h-full object-cover opacity-90 grayscale-[20%]"
                alt="Face Scan"
            />
            
            {/* Minimal Face Guide Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-24 border border-white/40 rounded-[50%] opacity-60"></div>
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/20"></div>
                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/20"></div>
            </div>

            {/* Premium Scan Line */}
            <div className="absolute left-0 right-0 h-[2px] bg-white/80 shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10 animate-scan-line"></div>
            <div className="absolute left-0 right-0 h-20 bg-gradient-to-b from-white/10 to-transparent -translate-y-full animate-scan-line" style={{ animationDelay: '0.05s' }}></div>
            
            {/* Subtle Corner Markers (instead of neon dots) */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/60"></div>
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/60"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/60"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/60"></div>
        </div>

        {/* Minimal Floating Badge */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm border border-stone-100 flex items-center gap-1.5 z-20">
            <div className="w-1.5 h-1.5 rounded-full bg-[#e78468] animate-pulse" />
            <span className="text-[10px] font-medium text-stone-600 tracking-wide">AI Fixing</span>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Download & Print",
    description: "Get a compliant 4x6 sheet ready for printing at any local pharmacy or home printer.",
    icon: Download,
    visual: (
      <div className="relative w-full h-48 bg-stone-50 overflow-hidden flex items-center justify-center group">
         <div className="absolute inset-0 bg-[radial-gradient(#e78468_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.05]" />

        {/* 4x6 Sheet Mockup */}
        <div className="relative w-40 h-28 bg-white border border-stone-200 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1)] p-1.5 rotate-3 group-hover:rotate-0 transition-all duration-500">
            <div className="grid grid-cols-3 gap-1 h-full">
                {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="bg-stone-100 relative overflow-hidden">
                        <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" 
                            className="w-full h-full object-cover"
                            alt="Passport"
                        />
                    </div>
                ))}
            </div>
            
            {/* Download Action */}
            <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-[#e78468] rounded-full flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition-transform">
                <Download className="w-5 h-5" />
            </div>
        </div>
      </div>
    )
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-stone-900 mb-4 tracking-tight">
                    Professional Photos in <span className="text-[#e78468]">3 Simple Steps</span>
                </h2>
                <p className="text-stone-500 max-w-lg leading-relaxed">
                    Complex government requirements handled automatically. From selfie to compliant passport photo in seconds.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <GlobalCard 
                key={step.id} 
                className="h-full rounded-xl duration-500 border-stone-100 shadow-xs"
                contentClassName="flex flex-col h-full"
            >
              {/* Visual Area - Fixed Height */}
              <div className="h-48 border-b border-stone-100 relative">
                {step.visual}
              </div>

              {/* Text Content */}
              <div className="p-6 flex flex-col flex-grow bg-white">
                <div className="w-10 h-10 rounded-lg bg-[#e78468]/10 flex items-center justify-center text-[#e78468] mb-4">
                    <step.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </GlobalCard>
          ))}
        </div>
      </div>
    </section>
  );
}
