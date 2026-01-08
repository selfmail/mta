import { Separator } from "@base-ui/react";
import { Menu } from "@base-ui/react/menu";
import { useLocation, useNavigate } from "@tanstack/react-router";
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

const colorClasses = {
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

export default function NavigationMenu() {
  const route = useLocation();
  const navigate = useNavigate();
  const topic = route.pathname.split("/")[1]; // First segment after leading slash
  const subtopic = route.pathname.split("/")[2]; // Second segment

  // Find the current route from items based on topic
  const currentRoute =
    route.pathname === "/"
      ? items.find((item) => item.label === "Home")
      : items.find(
          (item) => item.label.toLowerCase().replace(" ", "-") === topic
        );

  // Find the current subroute if there's a subtopic
  const currentSubRoute = currentRoute?.children?.find(
    (child) => child.label.toLowerCase().replace(" ", "-") === subtopic
  );

  if (!currentRoute) {
    return null;
  }

  const colors = colorClasses[currentRoute.color as keyof typeof colorClasses];

  return (
    <div className="flex flex-row items-center space-x-4">
      <Separator
        className="h-5 w-px rotate-12 rounded-full bg-(--border)"
        orientation="vertical"
      />
      {/* First Menu for topic */}
      <Menu.Root>
        <Menu.Trigger className="group flex cursor-pointer flex-row items-center space-x-2 rounded-lg p-1 px-2 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800">
          <div
            className={`flex items-center justify-center ${colors.text} aspect-square h-7 w-7 rounded-sm border ${colors.border} ${colors.bg} group-${colors.hoverBg} group-${colors.hoverBorder} cursor-pointer transition-colors duration-150`}
          >
            {currentRoute?.icon || currentRoute?.label.charAt(0).toUpperCase()}
          </div>
          <span className="font-medium">{currentRoute?.label}</span>
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={8}>
            <Menu.Popup className="z-50 min-w-60 rounded-xl border border-neutral-200 bg-white py-2 dark:border-neutral-800 dark:bg-neutral-900">
              {items.map((item) => {
                const itemPath =
                  item.label === "Home"
                    ? "/"
                    : `/${item.label.toLowerCase().replace(/ /g, "-")}`;
                const isActive =
                  item.label === "Home"
                    ? route.pathname === "/"
                    : route.pathname.startsWith(itemPath);
                const itemColors =
                  colorClasses[item.color as keyof typeof colorClasses];

                // Don't render the active item
                if (isActive) {
                  return null;
                }

                // If item has children, render as submenu
                if (item.children && item.children.length > 0) {
                  return (
                    <Menu.SubmenuRoot key={item.label}>
                      <Menu.SubmenuTrigger className="mx-1 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 outline-none transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`flex items-center justify-center ${itemColors.text} aspect-square h-7 w-7 rounded-md border ${itemColors.border} ${itemColors.bg} transition-colors duration-150`}
                          >
                            {item.icon || item.label.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-neutral-900 text-sm dark:text-neutral-100">
                            {item.label}
                          </span>
                        </div>
                      </Menu.SubmenuTrigger>
                      <Menu.Portal>
                        <Menu.Positioner alignOffset={-4} sideOffset={4}>
                          <Menu.Popup
                            className={
                              "z-50 min-w-50 rounded-lg border border-(--border) bg-(--background) py-1.5"
                            }
                          >
                            {item.children.map((child) => {
                              const childPath = `${itemPath}/${child.label.toLowerCase().replace(/ /g, "-")}`;
                              return (
                                <Menu.Item
                                  className="mx-1 cursor-pointer rounded-md px-2.5 py-1.5 outline-none transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                  key={child.label}
                                  onClick={() => {
                                    navigate({ to: childPath });
                                  }}
                                >
                                  <div className="flex items-center space-x-2.5">
                                    <div
                                      className={`${itemColors.bg} border ${itemColors.border} flex items-center justify-center ${itemColors.text} aspect-square h-6 w-6 rounded-md transition-colors duration-150`}
                                    >
                                      {child.icon ||
                                        child.label.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="font-medium text-neutral-900 text-xs dark:text-neutral-100">
                                      {child.label}
                                    </span>
                                  </div>
                                </Menu.Item>
                              );
                            })}
                          </Menu.Popup>
                        </Menu.Positioner>
                      </Menu.Portal>
                    </Menu.SubmenuRoot>
                  );
                }

                // Regular item without children
                return (
                  <Menu.Item
                    className="mx-1 cursor-pointer rounded-lg px-3 py-2 outline-none transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    key={item.label}
                    onClick={() => {
                      navigate({ to: itemPath });
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`flex items-center justify-center ${itemColors.text} aspect-square h-7 w-7 rounded-md border ${itemColors.border} ${itemColors.bg} transition-colors duration-150`}
                      >
                        {item.icon || item.label.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-neutral-900 text-sm dark:text-neutral-100">
                        {item.label}
                      </span>
                    </div>
                  </Menu.Item>
                );
              })}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      {currentSubRoute && (
        <>
          <Separator
            className="h-5 w-px rotate-12 rounded-full bg-(--border)"
            orientation="vertical"
          />

          {/* Second Menu */}
          <Menu.Root>
            <Menu.Trigger className="group flex cursor-pointer flex-row items-center space-x-2 rounded-lg p-1 px-2 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800">
              <div
                className={`flex items-center justify-center ${colors.text} aspect-square h-7 w-7 rounded-sm border ${colors.border} ${colors.bg} group-${colors.hoverBg} group-${colors.hoverBorder} cursor-pointer transition-colors duration-150`}
              >
                {currentSubRoute?.icon ||
                  currentSubRoute?.label.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium">{currentSubRoute?.label}</span>
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner sideOffset={8}>
                <Menu.Popup className="z-50 min-w-60 rounded-xl border border-neutral-200 bg-white py-2 dark:border-neutral-800 dark:bg-neutral-900">
                  {currentRoute?.children?.map((child) => {
                    const childPath = `/${currentRoute.label.toLowerCase().replace(/ /g, "-")}/${child.label.toLowerCase().replace(/ /g, "-")}`;
                    const isActive = route.pathname === childPath;

                    // Don't render the active item
                    if (isActive) {
                      return null;
                    }

                    return (
                      <Menu.Item
                        className="mx-1 cursor-pointer rounded-lg px-3 py-2 outline-none transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        key={child.label}
                        onClick={() => {
                          navigate({ to: childPath });
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`flex items-center justify-center ${colors.text} aspect-square h-7 w-7 rounded-md border ${colors.border} ${colors.bg} transition-colors duration-150`}
                          >
                            {child.icon || child.label.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-neutral-900 text-sm dark:text-neutral-100">
                            {child.label}
                          </span>
                        </div>
                      </Menu.Item>
                    );
                  })}
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        </>
      )}
    </div>
  );
}
