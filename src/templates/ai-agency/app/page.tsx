import React from 'react';
import { Navbar } from '@/templates/ai-agency/components/Navbar';
import { Hero } from '@/templates/ai-agency/components/Hero';
import { Partners } from '@/templates/ai-agency/components/Partners';
import { HowItWorks } from '@/templates/ai-agency/components/HowItWorks';
import { FeaturesChess } from '@/templates/ai-agency/components/FeaturesChess';
import { FeaturesGrid } from '@/templates/ai-agency/components/FeaturesGrid';
import { Stats } from '@/templates/ai-agency/components/Stats';
import { Testimonials } from '@/templates/ai-agency/components/Testimonials';
import { Footer } from '@/templates/ai-agency/components/Footer';

export default function Page() {
  return (
    <main className="bg-black min-h-screen w-full overflow-x-hidden flex flex-col">
      <Navbar />
      <Hero />
      <Partners />
      <HowItWorks />
      <FeaturesChess />
      <FeaturesGrid />
      <Stats />
      <Testimonials />
      <Footer />
    </main>
  );
}
