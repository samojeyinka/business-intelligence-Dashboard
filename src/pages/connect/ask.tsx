import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import DynamicCursor from '@/components/DynamicCursor';
import FloatingElements from '@/components/FloatingElements';
import VentureParticleEffect from '@/components/VentureParticleEffect';
import { ArrowLeft, Check, MessageCircle } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase-config';
import ChatBox from '../ChatBox';

const AskQuestionPage = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    question: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Track mouse position for parallax effects
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) - 0.5;
    const y = (clientY / window.innerHeight) - 0.5;
    setMousePosition({ x, y });
  };

  // Client-side only components
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const topicOptions = [
    'Venture Opportunities',
    'Collaboration Process',
    'Technology Questions',
    'Investment Inquiries',
    'General Information',
    'Other'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.topic) {
      newErrors.topic = 'Please select a topic';
      isValid = false;
    }

    if (!formData.question.trim()) {
      newErrors.question = 'Question is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const questionData = {
          ...formData,
          submittedAt: new Date(),
          status: 'unread'
        };
        
    
        const docRef = await addDoc(collection(db, 'questions'), questionData);
        
    
        setIsSubmitting(false);
        setIsSubmitted(true);
        console.log('Question submitted to Firestore with ID:', docRef.id);
        
      } catch (error) {
      
        console.error('Error submitting question:', error);
        setIsSubmitting(false);
        setErrors(prev => ({
          ...prev,
          submit: 'Failed to submit question. Please try again.'
        }));
      }
    }
  };

  return (
    <div 
      className="min-h-screen bg-black text-white overflow-hidden" 
      onMouseMove={handleMouseMove}
    >
      {/* Interactive background */}
      <VentureParticleEffect />
      
      {/* Floating elements */}
      <FloatingElements count={10} />
      
      {/* Dynamic cursor (client-side only) */}
      {isMounted && <DynamicCursor />}
      
      <Header />
      
      <main className="container mx-auto px-4 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {/* Back button */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              className="text-zinc-400 hover:text-white gap-2"
              onClick={() => router.push('/connect')}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Connect</span>
            </Button>
          </motion.div>
          
          {/* Page title */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 bg-opacity-10">
                <MessageCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-2">
              Ask a Question
            </h1>
            
            <p className="text-zinc-400 max-w-xl mx-auto">
              Have a question about Coact Ventures? We're here to help!
            </p>
          </motion.div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <motion.div 
                className="flex justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center">
                  <Check className="w-10 h-10 text-white" />
                </div>
              </motion.div>
              
              <h2 className="text-3xl font-bold mb-4 text-white">
                Question Submitted!
              </h2>
              
              <p className="text-zinc-400 max-w-md mx-auto mb-8">
                Thank you for reaching out. We've received your question and will get back to you as soon as possible.
              </p>
              
              <Button
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                onClick={() => router.push('/')}
              >
                Return to Home
              </Button>
            </motion.div>
          ) : (
            <Card className="border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden relative">
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email address"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-sm font-medium">
                    Topic <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.topic}
                    onValueChange={(value) => handleInputChange('topic', value)}
                  >
                    <SelectTrigger className={errors.topic ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {topicOptions.map((topic) => (
                        <SelectItem key={topic} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.topic && <p className="text-red-500 text-sm">{errors.topic}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="question" className="text-sm font-medium">
                    Your Question <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="question"
                    value={formData.question}
                    onChange={(e) => handleInputChange('question', e.target.value)}
                    placeholder="What would you like to know about Coact Ventures?"
                    className={`min-h-[120px] ${errors.question ? 'border-red-500' : ''}`}
                  />
                  {errors.question && <p className="text-red-500 text-sm">{errors.question}</p>}
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Submit Question'
                  )}
                </Button>
              </form>
              
              {/* Animated gradient border */}
              <div className="absolute inset-0 p-[1px] rounded-lg overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 opacity-20" 
                  style={{
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s linear infinite',
                  }}
                />
              </div>
            </Card>
          )}
        </motion.div>
      </main>
      
      {/* Nova AI Assistant */}
      {isMounted && <ChatBox />}
      
      {/* Add shimmer animation */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
};

export default AskQuestionPage;