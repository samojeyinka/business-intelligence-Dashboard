import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Logo from './Logo';
import { Button } from '@/components/ui/button';

const Header = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 100], [1, 0.8]);
  const height = useTransform(scrollY, [0, 100], [80, 60]);
  const blur = useTransform(scrollY, [0, 100], [0, 8]);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Ventures', path: '/ventures' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50 w-full"
      style={{ 
        opacity,
        height,
        backdropFilter: `blur(${blur.get()}px)`,
      }}
    >
      <motion.div 
        className={`flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          scrolled ? 'bg-slate-900/70' : 'bg-transparent'
        }`}
      >
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Logo />
        </div>
        
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Button
                variant="ghost"
                className="relative overflow-hidden group"
                onClick={() => router.push(item.path)}
              >
                {item.name}
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />
              </Button>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => router.push("/connect")}
          >
            Connect
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Header;