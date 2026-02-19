interface RateLimitBucket {
  count: number
  resetAt: number
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  retryAfterSeconds: number
}

interface CheckRateLimitInput {
  key: string
  limit: number
  windowMs: number
}

declare global {
  // eslint-disable-next-line no-var
  var __recobraRateLimitBuckets: Map<string, RateLimitBucket> | undefined
}

function getBuckets(): Map<string, RateLimitBucket> {
  if (!globalThis.__recobraRateLimitBuckets) {
    globalThis.__recobraRateLimitBuckets = new Map<string, RateLimitBucket>()
  }

  return globalThis.__recobraRateLimitBuckets
}

function cleanupExpiredBuckets(buckets: Map<string, RateLimitBucket>, now: number): void {
  if (buckets.size < 10_000) {
    return
  }

  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(key)
    }
  }
}

export function getClientIp(request: Request): string {
  const xForwardedFor = request.headers.get("x-forwarded-for")
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(",")[0]?.trim()
    if (firstIp) {
      return firstIp
    }
  }

  const xRealIp = request.headers.get("x-real-ip")
  if (xRealIp?.trim()) {
    return xRealIp.trim()
  }

  const cfConnectingIp = request.headers.get("cf-connecting-ip")
  if (cfConnectingIp?.trim()) {
    return cfConnectingIp.trim()
  }

  return "unknown"
}

export function checkRateLimit({ key, limit, windowMs }: CheckRateLimitInput): RateLimitResult {
  const now = Date.now()
  const buckets = getBuckets()

  cleanupExpiredBuckets(buckets, now)

  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, {
      count: 1,
      resetAt: now + windowMs,
    })

    return {
      allowed: true,
      remaining: Math.max(0, limit - 1),
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    }
  }

  bucket.count += 1
  buckets.set(key, bucket)

  const allowed = bucket.count <= limit

  return {
    allowed,
    remaining: Math.max(0, limit - bucket.count),
    retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
  }
}
