import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/Header';
import DynamicCursor from '@/components/DynamicCursor';
import FloatingElements from '@/components/FloatingElements';
import VentureParticleEffect from '@/components/VentureParticleEffect';
import Nova from '@/components/Nova';
import { ArrowLeft, Check, Users } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase-config';
import ChatBox from '../ChatBox';
import supabase from "../../supabase-client"

const JoinVenturePage = () => {

  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedin: '',
    interests: [] as string[],
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);


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

  const interestOptions = [
    'AI & Machine Learning',
    'Blockchain',
    'Climate Tech',
    'E-commerce',
    'EdTech',
    'FinTech',
    'Healthcare',
    'SaaS',
    'Social Impact'
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
    
    if (formData.linkedin && !formData.linkedin.includes('linkedin.com')) {
      newErrors.linkedin = 'Please enter a valid LinkedIn URL';
      isValid = false;
    }

    if (formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one interest';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
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
        // Add a new document to the "join-requests" collection
        const docRef = await addDoc(collection(db, "join-requests"), {
          name: formData.name,
          email: formData.email,
          linkedin: formData.linkedin,
          interests: formData.interests, // This will be saved as an array
          message: formData.message,
          createdAt: new Date() // Add a timestamp
        });
        
        console.log("Document written with ID: ", docRef.id);
        setIsSubmitted(true);
        setSubmitError("sth went wrong");
      } catch (error) {
        console.error("Error adding document: ", error);
        setSubmitError("Failed to submit your request. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = async()=>{
    const newTodoData = {
      name:newTodo,
      isCompleted:false,
    };

    const {data, error} =  await supabase.from("TodoList").insert([newTodoData]).single();
    if(error){
      console.log("Error adding todo: ", error);
    } else {
      setTodoList((prev) => [...prev, data]);
      setNewTodo("")
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
              <div className="p-3 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 bg-opacity-10">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-2">
              Join a Venture
            </h1>
            
            <p className="text-zinc-400 max-w-xl mx-auto">
              Express your interest in collaborating with one of our innovative ventures
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
                Interest Submitted!
              </h2>
              
              <p className="text-zinc-400 max-w-md mx-auto mb-8">
                Thank you for your interest in joining a Coact venture. Our team will review your information and connect you with relevant opportunities.
              </p>
              
              <Button
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                onClick={() => router.push('/')}
              >
                Return to Home
              </Button>
            </motion.div>
          ) : (
            <Card className="border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden relative">
              {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
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
                  <Label htmlFor="linkedin" className="text-sm font-medium">
                    LinkedIn Profile URL
                  </Label>
                  <Input
                    id="linkedin"
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    placeholder="https://www.linkedin.com/in/yourprofile"
                    className={errors.linkedin ? 'border-red-500' : ''}
                  />
                  {errors.linkedin && <p className="text-red-500 text-sm">{errors.linkedin}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Areas of Interest <span className="text-red-500">*</span>
                  </Label>
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-2 ${errors.interests ? 'border-red-500 border p-2 rounded-md' : ''}`}>
                    {interestOptions.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={`interest-${interest}`}
                          checked={formData.interests.includes(interest)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleInputChange('interests', [...formData.interests, interest]);
                            } else {
                              handleInputChange(
                                'interests',
                                formData.interests.filter((i) => i !== interest)
                              );
                            }
                          }}
                        />
                        <Label htmlFor={`interest-${interest}`}>{interest}</Label>
                      </div>
                    ))}
                  </div>
                  {errors.interests && <p className="text-red-500 text-sm">{errors.interests}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us about your skills and how you'd like to contribute to a venture"
                    className={`min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
                  />
                  {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Submit Interest'
                  )}
                </Button>
              </form>
              
              {/* Animated gradient border */}
              <div className="absolute inset-0 p-[1px] rounded-lg overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-20" 
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

export default JoinVenturePage;