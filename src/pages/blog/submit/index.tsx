import { useState, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Edit, ArrowLeft, Tag, X, User, Briefcase, Upload, Mail, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import Header from '@/components/Header';
import InteractiveBackground from '@/components/InteractiveBackground';
import { blogTags } from '@/lib/mockBlogData';
import { sanitizeUrl } from '@/lib/sanitize';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '@/firebase-config'; 
import { Checkbox } from '@/components/ui/checkbox';



export default function SubmitArticlePage() {
  const router = useRouter();
  
  const DEFAULT_COVER_IMAGE = '/public/images/rect.png';
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    author: {
      name: '',
      role: '',
      avatar: '',
      profileUrl: '',
      email: ''
    },
    categories: [] as string[], 
  });

  const interestOptions = [
    'Innovation',
    'Collaboration',
    'Sustainability',
    'AI & Technology',
    'Venture Building',
    'Education',
    'Global Perspectives'
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationToken, setVerificationToken] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(''));
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [verificationError, setVerificationError] = useState<string>('');

  const [coverImagePreview, setCoverImagePreview] = useState<string>('');
const [isCoverImageUploading, setIsCoverImageUploading] = useState(false);
const coverFileInputRef = useRef<HTMLInputElement>(null);

  // Generate a random 6-digit code
  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Handle verification code input changes
  const handleVerificationCodeChange = (index: number, value: string) => {
    // Only allow single digits and move to next input
    if (/^\d$/.test(value) || value === '') {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Auto-focus next input if a digit was entered
      if (value !== '' && index < 5) {
        const nextInput = document.getElementById(`verification-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

 

  
  // Handle backspace to move to previous input
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && verificationCode[index] === '' && index > 0) {
      const prevInput = document.getElementById(`verification-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };


  const sendVerificationEmail = async () => {
    if (!formData.author.email) {
      setErrors(prev => ({
        ...prev,
        'author.email': 'Email is required for verification'
      }));
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const code = generateCode();
      
      // Send verification email via API
      const response = await fetch('/api/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.author.email, // Using author.email from your form data
          code: code
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send verification email');
      }
  
      const data = await response.json();
      
      // Store the generated code
      setGeneratedCode(code);
      setVerificationSent(true);
      
      // For demo purposes, you might want to show the code in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Verification code:', code);
      }
      
    } catch (error) {
      console.error('Error sending verification email:', error);
      setErrors(prev => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'Failed to send verification email. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

   // Handle verification confirmation
   const handleVerificationConfirm = async () => {
    await sendVerificationEmail();
  };

   // Handle article submission after verification
   const handleVerifiedSubmission = async () => {
    const enteredCode = verificationCode.join('');
    
    if (enteredCode.length !== 6) {
      setVerificationError('Please enter the full 6-digit code');
      return;
    }
    
    if (enteredCode !== generatedCode) {
      setVerificationError('Invalid verification code');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const articleData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        coverImage: formData.coverImage || null,
        tags: selectedTags,
        categories: formData.categories,
        author: {
          name: formData.author.name,
          role: formData.author.role,
          avatar: formData.author.avatar || null, // Ensure this is set
          profileUrl: formData.author.profileUrl || null,
          email: formData.author.email
        },
        status: 'pending',
        verified: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
  
      // Add to Firestore
      const docRef = await addDoc(collection(db, "submitted-articles"), articleData);
      console.log("Article submitted with ID: ", docRef.id);
      
      router.push('/blog/submit/success');
    } catch (error) {
      console.error('Error submitting article:', error);
      setErrors({ submit: 'Failed to submit article. Please try again.' });
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value} = e.target;
    
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


  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        'author.avatar': 'Please upload a valid image file (jpg, png, gif, webp)'
      }));
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        'author.avatar': 'Image size should be less than 5MB'
      }));
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setAvatarPreview(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    
    // Upload the file
    setIsUploading(true);
    
    try {
      // Convert to base64 for API upload
      const base64Data = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
  
      const fileName = `avatar-${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      
      // Upload to our API endpoint
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName,
          fileData: base64Data
        }),
      });
  
      if (!response.ok) {
        throw new Error('Upload failed');
      }
  
      const { url } = await response.json();
      
      // Update form data with the public URL
      setFormData(prev => ({
        ...prev,
        author: {
          ...prev.author,
          avatar: url
        }
      }));
      
      // Clear any errors
      if (errors['author.avatar']) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors['author.avatar'];
          return newErrors;
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setErrors(prev => ({
        ...prev,
        'author.avatar': 'Failed to upload image. Please try again.'
      }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, 'coverImage': 'Please upload a valid image file (jpg, png, gif, webp)' }));
      return;
    }
  
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, 'coverImage': 'Image size should be less than 5MB' }));
      return;
    }
  
    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCoverImagePreview(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  
    // Upload the file
    setIsCoverImageUploading(true);
  
    try {
      // Convert to base64 for API upload
      const base64Data = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
  
      const fileName = `cover-${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      
      // Upload to our API endpoint
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, fileData: base64Data }),
      });
  
      if (!response.ok) throw new Error('Upload failed');
  
      const { url } = await response.json();
      
      // Update form data with the public URL
      setFormData(prev => ({ ...prev, coverImage: url }));
      
      // Clear any errors
      if (errors['coverImage']) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors['coverImage'];
          return newErrors;
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setErrors(prev => ({ ...prev, 'coverImage': 'Failed to upload image. Please try again.' }));
    } finally {
      setIsCoverImageUploading(false);
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
    
    // Email is required for verification
    if (!formData.author.email.trim()) {
      newErrors['author.email'] = 'Email is required for verification';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.author.email)) {
      newErrors['author.email'] = 'Please enter a valid email address';
    }
    
    if (selectedTags.length === 0) {
      newErrors.tags = 'Please select at least one tag';
    }
    
    if (formData.categories.length === 0) {
      newErrors.categories = 'Please select at least one category';
    }

    // Validate cover image
  if (!formData.coverImage) {
    newErrors['coverImage'] = 'Cover image is required';
  }

  // Validate profile picture
  if (!formData.author.avatar) {
    newErrors['author.avatar'] = 'Profile picture is required';
  }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleCategoryChange = (category: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      categories: checked
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category)
    }));
    
    // Clear error if present
    if (errors.categories) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.categories;
        return newErrors;
      });
    }
  };


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Open verification dialog
    setVerificationDialogOpen(true);
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
                
                <div className=" space-y-4 p-4 border border-zinc-800 rounded-lg bg-zinc-900/30">
  <Label>Cover Image <span className="text-red-500">*</span></Label>

  {errors['coverImage'] && (
    <p className="text-red-500 text-sm -mt-2">{errors['coverImage']}</p>
  )}

  <div className="flex items-center gap-2 justify-between">
  <div className="flex flex-col gap-2 w-[50%]">
    <div 
      className={`relative flex items-center justify-center border-2 border-dashed rounded-lg p-4 transition-all cursor-pointer hover:bg-zinc-800/30 ${errors['coverImage'] ? 'border-red-500' : 'border-zinc-700'}`}
      onClick={() => coverFileInputRef.current?.click()}
    >
      <input
        ref={coverFileInputRef}
        type="file"
        id="coverImage"
        accept="image/jpeg,image/png,image/gif,image/webp"
        className="hidden"
        onChange={handleCoverImageUpload}
        disabled={isCoverImageUploading}
      />
      <div className="flex flex-col items-center gap-2 py-2">
        <Upload className="w-5 h-5 text-purple-400" />
        <span className="text-sm text-zinc-400">
          {isCoverImageUploading ? 'Uploading...' : 'Click to upload cover image'}
        </span>
        <span className="text-xs text-zinc-500">
          JPG, PNG, GIF or WEBP (max 5MB)
        </span>
      </div>
    </div>
    {errors['coverImage'] && <p className="text-red-500 text-sm">{errors['coverImage']}</p>}
  </div>

  {/* Cover image preview */}

  <div className="flex flex-col gap-1 items-center mx-auto">
  {coverImagePreview ? (
  <div className="mt-2 rounded-md h-16 w-[60%] border-2 border-purple-500/30 overflow-hidden mx-auto">
    <img 
      src={coverImagePreview} 
      alt="Cover preview" 
      className="w-full h-full object-cover"
    />
  </div>
) : (
  <div>
 <Avatar className="h-16 w-[4rem] rounded-sm border-2 border-purple-500/30" style={{
    backgroundColor: 'rgba(88, 28, 135, 0.5)'}}>
                        {coverImagePreview ? (
                          <AvatarImage src={coverImagePreview} alt="Cover Image preview" />
                        ) : null}
                        <AvatarFallback className="bg-inherit text-purple-200 text-lg">
                          {formData.author.name ? formData.title.charAt(0).toUpperCase() : '?'}
                        </AvatarFallback>
                      </Avatar>
  </div>
)}
    <p className="text-xs text-zinc-500 mt-2">Preview</p>
    </div>
    
  </div>
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
                      <Label htmlFor="author.avatar">Profile Picture <span className="text-red-500">*</span></Label>
                      {errors['author.avatar'] && (
    <p className="text-red-500 text-sm -mt-2">{errors['author.avatar']}</p>
  )}
                      <div className="flex flex-col gap-2">
                        <div 
                          className={`relative flex items-center justify-center border-2 border-dashed rounded-lg p-4 transition-all cursor-pointer hover:bg-zinc-800/30 ${errors['author.avatar'] ? 'border-red-500' : 'border-zinc-700'}`}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            id="author.avatar"
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            className="hidden"
                            onChange={handleFileUpload}
                            disabled={isUploading}
                          />
                          <div className="flex flex-col items-center gap-2 py-2">
                            <Upload className="w-5 h-5 text-purple-400" />
                            <span className="text-sm text-zinc-400">
                              {isUploading ? 'Uploading...' : 'Click to upload image'}
                            </span>
                            <span className="text-xs text-zinc-500">
                              JPG, PNG, GIF or WEBP (max 5MB)
                            </span>
                          </div>
                        </div>
                        {errors['author.avatar'] && <p className="text-red-500 text-sm">{errors['author.avatar']}</p>}
                      </div>
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
                    <Label htmlFor="author.email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
                      <Input
                        id="author.email"
                        name="author.email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.author.email}
                        onChange={handleChange}
                        className={`bg-zinc-900/50 border pl-10 ${errors['author.email'] ? 'border-red-500' : 'border-zinc-700'}`}
                      />
                    </div>
                    {errors['author.email'] && <p className="text-red-500 text-sm mt-1">{errors['author.email']}</p>}
                    <p className="text-xs text-zinc-500">Required for article verification</p>
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

               {/* Categories Section */}
