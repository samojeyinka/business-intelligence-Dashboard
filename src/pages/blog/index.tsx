import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import DynamicCursor from '@/components/DynamicCursor';
import InteractiveBackground from '@/components/InteractiveBackground';
import BlogHero from '@/components/BlogHero';
import BlogFilter from '@/components/BlogFilter';
import BlogPostCard from '@/components/BlogPostCard';
import ImmersiveReader from '@/components/ImmersiveReader';
import ContributionCta from '@/components/ContributionCta';
import { mockBlogPosts, blogCategories, blogTags } from '@/lib/mockBlogData';
import { BlogPost } from '@/components/BlogPostCard';

export default function BlogPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    tag: '',
    view: 'grid'
  });
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  // Only show dynamic cursor on client-side to prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterPosts(term, filters);
  };
  
  // Handle filter changes
  const handleFilterChange = (newFilters: { category: string; tag: string; view: string }) => {
    setFilters(newFilters);
    filterPosts(searchTerm, newFilters);
  };
  
  // Filter posts based on search term and filters
  const filterPosts = (term: string, currentFilters: typeof filters) => {
    let results = [...mockBlogPosts];
    
    // Apply search term filter
    if (term) {
      const lowercaseTerm = term.toLowerCase();
      results = results.filter(post => 
        post.title.toLowerCase().includes(lowercaseTerm) || 
        post.excerpt.toLowerCase().includes(lowercaseTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercaseTerm))
      );
    }
    
    // Apply category filter
    if (currentFilters.category !== 'all') {
      results = results.filter(post => 
        post.tags.some(tag => tag === currentFilters.category)
      );
    }
    
    // Apply tag filter
    if (currentFilters.tag) {
      results = results.filter(post => 
        post.tags.includes(currentFilters.tag)
      );
    }
    
    setFilteredPosts(results);
  };
  
  // Handle post selection
  const handlePostSelect = (post: BlogPost) => {
    setSelectedPost(post);
    // Prevent scrolling when reader is open
    document.body.style.overflow = 'hidden';
  };
  
  // Handle reader close
  const handleReaderClose = () => {
    setSelectedPost(null);
    // Restore scrolling
    document.body.style.overflow = 'auto';
  };
  
  return (
    <>
      <Head>
        <title>The Living Blog | Coact Ventures</title>
        <meta name="description" content="Explore our futuristic open contributions blog - a platform fostering collective knowledge through collaborative efforts." />
        <style>{`
          @keyframes shimmer {
            0% { background-position: 0% 0; }
            100% { background-position: 100% 0; }
          }
        `}</style>
      </Head>
      
      {isMounted && <DynamicCursor />}
      
      <div className="min-h-screen bg-black text-white relative">
        <InteractiveBackground />
        
        {/* Header */}
        <Header />
        
        {/* Main content */}
        <main className="pt-20">
          {/* Hero section */}
          <BlogHero 
            contributorCount={15} 
            articleCount={mockBlogPosts.length} 
          />
          
          {/* Filter section */}
          <section className="py-8 px-4">
            <BlogFilter 
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              categories={blogCategories}
              tags={blogTags}
            />
          </section>
          
          {/* Blog posts grid */}
          <section className="py-8 px-4">
            <div className="max-w-7xl mx-auto">
              {filteredPosts.length > 0 ? (
                <>
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">
                      {searchTerm || filters.category !== 'all' || filters.tag 
                        ? 'Search Results' 
                        : 'Latest Articles'}
                      <span className="text-zinc-500 ml-2 text-lg">({filteredPosts.length})</span>
                    </h2>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={filters.view === 'grid' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}
                        onClick={() => handleFilterChange({...filters, view: 'grid'})}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={filters.view === 'list' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}
                        onClick={() => handleFilterChange({...filters, view: 'list'})}
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className={`grid gap-6 ${
                    filters.view === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                      : 'grid-cols-1'
                  }`}>
                    {filteredPosts.map((post) => (
                      <BlogPostCard 
                        key={post.id} 
                        post={post} 
                        onSelect={handlePostSelect}
                        variant={filters.view === 'list' ? 'expanded' : 'compact'}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold mb-4">No articles found</h2>
                  <p className="text-zinc-400 mb-6">
                    We couldn't find any articles matching your search criteria.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setFilters({category: 'all', tag: '', view: filters.view});
                      setFilteredPosts(mockBlogPosts);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </section>
          
          {/* Contribution CTA */}
          <ContributionCta />
        </main>
        
        {/* Immersive reader */}
        {selectedPost && (
          <ImmersiveReader 
            post={selectedPost} 
            onClose={handleReaderClose} 
          />
        )}
      </div>
    </>
  );
}