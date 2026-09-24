import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import Pricing from './components/Pricing';
import Reviews from './components/Reviews';

function App() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-neutral-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Projects />
        <Testimonials />
        <Process />
        <Pricing />
        <Reviews />
      </main>
    </div>
  );
}

export default App;
