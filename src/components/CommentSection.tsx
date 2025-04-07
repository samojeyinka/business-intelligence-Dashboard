import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, ThumbsUp, Flag } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
}

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: {
        name: 'Alex Rivera',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      content: 'This is a fantastic article! I especially appreciated the insights on collaborative innovation.',
      timestamp: '2 hours ago',
      likes: 5,
      isLiked: false,
    },
    {
      id: '2',
      author: {
        name: 'Maya Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      content: 'I would love to see more examples of how these principles are applied in different industries.',
      timestamp: '1 day ago',
      likes: 3,
      isLiked: true,
      replies: [
        {
          id: '2-1',
          author: {
            name: 'Jordan Taylor',
            avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
          },
          content: 'Great point! I've seen similar approaches in healthcare innovation.',
          timestamp: '20 hours ago',
          likes: 2,
          isLiked: false,
        }
      ]
    },
  ]);
  
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };
  
  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newCommentObj: Comment = {
        id: `new-${Date.now()}`,
        author: {
          name: 'You',
          avatar: 'https://randomuser.me/api/portraits/lego/1.jpg', // Placeholder avatar
        },
        content: newComment,
        timestamp: 'Just now',
        likes: 0,
        isLiked: false,
      };
      
      setComments([newCommentObj, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleLikeComment = (commentId: string) => {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          };
        }
        
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  isLiked: !reply.isLiked,
                };
              }
              return reply;
            }),
          };
        }
        
        return comment;
      });
    });
  };
  
  return (
    <motion.div
      className="mt-16 pt-8 border-t border-zinc-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="w-5 h-5 text-purple-400" />
        <h3 className="text-xl font-bold">Comments ({comments.length})</h3>
      </div>
      
      {/* Comment form */}
      <div className="mb-8">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10 border-2 border-purple-500/30">
            <AvatarImage src="https://randomuser.me/api/portraits/lego/1.jpg" alt="Your avatar" />
            <AvatarFallback className="bg-purple-900 text-purple-200">YO</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <Textarea
              placeholder="Share your thoughts..."
              className="bg-zinc-900/50 border border-zinc-700 min-h-[100px] mb-3"
              value={newComment}
              onChange={handleCommentChange}
            />
            
            <div className="flex justify-end">
              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || isSubmitting}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Comments list */}
      <div className="space-y-6">
        {comments.map(comment => (
          <div key={comment.id} className="space-y-4">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10 border-2 border-purple-500/30">
                <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                <AvatarFallback className="bg-purple-900 text-purple-200">
                  {comment.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{comment.author.name}</span>
                    <span className="text-xs text-zinc-500">{comment.timestamp}</span>
                  </div>
                  
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-300">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-zinc-300 mb-2">{comment.content}</p>
                
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-xs flex items-center gap-1 ${comment.isLiked ? 'text-purple-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    <ThumbsUp className="h-3 w-3" fill={comment.isLiked ? 'currentColor' : 'none'} />
                    <span>{comment.likes} {comment.likes === 1 ? 'Like' : 'Likes'}</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1"
                  >
                    <MessageCircle className="h-3 w-3" />
                    <span>Reply</span>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-14 pl-4 border-l border-zinc-800 space-y-4">
                {comment.replies.map(reply => (
                  <div key={reply.id} className="flex gap-4">
                    <Avatar className="h-8 w-8 border-2 border-purple-500/30">
                      <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                      <AvatarFallback className="bg-purple-900 text-purple-200">
                        {reply.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{reply.author.name}</span>
                          <span className="text-xs text-zinc-500">{reply.timestamp}</span>
                        </div>
                      </div>
                      
                      <p className="text-zinc-300 mb-2">{reply.content}</p>
                      
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`text-xs flex items-center gap-1 ${reply.isLiked ? 'text-purple-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                          onClick={() => handleLikeComment(reply.id)}
                        >
                          <ThumbsUp className="h-3 w-3" fill={reply.isLiked ? 'currentColor' : 'none'} />
                          <span>{reply.likes} {reply.likes === 1 ? 'Like' : 'Likes'}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {comment !== comments[comments.length - 1] && (
              <Separator className="bg-zinc-800" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CommentSection;