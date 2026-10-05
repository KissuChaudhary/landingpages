'use client';

import React from 'react';
import Navbar from './components/Navbar';
import { Hero } from './components/landing/Hero';
import { HowItWorks } from './components/landing/HowItWorks';
import Footer from './components/Footer';

export default function PassportStudioTemplate() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-[#e78468] selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
