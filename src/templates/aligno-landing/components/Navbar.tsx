import React, { useState, useEffect } from 'react';

const Logo = () => (
  <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
          <div className="w-3 h-3 bg-black rounded-full" />
      </div>
      <span className="text-xl font-semibold text-[#FFDAC2] tracking-tight">Elpino</span>
  </div>
);

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120; // Account for sticky header height + margin
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Desktop Header */}
      <header
        className={`sticky top-6 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full md:flex backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isScrolled 
            ? "max-w-3xl bg-black/50 border border-[#FFDAC2]/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)] py-2.5 px-5" 
            : "max-w-6xl bg-black/10 border border-white/5 shadow-none py-4 px-8"
        }`}
        style={{
          willChange: "transform, width, padding, background-color",
        }}
      >
        <a
          className="z-50 flex items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          href="/"
        >
          <Logo />
        </a>

        <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium text-white/70 transition duration-200 hover:text-white md:flex">
          <a
            className="relative px-4 py-2 hover:text-white transition-colors cursor-pointer hover:text-[#FFDAC2]"
            onClick={(e) => {
              e.preventDefault();
              handleMobileNavClick("features");
            }}
          >
            Features
          </a>
          <a
            className="relative px-4 py-2 hover:text-white transition-colors cursor-pointer hover:text-[#FFDAC2]"
            onClick={(e) => {
              e.preventDefault();
              handleMobileNavClick("pricing");
            }}
          >
            Pricing
          </a>
          <a
            className="relative px-4 py-2 hover:text-white transition-colors cursor-pointer hover:text-[#FFDAC2]"
            onClick={(e) => {
              e.preventDefault();
              handleMobileNavClick("testimonials");
            }}
          >
            Testimonials
          </a>
          <a
            className="relative px-4 py-2 hover:text-white transition-colors cursor-pointer hover:text-[#FFDAC2]"
            onClick={(e) => {
              e.preventDefault();
              handleMobileNavClick("faq");
            }}
          >
            FAQ
          </a>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="/login"
            className="font-medium transition-colors hover:text-[#FFDAC2] text-white/70 text-sm cursor-pointer"
          >
            Log In
          </a>

          <a
            href="/signup"
            className="rounded-full font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center bg-gradient-to-b from-[#FFDAC2] to-[#E6A88A] text-white shadow-[0_4px_20px_rgba(255,218,194,0.3),inset_0_1px_0_rgba(255,255,255,0.4)] hover:shadow-[0_6px_25px_rgba(255,218,194,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] px-6 py-2.5 text-sm"
          >
            Sign Up
          </a>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="sticky top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full bg-black/50 backdrop-blur-2xl border border-[#FFDAC2]/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] md:hidden px-5 py-3.5">
        <a
          className="flex items-center justify-center gap-2"
          href="/"
        >
          <Logo />
        </a>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 transition-colors hover:bg-white/10"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col items-center justify-center w-5 h-5 space-y-1.5">
            <span
              className={`block w-5 h-0.5 bg-[#FFDAC2] transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-[#FFDAC2] transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-[#FFDAC2] transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </div>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-md md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute top-24 left-4 right-4 bg-[#121212] border border-[#FFDAC2]/10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] p-6 overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Background Glow inside menu */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#FFDAC2]/10 blur-[80px] rounded-full pointer-events-none" />
            
            <nav className="flex flex-col space-y-2 relative z-10">
              <button
                onClick={() => handleMobileNavClick("features")}
                className="text-left px-4 py-4 text-lg font-medium text-[#FFDAC2] hover:text-white transition-colors rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5"
              >
                Features
              </button>
              <button
                onClick={() => handleMobileNavClick("pricing")}
                className="text-left px-4 py-4 text-lg font-medium text-[#FFDAC2] hover:text-white transition-colors rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5"
              >
                Pricing
              </button>
              <button
                onClick={() => handleMobileNavClick("testimonials")}
                className="text-left px-4 py-4 text-lg font-medium text-[#FFDAC2] hover:text-white transition-colors rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5"
              >
                Testimonials
              </button>
              <button
                onClick={() => handleMobileNavClick("faq")}
                className="text-left px-4 py-4 text-lg font-medium text-[#FFDAC2] hover:text-white transition-colors rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5"
              >
                FAQ
              </button>
              <div className="border-t border-white/10 pt-6 mt-2 flex flex-col space-y-4">
                <a
                  href="/login"
                  className="px-4 py-3 text-lg font-medium text-center text-[#FFDAC2] hover:text-white transition-colors"
                >
                  Log In
                </a>
                <a
                  href="/signup"
                  className="px-4 py-4 text-lg font-bold text-center bg-gradient-to-b from-[#FFDAC2] to-[#E6A88A] text-white rounded-xl shadow-[0_4px_20px_rgba(255,218,194,0.3)] hover:opacity-90 transition-all duration-200"
                >
                  Sign Up
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;