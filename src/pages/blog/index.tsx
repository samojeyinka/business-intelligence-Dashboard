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
import { fetchBlogPosts } from '@/lib/firestore-utils';

export default function BlogPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [allPosts, setAllPosts] = useState<FirestoreBlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<FirestoreBlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    tag: '',
    view: 'grid'
  });
  const [selectedPost, setSelectedPost] = useState<FirestoreBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  
  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await fetchBlogPosts();
        setAllPosts(posts);
        setFilteredPosts(posts);
        
        // Extract unique tags and categories
        const allTags = new Set<string>();
        const allCategories = new Set<string>();
        
        posts.forEach(post => {
          post.tags?.forEach(tag => allTags.add(tag));
          // If you have categories in your data, add them here
          // Otherwise we'll use tags as categories
          post.categories?.forEach(category => allCategories.add(category));
        });
        
        setTags(Array.from(allTags));
        setCategories(Array.from(allCategories));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
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
    let results = [...allPosts];
    
    // Apply search term filter
    if (term) {
      const lowercaseTerm = term.toLowerCase();
      results = results.filter(post => 
        post.title.toLowerCase().includes(lowercaseTerm) || 
        post.excerpt.toLowerCase().includes(lowercaseTerm) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowercaseTerm)))
      );
    }
    
    // Apply category filter (using tags as categories)
    if (currentFilters.category !== 'all') {
      results = results.filter(post => 
        post.categories && post.categories.includes(currentFilters.category)
      );
    }
    
    // Apply tag filter
    if (currentFilters.tag) {
      results = results.filter(post => 
        post.tags && post.tags.includes(currentFilters.tag)
      );
    }
    
    setFilteredPosts(results);
  };
  
  // Handle post selection
  const handlePostSelect = (post: FirestoreBlogPost) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden';
  };
  
  // Handle reader close
  const handleReaderClose = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse">Loading articles...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Our Open Blog | Coact Ventures</title>
        <meta name="description" content="Explore our open contributions blog - a platform fostering collective knowledge through collaborative efforts." />
      </Head>
      
      {isMounted && <DynamicCursor />}
      
      <div className="min-h-screen bg-black text-white relative">
        <InteractiveBackground />
        <Header />
        
        <main className="pt-20">
          <BlogHero 
            contributorCount={allPosts.reduce((acc, post) => 
              acc + (post.author.name ? 1 : 0), 0)} 
            articleCount={allPosts.length} 
          />
          
          <section className="py-8 px-4">
            <BlogFilter 
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              categories={categories}
              tags={tags}
            />
          </section>
          
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
                        post={{
                          ...post,
                          publishedAt: post.createdAt.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }),
                          readingTime: `${Math.ceil(post.content.split(' ').length / 200)} min read`,
                          commentCount: 0, // You can fetch this from Firestore if needed
                          contributedBy: [] // You can add this data if available
                        }} 
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
                      setFilteredPosts(allPosts);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </section>
          
          <ContributionCta />
        </main>
        
        {selectedPost && (
          <ImmersiveReader 
            post={{
              ...selectedPost,
              publishedAt: selectedPost.createdAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }),
              readingTime: `${Math.ceil(selectedPost.content.split(' ').length / 200)} min read`,
              commentCount: 0,
              contributedBy: []
            }} 
            onClose={handleReaderClose} 
          />
        )}
      </div>
    </>
  );
}