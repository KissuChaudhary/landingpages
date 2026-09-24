'use client';

import * as React from 'react';
import { cn } from '@/templates/magnetic-grid/lib/utils';

type SilkWavesBackgroundProps = React.ComponentProps<'div'> & {
  lineColor?: string;
  waveCount?: number;
  baseSpeed?: number;
  interactionForce?: number;
};

function SilkWavesBackground({
  lineColor = 'rgba(255, 255, 255, 0.45)', // very soft white
  waveCount = 20,
  baseSpeed = 0.003,
  interactionForce = 80,
  className,
  children,
  ...props
}: SilkWavesBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = React.useRef<number>(0);

  const stateRef = React.useRef({
    width: 0,
    height: 0,
    dpi: 1,
    time: 0,
    mouse: { x: -1000, y: -1000 },
    targetMouse: { x: -1000, y: -1000 },
    waves: [] as { phase: number; freq: number; amp: number; speed: number; yOffset: number }[],
  });

  const initWaves = React.useCallback(() => {
    const { height } = stateRef.current;
    
    const waves = [];
    for (let i = 0; i < waveCount; i++) {
      // Distribute waves with varying properties to create organic moiré
      waves.push({
        phase: Math.random() * Math.PI * 2,
        freq: 0.001 + Math.random() * 0.002, // ultra low frequency for smooth macroscopic curves
        amp: height * 0.15 + Math.random() * (height * 0.1), // large amplitudes
        speed: baseSpeed * (0.8 + Math.random() * 0.4),
        yOffset: height * 0.5 + (Math.random() - 0.5) * (height * 0.2), // clustered mostly around center
      });
    }
    stateRef.current.waves = waves;
  }, [waveCount, baseSpeed]);

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
    
    initWaves();
  }, [initWaves]);

  const tick = React.useCallback(function tick() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height, waves, dpi, mouse, targetMouse } = stateRef.current;
    stateRef.current.time += 1;
    const t = stateRef.current.time;

    // Fluid mouse movement (LERP)
    if (mouse.x !== -1000 && targetMouse.x !== -1000) {
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;
    } else if (targetMouse.x !== -1000) {
      mouse.x = targetMouse.x;
      mouse.y = targetMouse.y;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpi, dpi);

    // Render waves
    ctx.globalCompositeOperation = 'screen';
    
    waves.forEach((wave, i) => {
      ctx.beginPath();
      
      const waveOpacity = 0.05 + (i / waveCount) * 0.08; // Base faint opacity
      ctx.strokeStyle = lineColor;
      ctx.globalAlpha = waveOpacity;
      ctx.lineWidth = 1;
      
      const step = 5; // Path resolution
      
      for (let x = 0; x <= width; x += step) {
        let currentY = wave.yOffset + Math.sin(x * wave.freq + t * wave.speed + wave.phase) * wave.amp;
        
        // Mouse disturbance calculation
        if (mouse.x !== -1000) {
          const dx = x - mouse.x;
          // Calculate y distance to the theoretical wave center, not fixed mouse Y
          const dy = currentY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const maxDist = 300;
          if (dist < maxDist) {
            const influence = Math.pow(1 - dist / maxDist, 2);
            // Repel or attract the strings based on mouse movement organically
            currentY += Math.sin(dx * 0.01 + t * 0.05) * influence * interactionForce;
          }
        }
        
        if (x === 0) {
          ctx.moveTo(x, currentY);
        } else {
          ctx.lineTo(x, currentY);
        }
      }
      ctx.stroke();
    });

    ctx.restore();
    animationFrameIdRef.current = requestAnimationFrame(tick);
  }, [lineColor, interactionForce, waveCount]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setSize();
    tick();

    const handleResize = () => setSize();
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      stateRef.current.targetMouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      // Send target far away smoothly
      stateRef.current.targetMouse = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', handleResize);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [setSize, tick]);

  return (
    <div
      data-slot="silk-waves-background"
      ref={containerRef}
      className={cn(
        'relative size-full overflow-hidden bg-[#040404]',
        className
      )}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 block size-full pointer-events-none"
      />
      
      {/* Cinematic noise overlay */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.04] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-30 size-full">
        {children}
      </div>
    </div>
  );
}

export { SilkWavesBackground, type SilkWavesBackgroundProps };
