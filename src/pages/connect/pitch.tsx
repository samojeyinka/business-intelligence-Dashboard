import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import DynamicCursor from '@/components/DynamicCursor';
import FloatingElements from '@/components/FloatingElements';
import VentureParticleEffect from '@/components/VentureParticleEffect';
import Nova from '@/components/Nova';
import { ArrowLeft, Check, Lightbulb } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase-config';

const PitchIdeaPage = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ideaTitle: '',
    ideaDescription: '',
    sector: '',
    stage: '',
    isConfidential: false
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

  const sectorOptions = [
    'AI & Machine Learning',
    'Blockchain',
    'Climate Tech',
    'E-commerce',
    'EdTech',
    'FinTech',
    'Healthcare',
    'SaaS',
    'Social Impact',
    'Other'
  ];

  const stageOptions = [
    'Just an idea',
    'Concept development',
    'Early prototype',
    'Working prototype',
    'MVP',
    'Already launched'
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

    if (!formData.ideaTitle.trim()) {
      newErrors.ideaTitle = 'Idea title is required';
      isValid = false;
    }

    if (!formData.ideaDescription.trim()) {
      newErrors.ideaDescription = 'Idea description is required';
      isValid = false;
    }

    if (!formData.sector) {
      newErrors.sector = 'Please select a sector';
      isValid = false;
    }

    if (!formData.stage) {
      newErrors.stage = 'Please select a stage';
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
    
        const ideaData = {
          ...formData,
        
          submittedAt: new Date(),
          status: 'pending-review'
        };
        
     
        const docRef = await addDoc(collection(db, 'submitted-ideas'), ideaData);
        
        setIsSubmitting(false);
        setIsSubmitted(true);
        console.log('Idea submitted to Firestore with ID:', docRef.id);
        
      } catch (error) {
      
        console.error('Error submitting idea:', error);
        setIsSubmitting(false);
        setErrors(prev => ({
          ...prev,
          submit: 'Failed to submit idea. Please try again.'
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
              <div className="p-3 rounded-full bg-gradient-to-br from-amber-500 to-yellow-300 bg-opacity-10">
                <Lightbulb className="w-8 h-8 text-amber-400" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-2">
              Pitch Your Idea
            </h1>
            
            <p className="text-zinc-400 max-w-xl mx-auto">
              Share your innovative concept with our team and explore potential collaboration
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
                Idea Submitted!
              </h2>
              
              <p className="text-zinc-400 max-w-md mx-auto mb-8">
                Thank you for sharing your idea with us. Our team will review your concept and reach out to discuss potential next steps.
              </p>
              
              <Button
                className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-white"
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
                  <Label htmlFor="ideaTitle" className="text-sm font-medium">
                    Idea Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="ideaTitle"
                    value={formData.ideaTitle}
                    onChange={(e) => handleInputChange('ideaTitle', e.target.value)}
                    placeholder="Give your idea a concise title"
                    className={errors.ideaTitle ? 'border-red-500' : ''}
                  />
                  {errors.ideaTitle && <p className="text-red-500 text-sm">{errors.ideaTitle}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sector" className="text-sm font-medium">
                    Primary Sector <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.sector}
                    onValueChange={(value) => handleInputChange('sector', value)}
                  >
                    <SelectTrigger className={errors.sector ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select a sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectorOptions.map((sector) => (
                        <SelectItem key={sector} value={sector}>
                          {sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.sector && <p className="text-red-500 text-sm">{errors.sector}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stage" className="text-sm font-medium">
                    Current Stage <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.stage}
                    onValueChange={(value) => handleInputChange('stage', value)}
                  >
                    <SelectTrigger className={errors.stage ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select current stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {stageOptions.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {stage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.stage && <p className="text-red-500 text-sm">{errors.stage}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ideaDescription" className="text-sm font-medium">
                    Idea Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="ideaDescription"
                    value={formData.ideaDescription}
                    onChange={(e) => handleInputChange('ideaDescription', e.target.value)}
                    placeholder="Describe your idea, the problem it solves, and its potential impact"
                    className={`min-h-[150px] ${errors.ideaDescription ? 'border-red-500' : ''}`}
                  />
                  {errors.ideaDescription && <p className="text-red-500 text-sm">{errors.ideaDescription}</p>}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isConfidential"
                    checked={formData.isConfidential}
                    onCheckedChange={(checked) => handleInputChange('isConfidential', checked)}
                  />
                  <Label htmlFor="isConfidential" className="text-sm">
                    This idea contains confidential information
                  </Label>
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-white"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Submit Your Idea'
                  )}
                </Button>
              </form>
              
              {/* Animated gradient border */}
              <div className="absolute inset-0 p-[1px] rounded-lg overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 opacity-20" 
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
      {isMounted && <Nova />}
      
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

export default PitchIdeaPage;