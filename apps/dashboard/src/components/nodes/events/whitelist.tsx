import { type NodeProps, NodeToolbar, Position } from "@xyflow/react";
import { CopyIcon, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFlowStore } from "@/components/editor/store";
import { cn } from "@/lib/utils";

interface WhitelistProps extends NodeProps {
	id: string;
}

export default function WhitelistNode({ id }: WhitelistProps) {
	const { selectNode, selectedNodeId, removeNode } = useFlowStore();
	const isSelected = selectedNodeId === id;

	const handleDelete = () => {
		removeNode(id);
		selectNode(null);
	};

	useEffect(() => {
		if (isSelected) {
			// Watch for delete keyboard input and esc to deselect
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
		// Deselect node when unmounting
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
					"bg-white  text-sm cursor-pointer rounded-lg border shadow-sm text-left transition-all",
					isSelected
						? "border-blue-500 shadow-[0_0_0_1px_rgba(59,130,246,0.3)]"
						: "border-(--border)",
				)}
			>
				<div className="p-2 rounded-t-lg flex font-medium flex-row">
					Whitelist
				</div>
				<div className="p-2 items-center text-neutral-600 rounded-b-lg border-t border-(--border) flex flex-row">
					Only allow specified{" "}
					<code className="rounded-sm ml-1 p-0.5 bg-neutral-100 border border-neutral-200">
						IP Addresses
					</code>
				</div>
			</button>
		</>
	);
}
