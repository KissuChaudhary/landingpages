'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/templates/magnetic-grid/lib/utils';

type NeuralFlowBackgroundProps = React.ComponentProps<'div'> & {
  particleCount?: number;
  particleColor?: string;
  lineColor?: string;
  maxDistance?: number;
  mouseInteract?: boolean;
};

function NeuralFlowBackground({
  particleCount = 150,
  particleColor = '#ffffff',
  lineColor = '#ffffff',
  maxDistance = 120,
  mouseInteract = true,
  className,
  children,
  ...props
}: NeuralFlowBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = React.useRef<number>(0);
  
  const stateRef = React.useRef({
    particles: [] as any[],
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

  const initParticles = React.useCallback(() => {
    const { width, height } = stateRef.current;
    stateRef.current.particles = Array.from({ length: particleCount }).map(() => {
      const z = Math.random() * 1.5 + 0.5; // 0.5 to 2.0
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        z,
        baseSize: Math.random() * 1.5 + 0.5,
      };
    });
  }, [particleCount]);

  const tick = React.useCallback(function tick() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height, particles, mouse, dpi } = stateRef.current;
    stateRef.current.time += 0.005;
    const t = stateRef.current.time;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpi, dpi);

    // Update particles
    particles.forEach((p) => {
      // Flow field force
      const angle = Math.sin(p.x * 0.001 + t * 0.5) * Math.cos(p.y * 0.001 - t * 0.3) * Math.PI * 2;
      const force = 0.05 * p.z;
      p.vx += Math.cos(angle) * force;
      p.vy += Math.sin(angle) * force;

      // Mouse interaction
      if (mouseInteract && mouse.x !== -1000) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 22500) { // 150 * 150
          const dist = Math.sqrt(distSq);
          const repelForce = (150 - dist) / 150 * 0.5 * p.z;
          p.vx += (dx / dist) * repelForce;
          p.vy += (dy / dist) * repelForce;
        }
      }

      // Friction
      p.vx *= 0.92;
      p.vy *= 0.92;

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.x < 0) p.x += width;
      if (p.x > width) p.x -= width;
      if (p.y < 0) p.y += height;
      if (p.y > height) p.y -= height;
    });

    // Draw lines
    ctx.lineWidth = 1;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;
        const maxDistSq = maxDistance * maxDistance;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const opacity = (1 - dist / maxDistance) * 0.3 * ((p1.z + p2.z) / 2);
          
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = lineColor;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Draw lines to mouse
    if (mouseInteract && mouse.x !== -1000) {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        const mouseMaxDist = 200;
        
        if (distSq < mouseMaxDist * mouseMaxDist) {
          const dist = Math.sqrt(distSq);
          const opacity = (1 - dist / mouseMaxDist) * 0.4;
          
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = lineColor;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    ctx.fillStyle = particleColor;
    particles.forEach((p) => {
      const breath = Math.sin(t * 2 + p.x) * 0.2 + 0.8;
      ctx.globalAlpha = 0.6 * p.z * breath;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.baseSize * p.z, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
    animationFrameIdRef.current = requestAnimationFrame(tick);
  }, [maxDistance, mouseInteract, particleColor, lineColor]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    setSize();
    initParticles();
    tick();

    const handleResize = () => {
      setSize();
      initParticles();
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
  }, [setSize, initParticles, tick]);

  return (
    <div
      data-slot="neural-flow-background"
      ref={containerRef}
      className={cn(
        'relative size-full overflow-hidden bg-black',
        className
      )}
      {...props}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-30 blur-[100px] mix-blend-screen"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, #4f46e5, #ec4899, #8b5cf6, #3b82f6, #4f46e5)'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        />
      </div>

      {/* Canvas for Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 block size-full mix-blend-screen pointer-events-none"
      />

      {/* Scanline Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none [background:repeating-linear-gradient(transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)]" />

      {/* Content */}
      <div className="relative z-30 size-full">
        {children}
      </div>
    </div>
  );
}

export { NeuralFlowBackground, type NeuralFlowBackgroundProps };
