import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VentureStage } from '@/types/venture';

interface FuturisticTabsProps {
  activeStage: string;
  onStageChange: (stage: string) => void;
}

const FuturisticTabs: React.FC<FuturisticTabsProps> = ({ activeStage, onStageChange }) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  
  const tabs = [
    { id: 'all', label: 'All Stages', color: '#a855f7' },
    { id: 'IDEA', label: 'Idea', color: '#a855f7' },
    { id: 'PROTOTYPE', label: 'Prototype', color: '#3b82f6' },
    { id: 'MVP', label: 'MVP', color: '#22c55e' },
    { id: 'GROWTH', label: 'Growth', color: '#f59e0b' },
    { id: 'SCALE', label: 'Scale', color: '#ef4444' },
  ];

  return (
    <div className="relative mb-8 w-full max-w-4xl mx-auto">
      <motion.div 
        className="flex flex-wrap justify-center gap-2 p-1 rounded-lg bg-zinc-900/50 border border-zinc-800 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {tabs.map((tab) => {
          const isActive = activeStage === tab.id;
          const isHovered = hoveredTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive ? 'text-white' : 'text-zinc-400'
              }`}
              onClick={() => onStageChange(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Background */}
              <motion.div
                className="absolute inset-0 rounded-md z-0"
                initial={false}
                animate={{
                  backgroundColor: isActive ? tab.color : 'transparent',
                  opacity: isActive ? 0.2 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 rounded-md z-0 blur-sm"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isHovered && !isActive ? 0.1 : 0,
                  backgroundColor: tab.color,
                }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Border */}
              <motion.div
                className="absolute inset-0 rounded-md z-0"
                initial={false}
                animate={{
                  boxShadow: isActive 
                    ? `0 0 0 2px ${tab.color}40, 0 0 10px ${tab.color}30` 
                    : isHovered 
                      ? `0 0 0 1px ${tab.color}30` 
                      : 'none',
                }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Label */}
              <span className="relative z-10">{tab.label}</span>
              
              {/* Animated underline */}
              {isActive && (
                <motion.div
                  className="absolute bottom-1 left-0 right-0 h-0.5 mx-auto z-10"
                  initial={{ width: 0 }}
                  animate={{ width: '50%' }}
                  style={{ backgroundColor: tab.color }}
                  layoutId="activeTabUnderline"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
        
        {/* Animated background for active tab */}
        <motion.div
          className="absolute rounded-md z-0"
          layoutId="activeTabBackground"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            width: document.querySelector(`button:nth-child(${tabs.findIndex(tab => tab.id === activeStage) + 1})`)?.getBoundingClientRect().width || 0,
            height: document.querySelector(`button:nth-child(${tabs.findIndex(tab => tab.id === activeStage) + 1})`)?.getBoundingClientRect().height || 0,
            left: document.querySelector(`button:nth-child(${tabs.findIndex(tab => tab.id === activeStage) + 1})`)?.getBoundingClientRect().left - 
                  (document.querySelector('.relative.mb-8')?.getBoundingClientRect().left || 0) + 'px',
            top: document.querySelector(`button:nth-child(${tabs.findIndex(tab => tab.id === activeStage) + 1})`)?.getBoundingClientRect().top - 
                 (document.querySelector('.relative.mb-8')?.getBoundingClientRect().top || 0) + 'px',
          }}
        />
      </motion.div>
    </div>
  );
};

export default FuturisticTabs;