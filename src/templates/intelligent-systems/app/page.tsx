import Header from '@/templates/intelligent-systems/components/Header';
import Hero from '@/templates/intelligent-systems/components/Hero';
import Diagram from '@/templates/intelligent-systems/components/Diagram';
import TrustLogos from '@/templates/intelligent-systems/components/TrustLogos';
import BackgroundPattern from '@/templates/intelligent-systems/components/BackgroundPattern';
import ProblemSection from '@/templates/intelligent-systems/components/ProblemSection';
import SolutionSection from '@/templates/intelligent-systems/components/SolutionSection';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#161618] text-white overflow-hidden selection:bg-orange-500/30">
      <div className="noise-bg" />
      <BackgroundPattern />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex flex-col items-center pt-12">
          <Hero />
          <Diagram />
          <TrustLogos />
          <ProblemSection />
          <SolutionSection />
        </div>
      </div>
    </main>
  );
}
