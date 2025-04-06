import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    setMousePosition({ x, y });
  };

  return (
    <motion.div 
      className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background gradient orbs */}
      <motion.div 
        className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600 rounded-full filter blur-[100px] opacity-20"
        animate={{
          x: mousePosition.x * -30,
          y: mousePosition.y * -30,
        }}
        transition={{ type: 'spring', damping: 15 }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600 rounded-full filter blur-[100px] opacity-20"
        animate={{
          x: mousePosition.x * 30,
          y: mousePosition.y * 30,
        }}
        transition={{ type: 'spring', damping: 15 }}
      />
      
      {/* Hero content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            The Future of Web
          </span>
          <span className="block mt-1">Is Alive & Adaptive</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-slate-300 max-w-2xl mx-auto mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          We're creating living, immersive web environments that adapt and evolve in real-time, 
          responding to your every interaction to deliver experiences beyond the conventional.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
          >
            Explore Ventures
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-slate-600 hover:bg-slate-800/50"
          >
            Our Approach
          </Button>
        </motion.div>
      </div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-1/3 left-10 w-12 h-12 border border-slate-500 rounded-lg"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
          x: mousePosition.x * 20,
        }}
        transition={{
          y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
          rotate: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
          x: { type: 'spring', damping: 15 },
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-10 w-8 h-8 border border-slate-500 rounded-full"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0],
          x: mousePosition.x * -20,
        }}
        transition={{
          y: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' },
          rotate: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' },
          x: { type: 'spring', damping: 15 },
        }}
      />
      <motion.div 
        className="absolute top-2/3 right-1/4 w-6 h-6 bg-blue-500/20 rounded-md"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 10, 0],
          x: mousePosition.x * 15,
        }}
        transition={{
          y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
          rotate: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
          x: { type: 'spring', damping: 15 },
        }}
      />
    </motion.div>
  );
};

export default HeroSection;