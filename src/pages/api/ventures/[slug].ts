import { NextApiRequest, NextApiResponse } from 'next';
import { getVentureBySlug } from '@/lib/mockData';
import { withApiMiddleware } from '@/lib/apiMiddleware';
import { validateQuery } from '@/lib/validation';
import { slugSchema } from '@/lib/validation';
import { NotFoundError } from '@/lib/errorHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Validate and parse query parameters
    const validation = validateQuery(slugSchema, req, res);
    if (!validation.success) return;
    
    const { slug } = validation.data;
    
    console.log(`Fetching venture with slug: ${slug}`);
    
    const venture = getVentureBySlug(slug);
    
    if (!venture) {
      throw new NotFoundError('Venture not found');
    }
    
    console.log(`Found venture: ${venture.name}`);
    
    return res.status(200).json(venture);
  }
}

export default withApiMiddleware(handler, {
  methods: ['GET'],
  rateLimit: {
    limit: 100,
    windowMs: 60000 // 1 minute
  }
});