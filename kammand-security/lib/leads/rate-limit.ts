import { contactLimits } from "./config";

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds?: number;
  productionFallback: boolean;
};

const developmentBuckets = new Map<string, RateLimitRecord>();

export function checkContactRateLimit(key: string, now = Date.now()): RateLimitResult {
  const provider = process.env.CONTACT_RATE_LIMIT_PROVIDER;
  const productionFallback =
    process.env.NODE_ENV === "production" && (!provider || provider === "development");
  const bucket = developmentBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    developmentBuckets.set(key, {
      count: 1,
      resetAt: now + contactLimits.rateLimitWindowMs,
    });

    return { allowed: true, productionFallback };
  }

  if (bucket.count >= contactLimits.rateLimitMax) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
      productionFallback,
    };
  }

  bucket.count += 1;
  developmentBuckets.set(key, bucket);

  return { allowed: true, productionFallback };
}

export function resetContactRateLimit() {
  developmentBuckets.clear();
}
