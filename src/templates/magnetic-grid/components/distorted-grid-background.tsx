'use client';

import * as React from 'react';
import { cn } from '@/templates/magnetic-grid/lib/utils';

type DistortedGridBackgroundProps = React.ComponentProps<'div'> & {
  gridSpacing?: number;
  distortionRadius?: number;
  distortionForce?: number;
  gridColor?: string;
  tension?: number;
  friction?: number;
};

function DistortedGridBackground({
  gridSpacing = 35,
  distortionRadius = 250,
  distortionForce = 60,
  gridColor = 'rgba(255, 255, 255, 0.1)',
  tension = 0.08,
  friction = 0.85,
  className,
  children,
  ...props
}: DistortedGridBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = React.useRef<number>(0);

  const stateRef = React.useRef({
    points: [] as { x: number; y: number; bx: number; by: number; vx: number; vy: number }[],
    cols: 0,
    rows: 0,
    width: 0,
    height: 0,
    dpi: 1,
    mouse: { x: -1000, y: -1000 },
  });

  const initGrid = React.useCallback(() => {
    const { width, height } = stateRef.current;
    
    // Create points stretching beyond the screen to prevent edge artifacting
    const overscan = 2; 
    const cols = Math.ceil(width / gridSpacing) + overscan * 2;
    const rows = Math.ceil(height / gridSpacing) + overscan * 2;
    
    const offsetX = (width - (cols - 1) * gridSpacing) / 2;
    const offsetY = (height - (rows - 1) * gridSpacing) / 2;

    const points = [];
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = offsetX + c * gridSpacing;
        const y = offsetY + r * gridSpacing;
        points.push({ x, y, bx: x, by: y, vx: 0, vy: 0 });
      }
    }

    stateRef.current.cols = cols;
    stateRef.current.rows = rows;
    stateRef.current.points = points;
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

    const { points, cols, rows, mouse, dpi, width, height } = stateRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpi, dpi);

    // Physics step
    points.forEach((p) => {
      // Calculate repulsion from mouse
      let targetX = p.bx;
      let targetY = p.by;

      if (mouse.x !== -1000) {
        const dx = p.bx - mouse.x;
        const dy = p.by - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < distortionRadius) {
          const power = Math.pow((distortionRadius - dist) / distortionRadius, 2);
          targetX = p.bx + (dx / dist) * power * distortionForce;
          targetY = p.by + (dy / dist) * power * distortionForce;
        }
      }

      // Spring to target
      p.vx += (targetX - p.x) * tension;
      p.vy += (targetY - p.y) * tension;
      
      p.vx *= friction;
      p.vy *= friction;

      p.x += p.vx;
      p.y += p.vy;
    });

    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw vertical lines (columns)
    ctx.beginPath();
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const idx = c * rows + r;
        const p = points[idx];
        if (r === 0) {
          ctx.moveTo(p.x, p.y);
        } else {
          ctx.lineTo(p.x, p.y);
        }
      }
    }
    ctx.stroke();

    // Draw horizontal lines (rows)
    ctx.beginPath();
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = c * rows + r;
        const p = points[idx];
        if (c === 0) {
          ctx.moveTo(p.x, p.y);
        } else {
          ctx.lineTo(p.x, p.y);
        }
      }
    }
    ctx.stroke();

    ctx.restore();
    animationFrameIdRef.current = requestAnimationFrame(tick);
  }, [distortionRadius, distortionForce, friction, gridColor, tension]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setSize();
    tick();

    const handleResize = () => setSize();
    
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
      data-slot="distorted-grid-background"
      ref={containerRef}
      className={cn(
        'relative size-full overflow-hidden bg-[#030303]',
        className
      )}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 block size-full pointer-events-none"
      />
      
      {/* Soft Vignette Mask */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-60"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, #000000 100%)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-20 size-full">
        {children}
      </div>
    </div>
  );
}

export { DistortedGridBackground, type DistortedGridBackgroundProps };
