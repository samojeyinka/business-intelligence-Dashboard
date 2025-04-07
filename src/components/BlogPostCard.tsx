import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Tag, MessageCircle, Share2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
  };
  publishedAt: string;
  readingTime: string;
  tags: string[];
  commentCount: number;
  contributedBy?: string[];
}

interface BlogPostCardProps {
  post: BlogPost;
  onSelect: (post: BlogPost) => void;
  variant?: 'compact' | 'expanded';
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ 
  post, 
  onSelect,
  variant = 'compact'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm transition-all duration-500 ${
        variant === 'expanded' ? 'p-6' : 'p-4'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 10px 30px -10px rgba(120, 60, 200, 0.3)'
      }}
      onClick={() => onSelect(post)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient border effect */}
      <motion.div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(90deg, #a855f7, #3b82f6, #a855f7)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite linear',
          zIndex: -1,
          padding: '1px',
        }}
      />
      
      {/* Cover image with overlay */}
      <div className="relative mb-4 overflow-hidden rounded-lg aspect-video">
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"
          animate={{ opacity: isHovered ? 0.9 : 0.7 }}
          transition={{ duration: 0.3 }}
        />
        <motion.img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Tags overlay */}
        <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map(tag => (
            <Badge 
              key={tag} 
              className="bg-purple-600/80 hover:bg-purple-500 text-xs backdrop-blur-sm"
            >
              {tag}
            </Badge>
          ))}
          {post.tags.length > 2 && (
            <Badge className="bg-zinc-800/80 hover:bg-zinc-700 text-xs backdrop-blur-sm">
              +{post.tags.length - 2}
            </Badge>
          )}
        </div>
        
        {/* Reading time */}
        <div className="absolute bottom-3 right-3 z-20">
          <div className="flex items-center gap-1 text-xs bg-black/60 text-white px-2 py-1 rounded-full backdrop-blur-sm">
            <Clock className="w-3 h-3" />
            <span>{post.readingTime}</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div>
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
          {post.title}
        </h3>
        
        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        
        {/* Author and date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border border-zinc-700">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback className="bg-purple-900 text-purple-200">
                {post.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-zinc-300">{post.author.name}</p>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Calendar className="w-3 h-3" />
                <span>{post.publishedAt}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-zinc-400">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{post.commentCount}</span>
            </div>
            
            {post.contributedBy && post.contributedBy.length > 0 && (
              <div className="flex -space-x-2">
                {post.contributedBy.slice(0, 3).map((contributor, i) => (
                  <div 
                    key={i} 
                    className="h-5 w-5 rounded-full border border-zinc-800 bg-zinc-700 flex items-center justify-center text-[10px] text-zinc-300"
                    title="Contributors"
                  >
                    {contributor.charAt(0)}
                  </div>
                ))}
                {post.contributedBy.length > 3 && (
                  <div className="h-5 w-5 rounded-full border border-zinc-800 bg-zinc-700 flex items-center justify-center text-[10px] text-zinc-300">
                    +{post.contributedBy.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Expanded content */}
        {variant === 'expanded' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-zinc-800"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                {post.tags.map(tag => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="text-xs border-zinc-700 text-zinc-400"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-zinc-400 hover:text-purple-400"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
            
            <p className="text-zinc-300 text-sm mb-4">
              {post.excerpt}
            </p>
            
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Read Full Article
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default BlogPostCard;