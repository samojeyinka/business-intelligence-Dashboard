import React from 'react';
import { motion } from 'framer-motion';

interface LogoSliderProps {
  logos?: { src: string; alt: string; url?: string }[];
}

const defaultLogos = [
  { src: '/images/portfolio/logo1.png', alt: 'Portfolio Company 1' },
  { src: '/images/portfolio/logo2.png', alt: 'Portfolio Company 2' },
  { src: '/images/portfolio/logo3.png', alt: 'Portfolio Company 3' },
  { src: '/images/portfolio/logo4.png', alt: 'Portfolio Company 4' },
  { src: '/images/portfolio/logo5.png', alt: 'Portfolio Company 5' },
  { src: '/images/portfolio/logo6.png', alt: 'Portfolio Company 6' },
];

const LogoSlider: React.FC<LogoSliderProps> = ({ logos = defaultLogos }) => {
  return (
    <div className="w-full overflow-hidden py-10 bg-slate-900/30 backdrop-blur-sm rounded-xl border border-slate-800">
      <h3 className="text-2xl font-bold text-center mb-8">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Our Portfolio
        </span>
      </h3>
      
      <div className="relative">
        {/* First slider (left to right) */}
        <motion.div
          className="flex space-x-12 mb-8"
          animate={{
            x: ["-10%", "-60%"]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear"
            }
          }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <div 
              key={`logo1-${index}`} 
              className="flex-shrink-0 w-32 h-16 bg-slate-800/50 rounded-lg flex items-center justify-center group"
            >
              {logo.url ? (
                <a 
                  href={logo.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="w-24 h-12 bg-slate-700/50 rounded flex items-center justify-center text-xs text-slate-400 group-hover:text-white transition-colors">
                    {logo.alt}
                  </div>
                </a>
              ) : (
                <div className="w-24 h-12 bg-slate-700/50 rounded flex items-center justify-center text-xs text-slate-400 group-hover:text-white transition-colors">
                  {logo.alt}
                </div>
              )}
            </div>
          ))}
        </motion.div>
        
        {/* Second slider (right to left) */}
        <motion.div
          className="flex space-x-12"
          animate={{
            x: ["-60%", "-10%"]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear"
            }
          }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <div 
              key={`logo2-${index}`} 
              className="flex-shrink-0 w-32 h-16 bg-slate-800/50 rounded-lg flex items-center justify-center group"
            >
              {logo.url ? (
                <a 
                  href={logo.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="w-24 h-12 bg-slate-700/50 rounded flex items-center justify-center text-xs text-slate-400 group-hover:text-white transition-colors">
                    {logo.alt}
                  </div>
                </a>
              ) : (
                <div className="w-24 h-12 bg-slate-700/50 rounded flex items-center justify-center text-xs text-slate-400 group-hover:text-white transition-colors">
                  {logo.alt}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
      
      <div className="text-center mt-6 text-sm text-slate-400">
        <p>Note: Replace placeholder logos with your actual portfolio company logos</p>
      </div>
    </div>
  );
};

export default LogoSlider;