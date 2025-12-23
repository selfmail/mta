import { prisma } from "@mta/database";

// biome-ignore lint/complexity/noStaticOnlyClass: disable
export class AuthService {
	static async register(email: string, password: string, name: string) {
		console.log("Register User");
		// Check whether the user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			throw new Error("User already exists");
		}

		// Hash the password
		const hashedPassword = await Bun.password.hash(password, {
			algorithm: "argon2id",
			memoryCost: 19456, // 19 MiB
			timeCost: 2,
		});

		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
			},
		});

		return {
			id: user.id,
			email: user.email,
			name: user.name,
		};
	}

	static async userList() {
		return await prisma.user.findMany({
			select: {
				id: true,
				email: true,
				name: true,
			},
		});
	}

	static async login(email: string, password: string) {
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			throw new Error("User not found");
		}

		const isPasswordValid = await Bun.password.verify(user.password, password);

		if (!isPasswordValid) {
			throw new Error("Invalid password");
		}

		// Create session
		const session = await prisma.session.create({
			data: {
				userId: user.id,
				expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
			},
		});

		if (!session) {
			throw new Error("Failed to create session");
		}

		return {
			sessionId: session.id,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
			},
		};
	}

	static async getSession(sessionId: string) {
		const session = await prisma.session.findUnique({
			where: { id: sessionId },
			include: { user: true },
		});

		if (!session) {
			throw new Error("Session not found");
		}

		// Check if session is expired
		if (session.expiresAt < new Date()) {
			throw new Error("Session expired");
		}

		return session;
	}

	static async editUser(
		userId: string,
		password: string,

		// new items
		newName?: string,
		newEmail?: string,
		newPassword?: string,
	) {
		// Verify current password
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			throw new Error("User not found");
		}

		const isPasswordValid = await Bun.password.verify(user.password, password);

		if (!isPasswordValid) {
			throw new Error("Invalid password");
		}

		// Update user details
		return await prisma.user.update({
			where: { id: userId },
			data: {
				name: newName,
				email: newEmail,
				password: newPassword
					? await Bun.password.hash(newPassword, {
							algorithm: "argon2id",
							memoryCost: 19456, // 19 MiB
							timeCost: 2,
						})
					: undefined,
			},
			select: {
				id: true,
				email: true,
				name: true,
			},
		});
	}
}
