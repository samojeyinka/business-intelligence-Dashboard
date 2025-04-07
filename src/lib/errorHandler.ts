import { NextApiRequest, NextApiResponse } from 'next';

// Error types
export class ApiError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = 'Bad request') {
    super(message, 400);
    this.name = 'BadRequestError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

// Error handler middleware
export function withErrorHandler(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error('API Error:', error);
      
      // Handle known API errors
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
          error: error.message
        });
      }
      
      // Handle unexpected errors
      return res.status(500).json({
        error: 'An unexpected error occurred'
      });
    }
  };
}

// Method handler to validate HTTP methods
export function withMethods(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void,
  allowedMethods: string[]
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (!allowedMethods.includes(req.method || '')) {
      res.setHeader('Allow', allowedMethods);
      return res.status(405).json({
        error: `Method ${req.method} Not Allowed`
      });
    }
    
    await handler(req, res);
  };
}