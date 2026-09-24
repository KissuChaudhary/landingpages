'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { Steps } from '@/components/Steps';
import TemplateCatalog from '@/components/TemplateCatalog';
import PricingPlans from '@/components/PricingPlans';
import FAQSection from '@/components/FAQSection';
import { CtaBanner } from '@/components/CtaBanner';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#666666] selection:bg-primary/10 selection:text-primary relative">
      {/* Floating Frosted Pill Navbar */}
      <Navbar />

      {/* Hero Section with Search Pill & Panorama */}
      <Hero />

      {/* Three Steps Section with Dither Auras */}
      <Steps />

      {/* 35 Templates Library Bento Catalog */}
      <TemplateCatalog />

      {/* Transparent Split Pricing */}
      <PricingPlans />

      {/* Dynamic Morphing Accordion FAQ */}
      <FAQSection />

      {/* Final Dark Charcoal CTA Banner */}
      <CtaBanner />

      {/* Clean Minimalist Footer */}
      <Footer />
    </main>
  );
}
