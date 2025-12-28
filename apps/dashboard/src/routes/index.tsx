import { createFileRoute } from "@tanstack/react-router";
import { items } from "@/components/layout/navmenu";

export const Route = createFileRoute("/")({
	component: App,
});

const colors = [
	{
		name: "warning",
		bg: "bg-yellow-300",
		text: "text-yellow-800",
		border: "border-yellow-400",
	},
	{
		name: "error",
		bg: "bg-red-300",
		text: "text-red-800",
		border: "border-red-400",
	},
	{
		name: "off",
		bg: "bg-gray-300",
		text: "text-gray-800",
		border: "border-gray-400",
	},
	{
		name: "running",
		bg: "bg-green-300",
		text: "text-green-800",
		border: "border-green-400",
	},
];

const services = [
	{
		name: "PostgreSQL",
		href: "/services/postgresql",
		status: "running",
		uptime: "99%",
	},
	{
		name: "Redis",
		href: "/services/redis",
		status: "warning",
		uptime: "100%",
	},
	{
		name: "SMTP Inbound",
		href: "/services/smtp-inbound",
		status: "error",
		uptime: "98%",
	},
	{
		name: "SMTP Outbound",
		href: "/services/smtp-outbound",
		status: "off",
		uptime: "97%",
	},
];

function App() {
	return (
		<div className="flex flex-col space-y-4">
			{/* Basic Information about the Services */}
			<div className="grid grid-cols-4 gap-4">
				{services.map((service) => {
					const color = colors.find((c) => c.name === service.status);
					return (
						<a
							key={service.name}
							href={service.href}
							className={`${color?.bg} border ${color?.border} ${color?.text} p-1 rounded-lg flex flex-col space-y-2`}
						>
							<div className="bg-neutral-100 p-4 rounded-lg w-full h-full">
								<h2 className="text-xl font-medium">{service.name}</h2>
							</div>
							<div className="flex flex-col p-2">
								Running, {service.uptime} Uptime
							</div>
						</a>
					);
				})}
			</div>

			{/* Inbound and Outbound SMTP Servers with the different systems, showing recent errors */}
			<div className="border border-(--border) p-4 rounded-lg bg-white h-72 w-full"></div>
		</div>
	);
}
