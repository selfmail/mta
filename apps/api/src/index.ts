import { Elysia } from "elysia";
import { auth } from "./auth";

const app = new Elysia()
	.get("/", () => ({ hello: "Bun👋" }))
	.use(auth)
	.listen(8080);

console.log(`Listening on ${app.server!.url}`);
