import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div>
			<h1 className="text-2xl font-medium">Welcome to Selfmail MTA</h1>
			<p className="text-gray-400 mt-4">
				Select a page from the sidebar to get started.
			</p>
		</div>
	);
}
