import { createFileRoute, Link } from "@tanstack/react-router";
import Button from "@/components/base/button";
import Input from "@/components/base/input";

export const Route = createFileRoute("/auth/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center">
			<div className="w-full max-w-md flex flex-col gap-4 px-4">
				<div className="flex flex-col gap-2 mb-4">
					<h1 className="text-3xl font-bold">Login</h1>
					<p className="text-neutral-400">Sign in to your account</p>
				</div>
				<form className="flex flex-col gap-3">
					<Input placeholder="Email" type="email" required />
					<Input placeholder="Password" type="password" required />
					<Button type="submit" variant="primary">
						Login
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
