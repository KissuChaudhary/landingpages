import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureBar from './components/FeatureBar';
import YouTubeMock from './components/YouTubeMock';
import Comparison from './components/Comparison';
import Services from './components/Services';
import Process from './components/Process';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden text-slate-900">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Hero />
        <FeatureBar />
        <div className="mt-12 md:mt-20 px-4 md:px-8 max-w-7xl mx-auto w-full pb-10">
          <YouTubeMock />
        </div>
        <Services />
        <Process />
                <Comparison />

        <Pricing />
        <FAQ />
        <Blog />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}