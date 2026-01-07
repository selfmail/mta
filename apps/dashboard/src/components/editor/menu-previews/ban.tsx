import { Ban as BanIcon } from "lucide-react";

export default function BanMenuPreview() {
	return (
		<div className="flex p-2 flex-row items-center gap-4 justify-center rounded-md bg-white border border-red-200 shadow-sm overflow-hidden w-full">
			<div className="p-2 rounded-full bg-red-100">
				<BanIcon className="w-6 h-6 text-red-600" />
			</div>
			<div className="flex flex-col space-y-1">
				<p className="font-medium text-red-700">Ban</p>
				<p className="text-xs text-neutral-500">Stop the connection</p>
			</div>
		</div>
	);
}
