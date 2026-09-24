import React from 'react';

interface CrosshairProps {
  className?: string;
}

export const Crosshair: React.FC<CrosshairProps> = ({ className = '' }) => {
  return (
    <div className={`absolute w-6 h-6 flex items-center justify-center pointer-events-none z-50 ${className}`}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 24 24" 
        fill="none" 
        className="text-zinc-300"
      >
        <path d="M12 4V20" stroke="currentColor" strokeWidth="1" />
        <path d="M4 12H20" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
};