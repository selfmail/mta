import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import WorkflowEditor from "@/components/editor";
import EndNode from "@/components/nodes/end";
import WhitelistNode from "@/components/nodes/events/whitelist";
import StartNode from "@/components/nodes/start";

export const Route = createFileRoute("/inbound-actions/connection")({
	component: ConnectionEventEditor,
});

function ConnectionEventEditor() {
	return (
		<WorkflowEditor
			event="inbound-connection"
			allowedNodes={[
				{
					type: "whitelist",
					label: "Whitelist",
					icon: <ShieldCheck className="w-4 h-4" />,
					component: WhitelistNode,
				},
			]}
			startNode={{
				type: "connection-start",
				label: "Connection Start",
				component: StartNode,
			}}
			endNode={{
				type: "connection-end",
				label: "Connection End",
				component: EndNode,
			}}
			onSave={(nodes, edges) => {
				console.log("Saving workflow:", { nodes, edges });
				// Your save logic here
			}}
		/>
	);
}
