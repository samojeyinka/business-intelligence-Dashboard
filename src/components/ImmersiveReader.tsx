import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Bookmark, Share2, MessageCircle, ThumbsUp, Clock, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import CommentSection from '@/components/CommentSection';
import { BlogPost } from './BlogPostCard';

interface ImmersiveReaderProps {
  post: BlogPost | null;
  onClose: () => void;
}

const ImmersiveReader: React.FC<ImmersiveReaderProps> = ({ post, onClose }) => {
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42); // Mock data
  
  // Handle scroll to update progress and hide/show controls
  useEffect(() => {
    if (!post) return;
    
    const handleScroll = (e: any) => {
      const container = e.target;
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const newProgress = (scrollTop / scrollHeight) * 100;
      
      setProgress(newProgress);
      
      // Hide controls when scrolling down, show when scrolling up
      if (scrollTop > lastScrollY + 20 && showControls) {
        setShowControls(false);
      } else if (scrollTop < lastScrollY - 20 && !showControls) {
        setShowControls(true);
      }
      
      setLastScrollY(scrollTop);
    };
    
    const scrollContainer = document.getElementById('immersive-scroll-container');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [post, lastScrollY, showControls]);
  
  // Reset state when post changes
  useEffect(() => {
    if (post) {
      setProgress(0);
      setShowControls(true);
      setLastScrollY(0);
      setIsBookmarked(false);
      setIsLiked(false);
    }
  }, [post]);
  
  if (!post) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close button */}
        <motion.button
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-200"
          onClick={onClose}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : -20 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-6 h-6" />
        </motion.button>
        
        {/* Progress bar */}
        <motion.div 
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50"
          style={{ width: `${progress}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
        
        {/* Navigation controls */}
        <motion.div 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: showControls ? 1 : 0, x: showControls ? 0 : -20 }}
          transition={{ duration: 0.2 }}
        >
          <Button 
            size="icon" 
            variant="ghost" 
            className="rounded-full bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-200"
            onClick={() => console.log('Previous article')}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </motion.div>
        
        <motion.div 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: showControls ? 1 : 0, x: showControls ? 0 : 20 }}
          transition={{ duration: 0.2 }}
        >
          <Button 
            size="icon" 
            variant="ghost" 
            className="rounded-full bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-200"
            onClick={() => console.log('Next article')}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </motion.div>
        
        {/* Floating action buttons */}
        <motion.div 
          className="fixed right-6 top-2/3 transform -translate-y-1/2 flex flex-col gap-4 z-50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: showControls ? 1 : 0, x: showControls ? 0 : 20 }}
          transition={{ duration: 0.2 }}
        >
          <Button 
            size="icon" 
            variant="ghost" 
            className={`rounded-full ${isBookmarked ? 'bg-purple-900/80 text-purple-200' : 'bg-zinc-900/80 text-zinc-400'} hover:text-white hover:bg-zinc-800 transition-all duration-200`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
          </Button>
          
          <Button 
            size="icon" 
            variant="ghost" 
            className={`rounded-full ${isLiked ? 'bg-purple-900/80 text-purple-200' : 'bg-zinc-900/80 text-zinc-400'} hover:text-white hover:bg-zinc-800 transition-all duration-200`}
            onClick={() => {
              setIsLiked(!isLiked);
              setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
            }}
          >
            <div className="flex flex-col items-center">
              <ThumbsUp className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
              <span className="text-xs mt-1">{likeCount}</span>
            </div>
          </Button>
          
          <Button 
            size="icon" 
            variant="ghost" 
            className="rounded-full bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-200"
            onClick={() => {
              const commentsSection = document.getElementById('immersive-scroll-container');
              if (commentsSection) {
                commentsSection.scrollTo({
                  top: commentsSection.scrollHeight,
                  behavior: 'smooth'
                });
              }
            }}
          >
            <div className="flex flex-col items-center">
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs mt-1">{post.commentCount}</span>
            </div>
          </Button>
          
          <Button 
            size="icon" 
            variant="ghost" 
            className="rounded-full bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-200"
            onClick={() => console.log('Share')}
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </motion.div>
        
        {/* Main content */}
        <div className="w-full h-full max-w-4xl mx-auto py-16 px-4">
          <ScrollArea className="h-full rounded-lg" id="immersive-scroll-container">
            <div className="pb-20">
              {/* Header */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex gap-2 mb-4">
                  {post.tags.map(tag => (
                    <Badge 
                      key={tag} 
                      className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  {post.title}
                </h1>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-purple-500/30">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback className="bg-purple-900 text-purple-200">
                        {post.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-white">{post.author.name}</p>
                      <p className="text-xs text-zinc-400">{post.author.role || 'Contributor'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-zinc-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readingTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.publishedAt}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Cover image */}
              <motion.div 
                className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Content */}
              <motion.div 
                className="prose prose-invert prose-purple max-w-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Contributors section */}
              {post.contributedBy && post.contributedBy.length > 0 && (
                <motion.div 
                  className="mt-12 p-6 rounded-lg border border-zinc-800 bg-zinc-900/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Contributors
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {post.contributedBy.map((contributor, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-2 px-3 py-2 rounded-full bg-zinc-800 text-zinc-300 text-sm"
                      >
                        <div className="h-6 w-6 rounded-full bg-purple-900/50 flex items-center justify-center text-xs">
                          {contributor.charAt(0)}
                        </div>
                        <span>{contributor}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Comment section */}
              <CommentSection postId={post.id} />
            </div>
          </ScrollArea>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImmersiveReader;