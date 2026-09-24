import React from 'react';
import { GlobalCard } from './components/GlobalCard';
import { Zap, Sparkles, Code2, Layers, ArrowRight, Twitter, Scan, Ruler, Settings2, Cpu } from 'lucide-react';

const Navbar = () => (
  <nav className="fixed top-6 left-0 right-0 z-50 px-6 pointer-events-none">
    <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
      {/* Left Pill */}
      <div className="bg-white rounded-full p-1.5 pr-8 flex items-center gap-8 shadow-sm border border-black/5">
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
          <Zap className="w-5 h-5 fill-white" />
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-stone-500">
          <a href="#" className="hover:text-black transition-colors">Product</a>
          <a href="#" className="hover:text-black transition-colors">About</a>
          <a href="#" className="hover:text-black transition-colors">Blog</a>
          <a href="#" className="hover:text-black transition-colors">Pricing</a>
        </div>
      </div>
      {/* Right Pill */}
      <button className="bg-black text-white rounded-full px-6 py-3.5 text-sm font-medium hover:bg-stone-800 transition-colors shadow-sm">
        Get Free Demo
      </button>
    </div>
  </nav>
);

const Hero = () => (
  <section className="pt-48 pb-20 px-6 text-center max-w-5xl mx-auto">
    <div className="inline-flex items-center gap-3 bg-white rounded-full p-1.5 pr-4 shadow-sm border border-black/5 mb-8">
      <span className="bg-black text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">New</span>
      <span className="text-sm font-medium text-stone-800">September 2025 release</span>
    </div>

    <h1 className="text-6xl md:text-[84px] font-bold text-black tracking-[-0.04em] mb-6 leading-[0.95]">
      Design production ready<br /> mobile app UIs <span className="font-serif italic text-stone-500 font-light tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}> in minutes</span>
    </h1>

    <p className="text-xl text-stone-800 max-w-2xl mx-auto font-medium leading-relaxed">
      Go from idea to beautiful app mockups in minutes by chatting with AI.
    </p>

    <form className="prompt-box">
      <label className="sr-only" htmlFor="app-idea">App idea</label>
      <textarea id="app-idea" placeholder="I want to design an app that..."></textarea>
      <button className="image-button" type="button" aria-label="Attach image">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="5" width="16" height="14" rx="2"></rect>
          <circle cx="9" cy="10" r="1.6"></circle>
          <path d="m5.8 17 4.4-4.2 3.1 3 2-2 3 3.2"></path>
        </svg>
      </button>
      <button className="submit-button" type="submit">
        Design it
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h13"></path>
          <path d="m13 6 6 6-6 6"></path>
        </svg>
      </button>
    </form>
  </section>
);


