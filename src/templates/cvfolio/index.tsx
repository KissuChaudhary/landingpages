'use client';

import React from 'react';
import PublicHeader from './components/PublicHeader';
import { HeroSection } from './components/landing/HeroSection';
import { SolutionSection } from './components/landing/SolutionSection';
import { HowItWorks } from './components/landing/HowItWorks';
import { FeaturesSection } from './components/landing/FeaturesSection';
import PricingSection from './components/landing/PricingSection';
import FAQSection from './components/landing/FAQSection';
import { CTASection } from './components/landing/CTASection';
import { Footer } from './components/Footer';

export default function CvfolioTemplate() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-blue-600 selection:text-white">
      <PublicHeader />
      <main>
        <HeroSection />
        <SolutionSection />
        <HowItWorks />
        <FeaturesSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
