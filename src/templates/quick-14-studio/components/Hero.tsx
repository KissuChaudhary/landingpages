import React from 'react';
import { Sparkles, Star } from 'lucide-react';
import Button from './Button';
import BlogCarousel from './BlogCarousel';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full flex flex-col items-center text-center pt-12 md:pt-24 pb-8 overflow-hidden">
      
      {/* Centered Content Container */}
      <div className="w-full max-w-5xl mx-auto px-6 flex flex-col items-center">
        
        {/* Decorative Star/Crosshair Left */}
        <div className="absolute top-1/4 left-4 md:left-0 lg:left-[10%] text-stone-400 hidden lg:block">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M20 0V40M0 20H40" />
            </svg>
        </div>
        
        {/* Decorative Star Right */}
        <div className="absolute top-1/3 right-4 md:right-0 lg:right-[10%] text-stone-800 hidden lg:block animate-pulse">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
        </div>

        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 pt-1.5 pb-2 rounded-full border border-orange-400 bg-white text-stone-900 text-[11px] font-normal mb-6 shadow-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-orange-500">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" stroke="none" />
            </svg>
            <span>THE POST-SEO ERA</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl text-stone-900 leading-[1.1] mb-6 tracking-tight">
            Don’t just rank <br />
            <span className="italic font-light">Be the Source AI cites</span>
        </h1>

        {/* Subheadline */}
        <p className="font-sans text-lg md:text-xl text-stone-500 max-w-2xl leading-snug mb-6 px-2">
            FlipAEO is the Strategic Content Engine for dominating AEO and GEO. We engineer the exact content required to
        <strong className="text-black font-normal">{" "}make your brand the #1 citation in AI search results.</strong> 
        </p>

        {/* CTA Button Container */}
        <div className="relative group z-10">
            <Button variant="primary" className="text-orange-600">
                Build My Growth Strategy
            </Button>

            {/* Handwritten Note - Repositioned relative to button */}
            <div className="absolute left-[105%] top-4 hidden md:flex flex-col w-40 pointer-events-none">
                <p className="font-hand text-xl text-stone-500 leading-6 rotate-6 transform text-left opacity-90 ml-1">
                    See what our client says about us!
                </p>
                <svg width="70" height="70" viewBox="0 0 70 70" fill="none" stroke="currentColor" className="text-stone-400 -ml-6 -mt-1">
                    {/* Curve pointing down and to the left towards the testimonial */}
                    <path 
                        d="M55,10 Q55,45 10,50" 
                        strokeWidth="1.5" 
                        fill="none"
                        markerEnd="url(#arrowhead)"
                    />
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                        </marker>
                    </defs>
                </svg>
            </div>
        </div>

        {/* Testimonial */}
        <div className="mt-16 flex flex-col items-center gap-4 animate-fade-in-up">
            <p className="text-stone-600 text-center max-w-xl italic text-lg leading-relaxed">
            “Himanshu transformed our website & dashboard, delivering outstanding quality that surpassed our expectations—twice!”
            </p>
            <div className="flex items-center gap-3 mt-2">
                <img 
                src="https://picsum.photos/100/100" 
                alt="Deborah" 
                className="w-10 h-10 rounded-full object-cover border border-stone-200"
                />
                <div className="text-sm text-stone-500">
                <span className="font-semibold text-stone-900">Deborah</span>, CEO at Phloxe
                </div>
            </div>
        </div>

      </div>

      {/* 
        Blog Carousel - Full Width 
        Placed at the bottom of the Hero section
      */}
      <BlogCarousel />

    </section>
  );
};

export default Hero;