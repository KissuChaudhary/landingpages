'use client';

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MoatSection } from './components/MoatSection';
import { ConsistencySection } from './components/ConsistencySection';
import { LightingLabSection } from './components/LightingLabSection';
import { FullFrameSection } from './components/FullFrameSection';
import { SocialProof } from './components/SocialProof';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

export default function DatingPfpTemplate() {
  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-[#CCFF00] selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <MoatSection />
        <ConsistencySection />
        <LightingLabSection />
        <FullFrameSection />
        <SocialProof />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
