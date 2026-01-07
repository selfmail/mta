import { $ } from "bun";
import { z } from "zod";

// Get the first argument
const arg = process.argv[2];

// Define the schema for a number
const parse = await z.number().safeParseAsync(arg ? Number(arg) : NaN);

if (!parse.success) {
	console.error("Invalid number provided.");
	process.exit(1);
}

const number = parse.data;

const prompt = await Bun.file(
	process.cwd() + "/scripts/ralph/prompt.md",
).text();

for (let i = 1; i <= number; i++) {
	console.log(`Iteration ${i}...`);
	const iteration = await $`claude ${prompt} --dangerously-skip-permissions`;
	console.log(`Output of iteration ${i}: ${iteration.text()}`);
}
