'use client';

import React from 'react';
import { Header } from './components/header';
import HeroSection from './components/HeroSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import CallToAction from './components/CallToAction';
import { AIToolsSection } from './components/AIToolsSection';
import { FAQSection } from './components/FAQSection';
import WhoCanUse from './components/WhoCanUse';
import AITools from './components/AITools';
import { Footer } from './components/footer';

export default function AiImageToolsTemplate() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AIToolsSection />
        <WhyChooseUs />
        <WhoCanUse />
        <AITools />
        <FAQSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
