/**
 * Next.js Middleware for Security
 *
 * Handles rate limiting for sensitive endpoints.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * In-memory rate limit store
 * In production, consider using Redis for distributed rate limiting
 */
const rateLimits = new Map<string, { count: number; resetAt: number }>();

/**
 * Clean up expired entries periodically to prevent memory leaks
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();
  const keysToDelete: string[] = [];
  rateLimits.forEach((entry, key) => {
    if (entry.resetAt < now) {
      keysToDelete.push(key);
    }
  });
  keysToDelete.forEach(key => rateLimits.delete(key));
}

// Run cleanup every 5 minutes
setInterval(cleanupExpiredEntries, 5 * 60 * 1000);

/**
 * Get client IP address from request headers
 *
 * Uses multiple trusted sources in order of preference:
 * 1. cf-connecting-ip (Cloudflare - most trusted)
 * 2. x-real-ip (Nginx proxy)
 * 3. x-forwarded-for (standard proxy header - take rightmost trusted IP)
 * 4. Falls back to 'unknown' if no IP found
 *
 * Note: For x-forwarded-for, the rightmost IP is typically the most trusted
 * as it's added by the closest trusted proxy. The leftmost can be spoofed.
 */
function getClientIp(request: NextRequest): string {
  // Cloudflare header - most trusted if using Cloudflare
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }

  // Nginx real IP header
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  // X-Forwarded-For: client, proxy1, proxy2
  // In trusted proxy setups, use the rightmost non-private IP
  // For single trusted proxy, the first IP is the client
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map(ip => ip.trim());
    // Use the first IP (client IP as seen by the first proxy)
    // This is standard behavior for single-proxy deployments
    if (ips.length > 0 && ips[0]) {
      return ips[0];
    }
  }

  return 'unknown';
}

/**
 * Get rate limit key from request
 */
function getRateLimitKey(request: NextRequest, path: string): string {
  const ip = getClientIp(request);
  return `${ip}:${path}`;
}

/**
 * Check if request is rate limited
 */
function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimits.get(key);

  if (!entry || entry.resetAt < now) {
    rateLimits.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count++;
  return entry.count > limit;
}

/**
 * Get remaining requests for rate limit
 */
function getRemainingRequests(key: string, limit: number): number {
  const entry = rateLimits.get(key);
  if (!entry || entry.resetAt < Date.now()) {
    return limit;
  }
  return Math.max(0, limit - entry.count);
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Rate limit login attempts - 5 per minute per IP
  if (path === '/api/admin/login' && request.method === 'POST') {
    const key = getRateLimitKey(request, 'login');
    const limit = 5;
    const windowMs = 60 * 1000; // 1 minute

    if (isRateLimited(key, limit, windowMs)) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': '0',
          }
        }
      );
    }

    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', String(limit));
    response.headers.set('X-RateLimit-Remaining', String(getRemainingRequests(key, limit)));
    return response;
  }

  // Rate limit cron endpoints - 10 per minute per IP
  if (path.startsWith('/api/cron/') && request.method === 'POST') {
    const key = getRateLimitKey(request, 'cron');
    const limit = 10;
    const windowMs = 60 * 1000; // 1 minute

    if (isRateLimited(key, limit, windowMs)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
          }
        }
      );
    }
  }

  // Rate limit admin API endpoints - 30 per minute per IP
  if (path.startsWith('/api/admin/') && path !== '/api/admin/login') {
    const key = getRateLimitKey(request, 'admin');
    const limit = 30;
    const windowMs = 60 * 1000; // 1 minute

    if (isRateLimited(key, limit, windowMs)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/admin/:path*',
    '/api/cron/:path*',
  ],
};
