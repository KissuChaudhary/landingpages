'use client';

import * as React from 'react';
import { cn } from '@/templates/magnetic-grid/lib/utils';

type KineticDotsBackgroundProps = React.ComponentProps<'div'> & {
  gridSpacing?: number;
  baseRadius?: number;
  maxRadius?: number;
  color?: string;
  waveSpeed?: number;
  interactive?: boolean;
};

function KineticDotsBackground({
  gridSpacing = 30,
  baseRadius = 0.8,
  maxRadius = 3.5,
  color = 'rgba(255, 255, 255, 1)',
  waveSpeed = 0.02,
  interactive = true,
  className,
  children,
  ...props
}: KineticDotsBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = React.useRef<number>(0);

  const stateRef = React.useRef({
    width: 0,
    height: 0,
    dpi: 1,
    time: 0,
    cols: 0,
    rows: 0,
    offsetX: 0,
    offsetY: 0,
    mouse: { x: -1000, y: -1000 },
    targetMouse: { x: -1000, y: -1000 },
  });

  const setSize = React.useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpi = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    canvas.width = rect.width * dpi;
    canvas.height = rect.height * dpi;
    
    const cols = Math.ceil(rect.width / gridSpacing) + 2;
    const rows = Math.ceil(rect.height / gridSpacing) + 2;

    stateRef.current.width = rect.width;
    stateRef.current.height = rect.height;
    stateRef.current.dpi = dpi;
    stateRef.current.cols = cols;
    stateRef.current.rows = rows;
    stateRef.current.offsetX = (rect.width - (cols - 1) * gridSpacing) / 2;
    stateRef.current.offsetY = (rect.height - (rows - 1) * gridSpacing) / 2;
  }, [gridSpacing]);

  const tick = React.useCallback(function tick() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { cols, rows, offsetX, offsetY, dpi, mouse, targetMouse } = stateRef.current;
    stateRef.current.time += waveSpeed;
    const t = stateRef.current.time;

    if (interactive) {
      if (mouse.x !== -1000 && targetMouse.x !== -1000) {
        mouse.x += (targetMouse.x - mouse.x) * 0.15;
        mouse.y += (targetMouse.y - mouse.y) * 0.15;
      } else if (targetMouse.x !== -1000) {
        mouse.x = targetMouse.x;
        mouse.y = targetMouse.y;
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpi, dpi);

    ctx.fillStyle = color;

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = offsetX + c * gridSpacing;
        const y = offsetY + r * gridSpacing;

        // Volumetric wave function
        const wave1 = Math.sin(x * 0.005 + t) * Math.cos(y * 0.005 - t);
        const wave2 = Math.sin(x * 0.003 - t * 0.8) * Math.cos(y * 0.004 + t * 0.5);
        let influence = (wave1 + wave2 + 2) / 4; // Normalize 0 to 1

        if (interactive && mouse.x !== -1000) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 250;
          if (dist < maxDist) {
            const mouseInfluence = Math.pow(1 - dist / maxDist, 2);
            // Mouse pushes the wave peak artificially
            influence = Math.min(1, influence + mouseInfluence * 0.8);
          }
        }

        const currentRadius = baseRadius + (maxRadius - baseRadius) * Math.pow(influence, 1.5);
        // Dim the smaller dots to heighten contrast
        ctx.globalAlpha = 0.1 + influence * 0.8;

        ctx.beginPath();
        ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
    animationFrameIdRef.current = requestAnimationFrame(tick);
  }, [baseRadius, color, gridSpacing, interactive, maxRadius, waveSpeed]);

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
      stateRef.current.targetMouse = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', handleResize);
    if (interactive) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [setSize, tick, interactive]);

  return (
    <div
      data-slot="kinetic-dots-background"
      ref={containerRef}
      className={cn('relative size-full overflow-hidden bg-[#030303]', className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 block size-full pointer-events-none"
      />
      
      {/* Cinematic noise overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-20 size-full">
        {children}
      </div>
    </div>
  );
}

export { KineticDotsBackground, type KineticDotsBackgroundProps };
