import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ParadigmShiftSection from './components/ParadigmShiftSection';
import PainSection from './components/PainSection';
import HowItWorksSection from './components/HowItWorksSection';
import SolutionSection from './components/SolutionSection';
import DeepTechSection from './components/DeepTechSection';
import TuringTestSection from './components/TuringTestSection';

export default function App() {
  return (
    <div className="min-h-screen bg-cream text-ink relative selection:bg-signal selection:text-white">
      <div className="bg-noise" />
      <Navbar />
      <Hero />
      <ParadigmShiftSection />
      <PainSection />
      <HowItWorksSection />
      <SolutionSection />
      <DeepTechSection />
      <TuringTestSection />
    </div>
  );
}