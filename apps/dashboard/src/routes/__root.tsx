import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	Outlet,
	redirect,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Sidebar } from "../components/sidebar";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import StoreDevtools from "../lib/demo-store-devtools";

interface MyRouterContext {
	queryClient: QueryClient;
}

const pagesWithoutSidebar = ["/auth/login", "/auth/register"];
const pagesWithoutAuth = ["/auth/login", "/auth/register"];

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async ({ location }) => {
		// Skip auth check for pages that don't require authentication
		if (pagesWithoutAuth.includes(location.pathname)) {
			return;
		}

		// Check authentication for protected routes
		try {
			const response = await fetch("http://localhost:8080/users/me", {
				credentials: "include",
			});

			if (!response.ok) {
				throw redirect({
					to: "/auth/login",
				});
			}

			const data = await response.json();

			if (data.error) {
				throw redirect({
					to: "/auth/login",
				});
			}

			return { user: data.user };
		} catch (error) {
			if (error instanceof Response) {
				throw error;
			}
			throw redirect({
				to: "/auth/login",
			});
		}
	},
	component: () => {
		const router = useRouterState();
		const currentPath = router.location.pathname;

		const showSidebar = !pagesWithoutSidebar.includes(currentPath);

		return (
			<>
				<div
					className={`flex flex-col min-h-screen items-center justify-center ${showSidebar ? "pt-32" : ""}`}
				>
					<div
						className={`flex flex-1 flex-row w-full h-full ${showSidebar ? "px-72" : "justify-center"}`}
					>
						{showSidebar && <Sidebar />}
						<div className="flex flex-col space-y-16 w-full max-w-4xl">
							<Outlet />
						</div>
					</div>
				</div>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
						StoreDevtools,
					]}
				/>
			</>
		);
	},
});
