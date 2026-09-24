'use client';

import * as React from 'react';
import { cn } from '@/templates/magnetic-grid/lib/utils';

type OrbitalRing = {
  radius: number;
  speed: number;
  dotCount: number;
  offsetAngle: number;
  direction: 1 | -1;
};

type OrbitalSystemBackgroundProps = React.ComponentProps<'div'> & {
  ringCount?: number;
  baseRadius?: number;
  radiusGap?: number;
  color?: string;
  centralGlow?: boolean;
};

function OrbitalSystemBackground({
  ringCount = 12,
  baseRadius = 50,
  radiusGap = 40,
  color = 'rgba(255, 255, 255, 0.4)',
  centralGlow = true,
  className,
  children,
  ...props
}: OrbitalSystemBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = React.useRef<number>(0);

  const stateRef = React.useRef({
    width: 0,
    height: 0,
    dpi: 1,
    time: 0,
    rings: [] as OrbitalRing[],
    mouse: { x: -1000, y: -1000 },
    targetMouse: { x: -1000, y: -1000 },
    center: { x: 0, y: 0 },
  });

  const initRings = React.useCallback(() => {
    const rings: OrbitalRing[] = [];
    for (let i = 0; i < ringCount; i++) {
        // Inner rings spin faster, outer rings spin slower.
        const r = baseRadius + i * radiusGap * (1 + i * 0.05); // slightly expanding gap
        const speed = (0.003 + Math.random() * 0.002) * (1 - i / ringCount * 0.6);
        const direction = Math.random() > 0.5 ? 1 : -1;
        const circumference = 2 * Math.PI * r;
        
        // Number of dots scales with ring size, but with some variation
        const dotCount = Math.floor((circumference / 40) * (0.8 + Math.random() * 0.4));
        
        rings.push({
            radius: r,
            speed,
            direction,
            dotCount,
            offsetAngle: Math.random() * Math.PI * 2,
        });
    }
    stateRef.current.rings = rings;
  }, [baseRadius, radiusGap, ringCount]);

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
    stateRef.current.center = { x: rect.width / 2, y: rect.height / 2 };
  }, []);

  const tick = React.useCallback(function tick() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height, dpi, mouse, targetMouse, rings, center } = stateRef.current;
    stateRef.current.time += 1;
    const t = stateRef.current.time;

    // Smooth focal center interpolation towards cursor
    let focalX = center.x;
    let focalY = center.y;

    if (targetMouse.x !== -1000) {
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;
      // Drift the gravitational center slightly towards the mouse, clamped so it doesn't leave
      focalX = center.x + (mouse.x - center.x) * 0.15;
      focalY = center.y + (mouse.y - center.y) * 0.15;
    } else {
        mouse.x += (center.x - mouse.x) * 0.05;
        mouse.y += (center.y - mouse.y) * 0.05;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpi, dpi);

    if (centralGlow) {
        const glow = ctx.createRadialGradient(focalX, focalY, 0, focalX, focalY, rings[rings.length-1].radius);
        glow.addColorStop(0, 'rgba(255,255,255,0.06)');
        glow.addColorStop(0.3, 'rgba(255,255,255,0.02)');
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
    }

    ctx.fillStyle = color;

    rings.forEach((ring, index) => {
        const ringAngle = ring.offsetAngle + t * ring.speed * ring.direction;
        
        // Rings independently 'breathe' in and out
        const breath = Math.sin(t * 0.01 + index) * 5;
        const currentRadius = ring.radius + breath;

        for (let j = 0; j < ring.dotCount; j++) {
            const angle = ringAngle + (j / ring.dotCount) * Math.PI * 2;
            const x = focalX + Math.cos(angle) * currentRadius;
            const y = focalY + Math.sin(angle) * currentRadius;

            // Particles fade out on the extremities 
            let opacity = 1 - (index / ringCount) * 0.6;
            
            // Random twinkling
            const twinkle = (Math.sin(t * 0.05 + j + index * 10) + 1) / 2;
            opacity *= (0.4 + 0.6 * twinkle);

            ctx.globalAlpha = opacity;
            ctx.beginPath();
            
            // Inner dots are slightly larger
            const dotSize = index < 3 ? 1.5 : 1.0;
            ctx.arc(x, y, dotSize, 0, Math.PI * 2);
            ctx.fill();
        }

        // Faint connecting ring path
        ctx.globalAlpha = 0.05; // extremely faint
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(focalX, focalY, currentRadius, 0, Math.PI * 2);
        ctx.stroke();
    });

    ctx.restore();
    animationFrameIdRef.current = requestAnimationFrame(tick);
  }, [centralGlow, color, ringCount]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setSize();
    initRings();
    tick();

    const handleResize = () => {
        setSize();
        initRings(); // Re-calc densities on resize
    };
    
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
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [setSize, tick, initRings]);

  return (
    <div
      data-slot="orbital-system-background"
      ref={containerRef}
      className={cn('relative size-full overflow-hidden bg-[#000000]', className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 block size-full pointer-events-none"
      />
      <div className="relative z-10 size-full">
        {children}
      </div>
    </div>
  );
}

export { OrbitalSystemBackground, type OrbitalSystemBackgroundProps };
