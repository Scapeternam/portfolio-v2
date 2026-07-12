import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

interface RateLimitConfig {
  windowMs: number;
  max: number;
}

const RULES: Record<string, RateLimitConfig> = {
  "/admin": { windowMs: 15 * 60 * 1000, max: 10 },
  "/api": { windowMs: 1 * 60 * 1000, max: 60 },
};

function getRateLimitInfo(path: string): RateLimitConfig | null {
  for (const [prefix, config] of Object.entries(RULES)) {
    if (path.startsWith(prefix)) return config;
  }
  return null;
}

export function proxy(request: NextRequest): NextResponse {
  const response = NextResponse.next();

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const path = request.nextUrl.pathname;
  const config = getRateLimitInfo(path);

  if (!config) return response;

  const key = `${ip}:${path}`;
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + config.windowMs });
    return response;
  }

  if (entry.count >= config.max) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return NextResponse.json(
      { error: "Trop de requêtes, réessayez plus tard." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(config.max),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(entry.resetAt / 1000)),
        },
      },
    );
  }

  entry.count++;
  response.headers.set("X-RateLimit-Limit", String(config.max));
  response.headers.set("X-RateLimit-Remaining", String(config.max - entry.count));
  response.headers.set("X-RateLimit-Reset", String(Math.ceil(entry.resetAt / 1000)));

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
