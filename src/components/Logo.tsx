import React from 'react';
import { motion } from 'framer-motion';

const Logo: React.FC = () => {
  return (
    <motion.div 
      className="text-2xl font-bold flex items-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
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
