import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/services/postgresql")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/services/postgresql"!</div>;
}
