import {
	addEdge,
	Background,
	type Connection,
	Controls,
	type Edge,
	MiniMap,
	type Node,
	type NodeTypes,
	type OnConnect,
	ReactFlow,
	useEdgesState,
	useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo, useState } from "react";
import SaveButton from "@/components/base/save-button";
import EditorMenu from "./menu";
import {
	createInitialNodes,
	createNodeFromDrop,
	handleDragOver,
	validateWorkflowConnection,
} from "./utils";

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

export default function WorkflowEditor({
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

	const handleSave = async () => {
		setValidationError("");

		// Validate connection
		const isConnected = validateConnection();

		if (!isConnected) {
			setValidationError("Start node must be connected to end node");
			return;
		}

		// If validation passes, call onSave
		if (onSave) {
			setIsLoading(true);
			try {
				await onSave(nodes, edges);
			} catch (error) {
				setValidationError(
					error instanceof Error ? error.message : "Failed to save",
				);
			} finally {
				setIsLoading(false);
			}
		}
	};

	const onDragOver = useCallback(handleDragOver, []);

	const onDrop = useCallback(
		(event: React.DragEvent) => {
			event.preventDefault();

			const allowedNodeTypes = allowedNodes.map((node) => node.type);
			const newNode = createNodeFromDrop(event, allowedNodeTypes);

			if (newNode) {
				setNodes((nds) => nds.concat(newNode));
			}
		},
		[allowedNodes, setNodes],
	);

	return (
		<div className="flex h-screen w-full">
			{/* Menu */}
			<EditorMenu allowedNodes={allowedNodes} />

			{/* Editor */}
			<div className="flex-1 flex flex-col">
				<div className="flex-1 relative">
					<ReactFlow
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
						<Controls />
						<MiniMap />
					</ReactFlow>
				</div>

				{/* Footer with Save Button */}
				<div className="p-4 border-t border-neutral-200 bg-neutral-50">
					<div className="max-w-md mx-auto">
						<SaveButton
							onClick={handleSave}
							hasError={!!validationError}
							isLoading={isLoading}
						/>
						{validationError && (
							<p className="mt-2 text-sm text-red-600 text-center">
								{validationError}
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
