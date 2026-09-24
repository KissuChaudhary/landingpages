import React from 'react';
import { BadgeCheck, Folder, FileVideo, Upload, CheckCircle2, MoreHorizontal } from 'lucide-react';

const Process: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-500 font-bold text-[10px] tracking-widest uppercase">
            Process
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Here’s how we turn your <br className="hidden md:block" />
            raw clips into viral content.
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl">
            From idea to execution, we handle everything — so you can focus on 
            creating while we make sure your videos get seen, shared, and saved.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Step 1: Kickoff Call */}
          <div className="bg-[#1A1A1A] rounded-[2.5rem] p-8 lg:p-10 flex flex-col gap-8 group hover:bg-[#202020] transition-colors duration-500">
            {/* Badge */}
            <div className="self-start px-3 py-1 rounded-full border border-pink-500/30 text-pink-500 text-[10px] font-bold tracking-widest uppercase mb-4">
              Step 1
            </div>
            
            {/* Visual */}
            <div className="relative w-full aspect-[16/9] lg:aspect-[2/1] bg-[#111] rounded-3xl p-4 flex gap-4 overflow-hidden">
               {/* Person 1 */}
               <div className="flex-1 relative rounded-2xl overflow-hidden bg-neutral-800">
                  <img 
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&auto=format&fit=crop" 
                    alt="Client" 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-medium text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    You
                  </div>
               </div>
               {/* Person 2 */}
               <div className="flex-1 relative rounded-2xl overflow-hidden bg-neutral-800">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" 
                    alt="Manager" 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                  />
                   <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-medium text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Manager
                  </div>
               </div>
            </div>

            {/* Text */}
            <div className="mt-auto">
              <h3 className="text-2xl font-bold mb-3 text-white">Kickoff call.</h3>
              <p className="text-neutral-400 leading-relaxed">
                Quick kickoff call to learn your brand, tone, and goals. So every video feels authentically you.
              </p>
            </div>
          </div>

          {/* Step 2: Send Footage */}
          <div className="bg-[#1A1A1A] rounded-[2.5rem] p-8 lg:p-10 flex flex-col gap-8 group hover:bg-[#202020] transition-colors duration-500">
             {/* Badge */}
             <div className="self-start px-3 py-1 rounded-full border border-pink-500/30 text-pink-500 text-[10px] font-bold tracking-widest uppercase mb-4">
              Step 2
            </div>

            {/* Visual */}
            <div className="relative w-full aspect-[16/9] lg:aspect-[2/1] bg-[#111] rounded-3xl flex items-center justify-center overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                {/* Folder/File Animation - Static layout now */}
                <div className="relative z-10">
                   {/* Main Folder */}
                   <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 duration-500">
                      <Folder className="w-10 h-10 text-white fill-white/20" />
                   </div>
                   
                   {/* Floating File 1 - Static */}
                   <div className="absolute -top-6 -right-8 w-14 h-14 bg-[#222] rounded-xl border border-white/10 flex items-center justify-center shadow-xl">
                      <FileVideo className="w-6 h-6 text-blue-400" />
                   </div>
                   
                   {/* Floating File 2 - Static */}
                   <div className="absolute -bottom-4 -left-8 w-14 h-14 bg-[#222] rounded-xl border border-white/10 flex items-center justify-center shadow-xl">
                      <Upload className="w-6 h-6 text-green-400" />
                   </div>

                   {/* User Avatar Badge - Static */}
                   <div className="absolute -bottom-8 -right-4 bg-white p-1 rounded-full shadow-lg">
                      <img src="https://picsum.photos/32/32?random=50" className="w-8 h-8 rounded-full" alt="Uploader" />
                   </div>
                </div>
            </div>

            {/* Text */}
            <div className="mt-auto">
              <h3 className="text-2xl font-bold mb-3 text-white">Send us your footage.</h3>
              <p className="text-neutral-400 leading-relaxed">
                Record on your phone, Zoom, podcast, or wherever you like. Just upload it — we'll take it from there.
              </p>
            </div>
          </div>

          {/* Step 3: We Edit */}
          <div className="bg-[#1A1A1A] rounded-[2.5rem] p-8 lg:p-10 flex flex-col gap-8 group hover:bg-[#202020] transition-colors duration-500">
             {/* Badge */}
             <div className="self-start px-3 py-1 rounded-full border border-pink-500/30 text-pink-500 text-[10px] font-bold tracking-widest uppercase mb-4">
              Step 3
            </div>

            {/* Visual */}
            <div className="relative w-full aspect-[16/9] lg:aspect-[2/1] bg-[#111] rounded-3xl p-6 flex flex-col justify-center gap-4 overflow-hidden">
                {/* Chat Bubble Right (Team) - Always Visible */}
                <div className="self-end max-w-[85%] flex items-end gap-3">
                   <div className="bg-neutral-800 px-4 py-3 rounded-2xl rounded-tr-sm text-sm text-white shadow-lg border border-white/5">
                      Hey, we uploaded the edited reels! 🚀
                   </div>
                   <img src="https://picsum.photos/32/32?random=44" className="w-8 h-8 rounded-full border border-neutral-800" alt="Team" />
                </div>

                {/* Chat Bubble Left (You) - Always Visible */}
                <div className="self-start max-w-[85%] flex items-end gap-3">
                   <img src="https://picsum.photos/32/32?random=50" className="w-8 h-8 rounded-full border border-neutral-800" alt="Client" />
                   <div className="bg-[#222] px-4 py-3 rounded-2xl rounded-tl-sm text-sm text-white shadow-lg border border-white/5 flex items-center gap-2">
                      These look awesome 🤩
                      <CheckCircle2 className="w-3 h-3 text-blue-500" />
                   </div>
                </div>
            </div>

            {/* Text */}
            <div className="mt-auto">
              <h3 className="text-2xl font-bold mb-3 text-white">We edit. You approve.</h3>
              <p className="text-neutral-400 leading-relaxed">
                Our team crafts edits with hooks, subtitles, music, and visual flair. You review, request changes, or hit post.
              </p>
            </div>
          </div>

          {/* Step 4: Track Results */}
          <div className="bg-[#1A1A1A] rounded-[2.5rem] p-8 lg:p-10 flex flex-col gap-8 group hover:bg-[#202020] transition-colors duration-500">
             {/* Badge */}
             <div className="self-start px-3 py-1 rounded-full border border-pink-500/30 text-pink-500 text-[10px] font-bold tracking-widest uppercase mb-4">
              Step 4
            </div>

            {/* Visual */}
            <div className="relative w-full aspect-[16/9] lg:aspect-[2/1] bg-[#111] rounded-3xl p-8 flex items-end justify-center gap-2 sm:gap-3 overflow-hidden">
                {[30, 45, 35, 60, 50, 75, 65, 90, 80, 100].map((height, i) => (
                  <div 
                    key={i} 
                    className="w-full bg-neutral-700 rounded-t-sm hover:bg-neutral-500 transition-all duration-500 relative group/bar"
                    style={{ height: `${height * 0.7}%` }}
                  >
                     {/* Tooltip on hover */}
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">
                        {height}k
                     </div>
                  </div>
                ))}
                
                {/* Overlay Gradient for Fade effect */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#111] to-transparent z-10 pointer-events-none"></div>
            </div>

            {/* Text */}
            <div className="mt-auto">
              <h3 className="text-2xl font-bold mb-3 text-white">Track what works.</h3>
              <p className="text-neutral-400 leading-relaxed">
                Each month, we show you what’s performing best — so you can double down on content that converts.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Process;
