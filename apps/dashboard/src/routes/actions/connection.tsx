import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/actions/connection")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/actions/connection"!</div>;
}
