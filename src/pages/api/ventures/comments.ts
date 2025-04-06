import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

// This is a simplified version - in a real app, you would implement proper authentication
const getCurrentUser = async (req: NextApiRequest) => {
  // For demo purposes, we'll create a mock user if none exists
  let user = await prisma.user.findFirst({
    where: { email: 'demo@coact.com' }
  });
  
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'demo@coact.com',
        name: 'Demo User'
      }
    });
  }
  
  return user;
};

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
      
      // Get current user (in a real app, this would use your auth system)
      const user = await getCurrentUser(req);
      
      if (!user) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      
      console.log(`User ${user.id} commenting on venture ${ventureId}`);
      
      // Create new comment
      const comment = await prisma.comment.create({
        data: {
          content,
          user: {
            connect: { id: user.id }
          },
          venture: {
            connect: { id: ventureId }
          }
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        }
      });
      
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
      const skip = (pageNum - 1) * limitNum;
      
      console.log(`Fetching comments for venture ${ventureId}`);
      
      // Fetch comments with pagination
      const comments = await prisma.comment.findMany({
        where: {
          ventureId: ventureId as string
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limitNum
      });
      
      // Get total count for pagination
      const totalComments = await prisma.comment.count({
        where: {
          ventureId: ventureId as string
        }
      });
      
      console.log(`Found ${comments.length} comments out of ${totalComments} total`);
      
      // Return comments with pagination metadata
      return res.status(200).json({
        comments,
        pagination: {
          total: totalComments,
          pages: Math.ceil(totalComments / limitNum),
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