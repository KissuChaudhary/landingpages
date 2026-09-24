'use client';

import * as React from 'react';
import { cn } from '@/templates/magnetic-grid/lib/utils';

type Beam = {
  x: number;
  y: number;
  length: number;
  speed: number;
  dir: 'h' | 'v';
  color: string;
  isPositive: boolean;
};

type BeamGridBackgroundProps = React.ComponentProps<'div'> & {
  gridSpacing?: number;
  beamCount?: number;
  beamColor?: string;
  gridColor?: string;
};

function BeamGridBackground({
  gridSpacing = 40,
  beamCount = 20,
  beamColor = 'rgba(255, 255, 255, 0.8)',
  gridColor = 'rgba(255, 255, 255, 0.04)',
  className,
  children,
  ...props
}: BeamGridBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = React.useRef<number>(0);

  const stateRef = React.useRef({
    beams: [] as Beam[],
    width: 0,
    height: 0,
    dpi: 1,
  });

  const initBeams = React.useCallback(() => {
    const { width, height } = stateRef.current;
    if (width === 0 || height === 0) return;

    stateRef.current.beams = Array.from({ length: beamCount }).map(() => {
      const dir = Math.random() > 0.5 ? 'h' : 'v';
      const isPositive = Math.random() > 0.5;
      
      let x, y;
      if (dir === 'h') {
        const row = Math.floor(Math.random() * (height / gridSpacing));
        y = row * gridSpacing;
        x = Math.random() * width;
      } else {
        const col = Math.floor(Math.random() * (width / gridSpacing));
        x = col * gridSpacing;
        y = Math.random() * height;
      }

      return {
        x,
        y,
        length: Math.random() * 150 + 50,
        speed: Math.random() * 2 + 1,
        dir,
        isPositive,
        color: beamColor,
      };
    });
  }, [beamCount, gridSpacing, beamColor]);

  const setSize = React.useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const rect = container.getBoundingClientRect();
    const dpi = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    canvas.width = rect.width * dpi;
    canvas.height = rect.height * dpi;
    stateRef.current.width = rect.width;
    stateRef.current.height = rect.height;
    stateRef.current.dpi = dpi;
    
    initBeams();
  }, [initBeams]);

  const tick = React.useCallback(function tick() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height, beams, dpi } = stateRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpi, dpi);

    // Draw Grid
    ctx.beginPath();
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += gridSpacing) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += gridSpacing) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // Update & Draw Beams
    beams.forEach((beam) => {
      // Move beam
      if (beam.dir === 'h') {
        beam.x += beam.isPositive ? beam.speed : -beam.speed;
        if (beam.isPositive && beam.x - beam.length > width) beam.x = -beam.length;
        if (!beam.isPositive && beam.x + beam.length < 0) beam.x = width + beam.length;
      } else {
        beam.y += beam.isPositive ? beam.speed : -beam.speed;
        if (beam.isPositive && beam.y - beam.length > height) beam.y = -beam.length;
        if (!beam.isPositive && beam.y + beam.length < 0) beam.y = height + beam.length;
      }

      // Draw beam
      const endX = beam.dir === 'h' ? (beam.isPositive ? beam.x - beam.length : beam.x + beam.length) : beam.x;
      const endY = beam.dir === 'v' ? (beam.isPositive ? beam.y - beam.length : beam.y + beam.length) : beam.y;

      const gradient = ctx.createLinearGradient(beam.x, beam.y, endX, endY);
      gradient.addColorStop(0, beam.color);
      gradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.moveTo(beam.x, beam.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      // Draw bright head
      ctx.beginPath();
      ctx.fillStyle = '#ffffff';
      ctx.arc(beam.x, beam.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
    animationFrameIdRef.current = requestAnimationFrame(tick);
  }, [gridColor, gridSpacing]);

  React.useEffect(() => {
    setSize();
    tick();

    window.addEventListener('resize', setSize);
    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [setSize, tick]);

  return (
    <div
      data-slot="beam-grid-background"
      ref={containerRef}
      className={cn(
        'relative size-full overflow-hidden bg-[#000000]',
        className
      )}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 block size-full pointer-events-none"
      />
      {/* Premium Vignette / Fade out mask */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, #000000 90%)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-20 size-full">
        {children}
      </div>
    </div>
  );
}

export { BeamGridBackground, type BeamGridBackgroundProps };
