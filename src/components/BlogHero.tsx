import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Users, Lightbulb } from 'lucide-react';

interface BlogHeroProps {
  contributorCount: number;
  articleCount: number;
}

const BlogHero: React.FC<BlogHeroProps> = ({ contributorCount, articleCount,ideaCount }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Calculate parallax values
  const calcParallax = (strength: number) => {
    if (!isHovering) return { x: 0, y: 0 };
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const deltaX = (mousePosition.x - centerX) / centerX;
    const deltaY = (mousePosition.y - centerY) / centerY;
    
    return {
      x: deltaX * strength,
      y: deltaY * strength
    };
  };
  
  // Animated text phrases
  const phrases = [
    "Collective Knowledge",
    "Open Contributions",
    "Shared Insights",
    "Collaborative Learning",
    "Future Perspectives"
  ];
  
  const [currentPhrase, setCurrentPhrase] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [phrases.length]);
  
  return (
    <div 
      className="relative py-24 overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl"
          animate={{
            x: calcParallax(20).x,
            y: calcParallax(20).y,
            scale: [1, 1.1, 1],
          }}
          transition={{
            scale: { repeat: Infinity, duration: 8 },
            x: { type: "spring", stiffness: 100, damping: 30 },
            y: { type: "spring", stiffness: 100, damping: 30 },
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl"
          animate={{
            x: calcParallax(-30).x,
            y: calcParallax(-30).y,
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            scale: { repeat: Infinity, duration: 10, delay: 1 },
            x: { type: "spring", stiffness: 100, damping: 30 },
            y: { type: "spring", stiffness: 100, damping: 30 },
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-cyan-600/10 blur-3xl"
          animate={{
            x: calcParallax(40).x,
            y: calcParallax(40).y,
            scale: [1, 1.2, 1],
          }}
          transition={{
            scale: { repeat: Infinity, duration: 9, delay: 2 },
            x: { type: "spring", stiffness: 100, damping: 30 },
            y: { type: "spring", stiffness: 100, damping: 30 },
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Collective Knowledge Hub</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400">
              Our Open Blog
            </span>
          </h1>
          
          <div className="h-12 mb-6 overflow-hidden">
            <motion.div
              key={currentPhrase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl text-gray-300"
            >
              {phrases[currentPhrase]}
            </motion.div>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-gray-400 max-w-3xl mx-auto mb-10"
          >
            A platform fostering open knowledge through collective efforts.
            Explore insights, contribute your expertise, and be part of building the future.
          </motion.p>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6 md:gap-12"
          >
            <div className="flex items-center gap-3 bg-zinc-900/50 backdrop-blur-sm px-5 py-3 rounded-lg border border-zinc-800">
              <div className="p-2 rounded-full bg-blue-500/10">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">{articleCount}</p>
                <p className="text-sm text-zinc-400">Articles</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-zinc-900/50 backdrop-blur-sm px-5 py-3 rounded-lg border border-zinc-800">
              <div className="p-2 rounded-full bg-purple-500/10">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">{contributorCount}</p>
                <p className="text-sm text-zinc-400">Contributors</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-zinc-900/50 backdrop-blur-sm px-5 py-3 rounded-lg border border-zinc-800">
              <div className="p-2 rounded-full bg-pink-500/10">
                <Lightbulb className="w-5 h-5 text-pink-400" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">{ideaCount}</p>
                <p className="text-sm text-zinc-400">Ideas Shared</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-purple-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogHero;