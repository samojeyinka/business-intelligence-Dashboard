import { NextApiRequest, NextApiResponse } from 'next';

interface RateLimitConfig {
  limit: number;
  windowMs: number;
}

// In-memory store for rate limiting
// In production, you would use Redis or another distributed cache
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Clean up the store periodically to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  // Use Array.from to avoid TypeScript iterator issues
  Array.from(rateLimitStore.entries()).forEach(([key, value]) => {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  });
}, 60000); // Clean up every minute

export function rateLimit(config: RateLimitConfig = { limit: 60, windowMs: 60000 }) {
  return (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    // Get client IP
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const key = `${ip}:${req.url}`;
    const now = Date.now();
    
    // Get current rate limit data for this IP and endpoint
    const current = rateLimitStore.get(key) || { count: 0, resetTime: now + config.windowMs };
    
    // If the reset time has passed, reset the counter
    if (now > current.resetTime) {
      current.count = 0;
      current.resetTime = now + config.windowMs;
    }
    
    // Increment request count
    current.count++;
    
    // Update store
    rateLimitStore.set(key, current);
    
    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', config.limit);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, config.limit - current.count));
    res.setHeader('X-RateLimit-Reset', Math.ceil(current.resetTime / 1000));
    
    // If rate limit exceeded, return 429 Too Many Requests
    if (current.count > config.limit) {
      return res.status(429).json({
        error: 'Too many requests, please try again later.',
        retryAfter: Math.ceil((current.resetTime - now) / 1000)
      });
    }
    
    // Continue to the next middleware or handler
    next();
  };
}

// Helper function to apply rate limiting to API handlers
export function withRateLimit(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void,
  config?: RateLimitConfig
) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise<void>((resolve) => {
      rateLimit(config)(req, res, () => {
        const result = handler(req, res);
        if (result instanceof Promise) {
          result.finally(() => resolve());
        } else {
          resolve();
        }
      });
    });
  };
}