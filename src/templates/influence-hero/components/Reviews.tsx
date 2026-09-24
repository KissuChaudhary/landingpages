import React from 'react';
import { BadgeCheck, Quote } from 'lucide-react';

interface Review {
  text: string;
  author: string;
  avatar: string;
}

const reviews: Review[] = [
  {
    text: "Our Reels finally have structure, pace, and purpose — thanks to Influence.",
    author: "_traveldiaries",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
  },
  {
    text: "Influence made it effortless to stay consistent and grow fast.",
    author: "sarah_fx",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
  },
  {
    text: "From 2K to 10K followers in 3 months — Influence knows what works.",
    author: "Maya Lennox",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop"
  },
  {
    text: "Influence gave my videos the polish they were missing.",
    author: "jo",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=100&auto=format&fit=crop"
  },
  {
    text: "They handled everything — editing, pacing, captions — perfectly.",
    author: "Lara_Cunningham",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=100&auto=format&fit=crop"
  },
  {
    text: "Engagement doubled. Leads tripled. All from Influence's strategy.",
    author: "Rahul_rules",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop"
  }
];

const Reviews: React.FC = () => {
  return (
    <section className="pb-24 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div 
              key={idx} 
              className="bg-[#1A1A1A] p-8 rounded-[2rem] flex flex-col justify-between hover:bg-[#202020] transition-colors duration-300"
            >
              <div className="mb-6">
                <Quote className="w-4 h-4 text-neutral-500 fill-neutral-500 mb-4" />
                <p className="text-lg font-medium leading-relaxed text-neutral-200">
                  {review.text}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <img 
                  src={review.avatar} 
                  alt={review.author} 
                  className="w-10 h-10 rounded-full object-cover border border-white/10" 
                />
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-white">{review.author}</span>
                  <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500/20" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Reviews;
