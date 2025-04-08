import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Logo: React.FC = () => {
  return (
    <motion.div 
      className="font-bold flex items-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="h-8 w-8 mr-2">
        <img 
          src="https://assets.co.dev/673d85cf-0def-4aad-a795-cd2e588946de/white-icon-1-940e07a.png" 
          alt="Coact Logo" 
          className="h-full w-full object-contain"
        />
      </div>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
        Coact
      </span>
      <motion.span 
        className="ml-1 text-slate-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Venture Studio
      </motion.span>
    </motion.div>
  );
};

export default Logo;