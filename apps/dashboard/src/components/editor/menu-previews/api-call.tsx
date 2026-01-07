import { Globe } from "lucide-react";

export default function ApiCallMenuPreview() {
	return (
		<div className="flex p-2 flex-row items-center gap-4 justify-center rounded-md bg-white border border-blue-200 shadow-sm overflow-hidden w-full">
			<div className="p-2 rounded-full bg-blue-100">
				<Globe className="w-6 h-6 text-blue-600" />
			</div>
			<div className="flex flex-col space-y-1">
				<p className="font-medium text-blue-700">API Call</p>
				<p className="text-xs text-neutral-500">Make external requests</p>
			</div>
		</div>
	);
}
