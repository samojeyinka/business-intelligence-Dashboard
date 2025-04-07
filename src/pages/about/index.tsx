import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DynamicCursor from '@/components/DynamicCursor';
import InteractiveBackground from '@/components/InteractiveBackground';
import EcosystemSection from '@/components/EcosystemSection';
import Header from '@/components/Header';

// Define the sections for the interactive journey
const journeySections = [
  {
    id: 'learn',
    title: 'Learn',
    description: 'We believe in continuous learning and exploration of new technologies, markets, and ideas.',
    icon: '🔍',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: 'explore',
    title: 'Explore',
    description: 'We venture into uncharted territories, testing hypotheses and validating concepts.',
    icon: '🧭',
    color: 'from-purple-500 to-pink-400',
  },
  {
    id: 'build',
    title: 'Build',
    description: 'We transform validated ideas into impactful ventures with sustainable business models.',
    icon: '🛠️',
    color: 'from-green-500 to-emerald-400',
  },
  {
    id: 'partner',
    title: 'Partner',
    description: 'We collaborate with visionary founders and forward-thinking organizations.',
    icon: '🤝',
    color: 'from-orange-500 to-amber-400',
  },
];

// No team members data needed

// Interactive mission statement component
const InteractiveMission = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  
  const words = [
    'innovate',
    'disrupt',
    'transform',
    'create',
    'revolutionize',
    'empower',
    'accelerate',
  ];
  
  const [currentWord, setCurrentWord] = useState(0);
  
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setCurrentWord((prev) => (prev + 1) % words.length);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isInView]);
  
  return (
    <div ref={ref} className="text-center max-w-4xl mx-auto my-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        We partner with founders to{' '}
        <motion.span
          key={currentWord}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
        >
          {words[currentWord]}
        </motion.span>
        {' '}the future.
      </h2>
      <p className="text-xl text-gray-300 mb-6">
        Coact is a venture creation engine built to empower bold thinkers, innovative minds, and passionate builders.
        We exist to help people—regardless of background—turn ideas into impactful startups.
      </p>
      <div className="mt-8 p-6 rounded-xl bg-gray-800/30 border border-gray-700">
        <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          🌍 Our Vision
        </h3>
        <p className="text-lg text-gray-300">
          To become the foundational infrastructure for startup creation across Africa—and eventually, globally.
          The platform where people return when they're ready to create again, grow again, learn again.
        </p>
      </div>
    </div>
  );
};

// Interactive journey component
const JourneySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  return (
    <div ref={containerRef} className="py-20 relative">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Journey</h2>
      
      <div className="max-w-6xl mx-auto relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full" />
        
        {journeySections.map((section, index) => (
          <motion.div
            key={section.id}
            className="mb-24 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}>
              <div className="w-1/2 px-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`p-8 rounded-2xl bg-gradient-to-br ${section.color} bg-opacity-10 backdrop-blur-sm border border-gray-700`}
                >
                  <div className="text-4xl mb-4">{section.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{section.title}</h3>
                  <p className="text-gray-300">{section.description}</p>
                </motion.div>
              </div>
              
              <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-black border-4 border-gray-800 flex items-center justify-center">
                <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${section.color}`} />
              </div>
              
              <div className="w-1/2" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Interactive values game component
const ValuesGame = () => {
  const [activeValue, setActiveValue] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  
  const values = [
    {
      id: 'innovation',
      name: 'Innovation',
      description: 'We approach challenges with an open mind and drive to discover new solutions.',
      icon: '🧠',
    },
    {
      id: 'courage',
      name: 'Courage',
      description: 'We embrace uncertainty and take calculated risks to drive innovation.',
      icon: '🦁',
    },
    {
      id: 'collaboration',
      name: 'Collaboration',
      description: 'We believe the best solutions emerge from diverse perspectives working together.',
      icon: '🤝',
    },
    {
      id: 'creativity',
      name: 'Creativity',
      description: 'We think outside conventional boundaries to solve complex problems.',
      icon: '💡',
    },
  ];
  
  const handleValueClick = (id: string) => {
    setActiveValue(id);
    setScore(prev => prev + 10);
  };
  
  return (
    <div className="py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
        <p className="text-xl text-gray-300 mb-6">Explore our core values that drive everything we do</p>
        <div className="inline-block bg-gray-800 rounded-full px-4 py-2 text-sm">
          Exploration Score: <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">{score}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {values.map((value) => (
          <motion.div
            key={value.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleValueClick(value.id)}
            className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
              activeValue === value.id 
                ? 'border-purple-500 bg-gray-800/50' 
                : 'border-gray-700 bg-gray-900/30'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="text-4xl">{value.icon}</div>
              <div>
                <h3 className="text-xl font-bold mb-2">{value.name}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            </div>
            
            {activeValue === value.id && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-gray-700"
              >
                <p className="text-sm text-purple-300">
                  You've unlocked insights about our {value.name.toLowerCase()} value! 
                  This drives our approach to venture building.
                </p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Team showcase component removed

// Call to action component
const CallToAction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      className="py-20 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build the Future Together?</h2>
        <p className="text-xl text-gray-300 mb-8">
          Whether you're a founder with a bold vision or an organization seeking innovation,
          we'd love to explore how we can partner with you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Connect With Us
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-gray-600 hover:bg-gray-800"
          >
            Explore Our Ventures
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default function AboutPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Only show dynamic cursor on client-side to prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <>
      <Head>
        <title>About Us | Coact Ventures</title>
        <meta name="description" content="Learn about Coact Ventures - a venture studio focused on learning, exploring, and building the future." />
      </Head>
      
      {isMounted && <DynamicCursor />}
      
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <InteractiveBackground />
        
        {/* Header */}
        <Header />
        
        {/* Progress bar */}
        <motion.div 
          className="fixed left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 z-50"
          style={{ height: progressHeight }}
        />
        
        {/* Hero section */}
        <div className="pt-32 pb-20 px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                About Coact
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              A venture creation engine built to empower bold thinkers, innovative minds, and passionate builders
            </p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-3xl mx-auto p-6 rounded-xl bg-gray-800/20 border border-gray-700 mb-10"
            >
              <p className="text-lg text-gray-300">
                Our platform brings together everything needed to create, grow, and sustain ventures in today's fast-changing world.
                We're more than just a startup builder—we're building a living ecosystem for innovative thinkers and creators.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-gray-400 text-sm"
            >
              Scroll to begin the journey
            </motion.div>
            
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mt-4 mx-auto w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center"
            >
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-2 h-2 bg-white rounded-full mt-1"
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Interactive mission statement */}
        <InteractiveMission />
        
        {/* Journey section */}
        <JourneySection />
        
        {/* Values game */}
        <ValuesGame />
        
        {/* Ecosystem section */}
        <EcosystemSection />
        
        {/* Call to action */}
        <CallToAction />
      </div>
    </>
  );
}