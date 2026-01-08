import {
  addEdge,
  type Connection,
  type Node,
  type OnConnect,
  type ReactFlowInstance,
} from "@xyflow/react";
import { useCallback } from "react";
import { useFlowStore } from "./store";
import type { useNodeDnD } from "./useNodeDnD";

export function useEditorConnection() {
  const { edges, setEdges } = useFlowStore();

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      const newEdges = addEdge(connection, edges);
      setEdges(newEdges);
    },
    [edges, setEdges]
  );

  return { onConnect };
}

export function useEditorDragAndDrop(
  drag: ReturnType<typeof useNodeDnD>["drag"],
  endDrag: ReturnType<typeof useNodeDnD>["endDrag"],
  rfInstance: ReactFlowInstance | null,
  reactFlowWrapper: React.RefObject<HTMLDivElement>
) {
  const { addNode } = useFlowStore();

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
    [drag, rfInstance, addNode, endDrag, reactFlowWrapper]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
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
    },
    [rfInstance, addNode]
  );

  return { onCanvasPointerUp, onDragOver, onDrop };
}
