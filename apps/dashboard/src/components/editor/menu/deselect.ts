import type { FlowState } from "../store";

export const deselectNode = ({
  getSelectedNode,
  selectNode,
  nodes,
  setNodes,
}: {
  getSelectedNode: FlowState["getSelectedNode"];
  selectNode: FlowState["selectNode"];
  nodes: FlowState["nodes"];
  setNodes: FlowState["setNodes"];
}) => {
  const nodeId = getSelectedNode()?.id;
  if (nodeId) {
    selectNode(null);
    const updatedNodes = nodes.map((node) =>
      node.id === nodeId ? { ...node, selected: false } : node
    );
    setNodes(updatedNodes);
  }
};
