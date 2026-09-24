'use client';

import * as React from 'react';
import { cn } from '@/templates/magnetic-grid/lib/utils';

type SpotlightDotBackgroundProps = React.ComponentProps<'div'> & {
  dotSize?: number;
  dotSpacing?: number;
  dotColor?: string;
  spotlightSize?: number;
  spotlightColor?: string;
  backgroundColor?: string;
};

function SpotlightDotBackground({
  dotSize = 1.5,
  dotSpacing = 24,
  dotColor = 'rgba(255, 255, 255, 0.1)',
  spotlightSize = 400,
  spotlightColor = 'rgba(255, 255, 255, 0.05)',
  backgroundColor = '#050505',
  className,
  children,
  ...props
}: SpotlightDotBackgroundProps) {
  const [mousePos, setMousePos] = React.useState({ x: -1000, y: -1000 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    
    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('relative size-full overflow-hidden', className)}
      style={{ backgroundColor }}
      {...props}
    >
      {/* Base Dots */}
      <div
        className="absolute inset-0 size-full"
        style={{
          backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
        }}
      />

      {/* Ambient Spotlight overlay */}
      <div
        className="absolute inset-0 size-full pointer-events-none transition-opacity duration-300 ease-out"
        style={{
          background: `radial-gradient(${spotlightSize}px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Brightened Dots Mask */}
      <div
        className="absolute inset-0 size-full pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.7) ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
          maskImage: `radial-gradient(${spotlightSize * 0.7}px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(${spotlightSize * 0.7}px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 size-full">
        {children}
      </div>
    </div>
  );
}

export { SpotlightDotBackground, type SpotlightDotBackgroundProps };
