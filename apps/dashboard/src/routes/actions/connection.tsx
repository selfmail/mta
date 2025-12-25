import { createFileRoute } from "@tanstack/react-router";
import {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	type Node,
	ReactFlow,
} from "@xyflow/react";
import { useCallback, useState } from "react";
import "@xyflow/react/dist/style.css";
import WhitelistNode from "@/components/nodes/whitelist";

export const Route = createFileRoute("/actions/connection")({
	component: App,
});
const initialNodes: Node[] = [
	{ id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
	{ id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
	{
		id: "n3",
		type: "whitelist",
		position: { x: 0, y: 200 },
		data: { label: "Node 3s" },
	},
];
const initialEdges = [
	{
		id: "n1-n2",
		source: "n1",
		target: "n2",
		type: "step",
		label: "connects with",
	},
];
const nodeTypes = {
	whitelist: WhitelistNode,
};

export function App() {
	const [nodes, setNodes] = useState(initialNodes);
	const [edges, setEdges] = useState(initialEdges);

	const onNodesChange = useCallback(
		(changes) =>
			setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
		[],
	);
	const onEdgesChange = useCallback(
		(changes) =>
			setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
		[],
	);
	const onConnect = useCallback(
		(params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
		[],
	);

	return (
		<div
			className=" bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:16px_16px] bg-neutral-800 rounded-md text-black"
			style={{ width: "100%", height: "100%" }}
		>
			<ReactFlow
				nodeTypes={nodeTypes}
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				fitView
			/>
		</div>
	);
}
