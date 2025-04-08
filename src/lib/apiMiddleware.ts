import { NextApiRequest, NextApiResponse } from 'next';
import { withRateLimit } from './rateLimit';
import { withErrorHandler, withMethods } from './errorHandler';
import { withSecurityHeaders } from './securityHeaders';
import { withCsrfProtection } from './csrf';

// Combine all middlewares
export function withApiMiddleware(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void,
  options: {
    methods: string[];
    rateLimit?: {
      limit: number;
      windowMs: number;
    };
    csrfProtection?: boolean;
  }
) {
  // Apply middlewares in the correct order
  let wrappedHandler = withSecurityHeaders(
    withErrorHandler(
      withMethods(
        withRateLimit(handler, options.rateLimit),
        options.methods
      )
    )
  );
  
  // Add CSRF protection if enabled
  if (options.csrfProtection !== false && 
      options.methods.some(m => m !== 'GET' && m !== 'HEAD')) {
    wrappedHandler = withCsrfProtection(wrappedHandler);
  }
  
  return wrappedHandler;
}