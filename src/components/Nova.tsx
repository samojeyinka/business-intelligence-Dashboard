import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { useState,useEffect,useRef } from 'react';
import ReactMarkdown from "react-markdown"
import remartGfm from "remark-gfm"
import {useChat} from "ai/react"

const Nova: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    error
  } = useChat({api: "/src/pages/api/gemini"})
  

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
             No mesage yet
            </div>
            
            <form className="p-3 border-t border-slate-700 flex gap-2"
            onSubmit={handleSubmit}
            >
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask Nova anything..."
                className="bg-slate-800 border-slate-700"
              />
              <Button type='submit' size="sm" disabled={isLoading}>
                Send
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nova;