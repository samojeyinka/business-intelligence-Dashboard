import { NextApiRequest, NextApiResponse } from 'next';
import { toggleUpvote } from '@/lib/mockData';
import { withApiMiddleware } from '@/lib/apiMiddleware';
import { validateBody } from '@/lib/validation';
import { upvoteSchema } from '@/lib/validation';
import { BadRequestError } from '@/lib/errorHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Validate and parse request body
    const validation = validateBody(upvoteSchema, req, res);
    if (!validation.success) return;
    
    const { ventureId } = validation.data;
    
    console.log(`User upvoting venture ${ventureId}`);
    
    // Use mock upvote function
    const result = toggleUpvote(ventureId);
    
    if (!result) {
      throw new BadRequestError('Invalid venture ID');
    }
    
    console.log(`${result.action === 'added' ? 'Added' : 'Removed'} upvote for venture ${ventureId}`);
    
    return res.status(200).json(result);
  }
}

export default withApiMiddleware(handler, {
  methods: ['POST'],
  rateLimit: {
    limit: 20,
    windowMs: 60000 // 1 minute - stricter rate limit for mutations
  }
});