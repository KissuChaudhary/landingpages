import React from 'react';
import { Square, Terminal } from 'lucide-react';

const Navbar: React.FC = () => {
  // Navigation items data tailored for a Writing/AI SaaS
  const navItems = [
    { label: 'FEATURES', hasBeta: false },
    { label: 'METHODOLOGY', hasBeta: true }, // The "Secret Sauce"
    { label: 'EXAMPLES', hasBeta: false },
    { label: 'PRICING', hasBeta: false },
  ];

  return (
    <nav className="w-full max-w-[1400px] mx-auto pt-6 px-4 md:px-8 flex justify-between items-start z-50">
      
      {/* Left Section: Logo + Nav Links */}
      <div className="flex items-start hard-shadow bg-white border-2 border-black">
        
        {/* Logo Box */}
        <div className="flex items-center px-6 py-3 border-r-2 border-black h-14">
          <div className="flex items-center gap-2 font-black text-xl tracking-tighter">
            {/* Logo Icon: A simple cursor/terminal block */}
            <div className="w-6 h-6 bg-black text-white flex items-center justify-center">
              <Terminal size={14} strokeWidth={3} />
            </div>
            AGENTWRITE
          </div>
        </div>

        {/* Nav Links Container */}
        <div className="hidden md:flex">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href="#"
              className={`
                relative group flex items-center justify-center px-6 h-14
                text-sm font-bold tracking-tight text-gray-900 hover:bg-gray-50 transition-colors
                ${index !== navItems.length - 1 ? 'border-r-2 border-black' : ''}
              `}
            >
              {/* Beta Tag */}
              {item.hasBeta && (
                <span className="absolute -top-3 right-2 bg-[#FF8FA3] text-[10px] font-bold px-1.5 py-0.5 border border-black z-10 leading-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  NEW
                </span>
              )}
              
              {/* Hover effect */}
              <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Square size={6} fill="currentColor" />
              </span>
              
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Right Section: Auth Buttons */}
      <div className="flex items-center gap-4">
        <div className="flex hard-shadow">
          <button className="h-14 px-8 bg-white border-2 border-black text-sm font-bold hover:bg-gray-50 transition-colors border-r-0 hidden sm:block">
            LOGIN
          </button>
          <button className="h-14 px-8 bg-[#FF6B8B] border-2 border-black text-sm font-bold hover:bg-[#ff5277] transition-colors flex items-center">
            GET ACCESS
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;