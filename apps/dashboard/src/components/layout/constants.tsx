import { BookTextIcon } from "../ui/book-text";
import { BotIcon } from "../ui/bot";
import { BoxesIcon } from "../ui/boxes";
import { ChartSplineIcon } from "../ui/chart-spline";
import { CircleChevronRightIcon } from "../ui/circle-chevron-right";
import { ConnectIcon } from "../ui/connect";
import { CpuIcon } from "../ui/cpu";
import { FlameIcon } from "../ui/flame";
import { FolderCodeIcon } from "../ui/folder-code";
import { HomeIcon } from "../ui/home";
import { IdCardIcon } from "../ui/id-card";
import { LayersIcon } from "../ui/layers";
import { WorkflowIcon } from "../ui/workflow";

export const items = [
  {
    label: "Home",
    color: "cyan",
    icon: <HomeIcon size={18} />,
  },
  {
    label: "Inbound Actions",
    color: "blue",
    icon: <WorkflowIcon />,
    children: [
      {
        label: "Connection",
        icon: <ConnectIcon />,
      },
      {
        label: "Mail From",
        icon: <IdCardIcon />,
      },
      {
        label: "Recipient",
        icon: <CircleChevronRightIcon />,
      },
      {
        label: "Mail Data",
        icon: <BotIcon />,
      },
      {
        label: "Processing Queue",
        icon: <LayersIcon />,
      },
    ],
  },
  {
    label: "Outbound Actions",
    color: "orange",
    icon: <WorkflowIcon />,
    children: [
      {
        label: "Connection",
        icon: <ConnectIcon />,
      },
      {
        label: "Mail From",
        icon: <IdCardIcon />,
      },
      {
        label: "Recipient",
        icon: <CircleChevronRightIcon />,
      },
      {
        label: "Mail Data",
        icon: <BotIcon />,
      },
      {
        label: "Processing Queue",
        icon: <LayersIcon />,
      },
    ],
  },
  {
    label: "Services",
    color: "green",
    icon: <BoxesIcon />,
    children: [
      {
        label: "Rspamd",
      },
      {
        label: "PostgreSQL",
      },
      {
        label: "Redis",
      },
      {
        label: "ClamAV",
      },
      {
        label: "Servers",
        icon: <CpuIcon />,
      },
    ],
  },
  {
    label: "Analytics",
    color: "purple",
    icon: <ChartSplineIcon />,
  },
  {
    label: "Problems",
    color: "red",
    icon: <FlameIcon />,
  },
  {
    label: "Scripts",
    color: "yellow",
    icon: <FolderCodeIcon />,
  },
  {
    label: "Documentation",
    color: "darkgreen",
    icon: <BookTextIcon />,
  },
];

export const colorClasses = {
  cyan: {
    text: "text-cyan-700",
    border: "border-cyan-200",
    bg: "bg-cyan-100",
    hoverBg: "hover:bg-cyan-200",
    hoverBorder: "hover:border-cyan-300",
  },
  blue: {
    text: "text-blue-700",
    border: "border-blue-200",
    bg: "bg-blue-100",
    hoverBg: "hover:bg-blue-200",
    hoverBorder: "hover:border-blue-300",
  },
  orange: {
    text: "text-orange-700",
    border: "border-orange-200",
    bg: "bg-orange-100",
    hoverBg: "hover:bg-orange-200",
    hoverBorder: "hover:border-orange-300",
  },
  green: {
    text: "text-green-700",
    border: "border-green-200",
    bg: "bg-green-100",
    hoverBg: "hover:bg-green-200",
    hoverBorder: "hover:border-green-300",
  },
  purple: {
    text: "text-purple-700",
    border: "border-purple-200",
    bg: "bg-purple-100",
    hoverBg: "hover:bg-purple-200",
    hoverBorder: "hover:border-purple-300",
  },
  red: {
    text: "text-red-700",
    border: "border-red-200",
    bg: "bg-red-100",
    hoverBg: "hover:bg-red-200",
    hoverBorder: "hover:border-red-300",
  },
  yellow: {
    text: "text-yellow-700",
    border: "border-yellow-200",
    bg: "bg-yellow-100",
    hoverBg: "hover:bg-yellow-200",
    hoverBorder: "hover:border-yellow-300",
  },
  darkgreen: {
    text: "text-emerald-800",
    border: "border-emerald-300",
    bg: "bg-emerald-200",
    hoverBg: "hover:bg-emerald-300",
    hoverBorder: "hover:border-emerald-400",
  },
};
