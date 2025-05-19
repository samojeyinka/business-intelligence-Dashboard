import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  

  const isAuthenticated = request.cookies.has('user_token');
  
 
  const protectedRoutes = ['/dashboard'];
  

  const authRoutes = ['/auth/login', '/auth/register'];
  

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  

  const isAuthRoute = authRoutes.some(route => pathname === route);
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  

  if (pathname === '/') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }
  
  return NextResponse.next();
}


export const config = {
  matcher: ['/', '/dashboard/:path*', '/auth/:path*'],
};