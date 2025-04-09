import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChat } from "ai/react";
import { Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const ChatBox: React.FC = () => {
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
  } = useChat({ api: "/api/gemini" });

  return (
    <>
      {/* Coact Bot toggle button */}
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
            {isOpen ? '×' : ' CB'}
          </span>
        </Button>
      </motion.div>

      {/* Coact Bot chat interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-40 flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mr-3">
                CB
              </div>
              <div>
                <h3 className="font-bold text-white">Venture Studio Bot</h3>
                <p className="text-xs text-slate-300">AI Assistant</p>
              </div>
            </div>

            <ScrollArea className="max-h-[300px] flex-1 overflow-y-auto">
              <div className="flex flex-col h-full">
                {messages?.length === 0 ? (
                  <div className="max-w-[80%] rounded-lg p-3 text-sm my-3 ml-3 flex px-4 py-3 bg-slate-700 text-slate-100 rounded-bl-none justify-start">
                   Hello! I'm the Venture Studio Bot, your AI guide to Venture Studio. How can I assist you today?
                  </div>
                ) : (
                  messages?.map((message, index) => (
                    <div
                      key={index}
                      className={`flex px-4 py-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 text-sm ${
                          message.role === "user"
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-slate-700 text-slate-100 rounded-bl-none"
                        }`}
                      >
                        <ReactMarkdown
                          children={message.content}
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({ node, inline, className, children, ...props }) {
                              return inline ? (
                                <code {...props} className='bg-gray-200 px-1 rounded text-black'>
                                  {children}
                                </code>
                              ) : (
                                <pre {...props} className='bg-gray-800 p-2 rounded overflow-x-auto text-white'>
                                  <code>{children}</code>
                                </pre>
                              );
                            },
                            ul: ({ children }) => (
                              <ul className='list-disc ml-4 space-y-1'>
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className='list-decimal ml-4 space-y-1'>
                                {children}
                              </ol>
                            ),
                          }}
                        />
                      </div>
                    </div>
                  ))
                )}

                {isLoading && (
                  <div className='w-full items-center flex justify-center gap-3 p-3'>
                    <Loader2 className='animate-spin h-5 w-5 text-primary' />
                    <button
                      className='underline text-slate-400 text-sm'
                      type='button'
                      onClick={() => stop()}
                    >
                      stop
                    </button>
                  </div>
                )}

                {error && (
                  <div className='w-full items-center flex justify-center gap-3 p-3'>
                    <div className="text-red-400 text-sm">An error occurred</div>
                    <button
                      className='underline text-slate-400 text-sm'
                      type='button'
                      onClick={() => reload()}
                    >
                      Retry
                    </button>
                  </div>
                )}
              </div>
            </ScrollArea>

            <form
              className="p-3 border-t border-slate-700 flex gap-2"
              onSubmit={handleSubmit}
            >
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask Coact Bot anything..."
                className="bg-slate-800 border-slate-700 text-white placeholder-slate-400"
              />
              <Button
                type='submit'
                size="sm"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Send
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBox;