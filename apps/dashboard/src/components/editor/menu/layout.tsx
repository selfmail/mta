// Basic layout to simplify the other menu components
import { ArrowLeft } from "lucide-react";
import Button from "@/components/base/button";
import { useFlowStore } from "../store";
import { nodeTypes } from ".";

interface MenuLayoutProps {
  children: React.ReactNode;
}

export function MenuLayout({ children }: MenuLayoutProps) {
  const { selectNode, getSelectedNode } = useFlowStore();
  const selectedNode = getSelectedNode();
  const title =
    nodeTypes.find((n) => n.type === selectedNode?.type)?.name || "Menu";
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 p-2">
        <Button
          className="h-8 w-8"
          onClick={() => selectNode(null)}
          size="icon"
          variant="ghost"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="font-semibold text-lg">{title}</h2>
      </div>
      <div className="flex-1 overflow-auto p-2">{children}</div>
    </div>
  );
}
