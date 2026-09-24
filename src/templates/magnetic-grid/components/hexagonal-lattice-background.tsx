'use client';

import * as React from 'react';
import { cn } from '@/templates/magnetic-grid/lib/utils';

type HexagonProps = {
  x: number;
  y: number;
  radius: number;
  phase: number;
};

type HexagonalLatticeBackgroundProps = React.ComponentProps<'div'> & {
  hexSize?: number;
  glowColor?: string;
  gridColor?: string;
  mouseGlowRadius?: number;
  animationSpeed?: number;
};

function HexagonalLatticeBackground({
  hexSize = 25,
  glowColor = 'rgba(255, 255, 255, 0.4)',
  gridColor = 'rgba(255, 255, 255, 0.05)',
  mouseGlowRadius = 250,
  animationSpeed = 0.015,
  className,
  children,
  ...props
}: HexagonalLatticeBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = React.useRef<number>(0);

  const stateRef = React.useRef({
    width: 0,
    height: 0,
    dpi: 1,
    time: 0,
    mouse: { x: -1000, y: -1000 },
    mouseVelocity: { x: 0, y: 0 },
    targetMouse: { x: -1000, y: -1000 },
    hexagons: [] as HexagonProps[],
  });

  const initGrid = React.useCallback(() => {
    const { width, height } = stateRef.current;
    const hexWidth = Math.sqrt(3) * hexSize;
    const hexHeight = 2 * hexSize;
    
    // Create points stretching beyond the screen to prevent edge artifacting
    const cols = Math.ceil(width / hexWidth) + 2;
    const rows = Math.ceil(height / (hexHeight * 0.75)) + 2;
    
    const hexes: HexagonProps[] = [];
    
    for (let r = -1; r < rows; r++) {
      for (let c = -1; c < cols; c++) {
        const x = c * hexWidth + (r % 2 === 0 ? 0 : hexWidth / 2);
        const y = r * hexHeight * 0.75;
        hexes.push({
          x,
          y,
          radius: hexSize,
          phase: Math.random() * Math.PI * 2, // random phase for ambient breathing
        });
      }
    }
    
    stateRef.current.hexagons = hexes;
  }, [hexSize]);

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

    const { width, height, hexagons, dpi, mouse, targetMouse } = stateRef.current;
    stateRef.current.time += animationSpeed;
    const t = stateRef.current.time;

    // Fluid mouse movement (LERP)
    if (mouse.x !== -1000 && targetMouse.x !== -1000) {
      mouse.x += (targetMouse.x - mouse.x) * 0.15;
      mouse.y += (targetMouse.y - mouse.y) * 0.15;
    } else if (targetMouse.x !== -1000) {
      mouse.x = targetMouse.x;
      mouse.y = targetMouse.y;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpi, dpi);

    // Render underlying spotlight
    if (mouse.x !== -1000) {
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouseGlowRadius);
      gradient.addColorStop(0, glowColor);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1.0;
    }

    // Helper to draw a single hexagon path
    const drawHexPath = (x: number, y: number, radius: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 180) * (60 * i - 30); // Pointy top
        const px = x + radius * Math.cos(angle);
        const py = y + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    // Draw the entire lattice
    ctx.lineWidth = 1;
    ctx.lineJoin = 'round';
    
    hexagons.forEach((hex) => {
      // Calculate distance to mouse for focal effects
      const dx = mouse.x - hex.x;
      const dy = mouse.y - hex.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      let baseAlpha = 0;
      let lineAlpha = 0.05; // Base faint grid
      let fillAlpha = 0;

      // Global slow breathing effect
      const ambientPulse = (Math.sin(t + hex.phase) + 1) / 2; // 0 to 1
      lineAlpha += ambientPulse * 0.03;

      // Mouse proximity effects
      if (dist < mouseGlowRadius) {
        const influence = 1 - Math.pow(dist / mouseGlowRadius, 2); // Ease out
        lineAlpha += influence * 0.6; // Brigthen edges near cursor
        
        // Let some hexes randomly light up entirely under the cursor
        if (ambientPulse > 0.95) {
          fillAlpha = influence * (ambientPulse - 0.95) * 20 * 0.15;
        }
      }

      ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
      drawHexPath(hex.x, hex.y, hex.radius);
      ctx.stroke();

      if (fillAlpha > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${fillAlpha})`;
        ctx.fill();
      }
    });

    ctx.restore();
    animationFrameIdRef.current = requestAnimationFrame(tick);
  }, [animationSpeed, glowColor, mouseGlowRadius]);

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
      data-slot="hexagonal-lattice-background"
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
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-50"
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, #000000 100%)',
        }}
      />

      {/* Cinematic noise overlay */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] mix-blend-screen"
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

export { HexagonalLatticeBackground, type HexagonalLatticeBackgroundProps };
