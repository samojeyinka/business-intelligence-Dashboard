import React, { useEffect, useRef, memo } from 'react';
import { useRouter } from 'next/router';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
}

// Using memo to prevent unnecessary re-renders
const VentureParticleEffect: React.FC = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);
  const router = useRouter();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Reinitialize particles when canvas size changes
        initParticles();
      }
    };
    
    setCanvasDimensions();
    
    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setCanvasDimensions, 200);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Initialize particles - reduced count for better performance
    const initParticles = () => {
      // Reduce particle count for better performance
      const particleCount = Math.min(Math.floor(window.innerWidth / 40), 50);
      const particles: Particle[] = [];
      
      const colors = ['#8b5cf6', '#6366f1', '#ec4899', '#f97316'];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5, // Smaller particles
          speedX: (Math.random() - 0.5) * 0.3, // Slower movement
          speedY: (Math.random() - 0.5) * 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.1 + Math.random() * 0.3
        });
      }
      
      particlesRef.current = particles;
    };
    
    // Throttled mouse move handler
    let lastMouseMoveTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseMoveTime > 50) { // Only update every 50ms
        mouseRef.current = { x: e.clientX, y: e.clientY };
        lastMouseMoveTime = now;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop with performance optimizations
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      const particles = particlesRef.current;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      
      // Draw connections first (fewer, more selective connections)
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.05)';
      ctx.beginPath();
      
      // Only check connections for a subset of particles
      for (let i = 0; i < particles.length; i += 2) {
        const particle = particles[i];
        
        for (let j = i + 2; j < particles.length; j += 2) {
          const otherParticle = particles[j];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
          }
        }
      }
      ctx.stroke();
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
        
        // Mouse interaction - only apply to particles near the mouse
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.speedX += dx * force * 0.005;
          particle.speedY += dy * force * 0.005;
          
          // Limit speed
          const maxSpeed = 1.5;
          const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
          if (currentSpeed > maxSpeed) {
            particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
            particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
          }
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();
      }
      
      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    initParticles();
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [router.pathname]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
});

VentureParticleEffect.displayName = 'VentureParticleEffect';

export default VentureParticleEffect;