const FeaturesSection = () => (
  <section className="max-w-[1200px] mx-auto px-6 pb-32 pt-16">
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-6">
        Bypass the blank canvas.
      </h2>
      <p className="text-lg text-stone-700 max-w-2xl mx-auto font-medium leading-relaxed">
        Describe your vision, and watch as our AI generates production-ready layouts, 
        complete with styling, interactions, and responsive behavior.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main Feature - 2 columns */}
      <div className="md:col-span-2 relative bg-white/60 backdrop-blur-xl rounded-[36px] p-10 lg:p-12 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent z-0 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="max-w-md mb-12">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-stone-100">
              <Sparkles className="w-7 h-7 text-black" />
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold text-black tracking-tight mb-4 leading-tight">Iterate at the speed<br/>of thought.</h3>
            <p className="text-stone-600 font-medium text-lg leading-relaxed">Refine your designs instantly through natural conversation. Ask for a dark mode, change the layout, or add new components seamlessly.</p>
          </div>

          {/* Visual Mockup inside card */}
          <div className="relative w-full h-[360px] bg-white/40 rounded-[28px] border border-white/60 overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] flex items-end justify-center group-hover:bg-white/50 transition-colors duration-500 mt-6">
             {/* Grid Pattern */}
             <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             
             {/* Mobile Frame */}
             <div className="w-[260px] h-[320px] bg-white rounded-t-[32px] border-x-[8px] border-t-[8px] border-stone-900 shadow-2xl relative overflow-hidden flex flex-col translate-y-6 group-hover:translate-y-3 transition-transform duration-500 ease-out z-10">
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 h-5 bg-stone-900 rounded-b-[14px] w-28 mx-auto z-20"></div>
                
                {/* UI Content */}
                <div className="px-5 pt-8 pb-3 border-b border-stone-100 bg-white relative z-10">
                  <div className="w-1/3 h-4 bg-stone-200 rounded-full mb-4"></div>
                  <div className="w-4/5 h-2.5 bg-stone-100 rounded-full mb-2"></div>
                  <div className="w-2/3 h-2.5 bg-stone-100 rounded-full"></div>
                </div>
                <div className="p-5 flex-1 flex flex-col gap-3 bg-stone-50/50">
                  <div className="w-full bg-white rounded-[16px] shadow-sm border border-stone-100 p-4 flex flex-col gap-3">
                     <div className="w-8 h-8 bg-stone-100 rounded-full mb-1"></div>
                     <div className="w-full h-2 bg-stone-100 rounded-full"></div>
                     <div className="w-3/4 h-2 bg-stone-100 rounded-full"></div>
                  </div>
                  <div className="flex gap-3 h-[100px]">
                    <div className="flex-1 bg-white rounded-[16px] shadow-sm border border-stone-100"></div>
                    <div className="flex-1 bg-[#fdf065]/40 rounded-[16px] shadow-sm border border-[#fdf065]/50 relative overflow-hidden">
                       <div className="absolute inset-0 bg-[#fdf065]/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
             </div>

             {/* Floating prompt box mimic */}
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xl border border-stone-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-full py-2.5 px-5 w-[85%] max-w-[300px] flex items-center justify-between z-30 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <p className="text-[13px] font-medium text-stone-600">"Make the right card yellow"</p>
                <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center shadow-sm">
                   <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Secondary Features - 1 column each, stacked */}
      <div className="flex flex-col gap-6">
        <div className="flex-1 bg-[#111] rounded-[36px] p-8 lg:p-10 relative overflow-hidden group shadow-xl">
           {/* Decorative background glow */}
           <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full transition-opacity group-hover:opacity-100 opacity-50"></div>
           
           <div className="relative z-10 flex flex-col h-full justify-between">
             <div>
               <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10 backdrop-blur-md">
                 <Code2 className="w-6 h-6 text-white" />
               </div>
               <h3 className="text-2xl font-bold text-white tracking-tight mb-3">Export to Code</h3>
               <p className="text-stone-400 text-sm font-medium leading-relaxed">Clean, semantic React Native or Swift code ready to be dropped into your repository.</p>
             </div>
             
             {/* Fake code snippet */}
             <div className="mt-8 bg-black/50 rounded-2xl border border-white/10 p-4 backdrop-blur-sm font-mono text-[10px] text-stone-300 leading-loose">
               <div className="flex gap-2 mb-3">
                 <div className="w-2.5 h-2.5 rounded-full bg-stone-700"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-stone-700"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-stone-700"></div>
               </div>
               <p><span className="text-pink-400">export default</span> <span className="text-blue-400">function</span> <span className="text-yellow-200">App</span>() {'{'}</p>
               <p className="pl-4"><span className="text-pink-400">return</span> (</p>
               <p className="pl-8 text-blue-300">&lt;View className=...&gt;</p>
               <p className="pl-4">);</p>
               <p>{'}'}</p>
             </div>
           </div>
        </div>

        <div className="flex-1 bg-white/60 backdrop-blur-xl rounded-[36px] p-8 lg:p-10 relative overflow-hidden border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group">
           <div className="relative z-10 flex flex-col h-full justify-between">
             <div>
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-stone-100">
                 <Layers className="w-6 h-6 text-black" />
               </div>
               <h3 className="text-2xl font-bold text-black tracking-tight mb-3">Design Systems</h3>
               <p className="text-stone-600 text-sm font-medium leading-relaxed">Automatically extracts colors, typography, and spacing into reusable tokens.</p>
             </div>
             
             <div className="mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#fdf065] shadow-sm ring-4 ring-white"></div>
                  <div className="w-10 h-10 rounded-full bg-[#8FCBD5] shadow-sm ring-4 ring-white -ml-4"></div>
                  <div className="w-10 h-10 rounded-full bg-black shadow-sm ring-4 ring-white -ml-4"></div>
                  <div className="w-10 h-10 rounded-full bg-stone-200 shadow-sm ring-4 ring-white -ml-4 flex items-center justify-center border border-stone-300">
                    <span className="text-[10px] font-bold text-stone-500">+4</span>
                  </div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  </section>
);

