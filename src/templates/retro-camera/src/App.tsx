/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Camera, Wand2, Play, Sparkles, Heart } from 'lucide-react';

const Tape = ({ className = "" }) => (
  <div className={`absolute w-16 h-6 bg-white/60 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.2)] z-10 ${className}`} style={{ clipPath: 'polygon(5% 0, 100% 5%, 95% 100%, 0 95%)' }}></div>
);

const Polaroid = ({ src, caption, rotation = "rotate-0", className = "", filter="" }) => (
  <div className={`bg-white p-3 pb-12 shadow-[4px_4px_15px_rgba(0,0,0,0.15)] relative ${rotation} ${className} transition-transform hover:scale-105 hover:z-20 border border-gray-100`}>
    <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-3" />
    <div className="aspect-square overflow-hidden bg-gray-200 border border-gray-200 relative">
      <img src={src} alt={caption} className={`w-full h-full object-cover ${filter}`} />
    </div>
    <p className="font-hand text-3xl text-center text-gray-800 absolute bottom-2 w-full left-0">{caption}</p>
  </div>
);

const PaperCard = ({ children, className = "" }) => (
  <div className={`bg-white p-8 relative ${className}`} 
       style={{ 
         boxShadow: '3px 4px 10px rgba(0,0,0,0.1)',
         borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
         border: 'solid 2px #e5e5e5'
       }}>
    {children}
  </div>
);

const StarDoodle = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5L61 35H95L67 55L78 85L50 65L22 85L33 55L5 35H39L50 5Z" fill="#ffde59" stroke="#000" strokeWidth="4" strokeLinejoin="round"/>
  </svg>
);

const Squiggle = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 10 Q 25 0, 45 10 T 85 10 T 125 10 T 165 10 T 195 10" stroke="#ff57a0" strokeWidth="4" strokeLinecap="round" fill="none"/>
  </svg>
);

