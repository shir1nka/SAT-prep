import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type RateLimitOptions = {
  bucket: string;
  windowMs: number;
  max: number;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const globalForSecurity = globalThis as unknown as {
  rateLimitBuckets?: Map<string, RateLimitBucket>;
};

const rateLimitBuckets =
  globalForSecurity.rateLimitBuckets ?? new Map<string, RateLimitBucket>();

if (!globalForSecurity.rateLimitBuckets) {
  globalForSecurity.rateLimitBuckets = rateLimitBuckets;
}

function pruneExpiredBuckets(now: number) {
  for (const [key, value] of rateLimitBuckets.entries()) {
    if (value.resetAt <= now) {
      rateLimitBuckets.delete(key);
    }
  }
}

export function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return req.headers.get("x-real-ip") || "unknown";
}

export function applySecurityHeaders(response: NextResponse) {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");

  return response;
}

export function jsonWithSecurityHeaders(body: unknown, status = 200) {
  return applySecurityHeaders(NextResponse.json(body, { status }));
}

function getExpectedOrigin(req: NextRequest) {
  const configuredOrigin =
    process.env.NEXTAUTH_URL ?? process.env.AUTH_URL ?? req.nextUrl.origin;

  try {
    return new URL(configuredOrigin).origin;
  } catch {
    return req.nextUrl.origin;
  }
}

export function ensureSameOrigin(req: NextRequest) {
  const method = req.method.toUpperCase();
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") {
    return null;
  }

  const expectedOrigin = getExpectedOrigin(req);
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  if (origin) {
    try {
      if (new URL(origin).origin === expectedOrigin) {
        return null;
      }
    } catch {
      return jsonWithSecurityHeaders({ error: "Invalid request origin." }, 403);
    }

    return jsonWithSecurityHeaders({ error: "Cross-site request blocked." }, 403);
  }

  if (referer && referer.startsWith(expectedOrigin)) {
    return null;
  }

  return jsonWithSecurityHeaders(
    { error: "Request origin could not be verified." },
    403
  );
}

export function enforceRateLimit(req: NextRequest, options: RateLimitOptions) {
  const now = Date.now();
  pruneExpiredBuckets(now);

  const ip = getClientIp(req);
  const bucketKey = `${options.bucket}:${ip}`;
  const current = rateLimitBuckets.get(bucketKey);

  if (!current || current.resetAt <= now) {
    rateLimitBuckets.set(bucketKey, {
      count: 1,
      resetAt: now + options.windowMs,
    });
    return null;
  }

  if (current.count >= options.max) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((current.resetAt - now) / 1000)
    );

    const response = jsonWithSecurityHeaders(
      { error: "Too many requests. Please try again later." },
      429
    );
    response.headers.set("Retry-After", String(retryAfterSeconds));
    return response;
  }

  current.count += 1;
  rateLimitBuckets.set(bucketKey, current);
  return null;
}
