import {
	addEdge,
	Background,
	type Connection,
	type Edge,
	type Node,
	type NodeTypes,
	type OnConnect,
	ReactFlow,
	ReactFlowProvider,
	useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useMemo } from "react";
import RightSideMenu from "./menu";
import { useFlowStore } from "./store";
import { createInitialNodes } from "./utils";
export interface WorkflowEditorProps {
	/**
	 * Array of allowed node types for this workflow
	 */
	allowedNodes: Array<{
		type: string;
		label: string;
		icon?: React.ReactNode;
		component: React.ComponentType<any>;
	}>;
	/**
	 * Starting node configuration
	 */
	startNode: {
		type: string;
		label: string;
		component: React.ComponentType<any>;
	};
	/**
	 * End node configuration
	 */
	endNode: {
		type: string;
		label: string;
		component: React.ComponentType<any>;
	};
	/**
	 * Callback function when the workflow is saved
	 */
	onSave?: (nodes: Node[], edges: Edge[]) => void | Promise<void>;
	/**
	 * Initial nodes (optional)
	 */
	initialNodes?: Node[];
	/**
	 * Initial edges (optional)
	 */
	initialEdges?: Edge[];
}

// TODO: integrate Minimap and Controls
function WorkflowEditorInner({
	allowedNodes,
	startNode,
	endNode,
	onSave: _onSave,
	initialNodes = [],
	initialEdges = [],
}: WorkflowEditorProps) {
	const {
		nodes,
		edges,
		setNodes,
		setEdges,
		onNodesChange,
		onEdgesChange,
		addNode,
	} = useFlowStore();

	const rfInstance = useReactFlow();

	// biome-ignore lint: don't need these deps
	useEffect(() => {
		if (nodes.length === 0) {
			const initialNodesData =
				initialNodes.length > 0
					? initialNodes
					: createInitialNodes(
							startNode.type,
							startNode.label,
							endNode.type,
							endNode.label,
						);
			setNodes(initialNodesData);
		}

		if (edges.length === 0 && initialEdges.length > 0) {
			setEdges(initialEdges);
		}
	}, []);

	// Build node types from allowed nodes, start node, and end node
	const nodeTypes: NodeTypes = useMemo(() => {
		const types: NodeTypes = {};

		// Add allowed nodes
		allowedNodes.forEach((node) => {
			types[node.type] = node.component;
		});

		// Add start and end nodes
		types[startNode.type] = startNode.component;
		types[endNode.type] = endNode.component;

		return types;
	}, [allowedNodes, startNode, endNode]);

	const onConnect: OnConnect = useCallback(
		(connection: Connection) => {
			const newEdges = addEdge(connection, edges);
			setEdges(newEdges);
		},
		[edges, setEdges],
	);
	const onDragOver = (event: React.DragEvent) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	};

	const onDrop = (event: React.DragEvent) => {
		event.preventDefault();

		if (!rfInstance) return;

		const type = event.dataTransfer.getData("application/reactflow");
		if (!type) return;

		// Get drag offset data to position the node relative to where the user grabbed it
		const offsetData = event.dataTransfer.getData(
			"application/reactflow-offset",
		);
		let offsetX = 0;
		let offsetY = 0;

		if (offsetData) {
			const offset = JSON.parse(offsetData);
			// Center the node by using half the width/height
			offsetX = offset.width / 2;
			offsetY = offset.height / 2;
		}

		const position = rfInstance.screenToFlowPosition({
			x: event.clientX - offsetX,
			y: event.clientY - offsetY,
		});

		const newNode: Node = {
			id: crypto.randomUUID(),
			type,
			position,
			data: { label: `${type} node` },
		};

		addNode(newNode);
	};
	return (
		<div className="flex h-full w-full">
			<div className="flex-1 relative">
				<ReactFlow
					className="w-full h-full"
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					nodeTypes={nodeTypes}
					onDragOver={onDragOver}
					onDrop={onDrop}
					fitView
				>
					<Background />
				</ReactFlow>
				<RightSideMenu />
			</div>
		</div>
	);
}

export default function WorkflowEditor(props: WorkflowEditorProps) {
	return (
		<ReactFlowProvider>
			<WorkflowEditorInner {...props} />
		</ReactFlowProvider>
	);
}
