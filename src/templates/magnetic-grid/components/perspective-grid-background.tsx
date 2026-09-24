'use client';

import * as React from 'react';
import { cn } from '@/templates/magnetic-grid/lib/utils';

type PerspectiveGridBackgroundProps = React.ComponentProps<'div'> & {
  gridColor?: string;
  glowColor?: string;
  speed?: number;
  waveStrength?: number;
  camHeight?: number;
  fov?: number;
};

function PerspectiveGridBackground({
  gridColor = 'rgba(255, 255, 255, 0.08)',
  glowColor = 'rgba(100, 116, 139, 0.15)',
  speed = 15,
  waveStrength = 20,
  camHeight = 120,
  fov = 300,
  className,
  children,
  ...props
}: PerspectiveGridBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = React.useRef<number>(0);

  const stateRef = React.useRef({
    width: 0,
    height: 0,
    dpi: 1,
    time: 0,
    mouse: { x: -1000, y: -1000 },
  });

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
  }, []);

  const tick = React.useCallback(function tick() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height, dpi, mouse } = stateRef.current;
    stateRef.current.time += 0.015;
    const t = stateRef.current.time;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpi, dpi);

    const centerX = width / 2;
    const horizonY = height * 0.45;

    const horizonGlow = ctx.createRadialGradient(centerX, horizonY, 0, centerX, horizonY, width * 0.6);
    horizonGlow.addColorStop(0, glowColor);
    horizonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = horizonGlow;
    ctx.fillRect(0, 0, width, height);

    const spacingZ = 45;
    const offsetZ = -(t * speed) % spacingZ;
    const spacingX = 45;

    const linesXCount = Math.ceil(width / 30);
    const gridCols = linesXCount + 10;
    const gridRows = 30;

    const project = (worldX: number, worldY: number, worldZ: number) => {
      const scale = fov / (fov + worldZ);
      const sx = centerX + worldX * scale;
      const sy = horizonY + (camHeight + worldY) * scale;
      return { sx, sy, scale };
    };

    const points3D: { sx: number; sy: number; scale: number; opacity: number }[][] = [];

    for (let c = -gridCols / 2; c <= gridCols / 2; c++) {
      const colPoints = [];
      const worldX = c * spacingX;

      for (let r = 0; r < gridRows; r++) {
        const worldZ = r * spacingZ + offsetZ;
        let worldY = Math.sin(worldX * 0.004 + t * 1.5) * Math.cos(worldZ * 0.003 - t * 0.8) * waveStrength;

        const baseProj = project(worldX, worldY, worldZ);
        if (mouse.x !== -1000) {
          const dx = mouse.x - baseProj.sx;
          const dy = mouse.y - baseProj.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 220) {
            const influence = 1 - dist / 220;
            worldY += influence * influence * 35;
          }
        }

        const proj = project(worldX, worldY, worldZ);
        const opacityMultiplier = Math.max(0, Math.min(1, proj.scale * 3.5));
        colPoints.push({
          sx: proj.sx,
          sy: proj.sy,
          scale: proj.scale,
          opacity: opacityMultiplier,
        });
      }
      points3D.push(colPoints);
    }

    ctx.strokeStyle = gridColor;

    for (let r = 0; r < gridRows; r++) {
      ctx.beginPath();
      let first = true;
      for (let c = 0; c < points3D.length; c++) {
        const p = points3D[c][r];
        if (!p) continue;
        
        if (first) {
          ctx.moveTo(p.sx, p.sy);
          first = false;
        } else {
          ctx.lineTo(p.sx, p.sy);
        }
      }
      const rowAvgOpacity = points3D[0][r] ? points3D[0][r].opacity : 0.5;
      ctx.globalAlpha = rowAvgOpacity * 0.9;
      ctx.lineWidth = Math.max(0.5, (points3D[0][r] ? points3D[0][r].scale : 1) * 1.2);
      ctx.stroke();
    }

    for (let c = 0; c < points3D.length; c++) {
      ctx.beginPath();
      let first = true;
      for (let r = 0; r < gridRows; r++) {
        const p = points3D[c][r];
        if (!p) continue;

        if (first) {
          ctx.moveTo(p.sx, p.sy);
          first = false;
        } else {
          ctx.lineTo(p.sx, p.sy);
        }
      }
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    ctx.restore();
    animationFrameIdRef.current = requestAnimationFrame(tick);
  }, [camHeight, fov, glowColor, gridColor, speed, waveStrength]);

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
      data-slot="perspective-grid-background"
      ref={containerRef}
      className={cn('relative size-full overflow-hidden bg-[#020202]', className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 block size-full pointer-events-none"
      />

      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 35%, #020202 95%)',
        }}
      />

      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-30 size-full">
        {children}
      </div>
    </div>
  );
}

export { PerspectiveGridBackground, type PerspectiveGridBackgroundProps };
