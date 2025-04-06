import { VentureWithRelations, VentureStage, VentureStatus } from '@/types/venture';

// Mock data for ventures
export const mockVentures: VentureWithRelations[] = [
  {
    id: '1',
    name: 'NeuralSync',
    slug: 'neuralsync',
    description: 'AI-powered neural interface for seamless human-computer interaction',
    longDescription: 'NeuralSync is developing cutting-edge neural interface technology that allows for direct communication between the human brain and computers. Our non-invasive solution uses advanced machine learning algorithms to interpret neural signals and translate them into digital commands, enabling a new era of human-computer interaction.',
    logo: null,
    website: 'https://neuralsync.ai',
    twitter: 'neuralsync',
    linkedin: 'https://linkedin.com/company/neuralsync',
    github: 'neuralsync',
    stage: 'PROTOTYPE' as VentureStage,
    status: 'APPROVED' as VentureStatus,
    isAnonymous: false,
    isStealthMode: false,
    isLookingForCollaborators: true,
    isCoactProduct: true,
    sectors: ['AI & Machine Learning', 'Healthcare', 'Neurotechnology'],
    technologies: ['TensorFlow', 'Python', 'React'],
    teamSize: 4,
    foundedDate: new Date('2023-06-01').toISOString(),
    createdAt: new Date('2023-08-15').toISOString(),
    updatedAt: new Date('2023-08-15').toISOString(),
    _count: {
      upvotes: 42,
      comments: 7
    },
    founders: [
      {
        id: '101',
        name: 'Alex Chen',
        image: null
      },
      {
        id: '102',
        name: 'Maya Patel',
        image: null
      }
    ],
    comments: [
      {
        id: '201',
        content: 'This technology is absolutely groundbreaking! I can see so many applications in assistive technology.',
        userId: '301',
        ventureId: '1',
        createdAt: new Date('2023-09-01').toISOString(),
        updatedAt: new Date('2023-09-01').toISOString(),
        user: {
          id: '301',
          name: 'Jamie Rodriguez',
          image: null
        }
      },
      {
        id: '202',
        content: 'I\'d love to learn more about your approach to signal processing. Have you published any papers on your methods?',
        userId: '302',
        ventureId: '1',
        createdAt: new Date('2023-09-05').toISOString(),
        updatedAt: new Date('2023-09-05').toISOString(),
        user: {
          id: '302',
          name: 'Dr. Sarah Kim',
          image: null
        }
      }
    ]
  },
  {
    id: '2',
    name: 'QuantumLeap',
    slug: 'quantumleap',
    description: 'Quantum computing solutions for complex optimization problems',
    longDescription: 'QuantumLeap is building accessible quantum computing solutions that solve complex optimization problems across industries. Our platform allows businesses to leverage quantum algorithms without requiring deep expertise in quantum physics, making this revolutionary technology practical for real-world applications.',
    logo: null,
    website: 'https://quantumleap.tech',
    twitter: 'quantumleaptech',
    linkedin: 'https://linkedin.com/company/quantumleap',
    github: 'quantumleap-tech',
    stage: 'MVP' as VentureStage,
    status: 'FEATURED' as VentureStatus,
    isAnonymous: false,
    isStealthMode: false,
    isLookingForCollaborators: true,
    isCoactProduct: true,
    sectors: ['Quantum Computing', 'SaaS', 'Enterprise Solutions'],
    technologies: ['Python', 'AWS', 'Qiskit'],
    teamSize: 6,
    foundedDate: new Date('2022-11-15').toISOString(),
    createdAt: new Date('2023-03-10').toISOString(),
    updatedAt: new Date('2023-07-22').toISOString(),
    _count: {
      upvotes: 78,
      comments: 12
    },
    founders: [
      {
        id: '103',
        name: 'Dr. Marcus Johnson',
        image: null
      },
      {
        id: '104',
        name: 'Olivia Chen',
        image: null
      }
    ],
    comments: [
      {
        id: '203',
        content: 'We\'ve been testing your platform for our logistics optimization and seeing promising results. Would love to discuss a potential partnership.',
        userId: '303',
        ventureId: '2',
        createdAt: new Date('2023-08-12').toISOString(),
        updatedAt: new Date('2023-08-12').toISOString(),
        user: {
          id: '303',
          name: 'Thomas Wright',
          image: null
        }
      }
    ]
  },
  {
    id: '3',
    name: 'EcoSphere',
    slug: 'ecosphere',
    description: 'Blockchain-based platform for transparent carbon credit trading and verification',
    longDescription: 'EcoSphere is revolutionizing the carbon credit market with our blockchain-based platform that ensures transparency, traceability, and trust. We\'re making it easier for companies to offset their carbon footprint while providing verification tools that prevent greenwashing and double-counting of credits.',
    logo: null,
    website: 'https://ecosphere.world',
    twitter: 'ecosphereworld',
    linkedin: 'https://linkedin.com/company/ecosphere-world',
    github: 'ecosphere',
    stage: 'GROWTH' as VentureStage,
    status: 'APPROVED' as VentureStatus,
    isAnonymous: false,
    isStealthMode: false,
    isLookingForCollaborators: false,
    isCoactProduct: false,
    sectors: ['Climate Tech', 'Blockchain', 'Sustainability'],
    technologies: ['Solidity', 'React', 'Node.js'],
    teamSize: 8,
    foundedDate: new Date('2021-04-22').toISOString(),
    createdAt: new Date('2022-01-15').toISOString(),
    updatedAt: new Date('2023-05-30').toISOString(),
    _count: {
      upvotes: 103,
      comments: 24
    },
    founders: [
      {
        id: '105',
        name: 'Emma Rodriguez',
        image: null
      }
    ],
    comments: []
  },
  {
    id: '4',
    name: 'Nebula',
    slug: 'nebula',
    description: 'Next-generation space propulsion technology for interplanetary travel',
    longDescription: null,
    logo: null,
    website: null,
    twitter: null,
    linkedin: null,
    github: null,
    stage: 'IDEA' as VentureStage,
    status: 'APPROVED' as VentureStatus,
    isAnonymous: false,
    isStealthMode: true,
    isLookingForCollaborators: true,
    isCoactProduct: false,
    sectors: ['Space Tech', 'Aerospace', 'Engineering'],
    technologies: [],
    teamSize: 2,
    foundedDate: new Date('2024-01-10').toISOString(),
    createdAt: new Date('2024-02-05').toISOString(),
    updatedAt: new Date('2024-02-05').toISOString(),
    _count: {
      upvotes: 17,
      comments: 3
    },
    founders: [
      {
        id: '106',
        name: 'Anonymous Founder',
        image: null
      }
    ],
    comments: []
  },
  {
    id: '5',
    name: 'MindfulAI',
    slug: 'mindfulai',
    description: 'AI-powered mental health platform for personalized therapy and wellness',
    longDescription: 'MindfulAI combines artificial intelligence with evidence-based therapeutic approaches to provide personalized mental health support. Our platform adapts to each user\'s needs, offering interventions ranging from guided meditation to cognitive behavioral therapy exercises, all while maintaining the highest standards of privacy and ethical AI use.',
    logo: null,
    website: 'https://mindfulai.health',
    twitter: 'mindfulai_health',
    linkedin: 'https://linkedin.com/company/mindfulai',
    github: 'mindfulai',
    stage: 'MVP' as VentureStage,
    status: 'APPROVED' as VentureStatus,
    isAnonymous: false,
    isStealthMode: false,
    isLookingForCollaborators: true,
    isCoactProduct: false,
    sectors: ['Healthcare', 'AI & Machine Learning', 'Mental Health'],
    technologies: ['TensorFlow', 'React Native', 'Python'],
    teamSize: 5,
    foundedDate: new Date('2023-02-14').toISOString(),
    createdAt: new Date('2023-06-20').toISOString(),
    updatedAt: new Date('2023-10-15').toISOString(),
    _count: {
      upvotes: 64,
      comments: 9
    },
    founders: [
      {
        id: '107',
        name: 'Dr. Jasmine Lee',
        image: null
      },
      {
        id: '108',
        name: 'Michael Torres',
        image: null
      }
    ],
    comments: []
  },
  {
    id: '6',
    name: 'OceanDAO',
    slug: 'oceandao',
    description: 'Decentralized autonomous organization funding ocean conservation projects',
    longDescription: 'OceanDAO is a decentralized autonomous organization that funds and governs ocean conservation projects worldwide. By leveraging blockchain technology and community governance, we\'re creating a transparent and efficient way to direct resources to the most impactful marine protection initiatives.',
    logo: null,
    website: 'https://oceandao.org',
    twitter: 'ocean_dao',
    linkedin: 'https://linkedin.com/company/oceandao',
    github: 'oceandao',
    stage: 'GROWTH' as VentureStage,
    status: 'FEATURED' as VentureStatus,
    isAnonymous: false,
    isStealthMode: false,
    isLookingForCollaborators: false,
    isCoactProduct: false,
    sectors: ['Social Impact', 'Blockchain', 'Climate Tech'],
    technologies: ['Solidity', 'React', 'Node.js'],
    teamSize: 12,
    foundedDate: new Date('2022-06-08').toISOString(),
    createdAt: new Date('2022-08-30').toISOString(),
    updatedAt: new Date('2023-11-12').toISOString(),
    _count: {
      upvotes: 89,
      comments: 15
    },
    founders: [
      {
        id: '109',
        name: 'Sophia Martinez',
        image: null
      },
      {
        id: '110',
        name: 'Liam Johnson',
        image: null
      }
    ],
    comments: []
  }
];

