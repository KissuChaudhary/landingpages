import React from 'react';
import { Menu, Play, Maximize2, Volume2, Settings } from 'lucide-react';

export default function YouTubeMock() {
  return (
    <div className="relative w-full aspect-video bg-[#0F0F0F] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl select-none group flex flex-col justify-between">
       {/* Top Controls Overlay */}
       <div className="relative z-10 flex items-center justify-between text-white/90 p-4 md:p-6 bg-gradient-to-b from-black/60 to-transparent">
           <div className="flex items-center gap-4">
               <Menu className="cursor-pointer hover:text-white" />
               <div className="flex items-center gap-1 cursor-pointer">
                   <div className="w-8 h-5 bg-red-600 rounded-lg flex items-center justify-center">
                       <Play size={10} fill="white" className="ml-0.5" />
                   </div>
                   <span className="font-bold text-lg tracking-tighter font-sans">YouTube</span>
               </div>
           </div>
       </div>

       {/* Floating Play Button (Center) - Simulated Interaction */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-12 md:w-20 md:h-14 bg-red-600/90 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer shadow-lg z-20">
            <Play size={24} fill="white" className="ml-1 text-white md:w-8 md:h-8" />
       </div>

       {/* Bottom Controls Area */}
       <div className="relative z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-12 pb-3 md:pb-4 px-4 md:px-6">
           {/* Fake Progress Bar */}
           <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer mb-3 md:mb-4 group/progress">
               <div className="w-1/3 h-full bg-red-600 relative">
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full shadow opacity-0 group-hover/progress:opacity-100 scale-0 group-hover/progress:scale-100 transition-all"></div>
               </div>
           </div>

            {/* Bottom Controls */}
           <div className="flex justify-between text-white/90">
                <div className="flex items-center gap-3 md:gap-4">
                    <Play size={20} fill="currentColor" className="cursor-pointer hover:text-white" />
                    <Volume2 size={20} className="cursor-pointer hover:text-white" />
                    <span className="text-xs font-medium text-slate-300">2:14 / 8:30</span>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                    <Settings size={20} className="cursor-pointer hover:text-white" />
                    <Maximize2 size={20} className="cursor-pointer hover:text-white" />
                </div>
           </div>
       </div>
    </div>
  );
}