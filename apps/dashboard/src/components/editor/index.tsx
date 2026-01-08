import {
  Background,
  type NodeTypes,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect, useMemo, useRef } from "react";
import { useEditorConnection, useEditorDragAndDrop } from "./hooks";
import RightSideMenu from "./menu";
import { useFlowStore } from "./store";
import type { WorkflowEditorProps } from "./types";
import { NodeDnDProvider, useNodeDnD } from "./useNodeDnD";
import { buildNodeTypes, createInitialNodes } from "./utils";

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
    selectNode,
  } = useFlowStore();

  const { drag, endDrag } = useNodeDnD();
  // biome-ignore lint/style/noNonNullAssertion: will always be set
  const reactFlowWrapper = useRef<HTMLDivElement>(null!);
  const rfInstance = useReactFlow();

  // Custom hooks for cleaner code
  const { onConnect } = useEditorConnection();
  const { onCanvasPointerUp, onDragOver, onDrop } = useEditorDragAndDrop(
    drag,
    endDrag,
    rfInstance,
    reactFlowWrapper
  );

  useEffect(() => {
    setEvent(event);
  }, [event, setEvent]);

  // TODO: Fetching default nodes and edges from db

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
  const nodeTypes: NodeTypes = useMemo(
    () => buildNodeTypes(allowedNodes, startNode, endNode),
    [allowedNodes, startNode, endNode]
  );

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
          onSelectionChange={({ nodes, edges }) => {
            if (nodes.length === 1 && edges.length === 0) {
              if (nodes[0].id === "start-node" || nodes[0].id === "end-node") {
                selectNode(null);
                return;
              }

              selectNode(nodes[0].id);
              return;
            }
            selectNode(null);
          }}
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
