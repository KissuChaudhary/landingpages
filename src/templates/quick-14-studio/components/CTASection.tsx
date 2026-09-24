import React from 'react';
import Button from './Button';

const CTASection: React.FC = () => {
  return (
    <section className="w-full py-24 md:py-40 flex flex-col items-center justify-center relative px-6 mb-32 md:mb-48">
      
      <h2 className="font-sans text-2xl md:text-3xl text-stone-800 mb-6 text-center font-normal">
        My Competitors Are Already Ranking
      </h2>

      <div className="relative group">
         
         {/* The Main Button */}
         <div className="relative z-10">
            <Button 
                variant="purple" 
                className="text-3xl md:text-5xl px-20 py-6 md:px-40 md:py-10 rounded-xl"
                
            >
                <div className="flex items-center gap-4 md:gap-6">
                    {/* Custom Keycap for "Press B" */}
                    <span className="text-violet-900 font-medium tracking-tight">Help</span>
                    <div className="flex flex-col items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-violet-600 rounded-lg border-b-4 border-violet-800 shadow-inner text-white leading-none transform translate-y-0.5">
                        <span className="text-xl font-bold">Me</span>
                    </div>
                    
                    <span className="text-violet-900 font-medium tracking-tight">Grow my Brand</span>
                </div>
            </Button>
         </div>

         {/* 
            Handwritten Annotations 
            - Using Absolute Positioning relative to the button container
            - Hidden on mobile to preserve layout integrity
         */}
         <div className="hidden md:block absolute inset-0 pointer-events-none">
            
            {/* 1. Top Left: Land more clients */}
            <div className="absolute -top-8 -left-[200px] w-48 flex flex-col items-end">
                <span className="font-hand text-2xl text-stone-500 mb-1 -rotate-6">Land more clients</span>
                <svg width="60" height="40" viewBox="0 0 60 40" fill="none" className="text-stone-700 mr-8">
                     <path d="M5,5 Q30,40 55,25" stroke="currentColor" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" />
                </svg>
            </div>

            {/* 2. Top Right: Outsource your work */}
            <div className="absolute -top-8 -right-[200px] w-48 flex flex-col items-start">
                 <span className="font-hand text-2xl text-stone-500 mb-1 rotate-6 ml-4">Outsource your work</span>
                 <svg width="60" height="40" viewBox="0 0 60 40" fill="none" className="text-stone-700 ml-8 transform scale-x-[-1]">
                     <path d="M5,5 Q30,40 55,25" stroke="currentColor" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" />
                 </svg>
            </div>

            {/* 3. Bottom Left: Affordable design... */}
            <div className="absolute top-[130%] -left-[140px] w-56 flex flex-col items-center">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" className="text-stone-700 mb-2 transform -rotate-12">
                     <path d="M10,40 Q25,10 40,5" stroke="currentColor" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" />
                </svg>
                <span className="font-hand text-2xl text-stone-500 leading-tight text-center">
                    Affordable design <br/> solution for startups
                </span>
            </div>

            {/* 4. Bottom Center: Make money on autopilot */}
            <div className="absolute top-[150%] left-1/2 -translate-x-1/2 w-56 flex flex-col items-center">
                 <svg width="20" height="60" viewBox="0 0 20 60" fill="none" className="text-stone-700 mb-2">
                     <path d="M10,60 L10,5" stroke="currentColor" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" />
                </svg>
                <span className="font-hand text-2xl text-stone-500">Make money on autopilot</span>
            </div>

            {/* 5. Bottom Right: Increase conversion */}
            <div className="absolute top-[130%] -right-[140px] w-56 flex flex-col items-center">
                 <svg width="50" height="50" viewBox="0 0 50 50" fill="none" className="text-stone-700 mb-2 transform rotate-12 scale-x-[-1]">
                     <path d="M10,40 Q25,10 40,5" stroke="currentColor" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" />
                </svg>
                <span className="font-hand text-2xl text-stone-500 leading-tight text-center">
                    Increase your <br/> conversion rates
                </span>
            </div>

         </div>

         {/* SVG Marker Definition */}
         <svg className="absolute w-0 h-0">
            <defs>
                <marker id="arrowhead" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                    <path d="M2,2 L10,6 L2,10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </marker>
            </defs>
         </svg>

      </div>
      
    
    </section>
  );
};

export default CTASection;