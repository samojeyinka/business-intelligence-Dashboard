import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { VentureWithRelations, VentureStage } from '@/types/venture';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronUp, ArrowUpRight, Star, Users, Clock, Sparkles, Zap } from 'lucide-react';

interface VentureCard3DProps {
  venture: VentureWithRelations;
  index: number;
}

const stageColors: Record<VentureStage, string> = {
  IDEA: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  PROTOTYPE: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  MVP: 'bg-green-500/10 text-green-500 border-green-500/20',
  GROWTH: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  SCALE: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const stageIcons: Record<VentureStage, React.ReactNode> = {
  IDEA: <Sparkles className="w-3 h-3" />,
  PROTOTYPE: <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />,
  MVP: <div className="w-3 h-3 rounded-sm bg-green-500" />,
  GROWTH: <div className="w-3 h-3 rounded-md bg-amber-500 animate-ping animate-duration-[3000ms]" />,
  SCALE: <Star className="w-3 h-3 text-red-500" />,
};

const VentureCard3D: React.FC<VentureCard3DProps> = ({ venture, index }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate rotation based on mouse position relative to card center
    const rotateXValue = ((mouseY - centerY) / (rect.height / 2)) * 5;
    const rotateYValue = ((centerX - mouseX) / (rect.width / 2)) * 5;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    
    // Calculate glow position
    const glowX = ((mouseX - rect.left) / rect.width) * 100;
    const glowY = ((mouseY - rect.top) / rect.height) * 100;
    setGlowPosition({ x: glowX, y: glowY });
  };

  const resetCardRotation = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      className="w-full perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetCardRotation}
      onMouseEnter={() => setIsHovered(true)}
      onClick={() => router.push(`/ventures/${venture.slug}`)}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
          z: isHovered ? 20 : 0,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <Card 
          className={`relative overflow-hidden border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm cursor-pointer`}
        >
          {/* Dynamic glow effect */}
          <div 
            className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none z-0"
            style={{
              opacity: isHovered ? 0.15 : 0,
              background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${
                venture.stage === 'IDEA' ? '#a855f7' : 
                venture.stage === 'PROTOTYPE' ? '#3b82f6' : 
                venture.stage === 'MVP' ? '#22c55e' : 
                venture.stage === 'GROWTH' ? '#f59e0b' : 
                '#ef4444'
              }, transparent 70%)`,
            }}
          />
          
          {/* Animated gradient border */}
          <div 
            className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 pointer-events-none"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `linear-gradient(90deg, transparent, ${
                venture.stage === 'IDEA' ? '#a855f7' : 
                venture.stage === 'PROTOTYPE' ? '#3b82f6' : 
                venture.stage === 'MVP' ? '#22c55e' : 
                venture.stage === 'GROWTH' ? '#f59e0b' : 
                '#ef4444'
              }40, transparent)`,
              backgroundSize: '200% 100%',
              animation: isHovered ? 'shimmer 2s infinite' : 'none',
            }}
          />
          
          {/* Venture content */}
          <div className="relative z-10 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                {venture.logo ? (
                  <motion.div 
                    className="relative h-12 w-12 overflow-hidden rounded-md bg-zinc-800"
                    animate={{ 
                      z: isHovered ? 30 : 0,
                      rotateZ: isHovered ? [0, -5, 5, 0] : 0
                    }}
                    transition={{
                      rotateZ: { repeat: isHovered ? Infinity : 0, duration: 5 }
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <img 
                      src={venture.logo} 
                      alt={`${venture.name} logo`} 
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                ) : (
                  <motion.div 
                    className="flex h-12 w-12 items-center justify-center rounded-md bg-zinc-800 text-xl font-bold text-white"
                    animate={{ 
                      z: isHovered ? 30 : 0,
                      rotateZ: isHovered ? [0, -5, 5, 0] : 0
                    }}
                    transition={{
                      rotateZ: { repeat: isHovered ? Infinity : 0, duration: 5 }
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {venture.name.charAt(0)}
                  </motion.div>
                )}
                <div>
                  <motion.h3 
                    className="text-lg font-bold text-white transition-colors"
                    animate={{ 
                      z: isHovered ? 20 : 0,
                      color: isHovered ? 
                        venture.stage === 'IDEA' ? '#c084fc' : 
                        venture.stage === 'PROTOTYPE' ? '#93c5fd' : 
                        venture.stage === 'MVP' ? '#86efac' : 
                        venture.stage === 'GROWTH' ? '#fcd34d' : 
                        '#fca5a5' 
                        : '#ffffff'
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {venture.name}
                    {venture.isStealthMode && (
                      <span className="ml-2 text-xs text-zinc-400">(Stealth)</span>
                    )}
                  </motion.h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className={`flex items-center gap-1 px-2 py-0 text-xs ${stageColors[venture.stage]}`}>
                      {stageIcons[venture.stage]}
                      <span>{venture.stage}</span>
                    </Badge>
                    {venture.isLookingForCollaborators && (
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 px-2 py-0 text-xs">
                        <Users className="mr-1 h-3 w-3" />
                        Seeking Collaborators
                      </Badge>
                    )}
                    {venture.isCoactProduct && (
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20 px-2 py-0 text-xs">
                        <Zap className="mr-1 h-3 w-3" />
                        Coact Product
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <motion.div 
                className="flex items-center space-x-2"
                animate={{ z: isHovered ? 15 : 0 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Badge variant="secondary" className="flex items-center gap-1">
                  <ChevronUp className="h-3 w-3" />
                  {venture._count.upvotes}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(venture.createdAt).toLocaleDateString()}
                </Badge>
              </motion.div>
            </div>
            
            <motion.p 
              className="mt-4 text-sm text-zinc-400"
              animate={{ z: isHovered ? 10 : 0 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {venture.description}
            </motion.p>
            
            <motion.div 
              className="mt-4 flex flex-wrap gap-2"
              animate={{ z: isHovered ? 10 : 0 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {venture.sectors.slice(0, 3).map((sector) => (
                <Badge key={sector} variant="outline" className="bg-zinc-800/50 text-zinc-400">
                  {sector}
                </Badge>
              ))}
              {venture.sectors.length > 3 && (
                <Badge variant="outline" className="bg-zinc-800/50 text-zinc-400">
                  +{venture.sectors.length - 3} more
                </Badge>
              )}
            </motion.div>
            
            <motion.div 
              className="mt-6 flex items-center justify-between"
              animate={{ z: isHovered ? 15 : 0 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex -space-x-2">
                {venture.founders.map((founder) => (
                  <div key={founder.id} className="h-8 w-8 rounded-full bg-zinc-700 border-2 border-zinc-900 overflow-hidden">
                    {founder.image ? (
                      <img src={founder.image} alt={founder.name || 'Founder'} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-xs font-bold text-white">
                        {founder.name?.charAt(0) || '?'}
                      </div>
                    )}
                  </div>
                ))}
                {venture.teamSize > venture.founders.length && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 border-2 border-zinc-900 text-xs font-medium text-white">
                    +{venture.teamSize - venture.founders.length}
                  </div>
                )}
              </div>
              
              <Button size="sm" variant="ghost" className="gap-1 text-purple-400 hover:text-purple-300 hover:bg-purple-950/30">
                <span>Explore</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default VentureCard3D;