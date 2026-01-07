import { createFileRoute } from "@tanstack/react-router";
import { Globe, ShieldCheck } from "lucide-react";
import WorkflowEditor from "@/components/editor";
import ApiCallNode from "@/components/nodes/actions/api-call";
import EndNode from "@/components/nodes/end";
import WhitelistNode from "@/components/nodes/events/whitelist";
import BanNode from "@/components/nodes/fails/ban";
import StartNode from "@/components/nodes/start";

export const Route = createFileRoute("/outbound-actions/connection")({
	component: ConnectionEventEditor,
});

function ConnectionEventEditor() {
	return (
		<WorkflowEditor
			event="outbound-connection"
			allowedNodes={[
				{
					type: "whitelist",
					label: "Whitelist",
					icon: <ShieldCheck className="w-4 h-4" />,
					component: WhitelistNode,
				},
				{
					type: "ban",
					label: "Ban",
					component: BanNode,
				},
				{
					type: "api-call",
					label: "API Call",
					icon: <Globe className="w-4 h-4" />,
					component: ApiCallNode,
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
