import { Handle, Position } from "@xyflow/react";
import { CircleCheck } from "lucide-react";

export default function EndNode() {
	return (
		<div className="rounded-md bg-white border-2 border-blue-500 shadow-sm overflow-hidden">
			<Handle
				type="target"
				position={Position.Top}
				className="w-3 h-3 bg-blue-500"
			/>

			{/* Header section */}
			<div className="flex items-center gap-2 px-3 py-2 bg-blue-50">
				{/* Icon */}
				<div className="shrink-0 w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
					<CircleCheck className="w-3.5 h-3.5 text-white" />
				</div>

				{/* Title */}
				<div className="flex-1 min-w-0">
					<p className="text-xs font-semibold text-blue-900">End</p>
				</div>
			</div>
		</div>
	);
}
