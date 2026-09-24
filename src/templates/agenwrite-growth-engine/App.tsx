import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ProductShowcase } from './components/ProductShowcase';
import { PainPoints } from './components/PainPoints';
import { FeaturesGrid } from './components/FeaturesGrid';
import { LiveExamples } from './components/LiveExamples';
import { HowItWorks } from './components/HowItWorks';
import { WinSystem } from './components/WinSystem';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f2f2f0] text-[#111] font-sans selection:bg-accent-500 selection:text-white pb-20 overflow-x-hidden">
      <Navbar />
      
      {/* max-w-[1600px] for wider layout, px-4/px-8 to prevent edge touching */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-8 pt-28">
        <div className="space-y-24 sm:space-y-32">
            <Hero />
            <ProductShowcase />
            <PainPoints />
            <FeaturesGrid />
            <HowItWorks />
            <WinSystem />
            <LiveExamples />
        </div>
      </main>
      
      <footer className="mt-32 border-t border-stone-200 py-12 text-center text-stone-500 text-sm">
        <p>© 2026 FlipAEO. All rights reserved.</p>
      </footer>
    </div>
  );
}