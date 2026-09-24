import React, { useState, useEffect } from 'react';
import { BadgeCheck, Play, Volume2, MoreVertical, Maximize2 } from 'lucide-react';

interface Testimonial {
  id: number;
  username: string;
  avatar: string;
  videoPoster: string;
  stats: { label: string; value: string }[];
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    username: "investing_with_jon",
    avatar: "https://picsum.photos/32/32?random=20",
    videoPoster: "https://images.unsplash.com/photo-1577565177023-d0f29c354dc4?q=80&w=600&auto=format&fit=crop",
    stats: [
      { value: "2k", label: "follower growth" },
      { value: "6.3%", label: "conversion" },
      { value: "2k", label: "profile clicks" },
      { value: "22k", label: "avg views" },
    ]
  },
  {
    id: 2,
    username: "Samuel_",
    avatar: "https://picsum.photos/32/32?random=21",
    videoPoster: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
    stats: [
      { value: "5k", label: "follower growth" },
      { value: "6.1%", label: "conversion" },
      { value: "1.9k", label: "profile clicks" },
      { value: "20k", label: "avg views" },
    ]
  },
  {
    id: 3,
    username: "Tom_Finance",
    avatar: "https://picsum.photos/32/32?random=22",
    videoPoster: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    stats: [
      { value: "4k", label: "follower growth" },
      { value: "5.3%", label: "conversion" },
      { value: "1.5k", label: "profile clicks" },
      { value: "18k", label: "avg views" },
    ]
  },
  {
    id: 4,
    username: "_kenny",
    avatar: "https://picsum.photos/32/32?random=23",
    videoPoster: "https://images.unsplash.com/photo-1548544149-4835e62ee5b3?q=80&w=600&auto=format&fit=crop",
    stats: [
      { value: "5.8k", label: "follower growth" },
      { value: "6.8%", label: "conversion" },
      { value: "2.4k", label: "profile clicks" },
      { value: "21k", label: "avg views" },
    ]
  },
  {
    id: 5,
    username: "Jessica_Estates",
    avatar: "https://picsum.photos/32/32?random=24",
    videoPoster: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    stats: [
      { value: "3k", label: "follower growth" },
      { value: "4.9%", label: "conversion" },
      { value: "1.6k", label: "profile clicks" },
      { value: "16k", label: "avg views" },
    ]
  },
  {
    id: 6,
    username: "investing_with_jon",
    avatar: "https://picsum.photos/32/32?random=20",
    videoPoster: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
    stats: [
      { value: "2k", label: "follower growth" },
      { value: "6.3%", label: "conversion" },
      { value: "2k", label: "profile clicks" },
      { value: "22k", label: "avg views" },
    ]
  },
  {
    id: 7,
    username: "Samuel_",
    avatar: "https://picsum.photos/32/32?random=21",
    videoPoster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    stats: [
      { value: "5k", label: "follower growth" },
      { value: "6.1%", label: "conversion" },
      { value: "1.9k", label: "profile clicks" },
      { value: "20k", label: "avg views" },
    ]
  }
];

const CARD_WIDTH = 300;
const GAP = 40;

