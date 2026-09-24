import React from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Sparkles } from 'lucide-react';

interface TestimonialCardProps {
  handle: string;
  avatar: string;
  content: string;
  variant: 'rotate-pos' | 'rotate-neg';
}

export default function TestimonialCard({ handle, avatar, content, variant }: TestimonialCardProps) {
  const rotationClass = variant === 'rotate-pos' ? 'rotate-[3deg] md:rotate-[6deg]' : 'rotate-[-3deg] md:rotate-[-6deg]';

  return (
    <div className={`bg-white p-4 md:p-5 rounded-2xl shadow-soft-xl border-2 border-dashed border-slate-200 ${rotationClass} hover:rotate-0 transition-all duration-500 ease-out cursor-default`}>
      <div className="flex items-start gap-3 md:gap-4 mb-3">
        <img src={avatar} alt={handle} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-slate-50" />
        <div>
          <h4 className="font-bold text-slate-800 text-sm">{handle}</h4>
          <p className="text-slate-600 font-medium leading-snug mt-1 text-sm md:text-base">
            {content}
          </p>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-4 pl-14 md:pl-16">
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <ThumbsUp size={16} className="md:w-[18px] md:h-[18px]" />
        </button>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <ThumbsDown size={16} className="md:w-[18px] md:h-[18px]" />
        </button>
        <div className="flex-grow"></div>
        <button className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-orange transition-colors">
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-md shadow-orange-500/20">
                <Sparkles size={10} fill="currentColor" className="md:w-[12px] md:h-[12px]" />
            </div>
            Reply
        </button>
      </div>
    </div>
  );
}