import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';

const Nova: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! I'm Nova, your AI guide to Coact Venture Studio. How can I assist you today?", isUser: false },
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { text: input, isUser: true }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'm analyzing your request. Coact specializes in creating innovative ventures at the intersection of technology and human experience.",
        "That's an interesting question! Our adaptive interfaces are designed to evolve with user interaction patterns.",
        "Coact's mission is to build ventures that redefine digital experiences through AI, immersive design, and real-time data.",
        "I'd be happy to connect you with our team to discuss potential collaborations or investments.",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
    }, 1000);
  };

  return (
    <>
      {/* Nova toggle button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-0 flex items-center justify-center"
        >
          <span className="text-xl">
            {isOpen ? '×' : 'N'}
          </span>
        </Button>
      </motion.div>

      {/* Nova chat interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-40"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mr-3">
                N
              </div>
              <div>
                <h3 className="font-bold text-white">Nova</h3>
                <p className="text-xs text-slate-300">AI Assistant</p>
              </div>
            </div>
            
            <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index % 3) }}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-slate-800 text-slate-100'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="p-3 border-t border-slate-700 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask Nova anything..."
                className="bg-slate-800 border-slate-700"
              />
              <Button onClick={handleSendMessage} size="sm">
                Send
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nova;