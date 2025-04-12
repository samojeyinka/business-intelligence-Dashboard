import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { Button } from '@/components/ui/button';

const Header = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.asPath]);

  const navItems = [
    { name: 'Ventures', path: '/ventures' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
  ];

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
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
          
          <div className="flex items-center space-x-2">
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
            
          
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="p-1"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <div className="w-6 flex flex-col items-end justify-center space-y-1.5 relative">
                  <motion.span 
                    className="block h-0.5 bg-white rounded-full"
                    animate={{ 
                      width: mobileMenuOpen ? "24px" : "24px",
                      rotate: mobileMenuOpen ? 45 : 0,
                      y: mobileMenuOpen ? 8 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span 
                    className="block h-0.5 bg-white rounded-full" 
                    animate={{ 
                      width: mobileMenuOpen ? 0 : "16px",
                      opacity: mobileMenuOpen ? 0 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span 
                    className="block h-0.5 bg-white rounded-full"
                    animate={{ 
                      width: mobileMenuOpen ? "24px" : "20px",
                      rotate: mobileMenuOpen ? -45 : 0,
                      y: mobileMenuOpen ? -8 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <motion.div
              className="absolute right-0 top-0 h-full w-64 bg-slate-900 shadow-lg p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col space-y-8 mt-16">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="border-b border-slate-800 pb-2"
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-lg font-medium"
                      onClick={() => router.push(item.path)}
                    >
                      {item.name}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;