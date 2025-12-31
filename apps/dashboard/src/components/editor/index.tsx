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
	useEdgesState,
	useNodesState,
	useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo, useState } from "react";
import RightSideMenu from "./menu";
import { createInitialNodes, validateWorkflowConnection } from "./utils";

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

const hey: Node = {
	id: "sf",
	position: { x: 0, y: 0 },
	data: { label: "Hello" },
	type: "input",
};

// TODO: integrate Minimap and Controls
function WorkflowEditorInner({
	allowedNodes,
	startNode,
	endNode,
	onSave,
	initialNodes = [],
	initialEdges = [],
}: WorkflowEditorProps) {
	const [nodes, setNodes, onNodesChange] = useNodesState(
		initialNodes.length > 0
			? initialNodes
			: createInitialNodes(
					startNode.type,
					startNode.label,
					endNode.type,
					endNode.label,
				),
	);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const [validationError, setValidationError] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const rfInstance = useReactFlow();

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
		(connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
		[setEdges],
	);

	// Function to check if start node is connected to end node
	const validateConnection = useCallback(
		() => validateWorkflowConnection(edges),
		[edges],
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

		const position = rfInstance.screenToFlowPosition({
			x: event.clientX,
			y: event.clientY,
		});

		const newNode: Node = {
			id: crypto.randomUUID(),
			type,
			position,
			data: { label: `${type} node` },
		};

		setNodes((nds) => nds.concat(newNode));
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
