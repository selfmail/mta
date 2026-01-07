import { Ban as BanIcon } from "lucide-react";

export default function BanMenuPreview() {
  return (
    <div className="flex w-full flex-row items-center justify-center gap-4 overflow-hidden rounded-md border border-red-200 bg-white p-2 shadow-sm">
      <div className="rounded-full bg-red-100 p-2">
        <BanIcon className="h-6 w-6 text-red-600" />
      </div>
      <div className="flex flex-col space-y-1">
        <p className="font-medium text-red-700">Ban</p>
        <p className="text-neutral-500 text-xs">Stop the connection</p>
      </div>
    </div>
  );
}
