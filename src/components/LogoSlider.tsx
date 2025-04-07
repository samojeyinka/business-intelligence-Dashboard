import React from 'react';
import { motion } from 'framer-motion';

interface LogoSliderProps {
  logos?: { src: string; alt: string; url?: string }[];
}

const defaultLogos = [
  { src: 'https://assets.co.dev/673d85cf-0def-4aad-a795-cd2e588946de/handl-021c685.png', alt: 'Handl', url: undefined },
  { src: 'https://assets.co.dev/673d85cf-0def-4aad-a795-cd2e588946de/fieldrun-cc9c99c.png', alt: 'Fieldrun', url: undefined },
  { src: 'https://assets.co.dev/673d85cf-0def-4aad-a795-cd2e588946de/union-1b85978.png', alt: 'Union', url: undefined },
  { src: 'https://assets.co.dev/673d85cf-0def-4aad-a795-cd2e588946de/crestal-logo-b62823c.png', alt: 'Crestal', url: undefined },
  { src: 'https://assets.co.dev/673d85cf-0def-4aad-a795-cd2e588946de/whatsapp-image-2025-02-18-at-07.43.16-2d07dd1.jpeg', alt: 'Portfolio Company', url: undefined },
  { src: 'https://assets.co.dev/673d85cf-0def-4aad-a795-cd2e588946de/matchpoint-e623d3e.png', alt: 'Matchpoint', url: undefined },
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
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className="max-w-[80%] max-h-[80%] object-contain filter brightness-90 group-hover:brightness-100 transition-all"
                  />
                </a>
              ) : (
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="max-w-[80%] max-h-[80%] object-contain filter brightness-90 group-hover:brightness-100 transition-all"
                />
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
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className="max-w-[80%] max-h-[80%] object-contain filter brightness-90 group-hover:brightness-100 transition-all"
                  />
                </a>
              ) : (
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="max-w-[80%] max-h-[80%] object-contain filter brightness-90 group-hover:brightness-100 transition-all"
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Portfolio logos are now displayed */}
    </div>
  );
};

export default LogoSlider;