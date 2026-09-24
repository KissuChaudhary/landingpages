import React from 'react';
import { PARTNERS } from '../constants';
import { Box, Hexagon, Triangle, Circle } from 'lucide-react';

const LogoItem: React.FC<{ name: string }> = ({ name }) => {
  let Icon = Box;
  if (name.includes('Nova')) Icon = Hexagon;
  if (name.includes('Pluto')) Icon = Triangle;
  if (name.includes('Vita')) Icon = Circle;

  return (
    <div className="flex items-center gap-2 opacity-30 grayscale hover:grayscale-0 hover:opacity-60 transition-all duration-500 cursor-default group">
      <Icon className="fill-current group-hover:scale-110 transition-transform" size={20} />
      <span className="text-xl font-bold tracking-tight">{name}</span>
    </div>
  );
};

export const LogoStrip: React.FC = () => {
  return (
    <div className="w-full overflow-hidden py-16 md:py-24 relative bg-transparent">
       {/* Gradient masks for fading edges - using specific hex #fcfbf9 to match body */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#fcfbf9] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#fcfbf9] to-transparent z-10 pointer-events-none"></div>

      <div className="flex items-center justify-center flex-wrap gap-8 md:gap-20 px-6 max-w-6xl mx-auto">
        {PARTNERS.map((partner, idx) => (
          <LogoItem key={`${partner}-${idx}`} name={partner} />
        ))}
      </div>
    </div>
  );
};