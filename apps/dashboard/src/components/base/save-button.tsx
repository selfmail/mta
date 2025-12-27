import { Button as ButtonElement } from "@base-ui/react";
import { cn } from "@/lib/utils";

interface SaveButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	hasError?: boolean;
	isLoading?: boolean;
}

export default function SaveButton({
	hasError = false,
	isLoading = false,
	className,
	children = "Save",
	...props
}: SaveButtonProps) {
	return (
		<ButtonElement
			{...props}
			disabled={isLoading || props.disabled}
			className={cn(
				"rounded-xl corner-round w-full px-3 py-2 outline-none border transition-colors font-medium",
				hasError
					? "bg-red-600 text-white border-red-600 hover:bg-red-700"
					: "bg-white text-black border-white hover:bg-neutral-200 shadow-[inset_0_1px_2px_rgba(30,58,138,0.15)]",
				isLoading && "opacity-50 cursor-not-allowed",
				className,
			)}
		>
			{isLoading ? "Saving..." : children}
		</ButtonElement>
	);
}
