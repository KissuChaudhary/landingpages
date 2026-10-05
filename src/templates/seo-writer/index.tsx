'use client';

import React from 'react';
import { Navbar } from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import HowItWorksSection from './components/HowItWorksSection';
import FeaturesSection from './components/FeaturesSection';
import PricingSection from './components/PricingSection';
import { FAQSection } from './components/FAQSection';
import CTASection from './components/CTASection';
import { Footer } from './components/Footer';
import { GridBackground } from "./components/GridBackground";
import FounderNote from './components/FounderNote';
import { AICitations } from './components/AICitations';

export default function SeoWriterTemplate() {
  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden font-sans bg-[#0c0e12] text-white">
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <GridBackground />
      </div>
      
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center w-full relative z-10">
        {/* Hero Section */}
        <Hero />
        
        {/* Outcome evidence */}
        <AICitations />
        
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
        <FounderNote />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}
