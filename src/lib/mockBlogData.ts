import { BlogPost } from '@/components/BlogPostCard';

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Collaborative Innovation in Tech Ecosystems',
    excerpt: 'Exploring how open collaboration is reshaping the landscape of technology innovation and creating new opportunities for founders and builders.',
    content: `
      <p>The technology landscape is rapidly evolving, driven by unprecedented levels of collaboration and open innovation. This shift represents more than just a trend—it's a fundamental reimagining of how we create, share, and build upon ideas.</p>
      
      <h2>The Power of Collective Intelligence</h2>
      
      <p>When diverse minds come together, the potential for breakthrough innovation increases exponentially. Open collaboration enables:</p>
      
      <ul>
        <li>Faster problem-solving through diverse perspectives</li>
        <li>More resilient solutions that address edge cases</li>
        <li>Equitable access to knowledge and resources</li>
        <li>Accelerated learning across communities</li>
      </ul>
      
      <p>This collective approach to innovation is particularly powerful in emerging markets and underserved communities, where traditional resources may be limited but human ingenuity is abundant.</p>
      
      <h2>Building Open Infrastructure</h2>
      
      <p>The most impactful innovations often come in the form of infrastructure—the foundational layers upon which others can build. Open source software, open standards, and shared knowledge repositories create fertile ground for innovation.</p>
      
      <p>By contributing to these shared resources, organizations and individuals can amplify their impact far beyond what they could achieve alone. This is the multiplier effect of open collaboration.</p>
      
      <h2>The Role of Venture Studios</h2>
      
      <p>Venture studios are uniquely positioned to harness the power of collaborative innovation. By bringing together diverse talent, providing structured support, and fostering open knowledge sharing, they can accelerate the journey from idea to impact.</p>
      
      <p>The most effective studios recognize that their value lies not just in the ventures they create, but in the ecosystems they nurture and the collaborative networks they build.</p>
      
      <h2>Looking Forward</h2>
      
      <p>As we look to the future, the organizations that will thrive are those that embrace openness, foster collaboration, and contribute to the collective knowledge base. The challenges we face—from climate change to digital inclusion—are too complex for any single entity to solve alone.</p>
      
      <p>By building in the open and learning together, we can create a more innovative, equitable, and sustainable future.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    author: {
      name: 'Alex Rivera',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      role: 'Innovation Strategist'
    },
    publishedAt: 'Apr 2, 2025',
    readingTime: '6 min read',
    tags: ['Innovation', 'Collaboration', 'Ecosystem'],
    commentCount: 12,
    contributedBy: ['Jamie Chen', 'Sophia Williams']
  },
  {
    id: '2',
    title: 'Decentralized Knowledge: Building the Future of Learning',
    excerpt: 'How decentralized knowledge systems are democratizing education and creating new pathways for continuous learning in the digital age.',
    content: `
      <p>The traditional models of education and knowledge sharing are being transformed by decentralized approaches that put learners at the center and enable continuous, collaborative learning.</p>
      
      <h2>Beyond Institutional Boundaries</h2>
      
      <p>For centuries, knowledge has been concentrated within institutions—universities, research centers, and corporations. While these entities have advanced human understanding in countless ways, they've also created barriers to access.</p>
      
      <p>Decentralized knowledge systems are breaking down these barriers by:</p>
      
      <ul>
        <li>Enabling peer-to-peer learning networks</li>
        <li>Creating open access to educational resources</li>
        <li>Validating skills and knowledge through alternative credentials</li>
        <li>Fostering communities of practice across geographical boundaries</li>
      </ul>
      
      <h2>The Technology Enablers</h2>
      
      <p>Several technological innovations are accelerating this shift:</p>
      
      <p><strong>Blockchain and Web3</strong>: Creating verifiable credentials and new models for recognizing and rewarding contributions to knowledge commons.</p>
      
      <p><strong>AI and Machine Learning</strong>: Personalizing learning experiences and helping to organize and make accessible vast repositories of information.</p>
      
      <p><strong>Collaborative Platforms</strong>: Enabling real-time co-creation and iteration of knowledge artifacts across distributed teams.</p>
      
      <h2>Building Learning Ecosystems</h2>
      
      <p>The most effective decentralized knowledge systems function as ecosystems, with multiple entry points, diverse contribution mechanisms, and clear pathways for progression.</p>
      
      <p>These ecosystems thrive on diversity—of perspectives, experiences, and expertise. They create space for both structured learning and serendipitous discovery.</p>
      
      <h2>The Path Forward</h2>
      
      <p>As we build these new systems, we must be intentional about addressing existing inequities and ensuring that decentralization leads to greater inclusion, not less.</p>
      
      <p>This requires thoughtful design of incentives, governance structures, and accessibility features. It also demands a commitment to meeting learners where they are and providing multiple pathways to engagement.</p>
      
      <p>By embracing decentralized approaches to knowledge creation and sharing, we can build learning systems that are more resilient, adaptive, and aligned with the needs of a rapidly changing world.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    author: {
      name: 'Maya Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      role: 'Education Futurist'
    },
    publishedAt: 'Mar 28, 2025',
    readingTime: '8 min read',
    tags: ['Education', 'Decentralization', 'Future of Learning'],
    commentCount: 24,
    contributedBy: ['David Kim', 'Elena Rodriguez', 'Marcus Lee']
  }
];

export const blogCategories = [
  'Innovation',
  'Collaboration',
  'Sustainability',
  'AI & Technology',
  'Venture Building',
  'Education',
  'Global Perspectives'
];

export const blogTags = [
  'Innovation',
  'Collaboration',
  'Ecosystem',
  'Education',
  'Decentralization',
  'Future of Learning',
  'Sustainability',
  'Venture Building',
  'Impact',
  'AI',
  'Future of Work',
  'Building in Public',
  'Transparency',
  'Community',
  'Global Tech',
  'Innovation Ecosystems',
  'Emerging Markets'
];