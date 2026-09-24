import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import LiveDemo from './components/LiveDemo';
import Process from './components/Process';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#BAE6FD] font-outfit relative selection:bg-blue-200 selection:text-blue-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <LiveDemo />
        <Process />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;