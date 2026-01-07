import { type NodeProps, NodeToolbar, Position } from "@xyflow/react";
import { CopyIcon, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFlowStore } from "@/components/editor/store";
import { cn } from "@/lib/utils";

interface BlockProps extends NodeProps {
	id: string;
}

export default function BlockNode({ id }: BlockProps) {
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
	});

	return (
		<>
			<NodeToolbar isVisible={isSelected} position={Position.Top} align="start">
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
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					selectNode(id);
				}}
				className={cn(
					"bg-white text-sm cursor-pointer rounded-lg border shadow-sm text-left transition-all",
					isSelected
						? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.3)]"
						: "border-(--border)",
				)}
			>
				<div className="p-2 rounded-t-lg flex font-medium flex-row bg-red-50 text-red-700 border-b border-red-100">
					Block
				</div>
				<div className="p-2 items-center text-neutral-600 rounded-b-lg border-t border-(--border) flex flex-row">
					Block incoming traffic
				</div>
			</button>
		</>
	);
}
