import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from '@firebase/auth';

export async function middleware(request: NextRequest) {
  const auth = getAuth();
  const user = auth.currentUser;

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/signup', '/reset-password'];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  if (!user && !isPublicPath) {
    // Redirect to login if not authenticated and trying to access protected route
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (user && isPublicPath) {
    // Redirect to dashboard if authenticated and trying to access public route
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 