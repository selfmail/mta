import type { DataSchemaTS } from "@mta/schema";
import type { Edge, Node } from "@xyflow/react";

/**
 * Validates that there is a path from the start node to the end node
 */
export function validateWorkflowConnection(
  edges: Edge[],
  startNodeId = "start-node",
  endNodeId = "end-node"
): boolean {
  const visited = new Set<string>();
  const queue: string[] = [startNodeId];

  while (queue.length > 0) {
    // biome-ignore lint/style/noNonNullAssertion: need this here
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
  endNodeLabel: string
): Node[] {
  return [
    {
      id: "start-node",
      type: startNodeType,
      position: { x: 0, y: 0 },
      data: { label: startNodeLabel },
      deletable: false,
      selectable: false,
    },
    {
      id: "end-node",
      deletable: false,
      selectable: false,
      type: endNodeType,
      position: { x: 0, y: 400 },
      data: { label: endNodeLabel },
    },
  ];
}

// TODO: Implement function to create data schema from nodes and edges
export function createDataSchema(nodes: Node[], edges: Edge[]): DataSchemaTS {
  // Go through nodes and edges, create data schema
}
