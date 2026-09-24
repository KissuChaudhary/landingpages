import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GridBackground from './components/GridBackground';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import HowItWorksSection from './components/HowItWorksSection';
import FeaturesSection from './components/FeaturesSection';
import ExamplesSection from './components/ExamplesSection';
import PricingSection from './components/PricingSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import FounderNote from './components/FounderNote';

// We convert the SVG to a URL-encoded Data URI string here.
// Note: '%' is replaced with '%25' and '#' with '%23' to ensure browser compatibility.
const FINE_NOISE_SVG = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E`;

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'login'>('landing');

  // Global keyboard listener for the "B" shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'b' && !event.metaKey && !event.ctrlKey) {
        // Prevent default if it might interfere (though usually B is safe)
        // Simulate click or trigger action
        const btn = document.getElementById('primary-cta-btn');
        if (btn) {
          btn.click();
          btn.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
   <div 
      className="min-h-screen w-full flex flex-col items-center relative bg-white"
      style={{ 
        backgroundImage: `url("${FINE_NOISE_SVG}")`,
        backgroundRepeat: 'repeat',
      }}
    >
        
        {/* Global Grid Background 
            Positioned absolutely to cover the full scrollable area 
        */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <GridBackground />
        </div>

        {/* View Switcher */}
        {currentView === 'login' ? (
           <LoginPage onBack={() => setCurrentView('landing')} />
        ) : (
           <div className="relative z-10 w-full max-w-[1250px] flex flex-col items-center pt-8">
            <Navbar onLoginClick={() => setCurrentView('login')} />
            <Hero />
            <ProblemSection />
            <SolutionSection />
            <HowItWorksSection />
            <FeaturesSection />
            <ExamplesSection />
            <FounderNote />
            <PricingSection />
            <FAQSection />
            <CTASection />
            <Footer />
          </div>
        )}

    </div>
  );
};

export default App;