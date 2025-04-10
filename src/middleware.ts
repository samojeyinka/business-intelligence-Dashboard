import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
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
    
    // Check if the request is coming from our own site
    // This is a basic check and should be enhanced with proper CSRF tokens
    if (!referer && !origin) {
      return new NextResponse(
        JSON.stringify({ error: 'CSRF validation failed' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Check if the origin matches our domain
    // In production, you would check against your actual domain
    if (origin && !origin.includes('localhost') && !origin.includes('co.dev')) {
      return new NextResponse(
        JSON.stringify({ error: 'CSRF validation failed' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
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