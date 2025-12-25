import { Dialog } from "@base-ui/react/dialog";
import { type ReactNode } from "react";

interface ModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	title?: string;
	description?: string;
	children: ReactNode;
	footer?: ReactNode;
	size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
	isOpen,
	onOpenChange,
	title,
	description,
	children,
	footer,
	size = "md",
}: ModalProps) {
	const sizeClasses = {
		sm: "max-w-md",
		md: "max-w-lg",
		lg: "max-w-2xl",
		xl: "max-w-4xl",
	};

	return (
		<Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				{/* Backdrop with dark blur */}
				<Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black/80 backdrop-blur-sm transition-all duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />

				{/* Modal Popup */}
				<Dialog.Popup
					className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full ${sizeClasses[size]} max-w-[calc(100vw-2rem)] bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800/60 shadow-2xl shadow-black/50 transition-all duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0`}
				>
					{/* Header */}
					{title && (
						<div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/60">
							<div className="flex-1">
								<Dialog.Title className="text-xl font-semibold text-zinc-100">
									{title}
								</Dialog.Title>
								{description && (
									<Dialog.Description className="mt-1 text-sm text-zinc-400">
										{description}
									</Dialog.Description>
								)}
							</div>
							<Dialog.Close className="group ml-4 flex items-center justify-center rounded-lg p-2 hover:bg-zinc-800/50 transition-colors">
								<svg
									className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</Dialog.Close>
						</div>
					)}

					{/* Content */}
					<div className="px-6 py-5 text-zinc-300 max-h-[calc(100vh-12rem)] overflow-y-auto">
						{children}
					</div>

					{/* Footer */}
					{footer && (
						<div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-800/60 bg-zinc-900/50">
							{footer}
						</div>
					)}
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

// Utility component for modal footer
export function ModalFooter({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className={`flex items-center gap-3 ${className}`}>{children}</div>
	);
}
