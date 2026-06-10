import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "./generated/prisma/client";

config({
	path: resolve(dirname(fileURLToPath(import.meta.url)), "../.env"),
});

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	throw new Error(
		"DATABASE_URL is not set. Create apps/api/.env, create packages/database/.env, or export DATABASE_URL before starting the API.",
	);
}

const adapter = new PrismaPg({
	connectionString,
});
const prisma = new PrismaClient({ adapter });

export { prisma };
