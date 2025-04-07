import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, 
  Briefcase, 
  Code2, 
  LightbulbIcon,
  MousePointerClick,
  Sparkles
} from 'lucide-react';

const EcosystemSection = () => {
  // State for interactive elements
  const [activeNode, setActiveNode] = useState<number | null>(null);
  
  // The Ecosystem section data
  const ecosystem = [
    {
      title: 'For Founders',
      description: 'Join forces with experienced operators, validated playbooks, and mission-aligned resources to launch and scale impactful ventures.',
      icon: <Rocket size={24} />,
      content: 'Access our network, resources, and expertise to build ventures that matter.'
    },
    {
      title: 'For Investors',
      description: 'Access vetted opportunities built from first principles—designed to solve real problems in real markets.',
      icon: <Briefcase size={24} />,
      content: 'Invest in ventures that have been rigorously validated and built with purpose.'
    },
    {
      title: 'For Operators',
      description: 'Help shape bold ventures. Collaborate with mission-led teams solving complex, meaningful problems.',
      icon: <Code2 size={24} />,
      content: 'Join our team of builders and contribute your skills to ventures that make a difference.'
    },
    {
      title: 'For Advisors',
      description: 'Bring your wisdom. Co-create long-term impact. Guide visionary founders toward clarity, structure, and traction.',
      icon: <LightbulbIcon size={24} />,
      content: 'Share your expertise and help shape the next generation of impactful ventures.'
    }
  ];

  return (
    <div className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              🧠 The Ecosystem of the Curious
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            We are designing a new kind of space—one where founders can launch bold ideas, 
            talents can grow their skills, investors can support real innovation, 
            and anyone curious can explore, learn, and evolve.
          </p>
          <div className="max-w-3xl mx-auto bg-gray-800/30 border border-gray-700 rounded-xl p-6 mb-10">
            <p className="text-lg text-gray-300 mb-4">
              Coact is where builders, learners, and dreamers collide.
              It's not just about launching startups.
              It's about building a culture of experimentation, learning, and impact.
            </p>
            <p className="text-lg text-gray-300">
              We're building a living ecosystem for the curious—a space where learning never stops, 
              where ideas evolve, and where every challenge is a chance to build something new.
            </p>
          </div>
        </motion.div>
        
        {/* Interactive Ecosystem Visualization */}
        <div className="relative w-full max-w-5xl mx-auto h-96 mb-20">
          {/* Central Hub */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "reverse", 
              ease: "easeInOut" 
            }}
          >
            <div className="w-44 h-44 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center relative">
              {/* Pulsing rings */}
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-blue-400/30"
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-purple-400/30"
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 1.3, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
              />
              
              {/* Core text */}
              <div className="text-center">
                <span className="text-white font-bold text-2xl">COACT</span>
                <div className="text-xs text-white/80 mt-1">VENTURE STUDIO</div>
              </div>
            </div>
          </motion.div>
          
          {/* Orbital Paths */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-gray-700/30 z-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gray-700/20 z-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-gray-700/10 z-10"></div>
          
          {/* Pathway Nodes */}
          {ecosystem.map((item, index) => {
            // Calculate position on a circle
            const angle = (index * (360 / ecosystem.length)) * (Math.PI / 180);
            const radius = 200; // Distance from center
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <motion.div
                key={index}
                className="absolute z-20"
                style={{ 
                  left: `calc(50% + ${x}px - 3rem)`, 
                  top: `calc(50% + ${y}px - 3rem)` 
                }}
                initial="inactive"
                animate={activeNode === index ? "active" : "inactive"}
                whileHover="active"
                onClick={() => setActiveNode(activeNode === index ? null : index)}
              >
                {/* Connection line to center */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 h-0.5 bg-gradient-to-r from-blue-500/70 to-purple-500/70 origin-left z-10"
                  style={{ 
                    width: radius - 20, 
                    transform: `rotate(${angle + Math.PI}rad) translateX(20px)`,
                  }}
                  variants={{
                    inactive: { opacity: 0.3 },
                    active: { opacity: 1 }
                  }}
                />
                
                {/* Interactive Node */}
                <motion.div
                  className="relative w-24 h-24 rounded-xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 flex flex-col items-center justify-center cursor-pointer overflow-hidden group"
                  variants={{
                    inactive: { scale: 1 },
                    active: { scale: 1.1, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glowing border effect on hover */}
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ 
                      background: `linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))`,
                      filter: "blur(8px)"
                    }}
                  />
                  
                  {/* Icon */}
                  <div className="text-blue-400 mb-1 relative z-10">
                    {item.icon}
                  </div>
                  
                  {/* Title */}
                  <div className="text-xs font-medium text-white text-center relative z-10">
                    {item.title}
                  </div>
                  
                  {/* Animated highlight on hover */}
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"
                    variants={{
                      inactive: { scaleX: 0 },
                      active: { scaleX: 1 }
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                
                {/* Tooltip on hover */}
                <motion.div 
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 p-3 bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-lg shadow-xl z-50"
                  variants={{
                    inactive: { opacity: 0, y: -10, scale: 0.9, pointerEvents: "none" },
                    active: { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" }
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-sm font-medium text-white mb-1">{item.title}</div>
                  <div className="text-xs text-gray-300">{item.description}</div>
                </motion.div>
              </motion.div>
            );
          })}
          
          {/* Animated particles */}
          {[...Array(20)].map((_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const radius = 150 + Math.random() * 100;
            const duration = 5 + Math.random() * 15;
            const delay = Math.random() * 5;
            const size = 1 + Math.random() * 2;
            
            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-blue-500/50"
                style={{ 
                  width: size, 
                  height: size,
                  left: "50%",
                  top: "50%",
                }}
                initial={{ 
                  x: Math.cos(angle) * radius, 
                  y: Math.sin(angle) * radius,
                }}
                animate={{ 
                  x: Math.cos(angle + Math.PI * 2) * radius, 
                  y: Math.sin(angle + Math.PI * 2) * radius,
                }}
                transition={{ 
                  duration, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay
                }}
              />
            );
          })}
        </div>
        
        {/* Detailed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ecosystem.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-xl border border-gray-700 bg-gray-900/30 backdrop-blur-sm overflow-hidden relative group ${
                activeNode === index ? 'ring-2 ring-blue-500/50' : ''
              }`}
              onClick={() => setActiveNode(activeNode === index ? null : index)}
            >
              {/* Futuristic glow effect */}
              <motion.div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ 
                  background: `radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15), transparent 70%)`,
                }}
              />
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  <div className="flex items-center gap-2 text-gray-400 pt-3 border-t border-gray-700">
                    <Sparkles size={16} className="text-blue-400" />
                    <p className="text-sm">{item.content}</p>
                  </div>
                </div>
              </div>
              
              {/* Animated border on hover */}
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              />
            </motion.div>
          ))}
        </div>
        
        {/* Interactive prompt */}
        {activeNode === null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center text-gray-400"
          >
            <MousePointerClick className="mx-auto mb-2 text-blue-400" size={20} />
            <p className="text-sm">Click on a node to explore our ecosystem</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EcosystemSection;