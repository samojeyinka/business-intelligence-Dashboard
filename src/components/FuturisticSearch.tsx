import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronUp, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FuturisticSearchProps {
  onSearch: (searchTerm: string) => void;
  onFilterChange: (filters: { sector: string; sortBy: string }) => void;
  sectors: string[];
}

const FuturisticSearch: React.FC<FuturisticSearchProps> = ({ 
  onSearch, 
  onFilterChange,
  sectors 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSector, setSelectedSector] = useState<string>('all_sectors');
  const [sortBy, setSortBy] = useState('upvotes');
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  // Update filters when they change
  useEffect(() => {
    onFilterChange({
      sector: selectedSector === 'all_sectors' ? '' : selectedSector,
      sortBy: sortBy
    });
  }, [selectedSector, sortBy, onFilterChange]);
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSector('all_sectors');
    setSortBy('upvotes');
    onSearch('');
    onFilterChange({
      sector: '',
      sortBy: 'upvotes'
    });
    
    // Focus the input after reset
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div ref={searchRef} className="w-full max-w-4xl mx-auto mb-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <form onSubmit={handleSearch} className="flex gap-2">
          <motion.div 
            className="relative flex-1"
            animate={{
              boxShadow: isFocused 
                ? '0 0 0 2px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3)' 
                : '0 0 0 1px rgba(39, 39, 42, 0.5)'
            }}
            transition={{ duration: 0.2 }}
            style={{ borderRadius: '0.375rem' }}
          >
            <Search className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-200 ${isFocused ? 'text-purple-400' : 'text-zinc-500'}`} />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Discover the next big thing..."
              className="pl-10 bg-zinc-900/50 border-zinc-800 focus-visible:ring-purple-500 focus-visible:ring-offset-purple-900/20 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            
            {/* Animated border effect */}
            <AnimatePresence>
              {isFocused && (
                <motion.div 
                  className="absolute inset-0 rounded-md pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: 'linear-gradient(90deg, #a855f7, #3b82f6, #a855f7)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s infinite linear',
                    zIndex: -1,
                    padding: '1px',
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              type="submit" 
              variant="default" 
              className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Search</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              type="button" 
              variant="outline" 
              className="border-zinc-700 text-zinc-400 hover:text-purple-400 hover:border-purple-500/50 transition-all duration-300"
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
          </motion.div>
        </form>

        {/* Expandable filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 500, damping: 30 }}
              className="overflow-hidden"
            >
              <motion.div 
                className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div>
                  <label className="text-sm text-zinc-400 mb-2 block">Sector</label>
                  <Select value={selectedSector} onValueChange={setSelectedSector}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 focus:ring-purple-500 focus:ring-offset-purple-900/20">
                      <SelectValue placeholder="All Sectors" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700">
                      <SelectItem value="all_sectors">All Sectors</SelectItem>
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
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 focus:ring-purple-500 focus:ring-offset-purple-900/20">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700">
                      <SelectItem value="upvotes">Most Upvoted</SelectItem>
                      <SelectItem value="recent">Most Recent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    className="w-full border-zinc-700 text-zinc-400 hover:text-purple-400 hover:border-purple-500/50 transition-all duration-300"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FuturisticSearch;