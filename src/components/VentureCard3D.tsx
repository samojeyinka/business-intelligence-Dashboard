import React, { useState, useRef, memo, useCallback } from 'react';
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
  PROTOTYPE: <div className="w-3 h-3 rounded-full bg-blue-500" />,
  MVP: <div className="w-3 h-3 rounded-sm bg-green-500" />,
  GROWTH: <div className="w-3 h-3 rounded-md bg-amber-500" />,
  SCALE: <Star className="w-3 h-3 text-red-500" />,
};

// Using memo to prevent unnecessary re-renders
const VentureCard3D: React.FC<VentureCard3DProps> = memo(({ venture, index }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  
  // Heavily throttled mouse move handler to improve performance
  const lastMoveRef = useRef<number>(0);
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return;
    
    const now = Date.now();
    if (now - lastMoveRef.current < 50) return; // Only process every 50ms
    lastMoveRef.current = now;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate rotation based on mouse position relative to card center
    // Reduced rotation amount for better performance
    const rotateXValue = ((mouseY - centerY) / (rect.height / 2)) * 2;
    const rotateYValue = ((centerX - mouseX) / (rect.width / 2)) * 2;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    
    // Calculate glow position - simplified
    const glowX = ((mouseX - rect.left) / rect.width) * 100;
    const glowY = ((mouseY - rect.top) / rect.height) * 100;
    setGlowPosition({ x: glowX, y: glowY });
  }, [isHovered]);

  const resetCardRotation = useCallback(() => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  }, []);
  
  const handleCardClick = useCallback(() => {
    router.push(`/ventures/${venture.slug}`);
  }, [router, venture.slug]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ 
        duration: 0.3, 
        delay: Math.min(index * 0.03, 0.2), // Reduced delay for faster loading
      }}
      className="w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetCardRotation}
      onMouseEnter={() => setIsHovered(true)}
      onClick={handleCardClick}
    >
      <motion.div
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
      >
        <Card 
          className="relative overflow-hidden border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm cursor-pointer"
        >
          {/* Simplified glow effect - only show on hover and with reduced complexity */}
          {isHovered && (
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none z-0"
              style={{
                background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${venture.stage === 'IDEA' ? '#a855f7' : venture.stage === 'PROTOTYPE' ? '#3b82f6' : venture.stage === 'MVP' ? '#22c55e' : venture.stage === 'GROWTH' ? '#f59e0b' : '#ef4444'}, transparent 70%)`,
              }}
            />
          )}
          
          {/* Venture content */}
          <div className="relative z-10 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                {venture.logo ? (
                  <div className="relative h-12 w-12 overflow-hidden rounded-md bg-zinc-800">
                    <img 
                      src={venture.logo} 
                      alt={`${venture.name} logo`} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-zinc-800 text-xl font-bold text-white">
                    {venture.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className={`text-lg font-bold ${isHovered ? 'text-purple-400' : 'text-white'} transition-colors`}>
                    {venture.name}
                    {venture.isStealthMode && (
                      <span className="ml-2 text-xs text-zinc-400">(Stealth)</span>
                    )}
                  </h3>
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
                        Coact Startup
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <ChevronUp className="h-3 w-3" />
                  {venture._count.upvotes}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(venture.createdAt).toLocaleDateString()}
                </Badge>
              </div>
            </div>
            
            <p className="mt-4 text-sm text-zinc-400">
              {venture.description}
            </p>
            
            <div className="mt-4 flex flex-wrap gap-2">
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
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <div className="flex -space-x-2">
                {venture.founders.slice(0, 3).map((founder) => (
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
            </div>
          </div>
          
          {/* Simple border highlight on hover */}
          {isHovered && (
            <div className="absolute inset-0 border border-purple-500/30 rounded-lg pointer-events-none" />
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
});

VentureCard3D.displayName = 'VentureCard3D';

export default VentureCard3D;