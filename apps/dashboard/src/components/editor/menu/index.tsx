import WhitelistMenuPreview from "../menu-previews/whitelist";
import BlockMenuPreview from "../menu-previews/block";
import { useFlowStore } from "../store";
import { useNodeDnD } from "../useNodeDnD";
import WhitelistMenu from "./whitelist-menu";

type MenuNode = {
	type: string;
	name: string;
	preview: React.ComponentType;
};

export const nodeTypes: MenuNode[] = [
	{
		type: "whitelist",
		name: "Whitelist",
		preview: WhitelistMenuPreview,
	},
	{
		type: "block",
		name: "Block",
		preview: BlockMenuPreview,
	},
];

const settingMenus: Record<string, React.ComponentType> = {
	whitelist: WhitelistMenu,
};

export default function RightSideMenu() {
	const { startDrag, drag, endDrag } = useNodeDnD();
	const { getSelectedNode } = useFlowStore();

	// Get the selected node to determine its type
	const selectedNode = getSelectedNode();
	const selectedNodeType = selectedNode?.type;

	// Get the settings menu component for the selected node type
	const SettingsMenuComponent = selectedNodeType
		? settingMenus[selectedNodeType]
		: null;

	const handlePointerUp = (e: React.PointerEvent) => {
		// Stop propagation to prevent canvas from receiving the event
		e.stopPropagation();
		if (drag) {
			endDrag();
		}
	};

	// If a node is selected and has a settings menu, show it
	if (SettingsMenuComponent) {
		return (
			<div
				className="w-2/8 h-full rounded-lg absolute bg-(--background) right-0 top-0 bottom-0"
				onPointerUp={handlePointerUp}
			>
				<SettingsMenuComponent />
			</div>
		);
	}

	return (
		<div
			className="w-2/8 h-full p-4 flex flex-col space-y-4 rounded-lg absolute bg-(--background) right-0 top-0 bottom-0"
			onPointerUp={handlePointerUp}
		>
			<h2 className="text-lg font-medium">Add Nodes to your Action</h2>
			<div className="grid grid-cols-2 gap-4">
				{nodeTypes.map((node) => {
					const PreviewComponent = node.preview;
					return (
						<div key={node.type} className="flex flex-col space-y-2">
							<button
								type="button"
								className="p-2 border border-(--border) rounded-lg cursor-grab bg-(--card-background) select-none transition-transform active:scale-95 hover:shadow-sm"
								onPointerDown={(e) => startDrag(e, node.type, node.name)}
								style={{
									opacity: drag?.type === node.type ? 0.5 : 1,
									touchAction: "none",
								}}
							>
								<PreviewComponent />
							</button>
							<div className="flex text-center text-neutral-500 flex-col">
								<span className="font-medium">{node.name}</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
