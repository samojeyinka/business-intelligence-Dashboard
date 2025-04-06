import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MorphingSection from './MorphingSection';
import LogoSlider from './LogoSlider';
import { 
  Users, 
  Briefcase, 
  Code2, 
  LightbulbIcon, 
  Ear, 
  Pencil,
  Rocket,
  Building,
  Workflow,
  ArrowRight,
  Plus,
  Minus,
  MousePointerClick,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const FeaturesSection: React.FC = () => {
  // State for interactive elements
  const [activeMethodIndex, setActiveMethodIndex] = useState<number | null>(null);
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  // Who We Are section
  const whoWeAre = {
    title: "Who We Are",
    mainDescription: "Coact is a venture studio for the builders, the thinkers, and the quietly rebellious.",
    mission: [
      "We question what is and imagine what could be. Our mission is simple:",
      "Build what people truly need to thrive today—while designing for the future we believe in."
    ],
    principles: [
      "We operate at the edge of what's possible.",
      "We explore deeply.",
      "We build deliberately."
    ]
  };
  
  // The Ecosystem section
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
  
  // The Coact Method section
  const coactMethod = [
    {
      title: '1. First, We Listen',
      description: 'We tune into patterns, timing, data, and the silent gaps between industries.',
      icon: <Ear size={24} />,
      content: 'Our process begins with deep listening to identify opportunities that others miss.'
    },
    {
      title: '2. Then, We Design',
      description: 'We architect adaptable systems—not just products—designed for scale and longevity.',
      icon: <Pencil size={24} />,
      content: 'We design holistic solutions that can evolve and adapt to changing conditions.'
    },
    {
      title: '3. Finally, We Build',
      description: 'We execute with surgical focus, guided by insight, not hype. We build ventures that stand the test of time.',
      icon: <Building size={24} />,
      content: 'Our execution is deliberate, focused, and built on a foundation of deep understanding.'
    }
  ];
  
  // Sectors We're Exploring
  const sectors = [
    "Work & Wealth",
    "Knowledge & Thought",
    "Energy & Resources",
    "Exploration & Discovery",
    "Trade & Commerce",
    "Mobility & Logistics",
    "Food & Systems",
    "Media & Influence"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Who We Are Section */}
        <motion.div 
          className="mb-20"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl -ml-32 -mb-32 pointer-events-none"></div>
            
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl sm:text-4xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                  {whoWeAre.title}
                </span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-4">
              <div className="max-w-4xl mx-auto relative z-10">
                {/* Main description - bolder and larger */}
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">
                  {whoWeAre.mainDescription}
                </h2>
                
                {/* Interactive Mission Statement */}
                <div className="text-center mb-12 relative">
                  <motion.div 
                    className="cursor-pointer mx-auto inline-block"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-blue-400">
                        <MousePointerClick size={18} />
                      </span>
                      <span className="text-slate-200 font-medium">Our Mission</span>
                      <span className="text-blue-400">
                        {showFullDescription ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </div>
                    
                    <AnimatePresence>
                      {showFullDescription ? (
                        <motion.p 
                          className="text-slate-300 max-w-3xl mx-auto"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {whoWeAre.mission[0]}<br/>
                          {whoWeAre.mission[1]}
                        </motion.p>
                      ) : (
                        <motion.p 
                          className="text-slate-300 max-w-3xl mx-auto"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          We question what is and imagine what could be.
                          <span className="text-blue-400 ml-2 text-sm">(Click to expand)</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
                
                {/* Three principles in horizontal cards - more interactive */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {whoWeAre.principles.map((principle, idx) => (
                    <motion.div
                      key={idx}
                      className="relative"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.1 } }
                      }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="bg-slate-800/50 border-slate-700 h-full overflow-hidden relative cursor-pointer group">
                        {/* Animated gradient border */}
                        <motion.div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ 
                            background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)',
                          }}
                        />
                        
                        {/* Animated particles on hover */}
                        <AnimatePresence>
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={`particle-${idx}-${i}`}
                              className="absolute w-1 h-1 rounded-full bg-blue-400/70 hidden group-hover:block"
                              initial={{ 
                                x: '50%', 
                                y: '100%', 
                                opacity: 0.7 
                              }}
                              animate={{ 
                                x: `${50 + (Math.random() * 40 - 20)}%`,
                                y: `${20 + (Math.random() * 40)}%`,
                                opacity: 0
                              }}
                              transition={{ 
                                duration: 1 + Math.random(), 
                                repeat: Infinity,
                                repeatDelay: Math.random() * 0.5
                              }}
                            />
                          ))}
                        </AnimatePresence>
                        
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full relative z-10">
                          <motion.div
                            className="text-blue-400 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ y: 10 }}
                            whileHover={{ y: 0 }}
                          >
                            <Sparkles size={20} />
                          </motion.div>
                          <p className="text-xl font-medium text-slate-200 group-hover:text-white transition-colors duration-300">{principle}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* The Ecosystem Section */}
        <motion.div 
          className="mt-24 mb-16"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 overflow-hidden relative mb-12">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl -ml-32 -mt-32 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl -mr-32 -mb-32 pointer-events-none"></div>
            
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl sm:text-4xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                  The Ecosystem
                </span>
              </CardTitle>
              <CardDescription className="text-xl text-slate-300 max-w-3xl mx-auto mt-2">
                <span className="relative inline-block">
                  <span className="relative z-10">One studio. Many pathways.</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></span>
                </span>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6 pb-8 text-center">
              <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-12">
                Whether you're building, investing, collaborating, or advising—Coact is a launchpad for creators of the next era.
              </p>
              
              {/* Interactive Futuristic Ecosystem Visualization */}
              <div className="relative w-full max-w-5xl mx-auto h-96 my-16">
                {/* Central Hub - Perfectly centered */}
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
                
                {/* Orbital Paths - Semi-transparent rings - Perfectly centered */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-slate-600/30 z-10"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-slate-600/20 z-10"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-slate-600/10 z-10"></div>
                
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
                      whileHover="active"
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
                        className="relative w-24 h-24 rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-700 flex flex-col items-center justify-center cursor-pointer overflow-hidden group"
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
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 p-3 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-lg shadow-xl z-50"
                        variants={{
                          inactive: { opacity: 0, y: -10, scale: 0.9, pointerEvents: "none" },
                          active: { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" }
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-sm font-medium text-white mb-1">{item.title}</div>
                        <div className="text-xs text-slate-300">{item.description}</div>
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
            </CardContent>
          </Card>

          {/* Pathway Details Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {ecosystem.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
                }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-slate-900/70 border-slate-700 h-full overflow-hidden relative group">
                  {/* Futuristic glow effect on hover */}
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ 
                      background: `radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15), transparent 70%)`,
                    }}
                  />
                  
                  <CardHeader className="py-6 pb-3 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20 transition-colors duration-300">
                        {item.icon}
                      </div>
                      <CardTitle>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300 group-hover:from-blue-100 group-hover:to-white transition-colors duration-300">
                          {item.title}
                        </span>
                      </CardTitle>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-4 pb-8 relative z-10">
                    <p className="text-slate-300 mb-6 group-hover:text-slate-200 transition-colors duration-300">{item.description}</p>
                    <div className="flex items-start gap-2 text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                      <motion.div
                        initial={{ x: -5 }}
                        whileHover={{ x: 0 }}
                        className="flex items-center"
                      >
                        <ArrowRight size={16} className="mt-1 flex-shrink-0 text-blue-500" />
                      </motion.div>
                      <p>{item.content}</p>
                    </div>
                  </CardContent>
                  
                  {/* Animated border on hover */}
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* The Coact Method Section */}
        <motion.div 
          className="mt-24 mb-16"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 overflow-hidden relative mb-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl -ml-32 -mb-32 pointer-events-none"></div>
            
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl sm:text-4xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                  The Coact Method
                </span>
              </CardTitle>
              <CardDescription className="text-xl text-slate-300 max-w-3xl mx-auto mt-2">
                We build systems that evolve, not just startups.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-4">
              <div className="flex flex-col items-center justify-center mt-8 mb-12">
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {coactMethod.map((method, index) => (
                    <motion.button
                      key={index}
                      className={`px-4 py-2 rounded-full border ${activeMethodIndex === index ? 'bg-blue-500/20 border-blue-500/50 text-white' : 'bg-slate-800/50 border-slate-700 text-slate-300'} transition-all duration-300`}
                      onClick={() => setActiveMethodIndex(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400">{method.icon}</span>
                        <span>{method.title.split('.')[0]}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
                
                <div className="w-full max-w-3xl mx-auto">
                  <AnimatePresence mode="wait">
                    {activeMethodIndex !== null && (
                      <motion.div
                        key={`method-${activeMethodIndex}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 relative overflow-hidden"
                      >
                        {/* Animated background */}
                        <motion.div 
                          className="absolute inset-0 opacity-10"
                          initial={{ backgroundPosition: "0% 0%" }}
                          animate={{ backgroundPosition: "100% 100%" }}
                          transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
                          style={{
                            backgroundImage: "radial-gradient(circle at center, rgba(59, 130, 246, 0.5) 0%, transparent 70%)",
                            backgroundSize: "150% 150%"
                          }}
                        />
                        
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500 flex-shrink-0 mt-1">
                            {coactMethod[activeMethodIndex].icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-3">
                              {coactMethod[activeMethodIndex].title.split('.')[1]}
                            </h3>
                            <p className="text-slate-300 mb-4">{coactMethod[activeMethodIndex].description}</p>
                            <div className="flex items-start gap-2 text-slate-400 mt-4 pt-4 border-t border-slate-700">
                              <motion.div
                                initial={{ x: -5, opacity: 0.5 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
                              >
                                <ArrowRight size={16} className="mt-1 flex-shrink-0 text-blue-500" />
                              </motion.div>
                              <p>{coactMethod[activeMethodIndex].content}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Animated particles */}
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={`method-particle-${i}`}
                            className="absolute w-1 h-1 rounded-full bg-blue-400/70"
                            initial={{ 
                              x: '50%', 
                              y: '100%', 
                              opacity: 0.7 
                            }}
                            animate={{ 
                              x: `${Math.random() * 100}%`,
                              y: `${Math.random() * 100}%`,
                              opacity: 0
                            }}
                            transition={{ 
                              duration: 1 + Math.random() * 2, 
                              repeat: Infinity,
                              repeatDelay: Math.random()
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {activeMethodIndex === null && (
                    <motion.div 
                      className="text-center text-slate-400 py-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <MousePointerClick className="mx-auto mb-3 text-blue-500" />
                      <p>Select a method above to explore our approach</p>
                    </motion.div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center mt-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/70 border border-slate-700 text-sm text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Our methodology is constantly evolving
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sectors We're Exploring Section */}
        <motion.div 
          className="mt-24"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 overflow-hidden relative mb-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl -ml-32 -mb-32 pointer-events-none"></div>
            
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl sm:text-4xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                  Explore Our Ecosystem
                </span>
              </CardTitle>
              <CardDescription className="text-xl text-slate-300 max-w-3xl mx-auto mt-2">
                Ventures spanning life, work, and future essentials.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  <TooltipProvider>
                    {sectors.map((sector, index) => (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <motion.button
                            className={`px-4 py-2 rounded-full border ${activeSector === sector ? 'bg-blue-500/20 border-blue-500/50 text-white' : 'bg-slate-800/50 border-slate-700 text-slate-300'} transition-all duration-300`}
                            onClick={() => setActiveSector(activeSector === sector ? null : sector)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {sector}
                          </motion.button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-slate-900 border-slate-700 text-slate-200">
                          <p>Click to explore {sector}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                </div>
                
                <div className="relative h-64 w-full bg-slate-800/30 rounded-xl border border-slate-700 overflow-hidden mb-8">
                  {/* Interactive sector visualization */}
                  <div className="absolute inset-0">
                    <motion.div 
                      className="absolute inset-0"
                      initial={{ backgroundPosition: "0% 0%" }}
                      animate={{ backgroundPosition: "100% 100%" }}
                      transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
                      style={{
                        backgroundImage: "radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
                        backgroundSize: "150% 150%"
                      }}
                    />
                    
                    {/* Animated particles */}
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={`sector-particle-${i}`}
                        className="absolute w-1 h-1 rounded-full bg-blue-400/50"
                        initial={{ 
                          x: Math.random() * 100 + '%', 
                          y: Math.random() * 100 + '%', 
                          opacity: 0.5 
                        }}
                        animate={{ 
                          x: Math.random() * 100 + '%',
                          y: Math.random() * 100 + '%',
                          opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{ 
                          duration: 5 + Math.random() * 10, 
                          repeat: Infinity,
                          repeatType: "mirror"
                        }}
                      />
                    ))}
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {activeSector ? (
                      <motion.div 
                        key={activeSector}
                        className="absolute inset-0 flex items-center justify-center p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-center max-w-lg">
                          <motion.div 
                            className="inline-block mb-4 p-2 rounded-full bg-blue-500/10 text-blue-400"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, rotate: [0, 10, 0] }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                          >
                            <Sparkles size={24} />
                          </motion.div>
                          <motion.h3 
                            className="text-2xl font-bold text-white mb-3"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          >
                            {activeSector}
                          </motion.h3>
                          <motion.p 
                            className="text-slate-300"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                          >
                            Ventures in this sector are designed to question the norm, push boundaries, and deliver measurable impact.
                          </motion.p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="text-center">
                          <MousePointerClick className="mx-auto mb-3 text-blue-500" size={24} />
                          <p className="text-slate-300">Select a sector above to explore</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="flex justify-center">
                  <motion.div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/70 border border-slate-700 text-sm text-slate-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Each venture is a living experiment—built to evolve and scale
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Portfolio Logo Slider */}
          <motion.div
            className="mb-16"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <LogoSlider />
          </motion.div>

          {/* Closing Section - More Interactive */}
          <motion.div
            className="mt-16 text-center bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-xl p-8 relative overflow-hidden"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            whileHover={{ boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)" }}
          >
            {/* Animated background */}
            <motion.div 
              className="absolute inset-0 opacity-10"
              initial={{ backgroundPosition: "0% 0%" }}
              animate={{ backgroundPosition: "100% 100%" }}
              transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
              style={{
                backgroundImage: "radial-gradient(circle at center, rgba(59, 130, 246, 0.5) 0%, transparent 70%)",
                backgroundSize: "150% 150%"
              }}
            />
            
            {/* Animated particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`closing-particle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-blue-400/50"
                initial={{ 
                  x: Math.random() * 100 + '%', 
                  y: Math.random() * 100 + '%', 
                  opacity: 0.5 
                }}
                animate={{ 
                  x: Math.random() * 100 + '%',
                  y: Math.random() * 100 + '%',
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ 
                  duration: 5 + Math.random() * 10, 
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              />
            ))}
            
            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <motion.div 
                className="inline-block mb-4 p-2 rounded-full bg-blue-500/10 text-blue-400"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Sparkles size={28} />
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-6 text-slate-200">
                A World in Motion, Built by the Curious
              </h3>
              
              <div className="max-w-2xl mx-auto flex flex-col items-center gap-3">
                <motion.div 
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 cursor-pointer"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-blue-400">
                    <Rocket size={16} />
                  </span>
                  <span>We build. We explore. We challenge.</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 cursor-pointer"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="text-purple-400">
                    <LightbulbIcon size={16} />
                  </span>
                  <span>Always with purpose. Always for progress.</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 cursor-pointer mb-6"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-blue-400">
                    <ArrowRight size={16} />
                  </span>
                  <span>Join us as we shape what's next.</span>
                </motion.div>
                
                <motion.div 
                  className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white font-medium cursor-pointer"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Building tomorrow's ventures today
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeaturesSection;