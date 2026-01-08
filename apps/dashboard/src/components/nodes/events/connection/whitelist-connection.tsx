import type { NodeProps } from "@xyflow/react";
import { ShieldCheck } from "lucide-react";
import TemplateNode from "../../template";

export default function WhitelistConnectionNode(props: NodeProps) {
  return <TemplateNode {...props} color="purple" icon={ShieldCheck} />;
}
