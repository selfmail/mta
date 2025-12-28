import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="flex flex-col space-y-4">
			<h2 className="text-4xl font-medium">Welcome Back!</h2>
			<div className="grid grid-cols-4 gap-4">
				<a
					href="/services/inbound-smtp"
					className="bg-green-300 text-green-700 p-1 rounded-lg flex flex-col space-y-2"
				>
					<div className="bg-neutral-100 p-4 rounded-lg w-full h-full">
						<h2 className="text-xl font-medium">PostgreSQL</h2>
					</div>
					<div className="flex flex-col p-2">Running, 99% Uptime</div>
				</a>
				<div className="bg-blue-100 p-1 rounded-lg flex flex-col space-y-2">
					<div className="bg-neutral-100 rounded-lg w-full h-8"></div>
				</div>
				<div className="bg-blue-100 p-1 rounded-lg flex flex-col space-y-2">
					<div className="bg-neutral-100 rounded-lg w-full h-8"></div>
				</div>
				<div className="bg-blue-100 p-1 rounded-lg flex flex-col space-y-2">
					<div className="bg-neutral-100 rounded-lg w-full h-8"></div>
				</div>
			</div>
		</div>
	);
}
