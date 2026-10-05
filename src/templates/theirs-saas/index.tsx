'use client';

import React from 'react';
import { TheirsNav } from "./components/nav";
import { TheirsHero } from "./components/hero";
import { TheirsSteps } from "./components/steps";
import { FeaturesBento } from "./components/features-bento";
import { TheirsPricing } from "./components/pricing";
import { TheirsFaq } from "./components/faq";
import { CtaBanner } from "./components/cta-banner";
import { TheirsFooter } from "./components/footer";

export default function TheirsSaasTemplate() {
  return (
    <div className="min-h-screen bg-white text-[#666666] selection:bg-[#111111]/10 selection:text-[#111111] relative font-sans">
      {/* Floating Frosted Pill Navbar */}
      <TheirsNav />

      {/* Hero Section with Interactive Link Box CTA */}
      <TheirsHero />

      {/* Three Steps Section */}
      <TheirsSteps />

      {/* Features Bento Grid */}
      <FeaturesBento />

      {/* Transparent Split Pricing */}
      <TheirsPricing />

      {/* FAQ with Fluid Morphing Separation */}
      <TheirsFaq />

      {/* Final Dark Charcoal CTA Banner */}
      <CtaBanner />

      {/* Footer */}
      <TheirsFooter />
    </div>
  );
}
