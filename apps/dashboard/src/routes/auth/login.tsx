import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import z from "zod";
import Button from "@/components/base/button";
import Input from "@/components/base/input";

export const Route = createFileRoute("/auth/login")({
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
			// Client side validation
			const {
				success,
				data,
				error: validationError,
			} = await z
				.object({
					email: z.email("Invalid email address"),
					password: z.string().min(1, "Password is required"),
				})
				.safeParseAsync({
					email: (e.target as any).email.value,
					password: (e.target as any).password.value,
				});

			if (!success) {
				setError(z.prettifyError(validationError));
				return;
			}

			// Call login API
			const res = await fetch("http://localhost:8080/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					email: data.email,
					password: data.password,
				}),
			});

			if (!res.ok) {
				const errorData = await res
					.json()
					.catch(() => ({ message: "Login failed" }));
				setError(errorData.message || "Invalid email or password");
				return;
			}

			// Redirect to home on success
			navigate({ to: "/" });
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
					<h1 className="text-3xl font-bold">Login</h1>
					<p className="text-neutral-400">Sign in to your account</p>
				</div>
				{error && (
					<div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
						{error}
					</div>
				)}
				<form onSubmit={onSubmit} className="flex flex-col gap-3">
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
					<Button type="submit" variant="primary" disabled={isLoading}>
						{isLoading ? "Logging in..." : "Login"}
					</Button>
				</form>
				<div className="text-center text-sm text-neutral-400 mt-2">
					Don't have an account?{" "}
					<Link to="/auth/register" className="text-white hover:underline">
						Register
					</Link>
				</div>
			</div>
		</div>
	);
}
