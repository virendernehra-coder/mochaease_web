import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    // Vercel automatically provides geo headers on edge/serverless
    // x-vercel-ip-country is the ISO 3166-1 alpha-2 country code
    const country =
        request.headers.get('x-vercel-ip-country') ||
        request.headers.get('cf-ipcountry') || // Cloudflare fallback
        'US';

    // Map to our supported currency codes
    const code = country.toUpperCase();
    let currency: string;

    if (code === 'IN') {
        currency = 'in'; // India → INR
    } else if (code === 'ID') {
        currency = 'id'; // Indonesia → IDR
    } else {
        currency = 'us'; // Everyone else → USD
    }

    return NextResponse.json({ country: code, currency });
}
