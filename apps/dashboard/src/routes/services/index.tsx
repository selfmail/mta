import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/services/")({
	component: RouteComponent,
});

const services = [
	{
		name: "Postgres Database",
		description:
			"Postgres Database for storing information for the SMTP Servers, as well as user accounts and actions.",
		image:
			"https://images.unsplash.com/photo-1555949963-aa79dcee9813?w=400&h=300&fit=crop",
		slug: "postgres-database",
	},
	{
		name: "Redis",
		description:
			"Redis Database for caching SMTP sessions, for the queue to process emails, rate limiting, and improving performance.",
		image:
			"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
		slug: "redis-cache",
	},
	{
		name: "Inbound SMTP Server",
		description: "SMTP Server listening on port 25 for incoming emails.",
		image:
			"https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop",
		slug: "inbound-smtp-server",
	},
	{
		name: "Outbound SMTP Server",
		description:
			"SMTP Server for sending outgoing emails to recipient mail servers.",
		image:
			"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
		slug: "outbound-smtp-server",
	},
	{
		name: "Relay Queue",
		description:
			"Queue system for managing outbound email delivery retries and scheduling.",
		image:
			"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
		slug: "relay-queue",
	},
	{
		name: "Process Queue",
		description:
			"Queue system for processing incoming emails, running actions, and applying filters.",
		image:
			"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
		slug: "process-queue",
	},
];

function RouteComponent() {
	return (
		<div>
			<div className="mb-8">
				<h1 className="text-2xl font-medium">Services</h1>
				<p className="text-gray-400 mt-2">
					Monitor and manage your mail server infrastructure components.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{services.map((service) => (
					<Link
						key={service.slug}
						to={`/services/${service.slug}`}
						className="group h-full"
					>
						<div className="relative overflow-hidden border border-neutral-800/50 rounded-xl h-full transition-all duration-300 bg-neutral-900/60 backdrop-blur-sm hover:bg-neutral-900/70">
							{/* Image Background */}
							<div className="relative h-40 overflow-hidden">
								<img
									src={service.image}
									alt={service.name}
									className="w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-300"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
							</div>

							{/* Content */}
							<div className="p-6">
								<h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">
									{service.name}
								</h3>
								<p className="text-sm text-neutral-400 mt-2 line-clamp-2">
									{service.description}
								</p>
							</div>

							{/* Blue glow effect on hover */}
							<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
								<div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-blue-500/10 blur-3xl" />
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
