import React from 'react';

interface FrameProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  noPadding?: boolean;
}

// "Technical Minimalism" Frame
export const Frame: React.FC<FrameProps> = ({ children, className = '', label, noPadding = false }) => {
  return (
    <div className={`relative border border-border bg-white shadow-sm group overflow-hidden ${className}`}>
      {/* Corner Brackets - Black/Dark Grey for Light Mode precision */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/80 z-20"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/80 z-20"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/80 z-20"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/80 z-20"></div>

      {/* Label (Optional) */}
      {label && (
        <div className="absolute top-0 left-0 pt-3 pl-3 z-10">
          <span className="text-[9px] font-mono uppercase tracking-widest text-muted bg-white px-1 border border-border">
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