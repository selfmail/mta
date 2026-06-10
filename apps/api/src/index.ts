import "dotenv/config";
import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import { auth } from "./auth";

const allowedOrigins = new Set([
	"http://localhost:3000",
	"http://127.0.0.1:3000",
]);

function isDatabaseConnectionError(error: unknown) {
	if (!(error instanceof Error)) {
		return false;
	}

	const code = "code" in error ? error.code : undefined;

	return (
		code === "ESERVFAIL" ||
		code === "ECONNREFUSED" ||
		code === "P1001" ||
		error.message.includes("Can't reach database server") ||
		error.message.includes("getaddrinfo")
	);
}

function getErrorMessage(error: unknown) {
	return error instanceof Error ? error.message : String(error);
}

const app = new Elysia()
	.onError(({ code, error, set }) => {
		if (code === "NOT_FOUND") {
			set.status = 404;
			return { error: "Not found" };
		}

		if (code === "VALIDATION") {
			set.status = 400;
			return { error: "Invalid request", details: error.message };
		}

		if (isDatabaseConnectionError(error)) {
			console.error("Database connection error:", getErrorMessage(error));
			set.status = 503;
			return {
				error: "Database unavailable",
				message: "Check DATABASE_URL and make sure the Postgres dev service is running.",
			};
		}

		console.error("Unhandled Error:", error);
		set.status = 500;
		return { error: "Unknown Error" };
	})
	.use(
		cors({
			origin: ({ headers }) => {
				const origin = headers.get("origin");
				return origin ? allowedOrigins.has(origin) : false;
			},
			credentials: true,
		}),
	)
	.get("/", () => ({ hello: "Bun" }))
	.get("/favicon.ico", ({ set }) => {
		set.status = 204;
		return "";
	})
	.use(auth)
	.listen(8080);

console.log(`Listening on ${app.server?.url}`);
