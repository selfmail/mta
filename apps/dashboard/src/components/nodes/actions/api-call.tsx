import type { NodeProps } from "@xyflow/react";
import { Globe } from "lucide-react";
import TemplateNode from "../template";

export default function ApiCallNode(props: NodeProps) {
  return <TemplateNode {...props} color="blue" icon={Globe} />;
}
