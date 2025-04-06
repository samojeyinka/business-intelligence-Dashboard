import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { slug } = req.query;
      
      if (!slug || typeof slug !== 'string') {
        return res.status(400).json({ error: 'Venture slug is required' });
      }
      
      console.log(`Fetching venture with slug: ${slug}`);
      
      const venture = await prisma.venture.findUnique({
        where: { slug },
        include: {
          _count: {
            select: { upvotes: true, comments: true }
          },
          founders: {
            select: {
              id: true,
              name: true,
              image: true,
              email: true
            }
          },
          comments: {
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
            take: 10
          }
        }
      });
      
      if (!venture) {
        return res.status(404).json({ error: 'Venture not found' });
      }
      
      console.log(`Found venture: ${venture.name}`);
      
      return res.status(200).json(venture);
    } catch (error) {
      console.error('Error fetching venture:', error);
      return res.status(500).json({ error: 'Failed to fetch venture' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}