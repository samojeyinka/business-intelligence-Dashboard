import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingElementsProps {
  count?: number;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ count = 8 }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) - 0.5;
    const y = (clientY / window.innerHeight) - 0.5;
    
    setMousePosition({ x, y });
  };

  // Generate random elements
  const elements = Array.from({ length: count }).map((_, index) => {
    const size = Math.floor(Math.random() * 16) + 8; // 8-24px
    const isSquare = Math.random() > 0.5;
    const isOutlined = Math.random() > 0.5;
    const position = {
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
    };
    const duration = Math.random() * 2 + 3; // 3-5s
    const delay = Math.random() * 2;
    
    return {
      id: index,
      size,
      isSquare,
      isOutlined,
      position,
      duration,
      delay,
      mouseMultiplier: (Math.random() * 30) + 10, // 10-40
    };
  });

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      onMouseMove={handleMouseMove}
    >
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute ${
            element.isOutlined 
              ? 'border border-purple-500/30' 
              : element.isSquare 
                ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20' 
                : 'bg-gradient-to-br from-pink-500/20 to-purple-500/20'
          } ${element.isSquare ? 'rounded-md' : 'rounded-full'}`}
          style={{
            width: element.size,
            height: element.size,
            top: element.position.top,
            left: element.position.left,
          }}
          animate={{
            y: [0, -20, 0],
            x: mousePosition.x * element.mouseMultiplier,
            rotate: [0, 360],
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: element.duration,
              ease: 'easeInOut',
              delay: element.delay,
            },
            rotate: {
              repeat: Infinity,
              duration: element.duration * 2,
              ease: 'linear',
              delay: element.delay,
            },
            x: {
              type: 'spring',
              stiffness: 50,
              damping: 20,
            },
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;