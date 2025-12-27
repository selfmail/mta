import type { Edge, Node } from "@xyflow/react";

/**
 * Validates that there is a path from the start node to the end node
 * using breadth-first search
 */
export function validateWorkflowConnection(
	edges: Edge[],
	startNodeId = "start-node",
	endNodeId = "end-node",
): boolean {
	const visited = new Set<string>();
	const queue: string[] = [startNodeId];

	while (queue.length > 0) {
		const currentNode = queue.shift()!;

		if (currentNode === endNodeId) {
			return true;
		}

		if (visited.has(currentNode)) {
			continue;
		}

		visited.add(currentNode);

		// Find all edges from current node
		const outgoingEdges = edges.filter((edge) => edge.source === currentNode);

		for (const edge of outgoingEdges) {
			if (!visited.has(edge.target)) {
				queue.push(edge.target);
			}
		}
	}

	return false;
}

/**
 * Creates initial nodes for the workflow editor
 */
export function createInitialNodes(
	startNodeType: string,
	startNodeLabel: string,
	endNodeType: string,
	endNodeLabel: string,
): Node[] {
	return [
		{
			id: "start-node",
			type: startNodeType,
			position: { x: 250, y: 50 },
			data: { label: startNodeLabel },
		},
		{
			id: "end-node",
			type: endNodeType,
			position: { x: 250, y: 400 },
			data: { label: endNodeLabel },
		},
	];
}

/**
 * Handler for drag over events in the workflow editor
 */
export function handleDragOver(event: React.DragEvent) {
	event.preventDefault();
	event.dataTransfer.dropEffect = "move";
}

/**
 * Creates a new node from a drop event
 */
export function createNodeFromDrop(
	event: React.DragEvent,
	allowedNodeTypes: string[],
): Node | null {
	const nodeType = event.dataTransfer.getData("application/reactflow");
	const nodeLabel = event.dataTransfer.getData("application/reactflow-label");

	// Check if the node type is allowed
	if (!allowedNodeTypes.includes(nodeType)) {
		return null;
	}

	const reactFlowBounds = (event.target as HTMLElement)
		.closest(".react-flow")
		?.getBoundingClientRect();

	if (!reactFlowBounds) {
		return null;
	}

	const position = {
		x: event.clientX - reactFlowBounds.left,
		y: event.clientY - reactFlowBounds.top,
	};

	return {
		id: `${nodeType}-${Date.now()}`,
		type: nodeType,
		position,
		data: { label: nodeLabel || nodeType },
	};
}