<div className="space-y-2">
  <Label className="text-sm font-medium">
    Categories <span className="text-red-500">*</span>
  </Label>
  <div className={`grid grid-cols-1 md:grid-cols-2 gap-2 ${errors.categories ? 'border-red-500 border p-2 rounded-md' : ''}`}>
    {interestOptions.map((category) => (
      <div key={category} className="flex items-center space-x-2">
        <Checkbox
          id={`category-${category}`}
          checked={formData.categories.includes(category)}
          onCheckedChange={(checked) => 
            handleCategoryChange(category, checked === true)
          }
        />
        <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
          {category}
        </Label>
      </div>
    ))}
  </div>
  {errors.categories && (
    <p className="text-red-500 text-sm mt-1">{errors.categories}</p>
  )}
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
  disabled={
    isSubmitting || 
    isUploading || 
    isCoverImageUploading || 
    !formData.coverImage || 
    !formData.author.avatar
  }
>
  {isSubmitting ? 'Submitting...' : 
   isUploading || isCoverImageUploading ? 'Uploading images...' : 'Submit Article'}
</Button>
                </div>
              </form>
            </motion.div>
          </div>
        </main>
      </div>
      
      {/* Email Verification Dialog */}
      <Dialog open={verificationDialogOpen} onOpenChange={setVerificationDialogOpen}>
        <DialogContent className="bg-zinc-900 border border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Verify Your Email</DialogTitle>
            <DialogDescription className="text-zinc-400">
              We need to verify your email before publishing your article.
            </DialogDescription>
          </DialogHeader>
          
          {!verificationSent ? (
            <>
              <div className="py-4">
                <p className="mb-4">We'll send a verification code to:</p>
                <div className="p-3 bg-zinc-800 rounded-md flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span>{formData.author.email}</span>
                </div>
              </div>
              
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setVerificationDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleVerificationConfirm}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isSubmitting ? 'Sending...' : 'Send Verification Code'}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <div className="py-4 space-y-4">
                <Alert className="bg-green-900/20 border-green-900/30 text-green-300">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Verification email sent successfully!
                  </AlertDescription>
                </Alert>
                
                <p className="text-zinc-300">Please check your email and enter the 6-digit verification code below:</p>
                
                {/* 6-digit verification code input */}
                <div className="flex justify-center gap-2 my-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Input
                      key={index}
                      id={`verification-input-${index}`}
                      type="text"
                      maxLength={1}
                      value={verificationCode[index]}
                      onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl bg-zinc-800 border-zinc-700 focus:border-purple-500"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
                
                {verificationError && (
                  <p className="text-red-500 text-sm text-center">{verificationError}</p>
                )}
                
                <Button 
                  onClick={handleVerifiedSubmission}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isSubmitting ? 'Verifying...' : 'Verify and Publish Article'}
                </Button>
              </div>
              
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setVerificationDialogOpen(false);
                    setVerificationSent(false);
                    setVerificationCode(Array(6).fill(''));
                    setVerificationError('');
                  }}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}