import { Button as ButtonElement } from "@base-ui/react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "ghost";
	size?: "default" | "icon";
}

export default function Button({
	variant = "primary",
	size = "default",
	className,
	...props
}: ButtonProps) {
	return (
		<ButtonElement
			{...props}
			className={cn(
				"rounded-xl corner-round outline-none border transition-colors font-medium",
				size === "default" && "w-full px-3 py-2",
				size === "icon" && "w-auto p-2",
				variant === "primary" &&
					"bg-white text-black border-white hover:bg-neutral-200 shadow-[inset_0_1px_2px_rgba(30,58,138,0.15)]",
				variant === "secondary" &&
					"bg-transparent text-white border-neutral-800 hover:border-neutral-700",
				variant === "ghost" &&
					"bg-transparent border-transparent hover:bg-neutral-100 text-neutral-900",
				className,
			)}
		/>
	);
}
