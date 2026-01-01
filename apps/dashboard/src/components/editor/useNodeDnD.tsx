import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import "./drag.css";

type DragState = {
	type: string;
	label: string;
	position: { x: number; y: number };
};

type NodeDnDContextType = {
	drag: DragState | null;
	startDrag: (e: React.PointerEvent, type: string, label: string) => void;
	endDrag: () => void;
};

const NodeDnDContext = createContext<NodeDnDContextType | null>(null);

export function NodeDnDProvider({ children }: { children: ReactNode }) {
	const [drag, setDrag] = useState<DragState | null>(null);

	const startDrag = useCallback(
		(e: React.PointerEvent, type: string, label: string) => {
			e.preventDefault();
			e.stopPropagation();

			setDrag({
				type,
				label,
				position: { x: e.clientX, y: e.clientY },
			});
		},
		[],
	);

	const endDrag = useCallback(() => {
		setDrag(null);
	}, []);

	// Global pointer tracking
	useEffect(() => {
		if (!drag) return;

		const move = (e: PointerEvent) => {
			setDrag((d) =>
				d
					? {
							...d,
							position: { x: e.clientX, y: e.clientY },
						}
					: null,
			);
		};

		const up = () => {
			setDrag(null);
		};

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setDrag(null);
			}
		};

		window.addEventListener("pointermove", move);
		window.addEventListener("pointerup", up);
		window.addEventListener("keydown", handleEscape);

		return () => {
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", up);
			window.removeEventListener("keydown", handleEscape);
		};
	}, [drag]);

	return (
		<NodeDnDContext.Provider value={{ drag, startDrag, endDrag }}>
			{children}
			<DragGhost />
		</NodeDnDContext.Provider>
	);
}

export function useNodeDnD() {
	const context = useContext(NodeDnDContext);
	if (!context) {
		throw new Error("useNodeDnD must be used within NodeDnDProvider");
	}
	return context;
}

// Ghost Node Preview
function DragGhost() {
	const { drag } = useNodeDnD();

	if (!drag) return null;

	return (
		<div
			className="ghost-node animate-in animation-rotation fixed -translate-x-1/2 -translate-y-1/2 pointer-events-none z-9999 opacity-95 scale-105 shadow-2xl rounded-lg p-4 bg-(--card-background) border border-(--border) min-w-37.5 text-center font-medium"
			style={{
				left: `${drag.position.x}px`,
				top: `${drag.position.y}px`,
			}}
		>
			{drag.label}
		</div>
	);
}
