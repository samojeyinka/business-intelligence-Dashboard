import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Sparkles, Rocket, Users } from 'lucide-react';

const VenturesSection = () => {
  const router = useRouter();

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-amber-500">
            Discover Our Ecosystem
          </h2>
          <p className="mt-4 text-xl text-zinc-400 max-w-3xl mx-auto">
            Explore our curated collection of innovative ventures and find opportunities to collaborate, invest, or join groundbreaking teams.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-6 hover:border-purple-500/30 transition-all duration-300"
          >
            <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Discover Innovations</h3>
            <p className="text-zinc-400 mb-4">
              Explore cutting-edge ventures across various sectors and stages, from early concepts to scaling businesses.
            </p>
            <Button 
              variant="ghost" 
              className="text-purple-400 hover:text-purple-300 hover:bg-purple-950/30 mt-2"
              onClick={() => router.push('/ventures')}
            >
              Browse Ventures
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-6 hover:border-purple-500/30 transition-all duration-300"
          >
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
              <Rocket className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Launch Your Venture</h3>
            <p className="text-zinc-400 mb-4">
              Submit your project to our platform and gain visibility, feedback, and potential collaborators or investors.
            </p>
            <Button 
              variant="ghost" 
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-950/30 mt-2"
              onClick={() => router.push('/ventures/submit')}
            >
              Submit Your Venture
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-6 hover:border-purple-500/30 transition-all duration-300"
          >
            <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Join Innovative Teams</h3>
            <p className="text-zinc-400 mb-4">
              Find ventures seeking collaborators and connect with founding teams looking for talent like you.
            </p>
            <Button 
              variant="ghost" 
              className="text-amber-400 hover:text-amber-300 hover:bg-amber-950/30 mt-2"
              onClick={() => router.push('/ventures?isLookingForCollaborators=true')}
            >
              Find Opportunities
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
            onClick={() => router.push('/ventures')}
          >
            Explore Our Ecosystem
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default VenturesSection;