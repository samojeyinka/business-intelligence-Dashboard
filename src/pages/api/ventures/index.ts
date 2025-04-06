import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      console.log('Fetching ventures');
      
      // Extract query parameters
      const { 
        stage, 
        status = 'APPROVED,FEATURED', 
        limit = '10',
        page = '1',
        sort = 'upvotes',
        order = 'desc',
        search = '',
        sector = '',
        technology = '',
        isLookingForCollaborators = ''
      } = req.query;

      // Parse numeric values
      const limitNum = parseInt(limit as string);
      const pageNum = parseInt(page as string);
      const skip = (pageNum - 1) * limitNum;
      
      // Build filter conditions
      const where: any = {};
      
      // Only show approved and featured ventures by default
      if (status) {
        where.status = {
          in: (status as string).split(',')
        };
      }
      
      // Filter by stage if provided
      if (stage) {
        where.stage = {
          in: (stage as string).split(',')
        };
      }
      
      // Search by name or description
      if (search) {
        where.OR = [
          { name: { contains: search as string, mode: 'insensitive' } },
          { description: { contains: search as string, mode: 'insensitive' } }
        ];
      }
      
      // Filter by sector
      if (sector) {
        where.sectors = {
          hasSome: (sector as string).split(',')
        };
      }
      
      // Filter by technology
      if (technology) {
        where.technologies = {
          hasSome: (technology as string).split(',')
        };
      }
      
      // Filter by collaboration status
      if (isLookingForCollaborators) {
        where.isLookingForCollaborators = isLookingForCollaborators === 'true';
      }
      
      // Determine sort field and order
      const orderBy: any = {};
      if (sort === 'upvotes') {
        // For upvotes, we need to count the relations
        orderBy._count = { upvotes: order === 'desc' ? 'desc' : 'asc' };
      } else if (sort === 'recent') {
        orderBy.createdAt = order === 'desc' ? 'desc' : 'asc';
      } else {
        orderBy[sort as string] = order === 'desc' ? 'desc' : 'asc';
      }
      
      console.log('Query parameters:', { where, orderBy, skip, take: limitNum });
      
      // Fetch ventures with pagination
      const ventures = await prisma.venture.findMany({
        where,
        orderBy,
        skip,
        take: limitNum,
        include: {
          _count: {
            select: { upvotes: true, comments: true }
          },
          founders: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        }
      });
      
      // Get total count for pagination
      const totalVentures = await prisma.venture.count({ where });
      
      console.log(`Found ${ventures.length} ventures out of ${totalVentures} total`);
      
      // Return ventures with pagination metadata
      return res.status(200).json({
        ventures,
        pagination: {
          total: totalVentures,
          pages: Math.ceil(totalVentures / limitNum),
          current: pageNum,
          limit: limitNum
        }
      });
    } catch (error) {
      console.error('Error fetching ventures:', error);
      return res.status(500).json({ error: 'Failed to fetch ventures' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}