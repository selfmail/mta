import { Handle, Position } from "@xyflow/react";
import { Play } from "lucide-react";

export default function StartNode() {
	return (
		<div className=" rounded-md bg-white border-2 border-green-500 shadow-sm overflow-hidden">
			{/* Header section */}
			<div className="flex items-center gap-2 px-3 py-2 bg-green-50">
				{/* Icon */}
				<div className="shrink-0 w-6 h-6 rounded bg-green-500 flex items-center justify-center">
					<Play className="w-3.5 h-3.5 text-white" fill="white" />
				</div>

				{/* Title */}
				<div className="flex-1 min-w-0">
					<p className="text-xs font-semibold text-green-900">Start</p>
				</div>
			</div>

			<Handle
				type="source"
				position={Position.Bottom}
				className="w-3 h-3 bg-green-500"
			/>
		</div>
	);
}
