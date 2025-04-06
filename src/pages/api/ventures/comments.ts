import { NextApiRequest, NextApiResponse } from 'next';
import { addComment, mockVentures } from '@/lib/mockData';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { ventureId, content } = req.body;
      
      if (!ventureId || !content) {
        return res.status(400).json({ error: 'Venture ID and comment content are required' });
      }
      
      console.log(`User commenting on venture ${ventureId}`);
      
      // Use mock comment function
      const comment = addComment(ventureId, content);
      
      console.log(`Added comment to venture ${ventureId}`);
      
      return res.status(201).json(comment);
    } catch (error) {
      console.error('Error adding comment:', error);
      return res.status(500).json({ error: 'Failed to add comment' });
    }
  } else if (req.method === 'GET') {
    try {
      const { ventureId, limit = '10', page = '1' } = req.query;
      
      if (!ventureId) {
        return res.status(400).json({ error: 'Venture ID is required' });
      }
      
      // Parse numeric values
      const limitNum = parseInt(limit as string);
      const pageNum = parseInt(page as string);
      
      console.log(`Fetching comments for venture ${ventureId}`);
      
      // Find the venture to get its comments
      const venture = mockVentures.find(v => v.id === ventureId);
      const comments = venture?.comments || [];
      
      // Simple pagination
      const start = (pageNum - 1) * limitNum;
      const end = start + limitNum;
      const paginatedComments = comments.slice(start, end);
      
      console.log(`Found ${paginatedComments.length} comments out of ${comments.length} total`);
      
      // Return comments with pagination metadata
      return res.status(200).json({
        comments: paginatedComments,
        pagination: {
          total: comments.length,
          pages: Math.ceil(comments.length / limitNum),
          current: pageNum,
          limit: limitNum
        }
      });
    } catch (error) {
      console.error('Error fetching comments:', error);
      return res.status(500).json({ error: 'Failed to fetch comments' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}