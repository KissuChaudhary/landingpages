import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LogoStrip } from './components/LogoStrip';
import { Features } from './components/Features';
import { Benefits } from './components/Benefits';
import { Integrations } from './components/Integrations';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen w-full bg-[#fcfbf9] text-kinetik-black selection:bg-yellow-200 selection:text-black font-sans">
      <Navbar />
      <main>
        <Hero />
        <LogoStrip />
        <Benefits />
        <Features />
        <Integrations />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

export default App;