import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import DynamicCursor from '@/components/DynamicCursor';
import FloatingElements from '@/components/FloatingElements';
import VentureParticleEffect from '@/components/VentureParticleEffect';
import Nova from '@/components/Nova';
import { ArrowLeft, ArrowRight, Check, Rocket, Sparkles, Star } from 'lucide-react';
import { db } from '@/firebase-config';
import { addDoc, collection } from 'firebase/firestore';


type Question = {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'select';
  options?: string[];
  required: boolean;
};

const LeadVenturePage = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
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

  // Pre-screening questionnaire steps
  const steps = [
    {
      title: 'Personal Information',
      description: 'Tell us about yourself',
      questions: [
        {
          id: 'name',
          question: 'Full Name',
          type: 'text',
          required: true
        },
        {
          id: 'email',
          question: 'Email Address',
          type: 'text',
          required: true
        },
        {
          id: 'linkedin',
          question: 'LinkedIn Profile URL',
          type: 'text',
          required: true
        },
        {
          id: 'currentRole',
          question: 'Current Role',
          type: 'text',
          required: true
        }
      ] as Question[]
    },
    {
      title: 'Experience & Expertise',
      description: 'Share your professional background',
      questions: [
        {
          id: 'yearsExperience',
          question: 'Years of Industry Experience',
          type: 'select',
          options: ['Less than 2 years', '2-5 years', '5-10 years', '10+ years'],
          required: true
        },
        {
          id: 'leadershipExperience',
          question: 'Have you led teams before?',
          type: 'radio',
          options: ['Yes, extensively', 'Yes, some experience', 'Limited experience', 'No'],
          required: true
        },
        {
          id: 'expertise',
          question: 'Areas of Expertise (select all that apply)',
          type: 'checkbox',
          options: [
            'Product Management',
            'Software Development',
            'AI/Machine Learning',
            'Blockchain',
            'Healthcare',
            'Finance',
            'Climate Tech',
            'Marketing',
            'UX/Design',
            'Business Development',
            'Other'
          ],
          required: true
        },
        {
          id: 'pastAchievements',
          question: 'Briefly describe your most significant professional achievement',
          type: 'textarea',
          required: true
        }
      ] as Question[]
    },
    {
      title: 'Venture Interest',
      description: 'Tell us about your venture interests',
      questions: [
        {
          id: 'ventureInterest',
          question: 'Which sectors are you most interested in leading a venture? (select all that apply)',
          type: 'checkbox',
          options: [
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
          ],
          required: true
        },
        {
          id: 'motivation',
          question: 'Why are you interested in leading a Coact venture?',
          type: 'textarea',
          required: true
        },
        {
          id: 'timeCommitment',
          question: 'What time commitment can you make to a venture?',
          type: 'radio',
          options: ['Full-time', 'Part-time (20+ hours/week)', 'Part-time (10-20 hours/week)', 'Less than 10 hours/week'],
          required: true
        },
        {
          id: 'additionalInfo',
          question: 'Anything else you would like us to know?',
          type: 'textarea',
          required: false
        }
      ] as Question[]
    }
  ];

  const validateStep = (stepIndex: number) => {
    const currentQuestions = steps[stepIndex].questions;
    const newErrors: Record<string, string> = {};
    let isValid = true;

    currentQuestions.forEach(question => {
      if (question.required) {
        const value = formData[question.id];
        
        if (!value || 
            (Array.isArray(value) && value.length === 0) || 
            (typeof value === 'string' && value.trim() === '')) {
          newErrors[question.id] = 'This field is required';
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (questionId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Clear error when user types
    if (errors[questionId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };
  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      
      try {

        const submissionData = {
          ...formData,
          expertise: formData.expertise || [],
          ventureInterest: formData.ventureInterest || [],

          submittedAt: new Date(),
          status: 'pending'
        };
        
 
        const docRef = await addDoc(collection(db, 'lead-requests'), submissionData);
        
     
        setIsSubmitting(false);
        setIsSubmitted(true);
        console.log('Form submitted to Firestore with ID:', docRef.id);
        
      } catch (error) {
      
        console.error('Error submitting form:', error);
        setIsSubmitting(false);
        setErrors(prev => ({
          ...prev,
          submit: 'Failed to submit form. Please try again.'
        }));
      }
    }
  };
  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'text':
        return (
          <Input
            id={question.id}
            value={formData[question.id] || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder={`Enter your ${question.question.toLowerCase()}`}
            className={errors[question.id] ? 'border-red-500' : ''}
          />
        );
      
      case 'textarea':
        return (
          <Textarea
            id={question.id}
            value={formData[question.id] || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder={`Enter your response`}
            className={`min-h-[100px] ${errors[question.id] ? 'border-red-500' : ''}`}
          />
        );
      
      case 'radio':
        return (
          <RadioGroup
            value={formData[question.id] || ''}
            onValueChange={(value) => handleInputChange(question.id, value)}
            className={`space-y-2 ${errors[question.id] ? 'border-red-500 border p-2 rounded-md' : ''}`}
          >
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case 'checkbox':
        return (
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-2 ${errors[question.id] ? 'border-red-500 border p-2 rounded-md' : ''}`}>
            {question.options?.map((option) => {
              const isChecked = Array.isArray(formData[question.id]) && formData[question.id]?.includes(option);
              
              return (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${question.id}-${option}`}
                    checked={isChecked}
                    onCheckedChange={(checked) => {
                      const currentValues = Array.isArray(formData[question.id]) ? [...formData[question.id]] : [];
                      
                      if (checked) {
                        handleInputChange(question.id, [...currentValues, option]);
                      } else {
                        handleInputChange(
                          question.id,
                          currentValues.filter((value) => value !== option)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                </div>
              );
            })}
          </div>
        );
      
      case 'select':
        return (
          <Select
            value={formData[question.id] || ''}
            onValueChange={(value) => handleInputChange(question.id, value)}
          >
            <SelectTrigger className={errors[question.id] ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      default:
        return null;
    }
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

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
          className="max-w-3xl mx-auto"
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
              <div className="p-3 rounded-full bg-gradient-to-br from-purple-600 to-pink-400 bg-opacity-10">
                <Rocket className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-2">
              Lead a Coact Venture
            </h1>
            
            <p className="text-zinc-400 max-w-xl mx-auto">
              Complete this pre-screening questionnaire to help us understand your experience and interests
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
                Application Submitted!
              </h2>
              
              <p className="text-zinc-400 max-w-md mx-auto mb-8">
                Thank you for your interest in leading a Coact venture. Our team will review your application and reach out to you soon.
              </p>
              
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                onClick={() => router.push('/')}
              >
                Return to Home
              </Button>
            </motion.div>
          ) : (
            <Card className="border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden relative">
              {/* Progress bar */}
              <div className="p-4 border-b border-zinc-800">
                <div className="flex justify-between text-sm text-zinc-400 mb-2">
                  <span>Step {currentStep + 1} of {steps.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-1" />
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <h2 className="text-2xl font-bold mb-1">{currentStepData.title}</h2>
                  <p className="text-zinc-400 mb-6">{currentStepData.description}</p>
                  
                  <div className="space-y-6">
                    {currentStepData.questions.map((question) => (
                      <div key={question.id} className="space-y-2">
                        <Label htmlFor={question.id} className="text-sm font-medium flex items-center">
                          {question.question}
                          {question.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        
                        {renderQuestion(question)}
                        
                        {errors[question.id] && (
                          <p className="text-red-500 text-sm">{errors[question.id]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="p-6 border-t border-zinc-800 flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="border-zinc-700 text-zinc-400 hover:border-purple-500/50 hover:text-purple-400"
                >
                  Back
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : currentStep === steps.length - 1 ? (
                    'Submit Application'
                  ) : (
                    'Next Step'
                  )}
                </Button>
              </div>
              
              {/* Animated gradient border */}
              <div className="absolute inset-0 p-[1px] rounded-lg overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 opacity-20" 
                  style={{
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s linear infinite',
                  }}
                />
              </div>
            </Card>
          )}
        </motion.div>
        
        {/* Animated decorative element */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30"
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Star className="w-8 h-8 text-purple-400" />
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

export default LeadVenturePage;