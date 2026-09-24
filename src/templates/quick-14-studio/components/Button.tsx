import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'purple';
  hasShortcut?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  hasShortcut = false,
  className = '',
  ...props 
}) => {
  
  if (variant === 'primary') {
    return (
      <button 
        id="primary-cta-btn"
        className={`
          group relative inline-flex items-center gap-3 px-8 py-3.5 
          bg-gradient-to-b from-orange-300 to-orange-400 
          text-stone-900 font-normal text-lg rounded-lg
          transition-all duration-200 ease-in-out
          shadow-hero hover:-translate-y-0.5
          active:translate-y-[1px] active:shadow-hero-active
          border border-orange-400
          ${className}
        `}
        style={{ WebkitTextStrokeWidth: '0.2px' }}
        {...props}
      >
        <span>{children}</span>
        {hasShortcut && (
            <div className="hidden sm:flex items-center justify-center w-6 h-6 bg-orange-200/50 rounded border border-orange-600/20 text-xs font-bold uppercase text-orange-900/70">
                B
            </div>
        )}
      </button>
    );
  }

  if (variant === 'purple') {
    return (
      <button 
        id="primary-cta-btn"
        className={`
          group relative inline-flex items-center gap-3 px-8 py-3.5 
          bg-gradient-to-b from-violet-300 to-violet-400 
          text-violet-950 font-normal text-lg rounded-lg
          transition-all duration-200 ease-in-out
          shadow-hero hover:-translate-y-0.5
          active:translate-y-[1px] active:shadow-hero-active
          border border-violet-400
          ${className}
        `}
        style={{ WebkitTextStrokeWidth: '0.2px' }}
        {...props}
      >
        <span>{children}</span>
      </button>
    );
  }

  if (variant === 'glass') {
    return (
        <button 
        className={`
          px-4 py-2 rounded-full text-sm font-medium
          text-stone-600 hover:text-stone-900
          hover:bg-stone-100/50 transition-colors
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    )
  }

  return (
    <button 
      className={`px-6 py-3 rounded-lg font-medium transition-colors ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;