import React from 'react';
import { BadgeCheck, Heart, Link as LinkIcon, User } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#fcfcfc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        
        {/* --- Block 1: Performance --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Visuals */}
          <div className="relative mx-auto lg:mx-0 w-full max-w-[500px] lg:max-w-none">
             <div className="flex justify-center lg:justify-start gap-4 sm:gap-6">
                
                {/* Card 1 (Left, Lower) */}
                <div className="relative w-[45%] sm:w-60 aspect-[9/14] rounded-[2rem] shadow-2xl overflow-hidden mt-12 transform transition-transform hover:-translate-y-2 duration-500">
                   <img 
                     src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop" 
                     alt="Zara Talks" 
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/60"></div>
                   
                   {/* Badge: Follower Growth */}
                   <div className="absolute bottom-20 left-4 bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-float-delayed">
                      <span className="font-bold text-neutral-900 text-xs">5k follower growth</span>
                   </div>

                   {/* User Info */}
                   <div className="absolute bottom-5 left-4 flex items-center gap-2">
                      <img src="https://picsum.photos/32/32?random=1" alt="Avatar" className="w-6 h-6 rounded-full border border-white" />
                      <span className="text-white font-bold text-xs sm:text-sm">zaratalks</span>
                      <BadgeCheck className="w-4 h-4 text-white fill-blue-500" />
                   </div>
                </div>

                {/* Card 2 (Right, Higher) */}
                <div className="relative w-[45%] sm:w-60 aspect-[9/14] rounded-[2rem] shadow-2xl overflow-hidden transform transition-transform hover:-translate-y-2 duration-500">
                   <img 
                     src="https://images.unsplash.com/photo-1605948333333-e7e00262198b?q=80&w=600&auto=format&fit=crop" 
                     alt="Travel With Mia" 
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/60"></div>
                   
                   {/* Badge: Link Clicks */}
                   <div className="absolute top-32 right-[-0.5rem] bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-20 animate-float">
                      <LinkIcon className="w-3 h-3 text-neutral-500" />
                      <span className="font-bold text-neutral-900 text-xs">Link clicks</span>
                   </div>

                   {/* User Info */}
                   <div className="absolute bottom-5 left-4 flex items-center gap-2">
                      <img src="https://picsum.photos/32/32?random=2" alt="Avatar" className="w-6 h-6 rounded-full border border-white" />
                      <span className="text-white font-bold text-xs sm:text-sm">travelwithmia</span>
                      <BadgeCheck className="w-4 h-4 text-white fill-blue-500" />
                   </div>
                </div>

             </div>

             {/* Floating Badge: Conversion (Connecting) */}
             <div className="absolute top-[15%] left-[42%] z-30 bg-white px-4 py-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-2 transform -rotate-3 animate-float">
                 <span className="font-bold text-neutral-900 text-sm">6.1% conversion</span>
             </div>
          </div>

          {/* Right: Text Content */}
          <div className="flex flex-col items-start text-left">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-pink-50 border border-pink-100 text-pink-600 font-bold text-[10px] tracking-widest uppercase">
              Purpose
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] font-bold text-neutral-900 tracking-tight mb-6">
              Performance-led creatives that helps brands scale faster.
            </h2>
            <p className="text-lg text-neutral-500 leading-relaxed max-w-lg">
              We blend aesthetics with performance to help you turn views into real business outcomes.
            </p>
          </div>

        </div>

        {/* --- Block 2: Mission --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
           {/* Left: Text Content */}
           <div className="flex flex-col items-start text-left order-2 lg:order-1">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-pink-50 border border-pink-100 text-pink-600 font-bold text-[10px] tracking-widest uppercase">
              Mission
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] font-bold text-neutral-900 tracking-tight mb-6">
              Built for creators who are ready to grow today.
            </h2>
            <p className="text-lg text-neutral-500 leading-relaxed max-w-lg">
              If you’re showing up, we’ll make sure it converts — with short-form content built to scale.
            </p>
          </div>

          {/* Right: Large Visual Card */}
          <div className="order-1 lg:order-2 w-full">
            <div className="relative w-full aspect-[4/3] rounded-[2.5rem] shadow-2xl overflow-hidden group">
               <img 
                 src="https://images.unsplash.com/photo-1595679951884-638531181297?q=80&w=1200&auto=format&fit=crop" 
                 alt="Jason Creator" 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
               />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>

               {/* Badge: Likes */}
               <div className="absolute top-1/2 left-0 -translate-y-1/2 translate-x-6 sm:translate-x-12 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-float">
                   <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                   <span className="font-bold text-neutral-900 text-sm">200k</span>
               </div>

               {/* Badge: Profile Clicks */}
               <div className="absolute bottom-24 right-6 sm:right-12 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-float-delayed">
                   <User className="w-4 h-4 text-neutral-600" />
                   <span className="font-bold text-neutral-900 text-sm">1.9k profile clicks</span>
               </div>

               {/* Creator Info */}
               <div className="absolute bottom-8 left-8 flex items-center gap-3">
                  <img src="https://picsum.photos/48/48?random=3" alt="Jason" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white" />
                  <div className="flex items-center gap-1.5">
                     <span className="text-white font-bold text-lg">_jason</span>
                     <BadgeCheck className="w-5 h-5 text-white fill-blue-500" />
                  </div>
               </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Features;
