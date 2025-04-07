import Head from 'next/head';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Blog | Coact Ventures</title>
        <meta name="description" content="Explore insights, stories, and updates from Coact Ventures." />
      </Head>
      
      <div className="min-h-screen bg-black text-white">
        <div className="pt-32 pb-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Our Blog
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Coming soon! We're working on exciting content to share with you.
            </p>
            
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
}