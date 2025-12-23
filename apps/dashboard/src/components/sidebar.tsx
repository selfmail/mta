"use client";

import { Link, useRouterState } from "@tanstack/react-router";
import { ArchiveIcon } from "@/components/ui/archive";
import { ChartSplineIcon } from "@/components/ui/chart-spline";
import { CpuIcon } from "@/components/ui/cpu";
import { FlameIcon } from "@/components/ui/flame";
import { HomeIcon } from "@/components/ui/home";
import { LayersIcon } from "@/components/ui/layers";
import { WorkflowIcon } from "@/components/ui/workflow";
import { cn } from "@/lib/utils";

const navigation = [
	{
		name: "Home",
		href: "/",
		icon: HomeIcon,
	},
	{
		name: "Actions",
		href: "/actions",
		icon: WorkflowIcon,
	},
	{
		name: "Services",
		href: "/services",
		icon: CpuIcon,
	},
	{
		name: "Mails",
		href: "/mails",
		icon: ArchiveIcon,
	},
	{
		name: "Analytics",
		href: "/analytics",
		icon: ChartSplineIcon,
	},
	{
		name: "Errors",
		href: "/errors",
		icon: FlameIcon,
	},
	{
		name: "Logs",
		href: "/logs",
		icon: LayersIcon,
	},
];

export function Sidebar() {
	const router = useRouterState();
	const currentPath = router.location.pathname;

	return (
		<div className="pr-5 w-48 flex items-start justify-start flex-col space-y-1">
			<h3 className="pb-3">Selfmail MTA</h3>
			{navigation.map((item) => {
				const isActive = currentPath === item.href;
				const Icon = item.icon;

				return (
					<Link
						key={item.name}
						to={item.href}
						className={cn(
							"transition-colors",
							isActive ? "text-white" : "text-gray-400 hover:text-white",
						)}
					>
						<Icon size={18}>{item.name}</Icon>
					</Link>
				);
			})}
		</div>
	);
}
