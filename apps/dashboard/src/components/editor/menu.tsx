const nodeTypes = [
	{
		type: "whitelist",
		name: "Whitelist Node",
	},
];

export default function RightSideMenu() {
	const onDragStart = (
		event: React.DragEvent<HTMLButtonElement>,
		nodeType: string,
	) => {
		event.dataTransfer.setData("application/reactflow", nodeType);
		event.dataTransfer.effectAllowed = "move";

		// Store the offset from the mouse to the element's top-left corner
		const rect = event.currentTarget.getBoundingClientRect();
		const offsetX = event.clientX - rect.left;
		const offsetY = event.clientY - rect.top;
		event.dataTransfer.setData(
			"application/reactflow-offset",
			JSON.stringify({
				x: offsetX,
				y: offsetY,
				width: rect.width,
				height: rect.height,
			}),
		);
	};
	return (
		<div className="w-2/8 h-full p-4 flex flex-col space-y-4 rounded-lg absolute bg-(--background) right-0 top-0 bottom-0">
			<h2 className="text-lg font-medium">Add Nodes to your Action</h2>
			<div className="grid grid-cols-2 gap-4">
				{nodeTypes.map((node) => (
					<button
						type="button"
						key={node.type}
						className="p-4 border border-(--border) rounded-lg cursor-grab bg-(--card-background)"
						draggable
						onDragStart={(event) => onDragStart(event, node.type)}
					>
						{node.name}
					</button>
				))}
			</div>
		</div>
	);
}
