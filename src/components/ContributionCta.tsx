import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Edit, Share, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContributionCta: React.FC = () => {
  return (
    <motion.div 
      className="relative py-16 px-4 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="p-8 rounded-2xl border border-purple-500/20 bg-zinc-900/50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-4">
                <Sparkles className="w-3 h-3" />
                <span>Open Knowledge</span>
              </div>
              
              <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Contribute to Our Living Blog
              </h2>
              
              <p className="text-gray-300 mb-6">
                Share your insights, expertise, and perspectives with our community. 
                The future is built through collective knowledge and collaborative efforts.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Submit Article
                </Button>
                
                <Button 
                  variant="outline"
                  className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share Resources
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/3">
              <motion.div 
                className="relative p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="absolute -top-3 -right-3 p-2 rounded-full bg-purple-600 text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                
                <h3 className="text-lg font-medium mb-3 text-white">Why Contribute?</h3>
                
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="p-1 mt-0.5 rounded-full bg-blue-500/20 text-blue-400">
                      <BookOpen className="w-3 h-3" />
                    </div>
                    <span>Share knowledge with a growing community</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="p-1 mt-0.5 rounded-full bg-purple-500/20 text-purple-400">
                      <BookOpen className="w-3 h-3" />
                    </div>
                    <span>Collaborate with other innovative minds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="p-1 mt-0.5 rounded-full bg-pink-500/20 text-pink-400">
                      <BookOpen className="w-3 h-3" />
                    </div>
                    <span>Help build the ecosystem of the future</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContributionCta;