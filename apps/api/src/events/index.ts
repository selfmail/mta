import { DataSchema } from "@mta/schema";
import Elysia from "elysia";
import { EventService } from "./service";

export const events = new Elysia({
	prefix: "/events",
}).put(
	"/:event",
	async ({ params: { event }, body }) => {
		return await EventService.saveData(event, body);
	},
	{
		body: DataSchema.schema,
	},
);
