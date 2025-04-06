import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft, Home } from 'lucide-react';
import Header from '@/components/Header';
import InteractiveBackground from '@/components/InteractiveBackground';

const SubmitSuccessPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      <InteractiveBackground />
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden text-center p-8">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-green-500/10 p-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-white mb-4">Submission Successful!</h1>
              
              <p className="text-zinc-300 mb-6">
                Thank you for submitting your venture to Coact. Our team will review your submission and get back to you within 1-2 business days.
              </p>
              
              <div className="space-y-4">
                <div className="rounded-md border border-purple-500/20 bg-purple-950/20 p-4 text-left">
                  <h3 className="text-sm font-medium text-purple-400 mb-2">What happens next?</h3>
                  <ul className="text-sm text-zinc-300 space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                      Our team will review your submission to ensure it meets our guidelines
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                      You'll receive an email notification when your venture is approved
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                      Once approved, your venture will be visible in our ecosystem
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    className="border-zinc-700 text-zinc-300"
                    onClick={() => router.push('/ventures')}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Ventures
                  </Button>
                  
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => router.push('/')}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Go to Homepage
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default SubmitSuccessPage;