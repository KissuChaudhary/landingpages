import { ReactNode } from 'react';

interface CardWrapperProps {
  children: ReactNode;
  title: string;
}

export default function CardWrapper({ children, title }: CardWrapperProps) {
  return (
    <div className="relative w-full h-full bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-2 border-white overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
      {/* Top 75% for animation */}
      <div className="relative flex-[3] w-full flex items-center justify-center overflow-hidden bg-[#F8F9FA] p-6">
        {/* Subtle inner glow/shadow for depth */}
        <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.02)] pointer-events-none" />
        
        {/* Top fade (subtle blend from top edge) */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/80 via-white/20 to-transparent pointer-events-none z-10" />
        
        {children}
        
        {/* Bottom fade: Deep smooth transition from gray into white */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/90 via-white/40 to-transparent pointer-events-none z-10" />
      </div>
      
      {/* Bottom text area */}
      <div className="relative flex-1 flex items-center justify-center p-6 bg-white">
        {/* Subtle top shadow to help the blend */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-100/50 to-transparent" />
        <p className="text-[13px] leading-relaxed font-medium text-gray-800 text-center max-w-[85%]">
          {title}
        </p>
      </div>
    </div>
  );
}
