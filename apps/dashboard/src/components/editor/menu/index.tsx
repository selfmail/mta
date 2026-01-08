import ApiCallMenuPreview from "../menu-previews/api-call";
import BanMenuPreview from "../menu-previews/ban";
import WhitelistMenuPreview from "../menu-previews/whitelist";
import { useFlowStore } from "../store";
import { useNodeDnD } from "../useNodeDnD";
import WhitelistConnectionMenu from "./settings/whitelist-connection-menu";

interface MenuNode {
  type: string;
  name: string;
  preview: React.ComponentType;
}

export const nodeTypes: MenuNode[] = [
  {
    type: "whitelist-connection",
    name: "Whitelist",
    preview: WhitelistMenuPreview,
  },
  {
    type: "ban",
    name: "Ban",
    preview: BanMenuPreview,
  },
  {
    type: "api-call",
    name: "API Call",
    preview: ApiCallMenuPreview,
  },
];

const settingMenus: Record<string, React.ComponentType> = {
  "whitelist-connection": WhitelistConnectionMenu,
};

export default function RightSideMenu() {
  const { startDrag, drag, endDrag } = useNodeDnD();
  const { getSelectedNode } = useFlowStore();

  // Get the selected node to determine its type
  const selectedNode = getSelectedNode();
  const selectedNodeType = selectedNode?.type;

  // Get the settings menu component for the selected node type
  const SettingsMenuComponent = selectedNodeType
    ? settingMenus[selectedNodeType]
    : null;

  const handlePointerUp = (e: React.PointerEvent) => {
    // Stop propagation to prevent canvas from receiving the event
    e.stopPropagation();
    if (drag) {
      endDrag();
    }
  };

  // If a node is selected and has a settings menu, show it
  if (SettingsMenuComponent) {
    return (
      <div
        className="absolute top-0 right-0 bottom-0 h-full w-2/8 rounded-lg bg-(--background)"
        onPointerUp={handlePointerUp}
      >
        <SettingsMenuComponent />
      </div>
    );
  }

  return (
    <div
      className="absolute top-0 right-0 bottom-0 flex h-full w-2/8 flex-col space-y-4 rounded-lg bg-(--background) p-4"
      onPointerUp={handlePointerUp}
    >
      <h2 className="font-medium text-lg">Add Nodes to your Action</h2>
      <div className="grid grid-cols-2 gap-4">
        {nodeTypes.map((node) => {
          const PreviewComponent = node.preview;
          return (
            <div className="flex flex-col space-y-2" key={node.type}>
              <button
                className="cursor-grab select-none rounded-lg border border-(--border) bg-(--card-background) p-2 transition-transform hover:shadow-sm active:scale-95"
                onPointerDown={(e) => startDrag(e, node.type, node.name)}
                style={{
                  opacity: drag?.type === node.type ? 0.5 : 1,
                  touchAction: "none",
                }}
                type="button"
              >
                <PreviewComponent />
              </button>
              <div className="flex flex-col text-center text-neutral-500">
                <span className="font-medium">{node.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
