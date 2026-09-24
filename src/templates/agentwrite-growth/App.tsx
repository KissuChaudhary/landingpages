import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PainSection from './components/PainSection';
import SniffTest from './components/SniffTest';
import SolutionSection from './components/SolutionSection';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans-tech text-black bg-[#F0EEE9] overflow-x-hidden selection:bg-[#FF6B8B] selection:text-white">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center pt-10 pb-0 px-0">
        <Hero />
        <PainSection />
        <SniffTest />
        <SolutionSection />
      </main>
    </div>
  );
};

export default App;