const VideoCard: React.FC<{ data: Testimonial; isActive: boolean }> = ({ data, isActive }) => {
  return (
    <div className={`transition-all duration-700 ease-in-out ${isActive ? 'scale-110 z-10 opacity-100' : 'scale-90 opacity-60 blur-[1px]'}`}>
      {/* Video Container */}
      <div 
        className="relative aspect-[9/16] bg-black rounded-[2rem] overflow-hidden shadow-2xl mb-6 group"
        style={{ width: `${CARD_WIDTH}px` }}
      >
        <img src={data.videoPoster} alt={data.username} className="w-full h-full object-cover opacity-90" />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>

        {/* Header: User Info */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
           <img src={data.avatar} alt="User" className="w-8 h-8 rounded-full border border-white/50" />
           <span className="text-white font-semibold text-sm shadow-sm">{data.username}</span>
           <BadgeCheck className="w-4 h-4 text-white fill-blue-500" />
        </div>

        {/* Video Controls Simulation */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
           {/* Progress Bar */}
           <div className="w-full h-1 bg-white/30 rounded-full mb-3 overflow-hidden">
              <div className="w-1/3 h-full bg-white rounded-full"></div>
           </div>
           
           {/* Controls Row */}
           <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                 <Play className="w-5 h-5 fill-white" />
                 <span className="text-[10px] font-medium">0:00 / 0:12</span>
              </div>
              <div className="flex items-center gap-3">
                 <Volume2 className="w-4 h-4" />
                 <Maximize2 className="w-4 h-4" />
                 <MoreVertical className="w-4 h-4" />
              </div>
           </div>
        </div>
      </div>

      {/* Stats Pills */}
      <div className="grid grid-cols-2 gap-2" style={{ width: `${CARD_WIDTH}px` }}>
        {data.stats.map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-xl px-3 py-2 flex items-center justify-center gap-1.5 transition-transform hover:scale-105">
             <span className="text-neutral-900 font-bold text-xs whitespace-nowrap">{stat.value}</span>
             <span className="text-neutral-500 font-bold text-[10px] uppercase tracking-tight truncate">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Create a tripled array to allow for infinite scrolling simulation
// [ ...set1, ...set2 (initial view), ...set3 ]
const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];
const N = testimonials.length;

const Testimonials: React.FC = () => {
  // Start in the middle set (index 7 if length is 7)
  const [currentIndex, setCurrentIndex] = useState(N);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Handle the infinite loop reset
  useEffect(() => {
    // If we've reached the start of the 3rd set (index 14)
    if (currentIndex === 2 * N) {
      // Wait for the transition to complete (700ms), then snap back to the start of the 2nd set (index 7)
      const timeout = setTimeout(() => {
        setIsTransitioning(false); // Disable transition for the snap
        setCurrentIndex(N);        // Snap back to equivalent position
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <section className="py-24 bg-[#fcfcfc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
         
         {/* Badge */}
         <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-pink-50 border border-pink-100 text-pink-600 font-bold text-[10px] tracking-widest uppercase">
            Testimonials
         </div>

         {/* Heading */}
         <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-6">
            What clients say <br/>
            after they got viral.
         </h2>

         {/* Subtext */}
         <p className="text-lg text-neutral-500 leading-relaxed max-w-2xl mx-auto mb-10">
            Proof that the right content can skyrocket your reach, grow your audience, and turn views into real business results.
         </p>

         {/* CTA Button */}
         <button className="inline-flex items-center gap-3 bg-neutral-900 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-neutral-800 transition-all hover:scale-[1.02] shadow-xl shadow-neutral-900/10">
            <img src="https://picsum.photos/32/32?random=99" alt="User" className="w-6 h-6 rounded-full border border-white/20" />
            Book a 15-min call
         </button>

      </div>

      {/* Carousel Track */}
      <div className="relative w-full">
        <div 
            className="flex items-start pl-[50%]"
            style={{ 
                gap: `${GAP}px`,
                // Shift calculation:
                // We shift left by (index * stride). 
                // Then we also subtract half of the card width (CARD_WIDTH/2) to perfectly center the active card.
                transform: `translateX(calc(-1 * (${currentIndex * (CARD_WIDTH + GAP)}px + ${CARD_WIDTH / 2}px)))`,
                transitionDuration: isTransitioning ? '700ms' : '0ms',
                transitionProperty: 'transform',
                transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
            }}
        >
            {extendedTestimonials.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex-shrink-0">
                    <VideoCard data={item} isActive={index === currentIndex} />
                </div>
            ))}
        </div>
        
        {/* Navigation Dots (mapped to original length) */}
        <div className="flex justify-center gap-2 mt-12">
           {testimonials.map((_, idx) => {
             // We need to map the current extended index back to the 0-N range
             // Since we start at N, and loop from N to 2N, the relative index is (currentIndex - N) % N
             // But actually, simpler: currentIndex % N
             const isActiveDot = (currentIndex % N) === idx;
             return (
                <button 
                    key={idx}
                    // Optional: allow clicking dots to jump? 
                    // For infinite loop implementation simplicity, we might disable dot navigation 
                    // or implement complex logic to find the nearest equivalent index. 
                    // Let's just keep it as an indicator for now.
                    className={`h-2 rounded-full transition-all duration-300 ${isActiveDot ? 'bg-neutral-800 w-6' : 'bg-gray-200 w-2'}`}
                />
             );
           })}
        </div>

      </div>

    </section>
  );
};

export default Testimonials;
