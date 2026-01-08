import { useReactFlow } from "@xyflow/react";
import { Trash2 } from "lucide-react";
import { useFlowStore } from "./store";

export default function NodeActionsMenu() {
  const { selectedNodeId, removeNode, selectNode } = useFlowStore();
  const { getNode } = useReactFlow();

  if (!selectedNodeId) {
    return null;
  }

  const selectedNode = getNode(selectedNodeId);
  if (!selectedNode) {
    return null;
  }

  const isStartOrEnd =
    selectedNode.type === "start-node" || selectedNode.type === "end-node";

  const handleDelete = () => {
    if (selectedNodeId && !isStartOrEnd) {
      removeNode(selectedNodeId);
      selectNode(null);
    }
  };

  // Calculate position above the node
  const nodeWidth = selectedNode.measured?.width || 200;
  const xPos = selectedNode.position.x + nodeWidth / 2;
  const yPos = selectedNode.position.y - 50; // 50px above the node

  return (
    <div
      className="pointer-events-auto absolute flex items-center gap-1 rounded-lg border border-neutral-200 bg-white p-1 shadow-lg"
      style={{
        left: `${xPos}px`,
        top: `${yPos}px`,
        transform: "translateX(-50%)",
        zIndex: 1000,
      }}
    >
      <button
        className="rounded p-2 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isStartOrEnd}
        onClick={handleDelete}
        title={isStartOrEnd ? "Cannot delete start/end nodes" : "Delete node"}
        type="button"
      >
        <Trash2 className="h-5 w-5 text-neutral-600" />
      </button>
    </div>
  );
}
