import React from 'react';

interface ExtendedLineProps {
  position: 'tl' | 'tr' | 'bl' | 'br';
  vertical?: boolean;
  horizontal?: boolean;
  className?: string;
  showCross?: boolean;
}

export const ExtendedLine: React.FC<ExtendedLineProps> = ({ 
  position, 
  vertical = false, 
  horizontal = false,
  className = '',
  showCross = true
}) => {
  const isTop = position.includes('t');
  const isLeft = position.includes('l');

  // Anchor exactly to the border line of the parent container (-1px).
  const anchorStyles = `
    ${isTop ? 'top-[-1px]' : 'bottom-[-1px]'}
    ${isLeft ? 'left-[-1px]' : 'right-[-1px]'}
  `;

  return (
    <div className={`absolute z-40 pointer-events-none flex items-center justify-center ${anchorStyles} ${className}`}>
        {/* Horizontal Extension */}
        {horizontal && (
            <div className={`absolute h-[1px] bg-zinc-200 w-[100vw] 
                ${isTop ? 'top-0' : 'bottom-0'} 
                ${isLeft ? 'right-0' : 'left-0'}
            `}></div>
        )}
        
        {/* Vertical Extension */}
        {vertical && (
            <div className={`absolute w-[1px] bg-zinc-200 h-[100vh] 
                ${isLeft ? 'left-0' : 'right-0'} 
                ${isTop ? 'bottom-0' : 'top-0'}
            `}></div>
        )}

        {/* The Intersection Cross Marker - Solid Gray Technical Style */}
        {showCross && (
             <div className="absolute w-4 h-4 flex items-center justify-center z-50 bg-white">
                 <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zinc-400">
                    <path d="M6 0V12" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M0 6H12" stroke="currentColor" strokeWidth="1.5" />
                 </svg>
             </div>
        )}
    </div>
  );
};