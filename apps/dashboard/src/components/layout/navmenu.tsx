import { Separator } from "@base-ui/react";
import { Menu } from "@base-ui/react/menu";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { colorClasses, items } from "./constants";

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
