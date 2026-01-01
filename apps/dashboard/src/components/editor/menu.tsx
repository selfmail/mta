import { useNodeDnD } from "./useNodeDnD";

const nodeTypes = [
	{
		type: "whitelist",
		name: "Whitelist Node",
	},
];

export default function RightSideMenu() {
	const { startDrag, drag } = useNodeDnD();

	return (
		<div className="w-2/8 h-full p-4 flex flex-col space-y-4 rounded-lg absolute bg-(--background) right-0 top-0 bottom-0">
			<h2 className="text-lg font-medium">Add Nodes to your Action</h2>
			<div className="grid grid-cols-2 gap-4">
				{nodeTypes.map((node) => (
					<button
						type="button"
						key={node.type}
						className="p-4 border border-(--border) rounded-lg cursor-grab bg-(--card-background) select-none transition-transform active:scale-95 hover:shadow-lg"
						onPointerDown={(e) => startDrag(e, node.type, node.name)}
						style={{
							opacity: drag?.type === node.type ? 0.5 : 1,
							touchAction: "none",
						}}
					>
						{node.name}
					</button>
				))}
			</div>
		</div>
	);
}
