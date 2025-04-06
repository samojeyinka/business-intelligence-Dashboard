import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchVentureBySlug, upvoteVenture, addComment } from '@/lib/api';
import { VentureWithRelations, VentureStage, CommentWithUser } from '@/types/venture';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ChevronUp, MessageSquare, Globe, Twitter, Linkedin, Github, Calendar, Users, ArrowLeft, Send, ThumbsUp, Eye, EyeOff, Clock } from 'lucide-react';
import Header from '@/components/Header';
import InteractiveBackground from '@/components/InteractiveBackground';

const stageColors: Record<VentureStage, string> = {
  IDEA: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  PROTOTYPE: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  MVP: 'bg-green-500/10 text-green-500 border-green-500/20',
  GROWTH: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  SCALE: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const CommentItem = ({ comment }: { comment: CommentWithUser }) => {
  return (
    <div className="mb-6">
      <div className="flex items-start space-x-3">
        <Avatar>
          <AvatarImage src={comment.user.image || undefined} />
          <AvatarFallback>{comment.user.name?.charAt(0) || '?'}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-white">{comment.user.name}</h4>
            <span className="text-xs text-zinc-500">
              {new Date(comment.createdAt).toLocaleDateString()} at {new Date(comment.createdAt).toLocaleTimeString()}
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-300">{comment.content}</p>
        </div>
      </div>
    </div>
  );
};

const VentureDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [venture, setVenture] = useState<VentureWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [upvoting, setUpvoting] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [hasUpvoted, setHasUpvoted] = useState(false); // In a real app, this would be based on user state

  // Fetch venture data
  useEffect(() => {
    if (slug && typeof slug === 'string') {
      const loadVenture = async () => {
        setLoading(true);
        try {
          const data = await fetchVentureBySlug(slug);
          setVenture(data);
          setUpvoteCount(data._count.upvotes);
          // In a real app, you would check if the current user has upvoted
          setHasUpvoted(false);
        } catch (error) {
          console.error('Failed to fetch venture:', error);
        } finally {
          setLoading(false);
        }
      };

      loadVenture();
    }
  }, [slug]);

  // Handle upvote
  const handleUpvote = async () => {
    if (!venture || upvoting) return;

    setUpvoting(true);
    try {
      const response = await upvoteVenture(venture.id);
      if (response.action === 'added') {
        setUpvoteCount(prev => prev + 1);
        setHasUpvoted(true);
      } else {
        setUpvoteCount(prev => prev - 1);
        setHasUpvoted(false);
      }
    } catch (error) {
      console.error('Failed to upvote:', error);
    } finally {
      setUpvoting(false);
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!venture || !commentText.trim() || submittingComment) return;

    setSubmittingComment(true);
    try {
      const newComment = await addComment(venture.id, commentText);
      // Add the new comment to the list
      if (venture.comments) {
        setVenture({
          ...venture,
          comments: [newComment, ...venture.comments],
          _count: {
            ...venture._count,
            comments: venture._count.comments + 1
          }
        });
      }
      setCommentText('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <InteractiveBackground />
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="h-16 w-16 rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
          </div>
        </main>
      </div>
    );
  }

  if (!venture) {
    return (
      <div className="min-h-screen bg-black text-white">
        <InteractiveBackground />
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-white">Venture not found</h2>
            <p className="mt-2 text-zinc-400">The venture you're looking for doesn't exist or has been removed</p>
            <Button 
              className="mt-4 bg-purple-600 hover:bg-purple-700"
              onClick={() => router.push('/ventures')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Ventures
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <InteractiveBackground />
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="relative z-10">
          <Button 
            variant="ghost" 
            className="mb-6 text-zinc-400 hover:text-white"
            onClick={() => router.push('/ventures')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Ventures
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
                  {/* Venture header */}
                  <div className="p-6 border-b border-zinc-800">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        {venture.logo ? (
                          <div className="relative h-16 w-16 overflow-hidden rounded-md bg-zinc-800">
                            <img 
                              src={venture.logo} 
                              alt={`${venture.name} logo`} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-zinc-800 text-2xl font-bold text-white">
                            {venture.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-white">
                              {venture.name}
                            </h1>
                            {venture.isStealthMode && (
                              <Badge variant="outline" className="ml-2 bg-zinc-800 text-zinc-400">
                                <EyeOff className="mr-1 h-3 w-3" />
                                Stealth Mode
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline" className={`flex items-center gap-1 px-2 py-0 ${stageColors[venture.stage]}`}>
                              {venture.stage}
                            </Badge>
                            {venture.isLookingForCollaborators && (
                              <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                                <Users className="mr-1 h-3 w-3" />
                                Seeking Collaborators
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant={hasUpvoted ? "default" : "outline"}
                          size="sm"
                          className={hasUpvoted ? "bg-purple-600 hover:bg-purple-700" : "border-zinc-700 text-zinc-400"}
                          onClick={handleUpvote}
                          disabled={upvoting}
                        >
                          <ChevronUp className="mr-1 h-4 w-4" />
                          Upvote {upvoteCount > 0 && `(${upvoteCount})`}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tabs navigation */}
                  <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                    <div className="border-b border-zinc-800">
                      <TabsList className="bg-transparent h-12">
                        <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:text-purple-400 rounded-none">
                          Overview
                        </TabsTrigger>
                        <TabsTrigger value="team" className="data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:text-purple-400 rounded-none">
                          Team
                        </TabsTrigger>
                        <TabsTrigger value="discussion" className="data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:text-purple-400 rounded-none">
                          Discussion ({venture._count.comments})
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    
                    {/* Overview tab */}
                    <TabsContent value="overview" className="p-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">About</h3>
                          <p className="text-zinc-300">{venture.description}</p>
                          {venture.longDescription && (
                            <div className="mt-4 text-zinc-300 whitespace-pre-line">
                              {venture.longDescription}
                            </div>
                          )}
                        </div>
                        
                        <Separator className="bg-zinc-800" />
                        
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">Sectors</h3>
                          <div className="flex flex-wrap gap-2">
                            {venture.sectors.map((sector) => (
                              <Badge key={sector} variant="outline" className="bg-zinc-800/50 text-zinc-300">
                                {sector}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {venture.technologies.length > 0 && (
                          <>
                            <Separator className="bg-zinc-800" />
                            
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-2">Technologies</h3>
                              <div className="flex flex-wrap gap-2">
                                {venture.technologies.map((tech) => (
                                  <Badge key={tech} variant="outline" className="bg-zinc-800/50 text-zinc-300">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </TabsContent>
                    
                    {/* Team tab */}
                    <TabsContent value="team" className="p-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-4">Founding Team</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {venture.founders.map((founder) => (
                              <Card key={founder.id} className="border border-zinc-800 bg-zinc-800/50 overflow-hidden">
                                <div className="p-4 flex items-center space-x-4">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage src={founder.image || undefined} />
                                    <AvatarFallback>{founder.name?.charAt(0) || '?'}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h4 className="font-medium text-white">{founder.name}</h4>
                                    <p className="text-sm text-zinc-400">Founder</p>
                                  </div>
                                </div>
                              </Card>
                            ))}
                            
                            {/* If team size is larger than founders list */}
                            {venture.teamSize > venture.founders.length && (
                              <Card className="border border-zinc-800 bg-zinc-800/50 overflow-hidden">
                                <div className="p-4 flex items-center space-x-4">
                                  <div className="h-12 w-12 rounded-full bg-zinc-700 flex items-center justify-center text-lg font-bold">
                                    +{venture.teamSize - venture.founders.length}
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-white">Additional Team Members</h4>
                                    <p className="text-sm text-zinc-400">Various Roles</p>
                                  </div>
                                </div>
                              </Card>
                            )}
                          </div>
                        </div>
                        
                        {venture.isLookingForCollaborators && (
                          <>
                            <Separator className="bg-zinc-800" />
                            
                            <div className="bg-blue-950/20 border border-blue-500/20 rounded-lg p-4">
                              <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                                <Users className="mr-2 h-5 w-5 text-blue-400" />
                                Looking for Collaborators
                              </h3>
                              <p className="text-zinc-300">
                                This venture is actively seeking collaborators to join their team. If you're interested in contributing to {venture.name}, reach out to the founders directly.
                              </p>
                              <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                                Express Interest
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </TabsContent>
                    
                    {/* Discussion tab */}
                    <TabsContent value="discussion" className="p-6">
                      <div className="space-y-6">
                        {/* Comment form */}
                        <form onSubmit={handleCommentSubmit} className="space-y-4">
                          <Textarea
                            placeholder="Share your thoughts or ask a question..."
                            className="min-h-24 bg-zinc-800/50 border-zinc-700 focus:border-purple-500"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                          />
                          <div className="flex justify-end">
                            <Button 
                              type="submit" 
                              className="bg-purple-600 hover:bg-purple-700"
                              disabled={!commentText.trim() || submittingComment}
                            >
                              <Send className="mr-2 h-4 w-4" />
                              {submittingComment ? 'Posting...' : 'Post Comment'}
                            </Button>
                          </div>
                        </form>
                        
                        <Separator className="bg-zinc-800" />
                        
                        {/* Comments list */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-white">
                            Discussion ({venture._count.comments})
                          </h3>
                          
                          {venture.comments && venture.comments.length > 0 ? (
                            <div className="space-y-6">
                              {venture.comments.map((comment) => (
                                <CommentItem key={comment.id} comment={comment} />
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <MessageSquare className="mx-auto h-12 w-12 text-zinc-700" />
                              <p className="mt-2 text-zinc-500">No comments yet. Be the first to start the discussion!</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </motion.div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Venture Details</h3>
                    
                    <div className="space-y-4">
                      {/* Founded date */}
                      {venture.foundedDate && (
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-zinc-500 mr-3" />
                          <div>
                            <p className="text-sm text-zinc-400">Founded</p>
                            <p className="text-zinc-300">
                              {new Date(venture.foundedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {/* Team size */}
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-zinc-500 mr-3" />
                        <div>
                          <p className="text-sm text-zinc-400">Team Size</p>
                          <p className="text-zinc-300">{venture.teamSize} {venture.teamSize === 1 ? 'person' : 'people'}</p>
                        </div>
                      </div>
                      
                      {/* Created date */}
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-zinc-500 mr-3" />
                        <div>
                          <p className="text-sm text-zinc-400">Listed on Coact</p>
                          <p className="text-zinc-300">
                            {new Date(venture.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-4 bg-zinc-800" />
                    
                    {/* External links */}
                    <h3 className="text-lg font-semibold text-white mb-4">Links</h3>
                    
                    <div className="space-y-3">
                      {venture.website && (
                        <a 
                          href={venture.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-zinc-300 hover:text-purple-400 transition-colors"
                        >
                          <Globe className="h-5 w-5 mr-3" />
                          Website
                        </a>
                      )}
                      
                      {venture.twitter && (
                        <a 
                          href={`https://twitter.com/${venture.twitter}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-zinc-300 hover:text-purple-400 transition-colors"
                        >
                          <Twitter className="h-5 w-5 mr-3" />
                          Twitter
                        </a>
                      )}
                      
                      {venture.linkedin && (
                        <a 
                          href={venture.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-zinc-300 hover:text-purple-400 transition-colors"
                        >
                          <Linkedin className="h-5 w-5 mr-3" />
                          LinkedIn
                        </a>
                      )}
                      
                      {venture.github && (
                        <a 
                          href={`https://github.com/${venture.github}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-zinc-300 hover:text-purple-400 transition-colors"
                        >
                          <Github className="h-5 w-5 mr-3" />
                          GitHub
                        </a>
                      )}
                    </div>
                    
                    {/* CTA buttons */}
                    <div className="mt-6 space-y-3">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        Contact Founders
                      </Button>
                      
                      {venture.isLookingForCollaborators && (
                        <Button variant="outline" className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-950/30">
                          <Users className="mr-2 h-4 w-4" />
                          Join Team
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
                
                {/* Similar ventures card */}
                <Card className="mt-6 border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Similar Ventures</h3>
                    <p className="text-zinc-400 text-sm">Explore more ventures in {venture.sectors[0]}</p>
                    
                    <Button 
                      variant="outline" 
                      className="mt-4 w-full border-zinc-700 text-zinc-300"
                      onClick={() => router.push(`/ventures?sector=${encodeURIComponent(venture.sectors[0])}`)}
                    >
                      View Similar Ventures
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VentureDetail;