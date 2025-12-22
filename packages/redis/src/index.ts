import { RedisClient } from "bun";

// biome-ignore lint: need static classes
export abstract class Redis {
	static redis = new RedisClient("redis://localhost:6379");

	static async rateLimit({
		ip,
		namespace = "default",
		limit = 100,
		windowSecs = 3600,
	}: {
		ip: string;
		namespace?: string;
		limit?: number;
		windowSecs?: number;
	}) {
		const key = `ratelimit-${namespace}:${ip}`;

		// Increment counter
		const count = await Redis.redis.incr(key);

		// Set expiry if this is the first request in window
		if (count === 1) {
			await Redis.redis.expire(key, windowSecs);
		}

		// Check if limit exceeded
		return {
			limited: count > limit,
			remaining: Math.max(0, limit - count),
		};
	}
}
