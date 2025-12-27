import { cn } from "@/lib/utils";

interface EditorMenuProps {
	allowedNodes: Array<{
		type: string;
		label: string;
		icon?: React.ReactNode;
		component: React.ComponentType<any>;
	}>;
}

export default function EditorMenu({ allowedNodes }: EditorMenuProps) {
	const onDragStart = (
		event: React.DragEvent,
		nodeType: string,
		nodeLabel: string,
	) => {
		event.dataTransfer.setData("application/reactflow", nodeType);
		event.dataTransfer.setData("application/reactflow-label", nodeLabel);
		event.dataTransfer.effectAllowed = "move";
	};

	return (
		<aside className="w-64 border-r border-neutral-200 bg-white p-4 overflow-y-auto">
			<h3 className="text-sm font-semibold text-neutral-900 mb-4">
				Available Nodes
			</h3>

			<div className="space-y-2">
				{allowedNodes.map((node) => (
					<button
						type="button"
						key={node.type}
						draggable
						onDragStart={(e) => onDragStart(e, node.type, node.label)}
						className={cn(
							"flex items-center gap-3 p-3 rounded-lg border border-neutral-200",
							"bg-white hover:bg-neutral-50 cursor-grab active:cursor-grabbing",
							"transition-colors duration-150",
						)}
					>
						{node.icon && (
							<div className="shrink-0 w-8 h-8 rounded bg-neutral-100 flex items-center justify-center">
								{node.icon}
							</div>
						)}
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-neutral-900 truncate">
								{node.label}
							</p>
						</div>
					</button>
				))}
			</div>

			<div className="mt-6 pt-6 border-t border-neutral-200">
				<p className="text-xs text-neutral-500">
					Drag nodes onto the canvas to build your workflow
				</p>
			</div>
		</aside>
	);
}
