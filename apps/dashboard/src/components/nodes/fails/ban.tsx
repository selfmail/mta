import type { NodeProps } from "@xyflow/react";
import { Position } from "@xyflow/react";
import { CircleSlash } from "lucide-react";
import TemplateNode from "../template";

export default function BanNode(props: NodeProps) {
  return (
    <TemplateNode
      {...props}
      color="red"
      handles={[{ id: "target-top", type: "target", position: Position.Top }]}
      icon={CircleSlash}
    />
  );
}
