import type { Edge, EdgeChange, Node, NodeChange } from "@xyflow/react";
import { applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { create } from "zustand";

interface FlowState {
	eventId: string;
	selectedNodeId: string | null;
	nodes: Node[];
	edges: Edge[];
	isDirty: boolean;
	isSaving: boolean;
	lastSaved: Date | null;

	// Basic methods for React Flow
	setNodes: (nodes: Node[]) => void;
	setEdges: (edges: Edge[]) => void;
	onNodesChange: (changes: NodeChange[]) => void;
	onEdgesChange: (changes: EdgeChange[]) => void;

	// Handle Notes
	addNode: (node: Node) => void;
	removeNode: (nodeId: string) => void;

	// Save data changes from a node
	updateNodeData: <T = unknown>(nodeId: string, data: Partial<T>) => void;
	setNodeData: <T = unknown>(nodeId: string, data: T) => void;

	// Selection methods for menu
	selectNode: (nodeId: string | null) => void;
	getSelectedNode: () => Node | undefined;

	setEventId: (eventId: string) => void;

	// Auto-save
	saveToBackend: () => Promise<void>;
	triggerAutoSave: () => void;
}

let autoSaveTimeout: NodeJS.Timeout | null = null;
const AUTO_SAVE_DELAY = 2000; // 2 seconds

export const useFlowStore = create<FlowState>((set, get) => ({
	eventId: "",
	selectedNodeId: null,
	nodes: [],
	edges: [],
	isDirty: false,
	isSaving: false,
	lastSaved: null,

	setNodes: (nodes) => {
		set({ nodes, isDirty: true });
		get().triggerAutoSave();
	},

	setEdges: (edges) => {
		set({ edges, isDirty: true });
		get().triggerAutoSave();
	},

	onNodesChange: (changes) => {
		set({
			nodes: applyNodeChanges(changes, get().nodes),
			isDirty: true,
		});
		get().triggerAutoSave();
	},

	onEdgesChange: (changes) => {
		set({
			edges: applyEdgeChanges(changes, get().edges),
			isDirty: true,
		});
		get().triggerAutoSave();
	},

	addNode: (node) => {
		set((state) => ({
			nodes: [...state.nodes, node],
			isDirty: true,
		}));
		get().triggerAutoSave();
	},

	removeNode: (nodeId) => {
		set((state) => ({
			nodes: state.nodes.filter((node) => node.id !== nodeId),
			edges: state.edges.filter(
				(edge) => edge.source !== nodeId && edge.target !== nodeId,
			),
			isDirty: true,
		}));
		get().triggerAutoSave();
	},

	updateNodeData: (nodeId, data) => {
		set((state) => ({
			nodes: state.nodes.map((node) =>
				node.id === nodeId
					? { ...node, data: { ...node.data, ...data } }
					: node,
			),
			isDirty: true,
		}));
		get().triggerAutoSave();
	},

	setNodeData: (nodeId, data) => {
		set((state) => ({
			nodes: state.nodes.map((node) =>
				node.id === nodeId
					? { ...node, data: data as Record<string, unknown> }
					: node,
			),
			isDirty: true,
		}));
		get().triggerAutoSave();
	},

	selectNode: (nodeId) => set({ selectedNodeId: nodeId }),

	getSelectedNode: () => {
		const { nodes, selectedNodeId } = get();
		return nodes.find((node) => node.id === selectedNodeId);
	},

	// Event ID
	setEventId: (eventId) => set({ eventId }),

	// Auto-save with debouncing
	triggerAutoSave: () => {
		// Clear existing timeout
		if (autoSaveTimeout) {
			clearTimeout(autoSaveTimeout);
		}

		// Set new timeout
		autoSaveTimeout = setTimeout(() => {
			const state = get();
			if (state.isDirty && !state.isSaving) {
				state.saveToBackend();
			}
		}, AUTO_SAVE_DELAY);
	},

	saveToBackend: async () => {
		const { eventId, nodes, edges, isDirty } = get();

		if (!isDirty) return;

		set({ isSaving: true });

		try {
			// API call to save workflow
			const response = await fetch(`/api/workflows/${eventId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ nodes, edges }),
			});

			if (!response.ok) {
				throw new Error("Failed to save workflow");
			}

			set({
				isDirty: false,
				isSaving: false,
				lastSaved: new Date(),
			});

			console.log("✅ Workflow auto-saved");
		} catch (error) {
			console.error("❌ Auto-save failed:", error);
			set({ isSaving: false });
		}
	},
}));

if (typeof window !== "undefined") {
	window.addEventListener("beforeunload", () => {
		if (autoSaveTimeout) {
			clearTimeout(autoSaveTimeout);
		}
	});
}
