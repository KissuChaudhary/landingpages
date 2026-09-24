import { TopNav } from '@/templates/clearnotes-hero/components/TopNav';
import { Hero } from '@/templates/clearnotes-hero/components/Hero';
import { Features } from '@/templates/clearnotes-hero/components/Features';
import { Showcase } from '@/templates/clearnotes-hero/components/Showcase';
import { Pricing } from '@/templates/clearnotes-hero/components/Pricing';
import { Faqs } from '@/templates/clearnotes-hero/components/Faqs';
import { FinalCTA } from '@/templates/clearnotes-hero/components/FinalCTA';
import { DoodleBackground } from '@/templates/clearnotes-hero/components/DoodleBackground';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-white overflow-hidden flex flex-col selection:bg-brand-blue selection:text-white">
      {/* Background Layer */}
      <DoodleBackground />

      {/* Navigation */}
      <TopNav />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center pt-[40px]">
        <Hero />
        <Features />
        <Showcase />
        <Pricing />
        <Faqs />
        <FinalCTA />
      </div>
    </main>
  );
}
