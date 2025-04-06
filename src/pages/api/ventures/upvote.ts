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
      const { ventureId } = req.body;
      
      if (!ventureId) {
        return res.status(400).json({ error: 'Venture ID is required' });
      }
      
      // Get current user (in a real app, this would use your auth system)
      const user = await getCurrentUser(req);
      
      if (!user) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      
      console.log(`User ${user.id} upvoting venture ${ventureId}`);
      
      // Check if user already upvoted this venture
      const existingUpvote = await prisma.upvote.findUnique({
        where: {
          userId_ventureId: {
            userId: user.id,
            ventureId
          }
        }
      });
      
      if (existingUpvote) {
        // If upvote exists, remove it (toggle behavior)
        await prisma.upvote.delete({
          where: {
            id: existingUpvote.id
          }
        });
        
        console.log(`Removed upvote from venture ${ventureId}`);
        
        return res.status(200).json({ 
          message: 'Upvote removed',
          action: 'removed'
        });
      } else {
        // Create new upvote
        await prisma.upvote.create({
          data: {
            user: {
              connect: { id: user.id }
            },
            venture: {
              connect: { id: ventureId }
            }
          }
        });
        
        console.log(`Added upvote to venture ${ventureId}`);
        
        return res.status(200).json({ 
          message: 'Venture upvoted successfully',
          action: 'added'
        });
      }
    } catch (error) {
      console.error('Error upvoting venture:', error);
      return res.status(500).json({ error: 'Failed to upvote venture' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}