export default function App() {
  return (
    <div className="min-h-screen font-sans text-gray-900 overflow-x-hidden selection:bg-brand-pink selection:text-white">
      {/* Navigation */}
      <nav className="bg-brand-yellow border-b-4 border-black px-6 py-4 flex justify-between items-center relative z-50">
        <div className="font-marker text-3xl tracking-wider">BringBack.pro</div>
        <div className="hidden md:flex gap-8 font-bold text-lg">
          <a href="#features" className="hover:text-brand-pink transition-colors">Features</a>
          <a href="#gallery" className="hover:text-brand-pink transition-colors">Gallery</a>
          <a href="#faq" className="hover:text-brand-pink transition-colors">FAQ</a>
        </div>
        <button className="bg-brand-pink text-white font-bold py-2 px-6 rounded-full border-2 border-black brutal-shadow-sm brutal-shadow-hover transition-all">
          Try for free
        </button>
      </nav>

      {/* Hero Section */}
      <section className="bg-graph pt-20 pb-32 px-6 relative border-b-8 border-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <h1 className="font-marker text-6xl md:text-8xl leading-tight mb-6">
              Bring your <br/>
              <span className="text-brand-pink inline-block -rotate-2">memories</span> <br/>
              back to life.
            </h1>
            <p className="text-xl font-bold mb-8 max-w-md text-gray-700">
              An AI-powered old photo restoration and animation tool. Fix scratches, add color, and make them smile again!
            </p>
            <button className="bg-brand-yellow text-black font-marker text-2xl py-3 px-8 border-4 border-black brutal-shadow brutal-shadow-hover transition-all flex items-center gap-3">
              <Sparkles size={28} />
              Start Magic
            </button>
            <Squiggle className="w-48 mt-8" />
          </div>
          
          <div className="relative h-[500px] flex justify-center items-center mt-12 md:mt-0">
            <StarDoodle className="absolute top-0 right-10 w-24 h-24 z-0 animate-[spin_10s_linear_infinite]" />
            <Polaroid 
              src="https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?q=80&w=800&auto=format&fit=crop" 
              caption="Before" 
              rotation="-rotate-6" 
              filter="grayscale contrast-125 sepia blur-[1px]"
              className="absolute left-0 md:left-10 w-64 z-10"
            />
            <Polaroid 
              src="https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?q=80&w=800&auto=format&fit=crop" 
              caption="After!" 
              rotation="rotate-6" 
              className="absolute right-0 md:right-10 w-72 z-20"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-brand-pink text-white font-marker px-6 py-2 border-4 border-black -rotate-12 brutal-shadow-sm text-2xl">
              AI MAGIC!
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-brand-brown py-24 px-6 relative border-b-8 border-black" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.08\'/%3E%3C/svg%3E")' }}>
        <div className="max-w-4xl mx-auto">
          <PaperCard className="p-10 md:p-16 text-center">
            <Tape className="-top-4 left-1/2 -translate-x-1/2 w-24 h-8 rotate-2" />
            <h2 className="font-marker text-5xl mb-8 text-brand-pink">Why we built this 📸</h2>
            <div className="font-hand text-3xl leading-relaxed text-gray-700 space-y-6">
              <p>
                We all have that shoebox full of old family photos. Faded, scratched, maybe a little torn. But they are priceless.
              </p>
              <p>
                Thanks to <strong className="text-black font-bold">AI technology</strong>, we can now restore these precious moments. We wanted to build a tool that is fun, easy to use, and brings a tear of joy to your eye.
              </p>
              <p>
                Upload a photo of your great-grandparents, and watch them smile at you. It's truly magical!
              </p>
            </div>
            <Heart className="mx-auto mt-8 text-brand-pink" size={48} fill="#ff57a0" />
          </PaperCard>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-brand-brown py-24 px-6 relative border-b-8 border-black" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.08\'/%3E%3C/svg%3E")' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 relative">
            <h2 className="font-marker text-6xl md:text-7xl text-white drop-shadow-[4px_4px_0_#000]">Choose your magic</h2>
            <StarDoodle className="absolute -top-8 right-1/4 w-16 h-16 hidden md:block" />
            <StarDoodle className="absolute bottom-0 left-1/4 w-12 h-12 hidden md:block" />
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {/* Feature 1 */}
            <div className="bg-[#fdfdfd] p-6 border-4 border-black brutal-shadow relative transform hover:-translate-y-2 transition-transform">
              <Tape className="-top-3 left-4 w-16 h-6 -rotate-6" />
              <div className="bg-brand-yellow w-16 h-16 rounded-full border-4 border-black flex items-center justify-center mb-6 absolute -top-8 -right-4 brutal-shadow-sm">
                <Wand2 size={32} />
              </div>
              <h3 className="font-marker text-4xl mb-4 mt-4">Restore</h3>
              <p className="font-bold text-gray-700 mb-6 text-lg">Fix scratches, tears, and spots instantly.</p>
              <div className="aspect-square bg-gray-300 border-4 border-black mb-6 overflow-hidden relative">
                 <img src="https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover grayscale sepia blur-[1px]" alt="Damaged" />
              </div>
              <button className="w-full bg-brand-yellow font-marker text-2xl py-3 border-4 border-black brutal-shadow-sm brutal-shadow-hover transition-all">TRY IT</button>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#fdfdfd] p-6 border-4 border-black brutal-shadow relative transform hover:-translate-y-2 transition-transform md:-translate-y-8">
              <Tape className="-top-3 right-4 w-16 h-6 rotate-6" />
              <div className="bg-brand-pink w-16 h-16 rounded-full border-4 border-black flex items-center justify-center mb-6 absolute -top-8 -right-4 text-white brutal-shadow-sm">
                <Sparkles size={32} />
              </div>
              <h3 className="font-marker text-4xl mb-4 mt-4">Colorize</h3>
              <p className="font-bold text-gray-700 mb-6 text-lg">Turn black & white memories into vibrant color.</p>
              <div className="aspect-square bg-gray-300 border-4 border-black mb-6 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Colorized" />
              </div>
              <button className="w-full bg-brand-pink text-white font-marker text-2xl py-3 border-4 border-black brutal-shadow-sm brutal-shadow-hover transition-all">TRY IT</button>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#fdfdfd] p-6 border-4 border-black brutal-shadow relative transform hover:-translate-y-2 transition-transform">
              <Tape className="-top-3 left-1/2 -translate-x-1/2 w-16 h-6 rotate-2" />
              <div className="bg-brand-blue w-16 h-16 rounded-full border-4 border-black flex items-center justify-center mb-6 absolute -top-8 -right-4 text-white brutal-shadow-sm">
                <Play size={32} />
              </div>
              <h3 className="font-marker text-4xl mb-4 mt-4">Animate</h3>
              <p className="font-bold text-gray-700 mb-6 text-lg">Make faces smile, blink, and look around.</p>
              <div className="aspect-square bg-gray-300 border-4 border-black mb-6 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Animated" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play className="text-white opacity-80" size={64} fill="currentColor" />
                </div>
              </div>
              <button className="w-full bg-brand-blue text-white font-marker text-2xl py-3 border-4 border-black brutal-shadow-sm brutal-shadow-hover transition-all">TRY IT</button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="bg-graph py-24 px-6 relative border-b-8 border-black overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 relative">
            <h2 className="font-marker text-6xl md:text-7xl mb-4">Wall of Memories</h2>
            <p className="font-hand text-4xl text-gray-600">See what others have brought back.</p>
            <Squiggle className="w-64 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            <Polaroid src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" caption="Grandma '64" rotation="-rotate-3" className="mt-8" />
            <Polaroid src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" caption="Dad's Car" rotation="rotate-6" />
            <Polaroid src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop" caption="Wedding Day" rotation="-rotate-2" className="mt-12" />
            <Polaroid src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop" caption="Summer '82" rotation="rotate-4" className="mt-4" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-graph-blue py-24 px-6 relative border-b-8 border-black">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
            <div className="bg-white p-4 border-4 border-black rounded-full brutal-shadow-sm rotate-12">
              <span className="text-5xl">🤔</span>
            </div>
            <h2 className="font-marker text-7xl md:text-8xl text-white drop-shadow-[4px_4px_0_#000]">Fwaaqs!</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <PaperCard className="transform -rotate-1 hover:rotate-0 transition-transform">
              <Tape className="-top-3 left-10 w-20 h-6 rotate-2" />
              <h3 className="font-marker text-brand-pink text-3xl mb-4 uppercase">Is my data safe?</h3>
              <p className="font-bold text-gray-700 text-lg">Yes! We don't store your photos after processing. They are deleted from our servers immediately after you download the restored version.</p>
            </PaperCard>

            <PaperCard className="transform rotate-1 hover:rotate-0 transition-transform">
              <Tape className="-top-3 right-10 w-20 h-6 -rotate-2" />
              <h3 className="font-marker text-brand-pink text-3xl mb-4 uppercase">How long does it take?</h3>
              <p className="font-bold text-gray-700 text-lg">Usually just a few seconds! Our AI works super fast. Animations might take up to a minute depending on the complexity.</p>
            </PaperCard>

            <PaperCard className="transform rotate-2 hover:rotate-0 transition-transform">
              <Tape className="-top-3 left-1/2 -translate-x-1/2 w-20 h-6 rotate-1" />
              <h3 className="font-marker text-brand-pink text-3xl mb-4 uppercase">Can I print them?</h3>
              <p className="font-bold text-gray-700 text-lg">Absolutely. We upscale the photos so they are print-ready. You can frame them or put them in a physical album.</p>
            </PaperCard>
            
            <PaperCard className="transform -rotate-2 hover:rotate-0 transition-transform">
              <Tape className="-top-3 left-8 w-20 h-6 -rotate-3" />
              <h3 className="font-marker text-brand-pink text-3xl mb-4 uppercase">Is it free?</h3>
              <p className="font-bold text-gray-700 text-lg">You get 3 free restorations when you sign up! After that, we have affordable credit packs so you only pay for what you use.</p>
            </PaperCard>
          </div>
        </div>
      </section>

      {/* Newsletter / Footer */}
      <section className="bg-graph py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="bg-brand-yellow border-4 border-black p-8 md:p-12 brutal-shadow relative mb-20">
            <h2 className="font-marker text-5xl mb-4">Get Updates!</h2>
            <p className="font-bold mb-8 text-xl text-gray-800">Join our newsletter for tips on preserving old photos and new feature announcements.</p>
            
            <form className="flex flex-col md:flex-row gap-4">
              <input type="email" placeholder="Your email address" className="flex-1 border-4 border-black p-4 font-bold text-lg focus:outline-none focus:bg-white bg-[#fdfdfd]" />
              <button type="button" className="bg-brand-pink text-white font-marker text-2xl py-4 px-8 border-4 border-black brutal-shadow-sm brutal-shadow-hover transition-all">
                Subscribe
              </button>
            </form>
            
            <div className="absolute -bottom-16 -right-8 w-32 h-32 bg-white border-4 border-black rounded-full flex items-center justify-center brutal-shadow rotate-12 hidden md:flex">
              <Camera size={48} className="text-brand-blue" />
            </div>
          </div>
          
          <div className="text-center font-bold text-gray-600">
            <p className="mb-4">© 2026 BringBack.pro. All rights reserved.</p>
            <div className="flex justify-center gap-6">
              <a href="#" className="hover:text-brand-pink transition-colors">Twitter</a>
              <a href="#" className="hover:text-brand-pink transition-colors">Instagram</a>
              <a href="#" className="hover:text-brand-pink transition-colors">TikTok</a>
              <a href="#" className="hover:text-brand-pink transition-colors">Privacy</a>
              <a href="#" className="hover:text-brand-pink transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
