import type { Edge, Node, NodeProps } from "@xyflow/react";

export interface WorkflowEditorProps {
  event: string;
  /**
   * Array of allowed node types for this workflow
   */
  allowedNodes: Array<{
    type: string;
    label: string;
    icon?: React.ReactNode;
    component: React.ComponentType<NodeProps>;
  }>;
  /**
   * Starting node configuration
   */
  startNode: {
    type: string;
    label: string;
    component: React.ComponentType<NodeProps>;
  };
  /**
   * End node configuration
   */
  endNode: {
    type: string;
    label: string;
    component: React.ComponentType<NodeProps>;
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
