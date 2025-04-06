import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MorphingSectionProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const MorphingSection: React.FC<MorphingSectionProps> = ({
  title,
  description,
  icon,
  children,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl backdrop-blur-sm transition-all duration-500',
        isExpanded ? 'p-8' : 'p-6',
        isHovered ? 'bg-opacity-15' : 'bg-opacity-10',
        'bg-slate-800 border border-slate-700',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        height: isExpanded ? 'auto' : 'auto',
      }}
      transition={{ 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <motion.div
            className="text-primary flex-shrink-0"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0
            }}
          >
            {icon}
          </motion.div>
        )}
        <div className="flex-1">
          <motion.h3 
            className="text-xl font-bold mb-2 text-primary"
            animate={{ 
              fontSize: isExpanded ? '1.5rem' : '1.25rem',
            }}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-slate-300"
            animate={{ 
              opacity: isHovered || isExpanded ? 1 : 0.8,
            }}
          >
            {description}
          </motion.p>
        </div>
      </div>

      <motion.div
        className="mt-4"
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isExpanded ? 1 : 0,
          height: isExpanded ? 'auto' : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: 'left' }}
      />
    </motion.div>
  );
};

export default MorphingSection;