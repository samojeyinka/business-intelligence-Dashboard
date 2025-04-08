import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const isRunningRef = useRef<boolean>(true);

  // Initialize particles
  useEffect(() => {
    const initParticles = () => {
      const newParticles: Particle[] = [];
      const particleCount = Math.min(window.innerWidth, window.innerHeight) / 10;
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
      
      particlesRef.current = newParticles;
    };

    initParticles();
    
    const handleResize = () => {
      initParticles();
      
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      isRunningRef.current = false;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop using useCallback to prevent recreating the function
  const animate = useCallback(() => {
    if (!canvasRef.current || !isRunningRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particlesRef.current = particlesRef.current.map(particle => {
      // Calculate distance from mouse
      const dx = mousePosition.x - particle.x;
      const dy = mousePosition.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 150;
      
      // Apply force if within range
      let newX = particle.x;
      let newY = particle.y;
      
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        newX -= dx * force * 0.02;
        newY -= dy * force * 0.02;
      }
      
      // Normal movement
      newX += particle.speedX;
      newY += particle.speedY;
      
      // Wrap around edges
      if (newX < 0) newX = canvas.width;
      if (newX > canvas.width) newX = 0;
      if (newY < 0) newY = canvas.height;
      if (newY > canvas.height) newY = 0;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(newX, newY, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(150, 200, 255, ${particle.opacity})`;
      ctx.fill();
      
      return {
        ...particle,
        x: newX,
        y: newY
      };
    });
    
    animationRef.current = requestAnimationFrame(animate);
  }, [mousePosition]);

  // Setup animation
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      isRunningRef.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default InteractiveBackground;