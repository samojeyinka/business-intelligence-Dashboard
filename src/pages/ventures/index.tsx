import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchVentures } from '@/lib/api';
import { VentureWithRelations, VentureStage } from '@/types/venture';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ChevronUp, ChevronDown, Search, Filter, ArrowUpRight, Star, Users, Clock, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import InteractiveBackground from '@/components/InteractiveBackground';

const stageColors: Record<VentureStage, string> = {
  IDEA: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  PROTOTYPE: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  MVP: 'bg-green-500/10 text-green-500 border-green-500/20',
  GROWTH: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  SCALE: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const stageIcons: Record<VentureStage, React.ReactNode> = {
  IDEA: <Sparkles className="w-3 h-3" />,
  PROTOTYPE: <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />,
  MVP: <div className="w-3 h-3 rounded-sm bg-green-500" />,
  GROWTH: <div className="w-3 h-3 rounded-md bg-amber-500 animate-ping animate-duration-[3000ms]" />,
  SCALE: <Star className="w-3 h-3 text-red-500" />,
};

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
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-900/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
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
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(venture.createdAt).toLocaleDateString()}
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
              {venture.founders.map((founder) => (
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
              {venture.teamSize > venture.founders.length && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 border-2 border-zinc-900 text-xs font-medium text-white">
                  +{venture.teamSize - venture.founders.length}
                </div>
              )}
            </div>
            
            <Button size="sm" variant="ghost" className="gap-1 text-purple-400 hover:text-purple-300 hover:bg-purple-950/30">
              <span>Explore</span>
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Animated border on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="absolute inset-0 z-0 rounded-lg border border-purple-500/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
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
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    current: 1,
    limit: 10,
  });

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
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, current: 1 }));
    loadVentures();
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
    <div className="min-h-screen bg-black text-white">
      <InteractiveBackground />
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-amber-500">
              Discover the Future
            </h1>
            <p className="mt-4 text-xl text-zinc-400">
              Explore cutting-edge ventures and innovations shaping tomorrow's world
            </p>
          </motion.div>

          {/* Search and filters */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  type="text"
                  placeholder="Search ventures..."
                  className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-purple-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button type="submit" variant="default" className="bg-purple-600 hover:bg-purple-700">
                Search
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="border-zinc-700 text-zinc-400"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {showFilters ? (
                  <ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4" />
                )}
              </Button>
            </form>

            {/* Expandable filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                    <div>
                      <label className="text-sm text-zinc-400 mb-2 block">Sector</label>
                      <Select value={selectedSector} onValueChange={setSelectedSector}>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700">
                          <SelectValue placeholder="All Sectors" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Sectors</SelectItem>
                          {sectors.map((sector) => (
                            <SelectItem key={sector} value={sector}>
                              {sector}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm text-zinc-400 mb-2 block">Sort By</label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upvotes">Most Upvoted</SelectItem>
                          <SelectItem value="recent">Most Recent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-end">
                      <Button 
                        variant="outline" 
                        className="w-full border-zinc-700 text-zinc-400"
                        onClick={() => {
                          setSearchTerm('');
                          setActiveStage('all');
                          setSortBy('upvotes');
                          setSelectedSector('');
                          setPagination(prev => ({ ...prev, current: 1 }));
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stage tabs */}
          <Tabs defaultValue="all" value={activeStage} onValueChange={setActiveStage} className="mb-8">
            <TabsList className="bg-zinc-900/50 border border-zinc-800 p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-purple-600">
                All Stages
              </TabsTrigger>
              <TabsTrigger value="IDEA" className="data-[state=active]:bg-purple-600">
                Idea
              </TabsTrigger>
              <TabsTrigger value="PROTOTYPE" className="data-[state=active]:bg-purple-600">
                Prototype
              </TabsTrigger>
              <TabsTrigger value="MVP" className="data-[state=active]:bg-purple-600">
                MVP
              </TabsTrigger>
              <TabsTrigger value="GROWTH" className="data-[state=active]:bg-purple-600">
                Growth
              </TabsTrigger>
              <TabsTrigger value="SCALE" className="data-[state=active]:bg-purple-600">
                Scale
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Ventures grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="border border-zinc-800 bg-zinc-900/50 h-64 animate-pulse">
                  <div className="h-full flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full bg-zinc-800 animate-spin" />
                  </div>
                </Card>
              ))}
            </div>
          ) : ventures.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {ventures.map((venture) => (
                  <VentureCard key={venture.id} venture={venture} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-zinc-400">No ventures found</h3>
              <p className="mt-2 text-zinc-500">Try adjusting your filters or search terms</p>
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPagination(prev => ({ ...prev, current: Math.max(1, prev.current - 1) }))}
                  disabled={pagination.current === 1}
                  className="border-zinc-700 text-zinc-400"
                >
                  Previous
                </Button>
                
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
                        <Button
                          key={page}
                          variant={isActive ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPagination(prev => ({ ...prev, current: page }))}
                          className={isActive ? "bg-purple-600 hover:bg-purple-700" : "border-zinc-700 text-zinc-400"}
                        >
                          {page}
                        </Button>
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
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPagination(prev => ({ ...prev, current: Math.min(pagination.pages, prev.current + 1) }))}
                  disabled={pagination.current === pagination.pages}
                  className="border-zinc-700 text-zinc-400"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Submit your venture CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 rounded-lg border border-purple-500/20 bg-gradient-to-br from-zinc-900 via-purple-950/20 to-zinc-900 p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-white">Have a venture to showcase?</h2>
            <p className="mt-2 text-zinc-400">
              Submit your project to be featured in our futuristic ecosystem
            </p>
            <Button 
              className="mt-4 bg-purple-600 hover:bg-purple-700"
              onClick={() => router.push('/ventures/submit')}
            >
              Submit Your Venture
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default VenturesPage;