import { Handle, Position, type NodeProps, NodeToolbar } from "@xyflow/react";
import { CopyIcon, Globe, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFlowStore } from "@/components/editor/store";
import { cn } from "@/lib/utils";

interface ApiCallNodeProps extends NodeProps {
	id: string;
}

export default function ApiCallNode({ id }: ApiCallNodeProps) {
	const { selectNode, selectedNodeId, removeNode } = useFlowStore();
	const isSelected = selectedNodeId === id;

	const handleDelete = () => {
		removeNode(id);
		selectNode(null);
	};

	useEffect(() => {
		if (isSelected) {
			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.key === "Delete" || e.key === "Backspace") {
					handleDelete();
				} else if (e.key === "Escape") {
					selectNode(null);
				}
			};
			window.addEventListener("keydown", handleKeyDown);
			return () => {
				window.removeEventListener("keydown", handleKeyDown);
			};
		}
		return () => {
			if (selectedNodeId === id) {
				selectNode(null);
			}
		};
	}, [isSelected, id, selectNode, removeNode]);

	return (
		<>
			<NodeToolbar
				isVisible={isSelected}
				position={Position.Top}
				align="start"
			>
				<div className="flex bg-white flex-row space-x-2 p-1 rounded-md border border-(--border)">
					<button
						type="button"
						className="hover:bg-neutral-100 transition-colors rounded-sm p-2"
						onClick={handleDelete}
					>
						<Trash2 className="w-4 h-4 text-neutral-600" />
					</button>
					<button
						type="button"
						className="hover:bg-neutral-100 transition-colors rounded-sm p-2"
						onClick={handleDelete}
					>
						<CopyIcon className="w-4 h-4 text-neutral-600" />
					</button>
				</div>
			</NodeToolbar>
			{/* Target handle on top - receives input */}
			<Handle
				type="target"
				position={Position.Top}
				className="w-3 h-3 bg-blue-500"
			/>
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					selectNode(id);
				}}
				className={cn(
					"bg-white text-sm cursor-pointer rounded-lg border shadow-sm text-left transition-all",
					isSelected
						? "border-blue-500 shadow-[0_0_0_1px_rgba(59,130,246,0.3)]"
						: "border-(--border)",
				)}
			>
				<div className="p-2 rounded-t-lg flex font-medium flex-row items-center gap-2 bg-blue-50 text-blue-700 border-b border-blue-100">
					<Globe className="w-4 h-4" />
					<span>API Call</span>
				</div>
				<div className="p-2 items-center text-neutral-600 rounded-b-lg border-t border-blue-100 flex flex-row gap-2">
					<span>Make external request</span>
				</div>
			</button>
			{/* Source handle on bottom - passes output */}
			<Handle
				type="source"
				position={Position.Bottom}
				className="w-3 h-3 bg-blue-500"
			/>
		</>
	);
}
