import { ArrowRight, ShieldPlus, HeartPulse, Droplet, Activity, Heart, Menu } from 'lucide-react';
import { MobileNav } from './components/MobileNav';

export default function App() {
  return (
    <div className="font-sans selection:bg-gray-900 selection:text-white overflow-x-hidden bg-[#020202]">
      
      {/* Hero Section */}
      <div className="relative min-h-[100dvh] flex flex-col justify-between">
        
        {/* Background Image Layer */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-[#F4F4F6]">
           <img
             src="/main-heroo.png"
             alt="Hero"
             className="w-full h-full object-cover object-[center_60%]"
           />
           
           {/* Universal: Bottom dark gradient for logos visibility & seamless transition */}
           <div className="absolute inset-x-0 bottom-0 h-[35vh] md:h-[40vh] bg-gradient-to-t from-[#020202] via-[#020202]/90 to-transparent" />
        </div>

      {/* Header */}
      <header className="relative z-50 pt-4 md:pt-6 px-4 md:px-8 flex items-center justify-between pointer-events-none">
        
        {/* Mobile Header */}
        <MobileNav />

        {/* Desktop Header */}
        <div className="hidden md:flex pointer-events-auto w-full items-center justify-between  mx-auto">
          <div className="bg-white rounded-full flex items-center p-2  border border-gray-200">
            <div className="w-[42px] h-[22px] border-[3px] border-gray-900 rounded-full mx-3" />
            <nav className="flex items-center space-x-7 mx-5 text-[14px] font-medium text-gray-500">
              {['Works', 'Services', 'Insights', 'Pricing', 'Company'].map(link => (
                <a key={link} href="#" className="hover:text-gray-900 transition-colors">{link}</a>
              ))}
            </nav>
          </div>

          <div className="bg-white rounded-full flex items-center p-1.5  border border-gray-200 pr-5 cursor-pointer hover:shadow-md transition-shadow">
            <div className="bg-[#1a1a1c] rounded-full w-[30px] h-[30px] flex items-center justify-center mr-3">
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-white">
                <path d="M7 12h10M17 12l-4-4M17 12l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[14px] font-medium text-gray-900">Hire Team</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full flex-grow flex flex-col justify-center lg:justify-start px-4 md:px-8 pt-10 ">
        <div className="w-full mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12">
          
          {/* Left Text */}
          <div className="w-full lg:max-w-[700px] flex flex-col items-start space-y-6">
            <h1 className="leading-[1.05] tracking-tight font-medium">
              <span className="text-[#999999] block text-[60px] sm:text-[5rem] leading-[1]">Design Mobile App UIs</span>
              <span className="text-gray-900 font-semibold tracking-tighter block text-[50px] sm:text-[5rem] leading-[1]">In Minutes with AI.</span>
            </h1>
            
            <p className="text-gray-600/90 text-lg sm:text-[1.15rem] max-w-[420px] leading-relaxed">
              Deploy custom neural agents, LLMs, and automation in one seamless flow.
            </p>
            
            <button className="flex items-center bg-[#18181b] text-white rounded-[16px] p-1.5 pr-8  hover:shadow-md hover:bg-black transition-all group w-fit mt-2">
              <div className="bg-white rounded-[12px] w-[50px] h-[50px] flex items-center justify-center mr-4  text-gray-900 overflow-hidden">
                 <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1">
                    <path d="M12 5h-2v2h2V5zM14 7h-2v2h2V7zM16 9h-2v2h2V9zM18 11h-2v2h2v-2zM16 13h-2v2h2v-2zM14 15h-2v2h2v-2zM12 17h-2v2h2v-2zM4 11h-2v2h2v-2zM8 11H6v2h2v-2zM12 11h-2v2h2v-2z"/>
                 </svg>
              </div>
              <span className="font-semibold text-[16px]">Start Build</span>
            </button>
          </div>

          {/* Right Floating Card - Desktop & Mobile */}
          <div className="w-full sm:w-[440px] shrink-0 bg-white/95 backdrop-blur-sm rounded-[24px] p-2.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-white relative mt-8 lg:mt-0 lg:-ml-12 mb-8 lg:mb-0"> 
             <div className="relative w-full h-[200px] sm:h-[240px] bg-[#0c0c0e] rounded-[18px] overflow-hidden mb-3 border border-gray-900/10">
              <img
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800"
                alt="Digital Brain"
                className="w-full h-full object-cover mix-blend-screen opacity-90 object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 mix-blend-overlay" />
              <div className="absolute top-4 left-4 right-4 flex justify-between text-[10px] text-white/50 font-mono tracking-wider">
                <span>NEURAL.A</span>
                <span>M-V4</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between px-3 pb-2 pt-1">
              <div>
                <h3 className="text-[17px] font-semibold text-gray-900 leading-snug tracking-tight">Digital Brain</h3>
                <p className="text-[12px] text-gray-400 font-mono mt-0.5 uppercase tracking-wider">// Model v4.0.2</p>
              </div>
              <button className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Area */}
      <footer className="relative z-20 pb-8 px-4 md:px-8 lg:px-[100px] w-full mt-auto">
        <div className="mx-auto w-full">
          <p className="text-white/90 text-[13px] md:text-[14px] font-medium leading-[1.5] max-w-[280px] mb-6 drop-shadow-md">
            +2,400 active deployments and 8,200 brands trust our high-performance architecture.
          </p>
          
          <div className="flex flex-wrap items-center gap-6 md:gap-14 text-white">
            <div className="flex items-center gap-2">
              <ShieldPlus className="w-6 h-6 md:w-8 md:h-8 opacity-90" strokeWidth={1.5} />
              <span className="text-xl md:text-2xl font-bold tracking-tight leading-none mt-1 opacity-90">United<br/><span className="text-[10px] md:text-[12px] font-medium block mt-0.5 tracking-normal">Healthcare</span></span>
            </div>
            
            <div className="flex items-center gap-1 mt-1">
              <HeartPulse className="w-6 h-6 md:w-8 md:h-8 opacity-90" strokeWidth={2.5} />
              <span className="text-3xl md:text-[34px] font-bold tracking-tighter opacity-90">aetna</span>
            </div>

            <div className="flex items-center gap-1.5 md:gap-2">
              <Droplet className="w-5 h-5 md:w-6 md:h-6 opacity-90" strokeWidth={2.5} />
              <span className="text-2xl md:text-[28px] font-bold tracking-tight opacity-90">cigna</span>
            </div>
            
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="text-2xl md:text-[28px] font-bold tracking-tight opacity-90">Anthem</span>
              <Activity className="w-5 h-5 md:w-6 md:h-6 opacity-90" strokeWidth={3} />
            </div>

            <div className="flex items-center gap-1.5 md:gap-2">
              <Heart className="w-5 h-5 md:w-7 md:h-7 fill-white opacity-90" strokeWidth={1} />
              <span className="text-xl md:text-2xl font-bold tracking-tight opacity-90 flex items-baseline">
                CVS<span className="text-[14px] md:text-[18px] ml-1 font-medium tracking-normal">pharmacy®</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
      </div>

      {/* Cinematic Next Section */}
      <section className="relative z-30 w-full bg-[#020202] text-white overflow-hidden py-32 md:py-48 px-4 md:px-8 lg:px-[100px]">
        <div className="max-w-[1600px] mx-auto flex flex-col items-center justify-center text-center">
          
          <div className="mb-8 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </div>

          <h2 className="text-[40px] md:text-[72px] lg:text-[96px] font-medium tracking-tighter leading-[1.05] max-w-[1200px]">
            <span className="text-white/40 block">Precision engineering.</span>
            <span className="text-white block">Zero compromises.</span>
          </h2>

          <p className="mt-8 md:mt-12 text-white/50 text-lg md:text-xl lg:text-2xl max-w-[600px] font-light leading-relaxed">
            The neural engine translates your intent directly into production-grade React components, mapping perfectly to your design system in milliseconds.
          </p>

          {/* Minimalist Visual Element */}
          <div className="mt-24 w-full max-w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[1px] bg-white shadow-[0_0_20px_4px_rgba(255,255,255,0.3)]" />
          </div>
          
          <div className="w-full max-w-[1000px] mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-left">
             <div className="p-8 border-l border-white/10 relative group">
               <div className="absolute top-0 left-[-1px] w-[2px] h-0 bg-white group-hover:h-full transition-all duration-700 ease-out" />
               <span className="text-white/40 font-mono text-sm tracking-wider uppercase block mb-4">01. Architecture</span>
               <h3 className="text-2xl font-medium tracking-tight mb-2">Native Code</h3>
               <p className="text-white/50 font-light leading-relaxed">Generated outputs bypass intermediary layers, writing directly to clean Tailwind and React.</p>
             </div>
             
             <div className="p-8 border-l border-white/10 relative group">
               <div className="absolute top-0 left-[-1px] w-[2px] h-0 bg-white group-hover:h-full transition-all duration-700 ease-out" />
               <span className="text-white/40 font-mono text-sm tracking-wider uppercase block mb-4">02. Velocity</span>
               <h3 className="text-2xl font-medium tracking-tight mb-2">Real-time Sync</h3>
               <p className="text-white/50 font-light leading-relaxed">Sub-millisecond latency between prompt and visual output creates a seamless flow state.</p>
             </div>
             
             <div className="p-8 border-l border-white/10 relative group">
               <div className="absolute top-0 left-[-1px] w-[2px] h-0 bg-white group-hover:h-full transition-all duration-700 ease-out" />
               <span className="text-white/40 font-mono text-sm tracking-wider uppercase block mb-4">03. Scalability</span>
               <h3 className="text-2xl font-medium tracking-tight mb-2">Enterprise Ready</h3>
               <p className="text-white/50 font-light leading-relaxed">Built on a distributed edge network designed to support millions of concurrent generations.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Framer Badge */}
      <div className="fixed right-4 md:right-6 bottom-4 md:bottom-6 flex items-center bg-white p-1 pl-3 pr-4 rounded-full shadow-lg border border-gray-100 z-50 pointer-events-auto hover:scale-105 transition-transform cursor-pointer">
        <div className="w-3.5 h-3.5 md:w-4 md:h-4 bg-gray-900 rounded-[3px] mr-2 flex opacity-90" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}></div>
        <span className="text-[11px] md:text-[13px] font-semibold text-gray-900 tracking-wide">Made in Framer</span>
      </div>

    </div>
  );
}

