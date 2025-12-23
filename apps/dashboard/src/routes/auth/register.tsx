import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import z from "zod";
import Button from "@/components/base/button";
import Input from "@/components/base/input";

export const Route = createFileRoute("/auth/register")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		try {
			// Client side validation of provided fields
			const {
				success,
				data,
				error: validationError,
			} = await z
				.object({
					name: z.string().min(1, "Name is required"),
					email: z.email("Invalid email address"),
					password: z.string().min(6, "Password must be at least 6 characters"),
					confirmPassword: z
						.string()
						.min(6, "Confirm Password must be at least 6 characters"),
				})
				.refine((data) => data.password === data.confirmPassword, {
					message: "Passwords do not match",
					path: ["confirmPassword"],
				})
				.safeParseAsync({
					name: (e.target as any).name.value,
					email: (e.target as any).email.value,
					password: (e.target as any).password.value,
					confirmPassword: (e.target as any).confirmPassword.value,
				});

			if (!success) {
				setError(z.prettifyError(validationError));
				return;
			}

			// Fetch the api
			const res = await fetch("http://localhost:8080/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: data.name,
					email: data.email,
					password: data.password,
				}),
			});

			if (!res.ok) {
				const errorData = await res
					.json()
					.catch(() => ({ message: "Registration failed" }));
				setError(errorData.message || "Registration failed. Please try again.");
				return;
			}

			// Redirect to login on success
			navigate({ to: "/auth/login" });
		} catch (err) {
			setError("An unexpected error occurred. Please try again.");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center">
			<div className="w-full max-w-md flex flex-col gap-4 px-4">
				<div className="flex flex-col gap-2 mb-4">
					<h1 className="text-3xl font-bold">Register</h1>
					<p className="text-neutral-400">Create a new account</p>
				</div>
				{error && (
					<div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
						{error}
					</div>
				)}
				<form onSubmit={onSubmit} className="flex flex-col gap-3">
					<Input
						placeholder="Name"
						name="name"
						type="text"
						required
						disabled={isLoading}
					/>
					<Input
						placeholder="Email"
						name="email"
						type="email"
						required
						disabled={isLoading}
					/>
					<Input
						placeholder="Password"
						name="password"
						type="password"
						required
						disabled={isLoading}
					/>
					<Input
						placeholder="Confirm Password"
						name="confirmPassword"
						type="password"
						required
						disabled={isLoading}
					/>
					<Button type="submit" variant="primary" disabled={isLoading}>
						{isLoading ? "Registering..." : "Register"}
					</Button>
				</form>
				<div className="text-center text-sm text-neutral-400 mt-2">
					Already have an account?{" "}
					<Link to="/auth/login" className="text-white hover:underline">
						Login
					</Link>
				</div>
			</div>
		</div>
	);
}
