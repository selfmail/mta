import { BanIcon } from "lucide-react";

export default function BlockMenuPreview() {
	return (
		<div className="flex p-2 flex-row items-center gap-4 justify-center rounded-md bg-white border border-neutral-200 shadow-sm overflow-hidden w-full">
			<BanIcon className="w-6 h-6 text-red-500" />
			<div className="flex flex-col space-y-1">
				<p className="font-medium text-red-700">Block</p>
				<p className="text-xs text-neutral-500">Block incoming traffic</p>
			</div>
		</div>
	);
}