// Helper function to get a venture by slug
export const getVentureBySlug = (slug: string): VentureWithRelations | undefined => {
  return mockVentures.find(venture => venture.slug === slug);
};

// Helper function to get ventures with pagination and filtering
export const getVentures = (params: {
  page?: number;
  limit?: number;
  stage?: string;
  search?: string;
  sector?: string;
  sort?: string;
  isLookingForCollaborators?: boolean;
}) => {
  const {
    page = 1,
    limit = 10,
    stage,
    search = '',
    sector = '',
    sort = 'upvotes',
    isLookingForCollaborators
  } = params;

  let filteredVentures = [...mockVentures];

  // Filter by stage
  if (stage && stage !== 'all') {
    filteredVentures = filteredVentures.filter(v => v.stage === stage);
  }

  // Filter by search term
  if (search) {
    const searchLower = search.toLowerCase();
    filteredVentures = filteredVentures.filter(v => 
      v.name.toLowerCase().includes(searchLower) || 
      v.description.toLowerCase().includes(searchLower)
    );
  }

  // Filter by sector
  if (sector) {
    filteredVentures = filteredVentures.filter(v => 
      v.sectors.some(s => s.toLowerCase() === sector.toLowerCase())
    );
  }

  // Filter by collaboration status
  if (isLookingForCollaborators !== undefined) {
    filteredVentures = filteredVentures.filter(v => 
      v.isLookingForCollaborators === isLookingForCollaborators
    );
  }

  // Sort ventures
  if (sort === 'upvotes') {
    filteredVentures.sort((a, b) => b._count.upvotes - a._count.upvotes);
  } else if (sort === 'recent') {
    filteredVentures.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  // Calculate pagination
  const total = filteredVentures.length;
  const pages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedVentures = filteredVentures.slice(start, end);

  return {
    ventures: paginatedVentures,
    pagination: {
      total,
      pages,
      current: page,
      limit
    }
  };
};

// Mock upvote function
export const toggleUpvote = (ventureId: string) => {
  // In a real app, this would interact with the database
  // For now, we'll just return a mock response
  return {
    message: 'Venture upvoted successfully',
    action: 'added' as const
  };
};

// Mock add comment function
export const addComment = (ventureId: string, content: string, userId = '301') => {
  // In a real app, this would add to the database
  // For now, we'll just return a mock new comment
  return {
    id: `comment-${Date.now()}`,
    content,
    userId,
    ventureId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: userId,
      name: 'Demo User',
      image: null
    }
  };
};