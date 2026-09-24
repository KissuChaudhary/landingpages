import React from 'react';
import { HLSVideo } from './HLSVideo';

export function Footer() {
  return (
    <footer className="relative w-full min-h-[800px] pt-32 pb-8 px-6 md:px-16 lg:px-24 bg-black flex flex-col items-center justify-between overflow-hidden">
      {/* Background Video */}
      <HLSVideo
        src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Fade Gradients */}
      <div
        className="absolute top-0 left-0 right-0 h-[200px] z-[1]"
        style={{ background: 'linear-gradient(to bottom, black, transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[200px] z-[1]"
        style={{ background: 'linear-gradient(to top, black, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center flex-1 justify-center max-w-4xl mx-auto w-full">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.9] mb-8">
          Your next website starts here.
        </h2>
        
        <p className="text-white/60 font-body font-light text-lg md:text-xl mb-12">
          Book a free strategy call. See what AI‑powered design can do.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button className="liquid-glass-strong rounded-full px-8 py-3.5 text-sm font-medium text-white hover:bg-white/5 transition-colors w-full sm:w-auto">
            Book a Call
          </button>
          <button className="bg-white text-black rounded-full px-8 py-3.5 text-sm font-medium hover:bg-white/90 transition-colors w-full sm:w-auto">
            View Pricing
          </button>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white/40 text-xs font-body">
          © 2026 Studio
        </div>
        <div className="flex items-center gap-6 text-white/40 text-xs font-body">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
