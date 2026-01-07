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
import { useCallback, useEffect, useMemo, useRef } from "react";
import RightSideMenu from "./menu";
import { useFlowStore } from "./store";
import { NodeDnDProvider, useNodeDnD } from "./useNodeDnD";
import { createInitialNodes } from "./utils";
export interface WorkflowEditorProps {
  event: string;
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
  event,
  initialEdges = [],
}: WorkflowEditorProps) {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    setEvent,
    addNode,
    selectNode,
  } = useFlowStore();

  const { drag, endDrag } = useNodeDnD();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEvent(event);
  }, [event, setEvent]);

  // Fetching default nodes and edges from db

  const rfInstance = useReactFlow();

  // Initialising default nodes
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
              endNode.label
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
    [edges, setEdges]
  );

  const onPaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  // Handle custom drag & drop
  const onCanvasPointerUp = useCallback(
    (event: React.PointerEvent) => {
      if (!(drag && rfInstance && reactFlowWrapper.current)) {
        return;
      }

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = rfInstance.screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newNode: Node = {
        id: crypto.randomUUID(),
        type: drag.type,
        position,
        data: { label: drag.label },
      };

      addNode(newNode);
      endDrag();
    },
    [drag, rfInstance, addNode, endDrag]
  );

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();

    if (!rfInstance) {
      return;
    }

    const type = event.dataTransfer.getData("application/reactflow");
    if (!type) {
      return;
    }

    // Get drag offset data to position the node relative to where the user grabbed it
    const offsetData = event.dataTransfer.getData(
      "application/reactflow-offset"
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
      <div
        className="relative flex-1"
        onPointerUp={onCanvasPointerUp}
        ref={reactFlowWrapper}
        style={{
          backgroundColor: drag ? "rgba(0, 0, 0, 0.02)" : undefined,
          transition: "background-color 200ms",
        }}
      >
        <ReactFlow
          className="h-full w-full"
          edges={edges}
          fitView
          nodes={nodes}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          onPaneClick={onPaneClick}
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
      <NodeDnDProvider>
        <WorkflowEditorInner {...props} />
      </NodeDnDProvider>
    </ReactFlowProvider>
  );
}
