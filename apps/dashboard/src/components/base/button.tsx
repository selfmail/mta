import { Button as ButtonElement } from "@base-ui/react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary";
}

export default function Button({
	variant = "primary",
	className,
	...props
}: ButtonProps) {
	return (
		<ButtonElement
			{...props}
			className={cn(
				"rounded-xl w-full px-3 py-2 outline-none border transition-colors font-medium",
				variant === "primary" &&
					"bg-white text-black border-white hover:bg-neutral-200",
				variant === "secondary" &&
					"bg-transparent text-white border-neutral-800 hover:border-neutral-700",
				className,
			)}
		/>
	);
}
