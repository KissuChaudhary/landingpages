import React from 'react';
import { 
  Sparkles, 
  Box, 
  Triangle, 
  Type, 
  Scissors, 
  Clapperboard, 
  MousePointer2, 
  Image as ImageIcon, 
  Film,
  Send
} from 'lucide-react';
import { DottedGlowBackground } from "@/templates/creatorflow/components/glow-background";


export default function Process() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full relative">
        {/* Background Grid Pattern (Local to section if needed, but body has it) */}
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-sm mb-6">
                <Sparkles size={14} className="text-brand-orange fill-brand-orange" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                How It Works?
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
                A quick overview of how we work together to make your edit best in class!
            </p>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Drop Your Footage */}
            <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-8 md:p-12 shadow-xs relative overflow-hidden group">
            <DottedGlowBackground
        className="pointer-events-none mask-radial-to-90% mask-radial-at-center opacity-20 dark:opacity-100"
        opacity={0.7}
        gap={15}
        radius={1.6}
        colorLightVar="--color-neutral-400"
        glowColorLightVar="--color-neutral-500"
        colorDarkVar="--color-neutral-400"
        glowColorDarkVar="--color-sky-700"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />
                <span className="inline-block px-3 py-1 rounded-lg bg-slate-50 text-slate-500 font-semibold text-sm mb-8">01</span>
                
                {/* Graphic Area */}
                <div className="h-48 md:h-56 w-full relative mb-8">
                    {/* Connecting Lines (SVG) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* Line from 't' (WeTransfer) at 40,25 to Hub at 70,50 */}
                        <path d="M 40 25 C 55 25, 55 50, 70 50" stroke="#ffedd5" strokeWidth="1" strokeDasharray="4 4" fill="none" vectorEffect="non-scaling-stroke" />
                        
                        {/* Line from Dropbox at 20,50 to Hub at 70,50 */}
                        <path d="M 20 50 L 70 50" stroke="#ffedd5" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
                        
                        {/* Line from Drive at 40,75 to Hub at 70,50 */}
                        <path d="M 40 75 C 55 75, 55 50, 70 50" stroke="#ffedd5" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
                    </svg>

                    {/* Central Node (Receiver - Right Side) */}
                    <div className="absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-tr from-orange-500 to-orange-300 shadow-xl shadow-orange-500/30 flex items-center justify-center animate-pulse-slow z-20">
                        <Sparkles className="text-white w-10 h-10" />
                        {/* Small decorative plus signs */}
                        <div className="absolute top-3 right-4 text-orange-200 opacity-80">+</div>
                        <div className="absolute bottom-4 left-4 text-orange-200 text-xs opacity-80">✦</div>
                    </div>

                    {/* Source 1: Dropbox (Far Left) */}
                    <div className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#0061FF] rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center text-white z-10 hover:scale-110 transition-transform cursor-pointer">
                        <Box size={32} strokeWidth={1.5} />
                    </div>

                    {/* Source 2: WeTransfer 't' (Top Middle) */}
                    <div className="absolute top-[25%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#171544] rounded-full shadow-lg flex items-center justify-center text-white z-10 hover:scale-110 transition-transform cursor-pointer">
                        <span className="font-serif font-bold text-xl italic mb-1">t</span>
                    </div>

                    {/* Source 3: Drive (Bottom Middle) */}
                    <div className="absolute bottom-[25%] left-[40%] -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-white border border-slate-100 rounded-xl shadow-md flex items-center justify-center z-10 hover:scale-110 transition-transform cursor-pointer">
                         <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" className="w-7 h-7" />
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">Drop Your Footage</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                    Upload your raw clips — WeTransfer, Google Drive, Dropbox — whatever works for you.
                </p>
            </div>

            {/* Card 2: We Do Our Magic */}
            <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-8 md:p-12 shadow-xs relative overflow-hidden group">
                 <DottedGlowBackground
        className="pointer-events-none mask-radial-to-90% mask-radial-at-center opacity-20 dark:opacity-100"
        opacity={0.7}
        gap={15}
        radius={1.6}
        colorLightVar="--color-neutral-400"
        glowColorLightVar="--color-neutral-500"
        colorDarkVar="--color-neutral-400"
        glowColorDarkVar="--color-sky-700"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />
       <span className="inline-block px-3 py-1 rounded-lg bg-slate-50 text-slate-500 font-semibold text-sm mb-8">02</span>
                
                {/* Graphic Area */}
                <div className="h-48 md:h-56 w-full relative mb-8">
                     
                     {/* Abstract Timeline Wave Background */}
                     <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 400 200" preserveAspectRatio="none">
                         <path d="M-50 100 Q 100 20, 200 100 T 450 100" stroke="#cbd5e1" strokeWidth="3" fill="none" strokeDasharray="6 6" />
                     </svg>

                     {/* CapCut - Left Top */}
                     <div className="absolute left-[5%] top-[15%] w-14 h-14 bg-white border border-slate-100 rounded-2xl shadow-card flex items-center justify-center z-10 transition-all duration-700 animate-float" style={{ animationDelay: '0s' }}>
                        <Scissors size={26} className="text-slate-900" />
                     </div>

                     {/* DaVinci - Left Bottom/Mid */}
                     <div className="absolute left-[28%] top-[55%] w-12 h-12 rounded-full shadow-lg z-10 transition-all duration-700 animate-float"
                          style={{ background: 'conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)', animationDelay: '1.5s' }}>
                         <div className="absolute inset-1 bg-slate-900 rounded-full flex items-center justify-center">
                             <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                         </div>
                     </div>

                     {/* Final Cut - Right Top/Mid */}
                     <div className="absolute right-[28%] top-[20%] w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg flex items-center justify-center text-white z-10 rotate-3 transition-all duration-700 animate-float" style={{ animationDelay: '0.8s' }}>
                        <Clapperboard size={30} fill="currentColor" className="text-white/90" />
                     </div>

                     {/* Premiere Pro - Right Bottom */}
                     <div className="absolute right-[5%] top-[50%] w-12 h-12 bg-[#00005B] rounded-lg shadow-xl border border-white/10 flex items-center justify-center text-[#DB96FF] font-bold text-lg z-20 transition-all duration-700 animate-float" style={{ animationDelay: '2.2s' }}>
                        Pr
                     </div>

                     {/* Render Button - Center Bottom */}
                     <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-xl flex items-center gap-2 z-30 transition-transform hover:scale-105 cursor-pointer border border-slate-800">
                         <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                         Start Rendering
                         {/* Interacting Cursor */}
                         <div className="absolute -bottom-5 -right-5 text-slate-900 animate-bounce" style={{ animationDuration: '2s' }}>
                             <MousePointer2 size={28} fill="#FF4D00" className="stroke-white stroke-[2px]" />
                         </div>
                     </div>

                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">We Do Our Magic</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                    We do cut, trim, color-grade, sfs and add engaging transitions and what not!
                </p>
            </div>

            {/* Card 3: Feedback? Easy */}
            <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-8 md:p-12 shadow-xs relative overflow-hidden group">
                  <DottedGlowBackground
        className="pointer-events-none mask-radial-to-90% mask-radial-at-center opacity-20 dark:opacity-100"
        opacity={0.7}
        gap={15}
        radius={1.6}
        colorLightVar="--color-neutral-400"
        glowColorLightVar="--color-neutral-500"
        colorDarkVar="--color-neutral-400"
        glowColorDarkVar="--color-sky-700"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />
      <span className="inline-block px-3 py-1 rounded-lg bg-slate-50 text-slate-500 font-semibold text-sm mb-8">03</span>
                
                {/* Graphic Area */}
                <div className="h-48 md:h-56 w-full flex items-center justify-center relative mb-8">
                    
                    {/* User Avatar */}
                    <div className="absolute top-[20%] left-[10%] z-20">
                         <img src="https://picsum.photos/seed/user5/64/64" alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-md" />
                    </div>

                    {/* Chat Bubble */}
                    <div className="absolute top-[22%] left-[22%] bg-slate-50 border border-slate-100 px-4 py-2 rounded-2xl rounded-tl-none shadow-sm text-sm font-semibold text-slate-700 z-10">
                        Requested a Revision
                    </div>

                    {/* Orange Sticker */}
                    <div className="absolute top-[50%] left-[15%] w-full max-w-[280px] bg-brand-orange text-white px-5 py-3 rounded-2xl shadow-xl shadow-orange-500/30 transform -rotate-6 transition-transform group-hover:rotate-0 flex items-center gap-3">
                        <span className="font-bold text-lg">Revision is in progress!</span>
                        {/* Cursor */}
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-brand-orange">
                             <MousePointer2 size={32} fill="#FF4D00" className="stroke-white stroke-[2px]" />
                        </div>
                    </div>

                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">Feedback? Easy</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                    Want something changed? We offer smooth revision rounds to make sure everything.
                </p>
            </div>

            {/* Card 4: Upload & Grow */}
            <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-8 md:p-12 shadow-xs relative overflow-hidden group">
                 <DottedGlowBackground
        className="pointer-events-none mask-radial-to-90% mask-radial-at-center opacity-20 dark:opacity-100"
        opacity={0.7}
        gap={15}
        radius={1.6}
        colorLightVar="--color-neutral-400"
        glowColorLightVar="--color-neutral-500"
        colorDarkVar="--color-neutral-400"
        glowColorDarkVar="--color-sky-700"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />
       <span className="inline-block px-3 py-1 rounded-lg bg-slate-50 text-slate-500 font-semibold text-sm mb-8">04</span>
                
                {/* Graphic Area */}
                <div className="h-48 md:h-56 w-full flex items-center justify-center relative mb-8 perspective-1000">
                    
                    {/* File 1: Thumbnail */}
                    <div className="absolute top-[40%] left-[10%] bg-white border border-slate-100 px-4 py-2 rounded-xl shadow-md flex items-center gap-2 transform rotate-12 group-hover:rotate-6 transition-transform duration-500 z-10">
                        <ImageIcon size={16} className="text-slate-400" />
                        <span className="text-xs font-medium text-slate-500">Thumbnail.png</span>
                    </div>

                    {/* File 2: Video */}
                    <div className="absolute top-[10%] right-[10%] bg-[#1A1A1A] px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500 z-20">
                        <Film size={16} className="text-white" />
                        <span className="text-xs font-bold text-white">Final_Cut_v2.mp4</span>
                    </div>

                    {/* Publish Button */}
                    <div className="absolute bottom-[20%] right-[15%] bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl shadow-lg shadow-orange-500/30 transform -rotate-12 group-hover:-rotate-6 transition-transform duration-300 z-30 flex items-center gap-2 cursor-pointer hover:scale-105">
                        <span className="font-bold text-xl tracking-tight">Publish</span>
                    </div>

                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">Upload & Grow</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                    We deliver your final video in ready-to-upload YouTube format.
                </p>
            </div>

        </div>
    </section>
  );
}