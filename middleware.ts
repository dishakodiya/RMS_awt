
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    // Paths that don't require authentication
    const publicPaths = ['/login', '/api/auth/login', '/favicon.ico', '/public', '/_next'];

    const isPublicPath = publicPaths.some((path) =>
        request.nextUrl.pathname.startsWith(path)
    );

    if (isPublicPath) {
        // If user is already logged in and tries to access login page, redirect to home
        if (token && request.nextUrl.pathname === '/login') {
            try {
                const secret = new TextEncoder().encode(
                    process.env.JWT_SECRET || 'your-secret-key-change-this'
                );
                const { payload } = await jwtVerify(token, secret);
                
                if (payload.role === 'User') {
                    return NextResponse.redirect(new URL('/user-dashboard', request.url));
                }
                
                return NextResponse.redirect(new URL('/', request.url));
            } catch (error) {
                // Token invalid, allow access to login page
                return NextResponse.next();
            }
        }
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET || 'your-secret-key-change-this'
        );
        const { payload } = await jwtVerify(token, secret);
        
        // --- Role-based Route Protection ---
        const role = payload.role as string;
        const pathname = request.nextUrl.pathname;

        // If 'User' role, restrict them
        if (role === 'User') {
            const allowedUserRoutes = ['/user-dashboard', '/my-bookings', '/api', '/_next'];
            
            // Allow access to home / basic landing page if it exists, otherwise redirect to dashboard
            if (pathname === '/') {
                return NextResponse.redirect(new URL('/user-dashboard', request.url));
            }

            // Check if current path starts with any of the allowed routes
            const isAllowed = allowedUserRoutes.some(route => pathname.startsWith(route));

            // If a User tries to access an unallowed admin route, redirect them to user-dashboard
            if (!isAllowed) {
                return NextResponse.redirect(new URL('/user-dashboard', request.url));
            }
        }
        
        return NextResponse.next();
    } catch (error) {
        // Token invalid or expired
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('token');
        return response;
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
