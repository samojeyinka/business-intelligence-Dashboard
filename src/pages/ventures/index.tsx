import { useState, useEffect, Suspense, lazy } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchVentures } from '@/lib/api';
import { VentureWithRelations, VentureStage } from '@/types/venture';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ChevronUp, ChevronDown, Search, Filter, ArrowUpRight, Star, Users, Clock, Sparkles, Zap } from 'lucide-react';
import Header from '@/components/Header';
import DynamicCursor from '@/components/DynamicCursor';
import VentureParticleEffect from '@/components/VentureParticleEffect';
import VentureCard3D from '@/components/VentureCard3D';
import FuturisticSearch from '@/components/FuturisticSearch';
import FuturisticTabs from '@/components/FuturisticTabs';
import FloatingElements from '@/components/FloatingElements';
import ChatBox from '../ChatBox';


const stageColors: Record<VentureStage, string> = {
  IDEA: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  PROTOTYPE: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  MVP: 'bg-green-500/10 text-green-500 border-green-500/20',
  GROWTH: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  SCALE: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const stageIcons: Record<VentureStage, React.ReactNode> = {
  IDEA: <Sparkles className="w-3 h-3" />,
  PROTOTYPE: <div className="w-3 h-3 rounded-full bg-blue-500" />,
  MVP: <div className="w-3 h-3 rounded-sm bg-green-500" />,
  GROWTH: <div className="w-3 h-3 rounded-md bg-amber-500" />,
  SCALE: <Star className="w-3 h-3 text-red-500" />,
};

// Simple loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center p-4">
    <div className="h-6 w-6 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
  </div>
);

