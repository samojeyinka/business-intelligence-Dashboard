import { NextApiRequest, NextApiResponse } from 'next';
import { getVentures } from '@/lib/mockData';
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
    
    // Get ventures from mock data
    const result = getVentures({
      page,
      limit,
      stage,
      search,
      sector,
      sort,
      isLookingForCollaborators: isLookingForCollaborators === 'true'
    });
    
    console.log(`Found ${result.ventures.length} ventures out of ${result.pagination.total} total`);
    
    // Return ventures with pagination metadata
    return res.status(200).json(result);
  }
}

export default withApiMiddleware(handler, {
  methods: ['GET'],
  rateLimit: {
    limit: 100,
    windowMs: 60000 // 1 minute
  }
});