import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Ban as BanIcon, CircleSlash } from "lucide-react";
import { useEffect } from "react";
import { useFlowStore } from "@/components/editor/store";
import { cn } from "@/lib/utils";

interface BanNodeProps extends NodeProps {
	id: string;
}

export default function BanNode({ id }: BanNodeProps) {
	const { selectNode, selectedNodeId } = useFlowStore();
	const isSelected = selectedNodeId === id;

	useEffect(() => {
		if (isSelected) {
			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.key === "Escape") {
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
	}, [isSelected, id, selectNode]);

	return (
		<>
			{/* Target handle on top only - flow stops after ban */}
			<Handle
				type="target"
				position={Position.Top}
				className="w-3 h-3 bg-red-500"
			/>
			<div
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						selectNode(id);
					}
				}}
				onClick={(e) => {
					e.stopPropagation();
					selectNode(id);
				}}
				className={cn(
					"bg-white text-sm cursor-pointer rounded-lg border shadow-sm text-left transition-all w-40",
					isSelected
						? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.3)]"
						: "border-red-200",
				)}
			>
				<div className="p-2 rounded-t-lg flex font-medium flex-row items-center gap-2 bg-red-50 text-red-700 border-b border-red-100">
					<CircleSlash className="w-4 h-4" />
					<span>Banned</span>
				</div>
				<div className="p-2 items-center text-neutral-600 rounded-b-lg border-t border-red-100 flex flex-row gap-2">
					<BanIcon className="w-4 h-4 text-red-400" />
					<span>Stop connection</span>
				</div>
			</div>
		</>
	);
}
