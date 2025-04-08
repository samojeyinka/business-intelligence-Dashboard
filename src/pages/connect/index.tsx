import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import DynamicCursor from '@/components/DynamicCursor';
import FloatingElements from '@/components/FloatingElements';
import VentureParticleEffect from '@/components/VentureParticleEffect';
import Nova from '@/components/Nova';
import { ArrowRight, Users, Lightbulb, MessageCircle, Rocket, Sparkles } from 'lucide-react';

const ConnectPage = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Track mouse position for parallax effects
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) - 0.5;
    const y = (clientY / window.innerHeight) - 0.5;
    setMousePosition({ x, y });
  };

  // Client-side only components
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const connectOptions = [
    {
      id: 'join-venture',
      title: 'Join a Venture',
      description: 'Collaborate with innovative teams on cutting-edge projects',
      icon: <Users className="w-6 h-6 text-blue-400" />,
      color: 'from-blue-600 to-cyan-400',
      path: '/connect/join'
    },
    {
      id: 'lead-venture',
      title: 'Lead a Venture',
      description: 'Apply to lead one of our ventures with your expertise',
      icon: <Rocket className="w-6 h-6 text-purple-400" />,
      color: 'from-purple-600 to-pink-400',
      path: '/connect/lead'
    },
    {
      id: 'ask-question',
      title: 'Ask a Question',
      description: 'Reach out with questions about our ventures or process',
      icon: <MessageCircle className="w-6 h-6 text-green-400" />,
      color: 'from-green-500 to-emerald-400',
      path: '/connect/ask'
    },
    {
      id: 'find-collaborators',
      title: 'Find Collaborators',
      description: 'Connect with others to bring your project to life',
      icon: <Users className="w-6 h-6 text-amber-400" />,
      color: 'from-amber-500 to-yellow-300',
      path: '/connect/find-collaborators'
    }
  ];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    
    // Find the selected option
    const option = connectOptions.find(opt => opt.id === optionId);
    
    // Navigate to the appropriate page after a brief delay
    if (option) {
      setTimeout(() => {
        router.push(option.path);
      }, 500);
    }
  };

  return (
    <div 
      className="min-h-screen bg-black text-white overflow-hidden" 
      onMouseMove={handleMouseMove}
    >
      {/* Interactive background */}
      <VentureParticleEffect />
      
      {/* Floating elements */}
      <FloatingElements count={15} />
      
      {/* Dynamic cursor (client-side only) */}
      {isMounted && <DynamicCursor />}
      
      <Header />
      
      <main className="container mx-auto px-4 py-32 relative z-10">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center relative"
        >
          <motion.div
            animate={{
              x: mousePosition.x * -20,
              y: mousePosition.y * -20,
            }}
            transition={{ type: 'spring', damping: 25 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent rounded-full blur-3xl pointer-events-none"
          />
          
          <motion.h1 
            className="text-6xl sm:text-7xl font-bold mb-6 relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-amber-500 inline-block">
              Connect
            </span>
            <br />
            <motion.span 
              className="inline-block relative"
              animate={{
                x: mousePosition.x * 10,
                y: mousePosition.y * 10,
              }}
              transition={{ type: 'spring', damping: 25 }}
            >
              with Coact
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="mt-4 text-xl text-zinc-400 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose how you'd like to engage with our ecosystem of innovation
          </motion.p>
        </motion.div>

        {/* Connection options grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AnimatePresence>
            {connectOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className={selectedOption && selectedOption !== option.id ? 'opacity-50' : ''}
              >
                <Card 
                  className="border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm h-full cursor-pointer overflow-hidden relative group"
                  onClick={() => handleOptionSelect(option.id)}
                >
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-900/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 p-[1px] rounded-lg overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                  </div>
                  
                  <div className="p-6 relative z-10">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${option.color} bg-opacity-10`}>
                        {option.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                        {option.title}
                      </h3>
                    </div>
                    
                    <p className="text-zinc-400 mb-6">
                      {option.description}
                    </p>
                    
                    <div className="flex justify-end">
                      <Badge 
                        className={`bg-gradient-to-r ${option.color} text-white px-3 py-1 gap-1 opacity-80 group-hover:opacity-100 transition-opacity`}
                      >
                        <span>Select</span>
                        <ArrowRight className="w-4 h-4" />
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Animated decorative element */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30"
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-8 h-8 text-purple-400" />
        </motion.div>
      </main>
      
      {/* Nova AI Assistant */}
      {isMounted && <Nova />}
    </div>
  );
};

export default ConnectPage;