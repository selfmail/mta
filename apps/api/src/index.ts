import "dotenv/config";
import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import { auth } from "./auth";

const app = new Elysia()
	.onError((err) => {
		console.error("Unhandled Error:", err);
		return { error: "Unknown Error" };
	})
	.use(
		cors({
			origin: "http://localhost:3000",
			credentials: true,
		}),
	)
	.get("/", () => ({ hello: "Bun👋" }))
	.use(auth)
	.listen(8080);

console.log(`Listening on ${app.server?.url}`);
