import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

// CSRF token expiration time (1 hour)
const CSRF_TOKEN_EXPIRY = 60 * 60 * 1000;

// Generate a CSRF token
export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Create a signed CSRF token with expiration
export function createCsrfToken(): { token: string; expires: number } {
  const expires = Date.now() + CSRF_TOKEN_EXPIRY;
  const token = generateCsrfToken();
  
  // In a real application, you would store this token in a database or Redis
  // For this example, we'll rely on the token being stored in a cookie
  
  return {
    token,
    expires
  };
}

// Middleware to validate CSRF token
export function withCsrfProtection(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Skip CSRF validation for GET and HEAD requests
    if (req.method === 'GET' || req.method === 'HEAD') {
      return handler(req, res);
    }
    
    // Get the CSRF token from the request header
    const csrfToken = req.headers['x-csrf-token'] as string;
    
    // Get the CSRF token from the cookie
    const cookieCsrfToken = req.cookies['csrf-token'];
    
    // If no CSRF token is provided, reject the request
    if (!csrfToken || !cookieCsrfToken) {
      return res.status(403).json({
        error: 'CSRF token missing'
      });
    }
    
    try {
      // In a real application, you would validate the token against your database
      // For this example, we'll just check if the tokens match
      if (csrfToken !== cookieCsrfToken) {
        return res.status(403).json({
          error: 'Invalid CSRF token'
        });
      }
      
      // Continue to the handler
      return handler(req, res);
    } catch (error) {
      console.error('CSRF validation error:', error);
      return res.status(403).json({
        error: 'CSRF validation failed'
      });
    }
  };
}