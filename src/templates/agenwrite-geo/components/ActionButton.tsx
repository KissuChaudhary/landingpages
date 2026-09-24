import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  showArrow?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  showArrow = false,
  ...props 
}) => {
  const baseStyles = "relative px-6 py-3 font-mono text-xs md:text-sm uppercase tracking-wider transition-all active:scale-[0.98] group flex items-center gap-3 whitespace-nowrap";
  
  // Primary: Soft white / zinc-100 Background, Black Text
  const primaryStyles = "bg-zinc-100 text-black hover:bg-white";
  
  // Secondary: Subtle dark zinc Background, zinc-300 Text
  const secondaryStyles = "bg-zinc-950/80 text-zinc-300 border border-zinc-800 hover:border-zinc-750 hover:text-zinc-100 hover:bg-zinc-900";

  const styles = variant === 'primary' ? primaryStyles : secondaryStyles;
  // Brackets color matches the text color mostly
  const bracketColor = variant === 'primary' ? 'border-zinc-400' : 'border-zinc-600';

  return (
    <button className={`${baseStyles} ${styles} ${className}`} {...props}>
      {/* Top Left Bracket */}
      <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${bracketColor} z-20`}></div>
      
      {/* Top Right Bracket */}
      <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${bracketColor} z-20`}></div>
      
      {/* Bottom Left Bracket */}
      <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${bracketColor} z-20`}></div>
      
      {/* Bottom Right Bracket */}
      <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${bracketColor} z-20`}></div>
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {showArrow && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
      </span>
    </button>
  );
};