'use client';

import * as React from 'react';
import { cn } from '@/templates/magnetic-grid/lib/utils';

type Point = { x: number; y: number };

type Crawler = {
  id: number;
  points: Point[];
  maxSegments: number;
  speed: number;
  progress: number; // 0 to 1 between the last two points
  dirX: number;
  dirY: number;
  strength: number;
};

type CircuitTraceBackgroundProps = React.ComponentProps<'div'> & {
  gridSpacing?: number;
  maxCrawlers?: number;
  traceColor?: string;
  gridColor?: string;
  spawnRate?: number; // lower means more frequent attempts
};

function CircuitTraceBackground({
  gridSpacing = 40,
  maxCrawlers = 18,
  traceColor = 'rgba(255, 255, 255, 0.45)', // Sleek modern light trace
  gridColor = 'rgba(255, 255, 255, 0.03)',
  spawnRate = 0.04,
  className,
  children,
  ...props
}: CircuitTraceBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = React.useRef<number>(0);

  const stateRef = React.useRef({
    width: 0,
    height: 0,
    dpi: 1,
    crawlers: [] as Crawler[],
    nextId: 0,
    mouse: { x: -1000, y: -1000 },
    lastMouseGrid: { x: -1000, y: -1000 },
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

  const createCrawler = React.useCallback((startX: number, startY: number, power = 1.0): Crawler => {
    const id = stateRef.current.nextId++;
    const maxSegments = Math.floor(Math.random() * 4) + 4; // 4 to 7 segments length
    
    // Snapped to grid
    const sx = Math.round(startX / gridSpacing) * gridSpacing;
    const sy = Math.round(startY / gridSpacing) * gridSpacing;

    const dirs = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];
    const initialDir = dirs[Math.floor(Math.random() * dirs.length)];

    return {
      id,
      points: [{ x: sx, y: sy }],
      maxSegments,
      speed: (Math.random() * 1.5 + 1.2) * 2, // smooth fast pace
      progress: 0,
      dirX: initialDir.x,
      dirY: initialDir.y,
      strength: power * (Math.random() * 0.4 + 0.6),
    };
  }, [gridSpacing]);

  const tick = React.useCallback(function tick() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height, dpi, crawlers, mouse } = stateRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpi, dpi);

    // 1. Draw Grid Dots (Very faint, elegant base matrix)
    ctx.fillStyle = gridColor;
    for (let x = 0; x <= width; x += gridSpacing) {
      for (let y = 0; y <= height; y += gridSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Spawn new crawlers at random locations
    if (crawlers.length < maxCrawlers && Math.random() < spawnRate) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      crawlers.push(createCrawler(rx, ry));
    }

    // 2. Update & Draw Crawlers
    stateRef.current.crawlers = crawlers.filter((c) => {
      const lastPoint = c.points[c.points.length - 1];
      
      // Interpolate progress towards next point
      c.progress += c.speed / gridSpacing;

      // When the current grid segment is completed, we snap and plan the next move
      if (c.progress >= 1.0) {
        c.progress = 0;
        const nextX = lastPoint.x + c.dirX * gridSpacing;
        const nextY = lastPoint.y + c.dirY * gridSpacing;

        // Add the newly reached grid point
        c.points.push({ x: nextX, y: nextY });

        // Keep path within maxSegments size limit (prising tail segments)
        if (c.points.length > c.maxSegments) {
          c.points.shift();
        }

        // Out of screen edge protection
        if (nextX < -100 || nextX > width + 100 || nextY < -100 || nextY > height + 100) {
          return false; // kill crawler
        }

        // Determine next grid turn
        const possibleDirections = [
          { x: c.dirX, y: c.dirY }, // straight
          { x: -c.dirY, y: c.dirX }, // turn 90 deg right
          { x: c.dirY, y: -c.dirX }, // turn 90 deg left
        ];

        // Weights: 70% straight, 15% left, 15% right
        const rVal = Math.random();
        let choice;
        if (rVal < 0.70) {
          choice = possibleDirections[0];
        } else if (rVal < 0.85) {
          choice = possibleDirections[1];
        } else {
          choice = possibleDirections[2];
        }

        c.dirX = choice.x;
        c.dirY = choice.y;
      }

      // Draw the fading line trails
      if (c.points.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = traceColor;
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const headSegmentProgress = c.progress;

        for (let i = 0; i < c.points.length - 1; i++) {
          const pt1 = c.points[i];
          const pt2 = c.points[i + 1];

          // Fade older segments more
          const ageRatio = (i + 1) / c.points.length;
          ctx.globalAlpha = ageRatio * 0.45 * c.strength;

          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.stroke();
        }

        // Draw last leading segment under interpolation
        const secondLastPt = c.points[c.points.length - 1];
        const currentInterpHeadX = secondLastPt.x + c.dirX * gridSpacing * headSegmentProgress;
        const currentInterpHeadY = secondLastPt.y + c.dirY * gridSpacing * headSegmentProgress;

        ctx.globalAlpha = 0.6 * c.strength;
        ctx.beginPath();
        ctx.moveTo(secondLastPt.x, secondLastPt.y);
        ctx.lineTo(currentInterpHeadX, currentInterpHeadY);
        ctx.stroke();

        // 3. Draw high-velocity bright laser head
        ctx.globalAlpha = c.strength;
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#ffffff';
        ctx.beginPath();
        ctx.arc(currentInterpHeadX, currentInterpHeadY, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      return true;
    });

    ctx.restore();
    animationFrameIdRef.current = requestAnimationFrame(tick);
  }, [gridSpacing, gridColor, maxCrawlers, spawnRate, createCrawler, traceColor]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setSize();
    tick();

    const handleResize = () => setSize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const currentRawX = e.clientX - rect.left;
      const currentRawY = e.clientY - rect.top;
      
      stateRef.current.mouse = { x: currentRawX, y: currentRawY };

      // Snap mouse position to the grid matrix
      const snapX = Math.round(currentRawX / gridSpacing) * gridSpacing;
      const snapY = Math.round(currentRawY / gridSpacing) * gridSpacing;

      // Only spawn an interactive packet trail when the mouse moves to a NEW grid node
      // to avoid infinite overflow
      if (snapX !== stateRef.current.lastMouseGrid.x || snapY !== stateRef.current.lastMouseGrid.y) {
        stateRef.current.lastMouseGrid = { x: snapX, y: snapY };

        // Spawn a packet bursting representing reactive digital trace
        if (stateRef.current.crawlers.length < maxCrawlers + 10) {
          stateRef.current.crawlers.push(createCrawler(snapX, snapY, 1.4));
        }
      }
    };

    const handleMouseLeave = () => {
      stateRef.current.mouse = { x: -1000, y: -1000 };
      stateRef.current.lastMouseGrid = { x: -1000, y: -1000 };
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
  }, [setSize, tick, gridSpacing, createCrawler, maxCrawlers]);

  return (
    <div
      data-slot="circuit-trace-background"
      ref={containerRef}
      className={cn('relative size-full overflow-hidden bg-[#030303]', className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 block size-full pointer-events-none"
      />

      {/* Cinematic dark mask overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 35%, #030303 98%)',
        }}
      />

      {/* Premium subtle grain texture */}
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

export { CircuitTraceBackground, type CircuitTraceBackgroundProps };
