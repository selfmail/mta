// Basic layout to simplify the other menu components
import { ArrowLeft } from "lucide-react";
import Button from "@/components/base/button";
import { useFlowStore } from "../store";
import { nodeTypes } from ".";

interface MenuLayoutProps {
	children: React.ReactNode;
}

export function MenuLayout({ children }: MenuLayoutProps) {
	const { selectNode, getSelectedNode } = useFlowStore();
	const selectedNode = getSelectedNode();
	const title =
		nodeTypes.find((n) => n.type === selectedNode?.type)?.name || "Menu";
	return (
		<div className="flex flex-col h-full">
			<div className="flex items-center gap-2 p-2">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => selectNode(null)}
					className="h-8 w-8"
				>
					<ArrowLeft className="h-4 w-4" />
				</Button>
				<h2 className="text-lg font-semibold">{title}</h2>
			</div>
			<div className="flex-1 overflow-auto p-2">{children}</div>
		</div>
	);
}