// Simplified VentureCard for better performance
const VentureCard = ({ venture }: { venture: VentureWithRelations }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card 
        className={`relative overflow-hidden border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 ${isHovered ? 'scale-[1.02] shadow-xl shadow-purple-500/10' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => router.push(`/ventures/${venture.slug}`)}
      >
        {/* Venture content */}
        <div className="relative z-10 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              {venture.logo ? (
                <div className="relative h-12 w-12 overflow-hidden rounded-md bg-zinc-800">
                  <img 
                    src={venture.logo} 
                    alt={`${venture.name} logo`} 
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-zinc-800 text-xl font-bold text-white">
                  {venture.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                  {venture.name}
                  {venture.isStealthMode && (
                    <span className="ml-2 text-xs text-zinc-400">(Stealth)</span>
                  )}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className={`flex items-center gap-1 px-2 py-0 text-xs ${stageColors[venture.stage]}`}>
                    {stageIcons[venture.stage]}
                    <span>{venture.stage}</span>
                  </Badge>
                  {venture.isLookingForCollaborators && (
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 px-2 py-0 text-xs">
                      <Users className="mr-1 h-3 w-3" />
                      Seeking Collaborators
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <ChevronUp className="h-3 w-3" />
                {venture._count.upvotes}
              </Badge>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-zinc-400">{venture.description}</p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {venture.sectors.slice(0, 3).map((sector) => (
              <Badge key={sector} variant="outline" className="bg-zinc-800/50 text-zinc-400">
                {sector}
              </Badge>
            ))}
            {venture.sectors.length > 3 && (
              <Badge variant="outline" className="bg-zinc-800/50 text-zinc-400">
                +{venture.sectors.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <div className="flex -space-x-2">
              {venture.founders.slice(0, 3).map((founder) => (
                <div key={founder.id} className="h-8 w-8 rounded-full bg-zinc-700 border-2 border-zinc-900 overflow-hidden">
                  {founder.image ? (
                    <img src={founder.image} alt={founder.name || 'Founder'} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-xs font-bold text-white">
                      {founder.name?.charAt(0) || '?'}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <Button size="sm" variant="ghost" className="gap-1 text-purple-400 hover:text-purple-300 hover:bg-purple-950/30">
              <span>Explore</span>
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const VenturesPage = () => {
  const router = useRouter();
  const [ventures, setVentures] = useState<VentureWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStage, setActiveStage] = useState<string>('all');
  const [sortBy, setSortBy] = useState('upvotes');
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    current: 1,
    limit: 10,
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const lastMoveTimeRef = useState<number>(0);

  // Throttled mouse position tracking for parallax effects
  const handleMouseMove = (e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastMoveTimeRef[0] < 100) return; // Only update every 100ms
    lastMoveTimeRef[0] = now;
    
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) - 0.5;
    const y = (clientY / window.innerHeight) - 0.5;
    setMousePosition({ x, y });
  };

  // Client-side only components
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch ventures with filters
  const loadVentures = async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {
        page: pagination.current.toString(),
        limit: pagination.limit.toString(),
        sort: sortBy,
      };

      if (activeStage !== 'all') {
        params.stage = activeStage;
      }

      if (searchTerm) {
        params.search = searchTerm;
      }

      if (selectedSector) {
        params.sector = selectedSector;
      }

      const data = await fetchVentures(params);
      setVentures(data.ventures);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch ventures:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load ventures on initial render and when filters change
  useEffect(() => {
    loadVentures();
  }, [activeStage, sortBy, pagination.current, selectedSector]);

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPagination(prev => ({ ...prev, current: 1 }));
    loadVentures();
  };

  // Handle filter changes
  const handleFilterChange = (filters: { sector: string; sortBy: string }) => {
    setSelectedSector(filters.sector);
    setSortBy(filters.sortBy);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // Available sectors (in a real app, these would come from the database)
  const sectors = [
    'AI & Machine Learning',
    'Blockchain',
    'Climate Tech',
    'E-commerce',
    'EdTech',
    'FinTech',
    'Healthcare',
    'SaaS',
    'Social Impact',
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Interactive background - lazy loaded */}
      {isMounted && (
        <Suspense fallback={null}>
          <VentureParticleEffect />
        </Suspense>
      )}
      
      {/* Floating elements - lazy loaded with reduced count */}
      {isMounted && (
        <Suspense fallback={null}>
          <FloatingElements count={6} />
        </Suspense>
      )}
      
      {/* Dynamic cursor (client-side only) - lazy loaded */}
      {isMounted && (
        <Suspense fallback={null}>
          <DynamicCursor />
        </Suspense>
      )}
      
      <Header />
      
      <main className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center relative"
        >
          <motion.div
            animate={{
              x: mousePosition.x * -10, // Reduced movement
              y: mousePosition.y * -10,
            }}
            transition={{ type: 'spring', damping: 25 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent rounded-full blur-3xl pointer-events-none"
          />
          
          <motion.h1 
            className="text-6xl sm:text-7xl font-bold mb-6 relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-amber-500 inline-block">
              Discover
            </span>
            <br />
            <motion.span 
              className="inline-block relative"
              animate={{
                x: mousePosition.x * 5, // Reduced movement
                y: mousePosition.y * 5,
              }}
              transition={{ type: 'spring', damping: 25 }}
            >
              the Future
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="mt-4 text-xl text-zinc-400 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore cutting-edge ventures and innovations shaping tomorrow's world
          </motion.p>
        </motion.div>

        {/* Search and filters - lazy loaded */}
        {isMounted && (
          <Suspense fallback={<LoadingFallback />}>
            <FuturisticSearch 
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              sectors={sectors}
            />
          </Suspense>
        )}

        {/* Stage tabs - lazy loaded */}
        {isMounted && (
          <Suspense fallback={<LoadingFallback />}>
            <FuturisticTabs 
              activeStage={activeStage}
              onStageChange={setActiveStage}
            />
          </Suspense>
        )}

        {/* Ventures grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.2) }} // Reduced delay
                >
                  <Card className="border border-zinc-800 bg-zinc-900/50 h-64 overflow-hidden relative">
                    <div className="h-full flex items-center justify-center">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-spin" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : ventures.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {ventures.map((venture, index) => (
                  isMounted ? (
                    <Suspense key={venture.id} fallback={<VentureCard venture={venture} />}>
                      <VentureCard3D venture={venture} index={index} />
                    </Suspense>
                  ) : (
                    <VentureCard key={venture.id} venture={venture} />
                  )
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              className="text-center py-16 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <h3 className="text-2xl font-semibold text-zinc-300">No ventures found</h3>
              <p className="mt-2 text-zinc-400">
                Try adjusting your filters or search terms
              </p>
              
              <motion.div 
                className="mt-6 inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveStage('all');
                    setSortBy('upvotes');
                    setSelectedSector('');
                    setPagination(prev => ({ ...prev, current: 1 }));
                    loadVentures();
                  }}
                >
                  Reset All Filters
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <motion.div 
              className="mt-12 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center space-x-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination(prev => ({ ...prev, current: Math.max(1, prev.current - 1) }))}
                    disabled={pagination.current === 1}
                    className="border-zinc-700 text-zinc-400 hover:border-purple-500/50 hover:text-purple-400 transition-colors duration-300"
                  >
                    Previous
                  </Button>
                </motion.div>
                
                <div className="flex items-center space-x-1">
                  {[...Array(pagination.pages)].map((_, i) => {
                    const page = i + 1;
                    const isActive = page === pagination.current;
                    
                    // Show limited page numbers for better UX
                    if (
                      page === 1 ||
                      page === pagination.pages ||
                      (page >= pagination.current - 1 && page <= pagination.current + 1)
                    ) {
                      return (
                        <motion.div key={page} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant={isActive ? "default" : "outline"}
                            size="sm"
                            onClick={() => setPagination(prev => ({ ...prev, current: page }))}
                            className={isActive 
                              ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none" 
                              : "border-zinc-700 text-zinc-400 hover:border-purple-500/50 hover:text-purple-400 transition-colors duration-300"}
                          >
                            {page}
                          </Button>
                        </motion.div>
                      );
                    } else if (
                      (page === 2 && pagination.current > 3) ||
                      (page === pagination.pages - 1 && pagination.current < pagination.pages - 2)
                    ) {
                      return <span key={page} className="text-zinc-600">...</span>;
                    }
                    
                    return null;
                  })}
                </div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination(prev => ({ ...prev, current: Math.min(pagination.pages, prev.current + 1) }))}
                    disabled={pagination.current === pagination.pages}
                    className="border-zinc-700 text-zinc-400 hover:border-purple-500/50 hover:text-purple-400 transition-colors duration-300"
                  >
                    Next
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Submit your venture CTA - simplified */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, type: 'spring' }}
            className="mt-20 rounded-lg border border-purple-500/20 bg-gradient-to-br from-zinc-900 via-purple-950/20 to-zinc-900 p-8 text-center relative overflow-hidden"
          >
            <motion.div 
              className="relative z-10"
            >
              <h2 className="text-3xl font-bold text-white mb-2">
                Have a venture to showcase?
              </h2>
              <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
                Submit your project to be featured in our futuristic ecosystem
              </p>
              <motion.div 
                className="mt-6 inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-6 text-lg relative overflow-hidden group"
                  onClick={() => router.push('/ventures/submit')}
                >
                  <span className="relative z-10">Submit Your Venture</span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
      
      {/* Nova AI Assistant - lazy loaded */}
      {isMounted && (
        <Suspense fallback={null}>
          <ChatBox />
        </Suspense>
      )}

    </div>
  );
};

export default VenturesPage;