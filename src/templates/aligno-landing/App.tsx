import React from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import BentoGrid from './components/BentoGrid';
import ComparisonSection from './components/ComparisonSection';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-background relative">
      <Navbar />
      <Hero />
      <BentoGrid />
      <ComparisonSection />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default App;