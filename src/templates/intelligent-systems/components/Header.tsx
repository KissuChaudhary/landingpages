import { Hexagon } from 'lucide-react';

export default function Header() {
  return (
    <div className="w-full flex justify-center pt-6 px-4 relative z-50">
      <header className="w-full max-w-5xl h-[64px] flex items-center justify-between px-6 text-sm font-medium text-gray-400 node-panel rounded-full">
        <div className="flex items-center gap-2 text-white">
          <Hexagon className="w-6 h-6 fill-[#1a1a1c] stroke-gray-400" />
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="hover:text-white transition-colors">Technology</a>
          <a href="#" className="hover:text-white transition-colors">Programs</a>
          <a href="#" className="hover:text-white transition-colors">Systems</a>
          <a href="#" className="hover:text-white transition-colors">Company</a>
          <a href="#" className="hover:text-white transition-colors">Careers</a>
        </nav>
        
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-1 hover:text-white transition-colors">
            EN <span className="text-[10px] opacity-70">▼</span>
          </button>
          <button className="inner-shadow-dark px-6 py-2.5 rounded-full text-white hover:brightness-110 transition-all border border-black/80 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
            Contact us
          </button>
        </div>
      </header>
    </div>
  )
}
