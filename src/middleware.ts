import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add comprehensive security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');
  
  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'"
  );
  
  // Strict Transport Security (HSTS)
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );
  
  // Basic CSRF protection
  const requestMethod = request.method;
  const requestPath = request.nextUrl.pathname;
  
  // Only apply CSRF protection to mutation endpoints
  if (
    requestMethod !== 'GET' && 
    requestMethod !== 'HEAD' && 
    requestPath.startsWith('/api/')
  ) {
    const referer = request.headers.get('referer');
    const origin = request.headers.get('origin');
    const csrfToken = request.headers.get('x-csrf-token');
    
    // Check if the request has a valid CSRF token or is coming from our own site
    if (!csrfToken && !referer && !origin) {
      return new NextResponse(
        JSON.stringify({ error: 'CSRF validation failed' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Check if the origin matches our domain
    if (origin) {
      const allowedOrigins = [
        'localhost', 
        'co.dev',
        process.env.NEXT_PUBLIC_SITE_URL || ''
      ];
      
      const isAllowedOrigin = allowedOrigins.some(allowed => 
        origin.includes(allowed)
      );
      
      if (!isAllowedOrigin) {
        return new NextResponse(
          JSON.stringify({ error: 'CSRF validation failed: invalid origin' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
  }
  
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Apply to all API routes
    '/api/:path*',
    // Skip static files and images
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};