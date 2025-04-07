import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

// Helper function to validate request body against a Zod schema
export function validateBody<T>(
  schema: z.ZodType<T>,
  req: NextApiRequest,
  res: NextApiResponse
): { success: true; data: T } | { success: false } {
  try {
    const data = schema.parse(req.body);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: 'Invalid request data',
        details: error.errors
      });
    } else {
      res.status(400).json({
        error: 'Invalid request data'
      });
    }
    return { success: false };
  }
}

// Helper function to validate query parameters against a Zod schema
export function validateQuery<T>(
  schema: z.ZodType<T>,
  req: NextApiRequest,
  res: NextApiResponse
): { success: true; data: T } | { success: false } {
  try {
    const data = schema.parse(req.query);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: 'Invalid query parameters',
        details: error.errors
      });
    } else {
      res.status(400).json({
        error: 'Invalid query parameters'
      });
    }
    return { success: false };
  }
}

// Common schemas
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10)
});

export const idSchema = z.object({
  id: z.string().min(1)
});

export const slugSchema = z.object({
  slug: z.string().min(1)
});

// Venture-specific schemas
export const ventureQuerySchema = paginationSchema.extend({
  stage: z.string().optional(),
  sort: z.enum(['upvotes', 'newest', 'oldest']).optional().default('upvotes'),
  search: z.string().optional().default(''),
  sector: z.string().optional().default(''),
  isLookingForCollaborators: z.enum(['true', 'false']).optional()
});

export const upvoteSchema = z.object({
  ventureId: z.string().min(1)
});

export const commentSchema = z.object({
  ventureId: z.string().min(1),
  content: z.string().min(1).max(1000)
});

export const commentQuerySchema = z.object({
  ventureId: z.string().min(1),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10)
});