import z from "zod";

const failEvents = {
	banIp: z.object({
		type: z.literal("banIp"),
		ip: z.string(),
		reason: z.string().optional(),
	}),
	banAddress: z.object({
		type: z.literal("banAddress"),
		address: z.string(),
		reason: z.string().optional(),
	}),
	banDomain: z.object({
		type: z.literal("banDomain"),
		domain: z.string(),
		reason: z.string().optional(),
	}),

	// Deny email but continue to allow retries
	softFail: z.object({
		type: z.literal("softFail"),
		message: z.string().optional(),
	}),

	quarantine: z.object({
		type: z.literal("quarantine"),
		minutes: z.number(),
		reason: z.string().optional(),
	}),
};

export const DataSchema = z.object({
	event: z.enum([
		"inbound-connection",
		"inbound-mail-from",
		"inbound-rcpt-to",
		"inbound-data",
		"inbound-queue",
		"outbound-connection",
		"outbound-mail-from",
		"outbound-rcpt-to",
		"outbound-data",
		"outbound-queue",
		"relay",
	]),
	data: z.array(
		z.object({
			id: z.string().min(8),
			type: z.string(),
			payload: z.record(z.string(), z.any()),
			proceedAtError: z.boolean().optional().default(false),
			fail: z.union(Object.values(failEvents)).optional(),
		}),
	),
});

export type DataSchemaTS = z.infer<typeof DataSchema>;
