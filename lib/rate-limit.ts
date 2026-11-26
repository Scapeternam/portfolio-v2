// Limite simple en mémoire. Sur Vercel, chaque instance a sa propre mémoire :
// c'est un frein contre le spam, pas une garantie.
export function createRateLimiter({
  windowMs,
  max,
}: {
  windowMs: number;
  max: number;
}): { isLimited: (key: string, now?: number) => boolean; reset: () => void } {
  const hits = new Map<string, { count: number; resetAt: number }>();

  function isLimited(key: string, now: number = Date.now()): boolean {
    if (hits.size > 1000) {
      for (const [k, entry] of hits) if (now > entry.resetAt) hits.delete(k);
    }
    const entry = hits.get(key);
    if (!entry || now > entry.resetAt) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return false;
    }
    entry.count += 1;
    return entry.count > max;
  }

  return { isLimited, reset: () => hits.clear() };
}
