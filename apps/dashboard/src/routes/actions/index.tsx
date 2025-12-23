import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/actions/")({
	component: RouteComponent,
});

// Actions: SMTP Events which the user can configure.
// E.g., on incoming email, run this script, etc.
const actions = [
	{
		name: "Connection",
		description: "A new Server connects with yours.",
		image:
			"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
		slug: "connection",
	},
	{
		name: "Mail From",
		description: "The smtp server specifies where the email is from.",
		image:
			"https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=300&fit=crop",
		slug: "mail-from",
	},
	{
		name: "Recipient To",
		description: "The smtp server specifies the recipient of the email.",
		image:
			"https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=400&h=300&fit=crop",
		slug: "recipient-to",
	},
	{
		name: "Process Data",
		description:
			"The smtp server sends the email data, you can perform spam checks for example.",
		image:
			"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
		slug: "data",
	},
];

function RouteComponent() {
	return (
		<div>
			<div className="mb-8 space-y-1">
				<h1 className="text-2xl font-medium">Actions</h1>
				<p className="text-gray-400 mt-2">
					Configure SMTP events and workflows for your mail server.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{actions.map((action) => (
					<Link
						key={action.slug}
						to={`/actions/${action.slug}`}
						className="group h-full"
					>
						<div className="relative overflow-hidden border border-neutral-800/50 rounded-xl h-full transition-all duration-300 bg-neutral-900/60 backdrop-blur-sm hover:bg-neutral-900/70">
							{/* Image Background */}
							<div className="relative h-40 overflow-hidden">
								<img
									src={action.image}
									alt={action.name}
									className="w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-300"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
							</div>

							{/* Content */}
							<div className="p-6">
								<h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">
									{action.name}
								</h3>
								<p className="text-sm text-neutral-400 mt-2 line-clamp-2">
									{action.description}
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
