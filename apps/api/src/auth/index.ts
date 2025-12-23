import Elysia, { t } from "elysia";
import { AuthService } from "./service";

export const auth = new Elysia({
	prefix: "/users",
})
	// List all users
	.get("/", async () => {
		return await AuthService.userList();
	})
	// Get session of user
	.get("/me", async ({ cookie: { sessionToken }, set }) => {
		try {
			if (!sessionToken?.value) {
				set.status = 401;
				return { error: "Not authenticated" };
			}

			const session = await AuthService.getSession(
				sessionToken.value as string,
			);

			if (!session) {
				set.status = 401;
				return { error: "Invalid session" };
			}

			return {
				user: {
					id: session.user.id,
					email: session.user.email,
					name: session.user.name,
				},
				sessionId: session.id,
			};
		} catch (error) {
			set.status = 401;
			return { error: "Session expired or invalid" };
		}
	})
	// Register a new user
	.post(
		"/",
		async ({ body }) => {
			return await AuthService.register(body.email, body.password, body.name);
		},
		{
			body: t.Object({
				email: t.String({
					format: "email",
				}),
				password: t.String({
					minLength: 6,
				}),
				name: t.String(),
			}),
		},
	)
	// Login
	.post(
		"/login",
		async ({ body, cookie: { sessionToken } }) => {
			const result = await AuthService.login(body.email, body.password);

			if (sessionToken) {
				sessionToken.value = result.sessionId;
				sessionToken.httpOnly = true;
				sessionToken.path = "/";
				sessionToken.maxAge = 60 * 60 * 24 * 7; // 7 days
			}

			return result;
		},
		{
			body: t.Object({
				email: t.String(),
				password: t.String(),
			}),
		},
	)
	// Get session
	.get(
		"/session/:sessionId",
		async ({ params }) => {
			return await AuthService.getSession(params.sessionId);
		},
		{
			params: t.Object({
				sessionId: t.String(),
			}),
		},
	)
	// Edit user
	.patch(
		"/:userId",
		async ({ params, body }) => {
			return await AuthService.editUser(
				params.userId,
				body.password,
				body.newName,
				body.newEmail,
				body.newPassword,
			);
		},
		{
			params: t.Object({
				userId: t.String(),
			}),
			body: t.Object({
				password: t.String(),
				newName: t.Optional(t.String()),
				newEmail: t.Optional(t.String()),
				newPassword: t.Optional(t.String()),
			}),
		},
	);
