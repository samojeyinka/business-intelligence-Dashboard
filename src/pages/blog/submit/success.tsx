import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import InteractiveBackground from '@/components/InteractiveBackground';

export default function SubmitSuccessPage() {
  const router = useRouter();
  
  // Redirect to blog if accessed directly
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/blog');
    }, 10000); // Auto redirect after 10 seconds
    
    return () => clearTimeout(timeout);
  }, [router]);
  
  return (
    <>
      <Head>
        <title>Submission Successful | Our Open Blog</title>
        <meta name="description" content="Your article has been successfully submitted to Our Open Blog." />
      </Head>
      
      <div className="min-h-screen bg-black text-white relative">
        <InteractiveBackground />
        
        {/* Header */}
        <Header />
        
        {/* Main content */}
        <main className="pt-24 pb-20 px-4 flex items-center justify-center">
          <motion.div 
            className="max-w-md w-full p-8 rounded-2xl border border-green-500/20 bg-zinc-900/50 backdrop-blur-sm text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-green-500/20 text-green-400">
                <CheckCircle className="w-12 h-12" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold mb-4">Article Submitted Successfully!</h1>
            
            <p className="text-zinc-400 mb-4">
              Thank you for your contribution to Our Open Blog. Your article has been received and will be reviewed by our team.
            </p>
            
            <p className="text-zinc-400 mb-8">
              Your article will be published with your author profile, and readers will be able to see your name, role, and connect with you through your profile link if provided.
            </p>
            
            <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-zinc-800/50 mb-8 text-zinc-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">You'll be redirected to the blog in a few seconds</span>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                onClick={() => router.push('/blog')}
              >
                Return to Blog
              </Button>
              
              <Button
                variant="outline"
                className="w-full border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800"
                onClick={() => router.push('/blog/submit')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Submit Another Article
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}