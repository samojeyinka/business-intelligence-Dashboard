import { NextApiRequest, NextApiResponse } from 'next';
import { getVentures } from '@/lib/mockData';

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
        limit = '10',
        page = '1',
        sort = 'upvotes',
        search = '',
        sector = '',
        isLookingForCollaborators = ''
      } = req.query;

      // Parse numeric values
      const limitNum = parseInt(limit as string);
      const pageNum = parseInt(page as string);
      
      console.log('Query parameters:', { stage, limit: limitNum, page: pageNum, sort, search, sector, isLookingForCollaborators });
      
      // Get ventures from mock data
      const result = getVentures({
        page: pageNum,
        limit: limitNum,
        stage: stage as string,
        search: search as string,
        sector: sector as string,
        sort: sort as string,
        isLookingForCollaborators: isLookingForCollaborators === 'true'
      });
      
      console.log(`Found ${result.ventures.length} ventures out of ${result.pagination.total} total`);
      
      // Return ventures with pagination metadata
      return res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching ventures:', error);
      return res.status(500).json({ error: 'Failed to fetch ventures' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}