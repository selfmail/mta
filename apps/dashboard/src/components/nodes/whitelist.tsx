import { Handle, Position } from "@xyflow/react";
import { ShieldCheck } from "lucide-react";

export default function WhitelistNode() {
	return (
		<div className="nodrag rounded-md bg-white border border-neutral-200 shadow-sm overflow-hidden">
			<Handle type="target" position={Position.Top} className="w-3 h-3" />

			{/* Header section */}
			<div className="flex items-center gap-2 px-3 py-2">
				{/* Icon */}
				<div className="shrink-0 w-6 h-6 rounded bg-purple-100 flex items-center justify-center">
					<ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
				</div>

				{/* Title */}
				<div className="flex-1 min-w-0">
					<p className="text-xs font-medium text-neutral-900">Whitelist</p>
				</div>
			</div>

			<Handle
				type="source"
				id={"1"}
				position={Position.Bottom}
				className="w-3 h-3"
			/>
			{/* Handle for errors */}
			<Handle
				type="source"
				id={"2"}
				position={Position.Right}
				className="w-2 h-2"
				style={{
					backgroundColor: "red",
				}}
			/>
		</div>
	);
}
