import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CtaSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      // In a real app, you would send this to your API
    }
  };

  return (
    <motion.div 
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[80px]"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 1.5 }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full filter blur-[80px]"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 1.5 }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div 
          className="bg-slate-900/50 backdrop-blur-lg border border-slate-800 rounded-2xl p-8 sm:p-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="text-center mb-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Join Our Ecosystem
              </span>
            </h2>
            <p className="text-xl text-slate-300">
              Connect with us to explore opportunities for collaboration, investment, or venture building.
            </p>
          </motion.div>
          
          <motion.form 
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {!isSubmitted ? (
              <>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow bg-slate-800/50 border-slate-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
                >
                  Join Our Network
                </Button>
              </>
            ) : (
              <motion.div 
                className="w-full text-center py-3 text-green-400"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                Thank you! We'll be in touch soon.
              </motion.div>
            )}
          </motion.form>
          
          <motion.div 
            className="mt-8 text-center text-sm text-slate-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            By signing up, you'll be the first to experience our next-generation web platform and receive updates on our latest ventures.
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CtaSection;