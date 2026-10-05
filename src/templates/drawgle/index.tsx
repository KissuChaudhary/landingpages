"use client";

import React from "react";
import { MarketingShell } from "./components/marketing/MarketingShell";
import { Hero } from "./components/marketing/home/Hero";
import { Challenge } from "./components/marketing/home/Challenge";
import { HowItWorks } from "./components/marketing/home/HowItWorks";
import { Showcase } from "./components/marketing/home/Showcase";
import { Features } from "./components/marketing/home/Features";
import { Reviews } from "./components/marketing/home/Reviews";
import { Pricing } from "./components/marketing/home/Pricing";
import { Faq } from "./components/marketing/home/Faq";
import { CtaBanner } from "./components/marketing/home/CtaBanner";
import { homeFaqs } from "./lib/marketing/home-content";

export default function DrawgleTemplate() {
  return (
    <div className="w-full min-h-screen bg-white text-[#141414]">
      <MarketingShell>
        <main>
          <Hero />
          <Challenge />
          <HowItWorks />
          <Showcase />
          <Features />
          <Reviews />
          <Pricing />
          <Faq items={homeFaqs} />
          <CtaBanner />
        </main>
      </MarketingShell>
    </div>
  );
}
