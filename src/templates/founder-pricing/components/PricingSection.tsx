import React from 'react';
import PricingCard, { PricingData } from './PricingCard';
import MetalPlate from './MetalPlate';

const featuresList = [
  { text: "500 AI Drafts per month" },
  { text: "Standard Tone Library" },
  { text: "Gmail Integration" },
  { text: "Chrome Extension" },
  { text: "3-Day Context History" },
];

const cardData: PricingData = {
  title: "Freelance",
  price: "$19",
  description: "For individuals who need a second pair of eyes.",
  features: featuresList,
};

const PricingSection: React.FC = () => {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      {/* Header Section */}
      <div className="text-center relative mb-20 w-full max-w-4xl mx-auto">
        
        {/* Top small pill badge */}
        <div className="inline-flex items-center gap-2 bg-[#f0f0ed] border border-[#e5e5e2] px-3 py-1.5 rounded-full mb-8 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]"></span>
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#7a8580] uppercase">Pricing</span>
        </div>

        {/* Decorative Plates */}
        <div className="relative inline-block">
          <MetalPlate 
            type="silver"
            line1="PRIORITY_PASS"
            line2="LEVEL: FOUNDER"
            rotation={-6}
            className="hidden lg:flex lg:-left-[180px] lg:top-8"
          />
          
          <h2 className="font-serif text-5xl md:text-6xl lg:text-[4rem] leading-[1.1] font-medium text-forest-black mb-6 tracking-tight relative z-0">
            Write like a founder,<br/>
            pay like one
          </h2>

          <MetalPlate 
            type="gold"
            line1="APPROVED_BUDGET"
            line2="AUTH: 0X8921-A"
            rotation={4}
            className="hidden lg:flex lg:-right-[190px] lg:top-14"
          />
        </div>

        <p className="font-mono text-[#788882] text-sm md:text-base tracking-tight mt-2">
          No hidden fees. 14-day free trial
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl items-center">
        {/* Left Card */}
        <div className="w-full">
          <PricingCard data={cardData} />
        </div>

        {/* Middle Card (Popular) */}
        <div className="w-full transform md:-translate-y-4">
          <PricingCard data={cardData} isPopular={true} />
        </div>

        {/* Right Card */}
        <div className="w-full">
          <PricingCard data={cardData} />
        </div>
      </div>
      
    </div>
  );
};

export default PricingSection;