import z from "zod";

// biome-ignore lint: need that way
export abstract class DataSchema {
  static failEvents = {
    ban: z.object({
      type: z.literal("ban"),
      reason: z.string().optional(),
      items: z.array(z.string()).optional(),
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
  static schema = z.object({
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
    timestamp: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
      message: "Invalid timestamp format",
    }),
    data: z.array(
      z.object({
        id: z.string().min(8),
        type: z.string(),
        payload: z.record(z.string(), z.any()),
        proceedAtError: z.boolean().optional().default(false),
        fail: z.union(Object.values(DataSchema.failEvents)).optional(),
      })
    ),
  });

  static async parse(data: unknown) {
    return await DataSchema.schema.safeParseAsync(data);
  }
}

export type DataSchemaTS = z.infer<typeof DataSchema>;
