import { NextApiRequest, NextApiResponse } from 'next';
import { withApiMiddleware } from '@/lib/apiMiddleware';
import { validateQuery } from '@/lib/validation';
import { ventureQuerySchema } from '@/lib/validation';
import { NotFoundError } from '@/lib/errorHandler';

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
    
    // Return empty ventures array with pagination metadata
    // In a real application, this would fetch data from a database
    return res.status(200).json({
      ventures: [],
      pagination: {
        total: 0,
        pages: 0,
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