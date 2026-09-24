'use client';

import * as React from 'react';
import { cn } from '@/templates/magnetic-grid/lib/utils';

type Point = {
  x: number;
  y: number;
  cx: number;
  cy: number;
  vx: number;
  vy: number;
};

type MagneticGridBackgroundProps = React.ComponentProps<'div'> & {
  gridSpacing?: number;
  shape?: 'dot' | 'cross' | 'circle';
  size?: number;
  color?: string;
  glowColor?: string;
  maxDistance?: number;
  spring?: number;
  friction?: number;
  ambientWave?: boolean;
  mouseGlow?: boolean;
};

function MagneticGridBackground({
  gridSpacing = 40,
  shape = 'cross',
  size = 4,
  color = '#ffffff',
  glowColor = 'rgba(255, 255, 255, 0.15)',
  maxDistance = 300,
  spring = 0.06,
  friction = 0.88,
  ambientWave = true,
  mouseGlow = true,
  className,
  children,
  ...props
}: MagneticGridBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = React.useRef<number>(0);

  const stateRef = React.useRef({
    points: [] as Point[],
    width: 0,
    height: 0,
    dpi: 1,
    time: 0,
    mouse: { x: -1000, y: -1000 },
  });

  const initGrid = React.useCallback(() => {
    const { width, height } = stateRef.current;
    const newPoints: Point[] = [];
    const cols = Math.ceil(width / gridSpacing) + 2;
    const rows = Math.ceil(height / gridSpacing) + 2;
    
    const offsetX = (width - (cols - 1) * gridSpacing) / 2;
    const offsetY = (height - (rows - 1) * gridSpacing) / 2;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = offsetX + i * gridSpacing;
        const y = offsetY + j * gridSpacing;
        newPoints.push({
          x, y,
          cx: x, cy: y,
          vx: 0, vy: 0
        });
      }
    }
    stateRef.current.points = newPoints;
  }, [gridSpacing]);

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
    
    initGrid();
  }, [initGrid]);

  const tick = React.useCallback(function tick() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height, points, mouse, dpi } = stateRef.current;
    stateRef.current.time += 0.02;
    const t = stateRef.current.time;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpi, dpi);

    // Draw mouse glow
    if (mouseGlow && mouse.x !== -1000) {
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, maxDistance);
      gradient.addColorStop(0, glowColor);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    points.forEach((p) => {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      let targetX = p.x;
      let targetY = p.y;
      
      // Mouse repel
      if (dist < maxDistance && mouse.x !== -1000) {
        const influence = 1 - dist / maxDistance;
        const force = influence * 20; // Max displacement
        targetX = p.x - (dx / dist) * force;
        targetY = p.y - (dy / dist) * force;
      }
      
      // Ambient wave
      if (ambientWave) {
        targetX += Math.sin(p.x * 0.01 + t) * 3;
        targetY += Math.cos(p.y * 0.01 + t * 0.8) * 3;
      }
      
      // Spring physics
      p.vx += (targetX - p.cx) * spring;
      p.vy += (targetY - p.cy) * spring;
      
      p.vx *= friction;
      p.vy *= friction;
      
      p.cx += p.vx;
      p.cy += p.vy;
      
      // Calculate draw properties
      const currentDistToMouse = Math.sqrt((mouse.x - p.cx)**2 + (mouse.y - p.cy)**2);
      const influence = Math.max(0, 1 - currentDistToMouse / maxDistance);
      
      const opacity = 0.15 + influence * 0.6;
      const currentScale = 1 + influence * 0.5;
      const currentSize = size * currentScale;

      ctx.globalAlpha = opacity;
      
      if (shape === 'cross') {
        ctx.beginPath();
        ctx.moveTo(p.cx - currentSize / 2, p.cy);
        ctx.lineTo(p.cx + currentSize / 2, p.cy);
        ctx.moveTo(p.cx, p.cy - currentSize / 2);
        ctx.lineTo(p.cx, p.cy + currentSize / 2);
        ctx.lineWidth = 1.5;
        ctx.stroke();
      } else if (shape === 'dot') {
        ctx.beginPath();
        ctx.arc(p.cx, p.cy, currentSize / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (shape === 'circle') {
        ctx.beginPath();
        ctx.arc(p.cx, p.cy, currentSize / 2, 0, Math.PI * 2);
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    });

    ctx.restore();
    animationFrameIdRef.current = requestAnimationFrame(tick);
  }, [ambientWave, color, friction, glowColor, maxDistance, mouseGlow, shape, size, spring]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    setSize();
    tick();

    const handleResize = () => {
      setSize();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      stateRef.current.mouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      stateRef.current.mouse = { x: -1000, y: -1000 };
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
      data-slot="magnetic-grid-background"
      ref={containerRef}
      className={cn(
        'relative size-full overflow-hidden bg-[#050505]',
        className
      )}
      {...props}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 block size-full pointer-events-none"
      />

      {/* Noise Overlay for premium texture */}
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

export { MagneticGridBackground, type MagneticGridBackgroundProps };
