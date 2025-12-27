import NavigationMenu from "./navmenu";

export default function TopBar({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-screen w-full px-2 pb-2 flex flex-col">
			{/* Top Bar */}
			<div className="shrink-0 pt-2 z-50 bg-white dark:bg-neutral-950 flex px-2 py-1 items-center justify-between pb-3">
				<div className="flex flex-row space-x-4">
					{/* Logo */}
					<a
						href="/"
						className="flex cursor-pointer items-center flex-row p-1 px-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors rounded-lg space-x-2"
					>
						<div className="flex items-center justify-center text-green-700 rounded-sm border aspect-square h-7 w-7 border-green-200 bg-green-100 hover:bg-green-200 hover:border-green-300 transition-colors duration-150 cursor-pointer">
							P
						</div>
						<span className="font-medium">Platform</span>
					</a>
					<NavigationMenu />
				</div>

				{/* TODO: add icons for a right sidebar, like notes or ai chat */}
				<div className="flex flex-row items-center space-x-4"></div>
			</div>
			<main className="flex-1 min-h-0 rounded-lg border border-(--border) p-4 overflow-y-auto">
				{children}
			</main>
		</div>
	);
}
