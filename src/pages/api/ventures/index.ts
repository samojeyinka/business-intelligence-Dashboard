import { NextApiRequest, NextApiResponse } from 'next';
import { withApiMiddleware } from '@/lib/apiMiddleware';
import { validateQuery } from '@/lib/validation';
import { ventureQuerySchema } from '@/lib/validation';
import { NotFoundError } from '@/lib/errorHandler';

// Sample ventures data with proper image paths
const sampleVentures = [
  {
    id: '1',
    name: 'EcoTech Solutions',
    slug: 'ecotech-solutions',
    description: 'Developing sustainable technology solutions for environmental challenges.',
    // logo:comp1,
    stage: 'MVP',
    sectors: ['Climate Tech', 'AI & Machine Learning'],
    isLookingForCollaborators: true,
    isStealthMode: false,
    isCoactProduct: true,
    teamSize: 5,
    createdAt: new Date().toISOString(),
    founders: [
      {
        id: '101',
        name: 'Alex Johnson',
        // image: '/images/portfolio/company1.png'
      },
      {
        id: '102',
        name: 'Sarah Chen',
        image: null
      }
    ],
    _count: {
      upvotes: 42
    }
  },
  {
    id: '2',
    name: 'FinFlow',
    slug: 'finflow',
    description: 'Revolutionizing financial services with blockchain technology.',
    // logo: '/images/portfolio/company2.png',
    stage: 'GROWTH',
    sectors: ['FinTech', 'Blockchain'],
    isLookingForCollaborators: false,
    isStealthMode: false,
    isCoactProduct: false,
    teamSize: 12,
    createdAt: new Date().toISOString(),
    founders: [
      {
        id: '201',
        name: 'Michael Rodriguez',
        // image: '/images/portfolio/company2.png'
      },
      {
        id: '202',
        name: 'Emma Wilson',
        image: null
      }
    ],
    _count: {
      upvotes: 78
    }
  },
  {
    id: '3',
    name: 'HealthAI',
    slug: 'health-ai',
    description: 'AI-powered healthcare diagnostics and personalized treatment plans.',
    // logo: '/images/portfolio/company3.png',
    stage: 'PROTOTYPE',
    sectors: ['Healthcare', 'AI & Machine Learning'],
    isLookingForCollaborators: true,
    isStealthMode: false,
    isCoactProduct: true,
    teamSize: 8,
    createdAt: new Date().toISOString(),
    founders: [
      {
        id: '301',
        name: 'David Kim',
        // image: '/images/portfolio/company3.png'
      },
      {
        id: '302',
        name: 'Lisa Patel',
        image: null
      }
    ],
    _count: {
      upvotes: 35
    }
  }
];

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    console.log('Fetching ventures');
    
    // Validate and parse query parameters
    const validation = validateQuery(ventureQuerySchema, req, res);
    if (!validation.success) return;
    
    const { 
      stage, 
      limit,
      page,
      sort,
      search,
      sector,
      isLookingForCollaborators 
    } = validation.data;
    
    console.log('Query parameters:', { 
      stage, 
      limit, 
      page, 
      sort, 
      search, 
      sector, 
      isLookingForCollaborators 
    });
    
    // Filter ventures based on query parameters
    let filteredVentures = [...sampleVentures];
    
    if (stage && stage !== 'all') {
      filteredVentures = filteredVentures.filter(v => v.stage === stage);
    }
    
    if (sector && sector !== 'all_sectors') {
      filteredVentures = filteredVentures.filter(v => v.sectors.includes(sector));
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredVentures = filteredVentures.filter(v => 
        v.name.toLowerCase().includes(searchLower) || 
        v.description.toLowerCase().includes(searchLower)
      );
    }
    
    if (isLookingForCollaborators !== undefined) {
      filteredVentures = filteredVentures.filter(v => v.isLookingForCollaborators === isLookingForCollaborators);
    }
    
    // Sort ventures
    if (sort === 'upvotes') {
      filteredVentures.sort((a, b) => b._count.upvotes - a._count.upvotes);
    } else if (sort === 'newest') {
      filteredVentures.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    // Pagination
    const total = filteredVentures.length;
    const pages = Math.max(1, Math.ceil(total / limit));
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedVentures = filteredVentures.slice(startIndex, endIndex);
    
    return res.status(200).json({
      ventures: paginatedVentures,
      pagination: {
        total,
        pages,
        current: page,
        limit
      }
    });
  }
}

export default withApiMiddleware(handler, {
  methods: ['GET'],
  rateLimit: {
    limit: 100,
    windowMs: 60000 // 1 minute
  }
});