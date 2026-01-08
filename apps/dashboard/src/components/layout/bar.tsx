import NavigationMenu from "./navmenu";

export default function TopBar({
  children,
  noPadding = false,
}: {
  children: React.ReactNode;
  noPadding?: boolean;
}) {
  return (
    <div className="flex h-screen w-full flex-col px-2 pb-2">
      {/* Top Bar */}
      <div className="z-50 flex shrink-0 items-center justify-between px-2 py-1 pt-2 pb-3">
        <div className="flex flex-row space-x-4">
          {/* Logo */}
          <a
            className="flex cursor-pointer flex-row items-center space-x-2 rounded-lg p-1 px-2 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800"
            href="/"
          >
            <div className="flex aspect-square h-7 w-7 cursor-pointer items-center justify-center rounded-sm border border-green-200 bg-green-100 text-green-700 transition-colors duration-150 hover:border-green-300 hover:bg-green-200 dark:border-green-800 dark:bg-green-950 dark:text-green-400 dark:hover:border-green-700 dark:hover:bg-green-900">
              P
            </div>
            <span className="font-medium">Platform</span>
          </a>
          <NavigationMenu />
        </div>

        {/* TODO: add icons for a right sidebar, like notes or ai chat */}
        <div className="flex flex-row items-center space-x-4" />
      </div>
      <main
        className={`min-h-0 flex-1 rounded-lg border border-(--border) bg-(--background-content) ${noPadding ? "" : "p-4"} overflow-y-auto`}
      >
        {children}
      </main>
    </div>
  );
}