const PrecisionSection = () => (
  <section className="max-w-[1200px] mx-auto px-6 pb-32">
    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      .animate-float-0 { animation: float 6s ease-in-out infinite; }
      .animate-float-1 { animation: float 6s ease-in-out infinite 1.5s; }
      .animate-float-2 { animation: float 6s ease-in-out infinite 3s; }
      .animate-float-3 { animation: float 6s ease-in-out infinite 4.5s; }
    `}</style>
    <div className="bg-white/80 backdrop-blur-2xl rounded-[48px] p-10 lg:p-20 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.08)] border border-white flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
      
      {/* Decorative background grid & glow */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#8FCBD5]/30 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      {/* Left: Copy */}
      <div className="flex-1 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-xs font-bold text-stone-600 mb-8 uppercase tracking-widest shadow-sm">
           <Scan className="w-3.5 h-3.5" />
           Architecture
        </div>
        <h2 className="text-4xl lg:text-6xl font-bold text-black tracking-tight mb-6 leading-[1.05]">
          Engineered with<br/>
          <span className="font-serif italic text-stone-500 font-light tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>obsessive</span> precision.
        </h2>
        <p className="text-lg text-stone-600 font-medium leading-relaxed mb-12 max-w-lg">
          It doesn't just paint a picture. The neural engine generates structured, accessible, and responsive components backed by rigorous design token math.
        </p>

        <div className="flex flex-col gap-8">
           <div className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-stone-100 flex items-center justify-center shrink-0">
                 <Ruler className="w-5 h-5 text-black" />
              </div>
              <div>
                 <h4 className="text-black font-bold text-lg mb-1">Spatial Awareness</h4>
                 <p className="text-stone-500 text-sm font-medium leading-relaxed">Calculates perfect optical margins, padding scales, and nested radii automatically.</p>
              </div>
           </div>
           <div className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-stone-100 flex items-center justify-center shrink-0">
                 <Settings2 className="w-5 h-5 text-black" />
              </div>
              <div>
                 <h4 className="text-black font-bold text-lg mb-1">Semantic Tokens</h4>
                 <p className="text-stone-500 text-sm font-medium leading-relaxed">Extracts and applies your brand's specific color palettes and typographic hierarchy.</p>
              </div>
           </div>
           <div className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-stone-100 flex items-center justify-center shrink-0">
                 <Cpu className="w-5 h-5 text-black" />
              </div>
              <div>
                 <h4 className="text-black font-bold text-lg mb-1">DOM Intelligence</h4>
                 <p className="text-stone-500 text-sm font-medium leading-relaxed">Writes clean, accessible HTML structures with proper ARIA labels out of the box.</p>
              </div>
           </div>
        </div>
      </div>

      {/* Right: Visual Inspector */}
      <div className="flex-1 relative w-full h-[540px] flex items-center justify-center mt-12 lg:mt-0">
         {/* The Inspector Canvas Wrapper */}
         <div className="absolute inset-0 bg-stone-50/80 rounded-[36px] border border-stone-200/50 shadow-inner"></div>
         
         {/* Center Card (The Widget) */}
         <div className="relative z-20 w-[320px] bg-white rounded-[32px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.12)] border border-stone-100 p-8 hover:scale-105 transition-transform duration-700 ease-out group">
            <div className="flex justify-between items-start mb-8">
               <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-stone-200 to-stone-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"></div>
               <div className="px-3 py-1.5 rounded-full bg-[#8FCBD5]/15 text-[#186e78] text-[11px] font-bold tracking-widest uppercase shadow-sm">Verified</div>
            </div>
            <div className="text-[40px] font-bold text-black mb-1 tracking-tighter" style={{ fontFamily: "'Inter', sans-serif" }}>
              $12,450<span className="text-stone-300">.00</span>
            </div>
            <div className="text-sm text-stone-500 font-medium mb-8">Available Balance</div>
            
            <div className="w-full h-14 bg-[#111] text-white rounded-2xl flex items-center justify-center text-sm font-bold shadow-[0_8px_20px_rgba(0,0,0,0.15)] group-hover:bg-black transition-colors cursor-pointer relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
               Transfer Funds
            </div>
         </div>

         {/* Floating Annotations */}
         {/* Top Left */}
         <div className="absolute top-[80px] left-[10px] md:-left-[20px] bg-stone-900 text-white text-[11px] font-mono px-4 py-2.5 rounded-xl shadow-2xl z-30 border border-stone-700 flex items-center gap-3 animate-float-0">
            <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
            w-12 h-12 rounded-full
         </div>
         
         {/* Top Right */}
         <div className="absolute top-[160px] right-[10px] md:-right-[20px] bg-white/95 backdrop-blur-md text-stone-800 text-[11px] font-mono px-4 py-2.5 rounded-xl shadow-xl z-30 border border-stone-200 animate-float-1">
            color: semantic.brand.primary
         </div>

         {/* Bottom Left */}
         <div className="absolute bottom-[200px] left-[20px] md:-left-[10px] bg-white/95 backdrop-blur-md text-stone-800 text-[11px] font-mono px-4 py-2.5 rounded-xl shadow-xl z-30 border border-stone-200 flex items-center gap-3 animate-float-2">
            <span className="text-stone-400 font-serif italic text-sm">Aa</span>
            tracking-tighter font-bold
         </div>

         {/* Bottom Right */}
         <div className="absolute bottom-[90px] right-[20px] md:-right-[30px] bg-stone-900 text-white text-[11px] font-mono px-4 py-2.5 rounded-xl shadow-2xl z-30 border border-stone-700 animate-float-3">
            hover:scale-105 transition-all
         </div>

      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="max-w-[1200px] mx-auto px-6 pb-32 pt-16">
    <div className="flex flex-col md:flex-row gap-12 items-end mb-16">
      <div className="flex-1">
        <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-4">
          Loved by top <span className="font-serif italic text-stone-500 font-light tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>creatives</span>.
        </h2>
        <p className="text-lg text-stone-700 font-medium">
          See how teams are accelerating their design workflows.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        {
          quote: "It feels like magic. I described a complex analytics dashboard, and it generated a pixel-perfect, responsive layout in seconds. It skipped hours of wireframing.",
          name: "Sarah Jenkins",
          role: "Product Designer",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
        },
        {
          quote: "The code export is actually usable. Clean Tailwind classes, modular React components, and semantic HTML. It's like having a senior frontend dev instantly pair program with you.",
          name: "Marcus Torres",
          role: "Frontend Lead",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
        },
        {
          quote: "Finally, an AI tool that actually understands design systems. The automatic token extraction and consistent spacing completely blew my mind. Essential daily tool now.",
          name: "Elena Rodriguez",
          role: "Creative Director",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
        }
      ].map((testimonial, i) => (
        <div key={i} className="bg-white/60 backdrop-blur-xl rounded-[32px] p-8 border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:-translate-y-1 transition-transform duration-500 ease-out">
          <p className="text-stone-800 text-lg leading-relaxed mb-8 font-medium">
            "{testimonial.quote}"
          </p>
          <div className="flex items-center gap-4">
            <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border border-stone-200" referrerPolicy="no-referrer" />
            <div>
              <p className="text-black font-bold text-sm">{testimonial.name}</p>
              <p className="text-stone-500 text-sm font-medium">{testimonial.role}</p>
            </div>
            <Twitter className="w-4 h-4 text-stone-300 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  </section>
);

const CTASection = () => (
  <section className="max-w-[1200px] mx-auto px-6 pb-24">
    <div className="bg-[#0a0a0a] rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden flex flex-col items-center">
      {/* Subtle glowing orb in background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <h2 className="relative z-10 text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
        Stop wireframing.<br />
        <span className="font-serif italic text-stone-400 font-light tracking-normal" style={{ fontFamily: "'Playfair Display', serif" }}>Start building.</span>
      </h2>
      
      <p className="relative z-10 text-xl text-stone-400 max-w-xl mx-auto font-medium mb-12">
        Join thousands of designers and developers shipping better products, faster.
      </p>

      <button className="relative z-10 bg-white text-black rounded-full px-8 py-4 text-base font-bold hover:bg-stone-200 transition-colors shadow-xl flex items-center gap-3">
        Start Designing Free
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-black/5 px-6 py-12 text-center">
    <div className="flex items-center justify-center gap-2 mb-6">
      <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
        <Zap className="w-3 h-3 fill-white text-white" />
      </div>
      <span className="text-xl font-bold tracking-tight text-black">Consumo</span>
    </div>
    <div className="flex justify-center gap-8 text-sm font-medium text-stone-500 mb-8">
      <a href="#" className="hover:text-black transition-colors">Twitter</a>
      <a href="#" className="hover:text-black transition-colors">GitHub</a>
      <a href="#" className="hover:text-black transition-colors">Dribbble</a>
      <a href="#" className="hover:text-black transition-colors">Contact</a>
    </div>
    <p className="text-stone-400 text-xs font-medium">
      &copy; {new Date().getFullYear()} Consumo AI. All rights reserved.
    </p>
  </footer>
);

const Badge = () => (
  <div className="fixed bottom-6 right-6 bg-white rounded-lg px-3 py-2 shadow-sm border border-black/5 flex items-center gap-2 z-50">
    <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center">
      <Zap className="w-2.5 h-2.5 fill-white text-white" />
    </div>
    <span className="text-xs font-semibold text-stone-800">Made in Framer</span>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9f4] to-[#fdf065] font-sans relative overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <FeaturesSection />
        <PrecisionSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <Badge />
    </div>
  );
}
