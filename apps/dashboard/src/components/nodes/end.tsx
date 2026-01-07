import { Handle, Position } from "@xyflow/react";
import { CircleCheck } from "lucide-react";

export default function EndNode() {
  return (
    <div className="w-32 overflow-hidden border border-neutral-200 border-b-2 bg-white shadow-sm">
      <Handle
        className="size-2! rounded-none! border-none! bg-blue-500!"
        position={Position.Top}
        type="target"
      />

      <div className="flex items-center gap-2 p-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-blue-100">
          <CircleCheck className="h-3.5 w-3.5 text-blue-600" />
        </div>
        <p className="font-medium text-neutral-900 text-xs">End</p>
      </div>
    </div>
  );
}
