import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only redirect users hitting the absolute root to localized pricing pages.
    if (pathname === '/') {
        // Vercel automatically populates 'x-vercel-ip-country'
        // Localhost will fall back to 'US' if not testing specifically
        const country = request.geo?.country || request.headers.get('x-vercel-ip-country') || 'US';

        if (country === 'IN') {
            request.nextUrl.pathname = '/in';
            return NextResponse.redirect(request.nextUrl);
        }

        if (country === 'ID') {
            request.nextUrl.pathname = '/id';
            return NextResponse.redirect(request.nextUrl);
        }

        // Rest of the world (including US) stays on '/'
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Apply middleware only on the root page, to keep it lightweight!
        '/'
    ],
};
