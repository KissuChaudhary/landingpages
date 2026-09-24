import React from 'react';
import { Menu, X } from 'lucide-react';
import Button from './Button';

interface NavbarProps {
  onLoginClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-3 z-50 w-full px-4 md:px-8 flex justify-center">
      {/* 
        Outer Shell 
        - Pure white background to match page
        - Subtle border and shadow for lift
      */}
      <div className="
        relative w-full
        bg-white
        border border-stone-300/50
        
        rounded-[15px] p-1
        transition-all duration-300
      ">
        
        {/* 
           Inner Core
           - Light gray background for contrast
        */}
        <div className="
            w-full bg-stone-100/50 backdrop-blur-sm
            rounded-[12px] px-2 sm:px-5 py-1 sm:py-2 
            flex items-center justify-between  border border-stone-100
        ">
            
            {/* Logo Section */}
            <div className="flex items-center gap-2 pl-1 min-w-[100px] sm:min-w-[120px]">
              <span className="font-serif font-bold text-2xl tracking-tight text-stone-900 leading-none pb-1">
                FlipAEO
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
                <a href="#" className="hover:text-stone-900 transition-colors">How it works</a>
                <span className="text-stone-300">•</span>
                <a href="#" className="hover:text-stone-900 transition-colors">Benefits</a>
                <span className="text-stone-300">•</span>
                <a href="#" className="hover:text-stone-900 transition-colors">Features</a>
                <span className="text-stone-300">•</span>
                <a href="#" className="hover:text-stone-900 transition-colors">Pricing</a>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
                
                {/* Social/Tool Icons (Desktop only) */}
                <div className="hidden sm:flex items-center gap-2 pr-2 border-r border-stone-200/50 mr-1">
                    <button className="
                        group relative w-9 h-10 flex items-center justify-center 
                        bg-white border border-gray-300 rounded-lg text-stone-700
                        shadow-tactile-gray
                        active:translate-y-[2px] active:shadow-tactile-gray-active
                        transition-all duration-150 ease-out
                    ">
                        {/* X / Twitter Icon */}
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </button>
                   
                </div>
                
                {/* Log In Link */}
                <button 
                    onClick={onLoginClick}
                    className="hidden sm:block text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors px-2"
                >
                    Log in
                </button>

                {/* CTA Button */}
                <button 
                   id="nav-cta-btn"
                   className="
                     flex items-center gap-2.5
                     bg-white
                     border border-gray-300
                     shadow-tactile-gray
                     active:translate-y-[2px] active:shadow-tactile-gray-active
                     px-2 sm:px-5 pt-1 sm:pt-2 pb-2 sm:pb-3 rounded-lg
                     transition-all duration-150 ease-out
                   "
                   onClick={() => {
                       const btn = document.getElementById('primary-cta-btn');
                       btn?.click();
                       btn?.focus();
                   }}
                >
                   
                    
                    <span className="text-gray-600 font-semibold text-xs sm:text-sm">Start Ranking in AI</span>
                </button>

                {/* Mobile Menu Toggle (only visible on mobile) */}
                 <button 
                    className="
                        lg:hidden
                        flex items-center justify-center
                        px-1.5 pt-1.5 pb-2
                        bg-white
                        border border-gray-300
                        shadow-tactile-gray
                        active:translate-y-[2px] active:shadow-tactile-gray-active
                        rounded-lg
                        text-stone-600
                        transition-all duration-150
                    "
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={13} /> : <Menu size={13} />}
                </button>
            </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-24 left-4 right-4 bg-white rounded-2xl shadow-2xl border border-stone-100 p-2 z-40 flex flex-col animate-in fade-in slide-in-from-top-2 origin-top lg:hidden">
             <div className="bg-stone-50 rounded-xl p-2 flex flex-col gap-1">
                {['How it works', 'Benefits', 'Features', 'Pricing'].map((item) => (
                    <a key={item} href="#" className="px-4 py-3 rounded-lg hover:bg-white hover:shadow-sm text-stone-600 font-medium text-base transition-all">
                        {item}
                    </a>
                ))}
                 <button 
                    onClick={() => {
                        setIsMobileMenuOpen(false);
                        if(onLoginClick) onLoginClick();
                    }}
                    className="px-4 py-3 rounded-lg hover:bg-white hover:shadow-sm text-stone-600 font-medium text-base transition-all text-left"
                >
                    Log in
                </button>
            </div>
             <div className="p-2 mt-1">
                 <Button className="w-full justify-center bg-stone-900 text-white shadow-none rounded-lg py-3">
                    Start Ranking Now
                 </Button>
             </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;