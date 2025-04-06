import { NextApiRequest, NextApiResponse } from 'next';
import { toggleUpvote } from '@/lib/mockData';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { ventureId } = req.body;
      
      if (!ventureId) {
        return res.status(400).json({ error: 'Venture ID is required' });
      }
      
      console.log(`User upvoting venture ${ventureId}`);
      
      // Use mock upvote function
      const result = toggleUpvote(ventureId);
      
      console.log(`${result.action === 'added' ? 'Added' : 'Removed'} upvote for venture ${ventureId}`);
      
      return res.status(200).json(result);
    } catch (error) {
      console.error('Error upvoting venture:', error);
      return res.status(500).json({ error: 'Failed to upvote venture' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}