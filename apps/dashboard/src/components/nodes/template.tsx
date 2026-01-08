import { Handle, type NodeProps, NodeToolbar, Position } from "@xyflow/react";
import type { LucideIcon } from "lucide-react";
import { CopyIcon, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { useFlowStore } from "@/components/editor/store";
import { cn } from "@/lib/utils";

// Template Node: this is just a template to remove boilerplate code when creating new nodes
// You can specify handles, color styles and icon of the component.

type NodeColor =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "gray";

const colorSchemes: Record<
  NodeColor,
  {
    border: string;
    borderSelected: string;
    shadow: string;
    bg: string;
    text: string;
    handle: string;
  }
> = {
  red: {
    border: "border-red-500",
    borderSelected: "border-red-500",
    shadow: "shadow-[0_0_0_1px_rgba(239,68,68,0.3)]",
    bg: "bg-red-100",
    text: "text-red-600",
    handle: "bg-red-500!",
  },
  orange: {
    border: "border-orange-500",
    borderSelected: "border-orange-500",
    shadow: "shadow-[0_0_0_1px_rgba(249,115,22,0.3)]",
    bg: "bg-orange-100",
    text: "text-orange-600",
    handle: "bg-orange-500!",
  },
  yellow: {
    border: "border-yellow-500",
    borderSelected: "border-yellow-500",
    shadow: "shadow-[0_0_0_1px_rgba(234,179,8,0.3)]",
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    handle: "bg-yellow-500!",
  },
  green: {
    border: "border-green-500",
    borderSelected: "border-green-500",
    shadow: "shadow-[0_0_0_1px_rgba(34,197,94,0.3)]",
    bg: "bg-green-100",
    text: "text-green-600",
    handle: "bg-green-500!",
  },
  blue: {
    border: "border-blue-500",
    borderSelected: "border-blue-500",
    shadow: "shadow-[0_0_0_1px_rgba(59,130,246,0.3)]",
    bg: "bg-blue-100",
    text: "text-blue-600",
    handle: "bg-blue-500!",
  },
  purple: {
    border: "border-purple-500",
    borderSelected: "border-purple-500",
    shadow: "shadow-[0_0_0_1px_rgba(168,85,247,0.3)]",
    bg: "bg-purple-100",
    text: "text-purple-600",
    handle: "bg-purple-500!",
  },
  pink: {
    border: "border-pink-500",
    borderSelected: "border-pink-500",
    shadow: "shadow-[0_0_0_1px_rgba(236,72,153,0.3)]",
    bg: "bg-pink-100",
    text: "text-pink-600",
    handle: "bg-pink-500!",
  },
  gray: {
    border: "border-gray-500",
    borderSelected: "border-gray-500",
    shadow: "shadow-[0_0_0_1px_rgba(107,114,128,0.3)]",
    bg: "bg-gray-100",
    text: "text-gray-600",
    handle: "bg-gray-500!",
  },
};

interface HandleConfig {
  id: string;
  type: "source" | "target";
  position: Position;
}

interface TemplateNodeProps extends NodeProps {
  icon?: LucideIcon;
  color?: NodeColor;
  handles?: HandleConfig[];
}

export default function TemplateNode({
  id,
  selected,
  data,
  icon: Icon,
  color = "purple",
  handles,
}: TemplateNodeProps) {
  const { removeNode, selectNode, copyNode } = useFlowStore();
  const scheme = colorSchemes[color];

  // Default handles if none provided
  const defaultHandles: HandleConfig[] = [
    { id: "target-top", type: "target", position: Position.Top },
    { id: "source-bottom", type: "source", position: Position.Bottom },
  ];

  const activeHandles = handles ?? defaultHandles;

  const handleDelete = () => {
    removeNode(id);
  };

  const handleCopy = () => {
    copyNode(id);
  };

  return (
    <>
      {/* Render custom handles */}
      {activeHandles.map((handle) => (
        <Handle
          className={cn("size-2! rounded-none! border-none!", scheme.handle)}
          id={handle.id}
          key={handle.id}
          position={handle.position}
          type={handle.type}
        />
      ))}

      {/* Toolbar with actions - visible when selected */}
      <NodeToolbar align="start" isVisible={selected} position={Position.Top}>
        <div className="flex flex-row space-x-2 rounded-md border border-(--border) bg-white p-1">
          <button
            aria-label="Delete node"
            className="rounded-sm p-2 transition-colors hover:bg-neutral-100"
            onClick={handleDelete}
            type="button"
          >
            <Trash2 className="h-4 w-4 text-neutral-600" />
          </button>
          <button
            aria-label="Copy node"
            className="rounded-sm p-2 transition-colors hover:bg-neutral-100"
            onClick={handleCopy}
            type="button"
          >
            <CopyIcon className="h-4 w-4 text-neutral-600" />
          </button>
        </div>
      </NodeToolbar>

      {/* Node Content */}
      <div
        className={cn(
          "w-32 border border-b-2 bg-white text-left text-xs shadow-sm transition-all",
          selected
            ? cn(scheme.borderSelected, scheme.shadow)
            : "border-neutral-200"
        )}
      >
        <div className="flex flex-row items-center gap-2 p-2">
          {/* Icon container */}
          <div
            className={cn("flex size-4 items-center justify-center", scheme.bg)}
          >
            {Icon && <Icon className={cn("h-3.5 w-3.5", scheme.text)} />}
          </div>
          {/* Node label */}
          <span className="font-medium text-neutral-900 text-xs">
            {(data?.label as ReactNode) ?? "Template"}
          </span>
        </div>
      </div>
    </>
  );
}
