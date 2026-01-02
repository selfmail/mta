import { FileTextIcon } from "lucide-react";

export default function WhitelistMenuPreview() {
	return (
		<div className="flex p-2 flex-row items-center gap-4 justify-center rounded-md bg-white border border-neutral-200 shadow-sm overflow-hidden w-full">
			<FileTextIcon className="w-6 h-6 text-neutral-500" />
			<div className="flex flex-col space-y-1">
				<p>127.0.0.1</p>
				<p className="line-through text-neutral-400">0.0.0.0</p>
			</div>
		</div>
	);
}
