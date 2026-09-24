import Image from 'next/image';

export default function Hero() {
  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4 mt-8 relative z-20">
      {/* Badge */}
      <div className="inner-shadow-dark flex items-center gap-3 px-4 py-1.5 rounded-full border border-black/50 mb-10">
        <div className="flex -space-x-2">
          <Image src="https://picsum.photos/32/32?random=1" alt="User" width={24} height={24} className="rounded-full border border-[#1c1c1e]" referrerPolicy="no-referrer" />
          <Image src="https://picsum.photos/32/32?random=2" alt="User" width={24} height={24} className="rounded-full border border-[#1c1c1e]" referrerPolicy="no-referrer" />
          <Image src="https://picsum.photos/32/32?random=3" alt="User" width={24} height={24} className="rounded-full border border-[#1c1c1e]" referrerPolicy="no-referrer" />
        </div>
        <span className="text-xs font-medium text-gray-300">4.9 platform rating · 50K+ developers</span>
      </div>
      
      {/* Headlines */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-lg">
        Powering the next era of<br />intelligent systems.
      </h1>
      
      <p className="text-lg md:text-xl text-gray-400 max-w-3xl mb-12 font-medium drop-shadow leading-relaxed">
        The first enterprise-grade runtime for autonomous agents. <span className="text-gray-100 font-semibold">Unify your data, models, and infrastructure</span> into a single, observable control plane.
      </p>
      
      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md mx-auto">
        <button className="inner-shadow-dark px-8 py-3.5 rounded-full text-white font-medium text-lg hover:brightness-110 transition-all border border-black/80 shadow-[0_4px_10px_rgba(0,0,0,0.5)] w-full sm:w-auto text-center">
          Learn more
        </button>
        <button className="inner-shadow-orange px-8 py-3.5 rounded-full text-white font-medium text-lg hover:brightness-110 transition-all border border-black/80 shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center gap-3 group w-full sm:w-auto">
          <div className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center inner-shadow-dark border border-white/10 group-hover:bg-black/30 transition-colors shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
          <span>Get started</span>
        </button>
      </div>
    </div>
  )
}
