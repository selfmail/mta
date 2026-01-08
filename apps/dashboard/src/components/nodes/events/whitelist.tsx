import { Handle, type NodeProps, NodeToolbar, Position } from "@xyflow/react";
import { CopyIcon, ShieldCheck, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFlowStore } from "@/components/editor/store";
import { cn } from "@/lib/utils";

interface WhitelistProps extends NodeProps {
  id: string;
  selected?: boolean;
}

export default function WhitelistNode({
  id,
  selected = false,
}: WhitelistProps) {
  const { removeNode } = useFlowStore();

  const handleDelete = () => {
    removeNode(id);
  };

  useEffect(() => {
    if (selected) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Delete" || e.key === "Backspace") {
          handleDelete();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selected]);

  return (
    <>
      <Handle
        className="size-2! rounded-none! border-none! bg-purple-500!"
        position={Position.Top}
        type="target"
      />
      <NodeToolbar align="start" isVisible={selected} position={Position.Top}>
        <div className="flex flex-row space-x-2 rounded-md border border-(--border) bg-white p-1">
          <button
            className="rounded-sm p-2 transition-colors hover:bg-neutral-100"
            onClick={handleDelete}
            type="button"
          >
            <Trash2 className="h-4 w-4 text-neutral-600" />
          </button>
          <button
            className="rounded-sm p-2 transition-colors hover:bg-neutral-100"
            onClick={handleDelete}
            type="button"
          >
            <CopyIcon className="h-4 w-4 text-neutral-600" />
          </button>
        </div>
      </NodeToolbar>
      <div
        className={cn(
          "w-32 border border-b-2 bg-white text-left text-xs shadow-sm transition-all",
          selected
            ? "border-purple-500 shadow-[0_0_0_1px_rgba(168,85,247,0.3)]"
            : "border-neutral-200"
        )}
      >
        <div className="flex flex-row items-center gap-2 p-2">
          <div className="flex h-6 w-6 items-center justify-center bg-purple-100">
            <ShieldCheck className="h-3.5 w-3.5 text-purple-600" />
          </div>
          <span className="font-medium text-neutral-900">Whitelist</span>
        </div>
      </div>
      <Handle
        className="size-2! rounded-none! border-none! bg-purple-500!"
        position={Position.Bottom}
        type="source"
      />
    </>
  );
}
