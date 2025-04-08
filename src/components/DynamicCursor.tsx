import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

const DynamicCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const lastMoveTimeRef = useRef<number>(0);

  // Heavily throttled handler for both mouse position and pointer detection
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastMoveTimeRef.current < 50) return; // Only update every 50ms
    lastMoveTimeRef.current = now;
    
    setMousePosition({ x: e.clientX, y: e.clientY });
    
    // Check if the cursor is over a clickable element
    const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
    const computedStyle = hoveredElement ? window.getComputedStyle(hoveredElement).cursor : '';
    setIsPointer(computedStyle === 'pointer');
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          mass: 0.2,
          stiffness: 100,
          damping: 10,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: 'spring',
          mass: 0.1,
          stiffness: 150,
          damping: 8,
        }}
      />
    </>
  );
};

export default React.memo(DynamicCursor);