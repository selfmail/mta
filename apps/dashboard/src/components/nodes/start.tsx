import { Handle, Position } from "@xyflow/react";
import { Play } from "lucide-react";

export default function StartNode() {
  return (
    <div className="w-32 overflow-hidden border border-neutral-200 border-b-2 bg-white shadow-sm">
      <div className="flex items-center gap-2 p-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-green-100">
          <Play className="h-3.5 w-3.5 text-green-600" fill="currentColor" />
        </div>
        <p className="font-medium text-neutral-900 text-xs">Start</p>
      </div>

      <Handle
        className="size-2! rounded-none! border-none! bg-green-500!"
        position={Position.Bottom}
        type="source"
      />
    </div>
  );
}
