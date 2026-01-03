import { useReactFlow } from "@xyflow/react";
import { Trash2 } from "lucide-react";
import { useFlowStore } from "./store";

export default function NodeActionsMenu() {
	const { selectedNodeId, removeNode, selectNode, nodes } = useFlowStore();
	const { getNode } = useReactFlow();

	if (!selectedNodeId) return null;

	const selectedNode = getNode(selectedNodeId);
	if (!selectedNode) return null;

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
			className="absolute bg-white border border-neutral-200 rounded-lg shadow-lg p-1 flex items-center gap-1 pointer-events-auto"
			style={{
				left: `${xPos}px`,
				top: `${yPos}px`,
				transform: "translateX(-50%)",
				zIndex: 1000,
			}}
		>
			<button
				type="button"
				onClick={handleDelete}
				disabled={isStartOrEnd}
				className="p-2 hover:bg-neutral-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				title={isStartOrEnd ? "Cannot delete start/end nodes" : "Delete node"}
			>
				<Trash2 className="w-5 h-5 text-neutral-600" />
			</button>
		</div>
	);
}
