import type { NodeProps } from "@xyflow/react";
import { ShieldCheck } from "lucide-react";
import TemplateNode from "../template";

export default function WhitelistNode(props: NodeProps) {
  return <TemplateNode {...props} color="purple" icon={ShieldCheck} />;
}
