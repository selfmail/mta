import { prisma } from "@mta/database";
import type { DataSchemaTS } from "@mta/schema";
// biome-ignore lint: need this class as it is
export abstract class EventService {
	static async saveData(event: string, data: DataSchemaTS) {
		// Save event data to the database
	}
	static async saveUi(event: string, ui: unknown) {}
}
