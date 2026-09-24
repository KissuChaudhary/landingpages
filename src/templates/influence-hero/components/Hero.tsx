import React from 'react';
import { Phone, Star, BadgeCheck, MessageCircle, Heart, Eye } from 'lucide-react';
import { SnapchatIcon, TikTokIcon, InstagramIcon, YouTubeIcon } from './Icons';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="flex flex-col items-start max-w-2xl lg:max-w-none mx-auto lg:mx-0 z-10">
            
            {/* Tag */}
            <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-orange-600 font-bold text-xs tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
              3 spots left for August
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[5rem] leading-[1.1] font-bold text-neutral-900 tracking-tight mb-6">
              Short-form content
              <span className="inline-flex items-center align-middle mx-3 relative top-1">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-orange-400 blur-xl opacity-20 rounded-full"></div>
                {/* Social Icons Stack */}
                <div className="flex items-center -space-x-4">
                   <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-yellow-300 flex items-center justify-center border-[3px] border-white shadow-lg z-10 transform -rotate-12 hover:rotate-0 transition-transform">
                      <SnapchatIcon className="w-6 h-6 text-white drop-shadow-sm" />
                   </div>
                   <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black flex items-center justify-center border-[3px] border-white shadow-lg z-20 transform rotate-6 hover:rotate-0 transition-transform">
                      <TikTokIcon className="w-6 h-6 text-white" />
                   </div>
                   <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center border-[3px] border-white shadow-lg z-30 transform -rotate-6 hover:rotate-0 transition-transform">
                      <InstagramIcon className="w-6 h-6 text-white" />
                   </div>
                   <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-red-600 flex items-center justify-center border-[3px] border-white shadow-lg z-20 transform rotate-12 hover:rotate-0 transition-transform">
                      <YouTubeIcon className="w-6 h-6 text-white" />
                   </div>
                </div>
              </span>
              that builds <span className="font-serif italic font-normal text-neutral-800">real influence.</span>
            </h1>

            {/* Subhead */}
            <p className="text-lg sm:text-xl text-neutral-500 mb-10 leading-relaxed max-w-lg">
              We turn your expertise into viral short-form content that builds trust and drives attention.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
              <button className="flex items-center justify-center gap-3 bg-neutral-900 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-neutral-800 transition-all hover:scale-[1.02] shadow-xl shadow-neutral-900/10">
                <Phone className="w-5 h-5" />
                Let's grow your brand
              </button>
              <button className="flex items-center justify-center gap-2 bg-white text-neutral-900 px-8 py-4 rounded-full text-base font-semibold hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200 shadow-soft">
                See pricing
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 md:gap-8 border-l-2 border-gray-200 pl-6">
               <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">100+ Personal Brands</span>
                 <div className="flex -space-x-3">
                    {[1,2,3,4].map((i) => (
                      <img key={i} src={`https://picsum.photos/40/40?random=${i}`} alt="Client" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                    ))}
                 </div>
               </div>
               <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
               <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Rated Excellent: 5/5</span>
                 <div className="flex text-orange-400 gap-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                 </div>
               </div>
            </div>

          </div>

          {/* Right Column: Visual Component */}
          <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
             
             {/* Background Decoration Blob */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[100%] bg-gradient-to-tr from-gray-200/50 to-gray-50/10 blur-3xl rounded-full -z-10"></div>

             {/* Phone Card Container */}
             <div className="relative w-[320px] sm:w-[380px] h-[600px] sm:h-[700px] rounded-[3rem] shadow-2xl overflow-hidden bg-neutral-900 group">
                
                {/* Background Image */}
                <img 
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
                  alt="Creator" 
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60"></div>

                {/* Floating Badge: Comments (Top Left) */}
                <div className="absolute top-12 left-6 glass-card px-4 py-2 rounded-2xl flex items-center gap-2 shadow-lg animate-float-delayed">
                   <MessageCircle className="w-4 h-4 text-neutral-600" />
                   <span className="font-bold text-neutral-800 text-sm">100+</span>
                </div>

                {/* Floating Badge: Views (Right side) */}
                <div className="absolute top-1/3 right-0 translate-x-1/3 glass-card px-4 py-2 rounded-l-2xl flex items-center gap-2 shadow-lg animate-float">
                   <Eye className="w-4 h-4 text-neutral-600" />
                   <span className="font-bold text-neutral-800 text-sm">40k+</span>
                </div>

                {/* Floating Badge: Likes (Left side) */}
                <div className="absolute bottom-1/3 left-0 -translate-x-4 glass-card px-4 py-2 rounded-r-2xl flex items-center gap-2 shadow-lg animate-float-delayed">
                   <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                   <span className="font-bold text-neutral-800 text-sm">30k</span>
                </div>

                {/* Floating Badge: Followers (Bottom Right) */}
                <div className="absolute bottom-32 right-6 glass-card px-3 py-2 pr-4 rounded-full flex items-center gap-3 shadow-lg animate-float">
                   <div className="relative">
                      <img src="https://picsum.photos/40/40?random=88" className="w-8 h-8 rounded-full border border-white" alt="Follower" />
                      <div className="absolute -bottom-1 -right-1 bg-red-500 w-3 h-3 rounded-full border border-white"></div>
                   </div>
                   <div className="flex flex-col">
                      <span className="font-bold text-neutral-800 text-xs leading-none">2k+ followers</span>
                   </div>
                </div>

                {/* Bottom Creator Info */}
                <div className="absolute bottom-8 left-8 flex items-center gap-3">
                   <div className="p-0.5 bg-gradient-to-tr from-yellow-400 to-pink-600 rounded-full">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" className="w-10 h-10 rounded-full border-2 border-neutral-900" alt="Creator Profile" />
                   </div>
                   <div className="flex items-center gap-1">
                      <span className="font-bold text-white text-base">sasha_</span>
                      <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500/20" />
                   </div>
                </div>

             </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
