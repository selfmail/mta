import Elysia from "elysia";

export const auth = new Elysia({
	prefix: "/users",
}).get("/", () => ({
	message: "Auth route",
}));
