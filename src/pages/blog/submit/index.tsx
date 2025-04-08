import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Edit, ArrowLeft, Tag, X, User, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/Header';
import InteractiveBackground from '@/components/InteractiveBackground';
import { blogTags } from '@/lib/mockBlogData';
import { sanitizeUrl } from '@/lib/sanitize';

export default function SubmitArticlePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    author: {
      name: '',
      role: '',
      avatar: '',
      profileUrl: ''
    }
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested author fields
    if (name.startsWith('author.')) {
      const authorField = name.split('.')[1];
      
      // Special handling for profile URL
      if (authorField === 'profileUrl') {
        const sanitizedUrl = sanitizeUrl(value);
        setFormData(prev => ({
          ...prev,
          author: {
            ...prev.author,
            [authorField]: sanitizedUrl
          }
        }));
      } else if (authorField === 'avatar') {
        const sanitizedUrl = sanitizeUrl(value);
        setFormData(prev => ({
          ...prev,
          author: {
            ...prev.author,
            [authorField]: sanitizedUrl
          }
        }));
        setAvatarPreview(sanitizedUrl);
      } else {
        setFormData(prev => ({
          ...prev,
          author: {
            ...prev.author,
            [authorField]: value
          }
        }));
      }
    } else {
      // Handle regular fields
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Brief description is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.trim().length < 100) {
      newErrors.content = 'Content should be at least 100 characters';
    }
    
    // Validate author information
    if (!formData.author.name.trim()) {
      newErrors['author.name'] = 'Author name is required';
    }
    
    if (!formData.author.role.trim()) {
      newErrors['author.role'] = 'Author role/title is required';
    }
    
    // Avatar URL is optional, but if provided, validate it
    if (formData.author.avatar && !formData.author.avatar.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i)) {
      newErrors['author.avatar'] = 'Please provide a valid image URL (jpg, png, gif, webp)';
    }
    
    if (selectedTags.length === 0) {
      newErrors.tags = 'Please select at least one tag';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate a submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to success page
      router.push('/blog/submit/success');
    } catch (error) {
      console.error('Error submitting article:', error);
      setErrors({ submit: 'Failed to submit article. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Submit Article | Our Open Blog</title>
        <meta name="description" content="Share your knowledge and insights with our community by submitting an article to Our Open Blog." />
      </Head>
      
      <div className="min-h-screen bg-black text-white relative">
        <InteractiveBackground />
        
        {/* Header */}
        <Header />
        
        {/* Main content */}
        <main className="pt-24 pb-20 px-4">
          <div className="max-w-3xl mx-auto">
            <Button
              variant="ghost"
              size="sm"
              className="mb-6 text-zinc-400 hover:text-white"
              onClick={() => router.push('/blog')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-purple-500/20 text-purple-300">
                  <Edit className="w-5 h-5" />
                </div>
                <h1 className="text-3xl font-bold">Submit Your Article</h1>
              </div>
              
              <p className="text-zinc-400 mb-8">
                Share your knowledge, insights, and perspectives with our community. 
                Your contribution helps build our collective understanding.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Article Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a compelling title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`bg-zinc-900/50 border ${errors.title ? 'border-red-500' : 'border-zinc-700'}`}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Brief Description</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    placeholder="Write a short description (1-2 sentences)"
                    value={formData.excerpt}
                    onChange={handleChange}
                    className={`bg-zinc-900/50 border ${errors.excerpt ? 'border-red-500' : 'border-zinc-700'} min-h-[80px]`}
                  />
                  {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Article Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Write your article here..."
                    value={formData.content}
                    onChange={handleChange}
                    className={`bg-zinc-900/50 border ${errors.content ? 'border-red-500' : 'border-zinc-700'} min-h-[300px]`}
                  />
                  {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="coverImage">Cover Image URL (optional)</Label>
                  <Input
                    id="coverImage"
                    name="coverImage"
                    placeholder="https://example.com/your-image.jpg"
                    value={formData.coverImage}
                    onChange={handleChange}
                    className="bg-zinc-900/50 border border-zinc-700"
                  />
                </div>
                
                {/* Author Information Section */}
                <div className="space-y-4 p-4 border border-zinc-800 rounded-lg bg-zinc-900/30">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-purple-400" />
                    <h3 className="text-lg font-medium">Author Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="author.name">
                        Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="author.name"
                        name="author.name"
                        placeholder="Your full name"
                        value={formData.author.name}
                        onChange={handleChange}
                        className={`bg-zinc-900/50 border ${errors['author.name'] ? 'border-red-500' : 'border-zinc-700'}`}
                      />
                      {errors['author.name'] && <p className="text-red-500 text-sm mt-1">{errors['author.name']}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="author.role">
                        Role/Title <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
                        <Input
                          id="author.role"
                          name="author.role"
                          placeholder="e.g. Software Engineer, Product Designer"
                          value={formData.author.role}
                          onChange={handleChange}
                          className={`bg-zinc-900/50 border pl-10 ${errors['author.role'] ? 'border-red-500' : 'border-zinc-700'}`}
                        />
                      </div>
                      {errors['author.role'] && <p className="text-red-500 text-sm mt-1">{errors['author.role']}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <div className="space-y-2">
                      <Label htmlFor="author.avatar">Profile Picture URL (optional)</Label>
                      <Input
                        id="author.avatar"
                        name="author.avatar"
                        placeholder="https://example.com/your-avatar.jpg"
                        value={formData.author.avatar}
                        onChange={handleChange}
                        className={`bg-zinc-900/50 border ${errors['author.avatar'] ? 'border-red-500' : 'border-zinc-700'}`}
                      />
                      {errors['author.avatar'] && <p className="text-red-500 text-sm mt-1">{errors['author.avatar']}</p>}
                    </div>
                    
                    <div className="flex flex-col items-center justify-center pt-6">
                      <Avatar className="h-16 w-16 border-2 border-purple-500/30">
                        {avatarPreview ? (
                          <AvatarImage src={avatarPreview} alt="Avatar preview" />
                        ) : null}
                        <AvatarFallback className="bg-purple-900/50 text-purple-200 text-lg">
                          {formData.author.name ? formData.author.name.charAt(0).toUpperCase() : '?'}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-xs text-zinc-500 mt-2">Preview</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="author.profileUrl">Profile URL (optional)</Label>
                    <Input
                      id="author.profileUrl"
                      name="author.profileUrl"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.author.profileUrl}
                      onChange={handleChange}
                      className="bg-zinc-900/50 border border-zinc-700"
                    />
                    <p className="text-xs text-zinc-500">Your LinkedIn or personal website URL</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-zinc-400" />
                    <Label>Tags</Label>
                  </div>
                  
                  {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTags.map(tag => (
                      <Badge 
                        key={tag} 
                        className="bg-purple-600/30 hover:bg-purple-600/40 text-purple-200 cursor-pointer"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                        <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-2 p-3 bg-zinc-900/50 border border-zinc-800 rounded-md">
                    <p className="text-sm text-zinc-400 mb-2">Select relevant tags for your article:</p>
                    <div className="flex flex-wrap gap-2">
                      {blogTags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className={`cursor-pointer ${selectedTags.includes(tag) ? 'bg-purple-600/30 hover:bg-purple-600/40 text-purple-200' : 'text-zinc-400 hover:text-white'}`}
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                {errors.submit && (
                  <div className="p-3 bg-red-900/20 border border-red-900/30 rounded-md text-red-300">
                    {errors.submit}
                  </div>
                )}
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Article'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}