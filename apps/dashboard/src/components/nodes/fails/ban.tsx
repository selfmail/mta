import { Handle, type NodeProps, NodeToolbar, Position } from "@xyflow/react";
import { CircleSlash, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFlowStore } from "@/components/editor/store";
import { cn } from "@/lib/utils";

interface BanNodeProps extends NodeProps {
  id: string;
}

export default function BanNode({ id }: BanNodeProps) {
  const { selectNode, selectedNodeId, removeNode } = useFlowStore();
  const isSelected = selectedNodeId === id;

  // biome-ignore lint: we don't need the last dep
  useEffect(() => {
    if (isSelected) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          selectNode(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
    return () => {
      if (selectedNodeId === id) {
        selectNode(null);
      }
    };
  }, [isSelected, id, selectNode]);

  const handleDelete = () => {
    removeNode(id);
    selectNode(null);
  };

  return (
    <>
      {/* Target handle on top only - flow stops after ban */}
      <Handle
        className="size-2! rounded-none! border-none! bg-red-500!"
        position={Position.Top}
        type="target"
      />
      <NodeToolbar align="start" isVisible={isSelected} position={Position.Top}>
        <div className="flex flex-row space-x-2 rounded-md border border-(--border) bg-white p-1">
          <button
            className="rounded-sm p-2 transition-colors hover:bg-neutral-100"
            onClick={handleDelete}
            type="button"
          >
            <Trash2 className="h-4 w-4 text-neutral-600" />
          </button>
        </div>
      </NodeToolbar>
      <button
        className={cn(
          "w-32 cursor-pointer border border-b-2 bg-white text-left text-xs shadow-sm transition-all",
          isSelected
            ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.3)]"
            : "border-neutral-200"
        )}
        onClick={(e) => {
          e.stopPropagation();
          selectNode(id);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            selectNode(id);
          }
        }}
        tabIndex={0}
        type="button"
      >
        <div className="flex flex-row items-center gap-2 p-2">
          <div className="flex h-6 w-6 items-center justify-center bg-red-100">
            <CircleSlash className="h-3.5 w-3.5 text-red-600" />
          </div>
          <span className="font-medium text-neutral-900">Banned</span>
        </div>
      </button>
    </>
  );
}
