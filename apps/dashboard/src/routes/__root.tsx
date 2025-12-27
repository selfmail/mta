import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	Outlet,
	redirect,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import TopBar from "@/components/layout/bar";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import StoreDevtools from "../lib/demo-store-devtools";

interface MyRouterContext {
	queryClient: QueryClient;
}

const pagesWithoutTopBar = ["/auth/login", "/auth/register"];
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

		const showTopBar = !pagesWithoutTopBar.includes(currentPath);

		return (
			<>
				<TopBar>
					<Outlet />
				</TopBar>
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
