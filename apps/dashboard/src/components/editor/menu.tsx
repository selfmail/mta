import WhitelistMenuPreview from "./menu-previews/whitelist";
import { useNodeDnD } from "./useNodeDnD";

type MenuNode = {
	type: string;
	name: string;
	preview: React.ComponentType;
};

const nodeTypes: MenuNode[] = [
	{
		type: "whitelist",
		name: "Whitelist",
		preview: WhitelistMenuPreview,
	},
];

export default function RightSideMenu() {
	const { startDrag, drag, endDrag } = useNodeDnD();

	const handlePointerUp = (e: React.PointerEvent) => {
		// Stop propagation to prevent canvas from receiving the event
		e.stopPropagation();
		// End the drag operation if one is active
		if (drag) {
			endDrag();
		}
	};

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
