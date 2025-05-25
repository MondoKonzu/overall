"use client";
import { useRef, useEffect, useState } from 'react';

const CyberpunkBackground = ({ children }: { children?: React.ReactNode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const linesRef = useRef<Array<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    opacity: number;
    life: number;
    speed: number;
  }>>([]);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId: number;
    let lastMouseMoveTime = Date.now();

    const createNewLine = () => {
      const now = Date.now();
      const timeSinceLastMove = now - lastMouseMoveTime;
      
      // Reduce line creation when mouse hasn't moved recently
      if (timeSinceLastMove > 2000 && Math.random() > 0.1) return;

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 80 + 40;
      
      const x1 = mousePos.x + Math.cos(angle) * distance;
      const y1 = mousePos.y + Math.sin(angle) * distance;
      const x2 = mousePos.x - Math.cos(angle) * distance;
      const y2 = mousePos.y - Math.sin(angle) * distance;

      linesRef.current.push({
        x1, y1, x2, y2,
        opacity: 1,
        life: 100 + Math.random() * 50,
        speed: 0.5 + Math.random() * 0.5 // Random fade speed
      });
    };

    const render = () => {
      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new lines (more frequent when mouse is moving)
      if (Math.random() < 0.3 && linesRef.current.length < 60) {
        createNewLine();
      }

      // Draw all lines
      ctx.lineWidth = 0.5;
      for (let i = linesRef.current.length - 1; i >= 0; i--) {
        const line = linesRef.current[i];
        
        // Update line properties
        line.life -= line.speed;
        line.opacity = line.life / 100;
        
        // Draw the line
        ctx.strokeStyle = `rgba(20, 20, 20, ${line.opacity})`;
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
        
        // Remove dead lines
        if (line.life <= 0) {
          linesRef.current.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mousePos]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="top-0 left-0 absolute w-full h-full -z-30"
      />
      {children}
    </div>
  );
};

export default CyberpunkBackground;