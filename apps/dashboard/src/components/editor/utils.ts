import type { DataSchemaTS } from "@mta/schema";
import type { Edge, Node, NodeTypes } from "@xyflow/react";
import type { WorkflowEditorProps } from "./types";

/**
 * Builds the node types object from allowed nodes, start node, and end node
 */
export function buildNodeTypes(
  allowedNodes: WorkflowEditorProps["allowedNodes"],
  startNode: WorkflowEditorProps["startNode"],
  endNode: WorkflowEditorProps["endNode"]
): NodeTypes {
  const types: NodeTypes = {};

  // Add allowed nodes
  for (const node of allowedNodes) {
    types[node.type] = node.component;
  }

  // Add start and end nodes
  types[startNode.type] = startNode.component;
  types[endNode.type] = endNode.component;

  return types;
}

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

/**
 * Creates a DataSchemaTS object from nodes and edges
 * Filters out start and end nodes and transforms workflow nodes into data schema items
 */
export function createDataSchema(
  nodes: Node[],
  edges: Edge[],
  event: DataSchemaTS["event"]
): DataSchemaTS {
  // Filter out start and end nodes - only include workflow action nodes
  const workflowNodes = nodes.filter(
    (node) => node.id !== "start-node" && node.id !== "end-node"
  );

  // Sort nodes based on their execution order using edges
  const sortedNodes = topologicalSort(workflowNodes, edges);

  // Transform nodes into data schema items
  const data = sortedNodes.map((node) => ({
    id: node.id,
    type: node.type,
    payload: (node.data || {}) as Record<string, unknown>,
    proceedAtError: (node.data?.proceedAtError as boolean | undefined) ?? false,
    fail: node.data?.fail as DataSchemaTS["data"][number]["fail"],
  }));

  return {
    event,
    timestamp: new Date().toISOString(),
    data,
  };
}

/**
 * Performs topological sort on nodes based on edges to determine execution order
 * Uses Kahn's algorithm for topological sorting
 */
function topologicalSort(nodes: Node[], edges: Edge[]): Node[] {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const inDegree = new Map<string, number>();
  const adjacencyList = new Map<string, string[]>();

  // Initialize in-degree and adjacency list
  for (const node of nodes) {
    inDegree.set(node.id, 0);
    adjacencyList.set(node.id, []);
  }

  // Build graph
  for (const edge of edges) {
    // Only consider edges between workflow nodes (exclude start/end)
    if (nodeMap.has(edge.source) && nodeMap.has(edge.target)) {
      adjacencyList.get(edge.source)?.push(edge.target);
      inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
    }
  }

  // Queue of nodes with no incoming edges
  const queue: string[] = [];
  for (const [nodeId, degree] of inDegree) {
    if (degree === 0) {
      queue.push(nodeId);
    }
  }

  const sorted: Node[] = [];

  while (queue.length > 0) {
    // biome-ignore lint/style/noNonNullAssertion: queue length checked
    const currentId = queue.shift()!;
    const currentNode = nodeMap.get(currentId);

    if (currentNode) {
      sorted.push(currentNode);
    }

    // Reduce in-degree of neighbors
    const neighbors = adjacencyList.get(currentId) || [];
    for (const neighborId of neighbors) {
      const newDegree = (inDegree.get(neighborId) || 0) - 1;
      inDegree.set(neighborId, newDegree);

      if (newDegree === 0) {
        queue.push(neighborId);
      }
    }
  }

  // If not all nodes were sorted, there's a cycle or disconnected nodes
  // Return nodes in their original order as fallback
  if (sorted.length !== nodes.length) {
    return nodes;
  }

  return sorted;
}
