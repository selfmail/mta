import { createFileRoute } from "@tanstack/react-router";
import { Globe, ShieldCheck } from "lucide-react";
import WorkflowEditor from "@/components/editor";
import ApiCallNode from "@/components/nodes/actions/api-call";
import EndNode from "@/components/nodes/end";
import WhitelistConnectionNode from "@/components/nodes/events/connection/whitelist-connection";
import BanNode from "@/components/nodes/fails/ban";
import StartNode from "@/components/nodes/start";

export const Route = createFileRoute("/inbound-actions/connection")({
  component: ConnectionEventEditor,
});

function ConnectionEventEditor() {
  return (
    <WorkflowEditor
      allowedNodes={[
        {
          type: "whitelist-connection",
          label: "Whitelist",
          icon: <ShieldCheck className="h-4 w-4" />,
          component: WhitelistConnectionNode,
        },
        {
          type: "ban",
          label: "Ban",
          component: BanNode,
        },
        {
          type: "api-call",
          label: "API Call",
          icon: <Globe className="h-4 w-4" />,
          component: ApiCallNode,
        },
      ]}
      endNode={{
        type: "connection-end",
        label: "Connection End",
        component: EndNode,
      }}
      event="inbound-connection"
      onSave={(nodes, edges) => {
        console.log("Saving workflow:", { nodes, edges });
        // Your save logic here
      }}
      startNode={{
        type: "connection-start",
        label: "Connection Start",
        component: StartNode,
      }}
    />
  );
}
