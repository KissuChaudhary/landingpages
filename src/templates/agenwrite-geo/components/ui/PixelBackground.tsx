import React, { useEffect, useRef } from 'react';

export const PixelBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    // Tiny squares - dense grid
    const pixelSize = 4; 
    const gap = 2;        
    const step = pixelSize + gap; 

    // Palette: Refined Architectural Monochrome (Deep Zincs & Muted Silver)
    const getGridColor = () => {
       const r = Math.random();
       if (r > 0.997) return '#e4e4e7'; // Micro silver tick (Zinc-200)
       if (r > 0.99) return '#a1a1aa';  // Zinc-400 (Muted highlight)
       if (r > 0.975) return '#71717a'; // Zinc-500 (Subtle mid-tone)
       if (r > 0.93) return '#3f3f46';  // Zinc-700 (Structure)
       if (r > 0.80) return '#27272a';  // Zinc-800 (Ambient grid)
       if (r > 0.55) return '#18181b';  // Zinc-900 (Deep texture)
       if (r > 0.35) return '#09090b';  // Zinc-950 (Dark base)
       return 'transparent';             // Empty space
    };

    let cols = 0;
    let rows = 0;
    
    // Store grid state
    let grid: { color: string; nextUpdate: number }[] = [];

    const initGrid = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
      
      cols = Math.ceil(canvas.width / step);
      rows = Math.ceil(canvas.height / step);
      
      grid = new Array(cols * rows).fill(null).map(() => ({
          color: getGridColor(),
          nextUpdate: Math.random() * 500
      }));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
           const index = i + j * cols;
           const cell = grid[index];

           if (time > cell.nextUpdate) {
               if (Math.random() > 0.95) { // 5% chance to change per update cycle
                   cell.color = getGridColor();
               }
               cell.nextUpdate = time + 50 + Math.random() * 300; // Fast flicker
           }

           if (cell.color !== 'transparent') {
               ctx.fillStyle = cell.color;
               ctx.fillRect(i * step, j * step, pixelSize, pixelSize);
           }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const resize = () => {
        initGrid();
    };

    window.addEventListener('resize', resize);
    initGrid();
    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80 pointer-events-none" />;
};