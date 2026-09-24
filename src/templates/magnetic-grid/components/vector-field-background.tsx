'use client';

import * as React from 'react';
import { cn } from '@/templates/magnetic-grid/lib/utils';

type VectorFieldBackgroundProps = React.ComponentProps<'div'> & {
  gridSpacing?: number;
  segmentLength?: number;
  color?: string;
  mouseRepelRadius?: number;
  mouseRepelForce?: number;
  animationSpeed?: number;
};

function VectorFieldBackground({
  gridSpacing = 24,
  segmentLength = 8,
  color = 'rgba(255, 255, 255, 0.4)',
  mouseRepelRadius = 200,
  mouseRepelForce = 1.2,
  animationSpeed = 0.005,
  className,
  children,
  ...props
}: VectorFieldBackgroundProps) {
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
    stateRef.current.time += animationSpeed;
    const t = stateRef.current.time;

    // Smooth mouse interpolation (LERP)
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

    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = offsetX + c * gridSpacing;
        const y = offsetY + r * gridSpacing;

        // Base flow field using sine waves interference
        let angle = Math.sin(x * 0.002 + t) * Math.cos(y * 0.002 - t) * Math.PI * 2;
        
        let opacity = 0.2; // Base faint grid

        // Mouse influence
        if (mouse.x !== -1000) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRepelRadius) {
            const influence = 1 - Math.pow(dist / mouseRepelRadius, 2);
            // Repel or align towards mouse
            const angleToMouse = Math.atan2(dy, dx);
            
            // Blend base angle with mouse repulsion angle
            const targetAngle = angleToMouse + Math.PI / 2; // Perpendicular to radius
            
            // LERP angle
            angle = angle * (1 - influence * mouseRepelForce) + targetAngle * (influence * mouseRepelForce);
            opacity += influence * 0.8; // Brigthen near cursor
          }
        }

        ctx.globalAlpha = Math.min(1, opacity);
        
        const halfL = segmentLength / 2;
        const startX = x - Math.cos(angle) * halfL;
        const startY = y - Math.sin(angle) * halfL;
        const endX = x + Math.cos(angle) * halfL;
        const endY = y + Math.sin(angle) * halfL;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
    }

    ctx.restore();
    animationFrameIdRef.current = requestAnimationFrame(tick);
  }, [animationSpeed, color, gridSpacing, mouseRepelForce, mouseRepelRadius, segmentLength]);

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
      data-slot="vector-field-background"
      ref={containerRef}
      className={cn('relative size-full overflow-hidden bg-[#000000]', className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 block size-full pointer-events-none"
      />
      
      {/* Soft Vignette Mask */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-80"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, #000000 95%)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-20 size-full">
        {children}
      </div>
    </div>
  );
}

export { VectorFieldBackground, type VectorFieldBackgroundProps };
