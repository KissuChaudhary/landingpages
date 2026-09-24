import React from 'react';
import { cn } from '../lib/utils';

// --- Types & Data ---

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const testimonialsRow1: Testimonial[] = [
  {
    quote: "The advanced analytics have given us better insight into project performance than ever.",
    name: "David Foster",
    role: "NextGen Solutions",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=100&h=100"
  },
  {
    quote: "Aligno has simplified project management for us—everything we need in one place!",
    name: "Jonathan Reed",
    role: "TechWorks",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=100&h=100"
  },
  {
    quote: "The interface is so intuitive that our team needed zero training to get started.",
    name: "Elena Rodriguez",
    role: "DesignCraft",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=100&h=100"
  },
  {
    quote: "Finally, a tool that actually scales with our remote-first workflow perfectly.",
    name: "Marcus Chen",
    role: "GlobalSync",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=crop&w=100&h=100"
  },
];

const testimonialsRow2: Testimonial[] = [
  {
    quote: "Aligno’s customizable features made it the perfect fit for our growing business.",
    name: "Samantha Lee",
    role: "BrightStart Studios",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=100&h=100"
  },
  {
    quote: "The real-time collaboration feature has transformed the way we work globally.",
    name: "Michael Davis",
    role: "CreativeCrew",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?fit=crop&w=100&h=100"
  },
  {
    quote: "We've tried every tool out there, but nothing compares to Aligno's speed and reliability.",
    name: "Jennifer Wu",
    role: "Velocity Inc",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=crop&w=100&h=100"
  },
  {
    quote: "Customer support is top-notch. They actually listen to feature requests.",
    name: "Robert Fox",
    role: "BlueStream",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=100&h=100"
  },
];

const testimonialsRow3: Testimonial[] = [
  {
    quote: "Aligno's sprint management tools made tracking our progress effortless!",
    name: "Liam Cooper",
    role: "InnovateX",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?fit=crop&w=100&h=100"
  },
  {
    quote: "Our team productivity has skyrocketed since switching to Aligno!",
    name: "Rachel Kim",
    role: "DevSync",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?fit=crop&w=100&h=100"
  },
  {
    quote: "The best investment we've made for our operations this year. Truly game-changing.",
    name: "Alex Morgan",
    role: "FutureScale",
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?fit=crop&w=100&h=100"
  },
  {
    quote: "Clean, fast, and powerful. It just works exactly how you expect it to.",
    name: "Sarah Jenkins",
    role: "PixelPoint",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?fit=crop&w=100&h=100"
  },
];

// --- Components ---

const TestimonialCard: React.FC<{ item: Testimonial; index: number }> = ({ item, index }) => {
  const blobPosition = index % 2 === 0 ? "top-left" : "bottom-right";

  return (
    <div className="group relative overflow-hidden w-[350px] md:w-[450px] shrink-0 p-8 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-white/20 hover:bg-white/[0.02] transition-colors duration-300 flex flex-col justify-between h-[200px] md:h-[220px]">
        {/* Shiny Blob Effect */}
        <div className={cn(
            "absolute w-[250px] h-[250px] rounded-full pointer-events-none transition-all duration-700 ease-in-out mix-blend-screen",
            "bg-gradient-to-br from-[#ff552e] via-[#ff8f70] to-[#ffdac2] blur-[60px]",
            "opacity-20 group-hover:opacity-40",
            blobPosition === "top-left" && "-top-[80px] -left-[80px]",
            blobPosition === "bottom-right" && "-bottom-[80px] -right-[80px]"
        )} />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col justify-between h-full">
            <p className="text-white/80 text-base md:text-lg font-light leading-relaxed tracking-wide">
                {item.quote}
            </p>
            
            <div className="flex items-center gap-4 mt-6">
                <div className="relative">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-white/10">
                        <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    {/* Subtle glow behind avatar */}
                    <div className="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] pointer-events-none" />
                </div>
                <div>
                    <h4 className="text-white font-medium text-sm md:text-base">{item.name}</h4>
                    <p className="text-white/40 text-xs md:text-sm">{item.role}</p>
                </div>
            </div>
        </div>
    </div>
  );
};

const MarqueeRow: React.FC<{ 
  items: Testimonial[]; 
  direction?: "left" | "right"; 
  speed?: number; 
}> = ({ 
  items, 
  direction = "left", 
  speed = 50 
}) => {
  return (
    <div className="relative flex overflow-hidden w-full select-none [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
      <div 
        className={cn(
          "flex gap-6 py-4 shrink-0",
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {/* Original items */}
        {items.map((item, i) => (
          <TestimonialCard key={`orig-${i}`} item={item} index={i} />
        ))}
        {/* Duplicate items for seamless loop */}
        {items.map((item, i) => (
          <TestimonialCard key={`dup-${i}`} item={item} index={i} />
        ))}
        {/* Extra duplicate to ensure no gaps on wide screens */}
        {items.map((item, i) => (
          <TestimonialCard key={`dup2-${i}`} item={item} index={i} />
        ))}
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="w-full bg-[#030303] py-20 px-0 md:py-32 relative overflow-hidden">
      {/* Styles for animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse linear infinite;
        }
      `}</style>

      {/* Background Ambience */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16 md:mb-24 space-y-4 px-4 relative z-10">
        <h2 className="text-3xl md:text-5xl font-sans text-white tracking-tight">
          People Can't Stop <span className="font-serif italic text-[#FFDAC2] font-light">Talking</span> About<br className="hidden md:block" /> Us
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="flex flex-col gap-6 md:gap-8 relative z-10">
        {/* Row 1 - Left */}
        <MarqueeRow items={testimonialsRow1} direction="left" speed={60} />
        
        {/* Row 2 - Right */}
        <MarqueeRow items={testimonialsRow2} direction="right" speed={55} />
        
        {/* Row 3 - Left */}
        <MarqueeRow items={testimonialsRow3} direction="left" speed={65} />
      </div>

    </section>
  );
};

export default Testimonials;