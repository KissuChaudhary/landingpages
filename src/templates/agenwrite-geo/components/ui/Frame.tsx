import React from 'react';

interface FrameProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  noPadding?: boolean;
}

// "Technical Minimalism" Frame - Dark Mode
export const Frame: React.FC<FrameProps> = ({ children, className = '', label, noPadding = false }) => {
  return (
    <div className={`relative border border-border bg-zinc-900/20 backdrop-blur-sm shadow-sm group overflow-hidden ${className}`}>
      {/* Corner Brackets - Subtle Zinc for Dark Mode */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-700 z-20 opacity-50"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-700 z-20 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-700 z-20 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-700 z-20 opacity-50"></div>

      {/* Label (Optional) */}
      {label && (
        <div className="absolute top-0 left-0 pt-3 pl-3 z-10">
          <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 bg-background/50 px-1 border border-zinc-800">
            {label}
          </span>
        </div>
      )}

      {/* Content */}
      <div className={`${noPadding ? '' : 'p-6'} h-full`}>
        {children}
      </div>
    </div>
  );
};