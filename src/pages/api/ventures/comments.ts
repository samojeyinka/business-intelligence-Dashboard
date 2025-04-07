import { NextApiRequest, NextApiResponse } from 'next';
import { addComment, mockVentures } from '@/lib/mockData';
import { withApiMiddleware } from '@/lib/apiMiddleware';
import { validateBody, validateQuery } from '@/lib/validation';
import { commentSchema, commentQuerySchema } from '@/lib/validation';
import { BadRequestError, NotFoundError } from '@/lib/errorHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Validate and parse request body
    const validation = validateBody(commentSchema, req, res);
    if (!validation.success) return;
    
    const { ventureId, content } = validation.data;
    
    console.log(`User commenting on venture ${ventureId}`);
    
    // Check if venture exists
    const ventureExists = mockVentures.some(v => v.id === ventureId);
    if (!ventureExists) {
      throw new NotFoundError('Venture not found');
    }
    
    // Use mock comment function
    const comment = addComment(ventureId, content);
    
    console.log(`Added comment to venture ${ventureId}`);
    
    return res.status(201).json(comment);
  } else if (req.method === 'GET') {
    // Validate and parse query parameters
    const validation = validateQuery(commentQuerySchema, req, res);
    if (!validation.success) return;
    
    const { ventureId, limit, page } = validation.data;
    
    console.log(`Fetching comments for venture ${ventureId}`);
    
    // Find the venture to get its comments
    const venture = mockVentures.find(v => v.id === ventureId);
    
    if (!venture) {
      throw new NotFoundError('Venture not found');
    }
    
    const comments = venture.comments || [];
    
    // Simple pagination
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedComments = comments.slice(start, end);
    
    console.log(`Found ${paginatedComments.length} comments out of ${comments.length} total`);
    
    // Return comments with pagination metadata
    return res.status(200).json({
      comments: paginatedComments,
      pagination: {
        total: comments.length,
        pages: Math.ceil(comments.length / limit),
        current: page,
        limit
      }
    });
  }
}

export default withApiMiddleware(handler, {
  methods: ['GET', 'POST'],
  rateLimit: {
    limit: 50,
    windowMs: 60000 // 1 minute
  }
});