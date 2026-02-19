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

interface UpstashPipelineItem {
  result?: unknown
  error?: string
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

function checkRateLimitInMemory({ key, limit, windowMs }: CheckRateLimitInput): RateLimitResult {
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

function getUpstashConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim()
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim()

  if (!url || !token) {
    return null
  }

  return {
    url: url.replace(/\/$/, ""),
    token,
  }
}

async function checkRateLimitWithUpstash({
  key,
  limit,
  windowMs,
}: CheckRateLimitInput): Promise<RateLimitResult> {
  const config = getUpstashConfig()

  if (!config) {
    throw new Error("Upstash rate limit config is missing")
  }

  const redisKey = `recobra:ratelimit:${key}`
  const response = await fetch(`${config.url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", redisKey],
      ["PEXPIRE", redisKey, String(windowMs), "NX"],
      ["PTTL", redisKey],
    ]),
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Upstash rate limit request failed with ${response.status}`)
  }

  const payload = (await response.json()) as UpstashPipelineItem[]
  const currentCount = Number(payload?.[0]?.result)
  const ttlMs = Number(payload?.[2]?.result)

  if (!Number.isFinite(currentCount) || currentCount <= 0) {
    throw new Error("Invalid Upstash rate limit counter response")
  }

  const retryAfterSeconds =
    Number.isFinite(ttlMs) && ttlMs > 0
      ? Math.ceil(ttlMs / 1000)
      : Math.ceil(windowMs / 1000)

  return {
    allowed: currentCount <= limit,
    remaining: Math.max(0, limit - currentCount),
    retryAfterSeconds: Math.max(1, retryAfterSeconds),
  }
}

export async function checkRateLimit(input: CheckRateLimitInput): Promise<RateLimitResult> {
  const upstashConfig = getUpstashConfig()

  if (upstashConfig) {
    try {
      return await checkRateLimitWithUpstash(input)
    } catch {
      return checkRateLimitInMemory(input)
    }
  }

  return checkRateLimitInMemory(input)
}
