import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BlogFilterProps {
  onSearch: (searchTerm: string) => void;
  onFilterChange: (filters: { category: string; tag: string; view: string }) => void;
  categories: string[];
  tags: string[];
}

const BlogFilter: React.FC<BlogFilterProps> = ({ 
  onSearch, 
  onFilterChange,
  categories,
  tags
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [viewMode, setViewMode] = useState('grid');
  const [isFocused, setIsFocused] = useState(false);
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  // Update filters when they change
  const updateFilters = (category?: string, tag?: string, view?: string) => {
    const newCategory = category !== undefined ? category : selectedCategory;
    const newTag = tag !== undefined ? tag : selectedTag;
    const newView = view !== undefined ? view : viewMode;
    
    setSelectedCategory(newCategory);
    setSelectedTag(newTag);
    setViewMode(newView);
    
    onFilterChange({
      category: newCategory,
      tag: newTag,
      view: newView
    });
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedTag('');
    onSearch('');
    updateFilters('all', '', viewMode);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
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
              type="text"
              placeholder="Search for knowledge..."
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
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              type="button" 
              variant="outline" 
              className="border-zinc-700 bg-zinc-800/50 text-purple-400 hover:text-purple-300 hover:border-purple-500/50 transition-all duration-300"
              onClick={() => window.location.href = '/blog/submit'}
           >
              <Sparkles className="h-4 w-4 mr-2" />
              Contribute
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
                className="mt-4 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Tabs defaultValue="categories" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4 bg-zinc-800/50">
                    <TabsTrigger value="categories">Categories</TabsTrigger>
                    <TabsTrigger value="tags">Tags</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="categories" className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge 
                        className={`cursor-pointer ${selectedCategory === 'all' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-zinc-800 hover:bg-zinc-700'}`}
                        onClick={() => updateFilters('all')}
                      >
                        All
                      </Badge>
                      {categories.map((category) => (
                        <Badge 
                          key={category} 
                          className={`cursor-pointer ${selectedCategory === category ? 'bg-purple-600 hover:bg-purple-700' : 'bg-zinc-800 hover:bg-zinc-700'}`}
                          onClick={() => updateFilters(category)}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tags" className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge 
                        className={`cursor-pointer ${selectedTag === '' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-zinc-800 hover:bg-zinc-700'}`}
                        onClick={() => updateFilters(undefined, '')}
                      >
                        All Tags
                      </Badge>
                      {tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          className={`cursor-pointer ${selectedTag === tag ? 'bg-purple-600 hover:bg-purple-700' : 'bg-zinc-800 hover:bg-zinc-700'}`}
                          onClick={() => updateFilters(undefined, tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-between mt-4 pt-4 border-t border-zinc-800">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={`border-zinc-700 ${viewMode === 'grid' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}
                      onClick={() => updateFilters(undefined, undefined, 'grid')}
                    >
                      Grid View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={`border-zinc-700 ${viewMode === 'list' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}
                      onClick={() => updateFilters(undefined, undefined, 'list')}
                    >
                      List View
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-zinc-400 hover:text-purple-400"
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

export default BlogFilter;