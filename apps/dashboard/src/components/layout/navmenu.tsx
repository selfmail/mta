import { Separator } from "@base-ui/react";
import { Menu } from "@base-ui/react/menu";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { BotIcon } from "../ui/bot";
import { BoxesIcon } from "../ui/boxes";
import { ChartSplineIcon } from "../ui/chart-spline";
import { CircleChevronRightIcon } from "../ui/circle-chevron-right";
import { ConnectIcon } from "../ui/connect";
import { CpuIcon } from "../ui/cpu";
import { FlameIcon } from "../ui/flame";
import { FolderCodeIcon } from "../ui/folder-code";
import { IdCardIcon } from "../ui/id-card";
import { LayersIcon } from "../ui/layers";
import { WorkflowIcon } from "../ui/workflow";

const items = [
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
];

const colorClasses = {
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
};

export default function NavigationMenu() {
	const route = useLocation();
	const navigate = useNavigate();
	const topic = route.pathname.split("/")[1]; // First segment after leading slash
	const subtopic = route.pathname.split("/")[2]; // Second segment

	// Find the current route from items based on topic
	const currentRoute = items.find(
		(item) => item.label.toLowerCase().replace(" ", "-") === topic,
	);

	// Find the current subroute if there's a subtopic
	const currentSubRoute = currentRoute?.children?.find(
		(child) => child.label.toLowerCase().replace(" ", "-") === subtopic,
	);

	if (!currentRoute) {
		return null;
	}

	const colors = colorClasses[currentRoute.color as keyof typeof colorClasses];

	return (
		<div className="flex flex-row space-x-4 items-center">
			<Separator
				orientation="vertical"
				className="w-px h-5 rounded-full rotate-12 bg-(--border)"
			/>
			{/* First Menu for topic */}
			<Menu.Root>
				<Menu.Trigger className="flex group cursor-pointer items-center flex-row p-1 px-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors rounded-lg space-x-2">
					<div
						className={`flex items-center justify-center ${colors.text} rounded-sm border aspect-square h-7 w-7 ${colors.border} ${colors.bg} group-${colors.hoverBg} group-${colors.hoverBorder} transition-colors duration-150 cursor-pointer`}
					>
						{currentRoute?.icon || currentRoute?.label.charAt(0).toUpperCase()}
					</div>
					<span className="font-medium">{currentRoute?.label}</span>
				</Menu.Trigger>
				<Menu.Portal>
					<Menu.Positioner sideOffset={8}>
						<Menu.Popup className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl py-2 min-w-[240px] z-50">
							{items.map((item) => {
								const itemPath = `/${item.label.toLowerCase().replace(/ /g, "-")}`;
								const isActive = route.pathname.startsWith(itemPath);
								const itemColors =
									colorClasses[item.color as keyof typeof colorClasses];

								// Don't render the active item
								if (isActive) return null;

								// If item has children, render as submenu
								if (item.children && item.children.length > 0) {
									return (
										<Menu.SubmenuRoot key={item.label}>
											<Menu.SubmenuTrigger className="px-3 py-2 mx-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer outline-none flex items-center justify-between">
												<div className="flex items-center space-x-3">
													<div
														className={`flex items-center justify-center ${itemColors.text} rounded-md border aspect-square h-7 w-7 ${itemColors.border} ${itemColors.bg} transition-colors duration-150`}
													>
														{item.icon || item.label.charAt(0).toUpperCase()}
													</div>
													<span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
														{item.label}
													</span>
												</div>
											</Menu.SubmenuTrigger>
											<Menu.Portal>
												<Menu.Positioner sideOffset={4} alignOffset={-4}>
													<Menu.Popup
														className={`border bg-(--background) border-(--border) rounded-lg py-1.5 min-w-50 z-50`}
													>
														{item.children.map((child) => {
															const childPath = `${itemPath}/${child.label.toLowerCase().replace(/ /g, "-")}`;
															return (
																<Menu.Item
																	key={child.label}
																	className="px-2.5 py-1.5 mx-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer outline-none"
																	onClick={() => {
																		navigate({ to: childPath });
																	}}
																>
																	<div className="flex items-center space-x-2.5">
																		<div
																			className={`${itemColors.bg} border ${itemColors.border} flex items-center justify-center ${itemColors.text} rounded-md aspect-square h-6 w-6 transition-colors duration-150`}
																		>
																			{child.icon ||
																				child.label.charAt(0).toUpperCase()}
																		</div>
																		<span className="text-xs font-medium text-neutral-900 dark:text-neutral-100">
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
										key={item.label}
										className="px-3 py-2 mx-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer outline-none"
										onClick={() => {
											navigate({ to: itemPath });
										}}
									>
										<div className="flex items-center space-x-3">
											<div
												className={`flex items-center justify-center ${itemColors.text} rounded-md border aspect-square h-7 w-7 ${itemColors.border} ${itemColors.bg} transition-colors duration-150`}
											>
												{item.icon || item.label.charAt(0).toUpperCase()}
											</div>
											<span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
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
						orientation="vertical"
						className="w-px h-5 rounded-full rotate-12 bg-(--border)"
					/>

					{/* Second Menu */}
					<Menu.Root>
						<Menu.Trigger className="flex group cursor-pointer items-center flex-row p-1 px-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors rounded-lg space-x-2">
							<div
								className={`flex items-center justify-center ${colors.text} rounded-sm border aspect-square h-7 w-7 ${colors.border} ${colors.bg} group-${colors.hoverBg} group-${colors.hoverBorder} transition-colors duration-150 cursor-pointer`}
							>
								{currentSubRoute?.icon ||
									currentSubRoute?.label.charAt(0).toUpperCase()}
							</div>
							<span className="font-medium">{currentSubRoute?.label}</span>
						</Menu.Trigger>
						<Menu.Portal>
							<Menu.Positioner sideOffset={8}>
								<Menu.Popup className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl py-2 min-w-[240px] z-50">
									{currentRoute?.children?.map((child) => {
										const childPath = `/${currentRoute.label.toLowerCase().replace(/ /g, "-")}/${child.label.toLowerCase().replace(/ /g, "-")}`;
										const isActive = route.pathname === childPath;

										// Don't render the active item
										if (isActive) return null;

										return (
											<Menu.Item
												key={child.label}
												className="px-3 py-2 mx-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer outline-none"
												onClick={() => {
													navigate({ to: childPath });
												}}
											>
												<div className="flex items-center space-x-3">
													<div
														className={`flex items-center justify-center ${colors.text} rounded-md border aspect-square h-7 w-7 ${colors.border} ${colors.bg} transition-colors duration-150`}
													>
														{child.icon || child.label.charAt(0).toUpperCase()}
													</div>
													<span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
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
