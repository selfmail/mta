import NavigationMenu from "./navmenu";

export default function TopBar({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen w-full p-2 flex flex-col">
			{/* Top Bar */}
			<div className="flex px-2 py-1 items-center pb-3 space-x-4">
				{/* Logo */}
				<a
					href="/"
					className="flex cursor-pointer items-center flex-row p-1 px-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors rounded-lg space-x-2"
				>
					<div className="flex items-center justify-center text-green-700 rounded-sm border aspect-square h-7 w-7 border-green-200 bg-green-100 hover:bg-green-200 hover:border-green-300 transition-colors duration-150 cursor-pointer">
						O
					</div>
					<span className="font-medium">Organisation</span>
				</a>
				<NavigationMenu />
			</div>
			<main className="flex-1 rounded-lg border-(--border) p-4 overflow-auto">
				{children}
			</main>
		</div>
	);
}
