import { NextApiRequest, NextApiResponse } from 'next';
import { withRateLimit } from './rateLimit';
import { withErrorHandler, withMethods } from './errorHandler';
import { withSecurityHeaders } from './securityHeaders';

// Combine all middlewares
export function withApiMiddleware(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void,
  options: {
    methods: string[];
    rateLimit?: {
      limit: number;
      windowMs: number;
    };
  }
) {
  // Apply middlewares in the correct order
  return withSecurityHeaders(
    withErrorHandler(
      withMethods(
        withRateLimit(handler, options.rateLimit),
        options.methods
      )
    )
  );
}