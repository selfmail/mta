import Elysia, { t } from "elysia";
import { AuthService } from "./service";

export const auth = new Elysia({
	prefix: "/users",
})
	.get("/", () => ({
		message: "Auth route",
	}))
	.post(
		"/",
		async ({ body }) => {
			return await AuthService.register(body.email, body.password, body.name);
		},
		{
			body: t.Object({
				email: t.String(),
				password: t.String(),
				name: t.String(),
			}),
		},
	);
